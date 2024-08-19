import {
  MAX_NUMBER_PART,
  MIN_DECIMAL_PART,
  MIN_NUMBER_PART,
} from "@/utils/constants";
import {
  minLength,
  number,
  minValue,
  object,
  string,
  coerce,
  maxValue,
  custom,
} from "valibot";

function getDecimalLength(input) {
  const expr = input.toString();

  const isExp = expr.includes("e-");

  if (isExp) {
    const length = expr.split("e-")[1];
    return Number(length);
  }

  const isDecimal = expr.includes(".");
  if (isDecimal) {
    const decimals = expr.split(".")[1];
    return decimals.length;
  }
  return 0;
}

function validNumberTo(input, minValue) {
  return getDecimalLength(input) <= getDecimalLength(minValue);
}

export const CheckoutSchema = object({
  rateId: number("Por favor, elija una tasa del dia valida."),
  specialRate: number([
    minValue(0, "Por favor, intruduzca una tasa especial valida."),
  ]),
  rateType: string([
    minLength(1, "Por favor, introduzca un tipo de tasa valido."),
  ]),
  customerCurrency: string([minLength(1, "Por favor, una moneda valido.")]),
  businessCurrency: string([
    minLength(1, "Por favor, introduzca una moneda valido."),
  ]),
  rateAmount: coerce(
    number([
      minValue(MIN_DECIMAL_PART, "Por favor, introduzca una tasa válida."),
      maxValue(MAX_NUMBER_PART, "Por favor, introduzca una tasa válida."),
      custom(
        (input) => validNumberTo(input, MIN_DECIMAL_PART),
        "La tasa debe contener al maximo 10 decimales."
      ),
    ]),
    Number
  ),
  customerAmount: number([
    minValue(MIN_NUMBER_PART, "Por favor, introduzca un monto valido."),
    custom(
      (input) => validNumberTo(input, MIN_NUMBER_PART),
      "El monto debe contener al maximo 2 decimales."
    ),
  ]),
});
