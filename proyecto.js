document.addEventListener("DOMContentLoaded", () => {
  // Botones sección inicio
  const btnCotizacion = document.getElementById("Btn_Cotizacion");
  const btnUnirse = document.getElementById("Btn_UnirseEquipo");
  const tituloInicio = document.getElementById("inicio-titulo");
  const parrafoInicio = document.querySelector("#inicio p");

  if (btnCotizacion && tituloInicio && parrafoInicio) {
    btnCotizacion.addEventListener("click", () => {
      tituloInicio.textContent = "Gracias por tu interés en una cotización.";
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

      // activa solo la actual
      slidesFiltrados[currentIndex].classList.add("activa");

      // actualizar los puntitos del carrusel
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
  //JS PARA FILTRAR PROYECTOS POR TIPO 

    document.addEventListener("DOMContentLoaded", function () {
      const botonesFiltro = document.querySelectorAll(".boton-filtro-proyecto");
      const tarjetasProyectos = document.querySelectorAll(".tarjeta-proyecto-3d");

      botonesFiltro.forEach((boton) => {
        boton.addEventListener("click", () => {
          const tipoSeleccionado = boton.dataset.tipo;

          // Marcar botón activo (opcional para estilos)
          botonesFiltro.forEach((b) => b.classList.remove("boton-filtro-activo"));
          boton.classList.add("boton-filtro-activo");

          // Mostrar / ocultar tarjetas según el filtro
          tarjetasProyectos.forEach((tarjeta) => {
            const tipoTarjeta = tarjeta.dataset.tipoProyecto; // viene de data-tipo-proyecto

            if (tipoSeleccionado === "todos" || tipoTarjeta === tipoSeleccionado) {
              tarjeta.style.display = ""; // muestra
            } else {
              tarjeta.style.display = "none"; // oculta
            }
          });
        });
      });
    });
    //SECCION CONTACTO
    // Ejecutar cuando el HTML esté cargado
document.addEventListener("DOMContentLoaded", () => {

  const formularioContacto = document.getElementById("formulario-contacto");

  if (formularioContacto) {
    formularioContacto.addEventListener("submit", function (e) {
      e.preventDefault(); // evita el envío real

      // Obtener valores
      const nombre  = document.getElementById("nombre").value.trim();
      const correo  = document.getElementById("correo").value.trim();
      const celular = document.getElementById("celular").value.trim();
      const mensaje = document.getElementById("mensaje").value.trim();

      // Validación muy básica
      if (!nombre || !correo || !celular || !mensaje) {
        alert("Por favor completa todos los campos antes de enviar.");
        return;
      }

      // “Simulación” de envío
      alert(
        "Gracias por contactarte con MEGA CONSTRUCCIONES\n\n" +
        "Hemos recibido tu mensaje y te responderemos a la brevedad."
      );

      // Limpiar el formulario
      this.reset();
    });
  }

});
