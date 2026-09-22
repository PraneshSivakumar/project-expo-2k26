// Email Template Generator for Project Expo 2026 Confirmation
export function generateConfirmationEmailHtml(data) {
  const {
    leaderName = "Participant",
    teamName = "Registered Team",
    projectTitle = "Project Submission",
    track = "Software Project",
    leaderDept = "Engineering",
    leaderYear = "",
    leaderEmail = "",
    leaderPhone = "",
    pptFileName = "Slide Deck",
    members = []
  } = data;

  const squadList = Array.isArray(members) ? members : [];

  let squadRowsHtml = `
    <tr style="background-color:#ffffff; border-bottom:1px solid #e7e3da;">
      <td style="padding:12px 16px; font-size:13px; font-weight:700; color:#111827;">
        Member 1: ${escapeHtml(leaderName)} <span style="font-size:11px; font-weight:600; color:#0c8c5e; background-color:#ecfdf5; padding:2px 8px; border-radius:4px; margin-left:6px;">Team Leader</span>
        <div style="font-weight:400; font-size:12px; color:#525252; margin-top:3px;">${escapeHtml(leaderEmail)}${leaderPhone ? ` • ${escapeHtml(leaderPhone)}` : ''} • ${escapeHtml(leaderDept)}${leaderYear ? ` (${escapeHtml(leaderYear)})` : ''}</div>
      </td>
    </tr>
  `;

  squadList.forEach((m, idx) => {
    squadRowsHtml += `
      <tr style="background-color:#ffffff; border-bottom:1px solid #e7e3da;">
        <td style="padding:12px 16px; font-size:13px; font-weight:600; color:#111827;">
          Member ${idx + 2}: ${escapeHtml(m.name || `Collaborator ${idx + 2}`)} <span style="font-size:11px; font-weight:500; color:#525252;">(${escapeHtml(m.role || 'Member')})</span>
          <div style="font-weight:400; font-size:12px; color:#525252; margin-top:3px;">${escapeHtml(m.dept || 'Engineering')}</div>
        </td>
      </tr>
    `;
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registration Confirmation – Project Expo 2026</title>
</head>
<body style="margin:0; padding:0; background-color:#f7f5f0; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color:#111827;">
  
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f7f5f0; padding:40px 15px;">
    <tr>
      <td align="center">
        <!-- Main Card -->
        <table role="presentation" width="100%" style="max-width:600px; background-color:#ffffff; border:1px solid #e7e3da; border-radius:12px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.03);">
          
          <!-- Top Header Strip -->
          <tr>
            <td style="background-color:#111827; padding:28px 32px; text-align:center;">
              <span style="display:inline-block; font-size:11px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:#10b981; margin-bottom:6px;">VSB E-CELL</span>
              <h1 style="margin:0; color:#ffffff; font-size:24px; font-weight:700; letter-spacing:0.5px;">PROJECT EXPO <span style="color:#10b981;">2K26</span></h1>
              <p style="margin:4px 0 0 0; color:#9ca3af; font-size:12px;">Intelligent Innovation &amp; Technical Challenge</p>
            </td>
          </tr>

          <!-- Confirmation Notice -->
          <tr>
            <td style="padding:32px 32px 18px 32px; background-color:#ffffff;">
              <div style="display:inline-block; background-color:#ecfdf5; border:1px solid #a7f3d0; color:#065f46; font-size:11px; font-weight:700; letter-spacing:0.8px; padding:4px 10px; border-radius:16px; text-transform:uppercase; margin-bottom:14px;">
                Registration Confirmed
              </div>
              
              <h2 style="margin:0 0 16px 0; color:#111827; font-size:20px; font-weight:700; line-height:1.3;">
                Subject: Registration Confirmation – Project Expo 2026
              </h2>

              <p style="margin:0 0 12px 0; color:#1f2937; font-size:15px; line-height:1.6;">
                Dear <strong>${escapeHtml(leaderName)}</strong>,
              </p>

              <p style="margin:0 0 12px 0; color:#1f2937; font-size:14px; line-height:1.6;">
                Greetings from <strong>VSB E-Cell</strong>!
              </p>

              <p style="margin:0 0 12px 0; color:#374151; font-size:14px; line-height:1.6;">
                We are pleased to confirm that your registration for <strong>Project Expo 2026</strong> has been successfully received.
              </p>

              <p style="margin:0 0 20px 0; color:#374151; font-size:14px; line-height:1.6;">
                We appreciate your interest in showcasing your innovative ideas and projects. We look forward to witnessing your creativity, technical skills, and problem-solving abilities.
              </p>
            </td>
          </tr>

          <!-- Event Schedule & Venue Details (Beige Panel) -->
          <tr>
            <td style="padding:0 32px 20px 32px;">
              <table role="presentation" width="100%" style="background-color:#faf8f5; border:1px solid #e7e3da; border-radius:8px; padding:16px 20px;">
                <tr>
                  <td colspan="2" style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:1px; color:#0c8c5e; padding-bottom:8px;">
                    Official Event Details
                  </td>
                </tr>
                <tr>
                  <td style="padding:5px 0; color:#525252; font-size:13px; width:30%; font-weight:500;">Event:</td>
                  <td style="padding:5px 0; color:#111827; font-size:13px; font-weight:700;">Project Expo '26</td>
                </tr>
                <tr>
                  <td style="padding:5px 0; color:#525252; font-size:13px; font-weight:500;">Venue:</td>
                  <td style="padding:5px 0; color:#111827; font-size:13px; font-weight:600;">VSB College of Engineering Technical Campus</td>
                </tr>
                <tr>
                  <td style="padding:5px 0; color:#525252; font-size:13px; font-weight:500;">Date:</td>
                  <td style="padding:5px 0; color:#111827; font-size:13px; font-weight:700;">29-09-26</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Registration Summary Box -->
          <tr>
            <td style="padding:0 32px 20px 32px;">
              <table role="presentation" width="100%" style="background-color:#ffffff; border:1px solid #e7e3da; border-radius:8px; padding:16px 20px;">
                <tr>
                  <td colspan="2" style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:1px; color:#111827; padding-bottom:8px; border-bottom:1px solid #f0ece1;">
                    Submission Summary
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0 4px 0; color:#525252; font-size:13px; width:30%;">Team Name:</td>
                  <td style="padding:8px 0 4px 0; color:#111827; font-size:14px; font-weight:700;">${escapeHtml(teamName)}</td>
                </tr>
                <tr>
                  <td style="padding:4px 0; color:#525252; font-size:13px;">Project Title:</td>
                  <td style="padding:4px 0; color:#111827; font-size:13px; font-weight:600;">${escapeHtml(projectTitle)}</td>
                </tr>
                <tr>
                  <td style="padding:4px 0; color:#525252; font-size:13px;">Project Track:</td>
                  <td style="padding:4px 0; color:#111827; font-size:13px; font-weight:600;">
                    <span style="background-color:#111827; color:#ffffff; padding:2px 8px; border-radius:4px; font-size:11px;">${escapeHtml(track)}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:4px 0; color:#525252; font-size:13px;">PPT Slide Deck:</td>
                  <td style="padding:4px 0; color:#0c8c5e; font-size:13px; font-weight:600;">${escapeHtml(pptFileName)}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Team Member List -->
          <tr>
            <td style="padding:0 32px 24px 32px;">
              <h3 style="margin:0 0 10px 0; font-size:13px; font-weight:700; text-transform:uppercase; letter-spacing:1px; color:#111827;">
                Registered Team Members
              </h3>
              <table role="presentation" width="100%" style="border-collapse:collapse; border:1px solid #e7e3da; border-radius:8px; overflow:hidden;">
                ${squadRowsHtml}
              </table>
            </td>
          </tr>

          <!-- Next Steps Note (Clean minimal design without emojis) -->
          <tr>
            <td style="padding:0 32px 28px 32px;">
              <div style="background-color:#faf8f5; border-left:3px solid #111827; padding:14px 18px; border-radius:0 6px 6px 0;">
                <p style="margin:0 0 8px 0; color:#1f2937; font-size:13px; line-height:1.5;">
                  Further details regarding the event, project guidelines, and presentation schedule will be communicated to you shortly.
                </p>
                <p style="margin:0 0 8px 0; color:#1f2937; font-size:13px; line-height:1.5;">
                  For any queries, feel free to contact us at <a href="mailto:ecellvsbcetc@gmail.com" style="color:#0c8c5e; text-decoration:underline;">ecellvsbcetc@gmail.com</a>.
                </p>
                <p style="margin:0 0 8px 0; color:#525252; font-size:12px; line-height:1.5;">
                  Helpline: Boys: <a href="tel:+919791919289" style="color:#111827; font-weight:600; text-decoration:none;">+91 97919 19289</a> &bull; Girls: <a href="tel:+919786353006" style="color:#111827; font-weight:600; text-decoration:none;">+91 97863 53006</a>
                </p>
                <p style="margin:0; color:#111827; font-size:13px; font-weight:700;">
                  Thank you for being a part of Project Expo '26.
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#faf8f5; border-top:1px solid #e7e3da; padding:20px 32px; text-align:center;">
              <p style="margin:0 0 4px 0; color:#111827; font-size:12px; font-weight:700; letter-spacing:0.5px;">PROJECT EXPO 2026</p>
              <p style="margin:0 0 8px 0; color:#6b7280; font-size:12px; line-height:1.4;">
                VSB E-Cell • V.S.B. College of Engineering Technical Campus
              </p>
              <p style="margin:0; color:#9ca3af; font-size:11px;">Intra-College Technical Exhibition &amp; Innovation Challenge</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
