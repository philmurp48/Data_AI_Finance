-- Supabase Database Setup for Excel Data Storage
-- Run this SQL in your Supabase SQL Editor

-- Create the excel_data table
CREATE TABLE IF NOT EXISTS excel_data (
    id TEXT PRIMARY KEY DEFAULT 'latest',
    data JSONB NOT NULL,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    uploaded_by TEXT
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_excel_data_uploaded_at ON excel_data(uploaded_at DESC);

-- Enable Row Level Security (optional, for multi-user scenarios)
ALTER TABLE excel_data ENABLE ROW LEVEL SECURITY;

-- Policy to allow all reads (adjust based on your security needs)
CREATE POLICY "Allow public read access" ON excel_data
    FOR SELECT
    USING (true);

-- Policy to allow all writes (adjust based on your security needs)
CREATE POLICY "Allow public write access" ON excel_data
    FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Allow public update access" ON excel_data
    FOR UPDATE
    USING (true);

-- Add comment
COMMENT ON TABLE excel_data IS 'Stores Excel driver tree data shared across all users';

