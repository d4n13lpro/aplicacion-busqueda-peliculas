// Agrega un evento de click al botón de búsqueda
document.getElementById("searchButton").addEventListener("click", searchMovies);

// Define la clave de la API y las URL base para las películas y las imágenes
let api_key = "f472f64ebf7011694781cbff14329e4f";
let urlBase = "https://api.themoviedb.org/3/search/movie";
let urlImg = "https://image.tmdb.org/t/p/w500";

// Función para buscar películas
function searchMovies() {
  // Muestra el mensaje de "Cargando..."
  document.getElementById("results").innerHTML = "Cargando...";

  // Obtiene el valor del campo de búsqueda
  let searchInput = document.getElementById("searchInput").value;
  // Construye la URL para la solicitud fetch
  let fetchUrl = `${urlBase}?query=${searchInput}&api_key=${api_key}`;

  // Realiza la solicitud fetch
  fetch(fetchUrl)
    .then((response) => response.json()) // Convierte la respuesta en JSON
    .then((response) => displayMovies(response.results)) // Muestra las películas
    .catch((error) => {
      // Maneja cualquier error que ocurra durante la solicitud fetch
      console.error("Hubo un problema con la petición fetch:", error);
    });
}

// Función para mostrar las películas
function displayMovies(movies) {
  // Obtiene el contenedor de resultados
  let resultContainer = document.getElementById("results");
  // Limpia el contenedor de resultados
  resultContainer.innerHTML = "";
  // Si no hay películas, muestra un mensaje
  if (movies.length === 0) {
    resultContainer.innerHTML = "<p> No se encontraron resultados </>";
    return;
  }
  // Para cada película...
  movies.forEach((movie) => {
    // Crea un div para la película
    let movieDiv = document.createElement("div");
    movieDiv.classList.add("movie");

    // Crea y añade el título de la película
    let title = document.createElement("h2");
    title.textContent = movie.title;

    // Crea y añade la fecha de lanzamiento de la película
    let releaseDay = document.createElement("p");
    releaseDay.textContent =
      "La fecha de lanzamiento fue: " + movie.release_date;

    // Crea y añade la descripción de la película
    let overview = document.createElement("p");
    overview.textContent = movie.overview;

    // Crea y añade el póster de la película
    let posterPath = urlImg + movie.poster_path;
    let poster = document.createElement("img");
    poster.src = posterPath;

    // Añade el póster, el título, la fecha de lanzamiento y la descripción al div de la película
    movieDiv.appendChild(poster);
    movieDiv.appendChild(title);
    movieDiv.appendChild(releaseDay);
    movieDiv.appendChild(overview);

    // Añade el div de la película al contenedor de resultados
    resultContainer.appendChild(movieDiv);
  });
}
