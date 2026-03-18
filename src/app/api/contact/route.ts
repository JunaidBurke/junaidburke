import { Resend } from 'resend'
import { z } from 'zod'
import { NextResponse } from 'next/server'

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  honeypot: z.string().max(0),
  subject: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json() as unknown
    const validated = contactSchema.parse(body)

    if (validated.honeypot) {
      return NextResponse.json({ success: true })
    }

    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 're_placeholder') {
      console.error('[contact] RESEND_API_KEY not configured')
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: 'junaidburke.com <onboarding@resend.dev>',
      to: 'junaidburke@gmail.com',
      subject: validated.subject ?? `Contact from ${validated.name}`,
      text: `Name: ${validated.name}\nEmail: ${validated.email}\n\n${validated.message}`,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }
    console.error('[contact]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
