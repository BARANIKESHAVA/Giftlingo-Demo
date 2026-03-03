'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
    const { cart, increment, decrement, removeFromCart, cartTotal, mounted } = useCart();

    if (!mounted) {
        return (
            <div className="pageContainer">
                <h1 className="pageTitle">🛒 Your Cart</h1>
                <p className="pageSub">Loading your goodies...</p>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="pageContainer">
                <div className="cartEmpty">
                    <div className="cartEmptyIcon">🛍️</div>
                    <h1 className="pageTitle">Your Cart is Empty</h1>
                    <p className="pageSub">
                        Looks like you haven't added anything yet.
                        Let's find the perfect gift!
                    </p>
                    <Link href="/products" className="heroBtn">
                        ✨ Start Shopping
                    </Link>
                </div>
            </div>
        );
    }

    const waMessage = encodeURIComponent(
        `Hi GiftLingo! I'd like to order:\n${cart
            .map((item) => `• ${item.name} x${item.quantity} — ₹${item.price * item.quantity}`)
            .join('\n')}\n\nTotal: ₹${cartTotal}`
    );

    return (
        <div className="pageContainer">
            <header className="pageHeader" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 className="pageTitle">🎁 Your Shopping Bag</h1>
                <p className="pageSub">Review your selections before checkout</p>
            </header>

            <div className="cartGrid">
                <div className="cartList">
                    {cart.map((item) => (
                        <div key={item.id} className="cartItem">
                            <div className="cartItemImage">
                                <Image src={item.image} alt={item.name} width={120} height={120} />
                            </div>
                            <div className="cartItemInfo">
                                <h3 className="cartItemName">{item.name}</h3>
                                <p className="cartItemPrice">₹{item.price}</p>

                                <div className="cartItemActions">
                                    <div className="cartQty">
                                        <button className="cartQtyBtn" onClick={() => decrement(item.id)}>
                                            −
                                        </button>
                                        <span className="cartQtyNum">{item.quantity}</span>
                                        <button className="cartQtyBtn" onClick={() => increment(item.id)}>
                                            +
                                        </button>
                                    </div>
                                    <button
                                        className="cartRemoveBtn"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        Remove 🗑️
                                    </button>
                                </div>
                            </div>
                            <div className="cartItemSubtotal">
                                ₹{item.price * item.quantity}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cartSidebar">
                    <div className="cartSummaryCard">
                        <h2 className="summaryTitle">Order Summary</h2>
                        <div className="summaryRow">
                            <span>Subtotal</span>
                            <span>₹{cartTotal}</span>
                        </div>
                        <div className="summaryRow">
                            <span>Shipping</span>
                            <span className="free">FREE</span>
                        </div>
                        <div className="summaryDivider"></div>
                        <div className="summaryRow total">
                            <span>Total</span>
                            <span>₹{cartTotal}</span>
                        </div>

                        <a
                            href={`https://wa.me/919876543210?text=${waMessage}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="waBtn waBtnLarge"
                            style={{ width: '100%', marginTop: '2rem' }}
                        >
                            💬 Order via WhatsApp
                        </a>

                        <p className="summaryNote">
                            Secure checkout via WhatsApp. We will contact you for delivery details.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
