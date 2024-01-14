async function queryTopRatedMovies(page = 1) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZmFiZGRiOTA3NmEyZjU2NTYzMDc2MzA3ZWEwMzMxYSIsInN1YiI6IjY1M2JiN2NiNTY0ZWM3MDBlNWZhMjVhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bxLaHmqhfEn4SkKpCadyJO-Dsr0JTKUq9tWIWUBZaqI",
    },
  };
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200`,
    options
  );
  const data = await response.json();
  return data;
}

async function filterHorrorMovies(movieList) {
  const horrorMovies = movieList.filter((movie) => {
    return movie.genre_ids.includes(27);
  });
  return horrorMovies;
}

async function getHorrorMovies() {
  try {
    let page = 1;
    let horrorMovies = [];

    while (horrorMovies.length < 5 && page <= 10) {
      const data = await queryTopRatedMovies(page);
      const pageHorrorMovies = await filterHorrorMovies(data.results);
      horrorMovies.push(...pageHorrorMovies);
      page++;
    }

    console.log(horrorMovies.length);
    return horrorMovies;
  } catch (err) {
    console.log(err);
  }
}

async function displayTopRatedMovies() {
  const data = await getHorrorMovies();
  const movieContainer = document.querySelector(".movie-container");
  movieContainer.innerHTML = "";

  data.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    const title = document.createElement("h3");

    const link = document.createElement("a");
    link.href = `moviedetails.html?id=${movie.id}`;
    link.textContent = movie.title;

    const image = document.createElement("img");
    image.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    image.alt = movie.title;
    image.width = 400;
    image.href = `moviedetails.html?id=${movie.id}`;

    const overview = document.createElement("p");
    overview.textContent = movie.overview;

    title.appendChild(link);
    movieCard.appendChild(title);
    movieCard.appendChild(image);
    movieCard.appendChild(overview);
    movieContainer.appendChild(movieCard);

    const movieSummary = document.getElementById("movieSummary");
    if (movieSummary != null) {
      movieSummary.innerHTML = `<h3>Summary: ${movie.overview}</h3>`;
    }
  });
}

async function getMovieDetailsById(id) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZmFiZGRiOTA3NmEyZjU2NTYzMDc2MzA3ZWEwMzMxYSIsInN1YiI6IjY1M2JiN2NiNTY0ZWM3MDBlNWZhMjVhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bxLaHmqhfEn4SkKpCadyJO-Dsr0JTKUq9tWIWUBZaqI",
    },
  };

  const movieDetails = await fetch(
    `https://api.themoviedb.org/3/movie/${id}`,
    options
  );
  const movieDetailsData = await movieDetails.json();
  console.log(movieDetailsData);
  const movieSummary = document.getElementById("movieSummary");
  movieSummary.innerHTML = `<h2>${movieDetailsData.title}</h2>
  <h2>${movieDetailsData.tagline}</h2> 
  <h3> Rating: ${movieDetailsData.vote_average}</h3> 
  <h3>Budget: ${movieDetailsData.budget}</h3>
  <h3>Synopsis: ${movieDetailsData.overview}</h3>
  <img src="https://image.tmdb.org/t/p/w500/${movieDetailsData.poster_path}" alt="${movieDetailsData.title}" width="400">
  `;
}

window.onload = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  if (id != null) {
    await getMovieDetailsById(id);
  }
};
