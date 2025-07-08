-- Create tables for NIL Tracker database
-- Run this in Supabase SQL Editor

-- Athletes table
CREATE TABLE IF NOT EXISTS "Athlete" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  sport TEXT NOT NULL,
  school TEXT NOT NULL,
  position TEXT,
  year TEXT,
  "twitterHandle" TEXT,
  "instagramHandle" TEXT,
  "profileImageUrl" TEXT,
  verified BOOLEAN DEFAULT false,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- NIL Deals table
CREATE TABLE IF NOT EXISTS "NILDeal" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  description TEXT,
  "dealValue" TEXT,
  "dealType" TEXT NOT NULL,
  brand TEXT,
  "announcementDate" TIMESTAMP WITH TIME ZONE NOT NULL,
  "sourceUrl" TEXT,
  verified BOOLEAN DEFAULT false,
  confidence REAL DEFAULT 0.0,
  status TEXT DEFAULT 'pending',
  processed BOOLEAN DEFAULT false,
  "sourceType" TEXT,
  "rawData" TEXT,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "athleteId" TEXT NOT NULL REFERENCES "Athlete"(id)
);

-- Articles table
CREATE TABLE IF NOT EXISTS "Article" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  slug TEXT UNIQUE NOT NULL,
  "metaTitle" TEXT,
  "metaDescription" TEXT,
  keywords TEXT,
  "wordCount" INTEGER,
  "readingTime" INTEGER,
  "featuredImage" TEXT,
  published BOOLEAN DEFAULT false,
  "publishedAt" TIMESTAMP WITH TIME ZONE,
  "scheduledFor" TIMESTAMP WITH TIME ZONE,
  "aiGenerated" BOOLEAN DEFAULT true,
  "aiModel" TEXT,
  "generationPrompt" TEXT,
  views INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "nilDealId" TEXT REFERENCES "NILDeal"(id),
  "athleteId" TEXT REFERENCES "Athlete"(id)
);

-- Tags table
CREATE TABLE IF NOT EXISTS "Tag" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  color TEXT,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Article Tags junction table
CREATE TABLE IF NOT EXISTS "ArticleTag" (
  "articleId" TEXT NOT NULL REFERENCES "Article"(id),
  "tagId" TEXT NOT NULL REFERENCES "Tag"(id),
  PRIMARY KEY ("articleId", "tagId")
);

-- Monitoring Sources table
CREATE TABLE IF NOT EXISTS "MonitoringSource" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL,
  url TEXT,
  active BOOLEAN DEFAULT true,
  "lastChecked" TIMESTAMP WITH TIME ZONE,
  "checkInterval" INTEGER DEFAULT 300,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Processing Logs table
CREATE TABLE IF NOT EXISTS "ProcessingLog" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  type TEXT NOT NULL,
  status TEXT NOT NULL,
  message TEXT NOT NULL,
  data TEXT,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS "Article_published_publishedAt_idx" ON "Article"(published, "publishedAt" DESC);
CREATE INDEX IF NOT EXISTS "NILDeal_verified_idx" ON "NILDeal"(verified);
CREATE INDEX IF NOT EXISTS "NILDeal_processed_idx" ON "NILDeal"(processed);
CREATE INDEX IF NOT EXISTS "Article_slug_idx" ON "Article"(slug);
CREATE INDEX IF NOT EXISTS "Athlete_name_idx" ON "Athlete"(name);

-- Enable Row Level Security (RLS)
ALTER TABLE "Athlete" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "NILDeal" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Article" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Tag" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ArticleTag" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "MonitoringSource" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ProcessingLog" ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (since this is a public website)
CREATE POLICY "Public read access for Article" ON "Article" FOR SELECT USING (published = true);
CREATE POLICY "Public read access for Athlete" ON "Athlete" FOR SELECT USING (true);
CREATE POLICY "Public read access for NILDeal" ON "NILDeal" FOR SELECT USING (verified = true);
CREATE POLICY "Public read access for Tag" ON "Tag" FOR SELECT USING (true);
CREATE POLICY "Public read access for ArticleTag" ON "ArticleTag" FOR SELECT USING (true);

-- Insert some sample data for testing
INSERT INTO "Athlete" (name, sport, school, position, year) VALUES 
('Jordan Smith', 'Basketball', 'Duke University', 'Point Guard', 'Junior')
ON CONFLICT DO NOTHING;

INSERT INTO "Tag" (name, slug) VALUES 
('Basketball', 'basketball'),
('Endorsement', 'endorsement'),
('Nike', 'nike')
ON CONFLICT DO NOTHING; 