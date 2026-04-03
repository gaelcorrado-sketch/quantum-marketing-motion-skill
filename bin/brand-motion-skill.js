#!/usr/bin/env node

const fs = require("fs");
const os = require("os");
const path = require("path");

const SKILL_PACK = [
  {
    name: "brand-motion-adapter",
    sourceDir: path.resolve(__dirname, "..", "skill-generic")
  }
];
const args = process.argv.slice(2);
const command = args[0] || "install";

function getCodexHome() {
  if (process.env.CODEX_HOME && process.env.CODEX_HOME.trim()) {
    return process.env.CODEX_HOME;
  }
  return path.join(os.homedir(), ".codex");
}

function copyRecursive(fromDir, toDir) {
  fs.mkdirSync(toDir, { recursive: true });
  fs.cpSync(fromDir, toDir, { recursive: true, force: true });
}

function installSkill() {
  const codexHome = getCodexHome();
  const installed = [];
  for (const item of SKILL_PACK) {
    const targetDir = path.join(codexHome, "skills", item.name);
    copyRecursive(item.sourceDir, targetDir);
    installed.push(targetDir);
  }
  process.stdout.write("Skill instalada:\n");
  for (const target of installed) {
    process.stdout.write(" - " + target + "\n");
  }
  process.stdout.write("Reinicia Codex o abre una nueva sesión para usarla.\n");
}

function printPaths() {
  const codexHome = getCodexHome();
  for (const item of SKILL_PACK) {
    const targetDir = path.join(codexHome, "skills", item.name);
    process.stdout.write(item.name + ":\n");
    process.stdout.write("  source: " + item.sourceDir + "\n");
    process.stdout.write("  target: " + targetDir + "\n");
  }
}

function printHelp() {
  process.stdout.write("Uso:\n");
  process.stdout.write("  brand-motion-skill install      Instala la skill en ~/.codex/skills\n");
  process.stdout.write("  brand-motion-skill paths        Muestra rutas source/target\n");
  process.stdout.write("  brand-motion-skill help         Muestra ayuda\n");
}

if (command === "install") {
  installSkill();
} else if (command === "paths") {
  printPaths();
} else if (command === "help" || command === "--help" || command === "-h") {
  printHelp();
} else {
  process.stderr.write("Comando no reconocido: " + command + "\n");
  printHelp();
  process.exit(1);
}
