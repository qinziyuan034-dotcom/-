/**
 * 计算引擎：使用递归下降解析器，避免使用 eval
 * 支持的运算：+ - * / 和括号
 */

type Token =
  | { type: 'num'; value: number }
  | { type: 'op'; value: '+' | '-' | '*' | '/' | '(' | ')' }

class ParseError extends Error {}

/**
 * 词法分析：将表达式转为 token 流
 */
function tokenize(input: string): Token[] {
  const tokens: Token[] = []
  let i = 0
  while (i < input.length) {
    const ch = input[i]
    if (ch === ' ' || ch === '\t' || ch === '\n') {
      i++
      continue
    }
    if (/[0-9]/.test(ch) || ch === '.') {
      let num = ''
      let dotCount = 0
      while (i < input.length && (/[0-9]/.test(input[i]) || input[i] === '.')) {
        if (input[i] === '.') {
          dotCount++
          if (dotCount > 1) {
            throw new ParseError('数字格式错误：多个小数点')
          }
        }
        num += input[i]
        i++
      }
      const value = Number(num)
      if (Number.isNaN(value)) {
        throw new ParseError(`无法解析数字: ${num}`)
      }
      tokens.push({ type: 'num', value })
      continue
    }
    if (ch === '+' || ch === '-' || ch === '*' || ch === '/' || ch === '(' || ch === ')') {
      tokens.push({ type: 'op', value: ch })
      i++
      continue
    }
    throw new ParseError(`非法字符: ${ch}`)
  }
  return tokens
}

/**
 * 递归下降解析器
 * 文法：
 *   expr   := term (('+' | '-') term)*
 *   term   := factor (('*' | '/') factor)*
 *   factor := number | '(' expr ')' | '-' factor
 */
class Parser {
  private tokens: Token[]
  private pos = 0

  constructor(tokens: Token[]) {
    this.tokens = tokens
  }

  private peek(): Token | null {
    return this.tokens[this.pos] ?? null
  }

  private next(): Token {
    const tk = this.tokens[this.pos]
    if (!tk) {
      throw new ParseError('意外的表达式结束')
    }
    this.pos++
    return tk
  }

  parse(): number {
    const value = this.expr()
    const remaining = this.peek()
    if (remaining) {
      throw new ParseError('表达式存在多余内容')
    }
    return value
  }

  private expr(): number {
    let left = this.term()
    let tk = this.peek()
    while (tk && tk.type === 'op' && (tk.value === '+' || tk.value === '-')) {
      this.next()
      const right = this.term()
      left = tk.value === '+' ? left + right : left - right
      tk = this.peek()
    }
    return left
  }

  private term(): number {
    let left = this.factor()
    let tk = this.peek()
    while (tk && tk.type === 'op' && (tk.value === '*' || tk.value === '/')) {
      this.next()
      const right = this.factor()
      if (tk.value === '/') {
        if (right === 0) {
          throw new ParseError('除数不能为 0')
        }
        left = left / right
      } else {
        left = left * right
      }
      tk = this.peek()
    }
    return left
  }

  private factor(): number {
    const tk = this.peek()
    if (!tk) {
      throw new ParseError('意外的表达式结束')
    }

    if (tk.type === 'num') {
      this.next()
      return tk.value
    }

    if (tk.type === 'op') {
      // 一元负号
      if (tk.value === '-') {
        this.next()
        return -this.factor()
      }
      // 一元正号
      if (tk.value === '+') {
        this.next()
        return this.factor()
      }
      // 括号
      if (tk.value === '(') {
        this.next()
        const value = this.expr()
        const closing = this.next()
        if (closing.type !== 'op' || closing.value !== ')') {
          throw new ParseError('缺少右括号')
        }
        return value
      }
    }

    throw new ParseError('无法解析表达式')
  }
}

/**
 * 计算结果
 */
export interface CalculateResult {
  success: boolean
  result?: number
  error?: string
}

/**
 * 计算入口
 */
export function calculate(expression: string): CalculateResult {
  try {
    if (!expression || expression.trim() === '') {
      return { success: false, error: '表达式为空' }
    }
    const tokens = tokenize(expression)
    if (tokens.length === 0) {
      return { success: false, error: '表达式为空' }
    }
    const parser = new Parser(tokens)
    const result = parser.parse()
    // 处理浮点精度问题
    const rounded = Math.round((result + Number.EPSILON) * 1e10) / 1e10
    return { success: true, result: rounded }
  } catch (e) {
    return {
      success: false,
      error: e instanceof ParseError ? e.message : '表达式解析失败',
    }
  }
}
