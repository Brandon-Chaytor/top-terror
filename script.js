const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZmFiZGRiOTA3NmEyZjU2NTYzMDc2MzA3ZWEwMzMxYSIsInN1YiI6IjY1M2JiN2NiNTY0ZWM3MDBlNWZhMjVhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bxLaHmqhfEn4SkKpCadyJO-Dsr0JTKUq9tWIWUBZaqI",
  },
};

fetch("https://api.themoviedb.org/3/authentication", options)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));

const message = "Hello, Console!";

console.log(message);
