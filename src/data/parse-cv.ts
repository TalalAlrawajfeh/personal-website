/** Render the small LaTeX subset used by this CV. Unknown commands fail the build
 * rather than silently dropping content. Text and link attributes are escaped. */
function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character]!,
  );
}

function group(source: string, start: number): { value: string; end: number } {
  while (/\s/.test(source[start] ?? "") && start < source.length) start++;
  if (source[start] !== "{")
    throw new Error("CV LaTeX: expected a braced argument.");
  const opening = start++;
  let depth = 1;
  for (; start < source.length; start++) {
    if (source[start] === "\\") {
      start++;
      continue;
    }
    if (source[start] === "{") depth++;
    if (source[start] === "}" && --depth === 0) {
      return { value: source.slice(opening + 1, start), end: start + 1 };
    }
  }
  throw new Error("CV LaTeX: unclosed argument.");
}

function inline(source: string, html = true, typography = true): string {
  let result = "";
  for (let index = 0; index < source.length;) {
    const character = source[index];
    if (character === "{") {
      const argument = group(source, index);
      result += inline(argument.value, html, typography);
      index = argument.end;
    } else if (character === "\\") {
      const escaped = source[index + 1];
      if ("%#&_${}".includes(escaped ?? "") && escaped) {
        result += html ? escapeHtml(escaped) : escaped;
        index += 2;
        continue;
      }
      const command = /^\\([A-Za-z]+|\\)(\*)?/.exec(source.slice(index));
      if (!command)
        throw new Error(
          `CV LaTeX: unsupported escape at ${source.slice(index, index + 20)}.`,
        );
      index += command[0].length;
      const name = command[1];
      if (name === "\\") {
        const spacing = /^\[[^\]]*\]/.exec(source.slice(index));
        index += spacing?.[0].length ?? 0;
        result += html ? "<br />" : " ";
      } else if (
        ["LARGE", "normalsize", "bfseries", "RaggedRight"].includes(name)
      ) {
        continue;
      } else if (name === "textbar") {
        const argument = group(source, index);
        index = argument.end;
        result += " | ";
      } else if (name === "vspace") {
        index = group(source, index).end;
      } else if (name === "textbf" || name === "textit") {
        const argument = group(source, index);
        index = argument.end;
        const content = inline(argument.value, html, typography);
        const tag = name === "textbf" ? "strong" : "em";
        result += html ? `<${tag}>${content}</${tag}>` : content;
      } else if (name === "href") {
        const url = group(source, index);
        const label = group(source, url.end);
        index = label.end;
        const href = inline(url.value, false, false).trim();
        if (!/^(https?:\/\/|mailto:)/i.test(href)) {
          throw new Error(`CV LaTeX: unsupported link protocol in ${href}.`);
        }
        const content = inline(label.value, html, typography);
        result += html
          ? `<a href="${escapeHtml(href)}">${content}</a>`
          : content;
      } else {
        throw new Error(`CV LaTeX: unsupported command \\${name}.`);
      }
    } else {
      const dash = typography && source.slice(index, index + 2) === "--";
      const text = dash ? "–" : character === "~" ? " " : character;
      result += html ? escapeHtml(text) : text;
      index += dash ? 2 : 1;
    }
  }
  return result.replace(/\s+/g, " ").trim();
}

function paragraphs(source: string): string {
  return source
    .trim()
    .split(/\n\s*\n|\\\\(?:\[[^\]]*\])?/)
    .map((part) => inline(part))
    .filter(Boolean)
    .map((part) => `<p>${part}</p>`)
    .join("\n");
}

function body(source: string): string {
  // Layout spacing has no content and should not create empty paragraphs.
  source = source.replace(/\\vspace\*?\{[^}]*\}/g, "").trim();
  const firstRole = source.indexOf("\\role{");
  if (firstRole !== -1) {
    const roles = [...source.matchAll(/\\role\{/g)];
    return (
      paragraphs(source.slice(0, firstRole)) +
      roles
        .map((role, roleIndex) => {
          let cursor = role.index! + "\\role".length;
          const values: string[] = [];
          for (let argument = 0; argument < 4; argument++) {
            const parsed = group(source, cursor);
            values.push(inline(parsed.value));
            cursor = parsed.end;
          }
          const content = source.slice(
            cursor,
            roles[roleIndex + 1]?.index ?? source.length,
          );
          return `<article class="timeline-item"><span class="period">${values[1]}</span><div><h3>${values[0]}</h3><p>${values[2]} · ${values[3]}</p>${body(content)}</div></article>`;
        })
        .join("\n")
    );
  }
  const list = /\\begin\{itemize\}([\s\S]*?)\\end\{itemize\}/.exec(source);
  if (list) {
    const items = list[1]
      .split(/\\item\b/)
      .slice(1)
      .map((item) => `<li>${inline(item.trim())}</li>`);
    return (
      paragraphs(source.slice(0, list.index)) +
      `<ul>${items.join("\n")}</ul>` +
      body(source.slice(list.index + list[0].length))
    );
  }
  return paragraphs(source);
}

export function parseCv(source: string) {
  source = source.replace(/(?<!\\)%[^\n]*/g, "");
  const document = /\\begin\{document\}([\s\S]*?)\\end\{document\}/.exec(
    source,
  )?.[1];
  if (!document) throw new Error("CV LaTeX: document environment is missing.");
  const header = /\\begin\{center\}([\s\S]*?)\\end\{center\}/.exec(
    document,
  )?.[1];
  if (!header) throw new Error("CV LaTeX: centered header is missing.");
  const lines = header.trim().split(/\\\\(?:\[[^\]]*\])?/);
  const headings = [...document.matchAll(/\\section\{([^}]+)\}/g)];
  if (!headings.length) throw new Error("CV LaTeX: no sections found.");
  return {
    name: inline(lines[0], false),
    headline: inline(lines[1], false),
    contactHtml: inline(lines.slice(2).join("\\\\")),
    sections: headings.map((heading, index) => ({
      title: inline(heading[1], false),
      id: inline(heading[1], false)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-"),
      html: body(
        document.slice(
          heading.index! + heading[0].length,
          headings[index + 1]?.index ?? document.length,
        ),
      ),
    })),
  };
}
