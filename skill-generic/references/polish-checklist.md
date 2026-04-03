# Polish Checklist

Run this checklist before closing a motion task.

1. Purpose clarity
   - This animation has a clear job (feedback, state, continuity, guidance).

2. Frequency fit
   - High-frequency interactions are minimal/fast.
   - Rare interactions can have richer motion.

3. Entry quality
   - No `scale(0)` pops.
   - Entry starts from subtle visible state (for example `scale(0.95) + opacity`).

4. Origin correctness
   - Anchored surfaces scale from trigger origin.
   - Centered modals stay centered.

5. Transition hygiene
   - No `transition: all`.
   - Only animate relevant properties.

6. Responsiveness feel
   - Pressed states feel responsive (`:active` scale around `0.97` where appropriate).

7. Perceived performance
   - Motion feels snappy, not slow.
   - Decorative loops do not distract or create stutter.

8. Accessibility
   - `prefers-reduced-motion` respected for major movement.
