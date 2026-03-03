'use client';

import Image from 'next/image';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/data/products';

const trendingProducts = products.filter((p) => p.trending);

const instaImages = [
  '/images/hotwheels-car.png',
  '/images/led-teddy.png',
  '/images/pearl-chain.png',
  '/images/toy-car.png',
  '/images/mini-washer.png',
  '/images/heart-balloons.png',
  '/images/hello-kitty.png',
  '/images/gift-hamper.png',
  '/images/pumpkin-lamp.png',
  '/images/couple-gift.png',
];

const featuredImages = [
  { src: '/images/hotwheels-car.png', alt: 'Hot Wheels Car' },
  { src: '/images/led-teddy.png', alt: 'LED Teddy Bear' },
  { src: '/images/pearl-chain.png', alt: 'Pearl Chain Gift' },
  { src: '/images/mini-washer.png', alt: 'Mini Washing Machine' },
];

export default function Home() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero">
        {/* Floating decorative icons */}
        <span className="heroFloat heroFloat1">🎁</span>
        <span className="heroFloat heroFloat2">🚗</span>
        <span className="heroFloat heroFloat3">🧸</span>
        <span className="heroFloat heroFloat4">🎂</span>
        <span className="heroFloat heroFloat5">💡</span>
        <span className="heroFloat heroFloat6">🎈</span>

        <div className="heroContent">

          <h1 className="heroTitle">Find the Perfect Gift for Every Occasion</h1>
          <p className="heroSub">
            Discover unique, fun, and thoughtful gifts that bring smiles.
            From cute LED toys to romantic surprise boxes — we've got it all!
          </p>
          <a href="#categories" className="heroBtn">
            🛍️ Start Shopping
          </a>

          {/* Featured product thumbnails */}
          <div className="heroFeatured">
            {featuredImages.map((img, i) => (
              <div key={i} className="heroFeaturedItem">
                <Image src={img.src} alt={img.alt} width={80} height={80} />
              </div>
            ))}
          </div>

          {/* Trust badge */}
          <div className="trustBadge">
            <span className="trustStars">★★★★★</span>
            <span>Loved by <strong>500+</strong> happy customers</span>
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES (Light Pink) ===== */}
      <div className="sectionAlt">
        <section className="sectionInner" id="categories">
          <h2 className="sectionTitle">🏷️ Shop by Category</h2>
          <p className="sectionSub">Browse gifts by your favorite category</p>
          <div className="categoryGrid">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.id}`}
                className="categoryCard"
                style={{ '--cat-color': cat.color }}
              >
                <span className="categoryIcon">{cat.icon}</span>
                <span className="categoryName">{cat.name}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* ===== TRENDING GIFTS (White) ===== */}
      <section className="section" id="trending">
        <h2 className="sectionTitle">🔥 Trending Gifts</h2>
        <p className="sectionSub">Our most loved picks — grab them before they're gone!</p>
        <div className="productGrid trendingGrid">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link href="/products" className="heroBtn" style={{ padding: '0.8rem 2rem', fontSize: '1rem' }}>
            View All Products
          </Link>
        </div>
      </section>

      {/* ===== INSTAGRAM GALLERY (Light Purple) ===== */}
      <section className="instaSection">
        <h2 className="sectionTitle" style={{ marginBottom: '0.5rem' }}>
          📸 Follow Our Gift Inspiration
        </h2>
        <p className="sectionSub">@giftlingo — Your daily dose of gift inspiration</p>
        <div className="instaScroll">
          {instaImages.map((img, i) => (
            <div key={i} className="instaItem">
              <Image src={img} alt={`Instagram post ${i + 1}`} width={300} height={300} />
              <div className="instaOverlay">
                <span>📸</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CONTACT (Gradient Wrap-up) ===== */}
      <section className="contactSection" id="contact">
        <div className="contactInner">

          <h2 className="contactTitle">Need a Custom Gift?</h2>
          <p className="contactSub">
            We craft personalized gifts just for you! Reach out and let us make your celebration unforgettable.
          </p>
          <div className="contactBtns">
            <a
              href="https://wa.me/919876543210?text=Hi%20GiftLingo!%20I'm%20interested%20in%20your%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="waBtn waBtnLarge"
            >
              💬 Order on WhatsApp
            </a>
            <a
              href="https://www.instagram.com/giftlingo.in"
              target="_blank"
              rel="noopener noreferrer"
              className="instaBtn instaBtnLarge"
            >
              📸 Visit Instagram
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
