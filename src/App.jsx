import { useState, useRef, useEffect } from "react";
import fireVideo from "../../AQMDLImyA-wZot1HjG-ScsX3MLazkYM9bBhbwXuX-GdRjFO6K9ltq489vtXgyNn8useEc8vQVhrbJfgXD1vNxeqao70nEo9LiDjXH52Y4Q.mp4";

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
.rm{position:relative;isolation:isolate;--maroon:#3a060b;--maroon2:#5b0f14;--ember:#ff6a13;--gold:#ffc21a;--cream:#fff3e0;--mute:#e7bfa5;--line:#ffffff2b;
  min-height:100vh;color:var(--cream);font-family:'Inter',system-ui,sans-serif;
  background:radial-gradient(90rem 50rem at 50% -10%,#7a1a14 0%,var(--maroon2) 35%,var(--maroon) 75%,#210306 100%);
  overflow-x:hidden}
.rm *{box-sizing:border-box}
.rm-hero{position:relative;text-align:center;padding:1rem 1.25rem 4.5rem;overflow:hidden}
.rm-vfire{position:fixed;inset:0;z-index:-1;display:flex;pointer-events:none;mix-blend-mode:screen}
.rm-shade{position:fixed;inset:0;z-index:-1;pointer-events:none;background:linear-gradient(180deg,#2a040080 0%,#2a040020 45%,#2a040099 100%)}
.rm-vfire video{flex:1.35 1 0;min-width:0;height:100%;margin:0 -5%;object-fit:cover;object-position:50% 100%;
  filter:brightness(1.45) saturate(1.3) contrast(1.08);
  -webkit-mask-image:linear-gradient(90deg,transparent,#000 22%,#000 78%,transparent);mask-image:linear-gradient(90deg,transparent,#000 22%,#000 78%,transparent)}
.rm-hero.vid{min-height:min(90vh,760px);display:flex;flex-direction:column;align-items:center;justify-content:center;padding-bottom:5rem}
.rm-hero.vid .rm-title{color:#fff3e0;-webkit-text-stroke:0;text-shadow:0 4px 34px #000c,0 0 46px #ff6a1388}
.rm-flame{position:relative;display:inline-block;margin:4.5rem .5rem 0;padding:0 1.2rem}
.rm-fire{position:absolute;left:-8%;right:-8%;top:-70%;bottom:-20%;pointer-events:none;z-index:0}
.rm-fire canvas,.rm-fire video{width:100%;height:100%;display:block;object-fit:cover}
.rm-fire video{mix-blend-mode:screen}
.rm-hero>*{position:relative;z-index:1}
.rm-kicker{font-family:'Oswald',sans-serif;letter-spacing:.35em;text-transform:uppercase;color:var(--gold);font-size:.85rem;margin:3rem 0 0}
.rm-title{position:relative;z-index:2;font-family:'Bebas Neue','Oswald',Impact,sans-serif;font-size:clamp(4rem,15vw,9.5rem);line-height:.9;margin:0;
  color:#2a0407;-webkit-text-stroke:1.5px #ffe2a888;text-shadow:0 0 18px #ffd27a66}
.rm-sub{font-family:'Bebas Neue',Impact,sans-serif;font-size:clamp(1.6rem,5vw,2.6rem);letter-spacing:.12em;margin:.2rem 0 0;color:var(--cream)}
.rm-meta{margin:1.3rem auto 0;color:var(--mute);font-size:.95rem}

.rm-nav{position:sticky;top:0;z-index:20;background:#2a0407b8;backdrop-filter:blur(10px);border-bottom:1px solid var(--line);
  display:flex;gap:.5rem;overflow-x:auto;padding:.7rem 1rem;justify-content:center;scrollbar-width:none}
.rm-nav::-webkit-scrollbar{display:none}
.rm-tab{flex:none;font-family:'Oswald',sans-serif;text-transform:uppercase;letter-spacing:.1em;font-size:.9rem;font-weight:500;
  color:var(--cream);background:transparent;border:1px solid var(--line);border-radius:999px;padding:.5rem 1.1rem;cursor:pointer;transition:.2s}
.rm-tab:hover{border-color:var(--ember)}
.rm-tab[aria-selected="true"]{background:linear-gradient(90deg,var(--ember),var(--gold));color:#2a0407;border-color:transparent;font-weight:600}
.rm-tab:focus-visible,.rm-cta:focus-visible{outline:3px solid var(--gold);outline-offset:3px}

.rm-wrap{max-width:1040px;margin:0 auto;padding:2.5rem 1.5rem 3rem;background:#210306a8;backdrop-filter:blur(6px);border-radius:26px}
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
@media (prefers-reduced-motion:reduce){.rm-fade{animation:none}}
`;

/* Set to "" to use the built-in code-drawn fire instead. */
const FIRE_VIDEO = fireVideo;

const FRAG = `
precision mediump float;
uniform vec2 r; uniform float t;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
  return mix(mix(h(i),h(i+vec2(1.,0.)),f.x),mix(h(i+vec2(0.,1.)),h(i+vec2(1.,1.)),f.x),f.y);}
float fbm(vec2 p){float a=.5,s=0.;for(int i=0;i<6;i++){s+=a*n(p);p=p*2.1+vec2(1.7,9.2);a*=.52;}return s;}
void main(){
  vec2 uv=gl_FragCoord.xy/r; float asp=r.x/r.y;
  vec2 p=vec2(uv.x*asp*3.2,uv.y*1.6);
  float w1=fbm(p*vec2(.9,.6)+vec2(0.,-t*.55));
  float w2=fbm(p*vec2(1.7,.9)+vec2(5.2,-t*.9));
  vec2 q=vec2(p.x+(w1-.5)*1.1+(w2-.5)*.5,p.y-t*1.7);
  float f=fbm(q*vec2(1.25,.55));
  float fine=fbm(q*vec2(3.4,1.4)+vec2(0.,-t*.6));
  float fl=.96+.08*n(vec2(t*8.,2.));
  float side=smoothstep(0.,.12,uv.x)*smoothstep(1.,.88,uv.x);
  float base=pow(max(1.-uv.y,0.),.8)*1.7;
  float i=(f*1.2+fine*.35+base-1.1)*fl;
  i*=.55+.45*side;
  i=clamp(i,0.,1.5);
  vec3 c=vec3(1.4*i,1.15*i*i*i+.1*i*i,.55*pow(i,5.));
  float a=smoothstep(.05,.3,i);
  float gA=smoothstep(-.45,.1,i)*.55*side;
  vec3 col=c*a+vec3(.75,.1,.03)*gA*(1.-a);
  float al=a+gA*(1.-a);
  gl_FragColor=vec4(min(col,1.),al);
}`;

function FireVideo() {
  const refs = useRef([]);
  useEffect(() => {
    const starts = [0, 0.35, 0.7];
    const playAll = () => refs.current.forEach((v) => v && v.play().catch(() => {}));
    refs.current.forEach((v, i) => {
      if (!v) return;
      v.muted = true;
      const go = () => { v.currentTime = (v.duration || 14) * starts[i]; v.play().catch(() => {}); };
      if (v.readyState > 0) go(); else v.addEventListener("loadedmetadata", go, { once: true });
    });
    /* some browsers wait for a first touch/scroll before autoplay */
    ["pointerdown", "scroll", "keydown"].forEach((e) => window.addEventListener(e, playAll, { once: true, passive: true }));
    return () => ["pointerdown", "scroll", "keydown"].forEach((e) => window.removeEventListener(e, playAll));
  }, []);
  return (
    <>
      <div className="rm-vfire" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <video key={i} ref={(el) => (refs.current[i] = el)} src={FIRE_VIDEO} autoPlay muted loop playsInline preload="auto"
                 style={i === 1 ? { transform: "scaleX(-1)" } : undefined} />
        ))}
      </div>
      <div className="rm-shade" aria-hidden="true" />
    </>
  );
}

function FireBackground() {
  const ref = useRef(null);
  useEffect(() => {
    if (FIRE_VIDEO) return;
    const cv = ref.current;
    const gl = cv && cv.getContext("webgl", { alpha: true, premultipliedAlpha: true });
    if (!gl) return;
    const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const pr = gl.createProgram();
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, "attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}"));
    gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(pr); gl.useProgram(pr);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pr, "a");
    gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uR = gl.getUniformLocation(pr, "r"), uT = gl.getUniformLocation(pr, "t");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t0 = performance.now();
    let raf;
    const draw = (now) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.floor(cv.clientWidth * dpr), h = Math.floor(cv.clientHeight * dpr);
      if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; }
      gl.viewport(0, 0, w, h); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(uR, w, h); gl.uniform1f(uT, still ? 3 : (now - t0) / 1000);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (!still) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div className="rm-fire" aria-hidden="true">
      {FIRE_VIDEO ? <video src={FIRE_VIDEO} autoPlay muted loop playsInline /> : <canvas ref={ref} />}
    </div>
  );
}

export default function RestaurantMenu() {
  const [active, setActive] = useState("pizzas");
  const section = MENU.find((s) => s.id === active);

  return (
    <div className="rm">
      <style>{CSS}</style>
      {FIRE_VIDEO && <FireVideo />}

      <header className={"rm-hero" + (FIRE_VIDEO ? " vid" : "")}>
        <p className="rm-kicker">Flame-grilled · Fresh daily</p>
        <div className="rm-flame">{!FIRE_VIDEO && <FireBackground />}
          <h1 className="rm-title">{RESTAURANT.name}</h1></div>
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