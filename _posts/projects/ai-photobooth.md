---
title: 'AI Photobooth'
coverImage: '/assets/projects/cat-spirited-away-filter.png'
excerpt: 'A project created for Edelman as part of their AI initiative, where users can take selfies and transform them into various styles from film / television, using a convolutional neural network (CNN) and neural style transfer.'
date: '2019'
createdDate: '2019'
tags: 'python,ai,computer vision,photography'
ogImage:
  url: '/assets/blog/dynamic-routing/cover.jpg'
---

<span style="text-align: center; color: grey; margin-left: auto; margin-right: auto; display: block; width: 80%; margin-top: -65px; font-size: .9em">My dear friend, if I can I'll find you again.</span>

I was contracted by Edelman to design and create an interactive exhibit for their AI month - one that would utilize <a class="md-link" href="https://en.wikipedia.org/wiki/Neural_style_transfer" target="_blank" style="margin-left: 0; margin-right: 0; display: inline">neural style transfer</a> to provide a fun experience for visitors to their NYC headquarters. I went with the direction of film and pop culture, and thought it would be interesting for people to see themselves transformed into styles from popular media references. I trained 5 different models, 3 of which were chosen for show: Spirited Away, Sin City, Game of Thrones, Blade Runner, and Alice in Wonderland.

<a href="/assets/projects/ai-photobooth-demo.gif" target="_blank"><img src="/assets/projects/ai-photobooth-demo.gif" class="img-shadow" style="display: block; margin-left: auto; margin-right: auto;" width="700" alt="Video demo of AI Photobooth UI"></img></a>
<span style="text-align: center; color: grey; margin-left: auto; margin-right: auto; display: block; width: 80%">Video demo of UI.</span>

A Python server with a REST API powers the backend and performs the image transformations. After trying the experience, users can enter in their emails and have the photos sent to them via Sendgrid's API. Images can be taken with a web camera or with a mobile / tablet camera (when accessing the website on a mobile device).

I used code samples and research from ywng's <a class="md-link" href="https://github.com/ywng/multi-style-transfer" target="_blank" style="margin-left: 0; margin-right: 0; display: inline">multi-style-transfer</a>, which was a modified implementation of <a class="md-link" href="https://github.com/pytorch/examples/tree/main/fast_neural_style" target="_blank" style="margin-left: 0; margin-right: 0; display: inline">fast-neural-style</a> to allow for multiple images to be used as a reference for style transfer. Although the original purpose of their design was to allow for different types of styles to be transferred, I found that this algorithm also greatly improved results for just a single style transfer (with multiple images of the same style used as reference).

Essentially, I would capture various frames from the sources of media I had, all somewhat cohesive in aesthetic but different in the image content, and trained models those groups of images for a style instead of just a singular one. This made the results of image transformations a lot more consistent across a wider spectrum input images, as it was able to create a "average" sense of details to transform from the data. I had also incorporated <a class="md-link" href="https://github.com/pytorch/examples/tree/main/fast_neural_style" target="_blank" style="margin-left: 0; margin-right: 0; display: inline"> Labeled Faces in the Wild</a> dataset within the base training data, to give greater accuracy for portraits and selfie transformations.