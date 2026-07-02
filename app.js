/* =========================================================
   DATOS BASE: TIEMPOS VERBALES Y CONDICIONALES
========================================================= */
const tenses = [
  // --- Presentes ---
  {
    id: "present-simple", name: "Present Simple", level: "Base",
    summary: "Hábitos, rutinas, verdades generales, estados y horarios.",
    structures: {
      affirmative: "Subject + base verb / verb + s-es with he, she, it",
      negative: "Subject + do/does not + base verb",
      question: "Do/Does + subject + base verb?"
    },
    uses: ["Acciones habituales", "Opiniones", "Situaciones permanentes", "Verdades generales"],
    examples: [
      ["I usually get up at 7 o’clock.", "Normalmente me levanto a las 7."],
      ["The Earth goes around the Sun.", "La Tierra gira alrededor del Sol."]
    ],
    prompt: "Write a paragraph about your daily routine. Use frequency adverbs."
  },
  {
    id: "present-continuous", name: "Present Continuous", level: "Base",
    summary: "Acciones que ocurren ahora, situaciones temporales y planes cercanos.",
    structures: {
      affirmative: "Subject + am/is/are + verb + ing",
      negative: "Subject + am/is/are + not + verb + ing",
      question: "Wh + am/is/are + subject + verb + ing?"
    },
    uses: ["Acción actual", "Situación temporal", "Plan futuro cercano"],
    examples: [
      ["She is studying hard for her exam.", "Ella está estudiando mucho para su examen."],
      ["I am working until 9 p.m. this week.", "Estoy trabajando hasta las 21 esta semana."]
    ],
    prompt: "Describe what is happening around you right now."
  },
  {
    id: "present-perfect", name: "Present Perfect", level: "Intermedio",
    summary: "Acciones pasadas con conexión al presente: experiencia, resultado o duración.",
    structures: {
      affirmative: "Subject + have/has + past participle",
      negative: "Subject + have/has not + past participle",
      question: "Have/Has + subject + past participle?"
    },
    uses: ["Experiencia", "Resultado actual", "Acción con for/since"],
    examples: [
      ["I have been here for two hours.", "Estoy acá desde hace dos horas."],
      ["The postman hasn’t come yet.", "El cartero todavía no llegó."]
    ],
    prompt: "Write about experiences you have had in your life."
  },
  {
    id: "present-perfect-continuous", name: "Present Perfect Continuous", level: "Intermedio",
    summary: "Duración de una acción que empezó en el pasado y continúa o tiene efecto ahora.",
    structures: {
      affirmative: "Subject + have/has been + verb + ing",
      negative: "Subject + have/has not been + verb + ing",
      question: "Have/Has + subject + been + verb + ing?"
    },
    uses: ["Duración hasta el presente", "Acción reciente con evidencia"],
    examples: [
      ["I have been waiting for the bus for a long time.", "Hace mucho que estoy esperando el colectivo."]
    ],
    prompt: "Write about something you have been doing for weeks."
  },

  // --- Pasados ---
  {
    id: "past-simple", name: "Past Simple", level: "Base",
    summary: "Acciones terminadas en un momento específico del pasado.",
    structures: {
      affirmative: "Subject + past verb",
      negative: "Subject + did not + base verb",
      question: "Did + subject + base verb?"
    },
    uses: ["Acción terminada", "Secuencia de eventos"],
    examples: [
      ["I went to Paris last year.", "Fui a París el año pasado."],
      ["They didn’t drive to work.", "No fueron al trabajo en auto."]
    ],
    prompt: "Write about a memorable day from your past."
  },
  {
    id: "past-continuous", name: "Past Continuous", level: "Base",
    summary: "Acciones en progreso en un momento del pasado.",
    structures: {
      affirmative: "Subject + was/were + verb + ing",
      negative: "Subject + was/were not + verb + ing",
      question: "Wh + was/were + subject + verb + ing?"
    },
    uses: ["Acción en progreso en pasado", "Acción larga interrumpida"],
    examples: [
      ["I was studying all day yesterday.", "Estuve estudiando todo el día ayer."],
      ["At midnight we were driving home.", "A medianoche estábamos manejando a casa."]
    ],
    prompt: "Write a short story about what you were doing when something unexpected happened."
  },
  {
    id: "past-perfect", name: "Past Perfect", level: "Intermedio",
    summary: "Acción que ocurrió antes de otra acción pasada.",
    structures: {
      affirmative: "Subject + had + past participle",
      negative: "Subject + had not + past participle",
      question: "Had + subject + past participle?"
    },
    uses: ["Acción anterior a otra pasada", "Narración"],
    examples: [
      ["She had cooked lunch before she went to work.", "Ella había cocinado antes de ir al trabajo."]
    ],
    prompt: "Write a story where one past action happened before another."
  },
  {
    id: "past-perfect-continuous", name: "Past Perfect Continuous", level: "Avanzado",
    summary: "Duración de una acción antes de otro momento pasado.",
    structures: {
      affirmative: "Subject + had been + verb + ing",
      negative: "Subject + had not been + verb + ing",
      question: "Had + subject + been + verb + ing?"
    },
    uses: ["Duración antes de otro pasado", "Causa visible en pasado"],
    examples: [
      ["We had been waiting for hours when the train arrived.", "Habíamos estado esperando durante horas cuando llegó el tren."]
    ],
    prompt: "Describe a past situation where an action had been happening for a long time."
  },

  // --- Futuros ---
  {
    id: "future-simple", name: "Future Simple", level: "Base",
    summary: "Decisiones espontáneas, predicciones, promesas y ofrecimientos.",
    structures: {
      affirmative: "Subject + will + base verb",
      negative: "Subject + will not + base verb",
      question: "Will + subject + base verb?"
    },
    uses: ["Predicciones", "Promesas", "Decisiones espontáneas"],
    examples: [
      ["I’ll help you.", "Te voy a ayudar."],
      ["She won’t win the game.", "Ella no ganará el juego."]
    ],
    prompt: "Write predictions about your future. Use will."
  },
  {
    id: "going-to", name: "Going to", level: "Base",
    summary: "Planes, intenciones y predicciones con evidencia presente.",
    structures: {
      affirmative: "Subject + am/is/are + going to + base verb",
      negative: "Subject + am/is/are not + going to + base verb",
      question: "Am/Is/Are + subject + going to + base verb?"
    },
    uses: ["Planes futuros", "Predicciones con evidencia"],
    examples: [
      ["I’m going to study languages.", "Voy a estudiar idiomas."],
      ["It’s going to rain.", "Va a llover."]
    ],
    prompt: "Write about your plans for the next six months."
  },
  {
    id: "future-continuous", name: "Future Continuous", level: "Intermedio",
    summary: "Acción que estará en progreso en un momento futuro.",
    structures: {
      affirmative: "Subject + will be + verb + ing",
      negative: "Subject + will not be + verb + ing",
      question: "Will + subject + be + verb + ing?"
    },
    uses: ["Acción futura en progreso", "Planes como proceso"],
    examples: [
      ["Next Friday I will be travelling to London.", "El próximo viernes estaré viajando a Londres."]
    ],
    prompt: "Write about what you will be doing at this time tomorrow."
  },
  {
    id: "future-perfect", name: "Future Perfect", level: "Avanzado",
    summary: "Acción que estará terminada antes de un punto futuro.",
    structures: {
      affirmative: "Subject + will have + past participle",
      negative: "Subject + will not have + past participle",
      question: "Will + subject + have + past participle?"
    },
    uses: ["Acción completada antes de un futuro", "Metas cumplidas"],
    examples: [
      ["We will have finished the project by tomorrow.", "Habremos terminado el proyecto para mañana."]
    ],
    prompt: "Write about goals you will have achieved by the end of the year."
  },
  {
    id: "future-perfect-continuous", name: "Future Perfect Continuous", level: "Avanzado",
    summary: "Duración de una acción hasta un punto específico del futuro.",
    structures: {
      affirmative: "Subject + will have been + verb + ing",
      negative: "Subject + will not have been + verb + ing",
      question: "Will + subject + have been + verb + ing?"
    },
    uses: ["Duración hasta un punto futuro", "Proyección avanzada"],
    examples: [
      ["I will have been working here for ten years next month.", "El mes que viene habré estado trabajando acá durante diez años."]
    ],
    prompt: "Write about something you will have been doing for a long time by a future date."
  },

  // --- NUEVO: Condicionales ---
  {
    id: "zero-conditional", name: "Zero Conditional", level: "Base",
    summary: "Verdades generales, hechos científicos o leyes naturales.",
    structures: {
      affirmative: "If + Present Simple, Present Simple",
      negative: "If + don't/doesn't + verb, don't/doesn't + verb",
      question: "What happens if + Present Simple?"
    },
    uses: ["Hechos inmutables", "Verdades científicas", "Causa y efecto directo"],
    examples: [
      ["If you heat ice, it melts.", "Si calentás hielo, se derrite."],
      ["If I eat peanuts, I get sick.", "Si como maní, me enfermo."]
    ],
    prompt: "Write about general facts using the Zero Conditional (If + present, present)."
  },
  {
    id: "first-conditional", name: "First Conditional", level: "Intermedio",
    summary: "Situaciones reales o muy probables en el futuro.",
    structures: {
      affirmative: "If + Present Simple, will + base verb",
      negative: "If + Present Simple, won't + base verb",
      question: "What will happen if + Present Simple?"
    },
    uses: ["Posibilidades futuras", "Advertencias", "Promesas condicionadas"],
    examples: [
      ["If it rains, we will stay at home.", "Si llueve, nos quedaremos en casa."],
      ["If she studies hard, she will pass the exam.", "Si ella estudia mucho, aprobará."]
    ],
    prompt: "Write about your plans depending on weather or time using First Conditional."
  },
  {
    id: "second-conditional", name: "Second Conditional", level: "Avanzado",
    summary: "Situaciones hipotéticas, imaginarias o poco probables en el presente/futuro.",
    structures: {
      affirmative: "If + Past Simple, would + base verb",
      negative: "If + Past Simple, wouldn't + base verb",
      question: "What would you do if + Past Simple?"
    },
    uses: ["Situaciones irreales", "Deseos improbables", "Dar consejos (If I were you)"],
    examples: [
      ["If I won the lottery, I would travel the world.", "Si ganara la lotería, viajaría por el mundo."],
      ["If I were you, I would study more.", "Si yo fuera vos, estudiaría más."]
    ],
    prompt: "Write about what you would do if you had a million dollars."
  },
  {
    id: "third-conditional", name: "Third Conditional", level: "Avanzado",
    summary: "Situaciones irreales en el pasado. Se usa para arrepentimientos o escenarios que no ocurrieron.",
    structures: {
      affirmative: "If + Past Perfect, would have + past participle",
      negative: "If + Past Perfect, wouldn't have + past participle",
      question: "What would have happened if + Past Perfect?"
    },
    uses: ["Arrepentimientos", "Situaciones hipotéticas pasadas"],
    examples: [
      ["If I had studied harder, I would have passed.", "Si hubiera estudiado más, habría aprobado."],
      ["We wouldn't have missed the flight if we had woken up earlier.", "No habríamos perdido el vuelo si nos hubiéramos despertado antes."]
    ],
    prompt: "Write about a past mistake and how things would have been different."
  }
];

