import { create } from "zustand";
import { persist } from 'zustand/middleware';

const useCartStore = create(
    persist (
        (set,get) => ({
            cartItems:[],
            addToCart:(product, quantity=1) => {
                const {cartItems} = get();

                const existingItem = cartItems.find(item => item.id === product.id);

                if (existingItem) {
                    set ({
                        cartItems: cartItems.map(item =>
                            item.id === product.id 
                            ? {...item,quantity:item.quantity + quantity}
                            : item 
                        ),
                    });
                } else {
                    set({
                        cartItems: [...cartItems, {...product,quantity}],
                    });
                }
            },

            removeFromCart: (productId)=> {
                set ({
                    cartItems : get().cartItems.filter(item => item.id !== productId),
                });
            },

            updateQuantity: (productId,newQuantity) => {
                if (newQuantity <= 0) {
                    get().removeFromCart(productId);
                    return;
                }
                set({
                    cartItems: get().cartItems.map(item =>
                        item.id === productId ? {...item,quantity: newQuantity} : item
                    ),
                });
            },

            incrementQuantity:(productId) => {
                const item = get().cartItems.find(item => item.id ===productId);
                if(item) {
                    get().updateQuantity(productId,item.quantity + 1);
                }
            },


            decrementQuantity: (productId) => {
                const item = get().cartItems.find(item => item.id ===productId);
                if(item) {
                    get().updateQuantity(productId,item.quantity - 1);
                }
            },

            clearCart: () => set ({ cartItems:[] }),
            get totalItems() {
                return get().cartItems.reduce((sum,item) => sum + item.quantity, 0);
            },

            get totalPrice() {
                return get().cartItems.reduce((sum,item) => sum + item.price * item.quantity,0);
            },
            get totalDiscount() {
                    return get().cartItems.reduce((sum, item) => {
                        if (item.oldPrice && item.oldPrice > item.price) {
                        return sum + (item.oldPrice - item.price) * item.quantity;
                        }
                        return sum;
                    }, 0);
                    },
        }),
        {
            name: 'cart-storage',
        }
      )
    );



export default useCartStore