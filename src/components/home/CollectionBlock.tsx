'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { NavigationOptions } from 'swiper/types';
import 'swiper/css';
// import 'swiper/css/navigation';

const collections = [
  { name: 'swimwear', img: '/images/collection/swimwear.png' },
  { name: 'top', img: '/images/collection/top.png' },
  { name: 'sets', img: '/images/collection/sets.png' },
  { name: 'outerwear', img: '/images/collection/outerwear.png' },
  { name: 'underwear', img: '/images/collection/underwear.png' },
  { name: 't-shirt', img: '/images/collection/t-shirt.png' },
];

const SwiperButtons = () => {
  const swiper = useSwiper();
  return (
    <div className="swiper-nav-btns custom-swiper-btns">
      <button onClick={() => swiper.slidePrev()}>Prev</button>
      <button onClick={() => swiper.slideNext()}>Next</button>
    </div>
  );
};

export default function CollectionBlock() {
  return (
    <div className="collection-block md:pt-20 pt-10">
      <div className="container">
        <div className="heading3 text-center">Explore Collections</div>
      </div>
      <div className="list-collection relative section-swiper-navigation md:mt-10 mt-6 sm:px-5 px-4">
        <Swiper
          modules={[Navigation]}
          navigation
          slidesPerView={2}
          spaceBetween={16}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
            1280: { slidesPerView: 4, spaceBetween: 24 },
          }}
          className="swiper-collection h-full"
        >
          {/* <SwiperButtons /> */}
          {collections.map((col) => (
            <SwiperSlide key={col.name}>
              <Link
                href="/shop"
                className="collection-item block relative rounded-2xl overflow-hidden cursor-pointer"
              >
                <div className="bg-img">
                  <img
                    src={col.img}
                    alt={col.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="collection-name heading5 text-center sm:bottom-8 bottom-4 lg:w-[200px] md:w-[160px] w-[100px] md:py-3 py-1.5 bg-white rounded-xl duration-500">
                  {col.name}
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
