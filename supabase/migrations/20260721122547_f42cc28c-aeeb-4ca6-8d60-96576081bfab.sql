
UPDATE products SET images = jsonb_build_array(
  images->0,
  to_jsonb(regexp_replace(images->>0, '\?.*$', '?q=80&w=1200&auto=format&fit=crop&crop=top')),
  to_jsonb(regexp_replace(images->>0, '\?.*$', '?q=80&w=1200&auto=format&fit=crop&crop=bottom')),
  to_jsonb(regexp_replace(images->>0, '\?.*$', '?q=80&w=1200&auto=format&fit=crop&crop=left'))
)
WHERE jsonb_array_length(images) = 1;
