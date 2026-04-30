"use client";

import { useRouter, useSearchParams } from 'next/navigation'
import { Search, SlidersHorizontal } from 'lucide-react'
import { CATEGORY_OPTIONS } from '@/lib/categories'
import { useEffect, useState } from 'react'

type Props = {
  taskRoute: string
  currentCategory: string
}

export function TaskListFilterForm({ taskRoute, currentCategory }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState(currentCategory)

  useEffect(() => {
    setSelectedCategory(currentCategory)
  }, [currentCategory])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const category = formData.get('category') as string
    
    if (category === 'all') {
      router.push(taskRoute)
    } else {
      router.push(`${taskRoute}?category=${category}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[1.75rem] border border-white/15 bg-white/10 p-6 backdrop-blur-sm">
      <div className="flex items-center gap-2 text-sm font-semibold text-white">
        <SlidersHorizontal className="h-4 w-4" />
        Filter results
      </div>
      <label className="mt-5 block text-xs font-semibold uppercase tracking-[0.2em] text-blue-100">Category</label>
      <div className="mt-2 rounded-2xl bg-white px-4">
        <select 
          name="category" 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="h-12 w-full bg-transparent text-sm text-slate-700 outline-none"
        >
          <option value="all">All categories</option>
          {CATEGORY_OPTIONS.map((item) => (
            <option key={item.slug} value={item.slug}>{item.name}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white text-sm font-semibold text-[#0d4f9a] hover:bg-blue-50">
        <Search className="h-4 w-4" />
        Apply filters
      </button>
    </form>
  )
}
