/**
 * Старые скрипты подключение которые надо удалить
 */

// Marquee banner top
let SwiperTop = new Swiper(".marquee-block", {
  spaceBetween: 0,
  centeredSlides: true,
  speed: 5000,
  autoplay: {
    delay: 1,
  },
  loop: true,
  slidesPerView: "auto",
  allowTouchMove: false,
  disableOnInteraction: true,
});


// Banner top
var swiperBannerTop = new Swiper(".swiper-banner-top", {
  spaceBetween: 0,
  slidesPerView: 1,
  navigation: {
    prevEl: ".swiper-button-custom-prev",
    nextEl: ".swiper-button-custom-next",
  },
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
});

// Slider
var swiperSlider = new Swiper(".swiper-slider", {
  spaceBetween: 0,
  slidesPerView: 1,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
});


// Collection
if (document.querySelector(".swiper-collection")) {
  var swiperCollection = new Swiper(".swiper-collection", {
    navigation: {
      prevEl: ".swiper-button-prev",
      nextEl: ".swiper-button-next",
    },
    loop: true,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    slidesPerView: 2,
    spaceBetween: 16,
    breakpoints: {
      640: {
        slidesPerView: 3,
        spaceBetween: 16,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1280: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    },
  });
}

// Collection 6
if (document.querySelector(".swiper-collection-scroll")) {
  var swiperCollection = new Swiper(".swiper-collection-scroll", {
    scrollbar: {
      el: ".swiper-scrollbar",
      hide: true,
    },
    loop: true,
    slidesPerView: 2,
    spaceBetween: 16,
    breakpoints: {
      640: {
        slidesPerView: 3,
        spaceBetween: 16,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1280: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    },
  });
}

// Popular product 6
var swiperScrollImg = new Swiper(".swiper-img-scroll", {
  scrollbar: {
    el: ".swiper-scrollbar",
    hide: true,
  },
  loop: false,
  slidesPerView: 2,
  spaceBetween: 16,
  breakpoints: {
    640: {
      slidesPerView: 3,
      spaceBetween: 16,
    },
    1024: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
  },
});

// Trending 7
if (document.querySelector(".swiper-list-trending")) {
  var swiperCollection = new Swiper(".swiper-list-trending", {
    navigation: {
      prevEl: ".swiper-button-prev",
      nextEl: ".swiper-button-next",
    },
    loop: true,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    slidesPerView: 2,
    spaceBetween: 16,
    breakpoints: {
      640: {
        slidesPerView: 3,
        spaceBetween: 16,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 5,
        spaceBetween: 20,
      },
      1280: {
        slidesPerView: 6,
        spaceBetween: 30,
      },
    },
  });
}

// Collection 8
if (document.querySelector(".swiper-collection-eight")) {
  var swiperCollection = new Swiper(".swiper-collection-eight", {
    navigation: {
      prevEl: ".swiper-button-prev",
      nextEl: ".swiper-button-next",
    },
    loop: true,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    slidesPerView: 2,
    spaceBetween: 16,
    breakpoints: {
      640: {
        slidesPerView: 3,
        spaceBetween: 16,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
      1280: {
        slidesPerView: 5,
        spaceBetween: 30,
      },
    },
  });
}

// list-product
if (document.querySelector(".swiper-list-product")) {
  var swiperListProduct = new Swiper(".swiper-list-product", {
    navigation: {
      prevEl: ".swiper-button-prev2",
      nextEl: ".swiper-button-next2",
    },
    loop: true,
    slidesPerView: 2,
    spaceBetween: 16,
    breakpoints: {
      640: {
        slidesPerView: 3,
        spaceBetween: 16,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1280: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
  });
}

// list-three-product
if (document.querySelector(".swiper-list-three-product")) {
  var swiperListProduct = new Swiper(".swiper-list-three-product", {
    navigation: {
      prevEl: ".swiper-button-prev2",
      nextEl: ".swiper-button-next2",
    },
    loop: true,
    slidesPerView: 2,
    spaceBetween: 16,
    breakpoints: {
      640: {
        slidesPerView: 3,
        spaceBetween: 16,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1280: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });
}


// list-feature-product Underwear
var swiperUnderwear = new Swiper(".mySwiper", {
  spaceBetween: 0,
  slidesPerView: 1,
  // freeMode: true,
  watchSlidesProgress: true,
});
var swiper2 = new Swiper(".mySwiper2", {
  spaceBetween: 0,
  thumbs: {
    swiper: swiperUnderwear,
  },
  on: {
    slideChange: function () {
      // Get index of current slide in swiper 1
      let activeIndex = this.activeIndex;

      // Remove class 'swiper-slide-thumb-active' from all slide in swiper 2
      document.querySelectorAll(".mySwiper .swiper-slide").forEach((slide) => {
        slide.classList.remove("swiper-slide-thumb-active");
      });

      // Add class 'swiper-slide-thumb-active' to slide in swiper 2
      document
        .querySelectorAll(".mySwiper .swiper-slide")
      [activeIndex].classList.add("swiper-slide-thumb-active");
    },
  },
});


// list-testimonial
if (document.querySelector(".swiper-list-testimonial")) {
  var swiperListTestimonial = new Swiper(".swiper-list-testimonial", {
    pagination: { clickable: true, el: ".swiper-pagination" },
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    touchEventsTarget: "wrapper",
    slidesPerView: 1,
    spaceBetween: 0,
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 16,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 16,
      },
      1280: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });
}


// list-testimonial 4
var swiperListTestimonialFour = new Swiper(".swiper-testimonial-four", {
  navigation: {
    prevEl: ".swiper-button-prev",
    nextEl: ".swiper-button-next",
  },
  autoplay: {
    delay: 3000,
  },
  loop: true,
  slidesPerView: 1,
  spaceBetween: 0,
  on: {
    slideChange: () => {
      handleSlideActive();
    },
  },
});


// list-instagram
var swiperListInstagram = new Swiper(".swiper-list-instagram", {
  pagination: { clickable: true, el: ".swiper-pagination" },
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  slidesPerView: 2,
  spaceBetween: 12,
  breakpoints: {
    640: {
      slidesPerView: 3,
      spaceBetween: 12,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 16,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 16,
    },
    1280: {
      slidesPerView: 5,
      spaceBetween: 16,
    },
  },
});

// list-instagram 3
var swiperListInstagram = new Swiper(".swiper-instagram-three", {
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  clickable: true,
  slidesPerView: 2,
  spaceBetween: 0,
  breakpoints: {
    640: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 4,
    },
    1024: {
      slidesPerView: 5,
    },
    1280: {
      slidesPerView: 6,
    },
  },
});

// list-brand
var swiperListBrand = new Swiper(".swiper-list-brand", {
  pagination: { clickable: true, el: ".swiper-pagination" },
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  slidesPerView: 2,
  spaceBetween: 12,
  breakpoints: {
    640: {
      slidesPerView: 3,
      spaceBetween: 12,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 16,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 16,
    },
    1280: {
      slidesPerView: 6,
      spaceBetween: 16,
    },
  },
});

// list-five-brand
var swiperListBrand = new Swiper(".swiper-list-five-brand", {
  pagination: { clickable: true, el: ".swiper-pagination" },
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  slidesPerView: 2,
  spaceBetween: 12,
  breakpoints: {
    640: {
      slidesPerView: 3,
      spaceBetween: 12,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 16,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 16,
    },
    1280: {
      slidesPerView: 5,
      spaceBetween: 16,
    },
  },
});
