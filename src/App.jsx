import { useState } from "react";

/* ---------- Edit these ---------- */
const RESTAURANT = {
  name: "Ember & Flame",
  tagline: "BBQ House",
  phone: "+00 000 000 000",
  hours: "Open daily · 12:00 – 23:00",
  currency: "€",
};

const SIZES = ['10"', '12"', '14"'];

const MENU = [
  {
    id: "pizzas", label: "Pizzas", icon: "🍕", sizes: true,
    items: [
      { n: "Margherita", d: "Tomato, mozzarella, fresh basil", p: [9.5, 12.5, 15.5] },
      { n: "Pepperoni", d: "Spicy pepperoni, mozzarella, oregano", p: [11, 14, 17], tag: "Popular" },
      { n: "Istanbul Special", d: "Sucuk, roasted peppers, red onion, mozzarella", p: [12.5, 15.5, 18.5], tag: "Chef’s pick" },
      { n: "BBQ Chicken", d: "Grilled chicken, smoky BBQ sauce, sweet corn", p: [12, 15, 18], tag: "Popular" },
      { n: "Hot & Spicy", d: "Spicy beef, jalapeños, fresh chilli, red onion", p: [12, 15, 18], tag: "Spicy" },
      { n: "Meat Feast", d: "Pepperoni, ham, spicy beef, bacon", p: [13, 16, 19.5] },
      { n: "Veggie Supreme", d: "Mushrooms, peppers, olives, sweetcorn, onion", p: [11, 14, 17] },
    ],
  },
  {
    id: "grill", label: "From the Grill", icon: "🔥",
    items: [
      { n: "Mixed Grill Platter", d: "Adana, chicken shish, lamb chop, rice, grilled veg", p: 21.5, tag: "Sharing" },
      { n: "Adana Kebab", d: "Hand-minced spiced lamb, flatbread, sumac onions", p: 14.5, tag: "Spicy" },
      { n: "Chicken Shish", d: "Marinated chicken skewers, bulgur rice, salad", p: 13.5 },
      { n: "Lamb Chops", d: "Four char-grilled chops, garlic butter, roasted tomato", p: 18.5, tag: "Popular" },
      { n: "İskender", d: "Sliced döner over bread, tomato sauce, melted butter, yoghurt", p: 15.5, tag: "Chef’s pick" },
      { n: "Döner Wrap", d: "Lamb & chicken döner, salad, garlic or chilli sauce", p: 9.5 },
    ],
  },
  {
    id: "burgers", label: "Burgers", icon: "🍔",
    items: [
      { n: "Flame Burger", d: "Flame-grilled beef, cheddar, pickles, smoky sauce", p: 11.5, tag: "Popular" },
      { n: "Double Smash", d: "Two smashed patties, American cheese, caramelised onion", p: 14 },
      { n: "Crispy Chicken", d: "Buttermilk chicken, slaw, hot honey", p: 11 },
      { n: "Inferno Burger", d: "Beef, jalapeños, pepper jack, chilli mayo", p: 12.5, tag: "Spicy" },
    ],
  },
  {
    id: "sides", label: "Sides", icon: "🍟",
    items: [
      { n: "Skin-on Fries", d: "Sea salt, crispy", p: 4 },
      { n: "Loaded Cheesy Fries", d: "Cheese sauce, jalapeños, spring onion", p: 6.5 },
      { n: "Onion Rings", d: "Beer-battered, smoky dip", p: 5 },
      { n: "Garlic Bread", d: "With or without mozzarella", p: 4.5 },
      { n: "Shepherd’s Salad", d: "Tomato, cucumber, onion, parsley, lemon", p: 5.5 },
    ],
  },
  {
    id: "drinks", label: "Drinks", icon: "🥤",
    items: [
      { n: "Ayran", d: "Cold salted yoghurt drink", p: 2.5 },
      { n: "Soft Drinks", d: "Cola, diet cola, lemonade, orange", p: 2.5 },
      { n: "Turkish Tea", d: "Served in a tulip glass", p: 2 },
      { n: "Still / Sparkling Water", d: "500 ml", p: 2 },
    ],
  },
];

