'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    title: 'Variety of Styles!',
    desc: '"Fantastic shop! Great selection, fair prices, and friendly staff. Highly recommended. The quality of the products is exceptional, and the prices are very reasonable!"',
    name: 'Lisa K.',
    date: 'August 13, 2024',
  },
  {
    title: 'Quality of Clothing!',
    desc: '"Anvouge\'s fashion collection is a game-changer! Their unique and trendy pieces have completely transformed my style. It\'s comfortable, stylish, and always on-trend."',
    name: 'Elizabeth A.',
    date: 'August 13, 2024',
  },
  {
    title: 'Customer Service!',
    desc: '"I absolutely love this shop! The products are high-quality and the customer service is excellent. I always leave with exactly what I need and a smile on my face."',
    name: 'Christin H.',
    date: 'August 13, 2024',
  },
  {
    title: 'Quality of Clothing!',
    desc: '"I can\'t get enough of Anvouge\'s high-quality clothing. It\'s comfortable, stylish, and always on-trend. The products are high-quality and the customer service is excellent."',
    name: 'Emily G.',
    date: 'August 13, 2024',
  },
  {
    title: 'Customer Service!',
    desc: '"I love this shop! The products are always top-quality, and the staff is incredibly friendly and helpful. They go out of their way to make sure that I\'m satisfied my purchase."',
    name: 'Carolina C.',
    date: 'August 13, 2024',
  },
];

export default function TestimonialBlock() {
  return (
    <div className="testimonial-block md:pt-20 md:pb-16 pt-10 pb-8 md:mt-20 mt-10 bg-surface">
      <div className="container">
        <div className="heading3 text-center">What People Are Saying</div>
        <div className="list-testimonial pagination-mt40 md:mt-10 mt-6">
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            slidesPerView={1}
            spaceBetween={24}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
            }}
            className="swiper-list-testimonial h-full"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <div className="testimonial-item style-one h-full">
                  <div className="testimonial-main bg-white p-8 rounded-2xl h-full">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <i key={s} className="ph-fill ph-star text-yellow" />
                      ))}
                    </div>
                    <div className="heading6 title mt-4">{t.title}</div>
                    <div className="desc mt-2">{t.desc}</div>
                    <div className="text-button name mt-4">{t.name}</div>
                    <div className="caption2 date text-secondary2 mt-1">{t.date}</div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