/* =========================================================
   DATOS NUEVOS: PHRASALS Y MODALES (Extraídos de las fotos)
========================================================= */
const phrasalVerbs = [
  { verb: "pick up", meaning: "levantar, recoger", example: "She picked up the book from the floor." },
  { verb: "turn on / turn off", meaning: "encender / apagar", example: "Turn off the lights before you leave." },
  { verb: "look for", meaning: "buscar", example: "I’m looking for my keys." },
  { verb: "find out", meaning: "descubrir, averiguar", example: "I found out the truth yesterday." },
  { verb: "give up", meaning: "rendirse, dejar de hacer algo", example: "Don’t give up on your dreams." },
  { verb: "put on / take off", meaning: "ponerse / quitarse (ropa)", example: "He put on his jacket." },
  { verb: "run out of", meaning: "quedarse sin", example: "We ran out of milk." },
  { verb: "come back", meaning: "regresar", example: "She came back home late." },
  { verb: "get along (with)", meaning: "llevarse bien", example: "I get along with my coworkers." },
  { verb: "set up", meaning: "organizar, montar", example: "They set up a new company." },
  { verb: "take care of", meaning: "cuidar", example: "She takes care of her little brother." },
  { verb: "wake up", meaning: "despertarse", example: "I wake up at 7 a.m." },
  { verb: "carry on", meaning: "continuar", example: "Carry on with your work." },
  { verb: "check out", meaning: "revisar, mirar", example: "Check out this new song." },
  { verb: "break down", meaning: "averiarse, descomponerse", example: "My car broke down yesterday." },
  { verb: "bring up", meaning: "sacar un tema, mencionar", example: "She brought up an interesting point." },
  { verb: "call off", meaning: "cancelar", example: "They called off the meeting." },
  { verb: "come across", meaning: "encontrarse con algo/alguien", example: "I came across an old photo." },
  { verb: "drop off", meaning: "dejar a alguien en un lugar", example: "He dropped me off at the station." },
  { verb: "get over", meaning: "superar (una enfermedad, problema)", example: "It took her weeks to get over the flu." },
  { verb: "go on", meaning: "continuar", example: "Please, go on with your story." },
  { verb: "look after", meaning: "cuidar", example: "She looks after her grandmother." },
  { verb: "make up", meaning: "inventar / reconciliarse", example: "He made up an excuse. / They made up after the fight." },
  { verb: "put off", meaning: "posponer", example: "We had to put off the trip." },
  { verb: "show up", meaning: "aparecer, presentarse", example: "He didn’t show up to class." },
  { verb: "take up", meaning: "empezar una actividad", example: "She took up painting last year." },
  { verb: "work out", meaning: "hacer ejercicio / resolver", example: "I work out three times a week. / We worked out the problem." },
  { verb: "hand in", meaning: "entregar (tarea, documento)", example: "Please hand in your homework." },
  { verb: "look forward to", meaning: "esperar con ilusión", example: "I look forward to meeting you." },
  { verb: "turn up", meaning: "aparecer / subir volumen", example: "She turned up unexpectedly. / Turn up the radio." },
  { verb: "take off", meaning: "despegar (además de quitarse ropa)", example: "The plane took off at 9 a.m." },
  { verb: "put up with", meaning: "tolerar", example: "I can’t put up with the noise." },
  { verb: "break up", meaning: "terminar relación", example: "They broke up last month." },
  { verb: "catch up (with)", meaning: "ponerse al día", example: "I need to catch up with my studies." },
  { verb: "hold on", meaning: "esperar", example: "Hold on a minute, please." },
  { verb: "keep up (with)", meaning: "mantener el ritmo", example: "She runs fast, I can’t keep up with her." },
  { verb: "take over", meaning: "asumir control", example: "He took over the family business." },
  { verb: "turn down", meaning: "rechazar / bajar volumen", example: "She turned down the job offer. / Turn down the TV." },
  { verb: "write down", meaning: "anotar", example: "Write down the phone number." },
  { verb: "to put away", meaning: "guardar", example: "I had to put away everything / the groceries." }
];

