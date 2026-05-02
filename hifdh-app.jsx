import { useState, useEffect, useCallback, useRef } from "react";

// ── Surah Database ──────────────────────────────────────────────────────────
const SURAHS = [
  {n:1,ar:"الفاتحة",en:"Al-Fatihah",meaning:"The Opening",v:7,j:1},
  {n:2,ar:"البقرة",en:"Al-Baqarah",meaning:"The Cow",v:286,j:1},
  {n:3,ar:"آل عمران",en:"Aal-Imran",meaning:"The Family of Imran",v:200,j:3},
  {n:4,ar:"النساء",en:"An-Nisa",meaning:"The Women",v:176,j:4},
  {n:5,ar:"المائدة",en:"Al-Maidah",meaning:"The Table Spread",v:120,j:6},
  {n:6,ar:"الأنعام",en:"Al-Anam",meaning:"The Cattle",v:165,j:7},
  {n:7,ar:"الأعراف",en:"Al-Araf",meaning:"The Heights",v:206,j:8},
  {n:8,ar:"الأنفال",en:"Al-Anfal",meaning:"The Spoils of War",v:75,j:9},
  {n:9,ar:"التوبة",en:"At-Tawbah",meaning:"The Repentance",v:129,j:10},
  {n:10,ar:"يونس",en:"Yunus",meaning:"Jonah",v:109,j:11},
  {n:11,ar:"هود",en:"Hud",meaning:"Hud",v:123,j:11},
  {n:12,ar:"يوسف",en:"Yusuf",meaning:"Joseph",v:111,j:12},
  {n:13,ar:"الرعد",en:"Ar-Rad",meaning:"The Thunder",v:43,j:13},
  {n:14,ar:"إبراهيم",en:"Ibrahim",meaning:"Abraham",v:52,j:13},
  {n:15,ar:"الحجر",en:"Al-Hijr",meaning:"The Rocky Tract",v:99,j:14},
  {n:16,ar:"النحل",en:"An-Nahl",meaning:"The Bee",v:128,j:14},
  {n:17,ar:"الإسراء",en:"Al-Isra",meaning:"The Night Journey",v:111,j:15},
  {n:18,ar:"الكهف",en:"Al-Kahf",meaning:"The Cave",v:110,j:15},
  {n:19,ar:"مريم",en:"Maryam",meaning:"Mary",v:98,j:16},
  {n:20,ar:"طه",en:"Ta-Ha",meaning:"Ta-Ha",v:135,j:16},
  {n:21,ar:"الأنبياء",en:"Al-Anbiya",meaning:"The Prophets",v:112,j:17},
  {n:22,ar:"الحج",en:"Al-Hajj",meaning:"The Pilgrimage",v:78,j:17},
  {n:23,ar:"المؤمنون",en:"Al-Muminun",meaning:"The Believers",v:118,j:18},
  {n:24,ar:"النور",en:"An-Nur",meaning:"The Light",v:64,j:18},
  {n:25,ar:"الفرقان",en:"Al-Furqan",meaning:"The Criterion",v:77,j:18},
  {n:26,ar:"الشعراء",en:"Ash-Shuara",meaning:"The Poets",v:227,j:19},
  {n:27,ar:"النمل",en:"An-Naml",meaning:"The Ant",v:93,j:19},
  {n:28,ar:"القصص",en:"Al-Qasas",meaning:"The Stories",v:88,j:20},
  {n:29,ar:"العنكبوت",en:"Al-Ankabut",meaning:"The Spider",v:69,j:20},
  {n:30,ar:"الروم",en:"Ar-Rum",meaning:"The Romans",v:60,j:21},
  {n:31,ar:"لقمان",en:"Luqman",meaning:"Luqman",v:34,j:21},
  {n:32,ar:"السجدة",en:"As-Sajdah",meaning:"The Prostration",v:30,j:21},
  {n:33,ar:"الأحزاب",en:"Al-Ahzab",meaning:"The Combined Forces",v:73,j:21},
  {n:34,ar:"سبأ",en:"Saba",meaning:"Sheba",v:54,j:22},
  {n:35,ar:"فاطر",en:"Fatir",meaning:"The Originator",v:45,j:22},
  {n:36,ar:"يس",en:"Ya-Sin",meaning:"Ya-Sin",v:83,j:22},
  {n:37,ar:"الصافات",en:"As-Saffat",meaning:"Those Ranged in Ranks",v:182,j:23},
  {n:38,ar:"ص",en:"Sad",meaning:"Sad",v:88,j:23},
  {n:39,ar:"الزمر",en:"Az-Zumar",meaning:"The Groups",v:75,j:23},
  {n:40,ar:"غافر",en:"Ghafir",meaning:"The Forgiver",v:85,j:24},
  {n:41,ar:"فصلت",en:"Fussilat",meaning:"Explained in Detail",v:54,j:24},
  {n:42,ar:"الشورى",en:"Ash-Shura",meaning:"The Consultation",v:53,j:25},
  {n:43,ar:"الزخرف",en:"Az-Zukhruf",meaning:"The Gold Adornment",v:89,j:25},
  {n:44,ar:"الدخان",en:"Ad-Dukhan",meaning:"The Smoke",v:59,j:25},
  {n:45,ar:"الجاثية",en:"Al-Jathiyah",meaning:"The Kneeling",v:37,j:25},
  {n:46,ar:"الأحقاف",en:"Al-Ahqaf",meaning:"The Curved Sand-hills",v:35,j:26},
  {n:47,ar:"محمد",en:"Muhammad",meaning:"Muhammad",v:38,j:26},
  {n:48,ar:"الفتح",en:"Al-Fath",meaning:"The Victory",v:29,j:26},
  {n:49,ar:"الحجرات",en:"Al-Hujurat",meaning:"The Dwellings",v:18,j:26},
  {n:50,ar:"ق",en:"Qaf",meaning:"Qaf",v:45,j:26},
  {n:51,ar:"الذاريات",en:"Adh-Dhariyat",meaning:"The Wind that Scatter",v:60,j:26},
  {n:52,ar:"الطور",en:"At-Tur",meaning:"The Mount",v:49,j:27},
  {n:53,ar:"النجم",en:"An-Najm",meaning:"The Star",v:62,j:27},
  {n:54,ar:"القمر",en:"Al-Qamar",meaning:"The Moon",v:55,j:27},
  {n:55,ar:"الرحمن",en:"Ar-Rahman",meaning:"The Most Gracious",v:78,j:27},
  {n:56,ar:"الواقعة",en:"Al-Waqiah",meaning:"The Event",v:96,j:27},
  {n:57,ar:"الحديد",en:"Al-Hadid",meaning:"The Iron",v:29,j:27},
  {n:58,ar:"المجادلة",en:"Al-Mujadilah",meaning:"She That Disputeth",v:22,j:28},
  {n:59,ar:"الحشر",en:"Al-Hashr",meaning:"The Gathering",v:24,j:28},
  {n:60,ar:"الممتحنة",en:"Al-Mumtahanah",meaning:"The Woman to be Examined",v:13,j:28},
  {n:61,ar:"الصف",en:"As-Saf",meaning:"The Row",v:14,j:28},
  {n:62,ar:"الجمعة",en:"Al-Jumuah",meaning:"Friday",v:11,j:28},
  {n:63,ar:"المنافقون",en:"Al-Munafiqun",meaning:"The Hypocrites",v:11,j:28},
  {n:64,ar:"التغابن",en:"At-Taghabun",meaning:"Mutual Loss and Gain",v:18,j:28},
  {n:65,ar:"الطلاق",en:"At-Talaq",meaning:"The Divorce",v:12,j:28},
  {n:66,ar:"التحريم",en:"At-Tahrim",meaning:"The Prohibition",v:12,j:28},
  {n:67,ar:"الملك",en:"Al-Mulk",meaning:"The Dominion",v:30,j:29},
  {n:68,ar:"القلم",en:"Al-Qalam",meaning:"The Pen",v:52,j:29},
  {n:69,ar:"الحاقة",en:"Al-Haqqah",meaning:"The Inevitable",v:52,j:29},
  {n:70,ar:"المعارج",en:"Al-Maarij",meaning:"The Ways of Ascent",v:44,j:29},
  {n:71,ar:"نوح",en:"Nuh",meaning:"Noah",v:28,j:29},
  {n:72,ar:"الجن",en:"Al-Jinn",meaning:"The Jinn",v:28,j:29},
  {n:73,ar:"المزمل",en:"Al-Muzzammil",meaning:"The One Wrapped in Garments",v:20,j:29},
  {n:74,ar:"المدثر",en:"Al-Muddaththir",meaning:"The One Enveloped",v:56,j:29},
  {n:75,ar:"القيامة",en:"Al-Qiyamah",meaning:"The Resurrection",v:40,j:29},
  {n:76,ar:"الإنسان",en:"Al-Insan",meaning:"The Man",v:31,j:29},
  {n:77,ar:"المرسلات",en:"Al-Mursalat",meaning:"Those Sent Forth",v:50,j:29},
  {n:78,ar:"النبأ",en:"An-Naba",meaning:"The Great News",v:40,j:30},
  {n:79,ar:"النازعات",en:"An-Naziat",meaning:"Those Who Pull Out",v:46,j:30},
  {n:80,ar:"عبس",en:"Abasa",meaning:"He Frowned",v:42,j:30},
  {n:81,ar:"التكوير",en:"At-Takwir",meaning:"The Overthrowing",v:29,j:30},
  {n:82,ar:"الانفطار",en:"Al-Infitar",meaning:"The Cleaving",v:19,j:30},
  {n:83,ar:"المطففين",en:"Al-Mutaffifin",meaning:"Those Who Deal in Fraud",v:36,j:30},
  {n:84,ar:"الانشقاق",en:"Al-Inshiqaq",meaning:"The Splitting Asunder",v:25,j:30},
  {n:85,ar:"البروج",en:"Al-Buruj",meaning:"The Big Stars",v:22,j:30},
  {n:86,ar:"الطارق",en:"At-Tariq",meaning:"The Night-Comer",v:17,j:30},
  {n:87,ar:"الأعلى",en:"Al-Ala",meaning:"The Most High",v:19,j:30},
  {n:88,ar:"الغاشية",en:"Al-Ghashiyah",meaning:"The Overwhelming",v:26,j:30},
  {n:89,ar:"الفجر",en:"Al-Fajr",meaning:"The Break of Day",v:30,j:30},
  {n:90,ar:"البلد",en:"Al-Balad",meaning:"The City",v:20,j:30},
  {n:91,ar:"الشمس",en:"Ash-Shams",meaning:"The Sun",v:15,j:30},
  {n:92,ar:"الليل",en:"Al-Layl",meaning:"The Night",v:21,j:30},
  {n:93,ar:"الضحى",en:"Ad-Duha",meaning:"The Forenoon",v:11,j:30},
  {n:94,ar:"الشرح",en:"Ash-Sharh",meaning:"The Opening Forth",v:8,j:30},
  {n:95,ar:"التين",en:"At-Tin",meaning:"The Fig",v:8,j:30},
  {n:96,ar:"العلق",en:"Al-Alaq",meaning:"The Clot",v:19,j:30},
  {n:97,ar:"القدر",en:"Al-Qadr",meaning:"The Night of Decree",v:5,j:30},
  {n:98,ar:"البينة",en:"Al-Bayyinah",meaning:"The Clear Evidence",v:8,j:30},
  {n:99,ar:"الزلزلة",en:"Az-Zalzalah",meaning:"The Earthquake",v:8,j:30},
  {n:100,ar:"العاديات",en:"Al-Adiyat",meaning:"Those That Run",v:11,j:30},
  {n:101,ar:"القارعة",en:"Al-Qariah",meaning:"The Striking Hour",v:11,j:30},
  {n:102,ar:"التكاثر",en:"At-Takathur",meaning:"The Piling Up",v:8,j:30},
  {n:103,ar:"العصر",en:"Al-Asr",meaning:"The Time",v:3,j:30},
  {n:104,ar:"الهمزة",en:"Al-Humazah",meaning:"The Slanderer",v:9,j:30},
  {n:105,ar:"الفيل",en:"Al-Fil",meaning:"The Elephant",v:5,j:30},
  {n:106,ar:"قريش",en:"Quraysh",meaning:"Quraysh",v:4,j:30},
  {n:107,ar:"الماعون",en:"Al-Maun",meaning:"The Small Kindnesses",v:7,j:30},
  {n:108,ar:"الكوثر",en:"Al-Kawthar",meaning:"A River in Paradise",v:3,j:30},
  {n:109,ar:"الكافرون",en:"Al-Kafirun",meaning:"The Disbelievers",v:6,j:30},
  {n:110,ar:"النصر",en:"An-Nasr",meaning:"The Help",v:3,j:30},
  {n:111,ar:"المسد",en:"Al-Masad",meaning:"The Palm Fibre",v:5,j:30},
  {n:112,ar:"الإخلاص",en:"Al-Ikhlas",meaning:"The Sincerity",v:4,j:30},
  {n:113,ar:"الفلق",en:"Al-Falaq",meaning:"The Daybreak",v:5,j:30},
  {n:114,ar:"الناس",en:"An-Nas",meaning:"Mankind",v:6,j:30},
];

