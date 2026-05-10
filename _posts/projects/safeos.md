---
title: 'SAFEOS GUARDIAN'
coverImage: '/assets/projects/safeos/safeos-sh-landing.png'
excerpt: "Free, privacy-first AI monitor for pets, babies, elderly. Runs in the browser via TensorFlow.js, escalates to Ollama or cloud only when needed."
date: '2026-04-05'
createdDate: '2026-03-25'
tags: 'ai,computer vision,tensorflowjs,privacy,offline,pwa,nextjs,express,sqlite,ollama,humanitarian,open-source,monitoring,webrtc'
featured: true
ogImage:
  url: '/assets/projects/safeos/safeos-sh-landing.png'
---

<a href="https://safeos.sh" style="text-align: center" target="_blank" rel="noopener" class="md-link">safeos.sh</a>

<a href="https://github.com/framersai/safeos" style="text-align: center" target="_blank" rel="noopener" class="md-link">GitHub</a>

<a href="https://frame.dev" style="text-align: center" target="_blank" rel="noopener" class="md-link">frame.dev</a>

A baby monitor shouldn't need a $9.99/month subscription, a cloud account hosted in some opaque region, and a SoC that nobody on a security team has ever audited. The actual job is straightforward: watch the crib, flag the cry, page mom. The recurring revenue model is what keeps that simple thing from being free.

