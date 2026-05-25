'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode, Thumbs } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/types/product';

interface Props {
  product: Product;
  related: Product[];
  allProducts: Product[];
}

export default function ProductClient({ product, related, allProducts }: Props) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeColor, setActiveColor]   = useState(product.variation[0]?.color ?? '');
  const [activeSize, setActiveSize]     = useState('');
  const [quantity, setQuantity]         = useState(product.quantityPurchase ?? 1);
  const [descTab, setDescTab]           = useState<'Description' | 'Specifications'>('Description');
  const [wishlist, setWishlist]         = useState(false);
  const [popupOpen, setPopupOpen]       = useState(false);
  const [popupIndex, setPopupIndex]     = useState(0);
  const mainSwiperRef                   = useRef<SwiperType | null>(null);

  const discount = product.originPrice > product.price
    ? Math.round((1 - product.price / product.originPrice) * 100)
    : 0;

  const galleryImages = product.images.length > 0 ? product.images : ['/images/product/1000x1000.png'];

  const stars = (n: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <i key={i} className={`ph-fill ph-star text-sm ${i < n ? 'text-yellow' : 'text-line'}`} />
    ));

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
              <div className="sticky">
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
                      <div className="aspect-[3/4]">
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
                {/* Colors */}
                {product.variation.length > 0 && (
                  <div className="choose-color">
                    <div className="text-title">
                      Colors: <span className="text-title color">{activeColor}</span>
                    </div>
                    <div className="list-color flex items-center gap-2 flex-wrap mt-3">
                      {product.variation.map(v => (
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

                {/* Sizes */}
                {product.sizes.length > 0 && (
                  <div className="choose-size mt-5">
                    <div className="heading flex items-center justify-between">
                      <div className="text-title">
                        Size: <span className="text-title size">{activeSize}</span>
                      </div>
                      <div className="caption1 size-guide text-red underline cursor-pointer">Size Guide</div>
                    </div>
                    <div className="list-size flex items-center gap-2 flex-wrap mt-3">
                      {product.sizes.map(s => (
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
                  <div className="add-cart-btn button-main whitespace-nowrap w-full text-center bg-white text-black border border-black cursor-pointer">
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

                {/* You'll love this too */}
                {allProducts.filter(p => p.type === product.type && p.id !== product.id).length > 0 && (
                  <div className="list-product hide-product-sold menu-main mt-6">
                    <div className="heading5 pb-4">You&apos;ll love this too</div>
                    <div className="list-collection">
                      <Swiper
                        modules={[FreeMode]}
                        slidesPerView={2}
                        spaceBetween={16}
                        freeMode
                        breakpoints={{
                          640: { slidesPerView: 3 },
                        }}
                      >
                        {allProducts
                          .filter(p => p.type === product.type && p.id !== product.id)
                          .slice(0, 6)
                          .map(p => (
                            <SwiperSlide key={p.id}>
                              <ProductCard product={p} showSoldBar />
                            </SwiperSlide>
                          ))}
                      </Swiper>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Description / Specifications Tabs ── */}
        <div className="desc-tab md:pb-20 pb-10">
          <div className="container">
            <div className="flex items-center justify-center w-full">
              <div className="menu-tab flex items-center md:gap-[60px] gap-8">
                {(['Description', 'Specifications'] as const).map(tab => (
                  <div
                    key={tab}
                    onClick={() => setDescTab(tab)}
                    className={`tab-item heading5 has-line-before text-secondary2 hover:text-black duration-300 cursor-pointer ${descTab === tab ? 'active' : ''}`}
                  >
                    {tab}
                  </div>
                ))}
              </div>
            </div>

            <div className="desc-block mt-8">
              {descTab === 'Description' && (
                <div className="desc-item description open">
                  <div className="grid md:grid-cols-2 gap-8 gap-y-5">
                    <div className="left">
                      <div className="heading6">Description</div>
                      <div className="text-secondary mt-2">{product.description}</div>
                    </div>
                    <div className="right">
                      <div className="heading6">About This Product</div>
                      <div className="list-feature">
                        {[
                          'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                          'Nulla luctus libero quis mauris vestibulum dapibus.',
                          'Maecenas ullamcorper erat mi, vel consequat enim suscipit at.',
                          'Quisque consectetur nibh ac urna molestie scelerisque.',
                          'Mauris in nisl scelerisque massa consectetur pretium.',
                        ].map((feat, i) => (
                          <div key={i} className="item flex gap-1 text-secondary mt-1">
                            <i className="ph ph-dot text-2xl" />
                            <p>{feat}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="grid lg:grid-cols-4 grid-cols-2 gap-[30px] md:mt-10 mt-6">
                    {[
                      { icon: 'icon-delivery-truck', title: 'Shipping Faster', text: 'Use on walls, furniture, doors and many more surfaces.' },
                      { icon: 'icon-cotton',         title: 'Cotton Material', text: 'Use on walls, furniture, doors and many more surfaces.' },
                      { icon: 'icon-guarantee',      title: 'High Quality',    text: 'Use on walls, furniture, doors and many more surfaces.' },
                      { icon: 'icon-leaves-compatible', title: 'Highly Compatible', text: 'Use on walls, furniture, doors and many more surfaces.' },
                    ].map(({ icon, title, text }) => (
                      <div key={title} className="item">
                        <div className={`${icon} text-4xl`} />
                        <div className="heading6 mt-4">{title}</div>
                        <div className="text-secondary mt-2">{text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {descTab === 'Specifications' && (
                <div className="desc-item specifications open flex items-center justify-center">
                  <div className="lg:w-1/2 sm:w-3/4 w-full">
                    {[
                      { label: 'Rating',      value: <div className="flex items-center gap-1"><div className="rate flex">{stars(product.rate)}</div><p>({product.rate}.0)</p></div> },
                      { label: 'Outer Shell', value: '100% polyester' },
                      { label: 'Lining',      value: '100% polyurethane' },
                      { label: 'Size',        value: product.sizes.join(', ') || 'One size' },
                      { label: 'Colors',      value: product.variation.map(v => v.color).join(', ') || '—' },
                      { label: 'Brand',       value: product.brand },
                      { label: 'Category',    value: `${product.category}, ${product.type}` },
                    ].map(({ label, value }, i) => (
                      <div key={label} className={`item flex items-center gap-8 py-3 px-10 ${i % 2 === 0 ? 'bg-surface' : ''}`}>
                        <div className="text-title sm:w-1/4 w-1/3">{label}</div>
                        <div>{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Reviews ── */}
        <div className="review-block md:py-20 py-10 bg-surface">
          <div className="container">
            <div className="heading flex items-center justify-between flex-wrap gap-4">
              <div className="heading4">Customer Review</div>
              <a href="#form-review" className="button-main bg-white text-black border border-black">
                Write Reviews
              </a>
            </div>

            <div className="top-overview flex justify-between py-6 max-md:flex-col gap-y-6">
              <div className="rating lg:w-1/4 md:w-[30%] lg:pr-[75px] md:pr-[35px]">
                <div className="heading flex items-center justify-center flex-wrap gap-3 gap-y-4">
                  <div className="text-display">4.6</div>
                  <div className="flex flex-col items-center">
                    <div className="rate flex">{stars(5)}</div>
                    <div className="text-secondary text-center mt-1">(1,968 Ratings)</div>
                  </div>
                </div>
                <div className="list-rating mt-3">
                  {[
                    { star: 5, pct: 50 },
                    { star: 4, pct: 20 },
                    { star: 3, pct: 20 },
                    { star: 2, pct: 5 },
                    { star: 1, pct: 5 },
                  ].map(({ star, pct }) => (
                    <div key={star} className="item flex items-center justify-between gap-1.5 mt-1 first:mt-0">
                      <div className="flex items-center gap-1">
                        <div className="caption1">{star}</div>
                        <i className="ph-fill ph-star text-sm" />
                      </div>
                      <div className="progress bg-line relative w-3/4 h-2">
                        <div className="progress-percent absolute bg-yellow h-full left-0 top-0" style={{ width: `${pct}%` }} />
                      </div>
                      <div className="caption1">{pct}%</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:w-3/4 md:w-[70%] w-full lg:pl-[30px]">
                <div className="sorting flex items-center flex-wrap md:gap-5 gap-3 gap-y-3 mt-6">
                  <div className="text-button">Sort by</div>
                  {['Newest', '5 Star', '4 Star', '3 Star', '2 Star', '1 Star'].map(s => (
                    <div key={s} className="item bg-white px-4 py-1 border border-line rounded-full cursor-pointer hover:border-black duration-300">{s}</div>
                  ))}
                </div>
              </div>
            </div>

            <div className="list-review">
              {[
                { name: 'Tony Nguyen', title: 'Unbeatable Style and Quality', body: "I can't get enough of the fashion pieces from this brand. They have a great selection for every occasion and the prices are reasonable." },
                { name: 'Sarah Miller', title: 'Exceptional Fashion: Perfect Blend of Style and Durability', body: 'The fashion brand\'s online shopping experience is seamless. The website is user-friendly, the product images are clear, and the checkout process is quick.' },
                { name: 'James Park',  title: 'Elevate Your Wardrobe: Stunning Dresses That Make a Statement', body: 'I love how sustainable and ethically conscious this fashion brand is. They prioritize eco-friendly materials and fair trade practices.' },
              ].map(({ name, title, body }) => (
                <div key={name} className="item flex max-lg:flex-col gap-y-4 w-full py-6 border-t border-line">
                  <div className="left lg:w-1/4 w-full lg:pr-[15px]">
                    <div className="user mt-3">
                      <div className="text-title">{name}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="text-secondary2">1 day ago</div>
                        <div className="text-secondary2">—</div>
                        <div className="text-secondary2">Yellow / XL</div>
                      </div>
                    </div>
                  </div>
                  <div className="right lg:w-3/4 w-full lg:pl-[15px]">
                    <div className="rate flex">{stars(5)}</div>
                    <div className="heading5 mt-3">{title}</div>
                    <div className="body1 mt-3">{body}</div>
                    <div className="action mt-3">
                      <div className="flex items-center gap-4">
                        <div className="like-btn flex items-center gap-1 cursor-pointer">
                          <i className="ph ph-hands-clapping text-lg" />
                          <div className="text-button">20</div>
                        </div>
                        <a href="#form-review" className="reply-btn text-button text-secondary cursor-pointer hover:text-black">Reply</a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="text-button more-review-btn text-center mt-2 underline cursor-pointer">
                View More Comments
              </div>
            </div>

            {/* Review form */}
            <div id="form-review" className="form-review pt-6">
              <div className="heading4">Leave A Comment</div>
              <form className="grid sm:grid-cols-2 gap-4 gap-y-5 mt-6" onSubmit={e => e.preventDefault()}>
                <div className="name">
                  <input className="border-line px-4 pt-3 pb-3 w-full rounded-lg" type="text" placeholder="Your Name *" required />
                </div>
                <div className="mail">
                  <input className="border-line px-4 pt-3 pb-3 w-full rounded-lg" type="email" placeholder="Your Email *" required />
                </div>
                <div className="col-span-full message">
                  <textarea className="border border-line px-4 py-3 w-full rounded-lg" rows={3} placeholder="Your message *" required />
                </div>
                <div className="col-span-full flex items-start -mt-2 gap-2">
                  <input type="checkbox" id="saveAccount" className="mt-1.5" />
                  <label htmlFor="saveAccount">Save my name, email, and website in this browser for the next time I comment.</label>
                </div>
                <div className="col-span-full sm:pt-3">
                  <button type="submit" className="button-main bg-white text-black border border-black">Submit Reviews</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* ── Related Products ── */}
      {related.length > 0 && (
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
