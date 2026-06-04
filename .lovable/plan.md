# خطة تطوير StyleMart الشاملة — من الألف إلى الياء

متجر إلكتروني (React + Vite + Tailwind + shadcn). الهدف: رفع المبيعات، تقليل ترك السلة، تحسين تجربة الجوال، وإطلاق منتج نهائي على مستوى الشركات الكبيرة.

---

## المرحلة 0 — تشخيص الوضع الحالي

**نقاط القوة**
- بنية صفحات غنية (منتجات، فئات، حساب، أدمن، دفع).
- نظام Cart + Wishlist + Recently Viewed + Promo codes جاهز في `CartContext`.
- shadcn/ui + Tailwind + Framer Motion + React Query.

**نقاط الضعف الحرجة**
1. **لا يوجد Backend حقيقي** — كل البيانات Mock في الذاكرة/localStorage. لا حسابات، لا طلبات حقيقية، لا حماية لمسارات الأدمن.
2. **أمان**: `isAdmin` يُحسب من localStorage — قابل للتزوير. لا حماية على `/admin/*`.
3. **SEO ضعيف**: لا `react-helmet-async`، لا meta لكل صفحة، لا sitemap حقيقي، لا JSON-LD للمنتجات.
4. **الأداء**: لا تقسيم كود (lazy routes)، صور غير محسّنة، لا preloading.
5. **الجوال**: viewport الحالي 411px — الهيدر والـ filters تحتاج تحسين كبير.
6. **الدفع**: صفحة Checkout وهمية — لا مزود دفع حقيقي.
7. **الثقة**: لا تقييمات حقيقية، لا شارات أمان، لا سياسة إرجاع واضحة عند الـ CTA.
8. **CTA و Conversion**: الـ Add to Cart بدون feedback قوي، لا exit-intent، لا cart abandonment، لا upsell على صفحة المنتج.
9. **بنية الكود**: `ProductList.tsx` و `Index.tsx` و `Header.tsx` ملفات كبيرة تحتاج تقسيم (بدأ سابقًا ولم يكتمل).

---

## المرحلة 1 — الأساسات (Backend + Security)

1. **تفعيل Lovable Cloud** — قاعدة بيانات حقيقية للمنتجات، المستخدمين، الطلبات.
2. جداول: `products`, `categories`, `orders`, `order_items`, `reviews`, `addresses`, `profiles`, `user_roles` + RLS صارم.
3. **نظام الأدوار الآمن** — `user_roles` table + `has_role()` security definer (بديل localStorage admin).
4. حماية مسارات `/admin/*` و `/account/*` بـ `ProtectedRoute` يستخدم `has_role`.
5. Auth حقيقي: Email/Password + Google عبر Lovable Cloud.
6. Storage للصور (منتجات + avatars).

## المرحلة 2 — Design System موحّد

1. مراجعة `index.css` + `tailwind.config.ts`: HSL tokens فقط (`--primary`, `--accent`, `--success`, `--warning`, `--destructive`, gradients, shadows).
2. Typography scale + spacing scale + radius scale.
3. Dark mode كامل.
4. Variants لكل من Button, Card, Badge, Input تغطي حالات المتجر (price, sale, stock-out, new).
5. Motion presets موحّدة (fade, slide, scale) عبر Framer Motion.

## المرحلة 3 — صفحات أساسية (إصلاح + إعادة بناء)

| الصفحة | الحالة | العمل المطلوب |
|---|---|---|
| `/` Home | موجودة | Hero قوي + Categories grid + Featured + Deals + Testimonials + Newsletter + Trust bar |
| `/products` | موجودة | Filters sidebar (موبايل: drawer)، sort، pagination، grid/list toggle، عروض animated boxes |
| `/products/:id` | موجودة | Gallery + zoom، variants، sticky Add to Cart موبايل، reviews، related، shipping calc، Q&A |
| `/categories` + `/categories/:cat` | موجودة | Hero لكل فئة، breadcrumbs، subcategories |
| `/cart` | موجودة | Cross-sell، promo code UX، shipping estimate، sticky checkout summary |
| `/checkout` | وهمية | **متعدد الخطوات**: Shipping → Payment → Review، Guest checkout، address autocomplete |
| `/order-confirmation` | موجودة | Order tracking link، email confirmation، upsell |
| `/wishlist`, `/search` | موجودة | تحسين فلترة البحث، autocomplete |
| `/account/*` | موجودة | Orders history حقيقية، addresses CRUD، payment methods، wishlist sync |
| `/admin/*` | موجودة | حماية فعلية، CRUD حقيقي على DB، analytics بسيطة |

