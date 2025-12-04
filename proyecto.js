document.addEventListener("DOMContentLoaded", () => {
  // Botones sección inicio
  const btnCotizacion = document.getElementById("Btn_Cotizacion");
  const btnUnirse = document.getElementById("Btn_UnirseEquipo");
  const tituloInicio = document.getElementById("inicio-titulo");
  const parrafoInicio = document.querySelector("#inicio p");

  if (btnCotizacion && tituloInicio && parrafoInicio) {
    btnCotizacion.addEventListener("click", () => {
      tituloInicio.textContent = "¡Gracias por tu interés en una cotización!";
      parrafoInicio.textContent =
        "Nuestro equipo te contactará pronto para ayudarte con tu proyecto.";
    });
  }

  if (btnUnirse && parrafoInicio) {
    btnUnirse.addEventListener("click", () => {
      alert("Pronto habilitaremos el formulario para unirte al equipo.");
      parrafoInicio.textContent =
        "Mientras tanto, prepara tu currículum y mantente atento a futuras convocatorias.";
    });
  }

  // Botón solicitar llamada en el aside
  const btnLlamada = document.getElementById("form-llamada");
  if (btnLlamada) {
    btnLlamada.addEventListener("click", (evento) => {
      evento.preventDefault();
      alert("Tu solicitud ha sido enviada. Te contactaremos pronto.");
    });
  }

  // Formulario de contacto (otra página)
  const btnContacto = document.getElementById("btn-contacto");
  const campoNombre = document.getElementById("nombre");
  const campoCorreo = document.getElementById("correo");
  const campoCelular = document.getElementById("celular");
  const campoMensaje = document.getElementById("mensaje");

  if (
    btnContacto &&
    campoNombre &&
    campoCorreo &&
    campoCelular &&
    campoMensaje
  ) {
    btnContacto.addEventListener("click", function () {
      let error = false;

      [campoNombre, campoCorreo, campoCelular, campoMensaje].forEach(
        (campo) => {
          if (campo.value.trim() === "") {
            campo.style.backgroundColor = "#f8d7da";
            error = true;
          } else {
            campo.style.backgroundColor = "";
          }
        }
      );

      if (error) {
        alert("Por favor, llena todos los campos.");
        return;
      }

      alert("Tu mensaje fue enviado correctamente. Gracias por comunicarte.");

      campoNombre.value = "";
      campoCorreo.value = "";
      campoCelular.value = "";
      campoMensaje.value = "";
    });
  }

  // Filtro de proyectos 3D (página proyectos)
  const botonesFiltro = document.querySelectorAll(".boton-filtro-proyecto");
  const tarjetasProyectos = document.querySelectorAll(".tarjeta-proyecto-3d");

  if (botonesFiltro.length && tarjetasProyectos.length) {
    function aplicarFiltro(tipo) {
      tarjetasProyectos.forEach((tarjeta) => {
        const tipoTarjeta = tarjeta.getAttribute("data-tipo-proyecto");
        if (tipo === "todos" || tipoTarjeta === tipo) {
          tarjeta.classList.remove("oculto");
        } else {
          tarjeta.classList.add("oculto");
        }
      });
    }

    botonesFiltro.forEach((btn) => {
      btn.addEventListener("click", () => {
        const tipo = btn.getAttribute("data-tipo");

        botonesFiltro.forEach((b) => b.classList.remove("activo"));
        btn.classList.add("activo");

        aplicarFiltro(tipo);
      });
    });

    const btnTodos = document.querySelector(
      '.boton-filtro-proyecto[data-tipo="todos"]'
    );
    if (btnTodos) {
      btnTodos.classList.add("activo");
      aplicarFiltro("todos");
    }
  }

  // Menú hamburguesa
  const menuToggle = document.querySelector(".menu-toggle");
  const listaMenu = document.querySelector(".lista-menu");

  if (menuToggle && listaMenu) {
    menuToggle.addEventListener("click", () => {
      const abierto = menuToggle.classList.toggle("abierto");
      listaMenu.classList.toggle("abierto", abierto);
      menuToggle.setAttribute("aria-expanded", abierto ? "true" : "false");
    });

    listaMenu.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        menuToggle.classList.remove("abierto");
        listaMenu.classList.remove("abierto");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Galería como carrusel (una imagen a la vez con filtros)
  const allSlides = Array.from(
    document.querySelectorAll("#galeria .fotos img")
  );
  const filterButtons = document.querySelectorAll(".galeria-btn");
  const paginator = document.getElementById("paginador-galeria");
  const prevBtn = document.querySelector(".galeria-arrow.prev");
  const nextBtn = document.querySelector(".galeria-arrow.next");

  if (
    allSlides.length &&
    filterButtons.length &&
    paginator &&
    prevBtn &&
    nextBtn
  ) {
    let currentCategory = "exterior";
    let slidesFiltrados = [];
    let currentIndex = 0;

    function crearPaginador() {
      paginator.innerHTML = "";
      slidesFiltrados.forEach((_, index) => {
        const dot = document.createElement("button");
        if (index === currentIndex) dot.classList.add("activo");
        dot.addEventListener("click", () => mostrarSlide(index));
        paginator.appendChild(dot);
      });
    }

    function mostrarSlide(index) {
      if (!slidesFiltrados.length) return;

      const total = slidesFiltrados.length;
      currentIndex = (index + total) % total;

      // quitar activa de todas las imágenes
      allSlides.forEach((img) => img.classList.remove("activa"));

      // activar solo la actual
      slidesFiltrados[currentIndex].classList.add("activa");

      // actualizar puntitos
      const dots = paginator.querySelectorAll("button");
      dots.forEach((dot) => dot.classList.remove("activo"));
      if (dots[currentIndex]) dots[currentIndex].classList.add("activo");
    }

    function aplicarFiltroGaleria(categoria) {
      currentCategory = categoria;

      // marcar botón activo
      filterButtons.forEach((btn) => {
        const activa = btn.dataset.filter === categoria;
        btn.classList.toggle("activa", activa);
      });

      // limpiar clases activas anteriores
      allSlides.forEach((img) => img.classList.remove("activa"));

      // filtrar imágenes por categoría
      slidesFiltrados = allSlides.filter(
        (img) => img.dataset.category === categoria
      );

      if (!slidesFiltrados.length) {
        paginator.innerHTML = "";
        return;
      }

      currentIndex = 0;
      crearPaginador();
      mostrarSlide(currentIndex);
    }

    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        aplicarFiltroGaleria(btn.dataset.filter);
      });
    });

    prevBtn.addEventListener("click", () => {
      mostrarSlide(currentIndex - 1);
    });

    nextBtn.addEventListener("click", () => {
      mostrarSlide(currentIndex + 1);
    });

    const intervalo = setInterval(() => {
      mostrarSlide(currentIndex + 1);
    }, 5000);

    // iniciar en "exterior"
    aplicarFiltroGaleria(currentCategory);
  }
});