const DEALS = [
  { t: "Family Feast", d: "2 large pizzas, 4 wraps, 2 sides, 1.5 L drink", p: 44.99 },
  { t: "Lunch Combo", d: "Any wrap or burger, fries and a drink", p: 11.99 },
  { t: "Fire for Two", d: "Mixed grill platter for two, salad and bread", p: 36.99 },
];

const fmt = (n) => RESTAURANT.currency + (Number.isInteger(n) ? n.toFixed(2) : n.toFixed(2));

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@400;500;600&family=Inter:wght@400;500;600&display=swap');
.rm{--maroon:#3a060b;--maroon2:#5b0f14;--ember:#ff6a13;--gold:#ffc21a;--cream:#fff3e0;--mute:#e7bfa5;--line:#ffffff2b;
  min-height:100vh;color:var(--cream);font-family:'Inter',system-ui,sans-serif;
  background:radial-gradient(90rem 50rem at 50% -10%,#7a1a14 0%,var(--maroon2) 35%,var(--maroon) 75%,#210306 100%);
  overflow-x:hidden}
.rm *{box-sizing:border-box}
.rm-hero{position:relative;text-align:center;padding:4.5rem 1.25rem 7.5rem;overflow:hidden}
.rm-fire{position:absolute;left:0;right:0;bottom:-30px;height:240px;pointer-events:none;filter:blur(16px);opacity:.95}
.rm-fire i{position:absolute;bottom:-60px;width:150px;height:230px;border-radius:50% 50% 45% 45%/70% 70% 30% 30%;
  background:radial-gradient(ellipse at 50% 85%,var(--gold) 0%,var(--ember) 45%,transparent 72%);
  animation:rm-flick 1.6s ease-in-out infinite alternate;transform-origin:50% 100%}
@keyframes rm-flick{0%{transform:scale(.85,.8) skewX(-6deg)}50%{transform:scale(1.05,1.1) skewX(5deg)}100%{transform:scale(.95,.92) skewX(-3deg)}}
.rm-kicker{font-family:'Oswald',sans-serif;letter-spacing:.35em;text-transform:uppercase;color:var(--gold);font-size:.85rem;margin:0}
.rm-title{font-family:'Bebas Neue','Oswald',Impact,sans-serif;font-size:clamp(4rem,15vw,9.5rem);line-height:.9;margin:.4rem 0 0;
  background:linear-gradient(180deg,#fff3c2 0%,var(--gold) 35%,var(--ember) 80%);-webkit-background-clip:text;background-clip:text;color:transparent;
  filter:drop-shadow(0 6px 24px #ff6a1366)}
.rm-sub{font-family:'Bebas Neue',Impact,sans-serif;font-size:clamp(1.6rem,5vw,2.6rem);letter-spacing:.12em;margin:.2rem 0 0;color:var(--cream)}
.rm-meta{margin:1.3rem auto 0;color:var(--mute);font-size:.95rem}

.rm-nav{position:sticky;top:0;z-index:20;background:#2a0407e8;backdrop-filter:blur(10px);border-bottom:1px solid var(--line);
  display:flex;gap:.5rem;overflow-x:auto;padding:.7rem 1rem;justify-content:center;scrollbar-width:none}
.rm-nav::-webkit-scrollbar{display:none}
.rm-tab{flex:none;font-family:'Oswald',sans-serif;text-transform:uppercase;letter-spacing:.1em;font-size:.9rem;font-weight:500;
  color:var(--cream);background:transparent;border:1px solid var(--line);border-radius:999px;padding:.5rem 1.1rem;cursor:pointer;transition:.2s}
.rm-tab:hover{border-color:var(--ember)}
.rm-tab[aria-selected="true"]{background:linear-gradient(90deg,var(--ember),var(--gold));color:#2a0407;border-color:transparent;font-weight:600}
.rm-tab:focus-visible,.rm-cta:focus-visible{outline:3px solid var(--gold);outline-offset:3px}

.rm-wrap{max-width:1040px;margin:0 auto;padding:2.5rem 1.25rem 3rem}
.rm-sec-title{display:flex;align-items:center;gap:.8rem;font-family:'Bebas Neue',Impact,sans-serif;font-size:clamp(2.4rem,7vw,3.8rem);
  margin:0 0 .4rem;color:var(--gold);letter-spacing:.04em}
.rm-sec-title::after{content:"";flex:1;height:2px;background:linear-gradient(90deg,var(--ember),transparent)}
.rm-sizes{display:grid;grid-template-columns:1fr repeat(3,4.4rem);gap:.5rem;padding:.4rem 0;font-family:'Oswald',sans-serif;
  letter-spacing:.1em;color:var(--ember);font-size:.85rem;text-align:right;border-bottom:1px solid var(--line)}
.rm-sizes span:first-child{visibility:hidden}
.rm-list{list-style:none;padding:0;margin:0;display:grid;grid-template-columns:1fr 1fr;column-gap:3rem}
.rm-list.sz{grid-template-columns:1fr}
.rm-item{padding:1rem 0;border-bottom:1px dashed var(--line);display:grid;grid-template-columns:1fr auto;gap:.2rem 1rem;align-items:start}
.sz .rm-item{grid-template-columns:1fr repeat(3,4.4rem);gap:.5rem}
.rm-name{font-family:'Oswald',sans-serif;font-weight:500;font-size:1.2rem;letter-spacing:.04em;text-transform:uppercase;margin:0}
.rm-desc{margin:.15rem 0 0;color:var(--mute);font-size:.92rem;line-height:1.45}
.rm-price{font-family:'Oswald',sans-serif;font-weight:600;font-size:1.15rem;color:var(--gold);text-align:right;white-space:nowrap}
.rm-tag{display:inline-block;margin-left:.6rem;vertical-align:middle;font-size:.62rem;letter-spacing:.12em;padding:.15rem .5rem;border-radius:4px;
  background:var(--ember);color:#2a0407;font-weight:600}
.rm-tag.hot{background:#ff3b30;color:#fff}

.rm-deals{background:linear-gradient(180deg,#00000040,transparent);border-top:1px solid var(--line);padding:3rem 1.25rem}
.rm-deals h2{font-family:'Bebas Neue',Impact,sans-serif;font-size:clamp(2.4rem,7vw,3.6rem);text-align:center;margin:0 0 1.5rem;color:var(--cream);letter-spacing:.05em}
.rm-deal-grid{max-width:1040px;margin:0 auto;display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(250px,1fr))}
.rm-deal{position:relative;padding:1.5rem;border-radius:18px;border:1px solid #ff6a1366;overflow:hidden;
  background:radial-gradient(circle at 100% 0%,#ff6a1340,transparent 60%),#2a0407cc}
.rm-deal h3{font-family:'Bebas Neue',Impact,sans-serif;font-size:2rem;margin:0;letter-spacing:.05em;color:var(--gold)}
.rm-deal p{color:var(--mute);margin:.3rem 0 1rem;font-size:.95rem;line-height:1.45}
.rm-deal b{font-family:'Bebas Neue',Impact,sans-serif;font-size:2.6rem;color:var(--cream);letter-spacing:.03em}

.rm-foot{text-align:center;padding:2.5rem 1.25rem 4rem;border-top:1px solid var(--line)}
.rm-cta{display:inline-block;font-family:'Oswald',sans-serif;text-transform:uppercase;letter-spacing:.14em;font-weight:600;font-size:1rem;
  padding:.95rem 2.4rem;border-radius:999px;border:0;cursor:pointer;color:#2a0407;background:linear-gradient(90deg,var(--ember),var(--gold));
  box-shadow:0 10px 30px #ff6a1355;transition:transform .2s}
.rm-cta:hover{transform:translateY(-2px)}
.rm-foot p{color:var(--mute);margin:1rem 0 0}
.rm-fade{animation:rm-in .45s ease both}
@keyframes rm-in{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}

@media (max-width:720px){
  .rm-list{grid-template-columns:1fr}
  .rm-sizes,.sz .rm-item{grid-template-columns:1fr repeat(3,3.3rem)}
  .rm-price{font-size:1rem}
  .rm-nav{justify-content:flex-start}
}
@media (prefers-reduced-motion:reduce){.rm-fire i,.rm-fade{animation:none}}
`;

export default function RestaurantMenu() {
  const [active, setActive] = useState("pizzas");
  const section = MENU.find((s) => s.id === active);

  return (
    <div className="rm">
      <style>{CSS}</style>

      <header className="rm-hero">
        <div className="rm-fire" aria-hidden="true">
          {[3, 17, 31, 45, 59, 73, 87].map((l, i) => (
            <i key={l} style={{ left: `${l}%`, animationDelay: `${-i * 0.37}s`, animationDuration: `${1.2 + (i % 3) * 0.35}s` }} />
          ))}
        </div>
        <p className="rm-kicker">Flame-grilled · Fresh daily</p>
        <h1 className="rm-title">{RESTAURANT.name}</h1>
        <p className="rm-sub">{RESTAURANT.tagline}</p>
        <p className="rm-meta">{RESTAURANT.hours}</p>
      </header>

      <nav className="rm-nav" role="tablist" aria-label="Menu categories">
        {MENU.map((s) => (
          <button key={s.id} role="tab" aria-selected={active === s.id} className="rm-tab" onClick={() => setActive(s.id)}>
            <span aria-hidden="true">{s.icon}</span> {s.label}
          </button>
        ))}
      </nav>

      <main className="rm-wrap">
        <section key={section.id} className="rm-fade" role="tabpanel">
          <h2 className="rm-sec-title">{section.label}</h2>
          {section.sizes && (
            <div className="rm-sizes" aria-hidden="true">
              <span>.</span>
              {SIZES.map((s) => <span key={s}>{s}</span>)}
            </div>
          )}
          <ul className={"rm-list" + (section.sizes ? " sz" : "")}>
            {section.items.map((it) => (
              <li key={it.n} className="rm-item">
                <div>
                  <h3 className="rm-name">
                    {it.n}
                    {it.tag && <span className={"rm-tag" + (it.tag === "Spicy" ? " hot" : "")}>{it.tag === "Spicy" ? "🌶 SPICY" : it.tag.toUpperCase()}</span>}
                  </h3>
                  <p className="rm-desc">{it.d}</p>
                </div>
                {Array.isArray(it.p)
                  ? it.p.map((v, i) => <div key={i} className="rm-price" aria-label={`${SIZES[i]} ${fmt(v)}`}>{fmt(v)}</div>)
                  : <div className="rm-price">{fmt(it.p)}</div>}
              </li>
            ))}
          </ul>
        </section>
      </main>

      <section className="rm-deals" aria-labelledby="deals-h">
        <h2 id="deals-h">🔥 Hot Deals</h2>
        <div className="rm-deal-grid">
          {DEALS.map((d) => (
            <article key={d.t} className="rm-deal">
              <h3>{d.t}</h3>
              <p>{d.d}</p>
              <b>{fmt(d.p)}</b>
            </article>
          ))}
        </div>
      </section>

      <footer className="rm-foot">
        <button className="rm-cta">Order now · {RESTAURANT.phone}</button>
        <p>Delivery available · Please tell us about any allergies</p>
      </footer>
    </div>
  );
}