**صفحات ناقصة لإضافتها**
- `/reset-password` (مطلوب لـ Auth)
- `/order/:id` تتبع الطلب
- `/sell/become-seller` (اختياري إذا multi-vendor)
- `/blog` + `/blog/:slug` (SEO + content marketing)
- `/compare` مقارنة منتجات
- `/gift-cards`
- `/track-order` للضيوف
- صفحة 500 مخصصة
- `/sitemap.xml` ديناميكي

## المرحلة 4 — SEO

1. إضافة `react-helmet-async` + provider في `main.tsx`.
2. `<Helmet>` لكل صفحة: title، description، canonical، og:*، twitter:*.
3. JSON-LD: `Organization` في `index.html`، `Product` في PDP، `BreadcrumbList`، `FAQPage`، `ItemList` في category.
4. `sitemap.xml` ديناميكي + `robots.txt` صحيح.
5. صور alt text، semantic HTML، H1 وحيد لكل صفحة.
6. URLs صديقة: `/products/[slug]` بدلًا من `[id]`.

## المرحلة 5 — الأداء

1. `React.lazy` + `Suspense` لكل route.
2. `vite-imagetools` — webp/avif للصور.
3. Preload LCP image في الهوم.
4. Debounce على البحث والفلاتر.
5. React Query caching مفعّل بشكل صحيح + prefetch on hover.
6. Font-display: swap.

## المرحلة 6 — الجوال

1. Bottom nav للموبايل (Home, Shop, Search, Cart, Account).
2. Sticky Add to Cart bar في PDP.
3. Filters drawer من الأسفل (bottom sheet).
4. Tap targets ≥44px.
5. Swipeable product gallery.

## المرحلة 7 — الثقة والتحويل (CRO)

1. Trust bar أعلى: شحن مجاني، إرجاع 30 يوم، دفع آمن.
2. شارات أمان قرب زر الدفع.
3. تقييمات بنجوم + مراجعات بالصور.
4. "X شخص يشاهد هذا المنتج" / "بقي N قطعة" (scarcity صادق).
5. Exit-intent popup مع كود خصم.
6. Cart abandonment: حفظ السلة + إيميل تذكير (عبر Edge Function).
7. Upsell على PDP + cross-sell في Cart.
8. FAQ مدمج في PDP.
9. Reviews verified badge.

## المرحلة 8 — الدفع

- تفعيل **Lovable Payments**: نوصي بـ **Stripe** (الجاهز للمنتجات الفيزيائية والرقمية) أو **Shopify** إذا كانت منتجات فيزيائية فقط مع شحن وإدارة مخزون.
- سنشغّل `recommend_payment_provider` قبل التفعيل ليحدد الأنسب.

## المرحلة 9 — Admin

1. Dashboard: مبيعات، طلبات حديثة، منتجات الأكثر مبيعًا، تنبيهات مخزون.
2. CRUD حقيقي للمنتجات (مع رفع صور لـ Storage).
3. إدارة الطلبات: تحديث الحالة، طباعة فاتورة.
4. إدارة المستخدمين + الأدوار.
5. إدارة الأكواد الترويجية.

## المرحلة 10 — جودة + إطلاق

1. Error boundaries لكل route.
2. Loading skeletons موحّدة.
3. Toast notifications متّسقة.
4. Empty states جميلة.
5. Accessibility: aria labels، keyboard nav، contrast AA.
6. Analytics (Plausible أو GA4).
7. Cookie consent بسيط.
8. اختبار E2E سريع على المسارات الحرجة (Cart → Checkout → Confirmation).
9. SEO scan + Security scan قبل النشر.
10. النشر.

