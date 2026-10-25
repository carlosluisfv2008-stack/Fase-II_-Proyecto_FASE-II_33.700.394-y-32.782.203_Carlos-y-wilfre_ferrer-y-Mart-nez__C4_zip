// Base de datos de usuarios por defecto
const usuariosBase = [
  {
    nickname: "falcoxd",
    password: "uni123",
    rol: "comprador",
    nombre: "Falco"
  },
  {
    nickname: "Rebeca",
    password: "abajo1",
    rol: "vendedor",
    nombre: "Rebeca"
  },
  {
    nickname: "David",
    password: "lucy12",
    rol: "administrador",
    nombre: "David"
  }
];

// Función de Autenticación
function iniciarSesion(nickname, password, rolSeleccionado) {
  // Obtener usuarios nuevos creados en registro.html o en admin.html
  const usuariosNuevos = JSON.parse(localStorage.getItem("usuariosNuevosBinaryShop")) || [];
  
  // Unir la lista base con los nuevos usuarios
  const todosLosUsuarios = [...usuariosBase, ...usuariosNuevos];

  const usuarioEncontrado = todosLosUsuarios.find(
    user => user.nickname.toLowerCase() === nickname.toLowerCase() && 
            user.password === password && 
            user.rol === rolSeleccionado
  );

  if (usuarioEncontrado) {
    alert(`¡Bienvenido/a ${usuarioEncontrado.nombre || usuarioEncontrado.nickname}! Modo: ${usuarioEncontrado.rol.toUpperCase()}`);
    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));
    return true;
  } else {
    alert("Credenciales o rol incorrectos. Revisa tu nickname, contraseña y selección de rol.");
    return false;
  }
}
