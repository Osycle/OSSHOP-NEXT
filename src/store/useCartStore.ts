import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Описываем, как выглядит товар в корзине
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

// Описываем все состояния и функции хранилища
interface CartState {
  isOpen: boolean;
  items: CartItem[];
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

// Создаем само хранилище
export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      isOpen: false,
      items: [], // Список товаров

      // Функции управления модалкой
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      // Функция добавления товара (если такой уже есть - увеличиваем количество)
      addItem: (newItem) => set((state) => {
        const existingItem = state.items.find((item) => item.id === newItem.id);
        if (existingItem) {
          return {
            items: state.items.map((item) =>
              item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
          };
        }
        return { items: [...state.items, { ...newItem, quantity: 1 }] };
      }),

      // Функция удаления товара
      removeItem: (id) => set((state) => ({
        items: state.items.filter((item) => item.id !== id),
      })),

      // Полная очистка
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'osshop-cart', // Под этим именем корзина сохранится в localStorage браузера
    }
  )
);