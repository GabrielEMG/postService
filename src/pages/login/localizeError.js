const localizeError = (errMessage) => {
  switch (errMessage) {
    case "The password is invalid or the user does not have a password.":
      return "La contraseña es inválida o no se ha introducido una contraseña";
    case "There is no user record corresponding to this identifier. The user may have been deleted.":
      return "No se han registrado usuarios con este correo electrónico";
    case "The email address is badly formatted.":
      return "El correo electrónico no tiene formato de email";
    case "A network error (such as timeout, interrupted connection or unreachable host) has occurred.":
      return "Error de conexión (timeout, conexión interrumpida o host inalcanzable) ha ocurrido";
    case "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.":
      return "Temporalmente la cuenta se ha deshabilitado debudo a varios intentos fallidos de entrar a esta cuenta. Puedes inmediatamente desbloquear la cuenta reiniciando tu contraseña o puedes intentar luego";
    default:
      return errMessage;
  }
};

export default localizeError;
