<template>
  <div class="pb-[30px]">
    <h4
      class="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl my-4"
    >
      {{ title }}
    </h4>
    <swiper
      :modules="modules"
      :navigation="true"
      :slides-per-view="5"
      :space-between="5"
      :breakpoints="{
        '320': { slidesPerView: 1 },
        '640': {
          slidesPerView: 2,
        },
        '768': {
          slidesPerView: 3,
        },
        '1024': {
          slidesPerView: 5,
        },
      }"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
      class="h-[180px] relative"
      role="button"
    >
      <swiper-slide
        class="hover:scale-150 duration-500 ease-in-out transition-all hover:z-40 relative"
        v-for="movie in movies"
        :key="movie.id"
        role="button"
        @click="openModal(movie)"
      >
        <div class="h-full w-full rounded-sm">
          <img
            :src="`https://image.tmdb.org/t/p/w500${
              movie.backdrop_path || movie.poster_path
            }`"
            class="object-cover h-full w-full transition duration-500 ease-in-out hover:object-contain hover:z-40"
          />
          <!-- <p class="absolute text-white bottom-4 left-2">{{ movie.title }}</p> -->
        </div>
      </swiper-slide>
    </swiper>
    <MovieModal
      :movie="selectedMovie"
      :is-open="isOpenModal"
      @close-modal="closeModal"
    />
  </div>
</template>

<script>
import { ref, reactive } from "vue";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

export default {
  data() {
    return {
      isOpenModal: false,
    };
  },
  props: {
    title: String,
    movies: Array,
  },

  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const isOpenModal = ref(false);
    const selectedMovie = ref(null);
    const onSwiper = (swiper) => {
      return;
    };
    const onSlideChange = () => {
      return;
    };
    const openModal = (movie) => {
      console.log(movie);
      selectedMovie.value = movie;
      isOpenModal.value = true;
    };

    const closeModal = () => {
      isOpenModal.value = false;
      selectedMovie.value = null;
    };
    return {
      isOpenModal,
      selectedMovie,
      openModal,
      closeModal,
      onSwiper,
      onSlideChange,
      modules: [Navigation, Pagination, Scrollbar, A11y],
    };
  },
};
</script>


