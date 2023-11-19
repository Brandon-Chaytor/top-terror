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

const message = "Hello, Console!";

console.log(message);

let popularMovies = [];
getPopularMovies();

async function getPopularMovies() {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
      options
    );
    const data = await response.json(); // Extracts data as a json object from the response
    const allMovies = data.results;
    const horrorMovies = allMovies.filter((movie) => {
      return movie.genre_ids.includes(27);
    });
    console.log(allMovies);
    console.log(horrorMovies);
    const sortedMovies = horrorMovies.sort((a, b) => {
      a.data > b.data ? 1 : -1;
    });
    popularMovies = data.results;
  } catch (err) {
    console.log(err);
  }
}

console.log(popularMovies);

function displayData(currentPage) {
  const topterrorContainer = document.querySelector("topterror");

  horrorMovies.forEach((movie) => {
    const topTerrorData = document.createElement("div");
    topTerrorData.innerHTML = (
      <div class="top-terror">
        <h5>Title: ${movie.title} </h5>
        <p>Release Date: ${movie.release_date}</p>
        <img src="${movie.poster_path}"></img>
      </div>
    );
  });
}
