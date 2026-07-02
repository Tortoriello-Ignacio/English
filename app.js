/* =========================================================
   ENGLISH TRAINER IELTS - APP.JS
========================================================= */

/* =========================
   DATOS: TIEMPOS Y CONDICIONALES
========================= */

const tenses = [
  {
    id: "present-simple",
    name: "Present Simple",
    level: "Base",
    summary: "Hábitos, rutinas, verdades generales, estados y horarios.",
    structures: {
      affirmative: "Subject + base verb / verb + s-es",
      negative: "Subject + do/does not + base verb",
      question: "Do/Does + subject + base verb?"
    },
    uses: ["Acciones habituales", "Opiniones", "Situaciones permanentes", "Verdades generales", "Horarios"],
    examples: [
      ["I usually get up at 7 o’clock.", "Normalmente me levanto a las 7."],
      ["She lives in New York.", "Ella vive en Nueva York."],
      ["The Earth goes around the Sun.", "La Tierra gira alrededor del Sol."]
    ],
    prompt: "Write a paragraph about your daily routine. Use frequency adverbs such as usually, always, often and sometimes."
  },
  {
    id: "present-continuous",
    name: "Present Continuous",
    level: "Base",
    summary: "Acciones que ocurren ahora, situaciones temporales y planes cercanos.",
    structures: {
      affirmative: "Subject + am/is/are + verb + ing",
      negative: "Subject + am/is/are + not + verb + ing",
      question: "Wh + am/is/are + subject + verb + ing?"
    },
    uses: ["Acción actual", "Situación temporal", "Plan futuro cercano", "Proceso en desarrollo"],
    examples: [
      ["What are you doing?", "¿Qué estás haciendo?"],
      ["She is studying hard for her exam.", "Ella está estudiando mucho para su examen."],
      ["I am working until 9 p.m. this week.", "Estoy trabajando hasta las 21 esta semana."]
    ],
    prompt: "Describe what is happening around you right now. Use Present Continuous and at least three action verbs."
  },
  {
    id: "present-perfect",
    name: "Present Perfect",
    level: "Intermedio",
    summary: "Acciones pasadas con conexión al presente: experiencia, resultado o duración.",
    structures: {
      affirmative: "Subject + have/has + past participle",
      negative: "Subject + have/has not + past participle",
      question: "Have/Has + subject + past participle?"
    },
    uses: ["Experiencia", "Resultado actual", "Acción con for/since", "Pasado conectado al presente"],
    examples: [
      ["I have been here for two hours.", "Estoy acá desde hace dos horas."],
      ["The postman hasn’t come yet.", "El cartero todavía no llegó."],
      ["How long have you worked here?", "¿Cuánto tiempo trabajaste/trabajás acá?"]
    ],
    prompt: "Write about experiences you have had in your life and explain why they were important."
  },
  {
    id: "present-perfect-continuous",
    name: "Present Perfect Continuous",
    level: "Intermedio",
    summary: "Duración de una acción que empezó en el pasado y continúa o tiene efecto ahora.",
    structures: {
      affirmative: "Subject + have/has been + verb + ing",
      negative: "Subject + have/has not been + verb + ing",
      question: "Have/Has + subject + been + verb + ing?"
    },
    uses: ["Duración hasta el presente", "Acción reciente con evidencia", "Proceso continuo"],
    examples: [
      ["I have been waiting for the bus for a long time.", "Hace mucho que estoy esperando el colectivo."],
      ["How long have you been working?", "¿Hace cuánto estás trabajando?"]
    ],
    prompt: "Write about something you have been doing for weeks or months and explain your progress."
  },
  {
    id: "past-simple",
    name: "Past Simple",
    level: "Base",
    summary: "Acciones terminadas en un momento específico del pasado.",
    structures: {
      affirmative: "Subject + past verb",
      negative: "Subject + did not + base verb",
      question: "Did + subject + base verb?"
    },
    uses: ["Acción terminada", "Secuencia de eventos", "Momento específico en el pasado"],
    examples: [
      ["I went to Paris last year.", "Fui a París el año pasado."],
      ["They didn’t drive to work.", "No fueron al trabajo en auto."],
      ["Where did she get that hat?", "¿Dónde consiguió ese sombrero?"]
    ],
    prompt: "Write about a memorable day from your past. Use Past Simple and include time expressions."
  },
  {
    id: "past-continuous",
    name: "Past Continuous",
    level: "Base",
    summary: "Acciones en progreso en un momento del pasado.",
    structures: {
      affirmative: "Subject + was/were + verb + ing",
      negative: "Subject + was/were not + verb + ing",
      question: "Wh + was/were + subject + verb + ing?"
    },
    uses: ["Acción en progreso en pasado", "Acción larga interrumpida", "Contexto narrativo"],
    examples: [
      ["At midnight we were driving home.", "A medianoche estábamos manejando a casa."],
      ["I was studying all day yesterday.", "Estuve estudiando todo el día ayer."]
    ],
    prompt: "Write a short story about what you were doing when something unexpected happened."
  },
  {
    id: "past-perfect",
    name: "Past Perfect",
    level: "Intermedio",
    summary: "Acción que ocurrió antes de otra acción pasada.",
    structures: {
      affirmative: "Subject + had + past participle",
      negative: "Subject + had not + past participle",
      question: "Had + subject + past participle?"
    },
    uses: ["Acción anterior a otra pasada", "Narración", "Causa o antecedente"],
    examples: [
      ["She had cooked lunch before she went to work.", "Ella había cocinado antes de ir al trabajo."],
      ["She hadn’t been to Rome before.", "Ella no había estado en Roma antes."]
    ],
    prompt: "Write a story where one past action happened before another. Use Past Perfect clearly."
  },
  {
    id: "past-perfect-continuous",
    name: "Past Perfect Continuous",
    level: "Avanzado",
    summary: "Duración de una acción antes de otro momento pasado.",
    structures: {
      affirmative: "Subject + had been + verb + ing",
      negative: "Subject + had not been + verb + ing",
      question: "Had + subject + been + verb + ing?"
    },
    uses: ["Duración antes de otro pasado", "Causa visible en pasado", "Narrativa avanzada"],
    examples: [
      ["We had been waiting for hours when the train arrived.", "Habíamos estado esperando durante horas cuando llegó el tren."],
      ["How long had you been playing tennis?", "¿Cuánto tiempo habías estado jugando al tenis?"]
    ],
    prompt: "Describe a past situation where an action had been happening for a long time before another event."
  },
  {
    id: "future-simple",
    name: "Future Simple",
    level: "Base",
    summary: "Decisiones espontáneas, predicciones, promesas y ofrecimientos.",
    structures: {
      affirmative: "Subject + will + base verb",
      negative: "Subject + will not + base verb",
      question: "Will + subject + base verb?"
    },
    uses: ["Predicciones", "Promesas", "Decisiones espontáneas", "Ofrecimientos"],
    examples: [
      ["I’ll help you.", "Te voy a ayudar."],
      ["She won’t win the game.", "Ella no ganará el juego."],
      ["Will they visit us soon?", "¿Nos visitarán pronto?"]
    ],
    prompt: "Write predictions about your future. Use will, probably, maybe and certainly."
  },
  {
    id: "going-to",
    name: "Going to",
    level: "Base",
    summary: "Planes, intenciones y predicciones con evidencia presente.",
    structures: {
      affirmative: "Subject + am/is/are + going to + base verb",
      negative: "Subject + am/is/are not + going to + base verb",
      question: "Am/Is/Are + subject + going to + base verb?"
    },
    uses: ["Planes futuros", "Intenciones", "Predicciones con evidencia"],
    examples: [
      ["I’m going to study languages.", "Voy a estudiar idiomas."],
      ["Look at those clouds. It’s going to rain.", "Mirá esas nubes. Va a llover."]
    ],
    prompt: "Write about your plans for the next six months. Use going to and specific goals."
  },
  {
    id: "future-continuous",
    name: "Future Continuous",
    level: "Intermedio",
    summary: "Acción que estará en progreso en un momento futuro.",
    structures: {
      affirmative: "Subject + will be + verb + ing",
      negative: "Subject + will not be + verb + ing",
      question: "Will + subject + be + verb + ing?"
    },
    uses: ["Acción futura en progreso", "Planes como proceso", "Situaciones temporales futuras"],
    examples: [
      ["Next Friday I will be travelling to London.", "El próximo viernes estaré viajando a Londres."],
      ["This time tomorrow, I’ll be working.", "A esta hora mañana estaré trabajando."]
    ],
    prompt: "Write about what you will be doing at this time tomorrow and next week."
  },
  {
    id: "future-perfect",
    name: "Future Perfect",
    level: "Avanzado",
    summary: "Acción que estará terminada antes de un punto futuro.",
    structures: {
      affirmative: "Subject + will have + past participle",
      negative: "Subject + will not have + past participle",
      question: "Will + subject + have + past participle?"
    },
    uses: ["Acción completada antes de un futuro", "Metas cumplidas", "Resultados proyectados"],
    examples: [
      ["We will have finished the project by tomorrow.", "Habremos terminado el proyecto para mañana."],
      ["By 2030, I will have learned advanced English.", "Para 2030 habré aprendido inglés avanzado."]
    ],
    prompt: "Write about goals you will have achieved by the end of the year."
  },
  {
    id: "future-perfect-continuous",
    name: "Future Perfect Continuous",
    level: "Avanzado",
    summary: "Duración de una acción hasta un punto específico del futuro.",
    structures: {
      affirmative: "Subject + will have been + verb + ing",
      negative: "Subject + will not have been + verb + ing",
      question: "Will + subject + have been + verb + ing?"
    },
    uses: ["Duración hasta un punto futuro", "Continuidad", "Proyección avanzada"],
    examples: [
      ["I will have been working here for ten years next month.", "El mes que viene habré estado trabajando acá durante diez años."],
      ["By July, she will have been studying for six months.", "Para julio, ella habrá estado estudiando durante seis meses."]
    ],
    prompt: "Write about something you will have been doing for a long time by a future date."
  },
  {
    id: "zero-conditional",
    name: "Zero Conditional",
    level: "Condicional",
    summary: "Verdades generales, hechos científicos o causa y efecto directo.",
    structures: {
      affirmative: "If + Present Simple, Present Simple",
      negative: "If + don’t/doesn’t + verb, don’t/doesn’t + verb",
      question: "What happens if + Present Simple?"
    },
    uses: ["Hechos generales", "Verdades científicas", "Causa y efecto directo"],
    examples: [
      ["If you heat water, it boils.", "Si calentás agua, hierve."],
      ["If people don’t sleep well, they feel tired.", "Si la gente no duerme bien, se siente cansada."]
    ],
    prompt: "Write about general facts using the Zero Conditional."
  },
  {
    id: "first-conditional",
    name: "First Conditional",
    level: "Condicional",
    summary: "Situaciones reales o probables en el futuro.",
    structures: {
      affirmative: "If + Present Simple, will + base verb",
      negative: "If + Present Simple, won’t + base verb",
      question: "What will happen if + Present Simple?"
    },
    uses: ["Futuro probable", "Advertencias", "Promesas condicionadas"],
    examples: [
      ["If it rains, I will stay at home.", "Si llueve, me quedaré en casa."],
      ["If she studies hard, she will pass the exam.", "Si ella estudia mucho, aprobará."]
    ],
    prompt: "Write about future plans using the First Conditional."
  },
  {
    id: "second-conditional",
    name: "Second Conditional",
    level: "Condicional",
    summary: "Situaciones hipotéticas, imaginarias o poco probables.",
    structures: {
      affirmative: "If + Past Simple, would + base verb",
      negative: "If + Past Simple, wouldn’t + base verb",
      question: "What would you do if + Past Simple?"
    },
    uses: ["Situaciones hipotéticas", "Deseos improbables", "Consejos con If I were you"],
    examples: [
      ["If I had money, I would travel.", "Si tuviera dinero, viajaría."],
      ["If I were you, I would study more.", "Si yo fuera vos, estudiaría más."]
    ],
    prompt: "Write about what you would do if you had more free time."
  },
  {
    id: "third-conditional",
    name: "Third Conditional",
    level: "Condicional",
    summary: "Situaciones irreales en el pasado, arrepentimientos o escenarios que no ocurrieron.",
    structures: {
      affirmative: "If + Past Perfect, would have + past participle",
      negative: "If + Past Perfect, wouldn’t have + past participle",
      question: "What would have happened if + Past Perfect?"
    },
    uses: ["Pasado hipotético", "Arrepentimientos", "Resultados que no ocurrieron"],
    examples: [
      ["If I had studied, I would have passed.", "Si hubiera estudiado, habría aprobado."],
      ["If we had left earlier, we wouldn’t have missed the train.", "Si hubiéramos salido antes, no habríamos perdido el tren."]
    ],
    prompt: "Write about a past mistake and how things would have been different."
  }
];

