---
title: What Does a Machine-Checked Proof Actually Verify?
description: Limits of Formal Verification and Autoformalization
publishedAt: 2026-10-26
tags: [Mathematics, Formal verification, Lean, Autoformalization, Epistemology, Philosophy of mathematics]
draft: false
---

[Original PDF](https://github.com/TalalAlrawajfeh/notes/blob/main/mathematics-formalization/main.pdf) · [LaTeX source](https://github.com/TalalAlrawajfeh/notes/blob/main/mathematics-formalization/main.tex)

## Abstract

Machine-checked proofs provide strong justification for formal derivations, but what lies outside their guarantee? Using Lean as an example, this article distinguishes formal proof checking, theorem proving, and verification of informal mathematics. It examines the challenges and theoretical limits of formalization, including why accepting an LLM-generated proof does not establish that its statement faithfully expresses the intended mathematical claim. It further distinguishes mathematical truth, formal derivability, epistemic justification, and understanding, while examining the assumptions underlying trust in formal verification. Formal verification substantially strengthens mathematical justification by making assumptions explicit and concentrating what must be trusted, without eliminating the need for human judgment or providing absolute epistemic certainty.

## Introduction

In mathematics, **formal verification** encodes statements and proofs in a formal language so that a computer can check whether the proofs follow the rules of the underlying logical system. Proof assistants such as Rocq (formerly Coq) [\[47\]](#ref-rocq) and Lean [\[5\]](#ref-lean) support this process using languages based on **dependent type theory**. In this framework, expressions have types, and types can depend on values. The **Curry–Howard correspondence** connects logic with computation by representing propositions as types and proofs as terms inhabiting those types [\[58\]](#ref-wadler2015). In these type-theoretic systems, checking a proof therefore amounts to checking that the proposed proof term has the type representing the claimed mathematical statement.

<aside class="article-callout" aria-label="The Curry–Howard correspondence">
  <p class="callout-label">The Curry–Howard correspondence</p>
  <div class="correspondence-pairs">
    <span>proposition <span aria-label="corresponds to">↔</span> type</span>
    <span>proof <span aria-label="corresponds to">↔</span> term</span>
  </div>
</aside>

In Lean, a theorem declaration gives a name to a mathematical statement and supplies a proof of it. The statement specifies the variables, assumptions, and conclusion; during an interactive proof, Lean tracks a **goal**, consisting of a target to prove together with the variables and hypotheses currently available. The keyword `by` begins a tactic proof, in which commands called **tactics** introduce assumptions, transform goals, or close them using known proofs. These commands construct a proof term that Lean’s **kernel**, its core proof checker, checks against the declared statement [\[6\]](#ref-lean-tactics).

For a simple example, consider the symmetry of equality:

> **Informal statement.** For any natural numbers $a$ and $b$, if $a=b$, then $b=a$.
>
> **Informal proof.** Assume $a=b$. By symmetry of equality, $b=a$.

In the corresponding Lean proof in Code block [1](#code-equality-symmetry), `Nat` is the type of natural numbers, and `->` denotes implication.

<p class="code-caption" id="code-equality-symmetry">Code block 1. A tactic proof of symmetry of equality.</p>

```lean
theorem equality_symmetry (a b : Nat) : a = b -> b = a := by
  intro h
  apply Eq.symm h
```

What, then, has actually been checked in this example? **Assuming we trust Lean’s kernel**, the guarantee is precise: the constructed proof term establishes the formal statement in Code block [1](#code-equality-symmetry), relative to the definitions and any axioms on which it depends. The kernel does not certify the informal theorem itself or establish that its Lean encoding faithfully captures the intended mathematical meaning [\[32\]](#ref-lean-validation). This marks the limit of the kernel’s guarantee: machine checking establishes the correctness of a proof with respect to an encoded statement, while the correspondence between that statement and the intended theorem remains outside that guarantee. In this elementary example, that correspondence is easy to inspect; in more complex formalizations, it can require substantial mathematical judgment.

Checking that a proof establishes a formal statement, judging whether that statement faithfully expresses the intended claim, and assessing the appropriateness and consistency of its assumptions, definitions, and axioms are distinct tasks [\[40\]](#ref-pollack1998believe), [\[32\]](#ref-lean-validation), [\[30\]](#ref-lean-axioms). We must also justify our trust in the logic, software, and hardware used to check proofs [\[40\]](#ref-pollack1998believe). Formal verification greatly strengthens mathematical justification by making assumptions explicit and narrowing what must be trusted.

## Why Formal Verification Matters

Even outstanding mathematicians can make mistakes, and a convincing argument can survive expert scrutiny while containing a hidden gap. Long proofs and arguments spanning several specialties can make detailed checking demanding [\[24\]](#ref-hales2008formal). As the literature grows, researchers may also rely on earlier results without rechecking every step [\[11\]](#ref-bornmann2021growth), [\[57\]](#ref-voevodsky2014origins).

**Henri Poincaré.** In 1889, Poincaré won King Oscar II’s mathematics prize for a memoir on the three-body problem, concerning the motion of bodies under gravitational attraction. A serious error emerged after the memoir had been printed for *Acta Mathematica*. Printed copies were withdrawn and ordered destroyed, although some survived, and Poincaré was charged printing costs exceeding the prize money [\[22\]](#ref-gray1997poincare). His pioneering work in algebraic topology also required corrections: after Heegaard challenged an argument in *Analysis Situs*, Poincaré revised his treatment in subsequent supplements [\[39\]](#ref-poincare2010topology). These episodes illustrate how geometric intuition can conceal gaps and how definitions and standards of rigor develop as those gaps are exposed.

**Gottlob Frege.** In *Grundgesetze der Arithmetik* (*Basic Laws of Arithmetic*), Basic Law V associated objects with predicates (properties of objects), identifying them exactly when the predicates applied to the same things. Together with the system’s other logical principles, it admitted Russell’s paradox and made the system inconsistent. In 1902, Russell communicated the paradox to Frege, who acknowledged that it undermined his proposed foundation for arithmetic [\[19\]](#ref-frege1997reader). This was a problem with the assumptions themselves: even perfectly checked deductions cannot make an inconsistent collection of axioms consistent [\[32\]](#ref-lean-validation).

**Alfred Kempe.** His 1879 proof of the four-color theorem was widely accepted for eleven years before Heawood exposed an error in 1890. The theorem, which says that four colors suffice to color any planar map so that regions sharing a boundary segment have different colors, was finally proved in 1976, almost a century after Kempe’s attempt [\[13\]](#ref-callahan2023haken).

**Andrew Wiles.** His announced proof of Fermat’s Last Theorem in 1993 contained a gap discovered during scrutiny of the argument. The difficulty was overcome in 1994 through work with Richard Taylor; the completed proof appeared in two papers in 1995 [\[46\]](#ref-ribet1995galois), [\[59\]](#ref-wiles1995modular), [\[53\]](#ref-taylorwiles1995hecke). Finding a gap need not invalidate the underlying theorem, but the claimed conclusion still requires a complete argument.

**Vladimir Voevodsky.** Errors in his own published work, including a lemma whose mistake survived years of use, motivated his search for dependable computer verification [\[57\]](#ref-voevodsky2014origins). He developed **univalent foundations**, an approach to foundations connecting type theory with homotopy theory, the study of spaces through continuous deformation. This work helped shape **homotopy type theory** (HoTT), alongside contributions from other researchers [\[7\]](#ref-awodeycoquand2013univalent). He also cofounded and helped develop UniMath, a library of formalized mathematics based on univalent ideas for Coq, now called Rocq [\[56\]](#ref-voevodsky-unimath), [\[47\]](#ref-rocq).

Formal verification offers a way to check each inference against explicit rules and assumptions, rather than relying entirely on a reader’s ability to reconstruct the reasoning [\[24\]](#ref-hales2008formal). Formal libraries support repeated checking and reuse of explicit definitions, assumptions, and proof dependencies [\[7\]](#ref-awodeycoquand2013univalent). Human judgment remains essential for choosing statements and assessing their meaning [\[32\]](#ref-lean-validation).

## The Challenges of Formalization

Formalization is difficult because ordinary mathematical writing leaves many details implicit: the domains of variables, background assumptions, definitions, and intermediate reasoning steps. A formal development must make these details precise, express them using suitable representations, and connect them to the definitions and lemmas available in a proof assistant’s library. Large formalization projects can consequently require years of specialist work [\[60\]](#ref-wu2022autoformalization).

The difficulties fall into two groups: problems in the informal mathematics itself, and problems in translating it faithfully into a formal language. This distinction matters because a proof assistant checks the encoded statement, while its correspondence to the intended informal claim requires separate scrutiny [\[32\]](#ref-lean-validation). We consider these two groups before turning to how large language models can assist with formalization and proof construction.

### Problems in Informal Language and Mathematics

1.  **Ambiguity and context dependence.** The meaning of an informal statement can depend on conventions and context that are never stated explicitly [\[20\]](#ref-ganesalingam2013language). For example, “$f$ is increasing” can mean either $f(x)<f(y)$ or $f(x)\leq f(y)$ whenever $x<y$. A constant function satisfies the second interpretation but not the first. Without knowing the intended convention, there is no uniquely determined formal translation.

2.  **Self-reference and semantic paradoxes.** Natural language permits semantic self-reference, as in the liar paradox: “This sentence is not true.” If the sentence is true, then it is not true; if it is not true, then what it says holds, making it true [\[52\]](#ref-tarski1944truth).

3.  **Implicit reasoning and omitted derivations.** Omitted steps can be harmless when readers can reconstruct them, but words such as “clearly” may also hide an unjustified inference [\[18\]](#ref-fallis2003gaps). Fermat’s marginal note gives an extreme example: it announced a proof but left the argument unstated [\[54\]](#ref-fermat-margin). Wiles’s proof used deep results about elliptic curves and modular forms [\[59\]](#ref-wiles1995modular). Formalization must supply or reconstruct missing reasoning, rather than merely translate the available words.

4.  **Implicit assumptions and undefined objects.** An informal argument may introduce an object whose existence needs justification. For example, “Let $m$ be the largest element of a nonempty bounded set $S$ of real numbers” assumes such an element exists. But $S=(0,1)$ has no largest element: for every $x\in S$, $(x+1)/2$ is a larger element of $S$. The gap lies in the informal argument itself, before any translation.

### Semantic Faithfulness and Verification Pitfalls

Even when an informal statement is clear, its translation can change its meaning. A formal statement may be well formed and provable while expressing a different claim from the one intended; this is the **faithfulness problem** [\[36\]](#ref-faithfulness-gap2026). Code can compile successfully while expressing a different mathematical claim from the original [\[61\]](#ref-beyond-compilation2026). The following examples illustrate several ways this can go wrong.

1.  **Undecidability of arbitrary logical consequences.** **Church’s theorem** states that no algorithm can always decide whether an arbitrary first-order formula is valid, meaning true under every interpretation [\[14\]](#ref-church1936entscheidungsproblem). For first-order assumptions $H_1,\ldots,H_k$ and a conclusion $C$, deciding whether the conclusion follows means deciding the validity of

    $$
    (H_1\land\cdots\land H_k)\to C.
    $$

    Thus, no automatic tool can be guaranteed to settle every omitted reasoning step, even though it can check a supplied formal proof.

2.  **Changed domains, quantifiers, or conclusions.** Replacing $\mathbb{Z}$ with $\mathbb{N}$ changes which objects a theorem covers. For example, proving $n^2\geq 0$ for natural numbers leaves out every negative integer if the original claim concerned all integers. Changing the order of quantifiers can be even more drastic: “for every integer $x$, there is an integer $y$ with $x+y=0$” is true, but “there is an integer $y$ such that $x+y=0$ for every integer $x$” is false. A proof of one statement cannot certify a translation of the other [\[36\]](#ref-faithfulness-gap2026).

3.  **A formal object that differs from the intended mathematical object.** Lean’s standard `Set` describes collections whose elements all have a fixed type $\alpha$, using a membership predicate $\alpha\to\mathrm{Prop}$ that expresses whether each element belongs to the set [\[35\]](#ref-mathlib-set-defs). An informal collection such as $\{1,\{2,3\}\}$ cannot be represented directly as `Set Nat`: one member is a number and the other is a set. Representing both requires a common type or a different encoding, such as mathlib’s `ZFSet` for set theory [\[34\]](#ref-mathlib-zfc). Thus, translating the word “set” requires choosing a representation that preserves the intended objects and membership relation [\[32\]](#ref-lean-validation).

4.  **Operations with different meanings.** Even when a type represents the intended objects, its operations may behave differently from the informal ones. In Lean, natural-number subtraction stops at zero: `(2 : Nat) - 3` equals zero, whereas `(2 : Int) - 3` equals $-1$ [\[31\]](#ref-lean-naturals). A formal operation may also return a default where the informal operation is undefined: an encoding of “the least natural number satisfying $P$” can return a value even when no such number exists. A proof about that value does not prove that a number satisfying $P$ exists [\[8\]](#ref-lost-in-translation2026).

5.  **Contradictory assumptions and vacuous truth.** A mistranslation can introduce assumptions that no object satisfies. From contradictory assumptions, Lean can correctly derive any conclusion, including the apparent absurdity in Code block [2](#code-vacuous-theorem).

    <p class="code-caption" id="code-vacuous-theorem">Code block 2. A valid conditional theorem with impossible assumptions.</p>

    ```lean
    theorem silly_theorem
        (n : Nat)
        (h1 : n = 0)
        (h2 : n = 1) :
        2 + 2 = 5 := by
      have h : (0 : Nat) = 1 := h1.symm.trans h2
      have impossible : False := Nat.zero_ne_one h
      exact False.elim impossible
    ```

    The assumptions imply $0=1$, so no natural number can satisfy them together. Lean has checked that *if* both assumptions held, the conclusion would follow; it has not proved the unconditional claim $2+2=5$.

6.  **Assuming the result, openly or indirectly.** Adding $P$ as an assumption when the task is to prove $P$ makes the proof immediate, but establishes only $P\to P$. The assumption can also be hidden inside a structure or type class, as in Code block [3](#code-hidden-assumption).

    <p class="code-caption" id="code-hidden-assumption">Code block 3. A type-class parameter that already supplies the conclusion.</p>

    ```lean
    class HasConclusion (P : Prop) : Prop where
      proof : P

    theorem hidden_assumption (P : Prop)
        [h : HasConclusion P] : P := by
      exact h.proof
    ```

    The parameter `[h : HasConclusion P]` already supplies a proof of $P$, which `exact h.proof` retrieves. Declaring `axiom h : P`, directly or in an imported file, similarly makes $P$ available without proving it. The kernel checks subsequent proofs relative to that axiom, without establishing its truth [\[32\]](#ref-lean-validation).

7.  **Silently repairing the input.** A system may change an incorrect input into something provable instead of preserving the claim being checked [\[15\]](#ref-faithformbench2026). For example, “Every prime number is odd” is false because $2$ is prime and even. A model could silently add “greater than $2$” and prove the revised statement. That proof would be valid, but would not confirm the original claim.

8.  **Verification loopholes and additional trust.** An evaluation system can mistake an unfinished proof for a success, as happened with a Lean `apply?` bug fixed in version 4.20.0 [\[29\]](#ref-lean-apply-fix). Other methods require additional trust: `native_decide` checks a claim by compiling and running code, so its reliability also depends on the compiler and runtime [\[32\]](#ref-lean-validation). Rocq likewise documents assumptions about primitive operations, visible through `Print Assumptions` [\[49\]](#ref-rocq-primitives).

    <blockquote class="article-callout">
      <p class="callout-label">Verification loopholes</p>
      <p>“provers will find and exploit any verification loophole that increases reward.”</p>
      <p class="quote-source">Source: <a href="#ref-formal-benchmarking2026">[2]</a></p>
    </blockquote>

9.  **Theoretical limits of automatic faithfulness checking.** A translation may require checking whether an implicitly defined object exists. For example, “let $m$ be the least natural number $n$ for which $P(n,x_1,\ldots,x_k)=0$ has no natural-number solution” assumes that such an $n$ exists. In the Turing-machine framework for these binary decision problems, the **Solvability Complexity Index** $\mathrm{SCI}_{\mathrm A}$ counts the nested algorithmic limits needed to solve the problem. The **halting problem**, deciding whether a program halts on a given input, has $\mathrm{SCI}_{\mathrm A}=1$ in this setting. For the constructed polynomial family with $k\geq9$, adding alternating quantifiers yields level-$l$ existence problems with $\mathrm{SCI}_{\mathrm A}=l$ for every $l\geq2$; the combined problem across all levels has $\mathrm{SCI}_{\mathrm A}=\infty$ [\[8\]](#ref-lost-in-translation2026). These classifications concern that family and computational setting, not all informal proof verification. Adding “assume $m$ exists” avoids deciding existence, but leaves it unproved.

Three tasks must therefore be distinguished. **Formal proof checking** takes a fixed formal statement and a proposed formal proof and checks whether the proof establishes the statement. **Formal theorem proving** takes a fixed formal statement and searches for a proof. **Informal mathematical verification** additionally requires interpreting the statement or argument, justifying omitted assumptions and reasoning, translating faithfully when needed, and assessing whether the argument establishes the intended claim [\[25\]](#ref-hamami2022rigor), [\[32\]](#ref-lean-validation). This third task includes semantic and interpretive difficulties absent from ordinary kernel checking: ambiguity, context dependence, and semantic self-reference affect interpretation, while implicit assumptions and omitted reasoning require additional justification [\[20\]](#ref-ganesalingam2013language), [\[52\]](#ref-tarski1944truth). Church’s theorem limits deciding arbitrary first-order validity, and the SCI bounds above constrain specific existence-presupposition problems [\[14\]](#ref-church1936entscheidungsproblem), [\[8\]](#ref-lost-in-translation2026). These results apply to specific formal problems; they do not establish a general measure of difficulty for verifying informal mathematical arguments. A universal informal-proof verifier therefore cannot simply be identified with a sufficiently powerful Lean theorem prover: semantic faithfulness remains an additional requirement [\[61\]](#ref-beyond-compilation2026), [\[36\]](#ref-faithfulness-gap2026).

### LLM-Assisted Proof and Autoformalization

**Large language models** (LLMs) are neural networks trained on large collections of text, often including mathematical writing and computer code [\[12\]](#ref-brown2020language). For autoregressive models, a central pretraining objective is **next-token prediction**: estimating the probability of the next token, a unit such as a word fragment or punctuation mark, given the preceding tokens. By repeatedly predicting tokens, the model can generate a continuation of a prompt. In statistical terms, training fits an approximate probability distribution over text sequences, learning patterns from the training data that can generalize to new sequences [\[9\]](#ref-bengio2003neural), [\[12\]](#ref-brown2020language).

LLMs offer a way to reduce the work of formalization by proposing formal statements from informal descriptions and suggesting proof steps that can then be checked by the proof assistant [\[60\]](#ref-wu2022autoformalization), [\[41\]](#ref-polu2020generative). The automatic translation of informal mathematics into a formal language is called **autoformalization**. In proof generation, the formal statement can be fixed in advance; in autoformalization, the model also proposes the statement whose meaning must be checked.

**Theorem verification** and **proof verification** must also be distinguished: establishing a claim differs from checking whether a particular argument establishes it. An LLM might correctly formalize a theorem but replace an incorrect informal proof with a valid formal one. Kernel acceptance then certifies the replacement proof, not the original reasoning [\[32\]](#ref-lean-validation).

Figure [1](#llm-formalization-process) illustrates this process, with the outline marking the scope of formal proof checking.

<figure class="proof-process" id="llm-formalization-process">
  <div class="process-flow" aria-label="LLM-assisted formalization and proof checking">
    <div class="process-input">
      <div class="process-step">Informal mathematical statement<br />with or without proof</div>
      <span class="process-arrow" aria-hidden="true">→</span>
      <div class="process-step">LLMs</div>
    </div>
    <span class="process-arrow" aria-hidden="true">→</span>
    <div class="process-scope">
      <p class="callout-label">Scope of formal proof checking</p>
      <div class="process-checked">
        <div class="process-step">Formal statements / proofs</div>
        <span class="process-arrow" aria-hidden="true">→</span>
        <div class="process-step">Lean kernel</div>
        <span class="process-arrow" aria-hidden="true">→</span>
        <div class="process-step">Proof accepted / rejected</div>
      </div>
    </div>
  </div>
  <figcaption>Figure 1. LLM-assisted formalization and proof checking. Acceptance concerns the formal proof relative to the encoded statement and its assumptions; rejection does not imply that the theorem is false. Formal statements and proof terms are inputs to be checked; the guarantee depends on the correctness of the kernel and its execution. Faithfulness to the informal mathematics remains outside the kernel’s guarantee.</figcaption>
</figure>

The challenges in [Section 3.2](#semantic-faithfulness-and-verification-pitfalls) therefore remain central to LLM-assisted work. A model can produce code that compiles, and even a completed proof, while changing the intended theorem [\[61\]](#ref-beyond-compilation2026), [\[36\]](#ref-faithfulness-gap2026). It may silently repair an incorrect input instead of preserving the error that verification was meant to detect [\[15\]](#ref-faithformbench2026). If success is rewarded solely on the basis of an acceptance signal, weakened statements, hidden assumptions, and verification loopholes can also be mistaken for genuine progress [\[2\]](#ref-formal-benchmarking2026). Feedback from a proof assistant helps construct valid formal proofs, but does not by itself establish faithful translation or resolve the general limits on checking implicit existence claims [\[8\]](#ref-lost-in-translation2026).

There are further reasons why LLMs offer no general guarantee of overcoming these challenges. The next-token prediction objective rewards fitting the training text, rather than directly certifying mathematical truth or faithful translation [\[9\]](#ref-bengio2003neural), [\[12\]](#ref-brown2020language). Thus, a high probability assigned to an output is not a proof of its correctness. Training on checked proofs can improve proof generation, but generated candidates still require verification [\[41\]](#ref-polu2020generative).

Missing context also limits what a model can infer. If “$f$ is increasing” is compatible with both strict and non-strict interpretations, and no context distinguishes them, selecting the more familiar convention cannot establish which meaning was intended. More generally, aligning informal concepts with a formal library requires choosing the relevant definitions and supplying implicit assumptions; these choices can fail even when the generated syntax is correct [\[60\]](#ref-wu2022autoformalization).

Finally, finding a proof is a search problem, distinct from checking a supplied proof. Model-guided search explores candidate steps under limits on computation and the number of attempts, so it can miss an existing proof [\[41\]](#ref-polu2020generative). Exhausting that search budget does not show that the statement is false. At a more fundamental level, Church’s theorem rules out an always-terminating, always-correct decision procedure for arbitrary first-order validity, including one implemented using an LLM running as an ordinary computer program [\[14\]](#ref-church1936entscheidungsproblem). This limit permits success on many individual problems, but rules out a universal guarantee of deciding them all.

## The Epistemology of Mathematical Truth

Philosophy examines fundamental questions about reality, reasoning, and knowledge; **epistemology** concerns what we can know and what justifies our claims to know it. Here, **absolute epistemic certainty** means the strongest Cartesian standard: justification that leaves no possibility of error, even under radical skeptical doubt. Its model is the immediate certainty of present self-consciousness: I am conscious of thinking or doubting now, and the very attempt to doubt this is itself an instance of conscious thought [\[17\]](#ref-descartes1996meditations). This standard concerns the reliability of our grounds for belief, not merely how strongly convinced we feel [\[42\]](#ref-reed2022certainty).

### Truth and Formal Derivability

A mathematical statement’s truth is distinct from our belief that it is true and from the grounds supporting that belief. The claim here is not that mathematical truth is probabilistic or indeterminate, but that finite, fallible human reasoners must assess proofs, specifications, logical systems, and physical verification processes. For example, discovering a gap in a proof need not make the theorem false; it shows that the proposed argument has not established it. Our judgments about proofs, definitions, and assumptions remain fallible, meaning that we can have reasons for accepting a claim and still be mistaken [\[27\]](#ref-lakatos1976proofs), [\[16\]](#ref-detoffoli2024price). On one fallibilist account, mathematical justification can rest on **simil-proofs**: arguments that meet a mathematical community’s standards, are accepted by appropriately trained readers, and face no serious criticism, yet may contain substantial errors [\[16\]](#ref-detoffoli2024price). This separates having good reasons to accept an argument from its actually being correct.

**Metaphysics** investigates fundamental questions about reality, including existence, identity, and causation. **Ontology** is the part of metaphysics concerned with what exists and what kinds of entities there are [\[55\]](#ref-vaninwagen2025metaphysics). In the philosophy of mathematics, ontological questions include whether numbers and sets exist and whether they are independent of human thought [\[33\]](#ref-linnebo2024platonism), [\[26\]](#ref-horsten2026mathematics). These questions about existence are related to, but distinct from, questions about the meaning and truth of mathematical statements [\[33\]](#ref-linnebo2024platonism).

**Mathematical Platonism** treats mathematical objects as abstract and independent of our thought, allowing a proposition to have an objective truth independently of whether humans have proved it [\[33\]](#ref-linnebo2024platonism). **Structuralist approaches** emphasize positions and relations within structures; **formalist approaches** emphasize formal systems and symbolic reasoning [\[26\]](#ref-horsten2026mathematics). **Nominalist approaches** seek to explain mathematics without assuming that numbers and sets exist as abstract objects [\[26\]](#ref-horsten2026mathematics). For example, a nominalist can accept that there are two apples without accepting a separate abstract object called “the number two.” Some **idealist approaches** give thought an essential role in what mathematical objects are, rather than treating them as wholly independent of thought [\[23\]](#ref-guyer2026idealism). These views offer different interpretations of formal mathematics, but checking a proof does not settle which interpretation is correct.

In particular, a Platonist can distinguish

$$
P\text{ is true},\qquad F\vdash P,\qquad \text{we are justified in believing }P.
$$

The first concerns truth, the second derivability in a specified formal framework $F$ ($F\vdash P$, meaning that $P$ follows from the formal assumptions collected in $F$), and the third our grounds for belief [\[40\]](#ref-pollack1998believe), [\[16\]](#ref-detoffoli2024price). If the axioms of $F$ are true of the objects we intend to describe, and its rules take true premises to true conclusions, then a formal proof of $P$ establishes its truth for those objects [\[30\]](#ref-lean-axioms). Limitations in our justification for accepting a mathematical statement do not, by themselves, imply that the statement lacks a definite truth value. Here, the question is what justifies our confidence in mathematical results; we can examine this without settling whether mathematical objects exist independently of human thought.

### Rigor and Mathematical Understanding

The relation between rigor and formality is itself a subject of philosophical debate. According to the **standard view**, an informal proof is rigorous if its reasoning can be expanded into a formal proof through routine steps. The formal version need not already have been written [\[25\]](#ref-hamami2022rigor). An alternative, **rigor pluralism**, holds that no single account captures all aspects of rigor. Different accounts explain how proofs establish conclusions, how they answer questions and objections, and how they guide readers through mathematical steps [\[51\]](#ref-tanswell2024rigour).

Justification also differs from **understanding**. Checking every inference can establish that an argument is correct without revealing why its strategy works or how to use its ideas elsewhere. Understanding involves mathematical abilities such as recognizing relevant structures and applying appropriate results [\[3\]](#ref-avigad2008understanding). An acceptance signal alone does not establish that the person or AI system supplying the proof understands the mathematics [\[37\]](#ref-murayama2026understanding). Formalization can nevertheless deepen understanding by exposing a proof’s structure and details [\[16\]](#ref-detoffoli2024price). In the Liquid Tensor Experiment, formalization led to a more elementary construction and revealed a key reduction from a non-convex problem over the reals to a convex problem over the integers [\[50\]](#ref-scholze2021liquid). Such insight arises during proof development, both formally and informally.

Brand Blanshard’s account in *The Nature of Thought* offers one way to develop this distinction: understanding involves grasping something within an intelligible system of relations [\[10\]](#ref-blanshard1939thought), vol. II, ch. XVIII, p. 33. For mathematics, this suggests asking how a proposition relates to surrounding concepts and why those connections explain it. His broader philosophy associates coherence and intelligibility with an idealist metaphysics in which reality itself is understood through thought [\[23\]](#ref-guyer2026idealism). The relevance of this account does not require accepting Blanshard’s stronger idealist metaphysics; the narrower point is that proof certification and mathematical understanding answer different epistemic questions. This is a philosophical perspective on understanding, rather than a universally accepted account of it.

**Shareability**, the possibility of communicating an argument to other appropriately trained readers, connects understanding with communal scrutiny. Linking readable exposition to formal details can let readers inspect an argument at different levels and may support both learning and checking [\[16\]](#ref-detoffoli2024price).

### Logical Frameworks and Their Limits

A separate question concerns **standards of proof**: which inferential principles count as legitimate mathematical reasoning? A machine-checked proof is relative to a specified logical framework, and foundational traditions can disagree about allowed principles [\[26\]](#ref-horsten2026mathematics). These disagreements make specifying $F$ in $F\vdash P$ essential to stating the guarantee precisely; they do not make proof assistants arbitrary or unreliable.

**Intuitionistic mathematics** illustrates how the choice of framework affects the accepted rules of proof. Some proof assistants have roots in **constructive mathematics**, where proving existence normally requires constructing a witness and proving a disjunction requires establishing one of its alternatives. Their underlying logic does not automatically assume the **law of excluded middle**, $P\lor\neg P$, for every proposition $P$ [\[4\]](#ref-lean-axioms-computation). **Classical reasoning** can be added explicitly: Rocq provides excluded middle as an axiom in its classical library, while Lean derives it from its standard classical axioms [\[48\]](#ref-rocq-classical), [\[4\]](#ref-lean-axioms-computation). It supports proving $P$ by deriving a contradiction from $\neg P$; proving $\neg P$ by deriving a contradiction from $P$ is already constructive [\[5\]](#ref-lean). Constructivist traditions thus connect views about mathematical objects and knowledge with the rules of proof [\[26\]](#ref-horsten2026mathematics).

Verifying that a proof follows the rules of a formal system does not establish that the system’s underlying axioms are consistent. Gödel’s second incompleteness theorem shows that a consistent, effectively axiomatized formal system sufficiently expressive to formalize elementary arithmetic cannot prove its own consistency under the standard formalization [\[21\]](#ref-godel1931incompleteness). This limitation does not undermine the reliability of formal proof verification; rather, it clarifies what such verification establishes. In particular, it highlights the distinction between proving $F\vdash P$, which establishes that $P$ is derivable within $F$, and the metatheoretic question of whether $F$ is consistent and whether its axioms and interpretation are justified.

### Trust and the Regress of Justification

Machine verification provides strong justification that a formal statement follows from specified rules, definitions, and axioms [\[32\]](#ref-lean-validation). However, interpreting this result as knowledge of the intended mathematical claim requires confidence that the formal specification faithfully captures the intended meaning and that the underlying logic and axioms are justified. It also requires trust in the **verification stack**, including the software and hardware responsible for checking the proof [\[40\]](#ref-pollack1998believe). This trust can be largely concentrated in a small proof-checking kernel, although certain features, such as native execution, may introduce additional trusted components [\[28\]](#ref-lean-faq).

Interpreting a checked theorem requires inspecting its statement, assumptions, and the definitions on which that statement depends, including definitions used within those definitions [\[40\]](#ref-pollack1998believe). The interface matters too: the displayed formula must faithfully represent the internal expression that the checker accepted [\[40\]](#ref-pollack1998believe). Even a verified implementation of the stack establishes correctness relative to a model of the hardware; whether the physical machine behaves according to that model remains an empirical question [\[40\]](#ref-pollack1998believe).

If a checker $C_1$ accepts a proof and another system $C_2$ verifies the correctness of $C_1$, the question remains of what justifies our confidence in $C_2$, its specification, and the software and hardware on which it depends. This illustrates the **epistemic regress of justification**: each justification may itself require further justification, potentially leading to an infinite chain [\[38\]](#ref-olsson2025coherence). Independent proof checkers, formally verified kernels, and small **trusted computing bases** (the components whose correctness must be assumed) can strengthen confidence by reducing and making explicit the assumptions on which verification depends [\[28\]](#ref-lean-faq), [\[1\]](#ref-abrahamsson2025candle). Reproducible builds allow independent parties to recreate identical binaries from specified source code and build conditions, making this step inspectable without establishing the correctness of the source code [\[43\]](#ref-reproducible-builds).

Two familiar responses to this regress offer different accounts of **epistemic justification**, that is, what makes a belief justified. **Foundationalism** holds that justification ultimately rests on basic beliefs whose justification does not depend on other beliefs. **Coherentism**, by contrast, understands justification in terms of the coherence and mutual support of beliefs within a broader system [\[38\]](#ref-olsson2025coherence). Neither position necessarily entails infallibility: **fallibilism** recognizes that even well-justified beliefs may turn out to be mistaken. These epistemological positions concern the justification of mathematical knowledge rather than the ontological status of mathematical objects. They are therefore not mutually exclusive with positions in the philosophy of mathematics; for example, a mathematical Platonist may also adopt a coherentist account of justification.

Nicholas Rescher treats coherence as a criterion for determining which beliefs are rationally justified, while distinguishing the justification of beliefs from the question of their truth [\[44\]](#ref-rescher1973coherence). His pragmatic approach further emphasizes that inquiry operates through the conceptual and methodological resources available to us [\[45\]](#ref-rescher2001pragmatism). Applied to formal verification, this perspective suggests that confidence can be strengthened through multiple mutually reinforcing sources of evidence, even when no single verification procedure provides absolute certainty. This epistemological perspective does not require adopting Blanshard’s idealist metaphysics.

Foundationalism and coherentism offer two ways to interpret trust in formal verification. A small trusted kernel and accepted logical principles provide practical stopping points for checking. At the same time, independent checkers, formal semantics, specification review, verified compilers, reproducible builds, and confidence in the underlying hardware provide complementary sources of justification [\[32\]](#ref-lean-validation), [\[1\]](#ref-abrahamsson2025candle), [\[43\]](#ref-reproducible-builds). These measures address different sources of uncertainty: independent checkers can help detect implementation errors, while specification review helps establish that the formal statement faithfully captures the intended mathematical claim [\[32\]](#ref-lean-validation), [\[28\]](#ref-lean-faq). Nevertheless, shared assumptions and systematic errors may remain undetected. Together, these practical foundations and mutually reinforcing forms of evidence can substantially strengthen confidence in formal verification without eliminating all uncertainty or definitively resolving the regress of justification.

## Discussion and Conclusion

Formal verification lets a computer check each step of a formal proof against explicit rules and assumptions. If the proof checker and the software and hardware running it work correctly, acceptance establishes that the formal statement follows from those assumptions [\[32\]](#ref-lean-validation), [\[28\]](#ref-lean-faq). We must still judge whether the statement captures the intended theorem and whether its axioms and rules of reasoning are justified [\[40\]](#ref-pollack1998believe).

These distinctions are especially important when LLMs generate statements and proofs. A model may prove a different theorem from the one intended or replace faulty informal reasoning with a valid formal proof. Checking its output therefore does not automatically validate the original statement or argument [\[32\]](#ref-lean-validation). Acceptance also does not show that the model understands the mathematics, although formalization can help people develop that understanding [\[37\]](#ref-murayama2026understanding), [\[16\]](#ref-detoffoli2024price). A verification claim should therefore state what was proved, which assumptions it uses, and how the proof was checked.

**Formal verification can greatly strengthen mathematical justification without providing absolute epistemic certainty.**

## References

1. <a id="ref-abrahamsson2025candle"></a> Oskar Abrahamsson, Magnus O. Myreen, Ramana Kumar, and Thomas Sewell. Candle: A verified implementation of HOL Light (extended version). *Journal of Automated Reasoning*, 69(4), 2025. Article 32. <https://doi.org/10.1007/s10817-025-09743-8>.

2. <a id="ref-formal-benchmarking2026"></a> Pawan Sasanka Ammanamanchi, Siddharth Bhat, and Stella Biderman. Faults in our formal benchmarking: Dataset defects and evaluation failures in Lean theorem proving. In *Proceedings of the 43rd International Conference on Machine Learning*, volume 306 of *Proceedings of Machine Learning Research*, pages 2431–2462. PMLR, 2026. <https://proceedings.mlr.press/v306/ammanamanchi26a.html>.

3. <a id="ref-avigad2008understanding"></a> Jeremy Avigad. Understanding proofs. In Paolo Mancosu, editor, *The Philosophy of Mathematical Practice*, pages 317–353. Oxford University Press, 2008. <https://doi.org/10.1093/acprof:oso/9780199296453.003.0013>.

4. <a id="ref-lean-axioms-computation"></a> Jeremy Avigad, Leonardo de Moura, Soonho Kong, and Sebastian Ullrich. Theorem proving in Lean 4: Axioms and computation.

    <https://lean-lang.org/theorem_proving_in_lean4/Axioms-and-Computation/>. Accessed October 25, 2026.

5. <a id="ref-lean"></a> Jeremy Avigad, Leonardo de Moura, Soonho Kong, and Sebastian Ullrich. Theorem proving in Lean 4: Propositions and proofs.

    <https://lean-lang.org/theorem_proving_in_lean4/Propositions-and-Proofs/>. Accessed October 25, 2026.

6. <a id="ref-lean-tactics"></a> Jeremy Avigad, Leonardo de Moura, Soonho Kong, and Sebastian Ullrich. Theorem proving in Lean 4: Tactics. <https://lean-lang.org/theorem_proving_in_lean4/Tactics/>. Accessed October 25, 2026.

7. <a id="ref-awodeycoquand2013univalent"></a> Steve Awodey and Thierry Coquand. Univalent foundations and the large-scale formalization of mathematics. Institute for Advanced Study, 2013.

    <https://www.ias.edu/ideas/2013/awodey-coquand-univalent-foundations>.

8. <a id="ref-lost-in-translation2026"></a> Alexander Bastounis, Fabian Circelli, and Anders C. Hansen. Navier–Stokes lost in translation: Why Lean verification of AI autoformalisation does not guarantee correct natural language proofs. arXiv:2610.08144, version 1, 2026. For the SCI classification, see Appendix A, Theorem A.4, Corollary A.5, and Section A.2.1. <https://arxiv.org/abs/2610.08144v1>.

9. <a id="ref-bengio2003neural"></a> Yoshua Bengio, Réjean Ducharme, Pascal Vincent, and Christian Jauvin. A neural probabilistic language model. *Journal of Machine Learning Research*, 3:1137–1155, 2003. <https://jmlr.org/papers/v3/bengio03a.html>.

10. <a id="ref-blanshard1939thought"></a> Brand Blanshard. *The Nature of Thought*, volume 2. George Allen & Unwin, London, 1939.

11. <a id="ref-bornmann2021growth"></a> Lutz Bornmann, Robin Haunschild, and Rüdiger Mutz. Growth rates of modern science: A latent piecewise growth curve approach to model publication numbers from established and new literature databases. *Humanities and Social Sciences Communications*, 8, 2021. Article 224. <https://doi.org/10.1057/s41599-021-00903-w>.

12. <a id="ref-brown2020language"></a> Tom B. Brown, Benjamin Mann, Nick Ryder, Melanie Subbiah, Jared Kaplan, Prafulla Dhariwal, Arvind Neelakantan, Pranav Shyam, Girish Sastry, Amanda Askell, Sandhini Agarwal, Ariel Herbert-Voss, Gretchen Krueger, Tom Henighan, Rewon Child, Aditya Ramesh, Daniel M. Ziegler, Jeffrey Wu, Clemens Winter, Christopher Hesse, Mark Chen, Eric Sigler, Mateusz Litwin, Scott Gray, Benjamin Chess, Jack Clark, Christopher Berner, Sam McCandlish, Alec Radford, Ilya Sutskever, and Dario Amodei. Language models are few-shot learners. In *Advances in Neural Information Processing Systems*, volume 33, pages 1877–1901, 2020.

    <https://proceedings.neurips.cc/paper/2020/hash/1457c0d6bfcb4967418bfb8ac142f64a-Abstract.html>.

13. <a id="ref-callahan2023haken"></a> Patrick Callahan, Ilya Kapovich, Marc Lackenby, Peter Shalen, and Robin Wilson. Wolfgang Haken, 1928–2022. *Notices of the American Mathematical Society*, 70(9):1452–1467, 2023. See the section “The Four Color Theorem” by Robin Wilson. <https://doi.org/10.1090/noti2781>.

14. <a id="ref-church1936entscheidungsproblem"></a> Alonzo Church. A note on the Entscheidungsproblem. *The Journal of Symbolic Logic*, 1(1):40–41, 1936. <https://doi.org/10.2307/2269326>.

15. <a id="ref-faithformbench2026"></a> Rob Cornish, Iacopo Ghinassi, Po-Hung Yeh, Shuqi Liu, Qiyuan Xu, Haoxuan Yin, Dominik Wagner, Wenda Li, Yee Whye Teh, and Luke Ong. FaithformBench: Benchmarking faithfulness of mathematical chain-of-thought autoformalisation. arXiv:2608.10916, 2026. <https://arxiv.org/abs/2608.10916>.

16. <a id="ref-detoffoli2024price"></a> Silvia De Toffoli. Proofs for a price: Tomorrow’s ultra-rigorous mathematical culture. *Bulletin of the American Mathematical Society*, 61(3):395–410, 2024. <https://doi.org/10.1090/bull/1823>.

17. <a id="ref-descartes1996meditations"></a> René Descartes. *Meditations on First Philosophy: With Selections from the Objections and Replies*. Cambridge University Press, 1996. Translated and edited by John Cottingham. See the Second Meditation. Originally published in 1641. <https://doi.org/10.1017/CBO9780511805028>.

18. <a id="ref-fallis2003gaps"></a> Don Fallis. Intentional gaps in mathematical proofs. *Synthese*, 134(1–2):45–69, 2003. <https://doi.org/10.1023/A:1022131513275>.

19. <a id="ref-frege1997reader"></a> Gottlob Frege. *The Frege Reader*. Blackwell Publishers, 1997. Edited by Michael Beaney. Includes Frege’s letter to Russell of June 22, 1902, and selections from *Grundgesetze der Arithmetik*.

20. <a id="ref-ganesalingam2013language"></a> Mohan Ganesalingam. *The Language of Mathematics: A Linguistic and Philosophical Investigation*, volume 7805 of *Lecture Notes in Computer Science*. Springer, 2013. <https://doi.org/10.1007/978-3-642-37012-0>.

21. <a id="ref-godel1931incompleteness"></a> Kurt Gödel. Über formal unentscheidbare sätze der Principia Mathematica und verwandter systeme I. *Monatshefte für Mathematik und Physik*, 38:173–198, 1931. <https://doi.org/10.1007/BF01700692>.

22. <a id="ref-gray1997poincare"></a> Jeremy Gray. Poincaré in the archives: Two examples. *Philosophia Scientiae*, 2(3):27–39, 1997. <https://www.numdam.org/item/PHSC_1997__2_3_27_0/>.

23. <a id="ref-guyer2026idealism"></a> Paul Guyer and Rolf-Peter Horstmann. Idealism. In Edward N. Zalta and Uri Nodelman, editors, *The Stanford Encyclopedia of Philosophy*. Metaphysics Research Lab, Stanford University, 2026. Summer 2026 edition. <https://plato.stanford.edu/archives/sum2026/entries/idealism/>.

24. <a id="ref-hales2008formal"></a> Thomas C. Hales. Formal proof. *Notices of the American Mathematical Society*, 55(11):1370–1380, 2008. <https://www.ams.org/notices/200811/tx081101370p.pdf>.

25. <a id="ref-hamami2022rigor"></a> Yacin Hamami. Mathematical rigor and proof. *The Review of Symbolic Logic*, 15(2):409–449, 2022. First published online in 2019. <https://doi.org/10.1017/S1755020319000443>.

26. <a id="ref-horsten2026mathematics"></a> Leon Horsten. Philosophy of mathematics. In Edward N. Zalta and Uri Nodelman, editors, *The Stanford Encyclopedia of Philosophy*. Metaphysics Research Lab, Stanford University, 2026. Summer 2026 edition. <https://plato.stanford.edu/archives/sum2026/entries/philosophy-mathematics/>.

27. <a id="ref-lakatos1976proofs"></a> Imre Lakatos. *Proofs and Refutations: The Logic of Mathematical Discovery*. Cambridge University Press, 1976. Edited by John Worrall and Elie Zahar. <https://doi.org/10.1017/CBO9781139171472>.

28. <a id="ref-lean-faq"></a> The Lean Development Team. Frequently asked questions. Lean Language website. See “What is the Trusted Code Base of Lean?” <https://lean-lang.org/faq/>. Accessed October 25, 2026.

29. <a id="ref-lean-apply-fix"></a> The Lean Development Team. Fix: `apply?` produces a non-synthetic `sorry`. Lean 4 pull request 8231, 2025. <https://github.com/leanprover/lean4/pull/8231>.

30. <a id="ref-lean-axioms"></a> The Lean Language Reference. Axioms. <https://lean-lang.org/doc/reference/latest/Axioms/>. Accessed October 25, 2026.

31. <a id="ref-lean-naturals"></a> The Lean Language Reference. Natural numbers.

    <https://lean-lang.org/doc/reference/latest/Basic-Types/Natural-Numbers/>. Accessed October 25, 2026.

32. <a id="ref-lean-validation"></a> The Lean Language Reference. Validating a Lean proof. <https://lean-lang.org/doc/reference/latest/ValidatingProofs/>. Accessed October 25, 2026.

33. <a id="ref-linnebo2024platonism"></a> Øystein Linnebo. Platonism in the philosophy of mathematics. In Edward N. Zalta and Uri Nodelman, editors, *The Stanford Encyclopedia of Philosophy*. Metaphysics Research Lab, Stanford University, 2024. Summer 2024 edition. <https://plato.stanford.edu/archives/sum2024/entries/platonism-mathematics/>.

34. <a id="ref-mathlib-zfc"></a> The mathlib Community. A model of ZFC. Mathlib documentation.

    <https://leanprover-community.github.io/mathlib4_docs/Mathlib/SetTheory/ZFC/Basic.html>. Accessed October 25, 2026.

35. <a id="ref-mathlib-set-defs"></a> The mathlib Community. Sets: Definitions. Mathlib documentation.

    <https://leanprover-community.github.io/mathlib4_docs/Mathlib/Data/Set/Defs.html>. Accessed October 25, 2026.

36. <a id="ref-faithfulness-gap2026"></a> Noor Islam S. Mohammad and Tamim Sheikh. The faithfulness gap: Certifying semantic equivalence between natural-language and formal mathematical statements. In *The 6th Muslims in Machine Learning Workshop at ICML*, 2026. <https://openreview.net/forum?id=bDKvdZJVgK>.

37. <a id="ref-murayama2026understanding"></a> Fumitaka Murayama. Formal verification is not mathematical understanding: On the epistemic limits of AI + Lean as a criterion for problem-solving. Unpublished manuscript, PhilArchive, 2026. Version 1, archived June 12, 2026. <https://philarchive.org/archive/MURFVIv1>.

38. <a id="ref-olsson2025coherence"></a> Erik Olsson. Coherentist theories of epistemic justification. In Edward N. Zalta and Uri Nodelman, editors, *The Stanford Encyclopedia of Philosophy*. Metaphysics Research Lab, Stanford University, 2025. Fall 2025 edition. <https://plato.stanford.edu/archives/fall2025/entries/justep-coherence/>.

39. <a id="ref-poincare2010topology"></a> Henri Poincaré. *Papers on Topology: Analysis Situs and Its Five Supplements*, volume 37 of *History of Mathematics*. American Mathematical Society and London Mathematical Society, 2010. Translated and introduced by John Stillwell. <https://doi.org/10.1090/hmath/037>.

40. <a id="ref-pollack1998believe"></a> Robert Pollack. How to believe a machine-checked proof. In Giovanni Sambin and Jan M. Smith, editors, *Twenty Five Years of Constructive Type Theory*, pages 205–220. Oxford University Press, 1998. <https://doi.org/10.1093/oso/9780198501275.003.0013>. Earlier version: BRICS Report RS-97-18 (1997), <https://www.brics.dk/RS/97/18/BRICS-RS-97-18.pdf>.

41. <a id="ref-polu2020generative"></a> Stanislas Polu and Ilya Sutskever. Generative language modeling for automated theorem proving. arXiv:2009.03393, 2020. <https://arxiv.org/abs/2009.03393>.

42. <a id="ref-reed2022certainty"></a> Baron Reed. Certainty. In *The Stanford Encyclopedia of Philosophy*. Metaphysics Research Lab, Stanford University, 2022. Revised February 21, 2022. <https://plato.stanford.edu/entries/certainty/>. Accessed October 25, 2026.

43. <a id="ref-reproducible-builds"></a> The Reproducible Builds Project. Definitions: When is a build reproducible? <https://reproducible-builds.org/docs/definition/>. Accessed October 25, 2026.

44. <a id="ref-rescher1973coherence"></a> Nicholas Rescher. *The Coherence Theory of Truth*. Clarendon Press, Oxford, 1973.

45. <a id="ref-rescher2001pragmatism"></a> Nicholas Rescher. *Cognitive Pragmatism: The Theory of Knowledge in Pragmatic Perspective*. University of Pittsburgh Press, 2001. <https://upittpress.org/books/9780822941538/>.

46. <a id="ref-ribet1995galois"></a> Kenneth A. Ribet. Galois representations and modular forms. *Bulletin of the American Mathematical Society*, 32(4):375–402, 1995. <https://doi.org/10.1090/S0273-0979-1995-00616-6>.

47. <a id="ref-rocq"></a> The Rocq Development Team. About the Rocq prover. <https://rocq-prover.org/about>. Accessed October 25, 2026.

48. <a id="ref-rocq-classical"></a> The Rocq Development Team. Classical propositional logic. The Rocq Standard Library, version 9.0.0.

    <https://rocq-prover.org/doc/V9.0.0/stdlib/Stdlib.Logic.Classical_Prop.html>. Accessed October 25, 2026.

49. <a id="ref-rocq-primitives"></a> The Rocq Development Team. Primitive objects. The Rocq Prover Reference Manual, version 9.0.0.

    <https://rocq-prover.org/doc/V9.0.0/refman/language/core/primitive.html>. Accessed October 25, 2026.

50. <a id="ref-scholze2021liquid"></a> Peter Scholze. Half a year of the Liquid Tensor Experiment: Amazing developments. Xena blog, guest post, 2021. June 5. <https://xenaproject.wordpress.com/2021/06/05/half-a-year-of-the-liquid-tensor-experiment-amazing-developments/>.

51. <a id="ref-tanswell2024rigour"></a> Fenner Stanley Tanswell. *Mathematical Rigour and Informal Proof*. Elements in the Philosophy of Mathematics. Cambridge University Press, 2024. <https://doi.org/10.1017/9781009325110>.

52. <a id="ref-tarski1944truth"></a> Alfred Tarski. The semantic conception of truth and the foundations of semantics. *Philosophy and Phenomenological Research*, 4(3):341–376, 1944. <https://inters.org/files/tarski1944.pdf>.

53. <a id="ref-taylorwiles1995hecke"></a> Richard Taylor and Andrew Wiles. Ring-theoretic properties of certain Hecke algebras. *Annals of Mathematics*, 141(3):553–572, 1995. <https://doi.org/10.2307/2118560>.

54. <a id="ref-fermat-margin"></a> Trinity College Library, Cambridge. Fermat’s last theorem. Reproduction and translation of Fermat’s marginal note, published in the 1670 edition of Diophantus’s *Arithmetica*, 2018.

    <https://trinitycollegelibrarycambridge.wordpress.com/2018/10/03/fermats-last-theorem/>.

55. <a id="ref-vaninwagen2025metaphysics"></a> Peter van Inwagen, Meghan Sullivan, and Sara Bernstein. Metaphysics. In Edward N. Zalta and Uri Nodelman, editors, *The Stanford Encyclopedia of Philosophy*. Metaphysics Research Lab, Stanford University, 2025. Summer 2025 edition. <https://plato.stanford.edu/archives/sum2025/entries/metaphysics/>.

56. <a id="ref-voevodsky-unimath"></a> Vladimir Voevodsky. Other: UniMath. Institute for Advanced Study, personal webpage. <https://www.math.ias.edu/vladimir/Other>. Accessed October 25, 2026.

57. <a id="ref-voevodsky2014origins"></a> Vladimir Voevodsky. The origins and motivations of univalent foundations. Institute for Advanced Study, 2014. <https://www.ias.edu/ideas/2014/voevodsky-origins>.

58. <a id="ref-wadler2015"></a> Philip Wadler. Propositions as types. *Communications of the ACM*, 58(12):75–84, 2015. <https://doi.org/10.1145/2699407>.

59. <a id="ref-wiles1995modular"></a> Andrew Wiles. Modular elliptic curves and Fermat’s last theorem. *Annals of Mathematics*, 141(3):443–551, 1995. <https://doi.org/10.2307/2118559>.

60. <a id="ref-wu2022autoformalization"></a> Yuhuai Wu, Albert Q. Jiang, Wenda Li, Markus N. Rabe, Charles Staats, Mateja Jamnik, and Christian Szegedy. Autoformalization with large language models. In *Advances in Neural Information Processing Systems*, volume 35, pages 32353–32368, 2022. <https://doi.org/10.52202/068431-2344>.

61. <a id="ref-beyond-compilation2026"></a> Ke Zhang, Patricio Gallardo Candela, Sudhir Murthy, Yi Xie, Zhi Wang, and Maziar Raissi. Beyond compilation: Evaluating faithful natural-language-to-Lean statement formalization. arXiv:2606.31002, version 4, 2026. Accepted at the MATH-AI Workshop at NeurIPS 2026. <https://arxiv.org/abs/2606.31002v4>.
