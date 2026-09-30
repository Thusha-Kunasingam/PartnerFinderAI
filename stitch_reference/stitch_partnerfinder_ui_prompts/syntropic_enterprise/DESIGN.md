---
name: Syntropic Enterprise
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#4a4455'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#7b7487'
  outline-variant: '#ccc3d8'
  surface-tint: '#732ee4'
  primary: '#630ed4'
  on-primary: '#ffffff'
  primary-container: '#7c3aed'
  on-primary-container: '#ede0ff'
  inverse-primary: '#d2bbff'
  secondary: '#0058be'
  on-secondary: '#ffffff'
  secondary-container: '#2170e4'
  on-secondary-container: '#fefcff'
  tertiary: '#474e64'
  on-tertiary: '#ffffff'
  tertiary-container: '#5e667d'
  on-tertiary-container: '#dee5ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#eaddff'
  primary-fixed-dim: '#d2bbff'
  on-primary-fixed: '#25005a'
  on-primary-fixed-variant: '#5a00c6'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004395'
  tertiary-fixed: '#dae2fd'
  tertiary-fixed-dim: '#bec6e0'
  on-tertiary-fixed: '#131b2e'
  on-tertiary-fixed-variant: '#3f465c'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-xs:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.02em
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  margin: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1.25rem
  space-xl: 1.5rem
---

## Brand & Style

The design system establishes a high-precision, executive SaaS aesthetic built for algorithmic intelligence and high-volume business matchmaking. The visual persona blends the architectural rigor of top-tier developer platforms with the streamlined polish of enterprise productivity suites. 

Key attributes:
- **Precision & Authority:** Uncompromising alignment, structured tabular hierarchy, and high visual stability instill trust in AI recommendations.
- **Controlled Vibrancy:** Neutral canvases and rich slate elements are punctuated by high-energy purple-to-blue gradients reserved strictly for high-intent actions.
- **Clarity over Decoration:** Crisp 1px borders, carefully calibrated tonal contrast, and subtle ambient shadows replace heavy ornamentation, preserving information density without causing cognitive fatigue.

Targeting enterprise partnerships managers, executives, and business development leads, the interface conveys intelligence, reliability, and speed.

## Colors

The palette balances clean cool-white surfaces with deep corporate slate navigation and strategic gradient accents.

### Core Canvas & Structure
- **Canvas Base:** `#F8FAFC` (Slate 50) serves as the primary application background behind floating workspaces and content cards.
- **Card & Modal Surface:** `#FFFFFF` pure white delivers contrast against `#F8FAFC`.
- **Navigation & Structural Anchors:** `#0F172A` (Slate 900) for primary side navigation and global top bars; `#1E293B` (Slate 800) for active rail states, high-level headers, and floating search bars.
- **Borders & Dividers:** Crisp `#E2E8F0` (Slate 200) for standard layout and card borders; `#CBD5E1` (Slate 300) for input default strokes and hover dividers.

### Primaries & Accents
- **Primary Kinetic Accent:** Linear gradient `linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)` used strictly for primary conversion points, AI matching triggers, and key completion steps.
- **Accent Purple:** `#7C3AED` for highlighted match metrics, active tabs, and focused radio indicators.
- **Accent Blue:** `#3B82F6` for secondary links, text selections, and data-viz pathways.

### Semantic Tones
- **Success & Match Confirmation:** Primary `#10B981`, secondary tint `#22C55E`, surface background `#ECFDF5`.
- **Destructive & Reject:** `#EF4444`, surface background `#FEF2F2`, border `#FCA5A5`.
- **Informative Skill Tonal Badge:** `#E0F2FE` background with `#0284C7` typography and icon strokes.
- **Warning & Pending Status:** `#F59E0B`, background `#FFFBEB`.

## Typography

The type system prioritizes information legibility, tight vertical rhythms, and clean tabular alignment suited for dense data grids and AI partner analysis. 

- **Scale & Line Heights:** Standard text relies on a strict proportional scale (`12px`, `14px`, `16px`). Line-heights remain compact (e.g., 20px on 14px text) to maximize vertical real estate in enterprise desktops.
- **Font Feature Settings:** `cv02`, `cv03`, `cv04` (alternate glyphs) and `tnum` (tabular figures) are activated globally across all data tables, match percentages, and financial metrics to prevent jitter on value updates.
- **Hierarchy:** High-level screen titles utilize `-0.02em` tracking with 600 or 700 weights. Component-level labels and buttons leverage medium (`500`) weight at `14px` for optimal scanning contrast without visual bulk.

## Layout & Spacing

The layout model is anchored on an optimized **1440px desktop reference canvas**, using a dual-region architecture: a persistent fixed-width left navigation rail and a fluid dashboard workspace.

### Structural Framework
- **Primary Side Rail:** 260px fixed width (collapsible to 72px icon rail), styled in `#0F172A`.
- **Top Command Bar:** 64px fixed height, containing universal search, workspace switchers, notifications, and profile controls.
- **Workspace Canvas:** Fluid container running max-width 1440px with a 12-column grid (`gutter: 1.5rem`, `margin: 2rem`).

