'use client';

import { createContext, useContext, useReducer, useEffect, useState } from 'react';

const CartContext = createContext();

function cartReducer(state, action) {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const existing = state.find((item) => item.id === action.payload.id);
            if (existing) {
                return state.map((item) =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...state, { ...action.payload, quantity: 1 }];
        }
        case 'REMOVE_FROM_CART':
            return state.filter((item) => item.id !== action.payload);
        case 'INCREMENT':
            return state.map((item) =>
                item.id === action.payload
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        case 'DECREMENT':
            return state.map((item) =>
                item.id === action.payload
                    ? { ...item, quantity: Math.max(1, item.quantity - 1) }
                    : item
            );
        case 'CLEAR':
            return [];
        case 'SET':
            return action.payload;
        default:
            return state;
    }
}

export function CartProvider({ children }) {
    const [cart, dispatch] = useReducer(cartReducer, []);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('giftlingo-cart');
        if (stored) {
            try {
                dispatch({ type: 'SET', payload: JSON.parse(stored) });
            } catch { }
        }
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            localStorage.setItem('giftlingo-cart', JSON.stringify(cart));
        }
    }, [cart, mounted]);

    const addToCart = (product) => dispatch({ type: 'ADD_TO_CART', payload: product });
    const removeFromCart = (id) => dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    const increment = (id) => dispatch({ type: 'INCREMENT', payload: id });
    const decrement = (id) => dispatch({ type: 'DECREMENT', payload: id });
    const clearCart = () => dispatch({ type: 'CLEAR' });
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, increment, decrement, clearCart, cartCount, cartTotal, mounted }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within CartProvider');
    return context;
}
