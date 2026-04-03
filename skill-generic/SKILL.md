---
name: brand-motion-adapter
description: Use this skill whenever the user asks to adapt, improve, or port animations/components to match any brand identity (any colors, style, tone) while keeping results professional and coherent.
---

# Brand Motion Adapter

This skill adapts animations and visual components to the user's chosen identity without forcing a specific palette.

## Required Inputs

Before editing, confirm:
1. Source component/path/URL.
2. Target surface (`react`, `vanilla`, or both).
3. Brand profile: colors, tone, and style direction.

If brand profile is missing, use:
- [brand-input-template.md](references/brand-input-template.md)

## Core Workflow

1. Extract what matters from the source:
   - visual hierarchy
   - motion behavior
   - interaction timing
2. Map to brand identity:
   - replace colors and glow system with brand palette
   - align spacing, rhythm, and text tone
   - keep one clear primary action
3. Retune motion quality:
   - interactions: `150-280ms`
   - section loops: subtle and low-noise
   - no aggressive flashing or constant distraction
4. Keep implementation practical:
   - if needed, port from React to vanilla using same visual primitives
   - avoid coupling to unrelated app logic
5. Validate result:
   - visual coherence with brand
   - responsive behavior (desktop + mobile)
   - no obvious performance stutter

Use:
- [motion-calibration.md](references/motion-calibration.md)

## Non-Negotiable Rules

1. Never lock output to one preset aesthetic.
2. Avoid copy-paste shipping from external libraries without adaptation.
3. Prioritize continuity with the existing product style.
4. Keep motion meaningful, not decorative noise.

## Output Contract

For each task, return:
1. What changed visually and why.
2. Files touched.
3. Validation status.
4. Porting notes (if migration was requested).
