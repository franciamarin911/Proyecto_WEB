  //JS PARA FILTRAR PROYECTOS POR TIPO 

    document.addEventListener("DOMContentLoaded", function () {
      const botonesFiltro = document.querySelectorAll(".boton-filtro-proyecto");
      const tarjetasProyectos = document.querySelectorAll(".tarjeta-proyecto-3d");

      botonesFiltro.forEach((boton) => {
        boton.addEventListener("click", () => {
          const tipoSeleccionado = boton.dataset.tipo; // 'todos', 'residencial' o 'comercial'

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
