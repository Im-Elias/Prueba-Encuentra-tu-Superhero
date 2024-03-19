jQuery.fn.consultaAPI = function (IDSuperHero) {
  $.ajax({
    type: "GET",
    url: `https://www.superheroapi.com/api.php/4905856019427443/${IDSuperHero}`,
    dataType: "json",
    success: (hero) => {
      //Esconde la seccion de resultados para la carga de datos
      $(".resultado").hide();

      // Carga datos en la tarjeta
      $(".card-title").text(`Nombre: ${hero.name}`);
      $(".connections").text(
        `Conexiones: ${hero.connections["group-affiliation"]}.`
      );
      $(".publisher").text(`Publicado por: ${hero.biography.publisher}`);
      $(".occupation").text(`Ocupacion: ${hero.work.occupation}.`);
      $(".first-appearance").text(
        `Primera aparición: ${hero.biography["first-appearance"]}.`
      );
      $(".height").text(
        `Altura: ${hero.appearance.height[0]} - ${hero.appearance.height[1]}`
      );
      $(".weight").text(
        `Peso: ${hero.appearance.weight[0]} - ${hero.appearance.weight[1]}`
      );
      let aliases = "";
      hero.biography.aliases.forEach((alias) => {
        aliases += ` ${alias}`;
        $(".aliases").text(aliases);
      });
      $(".imgHero").attr("src", hero.image.url);

      //Carga datos en el grafico
      var chart = new CanvasJS.Chart("chartContainer", {
        theme: "light2",
        exportEnabled: true,
        animationEnabled: true,
        title: {
          text: `Estadísticas de poder para ${hero.name}`,
        },
        data: [
          {
            type: "pie",
            startAngle: 25,
            toolTipContent: "<b>{label}</b>: {y}",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} ({y})",
            dataPoints: [
              { y: hero.powerstats.intelligence, label: "Intelligence" },
              { y: hero.powerstats.speed, label: "Speed" },
              { y: hero.powerstats.strength, label: "Strength" },
              { y: hero.powerstats.durability, label: "Durability" },
              { y: hero.powerstats.power, label: "Power" },
              { y: hero.powerstats.combat, label: "Combat" },
            ],
          },
        ],
      });
      chart.render();
      //Muestra la seccion de resultados
      $(".resultado").toggle();
    },
    error: function (error) {
      alert(error + " No se pudo cargar la información, intente nuevamente");
    },
  });
  return this;
};
