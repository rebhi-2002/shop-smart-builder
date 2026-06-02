
-- Seed categories
INSERT INTO public.categories (name, slug, description, image_url, display_order) VALUES
('Electronics','electronics','Phones, audio, wearables and more','https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1200&auto=format&fit=crop',1),
('Fashion','fashion','Apparel, shoes and accessories','https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop',2),
('Home','home','Kitchen, decor and appliances','https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1200&auto=format&fit=crop',3),
('Beauty','beauty','Skincare, makeup and care','https://images.unsplash.com/photo-1522335789203-aAa5f0a5b6c9?q=80&w=1200&auto=format&fit=crop',4),
('Books','books','Bestsellers and classics','https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1200&auto=format&fit=crop',5),
('Toys','toys','Fun for all ages','https://images.unsplash.com/photo-1558877385-8c1c30a30d4d?q=80&w=1200&auto=format&fit=crop',6),
('Sports','sports','Gear and equipment','https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200&auto=format&fit=crop',7),
('Automotive','automotive','Car accessories and gear','https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1200&auto=format&fit=crop',8)
ON CONFLICT (slug) DO UPDATE SET image_url = EXCLUDED.image_url, description = EXCLUDED.description;

-- Ensure unique on slug for products
DO $$ BEGIN
  ALTER TABLE public.products ADD CONSTRAINT products_slug_key UNIQUE (slug);
EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; END $$;

