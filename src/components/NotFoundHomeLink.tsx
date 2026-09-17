'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { homePath, pathIsCa } from '@/lib/siteRegion'

export default function NotFoundHomeLink({ className }: { className: string }) {
  const pathname = usePathname()

  return (
    <Link href={homePath(pathIsCa(pathname))} className={className}>
      Go to home
    </Link>
  )
}