SafeOS Guardian is the alternative I built. MIT-licensed, runs in a browser tab you already have open, escalates to a local Ollama server you already have running, and only hits a cloud API as a last resort if you've explicitly opted in. Part of [Frame's 10% for Humanity initiative](https://safeos.sh).

![SafeOS Guardian landing page with supplemental monitoring tool messaging, six use cases for baby, pet, elderly, lost and found, security, and wildlife, and privacy-first open-source positioning](/assets/projects/safeos/safeos-sh-landing.png)

## What it actually does, in one paragraph

You open `safeos.sh`, grant camera and microphone permission, and the page is now a baby monitor — or a pet cam, or a fall-detector for an elderly parent, or a lost-and-found scanner that watches for a specific dog by visual fingerprint. Inference runs in the browser via TensorFlow.js. When the local model thinks something interesting happened, the frame escalates — first to a local Ollama vision model on your LAN if you have one, then to a cloud LLM only if you've enabled it. Alerts ramp from quiet to loud over two minutes until you acknowledge them. Everything is in a [single open-source repo](https://github.com/framersai/safeos).

## Why I built this instead of buying a Nest Cam

Commercial baby monitors and pet cams have a structural conflict of interest. The hardware is sold near cost. The recurring revenue is the cloud subscription. So the cloud path becomes the *only* path — even when local inference would be faster, cheaper, and more private. The frame is uploaded, transcoded, fed through a model in some other country, and the alert comes back over a polled HTTPS connection that fails when your wifi flakes. People who can't afford the subscription get nothing.

The math doesn't work that way anymore. A 45MB COCO-SSD model runs on a phone GPU in around 50 milliseconds. A `~1.7GB` moondream model runs on a laptop CPU. None of this needs the cloud for the easy 99% of frames. The only reason to design a system that makes the cloud mandatory is so you can charge for it.

## Three tiers, and why most frames never leave the browser

This is the core architectural call: route every frame through the cheapest possible tier first, only escalate when the cheap tier is uncertain. Most frames are boring — empty room, sleeping baby, still pet — so spending cloud compute on them is wasteful and slow.

![Three-tier AI escalation diagram showing camera frames flowing through Tier 1 browser models (COCO-SSD, ViT-base, motion, audio), escalating on concern detection to Tier 2 local Ollama (moondream, llava, llama-vision), and falling back to Tier 3 cloud APIs for ambiguous cases](/assets/projects/safeos/diagram-tiers.svg)

**Tier 1 — Browser, always on, free.** Every frame runs through TensorFlow.js COCO-SSD (~45MB downloaded once, cached forever) for object detection and Transformers.js ViT-base-patch16-224 (~89MB) for scene classification. Motion runs as a pixel-diff with user-defined detection zones. Audio runs through the Web Audio API's `AnalyserNode` with a frequency-band analyzer tuned for cries (300–600Hz, fundamental ~450Hz), pet sounds, or impact transients. None of this hits the network after first load.

**Tier 2 — Local Ollama, optional, user-hosted.** If a Tier 1 signal crosses a concern threshold, the frame forwards to a local Ollama server running [`moondream`](https://ollama.com/library/moondream) (~1.7GB) for fast triage. If triage flags something worth a closer look, [`llava:7b`](https://ollama.com/library/llava) (~4GB) runs scenario-specific analysis with a prompt that depends on whether you picked baby, pet, elderly, or security mode. For complex reasoning, [`llama3.2-vision:11b`](https://ollama.com/library/llama3.2-vision) (~8GB) is supported.

**Tier 3 — Cloud fallback, opt-in.** Only for genuinely ambiguous cases that Tier 2 couldn't resolve, and only if you've turned it on. Three providers are wired through a single client in [`cloud-fallback.ts`](https://github.com/framersai/safeos/blob/master/src/lib/analysis/cloud-fallback.ts): `google/gemini-flash-1.5` via OpenRouter, `gpt-4o-mini` via OpenAI, and `claude-3-haiku-20240307` via Anthropic. (The Anthropic model is the older Haiku — there's a follow-up to bump that, but the cloud path is rare enough by design that the model choice matters less than you'd think.) Frames are redacted before transit and rate-limited aggressively.

![SafeOS AI Models settings page showing processing mode selection between local instant, AI queue, and hybrid modes, Ollama server connection status, and recommended local vision models with install commands](/assets/projects/safeos/safeos-models.png)

## How motion, audio, and vision actually run

The browser runtime is where most of the work happens. Users never see it — they just see alerts.

### Motion with zones

The frame analyzer computes a pixel delta between the current frame and a calibrated baseline. A user-defined detection zone system masks out busy areas (TVs, windows with moving leaves, ceiling fans) and focuses detection on specific regions like a crib, pet bed, or doorway. Zones are stored as normalized rectangles, can overlap, and are independently checked.

![SafeOS detection zone editor showing a full-screen default zone plus three sample zones (center focus, left side, right side) with help text for drawing, renaming, and disabling zones](/assets/projects/safeos/safeos-zones.png)

### Audio

The audio pipeline does FFT in real time via the Web Audio API. Cry detection isolates the 300–600Hz band where infant cries concentrate (around a 450Hz fundamental). Pet sounds use broader spectral patterns. Elderly fall detection listens for short impact transients. A rolling noise floor reduces false positives in noisy rooms.

### Vision

Two models run in sequence. COCO-SSD handles fast object detection — person, dog, cat, chair, couch. If the scenario needs scene-level understanding ("is the baby still in the crib, or did they climb out?"), Transformers.js ViT runs classification. Both models pull from their CDNs once and cache in the service worker for offline use.

### Lost & Found, or: visual fingerprinting that isn't face recognition

You upload photos of a missing pet or person. The system extracts a visual fingerprint — color histogram, dominant colors, edge signatures, size ratios. The camera then continuously watches for matches. On a hit, you get an alert with the matched frame.

It's not face recognition. It's a lightweight visual matcher that works for pets (where face ID is unreliable) as well as people. The honest limitation: it works well for visually distinct subjects (a brown-and-white dog) and middling for uniform ones (any short-haired tabby).

![SafeOS Lost and Found page with step-by-step workflow for uploading photos of a lost pet or person, visual fingerprinting, and continuous camera monitoring for matches](/assets/projects/safeos/safeos-lost-found.png)

## The alert pipeline, or: how to wake someone up without burning out their attention

Detection is half the problem. Getting the right person's attention at the right level is the other half. SafeOS uses a four-level severity system — `info`, `warning`, `critical`, `emergency` — with a volume ramp from quiet to loud over a 120-second window until acknowledged.

![Alert escalation pipeline diagram showing five volume levels from 30% to 100% across a 120-second timeline, trigger sources (motion, audio, AI detection, lost and found, webhooks), severity classifier with per-severity cooldowns, and six notification delivery channels](/assets/projects/safeos/diagram-alert-pipeline.svg)

Each severity has its own cooldown to prevent alert fatigue. Emergency alerts have zero cooldown and immediately escalate. Info alerts have a multi-second minimum gap. A content-filter service checks messages against safety policies before dispatching, and quiet-hours config lets you suppress non-critical alerts during configured windows.

The Monitor view surfaces this live — motion percentage, audio levels, pixel deltas, stream state, sensitivity sliders, detection toggles, audio frequency profiles, per-severity cooldown controls, inactivity monitoring, volume overrides — all in a single admin dashboard.

![SafeOS Live Monitor page showing real-time detection metrics (motion, audio, pixel threshold, stream state, mode), five monitoring presets (infant, pet, silent, night, max, ultimate), five detection toggles with AI tags, sensitivity sliders for motion audio and pixel, five audio frequency profiles, quiet hours configuration, and timing and alert controls with per-severity cooldowns](/assets/projects/safeos/safeos-monitor.png)

## What's behind the API

The optional Express backend is around 12,400 lines of TypeScript across 45 files. Clean domain boundary: API routes handle transport, library services handle logic, queues handle background work. It uses [`@framers/sql-storage-adapter`](https://github.com/framersai/agentos) (the same SQLite layer used by [AgentOS](/posts/projects/wunderland-on-sol)) for persistence, BullMQ for frame analysis and human review jobs, and Socket.io for real-time WebSocket delivery.

```
src/
├── api/
│   ├── server.ts           — Express + WebSocket bootstrap
│   ├── routes/             — 13 route files, ~36 handler invocations
│   │   ├── auth.ts         — session + email auth (519 lines)
│   │   ├── export.ts       — GDPR data export (483 lines)
│   │   ├── webhooks.ts     — third-party integrations (383 lines)
│   │   ├── email-auth.ts   — passwordless email flow (403 lines)
│   │   ├── streams.ts      — monitoring stream CRUD (278 lines)
│   │   ├── profiles.ts     — scenario profiles (251 lines)
│   │   ├── alerts.ts       — alert management (239 lines)
│   │   ├── analytics.ts    — usage analytics (235 lines)
│   │   ├── review.ts       — human review queue (221 lines)
│   │   ├── system.ts       — health + status (184 lines)
│   │   ├── analysis.ts     — analysis results (169 lines)
│   │   └── notifications.ts — push/telegram registration (152 lines)
│   ├── middleware/         — auth, rate-limit, Zod validation
│   └── schemas/            — API validation schemas
├── lib/
│   ├── analysis/
│   │   ├── frame-analyzer.ts   — two-tier vision pipeline
│   │   ├── cloud-fallback.ts   — multi-provider LLM routing
│   │   └── profiles/           — baby, pet, elderly, security prompts
│   ├── alerts/
│   │   ├── escalation.ts       — volume ramping 0→100%
│   │   ├── notification-manager.ts
│   │   ├── browser-push.ts     — Web Push VAPID
│   │   ├── twilio.ts           — SMS
│   │   └── telegram.ts         — Telegram Bot
│   ├── audio/analyzer.ts       — cry / distress detection
│   ├── ollama/client.ts        — moondream / llava integration
│   ├── safety/                 — content filter, disclaimers
│   ├── streams/manager.ts      — stream lifecycle
│   ├── review/human-review.ts  — review queue workflow
│   └── webrtc/signaling.ts     — WebRTC signaling
├── queues/
│   ├── analysis-queue.ts       — BullMQ frame analysis
│   └── review-queue.ts         — human review jobs
└── auth/email-auth.ts
```

Every frame is written to a rolling 5–10 minute buffer and then discarded. Nothing is stored long-term unless you explicitly export it. The GDPR export endpoint builds a complete user data package on demand, can compress it, mark frames as exported for incremental sync, and hand back a signed bundle.

## Settings: the part that decides whether you trust this

The settings surface is broad on purpose. The trust model depends on you being able to see and change everything. General settings, detection tuning, AI model selection, detection zones, notification channels, alert thresholds, escalation timing, privacy controls, appearance, schedule, sounds — all separate pages, all version-controlled in the open repo.

![SafeOS Settings page showing the general settings with display name field, theme selection (dark, light, system), and a left nav with sections for detection, AI models, detection zones, notifications, alerts, escalation, privacy, appearance, schedule, and sounds](/assets/projects/safeos/safeos-settings.png)

## Local timeline and export

History is stored in IndexedDB for offline-first mode. Events are timestamped, filterable by type (alerts, lost & found, intrusions), and searchable. A local bundle export downloads your complete history as JSON — optionally with full frames embedded, gzip compressed — for backups, sharing with a family member, or transferring to another device. Exported frames can be marked so subsequent exports only include new ones (incremental sync).

![SafeOS History page with local timeline viewer, offline bundle export controls, incremental and full frame export toggles, gzip compression option, and empty-state messaging for new users](/assets/projects/safeos/safeos-history.png)

## Privacy: the part most monitors get wrong on purpose

Frames never leave the device unless you explicitly opt in, and even then, only with the minimum necessary data:

1. **Local-first.** Tier 1 inference runs entirely in the browser. Zero network calls.
2. **Rolling buffer.** Only 5–10 minutes of frames are ever in memory. Old frames discarded.
3. **No cloud storage.** Frames are analyzed and dropped. Only user-initiated exports persist.
4. **Anonymization.** Frames forwarded to human review (if enabled) get faces and sensitive areas blurred.
5. **Rate limiting.** Cloud fallback is rate-limited aggressively to prevent runaway spend and abuse.
6. **GDPR export.** One-click full data export and deletion.
7. **Abuse prevention.** The service monitors for misuse patterns and can restrict access. Documented openly.

## What's still wonky

Tier 2 escalation requires a user-managed Ollama install. Most users won't have one. So in practice the system runs in Tier 1 + Tier 3 mode for most installs — which is fine, but it means the local-LLM tier is a power-user feature, not a default.

The four-level severity is calibrated against my own thresholds. It probably needs per-scenario tuning that I haven't built yet. An "info" alert for the baby scenario should be much more aggressive than an "info" alert for the pet scenario.

The lost-and-found visual fingerprint is great for visually distinct subjects and middling for uniform ones. A separate path for a small fine-tuned matching model would help, but that's a meaningful step up in complexity.

The Capacitor mobile shells exist but I haven't shipped to either app store. The PWA install path is good enough for most use cases, but a real iOS app would unlock background processing.

The GDPR export is hand-rolled and will need maintenance as schemas evolve. There's no migration story for that yet — the export format is what it is, until I write a v2.

## Tech stack

| Layer | Stack |
|-------|-------|
| **Frontend** | Next.js 14, React 18, TypeScript 5.3, Tailwind CSS 3.3, Zustand 4.4, next-intl 4.6 |
| **Client ML** | TensorFlow.js 4.17, COCO-SSD, Transformers.js (Xenova) 2.17, ViT-base-patch16-224 |
| **Client storage** | IndexedDB via `idb` 7.1, service worker cache |
| **Mobile** | Capacitor 5.6 (iOS / Android shells, not yet shipped to stores) |
| **Backend** | Express 4.21, Socket.io 4.8, BullMQ 5.31, better-sqlite3, `@framers/sql-storage-adapter` 0.4 |
| **Backend AI** | Ollama 0.5, OpenAI 4.72, Anthropic SDK 0.32, sharp 0.33 |
| **Notifications** | Twilio 5.3, node-telegram-bot-api 0.66, web-push 3.6 (VAPID) |
| **Realtime** | WebRTC via simple-peer 9.11 |
| **Testing** | Vitest 2.1 (41 test files), Playwright E2E 1.40 |
| **Validation** | Zod 3.23 schemas |
| **DevOps** | Docker 7-stage multi-stage build, pnpm monorepo, Caddy reverse proxy |

The monorepo is around 100 .tsx components in the Next.js frontend (~70k LOC), 45 backend TypeScript files (~12k LOC), 41 test files between Vitest and Playwright, and ten markdown docs anchored by a 462-line [`ARCHITECTURE.md`](https://github.com/framersai/safeos/blob/master/docs/ARCHITECTURE.md) that walks through every layer.

![SafeOS About page with mission statement, values, 10% for Humanity pledge, tech stack showcase, how-it-works walkthrough, abuse prevention policy, and Frame.dev team context](/assets/projects/safeos/safeos-about.png)

## Links

**Website:** <a href="https://safeos.sh" target="_blank" rel="noopener" class="md-link">safeos.sh</a>

**GitHub:** <a href="https://github.com/framersai/safeos" target="_blank" rel="noopener" class="md-link">github.com/framersai/safeos</a>

**Frame.dev:** <a href="https://frame.dev" target="_blank" rel="noopener" class="md-link">frame.dev</a>
