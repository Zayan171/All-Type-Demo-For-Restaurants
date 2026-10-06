// Vercel Serverless Function & Express compatible handler
export interface ReservationRequestBody {
  name?: string;
  email?: string;
  phone?: string;
  date?: string;
  time?: string;
  guests?: number | string;
  seatingPreference?: string;
  specialRequest?: string;
}

export default async function handler(req: any, res: any) {
  // Enable CORS for API consumers
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
    const body: ReservationRequestBody = req.body || {};
    const { name, email, phone, date, time, guests, seatingPreference, specialRequest } = body;

    const errors: Record<string, string> = {};

    // Validate Name
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      errors.name = 'Please provide your full name (at least 2 characters).';
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      errors.email = 'Please provide a valid email address.';
    }

    // Validate Phone
    const phoneDigits = (phone || '').toString().replace(/\D/g, '');
    if (!phone || phoneDigits.length < 7) {
      errors.phone = 'Please provide a valid telephone number with area code.';
    }

    // Validate Date
    if (!date || typeof date !== 'string') {
      errors.date = 'Please select a reservation date.';
    } else {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (isNaN(selectedDate.getTime())) {
        errors.date = 'Invalid reservation date format.';
      } else if (selectedDate < today) {
        errors.date = 'Reservation date cannot be in the past.';
      }
    }

    // Validate Time
    if (!time || typeof time !== 'string' || time.trim().length === 0) {
      errors.time = 'Please select an available dining time.';
    }

    // Validate Guests
    const guestNum = Number(guests);
    if (!guests || isNaN(guestNum) || guestNum < 1 || guestNum > 20) {
      errors.guests = 'Party size must be between 1 and 20 guests.';
    }

    // Return validation errors if any
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Please resolve the highlighted form fields before submitting.',
        errors,
      });
    }

    // Generate unique reservation ID for confirmation
    const reservationId = `RES-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    // DEMO BACKEND INTEGRATION HOOK:
    // When deploying for a real client, attach your database (PostgreSQL, Supabase, Neon)
    // or transactional email service (Resend, SendGrid) here using process.env:
    //
    // if (process.env.DATABASE_URL) {
    //   await db.reservations.insert({ ... });
    // }
    // if (process.env.RESEND_API_KEY) {
    //   await resend.emails.send({ ... });
    // }

    const confirmationDetails = {
      reservationId,
      name: name?.trim(),
      email: email?.trim().toLowerCase(),
      phone: phone?.trim(),
      date,
      time,
      guests: guestNum,
      seatingPreference: seatingPreference || 'Main Dining Room',
      specialRequest: specialRequest ? specialRequest.trim().slice(0, 500) : '',
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };

    return res.status(201).json({
      success: true,
      message: `Reservation confirmed for ${confirmationDetails.name}. A confirmation email will be delivered to ${confirmationDetails.email}.`,
      data: confirmationDetails,
    });
  } catch (err: any) {
    console.error('API Error in /api/reservations:', err);
    return res.status(500).json({
      success: false,
      message: 'An unexpected internal error occurred while processing your reservation. Please try again.',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
}
