
-- Move has_role to private schema (not exposed by PostgREST)
CREATE SCHEMA IF NOT EXISTS private;

CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated, anon;

-- Recreate policies referencing private.has_role
DROP POLICY IF EXISTS "users view own roles" ON public.user_roles;
DROP POLICY IF EXISTS "admins manage roles" ON public.user_roles;
CREATE POLICY "users view own roles" ON public.user_roles FOR SELECT
  USING ((auth.uid() = user_id) OR private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "admins manage roles" ON public.user_roles FOR ALL
  USING (private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "profiles self read" ON public.profiles;
CREATE POLICY "profiles self read" ON public.profiles FOR SELECT
  USING ((auth.uid() = id) OR private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "categories admin write" ON public.categories;
CREATE POLICY "categories admin write" ON public.categories FOR ALL
  USING (private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "products public read" ON public.products;
DROP POLICY IF EXISTS "products admin write" ON public.products;
CREATE POLICY "products public read" ON public.products FOR SELECT
  USING (is_active OR private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "products admin write" ON public.products FOR ALL
  USING (private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "reviews delete own or admin" ON public.reviews;
CREATE POLICY "reviews delete own or admin" ON public.reviews FOR DELETE
  USING ((auth.uid() = user_id) OR private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "addresses own access" ON public.addresses;
CREATE POLICY "addresses own access" ON public.addresses FOR ALL
  USING ((auth.uid() = user_id) OR private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "orders own read" ON public.orders;
DROP POLICY IF EXISTS "orders admin update" ON public.orders;
CREATE POLICY "orders own read" ON public.orders FOR SELECT
  USING ((auth.uid() = user_id) OR private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "orders admin update" ON public.orders FOR UPDATE
  USING (private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "order_items read via order" ON public.order_items;
CREATE POLICY "order_items read via order" ON public.order_items FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.orders o
    WHERE o.id = order_items.order_id
      AND (o.user_id = auth.uid() OR private.has_role(auth.uid(), 'admin'::public.app_role))
  ));

-- Restrict promo_codes read to authenticated only (no anon enumeration)
DROP POLICY IF EXISTS "promo public read active" ON public.promo_codes;
DROP POLICY IF EXISTS "promo admin write" ON public.promo_codes;
CREATE POLICY "promo authenticated read active" ON public.promo_codes FOR SELECT
  TO authenticated
  USING (is_active);
CREATE POLICY "promo admin write" ON public.promo_codes FOR ALL
  TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

REVOKE SELECT ON public.promo_codes FROM anon;

-- Drop old public.has_role now that no policy references it
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);