const modalVerbs = [
  { word: "Can / Could", meaning: "(Poder / Podría)" },
  { word: "Want to / Would like to", meaning: "(Querer / Gustaría)" },
  { word: "Do / Does / Did", meaning: "(Hacer - auxiliar y acción)" },
  { word: "Make", meaning: "(Hacer – crear - Tomar)" },
  { word: "Have to / Must", meaning: "(Tener que / Deber)" },
  { word: "Had to", meaning: "(Tuvo que)" },
  { word: "Should / Ought to", meaning: "(Debería) / (Debería) formal" },
  { word: "May / Might", meaning: "(Poder - posibilidad/permiso)" },
  { word: "Shall", meaning: "(Debería/Haré - formal)" },
  { word: "Wish", meaning: "(Ojalá / Deseo)" },
  { word: "Hope", meaning: "Espero que" },
  { word: "Would rather", meaning: "Preferiría" },
  { word: "Might", meaning: "Capaz / Tal vez" },
  { word: "Had better", meaning: "Más vale que" },
  { word: "Thus", meaning: "Entonces" },
  { word: "Often", meaning: "A menudo" },
  { word: "Huge", meaning: "Enorme" },
  { word: "Loss", meaning: "Perdida" },
  { word: "Improve my skills", meaning: "Mejorar mis habilidades" },
  { word: "Shape", meaning: "Estar en forma" },
  { word: "Enhancing", meaning: "Mejorando" },
  { word: "Following", meaning: "Siguiente" },
  { word: "Kind", meaning: "Tipos /// Amable" },
  { word: "Then", meaning: "Entonces" },
  { word: "To realize", meaning: "Me di cuenta" },
  { word: "Despite / Even though", meaning: "A pesar de" },
  { word: "It seemed", meaning: "Parecía" },
  { word: "Although / Even though", meaning: "Aunque" },
  { word: "Because of", meaning: "Debido a" },
  { word: "I used to", meaning: "Solía" },
  { word: "Be able to", meaning: "Voy a poder" }
];

