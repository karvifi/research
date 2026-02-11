# 🚀 GITHUB DEPLOYMENT GUIDE

**Deploy your research platform to GitHub Pages in 15 minutes**

---

## 📋 PREREQUISITES

- [x] System is working locally (tested)
- [x] Supabase database is set up
- [x] EmailJS is configured
- [ ] GitHub account (create at github.com)
- [ ] Git installed on your computer

---

## 🎯 DEPLOYMENT STEPS

### STEP 1: Clean Up Project (10 minutes)

#### 1.1 Delete Test Files
Delete these files (they're not needed in production):
```
test-booking.html
test-email-direct.html
debug-booking-form.html
auto-fix-system.html
supabase-OLD-BACKUP.js
cleanup_workspace.ps1
```

#### 1.2 Delete Old SQL Files
Keep only `UNIFIED_DATABASE_COMPLETE.sql`, delete:
```
database_bookings.sql
database_responses_fixes.sql
database_user_insights.sql
COMPLETE_DATABASE_SETUP.sql
fix_bookings_table.sql
FIX_EXISTING_DATABASE.sql
FINAL_FIX.sql
FORCE_FIX.sql
REMOVE_CONSTRAINT.sql
SETUP_DATABASE_FIXED.sql
SIMPLE_FIX.sql
```

#### 1.3 Delete Temporary Documentation
Delete these (keep only main docs):
```
BOOKING_SYSTEM_FIX.md
COPY_PASTE_THIS.txt
DO_THIS_NOW.txt
DO_THIS_NOW_UPDATED.txt
EMAILJS_DIAGNOSTIC_STEPS.txt
EMAILJS_QUICK_FIX.txt
EMAILJS_TEMPLATE_FIX_FINAL.txt
FIX_PARTICIPANT_EMAIL.txt
FILES_YOU_NEED.txt
FINAL_TEST_INSTRUCTIONS.md
QUICK_REFERENCE.txt
SIMPLE_SETUP_STEPS.txt
START_HERE_SIMPLE.txt
START_HERE.txt
START_HERE.md
SYSTEM_STATUS_CHECKLIST.md
TEST_RESULTS.txt
VISUAL_GUIDE.md
WHERE_TO_CLICK_EMAILJS.txt
```

#### 1.4 Delete Development Folders
```
.brain_archive/ (entire folder)
legacy_versions/ (optional - keep if you want version history)
```

---

### STEP 2: Create .gitignore File

Create a file named `.gitignore` in your project root:

```
# Node modules (if you add any)
node_modules/

# Environment variables (if you add any)
.env
.env.local

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db
desktop.ini

# Logs
*.log
npm-debug.log*

# Test files
test-*.html
debug-*.html
*-test.html

# Temporary files
*.tmp
*.temp
~*

# Backup files
*-OLD-BACKUP.*
*-backup.*
*.bak
```

---

### STEP 3: Update README.md

Replace the content in `README.md` with your information:

```markdown
# Calibrated Trust Research Platform

## About This Study

This is a research platform for studying how creative professionals develop trust in AI tools.

**Principal Investigator:** [Your Name]  
**Institution:** [Your University]  
**Contact:** research.mdh.edu@gmail.com

## For Participants

To participate in this study:
1. Visit the live site: [Your GitHub Pages URL]
2. Complete the eligibility screening
3. Schedule an interview
4. Participate in the research

**Duration:** 60-90 minutes  
**Compensation:** Voluntary participation  
**Privacy:** All data is anonymized

## Technical Details

**Built with:**
- Supabase (Database)
- EmailJS (Email notifications)
- GitHub Pages (Hosting)
- Vanilla JavaScript

**Features:**
- Unified database tracking
- Automated email confirmations
- Interview scheduling
- Real-time data collection

## Setup

See `SETUP_GUIDE.md` for deployment instructions.

## License

For academic research use only.
```

---

### STEP 4: Create GitHub Repository

#### 4.1 Create Repository on GitHub
1. Go to https://github.com
2. Click "+" → "New repository"
3. Repository name: `calibrated-trust-research`
4. Description: "Research platform for studying AI trust in creative professionals"
5. Public or Private: **Public** (required for GitHub Pages free tier)
6. **DO NOT** initialize with README (you already have one)
7. Click "Create repository"

#### 4.2 Initialize Git Locally
Open terminal/command prompt in your project folder:

```bash
git init
git add .
git commit -m "Initial commit - Research platform ready for deployment"
```

#### 4.3 Connect to GitHub
Replace `YOUR-USERNAME` with your GitHub username:

```bash
git remote add origin https://github.com/YOUR-USERNAME/calibrated-trust-research.git
git branch -M main
git push -u origin main
```

---

### STEP 5: Enable GitHub Pages

#### 5.1 Go to Repository Settings
1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" in left sidebar
4. Click "Pages"

#### 5.2 Configure GitHub Pages
1. Source: Select "Deploy from a branch"
2. Branch: Select "main"
3. Folder: Select "/ (root)"
4. Click "Save"

#### 5.3 Wait for Deployment
- GitHub will build your site (takes 1-2 minutes)
- Refresh the page
- You'll see: "Your site is live at https://YOUR-USERNAME.github.io/calibrated-trust-research/"

---

### STEP 6: Test Live Site

#### 6.1 Visit Your Live Site
Open: `https://YOUR-USERNAME.github.io/calibrated-trust-research/`

#### 6.2 Test Complete Flow
1. ✅ Landing page loads
2. ✅ Select eligibility category
3. ✅ Answer commitment question
4. ✅ Fill contact form
5. ✅ Book interview
6. ✅ Receive confirmation email
7. ✅ Check Supabase for data

#### 6.3 Verify Everything Works
- [ ] Page loads without errors
- [ ] All buttons work
- [ ] Forms submit correctly
- [ ] Emails are sent
- [ ] Data is saved to Supabase
- [ ] Mobile responsive
- [ ] No console errors

---

## 🎯 YOUR LIVE URLS

After deployment, you'll have:

**Live Site:**
```
https://YOUR-USERNAME.github.io/calibrated-trust-research/
```

**GitHub Repository:**
```
https://github.com/YOUR-USERNAME/calibrated-trust-research
```

**Supabase Dashboard:**
```
https://app.supabase.com/project/oyveosroqukmdnnzcmrw
```

**EmailJS Dashboard:**
```
https://dashboard.emailjs.com/admin
```

---

## 🔧 MAKING UPDATES

### To Update Your Live Site:

1. Make changes locally
2. Test changes locally
3. Commit changes:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```
4. GitHub Pages will auto-update (takes 1-2 minutes)

---

## 📊 MONITORING

### Check Supabase Dashboard
- View responses: https://app.supabase.com
- Table Editor → research_participants
- Export data as CSV

### Check EmailJS Dashboard
- View email history: https://dashboard.emailjs.com/admin/history
- Monitor usage: Free tier = 200 emails/month

### Check GitHub Pages Status
- Repository → Settings → Pages
- See deployment status and logs

---

## 🆘 TROUBLESHOOTING

### Site Not Loading
- Check GitHub Pages is enabled
- Wait 2-3 minutes for deployment
- Check repository is public
- Clear browser cache

### Database Not Working
- Check Supabase credentials in config.js
- Verify database table exists
- Check browser console for errors

### Emails Not Sending
- Check EmailJS template configuration
- Verify "To Email" field is {{to_email}}
- Check EmailJS usage limits

### 404 Error
- Check file names are correct
- Verify index.html exists in root
- Check GitHub Pages branch is "main"

---

## 🎉 SUCCESS CHECKLIST

- [ ] Project cleaned up (test files removed)
- [ ] .gitignore file created
- [ ] README.md updated with your info
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] GitHub Pages enabled
- [ ] Live site tested and working
- [ ] Emails sending correctly
- [ ] Data saving to Supabase
- [ ] Mobile responsive verified

---

## 📞 SUPPORT

**GitHub Pages Documentation:**
https://docs.github.com/en/pages

**Supabase Documentation:**
https://supabase.com/docs

**EmailJS Documentation:**
https://www.emailjs.com/docs/

**Git Tutorial:**
https://git-scm.com/docs/gittutorial

---

## 🚀 NEXT STEPS

After deployment:

1. **Share Your Link**
   - Email to potential participants
   - Post on social media
   - Share in research communities

2. **Monitor Data Collection**
   - Check Supabase daily
   - Monitor email delivery
   - Track participation rates

3. **Collect Feedback**
   - Ask participants about experience
   - Fix any issues quickly
   - Improve based on feedback

---

**Your research platform is now live and ready to collect data! 🎉**

**Live URL:** `https://YOUR-USERNAME.github.io/calibrated-trust-research/`
