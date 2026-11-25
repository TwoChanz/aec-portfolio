'use client'

import { useState, type FormEvent } from 'react'
import { Button } from "@/components/ui/button"

type FormStatus = 'idle' | 'sending' | 'sent' | 'error'

/**
 * Contact form that posts to our own API route (/api/contact), which then
 * sends the email. Keeping the email service behind our API means the
 * secret API key never reaches the visitor's browser.
 */
export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Stop the browser's default behaviour (reloading the page).
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    setStatus('sending')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.get('email'),
          message: data.get('message'),
        }),
      })

      if (!response.ok) {
        const body: { error?: string } = await response.json().catch(() => ({}))
        throw new Error(body.error ?? 'Something went wrong. Please try again.')
      }

      setStatus('sent')
      form.reset()
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
    }
  }

  if (status === 'sent') {
    return (
      <p role="status" className="text-center py-8">
        Thanks for reaching out! I'll get back to you soon.
      </p>
    )
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <label className="grid gap-1">
        <span className="text-sm font-medium">Email</span>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className="w-full p-2 border rounded bg-background"
        />
      </label>
      <label className="grid gap-1">
        <span className="text-sm font-medium">Message</span>
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={5000}
          placeholder="Tell me about your project"
          className="w-full p-2 border rounded h-32 bg-background"
        />
      </label>
      {status === 'error' && (
        <p role="alert" className="text-sm text-red-500">
          {errorMessage}
        </p>
      )}
      <Button type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send Message'}
      </Button>
    </form>
  )
}