const ieltsPrompts = {
  4: [
    "Describe your daily routine. Write 80–120 words. Use simple present and basic connectors.",
    "Write about your last holiday. Write 80–120 words. Use Past Simple.",
    "Describe your city. Write 80–120 words. Use there is / there are and Present Simple."
  ],
  6: [
    "Some people believe that learning English is essential for work. To what extent do you agree? Write one paragraph.",
    "Describe a recent change in your routine and explain whether it has been positive or negative.",
    "Many students prefer online learning. Explain one advantage and one disadvantage."
  ],
  7: [
    "Some people argue that technology improves education, while others think it reduces concentration. Discuss both views in one strong paragraph.",
    "Write a paragraph comparing traditional classrooms and online education. Use contrast connectors.",
    "Explain why discipline and consistency are important when learning a language."
  ],
  8: [
    "To what extent can artificial intelligence transform language learning without replacing human teachers? Write a sophisticated paragraph.",
    "Discuss the relationship between long-term motivation and measurable progress in language acquisition.",
    "Evaluate whether international exams such as IELTS measure real communicative competence effectively."
  ]
};

// ==========================================
// REFERENCIAS DOM Y ESTADOS GLOBALES
// ==========================================
const tenseGrid = document.getElementById("tenseGrid");
const tenseSearch = document.getElementById("tenseSearch");
const detailTitle = document.getElementById("detailTitle");
const detailSummary = document.getElementById("detailSummary");
const detailLevel = document.getElementById("detailLevel");
const affirmativeStructure = document.getElementById("affirmativeStructure");
const negativeStructure = document.getElementById("negativeStructure");
const questionStructure = document.getElementById("questionStructure");
const usageList = document.getElementById("usageList");
const examplesList = document.getElementById("examplesList");

const ieltsLevel = document.getElementById("ieltsLevel");
const practiceTense = document.getElementById("practiceTense");
const practicePrompt = document.getElementById("practicePrompt");
const practiceText = document.getElementById("practiceText");
const wordCounter = document.getElementById("wordCounter");
const newPromptBtn = document.getElementById("newPromptBtn");
const clearTextBtn = document.getElementById("clearTextBtn");
const saveParagraphBtn = document.getElementById("saveParagraphBtn");
const aiCorrectBtn = document.getElementById("aiCorrectBtn");
const aiFeedback = document.getElementById("aiFeedback");

const examSelector = document.getElementById("examSelector");
const quizContainer = document.getElementById("quizContainer");
const submitQuizBtn = document.getElementById("submitQuizBtn");
const resetQuizBtn = document.getElementById("resetQuizBtn");
const quizResult = document.getElementById("quizResult");
const quizProgress = document.getElementById("quizProgress");

const savedParagraphsList = document.getElementById("savedParagraphsList");
const clearParagraphsBtn = document.getElementById("clearParagraphsBtn");

const noteTitle = document.getElementById("noteTitle");
const noteText = document.getElementById("noteText");
const saveNoteBtn = document.getElementById("saveNoteBtn");
const clearNoteEditorBtn = document.getElementById("clearNoteEditorBtn");
const clearNotesBtn = document.getElementById("clearNotesBtn");
const notesList = document.getElementById("notesList");

const navLinks = document.querySelectorAll("#mainNav .nav-link");
const sections = document.querySelectorAll("main section[id]");
const revealElements = document.querySelectorAll(".reveal");

// Progreso
let paragraphs = JSON.parse(localStorage.getItem("englishTrainerParagraphs")) || [];
let notes = JSON.parse(localStorage.getItem("englishTrainerNotes")) || [];
let accumulatedStudyMins = parseInt(localStorage.getItem("englishTrainerStudyMins")) || 0;
let examsCompleted = parseInt(localStorage.getItem("englishTrainerExamsCount")) || 0;
let averageScore = parseInt(localStorage.getItem("englishTrainerAvgScore")) || 0;

let selectedTenseId = tenses[0].id;
let currentQuiz = [];

// ==========================================
// 1. SISTEMA DE RUTEO (VIEWS)
// ==========================================
const appView = document.getElementById("appView");
const resourcesView = document.getElementById("resourcesView");
const navToResourcesBtn = document.getElementById("navToResources");
const backToAppBtn = document.getElementById("backToAppBtn");

navToResourcesBtn.addEventListener("click", () => showView('resources'));
backToAppBtn.addEventListener("click", () => showView('app'));

// Manejo de botones internos que piden ir a recursos
document.querySelectorAll(".open-resources-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const targetTab = btn.getAttribute("data-target");
    showView('resources');
    activateResourceTab(targetTab);
  });
});

function showView(viewName) {
  if (viewName === 'resources') {
    appView.classList.remove('active-view');
    resourcesView.classList.add('active-view');
    window.scrollTo(0,0);
  } else {
    resourcesView.classList.remove('active-view');
    appView.classList.add('active-view');
    window.scrollTo(0,0);
  }
}

