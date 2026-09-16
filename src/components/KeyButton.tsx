/**
 * 计算器按键
 */
import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'num' | 'op' | 'accent' | 'equals'

interface KeyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  wide?: boolean
}

const variantClasses: Record<Variant, string> = {
  num: 'bg-morandi-creamlight text-morandi-ink hover:bg-morandi-cream',
  op: 'bg-morandi-taupe text-morandi-ink hover:bg-morandi-taupedark',
  accent: 'bg-morandi-sage text-morandi-cream hover:bg-morandi-sagedark',
  equals: 'bg-morandi-blush text-morandi-cream hover:bg-morandi-blushdark shadow-glow',
}

const KeyButton = forwardRef<HTMLButtonElement, KeyButtonProps>(
  ({ variant = 'num', wide, className, children, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'select-none rounded-2xl font-display text-xl font-medium',
          'min-h-[52px] transition-all duration-150 active:translate-y-0.5 active:shadow-press',
          'focus:outline-none focus:ring-2 focus:ring-morandi-blush/60',
          wide ? 'col-span-2' : 'col-span-1',
          variantClasses[variant],
          className,
        )}
        {...rest}
      >
        {children}
      </button>
    )
  },
)

KeyButton.displayName = 'KeyButton'

export default KeyButton
