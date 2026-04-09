'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'

type Props = {
  className: string
  loggedInHref?: string
  loggedOutHref?: string
  loggedInLabel: ReactNode
  loggedOutLabel: ReactNode
}

export function AuthAwareCreateLink({
  className,
  loggedInHref = '/create/listing',
  loggedOutHref = '/login?redirect=%2Fcreate%2Flisting',
  loggedInLabel,
  loggedOutLabel,
}: Props) {
  const { isAuthenticated, isReady } = useAuth()

  if (!isReady) {
    return <span className={className}>{loggedOutLabel}</span>
  }

  return (
    <Link href={isAuthenticated ? loggedInHref : loggedOutHref} className={className}>
      {isAuthenticated ? loggedInLabel : loggedOutLabel}
    </Link>
  )
}