// TABS DENTRO DE RESOURCES
const resourceTabs = document.querySelectorAll(".resource-tab");
const resourcePanes = document.querySelectorAll(".resource-pane");

resourceTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    activateResourceTab(tab.getAttribute("data-tab"));
  });
});

function activateResourceTab(tabId) {
  resourceTabs.forEach(t => t.classList.remove("active"));
  resourcePanes.forEach(p => p.classList.remove("active-pane"));
  
  const selectedTab = document.querySelector(`.resource-tab[data-tab="${tabId}"]`);
  const selectedPane = document.getElementById(`tab-${tabId}`);
  
  if(selectedTab) selectedTab.classList.add("active");
  if(selectedPane) selectedPane.classList.add("active-pane");
}

// ==========================================
// 2. SISTEMA DE PROGRESO Y TIMER (RELOJ ANALÓGICO)
// ==========================================

// Trackeo silencioso cada minuto que la página esté abierta
setInterval(() => {
  accumulatedStudyMins++;
  localStorage.setItem("englishTrainerStudyMins", accumulatedStudyMins);
  updateProgressBars();
}, 60000);

function updateProgressBars() {
  document.getElementById("studyTimeText").textContent = `${accumulatedStudyMins} min`;
  const timePercent = Math.min((accumulatedStudyMins / 600) * 100, 100); // Meta 10 horas
  document.getElementById("studyTimeBar").style.width = `${timePercent}%`;

  document.getElementById("quizAvgText").textContent = examsCompleted > 0 ? `${examsCompleted} tests (${averageScore}%)` : `0 tests`;
  const quizPercent = Math.min((examsCompleted / 50) * 100, 100); // Meta 50 exams
  document.getElementById("quizAvgBar").style.width = `${quizPercent}%`;

  document.getElementById("writingCountText").textContent = paragraphs.length;
  const writePercent = Math.min((paragraphs.length / 20) * 100, 100); // Meta 20 textos
  document.getElementById("writingCountBar").style.width = `${writePercent}%`;
}

// Lógica del Timer Analógico
const timerToggleBtn = document.getElementById("timerToggleBtn");
const timerPanel = document.getElementById("timerPanel");
const closeTimerBtn = document.getElementById("closeTimerBtn");
const secHand = document.getElementById("secHand");
const minHand = document.getElementById("minHand");
const timerText = document.getElementById("timerText");
const stopTimerBtn = document.getElementById("stopTimerBtn");
let countdownInterval;
let totalSecondsLeft = 0;

timerToggleBtn.addEventListener("click", () => timerPanel.classList.add("open"));
closeTimerBtn.addEventListener("click", () => timerPanel.classList.remove("open"));

document.querySelectorAll(".preset-btn").forEach(btn => {
  btn.addEventListener("click", () => startFocusTimer(parseInt(btn.getAttribute("data-mins"))));
});

document.getElementById("startCustomTimerBtn").addEventListener("click", () => {
  const custom = parseInt(document.getElementById("customMins").value);
  if (custom > 0) startFocusTimer(custom);
});

stopTimerBtn.addEventListener("click", () => {
  clearInterval(countdownInterval);
  totalSecondsLeft = 0;
  updateClockUI();
});

function startFocusTimer(minutes) {
  clearInterval(countdownInterval);
  totalSecondsLeft = minutes * 60;
  updateClockUI();
  
  countdownInterval = setInterval(() => {
    totalSecondsLeft--;
    updateClockUI();
    
    if (totalSecondsLeft <= 0) {
      clearInterval(countdownInterval);
      alert("¡Tiempo cumplido! Excelente sesión de foco.");
      // Sumamos al progreso
      accumulatedStudyMins += minutes;
      localStorage.setItem("englishTrainerStudyMins", accumulatedStudyMins);
      updateProgressBars();
    }
  }, 1000);
}

function updateClockUI() {
  if (totalSecondsLeft <= 0) {
    timerText.textContent = "00:00";
    secHand.style.transform = `translateX(-50%) rotate(0deg)`;
    minHand.style.transform = `translateX(-50%) rotate(0deg)`;
    return;
  }
  
  const m = Math.floor(totalSecondsLeft / 60);
  const s = totalSecondsLeft % 60;
  
  timerText.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  
  // Rotación suave del reloj
  const secDeg = (s / 60) * 360;
  // El minutero avanza ligeramente según los segundos
  const minDeg = ((m + s/60) / 60) * 360; 
  
  secHand.style.transform = `translateX(-50%) rotate(${secDeg}deg)`;
  minHand.style.transform = `translateX(-50%) rotate(${minDeg}deg)`;
}


// ==========================================
// 3. TABLAS DE RECURSOS (INYECTADAS)
// ==========================================
function renderResourcesTables() {
  const pBody = document.getElementById("phrasalTableBody");
  pBody.innerHTML = phrasalVerbs.map(p => `
    <tr>
      <td>${p.verb}</td>
      <td>${p.meaning}</td>
      <td><em>${p.example}</em></td>
    </tr>
  `).join("");

  const mBody = document.getElementById("modalsTableBody");
  mBody.innerHTML = modalVerbs.map(m => `
    <tr>
      <td>${m.word}</td>
      <td>${m.meaning}</td>
    </tr>
  `).join("");
}

