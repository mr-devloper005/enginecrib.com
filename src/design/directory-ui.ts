import { SITE_CONFIG } from '@/lib/site-config'

export type DirectoryUiPreset = {
  key: string
  label: string
  shell: string
  hero: string
  eyebrow: string
  title: string
  muted: string
  panel: string
  softPanel: string
  input: string
  primaryButton: string
  secondaryButton: string
  listGrid: string
  cardFrame: string
  cardImage: string
  badge: string
  chip: string
  detailHero: string
  detailPanel: string
  detailAside: string
  relatedGrid: string
  searchLayout: string
  commentFrame: string
}

const presets: Record<string, DirectoryUiPreset> = {
  'miplaninvu.com': {
    key: 'atlas',
    label: 'Atlas editorial',
    shell: 'bg-[linear-gradient(180deg,#f7fbf4_0%,#ffffff_46%,#edf4ff_100%)]',
    hero: 'border-b border-[#193c35]/12 bg-[linear-gradient(135deg,#f7fbf4_0%,#ffffff_52%,#e4f0ff_100%)]',
    eyebrow: 'text-[#2f6f67]',
    title: 'font-display text-[#17322d]',
    muted: 'text-[#526760]',
    panel: 'border border-[#193c35]/12 bg-white/92 shadow-[0_18px_52px_rgba(25,60,53,0.08)]',
    softPanel: 'border border-[#193c35]/10 bg-[#eef7ef]',
    input: 'border-[#193c35]/16 bg-white text-[#17322d]',
    primaryButton: 'bg-[#17322d] text-white hover:bg-[#244d45]',
    secondaryButton: 'border border-[#193c35]/16 bg-white text-[#17322d] hover:bg-[#eef7ef]',
    listGrid: 'grid gap-5 sm:grid-cols-2 xl:grid-cols-3',
    cardFrame: 'group grid h-full overflow-hidden rounded-md border border-[#193c35]/12 bg-white shadow-[0_14px_36px_rgba(25,60,53,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_54px_rgba(25,60,53,0.14)]',
    cardImage: 'aspect-[5/3]',
    badge: 'bg-[#ffcf5a] text-[#17322d]',
    chip: 'border border-[#193c35]/12 bg-[#eef7ef] text-[#17322d]',
    detailHero: 'bg-[linear-gradient(135deg,#17322d_0%,#315c52_55%,#e7f0ff_100%)] text-white',
    detailPanel: 'border border-[#193c35]/12 bg-white shadow-[0_18px_52px_rgba(25,60,53,0.08)]',
    detailAside: 'border border-[#193c35]/12 bg-[#eef7ef]',
    relatedGrid: 'grid gap-5 md:grid-cols-3',
    searchLayout: 'lg:grid-cols-[320px_1fr]',
    commentFrame: 'border-[#193c35]/12 bg-white',
  },
  'dlkautoparts.com': {
    key: 'parts-counter',
    label: 'Parts counter',
    shell: 'bg-[linear-gradient(180deg,#f8fafc_0%,#eef2f6_100%)]',
    hero: 'border-y border-[#1f2937]/12 bg-[linear-gradient(90deg,#101820_0%,#26313d_54%,#f5c542_54%,#f5c542_100%)] text-white',
    eyebrow: 'text-[#f5c542]',
    title: 'font-sans text-white',
    muted: 'text-[#5f6b75]',
    panel: 'border border-[#1f2937]/12 bg-white shadow-[0_12px_32px_rgba(16,24,32,0.1)]',
    softPanel: 'border border-[#1f2937]/12 bg-[#f3f5f7]',
    input: 'border-[#1f2937]/20 bg-white text-[#101820]',
    primaryButton: 'bg-[#f5c542] text-[#101820] hover:bg-[#ffd95e]',
    secondaryButton: 'border border-white/25 bg-white/10 text-white hover:bg-white/18',
    listGrid: 'grid gap-4 lg:grid-cols-2',
    cardFrame: 'group grid h-full overflow-hidden rounded-sm border border-[#1f2937]/12 bg-white shadow-[0_10px_28px_rgba(16,24,32,0.09)] transition duration-300 hover:border-[#f5c542] hover:shadow-[0_18px_42px_rgba(16,24,32,0.14)] sm:grid-cols-[180px_1fr]',
    cardImage: 'aspect-[4/3] sm:aspect-auto sm:min-h-full',
    badge: 'bg-[#101820] text-[#f5c542]',
    chip: 'border border-[#1f2937]/12 bg-[#f3f5f7] text-[#101820]',
    detailHero: 'bg-[#101820] text-white',
    detailPanel: 'border border-[#1f2937]/12 bg-white shadow-[0_14px_34px_rgba(16,24,32,0.1)]',
    detailAside: 'border border-[#f5c542]/50 bg-[#fff8d9]',
    relatedGrid: 'grid gap-4 lg:grid-cols-3',
    searchLayout: 'lg:grid-cols-[280px_1fr]',
    commentFrame: 'border-[#1f2937]/12 bg-white',
  },
  'lasheminence.com': {
    key: 'salon-lookbook',
    label: 'Salon lookbook',
    shell: 'bg-[linear-gradient(180deg,#fff8fb_0%,#ffffff_45%,#f2fff7_100%)]',
    hero: 'border-b border-[#19483c]/10 bg-[linear-gradient(135deg,#fff8fb_0%,#ffffff_45%,#dff7ea_100%)]',
    eyebrow: 'text-[#b23a63]',
    title: 'font-display text-[#2b171f]',
    muted: 'text-[#6e5660]',
    panel: 'border border-[#b23a63]/14 bg-white/94 shadow-[0_18px_48px_rgba(178,58,99,0.1)]',
    softPanel: 'border border-[#19483c]/10 bg-[#effaf3]',
    input: 'border-[#b23a63]/18 bg-white text-[#2b171f]',
    primaryButton: 'bg-[#b23a63] text-white hover:bg-[#963052]',
    secondaryButton: 'border border-[#b23a63]/18 bg-white text-[#2b171f] hover:bg-[#fff0f5]',
    listGrid: 'columns-1 gap-5 sm:columns-2 xl:columns-3 [&>*]:mb-5 [&>*]:break-inside-avoid',
    cardFrame: 'group mb-5 flex h-full break-inside-avoid flex-col overflow-hidden rounded-[6px] border border-[#b23a63]/14 bg-white shadow-[0_14px_38px_rgba(178,58,99,0.1)] transition duration-300 hover:-translate-y-1',
    cardImage: 'aspect-[3/4]',
    badge: 'bg-[#19483c] text-[#effaf3]',
    chip: 'border border-[#b23a63]/14 bg-[#fff0f5] text-[#2b171f]',
    detailHero: 'bg-[linear-gradient(120deg,#2b171f_0%,#b23a63_70%,#dff7ea_100%)] text-white',
    detailPanel: 'border border-[#b23a63]/14 bg-white shadow-[0_18px_48px_rgba(178,58,99,0.1)]',
    detailAside: 'border border-[#19483c]/12 bg-[#effaf3]',
    relatedGrid: 'columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5 [&>*]:break-inside-avoid',
    searchLayout: 'lg:grid-cols-[1fr_300px]',
    commentFrame: 'border-[#b23a63]/14 bg-white',
  },
  'enginecrib.com': {
    key: 'spec-sheet',
    label: 'Spec sheet',
    shell: 'bg-[linear-gradient(180deg,#f5f7f7_0%,#ffffff_100%)]',
    hero: 'border-y border-[#0f2d2e]/14 bg-[#e8eeee]',
    eyebrow: 'text-[#0f766e]',
    title: 'font-sans text-[#0d2021]',
    muted: 'text-[#526264]',
    panel: 'border border-[#0f2d2e]/14 bg-white shadow-[0_12px_28px_rgba(15,45,46,0.08)]',
    softPanel: 'border border-[#0f2d2e]/12 bg-[#eff4f4]',
    input: 'border-[#0f2d2e]/18 bg-white text-[#0d2021]',
    primaryButton: 'bg-[#0d2021] text-white hover:bg-[#163b3d]',
    secondaryButton: 'border border-[#0f2d2e]/16 bg-white text-[#0d2021] hover:bg-[#eff4f4]',
    listGrid: 'grid gap-3',
    cardFrame: 'group grid h-full overflow-hidden rounded-none border border-[#0f2d2e]/14 bg-white transition duration-300 hover:bg-[#f9fbfb] md:grid-cols-[220px_1fr]',
    cardImage: 'aspect-[16/9] md:aspect-auto md:min-h-[180px]',
    badge: 'bg-[#0f766e] text-white',
    chip: 'border border-[#0f2d2e]/14 bg-[#eff4f4] text-[#0d2021]',
    detailHero: 'bg-[#0d2021] text-white',
    detailPanel: 'border border-[#0f2d2e]/14 bg-white',
    detailAside: 'border border-[#0f2d2e]/14 bg-[#eff4f4]',
    relatedGrid: 'grid gap-3',
    searchLayout: 'lg:grid-cols-[360px_1fr]',
    commentFrame: 'border-[#0f2d2e]/14 bg-white',
  },
  'moonrocketcoin.net': {
    key: 'mission-control',
    label: 'Mission control',
    shell: 'bg-[linear-gradient(180deg,#070b12_0%,#111827_55%,#0b1018_100%)] text-white',
    hero: 'border-b border-cyan-300/16 bg-[linear-gradient(135deg,#070b12_0%,#132238_52%,#0a3c44_100%)] text-white',
    eyebrow: 'text-cyan-200',
    title: 'font-sans text-white',
    muted: 'text-slate-300',
    panel: 'border border-cyan-200/14 bg-white/8 shadow-[0_18px_52px_rgba(0,0,0,0.25)] backdrop-blur',
    softPanel: 'border border-cyan-200/14 bg-cyan-200/8',
    input: 'border-cyan-200/20 bg-white/10 text-white placeholder:text-slate-400',
    primaryButton: 'bg-cyan-200 text-[#07111f] hover:bg-white',
    secondaryButton: 'border border-cyan-200/25 bg-white/8 text-white hover:bg-white/14',
    listGrid: 'grid gap-5 sm:grid-cols-2 xl:grid-cols-4',
    cardFrame: 'group flex h-full flex-col overflow-hidden rounded-[4px] border border-cyan-200/14 bg-white/8 text-white shadow-[0_18px_52px_rgba(0,0,0,0.22)] transition duration-300 hover:-translate-y-1 hover:border-cyan-200/45',
    cardImage: 'aspect-square',
    badge: 'bg-cyan-200 text-[#07111f]',
    chip: 'border border-cyan-200/16 bg-white/8 text-cyan-100',
    detailHero: 'bg-[linear-gradient(135deg,#070b12_0%,#132238_60%,#0a3c44_100%)] text-white',
    detailPanel: 'border border-cyan-200/14 bg-white/8 text-white',
    detailAside: 'border border-cyan-200/14 bg-cyan-200/8 text-white',
    relatedGrid: 'grid gap-5 sm:grid-cols-2 xl:grid-cols-4',
    searchLayout: 'lg:grid-cols-[1fr_340px]',
    commentFrame: 'border-cyan-200/14 bg-white/8 text-white',
  },
  'choose-your-car.com': {
    key: 'comparison-lane',
    label: 'Comparison lane',
    shell: 'bg-[linear-gradient(180deg,#f9fafb_0%,#ffffff_50%,#eef7f6_100%)]',
    hero: 'border-b border-[#0f172a]/12 bg-[linear-gradient(100deg,#f9fafb_0%,#ffffff_55%,#dff3ef_100%)]',
    eyebrow: 'text-[#0e7490]',
    title: 'font-sans text-[#111827]',
    muted: 'text-[#5b6470]',
    panel: 'border border-[#0f172a]/12 bg-white shadow-[0_14px_34px_rgba(15,23,42,0.08)]',
    softPanel: 'border border-[#0f172a]/10 bg-[#edf7f5]',
    input: 'border-[#0f172a]/16 bg-white text-[#111827]',
    primaryButton: 'bg-[#111827] text-white hover:bg-[#1f2937]',
    secondaryButton: 'border border-[#0f172a]/14 bg-white text-[#111827] hover:bg-[#edf7f5]',
    listGrid: 'grid gap-4 xl:grid-cols-2',
    cardFrame: 'group grid h-full overflow-hidden rounded-[5px] border border-[#0f172a]/12 bg-white shadow-[0_12px_32px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_46px_rgba(15,23,42,0.13)] sm:grid-cols-[240px_1fr]',
    cardImage: 'aspect-[16/10] sm:aspect-auto sm:min-h-[210px]',
    badge: 'bg-[#0e7490] text-white',
    chip: 'border border-[#0f172a]/12 bg-[#edf7f5] text-[#111827]',
    detailHero: 'bg-[linear-gradient(120deg,#111827_0%,#0e7490_100%)] text-white',
    detailPanel: 'border border-[#0f172a]/12 bg-white shadow-[0_14px_34px_rgba(15,23,42,0.08)]',
    detailAside: 'border border-[#0e7490]/18 bg-[#edf7f5]',
    relatedGrid: 'grid gap-4 xl:grid-cols-2',
    searchLayout: 'lg:grid-cols-[300px_1fr]',
    commentFrame: 'border-[#0f172a]/12 bg-white',
  },
  'cabanalaemilia.com': {
    key: 'estancia-guide',
    label: 'Estancia guide',
    shell: 'bg-[linear-gradient(180deg,#f7fbf2_0%,#ffffff_50%,#edf6fb_100%)]',
    hero: 'border-b border-[#244338]/12 bg-[linear-gradient(135deg,#f7fbf2_0%,#ffffff_48%,#dceff8_100%)]',
    eyebrow: 'text-[#2d6a4f]',
    title: 'font-display text-[#1f332b]',
    muted: 'text-[#52655e]',
    panel: 'border border-[#244338]/12 bg-white/94 shadow-[0_18px_44px_rgba(36,67,56,0.08)]',
    softPanel: 'border border-[#244338]/10 bg-[#eef7ea]',
    input: 'border-[#244338]/16 bg-white text-[#1f332b]',
    primaryButton: 'bg-[#2d6a4f] text-white hover:bg-[#245741]',
    secondaryButton: 'border border-[#244338]/16 bg-white text-[#1f332b] hover:bg-[#eef7ea]',
    listGrid: 'grid gap-6 lg:grid-cols-[1.15fr_0.85fr] [&>*:nth-child(3n+1)]:lg:col-span-2',
    cardFrame: 'group flex h-full flex-col overflow-hidden rounded-md border border-[#244338]/12 bg-white shadow-[0_14px_38px_rgba(36,67,56,0.08)] transition duration-300 hover:-translate-y-1',
    cardImage: 'aspect-[21/9]',
    badge: 'bg-[#2d6a4f] text-white',
    chip: 'border border-[#244338]/12 bg-[#eef7ea] text-[#1f332b]',
    detailHero: 'bg-[linear-gradient(120deg,#1f332b_0%,#2d6a4f_58%,#dceff8_100%)] text-white',
    detailPanel: 'border border-[#244338]/12 bg-white shadow-[0_18px_44px_rgba(36,67,56,0.08)]',
    detailAside: 'border border-[#244338]/12 bg-[#eef7ea]',
    relatedGrid: 'grid gap-6 lg:grid-cols-[1fr_1fr]',
    searchLayout: 'lg:grid-cols-[1fr_320px]',
    commentFrame: 'border-[#244338]/12 bg-white',
  },
}

const fallbackPreset = presets['miplaninvu.com']

export function getDirectoryUiPreset(): DirectoryUiPreset {
  const domain = SITE_CONFIG.domain.replace(/^www\./, '').toLowerCase()
  return presets[domain] || fallbackPreset
}
