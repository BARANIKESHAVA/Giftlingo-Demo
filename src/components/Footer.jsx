import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer} id="contact">
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.col}>
                        <div className={styles.brand}>
                            <Image
                                src="/images/logo.png"
                                alt="GiftLingo"
                                width={110}
                                height={40}
                                className={styles.brandLogo}
                            />
                        </div>
                        <p className={styles.tagline}>Let Your Gifts Do The Talking</p>
                        <p className={styles.desc}>
                            Your one-stop destination for unique, fun, and thoughtful gifts.
                            Bringing joy one gift at a time! 🎉
                        </p>
                        <div className={styles.socials}>
                            <a
                                href="https://instagram.com/giftlingo.in"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialBtn}
                                aria-label="Instagram"
                            >
                                📸 Instagram
                            </a>
                            <a
                                href="https://wa.me/919876543210?text=Hi%20GiftLingo!"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialBtn}
                                aria-label="WhatsApp"
                            >
                                💬 WhatsApp
                            </a>
                        </div>
                    </div>

                    <div className={styles.col}>
                        <h4>Quick Links</h4>
                        <ul>
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/products">Products</Link></li>
                            <li><Link href="/cart">Cart</Link></li>
                        </ul>
                    </div>

                    <div className={styles.col}>
                        <h4>Categories</h4>
                        <ul>
                            <li><Link href="/products?category=toy-cars">Toy Cars</Link></li>
                            <li><Link href="/products?category=led-gifts">LED Gifts</Link></li>
                            <li><Link href="/products?category=couple-gifts">Couple Gifts</Link></li>
                            <li><Link href="/products?category=birthday-gifts">Birthday Gifts</Link></li>
                            <li><Link href="/products?category=cute-toys">Cute Toys</Link></li>
                        </ul>
                    </div>

                    <div className={styles.col}>
                        <h4>Contact Us</h4>
                        <p>📍 Chennai, India</p>
                        <p>📞 +91 98765 43210</p>
                        <p>📧 hello@giftlingo.in</p>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>© 2026 GiftLingo. All rights reserved. Made with ❤️</p>
                </div>
            </div>
        </footer>
    );
}
