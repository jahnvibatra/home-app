# Haven — Routine Studio

## Problem statement
Build an Expo / React Native native mobile prototype: one clickable smart-home routine-builder slice, no login, backend, database, or live AI/device integrations. Priya describes a routine, reviews a fixed Goodnight draft, edits its assumptions, simulates a test, and enables/disables it.

## User and core requirements
- Persona: Priya, a homeowner who wants understandable, dependable automations and explicit control.
- Fixed fixture: every night at 10:30 PM when someone is home; dim living room Philips Hue and bedroom LIFX lights to warm 20%; lock Yale front door; lower living room blinds; set Nest thermostat to 20°C; pause Sonos kitchen speaker, skipping and notifying when offline.
- Six interactions: Describe → Assembling (1.6s) → Proposed → inline editing → Test run → Enabled.
- Two synchronized representations: plain-English contract and six-device timeline.
- Amber assumptions for time/temperature become neutral edited markers after adjustments.
- Time steps 15 minutes, wraps over midnight; temperature steps 1°C, bounded to 10–30°C.
- Offline speaker never blocks the rest of the routine.
- Clean daylight exact brand/semantic tokens, Hanken Grotesk, IBM Plex Mono, Feather icons, Moti/Reanimated meaningful motion, reduced-motion support, haptics.
- No added settings, pairing, onboarding, routine list, or real integrations.

## Architecture
- Root Expo route renders a single component; useRoutine drives the slice with a single step state.
- Components in frontend/src/routine: Describe, Assembling, Contract, Assumption, Timeline, Enabled, Header, UI primitives.
- One in-memory source of truth for time, temperature, test results and enabled status. Reload resets intentionally.
- All data/AI/device playback is explicitly simulated. No network requests in application logic.
- Existing backend template is unused. No app endpoints or database collections were created.
- Hanken static weights generated from the official variable font; all fonts are bundled and loaded with expo-font, including prewarming Feather.
- Styling uses typed React Native StyleSheet and one shared src/theme.ts, rather than NativeWind. Existing Metro configuration is preserved.
- Safe area aware sticky header/action footer, keyboard avoiding view, scrolling body, horizontal suggestions.

## Implemented — 2026-09-12
- Complete happy path and suggestion chips, empty prompt prevention, fixed draft regardless of prompt as specified.
- 1.6-second pulsing assembling state, 60ms staggered timeline entrance, sequential 300ms test playback with auto-scrolling and haptics.
- Inline time and temperature editors in both representations, synchronized edited badges and values; edits invalidate previous test results.
- Visible offline/skipped states and simulated completion report; enabled confirmation, on toggle, explicit off button, repeat-test flow.
- Exact user design colors and local custom typography; small-screen and reduced-motion support.
- Phone preview, TypeScript and lint passed. Full interaction validation passed: Describe/Assembling/draft, synchronized editors and bounds, test playback/offline skipping, both enable paths, repeated tests while on/off, Ask again reset, reduced motion, and small-screen overflow checks.
- Test report: /app/test_reports/iteration_1.json. No core UI or runtime failures. Deprecated card shadow props replaced with supported boxShadow. Cloudflare preview telemetry is external to app code; no app API/device requests exist.
- Final self-test confirmed inline 21°C editing, complete test run/skipped speaker, retained setting on enable, explicit off control and settled confirmation rendering. Toggle uses an accessible custom switch to keep platform default colors from overriding the exact indigo/white tokens.

## Prioritized backlog
### P0
- None. Requested clickable slice is complete.
### P1
- Physical iOS/Android checks for native haptics, keyboard and safe areas (browser cannot validate tactile output).
### P2 (outside requested scope, only if requested)
- Expand beyond the fixed Goodnight sample with additional fully specified routines.

## Next tasks
Physical-device check for tactile haptic feedback; optionally refine the fixed sample after user review.