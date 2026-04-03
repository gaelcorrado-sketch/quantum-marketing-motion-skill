# brand-motion-adapter-skill

Pack instalable por npm con la skill `brand-motion-adapter` para Codex y Claude Code.

Incluye:
- creación de animaciones nuevas
- adaptación de animaciones propias o externas (por ejemplo 21st.dev)
- ajuste completo a identidad visual
- pulido de motion para que se vea profesional y fluido

## Instalar desde npm

```bash
npm install -g brand-motion-adapter-skill
brand-motion-skill install
```

Ese comando instala por defecto en:
- `~/.claude/skills/brand-motion-adapter` (Claude Code)
- `~/.codex/skills/brand-motion-adapter`

Durante `install`, ahora tambien puede preguntarte si queres configurar
el MCP de 21st.dev (`magic`) para Claude Code.

Si queres forzarlo sin pregunta:

```bash
brand-motion-skill install --with-21st-mcp
```

Si queres omitir esa parte:

```bash
brand-motion-skill install --skip-21st-mcp
```

## Instalación rápida para Claude Code (copy/paste)

```bash
npm install -g brand-motion-adapter-skill && brand-motion-skill install
```

## Instalar sin publicar (local)

```bash
cd brand-motion-adapter-skill
npm install
node bin/brand-motion-skill.js install
```

## Publicar en npm

```bash
cd brand-motion-adapter-skill
npm login
npm publish --access public
```

## Ver rutas

```bash
brand-motion-skill paths
```

Por defecto instala en `~/.claude` y `~/.codex`.
