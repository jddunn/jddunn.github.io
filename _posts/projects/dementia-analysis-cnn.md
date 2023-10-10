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

<a href="https://github.com/jddunn/dementia-progession-analysis" style="text-align: center" target="_blank" class="md-link">GitHub link</a>

I used <a class="md-link" href="http://www.oasis-brains.org/app/template/Tools.vm#services" target="_blank" style="margin-left: 0; margin-right: 0; display: inline">OASIS's public archive of cross-sectional MRI data</a> to build a convolutional neural network in Keras using a pre-trained model (transfer learning with VGG-16) that could detect signs of dementia with either a multi-class or binary classification model. The binary classifier had a ~60% accuracy rate (consistent with different variations of training / test data) with a 13% false positive rate.

Because I was working with a usable data set of only a few hundred images (mostly biased to non-demented classification), I used transfer learning to build the models, so they wouldn't require as much data as building a CNN from scratch. Given the limited data available, and the fact that 50-75% of dementia sufferers are never diagnosed, a 60% machine success rate becomes a relatively imposing figure. With more training data (and a standardized form of testing and scanning MRIs), utilizing transfer learning seems likely to be very useful in facilitating the diagnosis of Alzheimer's / Dementia.

<a href="/assets/projects/potential_dementia_FSL_SEG_test_results.png" target="_blank"><img src="/assets/projects/potential_dementia_FSL_SEG_test_results.png" class="img-shadow" style="display: block; margin-left: auto; margin-right: auto;" width="600" alt="Dementia detector CNN using transfer learning"></img></a>
<span style="text-align: center; color: grey; margin-left: auto; margin-right: auto; display: block; width: 80%">There's a command line interface to train and test multi-class or binary classification models.</span>

As the scripts I wrote can also train a multi-level classifier of dementia, it is possible to expand on the analysis and algorithmically determine patterns in dementia progression over time. It may be then possible to reverse-engineer these patterns in simulations for patients' MRIs, potentially leading to a systematic way of detecting signs of dementia very early on. With the integration of tracking user data in individual patient profiles, the software can be used to aid in the treatment, not just the diagnosis, of these disorders.

<a href="/assets/projects/OAS1_0316_MR1_mpr_n4_anon_111_t88_masked_gfc_fseg_tra_90.png" target="_blank"><img src="/assets/projects/OAS1_0316_MR1_mpr_n4_anon_111_t88_masked_gfc_fseg_tra_90.png" class="img-shadow" style="display: block; margin-left: auto; margin-right: auto;" width="400" alt="Dementia detector CNN using transfer learning"></img></a>