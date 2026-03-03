'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import styles from './Navbar.module.css';

export default function Navbar() {
    const { cartCount, mounted } = useCart();
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
            <div className={styles.container}>
                <Link href="/" className={styles.brand}>
                    <Image
                        src="/images/logo.png"
                        alt="GiftLingo"
                        width={120}
                        height={44}
                        className={styles.brandLogo}
                        priority
                    />
                </Link>

                <button
                    className={`${styles.hamburger} ${menuOpen ? styles.active : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}>
                    <li><Link href="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
                    <li><Link href="/products" onClick={() => setMenuOpen(false)}>Products</Link></li>
                    <li><Link href="/products" onClick={() => setMenuOpen(false)}>Categories</Link></li>
                    <li>
                        <Link href="/cart" className={styles.cartLink} onClick={() => setMenuOpen(false)}>
                            🛒 Cart
                            {mounted && cartCount > 0 && (
                                <span className={styles.cartBadge}>{cartCount}</span>
                            )}
                        </Link>
                    </li>
                    <li><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
                </ul>
            </div>
        </nav>
    );
}
