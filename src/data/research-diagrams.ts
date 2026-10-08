export interface ResearchDiagram {
  heading: string;
  steps: { title: string; detail: string }[];
  caption: string;
}

// Conceptual summaries of the work, rather than experimental results.
export const researchDiagrams: Record<string, ResearchDiagram> = {
  privtab: {
    heading: "Private adaptation in one forward pass",
    steps: [
      {
        title: "Sensitive rows",
        detail: "A new tabular classification dataset",
      },
      {
        title: "Private summaries",
        detail: "An architectural differential privacy mechanism",
      },
      {
        title: "Predictions",
        detail: "Classification through in-context learning",
      },
    ],
    caption:
      "Pretraining on simulated datasets teaches PrivTab to adapt through compact, provably private summaries.",
  },
  "noise-aware-dpvi": {
    heading: "Accounting for privacy noise in Bayesian inference",
    steps: [
      {
        title: "Private optimisation",
        detail: "Variational inference with differential privacy",
      },
      {
        title: "Noise-aware inference",
        detail: "Account for the privacy perturbation",
      },
      {
        title: "Posterior uncertainty",
        detail: "Evaluate coverage and predictive calibration",
      },
    ],
    caption:
      "The method incorporates privacy noise into approximate Bayesian inference for high-dimensional, non-conjugate models.",
  },
  "privacy-leakage-continual-learning": {
    heading: "The output label space can reveal private information",
    steps: [
      {
        title: "Sensitive labels",
        detail: "Classes encountered in a data stream",
      },
      {
        title: "Output label space",
        detail: "The set of labels exposed by the classifier",
      },
      {
        title: "Privacy protection",
        detail: "Protect label release as well as model learning",
      },
    ],
    caption:
      "When the output label space depends on sensitive data, its release must be included in the privacy analysis.",
  },
  "interpretable-private-continual-learning": {
    heading: "Learning continually with interpretable classifiers",
    steps: [
      {
        title: "Evolving tasks",
        detail: "Learning from a sequence of datasets",
      },
      {
        title: "Prototype classifiers",
        detail: "Represent classes through prototypes",
      },
      {
        title: "Research goal",
        detail: "Combine interpretability with differential privacy",
      },
    ],
    caption:
      "This collaboration studies prototype-based classification for interpretable continual learning under differential privacy.",
  },
};
