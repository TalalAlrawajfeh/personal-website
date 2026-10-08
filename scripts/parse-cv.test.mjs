import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { parseCv } from "../src/data/parse-cv.ts";

const source = readFileSync(
  new URL("../cv/talal-alrawajfeh-cv.tex", import.meta.url),
  "utf8",
);

test("the actual CV preserves all sections, roles, bullets, skills, and citations", () => {
  const cv = parseCv(source);
  assert.equal(cv.name, "TALAL ALRAWAJFEH");
  assert.equal(cv.headline, "Senior Applied Scientist");
  assert.deepEqual(
    cv.sections.map((section) => section.title),
    [
      "Professional Summary",
      "Core Skills",
      "Professional Experience",
      "Selected Publications and Research",
      "Education",
      "Additional Information",
    ],
  );
  const skills = cv.sections[1].html;
  assert.equal((skills.match(/<p>/g) ?? []).length, 4);
  assert.match(skills, /C&#39;|C#/);
  const experience = cv.sections[2].html;
  assert.equal((experience.match(/<article/g) ?? []).length, 4);
  assert.equal((experience.match(/<li>/g) ?? []).length, 17);
  assert.match(experience, /MessageDepot/);
  assert.match(experience, /99% accuracy/);
  const publications = cv.sections[3].html;
  assert.equal((publications.match(/<li>/g) ?? []).length, 4);
  assert.match(publications, /Submitted to ICLR/);
  assert.match(publications, /Wachirapatra Mahatubgris/);
  assert.match(publications, /href="https:\/\/arxiv.org\/abs\/2610.10068"/);
  assert.equal((cv.sections[4].html.match(/<article/g) ?? []).length, 3);
  assert.match(cv.sections[4].html, /PhD in Science/);
  assert.match(cv.sections[4].html, /4.0\/4.0; first in class/);
  assert.match(cv.sections[5].html, /TOEFL iBT 105\/120/);
});

test("editing the LaTeX changes the rendered website content", () => {
  const changed = source
    .replace("Senior Applied Scientist", "Applied Research Lead")
    .replace("99\\% accuracy", "97\\% accuracy");
  const cv = parseCv(changed);
  // Replace the header as well as the PDF metadata occurrence.
  const allChanged = parseCv(
    changed.replaceAll("Senior Applied Scientist", "Applied Research Lead"),
  );
  assert.equal(allChanged.headline, "Applied Research Lead");
  assert.match(cv.sections[0].html, /97% accuracy/);
});

test("formatting, escaped characters, and comments render safely without changing URLs", () => {
  const added = String.raw`Text <script>alert("x")</script>, 80\%, C\#, R\&D.
\textbf{Bold \textit{nested italics}}.
\href{https://example.com/a--b?x=1\&y=2}{Paper} % hidden comment
`;
  const cv = parseCv(
    source.replace(
      "Combines mathematical depth",
      added + "\nCombines mathematical depth",
    ),
  );
  const html = cv.sections[0].html;
  assert.match(html, /&lt;script&gt;/);
  assert.doesNotMatch(html, /<script>/);
  assert.match(html, /80%, C#, R&amp;D/);
  assert.match(html, /<strong>Bold <em>nested italics<\/em><\/strong>/);
  assert.match(html, /href="https:\/\/example.com\/a--b\?x=1&amp;y=2"/);
  assert.doesNotMatch(html, /hidden comment/);
});

test("unsupported commands and unsafe links fail instead of dropping content", () => {
  assert.throws(
    () =>
      parseCv(
        source.replace("Combines mathematical depth", "\\unknown{Content}"),
      ),
    /unsupported command/,
  );
  assert.throws(
    () =>
      parseCv(
        source.replace(
          "https://arxiv.org/abs/2610.10068",
          "javascript:alert(1)",
        ),
      ),
    /unsupported link protocol/,
  );
});
