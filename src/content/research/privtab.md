---
title: Efficient Provably Private Classification with a Tabular Foundation Model
description: "PrivTab embeds differential privacy within a tabular foundation model, enabling adaptation to sensitive datasets through in-context learning with provably private summaries."
status: preprint
authors: [Talal Alrawajfeh, Cristiana Diaconu, Ossi Räisä, Sebastian Rodriguez Beltran, Yuan He, John Bronskill, Richard E. Turner, Antti Honkela]
venue: arXiv preprint
year: 2026
paperUrl: https://arxiv.org/pdf/2610.10068
arxivUrl: https://arxiv.org/abs/2610.10068
codeUrl: https://github.com/TrustworthyMLHelsinki/PrivTab
tags: [Differential privacy, Tabular foundation models, In-context learning]
featured: true
order: 1
---

Accurate classification of sensitive tabular data requires methods that protect individual records while retaining predictive utility. Conventional differentially private learning incurs dataset-specific optimisation costs and substantial performance degradation at strong privacy levels. Existing tabular foundation models offer rapid adaptation but lack formal privacy guarantees and remain susceptible to membership inference.

We introduce PrivTab, which integrates a differential privacy mechanism into the architecture of a tabular foundation model. Pretraining on simulated datasets enables the model to learn a private adaptation procedure: in-context learning maps sensitive observations to compact summaries with formal privacy guarantees, which support classification on new datasets in a single forward pass.

In the reported experiments, PrivTab achieves higher predictive utility than differentially private linear and neural network baselines under moderate to strong privacy constraints. It exhibits negligible membership leakage, preserves predictive calibration under strong privacy, and reduces dataset fitting time by a factor of 10,000.

Shared as an [arXiv preprint](https://arxiv.org/abs/2610.10068) on 7 October 2026.
