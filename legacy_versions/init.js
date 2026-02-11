/**
 * AUTOMATIC INITIALIZATION SCRIPT
 * Runs database setup automatically on first load
 */

(async function initializeSystem() {
    console.log('🚀 Initializing Calibrated Trust Research Platform...');
    
    // Check if database has been initialized
    const dbInitialized = localStorage.getItem('dbInitialized');
    
    if (!dbInitialized) {
        console.log('⚙️ First-time setup detected. Setting up database...');
        
        try {
            // Wait for DatabaseSetup to be available
            if (typeof DatabaseSetup === 'undefined') {
                console.error('❌ DatabaseSetup not loaded. Make sure auto-setup-database.js is included.');
                return;
            }
            
            // Run database setup
            const result = await DatabaseSetup.setupDatabase();
            
            if (result.success) {
                console.log('✅ Database setup completed successfully!');
                console.log(result.message);
                localStorage.setItem('dbInitialized', 'true');
                localStorage.setItem('dbInitializedAt', new Date().toISOString());
            } else {
                console.error('⚠️ Database setup encountered issues:', result.error);
                // Still mark as initialized to avoid repeated attempts
                localStorage.setItem('dbInitialized', 'true');
            }
            
        } catch (error) {
            console.error('❌ Error during initialization:', error);
        }
    } else {
        console.log('✅ Database already initialized.');
        console.log('Initialized at:', localStorage.getItem('dbInitializedAt'));
    }
    
    // Test connection
    try {
        const connTest = await DatabaseSetup.testConnection();
        if (connTest.success) {
            console.log('✅ Database connection verified');
        }
    } catch (error) {
        console.warn('⚠️ Could not verify database connection');
    }
    
    console.log('🎉 Platform ready!');
})();

// Manual reset function (for developers)
window.resetDatabaseInit = function() {
    localStorage.removeItem('dbInitialized');
    localStorage.removeItem('dbInitializedAt');
    console.log('🔄 Database initialization flag reset. Reload page to re-run setup.');
};

// Show database status
window.checkDatabaseStatus = async function() {
    console.log('📊 DATABASE STATUS');
    console.log('==================');
    console.log('Initialized:', localStorage.getItem('dbInitialized') === 'true' ? 'Yes' : 'No');
    console.log('Initialized At:', localStorage.getItem('dbInitializedAt') || 'Never');
    
    try {
        const connTest = await DatabaseSetup.testConnection();
        console.log('Connection:', connTest.success ? '✅ Active' : '❌ Failed');
        
        // Count responses
        const { data, error } = await supabaseClient
            .from('responses')
            .select('id', { count: 'exact', head: true });
        
        if (!error) {
            console.log('Total Responses:', data || 0);
        }
    } catch (error) {
        console.error('Error checking status:', error);
    }
};
