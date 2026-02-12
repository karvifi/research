@echo off
echo ========================================
echo   DEPLOYING TO GITHUB
echo ========================================
echo.

echo Step 1: Adding all files...
git add .
if %errorlevel% neq 0 (
    echo ERROR: Failed to add files
    echo.
    echo Git might not be installed or not in PATH
    echo Please install Git from: https://git-scm.com/download/win
    pause
    exit /b 1
)
echo ✓ Files added successfully
echo.

echo Step 2: Committing changes...
git commit -m "Fix: Improved Google OAuth auto-fill with better logging"
if %errorlevel% neq 0 (
    echo WARNING: Nothing to commit or commit failed
    echo This might be okay if no changes were made
)
echo ✓ Commit completed
echo.

echo Step 3: Pushing to GitHub...
git push
if %errorlevel% neq 0 (
    echo ERROR: Push failed
    echo.
    echo Possible reasons:
    echo - You need to authenticate with GitHub
    echo - Network connection issue
    echo - Repository permissions
    echo.
    pause
    exit /b 1
)
echo.
echo ========================================
echo   DEPLOYMENT SUCCESSFUL!
echo ========================================
echo.
echo Your site will be live in 2-3 minutes at:
echo https://karvifi.github.io/interview/
echo.
echo After the site updates, test the Google OAuth auto-fill:
echo 1. Click "Join Optional In-Depth Interview"
echo 2. Click "Sign in with Google"
echo 3. Complete OAuth
echo 4. Check if name and email are auto-filled
echo 5. Open browser console (F12) to see detailed logs
echo.
pause
