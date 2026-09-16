/**
 * 历史记录面板
 */
import { Trash2 } from 'lucide-react'
import type { HistoryItem } from '@/hooks/useCalculator'
import { cn } from '@/lib/utils'

interface HistoryProps {
  items: HistoryItem[]
  onClear: () => void
}

export default function History({ items, onClear }: HistoryProps) {
  return (
    <div className="flex h-full flex-col rounded-2xl bg-morandi-creamlight/80 p-4 shadow-soft backdrop-blur">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-morandi-ink">历史记录</h2>
        {items.length > 0 && (
          <button
            onClick={onClear}
            className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-morandi-inklight transition-colors hover:bg-morandi-taupe/40 hover:text-morandi-ink"
            aria-label="清空历史记录"
          >
            <Trash2 className="h-3.5 w-3.5" />
            清空
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto pr-1">
        {items.length === 0 ? (
          <div className="flex h-full min-h-[120px] items-center justify-center text-sm text-morandi-inklight/60">
            暂无记录
          </div>
        ) : (
          <ul className="space-y-2">
            {items.map((item) => (
              <li
                key={item.id}
                className="animate-slide-in rounded-xl bg-morandi-cream/60 px-3 py-2 text-right shadow-sm"
              >
                <div className="break-all font-body text-sm text-morandi-inklight">{item.expression}</div>
                <div
                  className={cn(
                    'mt-0.5 break-all font-display text-base font-semibold',
                    item.isError ? 'text-morandi-blushdark' : 'text-morandi-ink',
                  )}
                >
                  {item.isError ? '⚠ ' : '= '}
                  {item.result}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
