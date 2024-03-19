function validarHero() {
  let IDSuperHero = $("#floatingInputValue").val();
  let Patroncito = /^[0-9]+$/;

  if (!Patroncito.test(IDSuperHero) || IDSuperHero < 1 || IDSuperHero > 731) {
    alert("Por favor solo ingresar números entre 1 y 731");
    return null;
  } else {
    return IDSuperHero;
  }
}

$(() => {
  $("#Forma").on("submit", (event) => {
    event.preventDefault();
    // Capturar la información del usuario
    let IDSuperHero = validarHero();
    // Si la información es válida, realizar la consulta a la API
    if (IDSuperHero !== null) {
      $("#Forma").consultaAPI(IDSuperHero);
    }
  });
});