const phrasalVerbs = [
  ["pick up", "levantar, recoger", "She picked up the book from the floor."],
  ["turn on / turn off", "encender / apagar", "Turn off the lights before you leave."],
  ["look for", "buscar", "I’m looking for my keys."],
  ["find out", "descubrir, averiguar", "I found out the truth yesterday."],
  ["give up", "rendirse, dejar de hacer algo", "Don’t give up on your dreams."],
  ["put on / take off", "ponerse / quitarse ropa", "He put on his jacket."],
  ["run out of", "quedarse sin", "We ran out of milk."],
  ["come back", "regresar", "She came back home late."],
  ["get along with", "llevarse bien", "I get along with my coworkers."],
  ["set up", "organizar, montar", "They set up a new company."],
  ["take care of", "cuidar", "She takes care of her little brother."],
  ["wake up", "despertarse", "I wake up at 7 a.m."],
  ["carry on", "continuar", "Carry on with your work."],
  ["check out", "revisar, mirar", "Check out this new song."],
  ["break down", "averiarse, descomponerse", "My car broke down yesterday."],
  ["bring up", "sacar un tema, mencionar", "She brought up an interesting point."],
  ["call off", "cancelar", "They called off the meeting."],
  ["come across", "encontrarse con algo/alguien", "I came across an old photo."],
  ["drop off", "dejar a alguien en un lugar", "He dropped me off at the station."],
  ["get over", "superar una enfermedad o problema", "It took her weeks to get over the flu."],
  ["go on", "continuar", "Please, go on with your story."],
  ["look after", "cuidar", "She looks after her grandmother."],
  ["make up", "inventar / reconciliarse", "He made up an excuse. / They made up after the fight."],
  ["put off", "posponer", "We had to put off the trip."],
  ["show up", "aparecer, presentarse", "He didn’t show up to class."],
  ["take up", "empezar una actividad", "She took up painting last year."],
  ["work out", "hacer ejercicio / resolver", "I work out three times a week. / We worked out the problem."],
  ["hand in", "entregar tarea o documento", "Please hand in your homework."],
  ["look forward to", "esperar con ilusión", "I look forward to meeting you."],
  ["turn up", "aparecer / subir volumen", "She turned up unexpectedly. / Turn up the radio."],
  ["take off", "despegar / quitarse ropa", "The plane took off at 9 a.m."],
  ["put up with", "tolerar", "I can’t put up with the noise."],
  ["break up", "terminar una relación", "They broke up last month."],
  ["catch up with", "ponerse al día", "I need to catch up with my studies."],
  ["hold on", "esperar", "Hold on a minute, please."],
  ["keep up with", "mantener el ritmo", "She runs fast; I can’t keep up with her."],
  ["take over", "asumir control", "He took over the family business."],
  ["turn down", "rechazar / bajar volumen", "She turned down the job offer. / Turn down the TV."],
  ["write down", "anotar", "Write down the phone number."],
  ["put away", "guardar", "I had to put away the groceries."]
];

