'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, Building2, CheckCircle2, MapPin, Sparkles, Store } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { useAuth } from '@/lib/auth-context'

export const REGISTER_PAGE_OVERRIDE_ENABLED = true

const signupPoints = [
  'Create a local account for your listing workspace',
  'Publish your business with a cleaner directory presentation',
  'Save your user profile locally after successful signup',
]

export function RegisterPageOverride() {
  const router = useRouter()
  const { signup, isLoading } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [focus, setFocus] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Complete the required fields to create your account.')
      return
    }

    try {
      await signup(name.trim(), email.trim(), password)
      router.push('/profile')
    } catch {
      setError('Unable to create your account right now.')
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f9fc] text-slate-950">
      <NavbarShell />
      <main className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.05)] lg:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#0d4f9a]">Create account</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">Launch your business profile</h1>
            <p className="mt-5 text-base leading-8 text-slate-500">
              Set up an owner account, prepare your listing information, and start building visibility inside the directory.
            </p>
            <div className="mt-8 space-y-4">
              {signupPoints.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[1.4rem] border border-slate-200 bg-slate-50 px-4 py-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0d4f9a]" />
                  <span className="text-sm leading-7 text-slate-600">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] bg-[#edf5ff] p-5">
                <Store className="h-6 w-6 text-[#0d4f9a]" />
                <p className="mt-3 text-sm font-semibold text-slate-900">Listing-ready structure</p>
                <p className="mt-2 text-sm text-slate-600">Perfect for garages, repair shops, detailing studios, and automotive service providers.</p>
              </div>
              <div className="rounded-[1.5rem] bg-[#edf5ff] p-5">
                <MapPin className="h-6 w-6 text-[#0d4f9a]" />
                <p className="mt-3 text-sm font-semibold text-slate-900">Local-first discovery</p>
                <p className="mt-2 text-sm text-slate-600">Built to help nearby customers find the right service with stronger category and location cues.</p>
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#0b57b5_0%,#1178e5_100%)] p-8 text-white shadow-[0_30px_80px_rgba(12,66,144,0.16)] lg:p-10">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-white/14">
              <Building2 className="h-8 w-8" />
            </div>
            <h2 className="mt-6 text-3xl font-semibold tracking-[-0.04em]">Set up your listing account</h2>
            <p className="mt-4 text-sm leading-8 text-blue-50/90">
              This stays fully on the UI layer and uses the existing auth context. After signup, the user profile is stored locally for the current browser.
            </p>

            <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
              <label className="grid gap-2 text-sm font-medium text-white">
                Full name
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="h-13 rounded-2xl border border-white/18 bg-white/12 px-4 text-sm text-white outline-none placeholder:text-blue-100/70 focus:border-white/40 focus:bg-white/18"
                  placeholder="Business owner name"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-white">
                Email address
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="h-13 rounded-2xl border border-white/18 bg-white/12 px-4 text-sm text-white outline-none placeholder:text-blue-100/70 focus:border-white/40 focus:bg-white/18"
                  placeholder="you@business.com"
                  type="email"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-white">
                Password
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="h-13 rounded-2xl border border-white/18 bg-white/12 px-4 text-sm text-white outline-none placeholder:text-blue-100/70 focus:border-white/40 focus:bg-white/18"
                  placeholder="Create password"
                  type="password"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-white">
                Primary service focus
                <input
                  value={focus}
                  onChange={(event) => setFocus(event.target.value)}
                  className="h-13 rounded-2xl border border-white/18 bg-white/12 px-4 text-sm text-white outline-none placeholder:text-blue-100/70 focus:border-white/40 focus:bg-white/18"
                  placeholder="Auto repair, detailing, towing..."
                />
              </label>

              {error ? <p className="rounded-2xl border border-red-300/30 bg-red-500/15 px-4 py-3 text-sm text-white">{error}</p> : null}

              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#0d4f9a] transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? 'Creating account...' : 'Create account'}
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-blue-50/85">
              <span>Already have an account?</span>
              <Link href="/login" className="inline-flex items-center gap-2 font-semibold text-white">
                <Sparkles className="h-4 w-4" />
                Sign in
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
