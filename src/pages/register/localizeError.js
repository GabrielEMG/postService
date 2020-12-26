const localizeError = (type) => {
  switch (type) {
    case "The email address is badly formatted.":
      return "El correo electronico no tiene formato de email";
    case "Password should be at least 6 characters":
      return "La contrasena debe tener al menos 6 caracteres";
    case "The email address is already in use by another account.":
      return "El correo electronico ya se encuentra en uso";
    default:
      return type;
  }
};

export default localizeError;