const modalVerbs = [
  ["Can / Could", "Poder / Podría"],
  ["Want to / Would like to", "Querer / Gustaría"],
  ["Do / Does / Did", "Hacer - auxiliar y acción"],
  ["Make", "Hacer, crear, tomar una decisión"],
  ["Have to / Must", "Tener que / Deber"],
  ["Had to", "Tuvo que"],
  ["Should / Ought to", "Debería / Debería formal"],
  ["May / Might", "Poder, posibilidad o permiso"],
  ["Shall", "Debería / Haré - formal"],
  ["Wish", "Ojalá / Deseo"],
  ["Hope", "Espero que"],
  ["Would rather", "Preferiría"],
  ["Might", "Capaz / Tal vez"],
  ["Had better", "Más vale que"],
  ["Thus", "Entonces / Por lo tanto"],
  ["Often", "A menudo"],
  ["Huge", "Enorme"],
  ["Loss", "Pérdida"],
  ["Improve my skills", "Mejorar mis habilidades"],
  ["Shape", "Estar en forma"],
  ["Enhancing", "Mejorando"],
  ["Following", "Siguiente"],
  ["Kind", "Tipo / Amable"],
  ["Then", "Entonces"],
  ["To realize", "Darse cuenta"],
  ["Despite / In spite of", "A pesar de"],
  ["It seemed", "Parecía"],
  ["Although / Even though", "Aunque"],
  ["Because of", "Debido a"],
  ["I used to", "Solía"]
];

