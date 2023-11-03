---
title: 'Dementia classifier convolutional neural network built with transfer learning'
coverImage: '/assets/projects/OAS1_0018_MR1_mpr_n4_anon_111_t88_masked_gfc_fseg_tra_90.png'
excerpt: 'Convolutional neural network (CNN) from transfer learning to detect varying levls of dementia in MRI scans.'
date: '2018'
createdDate: '2018'
tags: 'python,ai,computer vision,biotech'
ogImage:
  url: '/assets/projects/OAS1_0018_MR1_mpr_n4_anon_111_t88_masked_gfc_fseg_tra_90.png'
---

<a href="https://github.com/jddunn/dementia-progression-analysis" style="text-align: center" target="_blank" class="md-link">GitHub link</a>

## Intro

I used <a class="md-link" href="http://www.oasis-brains.org/app/template/Tools.vm#services" target="_blank" style="margin-left: 0; margin-right: 0; display: inline">OASIS's public archive of cross-sectional MRI data</a> to build a convolutional neural network in Keras using a pre-trained model (transfer learning with VGG-16) that could detect signs of dementia with either a multi-class or binary classification model. The binary classifier had a ~60% accuracy rate (consistent with different variations of training / test data) with a 13% false positive rate.

Because I was working with a usable data set of only a few hundred images (mostly biased to non-demented classification), I used transfer learning to build the models, so they wouldn't require as much data as building a CNN from scratch. Given the limited data available, and the fact that 50-75% of dementia sufferers are never diagnosed, a 60% machine success rate becomes a relatively imposing figure. With more training data (and a standardized form of testing and scanning MRIs), utilizing transfer learning seems likely to be very useful in facilitating the diagnosis of Alzheimer's / Dementia.

## Results Screenshots

<a href="/assets/projects/potential_dementia_FSL_SEG_test_results.png" target="_blank"><img src="/assets/projects/potential_dementia_FSL_SEG_test_results.png" class="img-shadow" style="display: block; margin-left: auto; margin-right: auto;" width="600" alt="Dementia detector CNN using transfer learning"></img></a>
<span style="text-align: center; color: grey; margin-left: auto; margin-right: auto; display: block; width: 80%">There's a command line interface to train and test multi-class or binary classification models.</span>

As the scripts I wrote can also train a multi-level classifier of dementia, it is possible to expand on the analysis and algorithmically determine patterns in dementia progression over time. It may be then possible to reverse-engineer these patterns in simulations for patients' MRIs, potentially leading to a systematic way of detecting signs of dementia very early on. With the integration of tracking user data in individual patient profiles, the software can be used to aid in the treatment, not just the diagnosis, of these disorders.

<a href="/assets/projects/OAS1_0316_MR1_mpr_n4_anon_111_t88_masked_gfc_fseg_tra_90.png" target="_blank"><img src="/assets/projects/OAS1_0316_MR1_mpr_n4_anon_111_t88_masked_gfc_fseg_tra_90.png" class="img-shadow" style="display: block; margin-left: auto; margin-right: auto;" width="400" alt="Dementia detector CNN using transfer learning"></img></a>

## Research / Project Summary

### Dataset

Data set consists of the population studied in the OASIS paper: "Includes 218 subjects aged 18 to 59 years and 198 subjects aged 60 to 96 years. Each group includes an approximately equal number of male and female subjects. Of the older subjects, 98 had a CDR, score of 0, indicating no dementia, and 100 had a CDR, score greater than zero, indicating a diagnosis of very mild to moderate AD."

### Training models

Due to the limited amount of data available, the current models in the repository are trained for only binary classification, to detect either no dementia (nondemented) or potential dementia (possibly demented), although you can train the tertiary and quaternary models with the same script. The multi-label classifications also pave the possibility of discovering patterns in brain scans that could be linked to the progression of dementia over time, potentially leading into the basics of a scientific model which can diagnose dementia long before symptoms show.

The classifiers are built using transfer learning, so that features are extracted from a pre-trained deep learning model and applied to the context of cross-sectional dementia analysis. This allows us to build convolutional neural networks with a much smaller amount of necessary data through manipulating pre-trained weights from the final layers of the larger neural network. The VGG-16 model for Keras is used to extract these bottleneck features.

Two dementia classification models are available in the repository: One for raw, scanned MRIs, labeled with 'RAW', and the other for grey/white/CSF segmentation images generated from a masked version of a "gain-field corrected atlas-registered image to the 1988 atlas space of Talairach and Tournoux (Buckner et al., 2004)", labeled with 'FSL_SEG'.

In the original 'raw\_' folders, 270 patient files were used for training, 116 for validation, and 50 for testing. The final data sets used involved oversampling of the under-represented class 'potential_dementia', done by duplicating each file classified originally 4-4.25 times (4:1 oversampling ratio in FSL_SEG files, and 4.25:1 in RAW). For the RAW models, the original sample sizes already contained about 4 times as many MRIs, as multiple MRIs for each patient had been taken to obtain an average, and presumably this led to the the need to compensate for a greater amount of noise (the RAW model did not seem usable with just a 4:1 oversampling ratio).

### Models results

Final FSL_SEG validation results:

```
Accuracy: 75.00%
Loss: 0.43623338143030804
```

Final RAW model validation results:

```
Accuracy: 80.95%
Loss: 2.6544698758615026
```

Due to the lack of access of further MRI samples diagnosed with dementia, only very small tests were able to be done on the classifiers--the statistic below is mostly an optimistic, estimated guess under optimal conditions.

In the current models, the FSL_SEG classifier could identify 3 out of 5 (+-1) potentially demented individuals when shown new MRIs (an accuracy rate of ~60%). Of new nondemented patients shown, 2 (+-2) out of 16 were misidentified as false positives (~13%), with the other 14 receiving the correct 'normal' diagnosis. Both FSL_SEG and RAW classifiers showed similar results and accuracies with consistency. These results were taken from an average of multiple testing done with different selections of the data randomly chosen for training, testing, and validation (only 5-7 demented MRIs were reserved for testing each time, as the training or validation sample sizes would be too small).

## Conclusion

Assuming the models are accurate around 60% of the time, this becomes a relatively imposing figure when compared to the 45% rate of Alzheimer's diagnose by a doctor, estimated from an annual survey conducted by the Alzheimer's Association. Adding more urgency to the need for machine learning assistance in the medical study of dementia is the fact that there is no single medical test that can determine with certainty if a person suffers from dementia, and that 1 in 3 senior individuals will someday die from a form of the disorder.

This project was researched and built in a two day period as a proof-of-concept. In its current state, it should not be used seriously in any professional medical context. But with more data, fine-tuning, testing, and given a standardized method of performing and receiving MRI scans, machine learning classifiers could significantly facilitate the diagnosis of dementia and Alzheimer's, and even help us find patterns of early warning signs.
