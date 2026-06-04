"use client";

import { Product } from "@/types/product";

import SliderHero from '@/components/home/SliderHero';
import WhatNewBlock from '@/components/home/WhatNewBlock';
import CollectionBlock from '@/components/home/CollectionBlock';
import TabFeaturesBlock from '@/components/home/TabFeaturesBlock';
import BannerBlock from '@/components/home/BannerBlock';
import BenefitBlock from '@/components/home/BenefitBlock';
import TestimonialBlock from '@/components/home/TestimonialBlock';
import InstagramBlock from '@/components/home/InstagramBlock';
import BrandBlock from '@/components/home/BrandBlock';


type Props = {
  products: Product[];
};



export default function IndexClient({ products }: Props) {
  return (
    <>  
      <SliderHero />
      <WhatNewBlock products={products} />
      <CollectionBlock />
      <TabFeaturesBlock products={products} />
      <BenefitBlock />
    </>
  )
}