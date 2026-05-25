'use client';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types/product';

interface Props {
  product: Product;
  showSoldBar?: boolean;
}

export default function ProductCard({ product, showSoldBar = false }: Props) {
  const discount =
    product.originPrice > product.price
      ? Math.round((1 - product.price / product.originPrice) * 100)
      : 0;

  return (
    <div className="product-item grid-type">
      <div className="product-main cursor-pointer block">
        <div className="product-thumb bg-white relative overflow-hidden rounded-2xl">
          {product.new && (
            <div className="product-tag text-button-uppercase bg-green px-3 py-0.5 inline-block rounded-full absolute top-3 left-3 z-[1]">
              New
            </div>
          )}
          {product.sale && !product.new && (
            <div className="product-tag text-button-uppercase bg-red text-white px-3 py-0.5 inline-block rounded-full absolute top-3 left-3 z-[1]">
              Sale
            </div>
          )}
          <div className="list-action-right absolute top-3 right-3 max-lg:hidden">
            <div className="add-wishlist-btn w-[32px] h-[32px] flex items-center justify-center rounded-full bg-white duration-300 relative">
              <div className="tag-action bg-black text-white caption2 px-1.5 py-0.5 rounded-sm">
                Add To Wishlist
              </div>
              <i className="ph ph-heart text-lg"></i>
            </div>
            <div className="compare-btn w-[32px] h-[32px] flex items-center justify-center rounded-full bg-white duration-300 relative mt-2">
              <div className="tag-action bg-black text-white caption2 px-1.5 py-0.5 rounded-sm">
                Compare Product
              </div>
              <i className="ph ph-arrow-counter-clockwise text-lg compare-icon"></i>
            </div>
          </div>
          <div className="product-img w-full aspect-[3/4] relative overflow-hidden">
            {(product.thumbImage?.length > 0) ? 
              product.thumbImage.map((img, i)=>(
                <img
                  key={i}
                  src={img}
                  className="w-full h-full object-cover duration-700"
                  alt={product.name}
                />
              ))
              :
              <Image
                className="w-full h-full object-cover duration-700"
                src="/images/product/1000x1000.png"
                alt={product.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            }
  
          </div>
          <div className="list-action grid grid-cols-2 gap-3 px-5 absolute w-full bottom-5 max-lg:hidden">
            <div className="quick-view-btn w-full text-button-uppercase py-2 text-center rounded-full duration-300 bg-white hover:bg-black hover:text-white">
              Quick View
            </div>
            <div className="add-cart-btn w-full text-button-uppercase py-2 text-center rounded-full duration-500 bg-white hover:bg-black hover:text-white">
              Add To Cart
            </div>
          </div>
        </div>
        <div className="product-infor mt-4 lg:mb-7">
          {showSoldBar && (
            <div className="product-sold sm:pb-4 pb-2">
              <div className="progress bg-line h-1.5 w-full rounded-full overflow-hidden relative">
                <div
                  className="progress-sold bg-red absolute left-0 top-0 h-full"
                  style={{
                    width: `${Math.min(
                      100,
                      (product.sold / product.quantity) * 100
                    )}%`,
                  }}
                />
              </div>
              <div className="flex items-center justify-between gap-3 gap-y-1 flex-wrap mt-2">
                <div className="text-button-uppercase">
                  <span className="text-secondary2 max-sm:text-xs">Sold: </span>
                  <span className="max-sm:text-xs">{product.sold}</span>
                </div>
                <div className="text-button-uppercase">
                  <span className="text-secondary2 max-sm:text-xs">Available: </span>
                  <span className="max-sm:text-xs">
                    {product.quantity - product.sold}
                  </span>
                </div>
              </div>
            </div>
          )}
          <Link
            href={`/product/${product.slug}`}
            className="product-name text-title duration-300 block"
          >
            {product.name}
          </Link>
          {product.variation.length > 0 && (
            <div className="list-color py-2 max-md:hidden flex items-center gap-3 flex-wrap duration-500">
              {product.variation.slice(0, 4).map((v, i) => (
                <div
                  key={i}
                  className="color-item w-8 h-8 rounded-full duration-300 relative"
                  style={{ backgroundColor: v.colorCode }}
                >
                  <div className="tag-action bg-black text-white caption2 capitalize px-1.5 py-0.5 rounded-sm">
                    {v.color}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="product-price-block flex items-center gap-2 flex-wrap mt-1 duration-300 relative z-[1]">
            <div className="product-price text-title">${product.price.toFixed(2)}</div>
            {product.originPrice > product.price && (
              <>
                <div className="product-origin-price caption1 text-secondary2">
                  <del>${product.originPrice.toFixed(2)}</del>
                </div>
                <div className="product-sale caption1 font-medium bg-green px-3 py-0.5 inline-block rounded-full">
                  -{discount}%
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