const conditionalsRows = [
  ["Zero Conditional", "If + present, present", "Hechos generales", "If you heat water, it boils."],
  ["First Conditional", "If + present, will + verbo", "Futuro probable", "If it rains, I will stay at home."],
  ["Second Conditional", "If + past, would + verbo", "Situaciones hipotéticas", "If I had money, I would travel."],
  ["Third Conditional", "If + had + participio, would have + participio", "Pasado hipotético", "If I had studied, I would have passed."]
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

/* =========================
   ELEMENTOS
========================= */

const dashboardView = document.getElementById("dashboardView");
const resourcesView = document.getElementById("resourcesView");

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

const timerToggleBtn = document.getElementById("timerToggleBtn");
const timerPanel = document.getElementById("timerPanel");
const timerCloseBtn = document.getElementById("timerCloseBtn");
const timerDisplay = document.getElementById("timerDisplay");
const timerProgressRing = document.getElementById("timerProgressRing");
const customMinutes = document.getElementById("customMinutes");
const customTimerBtn = document.getElementById("customTimerBtn");
const pauseTimerBtn = document.getElementById("pauseTimerBtn");
const resetTimerBtn = document.getElementById("resetTimerBtn");

const revealElements = document.querySelectorAll(".reveal");
const navLinks = document.querySelectorAll("[data-dashboard-link]");

/* =========================
   ESTADO
========================= */

let selectedTenseId = tenses[0].id;
let paragraphs = JSON.parse(localStorage.getItem("englishTrainerParagraphs")) || [];
let notes = JSON.parse(localStorage.getItem("englishTrainerNotes")) || [];
let studySeconds = Number(localStorage.getItem("englishTrainerStudySeconds")) || 0;
let examsCompleted = Number(localStorage.getItem("englishTrainerExamsCompleted")) || 0;
let scoreHistory = JSON.parse(localStorage.getItem("englishTrainerScoreHistory")) || [];
let currentQuiz = [];

let timerSecondsLeft = 0;
let timerInitialSeconds = 0;
let timerInterval = null;
let timerPaused = false;

/* =========================
   VISTAS / PESTAÑAS
========================= */

function openResources(tab = "apuntes") {
  dashboardView.hidden = true;
  resourcesView.hidden = false;
  activateResourceTab(tab);
  setResourceNavActive(tab);
  navLinks.forEach((link) => link.classList.remove("active"));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openDashboard(sectionId = "inicio") {
  resourcesView.hidden = true;
  dashboardView.hidden = false;
  setResourceNavActive(null);

  requestAnimationFrame(() => {
    const target = document.getElementById(sectionId) || document.getElementById("inicio");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setActiveLink();
  });
}

function setResourceNavActive(tab) {
  document.querySelectorAll(".resource-nav-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.resource === tab);
  });
}

function activateResourceTab(tab) {
  document.querySelectorAll(".resource-tab").forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === tab);
  });

  document.querySelectorAll(".resource-pane").forEach((pane) => {
    pane.classList.toggle("active-pane", pane.id === `tab-${tab}`);
  });
}

document.addEventListener("click", (event) => {
  const dashboardLink = event.target.closest("[data-dashboard-link]");
  if (dashboardLink) {
    event.preventDefault();
    const sectionId = dashboardLink.getAttribute("href").replace("#", "");
    openDashboard(sectionId);
    return;
  }

  const resourceButton = event.target.closest("[data-resource]");
  if (resourceButton) {
    openResources(resourceButton.dataset.resource);
    return;
  }

  const dashboardButton = event.target.closest("[data-go-dashboard]");
  if (dashboardButton) {
    openDashboard("inicio");
    return;
  }

  const resourceTab = event.target.closest(".resource-tab");
  if (resourceTab) {
    activateResourceTab(resourceTab.dataset.tab);
  }
});

/* =========================
   PROGRESO
========================= */

function formatStudyTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;

  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${hours}h ${rest}m` : `${hours}h`;
}

function getAverageScore() {
  if (!scoreHistory.length) return 0;
  const total = scoreHistory.reduce((acc, item) => acc + item, 0);
  return Math.round(total / scoreHistory.length);
}

function updateProgress() {
  const studyMinutes = Math.floor(studySeconds / 60);
  const avgScore = getAverageScore();

  document.getElementById("studyTimeText").textContent = formatStudyTime(studySeconds);
  document.getElementById("studyTimeBar").style.width = `${Math.min((studyMinutes / 600) * 100, 100)}%`;

  document.getElementById("grammarCountText").textContent = tenses.length;

  document.getElementById("examsCountText").textContent = examsCompleted;
  document.getElementById("examProgressBar").style.width = `${Math.min((examsCompleted / 100) * 100, 100)}%`;

  document.getElementById("savedParagraphsCount").textContent = paragraphs.length;
  document.getElementById("paragraphProgressBar").style.width = `${Math.min((paragraphs.length / 20) * 100, 100)}%`;

  document.getElementById("avgScoreText").textContent = `${avgScore}%`;
  document.getElementById("avgScoreBar").style.width = `${avgScore}%`;
}

setInterval(() => {
  if (!document.hidden) {
    studySeconds += 15;
    localStorage.setItem("englishTrainerStudySeconds", String(studySeconds));
    updateProgress();
  }
}, 15000);

/* =========================
   TIMER DIGITAL
========================= */

function openTimerPanel() {
  timerPanel.classList.add("open");
}

function closeTimerPanel() {
  timerPanel.classList.remove("open");
}

function startTimer(minutes) {
  const mins = Number(minutes);

  if (!mins || mins < 1) {
    alert("Ingresá una cantidad válida de minutos.");
    return;
  }

  clearInterval(timerInterval);
  timerInitialSeconds = mins * 60;
  timerSecondsLeft = timerInitialSeconds;
  timerPaused = false;
  pauseTimerBtn.textContent = "Pausar";
  updateTimerUI();

  timerInterval = setInterval(() => {
    if (timerPaused) return;

    timerSecondsLeft -= 1;
    updateTimerUI();

    if (timerSecondsLeft <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      studySeconds += timerInitialSeconds;
      localStorage.setItem("englishTrainerStudySeconds", String(studySeconds));
      updateProgress();
      alert("¡Tiempo cumplido! Excelente sesión de estudio.");
    }
  }, 1000);
}

function updateTimerUI() {
  const remaining = Math.max(timerSecondsLeft, 0);
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;

  timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const progress = timerInitialSeconds ? (timerInitialSeconds - remaining) / timerInitialSeconds : 0;
  const degrees = Math.round(progress * 360);

  if (timerProgressRing) {
    timerProgressRing.style.setProperty("--timer-progress", `${degrees}deg`);
  }
}

timerToggleBtn.addEventListener("click", openTimerPanel);
timerCloseBtn.addEventListener("click", closeTimerPanel);

document.querySelectorAll(".preset-btn").forEach((button) => {
  button.addEventListener("click", () => startTimer(button.dataset.minutes));
});

customTimerBtn.addEventListener("click", () => startTimer(customMinutes.value));

pauseTimerBtn.addEventListener("click", () => {
  if (!timerInterval) return;

  timerPaused = !timerPaused;
  pauseTimerBtn.textContent = timerPaused ? "Continuar" : "Pausar";
});

resetTimerBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  timerInterval = null;
  timerSecondsLeft = 0;
  timerInitialSeconds = 0;
  timerPaused = false;
  pauseTimerBtn.textContent = "Pausar";
  updateTimerUI();
});

/* =========================
   TABLAS
========================= */

function renderTables() {
  document.getElementById("phrasalTableBody").innerHTML = phrasalVerbs.map(([verb, meaning, example]) => `
    <tr>
      <td>${escapeHTML(verb)}</td>
      <td>${escapeHTML(meaning)}</td>
      <td><em>${escapeHTML(example)}</em></td>
    </tr>
  `).join("");

  document.getElementById("modalsTableBody").innerHTML = modalVerbs.map(([word, meaning]) => `
    <tr>
      <td>${escapeHTML(word)}</td>
      <td>${escapeHTML(meaning)}</td>
    </tr>
  `).join("");

  const conditionalsBody = document.getElementById("conditionalsTableBody");
  if (conditionalsBody) {
    conditionalsBody.innerHTML = conditionalsRows.map(([type, structure, use, example]) => `
      <tr>
        <td>${escapeHTML(type)}</td>
        <td>${escapeHTML(structure)}</td>
        <td>${escapeHTML(use)}</td>
        <td><em>${escapeHTML(example)}</em></td>
      </tr>
    `).join("");
  }
}

/* =========================
   GRAMÁTICA
========================= */

function renderTenseCards(filter = "") {
  tenseGrid.innerHTML = "";

  const query = filter.toLowerCase().trim();

  const filtered = tenses.filter((tense) => {
    return tense.name.toLowerCase().includes(query)
      || tense.level.toLowerCase().includes(query)
      || tense.summary.toLowerCase().includes(query);
  });

  filtered.forEach((tense) => {
    const card = document.createElement("article");
    card.className = `tense-card ${tense.id === selectedTenseId ? "active" : ""}`;

    card.innerHTML = `
      <div>
        <h4>${escapeHTML(tense.name)}</h4>
        <p>${escapeHTML(tense.summary)}</p>
      </div>
      <span class="level-tag">${escapeHTML(tense.level)}</span>
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

  usageList.innerHTML = tense.uses.map((use) => `<li>${escapeHTML(use)}</li>`).join("");

  examplesList.innerHTML = tense.examples.map(([english, spanish]) => `
    <article class="example-item">
      <strong>${escapeHTML(english)}</strong>
      <span>${escapeHTML(spanish)}</span>
    </article>
  `).join("");
}

function renderPracticeOptions() {
  practiceTense.innerHTML = tenses.map((tense) => {
    return `<option value="${tense.id}">${escapeHTML(tense.name)}</option>`;
  }).join("");

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
  const tense = tenses.find((item) => item.id === practiceTense.value);
  const prompts = ieltsPrompts[level];
  const prompt = prompts[Math.floor(Math.random() * prompts.length)];

  practicePrompt.textContent = `${prompt} Try to include: ${tense.name}.`;
}

/* =========================
   WRITING / IA COACH LOCAL
========================= */

function getWords(text) {
  return text.trim().split(/\s+/).filter(Boolean);
}

function updateWordCounter() {
  const words = getWords(practiceText.value);
  wordCounter.textContent = `${words.length} palabra${words.length === 1 ? "" : "s"}`;
}

