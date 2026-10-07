import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Heart,
  MapPin,
  Menu,
  Search,
  ShoppingCart,
  SlidersHorizontal,
  Star,
  X,
  CalendarDays,
  ShieldCheck,
  Headphones,
  CheckCircle2,
  Trash2,
  Check,
  Gamepad2,
  Camera,
  Compass,
  Tv,
  Sparkles,
  Zap,
  PackageCheck
} from 'lucide-react';
import './styles.css';
import raw from '../public-product-list.json';

const products = raw.products;
const mainCategories = [
  { name: 'Photography', icon: Camera, path: '#photography' },
  { name: 'Gaming', icon: Gamepad2, path: '#gaming', active: true },
  { name: 'Outdoor', icon: Compass, path: '#outdoor' },
  { name: 'Entertainment', icon: Tv, path: '#entertainment' }
];

const tabs = ['All', 'PS5 Console', 'Xbox Console', 'VR', 'Big Screen Gaming', 'Racing Wheel', 'PS5 Games'];
const cities = ['Bangalore', 'Mumbai', 'Delhi NCR', 'Hyderabad', 'Chennai', 'Pune'];

const faqs = [
  [
    'How can I rent from SharePal?',
    'Choose your product, select rental dates, enter your delivery details and complete checkout. Your product is delivered to your doorstep and picked up after the rental period.'
  ],
  [
    'If I rent multiple products, do I need to extend the rental duration for all or partial extension is possible?',
    'You can manage rental durations according to each product’s availability. Contact support if you need to extend only part of an order.'
  ],
  [
    'What is the minimum rental period?',
    'The minimum rental period depends on the product and the rental plan selected. Select your dates to see the available price.'
  ],
  [
    'When does the rental start?',
    'Your rental starts according to the delivery and booking schedule shown at checkout.'
  ],
  [
    'What will be the condition of the products at the time of delivery?',
    'Every product is checked before dispatch so it reaches you clean, functional and ready to use.'
  ]
];

const testimonials = [
  [
    'Afrana',
    'Bangalore',
    'Gaming Console',
    'Have used their services twice now. They never disappoint. Quick responses, polite, transparent, hassle free, great products as well.'
  ],
  [
    'Amal',
    'Bangalore',
    'Gaming Console',
    'I am a regular customer and order ps4. It’s very affordable and booking an order is super easy and user friendly website and polite staff.'
  ],
  [
    'Pankaj',
    'Mumbai',
    'Action Cameras',
    'The experience with SharePal is awesome. The camera and service provided by them are good. Overall I am happy by renting camera gear from SharePal.'
  ],
  [
    'Rakesh',
    'Mumbai',
    'Trekking Gear',
    'Delivery and pick-up was smooth. Refund was done within the time frame. I overall had a very good experience with SharePal.'
  ]
];

