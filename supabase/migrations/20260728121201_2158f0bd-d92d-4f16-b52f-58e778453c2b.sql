ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS shopify_product_id TEXT,
  ADD COLUMN IF NOT EXISTS shopify_variant_id TEXT;

UPDATE public.products SET shopify_product_id = 'gid://shopify/Product/15410104631407', shopify_variant_id = 'gid://shopify/ProductVariant/53895928381551' WHERE name = 'Basketball';
UPDATE public.products SET shopify_product_id = 'gid://shopify/Product/15410104664175', shopify_variant_id = 'gid://shopify/ProductVariant/53895928414319' WHERE name = 'Best-selling Novel';
UPDATE public.products SET shopify_product_id = 'gid://shopify/Product/15410104696943', shopify_variant_id = 'gid://shopify/ProductVariant/53895928447087' WHERE name = 'Building Blocks';
UPDATE public.products SET shopify_product_id = 'gid://shopify/Product/15410104729711', shopify_variant_id = 'gid://shopify/ProductVariant/53895928479855' WHERE name = 'Car Audio System';
UPDATE public.products SET shopify_product_id = 'gid://shopify/Product/15410104762479', shopify_variant_id = 'gid://shopify/ProductVariant/53895928512623' WHERE name = 'Children Book Set';
UPDATE public.products SET shopify_product_id = 'gid://shopify/Product/15410106990703', shopify_variant_id = 'gid://shopify/ProductVariant/53895928479855' WHERE name = 'Classic Denim Jacket';
UPDATE public.products SET shopify_product_id = 'gid://shopify/Product/15410107023471', shopify_variant_id = 'gid://shopify/ProductVariant/53895928512623' WHERE name = 'Coffee Maker';
UPDATE public.products SET shopify_product_id = 'gid://shopify/Product/15410107056239', shopify_variant_id = 'gid://shopify/ProductVariant/53895928545391' WHERE name = 'Cookbook Collection';
UPDATE public.products SET shopify_product_id = 'gid://shopify/Product/15410107089007', shopify_variant_id = 'gid://shopify/ProductVariant/53895928578159' WHERE name = 'Cozy Throw Blanket';
UPDATE public.products SET shopify_product_id = 'gid://shopify/Product/15410107121775', shopify_variant_id = 'gid://shopify/ProductVariant/53895928610927' WHERE name = 'Dash Camera';
UPDATE public.products SET shopify_product_id = 'gid://shopify/Product/15410107646063', shopify_variant_id = 'gid://shopify/ProductVariant/53895930019951' WHERE name = 'Designer Handbag';
UPDATE public.products SET shopify_product_id = 'gid://shopify/Product/15410107678831', shopify_variant_id = 'gid://shopify/ProductVariant/53895930052719' WHERE name = 'Fitness Tracker';
UPDATE public.products SET shopify_product_id = 'gid://shopify/Product/15410107711599', shopify_variant_id = 'gid://shopify/ProductVariant/53895930085487' WHERE name = 'Kitchen Mixer';
UPDATE public.products SET shopify_product_id = 'gid://shopify/Product/15410107744367', shopify_variant_id = 'gid://shopify/ProductVariant/53895930118255' WHERE name = 'Leather Wallet';
UPDATE public.products SET shopify_product_id = 'gid://shopify/Product/15410107777135', shopify_variant_id = 'gid://shopify/ProductVariant/53895930151023' WHERE name = 'Luxury Face Cream';
UPDATE public.products SET shopify_product_id = 'gid://shopify/Product/15410108072047', shopify_variant_id = 'gid://shopify/ProductVariant/53895930544239' WHERE name = 'Mountain Bike';
UPDATE public.products SET shopify_product_id = 'gid://shopify/Product/15410108104815', shopify_variant_id = 'gid://shopify/ProductVariant/53895930577007' WHERE name = 'Organic Shampoo';
UPDATE public.products SET shopify_product_id = 'gid://shopify/Product/15410108137583', shopify_variant_id = 'gid://shopify/ProductVariant/53895930609775' WHERE name = 'Portable Speaker';
UPDATE public.products SET shopify_product_id = 'gid://shopify/Product/15410108170351', shopify_variant_id = 'gid://shopify/ProductVariant/53895930642543' WHERE name = 'Premium Blender';
UPDATE public.products SET shopify_product_id = 'gid://shopify/Product/15410108203119', shopify_variant_id = 'gid://shopify/ProductVariant/53895930675311' WHERE name = 'Premium Makeup Kit';
UPDATE public.products SET shopify_product_id = 'gid://shopify/Product/15410108268655', shopify_variant_id = 'gid://shopify/ProductVariant/53895930740847' WHERE name = 'Remote Control Car';
UPDATE public.products SET shopify_product_id = 'gid://shopify/Product/15410108334191', shopify_variant_id = 'gid://shopify/ProductVariant/53895930806383' WHERE name = 'Robot Toy';
UPDATE public.products SET shopify_product_id = 'gid://shopify/Product/15410108366959', shopify_variant_id = 'gid://shopify/ProductVariant/53895930839151' WHERE name = 'Running Shoes';
UPDATE public.products SET shopify_product_id = 'gid://shopify/Product/15410108399727', shopify_variant_id = 'gid://shopify/ProductVariant/53895930871919' WHERE name = 'Smart Watch';
UPDATE public.products SET shopify_product_id = 'gid://shopify/Product/15410108432495', shopify_variant_id = 'gid://shopify/ProductVariant/53895930904687' WHERE name = 'Smartphone Pro';
UPDATE public.products SET shopify_product_id = 'gid://shopify/Product/15410108498031', shopify_variant_id = 'gid://shopify/ProductVariant/53895931002991' WHERE name = 'Wireless Headphones';
UPDATE public.products SET shopify_product_id = 'gid://shopify/Product/15410108530799', shopify_variant_id = 'gid://shopify/ProductVariant/53895931035759' WHERE name = 'Yoga Mat Set';

CREATE INDEX IF NOT EXISTS idx_products_shopify_variant_id ON public.products(shopify_variant_id);