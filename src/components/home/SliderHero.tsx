'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const slides = [
  {
    subtitle: 'Sale! Up To 50% Off!',
    title: 'Summer Sale Collections',
    img: 'https://picsum.photos/seed/gallery_banner_1/1000/1000',
    imgAlt: 'bg1-1',
    imgClass:
      'sub-img absolute sm:w-1/2 w-3/5 2xl:-right-[60px] -right-[16px] bottom-0',
  },
  {
    subtitle: 'Sale! Up To 50% Off!',
    title: 'Fashion for Every Occasion',
    img: 'https://picsum.photos/seed/gallery_banner_2/1000/1000',
    imgAlt: 'bg1-2',
    imgClass:
      'sub-img absolute w-1/2 2xl:-right-[60px] right-0 sm:-bottom-[60px] bottom-0',
  },
  {
    subtitle: 'Sale! Up To 50% Off!',
    title: 'Stylish Looks for Any Season',
    img: 'https://picsum.photos/seed/gallery_banner_3/1000/1000',
    imgAlt: 'bg1-3',
    imgClass:
      'sub-img absolute sm:w-1/2 w-2/3 2xl:-right-[60px] -right-[36px] sm:bottom-0 -bottom-[30px]',
  },
];

export default function SliderHero() {
  return (
    // <div className="slider-block style-one bg-linear xl:h-[860px] lg:h-[800px] md:h-[580px] sm:h-[500px] h-[350px] max-[420px]:h-[320px] w-full">
    <div className="slider-block style-one bg-linear md:h-[650] sm:h-[500px] h-[350px] max-[420px]:h-[320px] w-full">
      <div className="slider-main h-full w-full">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 40000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          className="swiper-slider h-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="slider-item h-full w-full relative">
                <div className="container w-full h-full flex items-center relative">
                  <div className="text-content basis-1/2">
                    <div className="text-sub-display">{slide.subtitle}</div>
                    <div className="text-display md:mt-5 mt-2">{slide.title}</div>
                    <Link
                      href="/shop"
                      className="button-main md:mt-8 mt-3 inline-block"
                    >
                      Shop Now
                    </Link>
                  </div>
                  <div className={slide.imgClass}>
                    <Image
                      src={slide.img}
                      alt={slide.imgAlt}
                      width={580}
                      height={650}
                      className="w-full h-auto object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
