// ============================================
// DATABASE INITIALIZATION SCRIPT
// Run this once to set up all required tables
// ============================================

console.log('🚀 Starting database initialization...');

(async function initializeDatabase() {
    try {
        // Wait for Supabase client to be ready
        if (typeof supabaseClient === 'undefined') {
            console.error('❌ Supabase client not loaded. Make sure config.js and supabase.js are loaded first.');
            return;
        }

        console.log('✅ Supabase client ready');
        console.log('📍 Database URL:', SUPABASE_CONFIG.url);

        // Run database setup
        const result = await DatabaseSetup.setupDatabase();

        if (result.success) {
            console.log('✅ DATABASE INITIALIZATION COMPLETE');
            console.log('');
            console.log('📊 Tables created:');
            console.log('  - responses (survey data)');
            console.log('  - answers (individual responses)');
            console.log('  - analytics (tracking data)');
            console.log('  - pathways (routing logic)');
            console.log('  - insights (analysis data)');
            console.log('  - bookings (interview appointments) ✨NEW');
            console.log('');
            console.log('🎯 Next steps:');
            console.log('  1. Test survey submission');
            console.log('  2. Test appointment booking');
            console.log('  3. Verify data in Supabase dashboard');

            // Test connection
            console.log('');
            console.log('🔌 Testing database connection...');
            const connTest = await DatabaseSetup.testConnection();
            if (connTest.success) {
                console.log('✅ Database connection verified');
            } else {
                console.error('❌ Connection test failed:', connTest.error);
            }

        } else {
            console.error('❌ Database setup failed:', result.error);
            console.log('');
            console.log('⚠️ Common issues:');
            console.log('  - Check that Supabase URL and API key are correct in config.js');
            console.log('  - Verify Supabase project is active');
            console.log('  - Check browser console for CORS errors');
        }

    } catch (error) {
        console.error('❌ Fatal error during initialization:', error);
    }
})();

// Export for manual testing
window.testDatabase = async function () {
    console.log('🧪 Running database tests...');

    // Test 1: Create a test booking
    console.log('');
    console.log('Test 1: Creating test booking...');
    const testBooking = await Database.createBooking({
        email: 'test@example.com',
        name: 'Test User',
        timezone: 'UTC',
        date: '2026-02-15',
        time: '10:00:00',
        datetime: '2026-02-15T10:00:00',
        duration: 60,
        platform: 'google_meet',
        meetingUrl: 'https://meet.google.com/test-link',
        notes: 'Test booking',
        archetype: 'Test'
    });

    if (testBooking.success) {
        console.log('✅ Test booking created:', testBooking.data);
    } else {
        console.error('❌ Test booking failed:', testBooking.error);
    }

    // Test 2: Fetch all bookings
    console.log('');
    console.log('Test 2: Fetching all bookings...');
    const allBookings = await Database.getAllBookings();

    if (allBookings.success) {
        console.log('✅ Bookings retrieved:', allBookings.data.length, 'total');
        console.table(allBookings.data);
    } else {
        console.error('❌ Fetch bookings failed:', allBookings.error);
    }

    console.log('');
    console.log('🏁 Database tests complete');
};

console.log('');
console.log('💡 To run manual tests, type: testDatabase()');
