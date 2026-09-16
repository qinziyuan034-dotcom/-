/**
 * 计算器 API 客户端
 */
export interface CalculateResponse {
  success: boolean
  result?: number
  error?: string
}

export async function calculateExpression(expression: string): Promise<CalculateResponse> {
  try {
    const res = await fetch('/api/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ expression }),
    })
    return (await res.json()) as CalculateResponse
  } catch {
    return { success: false, error: '网络错误，请稍后重试' }
  }
}
