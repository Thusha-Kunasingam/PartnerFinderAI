/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Base canvas & surfaces
        "surface": "#f8f9ff",
        "surface-dim": "#cbdbf5",
        "surface-bright": "#f8f9ff",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#eff4ff",
        "surface-container": "#e5eeff",
        "surface-container-high": "#dce9ff",
        "surface-container-highest": "#d3e4fe",
        "surface-variant": "#d3e4fe",
        "background": "#f8f9ff",
        "canvas-base": "#F8FAFC",
        
        // Structural Nav & Text
        "on-surface": "#0b1c30",
        "on-surface-variant": "#4a4455",
        "on-background": "#0b1c30",
        "inverse-surface": "#213145",
        "inverse-on-surface": "#eaf1ff",
        "nav-rail": "#0F172A",
        "nav-header": "#1E293B",
        
        // Borders & Dividers
        "outline": "#7b7487",
        "outline-variant": "#ccc3d8",
        "border-standard": "#E2E8F0",
        "border-input": "#CBD5E1",
        
        // Primaries & Kinetic Accents
        "primary": "#630ed4",
        "on-primary": "#ffffff",
        "primary-container": "#7c3aed",
        "on-primary-container": "#ede0ff",
        "inverse-primary": "#d2bbff",
        "primary-fixed": "#eaddff",
        "primary-fixed-dim": "#d2bbff",
        "on-primary-fixed": "#25005a",
        "on-primary-fixed-variant": "#5a00c6",
        
        // Secondaries
        "secondary": "#0058be",
        "on-secondary": "#ffffff",
        "secondary-container": "#2170e4",
        "on-secondary-container": "#fefcff",
        "secondary-fixed": "#d8e2ff",
        "secondary-fixed-dim": "#adc6ff",
        "on-secondary-fixed": "#001a42",
        "on-secondary-fixed-variant": "#004395",
        
        // Tertiaries
        "tertiary": "#474e64",
        "on-tertiary": "#ffffff",
        "tertiary-container": "#5e667d",
        "on-tertiary-container": "#dee5ff",
        "tertiary-fixed": "#dae2fd",
        "tertiary-fixed-dim": "#bec6e0",
        "on-tertiary-fixed": "#131b2e",
        "on-tertiary-fixed-variant": "#3f465c",
        
        // Semantics
        "error": "#ba1a1a",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "on-error-container": "#93000a",
        "success": "#10b981",
        "success-container": "#ecfdf5",
        "warning": "#f59e0b",
        "warning-container": "#fffbeb",
        
        // Skill Chip Badges
        "skill-bg": "#E0F2FE",
        "skill-border": "#BAE6FD",
        "skill-text": "#0284C7",
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        "display-lg": ["32px", { lineHeight: "40px", letterSpacing: "-0.025em", fontWeight: "700" }],
        "headline-lg": ["24px", { lineHeight: "32px", letterSpacing: "-0.02em", fontWeight: "600" }],
        "headline-md": ["20px", { lineHeight: "28px", letterSpacing: "-0.015em", fontWeight: "600" }],
        "headline-sm": ["16px", { lineHeight: "24px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "body-lg": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "body-md": ["14px", { lineHeight: "20px", fontWeight: "400" }],
        "body-sm": ["12px", { lineHeight: "16px", fontWeight: "400" }],
        "label-md": ["14px", { lineHeight: "20px", fontWeight: "500" }],
        "label-sm": ["12px", { lineHeight: "16px", letterSpacing: "0.01em", fontWeight: "500" }],
        "label-xs": ["11px", { lineHeight: "14px", letterSpacing: "0.02em", fontWeight: "600" }],
        "code-sm": ["12px", { lineHeight: "16px", fontWeight: "400" }],
      },
      borderRadius: {
        "sm": "0.25rem",     // 4px
        "DEFAULT": "0.5rem", // 8px (controls)
        "md": "0.75rem",     // 12px (cards)
        "lg": "1rem",        // 16px (modals/dialogs)
        "xl": "1.5rem",      // 24px
        "full": "9999px",    // badges & pills
      },
      boxShadow: {
        "elevation-1": "0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.03)",
        "elevation-2": "0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -2px rgba(15, 23, 42, 0.05)",
        "elevation-3": "0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.04)",
        "ambient-primary": "0 4px 14px 0 rgba(124, 58, 237, 0.35)",
      },
      backgroundImage: {
        "primary-gradient": "linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)",
        "progress-gradient": "linear-gradient(90deg, #7C3AED 0%, #2170E4 100%)",
      },
    },
  },
  plugins: [],
};
