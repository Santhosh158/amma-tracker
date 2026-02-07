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
    en: "Idli Sambar Egg",
    time: "7:30",
    port: "2 இட்லி, 1 cup சாம்பார், 1 முட்டை",
    cal: 310,
    prot: 14,
    carb: 42,
    fat: 8,
    fib: 4,
    sw: ["தோசை 2+சாம்பார்+முட்டை", "இட்லி 2+flax சட்னி"],
    ing: ["இட்லி மாவு", "துவரம்பருப்பு", "பாசிப்பருப்பு", "தக்காளி", "வெங்காயம்", "முட்டை"],
    steps: ["இட்லி steam 12 min", "சாம்பார்: பருப்பு வேகவை, காய்கறி+மசாலா சேர்", "முட்டை boil 8 min"]
  },
  l: {
    ta: "சாம்பார் சாதம்+பீன்ஸ் பொரியல்",
    en: "Sambar Rice Beans",
    time: "12:30",
    port: "¾ cup சாதம், 1.5 cup சாம்பார், 1 cup பொரியல்",
    cal: 380,
    prot: 12,
    carb: 58,
    fat: 7,
    fib: 6,
    sw: ["சாம்பார்+கேரட் பொரியல்", "ரசம் சாதம்+பீன்ஸ்"],
    ing: ["அரிசி", "துவரம்பருப்பு", "பீன்ஸ்", "தேங்காய் துருவல்"],
    steps: ["சாதம் வடி", "சாம்பார் ready", "பீன்ஸ்: 1 tsp oil, கடுகு+உளுந்து, பீன்ஸ் வதக்கு, தேங்காய் சேர்"]
  },
  s: {
    ta: "முளை பாசிப்பயிறு சுண்டல்",
    en: "Sprouted Sundal",
    time: "4:30",
    port: "¾ cup சுண்டல்",
    cal: 150,
    prot: 9,
    carb: 20,
    fat: 2,
    fib: 5,
    sw: ["கொண்டைக்கடலை சுண்டல்", "மோர்+5 பாதாம்"],
    ing: ["பாசிப்பயிறு", "கடுகு", "கறிவேப்பிலை", "எலுமிச்சை"],
    steps: ["பாசிப்பயிறு 8hr ஊறவை, 1 நாள் முளை", "வேகவை 10 min", "தாளி: கடுகு+கறிவேப்பிலை, எலுமிச்சை பிழி"]
  },
  n: {
    ta: "இட்லி+சாம்பார் Light",
    en: "Idli Sambar Light",
    time: "7:30",
    port: "2 இட்லி, 1 cup சாம்பார்",
    cal: 250,
    prot: 8,
    carb: 40,
    fat: 4,
    fib: 3,
    sw: ["தயிர் சாதம் ½ cup", "காய்கறி சூப்"],
    ing: ["இட்லி மாவு", "சாம்பார்"],
    steps: ["காலை சாம்பார் மீதி use", "இட்லி steam"]
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
    en: "Oats Upma",
    time: "7:30",
    port: "1 cup உப்மா, 1 glass மோர்",
    cal: "~280",
    prot: "10g",
    sw: ["ரவா உப்மா+மோர்", "பொங்கல் ¾ cup"],
    ing: ["ஓட்ஸ்", "வெங்காயம்", "கேரட்", "பீன்ஸ்", "இஞ்சி"],
    steps: ["Oats 2 min dry roast", "1 tsp oil: கடுகு+உளுந்து+காய்கறி", "Oats+water சேர், 3 min"]
  },
  l: {
    ta: "சாதம்+பருப்பு+முட்டைகோஸ்",
    en: "Rice Dal Cabbage",
    time: "12:30",
    port: "¾ cup சாதம், ¾ cup பருப்பு, 1 cup பொரியல்",
    cal: "~370",
    prot: "13g",
    sw: ["சாதம்+பருப்பு+பீன்ஸ்", "சாதம்+பருப்பு+வெண்டைக்காய்"],
    ing: ["அரிசி", "துவரம்பருப்பு", "முட்டைகோஸ்", "தேங்காய்"],
    steps: ["பருப்பு: மஞ்சள்+பூண்டு, pressure cook", "முட்டைகோஸ் பொரியல் 1 tsp oil"]
  },
  s: {
    ta: "மோர்+5 பாதாம்",
    en: "Buttermilk Almonds",
    time: "4:30",
    port: "1 glass, 5 பாதாம்",
    cal: "~120",
    prot: "6g",
    sw: ["கொய்யா+3 வால்நட்", "Green tea+2 பேரிச்சை"],
    ing: ["தயிர்", "பாதாம்"],
    steps: ["தயிர்+water+உப்பு+சீரகம் blend", "5 பாதாம் side"]
  },
  n: {
    ta: "தயிர் சாதம்",
    en: "Curd Rice",
    time: "7:30",
    port: "½ cup சாதம், ½ cup தயிர்",
    cal: "~200",
    prot: "7g",
    sw: ["ரசம் சாதம்", "இட்லி 2+சாம்பார்"],
    ing: ["சாதம்", "தயிர்", "கேரட் துருவல்", "ஊறுகாய்"],
    steps: ["சாதம்+தயிர் mix", "கேரட் துருவல்+ஊறுகாய் top"]
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
    en: "Idli Sambar Egg",
    time: "7:30",
    port: "2 இட்லி, 1 cup சாம்பார், 1 முட்டை",
    cal: "~310",
    prot: "14g",
    sw: ["தோசை 2+முட்டை", "இட்லி 2+flax சட்னி"],
    ing: ["இட்லி மாவு", "சாம்பார்", "முட்டை"],
    steps: ["Same as Day 1"]
  },
  l: {
    ta: "முருங்கை சாம்பார்+பீட்ரூட்",
    en: "Drumstick Sambar Beet",
    time: "12:30",
    port: "¾ cup சாதம், 1 cup சாம்பார், 1 cup பொரியல்",
    cal: "~360",
    prot: "11g",
    sw: ["முருங்கை+கேரட்", "கத்தரிக்காய் சாம்பார்"],
    ing: ["முருங்கை", "பீட்ரூட்", "துவரம்பருப்பு", "புளி"],
    steps: ["முருங்கை cut, சாம்பார் cook", "பீட்ரூட் poriyal: grate+1 tsp oil"]
  },
  s: {
    ta: "கொய்யா+3 வால்நட்",
    en: "Guava Walnuts",
    time: "4:30",
    port: "1 கொய்யா, 3 வால்நட்",
    cal: "~130",
    prot: "4g",
    sw: ["ஆப்பிள்+5 பாதாம்", "பப்பாளி+flax"],
    ing: ["கொய்யா", "வால்நட்"],
    steps: ["Wash, slice, eat! 😊"]
  },
  n: {
    ta: "காய்கறி சூப்+சப்பாத்தி",
    en: "Veg Soup Chapati",
    time: "7:30",
    port: "1.5 cup சூப், 1 சப்பாத்தி",
    cal: "~220",
    prot: "7g",
    sw: ["இட்லி 2+சாம்பார்", "ரசம் சாதம்"],
    ing: ["கேரட்", "பீன்ஸ்", "முட்டைகோஸ்", "மிளகு", "மஞ்சள்", "கோதுமை மாவு"],
    steps: ["காய்கறி boil 15 min, பாதி blend", "மிளகு+மஞ்சள்+உப்பு", "சப்பாத்தி: மாவு+water, roll, dry roast"]
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
    en: "Ragi Dosa",
    time: "7:30",
    port: "2 ராகி தோசை, 2 tbsp சட்னி",
    cal: "~270",
    prot: "8g",
    sw: ["ராகி இட்லி 3", "தோசை 2+சட்னி"],
    ing: ["ராகி மாவு", "அரிசி மாவு", "தக்காளி", "வெங்காயம்"],
    steps: ["3:1 ராகி:அரிசி மாவு mix, 30 min rest", "தோசை ஊற்று, 1 tsp oil"]
  },
  l: {
    ta: "மோர் குழம்பு+முருங்கை",
    en: "Mor Kuzhambu",
    time: "12:30",
    port: "¾ cup சாதம், 1 cup குழம்பு, 1 cup பொரியல்",
    cal: "~350",
    prot: "10g",
    sw: ["மோர் குழம்பு+பீன்ஸ்", "வெண்டைக்காய் மோர் குழம்பு"],
    ing: ["தயிர்", "முருங்கை", "தேங்காய்", "பச்சை மிளகாய்"],
    steps: ["தயிர் கடை, தேங்காய் paste சேர்", "தாளி: கடுகு+கறிவேப்பிலை"]
  },
  s: {
    ta: "கொண்டைக்கடலை சுண்டல்",
    en: "Chana Sundal",
    time: "4:30",
    port: "½ cup சுண்டல்",
    cal: "~140",
    prot: "8g",
    sw: ["முளை சுண்டல்", "வேர்க்கடலை 3 tbsp"],
    ing: ["கொண்டைக்கடலை", "தேங்காய்", "கறிவேப்பிலை"],
    steps: ["கொண்டைக்கடலை 8hr ஊறவை, வேகவை", "தாளி+தேங்காய் சேர்"]
  },
  n: {
    ta: "இட்லி+சாம்பார்",
    en: "Idli Sambar",
    time: "7:30",
    port: "2 இட்லி, 1 cup சாம்பார்",
    cal: "~250",
    prot: "8g",
    sw: ["தயிர் சாதம்", "கிச்சடி 1 cup"],
    ing: ["இட்லி மாவு", "சாம்பார்"],
    steps: ["Same routine"]
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
    ta: "இட்லி+ஆளிவிதை சட்னி",
    en: "Idli Flax Chutney",
    time: "7:30",
    port: "2 இட்லி, flax சட்னி, ½ cup சாம்பார்",
    cal: "~300",
    prot: "11g",
    sw: ["இட்லி+தேங்காய்+முட்டை", "தோசை 2+flax"],
    ing: ["இட்லி மாவு", "ஆளிவிதை", "கடலைப்பருப்பு", "காய்ந்த மிளகாய்"],
    steps: ["Flax+கடலைப்பருப்பு dry roast", "Grind to chutney, உப்பு"]
  },
  l: {
    ta: "சாம்பார் சாதம்+பீன்ஸ்",
    en: "Sambar Rice Beans",
    time: "12:30",
    port: "¾ cup சாதம், 1.5 cup சாம்பார், பொரியல்",
    cal: "~380",
    prot: "12g",
    sw: ["ரசம் சாதம்+கேரட்", "சாம்பார்+அவியல்"],
    ing: ["Same as Day 1 lunch"],
    steps: ["Same routine"]
  },
  s: {
    ta: "காப்பி+2 பேரிச்சை",
    en: "Coffee Dates",
    time: "4:30",
    port: "1 சின்ன காப்பி, 2 பேரிச்சை",
    cal: "~100",
    prot: "2g",
    sw: ["Green tea+பேரிச்சை", "மோர்+பாதாம்"],
    ing: ["காப்பி", "பேரிச்சை"],
    steps: ["½ tsp sugar max in காப்பி"]
  },
  n: {
    ta: "ரசம் சாதம்+பொரியல்",
    en: "Rasam Rice",
    time: "7:30",
    port: "½ cup சாதம், 1.5 cup ரசம், பொரியல்",
    cal: "~230",
    prot: "6g",
    sw: ["இட்லி 2+சாம்பார்", "காய்கறி சூப்"],
    ing: ["தக்காளி", "மிளகு", "பூண்டு", "புளி", "கொத்தமல்லி"],
    steps: ["தக்காளி+புளி boil, மிளகு+பூண்டு paste", "தாளி: கடுகு+காய்ந்த மிளகாய்"]
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
    en: "Veg Pongal",
    time: "7:30",
    port: "¾ cup பொங்கல், சாம்பார்",
    cal: "~290",
    prot: "9g",
    sw: ["உப்மா", "கிச்சடி"],
    ing: ["அரிசி", "பாசிப்பருப்பு", "மிளகு", "சீரகம்", "இஞ்சி"],
    steps: ["2:1 அரிசி:பாசிப்பருப்பு cook", "½ tsp நெய், மிளகு+சீரகம் தாளி"]
  },
  l: {
    ta: "சப்பாத்தி+பருப்பு+கேரட்",
    en: "Chapati Dal Carrot",
    time: "12:30",
    port: "2 சப்பாத்தி, 1 cup பருப்பு, பொரியல், தயிர்",
    cal: "~400",
    prot: "14g",
    sw: ["சப்பாத்தி+பருப்பு+பீன்ஸ்", "சாதம்+பருப்பு"],
    ing: ["கோதுமை மாவு", "துவரம்பருப்பு", "கேரட்"],
    steps: ["சப்பாத்தி dry roast, no oil", "பருப்பு+மஞ்சள்+பூண்டு pressure cook"]
  },
  s: {
    ta: "வேர்க்கடலை சுண்டல்",
    en: "Peanut Sundal",
    time: "4:30",
    port: "3 tbsp சுண்டல்",
    cal: "~130",
    prot: "6g",
    sw: ["கொண்டைக்கடலை", "மோர்+பாதாம்"],
    ing: ["வேர்க்கடலை", "கறிவேப்பிலை"],
    steps: ["வேர்க்கடலை ஊறவை+வேகவை, தாளி"]
  },
  n: {
    ta: "சப்பாத்தி+கீரை பருப்பு",
    en: "Chapati Keerai Dal",
    time: "7:30",
    port: "1 சப்பாத்தி, 1 cup கீரை பருப்பு",
    cal: "~230",
    prot: "10g",
    sw: ["இட்லி 2+சாம்பார்", "கிச்சடி"],
    ing: ["கோதுமை மாவு", "பாசிப்பருப்பு", "கீரை"],
    steps: ["கீரை+பருப்பு together cook, mash"]
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
    en: "Idli Sambar Egg",
    time: "7:30",
    port: "2 இட்லி, சாம்பார், 1 முட்டை",
    cal: "~310",
    prot: "14g",
    sw: ["தோசை 2+சாம்பார்", "இட்லி 3"],
    ing: ["Same"],
    steps: ["Same"]
  },
  l: {
    ta: "சுண்டல் மசாலா+சப்பாத்தி",
    en: "Chana Masala Chapati",
    time: "12:30",
    port: "2 சப்பாத்தி, 1 cup சுண்டல், salad",
    cal: "~400",
    prot: "16g",
    sw: ["சப்பாத்தி+பருப்பு", "சாதம்+சாம்பார்"],
    ing: ["கொண்டைக்கடலை", "தக்காளி", "வெங்காயம்", "மசாலா"],
    steps: ["கொண்டைக்கடலை வேகவை, மசாலா gravy cook"]
  },
  s: {
    ta: "முளை சுண்டல்",
    en: "Sprouted Sundal",
    time: "4:30",
    port: "¾ cup சுண்டல்",
    cal: "~150",
    prot: "9g",
    sw: ["மோர்+பாதாம்", "கொய்யா"],
    ing: ["பாசிப்பயிறு"],
    steps: ["முளை+வேகவை+தாளி"]
  },
  n: {
    ta: "கிச்சடி+தயிர்",
    en: "Khichdi Curd",
    time: "7:30",
    port: "1 cup கிச்சடி, ¼ cup தயிர்",
    cal: "~280",
    prot: "10g",
    sw: ["தயிர் சாதம்", "இட்லி 2"],
    ing: ["அரிசி", "பாசிப்பருப்பு", "மஞ்சள்", "காய்கறி"],
    steps: ["1:1 அரிசி:பருப்பு+காய்கறி pressure cook"]
  },
  tip: {
    ta: "🌟 FLEX DAY! பாயசம் 2 tbsp OR 1 லட்டு OK!",
    en: "FLEX! Payasam or 1 laddu OK!"
  },
  f: 1
}];
// Days 8-30: generate from patterns (keeping compact)
const P2 = [
// Week 2: Protein Boost
{
  b: "பெசரட்டு+இஞ்சி சட்னி",
  l: "தினை+சாம்பார்+கீரை",
  s: "முட்டை+Green Tea",
  n: "ராகி கஞ்சி+பொரியல்"
}, {
  b: "சீலா+புதினா சட்னி",
  l: "வரகு+கீரை கூட்டு+ரசம்",
  s: "முளை சுண்டல்",
  n: "சப்பாத்தி+கீரை பருப்பு"
}, {
  b: "முட்டை தோசை",
  l: "சாமை+வெண்டைக்காய் சாம்பார்",
  s: "கொண்டைக்கடலை சுண்டல்",
  n: "பெசரட்டு+சட்னி"
}, {
  b: "அடை+அவியல்",
  l: "சாம்பார் சாதம்+பீன்ஸ்+மோர்",
  s: "மோர்+5 பாதாம்",
  n: "கிச்சடி+தயிர்"
}, {
  b: "பெசரட்டு",
  l: "சிறுதானிய கிச்சடி+தயிர்",
  s: "பப்பாளி+ஆளிவிதை",
  n: "அடை+அவியல் Light"
}, {
  b: "இட்லி+சாம்பார்+முட்டை",
  l: "சப்பாத்தி+பருப்பு+பொரியல்",
  s: "முட்டை+Green Tea",
  n: "காய்கறி சூப்+சப்பாத்தி"
}, {
  b: "முளை தோசை",
  l: "முருங்கை சாம்பார்+பீட்ரூட்",
  s: "கொய்யா+வால்நட்",
  n: "தயிர் சாதம்"
}];
const P3 = [
// Week 3: Millet
{
  b: "ராகி தோசை",
  l: "வரகு+கீரை கூட்டு",
  s: "ராகி கூழ்",
  n: "ராகி கஞ்சி"
}, {
  b: "சீலா",
  l: "தினை+சாம்பார்+கீரை",
  s: "முளை சுண்டல்",
  n: "கம்பு கஞ்சி"
}, {
  b: "பெசரட்டு",
  l: "சாமை+வெண்டைக்காய் சாம்பார்",
  s: "கொண்டைக்கடலை",
  n: "சப்பாத்தி+கீரை பருப்பு"
}, {
  b: "இட்லி+சாம்பார்+முட்டை",
  l: "சிறுதானிய கிச்சடி",
  s: "மோர்+பாதாம்",
  n: "ரசம் சாதம்"
}, {
  b: "அடை+அவியல்",
  l: "வரகு+கீரை கூட்டு",
  s: "பப்பாளி+ஆளிவிதை",
  n: "ராகி கஞ்சி"
}, {
  b: "முட்டை தோசை",
  l: "தினை+சாம்பார்+கீரை",
  s: "முட்டை+Green Tea",
  n: "காய்கறி சூப்"
}, {
  b: "பொங்கல்+சாம்பார்",
  l: "சாம்பார் சாதம்+பீன்ஸ்",
  s: "காப்பி+பேரிச்சை",
  n: "கிச்சடி+தயிர்"
}];
const P4 = [
// Week 4: Full Plan
{
  b: "சீலா",
  l: "வரகு+கீரை கூட்டு+ரசம்",
  s: "முளை சுண்டல்",
  n: "ராகி கஞ்சி"
}, {
  b: "பெசரட்டு",
  l: "தினை+சாம்பார்+கீரை",
  s: "கொய்யா+வால்நட்",
  n: "பெசரட்டு Light"
}, {
  b: "முளை தோசை",
  l: "சாமை+வெண்டைக்காய்",
  s: "கொண்டைக்கடலை",
  n: "சப்பாத்தி+கீரை பருப்பு"
}, {
  b: "ராகி தோசை",
  l: "சிறுதானிய கிச்சடி",
  s: "மோர்+பாதாம்",
  n: "கம்பு கஞ்சி"
}, {
  b: "அடை+அவியல்",
  l: "சப்பாத்தி+பருப்பு+பொரியல்",
  s: "பப்பாளி+ஆளிவிதை",
  n: "காய்கறி சூப்"
}, {
  b: "இட்லி+சாம்பார்+முட்டை",
  l: "முருங்கை சாம்பார்+பீட்ரூட்",
  s: "முட்டை+Green Tea",
  n: "அடை Light"
}, {
  b: "இட்லி+ஆளிவிதை சட்னி",
  l: "தினை+சாம்பார்+கீரை",
  s: "வேர்க்கடலை சுண்டல்",
  n: "கிச்சடி+தயிர்"
}, {
  b: "பெசரட்டு",
  l: "வரகு+கீரை கூட்டு",
  s: "முளை சுண்டல்",
  n: "ராகி கஞ்சி"
}, {
  b: "சீலா",
  l: "சுண்டல் மசாலா+சப்பாத்தி",
  s: "கொய்யா+வால்நட்",
  n: "இட்லி+சாம்பார் Light"
}];
// Build full 30 day array (days 1-7 detailed, 8-30 compact)
const buildDay = (d, p, info, flex) => ({
  d,
  p,
  b: {
    ta: info.b,
    en: info.b
  },
  l: {
    ta: info.l,
    en: info.l
  },
  s: {
    ta: info.s,
    en: info.s
  },
  n: {
    ta: info.n,
    en: info.n
  },
  tip: {
    ta: "",
    en: ""
  },
  f: flex ? 1 : 0
});
const MEALS = [...ML_DATA];
P2.forEach((m, i) => MEALS.push(buildDay(8 + i, 1, m, i === 6)));
P3.forEach((m, i) => MEALS.push(buildDay(15 + i, 2, m, i === 6)));
P4.forEach((m, i) => MEALS.push(buildDay(22 + i, 3, m, i === 6 || i === 8)));
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
  const name = meal.ta || meal.en || "";
  // Direct match
  for (const [k, v] of Object.entries(NL)) {
    if (name.includes(k)) return v;
  }
  // Check if meal has inline nutrition
  if (meal.cal && typeof meal.cal === 'number') return {
    cal: meal.cal,
    prot: meal.prot || 0,
    carb: meal.carb || 0,
    fat: meal.fat || 0,
    fib: meal.fib || 0
  };
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
        const r = await window.storage.get(SK);
        if (r && r.value) {
          const d = JSON.parse(r.value);
          setD(d);
          if (d.sd) {
            const diff = Math.floor((Date.now() - new Date(d.sd).getTime()) / 864e5) + 1;
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
            await window.storage.set(SK, JSON.stringify(fresh));
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
          await window.storage.set(SK, JSON.stringify(fresh));
        } catch {}
        setOnboard(0);
      }
      setLoaded(true);
    })();
  }, []);
  const save = useCallback(async nd => {
    setD(nd);
    try {
      await window.storage.set(SK, JSON.stringify(nd));
    } catch (e) {
      try {
        await window.storage.set(SK, JSON.stringify(nd));
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
  const addWater = () => {
    hap();
    save({
      ...D,
      wg: {
        ...D.wg,
        [day]: Math.min(waterN + 1, 10)
      }
    });
  };
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
    save({
      ...D,
      sd: new Date().toISOString().split('T')[0],
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
  const Input = ({
    ...rest
  }) => /*#__PURE__*/React.createElement("input", _extends({}, rest, {
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
  }) => /*#__PURE__*/React.createElement("div", {
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
      key: d,
      onClick: () => onTap(d),
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
  const WaterDrop = () => {
    const drops = Array.from({
      length: 8
    });
    return /*#__PURE__*/React.createElement("div", {
      onClick: addWater,
      style: {
        cursor: 'pointer',
        display: 'flex',
        gap: 3,
        alignItems: 'end',
        padding: '4px 0'
      }
    }, drops.map((_, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        width: 10,
        height: 18,
        borderRadius: '50% 50% 50% 50% / 30% 30% 70% 70%',
        background: i < waterN ? 'linear-gradient(180deg,#60a5fa,#2563eb)' : 'rgba(148,163,184,0.2)',
        transition: 'all 0.3s',
        transform: i < waterN ? 'scale(1)' : 'scale(0.85)',
        animation: i === waterN - 1 ? 'aDrop 0.4s ease' : undefined
      }
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        color: T.muted,
        marginLeft: 4,
        fontWeight: 600
      }
    }, waterN, "/8"));
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
        name: e.target.value || "அம்மா"
      }),
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
  }, /*#__PURE__*/React.createElement(WaterDrop, null)), /*#__PURE__*/React.createElement("div", {
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
    onTap: setDay
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
    onTap: setMDay
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
        fontSize: 12,
        fontWeight: 700,
        color: dark ? '#4ade80' : '#166534'
      }
    }, "\uD83D\uDCCA Day ", mDay, " Total"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
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
        fontSize: 10,
        color: '#16a34a'
      }
    }, "\uD83D\uDCAA", dn.prot, "g P"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        color: '#3b82f6'
      }
    }, "\uD83C\uDF5A", dn.carb, "g C"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        color: '#d97706'
      }
    }, "\uD83E\uDED7", dn.fat, "g F"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
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
        fontSize: 11,
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
        fontSize: 10,
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
        fontSize: 12,
        color: T.muted
      }
    }, m.en), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
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
          fontSize: 10,
          background: dark ? 'rgba(255,255,255,0.05)' : '#f0fdf4',
          padding: '3px 8px',
          borderRadius: 6,
          color: '#16a34a',
          fontWeight: 600
        }
      }, "\uD83D\uDD25 ", nt.cal, " cal"), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 10,
          background: dark ? 'rgba(34,197,94,0.1)' : '#f0fdf4',
          padding: '3px 8px',
          borderRadius: 6,
          color: '#16a34a'
        }
      }, "\uD83D\uDCAA ", nt.prot, "g protein"), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 10,
          background: dark ? 'rgba(59,130,246,0.1)' : '#eff6ff',
          padding: '3px 8px',
          borderRadius: 6,
          color: '#2563eb'
        }
      }, "\uD83C\uDF5A ", nt.carb, "g carbs"), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 10,
          background: dark ? 'rgba(245,158,11,0.1)' : '#fffbeb',
          padding: '3px 8px',
          borderRadius: 6,
          color: '#d97706'
        }
      }, "\uD83E\uDED7 ", nt.fat, "g fat"), nt.fib > 0 && /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 10,
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
        fontSize: 11,
        fontWeight: 600,
        color: T.sub,
        marginBottom: 4
      }
    }, "\uD83D\uDD04 Swap Options:"), m.sw.map((s, si) => /*#__PURE__*/React.createElement("div", {
      key: si,
      style: {
        fontSize: 12,
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
        fontSize: 12,
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
      padding: '7px 16px',
      borderRadius: 20,
      border: shopW === i ? '2px solid #ea580c' : `1.5px solid ${T.border}`,
      background: shopW === i ? '#ea580c' : T.card,
      color: shopW === i ? '#fff' : T.sub,
      fontSize: 12,
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
      fontSize: 13,
      fontWeight: 700,
      padding: '10px 0 6px',
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
        padding: '9px 0',
        borderBottom: `1px solid ${T.border}`,
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 24,
        height: 24,
        borderRadius: 7,
        border: on ? 'none' : `2px solid ${T.border}`,
        background: on ? '#22c55e' : T.card,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }
    }, on && /*#__PURE__*/React.createElement(Chk, {
      on: true,
      sz: 14
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
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
      name: e.target.value || "அம்மா"
    })
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
      t: "மாதம் 1: 1.5-2.5 kg (நீர் + கொழுப்பு)\nமாதம் 3: 5-7 kg (உடை தளர்வாகும், மூட்டு வலி குறையும்)\nமாதம் 6: 10-13 kg (தெரியும் அளவு மாற்றம்!)\nமாதம் 12-18: ~21 kg இலக்கு\n\nமெதுவாக = நிலையானது. வேகமான டயட் எப்போதும் திரும்பி வரும்!"
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
      t: "வாரம் 1: ஒரு வேளை சாதத்தை சாமை/வரகு-ஆல் மாற்று\nவாரம் 2: ராகி தோசை வாரத்தில் 2 முறை\nவாரம் 3: கம்பு கஞ்சி இரவு உணவாக\nவாரம் 4: எல்லா சிறுதானியமும் சுழற்சி\n\n⚠️ எல்லா வேளையும் சிறுதானியம் வேண்டாம் — சுழற்சி செய்யுங்கள். கூடுதல் தண்ணீர் குடியுங்கள்!"
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
      fontSize: 11,
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
      fontSize: 9,
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
      fontSize: 11,
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
      fontSize: 13,
      fontWeight: 700,
      color: dark ? '#4ade80' : '#166534',
      marginBottom: 4
    }
  }, item.h), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      lineHeight: 1.7,
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
      fontSize: 12,
      lineHeight: 2,
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
      fontSize: 11,
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
      fontSize: 11,
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
      fontSize: 8,
      color: T.muted
    }
  }, "kcal"))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
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
      fontSize: 14,
      fontWeight: 800,
      color: n.c
    }
  }, n.v, "g"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 8,
      color: n.c,
      fontWeight: 600
    }
  }, n.l)))), item.gi && item.gi !== "-" && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      padding: '2px 8px',
      borderRadius: 10,
      background: item.gi === "Low" ? dark ? 'rgba(34,197,94,0.1)' : '#f0fdf4' : item.gi === "Medium" ? dark ? 'rgba(245,158,11,0.1)' : '#fffbeb' : dark ? 'rgba(239,68,68,0.1)' : '#fef2f2',
      color: item.gi === "Low" ? '#16a34a' : item.gi === "Medium" ? '#d97706' : '#ef4444',
      fontWeight: 700,
      marginRight: 6
    }
  }, "GI: ", item.gi), item.note && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: dark ? '#81c784' : '#15803d',
      marginTop: 6,
      lineHeight: 1.4,
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
      fontSize: 12,
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
      maxHeight: '80dvh',
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
      fontSize: 16,
      fontWeight: 700,
      color: T.text
    }
  }, recipe.ta), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: T.muted,
      marginBottom: 12
    }
  }, recipe.port, " ", recipe.cal && `· ${recipe.cal}`), recipe.ing && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: T.text,
      marginBottom: 6
    }
  }, "\uD83E\uDDFE Ingredients"), recipe.ing.map((ig, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      fontSize: 12,
      color: T.sub,
      padding: '3px 0'
    }
  }, "\u2022 ", ig))), recipe.steps && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: T.text,
      margin: '12px 0 6px'
    }
  }, "\uD83D\uDC69\u200D\uD83C\uDF73 Steps"), recipe.steps.map((st, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      fontSize: 12,
      color: T.sub,
      padding: '5px 0',
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      borderRadius: 10,
      background: '#22c55e',
      color: '#fff',
      fontSize: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      fontWeight: 700
    }
  }, i + 1), st))), /*#__PURE__*/React.createElement(Btn, {
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
