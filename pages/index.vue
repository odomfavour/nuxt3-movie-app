<template>
  <ClientOnly>
    <div class="bg-gradient-to-b">
      <div>
        <div
          class="h-screen relative bg-cover bg-center"
          :style="{
            backgroundImage: `linear-gradient(45deg, #000000c9, #000000c9), url(${
              backdropPath ? backgroundUrl : '/poster.jpg'
            })`,
          }"
        >
          <div class="w-11/12 mx-auto">
            <div class="flex items-center h-[80vh]">
              <div class="text-white" v-if="backdropPath">
                <h1
                  class="text-2xl md-text-4xl lg:text-7xl font-bold"
                  v-if="title"
                >
                  {{ title }}
                </h1>
                <p
                  class="max-w-x5 text-shadow-md text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-xl"
                  v-if="overview"
                >
                  {{ overview }}
                </p>
                <div class="flex gap-4 mt-4">
                  <button class="bannerButton bg-white text-black">Play</button>
                  <button class="bannerButton bg-[gray]/70">Play</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section>
          <div class="w-11/12 mx-auto">
            <MovieRow :movies="trendingMovies" title="Trending Now" />
            <MovieRow :movies="topRatedMovies" title="Top Rated" />
            <MovieRow :movies="actionMovies" title="Action Thrillers" />
            <MovieRow :movies="comedyMovies" title="Comedies" />
            <MovieRow :movies="scaryMovies" title="Scary Movies" />
            <MovieRow :movies="romanceMovies" title="Romance Movies" />
            <MovieRow :movies="documentaries" title="Documentaries" />
          </div>
        </section>
        <!-- <MovieModal/> -->
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
// const counter = useState("counter", () => Math.round(Math.random() * 1000));

const { data } = await useFetch(
  "https://api.themoviedb.org/3/discover/movie?api_key=f8326fccbf77b2dfd260e79a021b5e8f&with_networks=213"
);


const movies = data?.value?.results || [];
const randomIndex = Math.floor(Math.random() * movies.length);
const selectedMovie = movies[randomIndex];
const backdropPath = selectedMovie?.backdrop_path;
const backgroundUrl = `https://image.tmdb.org/t/p/original${backdropPath}`;
const title = selectedMovie?.title;
const overview = selectedMovie?.overview;

const trendingMoviesResult = await useFetch(
  "https://api.themoviedb.org/3/trending/all/week?api_key=f8326fccbf77b2dfd260e79a021b5e8f&language=en-US"
);
const trendingMovies = trendingMoviesResult.data?.value?.results;

const topRatedResult = await useFetch(
  "https://api.themoviedb.org/3/movie/top_rated?api_key=f8326fccbf77b2dfd260e79a021b5e8f&language=en-US"
);
const topRatedMovies = topRatedResult.data?.value?.results || [];
// fetchActionMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28`,
const actionMoviesResult = await useFetch(
  "https://api.themoviedb.org/3/discover/movie?api_key=f8326fccbf77b2dfd260e79a021b5e8f&language=en-US&with_genres=28"
);
const actionMovies = actionMoviesResult.data?.value?.results || [];

const comedyMoviesResult = await useFetch(
  "https://api.themoviedb.org/3/discover/movie?api_key=f8326fccbf77b2dfd260e79a021b5e8f&language=en-US&with_genres=35"
);
const comedyMovies = comedyMoviesResult.data?.value?.results || [];

const scaryMoviesResult = await useFetch(
  "https://api.themoviedb.org/3/discover/movie?api_key=f8326fccbf77b2dfd260e79a021b5e8f&language=en-US&with_genres=27"
);
const scaryMovies = scaryMoviesResult.data?.value?.results || [];

const romanceMoviesResult = await useFetch(
  "https://api.themoviedb.org/3/discover/movie?api_key=f8326fccbf77b2dfd260e79a021b5e8f&language=en-US&with_genres=10749"
);
const romanceMovies = romanceMoviesResult.data?.value?.results || [];

const documentariesResult = await useFetch(
  "https://api.themoviedb.org/3/discover/movie?api_key=f8326fccbf77b2dfd260e79a021b5e8f&language=en-US&with_genres=99"
);
const documentaries = documentariesResult.data?.value?.results || [];
</script>

<style>
</style>