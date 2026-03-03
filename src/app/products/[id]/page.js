'use client';

import { use, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';

export default function ProductDetail({ params }) {
    const { id } = use(params);
    const product = products.find((p) => p.id === parseInt(id));
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    if (!product) {
        return (
            <div className="pageContainer" style={{ textAlign: 'center', paddingTop: '8rem' }}>
                <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>😕</p>
                <h2>Product not found</h2>
                <p style={{ color: '#636e72', marginBottom: '1.5rem' }}>
                    The product you're looking for doesn't exist.
                </p>
                <Link
                    href="/products"
                    style={{
                        padding: '0.75rem 2rem',
                        background: 'linear-gradient(135deg, #ff6b81, #ff9ff3)',
                        color: 'white',
                        borderRadius: '50px',
                        fontWeight: 700,
                    }}
                >
                    Browse Products
                </Link>
            </div>
        );
    }

    const handleAdd = () => {
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    };

    const waMessage = encodeURIComponent(
        `Hi GiftLingo! I want to order: ${product.name} (₹${product.price})`
    );

    const relatedProducts = products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 3);

    return (
        <div className="detailContainer">
            <div className="detailGrid">
                <div className="detailImageWrap">
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={600}
                        height={600}
                        priority
                    />
                </div>

                <div className="detailInfo">
                    <Link
                        href="/products"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            marginBottom: '1rem',
                            color: '#636e72',
                            fontSize: '0.9rem',
                        }}
                    >
                        ← Back to Products
                    </Link>
                    <h1>{product.name}</h1>
                    <p className="detailPrice">₹{product.price}</p>
                    <p className="detailDesc">{product.description}</p>

                    <div className="detailActions">
                        <button
                            className="detailAddBtn"
                            onClick={handleAdd}
                            style={
                                added
                                    ? {
                                        background: 'linear-gradient(135deg, #00b894, #55efc4)',
                                    }
                                    : {}
                            }
                        >
                            {added ? '✓ Added to Cart!' : '🛒 Add to Cart'}
                        </button>
                        <a
                            href={`https://wa.me/919876543210?text=${waMessage}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="detailWaBtn"
                        >
                            💬 Buy via WhatsApp
                        </a>
                    </div>
                </div>
            </div>

            {relatedProducts.length > 0 && (
                <div style={{ marginTop: '4rem' }}>
                    <h2 className="sectionTitle">You May Also Like</h2>
                    <p className="sectionSub">More from the same category</p>
                    <div className="productGrid">
                        {relatedProducts.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
