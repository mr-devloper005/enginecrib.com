'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, Building2, CheckCircle2, ShieldCheck, Sparkles, Store } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { useAuth } from '@/lib/auth-context'

export const LOGIN_PAGE_OVERRIDE_ENABLED = true

const benefits = [
  'Manage listings, profile details, and saved business pages',
  'Stay signed in locally on this device after a successful login',
  'Return to your dashboard without changing backend logic',
]

export function LoginPageOverride() {
  const router = useRouter()
  const { login, isLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    if (!email.trim() || !password.trim()) {
      setError('Enter your email and password to continue.')
      return
    }

    try {
      await login(email.trim(), password)
      router.push('/profile')
    } catch {
      setError('Unable to sign you in right now.')
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f9fc] text-slate-950">
      <NavbarShell />
      <main className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#0b57b5_0%,#1178e5_100%)] p-8 text-white shadow-[0_30px_80px_rgba(12,66,144,0.16)] lg:p-10">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-white/14">
              <Building2 className="h-8 w-8" />
            </div>
            <h1 className="mt-6 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">Sign in to manage your listings</h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-blue-50/90">
              Access your business dashboard, update company details, and keep your directory presence current.
            </p>
            <div className="mt-8 space-y-4">
              {benefits.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[1.4rem] border border-white/12 bg-white/10 px-4 py-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-white" />
                  <span className="text-sm leading-7 text-blue-50">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-white/12 bg-white/10 p-5">
                <ShieldCheck className="h-6 w-6" />
                <p className="mt-3 text-sm font-semibold">Local session persistence</p>
                <p className="mt-2 text-sm text-blue-50/80">Successful sign-in is saved in browser local storage through the existing auth context.</p>
              </div>
              <div className="rounded-[1.5rem] border border-white/12 bg-white/10 p-5">
                <Store className="h-6 w-6" />
                <p className="mt-3 text-sm font-semibold">Directory-ready workspace</p>
                <p className="mt-2 text-sm text-blue-50/80">Designed for owners, agencies, and teams managing business profile visibility.</p>
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.05)] lg:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#0d4f9a]">Welcome back</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">Open your account</h2>
            <p className="mt-3 text-sm leading-7 text-slate-500">Use any email and password combination for the current client-side auth flow.</p>

            <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
              <label className="grid gap-2 text-sm font-medium text-slate-700">
                Email address
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="h-13 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-[#0d4f9a] focus:bg-white"
                  placeholder="you@business.com"
                  type="email"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-slate-700">
                Password
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="h-13 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-[#0d4f9a] focus:bg-white"
                  placeholder="Enter password"
                  type="password"
                />
              </label>

              {error ? <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}

              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-[#0d4f9a] px-6 text-sm font-semibold text-white transition hover:bg-[#0b407d] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
              <Link href="/forgot-password" className="hover:text-slate-950 hover:underline">Forgot password?</Link>
              <Link href="/register" className="inline-flex items-center gap-2 font-semibold text-[#0d4f9a]">
                <Sparkles className="h-4 w-4" />
                Create account
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
