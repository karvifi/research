-- ============================================
-- LinkedIn Ownership Verification Schema
-- ============================================
-- This migration adds verification code support to enable
-- email-based LinkedIn profile ownership verification

-- Add verification columns to responses table
ALTER TABLE responses 
ADD COLUMN IF NOT EXISTS verification_code VARCHAR(6),
ADD COLUMN IF NOT EXISTS verification_sent_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS verification_expires_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS linkedin_profile JSONB;

-- Add index for faster verification code lookups
CREATE INDEX IF NOT EXISTS idx_responses_verification_code 
ON responses(verification_code) 
WHERE verification_code IS NOT NULL;

-- Add index for verified status lookups
CREATE INDEX IF NOT EXISTS idx_responses_verified 
ON responses(is_verified);

-- Comment on columns for documentation
COMMENT ON COLUMN responses.verification_code IS 'Six-digit code sent to LinkedIn email for ownership verification';
COMMENT ON COLUMN responses.verification_sent_at IS 'Timestamp when verification email was sent';
COMMENT ON COLUMN responses.verification_expires_at IS 'Expiration time for verification code (10 minutes from sent time)';
COMMENT ON COLUMN responses.is_verified IS 'Whether the user has verified ownership of their LinkedIn profile';
COMMENT ON COLUMN responses.linkedin_profile IS 'Full LinkedIn profile data from scraping (name, email, headline, URL)';
