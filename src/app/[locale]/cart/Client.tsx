"use client"
import { useState, useEffect } from 'react';
import { useCartStore } from "@/store/useCartStore";
export default function Client() {

  const { items, removeItem, addItem, decreaseQuantity } = useCartStore()


  return (
    <div className="cart-block md:py-20 py-10">
      <div className="container">
        <div className="content-main flex justify-between max-xl:flex-col gap-y-8">
          <div className="xl:w-2/3 xl:pr-3 w-full">
            <div className="list-product w-full sm:mt-7 mt-5">
              <div className="w-full">
                <div className="heading bg-surface bora-4 pt-4 pb-4">
                  <div className="flex">
                    <div className="w-1/2">
                      <div className="text-button text-center">Products</div>
                    </div>
                    <div className="w-1/12">
                      <div className="text-button text-center">Price</div>
                    </div>
                    <div className="w-1/6">
                      <div className="text-button text-center">Quantity</div>
                    </div>
                    <div className="w-1/6">
                      <div className="text-button text-center">Total Price</div>
                    </div>
                  </div>
                </div>
                <div className="list-product-main w-full mt-3">
                  {items.map((item, i)=>(
                  <div key={i} className="item flex md:mt-7 md:pb-7 mt-5 pb-5 border-b border-line w-full">
                    <div className="w-1/2">
                      <div className="flex items-center gap-6">
                        <div className="bg-img md:w-[100px] w-20 aspect-[3/4]">
                          <img src="/images/product/1000x1000.png" alt="img" className="w-full h-full object-cover rounded-lg" />
                        </div>
                        <div>
                          <div className="text-title">{item.name}</div>
                          <div className="list-select mt-3"></div>
                        </div>
                      </div>
                    </div>
                    <div className="w-1/12 price flex items-center justify-center">
                      <div className="text-title text-center">${item.price}</div>
                    </div>
                    <div className="w-1/6 flex items-center justify-center">
                      <div className="quantity-block bg-surface md:p-3 p-2 flex items-center justify-between rounded-lg border border-line md:w-[100px] flex-shrink-0 w-20">
                        <i className="ph-bold ph-minus cursor-pointer text-base max-md:text-sm"
                          onClick={() => decreaseQuantity(item.id)}
                        ></i>
                        <div className="text-button quantity">{item.quantityCur}</div>
                        <i className="ph-bold ph-plus cursor-pointer text-base max-md:text-sm"
                          onClick={() => addItem({ ...item, quantityCur: 1 })}
                        ></i>
                      </div>
                    </div>
                    <div className="w-1/6 flex total-price items-center justify-center">
                      <div className="text-title text-center">${item.quantityCur * item.price}</div>
                    </div>
                    <div className="w-1/12 flex items-center justify-center">
                      <i 
                        className="remove-btn ph ph-x-circle text-xl max-md:text-base text-red cursor-pointer hover:text-black duration-300"
                        onClick={() => removeItem(item.id)}
                      ></i>
                    </div>
                  </div>
                  ))}


                </div>
              </div>
            </div>
          </div>
          <div className="xl:w-1/3 xl:pl-12 w-full">
            <div className="checkout-block bg-surface p-6 rounded-2xl">
              <div className="heading5">Order Summary</div>
              <div className="total-block py-5 flex justify-between border-b border-line">
                <div className="text-title">Subtotal</div>
                <div className="text-title">$<span className="total-product">136</span><span>.00</span></div>
              </div>
              <div className="discount-block py-5 flex justify-between border-b border-line">
                <div className="text-title">Discounts</div>
                <div className="text-title"><span>-$</span><span className="discount">0</span><span>.00</span></div>
              </div>
              <div className="ship-block py-5 flex justify-between border-b border-line">
                <div className="text-title">Shipping</div>
                <div className="choose-type flex gap-12">
                  <div className="left">
                    <div className="type">
                      <input id="shipping" type="radio" name="ship" />
                      <label className="pl-1" htmlFor="shipping">Free Shipping:</label>
                    </div>
                    <div className="type mt-1">
                      <input id="local" type="radio" name="ship" value="{30}" />
                      <label className="text-on-surface-variant1 pl-1" htmlFor="local">Local:</label>
                    </div>
                    <div className="type mt-1">
                      <input id="flat" type="radio" name="ship" value="{40}" />
                      <label className="text-on-surface-variant1 pl-1" htmlFor="flat">Flat Rate:</label>
                    </div>
                  </div>
                  <div className="right">
                    <div className="ship">$0.00</div>
                    <div className="local text-on-surface-variant1 mt-1">$30.00</div>
                    <div className="flat text-on-surface-variant1 mt-1">$40.00</div>
                  </div>
                </div>
              </div>
              <div className="total-cart-block pt-4 pb-4 flex justify-between">
                <div className="heading5">Total</div>
                <div className=""><span className="heading5">$</span><span className="total-cart heading5">116</span><span className="heading5">.00</span></div>
              </div>
              <div className="block-button flex flex-col items-center gap-y-4 mt-5">
                <a href="checkout.html" className="checkout-btn button-main text-center w-full"> Process To Checkout</a>
                <a className="text-button hover-underline" href="/shop-breadcrumb1.html">Continue shopping </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}