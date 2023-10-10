---
title: 'Dreamgazer'
coverImage: '/assets/projects/lucid-dream-data-visualization.png'
excerpt: 'Wearable lucid dreaming device made with an Arduino, a pulse sensor, and an EEG sensor (NeuroSky MindWave), with Processing code to record / visualize dreams; expanded into a 3D printable brain-computer interface template with VR capabilities and an interface built in Unity.'
date: '2017'
createdDate: '2017'
tags: 'lucid dreams,EEG,brain-computer interface,biotech,processing'
ogImage:
  url: '/assets/projects/lucid-dream-data-visualization.png'
---

<a class="md-link" href="https://jddunn.github.io/rough-copies/" style="text-align: center" target="_blank">Rough Copies - Old Research Documentation Site</a>

## Intro

Dreamgazer so far embodies a series of projects and research experiments I have been undertaking since my later years of high school. These works include:

* A several month long journey in high school to produce a illustrated dream journal containing experiment documentation and dream analyses, to show the progression of lucid dream training (2011)

* A brain-computer interface prototype (built by hacking apart the NeuroSky MindWave) able to successfully detect when someone fell asleep within a period of a few minutes, and also able to induce lucid dreaming within myself by playing a trained musical trigger during the appropriate dreaming stages of REM (2015)

* A 3D printable wearable device with various sensors, electrodes, and a VR interface meant to induce the "ultimate" lucid dreams (2017)

## The dreaming machine

<a href="/assets/projects/dreamgazer-prototype-front.jpg" target="_blank"><img src="/assets/projects/dreamgazer-prototype-front.jpg" class="img-shadow" style="display: block; margin-left: auto; margin-right: auto;" width="400" alt="Dreamgazer brain-computer interface prototype for lucid dreaming"></img></a>

In 2015, I made a wearable prototype to induce lucid dreaming using an Arduino, a pulse sensor, the NeuroSky MindWave (EEG), and Processing (for software). I was able to detect when I fell asleep within an accuracy of just a few minutes, and was able to successfully induce lucid dreaming by playing music during detected stages of REM sleep (by measuring eye movement after sleep).

<a href="/assets/projects/lucid-dream-data-visualization.png" target="_blank"><img src="/assets/projects/lucid-dream-data-visualization.png" class="img-shadow" style="display: block; margin-left: auto; margin-right: auto;" width="500" alt="Dreamgazer brain-computer interface prototype for lucid dreaming"></img></a>
<span style="text-align: center; color: grey; margin-left: auto; margin-right: auto; display: block; width: 80%">Image still from an abstract visual recording of a dream by tracking biometric patterns (eye movement, heart rate, and EEG waves)</span>

I chose to use Processing because it already had compatible libraries with all the open-source hardware I was using, and because of Processing's simple and immediate way of writng animations. The visualization of dreams through biometric and EEG data was something I really wanted to nail.