// ── SM-2 Spaced Repetition ──────────────────────────────────────────────────
function sm2Update(card, quality) {
  let { interval = 1, easeFactor = 2.5, repetitions = 0 } = card;
  if (quality >= 3) {
    if (repetitions === 0) interval = 1;
    else if (repetitions === 1) interval = 6;
    else interval = Math.round(interval * easeFactor);
    easeFactor = Math.max(1.3, easeFactor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    repetitions += 1;
  } else {
    repetitions = 0;
    interval = 1;
  }
  const next = new Date();
  next.setDate(next.getDate() + interval);
  return { interval, easeFactor, repetitions, nextReview: next.toISOString().split("T")[0] };
}

// ── Helpers ─────────────────────────────────────────────────────────────────
const today = () => new Date().toISOString().split("T")[0];

function daysUntil(dateStr) {
  const diff = new Date(dateStr) - new Date(today());
  return Math.ceil(diff / 86400000);
}

// ── Islamic Geometric SVG Pattern ───────────────────────────────────────────
const PatternBg = () => (
  <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:0.06,pointerEvents:"none"}} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="geo" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
        <polygon points="30,2 57,17 57,43 30,58 3,43 3,17" fill="none" stroke="#c9a84c" strokeWidth="1"/>
        <polygon points="30,12 47,22 47,38 30,48 13,38 13,22" fill="none" stroke="#c9a84c" strokeWidth="0.5"/>
        <line x1="30" y1="2" x2="30" y2="12" stroke="#c9a84c" strokeWidth="0.5"/>
        <line x1="57" y1="17" x2="47" y2="22" stroke="#c9a84c" strokeWidth="0.5"/>
        <line x1="57" y1="43" x2="47" y2="38" stroke="#c9a84c" strokeWidth="0.5"/>
        <line x1="30" y1="58" x2="30" y2="48" stroke="#c9a84c" strokeWidth="0.5"/>
        <line x1="3" y1="43" x2="13" y2="38" stroke="#c9a84c" strokeWidth="0.5"/>
        <line x1="3" y1="17" x2="13" y2="22" stroke="#c9a84c" strokeWidth="0.5"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#geo)"/>
  </svg>
);

