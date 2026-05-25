'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const brands = Array.from({ length: 7 }, (_, i) => `/images/brand/${i + 1}.png`);

export default function BrandBlock() {
  return (
    <div className="brand-block md:py-[60px] py-[32px]">
      <div className="container">
        <div className="list-brand">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop
            slidesPerView={2}
            spaceBetween={12}
            breakpoints={{
              640: { slidesPerView: 3, spaceBetween: 12 },
              768: { slidesPerView: 4, spaceBetween: 16 },
              1024: { slidesPerView: 5, spaceBetween: 16 },
              1280: { slidesPerView: 6, spaceBetween: 16 },
            }}
            className="swiper-list-brand"
          >
            {brands.map((src, i) => (
              <SwiperSlide key={i}>
                <div className="brand-item relative flex items-center justify-center h-[36px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`brand-${i + 1}`}
                    className="h-full w-auto duration-500 object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