-- Helper: insert products
WITH c AS (SELECT id, slug FROM public.categories)
INSERT INTO public.products (name, slug, description, price, compare_at_price, images, category_id, stock, is_featured, is_new, rating, review_count, tags) VALUES
('Wireless Headphones','wireless-headphones','Premium noise-cancelling over-ear headphones',199.99,235.28,'["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop"]'::jsonb,(SELECT id FROM c WHERE slug='electronics'),100,true,false,4.5,128,ARRAY['audio','wireless']),
('Smart Watch','smart-watch','Fitness tracking and notifications',299.99,NULL,'["https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1200&auto=format&fit=crop"]'::jsonb,(SELECT id FROM c WHERE slug='electronics'),75,true,true,4.2,84,ARRAY['wearable']),
('Smartphone Pro','smartphone-pro','Flagship phone with pro camera system',899.99,999.99,'["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop"]'::jsonb,(SELECT id FROM c WHERE slug='electronics'),85,true,true,4.7,312,ARRAY['phone']),
('Fitness Tracker','fitness-tracker','Waterproof activity and sleep tracker',79.99,NULL,'["https://images.unsplash.com/photo-1576243345690-4e4b79b63288?q=80&w=1200&auto=format&fit=crop"]'::jsonb,(SELECT id FROM c WHERE slug='electronics'),120,false,false,4.1,56,ARRAY['wearable']),
('Portable Speaker','portable-speaker','Waterproof Bluetooth speaker, 24h battery',129.99,NULL,'["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1200&auto=format&fit=crop"]'::jsonb,(SELECT id FROM c WHERE slug='electronics'),90,false,true,4.4,142,ARRAY['audio']),
('Designer Handbag','designer-handbag','Elegant premium leather handbag',499.99,NULL,'["https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop"]'::jsonb,(SELECT id FROM c WHERE slug='fashion'),30,true,false,4.8,67,ARRAY['bag']),
('Running Shoes','running-shoes','Lightweight all-terrain running shoes',89.99,NULL,'["https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop"]'::jsonb,(SELECT id FROM c WHERE slug='fashion'),50,false,true,4.3,201,ARRAY['shoes']),
('Classic Denim Jacket','classic-denim-jacket','Timeless denim jacket for every season',79.99,99.99,'["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1200&auto=format&fit=crop"]'::jsonb,(SELECT id FROM c WHERE slug='fashion'),60,true,false,4.4,88,ARRAY['jacket']),
('Leather Wallet','leather-wallet','Handmade slim leather wallet',49.99,NULL,'["https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1200&auto=format&fit=crop"]'::jsonb,(SELECT id FROM c WHERE slug='fashion'),140,false,false,4.6,73,ARRAY['accessory']),
('Coffee Maker','coffee-maker','Premium drip coffee maker',129.99,144.43,'["https://images.unsplash.com/photo-1522125123931-9304d91a42ee?q=80&w=1200&auto=format&fit=crop"]'::jsonb,(SELECT id FROM c WHERE slug='home'),60,false,false,4.0,45,ARRAY['kitchen']),
('Kitchen Mixer','kitchen-mixer','Professional stand mixer',349.99,399.99,'["https://images.unsplash.com/photo-1578643463396-0997cb5328c1?q=80&w=1200&auto=format&fit=crop"]'::jsonb,(SELECT id FROM c WHERE slug='home'),25,true,false,4.9,156,ARRAY['kitchen']),
('Premium Blender','premium-blender','High-speed blender',199.99,266.65,'["https://images.unsplash.com/photo-1570222094114-d054a817e56b?q=80&w=1200&auto=format&fit=crop"]'::jsonb,(SELECT id FROM c WHERE slug='home'),40,false,false,4.6,98,ARRAY['kitchen']),
('Cozy Throw Blanket','cozy-throw-blanket','Soft knit blanket for living room',59.99,NULL,'["https://images.unsplash.com/photo-1600369671236-e74521d4b6ad?q=80&w=1200&auto=format&fit=crop"]'::jsonb,(SELECT id FROM c WHERE slug='home'),80,false,true,4.5,32,ARRAY['decor']),
('Luxury Face Cream','luxury-face-cream','Anti-aging cream with natural ingredients',79.99,NULL,'["https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=1200&auto=format&fit=crop"]'::jsonb,(SELECT id FROM c WHERE slug='beauty'),35,true,true,4.7,210,ARRAY['skincare']),
('Organic Shampoo','organic-shampoo','Chemical-free shampoo for all hair types',24.99,27.77,'["https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1200&auto=format&fit=crop"]'::jsonb,(SELECT id FROM c WHERE slug='beauty'),80,false,false,4.3,64,ARRAY['haircare']),
('Premium Makeup Kit','premium-makeup-kit','Complete makeup kit with brushes',149.99,176.46,'["https://images.unsplash.com/photo-1583241800698-9c2e0b2f5b8a?q=80&w=1200&auto=format&fit=crop"]'::jsonb,(SELECT id FROM c WHERE slug='beauty'),25,true,true,4.8,189,ARRAY['makeup']),
('Best-selling Novel','best-selling-novel','Award-winning fiction novel',19.99,NULL,'["https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1200&auto=format&fit=crop"]'::jsonb,(SELECT id FROM c WHERE slug='books'),100,true,false,4.9,540,ARRAY['fiction']),
('Cookbook Collection','cookbook-collection','International cuisine cookbook set',49.99,62.49,'["https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=1200&auto=format&fit=crop"]'::jsonb,(SELECT id FROM c WHERE slug='books'),40,false,false,4.5,77,ARRAY['cooking']),
('Children Book Set','children-book-set','Illustrated books for early readers',34.99,NULL,'["https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1200&auto=format&fit=crop"]'::jsonb,(SELECT id FROM c WHERE slug='books'),60,false,true,4.7,98,ARRAY['kids']),
('Remote Control Car','remote-control-car','High-speed RC off-road car',75.00,93.75,'["https://images.unsplash.com/photo-1594787318286-3d835c1d207f?q=80&w=1200&auto=format&fit=crop"]'::jsonb,(SELECT id FROM c WHERE slug='toys'),45,true,false,4.3,55,ARRAY['rc']),
('Building Blocks','building-blocks','Creative educational blocks',39.99,NULL,'["https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=1200&auto=format&fit=crop"]'::jsonb,(SELECT id FROM c WHERE slug='toys'),70,false,true,4.6,121,ARRAY['educational']),
('Robot Toy','robot-toy','Programmable robot for kids',99.99,111.10,'["https://images.unsplash.com/photo-1535378917042-10a22c95931a?q=80&w=1200&auto=format&fit=crop"]'::jsonb,(SELECT id FROM c WHERE slug='toys'),30,true,true,4.8,144,ARRAY['educational']),
('Basketball','basketball','Pro size & weight indoor/outdoor ball',49.99,NULL,'["https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=1200&auto=format&fit=crop"]'::jsonb,(SELECT id FROM c WHERE slug='sports'),85,false,false,4.5,67,ARRAY['ball']),
('Yoga Mat Set','yoga-mat-set','Mat with blocks and strap',59.99,70.58,'["https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop"]'::jsonb,(SELECT id FROM c WHERE slug='sports'),50,true,true,4.6,99,ARRAY['fitness']),
('Mountain Bike','mountain-bike','21-speed all-terrain bike',499.99,555.54,'["https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?q=80&w=1200&auto=format&fit=crop"]'::jsonb,(SELECT id FROM c WHERE slug='sports'),20,true,false,4.7,38,ARRAY['cycling']),
('Car Audio System','car-audio-system','High-performance Bluetooth car stereo',349.99,NULL,'["https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1200&auto=format&fit=crop"]'::jsonb,(SELECT id FROM c WHERE slug='automotive'),25,false,true,4.4,29,ARRAY['audio']),
('Dash Camera','dash-camera','4K dashboard camera with night vision',129.99,152.93,'["https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1200&auto=format&fit=crop"]'::jsonb,(SELECT id FROM c WHERE slug='automotive'),60,false,true,4.5,71,ARRAY['camera'])
ON CONFLICT (slug) DO NOTHING;

-- Seed initial promo codes
INSERT INTO public.promo_codes (code, description, discount_pct, min_subtotal, is_active) VALUES
('WELCOME10','10% off your first order',10,0,true),
('SAVE50','10% off when you spend over $50',10,50,true),
('SUMMER20','20% off everything',20,0,true)
ON CONFLICT (code) DO NOTHING;
