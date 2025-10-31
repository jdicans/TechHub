export const REGEX_PATTERNS = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  PHONE: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
  URL: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
  USERNAME: /^[a-zA-Z0-9_-]{3,20}$/,
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
  ONLY_LETTERS: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
  ONLY_NUMBERS: /^[0-9]+$/
};

export const REGEX_MESSAGES = {
  EMAIL: 'Introduce un email válido',
  PASSWORD: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial',
  PHONE: 'Introduce un número de teléfono válido',
  URL: 'Introduce una URL válida',
  USERNAME: 'El nombre de usuario solo puede contener letras, números, guiones y guiones bajos',
  REQUIRED: 'Este campo es obligatorio',
  MIN_LENGTH: 'Debe tener al menos {0} caracteres',
  MAX_LENGTH: 'No puede tener más de {0} caracteres'
};
