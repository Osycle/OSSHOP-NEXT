"use client";
import { X, Trash } from "@phosphor-icons/react";
import { useCartStore } from "@/store/useCartStore";
import { useEffect, useState } from "react";

export default function Cart() {
  // Вытаскиваем всё необходимое из Zustand
  const { isOpen, closeCart, items, removeItem } = useCartStore();
  
  // Костыль для Next.js (борьба с ошибкой гидратации из-за localStorage)
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  // Считаем итоговую сумму
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isMounted) return null; // Ждем загрузки клиента, чтобы localStorage прочитался корректно

  return (
    <div 
      className={`modal-cart-block fixed inset-0 z-[100] bg-black/50 transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      onClick={closeCart}
    >
      <div 
        className={`modal-cart-main absolute top-0 right-0 h-full w-[400px] max-w-full bg-white transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Шапка корзины */}
        <div className="cart-header p-6 flex items-center justify-between border-b border-line">
          <h5 className="heading5">Shopping Cart</h5>
          <button className="close-btn cursor-pointer hover:text-red-500 transition-colors" onClick={closeCart}>
            <X size={24} />
          </button>
        </div>

        {/* Список товаров */}
        <div className="list-product p-6 overflow-y-auto max-h-[calc(100vh-250px)]">
          {items.length === 0 ? (
            <p className="text-secondary text-center mt-10">Your cart is empty.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="cart-item flex gap-4 mb-6 relative">
                <div className="item-img w-20 h-20 bg-surface rounded-lg overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="item-info pr-6">
                  <p className="name font-medium">{item.name}</p>
                  <p className="price text-secondary mt-1">${item.price.toFixed(2)} x {item.quantity}</p>
                </div>
                {/* Кнопка удаления товара */}
                <button 
                  className="absolute right-0 top-0 text-secondary hover:text-red-500" 
                  onClick={() => removeItem(item.id)}
                >
                  <Trash size={20} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Низ корзины (Сумма и кнопки) */}
        <div className="cart-footer p-6 border-t border-line absolute bottom-0 w-full bg-white">
          <div className="flex justify-between mb-4">
            <span className="font-medium heading6">Total:</span>
            <span className="font-bold heading6">${totalPrice.toFixed(2)}</span>
          </div>
          <button className="button-main w-full text-center mb-3 bg-black text-white hover:bg-black/80 transition-colors">
            Checkout
          </button>
          <button className="continue text-button-uppercase w-full text-center font-medium hover:text-black/70" onClick={closeCart}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}