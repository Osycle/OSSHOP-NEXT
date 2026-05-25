'use client';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const images = Array.from({ length: 12 }, (_, i) => `/images/instagram/${i}.png`);

export default function InstagramBlock() {
  return (
    <div className="instagram-block md:pt-20 pt-10">
      <div className="container">
        <div className="heading">
          <div className="heading3 text-center">Anvogue On Instagram</div>
          <div className="text-center mt-3">#Anvougetheme</div>
        </div>
        <div className="list-instagram md:mt-10 mt-6">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            slidesPerView={2}
            spaceBetween={12}
            loop
            breakpoints={{
              480: { slidesPerView: 1, spaceBetween: 12 },
              768: { slidesPerView: 2, spaceBetween: 16 },
              1024: { slidesPerView: 3, spaceBetween: 16 },
              1280: { slidesPerView: 5, spaceBetween: 16 },
            }}
            className="swiper-list-instagram"
          >
            {images.map((src, i) => (
              <SwiperSlide key={i}>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="item relative block rounded-[32px] overflow-hidden"
                >
                  <Image
                    src={src}
                    alt={`instagram-${i}`}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover duration-500"
                  />
                  <div className="icon w-12 h-12 bg-white hover:bg-black duration-500 flex items-center justify-center rounded-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1]">
                    <div className="icon-instagram text-2xl text-black" />
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
