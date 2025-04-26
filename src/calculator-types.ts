/**
 * 計算結果のインターフェース定義
 */
export interface CalculationResult {
  result: number;
  expression: string;
}

/**
 * 基本的な演算子の列挙型
 */
export enum Operator {
  ADD = "+",
  SUBTRACT = "-",
  MULTIPLY = "*",
  DIVIDE = "/",
  POWER = "^",
}

/**
 * 各種計算のエラーコード
 */
export enum CalculationErrorCode {
  DIVISION_BY_ZERO = "DIVISION_BY_ZERO",
  INVALID_OPERATION = "INVALID_OPERATION",
  OVERFLOW = "OVERFLOW",
}

/**
 * 計算エラーのインターフェース
 */
export interface CalculationError {
  code: CalculationErrorCode;
  message: string;
}
