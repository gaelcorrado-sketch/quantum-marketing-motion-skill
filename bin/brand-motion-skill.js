#!/usr/bin/env node

const fs = require("fs");
const os = require("os");
const path = require("path");
const readline = require("readline");
const { spawnSync } = require("child_process");

const SKILL_PACK = [
  {
    name: "brand-motion-adapter",
    sourceDir: path.resolve(__dirname, "..", "skill-generic")
  }
];
const args = process.argv.slice(2);
const command = args[0] || "install";
const commandArgs = args.slice(1);

function getInstallHomes() {
  if (process.env.CODEX_HOME && process.env.CODEX_HOME.trim()) {
    return [process.env.CODEX_HOME.trim()];
  }
  const home = os.homedir();
  return [
    path.join(home, ".claude"),
    path.join(home, ".codex")
  ];
}

function copyRecursive(fromDir, toDir) {
  fs.mkdirSync(toDir, { recursive: true });
  fs.cpSync(fromDir, toDir, { recursive: true, force: true });
}

function hasFlag(flag) {
  return commandArgs.includes(flag);
}

function askLine(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question(question, (answer) => {
      rl.close();
      resolve((answer || "").trim());
    });
  });
}

async function askYesNo(question, defaultYes) {
  const suffix = defaultYes ? " [Y/n]: " : " [y/N]: ";
  const raw = (await askLine(question + suffix)).toLowerCase();
  if (!raw) return defaultYes;
  if (raw === "y" || raw === "yes" || raw === "s" || raw === "si") return true;
  if (raw === "n" || raw === "no") return false;
  return defaultYes;
}

function hasClaudeCli() {
  const result = spawnSync("claude", ["--version"], { stdio: "ignore" });
  return result && result.status === 0;
}

function install21stMagicMcp() {
  const apiKey = process.env.MAGIC_API_KEY || process.env.API_KEY;

  process.stdout.write("\nMCP 21st.dev (magic)\n");
  process.stdout.write("Este paso configura el MCP en Claude Code (usuario actual).\n");

  if (!hasClaudeCli()) {
    process.stdout.write("No se encontro el comando `claude` en esta maquina.\n");
    process.stdout.write("Instalalo y luego ejecuta:\n");
    process.stdout.write("  claude mcp add magic --scope user --env API_KEY=\"TU_API_KEY\" -- npx -y @21st-dev/magic@latest\n");
    return false;
  }

  if (!apiKey) {
    process.stdout.write("No encontre API key en entorno (`MAGIC_API_KEY` o `API_KEY`).\n");
    process.stdout.write("Exporta la key y relanza:\n");
    process.stdout.write("  MAGIC_API_KEY=\"TU_API_KEY\" brand-motion-skill install --with-21st-mcp\n");
    return false;
  }

  const result = spawnSync(
    "claude",
    [
      "mcp",
      "add",
      "magic",
      "--scope",
      "user",
      "--env",
      "API_KEY=" + apiKey,
      "--",
      "npx",
      "-y",
      "@21st-dev/magic@latest"
    ],
    { stdio: "inherit" }
  );

  if (result && result.status === 0) {
    process.stdout.write("MCP de 21st.dev configurado correctamente.\n");
    return true;
  }

  process.stdout.write("No se pudo configurar el MCP automaticamente.\n");
  process.stdout.write("Puedes correrlo manualmente:\n");
  process.stdout.write("  claude mcp add magic --scope user --env API_KEY=\"TU_API_KEY\" -- npx -y @21st-dev/magic@latest\n");
  return false;
}

async function maybeInstall21stMcp() {
  if (hasFlag("--skip-21st-mcp")) return;

  if (hasFlag("--with-21st-mcp")) {
    install21stMagicMcp();
    return;
  }

  if (!process.stdin.isTTY || !process.stdout.isTTY) return;

  const shouldInstall = await askYesNo(
    "Quieres configurar tambien el MCP de 21st.dev (magic) para Claude Code?",
    false
  );
  if (shouldInstall) install21stMagicMcp();
}

async function installSkill() {
  const homes = getInstallHomes();
  const installed = [];
  for (const baseHome of homes) {
    for (const item of SKILL_PACK) {
      const targetDir = path.join(baseHome, "skills", item.name);
      copyRecursive(item.sourceDir, targetDir);
      installed.push(targetDir);
    }
  }
  process.stdout.write("Skill instalada:\n");
  for (const target of installed) {
    process.stdout.write(" - " + target + "\n");
  }
  process.stdout.write("Reinicia Codex o abre una nueva sesión para usarla.\n");
  await maybeInstall21stMcp();
}

function printPaths() {
  const homes = getInstallHomes();
  for (const baseHome of homes) {
    process.stdout.write("base: " + baseHome + "\n");
    for (const item of SKILL_PACK) {
      const targetDir = path.join(baseHome, "skills", item.name);
      process.stdout.write(item.name + ":\n");
      process.stdout.write("  source: " + item.sourceDir + "\n");
      process.stdout.write("  target: " + targetDir + "\n");
    }
  }
}

function printHelp() {
  process.stdout.write("Uso:\n");
  process.stdout.write("  brand-motion-skill install      Instala la skill en ~/.claude y ~/.codex\n");
  process.stdout.write("    --with-21st-mcp               Instala MCP 21st.dev (Claude) sin preguntar\n");
  process.stdout.write("    --skip-21st-mcp               Omite pregunta de MCP 21st.dev\n");
  process.stdout.write("  brand-motion-skill paths        Muestra rutas source/target\n");
  process.stdout.write("  brand-motion-skill help         Muestra ayuda\n");
  process.stdout.write("Tip: con CODEX_HOME definido, instala solo en ese destino.\n");
}

if (command === "install") {
  installSkill().catch((err) => {
    process.stderr.write("Error al instalar la skill: " + err.message + "\n");
    process.exit(1);
  });
} else if (command === "paths") {
  printPaths();
} else if (command === "help" || command === "--help" || command === "-h") {
  printHelp();
} else {
  process.stderr.write("Comando no reconocido: " + command + "\n");
  printHelp();
  process.exit(1);
}
