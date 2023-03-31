<template>
  <div>
    <div
      v-if="isOpen"
      class="fixed z-50 inset-0 overflow-y-auto bg-[#000000c9]"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      ref="modal"
    >
      <div
        class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0 font-poppins"
      >
        <div
          class="fixed inset-0 bg-primary bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-1/2 w-11/12 mx-auto"
        >
          <div class="bg-[#181717] text-white pb-6" id="main-modal">
            <div v-if="movie" class="relative">
              <div class="relative">
                <div class="absolute top-0 w-full z-40">
                  <div class="flex justify-between mb-5 p-3 items-center">
                    <p class="mb-0">{{ movie.title }}</p>
                    <button
                      className="rounded-full px-3.5 py-2 bg-[#f6f7fbd3]"
                      role="button"
                      ref="closeBtn"
                      @click="closeModal"
                    >
                      <font-awesome-icon icon="fas fa-xmark" class="text-lg" />
                      <!-- <BIconXLg class="text-red-900 font-extrabold" /> -->
                    </button>
                  </div>
                </div>
                <div class="absolute bottom-4 px-4 z-40">
                  <div class="flex">
                    <div>
                      <button
                        class="bannerButton bg-white text-black"
                        @click="playMovie(movie.id)"
                      >
                        <font-awesome-icon icon="fas fa-play" class="text-lg" />
                        Play
                      </button>
                    </div>
                  </div>
                </div>
                <img
                  :src="`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`"
                  class="h-[400px] object-cover w-full"
                />
                <!-- <video-player
                  source-type="youtube"
                  :video-id="videoId"
                  :options="{ controls: true }"
                  class="h-[400px]"
                /> -->
                <iframe
                  width="560"
                  height="315"
                  class="h-[400px] absolute w-full top-0 z-30"
                  :src="`https://www.youtube.com/embed/${videoId}`"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
              <div class="p-4">
                <p>
                  <span class="text-[#2ea14e]">82% Match </span>
                  {{ movie.release_date }}
                </p>
                <div class="flex gap-6">
                  <div class="w-9/12">
                    <p>{{ movie.overview }}</p>
                  </div>
                  <div class="w-3/12">
                    <p><span>Genres:</span> {{ movie.vote_count }}</p>
                    <p>
                      <span>Original Language:</span>
                      {{ movie.original_language }}
                    </p>
                    <p><span>Total votes:</span> {{ movie.vote_count }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import VueYoutube from "vue-youtube";
// require('nuxt-video-player/src/assets/css/main.css')
// import VideoPlayer from 'nuxt-video-player'
// import 'video.js/dist/video-js.css';
export default {
  // components: {
  //   VideoPlayer
  // },
  data() {
    return {
      videoId: "",
    };
  },
  props: {
    movie: {
      type: Object,
      // required: true,
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    async playMovie(movieId) {
      const { data } = await useFetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=f8326fccbf77b2dfd260e79a021b5e8f&language=en-US`
      );
      const results = data.value.results;
      console.log(results);
      // const randomIndex = Math.floor(Math.random() * results.length);
      const randomResult = results[0];
      const randomId = randomResult.key;
      this.videoId = randomId;
      console.log(this.videoId);
    },
  },

  created() {
    console.log(this.movie);
    // if (this.movie !== null) {
    //   this.playMovie();
    // }
  },

  setup(props, { emit }) {
    const closeModal = ($event) => {
      $event.stopPropagation();
      emit("close-modal");
      this.videoId = ""
    };
    return {
      closeModal,
    };
  },
};
</script>