const tenses = [
  {
    id: "present-simple",
    name: "Present Simple",
    level: "Base",
    summary: "Hábitos, rutinas, verdades generales, estados y horarios.",
    structures: {
      affirmative: "Subject + base verb / verb + s-es with he, she, it",
      negative: "Subject + do/does not + base verb",
      question: "Do/Does + subject + base verb?"
    },
    uses: [
      "Acciones habituales",
      "Opiniones",
      "Situaciones permanentes",
      "Verdades generales",
      "Horarios"
    ],
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
    uses: [
      "Acción actual",
      "Situación temporal",
      "Plan futuro cercano",
      "Proceso en desarrollo"
    ],
    examples: [
      ["What are you doing?", "¿Qué estás haciendo?"],
      ["She is studying hard for her exam.", "Ella está estudiando mucho para su examen."],
      ["I am working until 9 p.m. this week.", "Estoy trabajando hasta las 21 esta semana."]
    ],
    prompt: "Describe what is happening around you right now. Use Present Continuous and at least three action verbs."
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
    uses: [
      "Acción terminada",
      "Secuencia de eventos",
      "Momento específico en el pasado"
    ],
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
    uses: [
      "Acción en progreso en pasado",
      "Acción larga interrumpida",
      "Contexto narrativo"
    ],
    examples: [
      ["At midnight we were driving home.", "A medianoche estábamos manejando a casa."],
      ["I was studying all day yesterday.", "Estuve estudiando todo el día ayer."],
      ["He wasn’t working.", "Él no estaba trabajando."]
    ],
    prompt: "Write a short story about what you were doing when something unexpected happened."
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
    uses: [
      "Experiencia",
      "Resultado actual",
      "Acción con for/since",
      "Pasado conectado al presente"
    ],
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
    uses: [
      "Duración hasta el presente",
      "Acción reciente con evidencia",
      "Proceso continuo"
    ],
    examples: [
      ["I have been waiting for the bus for a long time.", "Hace mucho que estoy esperando el colectivo."],
      ["He hasn’t been studying long.", "No lleva mucho tiempo estudiando."],
      ["How long have you been working?", "¿Hace cuánto estás trabajando?"]
    ],
    prompt: "Write about something you have been doing for weeks or months and explain your progress."
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
    uses: [
      "Acción anterior a otra pasada",
      "Narración",
      "Causa o antecedente"
    ],
    examples: [
      ["She had cooked lunch before she went to work.", "Ella había cocinado antes de ir al trabajo."],
      ["She hadn’t been to Rome before.", "Ella no había estado en Roma antes."],
      ["Had you ever seen such a crazy day?", "¿Alguna vez habías visto un día tan loco?"]
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
    uses: [
      "Duración antes de otro pasado",
      "Causa visible en pasado",
      "Narrativa avanzada"
    ],
    examples: [
      ["We had been waiting for hours when the train arrived.", "Habíamos estado esperando durante horas cuando llegó el tren."],
      ["I hadn’t been sleeping long.", "No había estado durmiendo mucho tiempo."],
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
    uses: [
      "Predicciones",
      "Promesas",
      "Decisiones espontáneas",
      "Ofrecimientos"
    ],
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
    uses: [
      "Planes futuros",
      "Intenciones",
      "Predicciones con evidencia"
    ],
    examples: [
      ["I’m going to study languages.", "Voy a estudiar idiomas."],
      ["It’s going to rain.", "Va a llover."],
      ["Are you going to travel next month?", "¿Vas a viajar el mes que viene?"]
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
    uses: [
      "Acción futura en progreso",
      "Planes como proceso",
      "Situaciones temporales futuras"
    ],
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
    uses: [
      "Acción completada antes de un futuro",
      "Metas cumplidas",
      "Resultados proyectados"
    ],
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
    uses: [
      "Duración hasta un punto futuro",
      "Continuidad",
      "Proyección avanzada"
    ],
    examples: [
      ["I will have been working here for ten years next month.", "El mes que viene habré estado trabajando acá durante diez años."],
      ["By July, she will have been studying for six months.", "Para julio, ella habrá estado estudiando durante seis meses."]
    ],
    prompt: "Write about something you will have been doing for a long time by a future date."
  }
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
];

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
const totalTenses = document.getElementById("totalTenses");

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

// examSelector is declared later; removed duplicate declaration
const quizContainer = document.getElementById("quizContainer");
const submitQuizBtn = document.getElementById("submitQuizBtn");
const resetQuizBtn = document.getElementById("resetQuizBtn");
const quizResult = document.getElementById("quizResult");
const quizScorePreview = document.getElementById("quizScorePreview");
const quizProgress = document.getElementById("quizProgress");

const savedParagraphsList = document.getElementById("savedParagraphsList");
const savedParagraphsCount = document.getElementById("savedParagraphsCount");
const clearParagraphsBtn = document.getElementById("clearParagraphsBtn");

const noteTitle = document.getElementById("noteTitle");
const noteText = document.getElementById("noteText");
const saveNoteBtn = document.getElementById("saveNoteBtn");
const clearNoteEditorBtn = document.getElementById("clearNoteEditorBtn");
const clearNotesBtn = document.getElementById("clearNotesBtn");
const notesList = document.getElementById("notesList");
const savedNotesCount = document.getElementById("savedNotesCount");

const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");
const revealElements = document.querySelectorAll(".reveal");

let selectedTenseId = tenses[0].id;
let paragraphs = JSON.parse(localStorage.getItem("englishTrainerParagraphs")) || [];
let notes = JSON.parse(localStorage.getItem("englishTrainerNotes")) || [];
let lastScore = localStorage.getItem("englishTrainerLastScore") || "0%";
let currentQuiz = [];

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

      document.getElementById("estructura").scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
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
    example.innerHTML = `
      <strong>${english}</strong>
      <span>${spanish}</span>
    `;
    examplesList.appendChild(example);
  });
}

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

  if (!text) {
    alert("Escribí un texto antes de guardarlo.");
    return;
  }

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

  practiceText.value = "";
  updateWordCounter();
  renderParagraphs();
}

