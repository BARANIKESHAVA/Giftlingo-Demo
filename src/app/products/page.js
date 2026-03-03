'use client';

import { Suspense } from 'react';
import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/data/products';

function ProductsContent() {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get('category') || 'all';

    const [activeCategory, setActiveCategory] = useState(initialCategory);
    const [searchQuery, setSearchQuery] = useState('');

    const filtered = useMemo(() => {
        return products.filter((p) => {
            const matchCat = activeCategory === 'all' || p.category === activeCategory;
            const matchSearch =
                searchQuery === '' ||
                p.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchCat && matchSearch;
        });
    }, [activeCategory, searchQuery]);

    return (
        <div className="pageContainer">
            <h1 className="pageTitle">🛍️ All Products</h1>
            <p className="pageSub">Find the perfect gift from our curated collection</p>

            <div className="filterBar">
                <input
                    type="text"
                    placeholder="🔍 Search products..."
                    className="searchInput"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                    className={`filterBtn ${activeCategory === 'all' ? 'filterBtnActive' : ''}`}
                    onClick={() => setActiveCategory('all')}
                >
                    All
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        className={`filterBtn ${activeCategory === cat.id ? 'filterBtnActive' : ''}`}
                        onClick={() => setActiveCategory(cat.id)}
                    >
                        {cat.icon} {cat.name}
                    </button>
                ))}
            </div>

            {filtered.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                    <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>😔</p>
                    <p style={{ color: '#636e72', fontSize: '1.1rem' }}>
                        No products found. Try a different search or category.
                    </p>
                </div>
            ) : (
                <div className="productGrid">
                    {filtered.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default function ProductsPage() {
    return (
        <Suspense fallback={
            <div className="pageContainer">
                <h1 className="pageTitle">🛍️ All Products</h1>
                <p className="pageSub">Loading products...</p>
            </div>
        }>
            <ProductsContent />
        </Suspense>
    );
}
