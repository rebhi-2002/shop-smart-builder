export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  date: string;
  author: string;
  readMinutes: number;
  body: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'how-to-choose-wireless-headphones',
    title: 'How to Choose the Right Wireless Headphones',
    excerpt:
      'Noise cancelling, battery life, codecs and comfort — the four things that actually matter before you buy.',
    cover:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&h=675&fit=crop',
    date: '2026-06-12',
    author: 'StyleMart Editors',
    readMinutes: 5,
    body: [
      'Wireless headphones have become a daily essential, but the spec sheets rarely tell you how a pair will actually feel after three hours of use.',
      'Start with noise cancellation. Active noise cancellation (ANC) works best on constant low-frequency sound like plane engines or traffic. If you mostly work in a quiet room, a good passive seal matters more than aggressive ANC.',
      'Battery life should be measured with ANC on. A pair advertising 40 hours often delivers 25 with everything enabled — still plenty for a week of commutes.',
      'Finally, comfort beats everything. Clamping force, earcup depth and weight decide whether you reach for them every day or leave them on the shelf.',
    ],
  },
  {
    slug: 'building-a-capsule-wardrobe',
    title: 'Building a Capsule Wardrobe That Lasts',
    excerpt:
      'Fewer pieces, better fabrics, more outfits. A practical guide to a wardrobe that works all year.',
    cover:
      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1200&h=675&fit=crop',
    date: '2026-05-28',
    author: 'StyleMart Editors',
    readMinutes: 6,
    body: [
      'A capsule wardrobe is a small, intentional set of clothes that mix and match effortlessly. The goal is not minimalism for its own sake — it is fewer decisions and better daily outfits.',
      'Start with a neutral base: two pairs of trousers, three shirts, one jacket and one knit in colours that all work together. Add two or three accent pieces per season.',
      'Fabric quality is where the durability comes from. Look for dense weaves, natural fibres and reinforced seams — they survive far more wash cycles.',
      'Rotate seasonally rather than replacing. Store off-season items properly and your capsule will keep its shape for years.',
    ],
  },
  {
    slug: 'secure-online-shopping-checklist',
    title: 'The Secure Online Shopping Checklist',
    excerpt:
      'Seven quick checks that protect your card details and your delivery every time you check out.',
    cover:
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1200&h=675&fit=crop',
    date: '2026-04-19',
    author: 'StyleMart Editors',
    readMinutes: 4,
    body: [
      'Online shopping is safer than ever, but a few habits still make a big difference.',
      'Always confirm the padlock and the domain name before entering payment details. Look for a clear returns policy and a real support contact.',
      'Prefer stored payment tokens or wallets over typing your card number on new devices, and enable transaction alerts with your bank.',
      'Keep the order confirmation email — it is the fastest route to a refund if anything goes wrong with the delivery.',
    ],
  },
];

export const getPostBySlug = (slug?: string) =>
  blogPosts.find((p) => p.slug === slug);
