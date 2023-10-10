---
title: 'Jasper 2.0 - Amazon Echo alternative with chatbot'
coverImage: '/assets/projects/jasper-photo.png'
excerpt: 'Homemade robot using Jasper library to create a virtual assistant that can converse naturally through crowd-sourced messages (Cleverbot)'
date: '2015'
createdDate: '2015'
tags: 'ai,raspberry pi,hardware,robots'
ogImage:
  url: '/assets/projects/jasper-photo.png'
---

This is an expansion of the Jasper library (written in Python) built into a lo-tech, portable robotic body. 

### Video demo of Jasper 2.0

![Video demo of Jasper 2.0 robot on youtube](https://www.youtube.com/watch?v=xSaKdExKoXo&t=257s =100%x315em)


Components include a webcam, a microphone, speakers, a Raspberry Pi, a motion detector. Jasper 2.0 is always listening; just say his name and tell it something. 

Japser 2.0 is able to act like a virtual assistant, with the ability to save notes, tell weather / news, check emails, and look up information, but the most compelling feature Jasper 2.0 is endowed with is the ability to distinguish between commands (where it functions as a personal assistant) and natural conversation.

If no commands are found after parsing the user's speech, Jasper 2.0 will send the message to Cleverbot's API and output that response. Cleverbot crowdsources its responses and brain by talking to users online and measuring the frequency of the responses and similarity of its messages.