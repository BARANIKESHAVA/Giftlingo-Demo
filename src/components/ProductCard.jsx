'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import styles from './ProductCard.module.css';
import { useState } from 'react';

export default function ProductCard({ product }) {
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    const handleAdd = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 1200);
    };

    return (
        <div className={styles.card}>
            <Link href={`/products/${product.id}`} className={styles.imageWrap}>
                <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={300}
                    className={styles.image}
                />
                {product.badge && (
                    <span className={`${styles.badge} ${product.badge === 'Best Seller' ? styles.badgeBest : styles.badgePopular}`}>
                        {product.badge}
                    </span>
                )}
                <div className={styles.overlay}>
                    <span>View Details</span>
                </div>
                <button
                    className={`${styles.quickAdd} ${added ? styles.quickAdded : ''}`}
                    onClick={handleAdd}
                    title="Quick Add to Cart"
                >
                    {added ? '✓' : '🛒'}
                </button>
            </Link>
            <div className={styles.info}>
                <h3 className={styles.name}>{product.name}</h3>
                <p className={styles.price}>₹{product.price}</p>
                <div className={styles.actions}>
                    <button
                        className={`${styles.addBtn} ${added ? styles.added : ''}`}
                        onClick={handleAdd}
                    >
                        {added ? '✓ Added!' : '🛒 Add to Cart'}
                    </button>
                    <Link href={`/products/${product.id}`} className={styles.viewBtn}>
                        View
                    </Link>
                </div>
            </div>
        </div>
    );
}
