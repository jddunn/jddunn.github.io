---
title: 'Quire.work'
coverImage: '/assets/projects/quire-homepage-optimized.gif'
excerpt: 'A platform for academics, professionals, and businesses alike to create and manage customizable virtual assistants that can perform any type of automation.'
date: '2023-11-02'
createdDate: '2023-08'
tags: 'typescript,next.js,ai,nlp,llms'
# author:
#   name: Johnny Dunn
#   picture: '/assets/blog/authors/jj.jpeg'
ogImage:
  url: '/assets/projects/quire-work-sample-interview.png'
---

<a href="https://quire.work" style="text-align: center" target="_blank" class="md-link">Link</a>

## Intro

Quire.work is an all-in-one platform serving customizable virtual assistants for academics, professionals, and businesses alike. These assistants are integrable with many different APIs to allow full automation and task running.

Quire's virtual assistants / agents can do a multitude of features, including SEO content writing, conducting interviews for market research, note-taking and summarization, tutoring with course and study guide creation, and live real-time fact-checking and question answering.

AI agents live under specific organizations or teams (managed in a dashboard), where each organization can set common goals that the agents are working towards collaboratively. Organizations have productivity features like sprint planning, task tracking, and a AI project manager agent automatically created and assigned to ensure agents and human workers stay on-track to complete their goals.

The platform can also turn any website or product into a knowledge base accessible via chatbot automatically.

Quire was built out of personal needs and desires I had for AI tools and automation, but done in a scalable way and accessible for other users to access these tools via paid monthly subscriptions.

## Tech stack

<a href="https://res.cloudinary.com/dmzlfga9b/image/upload/v1694219904/hype-tech-stack_q6ttnj.png" target="_blank"><img src="https://res.cloudinary.com/dmzlfga9b/image/upload/v1694219904/hype-tech-stack_q6ttnj.png" class="img-shadow" style="display: block; margin-left: auto; margin-right: auto;" width="450" alt="Quire.work tech stack"></img></a>
<span style="text-align: center; color: grey; margin-left: auto; margin-right: auto; display: block; width: 80%">Quire.blog's tech stack. This is the same tech that powers Hype.blog, another project of mine launched around the same time.</span>

## Technical details

