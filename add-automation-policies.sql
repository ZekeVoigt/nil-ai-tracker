-- Add RLS policies for automation system to insert real NIL data
-- Run this in Supabase SQL Editor after your main table creation

-- Allow automation to insert athletes
CREATE POLICY "Allow automation inserts for Athlete" ON "Athlete" 
FOR INSERT 
WITH CHECK (true);

-- Allow automation to update athletes
CREATE POLICY "Allow automation updates for Athlete" ON "Athlete" 
FOR UPDATE 
USING (true);

-- Allow automation to insert NIL deals
CREATE POLICY "Allow automation inserts for NILDeal" ON "NILDeal" 
FOR INSERT 
WITH CHECK (true);

-- Allow automation to update NIL deals
CREATE POLICY "Allow automation updates for NILDeal" ON "NILDeal" 
FOR UPDATE 
USING (true);

-- Allow automation to insert articles
CREATE POLICY "Allow automation inserts for Article" ON "Article" 
FOR INSERT 
WITH CHECK (true);

-- Allow automation to update articles
CREATE POLICY "Allow automation updates for Article" ON "Article" 
FOR UPDATE 
USING (true);

-- Allow automation to insert tags
CREATE POLICY "Allow automation inserts for Tag" ON "Tag" 
FOR INSERT 
WITH CHECK (true);

-- Allow automation to insert article tags
CREATE POLICY "Allow automation inserts for ArticleTag" ON "ArticleTag" 
FOR INSERT 
WITH CHECK (true);

-- Allow automation to insert processing logs
CREATE POLICY "Allow automation inserts for ProcessingLog" ON "ProcessingLog" 
FOR INSERT 
WITH CHECK (true);

-- Allow automation to insert monitoring sources
CREATE POLICY "Allow automation inserts for MonitoringSource" ON "MonitoringSource" 
FOR INSERT 
WITH CHECK (true);

-- Allow automation to update monitoring sources
CREATE POLICY "Allow automation updates for MonitoringSource" ON "MonitoringSource" 
FOR UPDATE 
USING (true); 