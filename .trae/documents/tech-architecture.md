# 网页版加减乘除计算器 - 技术架构文档

## 1. 架构设计

```mermaid
flowchart LR
    "A[浏览器 前端]" -- "HTTP REST" --> "B[Express 后端]"
    "B" --> "C[表达式解析与计算引擎]"
    "C" -- "返回结果/错误" --> "B"
    "B" -- "JSON 响应" --> "A"
```

## 2. 技术说明
- 前端：React@18 + tailwindcss@3 + vite
- 初始化工具：vite-init
- 后端：Express@4（Node.js 内置 `vm` 或自定义解析器执行运算，避免使用 `eval` 的安全风险）
- 数据库：无，历史记录存储在前端 localStorage

## 3. 路由定义
| 路由 | 用途 |
|------|------|
| `/` | 前端主页面（由 Vite dev server 提供，生产环境由 Express 静态托管） |
| `/api/calculate` | 计算接口，POST 提交表达式 |

## 4. API 定义

### POST /api/calculate
请求体：
```typescript
interface CalculateRequest {
  expression: string; // 例如 "12 + 3 * 4 - 5 / 2"
}
```

响应体：
```typescript
interface CalculateResponse {
  success: boolean;
  result?: number;
  error?: string;
}
```

后端实现要点：
- 仅允许数字、运算符 `+ - * /`、小数点与空格
- 使用递归下降或 shunting-yard 算法解析，禁止 `eval`
- 除数为 0 时返回 `{ success: false, error: "除数不能为 0" }`

## 5. 服务器架构图

```mermaid
flowchart TD
    "A[Express Server]" --> "B[Static Middleware 托管前端dist]"
    "A" --> "C[/api/calculate Controller]"
    "C" --> "D[Calculator Service 解析与计算]"
    "D" --> "E[返回结果]"
```

## 6. 数据模型
无持久化数据，前端 localStorage 存储键名：`calc.history`，最多保留 50 条。
