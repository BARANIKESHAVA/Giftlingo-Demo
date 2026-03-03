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
            <div className="pageContainer" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>😕</div>
                <h2 className="pageTitle">Product Not Found</h2>
                <p className="pageSub">
                    The gift you're looking for might have been moved or is currently unavailable.
                </p>
                <Link href="/products" className="heroBtn" style={{ display: 'inline-block', marginTop: '1rem' }}>
                    ✨ Browse All Products
                </Link>
            </div>
        );
    }

    const handleAdd = () => {
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    const waMessage = encodeURIComponent(
        `Hi GiftLingo! I'm interested in the "${product.name}" (₹${product.price}). Is it available?`
    );

    const relatedProducts = products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    return (
        <div className="pageContainer">
            <div className="detailBreadcrumb">
                <Link href="/">Home</Link>
                <span>/</span>
                <Link href="/products">Products</Link>
                <span>/</span>
                <span className="current">{product.name}</span>
            </div>

            <div className="detailGrid">
                <div className="detailImageWrap">
                    <div className="detailBadge">Premium Gift</div>
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={600}
                        height={600}
                        priority
                        className="mainProductImg"
                    />
                </div>

                <div className="detailInfo">
                    <span className="detailCategory">{product.category}</span>
                    <h1 className="detailTitle">{product.name}</h1>
                    
                    <div className="detailMeta">
                        <span className="detailPrice">₹{product.price}</span>
                        <div className="stockBadge">
                            <span className="dot"></span> In Stock
                        </div>
                    </div>

                    <p className="detailDesc">{product.description}</p>

                    <div className="detailFeatures">
                        <div className="featureItem">✨ Premium Quality</div>
                        <div className="featureItem">🚚 Fast Delivery</div>
                        <div className="featureItem">🎁 Gift Wrap Available</div>
                    </div>

                    <div className="detailActions">
                        <button
                            className={`detailAddBtn ${added ? 'added' : ''}`}
                            onClick={handleAdd}
                        >
                            {added ? '✓ Item Added!' : '🛒 Add to Cart'}
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

                    <div className="trustFooter">
                        🔒 Safe & Secure Checkout
                    </div>
                </div>
            </div>

            {relatedProducts.length > 0 && (
                <div className="relatedSection">
                    <div className="sectionHeader" style={{ textAlign: 'left', marginBottom: '3rem' }}>
                        <h2 className="sectionTitle">You May Also Like</h2>
                        <p className="sectionSub">More wonderful gifts from {product.category}</p>
                    </div>
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
