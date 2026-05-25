'use client';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper'; // Импортируем тип инстанса
import 'swiper/css';
import 'swiper/css/navigation';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/types/product';
import { CaretLeft, CaretRight } from '@phosphor-icons/react'; // Подключаем иконки для красоты

type Props = {
  products: Product[];
};

const TABS = [
  { label: 'best sellers', filter: (p: Product) => true },
  { label: 'on sale', filter: (p: Product) => p.sale },
  { label: 'new arrivals', filter: (p: Product) => p.new },
] as const;

export default function TabFeaturesBlock({ products }: Props) {
  const [activeTab, setActiveTab] = useState(0);
  
  // Создаем стейт для хранения инстанса слайдера
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  const filtered = products.filter(TABS[activeTab].filter).slice(0, 12);

  return (
    <div className="tab-features-block filter-product-block md:pt-20 pt-10">
      <div className="container mx-auto px-4">
        
        {/* Шапка с табами */}
        <div className="heading flex flex-col items-center text-center">
          <div className="menu-tab bg-surface rounded-2xl">
            <div className="menu flex items-center gap-2 p-1">
              {TABS.map((tab, i) => (
                <div
                  key={tab.label}
                  onClick={() => setActiveTab(i)}
                  className={`tab-item relative heading5 py-2 px-5 cursor-pointer duration-500 rounded-full transition-all capitalize ${
                    activeTab === i
                      ? 'text-black bg-white shadow-md'
                      : 'text-secondary hover:text-black'
                  }`}
                >
                  {tab.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Контейнер со слайдером и кнопками */}
        <div className="list-product six-product hide-product-sold relative section-swiper-navigation style-outline style-small-border md:mt-10 mt-6 group">
          
          <Swiper
            modules={[Navigation]}
            // Ловим инстанс при инициализации и сохраняем его в стейт
            onSwiper={(swiper) => setSwiperInstance(swiper)}
            slidesPerView={2}
            spaceBetween={16}
            breakpoints={{
              640: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 4, spaceBetween: 24 },
              1280: { slidesPerView: 4, spaceBetween: 30 },
            }}
            className="swiper-list-product h-full"
          >
            {filtered.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-nav-btns custom-swiper-btns">
            <button 
              onClick={() => swiperInstance?.slidePrev()} 
              className="bg-white rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 pointer-events-auto"
            >
              <CaretLeft size={20} weight="bold" />
            </button>
            <button 
              onClick={() => swiperInstance?.slideNext()} 
              className="bg-white rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 pointer-events-auto"
            >
              <CaretRight size={20} weight="bold" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}