function renderParagraphs() {
  savedParagraphsList.innerHTML = "";
  savedParagraphsCount.textContent = paragraphs.length;

  if (paragraphs.length === 0) {
    savedParagraphsList.innerHTML = `
      <div class="empty-state">
        Todavía no guardaste párrafos. Escribí una práctica de writing y guardala para verla acá.
      </div>
    `;
    return;
  }

  paragraphs.forEach((paragraph) => {
    const article = document.createElement("article");
    article.className = "saved-item";

    article.innerHTML = `
      <div class="saved-meta">
        <div>
          <strong>${escapeHTML(paragraph.title)}</strong>
          <span>${escapeHTML(paragraph.date)} · ${escapeHTML(paragraph.tense)}</span>
        </div>
      </div>

      <p>${escapeHTML(paragraph.text)}</p>

      <div class="item-actions">
        <button class="small-danger-btn" type="button" data-delete-paragraph="${paragraph.id}">
          Borrar párrafo
        </button>
      </div>
    `;

    savedParagraphsList.appendChild(article);
  });
}

function deleteParagraph(id) {
  paragraphs = paragraphs.filter((paragraph) => paragraph.id !== id);
  localStorage.setItem("englishTrainerParagraphs", JSON.stringify(paragraphs));
  renderParagraphs();
}

