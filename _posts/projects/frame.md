---
title: 'Frame'
coverImage: '/assets/projects/frame_screenshot_01-21-2019_sicko_mode_visualization.png'
excerpt: 'Journaling application in electron (web / desktop) that summarizes and extracts important data with nautral language processing, and can answer questions asked to it.'
date: '2018'
createdDate: '2018'
tags: 'python,electron,text editor,nlp,ai,chatbot'
ogImage:
  url: '/assets/projects/frame_screenshot_01-21-2019_sicko_mode_visualization.png'
---
<a href="https://github.com/jddunn/frame" style="text-align: center" target="_blank" class="md-link">GitHub link</a>

<a href="https://github.com/jddunn/frame/releases" style="text-align: center" target="_blank" class="md-link">Download link (Windows)</a>

This was a project largely inspired by The Hitchhiker's Guide to The Galaxy. Frame is a notetaking / journaling application built with React and Electron, with a Python backend (running with a REST API that can be run automatically through Nginx with Docker) to power its most advanced features: Abstractive summarization of content, and being able to answer questions about its entries that come in the form of natural language. These NLP features are powered by the AllenNLP library.

<video width="600" height="360" controls>
  <source src="/assets/projects/framed_video_animation_demo.mp4" type="video/mp4">
</video>

Frame can currently summarize entries by entire documents and by paragraphs, and offers abstractified versions as well. Frame can also answer questions about its entries and provide contextual answers, and can extract and display lists of key information, as well as display data visualizations and track other metrics. Frame's eventual goal is to have a full-fledged voice-operated system that can talk back and listen to the user, and be able to search and navigate the library of entries for advanced analysis and information retrieval.

<a href="/assets/projects/frame_screenshot_01-21-2019_cryptocurrency_analysis.png" target="_blank"><img src="/assets/projects/frame_screenshot_01-21-2019_cryptocurrency_analysis.png" class="img-shadow" style="display: block; margin-left: auto; margin-right: auto;" width="600" alt="Frame AI note-taking text analysis"></img></a>
<span style="text-align: center; color: grey; margin-left: auto; margin-right: auto; display: block; width: 80%">Statistical analysis.</span>

<a href="/assets/projects/frame_screenshot_01-21-2019_alice_in_wonderland_information_extraction.png" target="_blank"><img src="/assets/projects/frame_screenshot_01-21-2019_alice_in_wonderland_information_extraction.png" class="img-shadow" style="display: block; margin-left: auto; margin-right: auto;" width="600" alt="Frame AI note-taking information extraction"></img></a>
<span style="text-align: center; color: grey; margin-left: auto; margin-right: auto; display: block; width: 80%">Information extraction.</span>

<a href="/assets/projects/frame_screenshot_01-21-2019_this_is_water_summarization.png" target="_blank"><img src="/assets/projects/frame_screenshot_01-21-2019_this_is_water_summarization.png" class="img-shadow" style="display: block; margin-left: auto; margin-right: auto;" width="600" alt="Frame AI note-taking information extraction"></img></a>
<span style="text-align: center; color: grey; margin-left: auto; margin-right: auto; display: block; width: 80%">Extractive summarization.</span>

Frame features a recursive tree data structure to store its entries (in JSON with IndexedDB), and allows users to drag and drop entries for maximum control over how information in the interactive encyclopedia is stored. The database is entirely self-contained within the application executable (stored inside the browser with key-value pairs), so the binary files can be distributed readily, without any need for online connectivity or user authentication. An alpha version (v0.1.0) has been released for download (Windows only currently, as I did not have a Mac available to build, and have not had time yet to set up a Linux env to build) that is fully-functional.

Whether the Python backend server is set up or not, Frame is completely usable, and most of the analysis is done in the JavaScript logic. Currently, there is no online API, although a more robust and enterprise-level version of Frame is planned to be set up for paid subscribers.