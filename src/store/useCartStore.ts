import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Описываем товар в корзине
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantityCur: number; // Текущее количество В КОРЗИНЕ
}

interface CartState {
  isOpen: boolean;
  items: CartItem[];
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  decreaseQuantity: (id: string) => void; // Функция убавления количества
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      isOpen: false,
      items: [],

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      // ДОБАВЛЕНИЕ ИЛИ УВЕЛИЧЕНИЕ ТОВАРА
      addItem: (newItem) => set((state) => {
        // Проверяем, есть ли уже такой товар в корзине
        const existingItem = state.items.find((item) => item.id === newItem.id);
        
        if (existingItem) {
          // Если есть — просто прибавляем переданное quantityCur к текущему
          return {
            items: state.items.map((item) =>
              item.id === newItem.id 
                ? { ...item, quantityCur: item.quantityCur + newItem.quantityCur } 
                : item
            ),
          };
        }
        
        // Если нет — добавляем как новый товар
        return { items: [...state.items, newItem] };
      }),

      // УМЕНЬШЕНИЕ КОЛИЧЕСТВА (КЛИК НА МИНУС)
      decreaseQuantity: (id) => set((state) => {
        const existingItem = state.items.find((item) => item.id === id);
        
        // Если количество равно 1, то при убавлении товар должен удалиться из корзины
        if (existingItem?.quantityCur === 1) {
          return {
            items: state.items.filter((item) => item.id !== id),
          };
        }
        
        // В противном случае просто убавляем quantityCur на 1
        return {
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantityCur: item.quantityCur - 1 } : item
          ),
        };
      }),

      // ПОЛНОЕ УДАЛЕНИЕ ТОВАРА (КЛИК НА КРЕСТИК/КОРЗИНКУ)
      removeItem: (id) => set((state) => ({
        items: state.items.filter((item) => item.id !== id),
      })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'osshop-cart',
    }
  )
);