function saveParagraph() {
  const text = practiceText.value.trim();

  if (!text) {
    alert("Escribí un texto antes de guardarlo.");
    return;
  }

  const tense = tenses.find((item) => item.id === practiceTense.value);

  paragraphs.unshift({
    id: createId(),
    title: `Writing practice · ${tense.name}`,
    tense: tense.name,
    date: new Date().toLocaleDateString("es-AR"),
    text
  });

  localStorage.setItem("englishTrainerParagraphs", JSON.stringify(paragraphs));
  practiceText.value = "";
  updateWordCounter();
  renderParagraphs();
  updateProgress();
}

function runAICorrection() {
  const text = practiceText.value.trim();

  if (!text) {
    alert("Escribí un párrafo antes de corregirlo.");
    return;
  }

  const words = getWords(text);
  const lower = text.toLowerCase();
  const sentences = text.split(/[.!?]+/).filter((sentence) => sentence.trim().length > 0);

  const connectors = [
    "however", "therefore", "moreover", "although", "because", "while",
    "whereas", "in addition", "for example", "as a result", "on the other hand"
  ];

  const foundConnectors = connectors.filter((connector) => lower.includes(connector));
  const issues = detectCommonIssues(text);

  let band = 5;
  if (words.length >= 80) band += 0.5;
  if (words.length >= 130) band += 0.5;
  if (sentences.length >= 4) band += 0.5;
  if (foundConnectors.length >= 2) band += 0.5;
  if (foundConnectors.length >= 4) band += 0.5;
  if (hasComplexSentence(text)) band += 0.5;
  if (words.length < 60) band -= 0.75;
  band -= issues.length * 0.25;
  band = Math.max(4, Math.min(8.5, Math.round(band * 2) / 2));

  const intro = createCoachIntro(band);
  const corrected = createCorrectedVersion(text);

  const strengths = [
    words.length >= 80
      ? "Tu párrafo ya tiene una extensión razonable para desarrollar una idea."
      : "La idea inicial se entiende, pero todavía necesita más desarrollo para sonar como una respuesta IELTS completa.",
    foundConnectors.length
      ? `Usaste conectores útiles como ${foundConnectors.slice(0, 3).join(", ")}.`
      : "Conviene sumar conectores para que las ideas avancen con más naturalidad."
  ];

  aiFeedback.classList.remove("hidden");
  aiFeedback.innerHTML = `
    <h4>Feedback de IA Coach</h4>
    <p class="coach-message">${intro}</p>

    <div class="ai-feedback-grid">
      <div class="band-score">
        <strong>${band}</strong>
        <span>IELTS estimated band</span>
      </div>

      <div class="feedback-list">
        <article>
          <strong>Lo que está funcionando</strong>
          <p>${strengths.join(" ")}</p>
        </article>

        <article>
          <strong>Correcciones importantes</strong>
          <p>${issues.length ? issues.join(" ") : "No detecté errores frecuentes graves. El próximo paso es mejorar precisión, variedad y naturalidad."}</p>
        </article>

        <article>
          <strong>Próximo objetivo</strong>
          <p>Agregá una oración inicial clara, desarrollá una razón principal con un ejemplo y cerrá el párrafo reforzando tu idea.</p>
        </article>
      </div>
    </div>

    <div class="corrected-box">
      <strong>Versión corregida orientativa</strong>
      <p>${escapeHTML(corrected)}</p>
    </div>
  `;
}

function createCoachIntro(band) {
  if (band >= 7) {
    return "Leí tu párrafo y la impresión general es buena: se entiende la idea, hay control razonable de la estructura y ya empezás a sonar más natural. Para llevarlo a un nivel más alto, trabajaría en precisión, vocabulario menos repetitivo y una conclusión más contundente.";
  }

  if (band >= 6) {
    return "Tu párrafo comunica la idea principal, que es lo más importante al principio. Todavía se nota que algunas frases podrían ordenarse mejor y que faltan conectores o ejemplos para que el texto sea más convincente. Estás en una base intermedia sobre la cual se puede construir muy bien.";
  }

  return "Tu texto tiene una intención clara, pero todavía necesita más estructura. Primero armá una oración principal clara, después una explicación simple, luego un ejemplo y finalmente una frase de cierre.";
}

function detectCommonIssues(text) {
  const issues = [];

  if (/\bi am agree\b/i.test(text)) {
    issues.push("No se dice “I am agree”; la forma correcta es “I agree”.");
  }

  if (/\bpeople is\b/i.test(text)) {
    issues.push("“People” normalmente funciona como plural: usá “people are”.");
  }

  if (/\bhe have\b/i.test(text)) {
    issues.push("Con he/she/it corresponde “has”, no “have”.");
  }

  if (/\bshe go\b/i.test(text)) {
    issues.push("En Present Simple con she corresponde “she goes”.");
  }

  const veryImportantMatches = text.match(/\bvery important\b/gi);
  if (veryImportantMatches && veryImportantMatches.length > 1) {
    issues.push("Repetís “very important”; podés variar con “essential”, “crucial” o “highly relevant”.");
  }

  if (!/[.!?]$/.test(text.trim())) {
    issues.push("El párrafo debería cerrar con puntuación final.");
  }

  return issues;
}

function createCorrectedVersion(text) {
  let corrected = text.trim();

  const replacements = [
    [/\bi am agree\b/gi, "I agree"],
    [/\bpeople is\b/gi, "people are"],
    [/\bhe have\b/gi, "he has"],
    [/\bshe go\b/gi, "she goes"],
    [/\bi think that\b/gi, "I believe that"],
    [/\ba lot of people\b/gi, "many people"]
  ];

  replacements.forEach(([pattern, replacement]) => {
    corrected = corrected.replace(pattern, replacement);
  });

  if (!/[.!?]$/.test(corrected)) {
    corrected += ".";
  }

  if (getWords(corrected).length < 80) {
    corrected += " For example, this situation can affect people’s opportunities, habits and long-term progress. Therefore, it is important to develop a clear opinion and support it with specific reasons.";
  }

  return corrected;
}