function runAICorrection() {
  const text = practiceText.value.trim();

  if (!text) {
    alert("Escribí un párrafo antes de corregirlo.");
    return;
  }

  const words = getWords(text);
  const sentences = text.split(/[.!?]+/).filter((sentence) => sentence.trim().length > 0);
  const lower = text.toLowerCase();

  const connectors = [
    "however",
    "therefore",
    "moreover",
    "although",
    "because",
    "while",
    "whereas",
    "in addition",
    "for example",
    "as a result",
    "on the other hand",
    "nevertheless"
  ];

  const foundConnectors = connectors.filter((connector) => lower.includes(connector));
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
  const coachIntro = createCoachIntro(band);

  const strengths = [];

  if (words.length >= 80) {
    strengths.push("Tu párrafo ya tiene una extensión razonable para desarrollar una idea.");
  } else {
    strengths.push("La idea inicial se entiende, pero todavía necesita más desarrollo para sonar como una respuesta IELTS completa.");
  }

  if (foundConnectors.length > 0) {
    strengths.push(`Usaste conectores útiles como ${foundConnectors.slice(0, 3).join(", ")}.`);
  } else {
    strengths.push("La base del texto está, pero conviene sumar conectores para que las ideas avancen con más naturalidad.");
  }

  const nextSteps = [
    "Agregá una oración inicial que responda directamente la consigna.",
    "Desarrollá una razón principal y después agregá un ejemplo concreto.",
    "Cerrá el párrafo con una frase final que refuerce tu idea.",
    "Intentá variar estructuras: una oración simple, una oración con because/although y una con relative clause."
  ];

  aiFeedback.classList.remove("hidden");
  aiFeedback.innerHTML = `
    <h4>Feedback de IA Coach</h4>

    <p class="coach-message">
      ${coachIntro}
    </p>

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
          <p>${detectedIssues.length ? detectedIssues.join(" ") : "No detecté errores frecuentes graves. El próximo paso es mejorar precisión, variedad y naturalidad."}</p>
        </article>

        <article>
          <strong>Próximo objetivo</strong>
          <p>${nextSteps.slice(0, 3).join(" ")}</p>
        </article>
      </div>
    </div>

    <div class="corrected-box">
      <strong>Versión corregida orientativa</strong>
      <p>${escapeHTML(correctedText)}</p>
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

  return "Tu texto tiene una intención clara, pero todavía necesita más estructura. Yo lo trabajaría como haría un entrenador: primero una oración principal clara, después una explicación simple, luego un ejemplo y finalmente una frase de cierre. Eso solo ya mejoraría mucho la respuesta.";
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

  if (/\bvery important\b/gi.test(text) && text.match(/\bvery important\b/gi)?.length > 1) {
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

function saveNote(title, text) {
  const newNote = {
    id: createId(),
    title: title || "Apunte sin título",
    text,
    date: new Date().toLocaleDateString("es-AR")
  };

  notes.unshift(newNote);
  localStorage.setItem("englishTrainerNotes", JSON.stringify(notes));
  renderNotes();
}

function renderNotes() {
  notesList.innerHTML = "";
  savedNotesCount.textContent = notes.length;

  if (notes.length === 0) {
    notesList.innerHTML = `
      <div class="empty-state">
        Todavía no guardaste apuntes. Podés guardar textos largos, reglas, vocabulario o correcciones.
      </div>
    `;
    return;
  }

  notes.forEach((note) => {
    const article = document.createElement("article");
    article.className = "note-item";

    article.innerHTML = `
      <div class="note-meta">
        <div>
          <strong>${escapeHTML(note.title)}</strong>
          <span>${note.date}</span>
        </div>
      </div>

      <p>${escapeHTML(note.text)}</p>

      <div class="item-actions">
        <button class="small-danger-btn" type="button" data-delete-note="${note.id}">
          Borrar apunte
        </button>
      </div>
    `;

    notesList.appendChild(article);
  });
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

function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  localStorage.setItem("englishTrainerNotes", JSON.stringify(notes));
  renderNotes();
}

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
      question: "Which tense describes an action before another past action?",
      correct: "Past Perfect",
      wrong: ["Past Simple", "Future Simple", "Present Continuous"]
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
    const options = seededShuffle([template.correct, ...template.wrong], i + 11);
    const answer = options.indexOf(template.correct);

    bank.push({
      question: template.question,
      options,
      answer
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

  currentQuiz.forEach((question, questionIndex) => {
    const article = document.createElement("article");
    article.className = "quiz-question";
    article.dataset.index = questionIndex;

    const optionsHTML = question.options.map((option, optionIndex) => {
      return `
        <label>
          <input 
            type="radio" 
            name="question-${questionIndex}" 
            value="${optionIndex}" 
          />
          <span>${option}</span>
        </label>
      `;
    }).join("");

    article.innerHTML = `
      <h4>${questionIndex + 1}. ${question.question}</h4>
      <div class="quiz-options">
        ${optionsHTML}
      </div>
    `;

    quizContainer.appendChild(article);
  });

  updateQuizProgress();
}

function updateQuizProgress() {
  const answered = currentQuiz.filter((_, index) => {
    return document.querySelector(`input[name="question-${index}"]:checked`);
  }).length;

  quizProgress.textContent = `${answered}/10 respondidas`;
}

function submitQuiz() {
  let correctAnswers = 0;

  currentQuiz.forEach((question, questionIndex) => {
    const questionElement = document.querySelector(`.quiz-question[data-index="${questionIndex}"]`);
    const selectedOption = document.querySelector(`input[name="question-${questionIndex}"]:checked`);

    questionElement.classList.remove("correct", "incorrect");

    if (!selectedOption) {
      questionElement.classList.add("incorrect");
      return;
    }

    const selectedValue = Number(selectedOption.value);

    if (selectedValue === question.answer) {
      correctAnswers++;
      questionElement.classList.add("correct");
    } else {
      questionElement.classList.add("incorrect");
    }
  });

  const percentage = Math.round((correctAnswers / currentQuiz.length) * 100);
  const resultText = `${correctAnswers}/10 correctas · ${percentage}%`;

  quizResult.textContent = resultText;
  quizScorePreview.textContent = `${percentage}%`;
  localStorage.setItem("englishTrainerLastScore", `${percentage}%`);
}

function resetQuiz() {
  renderQuiz();
}

function setActiveLink() {
  let currentSection = "inicio";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;

    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

function revealOnScroll() {
  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < window.innerHeight - 80) {
      element.classList.add("visible");
    }
  });
}

function getWords(text) {
  return text.trim().split(/\s+/).filter(Boolean);
}

function createId() {
  return crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random());
}

function escapeHTML(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

tenseSearch.addEventListener("input", () => {
  renderTenseCards(tenseSearch.value);
});

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

clearParagraphsBtn.addEventListener("click", () => {
  const confirmed = confirm("¿Seguro que querés borrar todos los párrafos guardados?");

  if (!confirmed) return;

  paragraphs = [];
  localStorage.removeItem("englishTrainerParagraphs");
  renderParagraphs();
});

savedParagraphsList.addEventListener("click", (event) => {
  const deleteButton = event.target.closest("[data-delete-paragraph]");

  if (!deleteButton) return;

  deleteParagraph(deleteButton.dataset.deleteParagraph);
});

saveNoteBtn.addEventListener("click", saveNoteFromEditor);

clearNoteEditorBtn.addEventListener("click", () => {
  noteTitle.value = "";
  noteText.value = "";
});

clearNotesBtn.addEventListener("click", () => {
  const confirmed = confirm("¿Seguro que querés borrar todos los apuntes guardados?");

  if (!confirmed) return;

  notes = [];
  localStorage.removeItem("englishTrainerNotes");
  renderNotes();
});

notesList.addEventListener("click", (event) => {
  const deleteButton = event.target.closest("[data-delete-note]");

  if (!deleteButton) return;

  deleteNote(deleteButton.dataset.deleteNote);
});

examSelector.addEventListener("change", renderQuiz);
quizContainer.addEventListener("change", updateQuizProgress);
submitQuizBtn.addEventListener("click", submitQuiz);
resetQuizBtn.addEventListener("click", resetQuiz);

// Manejo inteligente de los accesos directos a la sección de Apuntes Varios
document.querySelectorAll(".notes-shortcut-trigger").forEach(trigger => {
  trigger.addEventListener("click", (e) => {
    e.preventDefault();
    const targetSection = document.getElementById("apuntes");
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
      // Ejecuta un sutil retardo para esperar el desplazamiento antes de hacer foco en el input
      setTimeout(() => {
        noteTitle.focus();
      }, 600);
    }
  });
});

window.addEventListener("scroll", () => {
  setActiveLink();
  revealOnScroll();
});

window.addEventListener("load", () => {
  totalTenses.textContent = tenses.length;
  quizScorePreview.textContent = lastScore;

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