Quire has an API built in TypeScript / Express for the NLP, which is agnostic with LLMs and currently wraps around OpenAI and a local LLM (Llama 2 13B) deployed on AWS. The API allows you to choose with model you want to use with an optional parameter (defaults to OpenAI's GPT-3.5-turbo model).

The organizations and agent records are stored in a Postgres database. GraphQL acts as a layer around the REST API and Postgres db for fetching calls with its query language. MongoDB is used for document storage of agent conversations and prompts.

Each AI agent has its own prompt that is chained from some default system prompts, and is customizable on-the-fly by users (so personality characteristics and writing styles can be updated based on user preferences or a set of presets). The AI agents (stored as JSON) also have properties to allow the UI to differentiate which agent requires certain UI features, like the Notetaking agent requiring a recording button with speech recognition.

The speech recognition uses the basic web speech recognition API along with AI-powered APIs, and chooses which API to interact with based on the user's subscription plan. By default, speech recognition transcribes words as a new "note" after a 1.25 second pause has been detected (this is adjustable by users).

The app and API are currently deployed on AWS Amplify.

## Note-taking summarization demo

Quire transcribes voice notes and conversations with high accuracy, and can summarize the notes at the end, or transform the notes into a story draft or script for a video to publish on a platform like YouTube.

The transcription is currently powered by the Web Speech API, and has an agnostic library written so it's compatible with other paid / premium APIs, and that will be available for certain membership plans.

<a href="/assets/projects/quire-summarizer-optimized.gif" target="_blank"><img src="/assets/projects/quire-summarizer-optimized.gif" class="img-shadow" style="display: block; margin-left: auto; margin-right: auto;" width="800" alt="Quire.work summarizer"></img></a>

## Note-taking action points demo

Quire can turn notes from conversations and meetings into summaries and action points / important to-dos.

<a href="/assets/projects/quire-storywriter-optimized.gif" target="_blank"><img src="/assets/projects/quire-storywriter-optimized.gif" class="img-shadow" style="display: block; margin-left: auto; margin-right: auto;" width="800" alt="Quire.work storywriter"></img></a>

## Story / essay / video script drafting demo

Quire can turn notes and brainstormed ideas into full-blown story drafts, essays and research papers, and scripts for videos.

You can choose the output and transformation of your notes through the **Writing Presets** menu.

<a href="/assets/projects/quire-action-points-optimized.gif" target="_blank"><img src="/assets/projects/quire-action-points-optimized.gif" class="img-shadow" style="display: block; margin-left: auto; margin-right: auto;" width="800" alt="Quire.work action points"></img></a>

## Fact-checking demo

Quire can transcribe and listen to conversations / meetings and perform fact-checking in real-time. Quire detects whether a statement has been made that is an assertion with a verifiable answer, and if it is, it fact-checks it and outputs whether or not the statement made was correct or not, along with some context as to why.

Quire also detects when a question (that is not an opinion question) has been asked, then does a lookup to the answer to that question in real-time also. Both the question and its answer are appended to a section of the notes.

The transcription functionality in the app detects pauses of ~2 seconds in speech, and if a pause has been detected and the last transcription of speech is different from the reference stored in the component's state, then that last transcription is considered a complete message or thought, and thus checked to see if it's an assertion or question, to respond accordingly.

<a href="/assets/projects/quire-fact-checker-optimized.gif" target="_blank"><img src="/assets/projects/quire-fact-checker-optimized.gif" class="img-shadow" style="display: block; margin-left: auto; margin-right: auto;" width="800" alt="Quire.work fact-checker"></img></a>

## Interviewing screenshot

Quire turns static forms and survey questions into automatic rich conversational experiences, can keep track of the flow of questions throughout the interview, while answering questions and conversing naturally with the user.

<a href="/assets/projects/quire-work-sample-interview.png" target="_blank"><img src="/assets/projects/quire-work-sample-interview.png" class="img-shadow" style="display: block; margin-left: auto; margin-right: auto;" width="400" alt="Quire.work interview screenshot"></img></a>

Interviews / conversations can be exported in JSON or CSV, and are saved in the Insights dashboard. This way, market and user research can be easily conducted on a mass scale with automation.

<a href="/assets/projects/quire-work-json-conversation-export.png" target="_blank"><img src="/assets/projects/quire-work-json-conversation-export.png" class="img-shadow" style="display: block; margin-left: auto; margin-right: auto;" width="400" alt="Quire.work conversation export"></img></a>

## Tutor demo

Quire can research any topic or subject (using the internal web scraping tool), and can create a comprehensive course with full lesson plans, outlines, and interactive flash cards.

Users on Quire will be able to browse public courses generated by the community, and use it as an educational platform.

<a href="/assets/projects/quire-tutor-optimized.gif" target="_blank"><img src="/assets/projects/quire-tutor-optimized.gif" class="img-shadow" style="display: block; margin-left: auto; margin-right: auto;" width="800" alt="Quire.work tutor"></img></a>

## Knowledge base chatbot

Quire has a chatbot virtual assistant on the site to help users get on-boarded or learn more about the platform. The chatbot assistant is offered in paid plans for users to be able to embed it as a support assistant in their own websites and apps, using an iframe widget. The knowledge base of the chatbot can be manually set or it can automatically scrape some links or files given to it to compose the contents.

## Dashboard

Quire has a dashboard to manage organizations, which house team members and AI agents, who work together collaboratively for a common goal. Each organization has its own AI project manager to keep agents and team members on-track with tasks and deadlines.

The dashboard also has analytics and insights, as every agent's task can result in a report of the task results that can be exported in JSON or CSV. Agents have access to in-house proprietary tools like a high-performance web scraper, and so can conduct research and output a report of their findings.

<a href="/assets/projects/quire-admin-dashboard-screenshot-1.png" target="_blank"><img src="/assets/projects/quire-admin-dashboard-screenshot-1.png" class="img-shadow" style="display: block; margin-left: auto; margin-right: auto;" width="800" alt="Quire.work admin dashboard for organizations"></img></a>

<a href="/assets/projects/quire-admin-dashboard-screenshot-2.png" target="_blank"><img src="/assets/projects/quire-admin-dashboard-screenshot-2.png" class="img-shadow" style="display: block; margin-left: auto; margin-right: auto;" width="800" alt="Quire.work admin dashboard for organizations goals"></img></a>

Quire agents within an organization have relationships that can be defined to customize how they orient and act toward the goals of the organization. Agents work together collaboratively to achieve organization objects that are user-defined or defined by the AI project manager.

<a href="/assets/projects/quire-admin-dashboard-screenshot-3.png" target="_blank"><img src="/assets/projects/quire-admin-dashboard-screenshot-3.png" class="img-shadow" style="display: block; margin-left: auto; margin-right: auto;" width="800" alt="Quire.work admin dashboard for organizations insights"></img></a>
