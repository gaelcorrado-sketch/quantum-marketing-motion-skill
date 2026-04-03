# Motion Calibration

Default ranges:

1. Press/feedback:
   - `100-160ms`, ease-out

2. Tooltip/small popover:
   - `125-200ms`, ease-out

3. Dropdown/select:
   - `150-250ms`, ease-out

4. Modal/drawer:
   - `200-500ms`, custom ease-out / ease-in-out

Guidelines:

1. For UI interactions, prefer `ease-out` or strong custom curve.
2. Avoid `ease-in` for entering UI elements.
3. Keep routine UI motion under ~300ms when possible.
4. For looped decorative motion, keep amplitude and opacity low.
5. For frequent actions (many times/day), reduce or remove animation.

Useful curves:

```css
--ease-out-strong: cubic-bezier(0.23, 1, 0.32, 1);
--ease-in-out-strong: cubic-bezier(0.77, 0, 0.175, 1);
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
```
