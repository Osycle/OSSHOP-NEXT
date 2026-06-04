'use client';
import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/types/product';

type Props = {
  products: Product[];
};

const TABS = ['top', 't-shirt', 'dress', 'sets', 'shirt'] as const;

export default function WhatNewBlock({ products }: Props) {
  const [activeTab, setActiveTab] = useState<string>('t-shirt');

  console.log(products, 'products.data')
  const filtered = products.filter((p) => p.type === activeTab).slice(0, 4);

  return (
    <div className="what-new-block filter-product-block md:pt-20 pt-10">
      <div className="container">
        <div className="heading flex flex-col items-center text-center">
          <div className="heading3">Whats new</div>
          <div className="menu-tab bg-surface rounded-2xl mt-6">
            <div className="menu flex items-center gap-2 p-1">
              {TABS.map((tab) => (
                <div
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`tab-item relative text-button-uppercase py-2 px-5 cursor-pointer duration-300 rounded-full transition-all ${
                    activeTab === tab
                      ? 'text-black bg-white shadow-md'
                      : 'text-secondary hover:text-black'
                  }`}
                >
                  {tab}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="list-product four-product hide-product-sold grid xl:grid-cols-4 sm:grid-cols-3 grid-cols-2 md:gap-[30px] gap-4 md:mt-10 mt-6">
          {filtered.length > 0 ? (
            filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="col-span-4 text-center text-secondary py-10">
              No products found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
