const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZmFiZGRiOTA3NmEyZjU2NTYzMDc2MzA3ZWEwMzMxYSIsInN1YiI6IjY1M2JiN2NiNTY0ZWM3MDBlNWZhMjVhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bxLaHmqhfEn4SkKpCadyJO-Dsr0JTKUq9tWIWUBZaqI",
  },
};

//fetch("https://api.themoviedb.org/3/authentication", options)
//.then((response) => response.json())
//.then((response) => console.log(response))
//.catch((err) => console.error(err));

//fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", options)
//.then((response) => response.json())
//.then((response) => console.log(response))
//.catch((err) => console.error(err));

//const message = "Hello, Console!";

async function getHorrorMovies() {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
      options
    );
    const data = await response.json();
    const allMovies = data.results;
    const horrorMovies = allMovies.filter((movie) => {
      return movie.genre_ids.includes(27); //includes or may include any movies with id 27,127, 1127 etc.. fix
    });

    return horrorMovies;
  } catch (err) {
    console.log(err);
  }
}

async function displayData() {
  const data = await getHorrorMovies();

  const movieContainer = document.querySelector(".movie-container");
  movieContainer.innerHTML = "";

  data.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");
    movieCard.innerHTML = `
    <div class="movie-image">
      <img
        src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
        alt="${movie.title}"
      />
    </div>
    <div class="movie-info">
      <h3 class="movie-title">${movie.title}</h3>
      <span class="movie-rating">${movie.vote_average}</span>
    </div>
    <div class="overview">
      <h3>Overview</h3>
      ${movie.overview}
    </div>
    `;
    movieContainer.appendChild(movieCard);
  });
}