// ==========================================
// 4. TIEMPOS VERBALES Y GRAMÁTICA
// ==========================================
function renderTenseCards(filter = "") {
  tenseGrid.innerHTML = "";
  const normalizedFilter = filter.toLowerCase().trim();

  const filteredTenses = tenses.filter((tense) => {
    return (
      tense.name.toLowerCase().includes(normalizedFilter) ||
      tense.level.toLowerCase().includes(normalizedFilter) ||
      tense.summary.toLowerCase().includes(normalizedFilter)
    );
  });

  filteredTenses.forEach((tense) => {
    const card = document.createElement("article");
    card.className = `tense-card ${tense.id === selectedTenseId ? "active" : ""}`;
    card.dataset.id = tense.id;

    card.innerHTML = `
      <div>
        <h4>${tense.name}</h4>
        <p>${tense.summary}</p>
      </div>
      <div class="card-bottom">
        <span class="level-tag">${tense.level}</span>
      </div>
    `;

    card.addEventListener("click", () => {
      selectedTenseId = tense.id;
      renderTenseCards(tenseSearch.value);
      renderTenseDetail(tense.id);
      setPracticeTense(tense.id);
      document.getElementById("estructura").scrollIntoView({ behavior: "smooth", block: "start" });
    });

    tenseGrid.appendChild(card);
  });
}

function renderTenseDetail(tenseId) {
  const tense = tenses.find((item) => item.id === tenseId);
  if (!tense) return;

  detailTitle.textContent = tense.name;
  detailSummary.textContent = tense.summary;
  detailLevel.textContent = tense.level;
  affirmativeStructure.textContent = tense.structures.affirmative;
  negativeStructure.textContent = tense.structures.negative;
  questionStructure.textContent = tense.structures.question;

  usageList.innerHTML = "";
  tense.uses.forEach((use) => {
    const li = document.createElement("li");
    li.textContent = use;
    usageList.appendChild(li);
  });

  examplesList.innerHTML = "";
  tense.examples.forEach(([english, spanish]) => {
    const example = document.createElement("article");
    example.className = "example-item";
    example.innerHTML = `<strong>${english}</strong><span>${spanish}</span>`;
    examplesList.appendChild(example);
  });
}

// ==========================================
// 5. WRITING Y CORRECCIÓN IA
// ==========================================
function renderPracticeOptions() {
  practiceTense.innerHTML = "";
  tenses.forEach((tense) => {
    const option = document.createElement("option");
    option.value = tense.id;
    option.textContent = tense.name;
    practiceTense.appendChild(option);
  });
  setPracticeTense(selectedTenseId);
}

function setPracticeTense(tenseId) {
  const tense = tenses.find((item) => item.id === tenseId);
  if (!tense) return;
  practiceTense.value = tense.id;
  generatePrompt();
}

function generatePrompt() {
  const level = ieltsLevel.value;
  const prompts = ieltsPrompts[level];
  const tense = tenses.find((item) => item.id === practiceTense.value);
  const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
  practicePrompt.textContent = `${randomPrompt} Try to include: ${tense.name}.`;
}

function updateWordCounter() {
  const words = getWords(practiceText.value);
  wordCounter.textContent = `${words.length} palabra${words.length === 1 ? "" : "s"}`;
}

function saveParagraph() {
  const text = practiceText.value.trim();
  if (!text) { alert("Escribí un texto antes de guardarlo."); return; }

  const tense = tenses.find((item) => item.id === practiceTense.value);
  const newParagraph = {
    id: createId(),
    title: `Writing practice · ${tense.name}`,
    tense: tense.name,
    date: new Date().toLocaleDateString("es-AR"),
    text
  };

  paragraphs.unshift(newParagraph);
  localStorage.setItem("englishTrainerParagraphs", JSON.stringify(paragraphs));
  updateProgressBars();
  practiceText.value = "";
  updateWordCounter();
  renderParagraphs();
  
  // Avisar éxito
  alert("¡Párrafo guardado exitosamente en tu Biblioteca!");
}

function renderParagraphs() {
  savedParagraphsList.innerHTML = "";
  if (paragraphs.length === 0) {
    savedParagraphsList.innerHTML = `<div class="empty-state">Todavía no guardaste párrafos.</div>`;
    return;
  }
  paragraphs.forEach((p) => {
    const article = document.createElement("article");
    article.className = "saved-item";
    article.innerHTML = `
      <div class="saved-meta">
        <div>
          <strong>${escapeHTML(p.title)}</strong>
          <span>${escapeHTML(p.date)} · ${escapeHTML(p.tense)}</span>
        </div>
      </div>
      <p>${escapeHTML(p.text)}</p>
      <div class="item-actions">
        <button class="small-danger-btn" type="button" data-delete-paragraph="${p.id}">Borrar párrafo</button>
      </div>
    `;
    savedParagraphsList.appendChild(article);
  });
}

function deleteParagraph(id) {
  paragraphs = paragraphs.filter((p) => p.id !== id);
  localStorage.setItem("englishTrainerParagraphs", JSON.stringify(paragraphs));
  updateProgressBars();
  renderParagraphs();
}

