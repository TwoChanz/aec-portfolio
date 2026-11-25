import { NextResponse } from 'next/server'

/*
 * POST /api/contact
 *
 * Receives the contact form and emails it to you through Resend
 * (https://resend.com), using a plain fetch call so no extra package is needed.
 *
 * Required environment variables (set them in .env.local and in your host,
 * e.g. Vercel → Project → Settings → Environment Variables):
 *   RESEND_API_KEY     – your Resend API key (keep it secret)
 *   CONTACT_TO_EMAIL   – the inbox that should receive messages
 * Optional:
 *   CONTACT_FROM_EMAIL – a sender on a domain you verified in Resend.
 *                        Defaults to Resend's test sender.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_MESSAGE_LENGTH = 5000

interface ContactRequest {
  email: string
  message: string
}

function parseBody(body: unknown): ContactRequest | null {
  if (typeof body !== 'object' || body === null) return null
  const { email, message } = body as Record<string, unknown>
  if (typeof email !== 'string' || typeof message !== 'string') return null

  const trimmedEmail = email.trim()
  const trimmedMessage = message.trim()
  if (!EMAIL_PATTERN.test(trimmedEmail)) return null
  if (trimmedMessage.length < 10 || trimmedMessage.length > MAX_MESSAGE_LENGTH) return null

  return { email: trimmedEmail, message: trimmedMessage }
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.CONTACT_TO_EMAIL
  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? 'Portfolio Contact <onboarding@resend.dev>'

  if (!apiKey || !toEmail) {
    console.error('Contact form is not configured: set RESEND_API_KEY and CONTACT_TO_EMAIL.')
    return NextResponse.json(
      { error: 'The contact form is not set up yet. Please reach out on LinkedIn instead.' },
      { status: 503 },
    )
  }

  const contact = parseBody(await request.json().catch(() => null))
  if (!contact) {
    return NextResponse.json(
      { error: 'Please enter a valid email and a message of at least 10 characters.' },
      { status: 400 },
    )
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: contact.email,
      subject: `Portfolio message from ${contact.email}`,
      text: contact.message,
    }),
  })

  if (!response.ok) {
    console.error('Resend request failed:', response.status, await response.text())
    return NextResponse.json(
      { error: 'Your message could not be sent. Please try again later.' },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}
