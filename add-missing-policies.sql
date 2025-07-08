-- Drop existing policies if they exist, then recreate them
-- This prevents "already exists" errors

-- Drop and recreate Athlete policies
DROP POLICY IF EXISTS "Allow automation inserts for Athlete" ON "Athlete";
DROP POLICY IF EXISTS "Allow automation updates for Athlete" ON "Athlete";

CREATE POLICY "Allow automation inserts for Athlete" ON "Athlete" 
FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow automation updates for Athlete" ON "Athlete" 
FOR UPDATE USING (true);

-- Drop and recreate NILDeal policies
DROP POLICY IF EXISTS "Allow automation inserts for NILDeal" ON "NILDeal";
DROP POLICY IF EXISTS "Allow automation updates for NILDeal" ON "NILDeal";

CREATE POLICY "Allow automation inserts for NILDeal" ON "NILDeal" 
FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow automation updates for NILDeal" ON "NILDeal" 
FOR UPDATE USING (true);

-- Drop and recreate Article policies
DROP POLICY IF EXISTS "Allow automation inserts for Article" ON "Article";
DROP POLICY IF EXISTS "Allow automation updates for Article" ON "Article";

CREATE POLICY "Allow automation inserts for Article" ON "Article" 
FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow automation updates for Article" ON "Article" 
FOR UPDATE USING (true);

-- Drop and recreate Tag policies
DROP POLICY IF EXISTS "Allow automation inserts for Tag" ON "Tag";

CREATE POLICY "Allow automation inserts for Tag" ON "Tag" 
FOR INSERT WITH CHECK (true);

-- Drop and recreate ArticleTag policies
DROP POLICY IF EXISTS "Allow automation inserts for ArticleTag" ON "ArticleTag";

CREATE POLICY "Allow automation inserts for ArticleTag" ON "ArticleTag" 
FOR INSERT WITH CHECK (true);

-- Drop and recreate ProcessingLog policies
DROP POLICY IF EXISTS "Allow automation inserts for ProcessingLog" ON "ProcessingLog";

CREATE POLICY "Allow automation inserts for ProcessingLog" ON "ProcessingLog" 
FOR INSERT WITH CHECK (true);

-- Drop and recreate MonitoringSource policies
DROP POLICY IF EXISTS "Allow automation inserts for MonitoringSource" ON "MonitoringSource";
DROP POLICY IF EXISTS "Allow automation updates for MonitoringSource" ON "MonitoringSource";

CREATE POLICY "Allow automation inserts for MonitoringSource" ON "MonitoringSource" 
FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow automation updates for MonitoringSource" ON "MonitoringSource" 
FOR UPDATE USING (true); 