function Header({
  cartCount,
  onOpenCart,
  selectedCity,
  setSelectedCity,
  onSearchClick,
  selectedDates,
  onOpenDates
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);

  return (
    <>
      <div className="topbar">
        <span>India’s trusted lifestyle rental platform</span>
        <span className="dot">•</span>
        <span>Zero security deposit on selected products</span>
        <span className="dot">•</span>
        <span>Free Doorstep Delivery in {selectedCity}</span>
      </div>

      <header>
        <div className="nav">
          <button
            className="mobile-menu"
            aria-label="Open navigation menu"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={22} />
          </button>

          <a href="#" className="logo">
            share<span>pal</span>
          </a>

          {/* Location & Date Pill in Nav Header */}
          <div className="nav-capsule">
            <div className="city-wrap">
              <button
                className="city-btn"
                onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                aria-expanded={cityDropdownOpen}
              >
                <MapPin size={15} className="pin-icon" />
                <span className="city-text">{selectedCity}</span>
                <ChevronDown size={14} className="chevron" />
              </button>

              {cityDropdownOpen && (
                <div className="city-dropdown">
                  <div className="city-dropdown-header">Select Your City</div>
                  {cities.map((c) => (
                    <button
                      key={c}
                      className={c === selectedCity ? 'active' : ''}
                      onClick={() => {
                        setSelectedCity(c);
                        setCityDropdownOpen(false);
                      }}
                    >
                      <span>{c}</span>
                      {c === selectedCity && <Check size={14} />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="nav-date-divider"></div>

            <button className="nav-date-btn" onClick={onOpenDates}>
              <CalendarDays size={15} />
              <span>
                {selectedDates.start && selectedDates.end
                  ? `${selectedDates.start} → ${selectedDates.end}`
                  : 'Select Dates'}
              </span>
            </button>
          </div>

          <nav>
            <a href="#rent" className="active">Rent</a>
            <a href="#buy">Buy</a>
            <a href="#why-sharepal">Why SharePal</a>
            <a href="#earn">Earn With Us</a>
          </nav>

          <div className="nav-actions">
            <button className="icon" aria-label="Search" onClick={onSearchClick}>
              <Search size={18} />
            </button>
            <button className="icon cart-btn" aria-label="Shopping Cart" onClick={onOpenCart}>
              <ShoppingCart size={18} />
              {cartCount > 0 && <b className="cart-badge">{cartCount}</b>}
            </button>
            <button className="login">Login</button>
          </div>
        </div>

        {/* Category bar */}
        <div className="main-cat-bar">
          <div className="main-cat-inner">
            {mainCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <a
                  key={cat.name}
                  href={cat.path}
                  className={'main-cat-item ' + (cat.active ? 'active' : '')}
                >
                  <Icon size={16} />
                  <span>{cat.name}</span>
                </a>
              );
            })}
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="modal-backdrop" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <div className="logo">
                share<span>pal</span>
              </div>
              <button className="close" onClick={() => setMobileMenuOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="mobile-city-selector">
              <span className="eyebrow">SELECT CITY</span>
              <div className="mobile-city-buttons">
                {cities.map((c) => (
                  <button
                    key={c}
                    className={c === selectedCity ? 'active' : ''}
                    onClick={() => {
                      setSelectedCity(c);
                      setMobileMenuOpen(false);
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="mobile-nav-links">
              <a href="#rent" onClick={() => setMobileMenuOpen(false)}>Rent Gaming Gadgets</a>
              <a href="#buy" onClick={() => setMobileMenuOpen(false)}>Buy Refurbished</a>
              <a href="#why-sharepal" onClick={() => setMobileMenuOpen(false)}>Why SharePal</a>
              <a href="#earn" onClick={() => setMobileMenuOpen(false)}>Earn With Us</a>
            </div>

            <button className="primary full" onClick={() => setMobileMenuOpen(false)}>
              Login / Sign Up
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function DateBar({ onOpenModal, selectedDates }) {
  return (
    <section className="datebar">
      <div className="datebar-info">
        <span className="eyebrow">BOOKING SCHEDULE</span>
        <h2>
          {selectedDates.start && selectedDates.end
            ? `Rental Period: ${selectedDates.start} to ${selectedDates.end}`
            : 'Select rental dates to view live availability & prices'}
        </h2>
      </div>
      <div className="date-actions">
        <button onClick={onOpenModal}>
          <CalendarDays size={17} />
          {selectedDates.start ? 'Change Dates' : 'Select Rental Dates'}
        </button>
      </div>
    </section>
  );
}

function DateModal({ close, selectedDates }) {
  const [start, setStart] = useState(selectedDates.start || '');
  const [end, setEnd] = useState(selectedDates.end || '');

  const apply = () => {
    selectedDates.setStart(start);
    selectedDates.setEnd(end);
    close();
  };

  return (
    <div className="modal-backdrop" onClick={close}>
      <div className="date-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={close} aria-label="Close modal">
          <X size={18} />
        </button>
        <span className="eyebrow">CHOOSE DATES</span>
        <h2>Select Rental Duration</h2>
        <p>Prices and stock availability will reflect your exact rental window.</p>
        <div className="date-inputs">
          <label>
            Delivery Date
            <input
              type="date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
          </label>
          <label>
            Pickup Date
            <input
              type="date"
              value={end}
              min={start || undefined}
              onChange={(e) => setEnd(e.target.value)}
            />
          </label>
        </div>
        <button className="primary full" onClick={apply}>
          Apply Dates
        </button>
      </div>
    </div>
  );
}

function CategoryTabs({ active, setActive }) {
  return (
    <div className="tabs-wrap">
      <div className="tabs">
        {tabs.map((t) => (
          <button
            key={t}
            className={active === t ? 'active' : ''}
            onClick={() => setActive(t)}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

function ProductCard({ p, onAdd, onQuickView }) {
  const [wish, setWish] = useState(false);

  return (
    <article className={'card ' + (p.out_of_stock ? 'sold' : '')}>
      <div className="image-box">
        {p.tag && (
          <span className={'tag ' + p.tag.toLowerCase().replace(/\s+/g, '-')}>
            {p.tag}
          </span>
        )}
        <button
          className={'heart ' + (wish ? 'liked' : '')}
          onClick={() => setWish(!wish)}
          aria-label={wish ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={17} fill={wish ? 'currentColor' : 'none'} />
        </button>
        <img src={p.image} alt={p.name} loading="lazy" />
        <button
          type="button"
          className="quick"
          onClick={() => onQuickView(p)}
        >
          Quick view
        </button>
      </div>
      <div className="card-body">
        <div className="rating">
          <span>
            <Star size={13} fill="currentColor" />
            {p.rating ? p.rating.toFixed(1) : 'New'}
          </span>
          <small>{p.booked_count.toLocaleString()} booked this month</small>
        </div>
        <h3>{p.name}</h3>
        <p className="desc">Sanitized & tested • Ready to plug & play</p>
        <div className="price-row">
          {p.out_of_stock ? (
            <strong className="out-label">Out of Stock</strong>
          ) : (
            <>
              <div>
                <small>From</small>
                <strong>
                  ₹{Number(p.per_day_rent).toLocaleString('en-IN')}
                  <em>/day</em>
                </strong>
              </div>
              <span className="guarantee-badge">Lowest Price Guarantee</span>
            </>
          )}
        </div>
        {p.out_of_stock ? (
          <button className="disabled" disabled>
            Will be available soon
          </button>
        ) : (
          <button className="add" onClick={() => onAdd(p)}>
            Add to Cart
          </button>
        )}
      </div>
    </article>
  );
}

function QuickViewModal({ product, close, onAdd }) {
  if (!product) return null;
  return (
    <div className="modal-backdrop" onClick={close}>
      <div className="quick-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={close} aria-label="Close preview">
          <X size={18} />
        </button>
        <div className="quick-grid">
          <div className="quick-img-wrap">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="quick-details">
            {product.tag && (
              <span className={'tag-inline ' + product.tag.toLowerCase().replace(/\s+/g, '-')}>
                {product.tag}
              </span>
            )}
            <h2>{product.name}</h2>
            <div className="rating">
              <span>
                <Star size={14} fill="currentColor" />
                {product.rating ? product.rating.toFixed(1) : 'New'}
              </span>
              <small>{product.booked_count.toLocaleString()} booked this month</small>
            </div>
            <p className="quick-desc">
              Original gaming consoles & gear delivered straight to your door with sanitized controllers, HDMI cables, power cables, and full technical verification.
            </p>
            <div className="quick-perks">
              <div><PackageCheck size={14} /> Zero Security Deposit</div>
              <div><Zap size={14} /> Doorstep Delivery & Setup</div>
            </div>
            <div className="quick-price">
              <small>Starting from</small>
              <strong>₹{Number(product.per_day_rent).toLocaleString('en-IN')} <em>/ day</em></strong>
            </div>
            {product.out_of_stock ? (
              <button className="disabled full" disabled>
                Currently Out of Stock
              </button>
            ) : (
              <button
                className="primary full"
                onClick={() => {
                  onAdd(product);
                  close();
                }}
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <section className="faq section">
      <div className="section-head">
        <div>
          <span className="eyebrow">NEED HELP?</span>
          <h2>Frequently Asked Questions</h2>
        </div>
        <p>Everything you need to know before renting.</p>
      </div>
      <div className="faq-list">
        {faqs.map(([q, a], i) => (
          <div className={'faq-item ' + (open === i ? 'open' : '')} key={q}>
            <button onClick={() => setOpen(open === i ? null : i)}>
              <span>{q}</span>
              <ChevronDown />
            </button>
            {open === i && <p>{a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

function Trust() {
  return (
    <>
      <section className="trust section" id="why-sharepal">
        <div className="section-head centered">
          <span className="eyebrow">THE SHAREPAL PROMISE</span>
          <h2>Rent with peace. It’s our promise.</h2>
          <p>Built around transparent pricing, quality checks and support when you need it.</p>
        </div>
        <div className="trust-grid">
          <div>
            <ShieldCheck />
            <h3>12 Point Quality Check</h3>
            <p>Every product is tested & sanitized before delivery so you can play with confidence.</p>
          </div>
          <div>
            <CheckCircle2 />
            <h3>Lowest Price Guarantee</h3>
            <p>Competitive rental prices with no hidden fees and zero deposit on select orders.</p>
          </div>
          <div>
            <Headphones />
            <h3>Prompt Help & Support</h3>
            <p>Fast support is available every day from 10 am to 10 pm via chat and call.</p>
          </div>
        </div>
      </section>

      <section className="impact">
        <div>
          <strong>250Cr+</strong>
          <span>Saved Together</span>
        </div>
        <div>
          <strong>4.5M Kg</strong>
          <span>CO₂e Emissions Saved</span>
        </div>
        <div>
          <strong>100K+</strong>
          <span>Products in Circulation</span>
        </div>
      </section>
    </>
  );
}

function Testimonials() {
  const [i, setI] = useState(0);
  const t = testimonials[i];

  return (
    <section className="section testimonials">
      <div className="section-head">
        <div>
          <span className="eyebrow">REAL PEOPLE. REAL EXPERIENCES.</span>
          <h2>Served more than 1 Lakh Orders</h2>
        </div>
        <div className="slider-controls">
          <button
            onClick={() => setI((i - 1 + testimonials.length) % testimonials.length)}
            aria-label="Previous review"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => setI((i + 1) % testimonials.length)}
            aria-label="Next review"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
      <div className="testimonial-card">
        <div className="quote">“</div>
        <p>{t[3]}</p>
        <div className="person">
          <span>{t[0][0]}</span>
          <div>
            <b>{t[0]}</b>
            <small>
              {t[1]} • {t[2]}
            </small>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div className="footer-brand">
          <div className="logo">
            share<span>pal</span>
          </div>
          <p>Great experiences should be accessible to everyone. Rent lifestyle gadgets without ownership hassle.</p>
          <div className="socials">
            <span>f</span>
            <span>◎</span>
            <span>in</span>
          </div>
        </div>
        <div>
          <h4>Gaming Console</h4>
          <a href="#">Racing Wheel</a>
          <a href="#">PS5 Games</a>
          <a href="#">Big Screen Gaming</a>
          <a href="#">PS5 Console</a>
          <a href="#">VR</a>
          <a href="#">Xbox Console</a>
        </div>
        <div>
          <h4>Popular Rentals</h4>
          <a href="#">Action Cameras</a>
          <a href="#">Cameras</a>
          <a href="#">Trekking Gear</a>
          <a href="#">Riding Gear</a>
          <a href="#">Creator Gear</a>
        </div>
        <div>
          <h4>Company</h4>
          <a href="#">About Us</a>
          <a href="#">Why SharePal</a>
          <a href="#">Contact Us</a>
          <a href="#">Terms of Use</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
      <div className="footer-bottom">
        <div>© 2026 SharePal. All rights reserved.</div>
        <span>Made for experiences, not ownership.</span>
      </div>
    </footer>
  );
}

function Cart({ items, onRemove, close }) {
  const totalPerDay = items.reduce((sum, item) => sum + Number(item.per_day_rent || 0), 0);

  return (
    <div className="cart-backdrop" onClick={close}>
      <aside className="cart" onClick={(e) => e.stopPropagation()}>
        <div className="cart-head">
          <h2>Your Cart ({items.length})</h2>
          <button onClick={close} aria-label="Close cart">
            <X size={18} />
          </button>
        </div>
        {items.length === 0 ? (
          <div className="empty">
            <ShoppingCart size={42} />
            <h3>Your cart is empty</h3>
            <p>Add a gaming console or accessories to get started.</p>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items-list">
              {items.map((p, idx) => (
                <div className="cart-item" key={`${p.id}-${idx}`}>
                  <img src={p.image} alt={p.name} />
                  <div className="cart-item-details">
                    <b>{p.name}</b>
                    <span>₹{Number(p.per_day_rent).toLocaleString('en-IN')}/day</span>
                  </div>
                  <button
                    className="cart-remove-btn"
                    onClick={() => onRemove(idx)}
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
            <div className="cart-footer">
              <div className="cart-summary-row">
                <span>Total Per Day</span>
                <strong>₹{totalPerDay.toLocaleString('en-IN')}/day</strong>
              </div>
              <button
                className="primary full"
                onClick={() => alert(`Proceeding to checkout with ${items.length} item(s)!`)}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}

function App() {
  const [active, setActive] = useState('All');
  const [datesModalOpen, setDatesModalOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sort, setSort] = useState('featured');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState('Bangalore');
  const [quickProduct, setQuickProduct] = useState(null);

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      if (active === 'All') return true;
      if (active === 'PS5 Console') return /ps5/i.test(p.name);
      if (active === 'Xbox Console') return /xbox/i.test(p.name);
      if (active === 'VR') return /vr|quest|oculus|virtual/i.test(p.name);
      if (active === 'Big Screen Gaming') return /projector|screen|tv/i.test(p.name);
      if (active === 'Racing Wheel') return /wheel/i.test(p.name);
      if (active === 'PS5 Games') return /(fc|god|uncharted|spider|ghost|cricket)/i.test(p.name);
      return true;
    });

    const cloned = [...result];
    if (sort === 'price') cloned.sort((x, y) => Number(x.per_day_rent) - Number(y.per_day_rent));
    if (sort === 'rating') cloned.sort((x, y) => (y.rating || 0) - (x.rating || 0));
    if (sort === 'popular') cloned.sort((x, y) => (y.booked_count || 0) - (x.booked_count || 0));
    return cloned;
  }, [active, sort, search]);

  const addToCart = (p) => {
    setCart((prev) => [...prev, p]);
    setCartOpen(true);
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const focusSearch = () => {
    const input = document.getElementById('search-input');
    if (input) {
      input.focus();
      input.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div>
      <Header
        cartCount={cart.length}
        onOpenCart={() => setCartOpen(true)}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        onSearchClick={focusSearch}
        selectedDates={{ start: startDate, end: endDate }}
        onOpenDates={() => setDatesModalOpen(true)}
      />

      <main id="rent">
        <DateBar
          onOpenModal={() => setDatesModalOpen(true)}
          selectedDates={{ start: startDate, end: endDate }}
        />

        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <span className="hero-eyebrow">GAMING GADGETS ON RENT</span>
            <h1>Rent Gaming Gadgets in {selectedCity}</h1>
            <p>
              PS5, Xbox, VR headsets & racing wheels with Zero Security Deposit & Free Doorstep Delivery.
            </p>
            <div className="hero-highlights">
              <span className="pill"><Sparkles size={13} /> Zero Deposit</span>
              <span className="pill"><PackageCheck size={13} /> Sanitized Gear</span>
              <span className="pill"><Zap size={13} /> Fast Delivery</span>
            </div>
          </div>
          <div className="hero-badge">
            <div>🎮</div>
            <b>Play more.</b>
            <span>Own less.</span>
          </div>
        </section>

        {/* Subcategory Filter Tabs */}
        <CategoryTabs active={active} setActive={setActive} />

        {/* Product Listing */}
        <section className="listing">
          <div className="listing-head">
            <div>
              <span className="eyebrow">{selectedCity.toUpperCase()} CATALOG</span>
              <h2>Gaming gadgets on rent</h2>
              <p>{filtered.length} {filtered.length === 1 ? 'item' : 'items'} available</p>
            </div>
            <div className="listing-actions">
              <div className="search">
                <Search size={16} />
                <input
                  id="search-input"
                  placeholder="Search gaming gadgets..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                  <button className="clear-search" onClick={() => setSearch('')}>
                    <X size={13} />
                  </button>
                )}
              </div>
              <button
                className="filter"
                onClick={() => {
                  const nextSort =
                    sort === 'featured'
                      ? 'price'
                      : sort === 'price'
                      ? 'rating'
                      : sort === 'rating'
                      ? 'popular'
                      : 'featured';
                  setSort(nextSort);
                }}
              >
                <SlidersHorizontal size={15} /> Sort: {sort.charAt(0).toUpperCase() + sort.slice(1)}
              </button>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="featured">Sort: Featured</option>
                <option value="popular">Most popular</option>
                <option value="rating">Top rated</option>
                <option value="price">Price: low to high</option>
              </select>
            </div>
          </div>

          {filtered.length ? (
            <div className="grid">
              {filtered.map((p) => (
                <ProductCard
                  p={p}
                  onAdd={addToCart}
                  onQuickView={setQuickProduct}
                  key={p.id}
                />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <Search size={36} />
              <h3>No products found</h3>
              <p>Try searching for a different game or select another category above.</p>
              <button
                className="primary"
                style={{ marginTop: '14px' }}
                onClick={() => {
                  setSearch('');
                  setActive('All');
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>

        <Trust />
        <FAQ />
        <Testimonials />
      </main>

      <Footer />

      {cartOpen && (
        <Cart
          items={cart}
          onRemove={removeFromCart}
          close={() => setCartOpen(false)}
        />
      )}

      {datesModalOpen && (
        <DateModal
          close={() => setDatesModalOpen(false)}
          selectedDates={{
            start: startDate,
            end: endDate,
            setStart: setStartDate,
            setEnd: setEndDate
          }}
        />
      )}

      {quickProduct && (
        <QuickViewModal
          product={quickProduct}
          close={() => setQuickProduct(null)}
          onAdd={addToCart}
        />
      )}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
