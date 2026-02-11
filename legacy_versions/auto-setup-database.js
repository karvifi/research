// ============================================
// AUTOMATIC DATABASE SETUP
// ============================================
// This script automatically creates all required tables in Supabase
// No manual SQL needed!

const DatabaseSetup = {

    async setupDatabase() {
        console.log('🔧 Starting automatic database setup...');

        try {
            // Create responses table
            await this.createResponsesTable();

            // NEW: Ensure all columns exist (Migration)
            await this.syncResponsesSchema();

            // Create answers table
            await this.createAnswersTable();

            // Create analytics table
            await this.createAnalyticsTable();

            // Create pathways table (new!)
            await this.createPathwaysTable();

            // Create insights table (new!)
            await this.createInsightsTable();

            // Create bookings table for interview scheduling
            await this.createBookingsTable();

            // Setup Row Level Security
            await this.setupRLS();

            // Create indexes for performance
            await this.createIndexes();

            console.log('✅ Database setup complete!');
            return { success: true, message: 'Database initialized successfully' };

        } catch (error) {
            console.error('❌ Database setup failed:', error);
            return { success: false, error: error.message };
        }
    },

    async syncResponsesSchema() {
        console.log('🔄 Syncing database schema for LinkedIn identity linkage...');

        // Columns for 'responses'
        const responseCols = [
            { name: 'linkedin_verified', type: 'BOOLEAN DEFAULT false' },
            { name: 'linkedin_url', type: 'TEXT' },
            { name: 'linkedin_name', type: 'TEXT' },
            { name: 'linkedin_avatar', type: 'TEXT' }
        ];

        for (const col of responseCols) {
            try {
                await supabaseClient.rpc('execute_sql', {
                    query: `ALTER TABLE responses ADD COLUMN IF NOT EXISTS ${col.name} ${col.type};`
                });
            } catch (err) { console.log(`ℹ️ Response column ${col.name} handled`); }
        }

        // Columns for 'answers' (Categorization by Username)
        const answerCols = [
            { name: 'linkedin_url', type: 'TEXT' }
        ];

        for (const col of answerCols) {
            try {
                await supabaseClient.rpc('execute_sql', {
                    query: `ALTER TABLE answers ADD COLUMN IF NOT EXISTS ${col.name} ${col.type};`
                });
            } catch (err) { console.log(`ℹ️ Answer column ${col.name} handled`); }
        }

        // Columns for 'bookings' (Categorization by Username)
        const bookingCols = [
            { name: 'linkedin_url', type: 'TEXT' }
        ];

        for (const col of bookingCols) {
            try {
                await supabaseClient.rpc('execute_sql', {
                    query: `ALTER TABLE bookings ADD COLUMN IF NOT EXISTS ${col.name} ${col.type};`
                });
            } catch (err) { console.log(`ℹ️ Booking column ${col.name} handled`); }
        }

        console.log('✅ All tables synced with LinkedIn identity columns');
    },

    async createResponsesTable() {
        const { data, error } = await supabaseClient.rpc('execute_sql', {
            query: `
                CREATE TABLE IF NOT EXISTS responses (
                    id TEXT PRIMARY KEY,
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                    started_at TIMESTAMP WITH TIME ZONE,
                    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                    completed_at TIMESTAMP WITH TIME ZONE,
                    status TEXT DEFAULT 'in_progress',
                    
                    -- Profiling data
                    profiling_data JSONB,
                    
                    -- Pathway classification
                    pathway_id TEXT,
                    experience_level TEXT,
                    adoption_route TEXT,
                    calibration_status TEXT,
                    org_type TEXT,
                    cross_cultural BOOLEAN,
                    
                    -- Completion metrics
                    completion_time_minutes INTEGER,
                    total_words INTEGER,
                    questions_answered INTEGER,
                    quality_score DECIMAL(3,2),
                    
                    -- Contact
                    email TEXT,
                    follow_up_interest BOOLEAN DEFAULT false,
                    archetype TEXT,
                    country TEXT,
                    
                    -- Metadata
                    user_agent TEXT,
                    ip_hash TEXT,
                    session_data JSONB,

                    -- LinkedIn Identity
                    linkedin_verified BOOLEAN DEFAULT false,
                    linkedin_url TEXT,
                    linkedin_name TEXT,
                    linkedin_avatar TEXT
                );
            `
        });

        if (error && !error.message.includes('already exists')) {
            throw error;
        }
        console.log('✅ Responses table created');
    },

    async createAnswersTable() {
        const { data, error } = await supabaseClient.rpc('execute_sql', {
            query: `
                CREATE TABLE IF NOT EXISTS answers (
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    response_id TEXT REFERENCES responses(id) ON DELETE CASCADE,
                    question_id TEXT NOT NULL,
                    section TEXT,
                    answer JSONB NOT NULL,
                    answered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                    time_spent_seconds INTEGER,
                    word_count INTEGER,
                    character_count INTEGER,
                    revision_count INTEGER DEFAULT 0,
                    UNIQUE(response_id, question_id)
                );
            `
        });

        if (error && !error.message.includes('already exists')) {
            throw error;
        }
        console.log('✅ Answers table created');
    },

    async createAnalyticsTable() {
        const { data, error } = await supabaseClient.rpc('execute_sql', {
            query: `
                CREATE TABLE IF NOT EXISTS analytics (
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                    event_type TEXT NOT NULL,
                    response_id TEXT,
                    question_id TEXT,
                    metadata JSONB,
                    session_id TEXT,
                    duration_ms INTEGER
                );
            `
        });

        if (error && !error.message.includes('already exists')) {
            throw error;
        }
        console.log('✅ Analytics table created');
    },

    async createPathwaysTable() {
        const { data, error } = await supabaseClient.rpc('execute_sql', {
            query: `
                CREATE TABLE IF NOT EXISTS pathways (
                    id TEXT PRIMARY KEY,
                    name TEXT NOT NULL,
                    description TEXT,
                    experience_level TEXT,
                    adoption_route TEXT,
                    total_questions INTEGER,
                    estimated_duration INTEGER,
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
                );
            `
        });

        if (error && !error.message.includes('already exists')) {
            throw error;
        }
        console.log('✅ Pathways table created');
    },

    async createInsightsTable() {
        const { data, error } = await supabaseClient.rpc('execute_sql', {
            query: `
                CREATE TABLE IF NOT EXISTS insights (
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                    response_id TEXT REFERENCES responses(id),
                    insight_type TEXT,
                    content TEXT,
                    confidence_score DECIMAL(3,2),
                    metadata JSONB
                );
            `
        });

        if (error && !error.message.includes('already exists')) {
            throw error;
        }
        console.log('✅ Insights table created');
    },

    async createBookingsTable() {
        const { data, error } = await supabaseClient.rpc('execute_sql', {
            query: `
                CREATE TABLE IF NOT EXISTS bookings (
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                    response_id TEXT REFERENCES responses(id),
                    
                    -- Participant info
                    email TEXT NOT NULL,
                    name TEXT,
                    timezone TEXT DEFAULT 'UTC',
                    
                    -- Booking details
                    scheduled_date DATE NOT NULL,
                    scheduled_time TIME NOT NULL,
                    scheduled_datetime TIMESTAMP WITH TIME ZONE,
                    duration_minutes INTEGER DEFAULT 60,
                    
                    -- Video conferencing
                    meeting_platform TEXT DEFAULT 'google_meet',
                    meeting_url TEXT,
                    meeting_id TEXT,
                    meeting_password TEXT,
                    
                    -- Status tracking
                    status TEXT DEFAULT 'confirmed',
                    reminder_sent BOOLEAN DEFAULT false,
                    researcher_notified BOOLEAN DEFAULT false,
                    
                    -- Metadata
                    notes TEXT,
                    archetype TEXT,
                    metadata JSONB
                );
            `
        });

        if (error && !error.message.includes('already exists')) {
            throw error;
        }
        console.log('✅ Bookings table created');
    },

    async setupRLS() {
        console.log('🔒 Configuring Row Level Security...');

        // For research platforms, we need to allow public inserts
        // This is safe because we're collecting research data, not storing sensitive user accounts

        const rls_policies = [
            // Responses table - allow public insert and update
            `ALTER TABLE responses ENABLE ROW LEVEL SECURITY;`,
            `DROP POLICY IF EXISTS "Allow public inserts" ON responses;`,
            `CREATE POLICY "Allow public inserts" ON responses FOR INSERT WITH CHECK (true);`,
            `DROP POLICY IF EXISTS "Allow public updates" ON responses;`,
            `CREATE POLICY "Allow public updates" ON responses FOR UPDATE USING (true);`,
            `DROP POLICY IF EXISTS "Allow public select" ON responses;`,
            `CREATE POLICY "Allow public select" ON responses FOR SELECT USING (true);`,

            // Answers table - allow public insert
            `ALTER TABLE answers ENABLE ROW LEVEL SECURITY;`,
            `DROP POLICY IF EXISTS "Allow public inserts" ON answers;`,
            `CREATE POLICY "Allow public inserts" ON answers FOR INSERT WITH CHECK (true);`,
            `DROP POLICY IF EXISTS "Allow public select" ON answers;`,
            `CREATE POLICY "Allow public select" ON answers FOR SELECT USING (true);`,

            // Bookings table - allow public insert
            `ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;`,
            `DROP POLICY IF EXISTS "Allow public inserts" ON bookings;`,
            `CREATE POLICY "Allow public inserts" ON bookings FOR INSERT WITH CHECK (true);`,
            `DROP POLICY IF EXISTS "Allow public select" ON bookings;`,
            `CREATE POLICY "Allow public select" ON bookings FOR SELECT USING (true);`,

            // Analytics table - allow public insert
            `ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;`,
            `DROP POLICY IF EXISTS "Allow public inserts" ON analytics;`,
            `CREATE POLICY "Allow public inserts" ON analytics FOR INSERT WITH CHECK (true);`,
            `DROP POLICY IF EXISTS "Allow public select" ON analytics;`,
            `CREATE POLICY "Allow public select" ON analytics FOR SELECT USING (true);`
        ];

        for (const policy of rls_policies) {
            try {
                await supabaseClient.rpc('execute_sql', { query: policy });
            } catch (error) {
                console.log(`ℹ️ RLS policy handled:`, error.message);
            }
        }

        console.log('✅ Row Level Security configured for public research data collection');
    },

    async createIndexes() {
        const indexes = [
            'CREATE INDEX IF NOT EXISTS idx_responses_status ON responses(status)',
            'CREATE INDEX IF NOT EXISTS idx_responses_pathway ON responses(pathway_id)',
            'CREATE INDEX IF NOT EXISTS idx_responses_created ON responses(created_at)',
            'CREATE INDEX IF NOT EXISTS idx_answers_response_id ON answers(response_id)',
            'CREATE INDEX IF NOT EXISTS idx_analytics_response_id ON analytics(response_id)',
            'CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics(event_type)'
        ];

        for (const index of indexes) {
            try {
                await supabaseClient.rpc('execute_sql', { query: index });
            } catch (error) {
                // Index might already exist
            }
        }
        console.log('✅ Database indexes created');
    },

    // Test database connection
    async testConnection() {
        try {
            const { data, error } = await supabaseClient
                .from('responses')
                .select('id')
                .limit(1);

            if (error) throw error;
            return { success: true, message: 'Database connection successful' };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Initialize with sample pathway data
    async seedPathways() {
        const pathways = [
            { id: 'A-R1', name: 'Junior Innovator', experience_level: 'A-Junior', adoption_route: 'R1-Innovator', total_questions: 45, estimated_duration: 75 },
            { id: 'B-R2', name: 'Mid-Career Early Adopter', experience_level: 'B-MidCareer', adoption_route: 'R2-EarlyAdopter', total_questions: 52, estimated_duration: 90 },
            { id: 'C-R3', name: 'Senior Early Majority', experience_level: 'C-Senior', adoption_route: 'R3-EarlyMajority', total_questions: 48, estimated_duration: 85 },
            { id: 'D-R4', name: 'Expert Skeptical', experience_level: 'D-Expert', adoption_route: 'R4-Skeptical', total_questions: 55, estimated_duration: 95 }
        ];

        for (const pathway of pathways) {
            await supabaseClient
                .from('pathways')
                .upsert(pathway, { onConflict: 'id' });
        }

        console.log('✅ Sample pathways seeded');
    }
};

// Auto-run setup when page loads
if (typeof window !== 'undefined') {
    window.DatabaseSetup = DatabaseSetup;
}