![Dreamgazer brain-computer interface UI demo on youtube](https://www.youtube.com/watch?v=N_l1COTufZE&t=15s =100%x315em)
<span style="text-align: center; color: grey; margin-left: auto; margin-right: auto; display: block; width: 80%">Video demonstration of wearable prototype in use, with software recording dream in real-time and playing musical triggers during REM sleep</span>

## The Results

I was able to detect when I fell asleep within an accuracy of five minutes, and was able to successfully induce lucid dreaming by playing music when REM sleep was detected.

I used Processing to visualize my dreams and record my biometric data over the course of several different nights. The data was automatically fed into a spreadsheet for easy analysis.

You can see and use the data yourself <a class="md-link" href="https://docs.google.com/spreadsheets/d/1Y8HOtzMYF8cwWqB92FebTu3TLxZ9siHHUTT_H1PWqZM/edit?usp=sharing" target="_blank" style="margin-left: 0; margin-right: 0; display: inline">here</a> (if the data does turn out to be useful for people, I'll go back and separate it into each night to organize).

<a href="/assets/projects/dream_spreadsheet_data.png" target="_blank"><img src="/assets/projects/dream_spreadsheet_data.png" class="img-shadow" style="display: block; margin-left: auto; margin-right: auto;" width="500" alt="Dream data spreadsheet"></img></a>

Below you'll see annotated graphs demonstrating the success of the device, recording biometric and EEG trends corresponding with points of interest throughout a night of dreaming.

<a href="/assets/projects/DreamGazer%20Early%20Prototype%20with%20MindWave%20-%20Success%20Trial%20Night%201%20-%20Close%20Look%20Chart.png" target="_blank"><img src="/assets/projects/DreamGazer%20Early%20Prototype%20with%20MindWave%20-%20Success%20Trial%20Night%201%20-%20Close%20Look%20Chart.png" class="img-shadow" style="display: block; margin-left: auto; margin-right: auto;" width="500" alt="Dream data success trial night 1 graph"></img></a>

<a href="/assets/projects/DreamGazer%20Early%20Prototype%20with%20MindWave%20-%20Success%20Trial%20Night%202%20(Full%20Log).png" target="_blank"><img src="/assets/projects/DreamGazer%20Early%20Prototype%20with%20MindWave%20-%20Success%20Trial%20Night%202%20(Full%20Log).png" class="img-shadow" style="display: block; margin-left: auto; margin-right: auto;" width="500" alt="Dream data success trial night 2 graph"></img></a>

<a href="/assets/projects/DreamGazer%20Early%20Prototype%20with%20MindWave%20-%20Success%20Trial%20Night%203%20-%20Close%20Look.png" target="_blank"><img src="/assets/projects/DreamGazer%20Early%20Prototype%20with%20MindWave%20-%20Success%20Trial%20Night%203%20-%20Close%20Look.png" class="img-shadow" style="display: block; margin-left: auto; margin-right: auto;" width="500" alt="Dream data success trial night 3 graph"></img></a>

## The future concept

The name Dreamgazer refers specifically to a mostly conceptualized, combined VR / AR, EEG, and tDCS (transcranial direct current stimulation) device designed to be 3D printed and then hand-assembled. Dreamgazer's software was planned to be integrated with an AI program (Emoter) that would train users to dream, and guide them through their dreams vocally by talking and responding to biofeedback.

<a href="/assets/projects/DreamGazer-3D-Front.png" target="_blank"><img src="/assets/projects/DreamGazer-3D-Front.png" class="img-shadow" style="display: block; margin-left: auto; margin-right: auto;" width="500" alt="Dreamgazer 3D front"></img></a>

<a href="/assets/projects/DreamGazer-Diagram.jpg" target="_blank"><img src="/assets/projects/DreamGazer-Diagram.jpg" class="img-shadow" style="display: block; margin-left: auto; margin-right: auto;" width="600" alt="Dreamgazer components diagram"></img></a>
<span style="text-align: center; color: grey; margin-left: auto; margin-right: auto; display: block; width: 80%">The plans were made to be functional, and hand-assembled with proper construction and fabric materials.</span>

<a href="/assets/projects/dreamgazer-intro.png" target="_blank"><img src="/assets/projects/dreamgazer-intro.png" class="img-shadow" style="display: block; margin-left: auto; margin-right: auto;" width="500" alt="Dreamgazer VR UI intro"></img></a>
<span style="text-align: center; color: grey; margin-left: auto; margin-right: auto; display: block; width: 80%">The plans were made to be functional, and hand-assembled with proper construction and fabric materials.</span>

![Dreamgazer VR interface UI demo on youtube](https://www.youtube.com/watch?v=rFekLHHXhHs =100%x315em)
<span style="text-align: center; color: grey; margin-left: auto; margin-right: auto; display: block; width: 80%">Dreamgazer was designed with a VR interface, in Unity.</span>

<a href="/assets/projects/DreamGazer-Main-Flowchart.png" target="_blank"><img src="/assets/projects/DreamGazer-Main-Flowchart.png" class="img-shadow" style="display: block; margin-left: auto; margin-right: auto;" width="500" alt="DreamGazer main flowchart"></img></a>
<span style="text-align: center; color: grey; margin-left: auto; margin-right: auto; display: block; width: 80%">The full step-by-step process of Dreamgazer's proposed functionality.</span>

Lucid dreaming in wearables and biotechnology is something I will continue exploring. I have plans to further develop and refine new iterations of Dreamgazer, and would like to be able to open-source the hardware and software.
