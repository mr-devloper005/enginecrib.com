'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Building2, CalendarDays, LogOut, Mail, MapPin, ShieldCheck, User as UserIcon } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'

export function AccountOverviewPage() {
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuth()

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated || !user) return null

  return (
    <div className="min-h-screen bg-[#f7f9fc] text-slate-950">
      <NavbarShell />
      <main className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <section className="overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#0b57b5_0%,#1178e5_100%)] px-8 py-10 text-white shadow-[0_30px_80px_rgba(12,66,144,0.16)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-100">Profile Page</p>
            <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-5">
                <Avatar className="h-20 w-20 border-4 border-white/20">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-4xl font-semibold tracking-[-0.04em]">{user.name}</h1>
                  <p className="mt-2 text-blue-50/90">{user.bio || 'Logged-in profile for business listing management.'}</p>
                </div>
              </div>
              <Button
                onClick={() => {
                  logout()
                  router.push('/login')
                }}
                variant="outline"
                className="rounded-full border-white/20 bg-white/10 text-white hover:bg-white/15 hover:text-white"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </Button>
            </div>
          </section>

          <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[1.8rem] border border-slate-200 bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#0d4f9a]">User Details</p>
              <div className="mt-6 grid gap-5">
                <div className="flex items-start gap-3 rounded-[1.4rem] bg-slate-50 p-4">
                  <UserIcon className="mt-0.5 h-5 w-5 text-[#0d4f9a]" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Full name</p>
                    <p className="mt-1 text-sm text-slate-500">{user.name}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-[1.4rem] bg-slate-50 p-4">
                  <Mail className="mt-0.5 h-5 w-5 text-[#0d4f9a]" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Email address</p>
                    <p className="mt-1 text-sm text-slate-500">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-[1.4rem] bg-slate-50 p-4">
                  <CalendarDays className="mt-0.5 h-5 w-5 text-[#0d4f9a]" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Member since</p>
                    <p className="mt-1 text-sm text-slate-500">{user.joinedDate}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-[1.4rem] bg-slate-50 p-4">
                  <MapPin className="mt-0.5 h-5 w-5 text-[#0d4f9a]" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Location</p>
                    <p className="mt-1 text-sm text-slate-500">{user.location || 'Not added yet'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[1.8rem] border border-slate-200 bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#0d4f9a]">Access</p>
                <div className="mt-5 flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 text-[#0d4f9a]" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Protected signed-in page</p>
                    <p className="mt-1 text-sm leading-7 text-slate-500">Only logged-in users can open this page. It is the destination for the floating profile button.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.8rem] border border-slate-200 bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#0d4f9a]">Quick Action</p>
                <Link href="/create/listing" className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#0d4f9a] px-5 py-3 text-sm font-semibold text-white hover:bg-[#0b407d]">
                  <Building2 className="mr-2 h-4 w-4" />
                  Create listing
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