---

## الجدول الزمني (مقترح تنفيذ متتابع)

| المرحلة | المدة (جلسات) |
|---|---|
| 1. Backend + Auth + Roles | 2 |
| 2. Design System | 1 |
| 3. صفحات أساسية + ناقصة | 3-4 |
| 4. SEO | 1 |
| 5. الأداء | 1 |
| 6. الجوال | 1 |
| 7. الثقة + CRO | 1-2 |
| 8. الدفع | 1 |
| 9. Admin حقيقي | 1-2 |
| 10. جودة + إطلاق | 1 |

---

## التفاصيل التقنية

- **Stack**: React 18 + Vite + Tailwind + shadcn + Framer Motion + React Query + react-router + react-helmet-async + Lovable Cloud (Supabase) + Lovable Payments (Stripe).
- **DB schema** (نسخة أولية):
  - `profiles(id uuid pk → auth.users, full_name, avatar_url, phone)`
  - `user_roles(id, user_id, role app_role)` + `has_role()` security definer
  - `categories(id, slug, name, image, parent_id)`
  - `products(id, slug, name, description, price, compare_at_price, stock, category_id, images jsonb, specs jsonb, is_featured, is_new)`
  - `reviews(id, product_id, user_id, rating, title, body, images jsonb, verified)`
  - `addresses(id, user_id, …)`
  - `orders(id, user_id, status, total, shipping_address, payment_intent_id, …)`
  - `order_items(id, order_id, product_id, qty, price)`
  - `promo_codes(code, discount_pct, expires_at, usage_limit)`
- **RLS**: المستخدم يقرأ/يعدّل بياناته فقط؛ admin عبر `has_role(auth.uid(),'admin')`؛ products/categories قراءة عامة.
- **Edge Functions**: `create-checkout`, `stripe-webhook`, `send-order-email`, `abandoned-cart-cron`.

---

## حالة التقدم (محدّث)

| المرحلة | الحالة |
|---|---|
| 1. Backend + Auth + Roles | ✅ منجز — جداول + RLS + has_role + Google OAuth + ProtectedRoute + ResetPassword |
| 2. Design System | 🟡 جزئي — tokens موجودة، أُضيف `overflow-x` clamp + design.md، يحتاج dark polish + price variants |
| 3. صفحات أساسية | 🟡 Home/Products/PDP/Cart/Checkout/Orders/Admin متصلة بـ DB. ناقص: `/order/:id` tracking، `/track-order`، `/blog`، `/compare`، `/gift-cards`، صفحة 500 |
| 4. SEO | ❌ react-helmet-async + JSON-LD + sitemap ديناميكي |
| 5. الأداء | ❌ lazy routes، image optim، preload LCP |
| 6. الجوال | 🟡 أُصلح overflow أفقي. ناقص: bottom nav، sticky Add to Cart، filters bottom sheet |
| 7. CRO | ❌ trust bar، scarcity، exit-intent، upsell، cart-abandon |
| 8. الدفع | ❌ Stripe عبر Lovable Payments |
| 9. Admin | 🟡 CRUD متصل، يحتاج analytics + image upload |
| 10. جودة + إطلاق | ❌ error boundaries، skeletons، a11y، analytics، cookie consent |

## ملاحظات حرجة
- **النسخة المنشورة قديمة** — تم نشرها قبل ربط الـ DB، لذلك تظهر فارغة. الحل: إعادة النشر من زر Publish.
- على الـ preview الفئات تظهر فعلًا 0 لأن الصفحة كانت تحسب على mock — تم ربط `productService` بالـ DB والمنتجات تُحمَّل بنجاح؛ سيظهر العدد الصحيح فور تحديث الصفحة.

## الخطوات التالية (متتابعة)
1. المرحلة 4 — SEO (helmet + JSON-LD + sitemap).
2. المرحلة 5 — lazy routes + image optim.
3. المرحلة 6 — bottom nav + sticky CTA موبايل.
4. المرحلة 7 — CRO bundle.
5. المرحلة 8 — Stripe.
6. المرحلة 10 — صقل وإطلاق.