### Grid Reflow & Adaptations
- **Desktop (1440px+):** Full 12-column grid. Partner cards render in 3-column rows (span-4) or standard split screen (span-7 master list, span-5 detail inspector).
- **Compact Desktop / Laptop (1024px – 1439px):** Margins reduce to `1.5rem`, gutters maintain `1rem`, cards adapt to 2-column rows (span-6).
- **Tablet / Responsive Inspector (Below 1024px):** Side navigation auto-collapses to an icon rail; dual-pane master-detail flows convert into stacked views.

## Elevation & Depth

Visual hierarchy employs a three-tier elevation strategy utilizing low-contrast boundaries and ambient, multi-layered drop shadows tinted with slate.

### Elevation Tiers
- **Flat Surface (Level 0):** Used for background containers and static cards. Border: `1px solid #E2E8F0`, shadow: `none`.
- **Subtle Rest (Level 1):** Standard dashboard widgets, partner profiles, and table containers. 
  - Border: `1px solid #E2E8F0`
  - Shadow: `0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.03)`
- **Interactive Hover & Drag (Level 2):** Elevated partner cards on mouseover and active dropdown triggers.
  - Border: `1px solid #CBD5E1`
  - Shadow: `0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -2px rgba(15, 23, 42, 0.05)`
- **Floating Overlays & Modals (Level 3):** Global search palette, match configuration flyouts, and critical modals.
  - Border: `1px solid #E2E8F0`
  - Shadow: `0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.04)`

### Gradient Elevation
Primary action buttons implement an ambient glow:
`box-shadow: 0 4px 14px 0 rgba(124, 58, 237, 0.35)` on hover, enhancing the tactile feedback of the signature violet-to-blue gradient.

## Shapes

The design system maintains geometric cohesion through a synchronized corner radius model:

- **Cards & Primary Modules:** Fixed `12px` (`0.75rem`) border radius, delivering a modern SaaS appearance that avoids both harsh rectangles and juvenile bubble styling.
- **Inputs & Action Buttons:** Standardized at `8px` (`0.5rem`) for 40px–44px controls, preserving clean internal framing within cards.
- **Skill Badges & Metadata Chips:** Full pill geometry (`9999px`) to create an immediate visual distinction between actionable buttons and categorical tags.
- **Modals & Dialogs:** `16px` (`1rem`) to reinforce containment at elevated layers.

## Components

### Buttons
All desktop interactive triggers maintain a strict vertical footprint between 40px and 44px.
- **Primary AI Action:** Height `42px`, padding `0 18px`, radius `8px`. Background: `linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)`. Typography: White `14px`, weight `500`. Shadow: `0 1px 2px rgba(0,0,0,0.05)`. Hover: filter brightness `108%` and ambient purple shadow.
- **Secondary Neutral:** Height `42px`, padding `0 16px`, radius `8px`. Background: `#FFFFFF`, border: `1px solid #E2E8F0`, text: `#1E293B`. Hover: `#F8FAFC`, border `#CBD5E1`.
- **Destructive Reject:** Height `42px`, background: `#FFFFFF`, border: `1px solid #FCA5A5`, text: `#EF4444`. Hover: `#FEF2F2`.

### Input Fields & Selects
- Height: `40px` (standard desktop table/filter bar) or `44px` (forms and modal search).
- Background: `#FFFFFF`, border: `1px solid #E2E8F0`, radius `8px`, font size `14px`, text color `#0F172A`.
- Placeholder: `#94A3B8`.
- Focus State: Border color `#7C3AED`, outline: `2px solid rgba(124, 58, 237, 0.15)`.

### Skill & Attribute Pills
- Height: `24px`, padding `0 10px`, radius `9999px`.
- Background: `#E0F2FE`, border: `1px solid #BAE6FD`, text: `#0284C7`, font size `12px`, weight `500`.
- Inline dismiss or filter icons: `12px` stroke, `#0284C7`.

### Cards & Partner Profiles
- Base: `#FFFFFF`, border `1px solid #E2E8F0`, radius `12px`, padding `20px`.
- Header Area: Company icon/avatar (44px, radius `8px`), name (`16px`, weight `600`, color `#0F172A`), category tag.
- AI Match Rating Indicator: Circular percentage badge with a conical or stroke gradient (`#7C3AED` to `#3B82F6`), font size `14px`, weight `700`.
- Skill Cluster: Horizontal flex container displaying skill pills with `gap: 6px`.

### Lists & Data Grids
- Row Height: `52px` for data density without visual clutter.
- Alternating Rows: Hover-only background transition to `#F8FAFC`.
- Grid Border: Divider lines `1px solid #F1F5F9`. Header background `#F8FAFC`, header text uppercase `11px`, weight `600`, tracking `0.05em`, color `#64748B`.

### Checkboxes & Radios
- Size: `18px x 18px`.
- Unchecked: `#FFFFFF` with `1px solid #CBD5E1`, radius `4px` (checkbox) or `50%` (radio).
- Checked: Background `#7C3AED`, border `#7C3AED`, check/radio dot in `#FFFFFF`.