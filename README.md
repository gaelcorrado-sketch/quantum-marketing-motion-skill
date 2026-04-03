# brand-motion-adapter-skill

Pack instalable por npm con la skill `brand-motion-adapter` para Codex.

## Instalar desde npm

```bash
npm install -g brand-motion-adapter-skill
brand-motion-skill install
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

Por defecto instala en `~/.codex/skills/brand-motion-adapter`.
