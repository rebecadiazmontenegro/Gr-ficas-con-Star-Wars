// -------- Grafica 1 --------

function pintarGraficaPeliculas(dataset){
    const listPeliculas = [];
    const listYears = [];
    dataset.forEach((pelicula) => {
    listPeliculas.push(pelicula.title);
    listYears.push(parseInt(pelicula.release_date.slice(0, 4))); // El slice coge los 4 primeros numeros que son el año, y el parseInt convierte el string en un numero entero
});
    var data = {
        labels: listPeliculas,
        series: [listYears], 
};


new Chartist.Line(".graficaPeliculas", data);

}

async function getData() {
  try {
    const response = await fetch("https://swapi.info/api/films");

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Recurso no encontrado (404)");
      } else if (response.status === 500) {
        throw new Error("Error en el servidor (500)");
      } else {
        throw new Error(`Error HTTP: ${response.status}`);
      }
    }

    const data = await response.json();
    console.log(data);

    pintarGraficaPeliculas(data);
  } catch (error) {
    if (error.message.includes("404")) {
      console.error("Error: No se encontró el recurso solicitado.");
    } else if (error.message.includes("500")) {
      console.error("Error: Problemas con el servidor.");
    } else {
      console.error("Hubo un problema:", error.message);
    }
  }
}
getData();


// -------- Grafica 2 --------

function pintarGraficaPersonajes(dataset){
    const listPersonajes = [];
    const listEpisodios = [];

    const primeros20 = dataset.slice(0, 20);

    primeros20.forEach((personaje) => {
    listPersonajes.push(personaje.name);
    listEpisodios.push(personaje.films.length); 
});
    var data = {
        labels: listPersonajes,
        series: [listEpisodios], 
};


new Chartist.Bar(".graficaPersonajes", data);

}

async function getData2() {
  try {
    const response = await fetch("https://swapi.info/api/people");

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Recurso no encontrado (404)");
      } else if (response.status === 500) {
        throw new Error("Error en el servidor (500)");
      } else {
        throw new Error(`Error HTTP: ${response.status}`);
      }
    }

    const data = await response.json();
    console.log(data);

    pintarGraficaPersonajes(data);
  } catch (error) {
    if (error.message.includes("404")) {
      console.error("Error: No se encontró el recurso solicitado.");
    } else if (error.message.includes("500")) {
      console.error("Error: Problemas con el servidor.");
    } else {
      console.error("Hubo un problema:", error.message);
    }
  }
}
getData2();