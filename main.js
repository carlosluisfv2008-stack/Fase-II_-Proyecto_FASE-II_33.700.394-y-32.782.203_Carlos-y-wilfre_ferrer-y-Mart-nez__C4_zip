document.addEventListener("DOMContentLoaded", () => {
  verificarEstadoSesion();
  cargarFuncionesCarrito();
});

function verificarEstadoSesion() {
  const usuarioGuardado = localStorage.getItem("usuarioActivo");
  
  const navVendedor = document.getElementById("nav-vendedor");
  const navAdmin = document.getElementById("nav-admin");
  const navLogin = document.querySelector('a[href="login.html"]');
  const navRegistro = document.querySelector('a[href="registro.html"]');
  const navBar = document.querySelector("nav");

  if (usuarioGuardado) {
    // CAMBIO 1: Si hay sesión iniciada, cambiamos la imagen de fondo de la pantalla por otra (puedes cambiar la ruta por la imagen que prefieras)
    document.body.style.backgroundImage = "url('img/logo.png')"; // Aquí puedes poner otra imagen de tu carpeta img si gustas

    const usuario = JSON.parse(usuarioGuardado);

    if (navLogin) navLogin.style.display = "none";
    if (navRegistro) navRegistro.style.display = "none";

    if (usuario.rol === "vendedor" && navVendedor) {
      navVendedor.style.display = "inline-block";
    }

    if (usuario.rol === "administrador" && navAdmin) {
      navAdmin.style.display = "inline-block";
    }

    if (navBar && !document.getElementById("btn-logout")) {
      const infoUsuario = document.createElement("span");
      infoUsuario.style.color = "#38bdf8";
      infoUsuario.style.marginLeft = "15px";
      infoUsuario.style.fontWeight = "bold";
      infoUsuario.textContent = `👤 ${usuario.nickname} (${usuario.rol.toUpperCase()})`;

      const btnLogout = document.createElement("a");
      btnLogout.id = "btn-logout";
      btnLogout.href = "#";
      btnLogout.style.backgroundColor = "#dc2626"; // Botón de salir rojo y llamativo
      btnLogout.style.color = "#fff";
      btnLogout.style.marginLeft = "15px";
      btnLogout.textContent = "Cerrar Sesión";
      
      btnLogout.addEventListener("click", (e) => {
        e.preventDefault();
        cerrarSesion();
      });

      navBar.appendChild(infoUsuario);
      navBar.appendChild(btnLogout);
    }
  } else {
    // Fondo por defecto cuando NO hay sesión iniciada
    document.body.style.backgroundImage = "url('img/fondo.png')";
  }
}

function cerrarSesion() {
  localStorage.removeItem("usuarioActivo");
  alert("Has cerrado sesión en BinaryShop.");
  window.location.href = "index.html";
}

function cargarFuncionesCarrito() {
  const botonesCarrito = document.querySelectorAll(".btn-carrito");
  
  botonesCarrito.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      const usuarioGuardado = localStorage.getItem("usuarioActivo");
      
      if (!usuarioGuardado) {
        alert("Debes iniciar sesión para añadir productos al carrito.");
        window.location.href = "login.html";
        return;
      }

      const usuario = JSON.parse(usuarioGuardado);
      
      if (usuario.rol !== "comprador") {
        alert("Solo los usuarios con rol Comprador pueden añadir productos al carrito.");
        return;
      }

      const tarjeta = e.target.closest(".tarjeta-producto");
      const nombreProducto = tarjeta ? tarjeta.querySelector("h3").textContent : "Producto";

      alert(`🛒 ¡"${nombreProducto}" fue añadido al carrito de ${usuario.nickname}!`);
    });
  });
}