function runAICorrection() {
  const text = practiceText.value.trim();
  if (!text) { alert("Escribí un párrafo antes de corregirlo."); return; }

  const words = getWords(text);
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const lower = text.toLowerCase();
  const connectors = ["however", "therefore", "moreover", "although", "because", "while", "whereas", "in addition", "for example", "as a result", "on the other hand", "nevertheless"];
  const foundConnectors = connectors.filter((c) => lower.includes(c));
  const selectedLevel = Number(ieltsLevel.value);

  let band = 5;
  if (words.length >= 80) band += 0.5;
  if (words.length >= 130) band += 0.5;
  if (sentences.length >= 4) band += 0.5;
  if (foundConnectors.length >= 2) band += 0.5;
  if (foundConnectors.length >= 4) band += 0.5;
  if (hasComplexSentence(text)) band += 0.5;
  if (words.length < 60) band -= 0.75;
  if (selectedLevel >= 7 && foundConnectors.length < 3) band -= 0.5;

  const detectedIssues = detectCommonIssues(text);
  band -= detectedIssues.length * 0.25;
  band = Math.max(4, Math.min(8.5, Math.round(band * 2) / 2));

  const correctedText = createCorrectedVersion(text);
  const strengths = [];
  if (words.length >= 80) strengths.push("Tu párrafo ya tiene una extensión razonable.");
  else strengths.push("La idea inicial se entiende, pero necesita más desarrollo.");
  if (foundConnectors.length > 0) strengths.push(`Usaste conectores útiles como ${foundConnectors.slice(0, 3).join(", ")}.`);
  else strengths.push("Conviene sumar conectores para que las ideas avancen con más naturalidad.");

  aiFeedback.classList.remove("hidden");
  aiFeedback.innerHTML = `
    <h4>Feedback de IA Coach</h4>
    <div class="ai-feedback-grid">
      <div class="band-score"><strong>${band}</strong><span>IELTS estimated band</span></div>
      <div class="feedback-list">
        <article><strong>Lo que está funcionando</strong><p>${strengths.join(" ")}</p></article>
        <article><strong>Correcciones importantes</strong><p>${detectedIssues.length ? detectedIssues.join(" ") : "No detecté errores frecuentes graves."}</p></article>
      </div>
    </div>
    <div class="corrected-box"><strong>Versión corregida orientativa</strong><p>${escapeHTML(correctedText)}</p></div>
  `;
}

function detectCommonIssues(text) {
  const issues = [];
  if (/\bi am agree\b/i.test(text)) issues.push("No se dice “I am agree”; usá “I agree”.");
  if (/\bpeople is\b/i.test(text)) issues.push("“People” es plural: usá “people are”.");
  if (/\bhe have\b/i.test(text)) issues.push("Con he/she/it corresponde “has”.");
  if (!/[.!?]$/.test(text.trim())) issues.push("El párrafo debería cerrar con puntuación final.");
  return issues;
}

function createCorrectedVersion(text) {
  let corrected = text.trim();
  const replacements = [[/\bi am agree\b/gi, "I agree"], [/\bpeople is\b/gi, "people are"], [/\bhe have\b/gi, "he has"]];
  replacements.forEach(([pattern, replacement]) => { corrected = corrected.replace(pattern, replacement); });
  if (!/[.!?]$/.test(corrected)) corrected += ".";
  return corrected;
}

function hasComplexSentence(text) {
  return /\b(although|while|whereas|because|which|who|that|therefore|however)\b/i.test(text);
}

// ==========================================
// 6. APUNTES (NOTES)
// ==========================================
function saveNote(title, text) {
  const newNote = { id: createId(), title: title || "Apunte sin título", text, date: new Date().toLocaleDateString("es-AR") };
  notes.unshift(newNote);
  localStorage.setItem("englishTrainerNotes", JSON.stringify(notes));
  renderNotes();
}

function renderNotes() {
  notesList.innerHTML = "";
  if (notes.length === 0) {
    notesList.innerHTML = `<div class="empty-state">Todavía no guardaste apuntes.</div>`;
    return;
  }
  notes.forEach((note) => {
    const article = document.createElement("article");
    article.className = "note-item";
    article.innerHTML = `
      <div class="note-meta">
        <div><strong>${escapeHTML(note.title)}</strong><span>${note.date}</span></div>
      </div>
      <p>${escapeHTML(note.text)}</p>
      <div class="item-actions">
        <button class="small-danger-btn" type="button" data-delete-note="${note.id}">Borrar apunte</button>
      </div>
    `;
    notesList.appendChild(article);
  });
}

function deleteNote(id) {
  notes = notes.filter((n) => n.id !== id);
  localStorage.setItem("englishTrainerNotes", JSON.stringify(notes));
  renderNotes();
}

// ==========================================
// 7. QUIZ / MÚLTIPLE CHOICE
// ==========================================
function renderExamSelector() {
  examSelector.innerHTML = "";
  for (let i = 1; i <= 100; i++) {
    const option = document.createElement("option");
    option.value = String(i);
    option.textContent = `Examen ${i}`;
    examSelector.appendChild(option);
  }
}

function getExamQuestions(examNumber) {
  const templates = [
    { q: "Choose the correct Present Simple sentence.", c: "She studies every morning.", w: ["She study every morning.", "She is study every morning.", "She studying every morning."] },
    { q: "Choose the correct Past Simple sentence.", c: "I visited London last year.", w: ["I visit London last year.", "I have visited London yesterday.", "I was visit London."] },
    { q: "Which connector shows contrast?", c: "However", w: ["Therefore", "Moreover", "For example"] },
    { q: "Which tense describes an action before another past action?", c: "Past Perfect", w: ["Past Simple", "Future Simple", "Present Continuous"] },
    { q: "What is a correct Zero Conditional?", c: "If you heat ice, it melts.", w: ["If you heat ice, it will melt.", "If you heated ice, it melts.", "If you heating ice, it melts."] },
    { q: "Choose the correct Second Conditional.", c: "If I were rich, I would travel.", w: ["If I am rich, I would travel.", "If I was rich, I will travel.", "If I be rich, I would travel."] }
  ];
  
  const bank = [];
  for (let i = 0; i < 1000; i++) {
    const template = templates[i % templates.length];
    const options = seededShuffle([template.c, ...template.w], i + 11);
    const answer = options.indexOf(template.c);
    bank.push({ question: template.q, options, answer });
  }
  const start = (examNumber - 1) * 10;
  return bank.slice(start, start + 10);
}

