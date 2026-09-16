/**
 * 计算器主页面
 */
import { useEffect } from 'react'
import Display from '@/components/Display'
import Keypad from '@/components/Keypad'
import History from '@/components/History'
import { useCalculator } from '@/hooks/useCalculator'

export default function Home() {
  const calc = useCalculator()

  // 键盘支持
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const k = e.key
      if (/[0-9.]/.test(k)) {
        calc.input(k)
      } else if (k === '+' || k === '-') {
        calc.input(k)
      } else if (k === '*') {
        calc.input('×')
      } else if (k === '/') {
        e.preventDefault()
        calc.input('÷')
      } else if (k === 'Enter' || k === '=') {
        e.preventDefault()
        calc.evaluate()
      } else if (k === 'Backspace') {
        calc.backspace()
      } else if (k === 'Escape') {
        calc.clear()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calc.expression])

  return (
    <div className="min-h-screen w-full px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-5xl">
        {/* 标题 */}
        <header className="mb-6 text-center">
          <h1 className="font-display text-3xl font-bold text-morandi-ink sm:text-4xl">
            计算器
          </h1>
          <p className="mt-1 font-body text-sm text-morandi-inklight/70">
            加减乘除 · 前后端一体 · 支持键盘
          </p>
        </header>

        {/* 主体：桌面双栏，移动单栏 */}
        <div className="grid gap-5 md:grid-cols-[minmax(320px,1fr)_280px]">
          {/* 左侧：显示屏 + 按键 */}
          <section className="rounded-3xl bg-morandi-mistlight/60 p-5 shadow-soft backdrop-blur">
            <Display
              expression={calc.expression}
              result={calc.result}
              isError={calc.isError}
              loading={calc.loading}
            />
            <div className="mt-4">
              <Keypad
                onInput={calc.input}
                onClear={calc.clear}
                onBackspace={calc.backspace}
                onEquals={calc.evaluate}
                disabled={calc.loading}
              />
            </div>
          </section>

          {/* 右侧：历史记录 */}
          <aside className="md:max-h-[560px]">
            <History items={calc.history} onClear={calc.clearHistory} />
          </aside>
        </div>

        <footer className="mt-6 text-center font-body text-xs text-morandi-inklight/50">
          提示：键盘可输入 0-9、+ - * /、Enter(=)、Backspace(退格)、Esc(清除)
        </footer>
      </div>
    </div>
  )
}
