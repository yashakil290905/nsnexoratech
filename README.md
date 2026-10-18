# NS NexoraTech — Dark Signature Motion v12 — jQuery Edition

This build restores a dark, premium technology-agency UI aligned to the logo's navy / electric blue / cyan color combination. It intentionally replaces the light editorial palette from v10 while preserving the existing five-page content and structure.

## Included
- Dark navy surfaces with electric-blue and cyan highlights
- Animated blue/cyan gradient typography, ambient glow and moving grid
- Animated loader and local page transition wipe
- Staggered hero word entrance and scroll reveal choreography
- Cursor-following glow/ring and pointer-responsive card tilt on desktop
- Glowing orbital hero visual, floating chips, glass cards, light-sweep hover states
- Responsive adjustments and `prefers-reduced-motion` support

## Run
1. Extract this ZIP into a new folder (do not merge with previous builds).
2. Open in VS Code and use Live Server on `index.html`.
3. Hard-refresh with `Ctrl + Shift + R`.
4. Check all five pages and test with desktop pointer and mobile viewport.

Some icons/fonts may load from CDNs and therefore need internet access. Update the WhatsApp placeholder and sitemap domain before launch. JavaScript has been inherited from v10; browser-based visual and end-to-end testing should be done before publishing.


## jQuery animation plugins (v12)
- **jQuery 3.7.1** provides the plugin runtime.
- **jQuery Easing 1.4.1** powers eased back-to-top and same-page anchor scrolling.
- **Waypoints 4.0.1 + Counter-Up 2.1.0** animate numeric metrics when they enter the viewport.
- A native counter fallback remains available if plugin CDNs are blocked.

All five pages include the dependencies in the correct order. Internet access is required for CDN scripts. The site also retains its CSS/JavaScript motion system and respects reduced-motion settings.
