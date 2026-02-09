function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState,
  useEffect,
  useCallback,
  useRef
} = React;

/* ═══════════════════════════════════════════════════════════════
   🌿 AMMA 30-DAY TRACKER — Ultimate Edition
   Every pixel with love. Every feature with purpose.
   ═══════════════════════════════════════════════════════════════ */

// ─── INJECT ANIMATIONS ──────────────────────────────────────
const sid = "amma-ult-v1";
if (typeof document !== "undefined" && !document.getElementById(sid)) {
  const st = document.createElement("style");
  st.id = sid;
  st.textContent = `
    @keyframes aFadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
    @keyframes aSlideR{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}
    @keyframes aSlideL{from{opacity:0;transform:translateX(-20px)}to{opacity:1;transform:translateX(0)}}
    @keyframes aPop{0%{transform:scale(0.85)}50%{transform:scale(1.08)}100%{transform:scale(1)}}
    @keyframes aPulse{0%,100%{opacity:1}50%{opacity:0.55}}
    @keyframes aConfetti{0%{transform:translateY(0) rotate(0);opacity:1}100%{transform:translateY(350px) rotate(720deg);opacity:0}}
    @keyframes aBreathe{0%,100%{transform:scale(1);opacity:0.55}50%{transform:scale(1.4);opacity:1}}
    @keyframes aFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
    @keyframes aShimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
    @keyframes aDrop{0%{transform:translateY(-20px) scale(0);opacity:0}60%{transform:translateY(2px) scale(1.1);opacity:1}100%{transform:translateY(0) scale(1);opacity:1}}
    @keyframes aWave{0%,100%{transform:translateX(0)}50%{transform:translateX(-10px)}}
    @keyframes aGlow{0%,100%{box-shadow:0 0 8px rgba(34,197,94,0.3)}50%{box-shadow:0 0 20px rgba(34,197,94,0.6)}}
    @keyframes aSpin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
    @keyframes aFireGlow{0%,100%{text-shadow:0 0 4px rgba(245,158,11,0.3)}50%{text-shadow:0 0 16px rgba(245,158,11,0.7),0 0 30px rgba(239,68,68,0.3)}}
    .a-card{animation:aFadeUp 0.35s ease both}
    .a-pop{animation:aPop 0.25s ease}
    .a-ns::-webkit-scrollbar{display:none}.a-ns{scrollbar-width:none}
    input[type=range]{-webkit-appearance:none;height:6px;border-radius:3px;background:#e5e7eb;outline:none}
    input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:24px;height:24px;border-radius:12px;background:#22c55e;border:3px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.15);cursor:pointer}
  `;
  document.head.appendChild(st);
}

// ─── 30-DAY MEAL DATA ───────────────────────────────────────
const ML_DATA = [{
  d: 1,
  p: 0,
  b: {
    ta: "இட்லி+சாம்பார்+முட்டை",
    en: "Idli + Sambar + Boiled Egg",
    time: "7:30",
    port: "2 idlis + 1 cup sambar + 1 egg",
    cal: 290,
    prot: 16,
    carb: 42,
    fat: 8,
    fib: 4,
    prep: 10,
    cook: 20,
    diff: "Easy",
    htip: "இட்லி fermented — gut-friendly probiotics! முட்டை = 6g protein, joints-க்கு நல்லது",
    sw: ["தோசை 2+சாம்பார்+முட்டை", "இட்லி 2+flax சட்னி"],
    ing: ["இட்லி மாவு — 1 cup (store-bought OK)", "துவரம்பருப்பு — ½ cup", "பாசிப்பருப்பு — 2 tbsp", "சாம்பார் பொடி — 1.5 tsp", "தக்காளி — 1 (chopped)", "வெங்காயம் — 1 சிறிய (chopped)", "முருங்கை or பீன்ஸ் — ½ cup", "புளி — நெல்லிக்காய் size", "கடுகு — ½ tsp, கறிவேப்பிலை — 1 sprig", "நல்லெண்ணெய் — 1 tsp", "முட்டை — 1", "மஞ்சள் — ¼ tsp, உப்பு"],
    steps: ["இட்லி மாவு ready-யா check பண்ணுங்க. Moulds-ல oil தடவி, மாவு ஊற்றி, idli plate-ல வைங்க", "Cooker-ல 2 cups water கொதிக்கவை. Plate வை, 10-12 min steam பண்ணுங்க. Fork-ல குத்தி clean-ஆ வந்தா ready!", "சாம்பார்: துவரம்+பாசிப்பருப்பு wash பண்ணி, 2 cups water, ¼ tsp மஞ்சள் சேர்த்து pressure cook — 3 whistles", "புளி-ய warm water-ல 10 min ஊறவை, பிழிஞ்சு juice எடுங்க", "Cooker open ஆனதும், புளி juice, நறுக்கின தக்காளி, வெங்காயம், காய்கறி, சாம்பார் பொடி, உப்பு சேருங்க. 8-10 min boil பண்ணுங்க", "தாளி: 1 tsp oil-ல கடுகு பொரி, கறிவேப்பிலை சேர், சாம்பார்-ல கொட்டுங்க", "முட்டை: பாத்திரத்தில் water, முட்டை போடுங்க. Boil ஆனதும் 8 min வை. Cold water-ல போடுங்க, easy-ஆ உரியும்", "இட்லி + சாம்பார் + boiled egg serve பண்ணுங்க! 🍽️"]
  },
  l: {
    ta: "சாம்பார் சாதம்+பீன்ஸ்+மோர்",
    en: "Sambar Rice + Beans Poriyal + Buttermilk",
    time: "12:30",
    port: "¾ cup rice + 1.5 cups sambar + 1 cup poriyal + 1 glass buttermilk",
    cal: 450,
    prot: 18,
    carb: 58,
    fat: 7,
    fib: 6,
    prep: 10,
    cook: 15,
    diff: "Easy",
    htip: "பீன்ஸ் = fiber rich, sugar control-க்கு நல்லது. தேங்காய் = healthy fat",
    sw: ["சாம்பார்+கேரட் பொரியல்", "ரசம் சாதம்+பீன்ஸ்"],
    ing: ["சாதம் — ¾ cup (cooked)", "காலை சாம்பார் மீதி — 1.5 cup", "பீன்ஸ் — 1 cup (1 inch pieces)", "தேங்காய் துருவல் — 2 tbsp", "கடுகு — ½ tsp", "உளுந்து — ½ tsp", "காய்ந்த மிளகாய் — 1", "கறிவேப்பிலை — 1 sprig", "நல்லெண்ணெய் — 1 tsp", "உப்பு — taste-க்கு"],
    steps: ["பீன்ஸ் நறுக்குங்க — 1 inch pieces. Tips நீக்கிட்டு wash பண்ணுங்க", "Kadai-ல 1 tsp oil சூடாக்குங்க. கடுகு போடுங்க — பொரியட்டும்", "உளுந்து, காய்ந்த மிளகாய், கறிவேப்பிலை சேர்த்து 10 sec வதக்குங்க", "பீன்ஸ் சேருங்க, ¼ tsp உப்பு, 2 tbsp water தெளிங்க. மூடி போடுங்க", "Medium flame-ல 8-10 min வேகவிடுங்க. இடையில் கிளறுங்க — பீன்ஸ் crunchy-ஆ இருக்கணும், mushy ஆகக்கூடாது", "தேங்காய் துருவல் தூவி, 1 min கிளறி இறக்குங்க", "சூடான சாதம் + காலை மீதி சாம்பார் + பீன்ஸ் பொரியல் serve! 🍚"]
  },
  s: {
    ta: "முளை பாசிப்பயிறு சுண்டல்",
    en: "Sprouted Moong Sundal",
    time: "4:30",
    port: "¾ cup sundal",
    cal: 140,
    prot: 10,
    carb: 20,
    fat: 2,
    fib: 5,
    prep: 480,
    cook: 15,
    diff: "Easy (advance soak)",
    htip: "முளைகட்டின பயிறு = 3x more nutrients! Vitamin C, iron, folate rich",
    sw: ["கொண்டைக்கடலை சுண்டல்", "மோர்+5 பாதாம்"],
    ing: ["பாசிப்பயிறு — ½ cup (முளை கட்டியது)", "கடுகு — ½ tsp", "உளுந்து — ½ tsp", "கறிவேப்பிலை — 1 sprig", "பச்சை மிளகாய் — 1 (optional)", "தேங்காய் துருவல் — 1 tbsp", "எலுமிச்சை — ½ (juice)", "நல்லெண்ணெய் — ½ tsp", "உப்பு — taste-க்கு"],
    steps: ["முன் நாள் இரவு: பாசிப்பயிறு wash பண்ணி, 2 cups water-ல ஊறவையுங்க (8 hrs)", "காலை: water வடி, wet cloth-ல wrap பண்ணி, warm place-ல வையுங்க. மாலைக்கு முளை வரும்!", "முளை பயிறு-ல 1.5 cups water சேர், ¼ tsp உப்பு, 10 min boil பண்ணுங்க. Soft-ஆ ஆனா drain பண்ணுங்க", "Kadai-ல ½ tsp oil, கடுகு+உளுந்து பொரிக்குங்க", "கறிவேப்பிலை, பச்சை மிளகாய் (விரும்பினா) சேருங்க", "வேகவைத்த பயிறு சேர், 2 min கிளறுங்க", "இறக்கி, எலுமிச்சை juice பிழிஞ்சு, தேங்காய் தூவி serve! 🌱"]
  },
  n: {
    ta: "இட்லி+சாம்பார் Light",
    en: "Idli + Sambar (Light)",
    time: "7:30",
    port: "2 idlis + 1 cup sambar",
    cal: 250,
    prot: 10,
    carb: 40,
    fat: 4,
    fib: 3,
    prep: 5,
    cook: 12,
    diff: "Easy",
    htip: "இரவு light-ஆ சாப்பிடுங்க — digestion easy, நல்ல தூக்கம்",
    sw: ["தயிர் சாதம் ½ cup", "காய்கறி சூப்"],
    ing: ["இட்லி மாவு — ¾ cup", "காலை சாம்பார் மீதி — 1 cup", "(புதிதா பண்ண வேண்டாம்!)"],
    steps: ["காலை சாம்பார் மீதி-ய reheat பண்ணுங்க — medium flame-ல, கொதிக்கும் வரை", "இட்லி: காலை same method — moulds-ல oil, மாவு ஊற்று, 10-12 min steam", "சூடா serve பண்ணுங்க. இரவு எண்ணெய் தவிர்க்கலாம், சாம்பார் already tasty!", "💡 Tip: இரவு 8 PM-க்குள் சாப்பிட்டு முடிங்க — weight loss-க்கு முக்கியம்!"]
  },
  tip: {
    ta: "சாம்பார்: துவரம்+பாசி பருப்பு, 1 tsp oil மட்டும்",
    en: "Mix dals, only 1 tsp oil"
  },
  f: 0
}, {
  d: 2,
  p: 0,
  b: {
    ta: "ஓட்ஸ் உப்மா+மோர்",
    en: "Oats Upma + Buttermilk",
    time: "7:30",
    port: "1 cup oats upma + 1 glass buttermilk",
    cal: 250,
    prot: 11,
    carb: 40,
    fat: 5,
    fib: 4,
    prep: 5,
    cook: 10,
    diff: "Easy",
    htip: "Oats = beta-glucan fiber, cholesterol குறைக்கும். மோர் = probiotic, cooling",
    sw: ["ரவா உப்மா+மோர்", "பொங்கல் ¾ cup"],
    ing: ["ஓட்ஸ் — ¾ cup (regular, not instant)", "வெங்காயம் — 1 சிறிய (fine chop)", "கேரட் — 1 சிறிய (fine chop)", "பீன்ஸ் — 4-5 (fine chop)", "இஞ்சி — 1 inch piece (grated)", "பச்சை மிளகாய் — 1 (slit)", "கடுகு — ½ tsp, உளுந்து — ½ tsp", "கறிவேப்பிலை — 1 sprig", "நல்லெண்ணெய் — 1 tsp", "உப்பு — ½ tsp", "Water — 1.5 cups", "மோர்: தயிர் ¼ cup, water ¾ cup, உப்பு, சீரகம்"],
    steps: ["முதலில் oats-ஐ dry kadai-ல 2 min வறுங்க. Medium flame, தொடர்ந்து கிளறுங்க — light brown நிறம் வரும், நல்ல வாசனை வரும். தனியா எடுத்து வையுங்க", "அதே kadai-ல 1 tsp oil சூடாக்குங்க. கடுகு போடுங்க — பொரியட்டும்", "உளுந்து, கறிவேப்பிலை, பச்சை மிளகாய், grated இஞ்சி சேருங்க — 30 sec வதக்குங்க", "வெங்காயம் சேர், transparent ஆகும் வரை 2 min வதக்குங்க", "கேரட் + பீன்ஸ் சேர், 1 min கிளறுங்க", "1.5 cups water + உப்பு சேர், boil-க்கு கொண்டு வாங்க", "வறுத்த oats சேர், நன்கு கிளறுங்க. Flame குறையுங்க. 2-3 min-ல water absorb ஆகும்", "மூடி போட்டு 2 min steam-ல வேகட்டும். Open பண்ணி கிளறி serve!", "மோர்: தயிர் + water + உப்பு + ½ tsp சீரகப்பொடி — mixer-ல 30 sec அல்லது whisk பண்ணுங்க 🥛"]
  },
  l: {
    ta: "சாதம்+பருப்பு+பொரியல்+அப்பளம்+மோர்",
    en: "Rice + Paruppu + Poriyal + Appalam + Buttermilk",
    time: "12:30",
    port: "¾ cup rice + ¾ cup thick dal + 1 cup cabbage poriyal + 1 small appalam + 1 glass buttermilk",
    cal: 440,
    prot: 18,
    carb: 72,
    fat: 9,
    fib: 4,
    prep: 10,
    cook: 20,
    diff: "Easy",
    htip: "முட்டைகோஸ் = Vitamin C rich, anti-inflammatory — மூட்டு வலிக்கு நல்லது!",
    sw: ["சாதம்+பருப்பு+பீன்ஸ்", "சாதம்+பருப்பு+வெண்டைக்காய்"],
    ing: ["அரிசி — ½ cup (raw)", "துவரம்பருப்பு — ½ cup", "மஞ்சள் — ¼ tsp", "பூண்டு — 3 பல்", "நெய் — ½ tsp", "முட்டைகோஸ் — 2 cups (shredded)", "தேங்காய் துருவல் — 2 tbsp", "கடுகு — ½ tsp, உளுந்து — ½ tsp", "காய்ந்த மிளகாய் — 1", "நல்லெண்ணெய் — 1 tsp", "உப்பு — taste-க்கு"],
    steps: ["அரிசி wash பண்ணி, 1:2 ratio water-ல cooker-ல வையுங்க — 2 whistles", "துவரம்பருப்பு wash பண்ணி, 2 cups water, மஞ்சள், பூண்டு சேர்த்து pressure cook — 3 whistles. Open ஆனதும் whisk பண்ணி smooth ஆக்குங்க, ½ tsp நெய்+உப்பு சேருங்க", "முட்டைகோஸ் பொரியல்: Kadai-ல 1 tsp oil, கடுகு பொரிக்குங்க", "உளுந்து+காய்ந்த மிளகாய் சேர், 10 sec", "Shredded முட்டைகோஸ் சேருங்க + ¼ tsp உப்பு. Medium flame-ல 5-6 min வதக்குங்க — அடிக்கடி கிளறுங்க", "முட்டைகோஸ் soft ஆனா (but not mushy), தேங்காய் தூவி, 1 min கிளறி இறக்குங்க", "சூடான சாதம் + பருப்பு + முட்டைகோஸ் பொரியல் serve! 🍚"]
  },
  s: {
    ta: "மோர்+5 பாதாம்",
    en: "Buttermilk + 5 Almonds",
    time: "4:30",
    port: "1 tall glass buttermilk + 5 soaked almonds",
    cal: 120,
    prot: 7,
    carb: 18,
    fat: 2,
    fib: 2,
    prep: 2,
    cook: 0,
    diff: "No cooking!",
    htip: "பாதாம் = Vitamin E + healthy fats. ஊறவைத்த பாதாம் = better digestion",
    sw: ["கொய்யா+3 வால்நட்", "Green tea+2 பேரிச்சை"],
    ing: ["தயிர் — ¼ cup", "Water — ¾ cup", "உப்பு — 1 pinch", "சீரகப்பொடி — ½ tsp", "கொத்தமல்லி — சிறிதளவு (optional)", "பாதாம் — 5 (overnight soaked preferred)"],
    steps: ["தயிர் + water + உப்பு + சீரகப்பொடி — mixer-ல 30 sec blend பண்ணுங்க (or whisk well)", "Optional: கொத்தமல்லி சிறிதளவு தூவுங்க", "5 பாதாம் ஊறவைத்து இருந்தா, தோல் உரிங்க — easy to digest", "மோர் குடிங்க + பாதாம் மெதுவா சாப்பிடுங்க. Snack done! 🥛", "💡 Tip: பாதாம்-ய முதல் நாள் இரவே water-ல போடுங்க"]
  },
  n: {
    ta: "தயிர் சாதம்+ஊறுகாய்",
    en: "Curd Rice (Small) + Pickle",
    time: "7:30",
    port: "½ cup rice + ½ cup curd + tiny pickle",
    cal: 230,
    prot: 8,
    carb: 38,
    fat: 5,
    fib: 4,
    prep: 5,
    cook: 0,
    diff: "No cooking!",
    htip: "தயிர் சாதம் = probiotic powerhouse! Gut health + cooling + easy digest",
    sw: ["ரசம் சாதம்", "இட்லி 2+சாம்பார்"],
    ing: ["சாதம் — ½ cup (cooked, cooled)", "தயிர் — ½ cup (fresh)", "பால் — 2 tbsp", "கேரட் — 1 small (grated)", "வெள்ளரிக்காய் — 2 tbsp (fine chop)", "கடுகு — ¼ tsp", "உளுந்து — ¼ tsp", "கறிவேப்பிலை — few leaves", "பச்சை மிளகாய் — 1 (fine chop)", "நல்லெண்ணெய் — ½ tsp", "உப்பு — taste-க்கு", "ஊறுகாய் — 1 tsp (side)"],
    steps: ["Cooked சாதம் சிறிது மசிங்க — fully mash வேண்டாம், சிறிது texture இருக்கட்டும்", "தயிர் + 2 tbsp பால் சேர், நன்கு கலக்குங்க — creamy-ஆ இருக்கணும்", "Grated கேரட் + வெள்ளரிக்காய் சேர்த்து mix பண்ணுங்க", "தாளி: ½ tsp oil-ல கடுகு, உளுந்து, கறிவேப்பிலை, பச்சை மிளகாய் — 30 sec", "தாளி-ய சாதத்தில் கொட்டி, உப்பு சேர்த்து mix!", "Side-ல 1 tsp ஊறுகாய் வையுங்க. Cool-ஆ serve! ❄️", "💡 Tip: Fridge-ல வைக்காதீங்க — room temp best for curd rice"]
  },
  tip: {
    ta: "Oats-ஐ 2 min வறுத்து காய்கறி சேருங்க",
    en: "Dry roast oats, add veggies"
  },
  f: 0
}, {
  d: 3,
  p: 0,
  b: {
    ta: "இட்லி+சாம்பார்+முட்டை",
    en: "Idli + Sambar + Boiled Egg",
    time: "7:30",
    port: "2 idlis + 1 cup sambar + 1 egg",
    cal: 290,
    prot: 16,
    carb: 43,
    fat: 6,
    fib: 4,
    prep: 10,
    cook: 20,
    diff: "Easy",
    htip: "Day 1 recipe same — routine ஆக்குங்க! Consistency = success 💪",
    sw: ["தோசை 2+முட்டை", "இட்லி 2+flax சட்னி"],
    ing: ["இட்லி மாவு — 1 cup", "சாம்பார்: துவரம்பருப்பு ½ cup, சாம்பார் பொடி 1.5 tsp, புளி, காய்கறி", "முட்டை — 1", "(Day 1 recipe-ய பாருங்க — same method!)"],
    steps: ["இட்லி மாவு ready-யா check பண்ணுங்க. Moulds-ல oil தடவி, மாவு ஊற்றி, idli plate-ல வைங்க", "Cooker-ல 2 cups water கொதிக்கவை. Plate வை, 10-12 min steam பண்ணுங்க. Fork-ல குத்தி clean-ஆ வந்தா ready!", "சாம்பார்: துவரம்+பாசிப்பருப்பு wash பண்ணி, 2 cups water, ¼ tsp மஞ்சள் சேர்த்து pressure cook — 3 whistles", "புளி-ய warm water-ல 10 min ஊறவை, பிழிஞ்சு juice எடுங்க", "Cooker open ஆனதும், புளி juice, நறுக்கின தக்காளி, வெங்காயம், காய்கறி, சாம்பார் பொடி, உப்பு சேருங்க. 8-10 min boil பண்ணுங்க", "தாளி: 1 tsp oil-ல கடுகு பொரி, கறிவேப்பிலை சேர், சாம்பார்-ல கொட்டுங்க", "முட்டை: பாத்திரத்தில் water, முட்டை போடுங்க. Boil ஆனதும் 8 min வை. Cold water-ல போடுங்க, easy-ஆ உரியும்", "இட்லி + சாம்பார் + boiled egg serve பண்ணுங்க! 🍽️"]
  },
  l: {
    ta: "முருங்கை சாம்பார்+பீட்ரூட்+ரசம்",
    en: "Rice + Drumstick Sambar + Beetroot Poriyal + Rasam",
    time: "12:30",
    port: "¾ cup rice + 1 cup sambar + 1 cup beet poriyal + 1 cup rasam",
    cal: 440,
    prot: 17,
    carb: 73,
    fat: 9,
    fib: 4,
    prep: 15,
    cook: 25,
    diff: "Medium",
    htip: "முருங்கை = calcium + anti-inflammatory! பீட்ரூட் = iron, blood pressure control",
    sw: ["முருங்கை+கேரட்", "கத்தரிக்காய் சாம்பார்"],
    ing: ["துவரம்பருப்பு — ½ cup", "முருங்கை — 2 sticks (3 inch pieces)", "சாம்பார் பொடி — 1.5 tsp", "புளி — நெல்லிக்காய் size", "தக்காளி — 1", "வெங்காயம் — 1 சிறிய", "மஞ்சள் — ¼ tsp", "நல்லெண்ணெய் — 1 tsp", "கடுகு, கறிவேப்பிலை", "பீட்ரூட் — 1 medium (grated)", "தேங்காய் துருவல் — 1 tbsp", "உப்பு — taste-க்கு"],
    steps: ["துவரம்பருப்பு + 2 cups water + மஞ்சள் — pressure cook 3 whistles", "முருங்கை: sticks-ஐ 3 inch pieces-ஆ cut பண்ணுங்க. புளி water-ல ஊறவையுங்க", "Kadai-ல 1 tsp oil, கடுகு பொரி, வெங்காயம்+தக்காளி 3 min வதக்குங்க", "முருங்கை pieces சேர், 2 tbsp water, மூடி போட்டு 5 min cook", "வெந்த பருப்பு + புளி juice + சாம்பார் பொடி + உப்பு சேர். 10 min boil", "கறிவேப்பிலை தூவி இறக்குங்க", "பீட்ரூட் பொரியல்: 1 tsp oil-ல கடுகு தாளி, grated பீட்ரூட் சேர், ¼ tsp உப்பு", "மூடி போட்டு 8 min medium flame — கிளறி, தேங்காய் தூவி serve! 🥗"]
  },
  s: {
    ta: "கொய்யா+3 வால்நட்",
    en: "Guava + 3 Walnuts",
    time: "4:30",
    port: "1 medium guava + 3 walnut halves",
    cal: 130,
    prot: 5,
    carb: 21,
    fat: 3,
    fib: 2,
    prep: 2,
    cook: 0,
    diff: "No cooking!",
    htip: "கொய்யா = Vitamin C queen! 1 கொய்யா > 3 orange. வால்நட் = omega-3 brain food",
    sw: ["ஆப்பிள்+5 பாதாம்", "பப்பாளி+flax"],
    ing: ["கொய்யா — 1 medium (ripe)", "வால்நட் — 3 pieces", "சாட் மசாலா — 1 pinch (optional)"],
    steps: ["கொய்யா wash பண்ணி, 4-6 pieces-ஆ cut பண்ணுங்க", "விரும்பினா சாட் மசாலா + little உப்பு தூவுங்க", "வால்நட் 3 pieces-உடன் slowly சாப்பிடுங்க — நன்கு மென்று சாப்பிடுங்க! 🍈", "💡 Tip: கொய்யா விதை-யும் சாப்பிடலாம் — extra fiber!"]
  },
  n: {
    ta: "காய்கறி சூப்+சப்பாத்தி",
    en: "Vegetable Soup + 1 Chapati",
    time: "7:30",
    port: "1.5 cups thick veg soup + 1 small chapati",
    cal: 220,
    prot: 8,
    carb: 38,
    fat: 4,
    fib: 4,
    prep: 10,
    cook: 20,
    diff: "Easy",
    htip: "சூப் = low calorie, filling. மிளகு+மஞ்சள் = natural painkiller for joints! 🦵",
    sw: ["இட்லி 2+சாம்பார்", "ரசம் சாதம்"],
    ing: ["கேரட் — 1 (chopped)", "பீன்ஸ் — 6-8 (chopped)", "முட்டைகோஸ் — 1 cup (chopped)", "தக்காளி — 1 (chopped)", "மிளகு — ½ tsp (crushed)", "மஞ்சள் — ¼ tsp", "பூண்டு — 2 பல் (crushed)", "வெண்ணெய் — ½ tsp (optional)", "கொத்தமல்லி — garnish", "உப்பு — taste-க்கு", "கோதுமை மாவு — ¼ cup (for 1 chapati)", "Water — 3 cups"],
    steps: ["எல்லா காய்கறிகளையும் small pieces-ஆ நறுக்குங்க", "பாத்திரத்தில் 3 cups water + எல்லா காய்கறி + பூண்டு + மஞ்சள் — boil-க்கு கொண்டு வாங்க", "Medium flame-ல 15 min வேகவிடுங்க — காய்கறி fully soft ஆகணும்", "பாதி காய்கறி-ய ladle-ல எடுத்து mash பண்ணுங்க (or half blend). மீதி chunky-ஆ இருக்கட்டும்", "Crushed மிளகு + உப்பு சேர், 2 min boil. கொத்தமல்லி தூவுங்க", "சப்பாத்தி: ¼ cup கோதுமை மாவு + water — soft dough பிசையுங்க. 5 min rest", "சிறிய உருண்டை — thin-ஆ roll பண்ணுங்க. Hot tawa-ல போடுங்க — bubble வரும்போது திருப்புங்க", "Both sides-ம் brown spots வரணும். Oil இல்லாம dry roast-ே போதும்!", "சூடான சூப் + சப்பாத்தி serve. இரவு ideal meal! 🍜"]
  },
  tip: {
    ta: "சூப்: காய்கறி boil, பாதி blend, மிளகு+மஞ்சள்",
    en: "Boil veggies, blend half, add pepper+turmeric"
  },
  f: 0
}, {
  d: 4,
  p: 0,
  b: {
    ta: "ராகி தோசை+தக்காளி சட்னி",
    en: "Ragi Dosa + Tomato Chutney",
    time: "7:30",
    port: "2 ragi dosas + 2 tbsp tomato chutney",
    cal: 260,
    prot: 10,
    carb: 44,
    fat: 5,
    fib: 4,
    prep: 35,
    cook: 15,
    diff: "Medium",
    htip: "ராகி = calcium queen! 344mg/100g — milk-ஐ விட அதிகம்! Bones+joints strong 🦴",
    sw: ["ராகி இட்லி 3", "தோசை 2+சட்னி"],
    ing: ["ராகி மாவு — ¾ cup", "அரிசி மாவு — ¼ cup", "வெங்காயம் — 1 small (fine chop)", "சீரகம் — ½ tsp", "உப்பு — ½ tsp", "Water — 1+ cups (thin batter)", "நல்லெண்ணெய் — 1 tsp per dosa", "தக்காளி சட்னி: தக்காளி 2, வெங்காயம் ½, காய்ந்த மிளகாய் 2, கடலைப்பருப்பு 1 tbsp"],
    steps: ["Batter: ராகி மாவு + அரிசி மாவு (3:1 ratio) + சீரகம் + உப்பு + fine chopped வெங்காயம் mix", "Water சிறிது சிறிதாக சேர்த்து — dosa batter consistency-ல கலக்குங்க (not too thick, not too thin)", "30 min rest வையுங்க — இது முக்கியம்! Batter settle ஆகும்", "சட்னி: 1 tsp oil-ல கடலைப்பருப்பு golden-ஆ வறுங்க", "தக்காளி + வெங்காயம் + காய்ந்த மிளகாய் சேர், 3 min வதக்குங்க (soft ஆகணும்)", "Cool பண்ணி, mixer-ல grind — smooth paste, உப்பு adjust", "தோசை: Non-stick dosa tawa நன்கு சூடாக்குங்க. Few drops oil தடவுங்க", "Batter ஊற்றி, circular-ஆ spread பண்ணுங்க — thin-ஆ! Medium flame", "1 tsp oil ஓரங்களில் விடுங்க. Bottom golden brown ஆனா — fold பண்ணி serve!", "தக்காளி சட்னி-உடன் சூடா சாப்பிடுங்க! ராகி = calcium powerhouse 💪"]
  },
  l: {
    ta: "மோர் குழம்பு+முருங்கை பொரியல்",
    en: "Rice + Mor Kuzhambu + Drumstick Poriyal",
    time: "12:30",
    port: "¾ cup rice + 1 cup mor kuzhambu + 1 cup drumstick poriyal",
    cal: 410,
    prot: 14,
    carb: 70,
    fat: 8,
    fib: 4,
    prep: 10,
    cook: 20,
    diff: "Medium",
    htip: "மோர் குழம்பு = probiotic + cooling. Summer-க்கு best! Digestion-க்கு நல்லது",
    sw: ["மோர் குழம்பு+பீன்ஸ்", "வெண்டைக்காய் மோர் குழம்பு"],
    ing: ["தயிர் — 1 cup (slightly sour OK)", "தேங்காய் — 2 tbsp (grated)", "பச்சை மிளகாய் — 2", "சீரகம் — 1 tsp", "அரிசி மாவு — 1 tsp (thickener)", "மஞ்சள் — ¼ tsp", "முருங்கை — 2 sticks (3 inch pieces)", "கடுகு — ½ tsp", "உளுந்து — ½ tsp", "கறிவேப்பிலை — 1 sprig", "நல்லெண்ணெய் — 1 tsp", "உப்பு — taste-க்கு"],
    steps: ["தேங்காய் + பச்சை மிளகாய் + சீரகம் — mixer-ல smooth paste-ஆ grind பண்ணுங்க (2 tbsp water சேருங்க)", "தயிர்-ய நன்கு கடையுங்க — smooth, no lumps", "முருங்கை pieces-ஐ 1 cup water-ல 10 min boil பண்ணுங்க — fork-ல soft ஆகணும்", "கடைந்த தயிர் + ground paste + அரிசி மாவு + மஞ்சள் + உப்பு — நன்கு mix", "இந்த mixture-ய முருங்கை water-ல சேருங்க. LOW flame-ல கிளறுங்க", "⚠️ முக்கியம்: தயிர் boil ஆகக்கூடாது! Low flame-ல, தொடர்ந்து கிளறுங்க — 5 min", "Slightly thick ஆனா, fire off", "தாளி: 1 tsp oil, கடுகு+உளுந்து+கறிவேப்பிலை — குழம்பில் கொட்டுங்க", "சூடான சாதம்-ல ஊற்றி சாப்பிடுங்க! Cooling + delicious 🥣"]
  },
  s: {
    ta: "கொண்டைக்கடலை சுண்டல்",
    en: "Chana Sundal",
    time: "4:30",
    port: "½ cup sundal",
    cal: 150,
    prot: 8,
    carb: 23,
    fat: 3,
    fib: 2,
    prep: 480,
    cook: 20,
    diff: "Easy (advance soak)",
    htip: "கொண்டைக்கடலை = protein bomb! 8g per half cup. Iron + folate rich",
    sw: ["முளை சுண்டல்", "வேர்க்கடலை 3 tbsp"],
    ing: ["கொண்டைக்கடலை — ½ cup (8hr soaked)", "தேங்காய் துருவல் — 1 tbsp", "கடுகு — ½ tsp", "உளுந்து — ½ tsp", "காய்ந்த மிளகாய் — 1", "கறிவேப்பிலை — 1 sprig", "நல்லெண்ணெய் — ½ tsp", "உப்பு — taste-க்கு"],
    steps: ["முதல் நாள் இரவு: கொண்டைக்கடலை wash பண்ணி, நிறைய water-ல ஊறவையுங்க (8+ hrs)", "Pressure cooker-ல கடலை + 2 cups fresh water + ¼ tsp உப்பு — 4-5 whistles", "Soft-ஆ வேகணும் but mushy ஆகக்கூடாது. Drain பண்ணுங்க", "Kadai-ல ½ tsp oil, கடுகு பொரி, உளுந்து+காய்ந்த மிளகாய்+கறிவேப்பிலை", "வடித்த கடலை சேர், 2 min medium flame-ல கிளறுங்க", "உப்பு adjust, தேங்காய் துருவல் தூவி serve! 🫘", "💡 Tip: Extra சுண்டல் fridge-ல 2 days keep ஆகும்"]
  },
  n: {
    ta: "இட்லி+சாம்பார் Light",
    en: "Idli + Sambar (Light)",
    time: "7:30",
    port: "2 idlis + 1 cup sambar",
    cal: 250,
    prot: 10,
    carb: 41,
    fat: 5,
    fib: 4,
    prep: 5,
    cook: 12,
    diff: "Easy",
    htip: "Dinner-ல idli = light + easy digest. Late night heavy food = weight gain ⚠️",
    sw: ["தயிர் சாதம்", "கிச்சடி 1 cup"],
    ing: ["இட்லி மாவு — ¾ cup", "காலை சாம்பார் மீதி — 1 cup", "(புதிதா பண்ண வேண்டாம்!)"],
    steps: ["காலை சாம்பார் மீதி-ய reheat பண்ணுங்க — medium flame-ல, கொதிக்கும் வரை", "இட்லி: காலை same method — moulds-ல oil, மாவு ஊற்று, 10-12 min steam", "சூடா serve பண்ணுங்க. இரவு எண்ணெய் தவிர்க்கலாம், சாம்பார் already tasty!", "💡 Tip: இரவு 8 PM-க்குள் சாப்பிட்டு முடிங்க — weight loss-க்கு முக்கியம்!"]
  },
  tip: {
    ta: "ராகி தோசை: 3:1 ராகி:அரிசி, 30 min ஊறவை",
    en: "3:1 ragi:rice flour, rest 30 min"
  },
  f: 0
}, {
  d: 5,
  p: 0,
  b: {
    ta: "இட்லி+ஆளிவிதை சட்னி+சாம்பார்",
    en: "Idli + Flax Chutney + Sambar",
    time: "7:30",
    port: "2 idlis + 2 tbsp flax chutney + ½ cup sambar",
    cal: 260,
    prot: 12,
    carb: 42,
    fat: 5,
    fib: 4,
    prep: 10,
    cook: 15,
    diff: "Easy",
    htip: "ஆளிவிதை = Omega-3 superstar! Joint pain relief + heart health. Daily 1 tbsp enough",
    sw: ["இட்லி+தேங்காய்+முட்டை", "தோசை 2+flax"],
    ing: ["இட்லி மாவு — 1 cup", "ஆளிவிதை (flax seeds) — 2 tbsp", "கடலைப்பருப்பு — 1 tbsp", "காய்ந்த மிளகாய் — 2-3 (adjust spice)", "பூண்டு — 2 பல்", "புளி — சிறிய piece", "நல்லெண்ணெய் — 1 tsp", "உப்பு — taste-க்கு", "சாம்பார் — ½ cup (optional side)"],
    steps: ["காலை சாம்பார் மீதி-ய reheat பண்ணுங்க — medium flame-ல, கொதிக்கும் வரை", "இட்லி: காலை same method — moulds-ல oil, மாவு ஊற்று, 10-12 min steam", "சூடா serve பண்ணுங்க. இரவு எண்ணெய் தவிர்க்கலாம், சாம்பார் already tasty!", "💡 Tip: இரவு 8 PM-க்குள் சாப்பிட்டு முடிங்க — weight loss-க்கு முக்கியம்!"]
  },
  l: {
    ta: "சாம்பார் சாதம்+பீன்ஸ்+மோர்",
    en: "Sambar Rice + Beans Poriyal + Buttermilk",
    time: "12:30",
    port: "¾ cup rice + 1.5 cups sambar + 1 cup poriyal + 1 glass buttermilk",
    cal: 450,
    prot: 18,
    carb: 74,
    fat: 9,
    fib: 4,
    prep: 10,
    cook: 15,
    diff: "Easy",
    htip: "Day 1 lunch recipe! Routine = no decision fatigue = stick to plan easier 💯",
    sw: ["ரசம் சாதம்+கேரட்", "சாம்பார்+அவியல்"],
    ing: ["சாதம் — ¾ cup (cooked)", "காலை சாம்பார் மீதி — 1.5 cup", "பீன்ஸ் — 1 cup (1 inch pieces)", "தேங்காய் துருவல் — 2 tbsp", "கடுகு — ½ tsp", "உளுந்து — ½ tsp", "காய்ந்த மிளகாய் — 1", "கறிவேப்பிலை — 1 sprig", "நல்லெண்ணெய் — 1 tsp", "உப்பு — taste-க்கு"],
    steps: ["பீன்ஸ் நறுக்குங்க — 1 inch pieces. Tips நீக்கிட்டு wash பண்ணுங்க", "Kadai-ல 1 tsp oil சூடாக்குங்க. கடுகு போடுங்க — பொரியட்டும்", "உளுந்து, காய்ந்த மிளகாய், கறிவேப்பிலை சேர்த்து 10 sec வதக்குங்க", "பீன்ஸ் சேருங்க, ¼ tsp உப்பு, 2 tbsp water தெளிங்க. மூடி போடுங்க", "Medium flame-ல 8-10 min வேகவிடுங்க. இடையில் கிளறுங்க — பீன்ஸ் crunchy-ஆ இருக்கணும், mushy ஆகக்கூடாது", "தேங்காய் துருவல் தூவி, 1 min கிளறி இறக்குங்க", "சூடான சாதம் + காலை மீதி சாம்பார் + பீன்ஸ் பொரியல் serve! 🍚"]
  },
  s: {
    ta: "காப்பி+2 பேரிச்சை",
    en: "Filter Coffee (No Sugar) + 2 Dates",
    time: "4:30",
    port: "1 small cup coffee (½ tsp sugar max) + 2 dates",
    cal: 110,
    prot: 2,
    carb: 21,
    fat: 2,
    fib: 2,
    prep: 5,
    cook: 5,
    diff: "Easy",
    htip: "பேரிச்சை = natural sugar + iron + fiber. காப்பி = metabolism boost. ½ tsp sugar MAX!",
    sw: ["Green tea+பேரிச்சை", "மோர்+பாதாம்"],
    ing: ["காப்பி பொடி — 1 tsp", "பால் — ¼ cup", "Water — ½ cup", "சர்க்கரை — ½ tsp MAX (try without!)", "பேரிச்சை — 2 pieces"],
    steps: ["Filter காப்பி: decoction ready பண்ணுங்க (or 1 tsp instant)", "பால் சூடாக்கி, decoction + water mix", "சர்க்கரை ½ tsp only — gradually குறையுங்க, eventually without try பண்ணுங்க", "பேரிச்சை-உடன் slowly enjoy பண்ணுங்க! ☕", "💡 Tip: பேரிச்சை sweet-ஆ இருக்கும், so காப்பி-ல sugar skip try பண்ணுங்க!"]
  },
  n: {
    ta: "ரசம் சாதம்+பொரியல்",
    en: "Rasam Rice + Poriyal",
    time: "7:30",
    port: "½ cup rice + 1.5 cups rasam + 1 cup poriyal",
    cal: 250,
    prot: 8,
    carb: 43,
    fat: 5,
    fib: 4,
    prep: 10,
    cook: 15,
    diff: "Easy",
    htip: "ரசம் = medicinal food! மிளகு+பூண்டு = natural anti-inflammatory 🌶️ Cold/joint pain relief",
    sw: ["இட்லி 2+சாம்பார்", "காய்கறி சூப்"],
    ing: ["தக்காளி — 2 (crushed)", "மிளகு — 1 tsp (coarsely ground)", "பூண்டு — 4 பல் (crushed)", "புளி — சிறிய piece", "ரசம் பொடி — 1.5 tsp", "மஞ்சள் — ¼ tsp", "கொத்தமல்லி — garnish", "கடுகு — ½ tsp", "காய்ந்த மிளகாய் — 1", "நல்லெண்ணெய் — 1 tsp", "உப்பு — taste-க்கு"],
    steps: ["புளி-ய ½ cup warm water-ல 10 min ஊறவை, juice எடுங்க", "தக்காளி-ய hand-ல crush பண்ணுங்க (or rough chop)", "பாத்திரத்தில் புளி juice + crushed தக்காளி + 2 cups water + மஞ்சள் — boil-க்கு கொண்டு வாங்க", "ரசம் பொடி + crushed மிளகு + crushed பூண்டு + உப்பு சேருங்க", "Medium flame-ல 8-10 min boil. நுரை வரும் — ரசம் ready!", "தாளி: 1 tsp oil-ல கடுகு + காய்ந்த மிளகாய். ரசம்-ல கொட்டுங்க", "கொத்தமல்லி தூவி, சூடான சாதம்-ல ஊற்றி serve! 🍜", "💡 Tip: மிளகு அதிகம் போடுங்க — joint pain-க்கு natural medicine!"]
  },
  tip: {
    ta: "Flax சட்னி: ஆளிவிதை+கடலைப்பருப்பு வறுத்து அரை. Omega-3!",
    en: "Roast flax+chana dal, grind. Omega-3!"
  },
  f: 0
}, {
  d: 6,
  p: 0,
  b: {
    ta: "காய்கறி பொங்கல்",
    en: "Vegetable Pongal (small portion)",
    time: "7:30",
    port: "¾ cup ven pongal + sambar",
    cal: 280,
    prot: 10,
    carb: 46,
    fat: 6,
    fib: 4,
    prep: 10,
    cook: 25,
    diff: "Easy",
    htip: "பொங்கல் = comfort food! பாசிப்பருப்பு = easy to digest protein. மிளகு = metabolism boost",
    sw: ["உப்மா", "கிச்சடி"],
    ing: ["அரிசி — ½ cup", "பாசிப்பருப்பு — ¼ cup", "மிளகு — 1 tsp (coarsely crushed)", "சீரகம் — 1 tsp", "இஞ்சி — 1 inch (grated)", "கறிவேப்பிலை — 1 sprig", "நெய் — ½ tsp (just for flavor!)", "முந்திரி — 3-4 pieces (optional)", "Water — 2.5 cups", "உப்பு — ¾ tsp"],
    steps: ["அரிசி + பாசிப்பருப்பு wash பண்ணி, 10 min ஊறவையுங்க", "Pressure cooker-ல 2.5 cups water + அரிசி + பருப்பு + மஞ்சள் — 3 whistles, then low flame 5 min", "Open ஆனதும் நன்கு மசிங்க — smooth + creamy ஆகணும்", "Kadai-ல ½ tsp நெய் சூடாக்குங்க. Crushed மிளகு + சீரகம் 30 sec roast — வாசனை வரும்!", "Grated இஞ்சி + கறிவேப்பிலை + முந்திரி (optional) சேர், 1 min", "இந்த தாளி-ய பொங்கல்-ல சேர், உப்பு adjust, நன்கு mix", "சூடா serve — சாம்பார் or தேங்காய் சட்னி side-ல! 🍲", "💡 Tip: நெய் ½ tsp-க்கு மேல போடாதீங்க — flavor-க்கு போதும்!"]
  },
  l: {
    ta: "சப்பாத்தி+பருப்பு+பொரியல்+தயிர்",
    en: "Chapati + Dal + Poriyal + Curd",
    time: "12:30",
    port: "2 chapatis + 1 cup dal + 1 cup carrot poriyal + ¼ cup curd",
    cal: 460,
    prot: 20,
    carb: 75,
    fat: 9,
    fib: 4,
    prep: 15,
    cook: 25,
    diff: "Medium",
    htip: "கோதுமை சப்பாத்தி = complex carb, slow release energy. கேரட் = Vitamin A, eye health",
    sw: ["சப்பாத்தி+பருப்பு+பீன்ஸ்", "சாதம்+பருப்பு"],
    ing: ["கோதுமை மாவு — ½ cup", "துவரம்பருப்பு — ½ cup", "மஞ்சள் — ¼ tsp", "பூண்டு — 3 பல்", "தக்காளி — 1 small", "நெய் — ½ tsp", "கேரட் — 2 medium (grated or coins)", "தேங்காய் — 1 tbsp", "கடுகு, உளுந்து", "நல்லெண்ணெய் — 1 tsp", "உப்பு, தயிர் — ¼ cup"],
    steps: ["பருப்பு: wash பண்ணி, 2 cups water + மஞ்சள் + பூண்டு + chopped தக்காளி — pressure cook 3 whistles", "Open ஆனதும் whisk பண்ணி smooth ஆக்குங்க. உப்பு + ½ tsp நெய் சேருங்க", "சப்பாத்தி: கோதுமை மாவு + pinch உப்பு + warm water — soft dough பிசையுங்க", "5 min rest. 2 equal உருண்டை பண்ணுங்க", "Thin-ஆ roll, hot tawa-ல போடுங்க — bubbles வரும், flip, both sides brown spots வரணும்", "No oil! Dry tawa-ல போதும் — fluffy ஆ வரும்", "கேரட் பொரியல்: 1 tsp oil + கடுகு + உளுந்து, grated கேரட் + உப்பு", "5 min medium flame, தேங்காய் தூவி serve", "சப்பாத்தி + பருப்பு + கேரட் பொரியல் + ¼ cup தயிர் — complete meal! 🍽️"]
  },
  s: {
    ta: "வேர்க்கடலை சுண்டல்",
    en: "Peanut Sundal",
    time: "4:30",
    port: "3 tbsp peanut sundal",
    cal: 140,
    prot: 7,
    carb: 21,
    fat: 3,
    fib: 2,
    prep: 480,
    cook: 15,
    diff: "Easy (advance soak)",
    htip: "வேர்க்கடலை = protein + niacin + folate. ஊறவைத்தது = easy digest!",
    sw: ["கொண்டைக்கடலை", "மோர்+பாதாம்"],
    ing: ["வேர்க்கடலை (raw) — 3 tbsp", "கடுகு — ¼ tsp", "உளுந்து — ¼ tsp", "கறிவேப்பிலை — few leaves", "காய்ந்த மிளகாய் — 1", "தேங்காய் — 1 tsp", "எலுமிச்சை — few drops", "உப்பு — pinch"],
    steps: ["முதல் நாள்: raw வேர்க்கடலை water-ல ஊறவையுங்க (8 hrs)", "Pressure cook 2 whistles — soft ஆகணும், drain", "Kadai-ல ¼ tsp oil, கடுகு+உளுந்து+மிளகாய்+கறிவேப்பிலை தாளி", "கடலை சேர், உப்பு, 2 min mix", "தேங்காய் + எலுமிச்சை drops தூவி serve! 🥜"]
  },
  n: {
    ta: "சப்பாத்தி+கீரை பருப்பு",
    en: "Chapati + Keerai Dal",
    time: "7:30",
    port: "1 chapati + 1 cup keerai dal",
    cal: 240,
    prot: 12,
    carb: 37,
    fat: 5,
    fib: 4,
    prep: 10,
    cook: 20,
    diff: "Easy",
    htip: "கீரை = iron + calcium double boost! பாசிப்பருப்பு = easiest dal to digest",
    sw: ["இட்லி 2+சாம்பார்", "கிச்சடி"],
    ing: ["பாசிப்பருப்பு — ½ cup", "கீரை (பசலை/முளைக்கீரை) — 2 cups (washed, chopped)", "பூண்டு — 3 பல்", "தக்காளி — 1 small", "மஞ்சள் — ¼ tsp", "கடுகு, சீரகம் — ½ tsp each", "காய்ந்த மிளகாய் — 1", "நல்லெண்ணெய் — 1 tsp", "கோதுமை மாவு — ¼ cup", "உப்பு"],
    steps: ["கீரை நன்கு wash பண்ணுங்க — 3 times. Rough chop", "பாசிப்பருப்பு + கீரை + தக்காளி + பூண்டு + மஞ்சள் + 2 cups water — pressure cook 2 whistles", "Open ஆனதும் மசிங்க — semi-smooth, some keerai pieces OK", "தாளி: 1 tsp oil, கடுகு+சீரகம்+காய்ந்த மிளகாய். பருப்பில் கொட்டுங்க, உப்பு adjust", "சப்பாத்தி 1 — lunch method follow", "கீரை பருப்பு + சப்பாத்தி — light, nutritious dinner! 🥬", "💡 Tip: இரவு கீரை = iron absorption better (empty stomach effect)"]
  },
  tip: {
    ta: "பொங்கல்: 2:1 அரிசி:பாசிப்பருப்பு, ½ tsp நெய்",
    en: "2:1 rice:moong, half tsp ghee"
  },
  f: 0
}, {
  d: 7,
  p: 0,
  b: {
    ta: "இட்லி+சாம்பார்+முட்டை",
    en: "Idli + Sambar + Boiled Egg",
    time: "7:30",
    port: "2 idlis + 1 cup sambar + 1 egg",
    cal: 290,
    prot: 16,
    carb: 43,
    fat: 6,
    fib: 4,
    prep: 10,
    cook: 20,
    diff: "Easy",
    htip: "Week 1 complete-ஆ இருக்கும்! Same breakfast routine = autopilot mode 🔥",
    sw: ["தோசை 2+சாம்பார்", "இட்லி 3"],
    ing: ["இட்லி மாவு — 1 cup (store-bought OK)", "துவரம்பருப்பு — ½ cup", "பாசிப்பருப்பு — 2 tbsp", "சாம்பார் பொடி — 1.5 tsp", "தக்காளி — 1 (chopped)", "வெங்காயம் — 1 சிறிய (chopped)", "முருங்கை or பீன்ஸ் — ½ cup", "புளி — நெல்லிக்காய் size", "கடுகு — ½ tsp, கறிவேப்பிலை — 1 sprig", "நல்லெண்ணெய் — 1 tsp", "முட்டை — 1", "மஞ்சள் — ¼ tsp, உப்பு"],
    steps: ["இட்லி மாவு ready-யா check பண்ணுங்க. Moulds-ல oil தடவி, மாவு ஊற்றி, idli plate-ல வைங்க", "Cooker-ல 2 cups water கொதிக்கவை. Plate வை, 10-12 min steam பண்ணுங்க. Fork-ல குத்தி clean-ஆ வந்தா ready!", "சாம்பார்: துவரம்+பாசிப்பருப்பு wash பண்ணி, 2 cups water, ¼ tsp மஞ்சள் சேர்த்து pressure cook — 3 whistles", "புளி-ய warm water-ல 10 min ஊறவை, பிழிஞ்சு juice எடுங்க", "Cooker open ஆனதும், புளி juice, நறுக்கின தக்காளி, வெங்காயம், காய்கறி, சாம்பார் பொடி, உப்பு சேருங்க. 8-10 min boil பண்ணுங்க", "தாளி: 1 tsp oil-ல கடுகு பொரி, கறிவேப்பிலை சேர், சாம்பார்-ல கொட்டுங்க", "முட்டை: பாத்திரத்தில் water, முட்டை போடுங்க. Boil ஆனதும் 8 min வை. Cold water-ல போடுங்க, easy-ஆ உரியும்", "இட்லி + சாம்பார் + boiled egg serve பண்ணுங்க! 🍽️"]
  },
  l: {
    ta: "சுண்டல் மசாலா+சப்பாத்தி+சாலட்",
    en: "Chapati + Chana Masala + Salad",
    time: "12:30",
    port: "2 chapatis + 1 cup chana masala + 1 cup cucumber-tomato salad",
    cal: 450,
    prot: 20,
    carb: 72,
    fat: 9,
    fib: 4,
    prep: 15,
    cook: 25,
    diff: "Medium",
    htip: "கொண்டைக்கடலை masala = 16g protein! Highest protein lunch this week 💪",
    sw: ["சப்பாத்தி+பருப்பு", "சாதம்+சாம்பார்"],
    ing: ["கொண்டைக்கடலை — ¾ cup (8hr soaked, boiled)", "வெங்காயம் — 1 (fine chop)", "தக்காளி — 2 (puree or fine chop)", "இஞ்சி-பூண்டு paste — 1 tsp", "மிளகாய் பொடி — ½ tsp", "மல்லிப்பொடி — 1 tsp", "சீரகப்பொடி — ½ tsp", "மஞ்சள் — ¼ tsp", "கரம் மசாலா — ¼ tsp", "நல்லெண்ணெய் — 1 tsp", "கொத்தமல்லி — garnish", "உப்பு, கோதுமை மாவு — ½ cup"],
    steps: ["கொண்டைக்கடலை முன் நாள் ஊறவை + காலை pressure cook (4 whistles)", "Kadai-ல 1 tsp oil, வெங்காயம் golden brown ஆகும் வரை 4 min வதக்குங்க", "இஞ்சி-பூண்டு paste சேர், 1 min raw smell போகணும்", "தக்காளி சேர், 3-4 min — மசிய வதக்குங்க, oil separate ஆகணும்", "மிளகாய் + மல்லி + சீரகம் + மஞ்சள் பொடி சேர், 1 min கிளறுங்க", "வேகவைத்த கடலை + ½ cup water + உப்பு சேருங்க", "Medium flame-ல 8-10 min. இடையில் சில கடலை-ய ladle-ல மசிங்க — gravy thick ஆகும்", "கரம் மசாலா + கொத்தமல்லி தூவி இறக்குங்க", "சப்பாத்தி 2 — Day 6 method follow", "சுண்டல் மசாலா + சப்பாத்தி + side salad — restaurant quality at home! 🎉"]
  },
  s: {
    ta: "முளை பாசிப்பயிறு சுண்டல்",
    en: "Sprouted Moong Sundal",
    time: "4:30",
    port: "¾ cup sundal",
    cal: 140,
    prot: 10,
    carb: 18,
    fat: 3,
    fib: 2,
    prep: 5,
    cook: 15,
    diff: "Easy",
    htip: "Day 1 recipe! முளைகட்டியது protein+vitamin C rich — immunity boost 🛡️",
    sw: ["மோர்+பாதாம்", "கொய்யா"],
    ing: ["பாசிப்பயிறு — ½ cup (முளை கட்டியது)", "கடுகு — ½ tsp", "உளுந்து — ½ tsp", "கறிவேப்பிலை — 1 sprig", "பச்சை மிளகாய் — 1 (optional)", "தேங்காய் துருவல் — 1 tbsp", "எலுமிச்சை — ½ (juice)", "நல்லெண்ணெய் — ½ tsp", "உப்பு — taste-க்கு"],
    steps: ["முன் நாள் இரவு: பாசிப்பயிறு wash பண்ணி, 2 cups water-ல ஊறவையுங்க (8 hrs)", "காலை: water வடி, wet cloth-ல wrap பண்ணி, warm place-ல வையுங்க. மாலைக்கு முளை வரும்!", "முளை பயிறு-ல 1.5 cups water சேர், ¼ tsp உப்பு, 10 min boil பண்ணுங்க. Soft-ஆ ஆனா drain பண்ணுங்க", "Kadai-ல ½ tsp oil, கடுகு+உளுந்து பொரிக்குங்க", "கறிவேப்பிலை, பச்சை மிளகாய் (விரும்பினா) சேருங்க", "வேகவைத்த பயிறு சேர், 2 min கிளறுங்க", "இறக்கி, எலுமிச்சை juice பிழிஞ்சு, தேங்காய் தூவி serve! 🌱"]
  },
  n: {
    ta: "கிச்சடி+தயிர்",
    en: "Moong Dal Khichdi + Curd",
    time: "7:30",
    port: "1 cup khichdi + ¼ cup curd",
    cal: 270,
    prot: 12,
    carb: 44,
    fat: 5,
    fib: 4,
    prep: 10,
    cook: 20,
    diff: "Easy",
    htip: "கிச்சடி = complete meal in one pot! Ayurveda's healing food. Digestion-க்கு best 🍲",
    sw: ["தயிர் சாதம்", "இட்லி 2"],
    ing: ["அரிசி — ⅓ cup", "பாசிப்பருப்பு — ⅓ cup", "கேரட் — 1 small (diced)", "பீன்ஸ் — 4-5 (small pieces)", "பட்டாணி — 2 tbsp (optional)", "மஞ்சள் — ¼ tsp", "சீரகம் — ½ tsp", "இஞ்சி — ½ inch (grated)", "நெய் — ½ tsp", "கறிவேப்பிலை — 1 sprig", "உப்பு — ¾ tsp", "Water — 2.5 cups", "தயிர் — ¼ cup (side)"],
    steps: ["அரிசி + பாசிப்பருப்பு wash பண்ணி, 10 min ஊறவையுங்க", "Pressure cooker-ல ½ tsp நெய் சூடாக்கி, சீரகம் + grated இஞ்சி + கறிவேப்பிலை — 30 sec", "Diced காய்கறி சேர், 1 min கிளறுங்க", "அரிசி + பருப்பு + மஞ்சள் + உப்பு + 2.5 cups water சேருங்க", "மூடி, 3 whistles + 5 min simmer", "Open ஆனதும் நன்கு mix — soft, porridge consistency ஆகணும்", "தயிர் side-ல serve. சூடா சாப்பிடுங்க! 🍲", "💡 Tip: FLEX DAY! பாயசம் 2 tbsp OR 1 லட்டு reward — you earned it! 🎉"]
  },
  tip: {
    ta: "🌟 FLEX DAY! பாயசம் 2 tbsp OR 1 லட்டு OK!",
    en: "FLEX! Payasam or 1 laddu OK!"
  },
  f: 1
}, {
  d: 8,
  p: 1,
  b: {
    ta: "பெசரட்டு+இஞ்சி சட்னி",
    en: "Pesarattu + Ginger Chutney",
    time: "7:30",
    port: "2 pesarattu + 2 tbsp ginger chutney",
    cal: 270,
    prot: 15,
    carb: 36,
    fat: 6,
    fib: 5,
    prep: 480,
    cook: 15,
    diff: "Easy (advance soak)",
    htip: "பெசரட்டு = moong dal dosa! 14g protein — week 1 breakfast-ஐ விட more protein. Andhra specialty 💪",
    sw: ["முளை தோசை 2", "பெசரட்டு+புதினா சட்னி"],
    ing: ["பாசிப்பயிறு — ¾ cup (8hr soaked)", "அரிசி — 2 tbsp", "இஞ்சி — 1 inch", "பச்சை மிளகாய் — 2", "உப்பு — ½ tsp", "நல்லெண்ணெய் — 1 tsp per dosa", "இஞ்சி சட்னி: இஞ்சி 2 inch, கடலைப்பருப்பு 1 tbsp, காய்ந்த மிளகாய் 3, புளி small piece"],
    steps: ["முன் நாள் இரவு: பாசிப்பயிறு + 2 tbsp அரிசி wash பண்ணி ஊறவையுங்க (8 hrs)", "காலை: drain பண்ணி, இஞ்சி + பச்சை மிளகாய் + உப்பு சேர்த்து mixer-ல grind — dosa batter consistency", "Water சிறிதளவு சேர்த்து thin batter ஆக்குங்க — regular dosa batter-ஐ விட slightly thick OK", "சட்னி: கடலைப்பருப்பு dry roast, இஞ்சி+காய்ந்த மிளகாய்+புளி சேர்த்து grind", "Hot tawa-ல batter ஊற்றி spread — thin-ஆ! 1 tsp oil ஓரங்களில்", "Bottom golden ஆனா fold பண்ணி serve — crispy edges வரணும்!", "💡 Tip: பெசரட்டு batter ferment வேண்டாம் — grind பண்ணி direct pour!"]
  },
  l: {
    ta: "தினை+சாம்பார்+கீரை+ரசம்",
    en: "Thinai Rice + Sambar + Keerai Poriyal + Rasam",
    time: "12:30",
    port: "¾ cup thinai + 1 cup sambar + 1 cup keerai + 1 cup rasam",
    cal: 430,
    prot: 19,
    carb: 50,
    fat: 6,
    fib: 7,
    prep: 10,
    cook: 25,
    diff: "Easy",
    htip: "தினை (foxtail millet) = low GI, diabetes-friendly. கீரை = iron+calcium double boost! 🌾",
    sw: ["வரகு+சாம்பார்+கீரை", "சாதம்+சாம்பார்+கீரை"],
    ing: ["தினை — ½ cup", "துவரம்பருப்பு — ½ cup", "சாம்பார் பொடி — 1.5 tsp", "கீரை (பசலை/அரைக்கீரை) — 2 cups", "புளி, தக்காளி, வெங்காயம்", "கடுகு, கறிவேப்பிலை, நல்லெண்ணெய் 1 tsp"],
    steps: ["புளி-ய ½ cup warm water-ல 10 min ஊறவை, juice எடுங்க", "தக்காளி-ய hand-ல crush பண்ணுங்க (or rough chop)", "பாத்திரத்தில் புளி juice + crushed தக்காளி + 2 cups water + மஞ்சள் — boil-க்கு கொண்டு வாங்க", "ரசம் பொடி + crushed மிளகு + crushed பூண்டு + உப்பு சேருங்க", "Medium flame-ல 8-10 min boil. நுரை வரும் — ரசம் ready!", "தாளி: 1 tsp oil-ல கடுகு + காய்ந்த மிளகாய். ரசம்-ல கொட்டுங்க", "கொத்தமல்லி தூவி, சூடான சாதம்-ல ஊற்றி serve! 🍜", "💡 Tip: மிளகு அதிகம் போடுங்க — joint pain-க்கு natural medicine!"]
  },
  s: {
    ta: "முட்டை+Green Tea",
    en: "Boiled Egg + Green Tea",
    time: "4:30",
    port: "1 boiled egg + 1 cup green tea",
    cal: 80,
    prot: 7,
    carb: 2,
    fat: 5,
    fib: 0,
    prep: 2,
    cook: 10,
    diff: "Easy",
    htip: "முட்டை afternoon = sustained energy. Green tea = antioxidant + metabolism boost ☕",
    sw: ["மோர்+5 பாதாம்", "கொய்யா+வால்நட்"],
    ing: ["முட்டை — 1", "Green tea bag — 1", "தண்ணீர் — 1 cup"],
    steps: ["முட்டை boil 8 min, cold water-ல cool, உரிங்க", "Green tea: boiling water ஊற்றி, 3 min steep, bag remove", "Pinch மிளகு தூவி சாப்பிடுங்க! Simple + powerful snack 💪"]
  },
  n: {
    ta: "ராகி கஞ்சி+மோர்+பொரியல்",
    en: "Ragi Kanji + Buttermilk + Poriyal",
    time: "7:30",
    port: "1 cup ragi kanji + 1 cup poriyal",
    cal: 230,
    prot: 9,
    carb: 38,
    fat: 4,
    fib: 4,
    prep: 5,
    cook: 15,
    diff: "Easy",
    htip: "ராகி கஞ்சி இரவு = deep sleep + calcium absorption. Warm, comforting dinner 🌙",
    sw: ["ராகி கூழ்", "இட்லி 2+சாம்பார்"],
    ing: ["ராகி மாவு — 3 tbsp", "பால் — ½ cup", "Water — 1 cup", "வெல்லம் — 1 tsp (or skip!)", "ஏலக்காய் — 1 (crushed)", "பொரியல் காய்கறி — 1 cup"],
    steps: ["ராகி மாவு + ½ cup cold water — lump இல்லாம கலக்குங்க", "மீதி ½ cup water boil-க்கு கொண்டு வாங்க, ராகி mixture ஊற்றுங்க — தொடர்ந்து கிளறுங்க!", "3-4 min கிளறுங்க — thick porridge ஆகும். பால் சேர், 2 min", "வெல்லம் + ஏலக்காய் சேர்த்து serve — warm-ஆ குடிங்க", "Side பொரியல்: any வாரத்தில் செய்த method follow", "💡 Tip: Sugar-க்கு பதில் வெல்லம் — minerals rich! Or skip sweetener entirely"]
  },
  tip: {
    ta: "புரத உணவு: முட்டை, பருப்பு, பயிறு அதிகம் சேருங்க",
    en: "Boost protein: eggs, dal, legumes"
  },
  f: 0
}, {
  d: 9,
  p: 1,
  b: {
    ta: "சீலா+புதினா சட்னி",
    en: "Moong Dal Chilla + Mint Chutney",
    time: "7:30",
    port: "2 chillas + 2 tbsp mint chutney",
    cal: 240,
    prot: 16,
    carb: 28,
    fat: 8,
    fib: 4,
    prep: 10,
    cook: 10,
    diff: "Easy",
    htip: "கடலை மாவு (besan) = 22g protein per 100g! Low GI, diabetes-friendly breakfast 🌿",
    sw: ["பெசரட்டு", "முட்டை தோசை"],
    ing: ["கடலை மாவு (besan) — ¾ cup", "வெங்காயம் — 1 (fine chop)", "தக்காளி — 1 (fine chop)", "கொத்தமல்லி — 2 tbsp (chopped)", "பச்சை மிளகாய் — 1 (fine chop)", "சீரகம் — ½ tsp", "மஞ்சள் — ¼ tsp, உப்பு — ½ tsp", "Water — ¾ cup", "நல்லெண்ணெய் — 1 tsp per cheela", "புதினா சட்னி: புதினா 1 cup, கொத்தமல்லி ½ cup, பச்சை மிளகாய் 2, எலுமிச்சை juice"],
    steps: ["Batter: கடலை மாவு + water mix — thin pancake batter, no lumps", "வெங்காயம், தக்காளி, கொத்தமல்லி, பச்சை மிளகாய், சீரகம், மஞ்சள், உப்பு சேருங்க", "சட்னி: புதினா+கொத்தமல்லி+மிளகாய்+எலுமிச்சை+உப்பு — grind smooth", "Hot tawa-ல 1 tsp oil, batter ஊற்றி thin-ஆ spread", "Medium flame, 2 min — bottom golden, flip, 1 min", "Crispy cheela + புதினா சட்னி — restaurant-quality breakfast! 🥞", "💡 Tip: Batter-ல grated கேரட்/பீட்ரூட் சேர்த்தா extra nutrition!"]
  },
  l: {
    ta: "வரகு+கீரை கூட்டு+ரசம்",
    en: "Varagu Rice + Keerai Kootu + Rasam",
    time: "12:30",
    port: "¾ cup varagu + 1 cup kootu + 1 cup rasam + papad",
    cal: 420,
    prot: 16,
    carb: 52,
    fat: 6,
    fib: 8,
    prep: 10,
    cook: 25,
    diff: "Medium",
    htip: "வரகு = fiber king among millets! கூட்டு = dal+veggies = complete protein 🌾",
    sw: ["தினை+கூட்டு", "சாதம்+கூட்டு+ரசம்"],
    ing: ["வரகு — ½ cup", "பாசிப்பருப்பு — ¼ cup", "கீரை — 2 cups (chopped)", "தேங்காய் — 2 tbsp", "சீரகம் — ½ tsp", "ரசம் பொடி — 1.5 tsp", "தக்காளி — 2, புளி, மிளகு, பூண்டு"],
    steps: ["வரகு wash பண்ணி, 1:2.5 water-ல cook — 15-18 min. Each grain separate ஆ வரணும்", "கூட்டு: பாசிப்பருப்பு + கீரை + மஞ்சள் + 2 cups water — pressure cook 2 whistles", "தேங்காய் + சீரகம் + பச்சை மிளகாய் — mixer-ல coarse grind", "வெந்த பருப்பு+கீரை-ல ground paste சேர், உப்பு, 5 min simmer", "தாளி: 1 tsp oil, கடுகு + கறிவேப்பிலை — கூட்டு-ல கொட்டுங்க", "வரகு + கீரை கூட்டு — millet thali! 🍽️", "💡 Tip: வரகு first time-ன slightly more water சேருங்க"]
  },
  s: {
    ta: "முளை பாசிப்பயிறு சுண்டல்",
    en: "Sprouted Moong Sundal",
    time: "4:30",
    port: "¾ cup sundal",
    cal: 140,
    prot: 10,
    carb: 20,
    fat: 2,
    fib: 5,
    prep: 5,
    cook: 10,
    diff: "Easy",
    htip: "Day 1 recipe! Routine snack — fridge-ல 2 days keep ஆகும் 🌱",
    sw: ["கொண்டைக்கடலை சுண்டல்", "மோர்+பாதாம்"],
    ing: ["பாசிப்பயிறு — ½ cup (முளை கட்டியது)", "கடுகு — ½ tsp", "உளுந்து — ½ tsp", "கறிவேப்பிலை — 1 sprig", "பச்சை மிளகாய் — 1 (optional)", "தேங்காய் துருவல் — 1 tbsp", "எலுமிச்சை — ½ (juice)", "நல்லெண்ணெய் — ½ tsp", "உப்பு — taste-க்கு"],
    steps: ["முன் நாள் இரவு: பாசிப்பயிறு wash பண்ணி, 2 cups water-ல ஊறவையுங்க (8 hrs)", "காலை: water வடி, wet cloth-ல wrap பண்ணி, warm place-ல வையுங்க. மாலைக்கு முளை வரும்!", "முளை பயிறு-ல 1.5 cups water சேர், ¼ tsp உப்பு, 10 min boil பண்ணுங்க. Soft-ஆ ஆனா drain பண்ணுங்க", "Kadai-ல ½ tsp oil, கடுகு+உளுந்து பொரிக்குங்க", "கறிவேப்பிலை, பச்சை மிளகாய் (விரும்பினா) சேருங்க", "வேகவைத்த பயிறு சேர், 2 min கிளறுங்க", "இறக்கி, எலுமிச்சை juice பிழிஞ்சு, தேங்காய் தூவி serve! 🌱"]
  },
  n: {
    ta: "சப்பாத்தி+கீரை பருப்பு",
    en: "Chapati + Keerai Dal",
    time: "7:30",
    port: "1 chapati + 1 cup keerai dal",
    cal: 240,
    prot: 12,
    carb: 32,
    fat: 5,
    fib: 5,
    prep: 10,
    cook: 20,
    diff: "Easy",
    htip: "Day 6 dinner recipe! கீரை+பருப்பு = iron absorption boost at night 🥬",
    sw: ["இட்லி+சாம்பார்", "கிச்சடி"],
    ing: ["பாசிப்பருப்பு — ½ cup", "கீரை (பசலை/முளைக்கீரை) — 2 cups (washed, chopped)", "பூண்டு — 3 பல்", "தக்காளி — 1 small", "மஞ்சள் — ¼ tsp", "கடுகு, சீரகம் — ½ tsp each", "காய்ந்த மிளகாய் — 1", "நல்லெண்ணெய் — 1 tsp", "கோதுமை மாவு — ¼ cup", "உப்பு"],
    steps: ["கீரை நன்கு wash பண்ணுங்க — 3 times. Rough chop", "பாசிப்பருப்பு + கீரை + தக்காளி + பூண்டு + மஞ்சள் + 2 cups water — pressure cook 2 whistles", "Open ஆனதும் மசிங்க — semi-smooth, some keerai pieces OK", "தாளி: 1 tsp oil, கடுகு+சீரகம்+காய்ந்த மிளகாய். பருப்பில் கொட்டுங்க, உப்பு adjust", "சப்பாத்தி 1 — lunch method follow", "கீரை பருப்பு + சப்பாத்தி — light, nutritious dinner! 🥬", "💡 Tip: இரவு கீரை = iron absorption better (empty stomach effect)"]
  },
  tip: {
    ta: "புரத வாரம் — every meal-ல protein source இருக்கணும்",
    en: "Protein week — every meal needs a protein source"
  },
  f: 0
}, {
  d: 10,
  p: 1,
  b: {
    ta: "முட்டை தோசை+கொத்தமல்லி சட்னி",
    en: "Egg Dosa + Coriander Chutney",
    time: "7:30",
    port: "1 egg dosa + 2 tbsp coriander chutney",
    cal: 270,
    prot: 14,
    carb: 38,
    fat: 9,
    fib: 2,
    prep: 5,
    cook: 10,
    diff: "Easy",
    htip: "முட்டை தோசை = 14g protein! Quick, filling, கோவை street food favorite 🥚",
    sw: ["இட்லி+முட்டை", "பெசரட்டு"],
    ing: ["தோசை மாவு — 1 cup", "முட்டை — 2", "வெங்காயம் — 1 small (fine chop)", "பச்சை மிளகாய் — 1 (fine chop)", "கொத்தமல்லி — 1 tbsp", "உப்பு — pinch", "நல்லெண்ணெய் — 1 tsp per dosa"],
    steps: ["Hot tawa-ல தோசை மாவு ஊற்றி thin-ஆ spread", "1 முட்டை crack பண்ணி தோசை மேல ஊற்றுங்க — spread evenly", "வெங்காயம்+மிளகாய்+கொத்தமல்லி+pinch உப்பு தூவுங்க", "Medium flame, 2-3 min — egg set ஆகும், bottom crispy", "Fold பண்ணி serve! சட்னி or சாம்பார் side-ல 🥚", "💡 Tip: Egg set ஆகும் முன்ன flip வேண்டாம் — patience!"]
  },
  l: {
    ta: "சாமை+வெண்டைக்காய் சாம்பார்+ரைத்தா",
    en: "Samai Rice + Vendakkai Sambar + Cucumber Raita",
    time: "12:30",
    port: "¾ cup samai + 1.5 cups sambar + ½ cup raita",
    cal: 420,
    prot: 16,
    carb: 52,
    fat: 6,
    fib: 6,
    prep: 10,
    cook: 25,
    diff: "Easy",
    htip: "சாமை = smallest millet, biggest benefits! Low GI, high mineral content 🌾",
    sw: ["தினை+சாம்பார்", "சாதம்+சாம்பார்"],
    ing: ["சாமை — ½ cup", "துவரம்பருப்பு — ½ cup", "வெண்டைக்காய் — 8-10 (1 inch pieces)", "சாம்பார் பொடி, புளி, தக்காளி, வெங்காயம்", "கடுகு, நல்லெண்ணெய் 1 tsp"],
    steps: ["சாமை wash, 1:2 water cook 12 min — each grain separate ஆ வரணும்", "சாம்பார்: Day 1 method, வெண்டைக்காய் pieces சேருங்க", "⚠️ வெண்டைக்காய்: wash, fully dry, then cut — sticky ஆகாது", "சாமை + வெண்டைக்காய் சாம்பார் serve! 🍚"]
  },
  s: {
    ta: "கொண்டைக்கடலை சுண்டல்",
    en: "Chana Sundal",
    time: "4:30",
    port: "½ cup sundal",
    cal: 150,
    prot: 8,
    carb: 18,
    fat: 3,
    fib: 5,
    prep: 5,
    cook: 15,
    diff: "Easy",
    htip: "Day 4 snack recipe! Batch cook Sunday — whole week enjoy 🫘",
    sw: ["முளை சுண்டல்", "மோர்+பாதாம்"],
    ing: ["கொண்டைக்கடலை — ½ cup (8hr soaked)", "தேங்காய் துருவல் — 1 tbsp", "கடுகு — ½ tsp", "உளுந்து — ½ tsp", "காய்ந்த மிளகாய் — 1", "கறிவேப்பிலை — 1 sprig", "நல்லெண்ணெய் — ½ tsp", "உப்பு — taste-க்கு"],
    steps: ["முதல் நாள் இரவு: கொண்டைக்கடலை wash பண்ணி, நிறைய water-ல ஊறவையுங்க (8+ hrs)", "Pressure cooker-ல கடலை + 2 cups fresh water + ¼ tsp உப்பு — 4-5 whistles", "Soft-ஆ வேகணும் but mushy ஆகக்கூடாது. Drain பண்ணுங்க", "Kadai-ல ½ tsp oil, கடுகு பொரி, உளுந்து+காய்ந்த மிளகாய்+கறிவேப்பிலை", "வடித்த கடலை சேர், 2 min medium flame-ல கிளறுங்க", "உப்பு adjust, தேங்காய் துருவல் தூவி serve! 🫘", "💡 Tip: Extra சுண்டல் fridge-ல 2 days keep ஆகும்"]
  },
  n: {
    ta: "பெசரட்டு+இஞ்சி சட்னி",
    en: "Pesarattu + Ginger Chutney",
    time: "7:30",
    port: "1 pesarattu + ginger chutney",
    cal: 200,
    prot: 9,
    carb: 22,
    fat: 4,
    fib: 3,
    prep: 5,
    cook: 8,
    diff: "Easy",
    htip: "இரவு light version — 1 பெசரட்டு enough. காலை batter மீதி use! ♻️",
    sw: ["இட்லி 2", "தயிர் சாதம்"],
    ing: ["காலை batter மீதி", "இஞ்சி சட்னி மீதி"],
    steps: ["காலை பெசரட்டு batter மீதி — 1 dosa ஊற்றுங்க", "சட்னி side-ல, light dinner done!", "💡 Tip: Dinner always lighter than lunch — weight loss key rule!"]
  },
  tip: {
    ta: "முட்டை = complete protein source, தினமும் 1-2 OK",
    en: "Eggs = complete protein, 1-2 daily is fine"
  },
  f: 0
}, {
  d: 11,
  p: 1,
  b: {
    ta: "அடை+அவியல்",
    en: "Adai + Aviyal",
    time: "7:30",
    port: "2 small adai + ½ cup aviyal",
    cal: 300,
    prot: 14,
    carb: 40,
    fat: 8,
    fib: 7,
    prep: 480,
    cook: 20,
    diff: "Medium (advance soak)",
    htip: "அடை = 5 dal mix = protein powerhouse! Aviyal = Kerala-style mixed veg 🌿",
    sw: ["பெசரட்டு", "தோசை 2+சாம்பார்"],
    ing: ["அடை batter: துவரம்பருப்பு 2 tbsp, கடலைப்பருப்பு 2 tbsp, உளுந்து 1 tbsp, பாசிப்பயிறு 2 tbsp, அரிசி 3 tbsp", "காய்ந்த மிளகாய் — 3, பெருங்காயம் pinch", "அவியல்: கேரட், பீன்ஸ், drum stick, raw banana — ½ cup each", "தேங்காய் paste, தயிர் 2 tbsp, கறிவேப்பிலை"],
    steps: ["முன் நாள்: எல்லா பருப்பு+அரிசி ஊறவை (4-6 hrs), மிளகாய் சேர்த்து coarse grind", "அடை batter thick-ஆ இருக்கணும் — dosa-ஐ விட thick spread", "Hot tawa, batter spread (thick), 1 tsp oil, both sides golden — 3 min each side", "அவியல்: காய்கறி steam 10 min, தேங்காய் paste+தயிர்+உப்பு mix, low flame 5 min", "அடை + அவியல் — South Indian protein breakfast! 💪", "💡 Tip: அடை batter fridge-ல 3 days — batch make!"]
  },
  l: {
    ta: "சாம்பார் சாதம்+பீன்ஸ்+மோர்",
    en: "Sambar Rice + Beans Poriyal + Buttermilk",
    time: "12:30",
    port: "¾ cup rice + 1.5 cups sambar + 1 cup poriyal + 1 glass buttermilk",
    cal: 450,
    prot: 18,
    carb: 58,
    fat: 7,
    fib: 6,
    prep: 10,
    cook: 20,
    diff: "Easy",
    htip: "Classic combo! மோர் after meal = perfect digestion + cooling 🥛",
    sw: ["ரசம் சாதம்+பொரியல்", "சாம்பார்+கேரட் பொரியல்"],
    ing: ["சாதம் — ¾ cup (cooked)", "காலை சாம்பார் மீதி — 1.5 cup", "பீன்ஸ் — 1 cup (1 inch pieces)", "தேங்காய் துருவல் — 2 tbsp", "கடுகு — ½ tsp", "உளுந்து — ½ tsp", "காய்ந்த மிளகாய் — 1", "கறிவேப்பிலை — 1 sprig", "நல்லெண்ணெய் — 1 tsp", "உப்பு — taste-க்கு"],
    steps: ["பீன்ஸ் நறுக்குங்க — 1 inch pieces. Tips நீக்கிட்டு wash பண்ணுங்க", "Kadai-ல 1 tsp oil சூடாக்குங்க. கடுகு போடுங்க — பொரியட்டும்", "உளுந்து, காய்ந்த மிளகாய், கறிவேப்பிலை சேர்த்து 10 sec வதக்குங்க", "பீன்ஸ் சேருங்க, ¼ tsp உப்பு, 2 tbsp water தெளிங்க. மூடி போடுங்க", "Medium flame-ல 8-10 min வேகவிடுங்க. இடையில் கிளறுங்க — பீன்ஸ் crunchy-ஆ இருக்கணும், mushy ஆகக்கூடாது", "தேங்காய் துருவல் தூவி, 1 min கிளறி இறக்குங்க", "சூடான சாதம் + காலை மீதி சாம்பார் + பீன்ஸ் பொரியல் serve! 🍚"]
  },
  s: {
    ta: "மோர்+5 பாதாம்",
    en: "Buttermilk + 5 Almonds",
    time: "4:30",
    port: "1 tall glass buttermilk + 5 soaked almonds",
    cal: 120,
    prot: 7,
    carb: 8,
    fat: 6,
    fib: 1,
    prep: 2,
    cook: 0,
    diff: "No cooking!",
    htip: "Day 2 snack! Simple, effective, no cooking needed 🥛",
    sw: ["கொய்யா+வால்நட்", "Green tea+பேரிச்சை"],
    ing: ["தயிர் — ¼ cup", "Water — ¾ cup", "உப்பு — 1 pinch", "சீரகப்பொடி — ½ tsp", "கொத்தமல்லி — சிறிதளவு (optional)", "பாதாம் — 5 (overnight soaked preferred)"],
    steps: ["தயிர் + water + உப்பு + சீரகப்பொடி — mixer-ல 30 sec blend பண்ணுங்க (or whisk well)", "Optional: கொத்தமல்லி சிறிதளவு தூவுங்க", "5 பாதாம் ஊறவைத்து இருந்தா, தோல் உரிங்க — easy to digest", "மோர் குடிங்க + பாதாம் மெதுவா சாப்பிடுங்க. Snack done! 🥛", "💡 Tip: பாதாம்-ய முதல் நாள் இரவே water-ல போடுங்க"]
  },
  n: {
    ta: "கிச்சடி+தயிர்",
    en: "Moong Dal Khichdi + Curd",
    time: "7:30",
    port: "1 cup khichdi + ¼ cup curd",
    cal: 270,
    prot: 12,
    carb: 42,
    fat: 5,
    fib: 4,
    prep: 10,
    cook: 20,
    diff: "Easy",
    htip: "Day 7 dinner! Khichdi = Ayurveda healing food. Easy digest dinner 🍲",
    sw: ["தயிர் சாதம்", "இட்லி 2"],
    ing: ["அரிசி — ⅓ cup", "பாசிப்பருப்பு — ⅓ cup", "கேரட் — 1 small (diced)", "பீன்ஸ் — 4-5 (small pieces)", "பட்டாணி — 2 tbsp (optional)", "மஞ்சள் — ¼ tsp", "சீரகம் — ½ tsp", "இஞ்சி — ½ inch (grated)", "நெய் — ½ tsp", "கறிவேப்பிலை — 1 sprig", "உப்பு — ¾ tsp", "Water — 2.5 cups", "தயிர் — ¼ cup (side)"],
    steps: ["அரிசி + பாசிப்பருப்பு wash பண்ணி, 10 min ஊறவையுங்க", "Pressure cooker-ல ½ tsp நெய் சூடாக்கி, சீரகம் + grated இஞ்சி + கறிவேப்பிலை — 30 sec", "Diced காய்கறி சேர், 1 min கிளறுங்க", "அரிசி + பருப்பு + மஞ்சள் + உப்பு + 2.5 cups water சேருங்க", "மூடி, 3 whistles + 5 min simmer", "Open ஆனதும் நன்கு mix — soft, porridge consistency ஆகணும்", "தயிர் side-ல serve. சூடா சாப்பிடுங்க! 🍲", "💡 Tip: FLEX DAY! பாயசம் 2 tbsp OR 1 லட்டு reward — you earned it! 🎉"]
  },
  tip: {
    ta: "அடை batter-ஐ batch-ஆ தயாரிங்க — fridge-ல 3 days keep",
    en: "Batch make adai batter — keeps 3 days"
  },
  f: 0
}, {
  d: 12,
  p: 1,
  b: {
    ta: "பெசரட்டு+இஞ்சி சட்னி",
    en: "Pesarattu + Ginger Chutney",
    time: "7:30",
    port: "2 pesarattu + 2 tbsp ginger chutney",
    cal: 270,
    prot: 15,
    carb: 36,
    fat: 6,
    fib: 5,
    prep: 5,
    cook: 10,
    diff: "Easy",
    htip: "Day 8 recipe! இப்ப expert — routine-ஆ ஆகிடுச்சு! 🔥",
    sw: ["சீலா", "தோசை+முட்டை"],
    ing: ["பாசிப்பயிறு — ¾ cup (8hr soaked)", "அரிசி — 2 tbsp", "இஞ்சி — 1 inch", "பச்சை மிளகாய் — 2", "உப்பு — ½ tsp", "நல்லெண்ணெய் — 1 tsp per dosa", "இஞ்சி சட்னி: இஞ்சி 2 inch, கடலைப்பருப்பு 1 tbsp, காய்ந்த மிளகாய் 3, புளி small piece"],
    steps: ["முன் நாள் இரவு: பாசிப்பயிறு + 2 tbsp அரிசி wash பண்ணி ஊறவையுங்க (8 hrs)", "காலை: drain பண்ணி, இஞ்சி + பச்சை மிளகாய் + உப்பு சேர்த்து mixer-ல grind — dosa batter consistency", "Water சிறிதளவு சேர்த்து thin batter ஆக்குங்க — regular dosa batter-ஐ விட slightly thick OK", "சட்னி: கடலைப்பருப்பு dry roast, இஞ்சி+காய்ந்த மிளகாய்+புளி சேர்த்து grind", "Hot tawa-ல batter ஊற்றி spread — thin-ஆ! 1 tsp oil ஓரங்களில்", "Bottom golden ஆனா fold பண்ணி serve — crispy edges வரணும்!", "💡 Tip: பெசரட்டு batter ferment வேண்டாம் — grind பண்ணி direct pour!"]
  },
  l: {
    ta: "சிறுதானிய கிச்சடி+தயிர்+அப்பளம்",
    en: "Millet Khichdi + Curd + Papad",
    time: "12:30",
    port: "1 cup khichdi + ¼ cup curd + 1 papad",
    cal: 400,
    prot: 16,
    carb: 45,
    fat: 5,
    fib: 5,
    prep: 10,
    cook: 20,
    diff: "Easy",
    htip: "சிறுதானிய கிச்சடி = millet version! Any millet use — foxtail/kodo/little 🌾",
    sw: ["சாதம் கிச்சடி", "வரகு+சாம்பார்"],
    ing: ["அரிசி — ⅓ cup", "பாசிப்பருப்பு — ⅓ cup", "கேரட் — 1 small (diced)", "பீன்ஸ் — 4-5 (small pieces)", "பட்டாணி — 2 tbsp (optional)", "மஞ்சள் — ¼ tsp", "சீரகம் — ½ tsp", "இஞ்சி — ½ inch (grated)", "நெய் — ½ tsp", "கறிவேப்பிலை — 1 sprig", "உப்பு — ¾ tsp", "Water — 2.5 cups", "தயிர் — ¼ cup (side)"],
    steps: ["அரிசி + பாசிப்பருப்பு wash பண்ணி, 10 min ஊறவையுங்க", "Pressure cooker-ல ½ tsp நெய் சூடாக்கி, சீரகம் + grated இஞ்சி + கறிவேப்பிலை — 30 sec", "Diced காய்கறி சேர், 1 min கிளறுங்க", "அரிசி + பருப்பு + மஞ்சள் + உப்பு + 2.5 cups water சேருங்க", "மூடி, 3 whistles + 5 min simmer", "Open ஆனதும் நன்கு mix — soft, porridge consistency ஆகணும்", "தயிர் side-ல serve. சூடா சாப்பிடுங்க! 🍲", "💡 Tip: FLEX DAY! பாயசம் 2 tbsp OR 1 லட்டு reward — you earned it! 🎉"]
  },
  s: {
    ta: "பப்பாளி+ஆளிவிதை",
    en: "Papaya + Flaxseed",
    time: "4:30",
    port: "1 cup papaya + 1 tbsp ground flaxseed",
    cal: 100,
    prot: 4,
    carb: 18,
    fat: 2,
    fib: 3,
    prep: 3,
    cook: 0,
    diff: "No cooking!",
    htip: "பப்பாளி = digestive enzyme papain! ஆளிவிதை = omega-3 for joints 🦵",
    sw: ["கொய்யா+வால்நட்", "ஆப்பிள்+பாதாம்"],
    ing: ["பப்பாளி — 1 cup (cubed)", "ஆளிவிதை — 1 tsp (ground)"],
    steps: ["பப்பாளி cut, ஆளிவிதை பொடி தூவி சாப்பிடுங்க!", "💡 Tip: ஆளிவிதை whole-ஆ சாப்பிடாதீங்க — grind பண்ணா body absorb பண்ணும்"]
  },
  n: {
    ta: "அடை+அவியல் Light",
    en: "Adai + Aviyal (Light)",
    time: "7:30",
    port: "1 adai + ½ cup aviyal",
    cal: 240,
    prot: 10,
    carb: 25,
    fat: 5,
    fib: 4,
    prep: 5,
    cook: 8,
    diff: "Easy",
    htip: "Day 11 batter மீதி! Dinner = always lighter portion 🌙",
    sw: ["இட்லி 2", "காய்கறி சூப்"],
    ing: ["Day 11 அடை batter மீதி"],
    steps: ["Day 11 batter மீதி — 1 அடை make", "சட்னி or சாம்பார் side", "💡 Tip: Leftover batter = zero waste + zero effort dinner!"]
  },
  tip: {
    ta: "Millet-ஐ gradually introduce — sudden change வேண்டாம்",
    en: "Introduce millets gradually"
  },
  f: 0
}, {
  d: 13,
  p: 1,
  b: {
    ta: "இட்லி+சாம்பார்+முட்டை",
    en: "Idli + Sambar + Boiled Egg",
    time: "7:30",
    port: "2 idlis + 1 cup sambar + 1 egg",
    cal: 290,
    prot: 16,
    carb: 42,
    fat: 8,
    fib: 4,
    prep: 10,
    cook: 20,
    diff: "Easy",
    htip: "Comfort breakfast! Week 1 recipe — muscle memory-ல இருக்கும் 💪",
    sw: ["தோசை 2+முட்டை", "பெசரட்டு"],
    ing: ["இட்லி மாவு — 1 cup (store-bought OK)", "துவரம்பருப்பு — ½ cup", "பாசிப்பருப்பு — 2 tbsp", "சாம்பார் பொடி — 1.5 tsp", "தக்காளி — 1 (chopped)", "வெங்காயம் — 1 சிறிய (chopped)", "முருங்கை or பீன்ஸ் — ½ cup", "புளி — நெல்லிக்காய் size", "கடுகு — ½ tsp, கறிவேப்பிலை — 1 sprig", "நல்லெண்ணெய் — 1 tsp", "முட்டை — 1", "மஞ்சள் — ¼ tsp, உப்பு"],
    steps: ["இட்லி மாவு ready-யா check பண்ணுங்க. Moulds-ல oil தடவி, மாவு ஊற்றி, idli plate-ல வைங்க", "Cooker-ல 2 cups water கொதிக்கவை. Plate வை, 10-12 min steam பண்ணுங்க. Fork-ல குத்தி clean-ஆ வந்தா ready!", "சாம்பார்: துவரம்+பாசிப்பருப்பு wash பண்ணி, 2 cups water, ¼ tsp மஞ்சள் சேர்த்து pressure cook — 3 whistles", "புளி-ய warm water-ல 10 min ஊறவை, பிழிஞ்சு juice எடுங்க", "Cooker open ஆனதும், புளி juice, நறுக்கின தக்காளி, வெங்காயம், காய்கறி, சாம்பார் பொடி, உப்பு சேருங்க. 8-10 min boil பண்ணுங்க", "தாளி: 1 tsp oil-ல கடுகு பொரி, கறிவேப்பிலை சேர், சாம்பார்-ல கொட்டுங்க", "முட்டை: பாத்திரத்தில் water, முட்டை போடுங்க. Boil ஆனதும் 8 min வை. Cold water-ல போடுங்க, easy-ஆ உரியும்", "இட்லி + சாம்பார் + boiled egg serve பண்ணுங்க! 🍽️"]
  },
  l: {
    ta: "சப்பாத்தி+பருப்பு+பொரியல்+தயிர்",
    en: "Chapati + Dal + Poriyal + Curd",
    time: "12:30",
    port: "2 chapatis + 1 cup dal + 1 cup carrot poriyal + ¼ cup curd",
    cal: 460,
    prot: 20,
    carb: 52,
    fat: 8,
    fib: 6,
    prep: 15,
    cook: 25,
    diff: "Medium",
    htip: "Day 6 lunch recipe! சப்பாத்தி+பருப்பு = complete amino acids 🍽️",
    sw: ["சாதம்+பருப்பு+பொரியல்", "சப்பாத்தி+கீரை பருப்பு"],
    ing: ["கோதுமை மாவு — ½ cup", "துவரம்பருப்பு — ½ cup", "மஞ்சள் — ¼ tsp", "பூண்டு — 3 பல்", "தக்காளி — 1 small", "நெய் — ½ tsp", "கேரட் — 2 medium (grated or coins)", "தேங்காய் — 1 tbsp", "கடுகு, உளுந்து", "நல்லெண்ணெய் — 1 tsp", "உப்பு, தயிர் — ¼ cup"],
    steps: ["பருப்பு: wash பண்ணி, 2 cups water + மஞ்சள் + பூண்டு + chopped தக்காளி — pressure cook 3 whistles", "Open ஆனதும் whisk பண்ணி smooth ஆக்குங்க. உப்பு + ½ tsp நெய் சேருங்க", "சப்பாத்தி: கோதுமை மாவு + pinch உப்பு + warm water — soft dough பிசையுங்க", "5 min rest. 2 equal உருண்டை பண்ணுங்க", "Thin-ஆ roll, hot tawa-ல போடுங்க — bubbles வரும், flip, both sides brown spots வரணும்", "No oil! Dry tawa-ல போதும் — fluffy ஆ வரும்", "கேரட் பொரியல்: 1 tsp oil + கடுகு + உளுந்து, grated கேரட் + உப்பு", "5 min medium flame, தேங்காய் தூவி serve", "சப்பாத்தி + பருப்பு + கேரட் பொரியல் + ¼ cup தயிர் — complete meal! 🍽️"]
  },
  s: {
    ta: "முட்டை+Green Tea",
    en: "Boiled Egg + Green Tea",
    time: "4:30",
    port: "1 boiled egg + 1 cup green tea",
    cal: 80,
    prot: 7,
    carb: 2,
    fat: 5,
    fib: 0,
    prep: 2,
    cook: 10,
    diff: "Easy",
    htip: "Day 8 snack recipe! Simple protein+antioxidant combo ☕",
    sw: ["மோர்+பாதாம்", "கொய்யா"],
    ing: ["முட்டை — 1", "Green tea bag — 1", "தண்ணீர் — 1 cup"],
    steps: ["முட்டை boil 8 min, cold water-ல cool, உரிங்க", "Green tea: boiling water ஊற்றி, 3 min steep, bag remove", "Pinch மிளகு தூவி சாப்பிடுங்க! Simple + powerful snack 💪"]
  },
  n: {
    ta: "காய்கறி சூப்+சப்பாத்தி",
    en: "Vegetable Soup + 1 Chapati",
    time: "7:30",
    port: "1.5 cups thick veg soup + 1 small chapati",
    cal: 220,
    prot: 8,
    carb: 30,
    fat: 5,
    fib: 5,
    prep: 10,
    cook: 20,
    diff: "Easy",
    htip: "Day 3 dinner! மிளகு சூப் = joint pain relief medicine 🦵",
    sw: ["இட்லி+சாம்பார்", "ரசம் சாதம்"],
    ing: ["கேரட் — 1 (chopped)", "பீன்ஸ் — 6-8 (chopped)", "முட்டைகோஸ் — 1 cup (chopped)", "தக்காளி — 1 (chopped)", "மிளகு — ½ tsp (crushed)", "மஞ்சள் — ¼ tsp", "பூண்டு — 2 பல் (crushed)", "வெண்ணெய் — ½ tsp (optional)", "கொத்தமல்லி — garnish", "உப்பு — taste-க்கு", "கோதுமை மாவு — ¼ cup (for 1 chapati)", "Water — 3 cups"],
    steps: ["எல்லா காய்கறிகளையும் small pieces-ஆ நறுக்குங்க", "பாத்திரத்தில் 3 cups water + எல்லா காய்கறி + பூண்டு + மஞ்சள் — boil-க்கு கொண்டு வாங்க", "Medium flame-ல 15 min வேகவிடுங்க — காய்கறி fully soft ஆகணும்", "பாதி காய்கறி-ய ladle-ல எடுத்து mash பண்ணுங்க (or half blend). மீதி chunky-ஆ இருக்கட்டும்", "Crushed மிளகு + உப்பு சேர், 2 min boil. கொத்தமல்லி தூவுங்க", "சப்பாத்தி: ¼ cup கோதுமை மாவு + water — soft dough பிசையுங்க. 5 min rest", "சிறிய உருண்டை — thin-ஆ roll பண்ணுங்க. Hot tawa-ல போடுங்க — bubble வரும்போது திருப்புங்க", "Both sides-ம் brown spots வரணும். Oil இல்லாம dry roast-ே போதும்!", "சூடான சூப் + சப்பாத்தி serve. இரவு ideal meal! 🍜"]
  },
  tip: {
    ta: "Week 2 almost done! Protein habits building 💪",
    en: "Week 2 almost complete!"
  },
  f: 0
}, {
  d: 14,
  p: 1,
  b: {
    ta: "முளை தோசை",
    en: "Sprouted Moong Dosa",
    time: "7:30",
    port: "2 dosas + tomato chutney",
    cal: 250,
    prot: 14,
    carb: 38,
    fat: 5,
    fib: 4,
    prep: 480,
    cook: 10,
    diff: "Easy (advance soak)",
    htip: "முளை தோசை = sprouted batter! Extra nutrition — vitamin C 3x increase! 🌱",
    sw: ["பெசரட்டு", "முட்டை தோசை"],
    ing: ["Regular தோசை மாவு — 1 cup", "முளை பாசிப்பயிறு — ¼ cup (ground fine)", "உப்பு — ½ tsp", "நல்லெண்ணெய் — 1 tsp per dosa"],
    steps: ["முளை பாசிப்பயிறு mixer-ல fine grind", "Regular தோசை மாவு-ல mix — extra nutrition!", "Normal தோசை method — hot tawa, thin spread, crispy edges", "சாம்பார் or சட்னி side-ல serve 🌱", "💡 Tip: Any sprouted pulse — green gram, chana — batter-ல mix பண்ணலாம்!"]
  },
  l: {
    ta: "முருங்கை சாம்பார்+பீட்ரூட்+ரசம்",
    en: "Rice + Drumstick Sambar + Beetroot Poriyal + Rasam",
    time: "12:30",
    port: "¾ cup rice + 1 cup sambar + 1 cup beet poriyal + 1 cup rasam",
    cal: 440,
    prot: 17,
    carb: 52,
    fat: 6,
    fib: 6,
    prep: 15,
    cook: 25,
    diff: "Medium",
    htip: "Day 3 lunch! முருங்கை = calcium+anti-inflammatory. பீட்ரூட் = iron 🌿",
    sw: ["கத்தரிக்காய் சாம்பார்", "சாம்பார்+கேரட்"],
    ing: ["துவரம்பருப்பு — ½ cup", "முருங்கை — 2 sticks (3 inch pieces)", "சாம்பார் பொடி — 1.5 tsp", "புளி — நெல்லிக்காய் size", "தக்காளி — 1", "வெங்காயம் — 1 சிறிய", "மஞ்சள் — ¼ tsp", "நல்லெண்ணெய் — 1 tsp", "கடுகு, கறிவேப்பிலை", "பீட்ரூட் — 1 medium (grated)", "தேங்காய் துருவல் — 1 tbsp", "உப்பு — taste-க்கு"],
    steps: ["துவரம்பருப்பு + 2 cups water + மஞ்சள் — pressure cook 3 whistles", "முருங்கை: sticks-ஐ 3 inch pieces-ஆ cut பண்ணுங்க. புளி water-ல ஊறவையுங்க", "Kadai-ல 1 tsp oil, கடுகு பொரி, வெங்காயம்+தக்காளி 3 min வதக்குங்க", "முருங்கை pieces சேர், 2 tbsp water, மூடி போட்டு 5 min cook", "வெந்த பருப்பு + புளி juice + சாம்பார் பொடி + உப்பு சேர். 10 min boil", "கறிவேப்பிலை தூவி இறக்குங்க", "பீட்ரூட் பொரியல்: 1 tsp oil-ல கடுகு தாளி, grated பீட்ரூட் சேர், ¼ tsp உப்பு", "மூடி போட்டு 8 min medium flame — கிளறி, தேங்காய் தூவி serve! 🥗"]
  },
  s: {
    ta: "கொய்யா+3 வால்நட்",
    en: "Guava + 3 Walnuts",
    time: "4:30",
    port: "1 medium guava + 3 walnut halves",
    cal: 130,
    prot: 5,
    carb: 20,
    fat: 5,
    fib: 5,
    prep: 2,
    cook: 0,
    diff: "No cooking!",
    htip: "Day 3 snack! Vitamin C + Omega-3 power combo 🍈",
    sw: ["ஆப்பிள்+பாதாம்", "பப்பாளி"],
    ing: ["கொய்யா — 1 medium (ripe)", "வால்நட் — 3 pieces", "சாட் மசாலா — 1 pinch (optional)"],
    steps: ["கொய்யா wash பண்ணி, 4-6 pieces-ஆ cut பண்ணுங்க", "விரும்பினா சாட் மசாலா + little உப்பு தூவுங்க", "வால்நட் 3 pieces-உடன் slowly சாப்பிடுங்க — நன்கு மென்று சாப்பிடுங்க! 🍈", "💡 Tip: கொய்யா விதை-யும் சாப்பிடலாம் — extra fiber!"]
  },
  n: {
    ta: "தயிர் சாதம்+ஊறுகாய்",
    en: "Curd Rice (Small) + Pickle",
    time: "7:30",
    port: "½ cup rice + ½ cup curd + tiny pickle",
    cal: 230,
    prot: 8,
    carb: 32,
    fat: 4,
    fib: 1,
    prep: 5,
    cook: 0,
    diff: "No cooking!",
    htip: "Day 2 dinner! Week 2 ends perfectly — cool, probiotic dinner 🎉",
    sw: ["ரசம் சாதம்", "இட்லி 2"],
    ing: ["சாதம் — ½ cup (cooked, cooled)", "தயிர் — ½ cup (fresh)", "பால் — 2 tbsp", "கேரட் — 1 small (grated)", "வெள்ளரிக்காய் — 2 tbsp (fine chop)", "கடுகு — ¼ tsp", "உளுந்து — ¼ tsp", "கறிவேப்பிலை — few leaves", "பச்சை மிளகாய் — 1 (fine chop)", "நல்லெண்ணெய் — ½ tsp", "உப்பு — taste-க்கு", "ஊறுகாய் — 1 tsp (side)"],
    steps: ["Cooked சாதம் சிறிது மசிங்க — fully mash வேண்டாம், சிறிது texture இருக்கட்டும்", "தயிர் + 2 tbsp பால் சேர், நன்கு கலக்குங்க — creamy-ஆ இருக்கணும்", "Grated கேரட் + வெள்ளரிக்காய் சேர்த்து mix பண்ணுங்க", "தாளி: ½ tsp oil-ல கடுகு, உளுந்து, கறிவேப்பிலை, பச்சை மிளகாய் — 30 sec", "தாளி-ய சாதத்தில் கொட்டி, உப்பு சேர்த்து mix!", "Side-ல 1 tsp ஊறுகாய் வையுங்க. Cool-ஆ serve! ❄️", "💡 Tip: Fridge-ல வைக்காதீங்க — room temp best for curd rice"]
  },
  tip: {
    ta: "🌟 FLEX DAY! சிறிய treat OK — you earned it!",
    en: "FLEX! Small treat OK — you earned it!"
  },
  f: 1
}, {
  d: 15,
  p: 2,
  b: {
    ta: "ராகி தோசை+தக்காளி சட்னி",
    en: "Ragi Dosa + Tomato Chutney",
    time: "7:30",
    port: "2 ragi dosas + 2 tbsp tomato chutney",
    cal: 260,
    prot: 10,
    carb: 42,
    fat: 6,
    fib: 5,
    prep: 35,
    cook: 15,
    diff: "Medium",
    htip: "Millet week starts! ராகி = calcium queen — 344mg/100g, milk-ஐ விட அதிகம்! 🦴",
    sw: ["ராகி இட்லி 3", "தோசை 2+சட்னி"],
    ing: ["ராகி மாவு — ¾ cup", "அரிசி மாவு — ¼ cup", "வெங்காயம் — 1 small (fine chop)", "சீரகம் — ½ tsp, உப்பு — ½ tsp", "Water — 1+ cups", "நல்லெண்ணெய் — 1 tsp per dosa", "தக்காளி சட்னி: தக்காளி 2, வெங்காயம் ½, காய்ந்த மிளகாய் 2, கடலைப்பருப்பு 1 tbsp"],
    steps: ["Batter: ராகி மாவு + அரிசி மாவு (3:1 ratio) + சீரகம் + உப்பு + fine chopped வெங்காயம் mix", "Water சிறிது சிறிதாக சேர்த்து — dosa batter consistency-ல கலக்குங்க (not too thick, not too thin)", "30 min rest வையுங்க — இது முக்கியம்! Batter settle ஆகும்", "சட்னி: 1 tsp oil-ல கடலைப்பருப்பு golden-ஆ வறுங்க", "தக்காளி + வெங்காயம் + காய்ந்த மிளகாய் சேர், 3 min வதக்குங்க (soft ஆகணும்)", "Cool பண்ணி, mixer-ல grind — smooth paste, உப்பு adjust", "தோசை: Non-stick dosa tawa நன்கு சூடாக்குங்க. Few drops oil தடவுங்க", "Batter ஊற்றி, circular-ஆ spread பண்ணுங்க — thin-ஆ! Medium flame", "1 tsp oil ஓரங்களில் விடுங்க. Bottom golden brown ஆனா — fold பண்ணி serve!", "தக்காளி சட்னி-உடன் சூடா சாப்பிடுங்க! ராகி = calcium powerhouse 💪"]
  },
  l: {
    ta: "வரகு+கீரை கூட்டு+ரசம்",
    en: "Varagu Rice + Keerai Kootu + Rasam",
    time: "12:30",
    port: "¾ cup varagu + 1 cup kootu + 1 cup rasam + papad",
    cal: 420,
    prot: 16,
    carb: 48,
    fat: 6,
    fib: 8,
    prep: 10,
    cook: 25,
    diff: "Medium",
    htip: "வரகு (kodo millet) = fiber king! Diabetes-friendly, low GI. கூட்டு = gentle on stomach 🌾",
    sw: ["தினை+கூட்டு", "சாதம்+கூட்டு"],
    ing: ["வரகு — ½ cup", "பாசிப்பருப்பு — ¼ cup", "கீரை (பசலை/முளைக்கீரை) — 2 cups (chopped)", "தேங்காய் — 2 tbsp (grated)", "சீரகம் — ½ tsp", "பச்சை மிளகாய் — 1", "கடுகு — ½ tsp, கறிவேப்பிலை", "நல்லெண்ணெய் — 1 tsp, உப்பு"],
    steps: ["வரகு wash பண்ணி, 1:2.5 water-ல cook — 15-18 min. Each grain separate ஆ வரணும்", "கூட்டு: பாசிப்பருப்பு + கீரை + மஞ்சள் + 2 cups water — pressure cook 2 whistles", "தேங்காய் + சீரகம் + பச்சை மிளகாய் — mixer-ல coarse grind", "வெந்த பருப்பு+கீரை-ல ground paste சேர், உப்பு, 5 min simmer", "தாளி: 1 tsp oil, கடுகு + கறிவேப்பிலை — கூட்டு-ல கொட்டுங்க", "வரகு + கீரை கூட்டு — millet thali! 🍽️", "💡 Tip: வரகு first time-ன slightly more water சேருங்க"]
  },
  s: {
    ta: "ராகி கூழ்",
    en: "Ragi Porridge (Small)",
    time: "4:30",
    port: "½ cup ragi porridge + pinch jaggery",
    cal: 120,
    prot: 4,
    carb: 22,
    fat: 1,
    fib: 3,
    prep: 2,
    cook: 8,
    diff: "Easy",
    htip: "ராகி கூழ் = traditional Tamil snack! Cooling, filling, calcium rich. Village superfood! 🏡",
    sw: ["மோர்+பாதாம்", "பப்பாளி"],
    ing: ["ராகி மாவு — 2 tbsp", "Water — 1.5 cups", "மோர் — ¼ cup", "உப்பு — pinch", "சின்ன வெங்காயம் — 1 (optional, side)"],
    steps: ["ராகி மாவு + ½ cup cold water — lump இல்லாம கலக்குங்க", "1 cup water boil, ராகி mixture ஊற்று — continuously stir!", "3-4 min cook — thick porridge ஆகும்", "Cool ஆனதும் மோர் + உப்பு சேர், mix", "Room temp-ல serve — refreshing afternoon drink! 🥤", "💡 Tip: இது Coimbatore village-style! மோர் சேர்த்தா more cooling"]
  },
  n: {
    ta: "ராகி கஞ்சி+மோர்+பொரியல்",
    en: "Ragi Kanji + Buttermilk + Poriyal",
    time: "7:30",
    port: "1 cup ragi kanji + 1 cup poriyal",
    cal: 230,
    prot: 9,
    carb: 38,
    fat: 4,
    fib: 4,
    prep: 5,
    cook: 15,
    diff: "Easy",
    htip: "Day 8 dinner recipe! Warm ராகி கஞ்சி = best sleep food 🌙",
    sw: ["இட்லி 2+சாம்பார்", "கிச்சடி"],
    ing: ["ராகி மாவு — 3 tbsp", "பால் — ½ cup", "Water — 1 cup", "வெல்லம் — 1 tsp (or skip!)", "ஏலக்காய் — 1 (crushed)", "பொரியல் காய்கறி — 1 cup"],
    steps: ["ராகி மாவு + ½ cup cold water — lump இல்லாம கலக்குங்க", "மீதி ½ cup water boil-க்கு கொண்டு வாங்க, ராகி mixture ஊற்றுங்க — தொடர்ந்து கிளறுங்க!", "3-4 min கிளறுங்க — thick porridge ஆகும். பால் சேர், 2 min", "வெல்லம் + ஏலக்காய் சேர்த்து serve — warm-ஆ குடிங்க", "Side பொரியல்: any வாரத்தில் செய்த method follow", "💡 Tip: Sugar-க்கு பதில் வெல்லம் — minerals rich! Or skip sweetener entirely"]
  },
  tip: {
    ta: "சிறுதானிய வாரம் — அரிசி-க்கு பதில் millets try!",
    en: "Millet week — replace rice with millets!"
  },
  f: 0
}, {
  d: 16,
  p: 2,
  b: {
    ta: "சீலா+புதினா சட்னி",
    en: "Moong Dal Chilla + Mint Chutney",
    time: "7:30",
    port: "2 chillas + 2 tbsp mint chutney",
    cal: 240,
    prot: 16,
    carb: 28,
    fat: 8,
    fib: 4,
    prep: 10,
    cook: 10,
    diff: "Easy",
    htip: "Day 9 recipe! Besan = high protein, no fermentation needed — quick breakfast 🥞",
    sw: ["பெசரட்டு", "முட்டை தோசை"],
    ing: ["கடலை மாவு (besan) — ¾ cup", "வெங்காயம் — 1 (fine chop)", "தக்காளி — 1 (fine chop)", "கொத்தமல்லி — 2 tbsp (chopped)", "பச்சை மிளகாய் — 1 (fine chop)", "சீரகம் — ½ tsp", "மஞ்சள் — ¼ tsp, உப்பு — ½ tsp", "Water — ¾ cup", "நல்லெண்ணெய் — 1 tsp per cheela", "புதினா சட்னி: புதினா 1 cup, கொத்தமல்லி ½ cup, பச்சை மிளகாய் 2, எலுமிச்சை juice"],
    steps: ["Batter: கடலை மாவு + water mix — thin pancake batter, no lumps", "வெங்காயம், தக்காளி, கொத்தமல்லி, பச்சை மிளகாய், சீரகம், மஞ்சள், உப்பு சேருங்க", "சட்னி: புதினா+கொத்தமல்லி+மிளகாய்+எலுமிச்சை+உப்பு — grind smooth", "Hot tawa-ல 1 tsp oil, batter ஊற்றி thin-ஆ spread", "Medium flame, 2 min — bottom golden, flip, 1 min", "Crispy cheela + புதினா சட்னி — restaurant-quality breakfast! 🥞", "💡 Tip: Batter-ல grated கேரட்/பீட்ரூட் சேர்த்தா extra nutrition!"]
  },
  l: {
    ta: "தினை+சாம்பார்+கீரை+ரசம்",
    en: "Thinai Rice + Sambar + Keerai Poriyal + Rasam",
    time: "12:30",
    port: "¾ cup thinai + 1 cup sambar + 1 cup keerai + 1 cup rasam",
    cal: 430,
    prot: 19,
    carb: 50,
    fat: 6,
    fib: 7,
    prep: 10,
    cook: 25,
    diff: "Easy",
    htip: "Day 8 lunch recipe! தினை = low GI champion among millets 🌾",
    sw: ["வரகு+சாம்பார்", "சாமை+கீரை"],
    ing: ["தக்காளி — 2 (crushed)", "மிளகு — 1 tsp (coarsely ground)", "பூண்டு — 4 பல் (crushed)", "புளி — சிறிய piece", "ரசம் பொடி — 1.5 tsp", "மஞ்சள் — ¼ tsp", "கொத்தமல்லி — garnish", "கடுகு — ½ tsp", "காய்ந்த மிளகாய் — 1", "நல்லெண்ணெய் — 1 tsp", "உப்பு — taste-க்கு"],
    steps: ["புளி-ய ½ cup warm water-ல 10 min ஊறவை, juice எடுங்க", "தக்காளி-ய hand-ல crush பண்ணுங்க (or rough chop)", "பாத்திரத்தில் புளி juice + crushed தக்காளி + 2 cups water + மஞ்சள் — boil-க்கு கொண்டு வாங்க", "ரசம் பொடி + crushed மிளகு + crushed பூண்டு + உப்பு சேருங்க", "Medium flame-ல 8-10 min boil. நுரை வரும் — ரசம் ready!", "தாளி: 1 tsp oil-ல கடுகு + காய்ந்த மிளகாய். ரசம்-ல கொட்டுங்க", "கொத்தமல்லி தூவி, சூடான சாதம்-ல ஊற்றி serve! 🍜", "💡 Tip: மிளகு அதிகம் போடுங்க — joint pain-க்கு natural medicine!"]
  },
  s: {
    ta: "முளை பாசிப்பயிறு சுண்டல்",
    en: "Sprouted Moong Sundal",
    time: "4:30",
    port: "¾ cup sundal",
    cal: 140,
    prot: 10,
    carb: 20,
    fat: 2,
    fib: 5,
    prep: 5,
    cook: 10,
    diff: "Easy",
    htip: "Day 1 recipe! Sprouts = nature's multivitamin 🌱",
    sw: ["கொண்டைக்கடலை", "மோர்+பாதாம்"],
    ing: ["பாசிப்பயிறு — ½ cup (முளை கட்டியது)", "கடுகு — ½ tsp", "உளுந்து — ½ tsp", "கறிவேப்பிலை — 1 sprig", "பச்சை மிளகாய் — 1 (optional)", "தேங்காய் துருவல் — 1 tbsp", "எலுமிச்சை — ½ (juice)", "நல்லெண்ணெய் — ½ tsp", "உப்பு — taste-க்கு"],
    steps: ["முன் நாள் இரவு: பாசிப்பயிறு wash பண்ணி, 2 cups water-ல ஊறவையுங்க (8 hrs)", "காலை: water வடி, wet cloth-ல wrap பண்ணி, warm place-ல வையுங்க. மாலைக்கு முளை வரும்!", "முளை பயிறு-ல 1.5 cups water சேர், ¼ tsp உப்பு, 10 min boil பண்ணுங்க. Soft-ஆ ஆனா drain பண்ணுங்க", "Kadai-ல ½ tsp oil, கடுகு+உளுந்து பொரிக்குங்க", "கறிவேப்பிலை, பச்சை மிளகாய் (விரும்பினா) சேருங்க", "வேகவைத்த பயிறு சேர், 2 min கிளறுங்க", "இறக்கி, எலுமிச்சை juice பிழிஞ்சு, தேங்காய் தூவி serve! 🌱"]
  },
  n: {
    ta: "கம்பு கஞ்சி+பொரியல்",
    en: "Kambu Kanji + Poriyal",
    time: "7:30",
    port: "1 cup kambu porridge + 1 cup poriyal",
    cal: 240,
    prot: 10,
    carb: 40,
    fat: 4,
    fib: 4,
    prep: 5,
    cook: 15,
    diff: "Easy",
    htip: "கம்பு = iron richest millet! 8mg/100g. Anemia prevention + energy boost 💪",
    sw: ["ராகி கஞ்சி", "கிச்சடி"],
    ing: ["கம்பு மாவு — 3 tbsp", "பால் — ½ cup", "Water — 1 cup", "வெல்லம் — 1 tsp (or skip)", "ஏலக்காய் — 1 (crushed)", "பொரியல் — any 1 cup"],
    steps: ["கம்பு மாவு + ½ cup cold water — smooth-ஆ கலக்குங்க", "½ cup water boil, கம்பு mixture ஊற்று, stir continuously 3-4 min", "பால் சேர், 2 min simmer — creamy consistency", "வெல்லம் + ஏலக்காய் சேர், warm-ஆ serve", "Side பொரியல் — any veggies available", "💡 Tip: கம்பு = winter millet, body heat தரும். Summer-ல moderate-ஆ சாப்பிடுங்க"]
  },
  tip: {
    ta: "கம்பு = iron rich, ராகி = calcium rich — both essential!",
    en: "Pearl millet = iron, finger millet = calcium"
  },
  f: 0
}, {
  d: 17,
  p: 2,
  b: {
    ta: "பெசரட்டு+இஞ்சி சட்னி",
    en: "Pesarattu + Ginger Chutney",
    time: "7:30",
    port: "2 pesarattu + 2 tbsp ginger chutney",
    cal: 270,
    prot: 15,
    carb: 36,
    fat: 6,
    fib: 5,
    prep: 5,
    cook: 10,
    diff: "Easy",
    htip: "Day 8 recipe! Moong dal dosa = protein powerhouse breakfast 💪",
    sw: ["சீலா", "அடை"],
    ing: ["பாசிப்பயிறு — ¾ cup (8hr soaked)", "அரிசி — 2 tbsp", "இஞ்சி — 1 inch", "பச்சை மிளகாய் — 2", "உப்பு — ½ tsp", "நல்லெண்ணெய் — 1 tsp per dosa", "இஞ்சி சட்னி: இஞ்சி 2 inch, கடலைப்பருப்பு 1 tbsp, காய்ந்த மிளகாய் 3, புளி small piece"],
    steps: ["முன் நாள் இரவு: பாசிப்பயிறு + 2 tbsp அரிசி wash பண்ணி ஊறவையுங்க (8 hrs)", "காலை: drain பண்ணி, இஞ்சி + பச்சை மிளகாய் + உப்பு சேர்த்து mixer-ல grind — dosa batter consistency", "Water சிறிதளவு சேர்த்து thin batter ஆக்குங்க — regular dosa batter-ஐ விட slightly thick OK", "சட்னி: கடலைப்பருப்பு dry roast, இஞ்சி+காய்ந்த மிளகாய்+புளி சேர்த்து grind", "Hot tawa-ல batter ஊற்றி spread — thin-ஆ! 1 tsp oil ஓரங்களில்", "Bottom golden ஆனா fold பண்ணி serve — crispy edges வரணும்!", "💡 Tip: பெசரட்டு batter ferment வேண்டாம் — grind பண்ணி direct pour!"]
  },
  l: {
    ta: "சாமை+வெண்டைக்காய் சாம்பார்+ரைத்தா",
    en: "Samai Rice + Vendakkai Sambar + Cucumber Raita",
    time: "12:30",
    port: "¾ cup samai + 1.5 cups sambar + ½ cup raita",
    cal: 420,
    prot: 16,
    carb: 52,
    fat: 6,
    fib: 6,
    prep: 10,
    cook: 25,
    diff: "Easy",
    htip: "Day 10 lunch recipe! சாமை = smallest millet, gentlest on stomach 🌾",
    sw: ["தினை+சாம்பார்", "வரகு+சாம்பார்"],
    ing: ["சாமை — ½ cup", "துவரம்பருப்பு — ½ cup", "வெண்டைக்காய் — 8-10 (1 inch pieces)", "சாம்பார் பொடி, புளி, தக்காளி, வெங்காயம்", "கடுகு, நல்லெண்ணெய் 1 tsp"],
    steps: ["சாமை wash, 1:2 water cook 12 min — each grain separate ஆ வரணும்", "சாம்பார்: Day 1 method, வெண்டைக்காய் pieces சேருங்க", "⚠️ வெண்டைக்காய்: wash, fully dry, then cut — sticky ஆகாது", "சாமை + வெண்டைக்காய் சாம்பார் serve! 🍚"]
  },
  s: {
    ta: "கொண்டைக்கடலை சுண்டல்",
    en: "Chana Sundal",
    time: "4:30",
    port: "½ cup sundal",
    cal: 150,
    prot: 8,
    carb: 18,
    fat: 3,
    fib: 5,
    prep: 5,
    cook: 15,
    diff: "Easy",
    htip: "Day 4 snack! Protein-packed afternoon fuel 🫘",
    sw: ["முளை சுண்டல்", "மோர்+பாதாம்"],
    ing: ["கொண்டைக்கடலை — ½ cup (8hr soaked)", "தேங்காய் துருவல் — 1 tbsp", "கடுகு — ½ tsp", "உளுந்து — ½ tsp", "காய்ந்த மிளகாய் — 1", "கறிவேப்பிலை — 1 sprig", "நல்லெண்ணெய் — ½ tsp", "உப்பு — taste-க்கு"],
    steps: ["முதல் நாள் இரவு: கொண்டைக்கடலை wash பண்ணி, நிறைய water-ல ஊறவையுங்க (8+ hrs)", "Pressure cooker-ல கடலை + 2 cups fresh water + ¼ tsp உப்பு — 4-5 whistles", "Soft-ஆ வேகணும் but mushy ஆகக்கூடாது. Drain பண்ணுங்க", "Kadai-ல ½ tsp oil, கடுகு பொரி, உளுந்து+காய்ந்த மிளகாய்+கறிவேப்பிலை", "வடித்த கடலை சேர், 2 min medium flame-ல கிளறுங்க", "உப்பு adjust, தேங்காய் துருவல் தூவி serve! 🫘", "💡 Tip: Extra சுண்டல் fridge-ல 2 days keep ஆகும்"]
  },
  n: {
    ta: "சப்பாத்தி+கீரை பருப்பு",
    en: "Chapati + Keerai Dal",
    time: "7:30",
    port: "1 chapati + 1 cup keerai dal",
    cal: 240,
    prot: 12,
    carb: 32,
    fat: 5,
    fib: 5,
    prep: 10,
    cook: 20,
    diff: "Easy",
    htip: "Day 6 dinner! Iron-rich dinner for better energy tomorrow 🥬",
    sw: ["இட்லி+சாம்பார்", "கிச்சடி"],
    ing: ["பாசிப்பருப்பு — ½ cup", "கீரை (பசலை/முளைக்கீரை) — 2 cups (washed, chopped)", "பூண்டு — 3 பல்", "தக்காளி — 1 small", "மஞ்சள் — ¼ tsp", "கடுகு, சீரகம் — ½ tsp each", "காய்ந்த மிளகாய் — 1", "நல்லெண்ணெய் — 1 tsp", "கோதுமை மாவு — ¼ cup", "உப்பு"],
    steps: ["கீரை நன்கு wash பண்ணுங்க — 3 times. Rough chop", "பாசிப்பருப்பு + கீரை + தக்காளி + பூண்டு + மஞ்சள் + 2 cups water — pressure cook 2 whistles", "Open ஆனதும் மசிங்க — semi-smooth, some keerai pieces OK", "தாளி: 1 tsp oil, கடுகு+சீரகம்+காய்ந்த மிளகாய். பருப்பில் கொட்டுங்க, உப்பு adjust", "சப்பாத்தி 1 — lunch method follow", "கீரை பருப்பு + சப்பாத்தி — light, nutritious dinner! 🥬", "💡 Tip: இரவு கீரை = iron absorption better (empty stomach effect)"]
  },
  tip: {
    ta: "3 வகை millets try ஆகிட்டீங்க — great progress!",
    en: "You've tried 3 millets — amazing!"
  },
  f: 0
}, {
  d: 18,
  p: 2,
  b: {
    ta: "இட்லி+சாம்பார்+முட்டை",
    en: "Idli + Sambar + Boiled Egg",
    time: "7:30",
    port: "2 idlis + 1 cup sambar + 1 egg",
    cal: 290,
    prot: 16,
    carb: 42,
    fat: 8,
    fib: 4,
    prep: 10,
    cook: 20,
    diff: "Easy",
    htip: "Comfort classic! 18 days of healthy eating — AMAZING progress! 🔥",
    sw: ["தோசை 2+முட்டை", "பெசரட்டு"],
    ing: ["இட்லி மாவு — 1 cup (store-bought OK)", "துவரம்பருப்பு — ½ cup", "பாசிப்பருப்பு — 2 tbsp", "சாம்பார் பொடி — 1.5 tsp", "தக்காளி — 1 (chopped)", "வெங்காயம் — 1 சிறிய (chopped)", "முருங்கை or பீன்ஸ் — ½ cup", "புளி — நெல்லிக்காய் size", "கடுகு — ½ tsp, கறிவேப்பிலை — 1 sprig", "நல்லெண்ணெய் — 1 tsp", "முட்டை — 1", "மஞ்சள் — ¼ tsp, உப்பு"],
    steps: ["இட்லி மாவு ready-யா check பண்ணுங்க. Moulds-ல oil தடவி, மாவு ஊற்றி, idli plate-ல வைங்க", "Cooker-ல 2 cups water கொதிக்கவை. Plate வை, 10-12 min steam பண்ணுங்க. Fork-ல குத்தி clean-ஆ வந்தா ready!", "சாம்பார்: துவரம்+பாசிப்பருப்பு wash பண்ணி, 2 cups water, ¼ tsp மஞ்சள் சேர்த்து pressure cook — 3 whistles", "புளி-ய warm water-ல 10 min ஊறவை, பிழிஞ்சு juice எடுங்க", "Cooker open ஆனதும், புளி juice, நறுக்கின தக்காளி, வெங்காயம், காய்கறி, சாம்பார் பொடி, உப்பு சேருங்க. 8-10 min boil பண்ணுங்க", "தாளி: 1 tsp oil-ல கடுகு பொரி, கறிவேப்பிலை சேர், சாம்பார்-ல கொட்டுங்க", "முட்டை: பாத்திரத்தில் water, முட்டை போடுங்க. Boil ஆனதும் 8 min வை. Cold water-ல போடுங்க, easy-ஆ உரியும்", "இட்லி + சாம்பார் + boiled egg serve பண்ணுங்க! 🍽️"]
  },
  l: {
    ta: "சிறுதானிய கிச்சடி+தயிர்+அப்பளம்",
    en: "Millet Khichdi + Curd + Papad",
    time: "12:30",
    port: "1 cup khichdi + ¼ cup curd + 1 papad",
    cal: 400,
    prot: 16,
    carb: 45,
    fat: 5,
    fib: 5,
    prep: 10,
    cook: 20,
    diff: "Easy",
    htip: "Day 12 lunch recipe! Any millet கிச்சடி = comfort + nutrition combo 🍲",
    sw: ["வரகு+சாம்பார்", "சாதம் கிச்சடி"],
    ing: ["அரிசி — ⅓ cup", "பாசிப்பருப்பு — ⅓ cup", "கேரட் — 1 small (diced)", "பீன்ஸ் — 4-5 (small pieces)", "பட்டாணி — 2 tbsp (optional)", "மஞ்சள் — ¼ tsp", "சீரகம் — ½ tsp", "இஞ்சி — ½ inch (grated)", "நெய் — ½ tsp", "கறிவேப்பிலை — 1 sprig", "உப்பு — ¾ tsp", "Water — 2.5 cups", "தயிர் — ¼ cup (side)"],
    steps: ["அரிசி + பாசிப்பருப்பு wash பண்ணி, 10 min ஊறவையுங்க", "Pressure cooker-ல ½ tsp நெய் சூடாக்கி, சீரகம் + grated இஞ்சி + கறிவேப்பிலை — 30 sec", "Diced காய்கறி சேர், 1 min கிளறுங்க", "அரிசி + பருப்பு + மஞ்சள் + உப்பு + 2.5 cups water சேருங்க", "மூடி, 3 whistles + 5 min simmer", "Open ஆனதும் நன்கு mix — soft, porridge consistency ஆகணும்", "தயிர் side-ல serve. சூடா சாப்பிடுங்க! 🍲", "💡 Tip: FLEX DAY! பாயசம் 2 tbsp OR 1 லட்டு reward — you earned it! 🎉"]
  },
  s: {
    ta: "மோர்+5 பாதாம்",
    en: "Buttermilk + 5 Almonds",
    time: "4:30",
    port: "1 tall glass buttermilk + 5 soaked almonds",
    cal: 120,
    prot: 7,
    carb: 8,
    fat: 6,
    fib: 1,
    prep: 2,
    cook: 0,
    diff: "No cooking!",
    htip: "Day 2 snack! Simple, reliable, zero-effort 🥛",
    sw: ["கொய்யா+வால்நட்", "பப்பாளி+flax"],
    ing: ["தயிர் — ¼ cup", "Water — ¾ cup", "உப்பு — 1 pinch", "சீரகப்பொடி — ½ tsp", "கொத்தமல்லி — சிறிதளவு (optional)", "பாதாம் — 5 (overnight soaked preferred)"],
    steps: ["தயிர் + water + உப்பு + சீரகப்பொடி — mixer-ல 30 sec blend பண்ணுங்க (or whisk well)", "Optional: கொத்தமல்லி சிறிதளவு தூவுங்க", "5 பாதாம் ஊறவைத்து இருந்தா, தோல் உரிங்க — easy to digest", "மோர் குடிங்க + பாதாம் மெதுவா சாப்பிடுங்க. Snack done! 🥛", "💡 Tip: பாதாம்-ய முதல் நாள் இரவே water-ல போடுங்க"]
  },
  n: {
    ta: "ரசம் சாதம்+பொரியல்",
    en: "Rasam Rice + Poriyal",
    time: "7:30",
    port: "½ cup rice + 1.5 cups rasam + 1 cup poriyal",
    cal: 250,
    prot: 8,
    carb: 38,
    fat: 4,
    fib: 3,
    prep: 10,
    cook: 15,
    diff: "Easy",
    htip: "Day 5 dinner! மிளகு ரசம் = natural anti-inflammatory medicine 🌶️",
    sw: ["இட்லி+சாம்பார்", "காய்கறி சூப்"],
    ing: ["தக்காளி — 2 (crushed)", "மிளகு — 1 tsp (coarsely ground)", "பூண்டு — 4 பல் (crushed)", "புளி — சிறிய piece", "ரசம் பொடி — 1.5 tsp", "மஞ்சள் — ¼ tsp", "கொத்தமல்லி — garnish", "கடுகு — ½ tsp", "காய்ந்த மிளகாய் — 1", "நல்லெண்ணெய் — 1 tsp", "உப்பு — taste-க்கு"],
    steps: ["புளி-ய ½ cup warm water-ல 10 min ஊறவை, juice எடுங்க", "தக்காளி-ய hand-ல crush பண்ணுங்க (or rough chop)", "பாத்திரத்தில் புளி juice + crushed தக்காளி + 2 cups water + மஞ்சள் — boil-க்கு கொண்டு வாங்க", "ரசம் பொடி + crushed மிளகு + crushed பூண்டு + உப்பு சேருங்க", "Medium flame-ல 8-10 min boil. நுரை வரும் — ரசம் ready!", "தாளி: 1 tsp oil-ல கடுகு + காய்ந்த மிளகாய். ரசம்-ல கொட்டுங்க", "கொத்தமல்லி தூவி, சூடான சாதம்-ல ஊற்றி serve! 🍜", "💡 Tip: மிளகு அதிகம் போடுங்க — joint pain-க்கு natural medicine!"]
  },
  tip: {
    ta: "18 days! More than halfway — உங்க knees already lighter feel ஆகும்!",
    en: "18 days! Past halfway — your knees feel lighter!"
  },
  f: 0
}, {
  d: 19,
  p: 2,
  b: {
    ta: "அடை+அவியல்",
    en: "Adai + Aviyal",
    time: "7:30",
    port: "2 small adai + ½ cup aviyal",
    cal: 300,
    prot: 14,
    carb: 40,
    fat: 8,
    fib: 7,
    prep: 5,
    cook: 15,
    diff: "Easy (batch batter)",
    htip: "Day 11 recipe! 5-dal அடை = highest protein breakfast option 💪",
    sw: ["பெசரட்டு", "சீலா"],
    ing: ["அடை batter: துவரம்பருப்பு 2 tbsp, கடலைப்பருப்பு 2 tbsp, உளுந்து 1 tbsp, பாசிப்பயிறு 2 tbsp, அரிசி 3 tbsp", "காய்ந்த மிளகாய் — 3, பெருங்காயம் pinch", "அவியல்: கேரட், பீன்ஸ், drum stick, raw banana — ½ cup each", "தேங்காய் paste, தயிர் 2 tbsp, கறிவேப்பிலை"],
    steps: ["முன் நாள்: எல்லா பருப்பு+அரிசி ஊறவை (4-6 hrs), மிளகாய் சேர்த்து coarse grind", "அடை batter thick-ஆ இருக்கணும் — dosa-ஐ விட thick spread", "Hot tawa, batter spread (thick), 1 tsp oil, both sides golden — 3 min each side", "அவியல்: காய்கறி steam 10 min, தேங்காய் paste+தயிர்+உப்பு mix, low flame 5 min", "அடை + அவியல் — South Indian protein breakfast! 💪", "💡 Tip: அடை batter fridge-ல 3 days — batch make!"]
  },
  l: {
    ta: "வரகு+கீரை கூட்டு+ரசம்",
    en: "Varagu Rice + Keerai Kootu + Rasam",
    time: "12:30",
    port: "¾ cup varagu + 1 cup kootu + 1 cup rasam + papad",
    cal: 420,
    prot: 16,
    carb: 48,
    fat: 6,
    fib: 8,
    prep: 10,
    cook: 25,
    diff: "Medium",
    htip: "Day 15 lunch recipe! வரகு = fiber king for digestion 🌾",
    sw: ["தினை+கூட்டு", "சாதம்+கூட்டு"],
    ing: ["வரகு — ½ cup", "பாசிப்பருப்பு — ¼ cup", "கீரை (பசலை/முளைக்கீரை) — 2 cups (chopped)", "தேங்காய் — 2 tbsp (grated)", "சீரகம் — ½ tsp", "பச்சை மிளகாய் — 1", "கடுகு — ½ tsp, கறிவேப்பிலை", "நல்லெண்ணெய் — 1 tsp, உப்பு"],
    steps: ["வரகு wash பண்ணி, 1:2.5 water-ல cook — 15-18 min. Each grain separate ஆ வரணும்", "கூட்டு: பாசிப்பருப்பு + கீரை + மஞ்சள் + 2 cups water — pressure cook 2 whistles", "தேங்காய் + சீரகம் + பச்சை மிளகாய் — mixer-ல coarse grind", "வெந்த பருப்பு+கீரை-ல ground paste சேர், உப்பு, 5 min simmer", "தாளி: 1 tsp oil, கடுகு + கறிவேப்பிலை — கூட்டு-ல கொட்டுங்க", "வரகு + கீரை கூட்டு — millet thali! 🍽️", "💡 Tip: வரகு first time-ன slightly more water சேருங்க"]
  },
  s: {
    ta: "பப்பாளி+ஆளிவிதை",
    en: "Papaya + Flaxseed",
    time: "4:30",
    port: "1 cup papaya + 1 tbsp ground flaxseed",
    cal: 100,
    prot: 4,
    carb: 18,
    fat: 2,
    fib: 3,
    prep: 3,
    cook: 0,
    diff: "No cooking!",
    htip: "Day 12 snack! Digestive enzyme + omega-3 = perfect afternoon combo 🦵",
    sw: ["கொய்யா+வால்நட்", "ஆப்பிள்"],
    ing: ["பப்பாளி — 1 cup (cubed)", "ஆளிவிதை — 1 tsp (ground)"],
    steps: ["பப்பாளி cut, ஆளிவிதை பொடி தூவி சாப்பிடுங்க!", "💡 Tip: ஆளிவிதை whole-ஆ சாப்பிடாதீங்க — grind பண்ணா body absorb பண்ணும்"]
  },
  n: {
    ta: "ராகி கஞ்சி+மோர்+பொரியல்",
    en: "Ragi Kanji + Buttermilk + Poriyal",
    time: "7:30",
    port: "1 cup ragi kanji + 1 cup poriyal",
    cal: 230,
    prot: 9,
    carb: 38,
    fat: 4,
    fib: 4,
    prep: 5,
    cook: 15,
    diff: "Easy",
    htip: "Day 8 dinner! Warm calcium drink before bed = bone strength 🦴",
    sw: ["கிச்சடி", "இட்லி 2"],
    ing: ["ராகி மாவு — 3 tbsp", "பால் — ½ cup", "Water — 1 cup", "வெல்லம் — 1 tsp (or skip!)", "ஏலக்காய் — 1 (crushed)", "பொரியல் காய்கறி — 1 cup"],
    steps: ["ராகி மாவு + ½ cup cold water — lump இல்லாம கலக்குங்க", "மீதி ½ cup water boil-க்கு கொண்டு வாங்க, ராகி mixture ஊற்றுங்க — தொடர்ந்து கிளறுங்க!", "3-4 min கிளறுங்க — thick porridge ஆகும். பால் சேர், 2 min", "வெல்லம் + ஏலக்காய் சேர்த்து serve — warm-ஆ குடிங்க", "Side பொரியல்: any வாரத்தில் செய்த method follow", "💡 Tip: Sugar-க்கு பதில் வெல்லம் — minerals rich! Or skip sweetener entirely"]
  },
  tip: {
    ta: "Millets-ஐ alternate பண்ணுங்க — monotony avoid!",
    en: "Alternate millets to avoid boredom"
  },
  f: 0
}, {
  d: 20,
  p: 2,
  b: {
    ta: "முட்டை தோசை+கொத்தமல்லி சட்னி",
    en: "Egg Dosa + Coriander Chutney",
    time: "7:30",
    port: "1 egg dosa + 2 tbsp coriander chutney",
    cal: 270,
    prot: 14,
    carb: 38,
    fat: 9,
    fib: 2,
    prep: 5,
    cook: 10,
    diff: "Easy",
    htip: "Day 10 recipe! Quick, protein-rich, Coimbatore street food 🥚",
    sw: ["இட்லி+முட்டை", "பெசரட்டு"],
    ing: ["தோசை மாவு — 1 cup", "முட்டை — 2", "வெங்காயம் — 1 small (fine chop)", "பச்சை மிளகாய் — 1 (fine chop)", "கொத்தமல்லி — 1 tbsp", "உப்பு — pinch", "நல்லெண்ணெய் — 1 tsp per dosa"],
    steps: ["Hot tawa-ல தோசை மாவு ஊற்றி thin-ஆ spread", "1 முட்டை crack பண்ணி தோசை மேல ஊற்றுங்க — spread evenly", "வெங்காயம்+மிளகாய்+கொத்தமல்லி+pinch உப்பு தூவுங்க", "Medium flame, 2-3 min — egg set ஆகும், bottom crispy", "Fold பண்ணி serve! சட்னி or சாம்பார் side-ல 🥚", "💡 Tip: Egg set ஆகும் முன்ன flip வேண்டாம் — patience!"]
  },
  l: {
    ta: "தினை+சாம்பார்+கீரை+ரசம்",
    en: "Thinai Rice + Sambar + Keerai Poriyal + Rasam",
    time: "12:30",
    port: "¾ cup thinai + 1 cup sambar + 1 cup keerai + 1 cup rasam",
    cal: 430,
    prot: 19,
    carb: 50,
    fat: 6,
    fib: 7,
    prep: 10,
    cook: 25,
    diff: "Easy",
    htip: "Day 8 lunch recipe! தினை becoming routine now — great! 🌾",
    sw: ["வரகு+சாம்பார்", "சாமை+கீரை"],
    ing: ["தக்காளி — 2 (crushed)", "மிளகு — 1 tsp (coarsely ground)", "பூண்டு — 4 பல் (crushed)", "புளி — சிறிய piece", "ரசம் பொடி — 1.5 tsp", "மஞ்சள் — ¼ tsp", "கொத்தமல்லி — garnish", "கடுகு — ½ tsp", "காய்ந்த மிளகாய் — 1", "நல்லெண்ணெய் — 1 tsp", "உப்பு — taste-க்கு"],
    steps: ["புளி-ய ½ cup warm water-ல 10 min ஊறவை, juice எடுங்க", "தக்காளி-ய hand-ல crush பண்ணுங்க (or rough chop)", "பாத்திரத்தில் புளி juice + crushed தக்காளி + 2 cups water + மஞ்சள் — boil-க்கு கொண்டு வாங்க", "ரசம் பொடி + crushed மிளகு + crushed பூண்டு + உப்பு சேருங்க", "Medium flame-ல 8-10 min boil. நுரை வரும் — ரசம் ready!", "தாளி: 1 tsp oil-ல கடுகு + காய்ந்த மிளகாய். ரசம்-ல கொட்டுங்க", "கொத்தமல்லி தூவி, சூடான சாதம்-ல ஊற்றி serve! 🍜", "💡 Tip: மிளகு அதிகம் போடுங்க — joint pain-க்கு natural medicine!"]
  },
  s: {
    ta: "முட்டை+Green Tea",
    en: "Boiled Egg + Green Tea",
    time: "4:30",
    port: "1 boiled egg + 1 cup green tea",
    cal: 80,
    prot: 7,
    carb: 2,
    fat: 5,
    fib: 0,
    prep: 2,
    cook: 10,
    diff: "Easy",
    htip: "Day 8 snack! Protein + antioxidant afternoon boost ☕",
    sw: ["மோர்+பாதாம்", "கொய்யா"],
    ing: ["முட்டை — 1", "Green tea bag — 1", "தண்ணீர் — 1 cup"],
    steps: ["முட்டை boil 8 min, cold water-ல cool, உரிங்க", "Green tea: boiling water ஊற்றி, 3 min steep, bag remove", "Pinch மிளகு தூவி சாப்பிடுங்க! Simple + powerful snack 💪"]
  },
  n: {
    ta: "காய்கறி சூப்+சப்பாத்தி",
    en: "Vegetable Soup + 1 Chapati",
    time: "7:30",
    port: "1.5 cups thick veg soup + 1 small chapati",
    cal: 220,
    prot: 8,
    carb: 30,
    fat: 5,
    fib: 5,
    prep: 10,
    cook: 20,
    diff: "Easy",
    htip: "Day 3 dinner! Pepper soup = joint medicine 🦵",
    sw: ["இட்லி+சாம்பார்", "ரசம் சாதம்"],
    ing: ["கேரட் — 1 (chopped)", "பீன்ஸ் — 6-8 (chopped)", "முட்டைகோஸ் — 1 cup (chopped)", "தக்காளி — 1 (chopped)", "மிளகு — ½ tsp (crushed)", "மஞ்சள் — ¼ tsp", "பூண்டு — 2 பல் (crushed)", "வெண்ணெய் — ½ tsp (optional)", "கொத்தமல்லி — garnish", "உப்பு — taste-க்கு", "கோதுமை மாவு — ¼ cup (for 1 chapati)", "Water — 3 cups"],
    steps: ["எல்லா காய்கறிகளையும் small pieces-ஆ நறுக்குங்க", "பாத்திரத்தில் 3 cups water + எல்லா காய்கறி + பூண்டு + மஞ்சள் — boil-க்கு கொண்டு வாங்க", "Medium flame-ல 15 min வேகவிடுங்க — காய்கறி fully soft ஆகணும்", "பாதி காய்கறி-ய ladle-ல எடுத்து mash பண்ணுங்க (or half blend). மீதி chunky-ஆ இருக்கட்டும்", "Crushed மிளகு + உப்பு சேர், 2 min boil. கொத்தமல்லி தூவுங்க", "சப்பாத்தி: ¼ cup கோதுமை மாவு + water — soft dough பிசையுங்க. 5 min rest", "சிறிய உருண்டை — thin-ஆ roll பண்ணுங்க. Hot tawa-ல போடுங்க — bubble வரும்போது திருப்புங்க", "Both sides-ம் brown spots வரணும். Oil இல்லாம dry roast-ே போதும்!", "சூடான சூப் + சப்பாத்தி serve. இரவு ideal meal! 🍜"]
  },
  tip: {
    ta: "20 days done! 10 days to go — finish strong! 💪",
    en: "20 days complete! 10 more — finish strong!"
  },
  f: 0
}, {
  d: 21,
  p: 2,
  b: {
    ta: "காய்கறி பொங்கல்",
    en: "Vegetable Pongal (small portion)",
    time: "7:30",
    port: "¾ cup ven pongal + sambar",
    cal: 280,
    prot: 10,
    carb: 44,
    fat: 6,
    fib: 4,
    prep: 10,
    cook: 25,
    diff: "Easy",
    htip: "Day 6 recipe! Science says habits form in 21 days — you DID IT! 🎉",
    sw: ["உப்மா", "கிச்சடி"],
    ing: ["அரிசி — ½ cup", "பாசிப்பருப்பு — ¼ cup", "மிளகு — 1 tsp (coarsely crushed)", "சீரகம் — 1 tsp", "இஞ்சி — 1 inch (grated)", "கறிவேப்பிலை — 1 sprig", "நெய் — ½ tsp (just for flavor!)", "முந்திரி — 3-4 pieces (optional)", "Water — 2.5 cups", "உப்பு — ¾ tsp"],
    steps: ["அரிசி + பாசிப்பருப்பு wash பண்ணி, 10 min ஊறவையுங்க", "Pressure cooker-ல 2.5 cups water + அரிசி + பருப்பு + மஞ்சள் — 3 whistles, then low flame 5 min", "Open ஆனதும் நன்கு மசிங்க — smooth + creamy ஆகணும்", "Kadai-ல ½ tsp நெய் சூடாக்குங்க. Crushed மிளகு + சீரகம் 30 sec roast — வாசனை வரும்!", "Grated இஞ்சி + கறிவேப்பிலை + முந்திரி (optional) சேர், 1 min", "இந்த தாளி-ய பொங்கல்-ல சேர், உப்பு adjust, நன்கு mix", "சூடா serve — சாம்பார் or தேங்காய் சட்னி side-ல! 🍲", "💡 Tip: நெய் ½ tsp-க்கு மேல போடாதீங்க — flavor-க்கு போதும்!"]
  },
  l: {
    ta: "சாம்பார் சாதம்+பீன்ஸ்+மோர்",
    en: "Sambar Rice + Beans Poriyal + Buttermilk",
    time: "12:30",
    port: "¾ cup rice + 1.5 cups sambar + 1 cup poriyal + 1 glass buttermilk",
    cal: 450,
    prot: 18,
    carb: 58,
    fat: 7,
    fib: 6,
    prep: 10,
    cook: 15,
    diff: "Easy",
    htip: "Day 1 lunch! Your signature meal by now 🍚",
    sw: ["ரசம் சாதம்+பொரியல்", "சாம்பார்+கேரட்"],
    ing: ["சாதம் — ¾ cup (cooked)", "காலை சாம்பார் மீதி — 1.5 cup", "பீன்ஸ் — 1 cup (1 inch pieces)", "தேங்காய் துருவல் — 2 tbsp", "கடுகு — ½ tsp", "உளுந்து — ½ tsp", "காய்ந்த மிளகாய் — 1", "கறிவேப்பிலை — 1 sprig", "நல்லெண்ணெய் — 1 tsp", "உப்பு — taste-க்கு"],
    steps: ["பீன்ஸ் நறுக்குங்க — 1 inch pieces. Tips நீக்கிட்டு wash பண்ணுங்க", "Kadai-ல 1 tsp oil சூடாக்குங்க. கடுகு போடுங்க — பொரியட்டும்", "உளுந்து, காய்ந்த மிளகாய், கறிவேப்பிலை சேர்த்து 10 sec வதக்குங்க", "பீன்ஸ் சேருங்க, ¼ tsp உப்பு, 2 tbsp water தெளிங்க. மூடி போடுங்க", "Medium flame-ல 8-10 min வேகவிடுங்க. இடையில் கிளறுங்க — பீன்ஸ் crunchy-ஆ இருக்கணும், mushy ஆகக்கூடாது", "தேங்காய் துருவல் தூவி, 1 min கிளறி இறக்குங்க", "சூடான சாதம் + காலை மீதி சாம்பார் + பீன்ஸ் பொரியல் serve! 🍚"]
  },
  s: {
    ta: "காப்பி+2 பேரிச்சை",
    en: "Filter Coffee (No Sugar) + 2 Dates",
    time: "4:30",
    port: "1 small cup coffee (½ tsp sugar max) + 2 dates",
    cal: 110,
    prot: 2,
    carb: 22,
    fat: 1,
    fib: 2,
    prep: 5,
    cook: 5,
    diff: "Easy",
    htip: "Day 5 snack! Natural sugar from dates — skip sugar in coffee! ☕",
    sw: ["Green tea+பேரிச்சை", "மோர்"],
    ing: ["காப்பி பொடி — 1 tsp", "பால் — ¼ cup", "Water — ½ cup", "சர்க்கரை — ½ tsp MAX (try without!)", "பேரிச்சை — 2 pieces"],
    steps: ["Filter காப்பி: decoction ready பண்ணுங்க (or 1 tsp instant)", "பால் சூடாக்கி, decoction + water mix", "சர்க்கரை ½ tsp only — gradually குறையுங்க, eventually without try பண்ணுங்க", "பேரிச்சை-உடன் slowly enjoy பண்ணுங்க! ☕", "💡 Tip: பேரிச்சை sweet-ஆ இருக்கும், so காப்பி-ல sugar skip try பண்ணுங்க!"]
  },
  n: {
    ta: "கிச்சடி+தயிர்",
    en: "Moong Dal Khichdi + Curd",
    time: "7:30",
    port: "1 cup khichdi + ¼ cup curd",
    cal: 270,
    prot: 12,
    carb: 42,
    fat: 5,
    fib: 4,
    prep: 10,
    cook: 20,
    diff: "Easy",
    htip: "Day 7 dinner! Millet week ends with comfort food 🍲",
    sw: ["தயிர் சாதம்", "இட்லி 2"],
    ing: ["அரிசி — ⅓ cup", "பாசிப்பருப்பு — ⅓ cup", "கேரட் — 1 small (diced)", "பீன்ஸ் — 4-5 (small pieces)", "பட்டாணி — 2 tbsp (optional)", "மஞ்சள் — ¼ tsp", "சீரகம் — ½ tsp", "இஞ்சி — ½ inch (grated)", "நெய் — ½ tsp", "கறிவேப்பிலை — 1 sprig", "உப்பு — ¾ tsp", "Water — 2.5 cups", "தயிர் — ¼ cup (side)"],
    steps: ["அரிசி + பாசிப்பருப்பு wash பண்ணி, 10 min ஊறவையுங்க", "Pressure cooker-ல ½ tsp நெய் சூடாக்கி, சீரகம் + grated இஞ்சி + கறிவேப்பிலை — 30 sec", "Diced காய்கறி சேர், 1 min கிளறுங்க", "அரிசி + பருப்பு + மஞ்சள் + உப்பு + 2.5 cups water சேருங்க", "மூடி, 3 whistles + 5 min simmer", "Open ஆனதும் நன்கு mix — soft, porridge consistency ஆகணும்", "தயிர் side-ல serve. சூடா சாப்பிடுங்க! 🍲", "💡 Tip: FLEX DAY! பாயசம் 2 tbsp OR 1 லட்டு reward — you earned it! 🎉"]
  },
  tip: {
    ta: "🌟 FLEX DAY + 21 DAYS! பாயசம் OR 1 sweet — celebrate!",
    en: "FLEX + 21 DAYS! Small celebration deserved! 🎉"
  },
  f: 1
}, {
  d: 22,
  p: 3,
  b: {
    ta: "சீலா+புதினா சட்னி",
    en: "Moong Dal Chilla + Mint Chutney",
    time: "7:30",
    port: "2 chillas + 2 tbsp mint chutney",
    cal: 240,
    prot: 16,
    carb: 28,
    fat: 8,
    fib: 4,
    prep: 10,
    cook: 10,
    diff: "Easy",
    htip: "Final week! சீலா = quick protein breakfast. இப்ப எல்லா recipe-யும் expert! 💪",
    sw: ["பெசரட்டு", "முட்டை தோசை"],
    ing: ["கடலை மாவு (besan) — ¾ cup", "வெங்காயம் — 1 (fine chop)", "தக்காளி — 1 (fine chop)", "கொத்தமல்லி — 2 tbsp (chopped)", "பச்சை மிளகாய் — 1 (fine chop)", "சீரகம் — ½ tsp", "மஞ்சள் — ¼ tsp, உப்பு — ½ tsp", "Water — ¾ cup", "நல்லெண்ணெய் — 1 tsp per cheela", "புதினா சட்னி: புதினா 1 cup, கொத்தமல்லி ½ cup, பச்சை மிளகாய் 2, எலுமிச்சை juice"],
    steps: ["Batter: கடலை மாவு + water mix — thin pancake batter, no lumps", "வெங்காயம், தக்காளி, கொத்தமல்லி, பச்சை மிளகாய், சீரகம், மஞ்சள், உப்பு சேருங்க", "சட்னி: புதினா+கொத்தமல்லி+மிளகாய்+எலுமிச்சை+உப்பு — grind smooth", "Hot tawa-ல 1 tsp oil, batter ஊற்றி thin-ஆ spread", "Medium flame, 2 min — bottom golden, flip, 1 min", "Crispy cheela + புதினா சட்னி — restaurant-quality breakfast! 🥞", "💡 Tip: Batter-ல grated கேரட்/பீட்ரூட் சேர்த்தா extra nutrition!"]
  },
  l: {
    ta: "வரகு+கீரை கூட்டு+ரசம்",
    en: "Varagu Rice + Keerai Kootu + Rasam",
    time: "12:30",
    port: "¾ cup varagu + 1 cup kootu + 1 cup rasam + papad",
    cal: 420,
    prot: 16,
    carb: 52,
    fat: 6,
    fib: 8,
    prep: 10,
    cook: 25,
    diff: "Medium",
    htip: "Day 15 lunch + ரசம் combo! Full thali experience at home 🍽️",
    sw: ["தினை+கூட்டு+ரசம்", "சாதம்+கூட்டு"],
    ing: ["வரகு — ½ cup", "பாசிப்பருப்பு — ¼ cup", "கீரை (பசலை/முளைக்கீரை) — 2 cups (chopped)", "தேங்காய் — 2 tbsp (grated)", "சீரகம் — ½ tsp", "பச்சை மிளகாய் — 1", "கடுகு — ½ tsp, கறிவேப்பிலை", "நல்லெண்ணெய் — 1 tsp, உப்பு"],
    steps: ["வரகு wash பண்ணி, 1:2.5 water-ல cook — 15-18 min. Each grain separate ஆ வரணும்", "கூட்டு: பாசிப்பருப்பு + கீரை + மஞ்சள் + 2 cups water — pressure cook 2 whistles", "தேங்காய் + சீரகம் + பச்சை மிளகாய் — mixer-ல coarse grind", "வெந்த பருப்பு+கீரை-ல ground paste சேர், உப்பு, 5 min simmer", "தாளி: 1 tsp oil, கடுகு + கறிவேப்பிலை — கூட்டு-ல கொட்டுங்க", "வரகு + கீரை கூட்டு — millet thali! 🍽️", "💡 Tip: வரகு first time-ன slightly more water சேருங்க"]
  },
  s: {
    ta: "முளை பாசிப்பயிறு சுண்டல்",
    en: "Sprouted Moong Sundal",
    time: "4:30",
    port: "¾ cup sundal",
    cal: 140,
    prot: 10,
    carb: 20,
    fat: 2,
    fib: 5,
    prep: 5,
    cook: 10,
    diff: "Easy",
    htip: "Day 1 recipe! Your reliable protein snack 🌱",
    sw: ["கொண்டைக்கடலை", "மோர்+பாதாம்"],
    ing: ["பாசிப்பயிறு — ½ cup (முளை கட்டியது)", "கடுகு — ½ tsp", "உளுந்து — ½ tsp", "கறிவேப்பிலை — 1 sprig", "பச்சை மிளகாய் — 1 (optional)", "தேங்காய் துருவல் — 1 tbsp", "எலுமிச்சை — ½ (juice)", "நல்லெண்ணெய் — ½ tsp", "உப்பு — taste-க்கு"],
    steps: ["முன் நாள் இரவு: பாசிப்பயிறு wash பண்ணி, 2 cups water-ல ஊறவையுங்க (8 hrs)", "காலை: water வடி, wet cloth-ல wrap பண்ணி, warm place-ல வையுங்க. மாலைக்கு முளை வரும்!", "முளை பயிறு-ல 1.5 cups water சேர், ¼ tsp உப்பு, 10 min boil பண்ணுங்க. Soft-ஆ ஆனா drain பண்ணுங்க", "Kadai-ல ½ tsp oil, கடுகு+உளுந்து பொரிக்குங்க", "கறிவேப்பிலை, பச்சை மிளகாய் (விரும்பினா) சேருங்க", "வேகவைத்த பயிறு சேர், 2 min கிளறுங்க", "இறக்கி, எலுமிச்சை juice பிழிஞ்சு, தேங்காய் தூவி serve! 🌱"]
  },
  n: {
    ta: "ராகி கஞ்சி+மோர்+பொரியல்",
    en: "Ragi Kanji + Buttermilk + Poriyal",
    time: "7:30",
    port: "1 cup ragi kanji + 1 cup poriyal",
    cal: 230,
    prot: 9,
    carb: 38,
    fat: 4,
    fib: 4,
    prep: 5,
    cook: 15,
    diff: "Easy",
    htip: "Day 8 dinner! Warm, calcium-rich sleep food 🌙",
    sw: ["கிச்சடி", "இட்லி 2"],
    ing: ["ராகி மாவு — 3 tbsp", "பால் — ½ cup", "Water — 1 cup", "வெல்லம் — 1 tsp (or skip!)", "ஏலக்காய் — 1 (crushed)", "பொரியல் காய்கறி — 1 cup"],
    steps: ["ராகி மாவு + ½ cup cold water — lump இல்லாம கலக்குங்க", "மீதி ½ cup water boil-க்கு கொண்டு வாங்க, ராகி mixture ஊற்றுங்க — தொடர்ந்து கிளறுங்க!", "3-4 min கிளறுங்க — thick porridge ஆகும். பால் சேர், 2 min", "வெல்லம் + ஏலக்காய் சேர்த்து serve — warm-ஆ குடிங்க", "Side பொரியல்: any வாரத்தில் செய்த method follow", "💡 Tip: Sugar-க்கு பதில் வெல்லம் — minerals rich! Or skip sweetener entirely"]
  },
  tip: {
    ta: "முழு திட்ட வாரம் — எல்லா skills combine!",
    en: "Full plan week — combining all skills!"
  },
  f: 0
}, {
  d: 23,
  p: 3,
  b: {
    ta: "பெசரட்டு+இஞ்சி சட்னி",
    en: "Pesarattu + Ginger Chutney",
    time: "7:30",
    port: "2 pesarattu + 2 tbsp ginger chutney",
    cal: 270,
    prot: 15,
    carb: 36,
    fat: 6,
    fib: 5,
    prep: 5,
    cook: 10,
    diff: "Easy",
    htip: "Day 8 recipe! High protein start — 14g! 💪",
    sw: ["சீலா", "அடை"],
    ing: ["பாசிப்பயிறு — ¾ cup (8hr soaked)", "அரிசி — 2 tbsp", "இஞ்சி — 1 inch", "பச்சை மிளகாய் — 2", "உப்பு — ½ tsp", "நல்லெண்ணெய் — 1 tsp per dosa", "இஞ்சி சட்னி: இஞ்சி 2 inch, கடலைப்பருப்பு 1 tbsp, காய்ந்த மிளகாய் 3, புளி small piece"],
    steps: ["முன் நாள் இரவு: பாசிப்பயிறு + 2 tbsp அரிசி wash பண்ணி ஊறவையுங்க (8 hrs)", "காலை: drain பண்ணி, இஞ்சி + பச்சை மிளகாய் + உப்பு சேர்த்து mixer-ல grind — dosa batter consistency", "Water சிறிதளவு சேர்த்து thin batter ஆக்குங்க — regular dosa batter-ஐ விட slightly thick OK", "சட்னி: கடலைப்பருப்பு dry roast, இஞ்சி+காய்ந்த மிளகாய்+புளி சேர்த்து grind", "Hot tawa-ல batter ஊற்றி spread — thin-ஆ! 1 tsp oil ஓரங்களில்", "Bottom golden ஆனா fold பண்ணி serve — crispy edges வரணும்!", "💡 Tip: பெசரட்டு batter ferment வேண்டாம் — grind பண்ணி direct pour!"]
  },
  l: {
    ta: "தினை+சாம்பார்+கீரை+ரசம்",
    en: "Thinai Rice + Sambar + Keerai Poriyal + Rasam",
    time: "12:30",
    port: "¾ cup thinai + 1 cup sambar + 1 cup keerai + 1 cup rasam",
    cal: 430,
    prot: 19,
    carb: 50,
    fat: 6,
    fib: 7,
    prep: 10,
    cook: 25,
    diff: "Easy",
    htip: "Day 8 lunch! Millet + sambar = your new normal 🌾",
    sw: ["வரகு+சாம்பார்", "சாமை+கீரை"],
    ing: ["தக்காளி — 2 (crushed)", "மிளகு — 1 tsp (coarsely ground)", "பூண்டு — 4 பல் (crushed)", "புளி — சிறிய piece", "ரசம் பொடி — 1.5 tsp", "மஞ்சள் — ¼ tsp", "கொத்தமல்லி — garnish", "கடுகு — ½ tsp", "காய்ந்த மிளகாய் — 1", "நல்லெண்ணெய் — 1 tsp", "உப்பு — taste-க்கு"],
    steps: ["புளி-ய ½ cup warm water-ல 10 min ஊறவை, juice எடுங்க", "தக்காளி-ய hand-ல crush பண்ணுங்க (or rough chop)", "பாத்திரத்தில் புளி juice + crushed தக்காளி + 2 cups water + மஞ்சள் — boil-க்கு கொண்டு வாங்க", "ரசம் பொடி + crushed மிளகு + crushed பூண்டு + உப்பு சேருங்க", "Medium flame-ல 8-10 min boil. நுரை வரும் — ரசம் ready!", "தாளி: 1 tsp oil-ல கடுகு + காய்ந்த மிளகாய். ரசம்-ல கொட்டுங்க", "கொத்தமல்லி தூவி, சூடான சாதம்-ல ஊற்றி serve! 🍜", "💡 Tip: மிளகு அதிகம் போடுங்க — joint pain-க்கு natural medicine!"]
  },
  s: {
    ta: "கொய்யா+3 வால்நட்",
    en: "Guava + 3 Walnuts",
    time: "4:30",
    port: "1 medium guava + 3 walnut halves",
    cal: 130,
    prot: 5,
    carb: 20,
    fat: 5,
    fib: 5,
    prep: 2,
    cook: 0,
    diff: "No cooking!",
    htip: "Day 3 snack! Vitamin C + Omega-3 combo 🍈",
    sw: ["ஆப்பிள்+பாதாம்", "பப்பாளி"],
    ing: ["கொய்யா — 1 medium (ripe)", "வால்நட் — 3 pieces", "சாட் மசாலா — 1 pinch (optional)"],
    steps: ["கொய்யா wash பண்ணி, 4-6 pieces-ஆ cut பண்ணுங்க", "விரும்பினா சாட் மசாலா + little உப்பு தூவுங்க", "வால்நட் 3 pieces-உடன் slowly சாப்பிடுங்க — நன்கு மென்று சாப்பிடுங்க! 🍈", "💡 Tip: கொய்யா விதை-யும் சாப்பிடலாம் — extra fiber!"]
  },
  n: {
    ta: "பெசரட்டு+இஞ்சி சட்னி",
    en: "Pesarattu + Ginger Chutney",
    time: "7:30",
    port: "1 pesarattu + ginger chutney",
    cal: 200,
    prot: 9,
    carb: 22,
    fat: 4,
    fib: 3,
    prep: 5,
    cook: 8,
    diff: "Easy",
    htip: "Light dinner — leftover batter use! Zero waste cooking ♻️",
    sw: ["இட்லி 2", "தயிர் சாதம்"],
    ing: ["Breakfast batter மீதி"],
    steps: ["Breakfast batter மீதி — 1 dosa make, சட்னி side", "💡 Tip: Leftover batter = easiest dinner ever!"]
  },
  tip: {
    ta: "8 days to go — strong finish!",
    en: "8 days remaining — strong finish!"
  },
  f: 0
}, {
  d: 24,
  p: 3,
  b: {
    ta: "முளை தோசை",
    en: "Sprouted Moong Dosa",
    time: "7:30",
    port: "2 dosas + tomato chutney",
    cal: 250,
    prot: 14,
    carb: 38,
    fat: 5,
    fib: 4,
    prep: 5,
    cook: 10,
    diff: "Easy",
    htip: "Day 14 recipe! Sprouted nutrition boost 🌱",
    sw: ["பெசரட்டு", "முட்டை தோசை"],
    ing: ["Regular தோசை மாவு — 1 cup", "முளை பாசிப்பயிறு — ¼ cup (ground fine)", "உப்பு — ½ tsp", "நல்லெண்ணெய் — 1 tsp per dosa"],
    steps: ["முளை பாசிப்பயிறு mixer-ல fine grind", "Regular தோசை மாவு-ல mix — extra nutrition!", "Normal தோசை method — hot tawa, thin spread, crispy edges", "சாம்பார் or சட்னி side-ல serve 🌱", "💡 Tip: Any sprouted pulse — green gram, chana — batter-ல mix பண்ணலாம்!"]
  },
  l: {
    ta: "சாமை+வெண்டைக்காய் சாம்பார்+ரைத்தா",
    en: "Samai Rice + Vendakkai Sambar + Cucumber Raita",
    time: "12:30",
    port: "¾ cup samai + 1.5 cups sambar + ½ cup raita",
    cal: 420,
    prot: 16,
    carb: 52,
    fat: 6,
    fib: 6,
    prep: 10,
    cook: 25,
    diff: "Easy",
    htip: "Day 10 lunch! சாமை = gentle, easy-to-cook millet 🌾",
    sw: ["தினை+சாம்பார்", "வரகு+சாம்பார்"],
    ing: ["சாமை — ½ cup", "துவரம்பருப்பு — ½ cup", "வெண்டைக்காய் — 8-10 (1 inch pieces)", "சாம்பார் பொடி, புளி, தக்காளி, வெங்காயம்", "கடுகு, நல்லெண்ணெய் 1 tsp"],
    steps: ["சாமை wash, 1:2 water cook 12 min — each grain separate ஆ வரணும்", "சாம்பார்: Day 1 method, வெண்டைக்காய் pieces சேருங்க", "⚠️ வெண்டைக்காய்: wash, fully dry, then cut — sticky ஆகாது", "சாமை + வெண்டைக்காய் சாம்பார் serve! 🍚"]
  },
  s: {
    ta: "கொண்டைக்கடலை சுண்டல்",
    en: "Chana Sundal",
    time: "4:30",
    port: "½ cup sundal",
    cal: 150,
    prot: 8,
    carb: 18,
    fat: 3,
    fib: 5,
    prep: 5,
    cook: 15,
    diff: "Easy",
    htip: "Day 4 snack! Batch cook Sunday, enjoy all week 🫘",
    sw: ["முளை சுண்டல்", "மோர்+பாதாம்"],
    ing: ["கொண்டைக்கடலை — ½ cup (8hr soaked)", "தேங்காய் துருவல் — 1 tbsp", "கடுகு — ½ tsp", "உளுந்து — ½ tsp", "காய்ந்த மிளகாய் — 1", "கறிவேப்பிலை — 1 sprig", "நல்லெண்ணெய் — ½ tsp", "உப்பு — taste-க்கு"],
    steps: ["முதல் நாள் இரவு: கொண்டைக்கடலை wash பண்ணி, நிறைய water-ல ஊறவையுங்க (8+ hrs)", "Pressure cooker-ல கடலை + 2 cups fresh water + ¼ tsp உப்பு — 4-5 whistles", "Soft-ஆ வேகணும் but mushy ஆகக்கூடாது. Drain பண்ணுங்க", "Kadai-ல ½ tsp oil, கடுகு பொரி, உளுந்து+காய்ந்த மிளகாய்+கறிவேப்பிலை", "வடித்த கடலை சேர், 2 min medium flame-ல கிளறுங்க", "உப்பு adjust, தேங்காய் துருவல் தூவி serve! 🫘", "💡 Tip: Extra சுண்டல் fridge-ல 2 days keep ஆகும்"]
  },
  n: {
    ta: "சப்பாத்தி+கீரை பருப்பு",
    en: "Chapati + Keerai Dal",
    time: "7:30",
    port: "1 chapati + 1 cup keerai dal",
    cal: 240,
    prot: 12,
    carb: 32,
    fat: 5,
    fib: 5,
    prep: 10,
    cook: 20,
    diff: "Easy",
    htip: "Day 6 dinner! Iron + calcium rich night meal 🥬",
    sw: ["இட்லி+சாம்பார்", "கிச்சடி"],
    ing: ["பாசிப்பருப்பு — ½ cup", "கீரை (பசலை/முளைக்கீரை) — 2 cups (washed, chopped)", "பூண்டு — 3 பல்", "தக்காளி — 1 small", "மஞ்சள் — ¼ tsp", "கடுகு, சீரகம் — ½ tsp each", "காய்ந்த மிளகாய் — 1", "நல்லெண்ணெய் — 1 tsp", "கோதுமை மாவு — ¼ cup", "உப்பு"],
    steps: ["கீரை நன்கு wash பண்ணுங்க — 3 times. Rough chop", "பாசிப்பருப்பு + கீரை + தக்காளி + பூண்டு + மஞ்சள் + 2 cups water — pressure cook 2 whistles", "Open ஆனதும் மசிங்க — semi-smooth, some keerai pieces OK", "தாளி: 1 tsp oil, கடுகு+சீரகம்+காய்ந்த மிளகாய். பருப்பில் கொட்டுங்க, உப்பு adjust", "சப்பாத்தி 1 — lunch method follow", "கீரை பருப்பு + சப்பாத்தி — light, nutritious dinner! 🥬", "💡 Tip: இரவு கீரை = iron absorption better (empty stomach effect)"]
  },
  tip: {
    ta: "Week 4 going strong! 💪",
    en: "Week 4 going strong!"
  },
  f: 0
}, {
  d: 25,
  p: 3,
  b: {
    ta: "ராகி தோசை+தக்காளி சட்னி",
    en: "Ragi Dosa + Tomato Chutney",
    time: "7:30",
    port: "2 ragi dosas + 2 tbsp tomato chutney",
    cal: 260,
    prot: 10,
    carb: 42,
    fat: 6,
    fib: 5,
    prep: 35,
    cook: 15,
    diff: "Medium",
    htip: "Day 4 recipe! ராகி calcium = stronger bones every day 🦴",
    sw: ["ராகி இட்லி", "தோசை 2"],
    ing: ["ராகி மாவு — ¾ cup", "அரிசி மாவு — ¼ cup", "வெங்காயம் — 1 small (fine chop)", "சீரகம் — ½ tsp", "உப்பு — ½ tsp", "Water — 1+ cups (thin batter)", "நல்லெண்ணெய் — 1 tsp per dosa", "தக்காளி சட்னி: தக்காளி 2, வெங்காயம் ½, காய்ந்த மிளகாய் 2, கடலைப்பருப்பு 1 tbsp"],
    steps: ["Batter: ராகி மாவு + அரிசி மாவு (3:1 ratio) + சீரகம் + உப்பு + fine chopped வெங்காயம் mix", "Water சிறிது சிறிதாக சேர்த்து — dosa batter consistency-ல கலக்குங்க (not too thick, not too thin)", "30 min rest வையுங்க — இது முக்கியம்! Batter settle ஆகும்", "சட்னி: 1 tsp oil-ல கடலைப்பருப்பு golden-ஆ வறுங்க", "தக்காளி + வெங்காயம் + காய்ந்த மிளகாய் சேர், 3 min வதக்குங்க (soft ஆகணும்)", "Cool பண்ணி, mixer-ல grind — smooth paste, உப்பு adjust", "தோசை: Non-stick dosa tawa நன்கு சூடாக்குங்க. Few drops oil தடவுங்க", "Batter ஊற்றி, circular-ஆ spread பண்ணுங்க — thin-ஆ! Medium flame", "1 tsp oil ஓரங்களில் விடுங்க. Bottom golden brown ஆனா — fold பண்ணி serve!", "தக்காளி சட்னி-உடன் சூடா சாப்பிடுங்க! ராகி = calcium powerhouse 💪"]
  },
  l: {
    ta: "சிறுதானிய கிச்சடி+தயிர்+அப்பளம்",
    en: "Millet Khichdi + Curd + Papad",
    time: "12:30",
    port: "1 cup khichdi + ¼ cup curd + 1 papad",
    cal: 400,
    prot: 16,
    carb: 45,
    fat: 5,
    fib: 5,
    prep: 10,
    cook: 20,
    diff: "Easy",
    htip: "Day 12 lunch! One-pot comfort meal 🍲",
    sw: ["வரகு+சாம்பார்", "சாதம் கிச்சடி"],
    ing: ["அரிசி — ⅓ cup", "பாசிப்பருப்பு — ⅓ cup", "கேரட் — 1 small (diced)", "பீன்ஸ் — 4-5 (small pieces)", "பட்டாணி — 2 tbsp (optional)", "மஞ்சள் — ¼ tsp", "சீரகம் — ½ tsp", "இஞ்சி — ½ inch (grated)", "நெய் — ½ tsp", "கறிவேப்பிலை — 1 sprig", "உப்பு — ¾ tsp", "Water — 2.5 cups", "தயிர் — ¼ cup (side)"],
    steps: ["அரிசி + பாசிப்பருப்பு wash பண்ணி, 10 min ஊறவையுங்க", "Pressure cooker-ல ½ tsp நெய் சூடாக்கி, சீரகம் + grated இஞ்சி + கறிவேப்பிலை — 30 sec", "Diced காய்கறி சேர், 1 min கிளறுங்க", "அரிசி + பருப்பு + மஞ்சள் + உப்பு + 2.5 cups water சேருங்க", "மூடி, 3 whistles + 5 min simmer", "Open ஆனதும் நன்கு mix — soft, porridge consistency ஆகணும்", "தயிர் side-ல serve. சூடா சாப்பிடுங்க! 🍲", "💡 Tip: FLEX DAY! பாயசம் 2 tbsp OR 1 லட்டு reward — you earned it! 🎉"]
  },
  s: {
    ta: "மோர்+5 பாதாம்",
    en: "Buttermilk + 5 Almonds",
    time: "4:30",
    port: "1 tall glass buttermilk + 5 soaked almonds",
    cal: 120,
    prot: 7,
    carb: 8,
    fat: 6,
    fib: 1,
    prep: 2,
    cook: 0,
    diff: "No cooking!",
    htip: "Day 2 snack! Cooling + healthy fats 🥛",
    sw: ["கொய்யா", "பப்பாளி+flax"],
    ing: ["தயிர் — ¼ cup", "Water — ¾ cup", "உப்பு — 1 pinch", "சீரகப்பொடி — ½ tsp", "கொத்தமல்லி — சிறிதளவு (optional)", "பாதாம் — 5 (overnight soaked preferred)"],
    steps: ["தயிர் + water + உப்பு + சீரகப்பொடி — mixer-ல 30 sec blend பண்ணுங்க (or whisk well)", "Optional: கொத்தமல்லி சிறிதளவு தூவுங்க", "5 பாதாம் ஊறவைத்து இருந்தா, தோல் உரிங்க — easy to digest", "மோர் குடிங்க + பாதாம் மெதுவா சாப்பிடுங்க. Snack done! 🥛", "💡 Tip: பாதாம்-ய முதல் நாள் இரவே water-ல போடுங்க"]
  },
  n: {
    ta: "கம்பு கஞ்சி+பொரியல்",
    en: "Kambu Kanji + Poriyal",
    time: "7:30",
    port: "1 cup kambu porridge + 1 cup poriyal",
    cal: 240,
    prot: 10,
    carb: 40,
    fat: 4,
    fib: 4,
    prep: 5,
    cook: 15,
    diff: "Easy",
    htip: "Day 16 dinner! Iron-rich warm porridge 💪",
    sw: ["ராகி கஞ்சி", "கிச்சடி"],
    ing: ["கம்பு மாவு — 3 tbsp", "பால் — ½ cup", "Water — 1 cup", "வெல்லம் — 1 tsp (or skip)", "ஏலக்காய் — 1 (crushed)", "பொரியல் — any 1 cup"],
    steps: ["கம்பு மாவு + ½ cup cold water — smooth-ஆ கலக்குங்க", "½ cup water boil, கம்பு mixture ஊற்று, stir continuously 3-4 min", "பால் சேர், 2 min simmer — creamy consistency", "வெல்லம் + ஏலக்காய் சேர், warm-ஆ serve", "Side பொரியல் — any veggies available", "💡 Tip: கம்பு = winter millet, body heat தரும். Summer-ல moderate-ஆ சாப்பிடுங்க"]
  },
  tip: {
    ta: "25 days! 5 more days to go — almost there!",
    en: "25 days! Just 5 more — almost there!"
  },
  f: 0
}, {
  d: 26,
  p: 3,
  b: {
    ta: "அடை+அவியல்",
    en: "Adai + Aviyal",
    time: "7:30",
    port: "2 small adai + ½ cup aviyal",
    cal: 300,
    prot: 14,
    carb: 40,
    fat: 8,
    fib: 7,
    prep: 5,
    cook: 15,
    diff: "Easy (batch batter)",
    htip: "Day 11 recipe! Highest protein breakfast = 15g 💪",
    sw: ["பெசரட்டு", "சீலா"],
    ing: ["அடை batter: துவரம்பருப்பு 2 tbsp, கடலைப்பருப்பு 2 tbsp, உளுந்து 1 tbsp, பாசிப்பயிறு 2 tbsp, அரிசி 3 tbsp", "காய்ந்த மிளகாய் — 3, பெருங்காயம் pinch", "அவியல்: கேரட், பீன்ஸ், drum stick, raw banana — ½ cup each", "தேங்காய் paste, தயிர் 2 tbsp, கறிவேப்பிலை"],
    steps: ["முன் நாள்: எல்லா பருப்பு+அரிசி ஊறவை (4-6 hrs), மிளகாய் சேர்த்து coarse grind", "அடை batter thick-ஆ இருக்கணும் — dosa-ஐ விட thick spread", "Hot tawa, batter spread (thick), 1 tsp oil, both sides golden — 3 min each side", "அவியல்: காய்கறி steam 10 min, தேங்காய் paste+தயிர்+உப்பு mix, low flame 5 min", "அடை + அவியல் — South Indian protein breakfast! 💪", "💡 Tip: அடை batter fridge-ல 3 days — batch make!"]
  },
  l: {
    ta: "சப்பாத்தி+பருப்பு+பொரியல்+தயிர்",
    en: "Chapati + Dal + Poriyal + Curd",
    time: "12:30",
    port: "2 chapatis + 1 cup dal + 1 cup carrot poriyal + ¼ cup curd",
    cal: 460,
    prot: 20,
    carb: 52,
    fat: 8,
    fib: 6,
    prep: 15,
    cook: 25,
    diff: "Medium",
    htip: "Day 6 lunch! சப்பாத்தி pro-level by now! 🍽️",
    sw: ["சாதம்+பருப்பு", "சாம்பார் சாதம்"],
    ing: ["கோதுமை மாவு — ½ cup", "துவரம்பருப்பு — ½ cup", "மஞ்சள் — ¼ tsp", "பூண்டு — 3 பல்", "தக்காளி — 1 small", "நெய் — ½ tsp", "கேரட் — 2 medium (grated or coins)", "தேங்காய் — 1 tbsp", "கடுகு, உளுந்து", "நல்லெண்ணெய் — 1 tsp", "உப்பு, தயிர் — ¼ cup"],
    steps: ["பருப்பு: wash பண்ணி, 2 cups water + மஞ்சள் + பூண்டு + chopped தக்காளி — pressure cook 3 whistles", "Open ஆனதும் whisk பண்ணி smooth ஆக்குங்க. உப்பு + ½ tsp நெய் சேருங்க", "சப்பாத்தி: கோதுமை மாவு + pinch உப்பு + warm water — soft dough பிசையுங்க", "5 min rest. 2 equal உருண்டை பண்ணுங்க", "Thin-ஆ roll, hot tawa-ல போடுங்க — bubbles வரும், flip, both sides brown spots வரணும்", "No oil! Dry tawa-ல போதும் — fluffy ஆ வரும்", "கேரட் பொரியல்: 1 tsp oil + கடுகு + உளுந்து, grated கேரட் + உப்பு", "5 min medium flame, தேங்காய் தூவி serve", "சப்பாத்தி + பருப்பு + கேரட் பொரியல் + ¼ cup தயிர் — complete meal! 🍽️"]
  },
  s: {
    ta: "பப்பாளி+ஆளிவிதை",
    en: "Papaya + Flaxseed",
    time: "4:30",
    port: "1 cup papaya + 1 tbsp ground flaxseed",
    cal: 100,
    prot: 4,
    carb: 18,
    fat: 2,
    fib: 3,
    prep: 3,
    cook: 0,
    diff: "No cooking!",
    htip: "Day 12 snack! Enzyme + omega-3 power duo 🦵",
    sw: ["கொய்யா", "மோர்+பாதாம்"],
    ing: ["பப்பாளி — 1 cup (cubed)", "ஆளிவிதை — 1 tsp (ground)"],
    steps: ["பப்பாளி cut, ஆளிவிதை பொடி தூவி சாப்பிடுங்க!", "💡 Tip: ஆளிவிதை whole-ஆ சாப்பிடாதீங்க — grind பண்ணா body absorb பண்ணும்"]
  },
  n: {
    ta: "காய்கறி சூப்+சப்பாத்தி",
    en: "Vegetable Soup + 1 Chapati",
    time: "7:30",
    port: "1.5 cups thick veg soup + 1 small chapati",
    cal: 220,
    prot: 8,
    carb: 30,
    fat: 5,
    fib: 5,
    prep: 10,
    cook: 20,
    diff: "Easy",
    htip: "Day 3 dinner! Pepper soup = anti-inflammatory medicine 🌶️",
    sw: ["இட்லி+சாம்பார்", "ரசம் சாதம்"],
    ing: ["கேரட் — 1 (chopped)", "பீன்ஸ் — 6-8 (chopped)", "முட்டைகோஸ் — 1 cup (chopped)", "தக்காளி — 1 (chopped)", "மிளகு — ½ tsp (crushed)", "மஞ்சள் — ¼ tsp", "பூண்டு — 2 பல் (crushed)", "வெண்ணெய் — ½ tsp (optional)", "கொத்தமல்லி — garnish", "உப்பு — taste-க்கு", "கோதுமை மாவு — ¼ cup (for 1 chapati)", "Water — 3 cups"],
    steps: ["எல்லா காய்கறிகளையும் small pieces-ஆ நறுக்குங்க", "பாத்திரத்தில் 3 cups water + எல்லா காய்கறி + பூண்டு + மஞ்சள் — boil-க்கு கொண்டு வாங்க", "Medium flame-ல 15 min வேகவிடுங்க — காய்கறி fully soft ஆகணும்", "பாதி காய்கறி-ய ladle-ல எடுத்து mash பண்ணுங்க (or half blend). மீதி chunky-ஆ இருக்கட்டும்", "Crushed மிளகு + உப்பு சேர், 2 min boil. கொத்தமல்லி தூவுங்க", "சப்பாத்தி: ¼ cup கோதுமை மாவு + water — soft dough பிசையுங்க. 5 min rest", "சிறிய உருண்டை — thin-ஆ roll பண்ணுங்க. Hot tawa-ல போடுங்க — bubble வரும்போது திருப்புங்க", "Both sides-ம் brown spots வரணும். Oil இல்லாம dry roast-ே போதும்!", "சூடான சூப் + சப்பாத்தி serve. இரவு ideal meal! 🍜"]
  },
  tip: {
    ta: "4 more days! You can do this! 🔥",
    en: "4 days to go — you've got this!"
  },
  f: 0
}, {
  d: 27,
  p: 3,
  b: {
    ta: "இட்லி+சாம்பார்+முட்டை",
    en: "Idli + Sambar + Boiled Egg",
    time: "7:30",
    port: "2 idlis + 1 cup sambar + 1 egg",
    cal: 290,
    prot: 16,
    carb: 42,
    fat: 8,
    fib: 4,
    prep: 10,
    cook: 20,
    diff: "Easy",
    htip: "Classic comfort! 27 days — this is WHO YOU ARE now! 🌟",
    sw: ["தோசை 2+முட்டை", "பெசரட்டு"],
    ing: ["இட்லி மாவு — 1 cup (store-bought OK)", "துவரம்பருப்பு — ½ cup", "பாசிப்பருப்பு — 2 tbsp", "சாம்பார் பொடி — 1.5 tsp", "தக்காளி — 1 (chopped)", "வெங்காயம் — 1 சிறிய (chopped)", "முருங்கை or பீன்ஸ் — ½ cup", "புளி — நெல்லிக்காய் size", "கடுகு — ½ tsp, கறிவேப்பிலை — 1 sprig", "நல்லெண்ணெய் — 1 tsp", "முட்டை — 1", "மஞ்சள் — ¼ tsp, உப்பு"],
    steps: ["இட்லி மாவு ready-யா check பண்ணுங்க. Moulds-ல oil தடவி, மாவு ஊற்றி, idli plate-ல வைங்க", "Cooker-ல 2 cups water கொதிக்கவை. Plate வை, 10-12 min steam பண்ணுங்க. Fork-ல குத்தி clean-ஆ வந்தா ready!", "சாம்பார்: துவரம்+பாசிப்பருப்பு wash பண்ணி, 2 cups water, ¼ tsp மஞ்சள் சேர்த்து pressure cook — 3 whistles", "புளி-ய warm water-ல 10 min ஊறவை, பிழிஞ்சு juice எடுங்க", "Cooker open ஆனதும், புளி juice, நறுக்கின தக்காளி, வெங்காயம், காய்கறி, சாம்பார் பொடி, உப்பு சேருங்க. 8-10 min boil பண்ணுங்க", "தாளி: 1 tsp oil-ல கடுகு பொரி, கறிவேப்பிலை சேர், சாம்பார்-ல கொட்டுங்க", "முட்டை: பாத்திரத்தில் water, முட்டை போடுங்க. Boil ஆனதும் 8 min வை. Cold water-ல போடுங்க, easy-ஆ உரியும்", "இட்லி + சாம்பார் + boiled egg serve பண்ணுங்க! 🍽️"]
  },
  l: {
    ta: "முருங்கை சாம்பார்+பீட்ரூட்+ரசம்",
    en: "Rice + Drumstick Sambar + Beetroot Poriyal + Rasam",
    time: "12:30",
    port: "¾ cup rice + 1 cup sambar + 1 cup beet poriyal + 1 cup rasam",
    cal: 440,
    prot: 17,
    carb: 52,
    fat: 6,
    fib: 6,
    prep: 15,
    cook: 25,
    diff: "Medium",
    htip: "Day 3 lunch! முருங்கை = calcium powerhouse for bones 🦴",
    sw: ["கத்தரிக்காய் சாம்பார்", "சாம்பார்+கேரட்"],
    ing: ["துவரம்பருப்பு — ½ cup", "முருங்கை — 2 sticks (3 inch pieces)", "சாம்பார் பொடி — 1.5 tsp", "புளி — நெல்லிக்காய் size", "தக்காளி — 1", "வெங்காயம் — 1 சிறிய", "மஞ்சள் — ¼ tsp", "நல்லெண்ணெய் — 1 tsp", "கடுகு, கறிவேப்பிலை", "பீட்ரூட் — 1 medium (grated)", "தேங்காய் துருவல் — 1 tbsp", "உப்பு — taste-க்கு"],
    steps: ["துவரம்பருப்பு + 2 cups water + மஞ்சள் — pressure cook 3 whistles", "முருங்கை: sticks-ஐ 3 inch pieces-ஆ cut பண்ணுங்க. புளி water-ல ஊறவையுங்க", "Kadai-ல 1 tsp oil, கடுகு பொரி, வெங்காயம்+தக்காளி 3 min வதக்குங்க", "முருங்கை pieces சேர், 2 tbsp water, மூடி போட்டு 5 min cook", "வெந்த பருப்பு + புளி juice + சாம்பார் பொடி + உப்பு சேர். 10 min boil", "கறிவேப்பிலை தூவி இறக்குங்க", "பீட்ரூட் பொரியல்: 1 tsp oil-ல கடுகு தாளி, grated பீட்ரூட் சேர், ¼ tsp உப்பு", "மூடி போட்டு 8 min medium flame — கிளறி, தேங்காய் தூவி serve! 🥗"]
  },
  s: {
    ta: "முட்டை+Green Tea",
    en: "Boiled Egg + Green Tea",
    time: "4:30",
    port: "1 boiled egg + 1 cup green tea",
    cal: 80,
    prot: 7,
    carb: 2,
    fat: 5,
    fib: 0,
    prep: 2,
    cook: 10,
    diff: "Easy",
    htip: "Day 8 snack! Quick protein boost ☕",
    sw: ["மோர்+பாதாம்", "கொய்யா"],
    ing: ["முட்டை — 1", "Green tea bag — 1", "தண்ணீர் — 1 cup"],
    steps: ["முட்டை boil 8 min, cold water-ல cool, உரிங்க", "Green tea: boiling water ஊற்றி, 3 min steep, bag remove", "Pinch மிளகு தூவி சாப்பிடுங்க! Simple + powerful snack 💪"]
  },
  n: {
    ta: "அடை+அவியல் Light",
    en: "Adai + Aviyal (Light)",
    time: "7:30",
    port: "1 adai + ½ cup aviyal",
    cal: 240,
    prot: 10,
    carb: 25,
    fat: 5,
    fib: 4,
    prep: 5,
    cook: 8,
    diff: "Easy",
    htip: "Light dinner with batch batter. Almost at the finish line! 🏁",
    sw: ["இட்லி 2", "தயிர் சாதம்"],
    ing: ["Batch அடை batter"],
    steps: ["Fridge batter — 1 அடை make, சட்னி side", "💡 3 days to go! Your body is thanking you!"]
  },
  tip: {
    ta: "3 more days! Final stretch! 🏁",
    en: "3 more days — the final stretch!"
  },
  f: 0
}, {
  d: 28,
  p: 3,
  b: {
    ta: "இட்லி+ஆளிவிதை சட்னி+சாம்பார்",
    en: "Idli + Flax Chutney + Sambar",
    time: "7:30",
    port: "2 idlis + 2 tbsp flax chutney + ½ cup sambar",
    cal: 260,
    prot: 12,
    carb: 42,
    fat: 7,
    fib: 5,
    prep: 10,
    cook: 15,
    diff: "Easy",
    htip: "Day 5 recipe! ஆளிவிதை = Omega-3 for joint health — full circle! 🦵",
    sw: ["இட்லி+தேங்காய்", "தோசை 2+flax"],
    ing: ["இட்லி மாவு — ¾ cup", "காலை சாம்பார் மீதி — 1 cup", "(புதிதா பண்ண வேண்டாம்!)"],
    steps: ["காலை சாம்பார் மீதி-ய reheat பண்ணுங்க — medium flame-ல, கொதிக்கும் வரை", "இட்லி: காலை same method — moulds-ல oil, மாவு ஊற்று, 10-12 min steam", "சூடா serve பண்ணுங்க. இரவு எண்ணெய் தவிர்க்கலாம், சாம்பார் already tasty!", "💡 Tip: இரவு 8 PM-க்குள் சாப்பிட்டு முடிங்க — weight loss-க்கு முக்கியம்!"]
  },
  l: {
    ta: "தினை+சாம்பார்+கீரை+ரசம்",
    en: "Thinai Rice + Sambar + Keerai Poriyal + Rasam",
    time: "12:30",
    port: "¾ cup thinai + 1 cup sambar + 1 cup keerai + 1 cup rasam",
    cal: 430,
    prot: 19,
    carb: 50,
    fat: 6,
    fib: 7,
    prep: 10,
    cook: 25,
    diff: "Easy",
    htip: "Day 8 lunch! Millet thali — your healthy habit 🌾",
    sw: ["வரகு+கூட்டு", "சாதம்+சாம்பார்"],
    ing: ["தக்காளி — 2 (crushed)", "மிளகு — 1 tsp (coarsely ground)", "பூண்டு — 4 பல் (crushed)", "புளி — சிறிய piece", "ரசம் பொடி — 1.5 tsp", "மஞ்சள் — ¼ tsp", "கொத்தமல்லி — garnish", "கடுகு — ½ tsp", "காய்ந்த மிளகாய் — 1", "நல்லெண்ணெய் — 1 tsp", "உப்பு — taste-க்கு"],
    steps: ["புளி-ய ½ cup warm water-ல 10 min ஊறவை, juice எடுங்க", "தக்காளி-ய hand-ல crush பண்ணுங்க (or rough chop)", "பாத்திரத்தில் புளி juice + crushed தக்காளி + 2 cups water + மஞ்சள் — boil-க்கு கொண்டு வாங்க", "ரசம் பொடி + crushed மிளகு + crushed பூண்டு + உப்பு சேருங்க", "Medium flame-ல 8-10 min boil. நுரை வரும் — ரசம் ready!", "தாளி: 1 tsp oil-ல கடுகு + காய்ந்த மிளகாய். ரசம்-ல கொட்டுங்க", "கொத்தமல்லி தூவி, சூடான சாதம்-ல ஊற்றி serve! 🍜", "💡 Tip: மிளகு அதிகம் போடுங்க — joint pain-க்கு natural medicine!"]
  },
  s: {
    ta: "வேர்க்கடலை சுண்டல்",
    en: "Peanut Sundal",
    time: "4:30",
    port: "3 tbsp peanut sundal",
    cal: 140,
    prot: 7,
    carb: 10,
    fat: 7,
    fib: 3,
    prep: 5,
    cook: 15,
    diff: "Easy",
    htip: "Day 6 snack! Protein + good fats 🥜",
    sw: ["கொண்டைக்கடலை", "முளை சுண்டல்"],
    ing: ["வேர்க்கடலை (raw) — 3 tbsp", "கடுகு — ¼ tsp", "உளுந்து — ¼ tsp", "கறிவேப்பிலை — few leaves", "காய்ந்த மிளகாய் — 1", "தேங்காய் — 1 tsp", "எலுமிச்சை — few drops", "உப்பு — pinch"],
    steps: ["முதல் நாள்: raw வேர்க்கடலை water-ல ஊறவையுங்க (8 hrs)", "Pressure cook 2 whistles — soft ஆகணும், drain", "Kadai-ல ¼ tsp oil, கடுகு+உளுந்து+மிளகாய்+கறிவேப்பிலை தாளி", "கடலை சேர், உப்பு, 2 min mix", "தேங்காய் + எலுமிச்சை drops தூவி serve! 🥜"]
  },
  n: {
    ta: "கிச்சடி+தயிர்",
    en: "Moong Dal Khichdi + Curd",
    time: "7:30",
    port: "1 cup khichdi + ¼ cup curd",
    cal: 270,
    prot: 12,
    carb: 42,
    fat: 5,
    fib: 4,
    prep: 10,
    cook: 20,
    diff: "Easy",
    htip: "Day 7 dinner! Healing food — 2 more days! 🍲",
    sw: ["தயிர் சாதம்", "இட்லி 2"],
    ing: ["அரிசி — ⅓ cup", "பாசிப்பருப்பு — ⅓ cup", "கேரட் — 1 small (diced)", "பீன்ஸ் — 4-5 (small pieces)", "பட்டாணி — 2 tbsp (optional)", "மஞ்சள் — ¼ tsp", "சீரகம் — ½ tsp", "இஞ்சி — ½ inch (grated)", "நெய் — ½ tsp", "கறிவேப்பிலை — 1 sprig", "உப்பு — ¾ tsp", "Water — 2.5 cups", "தயிர் — ¼ cup (side)"],
    steps: ["அரிசி + பாசிப்பருப்பு wash பண்ணி, 10 min ஊறவையுங்க", "Pressure cooker-ல ½ tsp நெய் சூடாக்கி, சீரகம் + grated இஞ்சி + கறிவேப்பிலை — 30 sec", "Diced காய்கறி சேர், 1 min கிளறுங்க", "அரிசி + பருப்பு + மஞ்சள் + உப்பு + 2.5 cups water சேருங்க", "மூடி, 3 whistles + 5 min simmer", "Open ஆனதும் நன்கு mix — soft, porridge consistency ஆகணும்", "தயிர் side-ல serve. சூடா சாப்பிடுங்க! 🍲", "💡 Tip: FLEX DAY! பாயசம் 2 tbsp OR 1 லட்டு reward — you earned it! 🎉"]
  },
  tip: {
    ta: "2 more days! நம்பிக்கை வையுங்க!",
    en: "2 more days — believe in yourself!"
  },
  f: 0
}, {
  d: 29,
  p: 3,
  b: {
    ta: "பெசரட்டு+இஞ்சி சட்னி",
    en: "Pesarattu + Ginger Chutney",
    time: "7:30",
    port: "2 pesarattu + 2 tbsp ginger chutney",
    cal: 270,
    prot: 15,
    carb: 36,
    fat: 6,
    fib: 5,
    prep: 5,
    cook: 10,
    diff: "Easy",
    htip: "Day 8 recipe! Second-to-last day — you're a health champion! 🏆",
    sw: ["சீலா", "அடை"],
    ing: ["பாசிப்பயிறு — ¾ cup (8hr soaked)", "அரிசி — 2 tbsp", "இஞ்சி — 1 inch", "பச்சை மிளகாய் — 2", "உப்பு — ½ tsp", "நல்லெண்ணெய் — 1 tsp per dosa", "இஞ்சி சட்னி: இஞ்சி 2 inch, கடலைப்பருப்பு 1 tbsp, காய்ந்த மிளகாய் 3, புளி small piece"],
    steps: ["முன் நாள் இரவு: பாசிப்பயிறு + 2 tbsp அரிசி wash பண்ணி ஊறவையுங்க (8 hrs)", "காலை: drain பண்ணி, இஞ்சி + பச்சை மிளகாய் + உப்பு சேர்த்து mixer-ல grind — dosa batter consistency", "Water சிறிதளவு சேர்த்து thin batter ஆக்குங்க — regular dosa batter-ஐ விட slightly thick OK", "சட்னி: கடலைப்பருப்பு dry roast, இஞ்சி+காய்ந்த மிளகாய்+புளி சேர்த்து grind", "Hot tawa-ல batter ஊற்றி spread — thin-ஆ! 1 tsp oil ஓரங்களில்", "Bottom golden ஆனா fold பண்ணி serve — crispy edges வரணும்!", "💡 Tip: பெசரட்டு batter ferment வேண்டாம் — grind பண்ணி direct pour!"]
  },
  l: {
    ta: "வரகு+கீரை கூட்டு+ரசம்",
    en: "Varagu Rice + Keerai Kootu + Rasam",
    time: "12:30",
    port: "¾ cup varagu + 1 cup kootu + 1 cup rasam + papad",
    cal: 420,
    prot: 16,
    carb: 48,
    fat: 6,
    fib: 8,
    prep: 10,
    cook: 25,
    diff: "Medium",
    htip: "Day 15 lunch! Fiber-rich millet lunch — penultimate day 🌾",
    sw: ["தினை+கூட்டு", "சாதம்+கூட்டு"],
    ing: ["வரகு — ½ cup", "பாசிப்பருப்பு — ¼ cup", "கீரை (பசலை/முளைக்கீரை) — 2 cups (chopped)", "தேங்காய் — 2 tbsp (grated)", "சீரகம் — ½ tsp", "பச்சை மிளகாய் — 1", "கடுகு — ½ tsp, கறிவேப்பிலை", "நல்லெண்ணெய் — 1 tsp, உப்பு"],
    steps: ["வரகு wash பண்ணி, 1:2.5 water-ல cook — 15-18 min. Each grain separate ஆ வரணும்", "கூட்டு: பாசிப்பருப்பு + கீரை + மஞ்சள் + 2 cups water — pressure cook 2 whistles", "தேங்காய் + சீரகம் + பச்சை மிளகாய் — mixer-ல coarse grind", "வெந்த பருப்பு+கீரை-ல ground paste சேர், உப்பு, 5 min simmer", "தாளி: 1 tsp oil, கடுகு + கறிவேப்பிலை — கூட்டு-ல கொட்டுங்க", "வரகு + கீரை கூட்டு — millet thali! 🍽️", "💡 Tip: வரகு first time-ன slightly more water சேருங்க"]
  },
  s: {
    ta: "முளை பாசிப்பயிறு சுண்டல்",
    en: "Sprouted Moong Sundal",
    time: "4:30",
    port: "¾ cup sundal",
    cal: 140,
    prot: 10,
    carb: 20,
    fat: 2,
    fib: 5,
    prep: 5,
    cook: 10,
    diff: "Easy",
    htip: "Day 1 recipe! The snack that started it all 🌱",
    sw: ["கொண்டைக்கடலை", "கொய்யா"],
    ing: ["பாசிப்பயிறு — ½ cup (முளை கட்டியது)", "கடுகு — ½ tsp", "உளுந்து — ½ tsp", "கறிவேப்பிலை — 1 sprig", "பச்சை மிளகாய் — 1 (optional)", "தேங்காய் துருவல் — 1 tbsp", "எலுமிச்சை — ½ (juice)", "நல்லெண்ணெய் — ½ tsp", "உப்பு — taste-க்கு"],
    steps: ["முன் நாள் இரவு: பாசிப்பயிறு wash பண்ணி, 2 cups water-ல ஊறவையுங்க (8 hrs)", "காலை: water வடி, wet cloth-ல wrap பண்ணி, warm place-ல வையுங்க. மாலைக்கு முளை வரும்!", "முளை பயிறு-ல 1.5 cups water சேர், ¼ tsp உப்பு, 10 min boil பண்ணுங்க. Soft-ஆ ஆனா drain பண்ணுங்க", "Kadai-ல ½ tsp oil, கடுகு+உளுந்து பொரிக்குங்க", "கறிவேப்பிலை, பச்சை மிளகாய் (விரும்பினா) சேருங்க", "வேகவைத்த பயிறு சேர், 2 min கிளறுங்க", "இறக்கி, எலுமிச்சை juice பிழிஞ்சு, தேங்காய் தூவி serve! 🌱"]
  },
  n: {
    ta: "ராகி கஞ்சி+மோர்+பொரியல்",
    en: "Ragi Kanji + Buttermilk + Poriyal",
    time: "7:30",
    port: "1 cup ragi kanji + 1 cup poriyal",
    cal: 230,
    prot: 9,
    carb: 38,
    fat: 4,
    fib: 4,
    prep: 5,
    cook: 15,
    diff: "Easy",
    htip: "Day 8 dinner! One more sleep and you're DONE! 🌙",
    sw: ["கிச்சடி", "இட்லி 2"],
    ing: ["ராகி மாவு — 3 tbsp", "பால் — ½ cup", "Water — 1 cup", "வெல்லம் — 1 tsp (or skip!)", "ஏலக்காய் — 1 (crushed)", "பொரியல் காய்கறி — 1 cup"],
    steps: ["ராகி மாவு + ½ cup cold water — lump இல்லாம கலக்குங்க", "மீதி ½ cup water boil-க்கு கொண்டு வாங்க, ராகி mixture ஊற்றுங்க — தொடர்ந்து கிளறுங்க!", "3-4 min கிளறுங்க — thick porridge ஆகும். பால் சேர், 2 min", "வெல்லம் + ஏலக்காய் சேர்த்து serve — warm-ஆ குடிங்க", "Side பொரியல்: any வாரத்தில் செய்த method follow", "💡 Tip: Sugar-க்கு பதில் வெல்லம் — minerals rich! Or skip sweetener entirely"]
  },
  tip: {
    ta: "Tomorrow is the FINAL DAY! 🏁",
    en: "Tomorrow is DAY 30 — the grand finale!"
  },
  f: 0
}, {
  d: 30,
  p: 3,
  b: {
    ta: "சீலா+புதினா சட்னி",
    en: "Moong Dal Chilla + Mint Chutney",
    time: "7:30",
    port: "2 chillas + 2 tbsp mint chutney",
    cal: 240,
    prot: 16,
    carb: 28,
    fat: 8,
    fib: 4,
    prep: 10,
    cook: 10,
    diff: "Easy",
    htip: "🎉 DAY 30! FINAL DAY! You did it, Amma! 30 days of healthy eating = NEW YOU! 🌟🏆💪",
    sw: ["பெசரட்டு", "இட்லி+முட்டை"],
    ing: ["கடலை மாவு (besan) — ¾ cup", "வெங்காயம் — 1 (fine chop)", "தக்காளி — 1 (fine chop)", "கொத்தமல்லி — 2 tbsp (chopped)", "பச்சை மிளகாய் — 1 (fine chop)", "சீரகம் — ½ tsp", "மஞ்சள் — ¼ tsp, உப்பு — ½ tsp", "Water — ¾ cup", "நல்லெண்ணெய் — 1 tsp per cheela", "புதினா சட்னி: புதினா 1 cup, கொத்தமல்லி ½ cup, பச்சை மிளகாய் 2, எலுமிச்சை juice"],
    steps: ["Batter: கடலை மாவு + water mix — thin pancake batter, no lumps", "வெங்காயம், தக்காளி, கொத்தமல்லி, பச்சை மிளகாய், சீரகம், மஞ்சள், உப்பு சேருங்க", "சட்னி: புதினா+கொத்தமல்லி+மிளகாய்+எலுமிச்சை+உப்பு — grind smooth", "Hot tawa-ல 1 tsp oil, batter ஊற்றி thin-ஆ spread", "Medium flame, 2 min — bottom golden, flip, 1 min", "Crispy cheela + புதினா சட்னி — restaurant-quality breakfast! 🥞", "💡 Tip: Batter-ல grated கேரட்/பீட்ரூட் சேர்த்தா extra nutrition!"]
  },
  l: {
    ta: "சுண்டல் மசாலா+சப்பாத்தி+சாலட்",
    en: "Chapati + Chana Masala + Salad",
    time: "12:30",
    port: "2 chapatis + 1 cup chana masala + 1 cup cucumber-tomato salad",
    cal: 450,
    prot: 20,
    carb: 52,
    fat: 8,
    fib: 7,
    prep: 15,
    cook: 25,
    diff: "Medium",
    htip: "Day 7 lunch — your best recipe! Highest protein lunch — ending with a BANG! 💥",
    sw: ["சப்பாத்தி+பருப்பு", "சாதம்+சாம்பார்"],
    ing: ["கொண்டைக்கடலை — ¾ cup (8hr soaked, boiled)", "வெங்காயம் — 1 (fine chop)", "தக்காளி — 2 (puree or fine chop)", "இஞ்சி-பூண்டு paste — 1 tsp", "மிளகாய் பொடி — ½ tsp", "மல்லிப்பொடி — 1 tsp", "சீரகப்பொடி — ½ tsp", "மஞ்சள் — ¼ tsp", "கரம் மசாலா — ¼ tsp", "நல்லெண்ணெய் — 1 tsp", "கொத்தமல்லி — garnish", "உப்பு, கோதுமை மாவு — ½ cup"],
    steps: ["கொண்டைக்கடலை முன் நாள் ஊறவை + காலை pressure cook (4 whistles)", "Kadai-ல 1 tsp oil, வெங்காயம் golden brown ஆகும் வரை 4 min வதக்குங்க", "இஞ்சி-பூண்டு paste சேர், 1 min raw smell போகணும்", "தக்காளி சேர், 3-4 min — மசிய வதக்குங்க, oil separate ஆகணும்", "மிளகாய் + மல்லி + சீரகம் + மஞ்சள் பொடி சேர், 1 min கிளறுங்க", "வேகவைத்த கடலை + ½ cup water + உப்பு சேருங்க", "Medium flame-ல 8-10 min. இடையில் சில கடலை-ய ladle-ல மசிங்க — gravy thick ஆகும்", "கரம் மசாலா + கொத்தமல்லி தூவி இறக்குங்க", "சப்பாத்தி 2 — Day 6 method follow", "சுண்டல் மசாலா + சப்பாத்தி + side salad — restaurant quality at home! 🎉"]
  },
  s: {
    ta: "கொய்யா+3 வால்நட்",
    en: "Guava + 3 Walnuts",
    time: "4:30",
    port: "1 medium guava + 3 walnut halves",
    cal: 130,
    prot: 5,
    carb: 20,
    fat: 5,
    fib: 5,
    prep: 2,
    cook: 0,
    diff: "No cooking!",
    htip: "Last snack! Simple, healthy, delicious — just like your new lifestyle 🍈",
    sw: ["ஆப்பிள்+பாதாம்", "பப்பாளி"],
    ing: ["கொய்யா — 1 medium (ripe)", "வால்நட் — 3 pieces", "சாட் மசாலா — 1 pinch (optional)"],
    steps: ["கொய்யா wash பண்ணி, 4-6 pieces-ஆ cut பண்ணுங்க", "விரும்பினா சாட் மசாலா + little உப்பு தூவுங்க", "வால்நட் 3 pieces-உடன் slowly சாப்பிடுங்க — நன்கு மென்று சாப்பிடுங்க! 🍈", "💡 Tip: கொய்யா விதை-யும் சாப்பிடலாம் — extra fiber!"]
  },
  n: {
    ta: "இட்லி+சாம்பார் Light",
    en: "Idli + Sambar (Light)",
    time: "7:30",
    port: "2 idlis + 1 cup sambar",
    cal: 250,
    prot: 10,
    carb: 40,
    fat: 4,
    fib: 3,
    prep: 5,
    cook: 12,
    diff: "Easy",
    htip: "🏆 FINAL DINNER! Same meal as Day 1 — but you're a completely different person now! Lighter, healthier, stronger knees! 🌟",
    sw: ["தயிர் சாதம்", "கிச்சடி"],
    ing: ["இட்லி மாவு — ¾ cup", "காலை சாம்பார் மீதி — 1 cup", "(புதிதா பண்ண வேண்டாம்!)"],
    steps: ["காலை சாம்பார் மீதி-ய reheat பண்ணுங்க — medium flame-ல, கொதிக்கும் வரை", "இட்லி: காலை same method — moulds-ல oil, மாவு ஊற்று, 10-12 min steam", "சூடா serve பண்ணுங்க. இரவு எண்ணெய் தவிர்க்கலாம், சாம்பார் already tasty!", "💡 Tip: இரவு 8 PM-க்குள் சாப்பிட்டு முடிங்க — weight loss-க்கு முக்கியம்!"]
  },
  tip: {
    ta: "🏆🎉 30 DAYS COMPLETE! நீங்க சாதிச்சீங்க! YOU DID IT!",
    en: "🏆🎉 30 DAYS COMPLETE! You did it, Amma! 🎊"
  },
  f: 1
}];
const MEALS = [...ML_DATA];
const PH = [{
  ta: "அடிப்படை",
  en: "Foundation",
  c: "#2563eb",
  g: "linear-gradient(135deg,#1e40af,#3b82f6)"
}, {
  ta: "புரத வாரம்",
  en: "Protein Boost",
  c: "#059669",
  g: "linear-gradient(135deg,#047857,#10b981)"
}, {
  ta: "சிறுதானிய வாரம்",
  en: "Millet Week",
  c: "#d97706",
  g: "linear-gradient(135deg,#b45309,#f59e0b)"
}, {
  ta: "முழு திட்டம்",
  en: "Full Plan",
  c: "#7c3aed",
  g: "linear-gradient(135deg,#5b21b6,#8b5cf6)"
}];
const CK = [{
  k: "wm",
  i: "🌅",
  t: "காலை warm water",
  e: "Warm water"
}, {
  k: "bf",
  i: "🥣",
  t: "காலை உணவு plan படி",
  e: "Breakfast"
}, {
  k: "lu",
  i: "🍛",
  t: "மதிய உணவு plan படி",
  e: "Lunch"
}, {
  k: "sn",
  i: "🫘",
  t: "சிற்றுண்டி plan படி",
  e: "Snack"
}, {
  k: "dn",
  i: "🌙",
  t: "இரவு 8 PM முன்",
  e: "Dinner < 8PM"
}, {
  k: "ol",
  i: "🫗",
  t: "எண்ணெய் 2-3 tsp",
  e: "Oil limit"
}, {
  k: "wt",
  i: "💧",
  t: "தண்ணீர் 8+ glass",
  e: "Water 8+"
}, {
  k: "tu",
  i: "🟡",
  t: "மஞ்சள்+மிளகு",
  e: "Turmeric"
}, {
  k: "su",
  i: "☀️",
  t: "வெயில் 15 min",
  e: "Sunlight"
}, {
  k: "nj",
  i: "🚫",
  t: "Sweet/fried இல்ல",
  e: "No junk"
}];
const MOTIV = [["1 kg குறைஞ்சா = முழங்காலில் 4 kg pressure குறையும்!", "Every 1 kg = 4 kg less on knees 🦵"], ["இது diet இல்ல — same உணவு, புது முறை!", "Same food, new method 💚"], ["Slow and steady wins!", "Consistency beats intensity 🐢"], ["உங்க முழங்கால் நன்றி சொல்லுது!", "Your knees thank you! 🦵"], ["பொரியல் முதல், சாதம் கடைசி!", "Veggies first, rice last! 🥬"], ["மஞ்சள்+மிளகு = natural pain relief!", "Turmeric + pepper = healing 🟡"], ["தண்ணீர் = free medicine!", "Water = free medicine 💧"], ["ராகி = calcium queen! 🌾", "Ragi = calcium queen! 👑"], ["ஒவ்வொரு ✅ = ஒரு வெற்றி!", "Every checkmark = a victory! 🏆"], ["நீங்க champion! Keep going!", "You are a champion! 💪"]];
const QUIZ = [{
  q: "எந்த millet-ல calcium அதிகம்?",
  o: ["வரகு", "ராகி", "தினை", "சாமை"],
  a: 1,
  f: "ராகி-ல 344mg calcium per 100g! Milk-விட அதிகம்!"
}, {
  q: "Weight loss-க்கு எது important?",
  o: ["Exercise", "Diet", "Sleep", "All three"],
  a: 3,
  f: "Exercise+Diet+Sleep எல்லாமே important! But diet = 80% impact"
}, {
  q: "1 kg fat = எத்தனை calories?",
  o: ["3,500", "7,700", "5,000", "10,000"],
  a: 1,
  f: "1 kg fat ≈ 7,700 cal. Per day 500 cal குறைச்சா 2 weeks-ல 1 kg!"
}, {
  q: "எது inflammation குறைக்கும்?",
  o: ["Sugar", "Turmeric", "Maida", "Fried food"],
  a: 1,
  f: "மஞ்சள் (curcumin) = nature's anti-inflammatory! Joint pain-க்கு best!"
}, {
  q: "தண்ணீர் எப்போ குடிக்கணும்?",
  o: ["சாப்பிடும்போது", "சாப்பாட்டுக்கு 30 min முன்", "சாப்பிட்ட உடனே", "எப்போ வேணா"],
  a: 1,
  f: "சாப்பாட்டுக்கு 30 min முன் water = digestion better + less overeating!"
}];

// ── NUTRITION LOOKUP (per serving as in plan) ───────────────
// Maps meal name keywords → {cal, prot, carb, fat, fib}
const NL = {
  "இட்லி+சாம்பார்+முட்டை": {
    cal: 310,
    prot: 14,
    carb: 42,
    fat: 8,
    fib: 4
  },
  "இட்லி+சாம்பார்": {
    cal: 250,
    prot: 8,
    carb: 40,
    fat: 4,
    fib: 3
  },
  "இட்லி+ஆளிவிதை": {
    cal: 300,
    prot: 11,
    carb: 38,
    fat: 9,
    fib: 5
  },
  "ஓட்ஸ் உப்மா": {
    cal: 280,
    prot: 10,
    carb: 38,
    fat: 6,
    fib: 5
  },
  "ராகி தோசை": {
    cal: 270,
    prot: 8,
    carb: 44,
    fat: 5,
    fib: 4
  },
  "காய்கறி பொங்கல்": {
    cal: 290,
    prot: 9,
    carb: 46,
    fat: 5,
    fib: 3
  },
  "பெசரட்டு": {
    cal: 260,
    prot: 14,
    carb: 32,
    fat: 6,
    fib: 5
  },
  "சீலா": {
    cal: 240,
    prot: 13,
    carb: 28,
    fat: 6,
    fib: 4
  },
  "முட்டை தோசை": {
    cal: 290,
    prot: 12,
    carb: 36,
    fat: 9,
    fib: 2
  },
  "அடை": {
    cal: 300,
    prot: 12,
    carb: 40,
    fat: 7,
    fib: 6
  },
  "முளை தோசை": {
    cal: 250,
    prot: 11,
    carb: 34,
    fat: 5,
    fib: 4
  },
  "பொங்கல்": {
    cal: 290,
    prot: 9,
    carb: 46,
    fat: 5,
    fib: 3
  },
  "சாம்பார் சாதம்": {
    cal: 380,
    prot: 12,
    carb: 58,
    fat: 7,
    fib: 6
  },
  "சாதம்+பருப்பு": {
    cal: 370,
    prot: 13,
    carb: 54,
    fat: 6,
    fib: 4
  },
  "மோர் குழம்பு": {
    cal: 350,
    prot: 10,
    carb: 50,
    fat: 8,
    fib: 3
  },
  "சப்பாத்தி+பருப்பு": {
    cal: 400,
    prot: 14,
    carb: 56,
    fat: 7,
    fib: 5
  },
  "சுண்டல் மசாலா": {
    cal: 400,
    prot: 16,
    carb: 48,
    fat: 8,
    fib: 8
  },
  "முருங்கை சாம்பார்": {
    cal: 360,
    prot: 11,
    carb: 52,
    fat: 7,
    fib: 6
  },
  "தினை+சாம்பார்": {
    cal: 350,
    prot: 11,
    carb: 50,
    fat: 6,
    fib: 5
  },
  "வரகு+கீரை": {
    cal: 340,
    prot: 12,
    carb: 48,
    fat: 6,
    fib: 6
  },
  "சாமை": {
    cal: 360,
    prot: 10,
    carb: 54,
    fat: 5,
    fib: 4
  },
  "சிறுதானிய கிச்சடி": {
    cal: 320,
    prot: 11,
    carb: 48,
    fat: 5,
    fib: 5
  },
  "ரசம் சாதம்": {
    cal: 230,
    prot: 6,
    carb: 38,
    fat: 4,
    fib: 3
  },
  "தயிர் சாதம்": {
    cal: 200,
    prot: 7,
    carb: 32,
    fat: 4,
    fib: 1
  },
  "காய்கறி சூப்": {
    cal: 220,
    prot: 7,
    carb: 30,
    fat: 5,
    fib: 4
  },
  "கிச்சடி": {
    cal: 280,
    prot: 10,
    carb: 42,
    fat: 5,
    fib: 4
  },
  "ராகி கஞ்சி": {
    cal: 180,
    prot: 6,
    carb: 32,
    fat: 2,
    fib: 4
  },
  "கம்பு கஞ்சி": {
    cal: 190,
    prot: 7,
    carb: 34,
    fat: 3,
    fib: 4
  },
  "சப்பாத்தி+கீரை": {
    cal: 230,
    prot: 10,
    carb: 32,
    fat: 5,
    fib: 5
  },
  "முளை சுண்டல்": {
    cal: 150,
    prot: 9,
    carb: 20,
    fat: 2,
    fib: 5
  },
  "கொண்டைக்கடலை": {
    cal: 140,
    prot: 8,
    carb: 18,
    fat: 3,
    fib: 5
  },
  "மோர்+5 பாதாம்": {
    cal: 120,
    prot: 6,
    carb: 6,
    fat: 8,
    fib: 2
  },
  "கொய்யா+வால்நட்": {
    cal: 130,
    prot: 4,
    carb: 16,
    fat: 6,
    fib: 5
  },
  "பப்பாளி+ஆளிவிதை": {
    cal: 110,
    prot: 3,
    carb: 18,
    fat: 4,
    fib: 4
  },
  "காப்பி+பேரிச்சை": {
    cal: 100,
    prot: 2,
    carb: 20,
    fat: 2,
    fib: 2
  },
  "முட்டை+Green Tea": {
    cal: 90,
    prot: 7,
    carb: 1,
    fat: 5,
    fib: 0
  },
  "வேர்க்கடலை": {
    cal: 130,
    prot: 6,
    carb: 6,
    fat: 10,
    fib: 2
  },
  "ராகி கூழ்": {
    cal: 120,
    prot: 4,
    carb: 24,
    fat: 1,
    fib: 3
  }
};
// Lookup function: tries to match meal name to NL
const getNut = meal => {
  if (!meal) return null;
  // Inline nutrition (from DOCX) takes priority
  if (meal.cal && typeof meal.cal === 'number') return {
    cal: meal.cal,
    prot: meal.prot || 0,
    carb: meal.carb || 0,
    fat: meal.fat || 0,
    fib: meal.fib || 0
  };
  const name = meal.ta || meal.en || "";
  // Fallback to lookup table
  for (const [k, v] of Object.entries(NL)) {
    if (name.includes(k)) return v;
  }
  return null;
};
// Daily total nutrition
const getDayNut = dayData => {
  if (!dayData) return null;
  const meals = ['b', 'l', 's', 'n'];
  let t = {
    cal: 0,
    prot: 0,
    carb: 0,
    fat: 0,
    fib: 0
  };
  let found = false;
  meals.forEach(mk => {
    const n = getNut(dayData[mk]);
    if (n) {
      Object.keys(t).forEach(k => {
        t[k] += n[k];
      });
      found = true;
    }
  });
  return found ? t : null;
};

// ── TAMIL FOOD NUTRITION DATABASE ───────────────────────────
const TAMILFOODS = [{
  cat: "🍚 அரிசி & சிறுதானியம்",
  items: [{
    ta: "வெள்ளை சாதம்",
    en: "White Rice (cooked)",
    srv: "1 cup (200g)",
    cal: 240,
    prot: 4,
    carb: 53,
    fat: 0.4,
    fib: 0.6,
    gi: "High",
    note: "¾ cup-க்கு மேல வேண்டாம்"
  }, {
    ta: "ராகி / கேழ்வரகு",
    en: "Ragi / Finger Millet",
    srv: "1 cup cooked",
    cal: 190,
    prot: 7,
    carb: 36,
    fat: 1.3,
    fib: 4,
    gi: "Low",
    note: "Calcium 344mg/100g! Best for bones 🦴"
  }, {
    ta: "வரகு",
    en: "Kodo Millet",
    srv: "1 cup cooked",
    cal: 180,
    prot: 6,
    carb: 34,
    fat: 1,
    fib: 5,
    gi: "Low",
    note: "Fiber அதிகம். Blood sugar control 💚"
  }, {
    ta: "தினை",
    en: "Foxtail Millet",
    srv: "1 cup cooked",
    cal: 185,
    prot: 6,
    carb: 35,
    fat: 1.5,
    fib: 4,
    gi: "Low",
    note: "Iron rich. Weight loss-க்கு best"
  }, {
    ta: "சாமை",
    en: "Little Millet",
    srv: "1 cup cooked",
    cal: 175,
    prot: 5,
    carb: 34,
    fat: 1,
    fib: 4,
    gi: "Low",
    note: "சாதம் taste! Easy switch"
  }, {
    ta: "கம்பு",
    en: "Pearl Millet",
    srv: "1 cup cooked",
    cal: 195,
    prot: 7,
    carb: 36,
    fat: 2,
    fib: 4,
    gi: "Low",
    note: "Iron + Zinc rich. கஞ்சி best 💪"
  }, {
    ta: "பிரவுன் அரிசி",
    en: "Brown Rice (cooked)",
    srv: "1 katori (150g)",
    cal: 220,
    prot: 5,
    carb: 46,
    fat: 1.5,
    fib: 2.5,
    gi: "Medium",
    note: "More fiber than white rice, less than millets"
  }, {
    ta: "ராகி முட்டை",
    en: "Ragi Mudde",
    srv: "1 medium (100g)",
    cal: 150,
    prot: 4.5,
    carb: 32,
    fat: 1,
    fib: 3.5,
    gi: "Medium",
    note: "344mg calcium! Traditional ragi ball 🦴"
  }]
}, {
  cat: "🫘 பருப்பு & Legumes",
  items: [{
    ta: "துவரம்பருப்பு",
    en: "Toor Dal",
    srv: "1 cup cooked",
    cal: 200,
    prot: 14,
    carb: 30,
    fat: 2,
    fib: 5,
    gi: "Low",
    note: "சாம்பார் base. Protein powerhouse"
  }, {
    ta: "பாசிப்பருப்பு",
    en: "Moong Dal",
    srv: "1 cup cooked",
    cal: 180,
    prot: 12,
    carb: 28,
    fat: 1,
    fib: 4,
    gi: "Low",
    note: "Easy to digest. கிச்சடி+பெசரட்டு"
  }, {
    ta: "கொண்டைக்கடலை",
    en: "Chickpeas",
    srv: "1 cup cooked",
    cal: 270,
    prot: 15,
    carb: 45,
    fat: 4,
    fib: 12,
    gi: "Low",
    note: "Fiber king! சுண்டல் best 👑"
  }, {
    ta: "பாசிப்பயிறு (முளை)",
    en: "Sprouted Moong",
    srv: "1 cup",
    cal: 150,
    prot: 9,
    carb: 20,
    fat: 2,
    fib: 5,
    gi: "Low",
    note: "Sprouting doubles vitamins!"
  }, {
    ta: "வேர்க்கடலை",
    en: "Peanuts",
    srv: "3 tbsp",
    cal: 130,
    prot: 6,
    carb: 6,
    fat: 10,
    fib: 2,
    gi: "Low",
    note: "Protein snack. 3 tbsp limit"
  }, {
    ta: "கடலைப்பருப்பு",
    en: "Chana Dal",
    srv: "1 cup cooked",
    cal: 210,
    prot: 13,
    carb: 32,
    fat: 3,
    fib: 6,
    gi: "Low",
    note: "Low GI. Slow energy release"
  }]
}, {
  cat: "🥬 காய்கறி",
  items: [{
    ta: "முருங்கை",
    en: "Drumstick",
    srv: "6 pieces",
    cal: 35,
    prot: 2,
    carb: 6,
    fat: 0.5,
    fib: 3,
    gi: "Low",
    note: "Calcium+Iron! 🦴 Joint health-க்கு"
  }, {
    ta: "பீன்ஸ்",
    en: "French Beans",
    srv: "1 cup",
    cal: 30,
    prot: 2,
    carb: 7,
    fat: 0.1,
    fib: 3,
    gi: "Low",
    note: "Low calorie, fiber rich"
  }, {
    ta: "கேரட்",
    en: "Carrot",
    srv: "1 medium",
    cal: 25,
    prot: 0.5,
    carb: 6,
    fat: 0.1,
    fib: 2,
    gi: "Low",
    note: "Vitamin A. கண்ணுக்கு நல்லது 👁️"
  }, {
    ta: "பீட்ரூட்",
    en: "Beetroot",
    srv: "1 small",
    cal: 35,
    prot: 1,
    carb: 8,
    fat: 0.1,
    fib: 2,
    gi: "Medium",
    note: "Iron rich. Blood pressure↓"
  }, {
    ta: "முட்டைகோஸ்",
    en: "Cabbage",
    srv: "1 cup",
    cal: 22,
    prot: 1,
    carb: 5,
    fat: 0.1,
    fib: 2,
    gi: "Low",
    note: "Very low cal! Great for poriyal"
  }, {
    ta: "கீரை (பசலை)",
    en: "Spinach",
    srv: "1 cup cooked",
    cal: 40,
    prot: 5,
    carb: 4,
    fat: 0.5,
    fib: 4,
    gi: "Low",
    note: "Iron+Calcium! கீரை பருப்பு = power 💪"
  }, {
    ta: "வெண்டைக்காய்",
    en: "Okra/Ladies Finger",
    srv: "1 cup",
    cal: 33,
    prot: 2,
    carb: 7,
    fat: 0.2,
    fib: 3,
    gi: "Low",
    note: "Fiber rich. Blood sugar control"
  }]
}, {
  cat: "🥣 Traditional Dishes",
  items: [{
    ta: "இட்லி",
    en: "Idli (1 piece)",
    srv: "1 idli (~40g)",
    cal: 60,
    prot: 2,
    carb: 12,
    fat: 0.3,
    fib: 0.5,
    gi: "Medium",
    note: "Steamed = healthy! 2-3 enough"
  }, {
    ta: "தோசை",
    en: "Dosa (1 plain)",
    srv: "1 medium",
    cal: 120,
    prot: 3,
    carb: 18,
    fat: 4,
    fib: 1,
    gi: "Medium",
    note: "1 tsp oil limit. Rava dosa better"
  }, {
    ta: "சாம்பார்",
    en: "Sambar",
    srv: "1 cup",
    cal: 120,
    prot: 6,
    carb: 16,
    fat: 3,
    fib: 4,
    gi: "Low",
    note: "பருப்பு+காய்கறி = perfect combo"
  }, {
    ta: "ரசம்",
    en: "Rasam",
    srv: "1 cup",
    cal: 50,
    prot: 2,
    carb: 8,
    fat: 1,
    fib: 1,
    gi: "Low",
    note: "மிளகு+மஞ்சள் = anti-inflammatory 🟡"
  }, {
    ta: "பொரியல்",
    en: "Poriyal (stir-fry)",
    srv: "1 cup",
    cal: 80,
    prot: 2,
    carb: 10,
    fat: 3,
    fib: 3,
    gi: "Low",
    note: "1 tsp oil. தேங்காய் optional"
  }, {
    ta: "கூட்டு",
    en: "Kootu",
    srv: "1 cup",
    cal: 130,
    prot: 6,
    carb: 16,
    fat: 4,
    fib: 5,
    gi: "Low",
    note: "பருப்பு+காய்கறி+தேங்காய்"
  }, {
    ta: "சப்பாத்தி",
    en: "Chapati (1 piece)",
    srv: "1 (~30g atta)",
    cal: 70,
    prot: 3,
    carb: 14,
    fat: 0.5,
    fib: 2,
    gi: "Medium",
    note: "No oil. சாதத்தை விட fiber அதிகம்"
  }, {
    ta: "அடை",
    en: "Adai (1 piece)",
    srv: "1 medium",
    cal: 150,
    prot: 6,
    carb: 20,
    fat: 3.5,
    fib: 3,
    gi: "Low",
    note: "4 பருப்பு+அரிசி. High protein dosa!"
  }, {
    ta: "பெசரட்டு",
    en: "Pesarattu (1)",
    srv: "1 medium",
    cal: 130,
    prot: 7,
    carb: 16,
    fat: 3,
    fib: 2.5,
    gi: "Low",
    note: "பாசிப்பயிறு base. Protein rich!"
  }, {
    ta: "சீலா / புடலா",
    en: "Moong Chilla (1)",
    srv: "1 medium",
    cal: 120,
    prot: 6.5,
    carb: 14,
    fat: 3,
    fib: 2,
    gi: "Low",
    note: "Quick protein breakfast!"
  }, {
    ta: "ரவா தோசை",
    en: "Rava Dosa (1)",
    srv: "1 medium",
    cal: 155,
    prot: 3.5,
    carb: 22,
    fat: 6,
    fib: 0.5,
    gi: "High",
    note: "Crispier = more oil absorbed. Non-stick-ல் குறை"
  }, {
    ta: "வெண் பொங்கல்",
    en: "Ven Pongal",
    srv: "1 cup (150g)",
    cal: 225,
    prot: 6,
    carb: 30,
    fat: 9,
    fib: 1.5,
    gi: "Medium",
    note: "நெய்+முந்திரி add calories. Small portion!"
  }, {
    ta: "ரவா உப்மா",
    en: "Upma (Rava)",
    srv: "1 cup (150g)",
    cal: 230,
    prot: 6,
    carb: 32,
    fat: 8,
    fib: 2,
    gi: "Medium",
    note: "காய்கறி சேர்த்தால் better. Oats upma > rava"
  }, {
    ta: "ஓட்ஸ் உப்மா",
    en: "Oats Upma",
    srv: "1 cup",
    cal: 195,
    prot: 6.5,
    carb: 28,
    fat: 6,
    fib: 4,
    gi: "Low",
    note: "Higher fiber than rava upma ✅"
  }, {
    ta: "கீரை பொரியல்",
    en: "Keerai Poriyal",
    srv: "1 serving (100g)",
    cal: 85,
    prot: 3.5,
    carb: 6,
    fat: 5,
    fib: 3,
    gi: "Low",
    note: "Iron+Calcium! Water-sauté = 60 cal 🥬"
  }, {
    ta: "மோர் குழம்பு",
    en: "Mor Kuzhambu",
    srv: "1 cup",
    cal: 145,
    prot: 3.5,
    carb: 12,
    fat: 8,
    fib: 1,
    gi: "Low",
    note: "Probiotic curd-based. Light lunch option"
  }]
}, {
  cat: "🍌 பழம் & Nuts",
  items: [{
    ta: "கொய்யா",
    en: "Guava",
    srv: "1 medium",
    cal: 68,
    prot: 2.5,
    carb: 14,
    fat: 1,
    fib: 5,
    gi: "Low",
    note: "Vitamin C king! Low GI fruit 👑"
  }, {
    ta: "பப்பாளி",
    en: "Papaya",
    srv: "1 cup",
    cal: 55,
    prot: 0.8,
    carb: 14,
    fat: 0.2,
    fib: 2.5,
    gi: "Medium",
    note: "Digestion helper. Papain enzyme"
  }, {
    ta: "வாழைப்பழம்",
    en: "Banana",
    srv: "1 medium",
    cal: 105,
    prot: 1.3,
    carb: 27,
    fat: 0.4,
    fib: 3,
    gi: "Medium",
    note: "Energy quick fix. Dizzy-க்கு eat"
  }, {
    ta: "ஆப்பிள்",
    en: "Apple",
    srv: "1 medium",
    cal: 95,
    prot: 0.5,
    carb: 25,
    fat: 0.3,
    fib: 4.4,
    gi: "Low",
    note: "Fiber rich. Eat with skin!"
  }, {
    ta: "பாதாம்",
    en: "Almonds",
    srv: "5 pieces",
    cal: 35,
    prot: 1.3,
    carb: 1,
    fat: 3,
    fib: 0.6,
    gi: "Low",
    note: "Healthy fat. 5/day enough"
  }, {
    ta: "வால்நட்",
    en: "Walnuts",
    srv: "3 pieces",
    cal: 60,
    prot: 1.5,
    carb: 1,
    fat: 6,
    fib: 0.5,
    gi: "Low",
    note: "Omega-3! Brain+joint health 🧠"
  }, {
    ta: "பேரிச்சை",
    en: "Dates",
    srv: "2 pieces",
    cal: 45,
    prot: 0.4,
    carb: 12,
    fat: 0,
    fib: 1.5,
    gi: "Medium",
    note: "Natural sweet. Energy boost"
  }]
}, {
  cat: "🟡 Spices & Extras",
  items: [{
    ta: "மஞ்சள்",
    en: "Turmeric",
    srv: "1 tsp",
    cal: 9,
    prot: 0.3,
    carb: 2,
    fat: 0.1,
    fib: 0.5,
    gi: "-",
    note: "Curcumin: anti-inflammatory 🔥"
  }, {
    ta: "மிளகு",
    en: "Black Pepper",
    srv: "½ tsp",
    cal: 3,
    prot: 0.1,
    carb: 0.7,
    fat: 0.1,
    fib: 0.3,
    gi: "-",
    note: "Piperine: மஞ்சள் absorption 20x↑"
  }, {
    ta: "நல்லெண்ணெய்",
    en: "Sesame Oil",
    srv: "1 tsp",
    cal: 40,
    prot: 0,
    carb: 0,
    fat: 4.5,
    fib: 0,
    gi: "-",
    note: "Heart healthy. 2-3 tsp/day max"
  }, {
    ta: "தேங்காய்",
    en: "Coconut (grated)",
    srv: "2 tbsp",
    cal: 70,
    prot: 0.7,
    carb: 3,
    fat: 6.5,
    fib: 2,
    gi: "-",
    note: "MCT fats. 2 tbsp limit"
  }, {
    ta: "ஆளிவிதை",
    en: "Flaxseed",
    srv: "1 tbsp",
    cal: 37,
    prot: 1.3,
    carb: 2,
    fat: 3,
    fib: 2,
    gi: "-",
    note: "Omega-3 plant source! Joint health 💚"
  }, {
    ta: "தயிர்",
    en: "Curd/Yogurt",
    srv: "1 cup",
    cal: 100,
    prot: 8,
    carb: 8,
    fat: 4,
    fib: 0,
    gi: "Low",
    note: "Probiotics! Gut health. மோர் = lower cal"
  }, {
    ta: "முட்டை",
    en: "Egg (boiled)",
    srv: "1 egg",
    cal: 78,
    prot: 6,
    carb: 0.6,
    fat: 5,
    fib: 0,
    gi: "-",
    note: "Complete protein. 1/day is fine"
  }, {
    ta: "தேங்காய் எண்ணெய்",
    en: "Coconut Oil",
    srv: "1 tsp",
    cal: 40,
    prot: 0,
    carb: 0,
    fat: 4.5,
    fib: 0,
    gi: "-",
    note: "MCT may boost metabolism. Quantity matters!"
  }, {
    ta: "நெய்",
    en: "Ghee",
    srv: "1 tsp",
    cal: 45,
    prot: 0,
    carb: 0,
    fat: 5,
    fib: 0,
    gi: "-",
    note: "1 tsp limit. எந்த oil-ம் 40-45 cal/tsp!"
  }, {
    ta: "கருப்பட்டி",
    en: "Palm Jaggery / Karupatti",
    srv: "1 small piece (10g)",
    cal: 30,
    prot: 0.1,
    carb: 7.5,
    fat: 0,
    fib: 0,
    gi: "Low (35-41)",
    note: "GI 35-41 vs sugar 60-80! Iron+Calcium. Sweet craving fix 🍬"
  }, {
    ta: "இஸப்கோல்",
    en: "Isabgol / Psyllium Husk",
    srv: "1 tsp",
    cal: 10,
    prot: 0,
    carb: 2.5,
    fat: 0,
    fib: 2.5,
    gi: "-",
    note: "Constipation relief. Always drink extra water! 💧"
  }]
}, {
  cat: "🍗 Protein Sources",
  items: [{
    ta: "மீன் குழம்பு (மத்தி)",
    en: "Fish Curry (Sardine)",
    srv: "1 serving (100g)",
    cal: 200,
    prot: 18,
    carb: 5,
    fat: 12,
    fib: 0.5,
    gi: "-",
    note: "Omega-3: 1,500-2,000mg! Anti-inflammatory 🐟"
  }, {
    ta: "நெத்திலி மீன்",
    en: "Nethili / Anchovy",
    srv: "1 serving (100g)",
    cal: 175,
    prot: 17,
    carb: 3,
    fat: 10,
    fib: 0,
    gi: "-",
    note: "Omega-3: 1,000mg + bone calcium! 🦴"
  }, {
    ta: "அயல மீன்",
    en: "Mackerel Curry",
    srv: "1 serving (100g)",
    cal: 200,
    prot: 19,
    carb: 4,
    fat: 12,
    fib: 0,
    gi: "-",
    note: "Omega-3: 1,200mg. Week 2-3 times 🐟"
  }, {
    ta: "கோழி குழம்பு",
    en: "Chicken Curry",
    srv: "1 serving (100g)",
    cal: 190,
    prot: 17,
    carb: 6,
    fat: 10,
    fib: 0.5,
    gi: "-",
    note: "Lean protein. Remove skin = less fat"
  }, {
    ta: "பன்னீர்",
    en: "Paneer",
    srv: "50g",
    cal: 135,
    prot: 9.5,
    carb: 2,
    fat: 10,
    fib: 0,
    gi: "-",
    note: "Vegetarian protein. 50g portion limit"
  }]
}, {
  cat: "☕ பானங்கள் / Beverages",
  items: [{
    ta: "மோர்",
    en: "Buttermilk",
    srv: "1 glass (200ml)",
    cal: 45,
    prot: 2.5,
    carb: 5,
    fat: 1.5,
    fib: 0,
    gi: "Low",
    note: "Electrolytes+probiotics. Best hydration! 💧"
  }, {
    ta: "ஃபில்டர் காப்பி",
    en: "Filter Coffee (milk+sugar)",
    srv: "1 cup",
    cal: 100,
    prot: 2,
    carb: 12,
    fat: 4,
    fib: 0,
    gi: "-",
    note: "Sugar drop = 30-40 cal saved. ½ tsp aim!"
  }, {
    ta: "க்ரீன் டீ",
    en: "Green Tea",
    srv: "1 cup",
    cal: 2,
    prot: 0,
    carb: 0,
    fat: 0,
    fib: 0,
    gi: "-",
    note: "Almost zero cal! Antioxidants ✅"
  }]
}];
const SK = "amma-ult-v1";

// ─── MAIN COMPONENT ─────────────────────────────────────────
function App() {
  const [loaded, setLoaded] = useState(false);
  const [D, setD] = useState(null);
  const [tab, setTab] = useState("today");
  const [day, setDay] = useState(1);
  const [mDay, setMDay] = useState(1);
  const [shopW, setShopW] = useState(0);
  const [modal, setModal] = useState(null);
  const [recipe, setRecipe] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [quizA, setQuizA] = useState(null);
  const [pf, setPf] = useState({
    w: "",
    ws: "",
    kp: 5,
    en: 5,
    sl: "",
    no: ""
  });
  const [confetti, setConfetti] = useState(false);
  const [breathing, setBreathing] = useState(false);
  const [dark, setDark] = useState(false);
  const [onboard, setOnboard] = useState(null);
  const [nutCat, setNutCat] = useState(0);
  const [nutSearch, setNutSearch] = useState("");
  const [guideOpen, setGuideOpen] = useState({});
  const [guideView, setGuideView] = useState("learn");
  const cgRef = useRef({
    n: 0,
    t: null
  });

  // Load
  useEffect(() => {
    (async () => {
      try {
        const raw = localStorage.getItem(SK);
        if (raw) {
          const d = JSON.parse(raw);
          setD(d);
          if (d.sd) {
            const t = new Date(),
              today = new Date(t.getFullYear(), t.getMonth(), t.getDate()),
              sp = d.sd.split('-').map(Number),
              start = new Date(sp[0], sp[1] - 1, sp[2]),
              diff = Math.round((today - start) / 864e5) + 1;
            setDay(Math.min(Math.max(diff, 1), 30));
            setMDay(Math.min(Math.max(diff, 1), 30));
          }
          if (d.dark) setDark(true);
          setOnboard(null);
        } else {
          const fresh = {
            ck: {},
            pr: [],
            sd: null,
            sc: {},
            wg: {},
            fav: {},
            name: "அம்மா",
            dark: false
          };
          setD(fresh);
          try {
            localStorage.setItem(SK, JSON.stringify(fresh));
          } catch {}
          setOnboard(0);
        }
      } catch {
        const fresh = {
          ck: {},
          pr: [],
          sd: null,
          sc: {},
          wg: {},
          fav: {},
          name: "அம்மா",
          dark: false
        };
        setD(fresh);
        try {
          localStorage.setItem(SK, JSON.stringify(fresh));
        } catch {}
        setOnboard(0);
      }
      setLoaded(true);
    })();
  }, []);
  const save = useCallback(async nd => {
    setD(nd);
    try {
      localStorage.setItem(SK, JSON.stringify(nd));
    } catch (e) {
      try {
        localStorage.setItem(SK, JSON.stringify(nd));
      } catch {}
    }
  }, []);
  const hap = (style = "light") => {
    try {
      if (navigator.vibrate) navigator.vibrate(style === "heavy" ? [30, 10, 30] : style === "medium" ? 15 : 8);
    } catch {}
  };
  if (!loaded || !D) return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100dvh',
      background: 'linear-gradient(180deg,#0d1f12 0%,#1a3a20 100%)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 64,
      animation: 'aFloat 2s ease infinite'
    }
  }, "\uD83C\uDF3F"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: '#4ade80',
      fontSize: 14,
      marginTop: 12,
      fontWeight: 600,
      letterSpacing: '0.1em',
      animation: 'aPulse 1.5s ease infinite'
    }
  }, "LOADING"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'rgba(74,222,128,0.35)',
      fontSize: 11,
      marginTop: 8
    }
  }, "Made with love for Amma")));

  // ── Theme ────────────────────────────────────────
  const T = dark ? {
    bg: '#0f1410',
    card: '#1a2420',
    cardB: '1px solid #2a3a30',
    text: '#e8f5e9',
    sub: '#81c784',
    muted: '#4a6a50',
    border: '#2a3a30',
    inputBg: '#1a2420',
    inputBd: '#2a3a30'
  } : {
    bg: '#f8faf8',
    card: '#ffffff',
    cardB: 'none',
    text: '#111827',
    sub: '#6b7280',
    muted: '#9ca3af',
    border: '#e5e7eb',
    inputBg: '#fff',
    inputBd: '#e5e7eb'
  };

  // ── Computed ────────────────────────────────────
  const ckD = D.ck[day] || {};
  const cnt = CK.filter(c => ckD[c.k]).length;
  const score = Math.round(cnt / CK.length * 100);
  const todayM = MEALS[Math.min(day, MEALS.length) - 1];
  const viewM = MEALS[Math.min(mDay, MEALS.length) - 1];
  const ph = PH[todayM?.p || 0];
  const gs = d => {
    const c = D.ck[d] || {};
    return Math.round(CK.filter(i => c[i.k]).length / CK.length * 100);
  };
  const streak = (() => {
    let s = 0;
    for (let d = day; d >= 1; d--) {
      if (gs(d) >= 80) s++;else break;
    }
    return s;
  })();
  const done = (() => {
    let c = 0;
    for (let d = 1; d <= 30; d++) if (Object.keys(D.ck[d] || {}).length > 0) c++;
    return c;
  })();
  const wl = D.pr.length >= 2 ? D.pr[0].w - D.pr[D.pr.length - 1].w : 0;
  const waterN = D.wg[day] || 0;
  const bmi = D.pr.length > 0 ? (D.pr[D.pr.length - 1].w / (1.47 * 1.47)).toFixed(1) : null;
  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return `Good morning ${D.name} 🌅`;
    if (h < 17) return `Good afternoon ${D.name} ☀️`;
    return `Good evening ${D.name} 🌙`;
  })();
  const weekScore = (() => {
    const wk = Math.floor((day - 1) / 7);
    let t = 0,
      n = 0;
    for (let d = wk * 7 + 1; d <= Math.min(wk * 7 + 7, 30); d++) {
      const s = gs(d);
      if (Object.keys(D.ck[d] || {}).length > 0) {
        t += s;
        n++;
      }
    }
    return n > 0 ? Math.round(t / n) : 0;
  })();
  const weekGrade = weekScore >= 90 ? "A+" : weekScore >= 80 ? "A" : weekScore >= 70 ? "B+" : weekScore >= 60 ? "B" : weekScore >= 50 ? "C" : "D";
  const toggle = (d, k) => {
    hap();
    const nc = {
      ...D.ck
    };
    if (!nc[d]) nc[d] = {};
    nc[d] = {
      ...nc[d],
      [k]: !nc[d][k]
    };
    const nd = {
      ...D,
      ck: nc
    };
    save(nd);
    if (!ckD[k]) {
      const newC = CK.filter(c => (nc[d] || {})[c.k]).length;
      if (newC === CK.length) {
        boom();
      }
    }
  };
  const setWater = n => {
    hap();
    const nw = Math.min(Math.max(n, 0), 10);
    let nd = {
      ...D,
      wg: {
        ...D.wg,
        [day]: nw
      }
    };
    if (nw >= 8 && !(D.ck[day] || {}).wt) {
      const nc = {
        ...D.ck
      };
      if (!nc[day]) nc[day] = {};
      nc[day] = {
        ...nc[day],
        wt: true
      };
      nd = {
        ...nd,
        ck: nc
      };
    }
    save(nd);
  };
  const addWater = () => setWater(waterN + 1);
  const toggleFav = (dayN, meal) => {
    hap();
    const id = `${dayN}-${meal}`;
    save({
      ...D,
      fav: {
        ...D.fav,
        [id]: !D.fav[id]
      }
    });
  };
  const toggleShop = id => {
    hap();
    save({
      ...D,
      sc: {
        ...D.sc,
        [id]: !D.sc[id]
      }
    });
  };
  const toggleDark = () => {
    hap("medium");
    const nd = !dark;
    setDark(nd);
    save({
      ...D,
      dark: nd
    });
  };
  const boom = () => {
    hap("heavy");
    setConfetti(true);
    setTimeout(() => setConfetti(false), 3000);
  };
  const startPlan = () => {
    const n = new Date();
    const localSD = `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, '0')}-${String(n.getDate()).padStart(2, '0')}`;
    save({
      ...D,
      sd: localSD,
      ck: {}
    });
    setDay(1);
    setMDay(1);
    boom();
    setModal({
      t: "🎉 Started!",
      m: `${D.name}-வின் 30-day journey begins!\nAll the best! 💚`
    });
  };
  const saveProg = () => {
    const w = parseFloat(pf.w);
    if (!w || w < 30 || w > 200) {
      setModal({
        t: "⚠️",
        m: "Valid weight enter பண்ணுங்க"
      });
      return;
    }
    hap("medium");
    const e = {
      date: new Date().toISOString().split('T')[0],
      w,
      ws: parseFloat(pf.ws) || null,
      kp: pf.kp,
      en: pf.en,
      sl: parseFloat(pf.sl) || null,
      no: pf.no || null
    };
    const np = [...D.pr.filter(p => p.date !== e.date), e].sort((a, b) => a.date.localeCompare(b.date));
    save({
      ...D,
      pr: np
    });
    setPf({
      w: "",
      ws: "",
      kp: 5,
      en: 5,
      sl: "",
      no: ""
    });
    if (D.pr.length > 0 && w < D.pr[0].w) boom();
    setModal({
      t: "✅",
      m: "Saved! 💚"
    });
  };
  const shareWA = () => {
    const txt = `🌿 *${D.name} Tracker — Day ${day}/30*\n✅ Score: ${score}% (${cnt}/10)\n💧 Water: ${waterN}/8\n${D.pr.length ? `⚖️ ${D.pr[D.pr.length - 1].w}kg\n` : ""}${MOTIV[day % MOTIV.length][0]}`;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(txt).then(() => setModal({
        t: "📤 Copied!",
        m: "WhatsApp-ல paste பண்ணுங்க!"
      }));
    }
  };
  const exportData = () => {
    try {
      const j = JSON.stringify({
        v: 3,
        ...D
      });
      const b = new Blob([j], {
        type: "application/json"
      });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(b);
      a.download = `amma-backup-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      setModal({
        t: "✅",
        m: "Backup downloaded!"
      });
    } catch (e) {
      setModal({
        t: "❌",
        m: e.message
      });
    }
  };
  const handleCg = () => {
    cgRef.current.n++;
    if (cgRef.current.n >= 7) {
      setTab(tab === "cg" ? "today" : "cg");
      cgRef.current.n = 0;
    }
    clearTimeout(cgRef.current.t);
    cgRef.current.t = setTimeout(() => {
      cgRef.current.n = 0;
    }, 2000);
  };
  const openQuiz = () => {
    hap();
    const q = QUIZ[Math.floor(Math.random() * QUIZ.length)];
    setQuiz(q);
    setQuizA(null);
  };

  // ── Shared UI Components ──────────────────────
  const Chk = ({
    on,
    sz = 22
  }) => on ? /*#__PURE__*/React.createElement("svg", {
    width: sz,
    height: sz,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "3",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  })) : null;
  const Ring = ({
    pct,
    sz = 76,
    sw = 6,
    color = "#4ade80"
  }) => {
    const r = (sz - sw) / 2;
    const c = 2 * Math.PI * r;
    const o = c * (1 - pct / 100);
    return /*#__PURE__*/React.createElement("svg", {
      width: sz,
      height: sz,
      style: {
        transform: 'rotate(-90deg)'
      }
    }, /*#__PURE__*/React.createElement("circle", {
      cx: sz / 2,
      cy: sz / 2,
      r: r,
      fill: "none",
      stroke: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
      strokeWidth: sw
    }), /*#__PURE__*/React.createElement("circle", {
      cx: sz / 2,
      cy: sz / 2,
      r: r,
      fill: "none",
      stroke: color,
      strokeWidth: sw,
      strokeLinecap: "round",
      strokeDasharray: c,
      strokeDashoffset: o,
      style: {
        transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1)'
      }
    }));
  };
  const Card = ({
    children,
    style: cs,
    ...rest
  }) => /*#__PURE__*/React.createElement("div", _extends({
    className: "a-card",
    style: {
      background: T.card,
      borderRadius: 18,
      padding: 16,
      margin: '10px 16px',
      boxShadow: dark ? 'none' : '0 1px 3px rgba(0,0,0,0.04), 0 4px 14px rgba(0,0,0,0.03)',
      border: T.cardB,
      ...cs
    }
  }, rest), children);
  const Btn = ({
    children,
    bg = "linear-gradient(135deg,#22c55e,#15803d)",
    style: cs,
    ...rest
  }) => /*#__PURE__*/React.createElement("button", _extends({
    style: {
      width: '100%',
      padding: '14px 20px',
      borderRadius: 14,
      border: 'none',
      background: bg,
      color: '#fff',
      fontSize: 15,
      fontWeight: 700,
      cursor: 'pointer',
      ...cs
    }
  }, rest), children);
  const Input = useMemo(() => {
    const StableInput = ({...rest}) => /*#__PURE__*/React.createElement("input", _extends({}, rest, {
      style: {
        width: '100%',
        padding: '11px 12px',
        borderRadius: 10,
        border: `1.5px solid ${T.inputBd}`,
        fontSize: 16,
        outline: 'none',
        boxSizing: 'border-box',
        WebkitAppearance: 'none',
        background: T.inputBg,
        color: T.text,
        ...(rest.style || {})
      }
    }));
    return StableInput;
  }, [dark]);
  const Hdr = ({
    bg,
    children
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      background: bg,
      padding: '20px 20px 26px',
      borderRadius: '0 0 28px 28px',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '-40%',
      right: '-15%',
      width: 220,
      height: 220,
      borderRadius: '50%',
      background: 'radial-gradient(circle,rgba(255,255,255,0.06) 0%,transparent 70%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: '-30%',
      left: '-10%',
      width: 160,
      height: 160,
      borderRadius: '50%',
      background: 'radial-gradient(circle,rgba(255,255,255,0.04) 0%,transparent 70%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1
    }
  }, children));
  const DayScroll = ({
    active,
    onTap
  }) => {
    const scrollRef = useRef(null);
    useEffect(() => {
      requestAnimationFrame(() => {
        const container = scrollRef.current;
        if (!container) return;
        const btn = container.querySelector(`[data-day="${active}"]`);
        if (btn) btn.scrollIntoView({
          inline: 'center',
          block: 'nearest',
          behavior: 'smooth'
        });
      });
    }, [active]);
    return /*#__PURE__*/React.createElement("div", {
      ref: scrollRef,
      className: "a-ns",
      style: {
        display: 'flex',
        gap: 5,
        padding: '8px 16px',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch'
      }
    }, Array.from({
      length: 30
    }, (_, i) => {
      const d = i + 1;
      const sc = gs(d);
      const has = Object.keys(D.ck[d] || {}).length > 0;
      const a = d === active;
      return /*#__PURE__*/React.createElement("button", {
        "data-day": d,
        key: d,
        type: "button",
        onClick: e => {
          e.preventDefault();
          e.stopPropagation();
          onTap(d);
        },
        style: {
          minWidth: 36,
          height: 36,
          borderRadius: 10,
          border: a ? `2px solid ${ph.c}` : has && sc >= 80 ? '1.5px solid #86efac' : has ? '1.5px solid #fde68a' : `1px solid ${T.border}`,
          background: a ? ph.c : has && sc >= 80 ? dark ? '#14532d' : '#dcfce7' : has ? dark ? '#713f12' : '#fef9c3' : dark ? '#1a2420' : T.card,
          color: a ? '#fff' : T.text,
          fontSize: 12,
          fontWeight: a ? 800 : 500,
          cursor: 'pointer',
          flexShrink: 0
        }
      }, d);
    }));
  };
  const WaterCup = () => {
    const pct = Math.min(waterN / 8, 1);
    return /*#__PURE__*/React.createElement("div", {
      onClick: addWater,
      style: {
        cursor: 'pointer',
        textAlign: 'center',
        padding: '2px 0'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        display: 'inline-block',
        width: 32,
        height: 32
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "32",
      height: "32",
      viewBox: "0 0 32 32",
      fill: "none"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M6,6 L8,28 Q8,30 10,30 L22,30 Q24,30 24,28 L26,6 Z",
      fill: "rgba(255,255,255,0.08)",
      stroke: "rgba(255,255,255,0.3)",
      strokeWidth: "1"
    }), /*#__PURE__*/React.createElement("clipPath", {
      id: "wCup"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M6,6 L8,28 Q8,30 10,30 L22,30 Q24,30 24,28 L26,6 Z"
    })), /*#__PURE__*/React.createElement("rect", {
      x: "5",
      y: 30 - Math.round(pct * 24),
      width: "22",
      height: Math.round(pct * 24),
      fill: "#60a5fa",
      opacity: "0.85",
      clipPath: "url(#wCup)"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        fontWeight: 800,
        color: '#fff',
        marginTop: 1
      }
    }, waterN, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 9,
        fontWeight: 400,
        opacity: 0.5
      }
    }, "/8")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        color: 'rgba(255,255,255,0.5)'
      }
    }, "Water"));
  };
  const MLI = [{
    k: "b",
    l: "🌅 காலை",
    e: "Breakfast",
    c: "#3b82f6"
  }, {
    k: "l",
    l: "🍛 மதியம்",
    e: "Lunch",
    c: "#16a34a"
  }, {
    k: "s",
    l: "🫘 சிற்றுண்டி",
    e: "Snack",
    c: "#f59e0b"
  }, {
    k: "n",
    l: "🌙 இரவு",
    e: "Dinner",
    c: "#8b5cf6"
  }];
  const Confetti = () => /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 999,
      overflow: 'hidden'
    }
  }, Array.from({
    length: 35
  }, (_, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      position: 'absolute',
      top: -10,
      left: `${Math.random() * 100}%`,
      width: Math.random() > 0.5 ? 8 : 6,
      height: Math.random() > 0.5 ? 8 : 6,
      borderRadius: Math.random() > 0.5 ? '50%' : '2px',
      background: ["#22c55e", "#f59e0b", "#8b5cf6", "#ef4444", "#3b82f6", "#ec4899", "#14b8a6"][i % 7],
      animation: `aConfetti ${1.5 + Math.random() * 2}s ease ${Math.random() * 0.5}s forwards`
    }
  })));

  // ── ONBOARDING ──────────────────────────────────
  if (onboard !== null) {
    const pages = [{
      icon: "🌿",
      title: "வணக்கம்!",
      sub: "Welcome to your 30-day journey",
      desc: "இது உங்களுக்கான personal health tracker. தினமும் உணவு+habits track பண்ணுங்க!"
    }, {
      icon: "🍛",
      title: "30 நாள் Plan",
      sub: "Tamil meals. Real food. No starving.",
      desc: "இட்லி, சாம்பார், பொரியல் — same food, healthier portions. Swap options every meal!"
    }, {
      icon: "💚",
      title: "Ready?",
      sub: "Let's begin this journey together",
      desc: "உங்க பெயர் enter பண்ணுங்க:"
    }];
    const pg = pages[onboard];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(160deg,#0d1f12 0%,#132a18 50%,#0d1f12 100%)',
        color: '#fff',
        fontFamily: '-apple-system,BlinkMacSystemFont,system-ui,sans-serif'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
        textAlign: 'center',
        animation: 'aFadeUp 0.5s ease'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 80,
        marginBottom: 16,
        animation: 'aFloat 3s ease infinite'
      }
    }, pg.icon), /*#__PURE__*/React.createElement("h1", {
      style: {
        fontSize: 28,
        fontWeight: 800,
        margin: '0 0 6px',
        letterSpacing: '-0.02em'
      }
    }, pg.title), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 14,
        color: '#4ade80',
        margin: '0 0 16px',
        fontWeight: 600
      }
    }, pg.sub), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.6)',
        lineHeight: 1.6,
        maxWidth: 300,
        margin: 0
      }
    }, pg.desc), onboard === 2 && /*#__PURE__*/React.createElement("input", {
      type: "text",
      value: D.name,
      onChange: e => save({
        ...D,
        name: e.target.value
      }),
      onBlur: e => { if (!e.target.value.trim()) save({...D, name: "அம்மா"}); },
      placeholder: "\u0B85\u0BAE\u0BCD\u0BAE\u0BBE",
      style: {
        marginTop: 20,
        padding: '14px 20px',
        borderRadius: 14,
        border: '2px solid #22c55e',
        background: 'rgba(255,255,255,0.05)',
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        width: 200,
        outline: 'none',
        fontWeight: 700
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'center',
        gap: 8,
        padding: 16
      }
    }, pages.map((_, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        width: i === onboard ? 24 : 8,
        height: 8,
        borderRadius: 4,
        background: i === onboard ? '#22c55e' : 'rgba(255,255,255,0.2)',
        transition: 'all 0.3s'
      }
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '0 24px 40px'
      }
    }, /*#__PURE__*/React.createElement(Btn, {
      onClick: () => {
        hap();
        if (onboard < 2) {
          setOnboard(onboard + 1);
        } else {
          setOnboard(null);
          save(D);
        }
      }
    }, onboard < 2 ? "Next →" : `Start ${D.name}'s Journey 🌿`)));
  }

  // ── TODAY TAB ──────────────────────────────────
  const Today = () => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Hdr, {
    bg: "linear-gradient(160deg,#0d4a1a 0%,#166534 40%,#15803d 100%)"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      pointerEvents: 'none'
    }
  }, [0, 1, 2, 3, 4, 5, 6, 7].map(i => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      position: 'absolute',
      width: i % 3 === 0 ? 3 : 2,
      height: i % 3 === 0 ? 3 : 2,
      borderRadius: '50%',
      background: 'rgba(134,239,172,0.2)',
      left: (i * 12.5 + 5) % 100 + '%',
      top: (i * 13 + 10) % 85 + '%',
      animation: 'aFloat ' + (3 + i % 3) + 's ease ' + i * 0.4 + 's infinite'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'rgba(255,255,255,0.7)'
    }
  }, greeting), /*#__PURE__*/React.createElement("div", {
    onClick: handleCg,
    style: {
      fontSize: 24,
      fontWeight: 800,
      color: '#fff',
      cursor: 'default'
    }
  }, "Day ", day, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 400,
      opacity: 0.5
    }
  }, "/ 30")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'rgba(255,255,255,0.12)',
      padding: '3px 12px',
      borderRadius: 20,
      fontSize: 11,
      color: 'rgba(255,255,255,0.85)',
      fontWeight: 600
    }
  }, ph.ta, " \xB7 ", ph.en))), /*#__PURE__*/React.createElement("button", {
    onClick: toggleDark,
    style: {
      background: 'rgba(255,255,255,0.1)',
      border: 'none',
      borderRadius: 12,
      width: 40,
      height: 40,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 18,
      cursor: 'pointer'
    }
  }, dark ? "☀️" : "🌙")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      padding: '4px 10px',
      borderRadius: 12,
      background: 'rgba(255,255,255,0.06)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'rgba(255,255,255,0.65)',
      fontWeight: 500
    }
  }, MOTIV[(day - 1) % MOTIV.length][1])), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(Ring, {
    pct: score
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      fontWeight: 800,
      color: '#fff'
    }
  }, score), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 8,
      color: 'rgba(255,255,255,0.6)'
    }
  }, "%"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: 'rgba(255,255,255,0.08)',
      borderRadius: 14,
      padding: '8px 6px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 800,
      color: '#fff',
      animation: streak > 0 ? 'aFireGlow 2s ease infinite' : 'none'
    }
  }, "\uD83D\uDD25", streak), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: 'rgba(255,255,255,0.5)'
    }
  }, "Streak")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: 'rgba(255,255,255,0.08)',
      borderRadius: 14,
      padding: '8px 6px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(WaterCup, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: 'rgba(255,255,255,0.08)',
      borderRadius: 14,
      padding: '8px 6px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 800,
      color: '#fff'
    }
  }, weekGrade), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: 'rgba(255,255,255,0.5)'
    }
  }, "Week"))))), /*#__PURE__*/React.createElement(DayScroll, {
    active: day,
    onTap: d => {
      const y = window.scrollY;
      setDay(d);
      requestAnimationFrame(() => window.scrollTo(0, y));
    }
  }), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: T.text,
      marginBottom: 12,
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, "\u2705 Daily Checklist ", /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      fontSize: 12,
      fontWeight: 800,
      color: score >= 80 ? '#16a34a' : score >= 60 ? '#d97706' : T.muted,
      transition: 'color 0.3s'
    }
  }, cnt, "/10", score === 100 ? ' 🌟' : '')), CK.map((c, ci) => {
    const on = !!ckD[c.k];
    return /*#__PURE__*/React.createElement("div", {
      key: c.k,
      onClick: () => toggle(day, c.k),
      className: on ? "a-pop" : "",
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '10px 0',
        borderBottom: ci < CK.length - 1 ? `1px solid ${T.border}` : 'none',
        cursor: 'pointer',
        userSelect: 'none',
        WebkitUserSelect: 'none'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 48,
        height: 48,
        borderRadius: 14,
        border: on ? 'none' : `2px solid ${T.border}`,
        background: on ? 'linear-gradient(135deg,#22c55e,#15803d)' : T.card,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        boxShadow: on ? '0 2px 12px rgba(34,197,94,0.35)' : 'none',
        transition: 'all 0.25s'
      }
    }, /*#__PURE__*/React.createElement(Chk, {
      on: on,
      sz: 24
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: on ? 600 : 400,
        color: on ? '#16a34a' : T.text,
        transition: 'color 0.2s'
      }
    }, c.i, " ", c.t), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: T.muted
      }
    }, c.e)), on && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: '#16a34a',
        fontWeight: 700
      }
    }, "\u2713"));
  })), score === 100 && /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 36
    }
  }, ['🌟', '🎉', '🏆', '💪', '👑'][day % 5]), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 800,
      color: dark ? '#4ade80' : '#166534',
      marginTop: 4
    }
  }, "Day ", day, " Complete!"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: dark ? '#86efac' : '#15803d',
      marginTop: 2
    }
  }, "All 10 tasks done! Super ", D.name, "! \uD83E\uDEF6"))), (() => {
    const dn = getDayNut(todayM);
    return dn ? /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 700,
        color: T.text,
        marginBottom: 10
      }
    }, "\uD83D\uDCCA Day ", day, " Nutrition"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: 6
      }
    }, [{
      l: "Calories",
      v: dn.cal,
      u: "kcal",
      c: "#ef4444",
      bg: "rgba(239,68,68,0.08)",
      tgt: "1000-1200"
    }, {
      l: "Protein",
      v: dn.prot,
      u: "g",
      c: "#16a34a",
      bg: "rgba(34,197,94,0.08)",
      tgt: "45-55g"
    }, {
      l: "Carbs",
      v: dn.carb,
      u: "g",
      c: "#3b82f6",
      bg: "rgba(59,130,246,0.08)",
      tgt: "130-160g"
    }, {
      l: "Fat",
      v: dn.fat,
      u: "g",
      c: "#d97706",
      bg: "rgba(245,158,11,0.08)",
      tgt: "20-30g"
    }, {
      l: "Fiber",
      v: dn.fib,
      u: "g",
      c: "#7c3aed",
      bg: "rgba(124,58,237,0.08)",
      tgt: "20-25g"
    }].map((n, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        flex: 1,
        background: dark ? n.bg : n.bg,
        borderRadius: 12,
        padding: '8px 4px',
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 18,
        fontWeight: 800,
        color: n.c
      }
    }, n.v), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 8,
        color: n.c,
        opacity: 0.7
      }
    }, n.u), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        fontWeight: 600,
        color: T.text,
        marginTop: 2
      }
    }, n.l), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 7,
        color: T.muted
      }
    }, n.tgt)))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 4,
        marginTop: 8
      }
    }, [{
      l: "Protein",
      pct: Math.round(dn.prot * 4 / Math.max(dn.cal, 1) * 100),
      c: "#16a34a"
    }, {
      l: "Carbs",
      pct: Math.round(dn.carb * 4 / Math.max(dn.cal, 1) * 100),
      c: "#3b82f6"
    }, {
      l: "Fat",
      pct: Math.round(dn.fat * 9 / Math.max(dn.cal, 1) * 100),
      c: "#d97706"
    }].map((m, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        flex: m.pct,
        height: 6,
        borderRadius: 3,
        background: m.c,
        transition: 'flex 0.5s'
      },
      title: `${m.l}: ${m.pct}%`
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 4
      }
    }, [{
      l: "Protein",
      pct: Math.round(dn.prot * 4 / Math.max(dn.cal, 1) * 100),
      c: "#16a34a"
    }, {
      l: "Carbs",
      pct: Math.round(dn.carb * 4 / Math.max(dn.cal, 1) * 100),
      c: "#3b82f6"
    }, {
      l: "Fat",
      pct: Math.round(dn.fat * 9 / Math.max(dn.cal, 1) * 100),
      c: "#d97706"
    }].map((m, i) => /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        fontSize: 9,
        color: m.c,
        fontWeight: 600
      }
    }, m.l, " ", m.pct, "%")))) : null;
  })(), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: T.text,
      marginBottom: 10
    }
  }, "\uD83C\uDF7D\uFE0F \u0B87\u0BA9\u0BCD\u0BB1\u0BC8\u0BAF \u0B89\u0BA3\u0BB5\u0BC1"), MLI.map((ml, i) => {
    const m = todayM?.[ml.k];
    if (!m) return null;
    const fav = !!D.fav[`${day}-${ml.k}`];
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        borderLeft: `3px solid ${ml.c}`,
        borderRadius: 10,
        padding: '10px 12px',
        marginBottom: 6,
        background: dark ? 'rgba(255,255,255,0.03)' : '#fafbfa',
        animation: 'aSlideR 0.3s ease both',
        animationDelay: `${i * 0.05}s`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        color: ml.c,
        textTransform: 'uppercase'
      }
    }, ml.l), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 6,
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("span", {
      onClick: () => toggleFav(day, ml.k),
      style: {
        cursor: 'pointer',
        fontSize: 14
      }
    }, fav ? "❤️" : "🤍"), m.time && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        color: T.muted
      }
    }, "\u23F0 ", m.time))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        color: T.text,
        marginTop: 2
      }
    }, m.ta || m.en), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: T.muted,
        marginTop: 1
      }
    }, m.port), (() => {
      const nt = getNut(m);
      return nt ? /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          gap: 4,
          flexWrap: 'wrap',
          marginTop: 4
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 9,
          background: dark ? 'rgba(255,255,255,0.05)' : '#f3f4f6',
          padding: '2px 7px',
          borderRadius: 6,
          color: T.sub
        }
      }, "\uD83D\uDD25 ", nt.cal, " cal"), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 9,
          background: dark ? 'rgba(34,197,94,0.1)' : '#f0fdf4',
          padding: '2px 7px',
          borderRadius: 6,
          color: '#16a34a'
        }
      }, "\uD83D\uDCAA ", nt.prot, "g P"), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 9,
          background: dark ? 'rgba(59,130,246,0.1)' : '#eff6ff',
          padding: '2px 7px',
          borderRadius: 6,
          color: '#3b82f6'
        }
      }, "\uD83C\uDF5A ", nt.carb, "g C"), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 9,
          background: dark ? 'rgba(245,158,11,0.1)' : '#fffbeb',
          padding: '2px 7px',
          borderRadius: 6,
          color: '#d97706'
        }
      }, "\uD83E\uDED7 ", nt.fat, "g F"), nt.fib > 0 && /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 9,
          background: dark ? 'rgba(124,58,237,0.1)' : '#f5f3ff',
          padding: '2px 7px',
          borderRadius: 6,
          color: '#7c3aed'
        }
      }, "\uD83C\uDF3E ", nt.fib, "g Fib")) : null;
    })(), m.steps && /*#__PURE__*/React.createElement("button", {
      onClick: () => setRecipe({
        ...m,
        meal: ml.e
      }),
      style: {
        marginTop: 6,
        fontSize: 11,
        padding: '4px 12px',
        borderRadius: 16,
        border: `1px solid ${T.border}`,
        background: 'none',
        color: T.sub,
        fontWeight: 600,
        cursor: 'pointer'
      }
    }, "\uD83D\uDCD6 Recipe"));
  })), /*#__PURE__*/React.createElement(Card, {
    style: {
      background: dark ? 'rgba(34,197,94,0.08)' : 'linear-gradient(135deg,#f0fdf4,#ecfdf5)',
      border: dark ? '1px solid #22543d' : '1px solid #bbf7d0'
    }
  }, (() => {
    const m = MOTIV[(day - 1) % MOTIV.length];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center',
        padding: '4px 0'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 700,
        color: dark ? '#4ade80' : '#166534',
        lineHeight: 1.5
      }
    }, m[0]), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: T.muted,
        marginTop: 4
      }
    }, m[1]));
  })()), (() => {
    const CTIPS = [
    // Week 1-2: Rice reduction focus
    {
      w: [1, 2],
      tips: [{
        i: "🍚",
        t: "இந்த வாரம் ஒரே ஒரு change: சாதம் 1 small steel katori-க்கு குறைங்க. மத்தது same!",
        e: "This week: just reduce rice to 1 small katori. Nothing else changes!"
      }, {
        i: "🍽️",
        t: "10-inch plate use பண்ணுங்க. Research says smaller plate = 20-30% less food naturally!",
        e: "Use a 10-inch plate — you'll eat 20-30% less without noticing"
      }, {
        i: "🥒",
        t: "சாதம் சாப்பிடும் முன் cucumber+tomato+onion+lemon salad சாப்பிடுங்க. Stomach fills with fiber!",
        e: "Eat raw salad before rice — fills stomach with fiber first"
      }, {
        i: "📏",
        t: "Rice = 1 closed fist, Sambar = 1-2 ladles (generous!), Poriyal = UNLIMITED. Heap it!",
        e: "Fist of rice, generous sambar, unlimited vegetables"
      }, {
        i: "🔄",
        t: "Eating order: 1️⃣ Poriyal first 2️⃣ Sambar rice 3️⃣ Rasam rice 4️⃣ Tiny curd rice last",
        e: "Eat in this order to naturally eat less rice"
      }]
    },
    // Week 3-4: Protein boost
    {
      w: [3, 4],
      tips: [{
        i: "💪",
        t: "இன்னிக்கு 1 boiled egg சாப்பிடுங்க — cheapest complete protein: 7g, 78 cal only!",
        e: "Add 1 boiled egg today — cheapest protein source: 7g for just 78 cal"
      }, {
        i: "🫘",
        t: "சாயங்காலம் murukku/bajji-க்கு பதில் sundal சாப்பிடுங்க. 12g protein vs 2g!",
        e: "Replace evening murukku/bajji with sundal — 6x more protein!"
      }, {
        i: "🥣",
        t: "High-protein sambar tip: ½ cup துவரம் + ¼ cup பாசிப்பருப்பு mix = 3-4g extra protein per cup!",
        e: "Mix toor+moong dal in sambar for extra 3-4g protein per serving"
      }, {
        i: "🥞",
        t: "Plain dosa (3g protein) → Pesarattu (7g) or Moong chilla (8g) = DOUBLE the protein!",
        e: "Switch dosa to pesarattu/chilla — doubles your breakfast protein"
      }, {
        i: "🎯",
        t: "ஒவ்வொரு meal-லும் 25-28g protein aim பண்ணுங்க. Body ஒரே நேரத்தில 30g-க்கு மேல use பண்ண முடியாது.",
        e: "Aim 25-28g protein per meal — body can't use more than 30g at once"
      }]
    },
    // Week 5-6: Oil + Millets
    {
      w: [5, 6],
      tips: [{
        i: "🫗",
        t: "எண்ணெய் teaspoon-ல measure பண்ணுங்க! 1 tbsp = 120 cal. 2-3 tsp/day = 200-300 cal saved!",
        e: "Measure oil with teaspoons — saves 200-300 calories daily!"
      }, {
        i: "🌾",
        t: "இன்னிக்கு ஒரு meal-ல rice-க்கு பதில் samai/varagu try பண்ணுங்க. Family-க்கு தெரியாது!",
        e: "Replace rice with samai/varagu at one meal — family won't even notice!"
      }, {
        i: "🍳",
        t: "Poriyal hack: ½ tsp oil + tempering, then 3-4 tbsp WATER. Steam 5-8 min. 120 cal → 60 cal!",
        e: "Water-sauté method: halves poriyal calories while keeping taste"
      }, {
        i: "🧅",
        t: "Dosa hack: Cut onion in half, dip in oil, rub on tawa = ⅛ tsp per dosa. 150 cal → 100 cal!",
        e: "Onion-oil trick for dosa: almost zero oil, same taste"
      }, {
        i: "🟢",
        t: "தேங்காய் chutney (180 cal) → Tomato chutney (40 cal) or Mint chutney (20 cal). Big save!",
        e: "Swap coconut chutney for tomato/mint — saves 140+ calories"
      }]
    },
    // Week 7-8: Fine-tune
    {
      w: [7, 8],
      tips: [{
        i: "🌙",
        t: "Dinner = lightest meal! 2 idlis+sambar OR ragi kanji OR small khichdi. 8 PM முன் finish.",
        e: "Dinner should be lightest: eat like a pauper, before 8 PM"
      }, {
        i: "☕",
        t: "காப்பி-ல sugar 2 → 1 → ½ tsp gradually. ½ tsp save = 30-40 cal × 365 days = 5 kg/year!",
        e: "Gradually reduce coffee sugar — saves 30-40 cal per cup"
      }, {
        i: "😋",
        t: "இரவு 9-10 PM hunger? Warm buttermilk+cumin (~40 cal) first. Usually habit, not real hunger.",
        e: "Night hunger? Try warm buttermilk with cumin first — usually habit, not hunger"
      }, {
        i: "🟡",
        t: "மஞ்சள்+மிளகு TOGETHER daily! Pepper increases turmeric absorption 2000%. Joint pain-க்கு best.",
        e: "Turmeric + pepper together = 2000% better absorption. Use daily!"
      }, {
        i: "📏",
        t: "Waist measurement > weight! Navel level, tape flat. 80cm↓ = healthy. Scale plateau-ல இதை check.",
        e: "Measure waist monthly — better health indicator than weight alone"
      }]
    }];
    const wk = Math.ceil(day / 7);
    const phase = CTIPS.find(c => c.w.includes(wk)) || CTIPS[0];
    const tip = phase.tips[(day - 1) % phase.tips.length];
    return /*#__PURE__*/React.createElement(Card, {
      style: {
        background: dark ? 'rgba(59,130,246,0.06)' : 'linear-gradient(135deg,#eff6ff,#dbeafe)',
        border: '1px solid #93c5fd'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'start',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 24,
        flexShrink: 0
      }
    }, tip.i), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        fontWeight: 700,
        color: '#2563eb',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        marginBottom: 3
      }
    }, "\uD83D\uDCA1 Week ", wk, " Focus Tip"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 600,
        color: T.text,
        lineHeight: 1.5
      }
    }, tip.t), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: T.muted,
        marginTop: 2
      }
    }, tip.e))), /*#__PURE__*/React.createElement("button", {
      onClick: () => setTab("guide"),
      style: {
        marginTop: 8,
        fontSize: 10,
        padding: '4px 12px',
        borderRadius: 12,
        border: `1px solid #93c5fd`,
        background: 'none',
        color: '#2563eb',
        fontWeight: 600,
        cursor: 'pointer'
      }
    }, "\uD83D\uDCDA Read more in Guide"));
  })(), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      padding: '0 16px'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    style: {
      flex: 1,
      margin: 0,
      textAlign: 'center',
      cursor: 'pointer'
    },
    onClick: openQuiz
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24
    }
  }, "\uD83E\uDDE0"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: T.text,
      marginTop: 2
    }
  }, "Quiz"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: T.muted
    }
  }, "Test your knowledge")), /*#__PURE__*/React.createElement(Card, {
    style: {
      flex: 1,
      margin: 0,
      textAlign: 'center',
      cursor: 'pointer'
    },
    onClick: () => {
      hap("medium");
      setBreathing(!breathing);
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24
    }
  }, breathing ? "🫁" : "🧘"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: T.text,
      marginTop: 2
    }
  }, breathing ? "Stop" : "Breathe"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: T.muted
    }
  }, "Knee pain relief")), /*#__PURE__*/React.createElement(Card, {
    style: {
      flex: 1,
      margin: 0,
      textAlign: 'center',
      cursor: 'pointer'
    },
    onClick: shareWA
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24
    }
  }, "\uD83D\uDCE4"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: T.text,
      marginTop: 2
    }
  }, "Share"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: T.muted
    }
  }, "WhatsApp"))), breathing && /*#__PURE__*/React.createElement(Card, {
    style: {
      textAlign: 'center',
      border: '1px solid #c4b5fd'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 80,
      height: 80,
      borderRadius: 40,
      background: 'radial-gradient(circle,#a78bfa,#7c3aed)',
      margin: '8px auto',
      animation: 'aBreathe 6s ease infinite',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#fff',
      fontSize: 11,
      fontWeight: 600
    }
  }, "Breathe")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: '#7c3aed',
      margin: '6px 0'
    }
  }, "4s \u0B89\u0BB3\u0BCD\u0BB3\u0BC7... 4s hold... 4s \u0BB5\u0BC6\u0BB3\u0BBF\u0BAF\u0BC7...")), todayM?.tip?.ta && /*#__PURE__*/React.createElement(Card, {
    style: {
      background: todayM.f ? dark ? 'rgba(34,197,94,0.06)' : 'linear-gradient(135deg,#f0fdf4,#dcfce7)' : dark ? 'rgba(245,158,11,0.06)' : 'linear-gradient(135deg,#fffbeb,#fef3c7)',
      border: todayM.f ? '1px solid #86efac' : '1px solid #fde68a'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: todayM.f ? '#166534' : '#92400e'
    }
  }, todayM.f ? "🌟 FLEX DAY" : "💡 Tip"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      lineHeight: 1.5,
      color: todayM.f ? '#15803d' : '#78350f',
      marginTop: 2
    }
  }, todayM.tip.ta)));

  // ── MEALS TAB ────────────────────────────────
  const MealsTab = () => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Hdr, {
    bg: "linear-gradient(160deg,#7c2d12,#c2410c,#ea580c)"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'rgba(255,255,255,0.7)'
    }
  }, "\uD83C\uDF72 \u0B89\u0BA3\u0BB5\u0BC1 \u0BA4\u0BBF\u0B9F\u0BCD\u0B9F\u0BAE\u0BCD"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      fontWeight: 800,
      color: '#fff'
    }
  }, "Day ", mDay, " Meals"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'rgba(255,255,255,0.12)',
      padding: '3px 12px',
      borderRadius: 20,
      fontSize: 11,
      color: 'rgba(255,255,255,0.85)',
      fontWeight: 600
    }
  }, PH[viewM?.p || 0].ta))), /*#__PURE__*/React.createElement(DayScroll, {
    active: mDay,
    onTap: d => {
      const y = window.scrollY;
      setMDay(d);
      requestAnimationFrame(() => window.scrollTo(0, y));
    }
  }), (() => {
    const dn = getDayNut(viewM);
    return dn ? /*#__PURE__*/React.createElement("div", {
      style: {
        margin: '0 16px 6px',
        background: dark ? 'rgba(34,197,94,0.06)' : 'linear-gradient(135deg,#f0fdf4,#ecfdf5)',
        borderRadius: 14,
        padding: '10px 14px',
        border: dark ? '1px solid #22543d' : '1px solid #bbf7d0'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        color: dark ? '#4ade80' : '#166534'
      }
    }, "\uD83D\uDCCA Day ", mDay, " Total"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: dark ? '#4ade80' : '#16a34a',
        fontWeight: 600
      }
    }, "\uD83D\uDD25 ", dn.cal, " kcal")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8,
        marginTop: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: '#16a34a'
      }
    }, "\uD83D\uDCAA", dn.prot, "g P"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: '#3b82f6'
      }
    }, "\uD83C\uDF5A", dn.carb, "g C"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: '#d97706'
      }
    }, "\uD83E\uDED7", dn.fat, "g F"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: '#7c3aed'
      }
    }, "\uD83C\uDF3E", dn.fib, "g Fib"))) : null;
  })(), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 4px'
    }
  }, MLI.map((ml, i) => {
    const m = viewM?.[ml.k];
    if (!m) return null;
    const fav = !!D.fav[`${mDay}-${ml.k}`];
    return /*#__PURE__*/React.createElement(Card, {
      key: i,
      style: {
        borderLeft: `4px solid ${ml.c}`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: ml.c,
        textTransform: 'uppercase',
        letterSpacing: '0.03em'
      }
    }, ml.l, " / ", ml.e), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8,
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("span", {
      onClick: () => toggleFav(mDay, ml.k),
      style: {
        cursor: 'pointer',
        fontSize: 16
      }
    }, fav ? "❤️" : "🤍"), m.time && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: T.muted,
        background: dark ? 'rgba(255,255,255,0.05)' : '#f9fafb',
        padding: '2px 8px',
        borderRadius: 8
      }
    }, "\u23F0 ", m.time))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 16,
        fontWeight: 700,
        color: T.text
      }
    }, m.ta), m.en !== m.ta && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        color: T.muted
      }
    }, m.en), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        color: T.sub,
        background: dark ? 'rgba(255,255,255,0.03)' : '#f9fafb',
        borderRadius: 8,
        padding: '5px 10px',
        margin: '8px 0'
      }
    }, "\uD83D\uDCCF ", m.port), (() => {
      const nt = getNut(m);
      return nt ? /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          gap: 4,
          flexWrap: 'wrap',
          marginBottom: 8
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 12,
          background: dark ? 'rgba(255,255,255,0.05)' : '#f0fdf4',
          padding: '3px 8px',
          borderRadius: 6,
          color: '#16a34a',
          fontWeight: 600
        }
      }, "\uD83D\uDD25 ", nt.cal, " cal"), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 12,
          background: dark ? 'rgba(34,197,94,0.1)' : '#f0fdf4',
          padding: '3px 8px',
          borderRadius: 6,
          color: '#16a34a'
        }
      }, "\uD83D\uDCAA ", nt.prot, "g protein"), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 12,
          background: dark ? 'rgba(59,130,246,0.1)' : '#eff6ff',
          padding: '3px 8px',
          borderRadius: 6,
          color: '#2563eb'
        }
      }, "\uD83C\uDF5A ", nt.carb, "g carbs"), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 12,
          background: dark ? 'rgba(245,158,11,0.1)' : '#fffbeb',
          padding: '3px 8px',
          borderRadius: 6,
          color: '#d97706'
        }
      }, "\uD83E\uDED7 ", nt.fat, "g fat"), nt.fib > 0 && /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 12,
          background: dark ? 'rgba(124,58,237,0.1)' : '#f5f3ff',
          padding: '3px 8px',
          borderRadius: 6,
          color: '#7c3aed'
        }
      }, "\uD83C\uDF3E ", nt.fib, "g fiber")) : null;
    })(), m.sw && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 6
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 600,
        color: T.sub,
        marginBottom: 4
      }
    }, "\uD83D\uDD04 Swap Options:"), m.sw.map((s, si) => /*#__PURE__*/React.createElement("div", {
      key: si,
      style: {
        fontSize: 14,
        color: T.text,
        padding: '4px 10px',
        margin: '3px 0',
        background: dark ? 'rgba(255,255,255,0.03)' : '#fafafa',
        borderRadius: 8,
        border: `1px solid ${T.border}`
      }
    }, "\u2022 ", s))), m.steps && /*#__PURE__*/React.createElement("button", {
      onClick: () => setRecipe({
        ...m,
        meal: ml.e
      }),
      style: {
        marginTop: 8,
        fontSize: 14,
        padding: '7px 16px',
        borderRadius: 20,
        border: `1.5px solid ${ml.c}`,
        background: 'none',
        color: ml.c,
        fontWeight: 700,
        cursor: 'pointer'
      }
    }, "\uD83D\uDCD6 Full Recipe & Steps"));
  })));

  // ── PROGRESS TAB ────────────────────────────
  const ProgressTab = () => {
    const pr = D.pr;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Hdr, {
      bg: "linear-gradient(160deg,#3b0764,#6d28d9,#7c3aed)"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.7)'
      }
    }, "\uD83D\uDCC8 \u0BAE\u0BC1\u0BA9\u0BCD\u0BA9\u0BC7\u0BB1\u0BCD\u0BB1\u0BAE\u0BCD"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 24,
        fontWeight: 800,
        color: '#fff'
      }
    }, "Progress"), bmi && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        background: 'rgba(255,255,255,0.12)',
        padding: '3px 12px',
        borderRadius: 20,
        fontSize: 11,
        color: 'rgba(255,255,255,0.85)',
        fontWeight: 600
      }
    }, "BMI: ", bmi))), pr.length > 0 && /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 700,
        color: T.text,
        marginBottom: 12
      }
    }, "\u2696\uFE0F Weight Journey"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: T.muted
      }
    }, "Start"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 26,
        fontWeight: 800,
        color: T.text
      }
    }, pr[0].w), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: T.muted
      }
    }, "kg")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 20,
        color: T.border
      }
    }, "\u2192"), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: T.muted
      }
    }, "Now"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 26,
        fontWeight: 800,
        color: '#16a34a'
      }
    }, pr[pr.length - 1].w), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: T.muted
      }
    }, "kg")), wl > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 110,
        background: dark ? 'rgba(34,197,94,0.08)' : 'linear-gradient(135deg,#f0fdf4,#dcfce7)',
        borderRadius: 14,
        padding: 12,
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 22,
        fontWeight: 800,
        color: '#16a34a'
      }
    }, "-", wl.toFixed(1), " kg \uD83C\uDF89"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: '#15803d'
      }
    }, "\uD83E\uDDB5 ~", (wl * 4).toFixed(0), "kg less knee pressure"))), pr.length >= 2 && (() => {
      const ws = pr.map(p => p.w);
      const mn = Math.floor(Math.min(...ws) - 1);
      const mx = Math.ceil(Math.max(...ws) + 1);
      const rn = mx - mn || 1;
      const W = 300,
        H = 130,
        P = 32;
      const pts = pr.map((p, i) => ({
        x: P + i * ((W - P * 2) / Math.max(pr.length - 1, 1)),
        y: P + (1 - (p.w - mn) / rn) * (H - P * 2)
      }));
      const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
      const area = line + ` L${pts[pts.length - 1].x},${H - P} L${pts[0].x},${H - P} Z`;
      return /*#__PURE__*/React.createElement("svg", {
        viewBox: `0 0 ${W} ${H}`,
        style: {
          width: '100%',
          maxWidth: W,
          marginTop: 14
        }
      }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
        id: "aG",
        x1: "0",
        x2: "0",
        y1: "0",
        y2: "1"
      }, /*#__PURE__*/React.createElement("stop", {
        offset: "0%",
        stopColor: "#22c55e",
        stopOpacity: "0.3"
      }), /*#__PURE__*/React.createElement("stop", {
        offset: "100%",
        stopColor: "#22c55e",
        stopOpacity: "0.02"
      }))), [0, 1, 2, 3].map(i => {
        const v = mn + rn / 3 * i;
        const y = P + (1 - i / 3) * (H - P * 2);
        return /*#__PURE__*/React.createElement("g", {
          key: i
        }, /*#__PURE__*/React.createElement("line", {
          x1: P,
          y1: y,
          x2: W - P,
          y2: y,
          stroke: dark ? "#2a3a30" : "#f3f4f6",
          strokeWidth: "0.7"
        }), /*#__PURE__*/React.createElement("text", {
          x: P - 5,
          y: y + 3,
          fill: T.muted,
          fontSize: "9",
          textAnchor: "end"
        }, v.toFixed(0)));
      }), /*#__PURE__*/React.createElement("path", {
        d: area,
        fill: "url(#aG)"
      }), /*#__PURE__*/React.createElement("path", {
        d: line,
        fill: "none",
        stroke: "#16a34a",
        strokeWidth: "2.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }), pts.map((p, i) => /*#__PURE__*/React.createElement("circle", {
        key: i,
        cx: p.x,
        cy: p.y,
        r: i === pts.length - 1 ? 5 : 3.5,
        fill: i === pts.length - 1 ? "#16a34a" : "#fff",
        stroke: "#16a34a",
        strokeWidth: "2"
      })));
    })()), /*#__PURE__*/React.createElement(Card, {
      style: {
        padding: 0,
        overflow: 'hidden',
        borderRadius: 20
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        background: 'linear-gradient(180deg,#020617 0%,#0a1628 40%,#111827 100%)',
        padding: '16px 16px 8px',
        minHeight: 200
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "100%",
      height: "100%",
      style: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }
    }, Array.from({
      length: 40
    }, (_, i) => {
      const x = (i * 37 + 13) % 100;
      const y = (i * 23 + 7) % 55;
      const r = i % 3 === 0 ? 1.5 : i % 2 === 0 ? 1 : 0.7;
      const op = done > 0 ? 0.3 + Math.min(done / 30, 1) * 0.7 : 0.15;
      return /*#__PURE__*/React.createElement("circle", {
        key: i,
        cx: `${x}%`,
        cy: `${y}%`,
        r: r,
        fill: "#fff",
        opacity: op
      }, done > 0 && i % 4 === 0 && /*#__PURE__*/React.createElement("animate", {
        attributeName: "opacity",
        values: `${op};${op * 0.3};${op}`,
        dur: `${2 + i % 3}s`,
        repeatCount: "indefinite"
      }));
    })), /*#__PURE__*/React.createElement("svg", {
      width: "100%",
      height: "180",
      viewBox: "0 0 400 180",
      style: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0
      },
      preserveAspectRatio: "none"
    }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("filter", {
      id: "aGlow"
    }, /*#__PURE__*/React.createElement("feGaussianBlur", {
      stdDeviation: "8",
      result: "g"
    }), /*#__PURE__*/React.createElement("feMerge", null, /*#__PURE__*/React.createElement("feMergeNode", {
      in: "g"
    }), /*#__PURE__*/React.createElement("feMergeNode", {
      in: "g"
    }), /*#__PURE__*/React.createElement("feMergeNode", {
      in: "SourceGraphic"
    }))), /*#__PURE__*/React.createElement("linearGradient", {
      id: "a1",
      x1: "0",
      x2: "1",
      y1: "0",
      y2: "0"
    }, /*#__PURE__*/React.createElement("stop", {
      offset: "0%",
      stopColor: "#06b6d4",
      stopOpacity: "0"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "30%",
      stopColor: "#06b6d4",
      stopOpacity: "0.6"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "60%",
      stopColor: "#22d3ee",
      stopOpacity: "0.7"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "100%",
      stopColor: "#06b6d4",
      stopOpacity: "0"
    })), /*#__PURE__*/React.createElement("linearGradient", {
      id: "a2",
      x1: "0",
      x2: "1",
      y1: "0",
      y2: "0"
    }, /*#__PURE__*/React.createElement("stop", {
      offset: "0%",
      stopColor: "#10b981",
      stopOpacity: "0"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "25%",
      stopColor: "#34d399",
      stopOpacity: "0.5"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "50%",
      stopColor: "#10b981",
      stopOpacity: "0.8"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "75%",
      stopColor: "#6ee7b7",
      stopOpacity: "0.5"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "100%",
      stopColor: "#10b981",
      stopOpacity: "0"
    })), /*#__PURE__*/React.createElement("linearGradient", {
      id: "a3",
      x1: "0",
      x2: "1",
      y1: "0",
      y2: "0"
    }, /*#__PURE__*/React.createElement("stop", {
      offset: "0%",
      stopColor: "#8b5cf6",
      stopOpacity: "0"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "40%",
      stopColor: "#a78bfa",
      stopOpacity: "0.6"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "70%",
      stopColor: "#c084fc",
      stopOpacity: "0.7"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "100%",
      stopColor: "#8b5cf6",
      stopOpacity: "0"
    })), /*#__PURE__*/React.createElement("linearGradient", {
      id: "a4",
      x1: "0",
      x2: "1",
      y1: "0",
      y2: "0"
    }, /*#__PURE__*/React.createElement("stop", {
      offset: "0%",
      stopColor: "#ec4899",
      stopOpacity: "0"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "35%",
      stopColor: "#f472b6",
      stopOpacity: "0.4"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "65%",
      stopColor: "#ec4899",
      stopOpacity: "0.6"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "100%",
      stopColor: "#ec4899",
      stopOpacity: "0"
    })), /*#__PURE__*/React.createElement("linearGradient", {
      id: "a5",
      x1: "0",
      x2: "1",
      y1: "0",
      y2: "0"
    }, /*#__PURE__*/React.createElement("stop", {
      offset: "0%",
      stopColor: "#fbbf24",
      stopOpacity: "0"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "50%",
      stopColor: "#fcd34d",
      stopOpacity: "0.5"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "100%",
      stopColor: "#fbbf24",
      stopOpacity: "0"
    }))), done >= 1 && /*#__PURE__*/React.createElement("path", {
      d: `M0,${95 - Math.min(done, 6) * 5} Q100,${75 - Math.min(done, 6) * 7} 200,${90 - Math.min(done, 6) * 6} Q300,${70 - Math.min(done, 6) * 5} 400,${85 - Math.min(done, 6) * 4}`,
      stroke: "url(#a1)",
      strokeWidth: Math.min(done, 6) * 3 + 2,
      fill: "none",
      filter: "url(#aGlow)",
      opacity: Math.min(done / 3, 1) * 0.8
    }, /*#__PURE__*/React.createElement("animate", {
      attributeName: "d",
      values: `M0,${95 - Math.min(done, 6) * 5} Q100,${75 - Math.min(done, 6) * 7} 200,${90 - Math.min(done, 6) * 6} Q300,${70 - Math.min(done, 6) * 5} 400,${85 - Math.min(done, 6) * 4};M0,${90 - Math.min(done, 6) * 5} Q100,${80 - Math.min(done, 6) * 7} 200,${85 - Math.min(done, 6) * 6} Q300,${75 - Math.min(done, 6) * 5} 400,${90 - Math.min(done, 6) * 4};M0,${95 - Math.min(done, 6) * 5} Q100,${75 - Math.min(done, 6) * 7} 200,${90 - Math.min(done, 6) * 6} Q300,${70 - Math.min(done, 6) * 5} 400,${85 - Math.min(done, 6) * 4}`,
      dur: "8s",
      repeatCount: "indefinite"
    })), done >= 4 && /*#__PURE__*/React.createElement("path", {
      d: `M0,${80 - Math.min(done - 3, 8) * 3} Q150,${60 - Math.min(done - 3, 8) * 4} 250,${75 - Math.min(done - 3, 8) * 3} 400,${65 - Math.min(done - 3, 8) * 3}`,
      stroke: "url(#a2)",
      strokeWidth: Math.min(done - 3, 8) * 3 + 3,
      fill: "none",
      filter: "url(#aGlow)",
      opacity: Math.min((done - 3) / 4, 1) * 0.9
    }, /*#__PURE__*/React.createElement("animate", {
      attributeName: "d",
      values: `M0,${80 - Math.min(done - 3, 8) * 3} Q150,${60 - Math.min(done - 3, 8) * 4} 250,${75 - Math.min(done - 3, 8) * 3} 400,${65 - Math.min(done - 3, 8) * 3};M0,${75 - Math.min(done - 3, 8) * 3} Q150,${65 - Math.min(done - 3, 8) * 4} 250,${70 - Math.min(done - 3, 8) * 3} 400,${70 - Math.min(done - 3, 8) * 3};M0,${80 - Math.min(done - 3, 8) * 3} Q150,${60 - Math.min(done - 3, 8) * 4} 250,${75 - Math.min(done - 3, 8) * 3} 400,${65 - Math.min(done - 3, 8) * 3}`,
      dur: "10s",
      repeatCount: "indefinite"
    })), done >= 10 && /*#__PURE__*/React.createElement("path", {
      d: `M0,${60 - Math.min(done - 9, 10) * 2} Q120,${45 - Math.min(done - 9, 10) * 2} 280,${55 - Math.min(done - 9, 10) * 2} 400,${40 - Math.min(done - 9, 10) * 2}`,
      stroke: "url(#a3)",
      strokeWidth: Math.min(done - 9, 10) * 2 + 2,
      fill: "none",
      filter: "url(#aGlow)",
      opacity: Math.min((done - 9) / 5, 1) * 0.8
    }, /*#__PURE__*/React.createElement("animate", {
      attributeName: "d",
      values: `M0,${60 - Math.min(done - 9, 10) * 2} Q120,${45 - Math.min(done - 9, 10) * 2} 280,${55 - Math.min(done - 9, 10) * 2} 400,${40 - Math.min(done - 9, 10) * 2};M0,${55 - Math.min(done - 9, 10) * 2} Q120,${50 - Math.min(done - 9, 10) * 2} 280,${50 - Math.min(done - 9, 10) * 2} 400,${45 - Math.min(done - 9, 10) * 2};M0,${60 - Math.min(done - 9, 10) * 2} Q120,${45 - Math.min(done - 9, 10) * 2} 280,${55 - Math.min(done - 9, 10) * 2} 400,${40 - Math.min(done - 9, 10) * 2}`,
      dur: "12s",
      repeatCount: "indefinite"
    })), done >= 20 && /*#__PURE__*/React.createElement("path", {
      d: `M0,${40 - Math.min(done - 19, 10) * 1.5} Q180,${25 - Math.min(done - 19, 10) * 1.5} 320,${35 - Math.min(done - 19, 10) * 1.5} 400,${20 - Math.min(done - 19, 10) * 1.5}`,
      stroke: "url(#a4)",
      strokeWidth: Math.min(done - 19, 10) * 2,
      fill: "none",
      filter: "url(#aGlow)",
      opacity: Math.min((done - 19) / 5, 1) * 0.7
    }, /*#__PURE__*/React.createElement("animate", {
      attributeName: "d",
      values: `M0,${40 - Math.min(done - 19, 10) * 1.5} Q180,${25 - Math.min(done - 19, 10) * 1.5} 320,${35 - Math.min(done - 19, 10) * 1.5} 400,${20 - Math.min(done - 19, 10) * 1.5};M0,${35 - Math.min(done - 19, 10) * 1.5} Q180,${30 - Math.min(done - 19, 10) * 1.5} 320,${30 - Math.min(done - 19, 10) * 1.5} 400,${25 - Math.min(done - 19, 10) * 1.5};M0,${40 - Math.min(done - 19, 10) * 1.5} Q180,${25 - Math.min(done - 19, 10) * 1.5} 320,${35 - Math.min(done - 19, 10) * 1.5} 400,${20 - Math.min(done - 19, 10) * 1.5}`,
      dur: "14s",
      repeatCount: "indefinite"
    })), done >= 28 && /*#__PURE__*/React.createElement("path", {
      d: "M0,18 Q100,8 200,15 Q300,5 400,12",
      stroke: "url(#a5)",
      strokeWidth: Math.min(done - 27, 3) * 3,
      fill: "none",
      filter: "url(#aGlow)",
      opacity: Math.min((done - 27) / 3, 1) * 0.6
    }, /*#__PURE__*/React.createElement("animate", {
      attributeName: "d",
      values: "M0,18 Q100,8 200,15 Q300,5 400,12;M0,14 Q100,12 200,10 Q300,8 400,16;M0,18 Q100,8 200,15 Q300,5 400,12",
      dur: "9s",
      repeatCount: "indefinite"
    })), /*#__PURE__*/React.createElement("path", {
      d: "M0,180 L0,155 Q30,140 60,150 L90,135 Q110,125 130,140 L160,130 Q180,115 200,130 L230,120 Q250,110 270,125 L300,115 Q320,105 340,120 L370,130 Q390,140 400,135 L400,180 Z",
      fill: "#0f172a",
      opacity: "0.9"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M0,180 L0,162 Q50,148 100,158 L140,145 Q170,135 200,148 L250,140 Q290,130 330,142 L370,148 Q390,155 400,150 L400,180 Z",
      fill: "#1e293b",
      opacity: "0.7"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        zIndex: 2,
        marginTop: 150
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(10,1fr)',
        gap: 3
      }
    }, Array.from({
      length: 30
    }, (_, i) => {
      const d = i + 1;
      const sc = gs(d);
      const has = Object.keys(D.ck[d] || {}).length > 0;
      return /*#__PURE__*/React.createElement("div", {
        key: d,
        style: {
          aspectRatio: '1',
          borderRadius: 6,
          background: has ? sc >= 80 ? 'rgba(34,197,94,0.7)' : sc >= 60 ? 'rgba(250,204,21,0.5)' : 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 8,
          fontWeight: 700,
          color: has ? '#fff' : 'rgba(255,255,255,0.25)',
          border: d === day ? '1.5px solid rgba(34,197,94,0.8)' : '1px solid rgba(255,255,255,0.05)',
          transition: 'all 0.3s'
        }
      }, d);
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
        paddingBottom: 4
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        color: 'rgba(255,255,255,0.5)'
      }
    }, "\u2728 Aurora Progress"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: 'rgba(255,255,255,0.3)'
      }
    }, done === 0 ? 'Start your journey to light up the sky' : done < 10 ? 'The first lights appear...' : done < 20 ? 'Beautiful colors forming!' : done < 28 ? 'The sky is coming alive!' : '🌟 Spectacular full aurora!')), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'right'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 22,
        fontWeight: 900,
        color: done >= 28 ? '#fcd34d' : done >= 20 ? '#f472b6' : done >= 10 ? '#a78bfa' : done >= 4 ? '#34d399' : '#22d3ee'
      }
    }, done), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 8,
        color: 'rgba(255,255,255,0.4)'
      }
    }, "/ 30 days"))))), /*#__PURE__*/React.createElement(Card, {
      style: {
        background: dark ? 'rgba(124,58,237,0.08)' : 'linear-gradient(135deg,#f5f3ff,#ede9fe)',
        border: '1px solid #ddd6fe'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 700,
        color: dark ? '#a78bfa' : '#5b21b6',
        marginBottom: 6
      }
    }, "\uD83D\uDCCA Weekly Report Card"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 56,
        height: 56,
        borderRadius: 16,
        background: 'linear-gradient(135deg,#7c3aed,#5b21b6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 28,
        fontWeight: 900,
        color: '#fff'
      }
    }, weekGrade), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: T.text
      }
    }, "Week ", Math.floor((day - 1) / 7) + 1, " Average: ", weekScore, "%"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: T.muted
      }
    }, "Streak: ", streak, " days \xB7 Done: ", done, "/30 days")))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 700,
        color: T.text,
        marginBottom: 10
      }
    }, "\u2795 Log Entry"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 10,
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 600,
        color: T.sub,
        marginBottom: 3
      }
    }, "\u2696\uFE0F Weight (kg) *"), /*#__PURE__*/React.createElement(Input, {
      type: "number",
      step: "0.1",
      placeholder: "70.5",
      value: pf.w,
      onChange: e => setPf({
        ...pf,
        w: e.target.value
      })
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 600,
        color: T.sub,
        marginBottom: 3
      }
    }, "\uD83D\uDCCF Waist (cm)"), /*#__PURE__*/React.createElement(Input, {
      type: "number",
      step: "0.5",
      placeholder: "85",
      value: pf.ws,
      onChange: e => setPf({
        ...pf,
        ws: e.target.value
      })
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 10,
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 600,
        color: T.sub,
        marginBottom: 3
      }
    }, "\uD83E\uDDB5 Knee Pain"), /*#__PURE__*/React.createElement("input", {
      type: "range",
      min: 1,
      max: 10,
      value: pf.kp,
      onChange: e => setPf({
        ...pf,
        kp: +e.target.value
      }),
      style: {
        width: '100%'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 800,
        color: pf.kp <= 3 ? '#16a34a' : pf.kp <= 6 ? '#d97706' : '#ef4444'
      }
    }, pf.kp)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 600,
        color: T.sub,
        marginBottom: 3
      }
    }, "\u26A1 Energy"), /*#__PURE__*/React.createElement("input", {
      type: "range",
      min: 1,
      max: 10,
      value: pf.en,
      onChange: e => setPf({
        ...pf,
        en: +e.target.value
      }),
      style: {
        width: '100%'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 800,
        color: pf.en >= 7 ? '#16a34a' : pf.en >= 4 ? '#d97706' : '#ef4444'
      }
    }, pf.en))), /*#__PURE__*/React.createElement(Btn, {
      onClick: saveProg,
      bg: "linear-gradient(135deg,#7c3aed,#5b21b6)"
    }, "\uD83D\uDCBE Save")), pr.length > 0 && /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 700,
        color: T.text,
        marginBottom: 8
      }
    }, "\uD83D\uDCCB History"), [...pr].reverse().slice(0, 10).map((p, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '7px 0',
        borderBottom: i < Math.min(pr.length, 10) - 1 ? `1px solid ${T.border}` : 'none',
        fontSize: 12
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 700,
        fontSize: 13,
        color: T.text
      }
    }, p.w, " kg"), /*#__PURE__*/React.createElement("div", {
      style: {
        color: T.muted,
        fontSize: 10
      }
    }, p.date)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 6,
        color: T.sub
      }
    }, "\uD83E\uDDB5", p.kp, " \u26A1", p.en, p.ws && ` 📏${p.ws}`)))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 700,
        color: T.text,
        marginBottom: 8
      }
    }, "\uD83C\uDFC6 Milestones"), [{
      t: "Week 1",
      r: "புது பூச்செடி 🌺",
      d: done >= 7,
      i: "🌱"
    }, {
      t: "Week 2",
      r: "Phone a friend 📞",
      d: done >= 14,
      i: "💪"
    }, {
      t: "-2 kg!",
      r: "புது nightdress 👗",
      d: wl >= 2,
      i: "🎉"
    }, {
      t: "Week 3",
      r: "Steel katori 🥣",
      d: done >= 21,
      i: "🌾"
    }, {
      t: "30 Days!",
      r: "புது saree! 👗",
      d: done >= 30,
      i: "🏆"
    }].map((ms, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '7px 0',
        borderBottom: i < 4 ? `1px solid ${T.border}` : 'none',
        opacity: ms.d ? 1 : 0.35
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 34,
        height: 34,
        borderRadius: 11,
        background: ms.d ? 'linear-gradient(135deg,#22c55e,#16a34a)' : '#f3f4f6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 15,
        flexShrink: 0,
        boxShadow: ms.d ? '0 2px 8px rgba(34,197,94,0.3)' : 'none'
      }
    }, ms.d ? ms.i : "🔒"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: ms.d ? '#16a34a' : T.muted
      }
    }, ms.t), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: '#7c3aed'
      }
    }, "\uD83C\uDF81 ", ms.r))))));
  };

  // ── SHOP TAB ──────────────────────────────────
  const SHOPD = [{
    t: "Week 1",
    c: {
      "🥬 காய்கறி": ["முருங்கை", "பீன்ஸ்", "கேரட்", "பீட்ரூட்", "தக்காளி", "வெங்காயம்", "கீரை"],
      "🫘 பருப்பு": ["துவரம்பருப்பு 500g", "பாசிப்பருப்பு 250g", "கொண்டைக்கடலை 250g"],
      "🥚 புரதம்": ["முட்டை 12", "தயிர் 1kg"],
      "🏪 மளிகை": ["நல்லெண்ணெய்", "ஆளிவிதை", "பாதாம்", "ஓட்ஸ்"],
      "🍎 பழம்": ["கொய்யா 4", "பப்பாளி 1"]
    }
  }, {
    t: "Week 2",
    c: {
      "🥬 காய்கறி": ["முருங்கை", "வெண்டைக்காய்", "பீன்ஸ்", "கீரை 2 bunch", "புதினா"],
      "🫘 பருப்பு": ["துவரம் 500g", "பாசிப்பருப்பு 250g", "பாசிப்பயிறு 500g"],
      "🌾 சிறுதானியம்": ["ராகி மாவு", "சாமை 500g"],
      "🥚 புரதம்": ["முட்டை 12", "வேர்க்கடலை", "தயிர் 1kg"],
      "🍎 பழம்": ["கொய்யா 4", "ஆப்பிள் 3"]
    }
  }, {
    t: "Week 3",
    c: {
      "🥬 காய்கறி": ["முருங்கை", "பீன்ஸ்", "கீரை 2 bunch"],
      "🫘 பருப்பு": ["துவரம் 500g", "பாசிப்பருப்பு 500g", "கொண்டைக்கடலை"],
      "🌾 சிறுதானியம்": ["வரகு 500g", "தினை 500g", "கம்பு மாவு", "ராகி மாவு"],
      "🥚 புரதம்": ["முட்டை 12", "தயிர் 1kg"],
      "🍎 பழம்": ["கொய்யா 4", "பப்பாளி 1"]
    }
  }, {
    t: "Week 4",
    c: {
      "🥬 காய்கறி": ["முருங்கை", "பீன்ஸ்", "கேரட்", "கீரை 2 bunch"],
      "🫘 பருப்பு": ["துவரம் 500g", "பாசிப்பருப்பு 500g", "கொண்டைக்கடலை"],
      "🌾 சிறுதானியம்": ["வரகு 500g", "தினை 500g", "ராகி மாவு", "கம்பு மாவு", "சாமை"],
      "🥚 புரதம்": ["முட்டை 12", "தயிர் 1kg", "வேர்க்கடலை"],
      "🍎 பழம்": ["கொய்யா 4", "Season பழம்"]
    }
  }];
  const ShopTab = () => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Hdr, {
    bg: "linear-gradient(160deg,#7c2d12,#c2410c,#ea580c)"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'rgba(255,255,255,0.7)'
    }
  }, "\uD83D\uDED2 \u0B95\u0B9F\u0BC8 \u0BB2\u0BBF\u0BB8\u0BCD\u0B9F\u0BCD"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 800,
      color: '#fff'
    }
  }, SHOPD[shopW].t)), /*#__PURE__*/React.createElement("div", {
    className: "a-ns",
    style: {
      display: 'flex',
      gap: 6,
      padding: '10px 16px',
      overflowX: 'auto'
    }
  }, SHOPD.map((_, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => setShopW(i),
    style: {
      padding: '8px 18px',
      borderRadius: 20,
      border: shopW === i ? '2px solid #ea580c' : `1.5px solid ${T.border}`,
      background: shopW === i ? '#ea580c' : T.card,
      color: shopW === i ? '#fff' : T.sub,
      fontSize: 14,
      fontWeight: 600,
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      flexShrink: 0
    }
  }, "Wk ", i + 1))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px'
    }
  }, Object.entries(SHOPD[shopW].c).map(([cat, items]) => /*#__PURE__*/React.createElement("div", {
    key: cat
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      padding: '12px 0 8px',
      borderBottom: '2px solid #fed7aa',
      color: '#9a3412'
    }
  }, cat), items.map((item, idx) => {
    const id = `${shopW}-${cat}-${idx}`;
    const on = !!D.sc[id];
    return /*#__PURE__*/React.createElement("div", {
      key: idx,
      onClick: () => toggleShop(id),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '11px 0',
        borderBottom: `1px solid ${T.border}`,
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 28,
        height: 28,
        borderRadius: 8,
        border: on ? 'none' : `2px solid ${T.border}`,
        background: on ? '#22c55e' : T.card,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }
    }, on && /*#__PURE__*/React.createElement(Chk, {
      on: true,
      sz: 16
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 16,
        textDecoration: on ? 'line-through' : 'none',
        color: on ? T.muted : T.text
      }
    }, item));
  })))));

  // ── SETTINGS TAB ──────────────────────────────
  const SettingsTab = () => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Hdr, {
    bg: "linear-gradient(160deg,#0f172a,#334155,#475569)"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'rgba(255,255,255,0.7)'
    }
  }, "\u2699\uFE0F Settings"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 800,
      color: '#fff'
    }
  }, D.name, "'s Tracker")), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: T.text,
      marginBottom: 8
    }
  }, "\uD83D\uDC64 Profile"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: T.muted,
      marginBottom: 4
    }
  }, "Name"), /*#__PURE__*/React.createElement(Input, {
    type: "text",
    value: D.name,
    onChange: e => save({
      ...D,
      name: e.target.value
    }),
    onBlur: e => { if (!e.target.value.trim()) save({...D, name: "அம்மா"}); }
  })), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: T.text,
      marginBottom: 8
    }
  }, "\uD83D\uDE80 Plan"), D.sd ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: T.sub,
      marginBottom: 10
    }
  }, "\u2705 Started: ", D.sd, " \u2014 Day ", day) : /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: T.sub,
      marginBottom: 10
    }
  }, "Plan start \u0B86\u0B95\u0BB2!"), /*#__PURE__*/React.createElement(Btn, {
    onClick: startPlan
  }, D.sd ? "🔄 Restart" : "▶️ Start Plan")), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: T.text,
      marginBottom: 8
    }
  }, "\uD83C\uDFA8 Theme"), /*#__PURE__*/React.createElement("div", {
    onClick: toggleDark,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 0',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: T.text
    }
  }, dark ? "🌙 Dark Mode" : "☀️ Light Mode"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 28,
      borderRadius: 14,
      background: dark ? '#22c55e' : '#d1d5db',
      padding: 2,
      transition: 'all 0.3s',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 24,
      height: 24,
      borderRadius: 12,
      background: '#fff',
      transform: dark ? 'translateX(20px)' : 'translateX(0)',
      transition: 'transform 0.3s',
      boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
    }
  })))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: T.text,
      marginBottom: 8
    }
  }, "\uD83D\uDCBE Data"), /*#__PURE__*/React.createElement("div", {
    onClick: exportData,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '12px 0',
      borderBottom: `1px solid ${T.border}`,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: T.text
    }
  }, "\uD83D\uDCE4 Export Backup"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: T.muted
    }
  }, "Download JSON")), /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.border,
      fontSize: 18
    }
  }, "\u203A")), /*#__PURE__*/React.createElement("div", {
    onClick: () => setModal({
      t: "🗑️ Reset?",
      m: "All data permanently deleted.",
      ac: [{
        t: "Cancel",
        a: () => setModal(null)
      }, {
        t: "Delete",
        c: 1,
        a: async () => {
          await save({
            ck: {},
            pr: [],
            sd: null,
            sc: {},
            wg: {},
            fav: {},
            name: D.name,
            dark
          });
          setDay(1);
          setMDay(1);
          setModal({
            t: "Done",
            m: "Reset! 💚"
          });
        }
      }]
    }),
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '12px 0',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: '#ef4444'
    }
  }, "\uD83D\uDDD1\uFE0F Reset"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: T.muted
    }
  }, "Delete all data")), /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.border,
      fontSize: 18
    }
  }, "\u203A"))), /*#__PURE__*/React.createElement(Card, {
    style: {
      background: dark ? 'rgba(239,68,68,0.08)' : 'linear-gradient(135deg,#fef2f2,#fee2e2)',
      border: '1px solid #fecaca'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: '#991b1b',
      marginBottom: 6
    }
  }, "\u26A0\uFE0F Medical Safety"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      lineHeight: 1.8,
      color: '#7f1d1d'
    }
  }, /*#__PURE__*/React.createElement("strong", null, "General wellness guidance only."), " Follow doctor's advice always.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\uD83D\uDEA8 ", /*#__PURE__*/React.createElement("strong", null, "Stop if:"), " Dizziness \xB7 Weakness \xB7 Chest pain \xB7 Knee worsening \xB7 Swelling", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\uD83D\uDC8A Diabetes/BP/Thyroid \u2192 Confirm with doctor.", /*#__PURE__*/React.createElement("br", null), "\uD83C\uDF4C Dizzy? Banana + dates + water. 2+ days \u2192 doctor.")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '20px 16px 40px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 40
    }
  }, "\uD83C\uDF3F"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 800,
      color: '#16a34a',
      marginTop: 4
    }
  }, D.name, " Tracker"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: T.muted
    }
  }, "Made with \uD83D\uDC9A \xB7 Data stays on your phone")));

  // ── CAREGIVER TAB ─────────────────────────────
  const CgTab = () => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Hdr, {
    bg: "linear-gradient(160deg,#1e1b4b,#3730a3,#4f46e5)"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'rgba(255,255,255,0.7)'
    }
  }, "\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67 Caregiver"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 800,
      color: '#fff'
    }
  }, "Dashboard")), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: T.text,
      marginBottom: 8
    }
  }, "\uD83D\uDCC5 Heatmap"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7,1fr)',
      gap: 4
    }
  }, Array.from({
    length: 30
  }, (_, i) => {
    const d = i + 1;
    const sc = gs(d);
    const has = Object.keys(D.ck[d] || {}).length > 0;
    return /*#__PURE__*/React.createElement("div", {
      key: d,
      style: {
        aspectRatio: '1',
        borderRadius: 5,
        background: !has ? dark ? '#1a2420' : '#f3f4f6' : sc >= 80 ? '#16a34a' : sc >= 50 ? '#fbbf24' : '#ef4444',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 9,
        fontWeight: 700,
        color: has ? '#fff' : T.muted
      }
    }, d);
  }))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: T.text,
      marginBottom: 8
    }
  }, "\u26A0\uFE0F Most Missed"), (() => {
    const mc = {};
    CK.forEach(c => {
      mc[c.k] = {
        ...c,
        m: 0
      };
    });
    for (let d = 1; d <= 30; d++) {
      const ck = D.ck[d] || {};
      if (!Object.keys(ck).length) continue;
      CK.forEach(c => {
        if (!ck[c.k]) mc[c.k].m++;
      });
    }
    const sorted = Object.values(mc).filter(i => i.m > 0).sort((a, b) => b.m - a.m).slice(0, 5);
    return sorted.length ? sorted.map(i => /*#__PURE__*/React.createElement("div", {
      key: i.k,
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '5px 0',
        fontSize: 12,
        color: T.text
      }
    }, /*#__PURE__*/React.createElement("span", null, i.i, " ", i.e), /*#__PURE__*/React.createElement("span", {
      style: {
        color: '#ef4444',
        fontWeight: 700
      }
    }, i.m, "x"))) : /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: T.muted
      }
    }, "No data yet");
  })()), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px'
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    onClick: () => setTab("today"),
    bg: "linear-gradient(135deg,#4f46e5,#3730a3)"
  }, "\u2190 Back to Today")));

  // ── GUIDE TAB (Nutri + Knowledge) ──────────────
  const tg = id => {
    hap();
    setGuideOpen(p => ({
      ...p,
      [id]: !p[id]
    }));
  };
  const GUIDE = [{
    id: "why",
    icon: "🎯",
    title: "இது ஏன் வேலை செய்யும்",
    sub: "Why This Plan Works — அறிவியல் அடிப்படை",
    content: [{
      h: "உடலின் கணக்கு — Your Body's Math",
      t: "147 cm, 71 kg — உடல் ஓய்வில் ~1,250 cal/நாள் எரிக்கும் (BMR). அன்றாட செயல்பாட்டுடன் ~1,500 cal. 1,200-1,300 cal சாப்பிட்டால் 250-300 cal குறைவு → வாரம் 0.3-0.4 kg குறையும்.\n\nAt 147 cm and 71 kg, your body burns ~1,250 cal/day just existing. With daily activity, total burn is ~1,500 cal. Eating 1,200-1,300 cal creates a safe deficit."
    }, {
      h: "குறைவாக சாப்பிடக்கூடாதா? — Why Not Less?",
      t: "1,200 cal-க்கு கீழ் போனால்: ஊட்டச்சத்து குறைபாடு, தசை இழப்பு, வளர்சிதை மாற்றம் குறையும் (உடல் எதிர்க்கும்!), பித்தப்பை கல் ஆபத்து. நாம் கொழுப்பை குறைக்கணும், பட்டினி இல்ல!\n\nBelow 1,200: nutrient deficiency, muscle loss, metabolism slows. We want fat loss, not starvation."
    }, {
      h: "எதார்த்தமான காலக்கெடு — Timeline",
      t: "மாதம் 1: 1.5-2.5 kg (நீர் + கொழுப்பு)\nமாதம் 3: 5-7 kg (உடை தளர்வாகும், மூட்டு வலி குறையும்)\nமாதம் 6: 10-13 kg (தெரியும் அளவு மாற்றம்!)\nமாதம் 12-18: ~21 kg இலக்கு\n\nமெதுவாக = நிலையானது. வேகமான டயட் எப்போதும் திரும்பி வரும்!\n\n⚠️ ஒவ்வொரு 5-10 kg குறைந்ததும் portions-ஐ மறுகணக்கிடுங்கள்! 60 kg-ல் TDEE ~1,420 cal-ஆக குறையும் — deficit சுருங்கும்.\n\nEvery 5-10 kg lost, recalculate portions. A lighter body burns fewer calories, so the deficit shrinks naturally."
    }, {
      h: "மூட்டு வலி தொடர்பு — Knee Connection",
      t: "ஒவ்வொரு 1 kg குறைப்பு = மூட்டில் 4 kg அழுத்தம் குறையும்!\n5 kg குறைந்தால் → 20 kg குறைவு ஒவ்வொரு அடியிலும்\n10 kg குறைந்தால் → 40 kg நிவாரணம்!\n\nசின்ன முன்னேற்றமும் மூட்டு வலிக்கு பெரிய நிவாரணம்!"
    }]
  }, {
    id: "macro",
    icon: "📊",
    title: "தினசரி ஊட்டச்சத்து இலக்கு",
    sub: "Daily Macro Targets — 1,300 cal பிரிவு",
    content: [{
      h: "புரதம் Protein: 75-85g (25-30%)",
      t: "எடை குறைக்கும்போது தசையை காப்பாற்றும். உடற்பயிற்சி இல்லாமல், புரதம் மட்டுமே தசை பாதுகாவலன்! 3 வேளை சாப்பாட்டில் பரப்புங்கள் (25-28g ஒவ்வொரு வேளை). உடல் ஒரு வேளைக்கு ~30g மட்டுமே பயன்படுத்தும்.\n\nSpreading protein across meals matters — body uses only ~30g per meal for muscle building."
    }, {
      h: "மாவுச்சத்து Carbs: 130-163g (40-50%)",
      t: "சிறுதானியம், பருப்பு, காய்கறி போன்ற நல்ல மூலங்களிலிருந்து சக்தி. வெள்ளை அரிசி குவியல் அல்ல! தரம் முக்கியம்.\n\nEnergy from complex sources — millets, dal, vegetables. Quality over quantity."
    }, {
      h: "கொழுப்பு Fat: 36-43g (25-30%)",
      t: "ஹார்மோன் ஆரோக்கியத்திற்கு அவசியம். பெண்களுக்கு குறைந்தபட்சம் 35g. நல்லெண்ணெய், பருப்பு, தேங்காய் — எண்ணெயில் பொரிப்பது அல்ல!\n\nEssential for hormones. Minimum 35g for women. From nallennai, nuts, coconut — not deep frying."
    }, {
      h: "நார்ச்சத்து Fiber: 25g குறைந்தபட்சம்",
      t: "வயிறு நிரம்பிய உணர்வு, இரத்த சர்க்கரை கட்டுப்பாடு, மலச்சிக்கல் தடுப்பு. சிறுதானியம், காய்கறி, சுண்டல் = நார்ச்சத்து சாம்பியன்கள்!\n\nKeeps you full, controls blood sugar, prevents constipation."
    }, {
      h: "தண்ணீர் Water: 2-2.5 லிட்டர்",
      t: "மூட்டு குருத்தெலும்பு 65-80% தண்ணீர்! நீரிழப்பு குருத்தெலும்பை உடையச் செய்யும். மோர், ரசம், இளநீர் — எல்லாம் கணக்கு!\n\nJoint cartilage is 65-80% water. Buttermilk, rasam, coconut water all count."
    }]
  }, {
    id: "protein",
    icon: "💪",
    title: "80g புரதம் எப்படி?",
    sub: "How to Hit 80g Protein — தமிழ் உணவிலேயே",
    content: [{
      h: "பிரச்சனை என்ன? — The Problem",
      t: "சாதம்-சாம்பார்-பொரியல் = ஒரு வேளைக்கு 15-20g புரதம் மட்டுமே. அது நாள் முழுக்க 45-60g — எடை குறைக்கும்போது தசையை காக்க போதாது!\n\nDefault rice-sambar-poriyal plate delivers only 15-20g per meal. Not enough to protect muscles."
    }, {
      h: "80g புரத நாள் — Sample Day",
      t: "காலை: 2 பயறு தோசை + 1 முட்டை → 21g\nஇடை நேரம்: மோர் + 5 பாதாம் → 4.5g\nமதியம்: சாதம் + புரத சாம்பார் + பொரியல் + தயிர் → 24.5g\nசிற்றுண்டி: முளைகட்டிய பயறு சுண்டல் → 12g\nஇரவு: ராகி கஞ்சி + கீரை கூட்டு → 11g\nமொத்தம்: ~73g + ஆளிவிதை/அக்ரூட் = 76g+"
    }, {
      h: "புரத மாற்றங்கள் — Key Swaps",
      t: "தோசை (3g) → பெசரட்டு (7g) = இரட்டிப்பு!\nமுறுக்கு (2g) → சுண்டல் (12g) = 6 மடங்கு!\nதேங்காய் சட்னி தவிர் → 1 வேகவைத்த முட்டை (+7g)\nசாதா சாம்பார் (6g) → கலப்பு பருப்பு சாம்பார் (10g)"
    }, {
      h: "சிறந்த புரத உணவுகள் — Best Sources",
      t: "பயறு தோசை (Chilla): 6-8g/piece (அதிகபட்சம்!)\nபெசரட்டு: 6-7.6g/piece\nகொண்டைக்கடலை சுண்டல்: 12-15g/cup\nமுளை பயறு: 10-14g/cup\nவேகவைத்த முட்டை: 6-7g (மிகவும் மலிவான complete protein)\nபருப்பு: 12-16g/cup\nதயிர்: 6-8g/cup"
    }]
  }, {
    id: "oil",
    icon: "🫗",
    title: "எண்ணெய் & சமையல் குறிப்பு",
    sub: "Oil & Cooking Hacks — தினம் 200+ cal மிச்சம்",
    content: [{
      h: "எண்ணெய் = மறைந்த கலோரி",
      t: "ஒரு தேக்கரண்டி = 120 cal! வழக்கமான சமையல்: 3-4 tbsp/நாள் = 360-480 cal எண்ணெயிலிருந்து மட்டும்.\n\nஇலக்கு: 2-3 TEASPOONS/நாள் (80-135 cal). தினமும் 200-300 cal மிச்சம்!"
    }, {
      h: "ஸ்மார்ட் தாளிப்பு — Smart Tempering",
      t: "வழக்கம்: 2-3 tsp எண்ணெய்.\nசிறந்தது: ½-1 tsp non-stick pan-ல். கடுகு இன்னும் வெடிக்கும்!\n\nஒரு தாளிப்பு = 4 பேருக்கு சாம்பார் → ஒரு serving-க்கு ¼ tsp மட்டுமே!"
    }, {
      h: "தண்ணீர் பொரியல் — Water-Sauté Method",
      t: "½ tsp எண்ணெய் தாளிப்பு → காய்கறி சேர் → 3-4 tbsp தண்ணீர் (எண்ணெய் அல்ல!) → மூடி வேகவை 5-8 நிமிடம். 1 tbsp தேங்காய் துருவல் சேர்.\n\nபொரியல்: 120 cal → 60-80 cal! பாதி கலோரி!"
    }, {
      h: "எண்ணெய் இல்லா தோசை — No-Oil Dosa",
      t: "வெங்காயம் பாதியாக வெட்டி, எண்ணெயில் தோய்த்து, non-stick தவாவில் தேய் = ⅛ tsp/தோசை!\nமூடி போட்டு மேல் பக்கம் வேகவை.\n\n150 cal → 100-110 cal!"
    }, {
      h: "சட்னி மாற்றம் — Chutney Swaps",
      t: "தேங்காய் சட்னி: 150-180 cal 😱\nதக்காளி சட்னி: 30-40 cal ✅\nபுதினா சட்னி: 15-20 cal ✅✅\n\nகுறிப்பு: 2 tbsp தேங்காய் + 1 tbsp வறுத்த கடலைப்பருப்பு = பாதி கலோரி, அதே சுவை!"
    }, {
      h: "எந்த எண்ணெய்? — Best Oil",
      t: "நல்லெண்ணெய் (Gingelly) = பாரம்பரிய தமிழ் தேர்வு, அழற்சி எதிர்ப்பு ✅\nதேங்காய் எண்ணெய் = MCT வளர்சிதை மாற்றம் சற்று உயர்த்தும் ✅\n\n🚫 தவிர்: சூரியகாந்தி/சோளம்/சோயா = அதிக omega-6 = அழற்சி அதிகரிக்கும் = மூட்டு வலிக்கு கெடுதல்!"
    }]
  }, {
    id: "millet",
    icon: "🌾",
    title: "சிறுதானிய வழிகாட்டி",
    sub: "Millet Guide — கோவை-க்கான சிறந்த மாற்றம்",
    content: [{
      h: "ஏன் சிறுதானியம்? — Why Millets Win",
      t: "வெள்ளை அரிசியை விட 2-10 மடங்கு நார்ச்சத்து. குறைந்த glycemic index (இரத்த சர்க்கரை எகிறாது). அதிக புரதம், கால்சியம், இரும்பு.\n\nகோவையில் எல்லா இடத்திலும் கிடைக்கும் — 'சிறுதானியம்' என்று கேளுங்கள்!"
    }, {
      h: "எடை குறைப்புக்கு சிறந்தது: வரகு",
      t: "309 cal/100g (மிகக் குறைவு!) + 9g நார்ச்சத்து (மிக அதிகம்!) + குறைவான கொழுப்பு.\n\nவரகு = எடை குறைப்பு சாம்பியன் 🏆"
    }, {
      h: "எலும்புக்கு சிறந்தது: ராகி (கேழ்வரகு)",
      t: "344mg கால்சியம்/100g! பாலை விட அதிகம்! மூட்டு ஆரோக்கியத்திற்கு மிக முக்கியம்.\n\nதோசை, கஞ்சி, முட்டை — எல்லாவற்றிலும் பயன்படுத்தலாம்."
    }, {
      h: "இரும்புச்சத்துக்கு: கம்பு",
      t: "16.9mg இரும்பு/100g — எல்லா தானியங்களிலும் அதிகம்! பெண்களுக்கு மிக அவசியம்.\n\nகம்பு கஞ்சி = சிறந்த இரவு உணவு."
    }, {
      h: "எளிதான மாற்றம்: சாமை",
      t: "அரிசிக்கு மிக நெருக்கமான சுவை & அமைப்பு. குடும்பத்தினர் கவனிக்கவே மாட்டார்கள்!\n\nசமைப்பது: 1:2.5 தண்ணீர் விகிதம், குக்கரில் 2 விசில்."
    }, {
      h: "அதிக புரதம்: தினை",
      t: "12.3g புரதம்/100g — எல்லா சிறுதானியங்களிலும் அதிகம்!\n\nதினை உப்புமா = சிறந்த காலை உணவு."
    }, {
      h: "எப்படி தொடங்குவது? — How to Start",
      t: "வாரம் 1: ஒரு வேளை சாதத்தை சாமை/வரகு-ஆல் மாற்று\nவாரம் 2: ராகி தோசை வாரத்தில் 2 முறை\nவாரம் 3: கம்பு கஞ்சி இரவு உணவாக\nவாரம் 4: எல்லா சிறுதானியமும் சுழற்சி\n\n⚠️ எல்லா வேளையும் சிறுதானியம் வேண்டாம் — சுழற்சி செய்யுங்கள். கூடுதல் தண்ணீர் குடியுங்கள்!\n\n🔬 சிறுதானியத்தில் phytates (anti-nutrients) உள்ளது — ஊறவைத்தல், முளைகட்டுதல், புளிக்கவைத்தல் மூலம் குறையும். Soaking 6-8 hrs before cooking = best!"
    }, {
      h: "கோவையில் எங்கே வாங்குவது?",
      t: "சாதாரண நெத்தி கடை, ஆர்கானிக் கடைகள் (RS Puram, சரவணம்பட்டி), சூப்பர்மார்க்கெட் (Nilgiris, Reliance Fresh), ஆன்லைன் (BigBasket, Amazon)."
    }]
  }, {
    id: "joint",
    icon: "🦴",
    title: "அழற்சி எதிர்ப்பு உணவுகள்",
    sub: "Anti-Inflammatory — மூட்டு வலி நிவாரணம்",
    content: [{
      h: "மஞ்சள்+மிளகு — Turmeric+Pepper",
      t: "மிகவும் நிரூபிக்கப்பட்ட கலவை! குர்குமின் அழற்சியை தடுக்கும். மிளகில் உள்ள பிப்பரின் உறிஞ்சுதலை 2000% அதிகரிக்கும்!\n\nஒரு ஆய்வு: மஞ்சள்+இஞ்சி+மிளகு = naproxen (வலி மாத்திரை) அளவு பலன் மூட்டு அழற்சிக்கு!\n\nதினமும் ½-1 tsp மஞ்சள் — எப்போதும் மிளகுடன் சேர்த்து!\nமிளகு ரசம் = சிறந்த பாரம்பரிய வழி."
    }, {
      h: "இஞ்சி — Ginger",
      t: "இஞ்சியில் உள்ள ஜிஞ்சரால்கள் = வலி மாத்திரைகள் போன்ற அழற்சி எதிர்ப்பு!\n261 நோயாளிகள் ஆய்வு: இஞ்சி சாறு மூட்டு வலியை கணிசமாக குறைத்தது.\n\nதினமும் 1-2 இஞ்ச் — இஞ்சி கசாயம், ரசம், சாம்பார், டீ-யில் சேருங்கள்."
    }, {
      h: "ஒமேகா-3 மூலங்கள் — Omega-3",
      t: "சிறந்தவை:\nமத்தி மீன் (Sardines) — 1,500-2,000mg/100g\nஅயல மீன் (Mackerel) — 1,200mg\nநெத்திலி (Anchovy) — 1,000mg + எலும்பிலிருந்து கால்சியம்!\n\nசைவம்: 1-2 tbsp ஆளிவிதை பொடி + 4-7 அக்ரூட் பருப்பு தினமும்."
    }, {
      h: "கால்சியம் திட்டம் — 1,000-1,200mg/நாள்",
      t: "50g ராகி: ~170mg\n1 tbsp எள்: ~88mg\n1 கப் தயிர்: ~150mg\nமுருங்கை சாம்பார்: ~100-200mg\n10 பாதாம்: ~75mg\nநெத்திலி/பன்னீர்: ~150-200mg\n= உணவிலிருந்து 730-880mg + மோர்/கீரை மீதி நிரப்பும்"
    }, {
      h: "வைட்டமின் D",
      t: "76-90% இந்தியர்களுக்கு குறைபாடு! உணவில் குறைவு.\n\nசிறந்தது: தினமும் 20-30 நிமிடம் வெயில் (காலை 10 - மதியம் 2) முகம் & கைகளில்.\n\nமருத்துவரிடம் 25-OH Vitamin D இரத்த பரிசோதனை கேளுங்கள்."
    }, {
      h: "🚫 தவிர்க்க வேண்டியவை — Avoid",
      t: "🚫 பொரித்தவை: பஜ்ஜி, போண்டா, வடை\n🚫 மைதா: பரோட்டா மிகப்பெரிய குற்றவாளி!\n🚫 இனிப்பு பானங்கள்\n🚫 அதிக சர்க்கரை: பாயசம், கேசரி, ஜிலேபி\n🚫 மீண்டும் பயன்படுத்திய எண்ணெய் = trans fat = மிக மோசம்!\n🚫 சூரியகாந்தி/சோள எண்ணெய் (omega-6 அதிகம்)"
    }, {
      h: "சமையலறையில் உள்ள மசாலா — Kitchen Spices",
      t: "வெந்தயம்: 1 tbsp இரவு ஊறவை, காலையில் மெல்லுங்கள் — மூட்டு வலிக்கு!\nகறிவேப்பிலை: தினமும் 5-8 இலை மெல்லுங்கள்\nஜீரகம்: ரசத்தில் — அழற்சி எதிர்ப்பு\nபெருங்காயம்: சாம்பாரில் — அழற்சி எதிர்ப்பு\n\nஎல்லாம் ஏற்கனவே உங்கள் சமையலறையில் இருக்கு! 😊"
    }]
  }, {
    id: "portion",
    icon: "🍽️",
    title: "அளவு கட்டுப்பாடு: தமிழ் தாலி",
    sub: "Portion Control — எண்ணாமல், எடை போடாமல்",
    content: [{
      h: "மாற்றிய தாலி விதி — Modified Thali Rule",
      t: "பாதி தட்டு → காய்கறி (பொரியல், கூட்டு, கீரை, சாலட்)\nகால் பகுதி → புரதம் (சாம்பார், பருப்பு, முட்டை, சுண்டல், தயிர்)\nகால் பகுதி → அரிசி/சிறுதானியம் (1 சிறிய கட்டோரி)\n\nஇந்த ஒரே காட்சி விதி தானாகவே கலோரி குறைப்பை உருவாக்கும்!"
    }, {
      h: "சமையலறை அளவு குறிப்புகள்",
      t: "சாதம்: 1 சிறிய கட்டோரி (~150ml) = ஒரு மூடிய கைப்பிடி. அரை தட்டு அல்ல!\nசாம்பார்/பருப்பு: 1-2 அகப்பை (தாராளமாக — இதில் புரதம் இருக்கு!)\nபொரியல்/காய்கறி: UNLIMITED. குவியுங்கள்!\nஎண்ணெய்: தேக்கரண்டியால் அளவிடுங்கள்.\nதட்டு: 12-inch தாலி → 10-inch தட்டு (20-30% குறைவு!)"
    }, {
      h: "வேளை வாரியாக — Meal Guide",
      t: "காலை (~300 cal): 2-3 இட்லி + சாம்பார், அல்லது 1 தோசை + சாம்பார், அல்லது 2 பயறு தோசை. முட்டை சேருங்கள்.\n\nமதியம் (~450-500 cal): 1 கட்டோரி சாதம் + 1.5 கப் சாம்பார் + ரசம் + தாராளமாக பொரியல் + தயிர்/மோர்.\n\nசிற்றுண்டி (~150 cal): 1 கப் சுண்டல், அல்லது 1 கொய்யா, அல்லது 5 பாதாம் + 3 அக்ரூட் + காபி.\n\nஇரவு (~250-300 cal): மிக லேசாக! 2 இட்லி + சாம்பார், அல்லது ராகி கஞ்சி, அல்லது சிறிய கிச்சடி."
    }, {
      h: "சாப்பிடும் வரிசை முக்கியம்!",
      t: "1️⃣ பொரியல்/சாலட் முதலில்\n2️⃣ சாம்பார் சாதம்\n3️⃣ ரசம் சாதம்\n4️⃣ கொஞ்சம் தயிர் சாதம் கடைசியில்\n\nநார்ச்சத்து+புரதத்தால் வயிறு நிரம்பும், சாதம் குறையும். இயற்கையான அளவு கட்டுப்பாடு!"
    }, {
      h: "3 வேளை vs 6 சிறிய வேளை — Research",
      t: "ஆராய்ச்சி: மொத்த cal சமம் என்றால் 3 வேளை vs 6 சிறிய வேளை — எடை குறைப்பில் வேறுபாடு இல்லை!\n\n2025 ஆய்வு: அதிக BMI உள்ளவர்களுக்கு 6 சிறிய வேளை = அதிக பசி உணர்வு!\n\n✅ சிறந்தது: 3 structured meals + 1 சிறிய snack.\nகாலை+மதியம் அதிகமாக, இரவு குறைவாக = better results.\n\nResearch says 3 meals + 1 snack is optimal. Front-loading calories (heavier breakfast & lunch, lighter dinner) shows better weight loss."
    }]
  }, {
    id: "challenges",
    icon: "🛡️",
    title: "நிஜ வாழ்க்கை தீர்வுகள்",
    sub: "Real-World Solutions — பசி, ஆசை, விழாக்கள்",
    content: [{
      h: "இரவு பசி (9-10 PM பிரச்சனை)",
      t: "வழக்கமாக பழக்கம், உண்மையான பசி அல்ல!\n\n1️⃣ வெதுவெதுப்பான மோர் + சீரகம் + உப்பு (~40-50 cal)\n2️⃣ மஞ்சள் பால் — ½ கப் பால் + மஞ்சள் + மிளகு + கருப்பட்டி (~80-100 cal). மூட்டு ஆரோக்கியம் + நல்ல தூக்கம்!\n3️⃣ ½ கப் மீதமுள்ள சுண்டல், அல்லது 2-3 பேரீச்சை (~70 cal)\n4️⃣ ஒரு கப் வெதுவெதுப்பான ரசம் (30-50 cal)"
    }, {
      h: "இனிப்பு ஆசை — Sweet Cravings",
      t: "வெள்ளை சர்க்கரைக்கு பதில் கருப்பட்டி!\nGI 35-41 (சர்க்கரை 60-80!) இரும்பு, கால்சியம் உள்ளது.\nஒரு சிறிய துண்டு வெந்நீரில் / ராகி கஞ்சியில் = ~30 cal.\n\n2 பேரீச்சை, பழுத்த வாழைப்பழம், பருவகால பழங்கள்.\n\nடீ/காபி: படிப்படியாக குறையுங்கள் — 2 tsp → 1 → ½. ஒரே நாளில் நிறுத்தாதீர்கள்!"
    }, {
      h: "குடும்பம் அதிக carb சாப்பிடும்போது",
      t: "ரகசியம்: அதே உணவு சமையுங்கள், உங்கள் தட்டு மட்டும் மாற்றுங்கள்!\n\n• சற்று சிறிய தட்டு பயன்படுத்துங்கள்\n• 1 கட்டோரி சாதம் எடுங்கள் (யாரும் கவனிக்க மாட்டார்கள்!)\n• கூடுதல் அகப்பை சாம்பார்\n• பொரியல் குவியுங்கள்\n• சாப்பிடும் முன்: வெள்ளரி+தக்காளி+வெங்காயம்+எலுமிச்சை (2 நிமிடம், சமையல் இல்ல!)"
    }, {
      h: "விழா உத்தி — Festival Strategy",
      t: "பொங்கல்: சிறிய வெண் பொங்கல் + சுண்டல் வகைகள். சர்க்கரை பொங்கல் 2-3 ஸ்பூன் மட்டும்.\n\nதீபாவளி: ஒவ்வொரு இனிப்பும் 2-3 கடி சுவையுங்கள் — விருந்து அல்ல.\n\nகோவில் பிரசாதம்: ஒரு ஸ்பூன் சரி.\n\nகல்யாண சாப்பாடு: குறைவான சாதம், அதிக கூட்டு+பொரியல்+ரசம். யாரும் உங்கள் சாதத்தை கவனிக்க மாட்டார்கள்!"
    }, {
      h: "மலச்சிக்கல் — Constipation (பொதுவானது!)",
      t: "• காலை: காபிக்கு முன் 1-2 டம்ளர் வெந்நீர்\n• 1 tsp வெந்தயம் இரவு ஊறவை, காலையில் அந்த தண்ணீர் குடியுங்கள்\n• தினமும் பப்பாளி (கோவையில் ஆண்டு முழுவதும்!)\n• சாம்பாரில் தாராளமாக முருங்கை\n• தேவைப்பட்டால்: 1 tsp இஸப்கோல் வெந்நீரில் + கூடுதல் தண்ணீர்\n• நல்லெண்ணெய் இயற்கையாக செரிமானத்தை எளிதாக்கும்"
    }]
  }, {
    id: "rollout",
    icon: "📅",
    title: "8-வார படிப்படி திட்டம்",
    sub: "8-Week Rollout — ஒரு நேரத்தில் ஒரு மாற்றம்",
    content: [{
      h: "வாரம் 1-2: சாதம் குறைப்பு மட்டும்",
      t: "ஒவ்வொரு வேளையும் 1 சிறிய கட்டோரி சாதம். மற்றது அப்படியே!\n\nஇந்த ஒரே மாற்றம் தினமும் 200-400 cal குறைக்கும் — தென்னிந்திய உணவில் மிக முக்கிய முதல் படி!"
    }, {
      h: "வாரம் 3-4: புரதம் சேருங்கள்",
      t: "கூடுதல் அகப்பை சாம்பார், தினமும் 1 வேகவைத்த முட்டை, மாலை முறுக்கு/பஜ்ஜி-க்கு பதில் சுண்டல்."
    }, {
      h: "வாரம் 5-6: எண்ணெய் + சிறுதானியம்",
      t: "எண்ணெயை தேக்கரண்டியால் அளவிடுங்கள். ஒரு வேளை சாதத்தை சாமை/வரகு-ஆல் மாற்றுங்கள். வாரத்தில் 2 முறை ராகி தோசை முயற்சியுங்கள்."
    }, {
      h: "வாரம் 7-8: நுணுக்க மாற்றம்",
      t: "இரவு உணவை மிக லேசாக மாற்றுங்கள் (இட்லி+சாம்பார் அல்லது ராகி கஞ்சி). டீ/காபியில் சர்க்கரை ½ ஸ்பூன். தேங்காய் சட்னிக்கு பதில் தக்காளி/புதினா சட்னி."
    }, {
      h: "ஏன் படிப்படி? — Why Gradual",
      t: "ஒவ்வொரு மாற்றமும் நிரந்தர பழக்கமாகும், அடுத்தது வருமுன்.\n\nதிடீர் உணவுமுறை மாற்றம் எப்போதும் தோல்வி — மனமும் உடலும் எதிர்க்கும்.\n\nமெதுவான மாற்றம் = வாழ்நாள் மாற்றம்! 💪"
    }]
  }, {
    id: "track",
    icon: "📏",
    title: "எளிய கண்காணிப்பு",
    sub: "Tracking — நோட்புக் + அளவு நாடா",
    content: [{
      h: "வாராந்திர எடை பதிவு",
      t: "ஒவ்வொரு வாரமும் ஒரே நாள் (திங்கள்). காலையில் முதலில், கழிவறை பயன்பாட்டுக்குப் பிறகு, சாப்பிடும் முன், அதே நைட் டிரஸ்ஸில்.\n\nநோட்புக்கில் எழுதுங்கள்: தேதி + எடை. வாரம் ஒரு வரி.\n\n⚠️ தினமும் எடை போடாதீர்கள்! 0.5-1 kg ஏற்ற இறக்கம் இயல்பு. தினசரி எடை = தேவையற்ற விரக்தி."
    }, {
      h: "மாதாந்திர இடுப்பு அளவு",
      t: "தையல் டேப் (₹20-30). நேராக நிற்கவும், சாதாரணமாக மூச்சு விடவும் (வயிற்றை உள்ளே இழுக்காதீர்கள்!), தொப்புள் அளவில் டேப் நிலத்திற்கு சமாந்தரமாக.\n\nமாதம் 1-ம் தேதி பதிவு செய்யுங்கள்.\n\nஇடுப்பு அளவு எடையை விட சிறந்த ஆரோக்கிய குறிகாட்டி!\n• 80 cm மேல் = ஆபத்து அதிகரிப்பு\n• 88 cm மேல் = உயர் ஆபத்து\n\nஎடை நின்றாலும் இடுப்பு குறையலாம் = உண்மையான கொழுப்பு இழப்பு!"
    }, {
      h: "🎉 எடை இல்லா வெற்றிகள்",
      t: "• சேலை ப்ளவுஸ் தளர்வாக உணர்தல்\n• சமையலறையில் மூட்டு வலி இல்லாமல் நீண்ட நேரம் நிற்பது\n• மதியம் தூக்கம் குறைவு ('சாதம் கோமா' இல்ல!)\n• படி ஏறுவது எளிதாதல்\n• நல்ல தூக்கம்\n• குடும்பத்தினர் 'முகம் ஒல்லியாகிருக்கு' என்பது\n\nஒவ்வொன்றையும் கொண்டாடுங்கள்! 🥳"
    }]
  }];
  const GuideTab = () => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Hdr, {
    bg: "linear-gradient(160deg,#0f4c3a,#047857,#059669)"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'rgba(255,255,255,0.7)'
    }
  }, "\uD83D\uDCDA ", D.name, "-\u0B87\u0BA9\u0BCD \u0BB5\u0BB4\u0BBF\u0B95\u0BBE\u0B9F\u0BCD\u0B9F\u0BBF"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 800,
      color: '#fff'
    }
  }, "\u0B85\u0BB1\u0BBF\u0BB5\u0BC1\u0B95\u0BCD \u0B95\u0BB3\u0B9E\u0BCD\u0B9A\u0BBF\u0BAF\u0BAE\u0BCD"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'rgba(255,255,255,0.6)',
      marginTop: 3
    }
  }, "Knowledge Hub \u2014 \u0BA8\u0BC0\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0BA4\u0BC6\u0BB0\u0BBF\u0BA8\u0BCD\u0BA4\u0BC1\u0B95\u0BCA\u0BB3\u0BCD\u0BB3 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BBF\u0BAF \u0B85\u0BA9\u0BC8\u0BA4\u0BCD\u0BA4\u0BC1\u0BAE\u0BCD")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      padding: '10px 16px'
    }
  }, [{
    id: "learn",
    l: "📖 கற்றுக்கொள்",
    sub: "Learn"
  }, {
    id: "food",
    l: "🥗 உணவு DB",
    sub: "Food Database"
  }].map(v => /*#__PURE__*/React.createElement("button", {
    key: v.id,
    onClick: () => setGuideView(v.id),
    style: {
      flex: 1,
      padding: '10px 8px',
      borderRadius: 14,
      border: guideView === v.id ? '2px solid #059669' : `1.5px solid ${T.border}`,
      background: guideView === v.id ? dark ? 'rgba(5,150,105,0.15)' : '#ecfdf5' : T.card,
      cursor: 'pointer',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: guideView === v.id ? '#059669' : T.text
    }
  }, v.l), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: T.muted
    }
  }, v.sub)))), guideView === "learn" ? /*#__PURE__*/React.createElement(React.Fragment, null, GUIDE.map(section => /*#__PURE__*/React.createElement(Card, {
    key: section.id,
    style: {
      cursor: 'pointer'
    },
    onClick: () => tg(section.id)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 14,
      background: dark ? 'rgba(5,150,105,0.12)' : 'linear-gradient(135deg,#ecfdf5,#d1fae5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 22,
      flexShrink: 0
    }
  }, section.icon), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: T.text
    }
  }, section.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: T.muted
    }
  }, section.sub)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      color: T.muted,
      transform: guideOpen[section.id] ? 'rotate(90deg)' : 'rotate(0)',
      transition: 'transform 0.2s'
    }
  }, "\u203A")), guideOpen[section.id] && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      borderTop: `1px solid ${T.border}`,
      paddingTop: 12
    }
  }, section.content.map((item, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    style: {
      marginBottom: idx < section.content.length - 1 ? 14 : 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: dark ? '#4ade80' : '#166534',
      marginBottom: 4
    }
  }, item.h), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      lineHeight: 1.8,
      color: T.sub,
      whiteSpace: 'pre-wrap'
    }
  }, item.t)))))), /*#__PURE__*/React.createElement(Card, {
    style: {
      background: dark ? 'rgba(34,197,94,0.06)' : 'linear-gradient(135deg,#f0fdf4,#dcfce7)',
      border: '1px solid #86efac'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: dark ? '#4ade80' : '#166534',
      marginBottom: 8
    }
  }, "\u26A1 \u0BB5\u0BBF\u0BB0\u0BC8\u0BB5\u0BC1 \u0B95\u0BC1\u0BB1\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1 \u2014 Quick Reference"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      lineHeight: 2.1,
      color: dark ? '#4ade80' : '#15803d'
    }
  }, "\uD83C\uDF5A \u0B9A\u0BBE\u0BA4\u0BAE\u0BCD: 1 \u0B9A\u0BBF\u0BB1\u0BBF\u0BAF \u0B95\u0B9F\u0BCD\u0B9F\u0BCB\u0BB0\u0BBF / \u0BB5\u0BC7\u0BB3\u0BC8 MAX", /*#__PURE__*/React.createElement("br", null), "\uD83E\uDED7 \u0B8E\u0BA3\u0BCD\u0BA3\u0BC6\u0BAF\u0BCD: 2-3 tsp/\u0BA8\u0BBE\u0BB3\u0BCD (\u0B85\u0BB3\u0BB5\u0BBF\u0B9F\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD!)", /*#__PURE__*/React.createElement("br", null), "\uD83D\uDCAA \u0BAA\u0BC1\u0BB0\u0BA4\u0BAE\u0BCD: 25-28g / \u0BB5\u0BC7\u0BB3\u0BC8", /*#__PURE__*/React.createElement("br", null), "\uD83D\uDCA7 \u0BA4\u0BA3\u0BCD\u0BA3\u0BC0\u0BB0\u0BCD: 8-10 \u0B9F\u0BAE\u0BCD\u0BB3\u0BB0\u0BCD", /*#__PURE__*/React.createElement("br", null), "\uD83D\uDFE1 \u0BAE\u0B9E\u0BCD\u0B9A\u0BB3\u0BCD+\u0BAE\u0BBF\u0BB3\u0B95\u0BC1: \u0BA4\u0BBF\u0BA9\u0BAE\u0BC1\u0BAE\u0BCD", /*#__PURE__*/React.createElement("br", null), "\uD83C\uDF3E \u0B9A\u0BBF\u0BB1\u0BC1\u0BA4\u0BBE\u0BA9\u0BBF\u0BAF\u0BAE\u0BCD: 1 \u0BB5\u0BC7\u0BB3\u0BC8 \u0B85\u0BB0\u0BBF\u0B9A\u0BBF \u0BAE\u0BBE\u0BB1\u0BCD\u0BB1\u0BC1", /*#__PURE__*/React.createElement("br", null), "\uD83E\uDD6C \u0B95\u0BBE\u0BAF\u0BCD\u0B95\u0BB1\u0BBF: UNLIMITED, \u0BAE\u0BC1\u0BA4\u0BB2\u0BBF\u0BB2\u0BCD \u0B9A\u0BBE\u0BAA\u0BCD\u0BAA\u0BBF\u0B9F\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD", /*#__PURE__*/React.createElement("br", null), "\uD83C\uDF7D\uFE0F \u0B87\u0BB0\u0BB5\u0BC1 \u0B89\u0BA3\u0BB5\u0BC1: \u0BAE\u0BBF\u0B95 \u0BB2\u0BC7\u0B9A\u0BBE\u0B95", /*#__PURE__*/React.createElement("br", null), "\u2696\uFE0F \u0B8E\u0B9F\u0BC8: \u0BB5\u0BBE\u0BB0\u0BAE\u0BCD \u0B92\u0BB0\u0BC1 \u0BAE\u0BC1\u0BB1\u0BC8, \u0B92\u0BB0\u0BC7 \u0BA8\u0BBF\u0BAA\u0BA8\u0BCD\u0BA4\u0BA9\u0BC8", /*#__PURE__*/React.createElement("br", null), "\uD83E\uDDB5 1 kg \u0B95\u0BC1\u0BB1\u0BC8\u0BAA\u0BCD\u0BAA\u0BC1 = \u0BAE\u0BC2\u0B9F\u0BCD\u0B9F\u0BBF\u0BB2\u0BCD 4 kg \u0BA8\u0BBF\u0BB5\u0BBE\u0BB0\u0BA3\u0BAE\u0BCD"))) :
  /*#__PURE__*/
  /* Food Database (existing Nutri content) */
  React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "\uD83D\uDD0D Search... (idli, \u0BB0\u0BBE\u0B95\u0BBF, sambar...)",
    value: nutSearch,
    onChange: e => setNutSearch(e.target.value),
    style: {
      width: '100%',
      padding: '10px 16px',
      borderRadius: 20,
      border: `1.5px solid ${T.inputBd}`,
      fontSize: 14,
      outline: 'none',
      boxSizing: 'border-box',
      WebkitAppearance: 'none',
      background: T.inputBg,
      color: T.text
    }
  })), !nutSearch && /*#__PURE__*/React.createElement("div", {
    className: "a-ns",
    style: {
      display: 'flex',
      gap: 6,
      padding: '10px 16px',
      overflowX: 'auto'
    }
  }, TAMILFOODS.map((cat, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => setNutCat(i),
    style: {
      padding: '6px 14px',
      borderRadius: 20,
      border: nutCat === i ? '2px solid #059669' : `1.5px solid ${T.border}`,
      background: nutCat === i ? '#059669' : T.card,
      color: nutCat === i ? '#fff' : T.sub,
      fontSize: 13,
      fontWeight: 600,
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      flexShrink: 0
    }
  }, cat.cat))), (nutSearch ? TAMILFOODS.map(cat => ({
    ...cat,
    items: cat.items.filter(item => !nutSearch || item.ta.includes(nutSearch) || item.en.toLowerCase().includes(nutSearch.toLowerCase()))
  })).filter(cat => cat.items.length > 0) : [TAMILFOODS[nutCat]]).map((cat, ci) => /*#__PURE__*/React.createElement("div", {
    key: ci
  }, nutSearch && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 16px 4px',
      fontSize: 13,
      fontWeight: 700,
      color: T.text
    }
  }, cat.cat), cat.items.map((item, idx) => /*#__PURE__*/React.createElement(Card, {
    key: idx,
    style: {
      margin: '6px 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'start',
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: T.text
    }
  }, item.ta), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: T.muted
    }
  }, item.en)), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 800,
      color: '#ef4444'
    }
  }, item.cal), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: T.muted
    }
  }, "kcal"))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: T.muted,
      marginBottom: 8
    }
  }, "\uD83D\uDCCF Serving: ", item.srv), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
      gap: 6,
      marginBottom: 8
    }
  }, [{
    l: "Protein",
    v: item.prot,
    c: "#16a34a",
    bg: "rgba(34,197,94,0.08)"
  }, {
    l: "Carbs",
    v: item.carb,
    c: "#3b82f6",
    bg: "rgba(59,130,246,0.08)"
  }, {
    l: "Fat",
    v: item.fat,
    c: "#d97706",
    bg: "rgba(245,158,11,0.08)"
  }, {
    l: "Fiber",
    v: item.fib,
    c: "#7c3aed",
    bg: "rgba(124,58,237,0.08)"
  }].map((n, ni) => /*#__PURE__*/React.createElement("div", {
    key: ni,
    style: {
      background: dark ? n.bg : n.bg,
      borderRadius: 8,
      padding: '6px 2px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 800,
      color: n.c
    }
  }, n.v, "g"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: n.c,
      fontWeight: 600
    }
  }, n.l)))), item.gi && item.gi !== "-" && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      padding: '2px 8px',
      borderRadius: 10,
      background: item.gi === "Low" ? dark ? 'rgba(34,197,94,0.1)' : '#f0fdf4' : item.gi === "Medium" ? dark ? 'rgba(245,158,11,0.1)' : '#fffbeb' : dark ? 'rgba(239,68,68,0.1)' : '#fef2f2',
      color: item.gi === "Low" ? '#16a34a' : item.gi === "Medium" ? '#d97706' : '#ef4444',
      fontWeight: 700,
      marginRight: 6
    }
  }, "GI: ", item.gi), item.note && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: dark ? '#81c784' : '#15803d',
      marginTop: 6,
      lineHeight: 1.5,
      background: dark ? 'rgba(34,197,94,0.05)' : '#f0fdf4',
      borderRadius: 8,
      padding: '6px 10px'
    }
  }, "\uD83D\uDCA1 ", item.note))))), /*#__PURE__*/React.createElement(Card, {
    style: {
      margin: '16px 16px 6px',
      background: dark ? 'rgba(59,130,246,0.06)' : 'linear-gradient(135deg,#eff6ff,#dbeafe)',
      border: '1px solid #93c5fd'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: dark ? '#93c5fd' : '#1e40af',
      marginBottom: 8
    }
  }, "\uD83D\uDCCB Daily Targets"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      lineHeight: 2,
      color: dark ? '#93c5fd' : '#1e3a5f'
    }
  }, "\uD83D\uDD25 Calories: 1,000-1,200 kcal \xB7 \uD83D\uDCAA Protein: 45-55g \xB7 \uD83C\uDF5A Carbs: 130-160g \xB7 \uD83E\uDED7 Fat: 20-30g \xB7 \uD83C\uDF3E Fiber: 20-25g \xB7 \uD83D\uDCA7 Water: 8-10 glasses"))));

  // ── TABS & RENDER ─────────────────────────────
  const tabs = [{
    id: "today",
    i: "✅",
    l: "Today"
  }, {
    id: "meals",
    i: "🍲",
    l: "Meals"
  }, {
    id: "guide",
    i: "📚",
    l: "Guide"
  }, {
    id: "progress",
    i: "📈",
    l: "Track"
  }, {
    id: "shop",
    i: "🛒",
    l: "Shop"
  }, {
    id: "settings",
    i: "⚙️",
    l: "More"
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif',
      maxWidth: 480,
      margin: '0 auto',
      background: T.bg,
      minHeight: '100dvh',
      paddingBottom: 72,
      color: T.text,
      WebkitTapHighlightColor: 'transparent',
      lineHeight: 1.5,
      transition: 'background 0.3s'
    }
  }, confetti && /*#__PURE__*/React.createElement(Confetti, null), tab === "today" && Today(), tab === "meals" && MealsTab(), tab === "progress" && ProgressTab(), tab === "shop" && ShopTab(), tab === "settings" && SettingsTab(), tab === "cg" && CgTab(), tab === "guide" && GuideTab(), recipe && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.5)',
      backdropFilter: 'blur(6px)',
      WebkitBackdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      zIndex: 300
    },
    onClick: () => setRecipe(null)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: T.card,
      borderRadius: '24px 24px 0 0',
      padding: 24,
      maxWidth: 480,
      width: '100%',
      maxHeight: '85dvh',
      overflowY: 'auto',
      animation: 'aFadeUp 0.3s ease'
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 4,
      borderRadius: 2,
      background: T.border,
      margin: '0 auto 16px'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 800,
      color: T.text,
      marginBottom: 4
    }
  }, "\uD83D\uDCD6 ", recipe.meal), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 700,
      color: T.text
    }
  }, recipe.ta), recipe.en !== recipe.ta && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: T.muted
    }
  }, recipe.en), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: T.muted,
      marginTop: 4
    }
  }, recipe.port, " ", recipe.cal && `· ${typeof recipe.cal === 'number' ? recipe.cal : recipe.cal} kcal`), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      flexWrap: 'wrap',
      marginTop: 10,
      marginBottom: 14
    }
  }, recipe.prep != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      padding: '4px 10px',
      borderRadius: 20,
      background: dark ? 'rgba(59,130,246,0.1)' : '#eff6ff',
      color: '#2563eb',
      fontWeight: 600
    }
  }, "\u23F1\uFE0F Prep: ", recipe.prep >= 60 ? `${Math.floor(recipe.prep / 60)}hr` : `${recipe.prep} min`), recipe.cook != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      padding: '4px 10px',
      borderRadius: 20,
      background: dark ? 'rgba(245,158,11,0.1)' : '#fffbeb',
      color: '#d97706',
      fontWeight: 600
    }
  }, "\uD83C\uDF73 Cook: ", recipe.cook, " min"), recipe.diff && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      padding: '4px 10px',
      borderRadius: 20,
      background: dark ? 'rgba(34,197,94,0.1)' : '#f0fdf4',
      color: '#16a34a',
      fontWeight: 600
    }
  }, "\uD83D\uDCCA ", recipe.diff)), recipe.htip && /*#__PURE__*/React.createElement("div", {
    style: {
      background: dark ? 'rgba(34,197,94,0.08)' : 'linear-gradient(135deg,#f0fdf4,#ecfdf5)',
      borderRadius: 12,
      padding: '10px 14px',
      marginBottom: 14,
      border: dark ? '1px solid #22543d' : '1px solid #bbf7d0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: dark ? '#4ade80' : '#15803d',
      lineHeight: 1.6
    }
  }, "\uD83D\uDCA1 ", recipe.htip)), recipe.ing && recipe.ing.length > 0 && recipe.ing[0] !== "Same" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: T.text,
      marginBottom: 8,
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, "\uD83E\uDDFE \u0BAA\u0BCA\u0BB0\u0BC1\u0B9F\u0BCD\u0B95\u0BB3\u0BCD / Ingredients ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 500,
      color: T.muted
    }
  }, "(", recipe.ing.length, " items)")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: dark ? 'rgba(255,255,255,0.03)' : '#fafafa',
      borderRadius: 12,
      padding: '8px 12px',
      marginBottom: 14
    }
  }, recipe.ing.map((ig, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      fontSize: 15,
      color: T.sub,
      padding: '5px 0',
      borderBottom: i < recipe.ing.length - 1 ? `1px solid ${T.border}` : 'none',
      lineHeight: 1.5
    }
  }, "\u2022 ", ig)))), recipe.steps && recipe.steps.length > 0 && recipe.steps[0] !== "Same" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: T.text,
      marginBottom: 8
    }
  }, "\uD83D\uDC69\u200D\uD83C\uDF73 \u0B9A\u0BC6\u0BAF\u0BCD\u0BAE\u0BC1\u0BB1\u0BC8 / Steps"), recipe.steps.map((st, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 10,
      padding: '8px 0',
      borderBottom: i < recipe.steps.length - 1 ? `1px solid ${dark ? 'rgba(255,255,255,0.04)' : '#f3f4f6'}` : 'none'
    }
  }, !st.startsWith('💡') ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 26,
      height: 26,
      minWidth: 26,
      borderRadius: 13,
      background: 'linear-gradient(135deg,#22c55e,#15803d)',
      color: '#fff',
      fontSize: 12,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      fontWeight: 700,
      marginTop: 2
    }
  }, i + 1) : /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      marginTop: 1
    }
  }, "\uD83D\uDCA1"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      color: st.startsWith('💡') ? dark ? '#4ade80' : '#15803d' : T.sub,
      lineHeight: 1.7,
      fontWeight: st.startsWith('💡') ? 600 : 400,
      fontStyle: st.startsWith('💡') ? 'italic' : 'normal'
    }
  }, st.startsWith('💡') ? st.slice(2) : st)))), /*#__PURE__*/React.createElement(Btn, {
    onClick: () => setRecipe(null),
    style: {
      marginTop: 16
    }
  }, "Close"))), quiz && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.5)',
      backdropFilter: 'blur(6px)',
      WebkitBackdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 300,
      padding: 20
    },
    onClick: () => {
      setQuiz(null);
      setQuizA(null);
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: T.card,
      borderRadius: 22,
      padding: 24,
      maxWidth: 340,
      width: '100%',
      animation: 'aFadeUp 0.3s ease'
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 800,
      color: T.text,
      textAlign: 'center',
      marginBottom: 16
    }
  }, "\uD83E\uDDE0 Nutrition Quiz"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: T.text,
      marginBottom: 14,
      lineHeight: 1.5
    }
  }, quiz.q), quiz.o.map((o, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => setQuizA(i),
    style: {
      width: '100%',
      padding: '12px 14px',
      marginBottom: 6,
      borderRadius: 12,
      border: quizA === null ? `1.5px solid ${T.border}` : i === quiz.a ? '2px solid #22c55e' : quizA === i ? '2px solid #ef4444' : `1px solid ${T.border}`,
      background: quizA === null ? T.card : i === quiz.a ? '#f0fdf4' : quizA === i ? '#fef2f2' : T.card,
      fontSize: 14,
      fontWeight: quizA !== null && i === quiz.a ? 700 : 400,
      color: T.text,
      textAlign: 'left',
      cursor: quizA === null ? 'pointer' : 'default'
    }
  }, o)), quizA !== null && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      padding: 12,
      borderRadius: 12,
      background: dark ? 'rgba(34,197,94,0.08)' : '#f0fdf4',
      border: '1px solid #bbf7d0',
      fontSize: 12,
      lineHeight: 1.5,
      color: dark ? '#4ade80' : '#166534'
    }
  }, quiz.f), /*#__PURE__*/React.createElement(Btn, {
    onClick: () => {
      setQuiz(null);
      setQuizA(null);
    },
    style: {
      marginTop: 12
    }
  }, quizA === null ? "Skip" : "Got it! 👍"))), modal && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.4)',
      backdropFilter: 'blur(4px)',
      WebkitBackdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 300,
      padding: 24
    },
    onClick: () => !modal.ac && setModal(null)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: T.card,
      borderRadius: 22,
      padding: 28,
      maxWidth: 320,
      width: '100%',
      textAlign: 'center',
      animation: 'aFadeUp 0.2s ease',
      boxShadow: '0 25px 50px rgba(0,0,0,0.15)'
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 800,
      color: T.text,
      marginBottom: 8
    }
  }, modal.t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: T.sub,
      lineHeight: 1.6,
      marginBottom: 18,
      whiteSpace: 'pre-wrap'
    }
  }, modal.m), modal.ac ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, modal.ac.map((a, i) => /*#__PURE__*/React.createElement(Btn, {
    key: i,
    onClick: a.a,
    bg: a.c ? 'linear-gradient(135deg,#ef4444,#dc2626)' : 'linear-gradient(135deg,#22c55e,#15803d)',
    style: {
      flex: 1,
      fontSize: 14
    }
  }, a.t))) : /*#__PURE__*/React.createElement(Btn, {
    onClick: () => setModal(null)
  }, "OK \uD83D\uDC4D"))), /*#__PURE__*/React.createElement("nav", {
    style: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: dark ? 'rgba(15,20,16,0.92)' : 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderTop: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
      display: 'flex',
      justifyContent: 'center',
      zIndex: 200,
      paddingBottom: 'env(safe-area-inset-bottom,0px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      maxWidth: 480,
      width: '100%'
    }
  }, tabs.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    onClick: () => {
      hap();
      setTab(t.id);
    },
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '8px 2px 6px',
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      color: tab === t.id ? '#16a34a' : T.muted,
      fontSize: 10,
      fontWeight: tab === t.id ? 700 : 500,
      gap: 1,
      minHeight: 56,
      transition: 'color 0.15s',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 22,
      lineHeight: 1,
      transition: 'transform 0.2s',
      transform: tab === t.id ? 'scale(1.15) translateY(-2px)' : 'scale(1)'
    }
  }, t.i), /*#__PURE__*/React.createElement("span", null, t.l), tab === t.id && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: '25%',
      right: '25%',
      height: 2.5,
      borderRadius: 2,
      background: '#16a34a'
    }
  }))))));
}
