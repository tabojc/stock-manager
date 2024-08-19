import { minLength, maxLength, email, object, string, custom } from "valibot";

function atLeastOneUpperCase(input) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const inputCases = input.split("");
  const isEquial = !inputCases.every((letter) => !letters.includes(letter));

  return isEquial;
}

function atLeastOneLowerCase(input) {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const inputCases = input.split("");
  const isEquial = !inputCases.every((letter) => !letters.includes(letter));

  return isEquial;
}

function atLeastOneNumber(input) {
  const characters = input.split("");
  const isOneNumber = !characters.every((character) => {
    return isNaN(character);
  });

  return isOneNumber;
}

function isNumber(input) {
  return !isNaN(input);
}

//El campo telefono debe contener solo numeros y caracteres especiales.
function isPhone(input) {
  //return /^[a-zA-Z]*$/.test(input) && [".", "-", "(", ")"].includes();
  //return /[0-9 .()]+/.test(input);
  return /[0-9 .()]{7,10}/.test(input);
}

export const UserSchema = object({
  email: string([
    minLength(3, "El campo correo es obligatorio"),
    email("El formato del campo correo es inválido"),
  ]),
  role: string([minLength(4, "El campo rol es obligatorio.")]),
  password: string([
    minLength(6, "La contraseña debe contener minimo 6 caracteres."),
    maxLength(20, "La contraseña debe contener maximo 20 caracteres."),
    custom(
      (input) => atLeastOneUpperCase(input),
      "La contraseña debe contener al menos una letra mayúscula."
    ),
    custom(
      (input) => atLeastOneLowerCase(input),
      "La contraseña debe contener al menos una letra minuscula."
    ),
    custom(
      (input) => atLeastOneNumber(input),
      "La contraseña debe contener al menos un numero."
    ),
  ]),
  confirmPassword: string([
    minLength(6, "La contraseña debe contener minimo 6 caracteres."),
    maxLength(20, "La contraseña debe contener maximo 20 caracteres."),
    custom(
      (input) => atLeastOneUpperCase(input),
      "La contraseña debe contener al menos una letra mayúscula."
    ),
    custom(
      (input) => atLeastOneLowerCase(input),
      "La contraseña debe contener al menos una letra minuscula."
    ),
    custom(
      (input) => atLeastOneNumber(input),
      "La contraseña debe contener al menos un numero."
    ),
  ]),
  dni: string([
    minLength(1, "El campo DNI es obligatorio"),
    custom((input) => isNumber(input), "El campo dni debe ser un número."),
  ]),
  firstname: string([
    minLength(1, "El campo Nombre es obligatorio."),
    maxLength(20, "El campo Nombre debe contener maximo 20 caracteres."),
  ]),
  lastname: string([
    minLength(3, "El campo Apellido es obligatorio."),
    maxLength(20, "El formato del campo Apellido es inválido."),
  ]),
  description: string(),
  countryName: string([minLength(3, "Por favor, elija un pais valido.")]),
  phone: string([
    minLength(7, "El campo telefono debe contener minimo 3 caracteres."),
    maxLength(20, "El campo telefono debe contener maximo 20 caracteres."),
    custom(
      (input) => isPhone(input),
      "El campo telefono debe contener solo numeros y caracteres especiales."
    ),
  ]),
  address: string([minLength(3, "El campo dirección es obligatorio.")]),
});
