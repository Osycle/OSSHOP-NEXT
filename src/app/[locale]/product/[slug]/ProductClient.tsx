'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode, Thumbs } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/types/product';
import { useCartStore } from '@/store/useCartStore'; // Подключаем хранилище корзины

interface Props {
  product: Product;
  related: Product[];
  // Удалили allProducts, так как мы больше не передаем всю базу на клиент
}

export default function ProductClient({ product, related }: Props) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  
  // Добавили опциональную цепочку (?.) на случай, если у товара нет вариаций
  const [activeColor, setActiveColor]   = useState(product.variation?.[0]?.color ?? '');
  const [activeSize, setActiveSize]     = useState('');
  const [quantity, setQuantity]         = useState(1); // Начинаем всегда с 1
  const [descTab, setDescTab]           = useState<'Description' | 'Specifications'>('Description');
  const [wishlist, setWishlist]         = useState(false);
  const [popupOpen, setPopupOpen]       = useState(false);
  const [popupIndex, setPopupIndex]     = useState(0);
  const mainSwiperRef                   = useRef<SwiperType | null>(null);

  // Функция добавления в корзину из Zustand
  const addItem = useCartStore((state) => state.addItem);

  const discount = product.originPrice > product.price
    ? Math.round((1 - product.price / product.originPrice) * 100)
    : 0;

  const galleryImages = product.images?.length > 0 ? product.images : ['/images/product/1000x1000.png'];

  const stars = (n: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <i key={i} className={`ph-fill ph-star text-sm ${i < n ? 'text-yellow' : 'text-line'}`} />
    ));

  // Обработчик клика "Add To Cart"
  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: galleryImages[0], // Берем первую картинку из галереи
      quantityCur: quantity // Передаем выбранное количество
    });
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-product">
        <div className="main bg-surface md:pt-[88px] pt-[70px] pb-[14px]">
          <div className="container flex items-center justify-between flex-wrap gap-3">
            <div className="left flex items-center gap-1">
              <Link href="/" className="caption1 text-secondary2 hover:underline">Homepage</Link>
              <i className="ph ph-caret-right text-xs text-secondary2" />
              <Link href="/shop" className="caption1 text-secondary2 hover:underline">Shop</Link>
              <i className="ph ph-caret-right text-xs text-secondary2" />
              <span className="caption1 capitalize">{product.name}</span>
            </div>
            <div className="right flex items-center gap-3">
              <div className="prev-btn flex items-center cursor-pointer text-secondary hover:text-black pr-3 border-r border-line">
                <i className="ph ph-caret-circle-left text-2xl text-black" />
                <span className="caption1 pl-1">Previous Product</span>
              </div>
              <div className="next-btn flex items-center cursor-pointer text-secondary hover:text-black">
                <span className="caption1 pr-1">Next Product</span>
                <i className="ph ph-caret-circle-right text-2xl text-black" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Detail */}
      <div className="product-detail default">
        <div className="featured-product underwear filter-product-img md:py-20 py-14">
          <div className="container flex justify-between gap-y-6 flex-wrap">

            {/* ── Left: Image Gallery ── */}
            <div className="list-img md:w-1/2 md:pr-[45px] w-full flex-shrink-0">
              <div className="sticky h-[400]">
                {/* mySwiper2 — main large image */}
                <Swiper
                  modules={[FreeMode, Thumbs]}
                  thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                  className="mySwiper2 rounded-2xl overflow-hidden"
                  onSwiper={swiper => { mainSwiperRef.current = swiper; }}
                  onClick={swiper => { setPopupIndex(swiper.activeIndex); setPopupOpen(true); }}
                >
                  {galleryImages.map((img, i) => (
                    <SwiperSlide key={i}>
                      {/* aspect-[3/4] */}
                      <div className="h-[400]">
                        <img
                          src={img}
                          alt={product.name}
                          className="w-full h-full object-cover duration-700 cursor-zoom-in"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* mySwiper — thumbnails strip */}
                <Swiper
                  modules={[FreeMode, Thumbs]}
                  onSwiper={setThumbsSwiper}
                  spaceBetween={12}
                  slidesPerView={4}
                  freeMode
                  watchSlidesProgress
                  className="mySwiper mt-3"
                >
                  {galleryImages.map((img, i) => (
                    <SwiperSlide key={i}>
                      <div className="aspect-square rounded-xl overflow-hidden cursor-pointer">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            {/* popup-img — fullscreen overlay */}
            {popupOpen && (
              <div className="popup-img open" onClick={() => setPopupOpen(false)}>
                <span
                  className="close-popup-btn absolute top-4 right-4 z-[2] cursor-pointer"
                  onClick={e => { e.stopPropagation(); setPopupOpen(false); }}
                >
                  <i className="ph ph-x text-3xl text-white" />
                </span>
                <div className="w-full h-full" onClick={e => e.stopPropagation()}>
                  <Swiper
                    modules={[Navigation]}
                    navigation
                    initialSlide={popupIndex}
                    className="w-full h-full"
                  >
                    {galleryImages.map((img, i) => (
                      <SwiperSlide key={i} className="flex items-center justify-center">
                        <img
                          src={img}
                          alt={product.name}
                          className="h-full w-auto mx-auto object-contain"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            )}

            {/* ── Right: Product Info ── */}
            <div className="product-item product-infor md:w-1/2 w-full lg:pl-[15px] md:pl-2">
              <div className="flex justify-between">
                <div>
                  <div className="product-category caption2 text-secondary font-semibold uppercase">
                    {product.category}
                  </div>
                  <div className="product-name heading4 mt-1">{product.name}</div>
                </div>
                <div
                  onClick={() => setWishlist(w => !w)}
                  className={`add-wishlist-btn w-10 h-10 flex-shrink-0 flex items-center justify-center border border-line cursor-pointer rounded-lg duration-300 hover:bg-black hover:text-white ${wishlist ? 'active' : ''}`}
                >
                  <i className="ph ph-heart text-xl" />
                </div>
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1 mt-3">
                <div className="rate flex">{stars(product.rate)}</div>
                <span className="caption1 text-secondary">(1,234 reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 flex-wrap mt-5 pb-6 border-b border-line">
                <div className="product-price heading5">${product.price.toFixed(2)}</div>
                {product.originPrice > product.price && (
                  <>
                    <div className="w-px h-4 bg-line" />
                    <div className="product-origin-price font-normal text-secondary2">
                      <del>${product.originPrice.toFixed(2)}</del>
                    </div>
                    <div className="product-sale caption2 font-semibold bg-green px-3 py-0.5 inline-block rounded-full">
                      -{discount}%
                    </div>
                  </>
                )}
                <div className="product-description text-secondary mt-3 w-full">
                  {product.description}
                </div>
              </div>

              {/* Actions */}
              <div className="list-action mt-6">
                {/* Colors - Added safe array check */}
                {(product.variation?.length ?? 0) > 0 && (
                  <div className="choose-color">
                    <div className="text-title">
                      Colors: <span className="text-title color">{activeColor}</span>
                    </div>
                    <div className="list-color flex items-center gap-2 flex-wrap mt-3">
                      {product.variation?.map(v => (
                        <div
                          key={v.color}
                          onClick={() => {
                            setActiveColor(v.color);
                            const idx = galleryImages.indexOf(v.image);
                            mainSwiperRef.current?.slideTo(idx >= 0 ? idx : 0);
                          }}
                          className={`color-item w-10 h-10 rounded-full border-2 cursor-pointer duration-300 relative ${
                            activeColor === v.color ? 'border-black' : 'border-transparent'
                          }`}
                          style={{ backgroundColor: v.colorCode }}
                        >
                          <div className="tag-action bg-black text-white caption2 capitalize px-1.5 py-0.5 rounded-sm">
                            {v.color}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sizes - Added safe array check */}
                {(product.sizes?.length ?? 0) > 0 && (
                  <div className="choose-size mt-5">
                    <div className="heading flex items-center justify-between">
                      <div className="text-title">
                        Size: <span className="text-title size">{activeSize}</span>
                      </div>
                      <div className="caption1 size-guide text-red underline cursor-pointer">Size Guide</div>
                    </div>
                    <div className="list-size flex items-center gap-2 flex-wrap mt-3">
                      {product.sizes?.map(s => (
                        <div
                          key={s}
                          onClick={() => setActiveSize(s)}
                          className={`size-item text-button w-[44px] h-[44px] flex items-center justify-center rounded-full border cursor-pointer duration-300 ${
                            activeSize === s ? 'border-black bg-black text-white' : 'border-line'
                          }`}
                        >
                          {s}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity + Add to Cart */}
                <div className="text-title mt-5">Quantity:</div>
                <div className="choose-quantity flex items-center max-xl:flex-wrap lg:justify-between gap-5 mt-3">
                  <div className="quantity-block md:p-3 max-md:py-1.5 max-md:px-3 flex items-center justify-between rounded-lg border border-line sm:w-[140px] w-[120px] flex-shrink-0">
                    <i
                      className={`ph-bold ph-minus cursor-pointer body1 ${quantity <= 1 ? 'disabled text-secondary2' : ''}`}
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    />
                    <div className="quantity body1 font-semibold">{quantity}</div>
                    <i
                      className="ph-bold ph-plus cursor-pointer body1"
                      onClick={() => setQuantity(q => q + 1)}
                    />
                  </div>
                  {/* Подключили обработчик handleAddToCart */}
                  <div 
                    onClick={handleAddToCart}
                    className="add-cart-btn button-main whitespace-nowrap w-full text-center bg-white text-black border border-black cursor-pointer hover:bg-black hover:text-white transition-colors"
                  >
                    Add To Cart
                  </div>
                </div>

                {/* Buy Now */}
                <div className="button-block mt-5">
                  <div className="button-main w-full text-center cursor-pointer">Buy It Now</div>
                </div>

                {/* Meta info */}
                <div className="more-infor mt-6">
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-1 cursor-pointer">
                      <i className="ph ph-arrow-clockwise body1" />
                      <div className="text-title">Delivery &amp; Return</div>
                    </div>
                    <div className="flex items-center gap-1 cursor-pointer">
                      <i className="ph ph-question body1" />
                      <div className="text-title">Ask A Question</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-3">
                    <i className="ph ph-timer body1" />
                    <div className="text-title">Estimated Delivery:</div>
                    <div className="text-secondary">14 January — 18 January</div>
                  </div>
                  <div className="flex items-center gap-1 mt-3">
                    <i className="ph ph-eye body1" />
                    <div className="text-title">38</div>
                    <div className="text-secondary">people viewing this product right now!</div>
                  </div>
                  <div className="flex items-center gap-1 mt-3">
                    <div className="text-title">SKU:</div>
                    <div className="text-secondary">{product.id}53412</div>
                  </div>
                  <div className="flex items-center gap-1 mt-3">
                    <div className="text-title">Categories:</div>
                    <div className="list-category text-secondary">{product.category}, {product.gender}</div>
                  </div>
                  <div className="flex items-center gap-1 mt-3">
                    <div className="text-title">Tag:</div>
                    <div className="list-tag text-secondary">{product.type}</div>
                  </div>
                </div>

                {/* Shipping benefits */}
                <div className="get-it mt-6 pb-8 border-b border-line">
                  <div className="heading5">Get it today</div>
                  <div className="item flex items-center gap-3 mt-4">
                    <div className="icon-delivery-truck text-4xl" />
                    <div>
                      <div className="text-title">Free shipping</div>
                      <div className="caption1 text-secondary mt-1">Free shipping on orders over $75.</div>
                    </div>
                  </div>
                  <div className="item flex items-center gap-3 mt-4">
                    <div className="icon-phone-call text-4xl" />
                    <div>
                      <div className="text-title">Support everyday</div>
                      <div className="caption1 text-secondary mt-1">Support from 8:30 AM to 10:00 PM everyday</div>
                    </div>
                  </div>
                  <div className="item flex items-center gap-3 mt-4">
                    <div className="icon-return text-4xl" />
                    <div>
                      <div className="text-title">100 Day Returns</div>
                      <div className="caption1 text-secondary mt-1">Not impressed? Get a refund. You have 100 days to break our hearts.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



      </div>

      {/* ── Related Products ── */}
      {related?.length > 0 && (
        <div className="tab-features-block filter-product-block md:py-20 py-10">
          <div className="container">
            <div className="heading3 text-center">Related Products</div>
            <div className="list-product hide-product-sold relative section-swiper-navigation style-outline style-small-border md:mt-10 mt-6">
              <div className="swiper-button-prev2 sm:left-10 left-6">
                <i className="ph-bold ph-caret-left text-xl" />
              </div>
              <Swiper
                modules={[Navigation]}
                navigation={{ nextEl: '.swiper-button-next2', prevEl: '.swiper-button-prev2' }}
                slidesPerView={2}
                spaceBetween={20}
                breakpoints={{
                  640:  { slidesPerView: 3, spaceBetween: 24 },
                  1024: { slidesPerView: 4, spaceBetween: 30 },
                  1280: { slidesPerView: 5, spaceBetween: 30 },
                }}
              >
                {related.map(p => (
                  <SwiperSlide key={p.id}>
                    <ProductCard product={p} />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="swiper-button-next2 sm:right-10 right-6">
                <i className="ph-bold ph-caret-right text-xl" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}