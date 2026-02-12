# EmailJS Researcher Notification Template Setup

## Template ID
`template_researcher_aler`

## Configuration Steps

### 1. Go to EmailJS Dashboard
https://dashboard.emailjs.com/admin/templates

### 2. Find Template
Look for template ID: `template_researcher_aler`

### 3. Set Recipient Email
In the template settings, set:
- **To Email**: `research.mdh.edu@gmail.com`
- **To Name**: `Research Team` (optional)

### 4. Template Content

**Subject Line**:
```
New Interview Booking - {{participant_name}}
```

**Email Body**:
```
New Interview Booking Notification

Participant Details:
- Name: {{participant_name}}
- Email: {{participant_email}}

Booking Details:
- Date: {{booking_date}}
- Time: {{booking_time}}
- Meeting URL: {{meeting_url}}

Study: {{study_name}}

Notes from Participant:
{{notes}}

---
This is an automated notification from the Calibrated Trust Research Study system.
```

### 5. Available Variables

The following variables are sent from the code:

- `{{participant_name}}` - Participant's full name
- `{{participant_email}}` - Participant's email address
- `{{booking_date}}` - Formatted date (e.g., "February 12, 2026")
- `{{booking_time}}` - Formatted time (e.g., "14:00")
- `{{meeting_url}}` - Jitsi meeting link
- `{{notes}}` - Any notes the participant added
- `{{study_name}}` - Always "Calibrated Trust Research Study"
- `{{researcher_email}}` - Always "research.mdh.edu@gmail.com"

### 6. Test the Template

After setup, test by:
1. Making a test booking in the system
2. Check console for: `✅ Researcher notification sent successfully`
3. Check research.mdh.edu@gmail.com inbox for the notification

## Troubleshooting

### Email Not Received
1. Check EmailJS dashboard for send logs
2. Verify template ID is exactly `template_researcher_aler`
3. Check spam/junk folder
4. Verify `research.mdh.edu@gmail.com` is set as recipient in template settings

### Wrong Email Received
- Make sure "To Email" in template settings is `research.mdh.edu@gmail.com`
- Do NOT use `{{participant_email}}` in the "To Email" field

### Variables Not Showing
- Make sure variable names match exactly (case-sensitive)
- Use double curly braces: `{{variable_name}}`

## Current Implementation

The researcher notification is sent:
- **When**: After a participant confirms an interview booking
- **To**: research.mdh.edu@gmail.com (hardcoded in template)
- **Contains**: All participant and booking details
- **Timing**: Immediately after participant confirmation email

## Code Location

- Email sending: `app.js` → `confirmBooking()` function
- Email service: `email-service.js` → `sendResearcherNotification()` function
