---
name: brand-motion-adapter
description: Use this skill whenever the user asks to create, adapt, polish, or port UI animations/components (own or external, including 21st.dev) to match a specific brand identity and deliver high-quality motion polish.
---

# Brand Motion Adapter

This skill combines:
- brand-driven adaptation for any visual identity
- high-quality motion polish for professional UI feel

Use it for:
1. creating new animations from scratch
2. adapting external animations/components
3. refining existing in-house animations
4. porting React effects to vanilla safely

## Required Inputs

Before editing, confirm:
1. Source: internal component/file, or external URL (for example 21st.dev).
2. Target: `react`, `vanilla`, or both.
3. Brand direction: colors, tone, motion style.

If brand direction is incomplete, use:
- [brand-input-template.md](references/brand-input-template.md)

## Core Workflow

1. Intake and classify source
   - `own`: existing animation in current codebase
   - `external`: imported from outside (21st.dev/shadcn/etc.)
2. Import external source (when needed)
   - Prefer project-native import flow if available (for example `npm run add:21st -- <url>` in `react-lab`).
   - If that flow is not available, use official `shadcn` add command.
   - Never ship imported visuals as-is without adaptation.
3. Map to brand identity
   - Replace foreign palette/tokens with brand palette.
   - Align typography, spacing rhythm, contrast, and hierarchy.
   - Keep one clear primary visual focus.
4. Retune motion quality
   - Apply timing/easing rules from:
     - [motion-calibration.md](references/motion-calibration.md)
     - [polish-checklist.md](references/polish-checklist.md)
   - Prefer responsive motion over decorative noise.
   - Avoid heavy, constant motion in frequently repeated interactions.
5. Porting (if requested)
   - Extract visual primitives (gradient, glow, timing, easing, entry/exit logic).
   - Rebuild in target stack (`react` or `vanilla`) without dragging unrelated dependencies.
6. Validate
   - Visual coherence with brand identity.
   - No obvious stutter on desktop/mobile.
   - No regressions in existing interaction flow.

Reference:
- [motion-calibration.md](references/motion-calibration.md)

## Non-Negotiable Rules

1. Do not lock to a single aesthetic preset.
2. Do not copy-paste external animation without adaptation.
3. Do not add animation if it harms perceived speed.
4. For high-frequency actions, keep motion minimal or none.
5. For enter/exit animations, avoid `scale(0)`; start from subtle visible state.
6. Prefer explicit transition properties over `transition: all`.

## Output Contract

For each task, return:
1. What changed and why (brand + motion reasoning).
2. Files touched.
3. Validation result.
4. Porting notes (if applicable).
