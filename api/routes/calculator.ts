/**
 * 计算器 API 路由
 * POST /api/calculate
 */
import { Router, type Request, type Response } from 'express'
import { calculate } from '../services/calculator.js'

const router = Router()

interface CalculateRequest {
  expression?: string
}

/**
 * POST /api/calculate
 * 请求体: { expression: string }
 * 响应: { success: boolean, result?: number, error?: string }
 */
router.post('/calculate', (req: Request, res: Response): void => {
  const { expression } = (req.body || {}) as CalculateRequest

  if (typeof expression !== 'string') {
    res.status(400).json({
      success: false,
      error: 'expression 必须为字符串',
    })
    return
  }

  const result = calculate(expression)

  if (result.success) {
    res.status(200).json({
      success: true,
      result: result.result,
    })
  } else {
    res.status(200).json({
      success: false,
      error: result.error ?? '计算失败',
    })
  }
})

export default router