function hasComplexSentence(text) {
  return /\b(although|while|whereas|because|which|who|that|therefore|however)\b/i.test(text);
}

/* =========================
   APUNTES Y PÁRRAFOS
========================= */

function saveNote(title, text) {
  notes.unshift({
    id: createId(),
    title: title || "Apunte sin título",
    text,
    date: new Date().toLocaleDateString("es-AR")
  });

  localStorage.setItem("englishTrainerNotes", JSON.stringify(notes));
  renderNotes();
}

function saveNoteFromEditor() {
  const title = noteTitle.value.trim() || "Apunte personal";
  const text = noteText.value.trim();

  if (!text) {
    alert("Escribí o pegá un texto antes de guardarlo.");
    return;
  }

  saveNote(title, text);
  noteTitle.value = "";
  noteText.value = "";
}

function renderNotes() {
  notesList.innerHTML = "";

  if (!notes.length) {
    notesList.innerHTML = `<div class="empty-state">Todavía no guardaste apuntes.</div>`;
    return;
  }

  notesList.innerHTML = notes.map((note) => `
    <article class="note-item">
      <div class="note-meta">
        <div>
          <strong>${escapeHTML(note.title)}</strong>
          <span>${escapeHTML(note.date)}</span>
        </div>
      </div>

      <p>${escapeHTML(note.text)}</p>

      <div class="item-actions">
        <button class="small-danger-btn" type="button" data-delete-note="${note.id}">Borrar apunte</button>
      </div>
    </article>
  `).join("");
}

function renderParagraphs() {
  savedParagraphsList.innerHTML = "";

  if (!paragraphs.length) {
    savedParagraphsList.innerHTML = `<div class="empty-state">Todavía no guardaste párrafos.</div>`;
    return;
  }

  savedParagraphsList.innerHTML = paragraphs.map((paragraph) => `
    <article class="saved-item">
      <div class="saved-meta">
        <div>
          <strong>${escapeHTML(paragraph.title)}</strong>
          <span>${escapeHTML(paragraph.date)} · ${escapeHTML(paragraph.tense)}</span>
        </div>
      </div>

      <p>${escapeHTML(paragraph.text)}</p>

      <div class="item-actions">
        <button class="small-danger-btn" type="button" data-delete-paragraph="${paragraph.id}">Borrar párrafo</button>
      </div>
    </article>
  `).join("");
}

function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  localStorage.setItem("englishTrainerNotes", JSON.stringify(notes));
  renderNotes();
}

function deleteParagraph(id) {
  paragraphs = paragraphs.filter((paragraph) => paragraph.id !== id);
  localStorage.setItem("englishTrainerParagraphs", JSON.stringify(paragraphs));
  renderParagraphs();
  updateProgress();
}

/* =========================
   EXÁMENES
========================= */

function renderExamSelector() {
  examSelector.innerHTML = "";

  for (let i = 1; i <= 100; i++) {
    const option = document.createElement("option");
    option.value = String(i);
    option.textContent = `Examen ${i}`;
    examSelector.appendChild(option);
  }
}

function generateQuestionBank() {
  const templates = [
    {
      question: "Choose the correct Present Simple sentence.",
      correct: "She studies every morning.",
      wrong: ["She study every morning.", "She is study every morning.", "She studying every morning."]
    },
    {
      question: "Choose the correct Present Continuous sentence.",
      correct: "They are working now.",
      wrong: ["They working now.", "They are work now.", "They work yesterday."]
    },
    {
      question: "Choose the correct Past Simple sentence.",
      correct: "I visited London last year.",
      wrong: ["I visit London last year.", "I have visited London yesterday.", "I was visit London."]
    },
    {
      question: "Choose the correct Past Continuous sentence.",
      correct: "I was reading when he called.",
      wrong: ["I read when he was called.", "I was read when he called.", "I reading when he called."]
    },
    {
      question: "Choose the correct Present Perfect sentence.",
      correct: "We have finished the project.",
      wrong: ["We has finished the project.", "We have finish the project.", "We finished the project tomorrow."]
    },
    {
      question: "Choose the correct Going to sentence.",
      correct: "It is going to rain.",
      wrong: ["It going to rain.", "It is going rain.", "It will going to rain."]
    },
    {
      question: "Choose the correct Zero Conditional sentence.",
      correct: "If you heat water, it boils.",
      wrong: ["If you heat water, it will boils.", "If you heated water, it boils.", "If water heat, it boils."]
    },
    {
      question: "Choose the correct First Conditional sentence.",
      correct: "If it rains, I will stay home.",
      wrong: ["If it will rain, I stay home.", "If it rained, I will stay home.", "If it rains, I would stayed home."]
    },
    {
      question: "Choose the correct Second Conditional sentence.",
      correct: "If I had money, I would travel.",
      wrong: ["If I have money, I would travel.", "If I had money, I will travel.", "If I had money, I would travelled."]
    },
    {
      question: "Choose the correct Third Conditional sentence.",
      correct: "If I had studied, I would have passed.",
      wrong: ["If I studied, I would have passed.", "If I had studied, I would pass.", "If I have studied, I would have passed."]
    },
    {
      question: "Which connector shows contrast?",
      correct: "However",
      wrong: ["Therefore", "Moreover", "For example"]
    },
    {
      question: "Which connector introduces a result?",
      correct: "Therefore",
      wrong: ["Although", "Whereas", "Despite"]
    },
    {
      question: "Which option is more academic?",
      correct: "This issue is significant.",
      wrong: ["This thing is very good.", "This stuff is nice.", "This is super cool."]
    },
    {
      question: "Choose the correct Future Perfect sentence.",
      correct: "I will have finished by Monday.",
      wrong: ["I will finishing by Monday.", "I have finish by Monday.", "I finished by Monday tomorrow."]
    },
    {
      question: "Choose the best IELTS-style opening.",
      correct: "It is widely believed that education plays a crucial role in society.",
      wrong: ["Education is good thing.", "I will talk about education.", "Nowadays education very important."]
    }
  ];

  const bank = [];

  for (let i = 0; i < 1000; i++) {
    const template = templates[i % templates.length];
    const options = seededShuffle([template.correct, ...template.wrong], i + 17);

    bank.push({
      question: template.question,
      options,
      answer: options.indexOf(template.correct)
    });
  }

  return bank;
}

