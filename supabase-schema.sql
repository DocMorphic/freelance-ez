-- freelance-ez: Sites table for storing generated website configs

CREATE TABLE IF NOT EXISTS sites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  name TEXT NOT NULL,
  config JSONB NOT NULL
);

-- Allow public read/write (no auth needed for MVP)
ALTER TABLE sites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read sites" ON sites FOR SELECT USING (true);
CREATE POLICY "Anyone can insert sites" ON sites FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update sites" ON sites FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete sites" ON sites FOR DELETE USING (true);
