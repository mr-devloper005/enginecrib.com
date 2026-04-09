'use client'

import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/lib/auth-context'

export function NavbarAuthControls({ compact = false }: { compact?: boolean }) {
  const { user } = useAuth()

  return (
    <div className={`flex items-center gap-2 ${compact ? '' : 'rounded-full border border-slate-200 bg-white/92 p-2 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl'}`}>
      <Button asChild size="sm" className="rounded-full bg-[#0d4f9a] px-4 text-white hover:bg-[#0b407d]">
        <Link href="/create/listing">
          <Plus className="h-4 w-4" />
          Create
        </Link>
      </Button>
      <Button asChild variant="outline" size="sm" className="h-10 rounded-full border-slate-200 bg-white px-2 hover:bg-slate-50">
        <Link href="/profile" aria-label="Profile details">
          <Avatar className="h-7 w-7 border border-slate-200">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
        </Link>
      </Button>
    </div>
  )
}