function getExamQuestions(examNumber) {
  const bank = generateQuestionBank();
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

  quizContainer.innerHTML = currentQuiz.map((question, index) => `
    <article class="quiz-question" data-index="${index}">
      <h4>${index + 1}. ${escapeHTML(question.question)}</h4>
      <div class="quiz-options">
        ${question.options.map((option, optionIndex) => `
          <label>
            <input type="radio" name="question-${index}" value="${optionIndex}" />
            <span>${escapeHTML(option)}</span>
          </label>
        `).join("")}
      </div>
    </article>
  `).join("");

  updateQuizProgress();
}

function updateQuizProgress() {
  const answered = currentQuiz.filter((_, index) => {
    return document.querySelector(`input[name="question-${index}"]:checked`);
  }).length;

  quizProgress.textContent = `${answered}/10 respondidas`;
}

function submitQuiz() {
  let correct = 0;

  currentQuiz.forEach((question, index) => {
    const questionElement = document.querySelector(`.quiz-question[data-index="${index}"]`);
    const selected = document.querySelector(`input[name="question-${index}"]:checked`);

    questionElement.classList.remove("correct", "incorrect");

    if (!selected) {
      questionElement.classList.add("incorrect");
      return;
    }

    if (Number(selected.value) === question.answer) {
      correct += 1;
      questionElement.classList.add("correct");
    } else {
      questionElement.classList.add("incorrect");
    }
  });

  const percentage = Math.round((correct / currentQuiz.length) * 100);
  quizResult.textContent = `${correct}/10 correctas · ${percentage}%`;

  examsCompleted += 1;
  scoreHistory.push(percentage);

  localStorage.setItem("englishTrainerExamsCompleted", String(examsCompleted));
  localStorage.setItem("englishTrainerScoreHistory", JSON.stringify(scoreHistory));

  updateProgress();
}

/* =========================
   NAV / ANIMACIONES / HELPERS
========================= */

function setActiveLink() {
  if (dashboardView.hidden) return;

  let current = "inicio";

  document.querySelectorAll("#dashboardView main section[id]").forEach((section) => {
    if (window.scrollY >= section.offsetTop - 160) {
      current = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });

  setResourceNavActive(null);
}

function revealOnScroll() {
  revealElements.forEach((element) => {
    if (element.getBoundingClientRect().top < window.innerHeight - 80) {
      element.classList.add("visible");
    }
  });
}

function createId() {
  return crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random());
}

function escapeHTML(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

/* =========================
   EVENTOS
========================= */

tenseSearch.addEventListener("input", () => renderTenseCards(tenseSearch.value));
ieltsLevel.addEventListener("change", generatePrompt);
practiceTense.addEventListener("change", generatePrompt);
newPromptBtn.addEventListener("click", generatePrompt);
practiceText.addEventListener("input", updateWordCounter);

clearTextBtn.addEventListener("click", () => {
  practiceText.value = "";
  updateWordCounter();
  aiFeedback.classList.add("hidden");
});

saveParagraphBtn.addEventListener("click", saveParagraph);
aiCorrectBtn.addEventListener("click", runAICorrection);

saveNoteBtn.addEventListener("click", saveNoteFromEditor);

clearNoteEditorBtn.addEventListener("click", () => {
  noteTitle.value = "";
  noteText.value = "";
});

clearNotesBtn.addEventListener("click", () => {
  if (!confirm("¿Seguro que querés borrar todos los apuntes?")) return;
  notes = [];
  localStorage.removeItem("englishTrainerNotes");
  renderNotes();
});

clearParagraphsBtn.addEventListener("click", () => {
  if (!confirm("¿Seguro que querés borrar todos los párrafos guardados?")) return;
  paragraphs = [];
  localStorage.removeItem("englishTrainerParagraphs");
  renderParagraphs();
  updateProgress();
});

notesList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-delete-note]");
  if (button) deleteNote(button.dataset.deleteNote);
});

savedParagraphsList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-delete-paragraph]");
  if (button) deleteParagraph(button.dataset.deleteParagraph);
});

examSelector.addEventListener("change", renderQuiz);
quizContainer.addEventListener("change", updateQuizProgress);
submitQuizBtn.addEventListener("click", submitQuiz);
resetQuizBtn.addEventListener("click", renderQuiz);

window.addEventListener("scroll", () => {
  setActiveLink();
  revealOnScroll();
});

window.addEventListener("load", () => {
  renderTables();
  renderTenseCards();
  renderTenseDetail(selectedTenseId);
  renderPracticeOptions();
  renderExamSelector();
  renderQuiz();
  renderNotes();
  renderParagraphs();
  updateProgress();
  updateTimerUI();
  setActiveLink();
  revealOnScroll();
});