/**
 * 计算器显示屏
 */
import { cn } from '@/lib/utils'

interface DisplayProps {
  expression: string
  result: string
  isError: boolean
  loading: boolean
}

export default function Display({ expression, result, isError, loading }: DisplayProps) {
  return (
    <div
      className={cn(
        'relative rounded-2xl bg-morandi-ink/85 px-6 py-5 shadow-soft backdrop-blur',
        'min-h-[140px] flex flex-col justify-end overflow-hidden',
      )}
    >
      {/* 背景装饰光晕 */}
      <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-morandi-blush/20 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-12 -left-8 h-28 w-28 rounded-full bg-morandi-sage/20 blur-2xl" />

      {/* 表达式 */}
      <div className="relative min-h-[28px] text-right font-body text-base text-morandi-taupe/80 break-all">
        {expression || <span className="opacity-40">输入表达式…</span>}
      </div>

      {/* 结果 */}
      <div
        className={cn(
          'relative mt-2 text-right font-display font-semibold break-all',
          'text-4xl sm:text-5xl',
          isError ? 'text-morandi-blushlight' : 'text-morandi-cream',
          loading && 'animate-pulse',
        )}
      >
        {result && (
          <span className="inline-block animate-pop">
            {isError ? '⚠ ' : ''}
            {result}
          </span>
        )}
        {loading && !result && <span className="opacity-60">计算中…</span>}
      </div>
    </div>
  )
}
