// Vercel Serverless Function & Express compatible handler
export interface ContactRequestBody {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default async function handler(req: any, res: any) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: `Method ${req.method} not allowed. Please submit via POST.`,
    });
  }

  try {
    const body: ContactRequestBody = req.body || {};
    const { name, email, subject, message } = body;

    const errors: Record<string, string> = {};

    // Validate Name
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      errors.name = 'Please enter your full name (at least 2 characters).';
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      errors.email = 'Please provide a valid email address.';
    }

    // Validate Message
    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      errors.message = 'Please provide a message with at least 10 characters.';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Please complete all required fields.',
        errors,
      });
    }

    // Generate ticket ID
    const ticketId = `MSG-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    // DEMO BACKEND INTEGRATION HOOK:
    // Future integrations can forward contact queries to client inboxes or CRM:
    // if (process.env.RESEND_API_KEY) {
    //   await resend.emails.send({ ... });
    // }

    const messageDetails = {
      ticketId,
      name: name?.trim(),
      email: email?.trim().toLowerCase(),
      subject: (subject || 'General Inquiry').trim(),
      message: message?.trim(),
      receivedAt: new Date().toISOString(),
      status: 'Received',
    };

    return res.status(200).json({
      success: true,
      message: `Thank you, ${messageDetails.name}. Your message has been received. Our hospitality team will reply within 24 hours.`,
      data: messageDetails,
    });
  } catch (err: any) {
    console.error('API Error in /api/contact:', err);
    return res.status(500).json({
      success: false,
      message: 'An unexpected internal error occurred while submitting your message.',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
}
