// scripts/new-post.mjs
// Uso: node scripts/new-post.mjs "Titolo del Post" "2025-10-27" "Breve descrizione (<=155)" "assets/images/blog/cover.jpg" "Alt text cover"

import fs from "node:fs/promises";
import path from "node:path";

const [, , TITLE, DATE_ISO, DESCRIPTION, COVER_PATH, COVER_ALT] = process.argv;

if (!TITLE || !DATE_ISO || !DESCRIPTION || !COVER_PATH || !COVER_ALT) {
  console.error(
    'Uso: node scripts/new-post.mjs "Titolo" "YYYY-MM-DD" "Descrizione" "assets/images/blog/cover.jpg" "Alt text cover"'
  );
  process.exit(1);
}

function toSlug(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/--+/g, "-");
}

function toHuman(dateIso) {
  // 2025-10-27 -> October 27, 2025
  const d = new Date(dateIso + "T12:00:00Z");
  const fmt = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return fmt.format(d);
}

const SLUG = `post-${toSlug(TITLE)}.html`;
const DATE_HUMAN = toHuman(DATE_ISO);

// Leggi il template madre (post.html) dalla root
const ROOT = process.cwd();
const templatePath = path.join(ROOT, "post.html");

let tpl = await fs.readFile(templatePath, "utf8");

// Rimpiazzo token
tpl = tpl
  .replaceAll("{{TITLE}}", TITLE)
  .replaceAll("{{DESCRIPTION}}", DESCRIPTION)
  .replaceAll("{{SLUG}}", SLUG)
  .replaceAll("{{DATE_ISO}}", DATE_ISO)
  .replaceAll("{{DATE_HUMAN}}", DATE_HUMAN)
  .replaceAll("{{COVER_PATH}}", COVER_PATH)
  .replaceAll("{{COVER_ALT}}", COVER_ALT);

// Scrivi nuovo file
const outPath = path.join(ROOT, SLUG);
await fs.writeFile(outPath, tpl, "utf8");

console.log(`✅ Creato: ${SLUG}`);
console.log(
  "\nSuggerimento: aggiorna il titolo corrispondente nella card di blog.html; l’auto-linker sistemerà l'href."
);
