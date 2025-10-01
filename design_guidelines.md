# Design Guidelines: Cursor Free Web Application

## Design Approach
**Reference-Based Approach**: VS Code / Cursor IDE Interface

This is a developer tool requiring the familiar, productivity-focused aesthetic of modern code editors. Primary references: VS Code, Cursor IDE, and Replit.

## Core Design Elements

### A. Color Palette

**Dark Mode (Primary)**
- Background: 20 8% 10% (deep charcoal, main editor background)
- Panel Background: 20 8% 14% (sidebar/panel containers)
- Terminal Background: 0 0% 7% (darker terminal area)
- Border: 0 0% 20% (subtle panel dividers)
- Text Primary: 0 0% 90% (high contrast code text)
- Text Secondary: 0 0% 60% (comments, metadata)
- Accent Primary: 217 91% 60% (VS Code blue for buttons, links)
- Success: 142 71% 45% (play button, success states)
- Warning: 38 92% 50% (radio status indicators)

### B. Typography

**Font Stack**
- Code/Monospace: 'Monaco', 'Menlo', 'Consolas', monospace (editor and terminal)
- UI Text: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif (menus, buttons)

**Sizes**
- Code Editor: text-sm (14px base)
- Terminal: text-xs (12px)
- Panel Headers: text-xs font-semibold uppercase tracking-wide
- Button Labels: text-sm font-medium

### C. Layout System

**Spacing Primitives**: Tight spacing units - 1, 2, 3, 4, 6, 8 (matching VS Code's compact aesthetic)

**Grid Structure**
- Left Sidebar: 48px (icon activity bar) + 250px (file explorer/panels)
- Main Editor Area: flex-1 (remaining space)
- Right Panel: 300px (radio player, optional collapsible)
- Bottom Terminal: 200-300px height (collapsible)

**Panel Architecture**
```
┌─────┬──────────────────────────────────────┬─────────┐
│Icons│  Editor Area / Code Panel           │ Radio   │
│ Bar │  (Monaco Editor + Tab Bar)           │ Panel   │
│     │                                       │         │
│     ├──────────────────────────────────────┤         │
│     │  Terminal / Game Container           │         │
└─────┴──────────────────────────────────────┴─────────┘
```

### D. Component Library

**Navigation & Panels**
- Activity Bar (Left Icons): 48px width, vertical icon stack with hover tooltips
- Tab Bar: 35px height, file-style tabs with close buttons
- Panel Headers: 35px height with title + action icons
- Resize Handles: 4px draggable borders between panels

**Code Editor**
- Monaco Editor integration with VS Code Dark+ theme
- Line numbers, syntax highlighting, minimap (right side)
- Tab size indicators, file type icons
- Status bar at bottom with cursor position, file info

**Radio Player (Right Panel)**
- Station list with frequency display (e.g., "NPR 89.3 FM")
- Volume slider with visual wave indicator
- Current station large display with waveform animation
- Preset buttons for quick station switching
- Mini player mode (collapsible to icon)

**Terminal/Game Container (Bottom Panel)**
- Default: Terminal emulator with command prompt
- Game Mode: Replaces terminal content when "+" button clicked
- Game selector modal with Snake and 2048 options
- Snake: ASCII/block-based rendering with WASD controls display
- 2048: Grid layout with tile animations

**Buttons & Controls**
- Primary Button: Accent blue background, white text, 32px height
- Secondary Button: Transparent with border, accent blue border/text
- Icon Buttons: 28px square, hover background change
- "+" Button: Fixed position (bottom-right of editor), circular, 44px

**Download Extension Section**
- Prominent card in sidebar or modal
- Extension icon + "Codex Free" title
- Version number and file size
- Download button with platform detection
- Installation instructions collapse

**Telegram Auth**
- Telegram blue branding (0 136% 50%)
- Widget embedded in top-right or login modal
- User avatar + name display after auth
- Logout option in dropdown menu

### E. Specific Feature Designs

**Game Modals**
- Overlay: Dark backdrop with 40% opacity
- Modal: 600px × 500px centered card
- Snake Canvas: 400px × 400px with score display above
- 2048 Grid: 400px × 400px responsive grid
- Controls hint: Bottom overlay showing WASD keys
- Close button: Top-right "×" icon

**Radio Wave Animation**
- Subtle pulsing circles emanating from station icon
- Frequency spectrum bars (5-7 bars) dancing to audio
- Tuning dial: Circular knob with station markers

**Terminal Integration**
- Prompt: "user@cursor-free:~$" in green
- Command history with up/down arrow navigation
- "game snake" or "game 2048" commands to launch
- Clear terminal with Ctrl+L hint

## Images

**No hero images required** - this is a tool interface, not a marketing page.

**Icon Assets**
- Activity bar icons: Code, Radio, Games, Settings, User (24px)
- File type icons in tabs (16px)
- Game icons in modal selector (48px)

**Radio Station Logos**
- Small circular logos (32px) next to station names
- NPR, BBC, local American stations (use placeholder or CDN logos)

## Animation

**Minimal, Purposeful Animations**
- Panel resize: Smooth drag with 150ms easing
- Tab switching: 200ms slide transition
- Game modal: 300ms scale-up entrance
- Radio wave: Continuous subtle pulse (2s loop)
- No distracting effects - maintain IDE professionalism

## Accessibility

- Full keyboard navigation (Ctrl+B sidebar, Ctrl+` terminal)
- Focus indicators on all interactive elements
- Screen reader labels for icon-only buttons
- High contrast mode support (existing dark theme meets standards)
- Game controls clearly labeled with keyboard shortcuts