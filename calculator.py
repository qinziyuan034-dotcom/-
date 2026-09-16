# 简单的加减乘除计算器


def add(a, b):
    """加法"""
    return a + b


def subtract(a, b):
    """减法"""
    return a - b


def multiply(a, b):
    """乘法"""
    return a * b


def divide(a, b):
    """除法"""
    if b == 0:
        return "错误：除数不能为 0"
    return a / b


def main():
    print("===== 简易计算器 =====")
    print("支持的运算：")
    print("  1. 加法 (+)")
    print("  2. 减法 (-)")
    print("  3. 乘法 (*)")
    print("  4. 除法 (/)")
    print("  输入 q 退出")
    print("=====================")

    operations = {
        "1": ("+", add),
        "2": ("-", subtract),
        "3": ("*", multiply),
        "4": ("/", divide),
    }

    while True:
        choice = input("\n请选择运算 (1/2/3/4/q): ").strip()

        if choice == "q":
            print("已退出计算器，再见！")
            break

        if choice not in operations:
            print("无效的选择，请重新输入")
            continue

        try:
            a = float(input("请输入第一个数: "))
            b = float(input("请输入第二个数: "))
        except ValueError:
            print("输入无效，请输入数字")
            continue

        symbol, func = operations[choice]
        result = func(a, b)
        print(f"{a} {symbol} {b} = {result}")


if __name__ == "__main__":
    main()