function seededShuffle(array, seed) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    seed = (seed * 9301 + 49297) % 233280;
    const random = seed / 233280;
    const j = Math.floor(random * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function renderQuiz() {
  quizContainer.innerHTML = "";
  quizResult.textContent = "";
  const examNumber = Number(examSelector.value || 1);
  currentQuiz = getExamQuestions(examNumber);

  currentQuiz.forEach((question, idx) => {
    const article = document.createElement("article");
    article.className = "quiz-question";
    article.dataset.index = idx;

    const optionsHTML = question.options.map((option, optIdx) => `
      <label><input type="radio" name="question-${idx}" value="${optIdx}" /><span>${option}</span></label>
    `).join("");

    article.innerHTML = `<h4>${idx + 1}. ${question.question}</h4><div class="quiz-options">${optionsHTML}</div>`;
    quizContainer.appendChild(article);
  });
  updateQuizProgress();
}

function updateQuizProgress() {
  const answered = currentQuiz.filter((_, idx) => document.querySelector(`input[name="question-${idx}"]:checked`)).length;
  quizProgress.textContent = `${answered}/10 respondidas`;
}

function submitQuiz() {
  let correctAnswers = 0;
  currentQuiz.forEach((question, idx) => {
    const qElement = document.querySelector(`.quiz-question[data-index="${idx}"]`);
    const selected = document.querySelector(`input[name="question-${idx}"]:checked`);
    qElement.classList.remove("correct", "incorrect");

    if (!selected) { qElement.classList.add("incorrect"); return; }
    if (Number(selected.value) === question.answer) {
      correctAnswers++; qElement.classList.add("correct");
    } else {
      qElement.classList.add("incorrect");
    }
  });

  const percentage = Math.round((correctAnswers / currentQuiz.length) * 100);
  quizResult.textContent = `${correctAnswers}/10 correctas · ${percentage}%`;
  
  // Guardar métricas del quiz para barra de progreso
  examsCompleted++;
  averageScore = Math.round(((averageScore * (examsCompleted - 1)) + percentage) / examsCompleted);
  localStorage.setItem("englishTrainerExamsCount", examsCompleted);
  localStorage.setItem("englishTrainerAvgScore", averageScore);
  updateProgressBars();
}

// ==========================================
// SCROLL, REVEAL & LISTENERS GLOBALES
// ==========================================
function getWords(text) { return text.trim().split(/\s+/).filter(Boolean); }
function createId() { return crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()); }
function escapeHTML(text) { return text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;"); }

function setActiveLink() {
  if (resourcesView.classList.contains('active-view')) return;
  let currentSection = "inicio";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    if (window.scrollY >= sectionTop) currentSection = section.getAttribute("id");
  });
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) link.classList.add("active");
  });
}

function revealOnScroll() {
  revealElements.forEach((element) => {
    if (element.getBoundingClientRect().top < window.innerHeight - 80) element.classList.add("visible");
  });
}

// Events
tenseSearch.addEventListener("input", () => renderTenseCards(tenseSearch.value));
ieltsLevel.addEventListener("change", generatePrompt);
practiceTense.addEventListener("change", generatePrompt);
newPromptBtn.addEventListener("click", generatePrompt);
practiceText.addEventListener("input", updateWordCounter);
clearTextBtn.addEventListener("click", () => { practiceText.value = ""; updateWordCounter(); aiFeedback.classList.add("hidden"); });
saveParagraphBtn.addEventListener("click", saveParagraph);
aiCorrectBtn.addEventListener("click", runAICorrection);
clearParagraphsBtn.addEventListener("click", () => { if(confirm("¿Borrar todos los párrafos?")) { paragraphs = []; localStorage.removeItem("englishTrainerParagraphs"); renderParagraphs(); updateProgressBars();} });
savedParagraphsList.addEventListener("click", (e) => { const btn = e.target.closest("[data-delete-paragraph]"); if(btn) deleteParagraph(btn.dataset.deleteParagraph); });
saveNoteBtn.addEventListener("click", () => { saveNote(noteTitle.value.trim(), noteText.value.trim()); noteTitle.value = ""; noteText.value = ""; });
clearNoteEditorBtn.addEventListener("click", () => { noteTitle.value = ""; noteText.value = ""; });
clearNotesBtn.addEventListener("click", () => { if(confirm("¿Borrar todos los apuntes?")) { notes = []; localStorage.removeItem("englishTrainerNotes"); renderNotes(); } });
notesList.addEventListener("click", (e) => { const btn = e.target.closest("[data-delete-note]"); if(btn) deleteNote(btn.dataset.deleteNote); });
examSelector.addEventListener("change", renderQuiz);
quizContainer.addEventListener("change", updateQuizProgress);
submitQuizBtn.addEventListener("click", submitQuiz);
resetQuizBtn.addEventListener("click", renderQuiz);

window.addEventListener("scroll", () => { setActiveLink(); revealOnScroll(); });

// Inicialización global
window.addEventListener("load", () => {
  updateProgressBars();
  renderResourcesTables();
  renderTenseCards();
  renderTenseDetail(selectedTenseId);
  renderPracticeOptions();
  renderExamSelector();
  renderQuiz();
  renderParagraphs();
  renderNotes();
  setActiveLink();
  revealOnScroll();
});