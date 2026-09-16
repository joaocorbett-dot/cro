-- Run this once in your Supabase project's SQL editor
-- (Project > SQL Editor > New query > paste this in > Run)

create extension if not exists pgcrypto;

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric(10,2),
  image_url text,
  category text,
  in_stock boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table products enable row level security;

-- Anyone (including logged-out visitors) can view products.
create policy "Public can read products"
  on products for select
  using (true);

-- Only a signed-in admin can add, edit, or remove products.
create policy "Authenticated users can insert products"
  on products for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update products"
  on products for update
  to authenticated
  using (true);

create policy "Authenticated users can delete products"
  on products for delete
  to authenticated
  using (true);

-- Storage bucket for product photos
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

create policy "Public read product images"
  on storage.objects for select
  using (bucket_id = 'product-images');

create policy "Authenticated upload product images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'product-images');

create policy "Authenticated update product images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'product-images');

create policy "Authenticated delete product images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'product-images');
