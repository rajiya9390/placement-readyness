# KodNest Premium Build System - Design Specification

## Overview
A calm, intentional, and confident design system for premium SaaS applications.

## Color System
| Role | Hex | Variable |
| :--- | :--- | :--- |
| Background | `#F7F6F3` | `--bg-primary` |
| Primary Text | `#111111` | `--text-primary` |
| Accent | `#8B0000` | `--color-accent` |
| Success | Muted Green | `--color-success` |
| Warning | Muted Amber | `--color-warning` |

## Typography
- **Headings**: Serif (Instrument Serif), 500 weight, tight letter-spacing.
- **Body**: Sans-serif (Instrument Sans), 16px, 1.6 line-height, max 720px width.

## Spacing Scale
- 8px, 16px, 24px, 40px, 64px

## Global Layout Structure
1. **Top Bar**: Branding, Progress indicator, Status badge.
2. **Context Header**: Large serif headline, line subtext.
3. **Workspace Grid**: 70/30 split between primary workspace and secondary panel.
4. **Proof Footer**: Persistent bottom section for verification.

## Component Rules
- **Buttons**:
  - Primary: Solid `#8B0000`, white text.
  - Secondary: Outlined, subtle hover.
- **Inputs**: 1px border, no shadow, black focus border.
- **Cards**: 1px subtle border, no drop shadows.
- **Interactions**: 180ms ease-in-out transitions.
