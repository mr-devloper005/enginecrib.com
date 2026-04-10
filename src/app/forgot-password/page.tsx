'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2, Mail } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsSubmitted(true)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-[#f7f9fc] text-slate-950">
      <NavbarShell />
      <main className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Link href="/login" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-950">
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Link>

          <div className="mt-6 overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#0b57b5_0%,#1178e5_100%)] p-8 text-white shadow-[0_30px_80px_rgba(12,66,144,0.16)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-100">Password Reset</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">Recover your account access</h1>
            <p className="mt-4 text-base leading-8 text-blue-50/90">This page now follows the same directory UI and color system as the rest of the site.</p>
          </div>

          <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
            {!isSubmitted ? (
              <>
                <h2 className="text-3xl font-semibold tracking-[-0.04em]">Send reset link</h2>
                <p className="mt-3 text-sm leading-7 text-slate-500">Enter your email address and we will simulate sending a password reset link.</p>

                <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
                  <label className="grid gap-2 text-sm font-medium text-slate-700">
                    Email address
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm outline-none focus:border-[#0d4f9a] focus:bg-white"
                        placeholder="name@example.com"
                        required
                      />
                    </div>
                  </label>

                  <button type="submit" disabled={isLoading} className="inline-flex h-12 items-center justify-center rounded-full bg-[#0d4f9a] px-6 text-sm font-semibold text-white hover:bg-[#0b407d] disabled:opacity-70">
                    {isLoading ? 'Sending...' : 'Send reset link'}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#edf5ff]">
                  <CheckCircle2 className="h-8 w-8 text-[#0d4f9a]" />
                </div>
                <h2 className="mt-6 text-3xl font-semibold tracking-[-0.04em]">Check your email</h2>
                <p className="mt-3 text-sm leading-7 text-slate-500">
                  We have sent a password reset link to <strong>{email}</strong>.
                </p>
                <Link href="/login" className="mt-6 inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                  Back to login
                </Link>
                <p className="mt-5 text-sm text-slate-500">
                  Didn’t receive it?{' '}
                  <button onClick={() => setIsSubmitted(false)} className="font-semibold text-[#0d4f9a] hover:underline">
                    Try again
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
