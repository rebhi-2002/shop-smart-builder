# StyleMart — Design System

## Brand
- **Name:** StyleMart
- **Voice:** Modern, trustworthy, fast, premium-but-accessible (Amazon/Noon inspired).
- **Logo:** wordmark `StyleMart`, bold, primary color.

## Color Tokens (HSL — `src/index.css`)
| Token | Light | Dark | Usage |
|---|---|---|---|
| `--background` | `0 0% 100%` | `222 47% 11%` | App background |
| `--foreground` | `222 47% 11%` | `210 40% 98%` | Body text |
| `--primary` | `245 65% 60%` | same | CTAs, links, brand |
| `--accent` | `262 83% 74%` | same | Highlights, gradients |
| `--secondary` | `210 40% 96%` | `217 33% 18%` | Subtle surfaces |
| `--muted` | `210 40% 96%` | `217 33% 18%` | Card backgrounds |
| `--destructive` | `0 84% 60%` | `0 63% 31%` | Errors, sale |
| `--border` | `214 32% 91%` | `217 33% 18%` | Dividers |
| `--ring` | `245 65% 60%` | same | Focus ring |

Promo banner: `bg-gradient-to-r from-primary/90 to-accent/90`.

## Typography
- Family: system sans (Inter fallback). Headings 700, body 400/500.
- Scale: xs 12 / sm 14 / base 16 / lg 18 / xl 20 / 2xl 24 / 3xl 30 / 4xl 36.
- H1 unique per page.

## Spacing & Radius
- `--radius: 0.75rem` (cards), buttons `rounded-md`, badges `rounded-full`.
- Container: `container mx-auto px-4`.
- Section rhythm: `py-8` mobile / `py-12` desktop.

## Components
- **Buttons:** primary / outline / ghost / destructive; sm / default / lg / icon.
- **ProductCard:** aspect-square image, discount badge, favorite heart, stars, price + compare-at strikethrough, Add to Cart.
- **Badges:** New, -X%, Bestseller, Out of Stock.
- **Inputs:** focus `ring-2 ring-ring`.
- **Toasts:** sonner; success / destructive.

## Motion
- Framer Motion fade+slide (y 20→0) 200ms ease-out.
- Card hover: `-translate-y-1 shadow-lg`.
- Image zoom: `scale-110` 500ms.

## Layout Rules
- Sticky header above promo banner.
- `html/body/#root` clamp `max-width: 100vw; overflow-x: hidden` (prevents horizontal scroll on mobile).
- Mobile breakpoint `md` 768px. Drawer nav under `md`.

## Imagery
- Unsplash + uploaded product photos. Alt text always. Lazy-load below fold. Fallback in ProductCard.

## Accessibility
- Contrast AA. Tap targets ≥44px mobile. Visible focus. Aria labels on icon buttons.
