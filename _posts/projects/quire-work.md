---
title: 'Quire.work'
coverImage: '/assets/projects/quire-homepage.gif'
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

The platform can also turn any website or product into a knowledge base accessible via chatbot automatically.

## Tech stack

<a href="https://res.cloudinary.com/dmzlfga9b/image/upload/v1694219904/hype-tech-stack_q6ttnj.png" target="_blank"><img src="https://res.cloudinary.com/dmzlfga9b/image/upload/v1694219904/hype-tech-stack_q6ttnj.png" class="img-shadow" style="display: block; margin-left: auto; margin-right: auto;" width="450" alt="Quire.work tech stack"></img></a>
<span style="text-align: center; color: grey; margin-left: auto; margin-right: auto; display: block; width: 80%">Quire.blog's tech stack. This is the same tech that powers Hype.blog, another project of mine launched around the same time.</span>

## Note-taking / summarization

Quire transcribes voice notes and conversations with high accuracy, and can summarize the notes at the end, or transform the notes into a story draft or script for a video to publish on a platform like YouTube.

The transcription is currently powered by the Web Speech API, and has an agnostic library written so it's compatible with other paid / premium APIs, and that will be available for certain membership plans. 

<a href="/assets/projects/quire-summarizer.gif" target="_blank"><img src="/assets/projects/quire-summarizer.gif" class="img-shadow" style="display: block; margin-left: auto; margin-right: auto;" width="800" alt="Quire.work summarizer"></img></a>

## Fact-checking

Quire can transcribe and listen to conversations / meetings and perform fact-checking in real-time. Quire detects whether a statement has been made that is an assertion with a verifiable answer, and if it is, it fact-checks it and outputs whether or not the statement made was correct or not, along with some context as to why.

Quire also detects when a question (that is not an opinion question) has been asked, then does a lookup to the answer to that question in real-time also. Both the question and its answer are appended to a section of the notes.

The transcription functionality in the app detects pauses of ~2 seconds in speech, and if a pause has been detected and the last transcription of speech is different from the reference stored in the component's state, then that last transcription is considered a complete message or thought, and thus checked to see if it's an assertion or question, to respond accordingly.

<a href="/assets/projects/quire-fact-checker.gif" target="_blank"><img src="/assets/projects/quire-fact-checker.gif" class="img-shadow" style="display: block; margin-left: auto; margin-right: auto;" width="400" alt="Quire.work fact-checking"></img></a>

## Interview screenshot

Quire turns static forms and survey questions into automatic rich conversational experiences, can keep track of the flow of questions throughout the interview, while answering questions and conversing naturally with the user.

<a href="/assets/projects/quire-work-sample-interview.png" target="_blank"><img src="/assets/projects/quire-work-sample-interview.png" class="img-shadow" style="display: block; margin-left: auto; margin-right: auto;" width="400" alt="Quire.work interview screenshot"></img></a>

Interviews / conversations can be recorded, with AI-assisted parsing done to extract answers and store them in JSON records. An interview is considered as a task in the dashboard insights, and the exported result of the interview corresponds to the task's report.

<a href="/assets/projects/quire-work-json-conversation-export.png" target="_blank"><img src="/assets/projects/quire-work-json-conversation-export.png" class="img-shadow" style="display: block; margin-left: auto; margin-right: auto;" width="400" alt="Quire.work conversation export"></img></a>

## Dashboard

Quire has a dashboard to manage organizations, which house team members and AI agents, who work together collaboratively for a common goal. Each organization has its own AI project manager to keep agents and team members on-track with tasks and deadlines.

The dashboard also has analytics and insights, as every agent's task can result in a report of the task results that can be exported in JSON or CSV. Agents have access to in-house proprietary tools like a high-performance web scraper, and so can conduct research and output a report of their findings.

<a href="/assets/projects/quire-admin-dashboard-screenshot-1.png" target="_blank"><img src="/assets/projects/quire-admin-dashboard-screenshot-1.png" class="img-shadow" style="display: block; margin-left: auto; margin-right: auto;" width="800" alt="Quire.work admin dashboard for organizations"></img></a>

<a href="/assets/projects/quire-admin-dashboard-screenshot-2.png" target="_blank"><img src="/assets/projects/quire-admin-dashboard-screenshot-2.png" class="img-shadow" style="display: block; margin-left: auto; margin-right: auto;" width="800" alt="Quire.work admin dashboard for organizations goals"></img></a>

Quire agents within an organization have relationships that can be defined to customize how they orient and act toward the goals of the organization. Agents work together collaboratively to achieve organization objects that are user-defined or defined by the AI project manager.

<a href="/assets/projects/quire-admin-dashboard-screenshot-3.png" target="_blank"><img src="/assets/projects/quire-admin-dashboard-screenshot-3.png" class="img-shadow" style="display: block; margin-left: auto; margin-right: auto;" width="800" alt="Quire.work admin dashboard for organizations insights"></img></a>