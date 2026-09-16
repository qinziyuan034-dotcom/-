/**
 * 计算器表达式格式化与状态管理 hook
 */
import { useCallback, useEffect, useState } from 'react'
import { calculateExpression } from '@/lib/api'

export interface HistoryItem {
  id: string
  expression: string
  result: string
  isError: boolean
  createdAt: number
}

const STORAGE_KEY = 'calc.history'
const MAX_HISTORY = 50

function loadHistory(): HistoryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as HistoryItem[]
    return Array.isArray(parsed) ? parsed.slice(0, MAX_HISTORY) : []
  } catch {
    return []
  }
}

function saveHistory(items: HistoryItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, MAX_HISTORY)))
  } catch {
    // 忽略写入失败
  }
}

/**
 * 将展示用的运算符 × ÷ 转换为后端可识别的 * /
 */
function toBackendExpression(expr: string): string {
  return expr.replace(/×/g, '*').replace(/÷/g, '/')
}

/**
 * 格式化结果显示，避免过长小数
 */
function formatNumber(num: number): string {
  if (Number.isInteger(num)) return num.toString()
  // 限制小数位数
  const fixed = num.toFixed(8).replace(/0+$/, '').replace(/\.$/, '')
  return fixed
}

export function useCalculator() {
  const [expression, setExpression] = useState<string>('')
  const [result, setResult] = useState<string>('')
  const [isError, setIsError] = useState(false)
  const [history, setHistory] = useState<HistoryItem[]>(() => loadHistory())
  const [loading, setLoading] = useState(false)
  const [lastPressed, setLastPressed] = useState<string>('')

  useEffect(() => {
    saveHistory(history)
  }, [history])

  const input = useCallback((value: string) => {
    setIsError(false)
    setResult('')
    setLastPressed(value)
    setExpression((prev) => {
      // 防止连续多个运算符
      if ('+-×÷'.includes(value)) {
        const last = prev.slice(-1)
        if ('+-×÷'.includes(last)) {
          return prev.slice(0, -1) + value
        }
      }
      return prev + value
    })
  }, [])

  const clear = useCallback(() => {
    setExpression('')
    setResult('')
    setIsError(false)
    setLastPressed('C')
  }, [])

  const backspace = useCallback(() => {
    setIsError(false)
    setResult('')
    setExpression((prev) => prev.slice(0, -1))
    setLastPressed('⌫')
  }, [])

  const evaluate = useCallback(async () => {
    const expr = expression.trim()
    if (!expr) return
    setLoading(true)
    setLastPressed('=')
    const response = await calculateExpression(toBackendExpression(expr))
    setLoading(false)

    if (response.success && typeof response.result === 'number') {
      const display = formatNumber(response.result)
      setResult(display)
      setIsError(false)
      setHistory((prev) => [
        {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          expression: expr,
          result: display,
          isError: false,
          createdAt: Date.now(),
        },
        ...prev,
      ].slice(0, MAX_HISTORY))
    } else {
      const err = response.error ?? '计算失败'
      setResult(err)
      setIsError(true)
      setHistory((prev) => [
        {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          expression: expr,
          result: err,
          isError: true,
          createdAt: Date.now(),
        },
        ...prev,
      ].slice(0, MAX_HISTORY))
    }
  }, [expression])

  const clearHistory = useCallback(() => {
    setHistory([])
    setLastPressed('')
  }, [])

  return {
    expression,
    result,
    isError,
    history,
    loading,
    lastPressed,
    input,
    clear,
    backspace,
    evaluate,
    clearHistory,
  }
}
