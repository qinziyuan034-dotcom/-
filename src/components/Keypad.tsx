/**
 * 按键网格
 * 4 列 5 行布局：
 *   C  ⌫  ÷  ×
 *   7  8  9  -
 *   4  5  6  +
 *   1  2  3  = (跨两行)
 *   0(跨两列) .
 */
import KeyButton from './KeyButton'

interface KeypadProps {
  onInput: (value: string) => void
  onClear: () => void
  onBackspace: () => void
  onEquals: () => void
  disabled?: boolean
}

export default function Keypad({ onInput, onClear, onBackspace, onEquals, disabled }: KeypadProps) {
  return (
    <div className="grid grid-cols-4 grid-rows-5 gap-2 sm:gap-3">
      <KeyButton variant="accent" disabled={disabled} onClick={onClear}>C</KeyButton>
      <KeyButton variant="accent" disabled={disabled} onClick={onBackspace}>⌫</KeyButton>
      <KeyButton variant="op" disabled={disabled} onClick={() => onInput('÷')}>÷</KeyButton>
      <KeyButton variant="op" disabled={disabled} onClick={() => onInput('×')}>×</KeyButton>

      <KeyButton disabled={disabled} onClick={() => onInput('7')}>7</KeyButton>
      <KeyButton disabled={disabled} onClick={() => onInput('8')}>8</KeyButton>
      <KeyButton disabled={disabled} onClick={() => onInput('9')}>9</KeyButton>
      <KeyButton variant="op" disabled={disabled} onClick={() => onInput('-')}>-</KeyButton>

      <KeyButton disabled={disabled} onClick={() => onInput('4')}>4</KeyButton>
      <KeyButton disabled={disabled} onClick={() => onInput('5')}>5</KeyButton>
      <KeyButton disabled={disabled} onClick={() => onInput('6')}>6</KeyButton>
      <KeyButton variant="op" disabled={disabled} onClick={() => onInput('+')}>+</KeyButton>

      <KeyButton disabled={disabled} onClick={() => onInput('1')}>1</KeyButton>
      <KeyButton disabled={disabled} onClick={() => onInput('2')}>2</KeyButton>
      <KeyButton disabled={disabled} onClick={() => onInput('3')}>3</KeyButton>
      <KeyButton variant="equals" disabled={disabled} onClick={onEquals} className="row-span-2 h-full">=</KeyButton>

      <KeyButton wide disabled={disabled} onClick={() => onInput('0')}>0</KeyButton>
      <KeyButton disabled={disabled} onClick={() => onInput('.')}>.</KeyButton>
    </div>
  )
}
