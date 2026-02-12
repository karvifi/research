@echo off
echo ========================================
echo   DEPLOYING TO GITHUB
echo ========================================
echo.

echo Step 1: Adding all files...
git add .
if %errorlevel% neq 0 (
    echo ERROR: Failed to add files
    pause
    exit /b 1
)
echo ✓ Files added successfully
echo.

echo Step 2: Committing changes...
git commit -m "Deploy: All fixes applied and ready for production"
if %errorlevel% neq 0 (
    echo WARNING: Nothing to commit or commit failed
    echo This might be okay if no changes were made
)
echo ✓ Commit completed
echo.

echo Step 3: Setting remote repository...
git remote remove origin 2>nul
git remote add origin https://github.com/karvifi/interview.git
echo ✓ Remote repository set
echo.

echo Step 4: Pushing to GitHub...
git push -u origin main --force
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
echo GitHub Repository:
echo https://github.com/karvifi/interview
echo.
pause
