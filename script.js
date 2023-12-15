async function queryAPI(page) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZmFiZGRiOTA3NmEyZjU2NTYzMDc2MzA3ZWEwMzMxYSIsInN1YiI6IjY1M2JiN2NiNTY0ZWM3MDBlNWZhMjVhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bxLaHmqhfEn4SkKpCadyJO-Dsr0JTKUq9tWIWUBZaqI",
    },
  };
  const response = await fetch(
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
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
      const data = await queryAPI(page);
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

try {
  console.log(data);
  const allMovies = data.results;
  console.log(allMovies.length);
  const horrorMovies = allMovies.filter((movie) => {
    return movie.genre_ids.includes(27); // includes or may include any movies with id 27,127, 1127 etc.. fix
  });
  console.log(horrorMovies.length);

  if (horrorMovies.length < 5) {
    // Declare the function as async
    const fetchData = async () => {
      try {
        const additionalData = await queryAPI(2);
        console.log(additionalData);
        // Concatenate arrays and update horrorMovies
        horrorMovies = horrorMovies.concat(additionalData.results);
        console.log(horrorMovies.length);
      } catch (error) {
        console.log(error);
      }
    };

    // Call the async function
    await fetchData();
  }

  return horrorMovies;
} catch (err) {
  console.log(err);
}

async function displayData() {
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
    movieSummary.innerHTML = `<h3>Summary: ${movie.overview}</h3>`;
  });
}

// End Of Original Code
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const movieDetails = await fetch(
  `https://api.themoviedb.org/3/movie/${id}?api_key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZmFiZGRiOTA3NmEyZjU2NTYzMDc2MzA3ZWEwMzMxYSIsInN1YiI6IjY1M2JiN2NiNTY0ZWM3MDBlNWZhMjVhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bxLaHmqhfEn4SkKpCadyJO-Dsr0JTKUq9tWIWUBZaqI`
);
const movieDetailsData = await movieDetails.json();
const movieSummary = document.getElementById("movieSummary");
movieSummary.innerHTML = `<h2>Summary: ${movieDetailsData.overview}</h2><h3>IMDB Rating:</h3><h3>Budget: ${movieDetailsData.budget}</h3>`;