// ── Main App ─────────────────────────────────────────────────────────────────
export default function HifdhApp() {
  const [tab, setTab] = useState("home");
  const [memorized, setMemorized] = useState({});
  const [quiz, setQuiz] = useState(null);
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizAnswered, setQuizAnswered] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [reviewSurah, setReviewSurah] = useState(null);
  const [reviewDone, setReviewDone] = useState(null);
  const [notification, setNotification] = useState(null);
  const [juzFilter, setJuzFilter] = useState(null);

  // ── Persist helpers ──────────────────────────────────────────────────────
  const save = useCallback(async (data, quizData) => {
    try { await window.storage.set("hifdh-v1", JSON.stringify({ mem: data, quiz: quizData })); } catch {}
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const r = await window.storage.get("hifdh-v1");
        if (r) {
          const d = JSON.parse(r.value);
          if (d.mem) setMemorized(d.mem);
          if (d.quiz && d.quiz.date === today()) {
            setQuiz(d.quiz.data);
            setQuizAnswered(d.quiz.answered ?? null);
          }
        }
      } catch {}
      setLoaded(true);
    })();
  }, []);

  const notify = (msg, type = "success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 2500);
  };

  // ── Derived data ──────────────────────────────────────────────────────────
  const memorizedNums = Object.keys(memorized).map(Number);
  const dueNums = memorizedNums.filter(n => {
    const c = memorized[n];
    return !c.nextReview || c.nextReview <= today();
  });

  // ── Actions ───────────────────────────────────────────────────────────────
  const addSurah = async (num) => {
    const newMem = {
      ...memorized,
      [num]: { interval: 1, easeFactor: 2.5, repetitions: 0, nextReview: today(), addedDate: today() }
    };
    setMemorized(newMem);
    await save(newMem, quiz ? { date: today(), data: quiz, answered: quizAnswered } : null);
    notify(`${SURAHS[num-1].en} added to your hifdh!`);
  };

  const removeSurah = async (num) => {
    const newMem = { ...memorized };
    delete newMem[num];
    setMemorized(newMem);
    await save(newMem, quiz ? { date: today(), data: quiz, answered: quizAnswered } : null);
    notify(`Removed from your hifdh`, "info");
  };

  const recordReview = async (num, quality) => {
    const card = memorized[num] || {};
    const updated = sm2Update(card, quality);
    const newMem = { ...memorized, [num]: { ...card, ...updated, lastReview: today() } };
    setMemorized(newMem);
    setReviewDone({ quality, next: updated.nextReview, interval: updated.interval });
    await save(newMem, quiz ? { date: today(), data: quiz, answered: quizAnswered } : null);
  };

  // ── Quiz generation ──────────────────────────────────────────────────────
  const generateQuiz = async () => {
    if (memorizedNums.length === 0) return;
    setQuizLoading(true);
    setQuiz(null);
    setQuizAnswered(null);
    const types = ["next_verse","identify_surah","surah_meaning","creative"];
    const type = types[Math.floor(Math.random() * types.length)];
    const surahList = memorizedNums.map(n => {
      const s = SURAHS[n-1];
      return `${s.n}. ${s.en} (${s.ar}) — "${s.meaning}" — ${s.v} verses`;
    }).join("\n");

    const typePrompts = {
      next_verse: `Question type: NEXT VERSE
Quote a short phrase (5-10 words) from one of the memorized surahs (use the Al-Hilali & Khan English translation) and ask what the TRANSLATION of the next verse/continuation is. Provide 4 multiple choice options — the correct next verse translation and 3 plausible but wrong options from other parts of the Quran.`,
      identify_surah: `Question type: IDENTIFY THE SURAH
Give the English translation (Al-Hilali & Khan) of a verse from one of the memorized surahs and ask which surah it belongs to. Provide 4 surah name options.`,
      surah_meaning: `Question type: SURAH NAME MEANING
Ask either: "What is the meaning of the name of Surah [X]?" or "Which surah's name means [meaning]?". Pick one from the memorized list. Provide 4 multiple choice answers.`,
      creative: `Question type: CREATIVE (not too complicated)
Create an engaging question about the memorized surahs — e.g. how many verses a surah has, which juz it's in, a prophet mentioned, a key theme, a unique word, etc. Provide 4 multiple choice options.`
    };

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `You are a Quran teacher helping a student with hifdh (memorization).

The student has memorized these surahs:
${surahList}

${typePrompts[type]}

Use Al-Hilali & Khan translation for any English Quranic text.

Respond ONLY with valid JSON — no markdown fences, no preamble:
{
  "question": "...",
  "options": {"a":"...","b":"...","c":"...","d":"..."},
  "answer": "a",
  "explanation": "Brief explanation of the correct answer",
  "type": "${type}"
}`
          }]
        })
      });
      const data = await res.json();
      const raw = data.content?.find(c => c.type === "text")?.text || "";
      const clean = raw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setQuiz(parsed);
      await save(memorized, { date: today(), data: parsed, answered: null });
    } catch {
      setQuiz({ error: true, question: "Could not load question. Check connection and try again." });
    }
    setQuizLoading(false);
  };

  const answerQuiz = async (opt) => {
    setQuizAnswered(opt);
    await save(memorized, { date: today(), data: quiz, answered: opt });
  };

  // ── Render ────────────────────────────────────────────────────────────────
  if (!loaded) {
    return (
      <div style={styles.root}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",flexDirection:"column",gap:16}}>
          <div style={{fontSize:40}}>📖</div>
          <div style={{color:"#c9a84c",fontFamily:"Georgia,serif",fontSize:18}}>Loading your hifdh...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.root}>
      <PatternBg />
      {notification && (
        <div style={{...styles.toast, background: notification.type === "info" ? "#1a3a5c" : "#14532d"}}>
          {notification.msg}
        </div>
      )}
      <div style={styles.app}>
        {/* Header */}
        <header style={styles.header}>
          <div style={styles.headerInner}>
            <div>
              <div style={styles.headerAr}>حِفْظُ القُرآن</div>
              <div style={styles.headerEn}>Hifdh Companion</div>
            </div>
            <div style={styles.badge}>
              <span style={{fontSize:11,color:"#c9a84c",letterSpacing:1}}>MEMORIZED</span>
              <span style={{fontSize:28,fontWeight:700,color:"#faf7f0",lineHeight:1}}>{memorizedNums.length}</span>
              <span style={{fontSize:11,color:"#a89060",letterSpacing:0.5}}>of 114</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <div style={styles.content}>
          {tab === "home" && <HomeTab
            memorizedNums={memorizedNums}
            dueNums={dueNums}
            memorized={memorized}
            quiz={quiz}
            quizLoading={quizLoading}
            quizAnswered={quizAnswered}
            reviewSurah={reviewSurah}
            reviewDone={reviewDone}
            onStartReview={(n) => { setReviewSurah(n); setReviewDone(null); }}
            onRecordReview={recordReview}
            onFinishReview={() => { setReviewSurah(null); setReviewDone(null); }}
            onGenerateQuiz={generateQuiz}
            onAnswer={answerQuiz}
          />}
          {tab === "surahs" && <SurahsTab
            memorized={memorized}
            search={search}
            setSearch={setSearch}
            juzFilter={juzFilter}
            setJuzFilter={setJuzFilter}
            onAdd={addSurah}
            onRemove={removeSurah}
          />}
          {tab === "stats" && <StatsTab memorized={memorized} memorizedNums={memorizedNums} dueNums={dueNums} />}
        </div>

        {/* Bottom Nav */}
        <nav style={styles.nav}>
          {[
            { id:"home", icon:"🏠", label:"Home" },
            { id:"surahs", icon:"📖", label:"Surahs" },
            { id:"stats", icon:"📊", label:"Progress" },
          ].map(({id,icon,label}) => (
            <button key={id} onClick={() => setTab(id)} style={{
              ...styles.navBtn,
              color: tab === id ? "#c9a84c" : "#6b7280",
              borderTop: tab === id ? "2px solid #c9a84c" : "2px solid transparent",
            }}>
              <span style={{fontSize:20}}>{icon}</span>
              <span style={{fontSize:10,letterSpacing:0.5}}>{label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}

// ── HOME TAB ─────────────────────────────────────────────────────────────────
function HomeTab({ memorizedNums, dueNums, memorized, quiz, quizLoading, quizAnswered,
  reviewSurah, reviewDone, onStartReview, onRecordReview, onFinishReview, onGenerateQuiz, onAnswer }) {

  if (reviewSurah) {
    const s = SURAHS[reviewSurah - 1];
    return (
      <div style={{padding:"24px 20px",display:"flex",flexDirection:"column",gap:20}}>
        <div style={styles.reviewCard}>
          <div style={{textAlign:"center",marginBottom:20}}>
            <div style={{fontSize:36,marginBottom:4}}>🎙️</div>
            <div style={{fontFamily:"Georgia,serif",color:"#c9a84c",fontSize:13,letterSpacing:2,marginBottom:8}}>NOW RECITING</div>
            <div style={{fontSize:38,fontFamily:"'Amiri',Georgia,serif",color:"#faf7f0",marginBottom:4}}>{s.ar}</div>
            <div style={{fontSize:22,fontWeight:700,color:"#faf7f0"}}>{s.en}</div>
            <div style={{fontSize:13,color:"#9ca3af",marginTop:4}}>"{s.meaning}" · {s.v} verses</div>
          </div>

          {!reviewDone ? (
            <>
              <div style={{background:"rgba(201,168,76,0.08)",borderRadius:12,padding:"16px",marginBottom:20,border:"1px solid rgba(201,168,76,0.15)"}}>
                <p style={{color:"#d1d5db",fontSize:13,lineHeight:1.7,margin:0}}>
                  Recite this surah from memory. Take your time. When finished, rate how well you recalled it:
                </p>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                {[
                  {label:"Perfect 🌟",q:5,bg:"#14532d",border:"#22c55e"},
                  {label:"Good 👍",q:4,bg:"#1e3a5f",border:"#3b82f6"},
                  {label:"Hesitant 😐",q:3,bg:"#3f2a00",border:"#f59e0b"},
                  {label:"Difficult 😓",q:2,bg:"#4a1515",border:"#ef4444"},
                  {label:"Forgot 😔",q:0,bg:"#2d1515",border:"#b91c1c"},
                ].map(({label,q,bg,border}) => (
                  <button key={q} onClick={() => onRecordReview(reviewSurah, q)}
                    style={{background:bg,border:`1px solid ${border}`,borderRadius:10,padding:"12px 8px",
                      color:"#faf7f0",fontSize:13,cursor:"pointer",fontWeight:600,
                      gridColumn: q===0 ? "span 2" : undefined}}>
                    {label}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:48,marginBottom:12}}>
                {reviewDone.quality >= 4 ? "🌟" : reviewDone.quality >= 3 ? "👍" : "💪"}
              </div>
              <div style={{color:"#faf7f0",fontSize:17,fontWeight:700,marginBottom:8}}>
                {reviewDone.quality >= 4 ? "Excellent!" : reviewDone.quality >= 3 ? "Well done!" : "Keep practising!"}
              </div>
              <div style={{color:"#9ca3af",fontSize:13,marginBottom:24}}>
                Next review in <span style={{color:"#c9a84c",fontWeight:700}}>{reviewDone.interval} day{reviewDone.interval>1?"s":""}</span>
                {" "}· Due: <span style={{color:"#c9a84c"}}>{reviewDone.next}</span>
              </div>
              <button onClick={onFinishReview} style={styles.goldBtn}>Done ✓</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{padding:"20px",display:"flex",flexDirection:"column",gap:20}}>
      {/* Due Today */}
      <section>
        <div style={styles.sectionTitle}>
          <span>📅</span> Due Today
          <span style={{marginLeft:"auto",background:"#c9a84c",color:"#0d1a0f",borderRadius:12,
            padding:"2px 10px",fontSize:12,fontWeight:700}}>{dueNums.length}</span>
        </div>
        {memorizedNums.length === 0 ? (
          <div style={styles.emptyCard}>
            <div style={{fontSize:40,marginBottom:12}}>📚</div>
            <div style={{color:"#9ca3af",fontSize:14,textAlign:"center",lineHeight:1.7}}>
              Add surahs you've memorised in the Surahs tab to begin your revision schedule.
            </div>
          </div>
        ) : dueNums.length === 0 ? (
          <div style={styles.emptyCard}>
            <div style={{fontSize:40,marginBottom:12}}>✅</div>
            <div style={{color:"#6ee7b7",fontSize:15,fontWeight:600}}>All caught up!</div>
            <div style={{color:"#9ca3af",fontSize:13,marginTop:4}}>No revisions due today. Bārakallāhu fīk.</div>
          </div>
        ) : (
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {dueNums.map(n => {
              const s = SURAHS[n-1];
              const c = memorized[n];
              return (
                <div key={n} style={styles.dueCard}>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <span style={{fontFamily:"Georgia,serif",fontSize:20,color:"#c9a84c"}}>{s.ar}</span>
                      <span style={{color:"#faf7f0",fontWeight:600,fontSize:15}}>{s.en}</span>
                    </div>
                    <div style={{color:"#6b7280",fontSize:12,marginTop:2}}>
                      {s.v} verses · Rep {c.repetitions || 0} · "{s.meaning}"
                    </div>
                  </div>
                  <button onClick={() => onStartReview(n)} style={styles.reviewBtn}>
                    Recite →
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Upcoming */}
      {memorizedNums.length > 0 && (() => {
        const upcoming = memorizedNums
          .filter(n => memorized[n].nextReview && memorized[n].nextReview > today())
          .sort((a,b) => memorized[a].nextReview.localeCompare(memorized[b].nextReview))
          .slice(0,3);
        if (!upcoming.length) return null;
        return (
          <section>
            <div style={styles.sectionTitle}><span>🔜</span> Coming Up</div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {upcoming.map(n => {
                const s = SURAHS[n-1];
                const days = daysUntil(memorized[n].nextReview);
                return (
                  <div key={n} style={{...styles.dueCard,opacity:0.75}}>
                    <div style={{flex:1}}>
                      <span style={{color:"#faf7f0",fontSize:14,fontWeight:500}}>{s.en}</span>
                      <span style={{color:"#c9a84c",fontSize:12,marginLeft:8}}>({s.ar})</span>
                    </div>
                    <span style={{color:"#6b7280",fontSize:12}}>in {days}d</span>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })()}

      {/* Daily Quiz */}
      <section>
        <div style={styles.sectionTitle}><span>🧠</span> Daily Question</div>
        {memorizedNums.length === 0 ? (
          <div style={styles.emptyCard}>
            <div style={{color:"#6b7280",fontSize:13}}>Add memorised surahs to unlock daily questions.</div>
          </div>
        ) : quizLoading ? (
          <div style={styles.quizCard}>
            <div style={{textAlign:"center",padding:"20px 0"}}>
              <div style={{fontSize:32,marginBottom:12,animation:"spin 1s linear infinite"}}>⚡</div>
              <div style={{color:"#c9a84c",fontFamily:"Georgia,serif",fontSize:14}}>Generating your question...</div>
            </div>
          </div>
        ) : quiz && !quiz.error ? (
          <div style={styles.quizCard}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
              <span style={{background:"rgba(201,168,76,0.15)",color:"#c9a84c",fontSize:10,
                padding:"3px 8px",borderRadius:20,letterSpacing:1,fontWeight:700,textTransform:"uppercase"}}>
                {quiz.type?.replace(/_/g," ") || "Quiz"}
              </span>
            </div>
            <p style={{color:"#faf7f0",fontSize:15,fontWeight:500,lineHeight:1.6,marginBottom:16}}>{quiz.question}</p>
            <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:16}}>
              {Object.entries(quiz.options || {}).map(([k,v]) => {
                const isCorrect = quiz.answer === k;
                const isChosen = quizAnswered === k;
                let bg = "rgba(255,255,255,0.04)";
                let border = "rgba(255,255,255,0.1)";
                let color = "#d1d5db";
                if (quizAnswered) {
                  if (isCorrect) { bg="rgba(34,197,94,0.12)"; border="#22c55e"; color="#6ee7b7"; }
                  else if (isChosen) { bg="rgba(239,68,68,0.12)"; border="#ef4444"; color="#fca5a5"; }
                }
                return (
                  <button key={k} disabled={!!quizAnswered}
                    onClick={() => onAnswer(k)}
                    style={{background:bg,border:`1px solid ${border}`,borderRadius:10,
                      padding:"11px 14px",textAlign:"left",color,cursor:quizAnswered?"default":"pointer",
                      fontSize:13,lineHeight:1.5,transition:"all 0.2s",display:"flex",gap:10,alignItems:"flex-start"}}>
                    <span style={{fontWeight:700,minWidth:18,color:"#c9a84c"}}>{k.toUpperCase()}.</span>
                    <span>{v}</span>
                    {quizAnswered && isCorrect && <span style={{marginLeft:"auto"}}>✓</span>}
                    {quizAnswered && isChosen && !isCorrect && <span style={{marginLeft:"auto"}}>✗</span>}
                  </button>
                );
              })}
            </div>
            {quizAnswered && (
              <div style={{background:"rgba(201,168,76,0.08)",border:"1px solid rgba(201,168,76,0.2)",
                borderRadius:10,padding:"12px 14px",marginBottom:16}}>
                <div style={{fontSize:11,color:"#c9a84c",letterSpacing:1,marginBottom:4}}>EXPLANATION</div>
                <div style={{color:"#d1d5db",fontSize:13,lineHeight:1.6}}>{quiz.explanation}</div>
              </div>
            )}
            <button onClick={onGenerateQuiz} style={{...styles.goldBtn,fontSize:13,padding:"9px 20px"}}>
              {quizAnswered ? "Next Question →" : "New Question"}
            </button>
          </div>
        ) : (
          <div style={styles.quizCard}>
            {quiz?.error && <p style={{color:"#fca5a5",fontSize:13,marginBottom:12}}>Failed to load question.</p>}
            <div style={{textAlign:"center",paddingBottom:8}}>
              <div style={{fontSize:36,marginBottom:12}}>🎯</div>
              <p style={{color:"#9ca3af",fontSize:13,lineHeight:1.7,marginBottom:18}}>
                Test your knowledge with a daily question drawn from your memorised surahs.
              </p>
              <button onClick={onGenerateQuiz} style={styles.goldBtn}>Generate Question ✨</button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

// ── SURAHS TAB ────────────────────────────────────────────────────────────────
function SurahsTab({ memorized, search, setSearch, juzFilter, setJuzFilter, onAdd, onRemove }) {
  const [confirm, setConfirm] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const filtered = SURAHS.filter(s =>
    (!search || s.en.toLowerCase().includes(search.toLowerCase()) ||
      s.ar.includes(search) || s.meaning.toLowerCase().includes(search.toLowerCase()) ||
      String(s.n).includes(search)) &&
    (!juzFilter || s.j === juzFilter)
  );

  const displayed = showAll ? filtered : filtered.slice(0, 30);

  return (
    <div style={{padding:"20px",display:"flex",flexDirection:"column",gap:16}}>
      <input
        value={search} onChange={e => setSearch(e.target.value)}
        placeholder="Search surah..."
        style={styles.searchInput}
      />
      <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
        {[null,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30].map(j => (
          <button key={j??'all'} onClick={() => setJuzFilter(j)}
            style={{...styles.juzBtn, background: juzFilter===j ? "#c9a84c" : "rgba(255,255,255,0.05)",
              color: juzFilter===j ? "#0d1a0f" : "#9ca3af",
              border: juzFilter===j ? "1px solid #c9a84c" : "1px solid rgba(255,255,255,0.1)"}}>
            {j === null ? "All" : `Juz ${j}`}
          </button>
        ))}
      </div>

      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {displayed.map(s => {
          const mem = !!memorized[s.n];
          const card = memorized[s.n];
          const isDue = mem && (!card.nextReview || card.nextReview <= today());
          return (
            <div key={s.n} style={{...styles.surahRow, borderLeft: mem ? "3px solid #c9a84c" : "3px solid transparent"}}>
              <div style={{display:"flex",alignItems:"center",gap:12,flex:1,minWidth:0}}>
                <div style={styles.surahNum}>{s.n}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"baseline",gap:8,flexWrap:"wrap"}}>
                    <span style={{color:"#faf7f0",fontWeight:600,fontSize:14}}>{s.en}</span>
                    <span style={{color:"#c9a84c",fontFamily:"Georgia,serif",fontSize:16}}>{s.ar}</span>
                  </div>
                  <div style={{color:"#6b7280",fontSize:11,marginTop:2}}>
                    {s.meaning} · {s.v}v · Juz {s.j}
                    {mem && card && <span style={{color: isDue ? "#f59e0b" : "#6ee7b7",marginLeft:6}}>
                      {isDue ? "· Due ⚡" : `· Next: ${card.nextReview}`}
                    </span>}
                  </div>
                </div>
              </div>
              {mem ? (
                <button onClick={() => {
                  if (confirm === s.n) { onRemove(s.n); setConfirm(null); }
                  else { setConfirm(s.n); setTimeout(() => setConfirm(c => c===s.n?null:c), 3000); }
                }} style={{...styles.removeBtn, background: confirm===s.n ? "#7f1d1d" : "transparent",
                  borderColor: confirm===s.n ? "#ef4444" : "#374151"}}>
                  {confirm===s.n ? "Confirm?" : "✓ Memorised"}
                </button>
              ) : (
                <button onClick={() => onAdd(s.n)} style={styles.addBtn}>+ Add</button>
              )}
            </div>
          );
        })}
      </div>
      {filtered.length > 30 && !showAll && (
        <button onClick={() => setShowAll(true)} style={{...styles.goldBtn,fontSize:13}}>
          Show all {filtered.length} results
        </button>
      )}
      {filtered.length === 0 && (
        <div style={{textAlign:"center",color:"#6b7280",padding:"40px 0",fontSize:14}}>No surahs found.</div>
      )}
    </div>
  );
}

// ── STATS TAB ─────────────────────────────────────────────────────────────────
function StatsTab({ memorized, memorizedNums, dueNums }) {
  const totalVerses = memorizedNums.reduce((acc,n) => acc + SURAHS[n-1].v, 0);
  const juzCoverage = [...new Set(memorizedNums.map(n => SURAHS[n-1].j))].length;
  const avgInterval = memorizedNums.length
    ? Math.round(memorizedNums.reduce((a,n) => a + (memorized[n].interval||1), 0) / memorizedNums.length)
    : 0;

  const byJuz = {};
  memorizedNums.forEach(n => {
    const j = SURAHS[n-1].j;
    byJuz[j] = (byJuz[j]||0)+1;
  });

  return (
    <div style={{padding:"20px",display:"flex",flexDirection:"column",gap:20}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        {[
          {label:"Surahs",value:memorizedNums.length,sub:"memorised",icon:"📖"},
          {label:"Verses",value:totalVerses,sub:"committed",icon:"✍️"},
          {label:"Due Today",value:dueNums.length,sub:"to review",icon:"⚡"},
          {label:"Juz",value:juzCoverage,sub:"covered",icon:"🗂️"},
        ].map(({label,value,sub,icon}) => (
          <div key={label} style={styles.statCard}>
            <div style={{fontSize:28,marginBottom:4}}>{icon}</div>
            <div style={{fontSize:32,fontWeight:800,color:"#c9a84c",lineHeight:1}}>{value}</div>
            <div style={{fontSize:12,color:"#faf7f0",fontWeight:600,marginTop:2}}>{label}</div>
            <div style={{fontSize:10,color:"#6b7280"}}>{sub}</div>
          </div>
        ))}
      </div>

      <div style={styles.statCard}>
        <div style={styles.sectionTitle} ><span>📈</span> Progress — 114 Surahs</div>
        <div style={{background:"rgba(255,255,255,0.05)",borderRadius:8,height:10,overflow:"hidden",margin:"12px 0"}}>
          <div style={{background:"linear-gradient(90deg,#c9a84c,#f0c040)",height:"100%",
            width:`${(memorizedNums.length/114)*100}%`,borderRadius:8,transition:"width 0.5s"}}/>
        </div>
        <div style={{color:"#9ca3af",fontSize:13,textAlign:"right"}}>{memorizedNums.length}/114 · {Math.round(memorizedNums.length/114*100)}%</div>
      </div>

      {Object.keys(byJuz).length > 0 && (
        <div style={styles.statCard}>
          <div style={styles.sectionTitle}><span>🗂️</span> By Juz</div>
          <div style={{display:"flex",flexDirection:"column",gap:8,marginTop:12}}>
            {Object.entries(byJuz).sort((a,b)=>Number(a[0])-Number(b[0])).map(([j,count]) => {
              const total = SURAHS.filter(s=>s.j===Number(j)).length;
              return (
                <div key={j}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                    <span style={{color:"#d1d5db",fontSize:13}}>Juz {j}</span>
                    <span style={{color:"#c9a84c",fontSize:13}}>{count}/{total}</span>
                  </div>
                  <div style={{background:"rgba(255,255,255,0.05)",borderRadius:4,height:6}}>
                    <div style={{background:"#c9a84c",height:"100%",borderRadius:4,width:`${count/total*100}%`}}/>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {memorizedNums.length > 0 && (
        <div style={styles.statCard}>
          <div style={styles.sectionTitle}><span>🔄</span> Spaced Repetition Health</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginTop:12}}>
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:24,fontWeight:700,color:"#c9a84c"}}>{avgInterval}d</div>
              <div style={{fontSize:11,color:"#6b7280"}}>avg interval</div>
            </div>
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:24,fontWeight:700,color:"#6ee7b7"}}>
                {memorizedNums.filter(n=>(memorized[n].repetitions||0)>=3).length}
              </div>
              <div style={{fontSize:11,color:"#6b7280"}}>well-established</div>
            </div>
          </div>
          <div style={{marginTop:16}}>
            {memorizedNums.sort((a,b)=>(memorized[b].repetitions||0)-(memorized[a].repetitions||0)).slice(0,5).map(n => {
              const s = SURAHS[n-1];
              const c = memorized[n];
              return (
                <div key={n} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",
                  borderBottom:"1px solid rgba(255,255,255,0.04)"}}>
                  <span style={{color:"#c9a84c",fontFamily:"Georgia,serif",fontSize:14,minWidth:60}}>{s.ar}</span>
                  <span style={{color:"#d1d5db",fontSize:12,flex:1}}>{s.en}</span>
                  <span style={{color:"#9ca3af",fontSize:11}}>Rep {c.repetitions||0} · {c.interval||1}d</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {memorizedNums.length === 0 && (
        <div style={styles.emptyCard}>
          <div style={{fontSize:40,marginBottom:12}}>📊</div>
          <div style={{color:"#9ca3af",fontSize:13,textAlign:"center"}}>
            Your stats will appear once you start adding memorised surahs.
          </div>
        </div>
      )}
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = {
  root: {
    background:"#0d1a0f",
    minHeight:"100vh",
    position:"relative",
    fontFamily:"'Segoe UI',system-ui,sans-serif",
  },
  app: {
    maxWidth:480,
    margin:"0 auto",
    minHeight:"100vh",
    display:"flex",
    flexDirection:"column",
    position:"relative",
    zIndex:1,
  },
  header: {
    background:"linear-gradient(135deg,#0d2a18 0%,#0d1a0f 100%)",
    borderBottom:"1px solid rgba(201,168,76,0.2)",
    padding:"16px 20px 14px",
    position:"sticky",
    top:0,
    zIndex:10,
  },
  headerInner:{display:"flex",alignItems:"center",justifyContent:"space-between"},
  headerAr:{fontFamily:"Georgia,serif",fontSize:22,color:"#c9a84c",letterSpacing:1},
  headerEn:{fontSize:11,color:"#6b7280",letterSpacing:2,marginTop:2},
  badge:{textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",
    background:"rgba(201,168,76,0.08)",borderRadius:12,padding:"8px 16px",
    border:"1px solid rgba(201,168,76,0.15)"},
  content:{flex:1,overflowY:"auto",paddingBottom:80},
  nav:{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",
    width:"100%",maxWidth:480,
    background:"#0d1a0f",borderTop:"1px solid rgba(255,255,255,0.06)",
    display:"flex",zIndex:20},
  navBtn:{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4,
    padding:"10px 0 12px",background:"transparent",border:"none",cursor:"pointer",
    transition:"all 0.15s"},
  sectionTitle:{display:"flex",alignItems:"center",gap:8,
    color:"#c9a84c",fontSize:13,fontWeight:700,letterSpacing:1,
    marginBottom:12,textTransform:"uppercase"},
  emptyCard:{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)",
    borderRadius:16,padding:"30px 20px",display:"flex",flexDirection:"column",
    alignItems:"center",textAlign:"center"},
  reviewCard:{background:"linear-gradient(135deg,#0d2a18,#0d1a0f)",
    border:"1px solid rgba(201,168,76,0.25)",borderRadius:20,padding:24},
  dueCard:{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",
    borderRadius:14,padding:"14px 16px",display:"flex",alignItems:"center",gap:12},
  reviewBtn:{background:"rgba(201,168,76,0.15)",border:"1px solid rgba(201,168,76,0.3)",
    borderRadius:10,padding:"8px 14px",color:"#c9a84c",fontSize:13,fontWeight:600,cursor:"pointer",
    whiteSpace:"nowrap"},
  quizCard:{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(201,168,76,0.15)",
    borderRadius:18,padding:20},
  goldBtn:{background:"linear-gradient(135deg,#c9a84c,#e8c55a)",color:"#0d1a0f",
    border:"none",borderRadius:12,padding:"12px 24px",fontSize:15,fontWeight:700,
    cursor:"pointer",width:"100%"},
  searchInput:{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",
    borderRadius:12,padding:"12px 16px",color:"#faf7f0",fontSize:14,width:"100%",
    boxSizing:"border-box",outline:"none"},
  juzBtn:{fontSize:11,padding:"4px 10px",borderRadius:20,cursor:"pointer",fontWeight:600,
    whiteSpace:"nowrap"},
  surahRow:{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)",
    borderRadius:12,padding:"12px 14px",display:"flex",alignItems:"center",gap:10},
  surahNum:{minWidth:28,height:28,borderRadius:8,background:"rgba(201,168,76,0.1)",
    display:"flex",alignItems:"center",justifyContent:"center",
    color:"#c9a84c",fontSize:12,fontWeight:700},
  addBtn:{background:"rgba(201,168,76,0.1)",border:"1px solid rgba(201,168,76,0.25)",
    borderRadius:8,padding:"6px 12px",color:"#c9a84c",fontSize:12,fontWeight:600,
    cursor:"pointer",whiteSpace:"nowrap"},
  removeBtn:{borderRadius:8,padding:"6px 10px",fontSize:11,fontWeight:600,
    cursor:"pointer",whiteSpace:"nowrap",border:"1px solid",color:"#6b7280",
    transition:"all 0.2s"},
  statCard:{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)",
    borderRadius:16,padding:18},
  toast:{position:"fixed",top:20,left:"50%",transform:"translateX(-50%)",
    color:"#faf7f0",padding:"10px 20px",borderRadius:12,fontSize:13,fontWeight:600,
    zIndex:100,boxShadow:"0 4px 20px rgba(0,0,0,0.4)",whiteSpace:"nowrap"},
};
