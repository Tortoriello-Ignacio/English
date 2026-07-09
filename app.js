
/* =========================================================
   DYNAMIC TITLE BOOT V25 - runs before app code
========================================================= */
(function dynamicTitleBootV25() {
  const frases = [
    "Entrená inglés con claridad, fluidez y precisión",
    "Domina inglés con foco en escritura y estructura",
    "Tu inglés más sólido: precisión, escritura y foco",
    "Aprendé inglés paso a paso, con método y claridad",
    "Entrenamiento de inglés: estructura, escritura y progreso",
    "Inglés claro y preciso, pensado para tu examen IELTS",
    "Convertí tu práctica en inglés seguro y estructurado",
    "Entrená inglés con foco en resultados y escritura",
    "Tu inglés listo para IELTS: claridad y precisión.",
    "Escribí mejor en inglés: estructura y confianza",
    "Entrená inglés con precisión y escritura efectiva",
    "Domina inglés con foco en claridad y resultados"
  ];

  let i = 1;
  let changeCount = 0;

  function init() {
    const titulo = document.getElementById("titulo-dinamico");
    if (!titulo || titulo.dataset.dynamicTitleReady === "true") return;

    titulo.dataset.dynamicTitleReady = "true";
    titulo.innerText = frases[0];

    window.setInterval(() => {
      titulo.classList.add("title-changing");

      window.setTimeout(() => {
        titulo.innerText = frases[i];
        i = (i + 1) % frases.length;
        changeCount += 1;

        // Cada 3 cambios, la frase aparece en cursiva/itálica.
        const italic = changeCount % 3 === 0;
        titulo.classList.toggle("title-italic", italic);

        titulo.classList.remove("title-changing");
      }, 220);
    }, 3000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.addEventListener("load", init);
})();

/* =========================================================
   ENGLISH TRAINER IELTS - APP.JS
   v8 full features: progreso, niveles, vocabulario, flashcards,
   filtros, quick practice, exportaciones y feedback guardable.
========================================================= */

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
  [
    "pick up",
    "levantar, recoger / aprender de forma casual",
    "She picked up the book from the floor."
  ],
  [
    "turn on / turn off",
    "encender / apagar",
    "Turn off the lights before you leave."
  ],
  [
    "look for",
    "buscar",
    "I’m looking for my keys."
  ],
  [
    "find out",
    "descubrir, averiguar",
    "I found out the truth yesterday."
  ],
  [
    "give up",
    "rendirse, dejar de hacer algo",
    "Don’t give up on your dreams."
  ],
  [
    "put on",
    "ponerse ropa / ganar peso",
    "He put on his jacket."
  ],
  [
    "take off",
    "despegar / quitarse ropa / tener éxito rápido",
    "The plane took off at 9 a.m."
  ],
  [
    "run out of",
    "quedarse sin",
    "We ran out of milk."
  ],
  [
    "come back",
    "regresar",
    "She came back home late."
  ],
  [
    "get along with",
    "llevarse bien",
    "I get along with my coworkers."
  ],
  [
    "set up",
    "organizar, montar, fundar",
    "They set up a new company."
  ],
  [
    "take care of",
    "cuidar, hacerse cargo",
    "She takes care of her little brother."
  ],
  [
    "wake up",
    "despertarse",
    "I wake up at 7 a.m."
  ],
  [
    "carry on",
    "continuar",
    "Carry on with your work."
  ],
  [
    "check out",
    "revisar, mirar / salir de hotel",
    "Check out this new song."
  ],
  [
    "break down",
    "averiarse / descomponerse emocionalmente",
    "My car broke down yesterday."
  ],
  [
    "bring up",
    "sacar un tema / criar",
    "She brought up an interesting point."
  ],
  [
    "call off",
    "cancelar",
    "They called off the meeting."
  ],
  [
    "come across",
    "encontrarse con algo/alguien por casualidad",
    "I came across an old photo."
  ],
  [
    "drop off",
    "dejar a alguien / quedarse dormido",
    "He dropped me off at the station."
  ],
  [
    "get over",
    "superar una enfermedad, problema o ruptura",
    "It took her weeks to get over the flu."
  ],
  [
    "go on",
    "continuar / suceder",
    "Please, go on with your story."
  ],
  [
    "look after",
    "cuidar",
    "She looks after her grandmother."
  ],
  [
    "make up",
    "inventar / reconciliarse / maquillarse",
    "He made up an excuse."
  ],
  [
    "put off",
    "posponer",
    "We had to put off the trip."
  ],
  [
    "show up",
    "aparecer, presentarse",
    "He didn’t show up to class."
  ],
  [
    "take up",
    "empezar una actividad / ocupar espacio",
    "She took up painting last year."
  ],
  [
    "work out",
    "hacer ejercicio / resolver / resultar",
    "We worked out the problem."
  ],
  [
    "hand in",
    "entregar tarea o documento",
    "Please hand in your homework."
  ],
  [
    "look forward to",
    "esperar con ilusión",
    "I look forward to meeting you."
  ],
  [
    "turn up",
    "aparecer / subir volumen",
    "She turned up unexpectedly."
  ],
  [
    "put up with",
    "tolerar",
    "I can’t put up with the noise."
  ],
  [
    "break up",
    "terminar una relación / separar",
    "They broke up last month."
  ],
  [
    "catch up with",
    "ponerse al día / alcanzar",
    "I need to catch up with my studies."
  ],
  [
    "hold on",
    "esperar / aferrarse",
    "Hold on a minute, please."
  ],
  [
    "keep up with",
    "mantener el ritmo",
    "She runs fast; I can’t keep up with her."
  ],
  [
    "take over",
    "asumir control",
    "He took over the family business."
  ],
  [
    "turn down",
    "rechazar / bajar volumen",
    "She turned down the job offer."
  ],
  [
    "write down",
    "anotar",
    "Write down the phone number."
  ],
  [
    "put away",
    "guardar",
    "I had to put away the groceries."
  ],
  [
    "ask for",
    "pedir, solicitar",
    "He asked for more information."
  ],
  [
    "back up",
    "respaldar / hacer copia",
    "Can you back up your argument with evidence?"
  ],
  [
    "blow up",
    "explotar / agrandar / enojarse mucho",
    "The old building blew up."
  ],
  [
    "bring back",
    "traer de vuelta / recordar",
    "This song brings back memories."
  ],
  [
    "bring about",
    "provocar, causar",
    "The policy brought about major changes."
  ],
  [
    "bring down",
    "reducir / derribar",
    "The government tried to bring down inflation."
  ],
  [
    "bring in",
    "introducir / generar dinero",
    "The company brought in new rules."
  ],
  [
    "brush up on",
    "repasar, refrescar conocimiento",
    "I need to brush up on my grammar."
  ],
  [
    "calm down",
    "calmarse",
    "Please calm down and explain what happened."
  ],
  [
    "carry out",
    "llevar a cabo",
    "The researchers carried out an experiment."
  ],
  [
    "come up with",
    "idear, proponer",
    "She came up with a great solution."
  ],
  [
    "come up",
    "surgir",
    "A new issue came up during the meeting."
  ],
  [
    "count on",
    "contar con",
    "You can count on me."
  ],
  [
    "cut down on",
    "reducir consumo",
    "I’m trying to cut down on sugar."
  ],
  [
    "deal with",
    "lidiar con, encargarse de",
    "We need to deal with this problem."
  ],
  [
    "do without",
    "arreglárselas sin",
    "I can’t do without my phone."
  ],
  [
    "dress up",
    "vestirse elegante / disfrazarse",
    "They dressed up for the party."
  ],
  [
    "end up",
    "terminar resultando",
    "We ended up staying at home."
  ],
  [
    "fall apart",
    "desmoronarse / romperse",
    "The plan fell apart."
  ],
  [
    "fall behind",
    "quedarse atrás",
    "He fell behind in his studies."
  ],
  [
    "figure out",
    "descifrar, entender",
    "I finally figured out the answer."
  ],
  [
    "fill in",
    "completar un formulario",
    "Please fill in this form."
  ],
  [
    "fill out",
    "completar un documento",
    "You must fill out the application."
  ],
  [
    "get away",
    "escaparse / irse de viaje",
    "We got away for the weekend."
  ],
  [
    "get away with",
    "salirse con la suya",
    "He got away with cheating."
  ],
  [
    "get back",
    "volver / recuperar",
    "I’ll get back to you tomorrow."
  ],
  [
    "get by",
    "arreglárselas",
    "I can get by in English."
  ],
  [
    "get in",
    "entrar / subir a un vehículo",
    "Get in the car."
  ],
  [
    "get off",
    "bajarse / salir del trabajo",
    "I get off work at six."
  ],
  [
    "get on",
    "subirse / llevarse",
    "Get on the bus."
  ],
  [
    "get out",
    "salir",
    "Get out of the room."
  ],
  [
    "get through",
    "superar / comunicarse",
    "She got through a difficult year."
  ],
  [
    "give away",
    "regalar / revelar",
    "He gave away the secret."
  ],
  [
    "give back",
    "devolver",
    "Please give back my book."
  ],
  [
    "give in",
    "ceder, rendirse",
    "She finally gave in."
  ],
  [
    "go ahead",
    "seguir adelante / autorizar",
    "Go ahead and start."
  ],
  [
    "go back",
    "volver",
    "We went back to the hotel."
  ],
  [
    "go over",
    "repasar, revisar",
    "Let’s go over the lesson again."
  ],
  [
    "grow up",
    "crecer",
    "He grew up in Buenos Aires."
  ],
  [
    "hang out",
    "pasar el rato",
    "We hung out after class."
  ],
  [
    "join in",
    "sumarse, participar",
    "Everyone joined in the discussion."
  ],
  [
    "keep on",
    "seguir haciendo",
    "Keep on practicing."
  ],
  [
    "let down",
    "decepcionar",
    "Don’t let me down."
  ],
  [
    "log in / log out",
    "iniciar / cerrar sesión",
    "Log in with your password."
  ],
  [
    "look into",
    "investigar",
    "The police are looking into the case."
  ],
  [
    "look up",
    "buscar información / mejorar",
    "Look up the word in a dictionary."
  ],
  [
    "look up to",
    "admirar",
    "She looks up to her teacher."
  ],
  [
    "look down on",
    "menospreciar",
    "He looks down on people unfairly."
  ],
  [
    "make out",
    "distinguir / entender",
    "I can’t make out what he is saying."
  ],
  [
    "move on",
    "seguir adelante",
    "It’s time to move on."
  ],
  [
    "pass away",
    "fallecer",
    "His grandfather passed away last year."
  ],
  [
    "pass out",
    "desmayarse / repartir",
    "He passed out during the ceremony."
  ],
  [
    "pay back",
    "devolver dinero",
    "I’ll pay you back tomorrow."
  ],
  [
    "point out",
    "señalar",
    "She pointed out a mistake."
  ],
  [
    "pull over",
    "detener el auto al costado",
    "The driver pulled over."
  ],
  [
    "put down",
    "anotar / criticar",
    "Put down your name here."
  ],
  [
    "put out",
    "apagar fuego / publicar",
    "Firefighters put out the fire."
  ],
  [
    "rely on",
    "depender de, confiar en",
    "You can rely on her."
  ],
  [
    "rule out",
    "descartar",
    "The doctor ruled out infection."
  ],
  [
    "run into",
    "encontrarse con alguien / chocar",
    "I ran into an old friend."
  ],
  [
    "run over",
    "atropellar / revisar rápido",
    "Let’s run over the plan."
  ],
  [
    "send back",
    "devolver, reenviar",
    "I sent the package back."
  ],
  [
    "sort out",
    "resolver, ordenar",
    "We need to sort out this issue."
  ],
  [
    "stand out",
    "destacarse",
    "Her essay stands out."
  ],
  [
    "stand for",
    "significar / representar",
    "IELTS stands for International English Language Testing System."
  ],
  [
    "take after",
    "parecerse a un familiar",
    "She takes after her mother."
  ],
  [
    "take back",
    "retirar lo dicho / devolver",
    "I take back what I said."
  ],
  [
    "take in",
    "absorber / entender / alojar",
    "It was hard to take in all the information."
  ],
  [
    "take on",
    "asumir responsabilidad",
    "She took on a new role."
  ],
  [
    "talk over",
    "discutir, conversar",
    "We should talk it over."
  ],
  [
    "think over",
    "pensar detenidamente",
    "Think it over before deciding."
  ],
  [
    "throw away",
    "tirar a la basura",
    "Don’t throw away those notes."
  ],
  [
    "try on",
    "probarse ropa",
    "Can I try on this jacket?"
  ],
  [
    "try out",
    "probar algo",
    "I want to try out this method."
  ],
  [
    "use up",
    "agotar, consumir todo",
    "We used up all the paper."
  ],
  [
    "watch out",
    "tener cuidado",
    "Watch out! The floor is wet."
  ],
  [
    "wear out",
    "desgastar / agotar",
    "The long trip wore me out."
  ],
  [
    "wipe out",
    "eliminar por completo",
    "The disease wiped out the population."
  ]
];

const modalVerbs = [
  [
    "Can",
    "Poder / capacidad presente: I can swim."
  ],
  [
    "Could",
    "Podía / podría / pedido educado: Could you help me?"
  ],
  [
    "Be able to",
    "Ser capaz de / poder: I will be able to travel."
  ],
  [
    "May",
    "Puede que / permiso formal: May I come in?"
  ],
  [
    "Might",
    "Podría / posibilidad menor: It might rain."
  ],
  [
    "Must",
    "Debe / obligación fuerte o deducción: You must study."
  ],
  [
    "Have to",
    "Tener que / obligación externa: I have to work."
  ],
  [
    "Had to",
    "Tuve que / obligación pasada: I had to leave."
  ],
  [
    "Need to",
    "Necesitar hacer algo: You need to practice."
  ],
  [
    "Needn’t",
    "No hace falta: You needn’t worry."
  ],
  [
    "Don’t have to",
    "No tener obligación: You don’t have to come."
  ],
  [
    "Mustn’t",
    "No deber / prohibición: You mustn’t smoke here."
  ],
  [
    "Should",
    "Debería / consejo: You should rest."
  ],
  [
    "Should have",
    "Debería haber: You should have called."
  ],
  [
    "Ought to",
    "Debería / consejo formal: You ought to apologize."
  ],
  [
    "Had better",
    "Más vale que: You had better hurry."
  ],
  [
    "Would",
    "Condicional / hábitos pasados / cortesía: I would travel."
  ],
  [
    "Would like to",
    "Me gustaría: I would like to improve."
  ],
  [
    "Would rather",
    "Preferiría: I would rather stay home."
  ],
  [
    "Would have",
    "Habría: I would have helped."
  ],
  [
    "Will",
    "Futuro / voluntad: I will help you."
  ],
  [
    "Won’t",
    "No será / negativa futura: She won’t come."
  ],
  [
    "Shall",
    "Futuro formal / sugerencia: Shall we begin?"
  ],
  [
    "Shouldn’t",
    "No debería: You shouldn’t give up."
  ],
  [
    "May have",
    "Puede haber: He may have forgotten."
  ],
  [
    "Might have",
    "Podría haber: She might have left."
  ],
  [
    "Must have",
    "Debe haber: He must have been tired."
  ],
  [
    "Could have",
    "Podría haber: I could have helped."
  ],
  [
    "Can’t have",
    "No puede haber: He can’t have said that."
  ],
  [
    "Used to",
    "Solía: I used to play tennis."
  ],
  [
    "Be used to",
    "Estar acostumbrado a: I am used to studying."
  ],
  [
    "Get used to",
    "Acostumbrarse a: I’m getting used to English."
  ],
  [
    "Do / Does",
    "Auxiliar de presente simple: Do you speak English?"
  ],
  [
    "Did",
    "Auxiliar de pasado simple: Did you go?"
  ],
  [
    "Have / Has",
    "Auxiliar de perfectos: I have finished."
  ],
  [
    "Had",
    "Auxiliar de past perfect: She had left."
  ],
  [
    "Am / Is / Are",
    "Auxiliar de continuous y verbo to be: She is working."
  ],
  [
    "Was / Were",
    "Auxiliar pasado de to be: They were studying."
  ],
  [
    "Be",
    "Ser/estar o auxiliar pasivo: It can be done."
  ],
  [
    "Being",
    "Siendo / forma continua: He is being careful."
  ],
  [
    "Been",
    "Participio de be: I have been busy."
  ],
  [
    "Let",
    "Permitir / dejar: Let me explain."
  ],
  [
    "Make",
    "Hacer que alguien haga / crear: This makes me think."
  ],
  [
    "Help",
    "Ayudar a: This helps me improve."
  ],
  [
    "Want to",
    "Querer: I want to learn."
  ],
  [
    "Hope to",
    "Esperar hacer algo: I hope to pass."
  ],
  [
    "Wish",
    "Ojalá / desear: I wish I spoke better."
  ],
  [
    "Prefer to",
    "Preferir: I prefer to study at night."
  ],
  [
    "Be supposed to",
    "Se supone que / deber esperado: I’m supposed to arrive early."
  ],
  [
    "Be likely to",
    "Ser probable que: It is likely to rain."
  ],
  [
    "Be allowed to",
    "Tener permiso para: We are allowed to leave."
  ],
  [
    "Be going to",
    "Futuro planeado: I’m going to study."
  ],
  [
    "Manage to",
    "Lograr hacer algo: I managed to finish."
  ],
  [
    "Fail to",
    "No lograr: He failed to answer."
  ],
  [
    "Seem to",
    "Parecer: It seems to be correct."
  ],
  [
    "Tend to",
    "Tender a: People tend to forget."
  ],
  [
    "Be about to",
    "Estar por: I’m about to start."
  ],
  [
    "Be willing to",
    "Estar dispuesto a: I’m willing to help."
  ],
  [
    "Be due to",
    "Tener previsto / debido a: The train is due to arrive."
  ],
  [
    "Be meant to",
    "Estar pensado para / se supone que: This is meant to help."
  ]
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

const modePrompts = {
  task1: [
    "Describe the information in a simple chart about students learning online. Focus on comparison and trends.",
    "Summarize a process explaining how a habit becomes part of a daily routine.",
    "Describe changes in language learning habits over a ten-year period."
  ],
  task2: ieltsPrompts[6],
  free: [
    "Write a free paragraph about your current goals in English.",
    "Write about something you want to improve this month.",
    "Explain why consistency matters when learning a language."
  ],
  translation: [
    "Translate this idea into English and expand it: Si practicás todos los días, vas a mejorar más rápido.",
    "Translate and expand: Aunque estudiar gramática es importante, también hay que practicar escritura.",
    "Translate and expand: Si hubiera tenido más tiempo, habría escrito una respuesta mejor."
  ],
  rewrite: [
    "Rewrite a simple idea in a more academic style: English is very important for work.",
    "Rewrite this in a more formal way: Technology helps students learn better.",
    "Rewrite this with better vocabulary: People need to study a lot to improve."
  ]
};

const quickSentences = [
  {
    topic: "Third Conditional",
    es: "Si hubiera estudiado más, habría aprobado el examen.",
    answer: "If I had studied more, I would have passed the exam.",
    keywords: ["if", "had studied", "would have passed"]
  },
  {
    topic: "First Conditional",
    es: "Si llueve mañana, me quedaré en casa.",
    answer: "If it rains tomorrow, I will stay at home.",
    keywords: ["if", "rains", "will stay"]
  },
  {
    topic: "Second Conditional",
    es: "Si tuviera más tiempo, practicaría inglés todos los días.",
    answer: "If I had more time, I would practice English every day.",
    keywords: ["if", "had", "would practice"]
  },
  {
    topic: "Present Perfect",
    es: "He estudiado inglés durante dos meses.",
    answer: "I have studied English for two months.",
    keywords: ["have studied", "for two months"]
  },
  {
    topic: "Modal verbs",
    es: "Deberías repasar los phrasal verbs antes del examen.",
    answer: "You should review phrasal verbs before the exam.",
    keywords: ["should", "review", "before"]
  },
  {
    topic: "Future Perfect",
    es: "Para fin de año, habré mejorado mi escritura.",
    answer: "By the end of the year, I will have improved my writing.",
    keywords: ["will have improved", "by the end"]
  },
  {
    topic: "Despite",
    es: "A pesar de la dificultad, siguió practicando.",
    answer: "Despite the difficulty, he kept practicing.",
    keywords: ["despite", "kept practicing"]
  },
  {
    topic: "Used to",
    es: "Antes solía estudiar por la noche.",
    answer: "I used to study at night.",
    keywords: ["used to", "study"]
  }
];

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

const practiceMode = document.getElementById("practiceMode");
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
const timerDisplay = document.getElementById("timerDisplay");
const timerProgressRing = document.getElementById("timerProgressRing");
const customMinutes = document.getElementById("customMinutes");
const customTimerBtn = document.getElementById("customTimerBtn");
const startTimerBtn = document.getElementById("startTimerBtn");
const pauseTimerBtn = document.getElementById("pauseTimerBtn");
const resetTimerBtn = document.getElementById("resetTimerBtn");
const settingsToggleBtn = document.getElementById("settingsToggleBtn");
const settingsPanel = document.getElementById("settingsPanel");
const settingsCloseBtn = document.getElementById("settingsCloseBtn");
const themeGrid = document.getElementById("themeGrid");
const themeIntensity = document.getElementById("themeIntensity");
const themeIntensityLabel = document.getElementById("themeIntensityLabel");
const palettePreview = document.getElementById("palettePreview");
const resetProgressBtn = document.getElementById("resetProgressBtn");


const quickTopic = document.getElementById("quickTopic");
const quickPrompt = document.getElementById("quickPrompt");
const quickAnswer = document.getElementById("quickAnswer");
const quickFeedback = document.getElementById("quickFeedback");
const newQuickBtn = document.getElementById("newQuickBtn");
const checkQuickBtn = document.getElementById("checkQuickBtn");
const showQuickAnswerBtn = document.getElementById("showQuickAnswerBtn");

const vocabWord = document.getElementById("vocabWord");
const vocabMeaning = document.getElementById("vocabMeaning");
const vocabExample = document.getElementById("vocabExample");
const vocabCategory = document.getElementById("vocabCategory");
const saveVocabBtn = document.getElementById("saveVocabBtn");
const vocabSearch = document.getElementById("vocabSearch");
const vocabFilter = document.getElementById("vocabFilter");
const vocabList = document.getElementById("vocabList");

const phrasalSearch = document.getElementById("phrasalSearch");
const phrasalFilter = document.getElementById("phrasalFilter");
const modalSearch = document.getElementById("modalSearch");

const flashcardSource = document.getElementById("flashcardSource");
const flashcard = document.getElementById("flashcard");
const flashcardType = document.getElementById("flashcardType");
const flashcardFront = document.getElementById("flashcardFront");
const flashcardBack = document.getElementById("flashcardBack");
const flashcardExample = document.getElementById("flashcardExample");
const flashcardStats = document.getElementById("flashcardStats");
const flipCardBtn = document.getElementById("flipCardBtn");
const knownCardBtn = document.getElementById("knownCardBtn");
const hardCardBtn = document.getElementById("hardCardBtn");
const repeatCardBtn = document.getElementById("repeatCardBtn");
const nextCardBtn = document.getElementById("nextCardBtn");

const exportNotesBtn = document.getElementById("exportNotesBtn");
const exportParagraphsBtn = document.getElementById("exportParagraphsBtn");
const exportProgressBtn = document.getElementById("exportProgressBtn");
const exportVocabBtn = document.getElementById("exportVocabBtn");

const revealElements = document.querySelectorAll(".reveal");
const navLinks = document.querySelectorAll("[data-dashboard-link]");

/* =========================
   ESTADO
========================= */

let selectedTenseId = tenses[0].id;
let paragraphs = JSON.parse(localStorage.getItem("englishTrainerParagraphs")) || [];
let notes = JSON.parse(localStorage.getItem("englishTrainerNotes")) || [];
let vocabulary = JSON.parse(localStorage.getItem("englishTrainerVocabulary")) || [];
let studySeconds = Number(localStorage.getItem("englishTrainerStudySeconds")) || 0;
let weeklySeconds = Number(localStorage.getItem("englishTrainerWeeklySeconds")) || 0;
let examsCompleted = Number(localStorage.getItem("englishTrainerExamsCompleted")) || 0;
let scoreHistory = JSON.parse(localStorage.getItem("englishTrainerScoreHistory")) || [];
let topicStats = JSON.parse(localStorage.getItem("englishTrainerTopicStats")) || {};
let activityLog = JSON.parse(localStorage.getItem("englishTrainerActivityLog")) || [];
let lastActivity = localStorage.getItem("englishTrainerLastActivity") || "";
let currentQuiz = [];
let currentQuickIndex = 0;
let latestCorrectionText = "";
let currentFlashcards = [];
let flashcardIndex = 0;
let flashcardShowingBack = false;
let flashcardCount = Number(localStorage.getItem("englishTrainerFlashcardCount")) || 0;

let timerSecondsLeft = 0;
let timerInitialSeconds = 0;
let timerInterval = null;
let timerPaused = false;
let selectedTheme = localStorage.getItem("englishTrainerTheme") || "orange";
let selectedIntensity = Number(localStorage.getItem("englishTrainerThemeIntensity")) || 2;


/* =========================
   VISTAS / NAVEGACIÓN
========================= */

function openResources(tab = "apuntes") {
  dashboardView.hidden = true;
  resourcesView.hidden = false;
  activateResourceTab(tab);
  setResourceNavActive(tab);
  navLinks.forEach((link) => link.classList.remove("active"));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setDashboardMode(sectionId = "inicio") {
  const dashboardSections = document.querySelectorAll("#dashboardView main section[id]");

  dashboardSections.forEach((section) => {
    if (sectionId === "inicio") {
      section.classList.remove("dashboard-section-hidden");
      return;
    }

    section.classList.toggle("dashboard-section-hidden", section.id !== sectionId);
  });
}

function openDashboard(sectionId = "inicio") {
  resourcesView.hidden = true;
  dashboardView.hidden = false;
  setResourceNavActive(null);
  setDashboardMode(sectionId);

  requestAnimationFrame(() => {
    const target = sectionId === "inicio"
      ? document.getElementById("inicio")
      : document.getElementById(sectionId);

    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });

    setActiveDashboardNav(sectionId);
  });
}

function setResourceNavActive(tab) {
  document.querySelectorAll(".resource-nav-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.resource === tab);
  });
}

function activateResourceTab(tab) {
  document.querySelectorAll(".resource-pane").forEach((pane) => {
    pane.classList.toggle("active-pane", pane.id === `tab-${tab}`);
  });
  setResourceNavActive(tab);
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
    event.preventDefault();
    openResources(resourceButton.dataset.resource);
  }
});

/* =========================
   PROGRESO / NIVELES
========================= */

function logActivity(label) {
  const today = new Date().toISOString().slice(0, 10);
  lastActivity = label;
  localStorage.setItem("englishTrainerLastActivity", label);

  activityLog.push({ label, date: today, at: new Date().toLocaleString("es-AR") });
  activityLog = activityLog.slice(-60);
  localStorage.setItem("englishTrainerActivityLog", JSON.stringify(activityLog));
  updateProgress();
}

function getStudyStreak() {
  const dates = [...new Set(activityLog.map((item) => item.date))].sort().reverse();
  if (!dates.length) return 0;

  let streak = 0;
  const cursor = new Date();
  for (let i = 0; i < 60; i++) {
    const iso = cursor.toISOString().slice(0, 10);
    if (dates.includes(iso)) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

function formatStudyTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${hours}h ${rest}m` : `${hours}h`;
}

function getAverageScore() {
  if (!scoreHistory.length) return 0;
  return Math.round(scoreHistory.reduce((acc, item) => acc + item, 0) / scoreHistory.length);
}

function getLevelInfo() {
  const avg = getAverageScore();
  const hours = studySeconds / 3600;
  const writings = paragraphs.length;

  let level = "A2+";
  let band = "4.5 → 5.0";
  let progress = 25;

  if (avg >= 50 || hours >= 2 || writings >= 2) {
    level = "B1";
    band = "5.0 → 5.5";
    progress = 42;
  }
  if (avg >= 65 || hours >= 6 || writings >= 6) {
    level = "B1+";
    band = "5.5 → 6.0";
    progress = 58;
  }
  if (avg >= 75 || hours >= 12 || writings >= 12) {
    level = "B2";
    band = "6.0 → 6.5";
    progress = 74;
  }
  if (avg >= 85 || hours >= 25 || writings >= 25) {
    level = "B2+";
    band = "6.5 → 7.0";
    progress = 88;
  }

  return { level, band, progress };
}

function statPercent(topic) {
  const stat = topicStats[topic];
  if (!stat || !stat.total) return 0;
  return Math.round((stat.correct / stat.total) * 100);
}

function updateProgress() {
  const studyMinutes = Math.floor(studySeconds / 60);
  const weeklyMinutes = Math.floor(weeklySeconds / 60);
  const avgScore = getAverageScore();
  const streak = getStudyStreak();
  const level = getLevelInfo();

  setText("studyTimeText", formatStudyTime(studySeconds));
  setWidth("studyTimeBar", Math.min((studyMinutes / 600) * 100, 100));

  setText("grammarCountText", tenses.length);

  setText("streakText", `${streak}`);
  setWidth("streakBar", Math.min((streak / 14) * 100, 100));

  setText("savedParagraphsCount", paragraphs.length);
  setWidth("paragraphProgressBar", Math.min((paragraphs.length / 20) * 100, 100));

  setText("avgScoreText", `${avgScore}%`);
  setWidth("avgScoreBar", avgScore);

  setText("weeklyGoalText", `${formatStudyTime(weeklySeconds)} / 5h`);
  setWidth("weeklyGoalBar", Math.min((weeklyMinutes / 300) * 100, 100));

  setText("levelText", level.level);
  setText("levelProgressText", `Camino IELTS: Band ${level.band}`);
  setWidth("levelBar", level.progress);

  setText("lastActivityText", lastActivity || "Sin actividad todavía");

  setText("statGrammar", `${statPercent("grammar")}%`);
  setText("statConditionals", `${statPercent("conditionals")}%`);
  setText("statPhrasals", `${statPercent("phrasals")}%`);
  setText("statModals", `${statPercent("modals")}%`);
  setText("statWriting", paragraphs.length);
}

/* Active session tracker V27 removed in V32: replaced by a single stable timer. */

function ensureHourglassTimerMarkup() {
  const ring = document.getElementById("timerProgressRing");

  if (!ring) return;

  ring.classList.remove("digital-timer-card");
  ring.classList.add("hourglass-timer-card");

  if (ring.querySelector(".hourglass-stage")) return;

  ring.innerHTML = `
    <div class="hourglass-time">
      <span id="timerDisplay" class="timer-display">00:00</span>
      <small>sesión de foco</small>
    </div>

    <div class="hourglass-stage" aria-hidden="true">
      <div class="hourglass-glow"></div>

      <div class="hourglass">
        <div class="hourglass-bulb top-bulb">
          <div class="sand top-sand"></div>
        </div>

        <div class="hourglass-neck">
          <span class="falling-line"></span>
          <span class="falling-particle particle-one"></span>
          <span class="falling-particle particle-two"></span>
          <span class="falling-particle particle-three"></span>
          <span class="falling-particle particle-four"></span>
          <span class="falling-particle particle-five"></span>
          <span class="falling-particle particle-six"></span>
        </div>

        <div class="hourglass-bulb bottom-bulb">
          <div class="sand bottom-sand"></div>
        </div>
      </div>
    </div>
  `;
}

/* =========================
   TIMER DIGITAL
========================= */

function toggleTimerPanel() {
  if (!timerPanel) return;
  timerPanel.classList.toggle("open");
}

function setTimer(minutes, silent) {
  const mins = Number(minutes);
  if (!mins || mins < 1) {
    if (!silent) alert("Ingresá una cantidad válida de minutos.");
    return;
  }

  clearInterval(timerInterval);
  timerInitialSeconds = mins * 60;
  timerSecondsLeft = timerInitialSeconds;
  timerPaused = false;
  timerInterval = null;

  if (timerProgressRing) timerProgressRing.classList.remove("timer-running", "timer-paused");

  if (pauseTimerBtn) pauseTimerBtn.classList.remove("is-active");
  if (startTimerBtn) {
    startTimerBtn.classList.remove("is-running");
    startTimerBtn.disabled = false;
  }
  updateTimerUI();
}

function startTimer() {
  if (!timerInitialSeconds || timerInitialSeconds < 1) {
    // Intentar tomar el valor del input directamente.
    const fromInput = customMinutes ? Number(customMinutes.value) : 0;
    if (fromInput >= 1) {
      setTimer(fromInput, true);
    } else {
      if (customMinutes) customMinutes.focus();
      return;
    }
  }
  if (timerInterval) return;

  // Quitar cualquier efecto de "tiempo cumplido" al reiniciar la cuenta.
  if (timerProgressRing) timerProgressRing.classList.remove("timer-finished");
  timerPaused = false;
  if (timerProgressRing) timerProgressRing.classList.add("timer-running");
  if (timerProgressRing) timerProgressRing.classList.remove("timer-paused");
  if (pauseTimerBtn) pauseTimerBtn.classList.remove("is-active");
  if (startTimerBtn) {
    startTimerBtn.classList.add("is-running");
    startTimerBtn.disabled = true;
  }

  timerInterval = setInterval(() => {
    if (timerPaused) return;
    timerSecondsLeft -= 1;
    updateTimerUI();

    if (timerSecondsLeft <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      studySeconds += timerInitialSeconds;
      weeklySeconds += timerInitialSeconds;
      localStorage.setItem("englishTrainerStudySeconds", String(studySeconds));
      localStorage.setItem("englishTrainerWeeklySeconds", String(weeklySeconds));
      logActivity(`Sesión de estudio: ${Math.round(timerInitialSeconds / 60)} minutos`);
      if (timerProgressRing) timerProgressRing.classList.remove("timer-running", "timer-paused");

      if (startTimerBtn) {
        startTimerBtn.classList.remove("is-running");
        startTimerBtn.disabled = false;
      }
      // Sin aviso emergente: el timer emite ondas brillantes del color del theme.
      if (timerProgressRing) timerProgressRing.classList.add("timer-finished");
    }
  }, 1000);
}

function updateTimerUI() {
  const remaining = Math.max(timerSecondsLeft, 0);
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;

  const timerDisplayEl = document.getElementById("timerDisplay");
  const timerRingEl = document.getElementById("timerProgressRing");

  if (timerDisplayEl) {
    timerDisplayEl.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  const progress = timerInitialSeconds
    ? (timerInitialSeconds - remaining) / timerInitialSeconds
    : 0;

  const degrees = Math.round(progress * 360);

  if (timerRingEl) {
    timerRingEl.style.setProperty("--timer-progress", `${degrees}deg`);
    timerRingEl.style.setProperty("--sand-progress", `${Math.round(progress * 100)}%`);
  }
}

if (timerToggleBtn) timerToggleBtn.addEventListener("click", toggleTimerPanel);

document.querySelectorAll(".preset-btn").forEach((button) => {
  button.addEventListener("click", () => setTimer(button.dataset.minutes));
});

if (customMinutes) {
  // Sin botón "Setear": el input configura el timer al cambiar.
  customMinutes.addEventListener("input", () => {
    if (timerInterval) return; // no reconfigurar mientras corre
    const v = Number(customMinutes.value);
    if (v >= 1) setTimer(v, true);
  });
}
if (customTimerBtn) customTimerBtn.addEventListener("click", () => setTimer(customMinutes.value));
if (startTimerBtn) startTimerBtn.addEventListener("click", startTimer);

if (pauseTimerBtn) {
  pauseTimerBtn.addEventListener("click", () => {
    if (!timerInterval) return;
    timerPaused = !timerPaused;
    pauseTimerBtn.classList.toggle("is-active", timerPaused);
    if (timerProgressRing) timerProgressRing.classList.toggle("timer-paused", timerPaused);
    if (timerProgressRing) timerProgressRing.classList.toggle("timer-running", !timerPaused);
    if (startTimerBtn) startTimerBtn.classList.toggle("is-running", !timerPaused);
  });
}

if (resetTimerBtn) {
  resetTimerBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    timerInterval = null;
    timerSecondsLeft = 0;
    timerInitialSeconds = 0;
    timerPaused = false;
    if (timerProgressRing) timerProgressRing.classList.remove("timer-running", "timer-paused", "timer-finished");
    if (startTimerBtn) {
      startTimerBtn.classList.remove("is-running");
      startTimerBtn.disabled = false;
    }
    updateTimerUI();
  });
}

/* =========================
   TABLAS / FILTROS
========================= */

function renderTables() {
  renderPhrasalTable();
  renderModalsTable();
}

function phrasalCategory(row) {
  const text = row.join(" ").toLowerCase();
  if (/(study|work|company|meeting|homework|argument|evidence|lesson|application|role|information|plan|issue)/.test(text)) return "study";
  if (/(home|jacket|milk|friend|party|car|bus|phone|room|groceries|noise)/.test(text)) return "daily";
  if (/(policy|research|significant|academic|evidence|issue|solution|method)/.test(text)) return "academic";
  return "all";
}

function renderPhrasalTable() {
  const body = document.getElementById("phrasalTableBody");
  if (!body) return;

  const query = (phrasalSearch?.value || "").toLowerCase().trim();
  const filter = phrasalFilter?.value || "all";

  const rows = phrasalVerbs.filter((row) => {
    const matchesQuery = row.join(" ").toLowerCase().includes(query);
    const category = phrasalCategory(row);
    const matchesFilter = filter === "all" || category === filter;
    return matchesQuery && matchesFilter;
  });

  body.innerHTML = rows.map(([verb, meaning, example]) => `
    <tr>
      <td>${escapeHTML(verb)}</td>
      <td>${escapeHTML(meaning)}</td>
      <td><em>${escapeHTML(example)}</em></td>
    </tr>
  `).join("");
}

function renderModalsTable() {
  const body = document.getElementById("modalsTableBody");
  if (!body) return;

  const query = (modalSearch?.value || "").toLowerCase().trim();

  const rows = modalVerbs.filter((row) => row.join(" ").toLowerCase().includes(query));

  body.innerHTML = rows.map(([word, meaning]) => `
    <tr>
      <td>${escapeHTML(word)}</td>
      <td>${escapeHTML(meaning)}</td>
    </tr>
  `).join("");
}

/* =========================
   GRAMÁTICA
========================= */

function renderTenseCards(filter = "") {
  if (!tenseGrid) return;
  tenseGrid.innerHTML = "";

  const query = filter.toLowerCase().trim();
  const filtered = tenses.filter((tense) => (
    tense.name.toLowerCase().includes(query)
    || tense.level.toLowerCase().includes(query)
    || tense.summary.toLowerCase().includes(query)
  ));

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
      renderTenseCards(tenseSearch?.value || "");
      renderTenseDetail(tense.id);
      setPracticeTense(tense.id);
      document.getElementById("estructura")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    tenseGrid.appendChild(card);
  });
}

function renderTenseDetail(tenseId) {
  const tense = tenses.find((item) => item.id === tenseId);
  if (!tense) return;

  setText("detailTitle", tense.name);
  setText("detailSummary", tense.summary);
  setText("detailLevel", tense.level);
  setText("affirmativeStructure", tense.structures.affirmative);
  setText("negativeStructure", tense.structures.negative);
  setText("questionStructure", tense.structures.question);

  if (usageList) usageList.innerHTML = tense.uses.map((use) => `<li>${escapeHTML(use)}</li>`).join("");
  if (examplesList) {
    examplesList.innerHTML = tense.examples.map(([english, spanish]) => `
      <article class="example-item">
        <strong>${escapeHTML(english)}</strong>
        <span>${escapeHTML(spanish)}</span>
      </article>
    `).join("");
  }
}

function renderPracticeOptions() {
  if (!practiceTense) return;
  practiceTense.innerHTML = tenses.map((tense) => `<option value="${tense.id}">${escapeHTML(tense.name)}</option>`).join("");
  setPracticeTense(selectedTenseId);
}

function setPracticeTense(tenseId) {
  const tense = tenses.find((item) => item.id === tenseId);
  if (!tense || !practiceTense) return;
  practiceTense.value = tense.id;
  generatePrompt();
}

function generatePrompt() {
  if (!practicePrompt) return;

  const mode = practiceMode?.value || "task2";
  const level = ieltsLevel?.value || "6";
  const tense = tenses.find((item) => item.id === practiceTense?.value) || tenses[0];

  let prompts = modePrompts[mode] || ieltsPrompts[level] || ieltsPrompts[6];
  if (mode === "task2") prompts = ieltsPrompts[level] || ieltsPrompts[6];

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
  if (!practiceText || !wordCounter) return;
  const words = getWords(practiceText.value);
  wordCounter.textContent = `${words.length} palabra${words.length === 1 ? "" : "s"}`;
}

function saveParagraph() {
  if (!practiceText) return;
  const text = practiceText.value.trim();
  if (!text) {
    alert("Escribí un texto antes de guardarlo.");
    return;
  }

  const tense = tenses.find((item) => item.id === practiceTense?.value);
  paragraphs.unshift({
    id: createId(),
    title: `Writing practice · ${tense ? tense.name : "General"}`,
    tense: tense ? tense.name : "General",
    date: new Date().toLocaleDateString("es-AR"),
    text
  });

  localStorage.setItem("englishTrainerParagraphs", JSON.stringify(paragraphs));
  practiceText.value = "";
  updateWordCounter();
  renderParagraphs();
  logActivity(`Writing guardado · ${tense ? tense.name : "General"}`);
}

function runAICorrection() {
  if (!practiceText || !aiFeedback) return;
  const text = practiceText.value.trim();
  if (!text) {
    alert("Escribí un párrafo antes de corregirlo.");
    return;
  }

  const words = getWords(text);
  const lower = text.toLowerCase();
  const sentences = text.split(/[.!?]+/).filter((sentence) => sentence.trim().length > 0);
  const connectors = ["however", "therefore", "moreover", "although", "because", "while", "whereas", "in addition", "for example", "as a result", "on the other hand"];
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

  const corrected = createCorrectedVersion(text);
  latestCorrectionText = `Feedback IA Coach\n\nTexto original:\n${text}\n\nBand estimado: ${band}\n\nCorrecciones:\n${issues.length ? issues.join(" ") : "No se detectaron errores frecuentes graves."}\n\nVersión orientativa:\n${corrected}`;

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
    <p class="coach-message">${createCoachIntro(band)}</p>

    <div class="ai-feedback-grid">
      <div class="band-score">
        <strong>${band}</strong>
        <span>IELTS estimated band</span>
      </div>

      <div class="feedback-list">
        <article>
          <strong>1. Impresión general</strong>
          <p>${strengths.join(" ")}</p>
        </article>
        <article>
          <strong>2. Correcciones frase por frase</strong>
          <p>${issues.length ? issues.join(" ") : "No detecté errores frecuentes graves. El próximo paso es mejorar precisión, variedad y naturalidad."}</p>
        </article>
        <article>
          <strong>3. Vocabulario alternativo</strong>
          <p>Podés variar palabras simples usando: significant, essential, likely, therefore, despite, as a result, to some extent.</p>
        </article>
        <article>
          <strong>4. Próximo objetivo</strong>
          <p>Agregá una oración inicial clara, desarrollá una razón principal con un ejemplo y cerrá el párrafo reforzando tu idea.</p>
        </article>
      </div>
    </div>

    <div class="corrected-box">
      <strong>5. Versión mejorada orientativa</strong>
      <p>${escapeHTML(corrected)}</p>
      <button id="saveCorrectionBtn" class="secondary-btn correction-save-btn" type="button">Guardar corrección</button>
    </div>
  `;

  document.getElementById("saveCorrectionBtn")?.addEventListener("click", () => {
    saveNote("Corrección IA Coach", latestCorrectionText);
    logActivity("Corrección IA guardada");
    alert("Corrección guardada en Apuntes.");
  });

  logActivity("Writing corregido con IA Coach");
}

function createCoachIntro(band) {
  if (band >= 7) return "Leí tu párrafo y la impresión general es buena: se entiende la idea, hay control razonable de la estructura y ya empezás a sonar más natural. Para llevarlo a un nivel más alto, trabajaría en precisión, vocabulario menos repetitivo y una conclusión más contundente.";
  if (band >= 6) return "Tu párrafo comunica la idea principal, que es lo más importante al principio. Todavía se nota que algunas frases podrían ordenarse mejor y que faltan conectores o ejemplos para que el texto sea más convincente.";
  return "Tu texto tiene una intención clara, pero todavía necesita más estructura. Primero armá una oración principal clara, después una explicación simple, luego un ejemplo y finalmente una frase de cierre.";
}

function detectCommonIssues(text) {
  const issues = [];
  if (/\bi am agree\b/i.test(text)) issues.push("No se dice “I am agree”; la forma correcta es “I agree”.");
  if (/\bpeople is\b/i.test(text)) issues.push("“People” normalmente funciona como plural: usá “people are”.");
  if (/\bhe have\b/i.test(text)) issues.push("Con he/she/it corresponde “has”, no “have”.");
  if (/\bshe go\b/i.test(text)) issues.push("En Present Simple con she corresponde “she goes”.");
  const veryImportantMatches = text.match(/\bvery important\b/gi);
  if (veryImportantMatches && veryImportantMatches.length > 1) issues.push("Repetís “very important”; podés variar con “essential”, “crucial” o “highly relevant”.");
  if (!/[.!?]$/.test(text.trim())) issues.push("El párrafo debería cerrar con puntuación final.");
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

  if (!/[.!?]$/.test(corrected)) corrected += ".";
  if (getWords(corrected).length < 80) {
    corrected += " For example, this situation can affect people’s opportunities, habits and long-term progress. Therefore, it is important to develop a clear opinion and support it with specific reasons.";
  }
  return corrected;
}

function hasComplexSentence(text) {
  return /\b(although|while|whereas|because|which|who|that|therefore|however)\b/i.test(text);
}

/* =========================
   PRÁCTICA RÁPIDA
========================= */

function renderQuickPractice() {
  const item = quickSentences[currentQuickIndex % quickSentences.length];
  setText("quickTopic", item.topic);
  setText("quickPrompt", item.es);
  if (quickAnswer) quickAnswer.value = "";
  if (quickFeedback) quickFeedback.innerHTML = "";
}

function checkQuickPractice(showAnswer = false) {
  const item = quickSentences[currentQuickIndex % quickSentences.length];
  const answer = (quickAnswer?.value || "").toLowerCase();
  const matched = item.keywords.filter((kw) => answer.includes(kw.toLowerCase()));
  const score = Math.round((matched.length / item.keywords.length) * 100);

  if (!quickFeedback) return;

  if (showAnswer) {
    quickFeedback.innerHTML = `<strong>Respuesta modelo:</strong><p>${escapeHTML(item.answer)}</p>`;
    return;
  }

  quickFeedback.innerHTML = `
    <strong>${score >= 70 ? "Bien encaminado" : "A revisar"}</strong>
    <p>Coincidencia estructural aproximada: ${score}%. ${score >= 70 ? "La estructura principal está presente." : "Revisá el tiempo verbal, auxiliar o condicional."}</p>
    <p><em>Modelo:</em> ${escapeHTML(item.answer)}</p>
  `;

  logActivity(`Práctica rápida · ${item.topic}`);
}

/* =========================
   APUNTES / PÁRRAFOS / VOCABULARIO
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
  const title = noteTitle?.value.trim() || "Apunte personal";
  const text = noteText?.value.trim() || "";

  if (!text) {
    alert("Escribí o pegá un texto antes de guardarlo.");
    return;
  }

  saveNote(title, text);
  noteTitle.value = "";
  noteText.value = "";
  logActivity(`Apunte guardado · ${title}`);
}

function renderNotes() {
  if (!notesList) return;
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
  if (!savedParagraphsList) return;
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

function saveVocabulary() {
  const word = vocabWord?.value.trim() || "";
  const meaning = vocabMeaning?.value.trim() || "";
  const example = vocabExample?.value.trim() || "";
  const category = vocabCategory?.value || "IELTS";

  if (!word || !meaning) {
    alert("Completá al menos palabra/frase y significado.");
    return;
  }

  vocabulary.unshift({ id: createId(), word, meaning, example, category, date: new Date().toLocaleDateString("es-AR") });
  localStorage.setItem("englishTrainerVocabulary", JSON.stringify(vocabulary));

  vocabWord.value = "";
  vocabMeaning.value = "";
  vocabExample.value = "";
  renderVocabulary();
  buildFlashcards();
  logActivity(`Vocabulario agregado · ${word}`);
}

function renderVocabulary() {
  if (!vocabList) return;

  const query = (vocabSearch?.value || "").toLowerCase().trim();
  const filter = vocabFilter?.value || "all";

  const rows = vocabulary.filter((item) => {
    const matchesQuery = `${item.word} ${item.meaning} ${item.example}`.toLowerCase().includes(query);
    const matchesFilter = filter === "all" || item.category === filter;
    return matchesQuery && matchesFilter;
  });

  if (!rows.length) {
    vocabList.innerHTML = `<div class="empty-state">Todavía no hay vocabulario guardado con ese filtro.</div>`;
    return;
  }

  vocabList.innerHTML = rows.map((item) => `
    <article class="vocab-item">
      <span>${escapeHTML(item.category)}</span>
      <strong>${escapeHTML(item.word)}</strong>
      <p>${escapeHTML(item.meaning)}</p>
      <small>${escapeHTML(item.example || "Sin ejemplo todavía.")}</small>
      <button class="small-danger-btn" type="button" data-delete-vocab="${item.id}">Borrar</button>
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

function deleteVocabulary(id) {
  vocabulary = vocabulary.filter((item) => item.id !== id);
  localStorage.setItem("englishTrainerVocabulary", JSON.stringify(vocabulary));
  renderVocabulary();
  buildFlashcards();
}

/* =========================
   FLASHCARDS
========================= */

function buildFlashcards() {
  const source = flashcardSource?.value || "phrasals";

  if (source === "modals") {
    currentFlashcards = modalVerbs.map(([front, back]) => ({ type: "Modal / auxiliar", front, back, example: "" }));
  } else if (source === "vocabulario") {
    currentFlashcards = vocabulary.map((item) => ({ type: item.category, front: item.word, back: item.meaning, example: item.example }));
  } else {
    currentFlashcards = phrasalVerbs.map(([front, back, example]) => ({ type: "Phrasal verb", front, back, example }));
  }

  flashcardIndex = 0;
  flashcardShowingBack = false;
  renderFlashcard();
}

function renderFlashcard() {
  if (!flashcardFront) return;

  if (!currentFlashcards.length) {
    setText("flashcardType", "Sin tarjetas");
    setText("flashcardFront", "Agregá vocabulario o cambiá la fuente");
    setText("flashcardBack", "");
    setText("flashcardExample", "");
    if (flashcard) flashcard.classList.remove("show-back");
    return;
  }

  const card = currentFlashcards[flashcardIndex % currentFlashcards.length];
  setText("flashcardType", card.type);
  setText("flashcardFront", card.front);
  setText("flashcardBack", card.back);
  setText("flashcardExample", card.example || "Sin ejemplo.");
  if (flashcard) flashcard.classList.toggle("show-back", flashcardShowingBack);
  setText("flashcardStats", `${flashcardCount} repasadas`);
}

function nextFlashcard() {
  if (!currentFlashcards.length) return;
  flashcardIndex = (flashcardIndex + 1) % currentFlashcards.length;
  flashcardShowingBack = false;
  renderFlashcard();
}

function recordFlashcard(result) {
  flashcardCount += 1;
  localStorage.setItem("englishTrainerFlashcardCount", String(flashcardCount));
  logActivity(`Flashcard · ${result}`);
  nextFlashcard();
}

/* =========================
   EXÁMENES
========================= */

function renderExamSelector() {
  if (!examSelector) return;
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
    { topic: "grammar", question: "Choose the correct Present Simple sentence.", correct: "She studies every morning.", wrong: ["She study every morning.", "She is study every morning.", "She studying every morning."] },
    { topic: "grammar", question: "Choose the correct Present Continuous sentence.", correct: "They are working now.", wrong: ["They working now.", "They are work now.", "They work yesterday."] },
    { topic: "grammar", question: "Choose the correct Past Simple sentence.", correct: "I visited London last year.", wrong: ["I visit London last year.", "I have visited London yesterday.", "I was visit London."] },
    { topic: "grammar", question: "Choose the correct Present Perfect sentence.", correct: "We have finished the project.", wrong: ["We has finished the project.", "We have finish the project.", "We finished the project tomorrow."] },
    { topic: "grammar", question: "Choose the correct Going to sentence.", correct: "It is going to rain.", wrong: ["It going to rain.", "It is going rain.", "It will going to rain."] },
    { topic: "conditionals", question: "Choose the correct Zero Conditional sentence.", correct: "If you heat water, it boils.", wrong: ["If you heat water, it will boils.", "If you heated water, it boils.", "If water heat, it boils."] },
    { topic: "conditionals", question: "Choose the correct First Conditional sentence.", correct: "If it rains, I will stay home.", wrong: ["If it will rain, I stay home.", "If it rained, I will stay home.", "If it rains, I would stayed home."] },
    { topic: "conditionals", question: "Choose the correct Second Conditional sentence.", correct: "If I had money, I would travel.", wrong: ["If I have money, I would travel.", "If I had money, I will travel.", "If I had money, I would travelled."] },
    { topic: "conditionals", question: "Choose the correct Third Conditional sentence.", correct: "If I had studied, I would have passed.", wrong: ["If I studied, I would have passed.", "If I had studied, I would pass.", "If I have studied, I would have passed."] },
    { topic: "phrasals", question: "Which phrasal verb means 'rendirse'?", correct: "give up", wrong: ["look for", "turn down", "set up"] },
    { topic: "phrasals", question: "Which phrasal verb means 'posponer'?", correct: "put off", wrong: ["take off", "bring up", "get in"] },
    { topic: "modals", question: "Choose the correct advice sentence.", correct: "You should practice every day.", wrong: ["You must to practice every day.", "You should to practice every day.", "You can to practice every day."] },
    { topic: "modals", question: "Which modal expresses obligation?", correct: "must", wrong: ["might", "could", "would rather"] },
    { topic: "grammar", question: "Which connector shows contrast?", correct: "However", wrong: ["Therefore", "Moreover", "For example"] },
    { topic: "grammar", question: "Which option is more academic?", correct: "This issue is significant.", wrong: ["This thing is very good.", "This stuff is nice.", "This is super cool."] }
  ];

  const bank = [];
  for (let i = 0; i < 1000; i++) {
    const template = templates[i % templates.length];
    const options = seededShuffle([template.correct, ...template.wrong], i + 17);
    bank.push({ topic: template.topic, question: template.question, options, answer: options.indexOf(template.correct) });
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
  if (!quizContainer || !examSelector) return;
  quizContainer.innerHTML = "";
  if (quizResult) quizResult.textContent = "";

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
  if (!quizProgress) return;
  const answered = currentQuiz.filter((_, index) => document.querySelector(`input[name="question-${index}"]:checked`)).length;
  quizProgress.textContent = `${answered}/10 respondidas`;
}

function submitQuiz() {
  let correct = 0;
  const localTopicStats = {};

  currentQuiz.forEach((question, index) => {
    const questionElement = document.querySelector(`.quiz-question[data-index="${index}"]`);
    const selected = document.querySelector(`input[name="question-${index}"]:checked`);
    if (!questionElement) return;

    questionElement.classList.remove("correct", "incorrect");

    localTopicStats[question.topic] = localTopicStats[question.topic] || { correct: 0, total: 0 };
    localTopicStats[question.topic].total += 1;

    if (!selected) {
      questionElement.classList.add("incorrect");
      return;
    }

    if (Number(selected.value) === question.answer) {
      correct += 1;
      localTopicStats[question.topic].correct += 1;
      questionElement.classList.add("correct");
    } else {
      questionElement.classList.add("incorrect");
    }
  });

  const percentage = Math.round((correct / currentQuiz.length) * 100);
  if (quizResult) quizResult.textContent = `${correct}/10 correctas · ${percentage}%`;

  examsCompleted += 1;
  scoreHistory.push(percentage);

  Object.entries(localTopicStats).forEach(([topic, stat]) => {
    topicStats[topic] = topicStats[topic] || { correct: 0, total: 0 };
    topicStats[topic].correct += stat.correct;
    topicStats[topic].total += stat.total;
  });

  localStorage.setItem("englishTrainerExamsCompleted", String(examsCompleted));
  localStorage.setItem("englishTrainerScoreHistory", JSON.stringify(scoreHistory));
  localStorage.setItem("englishTrainerTopicStats", JSON.stringify(topicStats));

  logActivity(`Examen completado · ${percentage}%`);
}

/* =========================
   EXPORTACIONES
========================= */

function downloadText(filename, content) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function exportNotes() {
  const text = notes.map((n) => `# ${n.title}\n${n.date}\n\n${n.text}`).join("\n\n---\n\n");
  downloadText("english-trainer-apuntes.txt", text || "Sin apuntes guardados.");
}

function exportParagraphs() {
  const text = paragraphs.map((p) => `# ${p.title}\n${p.date} · ${p.tense}\n\n${p.text}`).join("\n\n---\n\n");
  downloadText("english-trainer-writings.txt", text || "Sin writings guardados.");
}

function exportProgress() {
  const payload = {
    studySeconds,
    weeklySeconds,
    examsCompleted,
    averageScore: getAverageScore(),
    paragraphs: paragraphs.length,
    vocabulary: vocabulary.length,
    flashcardsReviewed: flashcardCount,
    level: getLevelInfo(),
    topicStats,
    lastActivity,
    activityLog
  };
  downloadText("english-trainer-progreso.json", JSON.stringify(payload, null, 2));
}

function exportVocabulary() {
  const text = vocabulary.map((v) => `# ${v.word}\nCategoría: ${v.category}\nSignificado: ${v.meaning}\nEjemplo: ${v.example || "-"}`).join("\n\n---\n\n");
  downloadText("english-trainer-vocabulario.txt", text || "Sin vocabulario guardado.");
}


/* =========================
   OPCIONES / THEMES
========================= */

const themePalettes = {
  orange: ["#7c2d12", "#c2410c", "#ff7a00", "#ff9f1c", "#fed7aa"],
  blue: ["#0f172a", "#1d4ed8", "#2563eb", "#38bdf8", "#dbeafe"],
  teal: ["#042f2e", "#0f766e", "#14b8a6", "#5eead4", "#ccfbf1"],
  indigo: ["#1e1b4b", "#4338ca", "#6366f1", "#a5b4fc", "#e0e7ff"],
  gold: ["#422006", "#a16207", "#d97706", "#facc15", "#fef3c7"],
  red: ["#450a0a", "#b91c1c", "#ef4444", "#fb7185", "#fee2e2"],
  rose: ["#4c0519", "#be123c", "#f43f5e", "#fda4af", "#ffe4e6"],
  green: ["#052e16", "#15803d", "#22c55e", "#86efac", "#dcfce7"],
  purple: ["#2e1065", "#6d28d9", "#8b5cf6", "#c084fc", "#f3e8ff"],
  gray: ["#0f0f0f", "#27272a", "#52525b", "#a1a1aa", "#f4f4f5"],
  white: ["#44403c", "#78716c", "#d6d3d1", "#f5f5f4", "#ffffff"],
  black: ["#030303", "#0a0a0a", "#171717", "#262626", "#404040"]
};

const intensityNames = ["muy oscuro", "oscuro", "medio", "claro", "luminoso"];

function mixHexColors(colorA, colorB, amount) {
  const a = hexToRgb(colorA);
  const b = hexToRgb(colorB);
  const t = Math.max(0, Math.min(Number(amount), 1));

  const r = Math.round(a.r + (b.r - a.r) * t);
  const g = Math.round(a.g + (b.g - a.g) * t);
  const bValue = Math.round(a.b + (b.b - a.b) * t);

  return rgbToHex(r, g, bValue);
}

function getContinuousColor(palette, value) {
  const numericValue = Math.max(0, Math.min(Number(value), palette.length - 1));
  const lowerIndex = Math.floor(numericValue);
  const upperIndex = Math.min(palette.length - 1, lowerIndex + 1);
  const localAmount = numericValue - lowerIndex;

  return mixHexColors(palette[lowerIndex], palette[upperIndex], localAmount);
}

function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map((value) => {
    const hex = value.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("");
}

function applyTheme(theme = selectedTheme, intensity = selectedIntensity) {
  selectedTheme = theme;
  selectedIntensity = Math.max(0, Math.min(Number(intensity), 4));

  const palette = themePalettes[selectedTheme] || themePalettes.orange;

  const accent = getContinuousColor(palette, selectedIntensity);
  const accentDark = getContinuousColor(palette, Math.max(0, selectedIntensity - 0.85));
  const accentSoft = getContinuousColor(palette, Math.min(4, selectedIntensity + 0.85));

  const rgb = hexToRgb(accent);
  const softRgb = hexToRgb(accentSoft);

  document.body.dataset.theme = selectedTheme;
  document.body.dataset.intensity = String(selectedIntensity);

  document.documentElement.style.setProperty("--orange", accent);
  document.documentElement.style.setProperty("--orange-soft", accentSoft);
  document.documentElement.style.setProperty("--amber", accentSoft);
  document.documentElement.style.setProperty("--copper", accentDark);
  document.documentElement.style.setProperty("--accent", accent);
  document.documentElement.style.setProperty("--accent-dark", accentDark);
  document.documentElement.style.setProperty("--accent-soft", accentSoft);
  document.documentElement.style.setProperty("--accent-rgb", `${rgb.r}, ${rgb.g}, ${rgb.b}`);
  document.documentElement.style.setProperty("--accent-soft-rgb", `${softRgb.r}, ${softRgb.g}, ${softRgb.b}`);
  document.documentElement.style.setProperty("--theme-range-gradient", `linear-gradient(90deg, ${palette.join(", ")})`);

  if (themeIntensity) themeIntensity.value = String(selectedIntensity);

  // Relleno del slider (barra del theme) y etiqueta de valor
  const pct = (Number(selectedIntensity) / 4) * 100;
  if (themeIntensity) themeIntensity.style.setProperty("--intensity-pct", `${pct}%`);
  const intensityValueLabel = document.getElementById("intensityValueLabel");
  if (intensityValueLabel) {
    const names = ["Muy oscuro", "Oscuro", "Medio", "Claro", "Luminoso"];
    const idx = Math.max(0, Math.min(names.length - 1, Math.round(Number(selectedIntensity))));
    intensityValueLabel.textContent = names[idx];
  }

  document.querySelectorAll(".theme-swatch").forEach((button) => {
    button.classList.toggle("active", button.dataset.theme === selectedTheme);
  });

  renderPalettePreview();

  localStorage.setItem("englishTrainerTheme", selectedTheme);
  localStorage.setItem("englishTrainerThemeIntensity", String(selectedIntensity));
}

function renderPalettePreview() {
  if (!palettePreview) return;

  const palette = themePalettes[selectedTheme] || themePalettes.orange;
  const gradient = `linear-gradient(90deg, ${palette.join(", ")})`;
  const position = (Number(selectedIntensity) / 4) * 100;

  palettePreview.style.setProperty("--palette-gradient", gradient);
  palettePreview.style.setProperty("--palette-position", `${position}%`);

  palettePreview.innerHTML = `
    <div class="palette-continuous" aria-hidden="true"></div>
    <div class="palette-selector" style="left:${position}%"></div>
  `;
}

function toggleSettingsPanel() {
  if (!settingsPanel) return;
  settingsPanel.classList.toggle("open");
}

function closeSettingsPanel() {
  if (!settingsPanel) return;
  settingsPanel.classList.remove("open");
}

function resetProgressCounters() {
  const confirmed = confirm("¿Seguro que querés reiniciar el progreso? No se borrarán apuntes, writings ni vocabulario.");

  if (!confirmed) return;

  studySeconds = 0;
  weeklySeconds = 0;
  examsCompleted = 0;
  scoreHistory = [];
  topicStats = {};
  activityLog = [];
  lastActivity = "";
  flashcardCount = 0;

  localStorage.removeItem("englishTrainerStudySeconds");
  localStorage.removeItem("englishTrainerWeeklySeconds");
  localStorage.removeItem("englishTrainerExamsCompleted");
  localStorage.removeItem("englishTrainerScoreHistory");
  localStorage.removeItem("englishTrainerTopicStats");
  localStorage.removeItem("englishTrainerActivityLog");
  localStorage.removeItem("englishTrainerLastActivity");
  localStorage.removeItem("englishTrainerFlashcardCount");

  updateProgress();
  renderFlashcard();

  alert("Progreso reiniciado.");
}

function hexToRgb(hex) {
  const normalized = hex.replace("#", "");
  const value = parseInt(normalized.length === 3
    ? normalized.split("").map((char) => char + char).join("")
    : normalized, 16);

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255
  };
}

/* =========================
   HELPERS / EVENTOS
========================= */

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function setWidth(id, value) {
  const el = document.getElementById(id);
  if (el) el.style.width = `${Math.max(0, Math.min(value, 100))}%`;
}

function setActiveDashboardNav(sectionId) {
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${sectionId}`);
  });
  setResourceNavActive(null);
}

function setActiveLink() {
  if (!dashboardView || dashboardView.hidden) return;

  const allSections = document.querySelectorAll("#dashboardView main section[id]");
  const hiddenSections = document.querySelectorAll("#dashboardView main section.dashboard-section-hidden");

  if (hiddenSections.length > 0) {
    const visibleSection = [...allSections].find((section) => !section.classList.contains("dashboard-section-hidden"));
    if (visibleSection) setActiveDashboardNav(visibleSection.id);
    return;
  }

  let current = "inicio";

  allSections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 160) current = section.id;
  });

  setActiveDashboardNav(current);
}

function revealOnScroll() {
  revealElements.forEach((element) => {
    if (element.getBoundingClientRect().top < window.innerHeight - 80) element.classList.add("visible");
  });
}

function createId() {
  return crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random());
}

function escapeHTML(text) {
  return String(text).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function bindEvents() {
  tenseSearch?.addEventListener("input", () => renderTenseCards(tenseSearch.value));
  practiceMode?.addEventListener("change", generatePrompt);
  ieltsLevel?.addEventListener("change", generatePrompt);
  practiceTense?.addEventListener("change", generatePrompt);
  newPromptBtn?.addEventListener("click", generatePrompt);
  practiceText?.addEventListener("input", updateWordCounter);

  clearTextBtn?.addEventListener("click", () => {
    practiceText.value = "";
    updateWordCounter();
    aiFeedback?.classList.add("hidden");
  });

  saveParagraphBtn?.addEventListener("click", saveParagraph);
  aiCorrectBtn?.addEventListener("click", runAICorrection);

  newQuickBtn?.addEventListener("click", () => {
    currentQuickIndex = (currentQuickIndex + 1) % quickSentences.length;
    renderQuickPractice();
  });
  checkQuickBtn?.addEventListener("click", () => checkQuickPractice(false));
  showQuickAnswerBtn?.addEventListener("click", () => checkQuickPractice(true));

  saveNoteBtn?.addEventListener("click", saveNoteFromEditor);
  clearNoteEditorBtn?.addEventListener("click", () => {
    noteTitle.value = "";
    noteText.value = "";
  });

  clearNotesBtn?.addEventListener("click", () => {
    if (!confirm("¿Seguro que querés borrar todos los apuntes?")) return;
    notes = [];
    localStorage.removeItem("englishTrainerNotes");
    renderNotes();
  });

  clearParagraphsBtn?.addEventListener("click", () => {
    if (!confirm("¿Seguro que querés borrar todos los párrafos guardados?")) return;
    paragraphs = [];
    localStorage.removeItem("englishTrainerParagraphs");
    renderParagraphs();
    updateProgress();
  });

  notesList?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-delete-note]");
    if (button) deleteNote(button.dataset.deleteNote);
  });

  savedParagraphsList?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-delete-paragraph]");
    if (button) deleteParagraph(button.dataset.deleteParagraph);
  });

  saveVocabBtn?.addEventListener("click", saveVocabulary);
  vocabSearch?.addEventListener("input", renderVocabulary);
  vocabFilter?.addEventListener("change", renderVocabulary);
  vocabList?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-delete-vocab]");
    if (button) deleteVocabulary(button.dataset.deleteVocab);
  });

  phrasalSearch?.addEventListener("input", renderPhrasalTable);
  phrasalFilter?.addEventListener("change", renderPhrasalTable);
  modalSearch?.addEventListener("input", renderModalsTable);

  flashcardSource?.addEventListener("change", buildFlashcards);
  flipCardBtn?.addEventListener("click", () => {
    flashcardShowingBack = !flashcardShowingBack;
    renderFlashcard();
  });
  knownCardBtn?.addEventListener("click", () => recordFlashcard("Lo sabía"));
  hardCardBtn?.addEventListener("click", () => recordFlashcard("Me costó"));
  repeatCardBtn?.addEventListener("click", () => recordFlashcard("Repetir después"));
  nextCardBtn?.addEventListener("click", nextFlashcard);

  examSelector?.addEventListener("change", renderQuiz);
  quizContainer?.addEventListener("change", updateQuizProgress);
  submitQuizBtn?.addEventListener("click", submitQuiz);
  resetQuizBtn?.addEventListener("click", renderQuiz);

  exportNotesBtn?.addEventListener("click", exportNotes);
  exportParagraphsBtn?.addEventListener("click", exportParagraphs);
  exportProgressBtn?.addEventListener("click", exportProgress);
  exportVocabBtn?.addEventListener("click", exportVocabulary);


  settingsToggleBtn?.addEventListener("click", toggleSettingsPanel);
  settingsCloseBtn?.addEventListener("click", closeSettingsPanel);
  resetProgressBtn?.addEventListener("click", resetProgressCounters);

  themeGrid?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-theme]");
    if (!button) return;
    applyTheme(button.dataset.theme, selectedIntensity);
  });

  themeIntensity?.addEventListener("input", () => {
    applyTheme(selectedTheme, Number(themeIntensity.value));
  });

  palettePreview?.addEventListener("click", (event) => {
    const rect = palettePreview.getBoundingClientRect();
    const ratio = Math.max(0, Math.min((event.clientX - rect.left) / rect.width, 1));
    applyTheme(selectedTheme, ratio * 4);
  });

  document.addEventListener("click", (event) => {
    if (!settingsPanel || !settingsPanel.classList.contains("open")) return;
    if (event.target.closest("#settingsPanel") || event.target.closest("#settingsToggleBtn")) return;
    closeSettingsPanel();
  });

  window.addEventListener("scroll", () => {
    setActiveLink();
    revealOnScroll();
  });
}

window.addEventListener("load", () => {
  applyTheme(selectedTheme, selectedIntensity);
  ensureHourglassTimerMarkup();
  setDashboardMode("inicio");
  bindEvents();
  renderTables();
  renderTenseCards();
  renderTenseDetail(selectedTenseId);
  renderPracticeOptions();
  renderExamSelector();
  renderQuiz();
  renderNotes();
  renderParagraphs();
  renderVocabulary();
  buildFlashcards();
  renderQuickPractice();
  updateProgress();
  updateTimerUI();
  setActiveLink();
  revealOnScroll();
});


/* =========================================================
   V16 PATCH - water hourglass, 500+ quick exercises,
   200+ extra flashcards, pronunciation support.
========================================================= */

const EXTRA_PHRASALS_V16 = [
  [
    "account for",
    "explicar, justificar",
    "How do you account for the sudden change?"
  ],
  [
    "act on",
    "actuar según, tomar medidas sobre",
    "The team acted on the feedback immediately."
  ],
  [
    "add up",
    "tener sentido, sumar",
    "His excuse doesn't add up."
  ],
  [
    "back up",
    "respaldar, apoyar",
    "Please back up your files before updating the system."
  ],
  [
    "bail out",
    "rescatar, sacar de un apuro",
    "The manager bailed us out with a quick solution."
  ],
  [
    "bear with",
    "tener paciencia con",
    "Please bear with me while I explain the data."
  ],
  [
    "blow up",
    "explotar, estallar",
    "The issue blew up on social media."
  ],
  [
    "break into",
    "irrumpir, empezar de repente",
    "She broke into tears during the movie."
  ],
  [
    "break out",
    "estallar, comenzar de repente",
    "A fire broke out in the lab."
  ],
  [
    "bring about",
    "provocar, causar",
    "The new policy brought about major changes."
  ],
  [
    "bring back",
    "traer de vuelta, recordar",
    "That song brings back good memories."
  ],
  [
    "bring forward",
    "adelantar",
    "They brought the meeting forward to 9 a.m."
  ],
  [
    "brush up on",
    "repasar, refrescar",
    "I need to brush up on my grammar."
  ],
  [
    "build up",
    "acumular, fortalecer",
    "She is building up her confidence."
  ],
  [
    "bump into",
    "encontrarse con casualmente",
    "I bumped into my old teacher yesterday."
  ],
  [
    "call back",
    "devolver la llamada",
    "I'll call you back after class."
  ],
  [
    "call off",
    "cancelar",
    "They called off the event because of the storm."
  ],
  [
    "calm down",
    "calmarse",
    "Take a breath and calm down."
  ],
  [
    "carry out",
    "llevar a cabo",
    "The researchers carried out several tests."
  ],
  [
    "catch on",
    "entender, ponerse de moda",
    "The concept finally caught on."
  ],
  [
    "check in",
    "registrarse",
    "We checked in at the hotel at noon."
  ],
  [
    "check over",
    "revisar",
    "Could you check over my essay?"
  ],
  [
    "chop up",
    "cortar en trozos",
    "Chop up the vegetables first."
  ],
  [
    "clean up",
    "limpiar, ordenar",
    "Let's clean up the desk."
  ],
  [
    "clear up",
    "aclarar, despejarse",
    "The teacher cleared up our doubts."
  ],
  [
    "close down",
    "cerrar definitivamente",
    "The factory closed down last year."
  ],
  [
    "come along",
    "venir, progresar",
    "How is your project coming along?"
  ],
  [
    "come apart",
    "desarmarse, romperse",
    "The old chair came apart."
  ],
  [
    "come down with",
    "contraer una enfermedad",
    "He came down with the flu."
  ],
  [
    "come from",
    "provenir de",
    "This quote comes from a famous speech."
  ],
  [
    "come up with",
    "idear, ocurrírsele",
    "She came up with a brilliant idea."
  ],
  [
    "count on",
    "contar con",
    "You can count on me."
  ],
  [
    "cut back on",
    "reducir",
    "I'm trying to cut back on sugar."
  ],
  [
    "cut down on",
    "reducir",
    "The company cut down on expenses."
  ],
  [
    "cut off",
    "cortar, interrumpir",
    "The call was cut off."
  ],
  [
    "deal with",
    "ocuparse de, tratar con",
    "We need to deal with the problem now."
  ],
  [
    "die down",
    "disminuir, apagarse",
    "The noise died down after midnight."
  ],
  [
    "do away with",
    "eliminar",
    "The school did away with that rule."
  ],
  [
    "do up",
    "abrochar, arreglar",
    "Do up your coat, it's cold."
  ],
  [
    "drag on",
    "prolongarse demasiado",
    "The meeting dragged on for hours."
  ],
  [
    "draw up",
    "redactar, elaborar",
    "The lawyer drew up the contract."
  ],
  [
    "drop by",
    "pasar a visitar",
    "Drop by my office later."
  ],
  [
    "end up",
    "terminar, acabar",
    "We ended up staying home."
  ],
  [
    "face up to",
    "afrontar",
    "You need to face up to reality."
  ],
  [
    "fall apart",
    "desmoronarse",
    "My plans fell apart."
  ],
  [
    "fall for",
    "caer en, enamorarse de",
    "Don't fall for that trick."
  ],
  [
    "figure out",
    "resolver, entender",
    "I can't figure out this question."
  ],
  [
    "fill in",
    "completar",
    "Please fill in the form."
  ],
  [
    "fill out",
    "rellenar",
    "Fill out your application carefully."
  ],
  [
    "fit in",
    "encajar, integrarse",
    "He fits in well with the group."
  ],
  [
    "follow up on",
    "dar seguimiento a",
    "I'll follow up on your request tomorrow."
  ],
  [
    "get across",
    "hacer entender",
    "The professor got the idea across clearly."
  ],
  [
    "get ahead",
    "progresar",
    "She wants to get ahead in her career."
  ],
  [
    "get away",
    "escaparse, irse de viaje",
    "We got away for the weekend."
  ],
  [
    "get back",
    "volver, recuperar",
    "When did you get back from London?"
  ],
  [
    "get by",
    "arreglárselas",
    "It's hard to get by on that salary."
  ],
  [
    "get in",
    "entrar, llegar",
    "What time did you get in last night?"
  ],
  [
    "get into",
    "interesarse por, meterse en",
    "He got into coding at school."
  ],
  [
    "get off",
    "bajarse, salir del trabajo",
    "I get off work at six."
  ],
  [
    "get on with",
    "seguir con, llevarse bien con",
    "Let's get on with the lesson."
  ],
  [
    "get rid of",
    "deshacerse de",
    "I need to get rid of old notes."
  ],
  [
    "get through",
    "superar, terminar",
    "We got through the hardest part."
  ],
  [
    "get together",
    "reunirse",
    "Let's get together this weekend."
  ],
  [
    "give away",
    "regalar, revelar",
    "He gave away the surprise."
  ],
  [
    "give in",
    "ceder",
    "Don't give in so easily."
  ],
  [
    "go against",
    "ir en contra de",
    "That decision goes against the rules."
  ],
  [
    "go ahead",
    "seguir adelante",
    "Go ahead and ask your question."
  ],
  [
    "go back",
    "volver",
    "I want to go back to that topic."
  ],
  [
    "go by",
    "pasar, guiarse por",
    "Time goes by quickly."
  ],
  [
    "go over",
    "repasar",
    "Let's go over the answers again."
  ],
  [
    "grow up",
    "crecer",
    "She grew up in Córdoba."
  ],
  [
    "hand over",
    "entregar",
    "Please hand over your assignment."
  ],
  [
    "hang out",
    "pasar el rato",
    "We usually hang out after class."
  ],
  [
    "hold back",
    "contener, frenar",
    "He held back his opinion."
  ],
  [
    "hold up",
    "demorar, sostener",
    "Traffic held us up."
  ],
  [
    "iron out",
    "resolver detalles",
    "We need to iron out a few issues."
  ],
  [
    "join in",
    "participar",
    "Everyone joined in the discussion."
  ],
  [
    "keep away",
    "mantener alejado",
    "Keep away from the wet paint."
  ],
  [
    "keep on",
    "seguir haciendo",
    "Keep on practicing every day."
  ],
  [
    "leave out",
    "omitir, dejar afuera",
    "You left out an important detail."
  ],
  [
    "let down",
    "decepcionar",
    "I don't want to let my team down."
  ],
  [
    "live up to",
    "estar a la altura de",
    "The course lived up to expectations."
  ],
  [
    "look after",
    "cuidar",
    "Who looks after the children?"
  ],
  [
    "look ahead",
    "pensar en el futuro",
    "It's time to look ahead."
  ],
  [
    "look back on",
    "recordar",
    "She looks back on that year fondly."
  ],
  [
    "look into",
    "investigar",
    "The committee will look into the issue."
  ],
  [
    "look up",
    "buscar información / mejorar",
    "Look the word up in a dictionary."
  ],
  [
    "make for",
    "contribuir a, dirigirse hacia",
    "Good habits make for better results."
  ],
  [
    "move on",
    "seguir adelante",
    "Let's move on to the next exercise."
  ],
  [
    "narrow down",
    "reducir opciones",
    "We narrowed down the choices."
  ],
  [
    "opt for",
    "optar por",
    "I opted for the online course."
  ],
  [
    "pass away",
    "fallecer",
    "His grandfather passed away last year."
  ],
  [
    "pass on",
    "transmitir, pasar",
    "Please pass on the message."
  ],
  [
    "pay off",
    "dar resultado, pagar",
    "Hard work paid off."
  ],
  [
    "pick out",
    "elegir, distinguir",
    "Can you pick out the main idea?"
  ],
  [
    "point out",
    "señalar",
    "She pointed out the mistake."
  ],
  [
    "pull off",
    "lograr con éxito",
    "They pulled off a difficult experiment."
  ],
  [
    "pull through",
    "recuperarse",
    "He pulled through after the operation."
  ],
  [
    "put aside",
    "dejar de lado, ahorrar",
    "Put aside some time for practice."
  ],
  [
    "put away",
    "guardar",
    "Put your notes away after class."
  ],
  [
    "put back",
    "volver a poner",
    "Please put the book back."
  ],
  [
    "put down",
    "anotar / menospreciar",
    "Put down your ideas before you forget them."
  ],
  [
    "put forward",
    "proponer",
    "She put forward a useful suggestion."
  ],
  [
    "put through",
    "comunicar por teléfono / someter",
    "The operator put me through to the manager."
  ],
  [
    "rely on",
    "depender de",
    "Many students rely on flashcards."
  ],
  [
    "rule out",
    "descartar",
    "The doctor ruled out an infection."
  ],
  [
    "run across",
    "encontrarse con",
    "I ran across an interesting article."
  ],
  [
    "run into",
    "chocar con / encontrarse",
    "We ran into a few problems."
  ],
  [
    "see through",
    "darse cuenta de / acompañar hasta el final",
    "I can see through that excuse."
  ],
  [
    "set aside",
    "reservar, apartar",
    "Set aside an hour for English."
  ],
  [
    "set back",
    "retrasar",
    "The storm set us back by two days."
  ],
  [
    "settle down",
    "calmarse, establecerse",
    "The class settled down quickly."
  ],
  [
    "show off",
    "presumir",
    "He loves to show off his pronunciation."
  ],
  [
    "sort out",
    "organizar, resolver",
    "Let's sort out your study plan."
  ],
  [
    "speak up",
    "hablar más fuerte",
    "Could you speak up, please?"
  ],
  [
    "stand by",
    "estar preparado / apoyar",
    "The nurse stood by during the procedure."
  ],
  [
    "stand out",
    "destacarse",
    "Her vocabulary really stands out."
  ],
  [
    "stick to",
    "atenerse a, mantener",
    "Stick to your study routine."
  ],
  [
    "sum up",
    "resumir",
    "To sum up, consistency matters."
  ],
  [
    "switch off",
    "desconectar, apagarse mentalmente",
    "I switch off after a long meeting."
  ],
  [
    "take after",
    "parecerse a",
    "She takes after her mother."
  ],
  [
    "take away",
    "quitar / sacar conclusión",
    "What did you take away from the lecture?"
  ],
  [
    "take back",
    "retirar lo dicho",
    "I take back what I said."
  ],
  [
    "take down",
    "anotar / desmontar",
    "Take down the key points."
  ],
  [
    "take in",
    "absorber, entender, alojar",
    "It took me time to take in the information."
  ],
  [
    "talk over",
    "conversar, discutir",
    "Let's talk over your options."
  ],
  [
    "tear down",
    "derribar",
    "They tore down the old building."
  ],
  [
    "think over",
    "pensar detenidamente",
    "Think over your answer."
  ],
  [
    "throw away",
    "tirar",
    "Don't throw away those notes."
  ],
  [
    "try on",
    "probarse ropa",
    "She tried on three jackets."
  ],
  [
    "turn around",
    "dar vuelta, revertir",
    "The team turned the project around."
  ],
  [
    "use up",
    "agotar, gastar",
    "We used up all the paper."
  ],
  [
    "warm up",
    "entrar en calor",
    "Let's warm up with easy questions."
  ],
  [
    "wear out",
    "agotar, desgastar",
    "That routine can wear you out."
  ],
  [
    "work around",
    "rodear un problema",
    "We worked around the issue."
  ],
  [
    "write up",
    "redactar",
    "Please write up your findings."
  ],
  [
    "zoom in on",
    "centrarse en",
    "Let's zoom in on conditionals."
  ]
];
const EXTRA_MODALS_V16 = [
  [
    "Can",
    "poder / capacidad: I can swim."
  ],
  [
    "Could",
    "podría / habilidad pasada / petición cortés: Could you help me?"
  ],
  [
    "May",
    "puede que / permiso: May I come in?"
  ],
  [
    "Might",
    "podría / posibilidad débil: It might rain later."
  ],
  [
    "Must",
    "deber / obligación fuerte: You must wear gloves."
  ],
  [
    "Should",
    "debería / consejo: You should review your notes."
  ],
  [
    "Ought to",
    "debería / recomendación formal: You ought to apologize."
  ],
  [
    "Would",
    "condicional / hábito pasado / cortesía: Would you like some tea?"
  ],
  [
    "Will",
    "futuro / voluntad: I will call you tomorrow."
  ],
  [
    "Shall",
    "oferta / sugerencia formal: Shall we begin?"
  ],
  [
    "Need",
    "necesitar / semi-modal: You need to rest."
  ],
  [
    "Needn't",
    "no es necesario: You needn't bring anything."
  ],
  [
    "Needn't have",
    "no hacía falta que...: You needn't have worried."
  ],
  [
    "Had better",
    "más vale que: You had better leave now."
  ],
  [
    "Would rather",
    "preferiría: I'd rather stay home."
  ],
  [
    "Used to",
    "solía: I used to play chess."
  ],
  [
    "Be able to",
    "ser capaz de: She is able to solve it."
  ],
  [
    "Have to",
    "tener que / obligación externa: I have to work."
  ],
  [
    "Has to",
    "tener que: He has to study."
  ],
  [
    "Had to",
    "tuvo que: They had to cancel the class."
  ],
  [
    "Don't have to",
    "no tener que: You don't have to come early."
  ],
  [
    "Mustn't",
    "prohibición: You mustn't park here."
  ],
  [
    "Can’t",
    "no poder / imposibilidad: I can't hear you."
  ],
  [
    "Couldn’t",
    "no podía / no pude: She couldn't attend."
  ],
  [
    "May not",
    "puede que no / no permiso: You may not enter."
  ],
  [
    "Might not",
    "puede que no: They might not arrive."
  ],
  [
    "Would like to",
    "quisiera: I would like to improve."
  ],
  [
    "Be supposed to",
    "se supone que: You're supposed to sign here."
  ],
  [
    "Be allowed to",
    "tener permiso para: Are we allowed to record?"
  ],
  [
    "Be meant to",
    "estar destinado / querer decir: What is this meant to show?"
  ],
  [
    "Dare",
    "atreverse: I daren't ask again."
  ],
  [
    "Dare not",
    "no atreverse: He dare not speak."
  ],
  [
    "Have got to",
    "tener que: I've got to finish this."
  ],
  [
    "Would have to",
    "tendría que: We would have to wait."
  ],
  [
    "Could have",
    "podría haber: You could have asked."
  ],
  [
    "Should have",
    "debería haber: She should have called."
  ],
  [
    "Would have",
    "habría: I would have helped."
  ],
  [
    "Might have",
    "podría haber: They might have missed the train."
  ],
  [
    "May have",
    "puede haber: He may have forgotten."
  ],
  [
    "Must have",
    "debe haber: She must have left already."
  ],
  [
    "Can't have",
    "no puede haber: He can't have seen it."
  ],
  [
    "Couldn't have",
    "no pudo haber: They couldn't have known."
  ],
  [
    "Needn't have",
    "no hacía falta que: You needn't have bought more."
  ],
  [
    "Shouldn't have",
    "no deberías haber: You shouldn't have said that."
  ],
  [
    "Would rather not",
    "preferiría no: I'd rather not discuss it now."
  ],
  [
    "Would sooner",
    "preferiría: I'd sooner leave early."
  ],
  [
    "Might as well",
    "bien podría: We might as well start."
  ],
  [
    "Would you mind...?",
    "¿te importaría...?: Would you mind opening the window?"
  ],
  [
    "Can I...?",
    "¿puedo...?: Can I ask a question?"
  ],
  [
    "Could I...?",
    "¿podría...?: Could I sit here?"
  ],
  [
    "May I...?",
    "¿me permite...?: May I leave now?"
  ],
  [
    "Must I...?",
    "¿tengo que...?: Must I submit it today?"
  ],
  [
    "Do I have to...?",
    "¿tengo que...?: Do I have to print it?"
  ],
  [
    "Need I...?",
    "¿es necesario que...?: Need I explain more?"
  ],
  [
    "Should I...?",
    "¿debería...?: Should I email the teacher?"
  ],
  [
    "Would you rather...?",
    "¿preferirías...?: Would you rather stay?"
  ],
  [
    "Could you...?",
    "¿podrías...?: Could you repeat that?"
  ],
  [
    "Would you...?",
    "¿harías / te gustaría...?: Would you join us?"
  ],
  [
    "Can you...?",
    "¿puedes...?: Can you carry this?"
  ],
  [
    "Shouldn't",
    "no debería: You shouldn't smoke here."
  ],
  [
    "Wouldn't",
    "no haría / no quiso: He wouldn't listen."
  ],
  [
    "Couldn't",
    "no podría: I couldn't finish on time."
  ],
  [
    "Mightn't",
    "quizá no / raro en uso moderno: She mightn't agree."
  ],
  [
    "Shan't",
    "no haré / forma británica: I shan't forget."
  ],
  [
    "Will be able to",
    "podrá: We will be able to join later."
  ],
  [
    "Won't be able to",
    "no podrá: She won't be able to attend."
  ],
  [
    "Used not to",
    "no solía: He used not to like coffee."
  ],
  [
    "Would often",
    "solía con frecuencia: My grandmother would often tell stories."
  ],
  [
    "Should be able to",
    "debería poder: You should be able to see it."
  ],
  [
    "Could be",
    "podría ser: It could be true."
  ],
  [
    "Could not be",
    "no podría ser: That could not be right."
  ],
  [
    "May well",
    "muy posiblemente: She may well win."
  ],
  [
    "Might well",
    "bien podría: They might well refuse."
  ],
  [
    "Must be",
    "debe ser: It must be difficult."
  ],
  [
    "Must not be",
    "no debe ser: This must not be ignored."
  ],
  [
    "Would seem to",
    "parecería: It would seem to help."
  ],
  [
    "Would tend to",
    "tendería a: These results would tend to support the idea."
  ],
  [
    "Need to",
    "necesitar: I need to practice more."
  ],
  [
    "Need not",
    "no necesitar: You need not worry."
  ],
  [
    "Ought not to",
    "no debería: You ought not to skip the basics."
  ],
  [
    "Be about to",
    "estar a punto de: The class is about to begin."
  ],
  [
    "Be likely to",
    "ser probable que: Prices are likely to rise."
  ],
  [
    "Be unlikely to",
    "ser poco probable que: He is unlikely to come."
  ],
  [
    "Be going to",
    "ir a / plan: I'm going to study tonight."
  ],
  [
    "Be willing to",
    "estar dispuesto a: She is willing to help."
  ],
  [
    "Be meant to",
    "estar previsto que: The meeting is meant to start at eight."
  ],
  [
    "Be due to",
    "estar programado para: The exam is due to begin soon."
  ],
  [
    "Would prefer to",
    "preferiría: I would prefer to stay."
  ],
  [
    "Can’t stand",
    "no soportar: I can't stand waiting."
  ],
  [
    "Be bound to",
    "seguramente: They are bound to notice."
  ],
  [
    "Had better not",
    "más vale que no: You had better not be late."
  ],
  [
    "Might want to",
    "quizá convenga / quizá quieras: You might want to revise that."
  ],
  [
    "Should consider",
    "deberías considerar: You should consider taking notes."
  ],
  [
    "Can hardly",
    "apenas poder: I can hardly believe it."
  ],
  [
    "Could do with",
    "me vendría bien: I could do with a break."
  ],
  [
    "Would love to",
    "me encantaría: I'd love to visit London."
  ],
  [
    "Would hate to",
    "odiaría: I'd hate to miss the class."
  ],
  [
    "May as well",
    "también podría: We may as well leave now."
  ]
];

if (!window.__englishTrainerV16DataLoaded) {
  window.__englishTrainerV16DataLoaded = true;

  EXTRA_PHRASALS_V16.forEach((item) => phrasalVerbs.push(item));
  EXTRA_MODALS_V16.forEach((item) => modalVerbs.push(item));

  const quickSubjects = [
    { es: "Lucía", en: "Lucía", pronoun: "she" },
    { es: "Tomás", en: "Tomás", pronoun: "he" },
    { es: "Micaela", en: "Micaela", pronoun: "she" },
    { es: "Santiago", en: "Santiago", pronoun: "he" },
    { es: "Martina", en: "Martina", pronoun: "she" },
    { es: "Nicolás", en: "Nicolás", pronoun: "he" },
    { es: "el equipo", en: "the team", pronoun: "it" },
    { es: "los estudiantes", en: "the students", pronoun: "they" },
    { es: "nosotros", en: "we", pronoun: "we" },
    { es: "yo", en: "I", pronoun: "I" }
  ];

  const thirdStudy = [
    {
      es: "hubiera estudiado más",
      en: ["had studied more", "had prepared more", "had worked harder"]
    },
    {
      es: "hubiera repasado con tiempo",
      en: ["had revised earlier", "had reviewed in advance", "had prepared in advance"]
    },
    {
      es: "hubiera practicado todos los días",
      en: ["had practiced every day", "had trained every day", "had worked every day"]
    },
    {
      es: "hubiera leído las instrucciones con cuidado",
      en: ["had read the instructions carefully", "had checked the instructions carefully", "had gone through the instructions carefully"]
    }
  ];

  const thirdResult = [
    {
      es: "habría aprobado el examen",
      en: ["would have passed the exam", "would have succeeded in the exam"]
    },
    {
      es: "habría obtenido una mejor nota",
      en: ["would have got a better grade", "would have received a better mark", "would have achieved a better score"]
    },
    {
      es: "habría terminado a tiempo",
      en: ["would have finished on time", "would have completed it on time"]
    },
    {
      es: "habría evitado el error",
      en: ["would have avoided the mistake", "would have prevented the error"]
    }
  ];

  const firstConditions = [
    {
      es: "si llueve mañana",
      en: ["if it rains tomorrow", "if it is rainy tomorrow"]
    },
    {
      es: "si terminás temprano",
      en: ["if you finish early", "if you complete it early"]
    },
    {
      es: "si el profesor responde hoy",
      en: ["if the teacher replies today", "if the teacher answers today"]
    },
    {
      es: "si practicamos un poco más",
      en: ["if we practice a little more", "if we train a little more"]
    },
    {
      es: "si el laboratorio abre a tiempo",
      en: ["if the laboratory opens on time", "if the lab opens on time"]
    }
  ];

  const firstResults = [
    {
      es: "me quedaré en casa",
      en: ["I will stay at home", "I will stay home"]
    },
    {
      es: "iremos juntos",
      en: ["we will go together", "we will head there together"]
    },
    {
      es: "te avisaré enseguida",
      en: ["I will let you know right away", "I will tell you immediately", "I will inform you straight away"]
    },
    {
      es: "podremos empezar antes",
      en: ["we will be able to start earlier", "we can start earlier"]
    },
    {
      es: "cancelaremos la reunión",
      en: ["we will cancel the meeting", "we will call off the meeting"]
    }
  ];

  const secondConditions = [
    {
      es: "si tuviera más tiempo",
      en: ["if I had more time", "if I had extra time"]
    },
    {
      es: "si ella hablara inglés con fluidez",
      en: ["if she spoke English fluently", "if she were fluent in English"]
    },
    {
      es: "si viviéramos cerca",
      en: ["if we lived nearby", "if we lived close by"]
    },
    {
      es: "si el curso fuera más barato",
      en: ["if the course were cheaper", "if the course was cheaper"]
    },
    {
      es: "si ellos tuvieran más experiencia",
      en: ["if they had more experience", "if they were more experienced"]
    }
  ];

  const secondResults = [
    {
      es: "viajaría más seguido",
      en: ["I would travel more often", "I would travel more frequently"]
    },
    {
      es: "aceptaría la propuesta",
      en: ["she would accept the proposal", "she would take the offer"]
    },
    {
      es: "nos mudaríamos allí",
      en: ["we would move there", "we would relocate there"]
    },
    {
      es: "lo comprarían de inmediato",
      en: ["they would buy it immediately", "they would purchase it straight away"]
    },
    {
      es: "trabajaría con vos",
      en: ["I would work with you", "I would collaborate with you"]
    }
  ];

  const presentPerfectActions = [
    {
      es: "he estudiado durante dos horas",
      en: ["I have studied for two hours", "I have been studying for two hours"]
    },
    {
      es: "ha mejorado mucho este año",
      en: ["she has improved a lot this year", "she has gotten much better this year"]
    },
    {
      es: "hemos terminado el informe",
      en: ["we have finished the report", "we have completed the report"]
    },
    {
      es: "todavía no han llegado",
      en: ["they haven't arrived yet", "they have not arrived yet"]
    },
    {
      es: "¿alguna vez visitaste Londres?",
      en: ["have you ever visited London?", "have you ever been to London?"]
    }
  ];

  const futurePerfectActions = [
    {
      es: "para fin de año habré terminado el curso",
      en: ["by the end of the year, I will have finished the course", "by year-end, I will have completed the course"]
    },
    {
      es: "para mañana ella habrá enviado el correo",
      en: ["by tomorrow, she will have sent the email", "by tomorrow, she will have emailed it"]
    },
    {
      es: "para las ocho habremos llegado",
      en: ["by eight o'clock, we will have arrived", "by eight, we will have got there"]
    },
    {
      es: "para la próxima semana ellos habrán resuelto el problema",
      en: ["by next week, they will have solved the problem", "by next week, they will have fixed the issue"]
    },
    {
      es: "para entonces ya habrás practicado suficiente",
      en: ["by then, you will have practiced enough", "by then, you will have trained enough"]
    }
  ];

  const modalPrompts = [
    {
      topic: "Modal verbs",
      es: "Deberías descansar un poco antes del examen.",
      answer: "You should rest a little before the exam.",
      acceptedAnswers: ["You should rest a little before the exam.", "You ought to rest a little before the exam."],
      keywords: ["you", "should", "rest", "exam"]
    },
    {
      topic: "Modal verbs",
      es: "Podría ayudarte mañana si termino temprano.",
      answer: "I could help you tomorrow if I finish early.",
      acceptedAnswers: ["I could help you tomorrow if I finish early.", "I would be able to help you tomorrow if I finish early."],
      keywords: ["could", "help", "tomorrow"]
    },
    {
      topic: "Modal verbs",
      es: "Tal vez ellos lleguen más tarde.",
      answer: "They might arrive later.",
      acceptedAnswers: ["They might arrive later.", "They may arrive later."],
      keywords: ["might", "arrive", "later"]
    },
    {
      topic: "Modal verbs",
      es: "No tenés que imprimir todo el documento.",
      answer: "You don't have to print the whole document.",
      acceptedAnswers: ["You don't have to print the whole document.", "You needn't print the whole document."],
      keywords: ["don't have to", "print", "document"]
    },
    {
      topic: "Modal verbs",
      es: "Más vale que salgas ahora.",
      answer: "You had better leave now.",
      acceptedAnswers: ["You had better leave now.", "You'd better leave now."],
      keywords: ["had better", "leave", "now"]
    }
  ];

  function generateQuickSentencesV16() {
    const generated = [];
    let guard = 0;

    while (generated.length < 520 && guard < 3000) {
      guard += 1;

      const subj = quickSubjects[generated.length % quickSubjects.length];
      const thirdA = thirdStudy[generated.length % thirdStudy.length];
      const thirdB = thirdResult[generated.length % thirdResult.length];
      const firstA = firstConditions[generated.length % firstConditions.length];
      const firstB = firstResults[generated.length % firstResults.length];
      const secondA = secondConditions[generated.length % secondConditions.length];
      const secondB = secondResults[generated.length % secondResults.length];
      const presentPerf = presentPerfectActions[generated.length % presentPerfectActions.length];
      const futurePerf = futurePerfectActions[generated.length % futurePerfectActions.length];

      const bundle = [
        {
          topic: "Third Conditional",
          es: `Si ${subj.es} ${thirdA.es}, ${thirdB.es}.`,
          answer: `If ${subj.en} ${thirdA.en[0]}, ${subj.pronoun === "I" ? "I" : subj.pronoun} ${thirdB.en[0]}.`,
          acceptedAnswers: thirdA.en.flatMap((a) => thirdB.en.map((b) => `If ${subj.en} ${a}, ${subj.pronoun === "I" ? "I" : subj.pronoun} ${b}.`)),
          keywords: ["if", "had", "would have"]
        },
        {
          topic: "First Conditional",
          es: `${firstA.es.charAt(0).toUpperCase() + firstA.es.slice(1)}, ${firstB.es}.`,
          answer: `${firstA.en[0].charAt(0).toUpperCase() + firstA.en[0].slice(1)}, ${firstB.en[0]}.`,
          acceptedAnswers: firstA.en.flatMap((a) => firstB.en.map((b) => `${a.charAt(0).toUpperCase() + a.slice(1)}, ${b}.`)),
          keywords: ["if", "will"]
        },
        {
          topic: "Second Conditional",
          es: `${secondA.es.charAt(0).toUpperCase() + secondA.es.slice(1)}, ${secondB.es}.`,
          answer: `${secondA.en[0].charAt(0).toUpperCase() + secondA.en[0].slice(1)}, ${secondB.en[0]}.`,
          acceptedAnswers: secondA.en.flatMap((a) => secondB.en.map((b) => `${a.charAt(0).toUpperCase() + a.slice(1)}, ${b}.`)),
          keywords: ["if", "would"]
        },
        {
          topic: "Present Perfect",
          es: `${presentPerf.es.charAt(0).toUpperCase() + presentPerf.es.slice(1)}.`,
          answer: `${presentPerf.en[0].charAt(0).toUpperCase() + presentPerf.en[0].slice(1)}.`,
          acceptedAnswers: presentPerf.en.map((a) => `${a.charAt(0).toUpperCase() + a.slice(1)}.`),
          keywords: ["have", "has"]
        },
        {
          topic: "Future Perfect",
          es: `${futurePerf.es.charAt(0).toUpperCase() + futurePerf.es.slice(1)}.`,
          answer: `${futurePerf.en[0].charAt(0).toUpperCase() + futurePerf.en[0].slice(1)}.`,
          acceptedAnswers: futurePerf.en.map((a) => `${a.charAt(0).toUpperCase() + a.slice(1)}.`),
          keywords: ["will have"]
        },
        modalPrompts[generated.length % modalPrompts.length]
      ];

      for (const item of bundle) {
        if (generated.length >= 520) break;
        generated.push(item);
      }
    }

    return generated;
  }

  quickSentences.push(...generateQuickSentencesV16());
}

function normalizeTrainerText(text = "") {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function textSimilarityV16(a, b) {
  const aTokens = normalizeTrainerText(a).split(" ").filter(Boolean);
  const bTokens = normalizeTrainerText(b).split(" ").filter(Boolean);
  if (!aTokens.length || !bTokens.length) return 0;
  const aSet = new Set(aTokens);
  const bSet = new Set(bTokens);
  let common = 0;
  aSet.forEach((token) => { if (bSet.has(token)) common += 1; });
  const ratioA = common / aSet.size;
  const ratioB = common / bSet.size;
  return Math.max(0, Math.min(1, (ratioA + ratioB) / 2));
}

function getAcceptedQuickAnswersV16(item) {
  const base = [item.answer].filter(Boolean);
  const more = Array.isArray(item.acceptedAnswers) ? item.acceptedAnswers : [];
  return [...new Set([...base, ...more])];
}

function isQuickAnswerAcceptedV16(userAnswer, item) {
  const normalizedUser = normalizeTrainerText(userAnswer);
  if (!normalizedUser) return { accepted: false, score: 0, bestMatch: "", similarity: 0 };

  const acceptedAnswers = getAcceptedQuickAnswersV16(item);
  let bestMatch = "";
  let bestSimilarity = 0;

  for (const option of acceptedAnswers) {
    const sim = textSimilarityV16(normalizedUser, option);
    if (sim > bestSimilarity) {
      bestSimilarity = sim;
      bestMatch = option;
    }
    if (normalizeTrainerText(option) === normalizedUser) {
      return { accepted: true, score: 100, bestMatch: option, similarity: 1 };
    }
  }

  const keywordScore = Array.isArray(item.keywords) && item.keywords.length
    ? item.keywords.filter((kw) => normalizeTrainerText(userAnswer).includes(normalizeTrainerText(kw))).length / item.keywords.length
    : 0;

  const finalScore = Math.round(Math.max(bestSimilarity, keywordScore) * 100);
  return {
    accepted: bestSimilarity >= 0.74 || keywordScore >= 0.75,
    score: finalScore,
    bestMatch,
    similarity: bestSimilarity
  };
}

function renderQuickPractice() {
  const item = quickSentences[currentQuickIndex % quickSentences.length];
  setText("quickTopic", item.topic);
  setText("quickPrompt", item.es);
  if (quickAnswer) quickAnswer.value = "";
  if (quickFeedback) quickFeedback.innerHTML = "";
}

function checkQuickPractice(showAnswer = false) {
  const item = quickSentences[currentQuickIndex % quickSentences.length];
  if (!quickFeedback) return;

  if (showAnswer) {
    const options = getAcceptedQuickAnswersV16(item).slice(0, 3);
    quickFeedback.innerHTML = `
      <strong>Respuesta modelo</strong>
      <p>${escapeHTML(item.answer)}</p>
      ${options.length > 1 ? `<p><strong>También se aceptan:</strong> ${options.slice(1).map(escapeHTML).join(" · ")}</p>` : ""}
    `;
    return;
  }

  const answer = quickAnswer?.value || "";
  const result = isQuickAnswerAcceptedV16(answer, item);

  quickFeedback.innerHTML = `
    <strong>${result.accepted ? "Muy bien" : "Ajustá un poco más la traducción"}</strong>
    <p>
      ${result.accepted
        ? `Tu respuesta entra dentro de las variantes válidas. Coincidencia aproximada: ${result.score}%.`
        : `Coincidencia aproximada: ${result.score}%. Revisá el tiempo verbal, el auxiliar o la elección del verbo principal.`}
    </p>
    <p><strong>Modelo base:</strong> ${escapeHTML(item.answer)}</p>
    ${result.bestMatch && normalizeTrainerText(result.bestMatch) !== normalizeTrainerText(item.answer)
      ? `<p><strong>Variante compatible:</strong> ${escapeHTML(result.bestMatch)}</p>`
      : ""}
  `;
}

function ensureFlashcardPronunciationNodeV16() {
  if (!flashcard) return null;
  let node = document.getElementById("flashcardPronunciation");
  if (!node) {
    node = document.createElement("small");
    node.id = "flashcardPronunciation";
    node.className = "flashcard-pronunciation";
    const back = document.getElementById("flashcardBack");
    if (back && back.parentNode) {
      back.insertAdjacentElement("afterend", node);
    } else {
      flashcard.appendChild(node);
    }
  }
  return node;
}

function toCastilianPronunciationV16(text = "") {
  return text
    .toLowerCase()
    .replace(/ing\b/g, "in")
    .replace(/tion/g, "shon")
    .replace(/ture/g, "cher")
    .replace(/ough/g, "of")
    .replace(/igh/g, "ai")
    .replace(/ph/g, "f")
    .replace(/th/g, "d")
    .replace(/sh/g, "sh")
    .replace(/ch/g, "ch")
    .replace(/qu/g, "ku")
    .replace(/ck/g, "k")
    .replace(/ee/g, "ii")
    .replace(/oo/g, "uu")
    .replace(/ou/g, "au")
    .replace(/ow/g, "au")
    .replace(/ay/g, "ei")
    .replace(/ai/g, "ei")
    .replace(/ea/g, "i")
    .replace(/er\b/g, "er")
    .replace(/ar\b/g, "ar")
    .replace(/wr/g, "r")
    .replace(/wh/g, "u")
    .replace(/w/g, "u")
    .replace(/v/g, "v")
    .replace(/x/g, "ks")
    .replace(/y/g, "i")
    .replace(/j/g, "y")
    .replace(/z/g, "s")
    .replace(/\s+/g, " ")
    .trim();
}

function buildFlashcards() {
  const source = flashcardSource?.value || "phrasals";

  if (source === "modals") {
    currentFlashcards = modalVerbs.map(([front, back]) => ({
      type: "Modal / auxiliar",
      front,
      back,
      example: "",
      pronunciation: toCastilianPronunciationV16(front)
    }));
  } else if (source === "vocabulario") {
    currentFlashcards = vocabulary.map((item) => ({
      type: item.category || "Vocabulario",
      front: item.word,
      back: item.meaning,
      example: item.example || "",
      pronunciation: toCastilianPronunciationV16(item.word)
    }));
  } else {
    currentFlashcards = phrasalVerbs.map(([front, back, example]) => ({
      type: "Phrasal verb",
      front,
      back,
      example,
      pronunciation: toCastilianPronunciationV16(front)
    }));
  }

  flashcardIndex = 0;
  flashcardShowingBack = false;
  renderFlashcard();
}

function renderFlashcard() {
  if (!flashcardFront) return;

  const pronunciationNode = ensureFlashcardPronunciationNodeV16();

  if (!currentFlashcards.length) {
    setText("flashcardType", "Sin tarjetas");
    setText("flashcardFront", "Agregá vocabulario o cambiá la fuente");
    setText("flashcardBack", "");
    setText("flashcardExample", "");
    if (pronunciationNode) pronunciationNode.textContent = "";
    if (flashcard) flashcard.classList.remove("show-back");
    return;
  }

  const card = currentFlashcards[flashcardIndex % currentFlashcards.length];
  setText("flashcardType", card.type);
  setText("flashcardFront", card.front);
  setText("flashcardBack", card.back);
  setText("flashcardExample", card.example || "");
  if (flashcardStats) flashcardStats.textContent = `${flashcardIndex + 1} / ${currentFlashcards.length}`;

  if (pronunciationNode) {
    pronunciationNode.textContent = flashcardShowingBack ? `Pronunciación aprox.: ${card.pronunciation || toCastilianPronunciationV16(card.front)}` : "";
  }

  if (flashcard) {
    flashcard.classList.toggle("show-back", flashcardShowingBack);
  }
}

function ensureHourglassTimerMarkup() {
  const ring = document.getElementById("timerProgressRing");
  if (!ring) return;

  ring.classList.remove("digital-timer-card");
  ring.classList.add("hourglass-timer-card");

  ring.innerHTML = `
    <div class="hourglass-time">
      <span id="timerDisplay" class="timer-display">00:00</span>
      <small>sesión de foco</small>
    </div>

    <div class="hourglass-stage water-stage" aria-hidden="true">
      <div class="hourglass-waterframe">
        <div class="frame-top"></div>
        <div class="frame-bottom"></div>
        <div class="frame-side left"></div>
        <div class="frame-side right"></div>

        <div class="glass-shell">
          <div class="glass-bowl upper-bowl">
            <div class="water-fill top-water">
              <span class="water-surface upper-surface"></span>
              <span class="bubble bubble-a"></span>
              <span class="bubble bubble-b"></span>
              <span class="bubble bubble-c"></span>
            </div>
          </div>

          <div class="glass-neck">
            <span class="water-stream"></span>
            <span class="water-drop drop-one"></span>
            <span class="water-drop drop-two"></span>
            <span class="water-drop drop-three"></span>
          </div>

          <div class="glass-bowl lower-bowl">
            <div class="water-fill bottom-water">
              <span class="water-surface lower-surface"></span>
              <span class="ripple ripple-a"></span>
              <span class="ripple ripple-b"></span>
              <span class="pool-bubble pool-a"></span>
              <span class="pool-bubble pool-b"></span>
              <span class="pool-bubble pool-c"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

if (typeof renderTables === "function") renderTables();
if (typeof buildFlashcards === "function") buildFlashcards();
if (typeof renderQuickPractice === "function") renderQuickPractice();
if (typeof ensureHourglassTimerMarkup === "function") ensureHourglassTimerMarkup();
if (typeof updateTimerUI === "function") updateTimerUI();


/* =========================================================
   FINAL V17 PATCH
   - Flashcards: fonética en itálica, sin texto "Pronunciación aprox.".
   - Práctica: ejercicios azarosos de todos los tiempos verbales.
   - Corrección: acepta variantes/sinónimos cercanos.
========================================================= */

(function finalV17Patch() {
  const extraQuickTemplatesV17 = [
    {
      topic: "Present Simple",
      make: (s) => ({
        es: `${capV17(s.es)} trabaja todos los días.`,
        answer: `${capV17(s.en)} works every day.`,
        acceptedAnswers: [`${capV17(s.en)} works every day.`, `${capV17(s.en)} works daily.`],
        keywords: [s.en, "works"]
      })
    },
    {
      topic: "Present Continuous",
      make: (s) => ({
        es: `${capV17(s.es)} está estudiando ahora.`,
        answer: `${capV17(s.en)} is studying now.`,
        acceptedAnswers: [`${capV17(s.en)} is studying now.`, `${capV17(s.en)} is currently studying.`],
        keywords: [s.en, "studying", "now"]
      })
    },
    {
      topic: "Past Simple",
      make: (s) => ({
        es: `${capV17(s.es)} terminó el informe ayer.`,
        answer: `${capV17(s.en)} finished the report yesterday.`,
        acceptedAnswers: [`${capV17(s.en)} finished the report yesterday.`, `${capV17(s.en)} completed the report yesterday.`],
        keywords: [s.en, "finished", "report"]
      })
    },
    {
      topic: "Past Continuous",
      make: (s) => ({
        es: `${capV17(s.es)} estaba leyendo cuando llamaste.`,
        answer: `${capV17(s.en)} was reading when you called.`,
        acceptedAnswers: [`${capV17(s.en)} was reading when you called.`, `${capV17(s.en)} was studying when you called.`],
        keywords: [s.en, "was", "reading", "called"]
      })
    },
    {
      topic: "Present Perfect",
      make: (s) => ({
        es: `${capV17(s.es)} ha visitado ese laboratorio varias veces.`,
        answer: `${capV17(s.en)} has visited that laboratory several times.`,
        acceptedAnswers: [`${capV17(s.en)} has visited that laboratory several times.`, `${capV17(s.en)} has been to that laboratory several times.`],
        keywords: [s.en, "has", "visited"]
      })
    },
    {
      topic: "Present Perfect Continuous",
      make: (s) => ({
        es: `${capV17(s.es)} ha estado practicando durante dos horas.`,
        answer: `${capV17(s.en)} has been practicing for two hours.`,
        acceptedAnswers: [`${capV17(s.en)} has been practicing for two hours.`, `${capV17(s.en)} has been training for two hours.`],
        keywords: [s.en, "has been", "practicing"]
      })
    },
    {
      topic: "Past Perfect",
      make: (s) => ({
        es: `${capV17(s.es)} ya había salido cuando llegamos.`,
        answer: `${capV17(s.en)} had already left when we arrived.`,
        acceptedAnswers: [`${capV17(s.en)} had already left when we arrived.`, `${capV17(s.en)} had gone already when we arrived.`],
        keywords: [s.en, "had", "left"]
      })
    },
    {
      topic: "Past Perfect Continuous",
      make: (s) => ({
        es: `${capV17(s.es)} había estado trabajando durante horas.`,
        answer: `${capV17(s.en)} had been working for hours.`,
        acceptedAnswers: [`${capV17(s.en)} had been working for hours.`, `${capV17(s.en)} had been studying for hours.`],
        keywords: [s.en, "had been", "working"]
      })
    },
    {
      topic: "Future Simple",
      make: (s) => ({
        es: `${capV17(s.es)} ayudará mañana.`,
        answer: `${capV17(s.en)} will help tomorrow.`,
        acceptedAnswers: [`${capV17(s.en)} will help tomorrow.`, `${capV17(s.en)} will assist tomorrow.`],
        keywords: [s.en, "will", "help"]
      })
    },
    {
      topic: "Going To",
      make: (s) => ({
        es: `${capV17(s.es)} va a empezar un nuevo curso.`,
        answer: `${capV17(s.en)} is going to start a new course.`,
        acceptedAnswers: [`${capV17(s.en)} is going to start a new course.`, `${capV17(s.en)} is going to begin a new course.`],
        keywords: [s.en, "going to", "start"]
      })
    },
    {
      topic: "Future Continuous",
      make: (s) => ({
        es: `${capV17(s.es)} estará trabajando mañana a esta hora.`,
        answer: `${capV17(s.en)} will be working at this time tomorrow.`,
        acceptedAnswers: [`${capV17(s.en)} will be working at this time tomorrow.`, `${capV17(s.en)} will be studying at this time tomorrow.`],
        keywords: [s.en, "will be", "working"]
      })
    },
    {
      topic: "Future Perfect",
      make: (s) => ({
        es: `${capV17(s.es)} habrá terminado para mañana.`,
        answer: `${capV17(s.en)} will have finished by tomorrow.`,
        acceptedAnswers: [`${capV17(s.en)} will have finished by tomorrow.`, `${capV17(s.en)} will have completed it by tomorrow.`],
        keywords: [s.en, "will have", "finished"]
      })
    },
    {
      topic: "Future Perfect Continuous",
      make: (s) => ({
        es: `${capV17(s.es)} habrá estado estudiando durante un año.`,
        answer: `${capV17(s.en)} will have been studying for a year.`,
        acceptedAnswers: [`${capV17(s.en)} will have been studying for a year.`, `${capV17(s.en)} will have been learning for a year.`],
        keywords: [s.en, "will have been", "studying"]
      })
    }
  ];

  const fixedConditionalsV17 = [
    {
      topic: "Zero Conditional",
      es: "Si calentás agua, hierve.",
      answer: "If you heat water, it boils.",
      acceptedAnswers: ["If you heat water, it boils.", "Water boils if you heat it."],
      keywords: ["if", "heat", "boils"]
    },
    {
      topic: "First Conditional",
      es: "Si llueve mañana, nos quedaremos en casa.",
      answer: "If it rains tomorrow, we will stay at home.",
      acceptedAnswers: ["If it rains tomorrow, we will stay at home.", "If it rains tomorrow, we will stay home.", "We will stay at home if it rains tomorrow."],
      keywords: ["if", "rains", "will stay"]
    },
    {
      topic: "Second Conditional",
      es: "Si tuviera más tiempo, viajaría más.",
      answer: "If I had more time, I would travel more.",
      acceptedAnswers: ["If I had more time, I would travel more.", "I would travel more if I had more time."],
      keywords: ["if", "had", "would"]
    },
    {
      topic: "Third Conditional",
      es: "Si hubiera estudiado más, habría aprobado el examen.",
      answer: "If I had studied more, I would have passed the exam.",
      acceptedAnswers: ["If I had studied more, I would have passed the exam.", "If I had prepared more, I would have passed the exam.", "I would have passed the exam if I had studied more."],
      keywords: ["if", "had studied", "would have"]
    },
    {
      topic: "Modal Verbs",
      es: "Deberías descansar un poco antes del examen.",
      answer: "You should rest a little before the exam.",
      acceptedAnswers: ["You should rest a little before the exam.", "You ought to rest a little before the exam.", "You should take a short break before the exam."],
      keywords: ["should", "rest", "exam"]
    }
  ];

  const subjectsV17 = [
    { es: "yo", en: "I" },
    { es: "ella", en: "she" },
    { es: "él", en: "he" },
    { es: "nosotros", en: "we" },
    { es: "ellos", en: "they" },
    { es: "los estudiantes", en: "the students" },
    { es: "el equipo", en: "the team" },
    { es: "mi hermano", en: "my brother" },
    { es: "mi amiga", en: "my friend" },
    { es: "la empresa", en: "the company" }
  ];

  function capV17(text) {
    return String(text).charAt(0).toUpperCase() + String(text).slice(1);
  }

  function buildQuickPracticePoolV17() {
    const generated = [];
    for (let i = 0; i < 520; i++) {
      const template = extraQuickTemplatesV17[i % extraQuickTemplatesV17.length];
      const subject = subjectsV17[i % subjectsV17.length];
      generated.push(template.make(subject));
      if (i % 13 === 0) generated.push(fixedConditionalsV17[(i / 13) % fixedConditionalsV17.length | 0]);
    }
    return generated.slice(0, 540);
  }

  function shuffleQuickV17(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function normalizeV17(text = "") {
    return String(text)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[’']/g, "")
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function textSimilarityV17(a, b) {
    const aTokens = normalizeV17(a).split(" ").filter(Boolean);
    const bTokens = normalizeV17(b).split(" ").filter(Boolean);
    if (!aTokens.length || !bTokens.length) return 0;
    const aSet = new Set(aTokens);
    const bSet = new Set(bTokens);
    let common = 0;
    aSet.forEach((token) => { if (bSet.has(token)) common++; });
    return ((common / aSet.size) + (common / bSet.size)) / 2;
  }

  const originalQuickSentences = Array.isArray(quickSentences) ? quickSentences : [];
  const finalQuickPool = [...buildQuickPracticePoolV17(), ...originalQuickSentences];
  let quickQueueV17 = shuffleQuickV17(finalQuickPool);

  renderQuickPractice = function renderQuickPracticeV17() {
    if (!quickQueueV17.length) quickQueueV17 = shuffleQuickV17(finalQuickPool);
    const index = (typeof currentQuickIndex === "number" ? currentQuickIndex : 0) % quickQueueV17.length;
    const item = quickQueueV17[index];
    if (quickTopic) quickTopic.textContent = item.topic;
    if (quickPrompt) quickPrompt.textContent = item.es;
    if (quickAnswer) quickAnswer.value = "";
    if (quickFeedback) quickFeedback.innerHTML = "";
  };

  checkQuickPractice = function checkQuickPracticeV17(showAnswer = false) {
    const index = (typeof currentQuickIndex === "number" ? currentQuickIndex : 0) % quickQueueV17.length;
    const item = quickQueueV17[index];
    if (!item || !quickFeedback) return;

    const accepted = [...new Set([item.answer, ...(item.acceptedAnswers || [])])];

    if (showAnswer) {
      quickFeedback.innerHTML = `
        <strong>Respuesta modelo</strong>
        <p>${escapeHTML(item.answer)}</p>
        ${accepted.length > 1 ? `<p><strong>También se aceptan:</strong> ${accepted.slice(1, 4).map(escapeHTML).join(" · ")}</p>` : ""}
      `;
      return;
    }

    const user = quickAnswer?.value || "";
    if (!user.trim()) {
      alert("Escribí tu traducción antes de corregir.");
      return;
    }

    let best = "";
    let bestScore = 0;
    accepted.forEach((option) => {
      const score = textSimilarityV17(user, option);
      if (score > bestScore) {
        bestScore = score;
        best = option;
      }
    });

    const keywordScore = item.keywords?.length
      ? item.keywords.filter((kw) => normalizeV17(user).includes(normalizeV17(kw))).length / item.keywords.length
      : 0;

    const finalScore = Math.round(Math.max(bestScore, keywordScore) * 100);
    const acceptedAnswer = bestScore >= 0.74 || keywordScore >= 0.75;

    quickFeedback.innerHTML = `
      <strong>${acceptedAnswer ? "Muy bien" : "Ajustá un poco más la traducción"}</strong>
      <p>${acceptedAnswer
        ? `Tu respuesta entra dentro de las variantes válidas. Coincidencia aproximada: ${finalScore}%.`
        : `Coincidencia aproximada: ${finalScore}%. Revisá el tiempo verbal, auxiliar o verbo principal.`}
      </p>
      <p><strong>Modelo base:</strong> ${escapeHTML(item.answer)}</p>
      ${best && normalizeV17(best) !== normalizeV17(item.answer) ? `<p><strong>Variante compatible:</strong> ${escapeHTML(best)}</p>` : ""}
    `;
  };

  const specialPronunciationV17 = {
    "run out of": "ran aut ov",
    "give up": "guiv ap",
    "look for": "luk for",
    "find out": "faind aut",
    "put off": "put of",
    "take off": "teik of",
    "work out": "uork aut",
    "look forward to": "luk fórward tu",
    "get along with": "guet alóng uid",
    "put up with": "put ap uid"
  };

  function toCastilianPronunciationFinal(text = "") {
    const lower = String(text).toLowerCase().trim();
    if (specialPronunciationV17[lower]) return specialPronunciationV17[lower];
    if (typeof toCastilianPronunciationV16 === "function") return toCastilianPronunciationV16(text);
    return lower
      .replace(/ing\b/g, "in")
      .replace(/tion/g, "shon")
      .replace(/th/g, "d")
      .replace(/ou/g, "au")
      .replace(/ow/g, "au")
      .replace(/ay/g, "ei")
      .replace(/w/g, "u")
      .replace(/y/g, "i");
  }

  buildFlashcards = function buildFlashcardsV17() {
    const source = flashcardSource?.value || "all";
    const phrasalCards = phrasalVerbs.map(([front, back, example]) => ({
      type: "Phrasal verb",
      front,
      back,
      example,
      pronunciation: toCastilianPronunciationFinal(front)
    }));
    const modalCards = modalVerbs.map(([front, back]) => ({
      type: "Modal / auxiliar",
      front,
      back,
      example: "",
      pronunciation: toCastilianPronunciationFinal(front)
    }));
    const vocabCards = vocabulary.map((item) => ({
      type: item.category || "Vocabulario",
      front: item.word,
      back: item.meaning,
      example: item.example || "",
      pronunciation: toCastilianPronunciationFinal(item.word)
    }));

    if (source === "phrasals") currentFlashcards = phrasalCards;
    else if (source === "modals") currentFlashcards = modalCards;
    else if (source === "vocabulario") currentFlashcards = vocabCards;
    else currentFlashcards = [...phrasalCards, ...modalCards, ...vocabCards];

    flashcardIndex = 0;
    flashcardShowingBack = false;
    renderFlashcard();
  };

  renderFlashcard = function renderFlashcardV17() {
    if (!flashcardFront) return;
    const pronunciationNode = typeof ensureFlashcardPronunciationNodeV16 === "function"
      ? ensureFlashcardPronunciationNodeV16()
      : document.getElementById("flashcardPronunciation");

    if (!currentFlashcards.length) {
      setText("flashcardType", "Sin tarjetas");
      setText("flashcardFront", "Agregá vocabulario o cambiá la fuente");
      setText("flashcardBack", "");
      setText("flashcardExample", "");
      if (pronunciationNode) pronunciationNode.innerHTML = "";
      if (flashcard) flashcard.classList.remove("show-back");
      return;
    }

    const card = currentFlashcards[flashcardIndex % currentFlashcards.length];
    setText("flashcardType", card.type);
    setText("flashcardFront", card.front);
    setText("flashcardBack", card.back);
    setText("flashcardExample", card.example || "");
    if (flashcardStats) flashcardStats.textContent = `${flashcardIndex + 1} / ${currentFlashcards.length}`;

    if (pronunciationNode) {
      pronunciationNode.innerHTML = flashcardShowingBack
        ? `<em>${escapeHTML(card.pronunciation || toCastilianPronunciationFinal(card.front))}</em>`
        : "";
    }

    if (flashcard) flashcard.classList.toggle("show-back", flashcardShowingBack);
  };

  // Re-render with final behavior after previous initializers.
  setTimeout(() => {
    if (typeof buildFlashcards === "function") buildFlashcards();
    if (typeof renderQuickPractice === "function") renderQuickPractice();
  }, 0);
})();


/* =========================================================
   CIRCLE TIMER V18
   Reemplaza el reloj de arena por un contador circular.
   El interior empieza lleno con el color del theme y se consume
   linealmente en sentido horario, como una aguja que va comiendo el relleno.
========================================================= */

function ensureCircleTimerMarkupV18() {
  const ring = document.getElementById("timerProgressRing");
  if (!ring) return;

  ring.classList.remove("digital-timer-card", "hourglass-timer-card");
  ring.classList.add("circle-timer-card");

  if (ring.querySelector(".circle-timer-orb")) return;

  ring.innerHTML = `
    <div class="circle-timer-time">
      <span id="timerDisplay" class="timer-display">00:00</span>
      <small>sesión de foco</small>
    </div>

    <div class="circle-timer-orb" aria-hidden="true">
      <div class="circle-timer-face">
        <span class="circle-consume-hand"></span>
        <span class="circle-pivot"></span>
        <span class="circle-inner-glow"></span>
      </div>
    </div>

    <p class="circle-timer-caption">El relleno se consume en sentido horario.</p>
  `;
}

// Mantengo el nombre anterior porque algunas inicializaciones viejas lo llaman.
ensureHourglassTimerMarkup = ensureCircleTimerMarkupV18;

updateTimerUI = function updateCircleTimerUIV18() {
  const remaining = Math.max(timerSecondsLeft, 0);
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;

  ensureCircleTimerMarkupV18();

  const timerDisplayEl = document.getElementById("timerDisplay");
  const timerRingEl = document.getElementById("timerProgressRing");

  if (timerDisplayEl) {
    timerDisplayEl.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  const progress = timerInitialSeconds
    ? (timerInitialSeconds - remaining) / timerInitialSeconds
    : 0;

  const elapsedDegrees = Math.max(0, Math.min(360, progress * 360));
  const remainingDegrees = Math.max(0, 360 - elapsedDegrees);

  if (timerRingEl) {
    timerRingEl.style.setProperty("--timer-elapsed", `${elapsedDegrees}deg`);
    timerRingEl.style.setProperty("--timer-remaining", `${remainingDegrees}deg`);
    timerRingEl.style.setProperty("--timer-progress-ratio", String(progress));
  }
};

setTimeout(() => {
  ensureCircleTimerMarkupV18();
  updateTimerUI();
}, 0);


/* =========================================================
   FIX V21
   - Timer circular visible tanto si el HTML usa #timerVisual como #timerProgressRing.
   - Botones Nueva oración / Corregir / Ver modelo con listeners directos.
   - Práctica por ciclo de 17 tiempos verbales, sin "Tiempo verbal: práctica".
========================================================= */

const quickPracticeTopicsV21 = [
  "Present Simple",
  "Present Continuous",
  "Past Simple",
  "Past Continuous",
  "Present Perfect",
  "Present Perfect Continuous",
  "Past Perfect",
  "Past Perfect Continuous",
  "Future Simple",
  "Going To",
  "Future Continuous",
  "Future Perfect",
  "Future Perfect Continuous",
  "Zero Conditional",
  "First Conditional",
  "Second Conditional",
  "Third Conditional"
];

const quickPracticeBlueprintsV21 = {
  "Present Simple": [
    ["Yo estudio inglés todos los días.", "I study English every day.", ["I study English every day.", "I practise English every day.", "I practice English every day."], ["study", "english", "every day"]],
    ["Nosotros repasamos vocabulario cada mañana.", "We review vocabulary every morning.", ["We review vocabulary every morning.", "We revise vocabulary every morning.", "We go over vocabulary every morning."], ["review", "vocabulary"]],
    ["Ellos trabajan en un laboratorio público.", "They work in a public laboratory.", ["They work in a public laboratory.", "They work at a public laboratory.", "They work in a public lab."], ["they", "work", "laboratory"]]
  ],
  "Present Continuous": [
    ["Yo estoy escribiendo una respuesta ahora.", "I am writing an answer now.", ["I am writing an answer now.", "I'm writing an answer now.", "I am currently writing an answer."], ["writing", "now"]],
    ["Nosotros estamos practicando para el IELTS esta semana.", "We are practicing for the IELTS this week.", ["We are practicing for the IELTS this week.", "We are preparing for the IELTS this week.", "We're practising for the IELTS this week."], ["are", "practicing", "ielts"]],
    ["Ella está leyendo las instrucciones con atención.", "She is reading the instructions carefully.", ["She is reading the instructions carefully.", "She is checking the instructions carefully."], ["is", "reading", "instructions"]]
  ],
  "Past Simple": [
    ["Yo terminé el informe ayer.", "I finished the report yesterday.", ["I finished the report yesterday.", "I completed the report yesterday."], ["finished", "report", "yesterday"]],
    ["Ellos visitaron el laboratorio la semana pasada.", "They visited the laboratory last week.", ["They visited the laboratory last week.", "They went to the laboratory last week."], ["visited", "last week"]],
    ["Nosotros aprendimos muchas palabras nuevas.", "We learned many new words.", ["We learned many new words.", "We learnt many new words."], ["learned", "words"]]
  ],
  "Past Continuous": [
    ["Yo estaba leyendo cuando me llamaste.", "I was reading when you called me.", ["I was reading when you called me.", "I was studying when you called me."], ["was", "reading", "called"]],
    ["Ellos estaban trabajando mientras nosotros esperábamos.", "They were working while we were waiting.", ["They were working while we were waiting.", "They were working while we waited."], ["were", "working", "waiting"]],
    ["Nosotros estábamos repasando antes del examen.", "We were reviewing before the exam.", ["We were reviewing before the exam.", "We were revising before the exam.", "We were studying before the exam."], ["were", "reviewing", "exam"]]
  ],
  "Present Perfect": [
    ["Yo he terminado el ejercicio.", "I have finished the exercise.", ["I have finished the exercise.", "I've finished the exercise.", "I have completed the exercise."], ["have", "finished"]],
    ["Nosotros hemos visitado ese lugar varias veces.", "We have visited that place several times.", ["We have visited that place several times.", "We've been to that place several times."], ["have", "visited"]],
    ["Ella ha mejorado mucho este mes.", "She has improved a lot this month.", ["She has improved a lot this month.", "She's improved a lot this month.", "She has gotten much better this month."], ["has", "improved"]]
  ],
  "Present Perfect Continuous": [
    ["Yo he estado estudiando durante dos horas.", "I have been studying for two hours.", ["I have been studying for two hours.", "I've been studying for two hours.", "I have been practicing for two hours."], ["have", "been", "studying"]],
    ["Ella ha estado trabajando toda la mañana.", "She has been working all morning.", ["She has been working all morning.", "She's been working all morning."], ["has", "been", "working"]],
    ["Nosotros hemos estado practicando desde temprano.", "We have been practicing since early morning.", ["We have been practicing since early morning.", "We've been practising since early morning.", "We have been training since early morning."], ["have", "been", "practicing"]]
  ],
  "Past Perfect": [
    ["Yo ya había terminado cuando empezó la clase.", "I had already finished when the class started.", ["I had already finished when the class started.", "I had already completed it when the class started."], ["had", "finished"]],
    ["Ellos habían salido antes de que llegáramos.", "They had left before we arrived.", ["They had left before we arrived.", "They had gone before we arrived."], ["had", "left"]],
    ["Nosotros habíamos leído el texto antes del examen.", "We had read the text before the exam.", ["We had read the text before the exam.", "We had gone through the text before the exam."], ["had", "read"]]
  ],
  "Past Perfect Continuous": [
    ["Yo había estado practicando durante horas.", "I had been practicing for hours.", ["I had been practicing for hours.", "I had been studying for hours.", "I had been training for hours."], ["had", "been", "practicing"]],
    ["La empresa había estado trabajando durante meses.", "The company had been working for months.", ["The company had been working for months.", "The company had been developing the project for months."], ["had", "been", "working"]],
    ["Nosotros habíamos estado esperando desde las ocho.", "We had been waiting since eight o'clock.", ["We had been waiting since eight o'clock.", "We had been waiting since eight."], ["had", "been", "waiting"]]
  ],
  "Future Simple": [
    ["Yo te ayudaré después de la clase.", "I will help you after class.", ["I will help you after class.", "I'll help you after class.", "I will assist you after class."], ["will", "help"]],
    ["Ellos enviarán el correo mañana.", "They will send the email tomorrow.", ["They will send the email tomorrow.", "They'll send the email tomorrow."], ["will", "send"]],
    ["Nosotros revisaremos las respuestas luego.", "We will review the answers later.", ["We will review the answers later.", "We'll check the answers later.", "We will go over the answers later."], ["will", "review"]]
  ],
  "Going To": [
    ["Yo voy a empezar un curso nuevo.", "I am going to start a new course.", ["I am going to start a new course.", "I'm going to begin a new course."], ["going", "to", "start"]],
    ["Nosotros vamos a practicar speaking esta noche.", "We are going to practice speaking tonight.", ["We are going to practice speaking tonight.", "We're going to practise speaking tonight."], ["going", "to", "practice"]],
    ["Ella va a presentar el proyecto mañana.", "She is going to present the project tomorrow.", ["She is going to present the project tomorrow.", "She's going to present the project tomorrow."], ["going", "to", "present"]]
  ],
  "Future Continuous": [
    ["Yo estaré trabajando mañana a esta hora.", "I will be working at this time tomorrow.", ["I will be working at this time tomorrow.", "I'll be working at this time tomorrow."], ["will", "be", "working"]],
    ["Nosotros estaremos viajando el viernes.", "We will be travelling on Friday.", ["We will be travelling on Friday.", "We will be traveling on Friday.", "We'll be travelling on Friday."], ["will", "be", "travelling"]],
    ["Ellos estarán estudiando durante la tarde.", "They will be studying during the afternoon.", ["They will be studying during the afternoon.", "They'll be studying in the afternoon."], ["will", "be", "studying"]]
  ],
  "Future Perfect": [
    ["Yo habré terminado el documento para mañana.", "I will have finished the document by tomorrow.", ["I will have finished the document by tomorrow.", "I'll have finished the document by tomorrow.", "I will have completed the document by tomorrow."], ["will", "have", "finished"]],
    ["Nosotros habremos llegado antes de las ocho.", "We will have arrived before eight o'clock.", ["We will have arrived before eight o'clock.", "We'll have arrived before eight."], ["will", "have", "arrived"]],
    ["Ellos habrán resuelto el problema para la próxima semana.", "They will have solved the problem by next week.", ["They will have solved the problem by next week.", "They will have fixed the problem by next week."], ["will", "have", "solved"]]
  ],
  "Future Perfect Continuous": [
    ["Yo habré estado estudiando durante un año.", "I will have been studying for a year.", ["I will have been studying for a year.", "I'll have been studying for a year.", "I will have been learning for a year."], ["will", "have", "been", "studying"]],
    ["Nosotros habremos estado trabajando durante diez horas.", "We will have been working for ten hours.", ["We will have been working for ten hours.", "We'll have been working for ten hours."], ["will", "have", "been", "working"]],
    ["Ella habrá estado practicando durante meses.", "She will have been practicing for months.", ["She will have been practicing for months.", "She'll have been practising for months.", "She will have been training for months."], ["will", "have", "been", "practicing"]]
  ],
  "Zero Conditional": [
    ["Si calentás agua, hierve.", "If you heat water, it boils.", ["If you heat water, it boils.", "Water boils if you heat it."], ["if", "heat", "boils"]],
    ["Si no dormís bien, te sentís cansado.", "If you don't sleep well, you feel tired.", ["If you don't sleep well, you feel tired.", "You feel tired if you don't sleep well."], ["if", "sleep", "feel"]],
    ["Si practicás todos los días, mejorás.", "If you practice every day, you improve.", ["If you practice every day, you improve.", "You improve if you practice every day."], ["if", "practice", "improve"]]
  ],
  "First Conditional": [
    ["Si llueve mañana, nos quedaremos en casa.", "If it rains tomorrow, we will stay at home.", ["If it rains tomorrow, we will stay at home.", "If it rains tomorrow, we'll stay home.", "We will stay at home if it rains tomorrow."], ["if", "rains", "will"]],
    ["Si terminás temprano, te llamaré.", "If you finish early, I will call you.", ["If you finish early, I will call you.", "If you finish early, I'll call you."], ["if", "finish", "will"]],
    ["Si practicamos más, mejoraremos rápido.", "If we practice more, we will improve quickly.", ["If we practice more, we will improve quickly.", "If we practise more, we'll improve quickly."], ["if", "practice", "will"]]
  ],
  "Second Conditional": [
    ["Si tuviera más tiempo, viajaría más.", "If I had more time, I would travel more.", ["If I had more time, I would travel more.", "I would travel more if I had more time."], ["if", "had", "would"]],
    ["Si ella hablara inglés con fluidez, conseguiría el trabajo.", "If she spoke English fluently, she would get the job.", ["If she spoke English fluently, she would get the job.", "If she were fluent in English, she would get the job."], ["if", "spoke", "would"]],
    ["Si viviéramos cerca, iríamos caminando.", "If we lived nearby, we would walk.", ["If we lived nearby, we would walk.", "We would walk if we lived nearby."], ["if", "lived", "would"]]
  ],
  "Third Conditional": [
    ["Si hubiera estudiado más, habría aprobado el examen.", "If I had studied more, I would have passed the exam.", ["If I had studied more, I would have passed the exam.", "If I had prepared more, I would have passed the exam.", "I would have passed the exam if I had studied more."], ["if", "had", "would", "passed"]],
    ["Si hubiéramos salido antes, no habríamos perdido el tren.", "If we had left earlier, we would not have missed the train.", ["If we had left earlier, we would not have missed the train.", "If we had left earlier, we wouldn't have missed the train."], ["if", "had", "would", "missed"]],
    ["Si ella hubiera leído las instrucciones, habría evitado el error.", "If she had read the instructions, she would have avoided the mistake.", ["If she had read the instructions, she would have avoided the mistake.", "If she had checked the instructions, she would have avoided the mistake."], ["if", "had", "would", "avoided"]]
  ]
};

let quickPracticeTopicCycleV21 = [];
let currentQuickItemV21 = null;

function getTimerRootV21() {
  return document.getElementById("timerVisual") || document.getElementById("timerProgressRing");
}

function ensureCircleTimerMarkupV21() {
  const root = getTimerRootV21();
  if (!root) return;

  root.classList.remove("water-hourglass", "digital-timer-card", "hourglass-timer-card");
  root.classList.add("circle-timer-card");

  if (root.querySelector(".circle-timer-orb")) return;

  root.innerHTML = `
    <div class="circle-timer-time">
      <span id="timerDisplay" class="timer-display">00:00</span>
      <small>sesión de foco</small>
    </div>

    <div class="circle-timer-orb" aria-hidden="true">
      <div class="circle-timer-face">
        <span class="circle-inner-glow"></span>
      </div>
    </div>

    <p class="circle-timer-caption">El relleno se consume desde arriba.</p>
  `;
}

function updateTimerUIV21() {
  const remaining = Math.max(timerSecondsLeft || 0, 0);
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;

  ensureCircleTimerMarkupV21();

  const display = document.getElementById("timerDisplay");
  const root = getTimerRootV21();

  if (display) {
    display.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  const progress = timerInitialSeconds
    ? (timerInitialSeconds - remaining) / timerInitialSeconds
    : 0;

  const elapsedDegrees = Math.max(0, Math.min(360, progress * 360));

  if (root) {
    root.style.setProperty("--timer-elapsed", `${elapsedDegrees}deg`);
    root.style.setProperty("--timer-progress-ratio", String(progress));
  }
}

function buildQuickPracticePoolV21() {
  const pool = [];

  quickPracticeTopicsV21.forEach((topic) => {
    const rows = quickPracticeBlueprintsV21[topic] || [];
    rows.forEach((row) => {
      pool.push({
        topic,
        es: row[0],
        answer: row[1],
        acceptedAnswers: row[2],
        keywords: row[3]
      });
    });
  });

  return pool;
}

function shuffleArray(array) {
  const arr = Array.isArray(array) ? array.slice() : [];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function resetQuickPracticeTopicCycleV21() {
  quickPracticeTopicCycleV21 = shuffleArray([...quickPracticeTopicsV21]);
}

function pickQuickPracticeItemV21(topic) {
  const matches = quickPracticePool.filter((item) => item.topic === topic);
  const list = matches.length ? matches : buildQuickPracticePoolV21().filter((item) => item.topic === topic);
  return list[Math.floor(Math.random() * list.length)];
}

function setQuickPracticeTopicV21(topic) {
  const el = document.getElementById("quickTopic");
  if (!el) return;
  el.textContent = topic || "Present Simple";
  el.title = topic || "Present Simple";
  el.classList.add("quick-topic-pill");
}

function renderQuickPracticeV21() {
  if (!currentQuickItemV21) nextQuickPracticeV21(false);

  const item = currentQuickItemV21;
  if (!item) return;

  if (quickTopic) setQuickPracticeTopicV21(item.topic);
  if (quickPrompt) quickPrompt.textContent = item.es;
  if (quickAnswer) quickAnswer.value = "";
  if (quickFeedback) quickFeedback.innerHTML = "";
}

function nextQuickPracticeV21(shouldRender = true) {
  if (!quickPracticePool || !quickPracticePool.length) {
    quickPracticePool = buildQuickPracticePoolV21();
  }

  if (!quickPracticeTopicCycleV21.length) resetQuickPracticeTopicCycleV21();

  const topic = quickPracticeTopicCycleV21.shift();
  currentQuickItemV21 = pickQuickPracticeItemV21(topic);

  if (shouldRender) renderQuickPracticeV21();
}

function getCurrentQuickItemV21() {
  if (currentQuickItemV21) return currentQuickItemV21;
  if (quickPracticeQueue && quickPracticeQueue[currentQuickIndex]) return quickPracticeQueue[currentQuickIndex];
  nextQuickPracticeV21(false);
  return currentQuickItemV21;
}

function checkQuickPracticeV21(showAnswer = false) {
  const item = getCurrentQuickItemV21();
  if (!item || !quickFeedback) return;

  if (showAnswer) {
    const variants = [...new Set([item.answer, ...(item.acceptedAnswers || [])])].slice(0, 4);
    quickFeedback.innerHTML = `
      <strong>Respuesta modelo</strong>
      <p>${escapeHTML(item.answer)}</p>
      ${variants.length > 1 ? `<p><strong>También se aceptan:</strong> ${variants.slice(1).map(escapeHTML).join(" · ")}</p>` : ""}
    `;
    setQuickPracticeTopicV21(item.topic);
    return;
  }

  const user = quickAnswer?.value?.trim() || "";
  if (!user) {
    alert("Escribí tu traducción antes de corregir.");
    return;
  }

  const accepted = [...new Set([item.answer, ...(item.acceptedAnswers || [])])];
  let best = "";
  let bestScore = 0;

  accepted.forEach((option) => {
    const score = textSimilarity(user, option);
    if (score > bestScore) {
      bestScore = score;
      best = option;
    }
  });

  const keywordScore = item.keywords?.length
    ? item.keywords.filter((kw) => normalizeText(user).includes(normalizeText(kw))).length / item.keywords.length
    : 0;

  const finalScore = Math.round(Math.max(bestScore, keywordScore) * 100);
  const acceptedAnswer = bestScore >= 0.74 || keywordScore >= 0.75;

  quickFeedback.innerHTML = `
    <strong>${acceptedAnswer ? "Muy bien" : "Ajustá un poco más la traducción"}</strong>
    <p>${acceptedAnswer
      ? `Tu respuesta entra dentro de las variantes válidas. Coincidencia aproximada: ${finalScore}%.`
      : `Coincidencia aproximada: ${finalScore}%. Revisá el tiempo verbal, auxiliar o verbo principal.`}
    </p>
    <p><strong>Tiempo verbal:</strong> ${escapeHTML(item.topic)}</p>
    <p><strong>Modelo base:</strong> ${escapeHTML(item.answer)}</p>
    ${best && normalizeText(best) !== normalizeText(item.answer) ? `<p><strong>Variante compatible:</strong> ${escapeHTML(best)}</p>` : ""}
  `;

  setQuickPracticeTopicV21(item.topic);
  if (typeof logActivity === "function") logActivity(`Práctica rápida · ${item.topic}`);
}

// Sobrescribo funciones globales para que los listeners existentes también funcionen.
updateTimerUI = updateTimerUIV21;
ensureHourglassTimerMarkup = ensureCircleTimerMarkupV21;
if (typeof ensureCircleTimerMarkupV18 !== "undefined") ensureCircleTimerMarkupV18 = ensureCircleTimerMarkupV21;
if (typeof ensureCircleTimerMarkupV20 !== "undefined") ensureCircleTimerMarkupV20 = ensureCircleTimerMarkupV21;
renderQuickPractice = renderQuickPracticeV21;
nextQuickPractice = nextQuickPracticeV21;
checkQuickPractice = checkQuickPracticeV21;
buildQuickPracticePool = buildQuickPracticePoolV21;

function bindPracticeButtonsV21() {
  const newBtn = document.getElementById("newQuickBtn");
  const checkBtn = document.getElementById("checkQuickBtn");
  const modelBtn = document.getElementById("showQuickAnswerBtn");

  if (newBtn) {
    newBtn.onclick = (event) => {
      event.preventDefault();
      nextQuickPracticeV21(true);
    };
  }

  if (checkBtn) {
    checkBtn.onclick = (event) => {
      event.preventDefault();
      checkQuickPracticeV21(false);
    };
  }

  if (modelBtn) {
    modelBtn.onclick = (event) => {
      event.preventDefault();
      checkQuickPracticeV21(true);
    };
  }
}

setTimeout(() => {
  ensureCircleTimerMarkupV21();
  updateTimerUIV21();

  quickPracticePool = buildQuickPracticePoolV21();
  resetQuickPracticeTopicCycleV21();
  currentQuickItemV21 = null;
  nextQuickPracticeV21(false);
  renderQuickPracticeV21();
  bindPracticeButtonsV21();
}, 0);

window.addEventListener("load", () => {
  setTimeout(() => {
    ensureCircleTimerMarkupV21();
    updateTimerUIV21();

    quickPracticePool = buildQuickPracticePoolV21();
    resetQuickPracticeTopicCycleV21();
    currentQuickItemV21 = null;
    nextQuickPracticeV21(false);
    renderQuickPracticeV21();
    bindPracticeButtonsV21();
  }, 50);
});


/* =========================================================
   STABLE FIX V22
   Final overrides:
   - Timer circular visible, no aguja, empieza a consumirse desde las 12.
   - Botones de Práctica funcionan con captura y no quedan pisados por listeners viejos.
   - Práctica recorre 17 tiempos/condicionales mezclados.
   - Flashcards sin contador 1/413, arrancan aleatorias por fuente y actualizan progreso.
========================================================= */

(function stableFixV22() {
  const topics = [
    "Present Simple",
    "Present Continuous",
    "Past Simple",
    "Past Continuous",
    "Present Perfect",
    "Present Perfect Continuous",
    "Past Perfect",
    "Past Perfect Continuous",
    "Future Simple",
    "Going To",
    "Future Continuous",
    "Future Perfect",
    "Future Perfect Continuous",
    "Zero Conditional",
    "First Conditional",
    "Second Conditional",
    "Third Conditional"
  ];

  const practiceData = {
    "Present Simple": [
      ["Yo estudio inglés todos los días.", "I study English every day.", ["I study English every day.", "I practise English every day.", "I practice English every day."], ["study", "english", "every day"]],
      ["Nosotros repasamos vocabulario cada mañana.", "We review vocabulary every morning.", ["We review vocabulary every morning.", "We revise vocabulary every morning.", "We go over vocabulary every morning."], ["review", "vocabulary"]],
      ["Ellos trabajan en un laboratorio público.", "They work in a public laboratory.", ["They work in a public laboratory.", "They work at a public laboratory.", "They work in a public lab."], ["they", "work", "laboratory"]]
    ],
    "Present Continuous": [
      ["Yo estoy escribiendo una respuesta ahora.", "I am writing an answer now.", ["I am writing an answer now.", "I'm writing an answer now.", "I am currently writing an answer."], ["writing", "now"]],
      ["Nosotros estamos practicando para el IELTS esta semana.", "We are practicing for the IELTS this week.", ["We are practicing for the IELTS this week.", "We are preparing for the IELTS this week.", "We're practising for the IELTS this week."], ["are", "practicing", "ielts"]],
      ["Ella está leyendo las instrucciones con atención.", "She is reading the instructions carefully.", ["She is reading the instructions carefully.", "She is checking the instructions carefully."], ["is", "reading", "instructions"]]
    ],
    "Past Simple": [
      ["Yo terminé el informe ayer.", "I finished the report yesterday.", ["I finished the report yesterday.", "I completed the report yesterday."], ["finished", "report", "yesterday"]],
      ["Ellos visitaron el laboratorio la semana pasada.", "They visited the laboratory last week.", ["They visited the laboratory last week.", "They went to the laboratory last week."], ["visited", "last week"]],
      ["Nosotros aprendimos muchas palabras nuevas.", "We learned many new words.", ["We learned many new words.", "We learnt many new words."], ["learned", "words"]]
    ],
    "Past Continuous": [
      ["Yo estaba leyendo cuando me llamaste.", "I was reading when you called me.", ["I was reading when you called me.", "I was studying when you called me."], ["was", "reading", "called"]],
      ["Ellos estaban trabajando mientras nosotros esperábamos.", "They were working while we were waiting.", ["They were working while we were waiting.", "They were working while we waited."], ["were", "working", "waiting"]],
      ["Nosotros estábamos repasando antes del examen.", "We were reviewing before the exam.", ["We were reviewing before the exam.", "We were revising before the exam.", "We were studying before the exam."], ["were", "reviewing", "exam"]]
    ],
    "Present Perfect": [
      ["Yo he terminado el ejercicio.", "I have finished the exercise.", ["I have finished the exercise.", "I've finished the exercise.", "I have completed the exercise."], ["have", "finished"]],
      ["Nosotros hemos visitado ese lugar varias veces.", "We have visited that place several times.", ["We have visited that place several times.", "We've been to that place several times."], ["have", "visited"]],
      ["Ella ha mejorado mucho este mes.", "She has improved a lot this month.", ["She has improved a lot this month.", "She's improved a lot this month.", "She has gotten much better this month."], ["has", "improved"]]
    ],
    "Present Perfect Continuous": [
      ["Yo he estado estudiando durante dos horas.", "I have been studying for two hours.", ["I have been studying for two hours.", "I've been studying for two hours.", "I have been practicing for two hours."], ["have", "been", "studying"]],
      ["Ella ha estado trabajando toda la mañana.", "She has been working all morning.", ["She has been working all morning.", "She's been working all morning."], ["has", "been", "working"]],
      ["Nosotros hemos estado practicando desde temprano.", "We have been practicing since early morning.", ["We have been practicing since early morning.", "We've been practising since early morning.", "We have been training since early morning."], ["have", "been", "practicing"]]
    ],
    "Past Perfect": [
      ["Yo ya había terminado cuando empezó la clase.", "I had already finished when the class started.", ["I had already finished when the class started.", "I had already completed it when the class started."], ["had", "finished"]],
      ["Ellos habían salido antes de que llegáramos.", "They had left before we arrived.", ["They had left before we arrived.", "They had gone before we arrived."], ["had", "left"]],
      ["Nosotros habíamos leído el texto antes del examen.", "We had read the text before the exam.", ["We had read the text before the exam.", "We had gone through the text before the exam."], ["had", "read"]]
    ],
    "Past Perfect Continuous": [
      ["Yo había estado practicando durante horas.", "I had been practicing for hours.", ["I had been practicing for hours.", "I had been studying for hours.", "I had been training for hours."], ["had", "been", "practicing"]],
      ["La empresa había estado trabajando durante meses.", "The company had been working for months.", ["The company had been working for months.", "The company had been developing the project for months."], ["had", "been", "working"]],
      ["Nosotros habíamos estado esperando desde las ocho.", "We had been waiting since eight o'clock.", ["We had been waiting since eight o'clock.", "We had been waiting since eight."], ["had", "been", "waiting"]]
    ],
    "Future Simple": [
      ["Yo te ayudaré después de la clase.", "I will help you after class.", ["I will help you after class.", "I'll help you after class.", "I will assist you after class."], ["will", "help"]],
      ["Ellos enviarán el correo mañana.", "They will send the email tomorrow.", ["They will send the email tomorrow.", "They'll send the email tomorrow."], ["will", "send"]],
      ["Nosotros revisaremos las respuestas luego.", "We will review the answers later.", ["We will review the answers later.", "We'll check the answers later.", "We will go over the answers later."], ["will", "review"]]
    ],
    "Going To": [
      ["Yo voy a empezar un curso nuevo.", "I am going to start a new course.", ["I am going to start a new course.", "I'm going to begin a new course."], ["going", "to", "start"]],
      ["Nosotros vamos a practicar speaking esta noche.", "We are going to practice speaking tonight.", ["We are going to practice speaking tonight.", "We're going to practise speaking tonight."], ["going", "to", "practice"]],
      ["Ella va a presentar el proyecto mañana.", "She is going to present the project tomorrow.", ["She is going to present the project tomorrow.", "She's going to present the project tomorrow."], ["going", "to", "present"]]
    ],
    "Future Continuous": [
      ["Yo estaré trabajando mañana a esta hora.", "I will be working at this time tomorrow.", ["I will be working at this time tomorrow.", "I'll be working at this time tomorrow."], ["will", "be", "working"]],
      ["Nosotros estaremos viajando el viernes.", "We will be travelling on Friday.", ["We will be travelling on Friday.", "We will be traveling on Friday.", "We'll be travelling on Friday."], ["will", "be", "travelling"]],
      ["Ellos estarán estudiando durante la tarde.", "They will be studying during the afternoon.", ["They will be studying during the afternoon.", "They'll be studying in the afternoon."], ["will", "be", "studying"]]
    ],
    "Future Perfect": [
      ["Yo habré terminado el documento para mañana.", "I will have finished the document by tomorrow.", ["I will have finished the document by tomorrow.", "I'll have finished the document by tomorrow.", "I will have completed the document by tomorrow."], ["will", "have", "finished"]],
      ["Nosotros habremos llegado antes de las ocho.", "We will have arrived before eight o'clock.", ["We will have arrived before eight o'clock.", "We'll have arrived before eight."], ["will", "have", "arrived"]],
      ["Ellos habrán resuelto el problema para la próxima semana.", "They will have solved the problem by next week.", ["They will have solved the problem by next week.", "They will have fixed the problem by next week."], ["will", "have", "solved"]]
    ],
    "Future Perfect Continuous": [
      ["Yo habré estado estudiando durante un año.", "I will have been studying for a year.", ["I will have been studying for a year.", "I'll have been studying for a year.", "I will have been learning for a year."], ["will", "have", "been", "studying"]],
      ["Nosotros habremos estado trabajando durante diez horas.", "We will have been working for ten hours.", ["We will have been working for ten hours.", "We'll have been working for ten hours."], ["will", "have", "been", "working"]],
      ["Ella habrá estado practicando durante meses.", "She will have been practicing for months.", ["She will have been practicing for months.", "She'll have been practising for months.", "She will have been training for months."], ["will", "have", "been", "practicing"]]
    ],
    "Zero Conditional": [
      ["Si calentás agua, hierve.", "If you heat water, it boils.", ["If you heat water, it boils.", "Water boils if you heat it."], ["if", "heat", "boils"]],
      ["Si no dormís bien, te sentís cansado.", "If you don't sleep well, you feel tired.", ["If you don't sleep well, you feel tired.", "You feel tired if you don't sleep well."], ["if", "sleep", "feel"]],
      ["Si practicás todos los días, mejorás.", "If you practice every day, you improve.", ["If you practice every day, you improve.", "You improve if you practice every day."], ["if", "practice", "improve"]]
    ],
    "First Conditional": [
      ["Si llueve mañana, nos quedaremos en casa.", "If it rains tomorrow, we will stay at home.", ["If it rains tomorrow, we will stay at home.", "If it rains tomorrow, we'll stay home.", "We will stay at home if it rains tomorrow."], ["if", "rains", "will"]],
      ["Si terminás temprano, te llamaré.", "If you finish early, I will call you.", ["If you finish early, I will call you.", "If you finish early, I'll call you."], ["if", "finish", "will"]],
      ["Si practicamos más, mejoraremos rápido.", "If we practice more, we will improve quickly.", ["If we practice more, we will improve quickly.", "If we practise more, we'll improve quickly."], ["if", "practice", "will"]]
    ],
    "Second Conditional": [
      ["Si tuviera más tiempo, viajaría más.", "If I had more time, I would travel more.", ["If I had more time, I would travel more.", "I would travel more if I had more time."], ["if", "had", "would"]],
      ["Si ella hablara inglés con fluidez, conseguiría el trabajo.", "If she spoke English fluently, she would get the job.", ["If she spoke English fluently, she would get the job.", "If she were fluent in English, she would get the job."], ["if", "spoke", "would"]],
      ["Si viviéramos cerca, iríamos caminando.", "If we lived nearby, we would walk.", ["If we lived nearby, we would walk.", "We would walk if we lived nearby."], ["if", "lived", "would"]]
    ],
    "Third Conditional": [
      ["Si hubiera estudiado más, habría aprobado el examen.", "If I had studied more, I would have passed the exam.", ["If I had studied more, I would have passed the exam.", "If I had prepared more, I would have passed the exam.", "I would have passed the exam if I had studied more."], ["if", "had", "would", "passed"]],
      ["Si hubiéramos salido antes, no habríamos perdido el tren.", "If we had left earlier, we would not have missed the train.", ["If we had left earlier, we would not have missed the train.", "If we had left earlier, we wouldn't have missed the train."], ["if", "had", "would", "missed"]],
      ["Si ella hubiera leído las instrucciones, habría evitado el error.", "If she had read the instructions, she would have avoided the mistake.", ["If she had read the instructions, she would have avoided the mistake.", "If she had checked the instructions, she would have avoided the mistake."], ["if", "had", "would", "avoided"]]
    ]
  };

  let practiceCycle = [];
  let currentPracticeItem = null;

  function stableShuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function getTimerRoot() {
    return document.getElementById("timerProgressRing") || document.getElementById("timerVisual");
  }

  function ensureCircleTimer() {
    const root = getTimerRoot();
    if (!root) return;

    root.id = "timerProgressRing";
    root.className = "circle-timer-card";
    root.setAttribute("aria-label", "Tiempo restante del timer");

    if (!root.querySelector(".circle-timer-orb")) {
      root.innerHTML = `
        <div class="circle-timer-time">
          <span id="timerDisplay" class="timer-display">00:00</span>
          <small>sesión de foco</small>
        </div>

        <div class="circle-timer-orb" aria-hidden="true">
          <div class="circle-timer-face">
            <span class="circle-inner-glow"></span>
          </div>
        </div>

        <p class="circle-timer-caption">El relleno se consume desde arriba.</p>
      `;
    }
  }

  function updateCircleTimer() {
    ensureCircleTimer();

    const root = getTimerRoot();
    const display = document.getElementById("timerDisplay");

    const remaining = Math.max(Number(timerSecondsLeft) || 0, 0);
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;

    if (display) {
      display.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }

    const progress = timerInitialSeconds
      ? (timerInitialSeconds - remaining) / timerInitialSeconds
      : 0;

    const elapsedDegrees = Math.max(0, Math.min(360, progress * 360));

    if (root) {
      root.style.setProperty("--timer-elapsed", `${elapsedDegrees}deg`);
      root.style.setProperty("--timer-progress-ratio", String(progress));
    }
  }

  function buildPracticePool() {
    const pool = [];
    topics.forEach((topic) => {
      (practiceData[topic] || []).forEach((row) => {
        pool.push({
          topic,
          es: row[0],
          answer: row[1],
          acceptedAnswers: row[2],
          keywords: row[3]
        });
      });
    });
    return pool;
  }

  function refillPracticeCycle() {
    practiceCycle = stableShuffle([...topics]);
  }

  function pickPracticeItem(topic) {
    const list = (quickPracticePool || []).filter((item) => item.topic === topic);
    const fallback = buildPracticePool().filter((item) => item.topic === topic);
    const source = list.length ? list : fallback;
    return source[Math.floor(Math.random() * source.length)];
  }

  function setPracticeTopic(topic) {
    const topicEl = document.getElementById("quickTopic");
    if (!topicEl) return;
    topicEl.textContent = topic || "Present Simple";
    topicEl.title = topic || "Present Simple";
    topicEl.classList.add("quick-topic-pill");
  }

  function renderPracticeItem() {
    if (!currentPracticeItem) nextPracticeItem(false);
    if (!currentPracticeItem) return;

    const promptEl = document.getElementById("quickPrompt");
    const answerEl = document.getElementById("quickAnswer");
    const feedbackEl = document.getElementById("quickFeedback");

    setPracticeTopic(currentPracticeItem.topic);
    if (promptEl) promptEl.textContent = currentPracticeItem.es;
    if (answerEl) answerEl.value = "";
    if (feedbackEl) feedbackEl.innerHTML = "";
  }

  function nextPracticeItem(shouldRender = true) {
    if (!quickPracticePool || !quickPracticePool.length) {
      quickPracticePool = buildPracticePool();
    }

    if (!practiceCycle.length) refillPracticeCycle();

    const nextTopic = practiceCycle.shift();
    currentPracticeItem = pickPracticeItem(nextTopic);

    if (shouldRender) renderPracticeItem();
  }

  function getSimilarity(a, b) {
    const aTokens = normalizeText(a).split(" ").filter(Boolean);
    const bTokens = normalizeText(b).split(" ").filter(Boolean);
    if (!aTokens.length || !bTokens.length) return 0;

    const aSet = new Set(aTokens);
    const bSet = new Set(bTokens);
    let common = 0;

    aSet.forEach((token) => {
      if (bSet.has(token)) common += 1;
    });

    return ((common / aSet.size) + (common / bSet.size)) / 2;
  }

  function checkPractice(showAnswer = false) {
    if (!currentPracticeItem) nextPracticeItem(false);

    const item = currentPracticeItem;
    const feedbackEl = document.getElementById("quickFeedback");
    const answerEl = document.getElementById("quickAnswer");

    if (!item || !feedbackEl) return;

    const accepted = [...new Set([item.answer, ...(item.acceptedAnswers || [])])];

    if (showAnswer) {
      feedbackEl.innerHTML = `
        <strong>Respuesta modelo</strong>
        <p>${escapeHTML(item.answer)}</p>
        ${accepted.length > 1 ? `<p><strong>También se aceptan:</strong> ${accepted.slice(1, 4).map(escapeHTML).join(" · ")}</p>` : ""}
      `;
      setPracticeTopic(item.topic);
      return;
    }

    const user = answerEl?.value?.trim() || "";

    if (!user) {
      alert("Escribí tu traducción antes de corregir.");
      return;
    }

    let best = "";
    let bestScore = 0;

    accepted.forEach((option) => {
      const score = getSimilarity(user, option);
      if (score > bestScore) {
        bestScore = score;
        best = option;
      }
    });

    const keywordScore = item.keywords?.length
      ? item.keywords.filter((kw) => normalizeText(user).includes(normalizeText(kw))).length / item.keywords.length
      : 0;

    const finalScore = Math.round(Math.max(bestScore, keywordScore) * 100);
    const acceptedAnswer = bestScore >= 0.74 || keywordScore >= 0.75;

    feedbackEl.innerHTML = `
      <strong>${acceptedAnswer ? "Muy bien" : "Ajustá un poco más la traducción"}</strong>
      <p>${acceptedAnswer
        ? `Tu respuesta entra dentro de las variantes válidas. Coincidencia aproximada: ${finalScore}%.`
        : `Coincidencia aproximada: ${finalScore}%. Revisá el tiempo verbal, auxiliar o verbo principal.`}
      </p>
      <p><strong>Tiempo verbal:</strong> ${escapeHTML(item.topic)}</p>
      <p><strong>Modelo base:</strong> ${escapeHTML(item.answer)}</p>
      ${best && normalizeText(best) !== normalizeText(item.answer) ? `<p><strong>Variante compatible:</strong> ${escapeHTML(best)}</p>` : ""}
    `;

    setPracticeTopic(item.topic);
    if (typeof logActivity === "function") logActivity(`Práctica rápida · ${item.topic}`);
  }

  function toPronunciation(text = "") {
    if (typeof toCastilianPronunciationFinal === "function") return toCastilianPronunciationFinal(text);
    if (typeof toCastilianPronunciationV16 === "function") return toCastilianPronunciationV16(text);

    return String(text)
      .toLowerCase()
      .replace(/ing\b/g, "in")
      .replace(/tion/g, "shon")
      .replace(/th/g, "d")
      .replace(/ou/g, "au")
      .replace(/ow/g, "au")
      .replace(/ay/g, "ei")
      .replace(/w/g, "u")
      .replace(/y/g, "i");
  }

  function buildCardsBySource(source) {
    const phrasalCards = phrasalVerbs.map(([front, back, example]) => ({
      type: "Phrasal verb",
      front,
      back,
      example,
      progressKey: "phrasals",
      pronunciation: toPronunciation(front)
    }));

    const modalCards = modalVerbs.map(([front, back]) => ({
      type: "Modal / auxiliar",
      front,
      back,
      example: "",
      progressKey: "modals",
      pronunciation: toPronunciation(front)
    }));

    const vocabCards = vocabulary.map((item) => ({
      type: item.category || "Vocabulario",
      front: item.word,
      back: item.meaning,
      example: item.example || "",
      progressKey: "grammar",
      pronunciation: toPronunciation(item.word)
    }));

    if (source === "phrasals") return phrasalCards;
    if (source === "modals") return modalCards;
    if (source === "vocabulario") return vocabCards;

    return [...phrasalCards, ...modalCards, ...vocabCards];
  }

  function randomCardIndex() {
    if (!currentFlashcards.length) return 0;
    return Math.floor(Math.random() * currentFlashcards.length);
  }

  function buildFlashcardsStable(randomStart = true) {
    const source = document.getElementById("flashcardSource")?.value || "all";
    currentFlashcards = buildCardsBySource(source);
    flashcardShowingBack = false;
    flashcardIndex = randomStart ? randomCardIndex() : Math.min(flashcardIndex, Math.max(0, currentFlashcards.length - 1));
    renderFlashcardStable();
  }

  function renderFlashcardStable() {
    const statsEl = document.getElementById("flashcardStats");
    if (statsEl) {
      statsEl.textContent = "";
      statsEl.style.display = "none";
    }

    if (!flashcardFront) return;

    if (!currentFlashcards.length) {
      setText("flashcardType", "Sin tarjetas");
      setText("flashcardFront", "Agregá vocabulario o cambiá la fuente");
      setText("flashcardBack", "");
      setText("flashcardExample", "");
      if (flashcardPronunciation) flashcardPronunciation.innerHTML = "";
      if (flashcard) flashcard.classList.remove("show-back");
      return;
    }

    const card = currentFlashcards[flashcardIndex % currentFlashcards.length];

    setText("flashcardType", card.type);
    setText("flashcardFront", card.front);
    setText("flashcardBack", card.back);
    setText("flashcardExample", card.example || "");

    if (flashcardPronunciation) {
      flashcardPronunciation.innerHTML = flashcardShowingBack
        ? `<em>${escapeHTML(card.pronunciation || toPronunciation(card.front))}</em>`
        : "";
    }

    if (flashcard) flashcard.classList.toggle("show-back", flashcardShowingBack);
  }

  function nextFlashcardStable() {
    if (!currentFlashcards.length) return;
    flashcardIndex = (flashcardIndex + 1) % currentFlashcards.length;
    flashcardShowingBack = false;
    renderFlashcardStable();
  }

  function updateFlashcardProgress(result) {
    const card = currentFlashcards[flashcardIndex % currentFlashcards.length];
    const key = card?.progressKey || "grammar";

    topicStats[key] = topicStats[key] || { correct: 0, total: 0 };
    topicStats[key].total += 1;

    if (result === "Lo sabía") {
      topicStats[key].correct += 1;
      scoreHistory.push(100);
    } else if (result === "Me costó") {
      scoreHistory.push(55);
    } else {
      scoreHistory.push(70);
    }

    if (scoreHistory.length > 80) scoreHistory = scoreHistory.slice(-80);

    flashcardCount += 1;
    studySeconds += 20;
    weeklySeconds += 20;

    localStorage.setItem("englishTrainerFlashcardCount", String(flashcardCount));
    localStorage.setItem("englishTrainerTopicStats", JSON.stringify(topicStats));
    localStorage.setItem("englishTrainerScoreHistory", JSON.stringify(scoreHistory));
    localStorage.setItem("englishTrainerStudySeconds", String(studySeconds));
    localStorage.setItem("englishTrainerWeeklySeconds", String(weeklySeconds));

    if (typeof saveProgress === "function") saveProgress();
    if (typeof logActivity === "function") logActivity(`Flashcard · ${result}`);
    if (typeof updateProgress === "function") updateProgress();
  }

  function recordFlashcardStable(result) {
    updateFlashcardProgress(result);
    nextFlashcardStable();
  }

  function bindCaptureEvents() {
    const newBtn = document.getElementById("newQuickBtn");
    const checkBtn = document.getElementById("checkQuickBtn");
    const modelBtn = document.getElementById("showQuickAnswerBtn");

    if (newBtn && !newBtn.dataset.v22Bound) {
      newBtn.dataset.v22Bound = "true";
      newBtn.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        nextPracticeItem(true);
      }, true);
    }

    if (checkBtn && !checkBtn.dataset.v22Bound) {
      checkBtn.dataset.v22Bound = "true";
      checkBtn.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        checkPractice(false);
      }, true);
    }

    if (modelBtn && !modelBtn.dataset.v22Bound) {
      modelBtn.dataset.v22Bound = "true";
      modelBtn.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        checkPractice(true);
      }, true);
    }

    const sourceEl = document.getElementById("flashcardSource");
    if (sourceEl && !sourceEl.dataset.v22Bound) {
      sourceEl.dataset.v22Bound = "true";
      sourceEl.addEventListener("change", (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        buildFlashcardsStable(true);
      }, true);
    }

    const nextBtn = document.getElementById("nextCardBtn");
    if (nextBtn && !nextBtn.dataset.v22Bound) {
      nextBtn.dataset.v22Bound = "true";
      nextBtn.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        nextFlashcardStable();
      }, true);
    }

    const knownBtn = document.getElementById("knownCardBtn");
    const hardBtn = document.getElementById("hardCardBtn");
    const repeatBtn = document.getElementById("repeatCardBtn");

    if (knownBtn && !knownBtn.dataset.v22Bound) {
      knownBtn.dataset.v22Bound = "true";
      knownBtn.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        recordFlashcardStable("Lo sabía");
      }, true);
    }

    if (hardBtn && !hardBtn.dataset.v22Bound) {
      hardBtn.dataset.v22Bound = "true";
      hardBtn.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        recordFlashcardStable("Me costó");
      }, true);
    }

    if (repeatBtn && !repeatBtn.dataset.v22Bound) {
      repeatBtn.dataset.v22Bound = "true";
      repeatBtn.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        recordFlashcardStable("Repetir después");
      }, true);
    }

    document.querySelectorAll("[data-resource='flashcards'], [data-resource-nav='flashcards']").forEach((button) => {
      if (button.dataset.v22RandomBound) return;
      button.dataset.v22RandomBound = "true";
      button.addEventListener("click", () => {
        setTimeout(() => buildFlashcardsStable(true), 60);
      });
    });
  }

  updateTimerUI = updateCircleTimer;
  renderQuickPractice = renderPracticeItem;
  nextQuickPractice = nextPracticeItem;
  checkQuickPractice = checkPractice;
  buildQuickPracticePool = buildPracticePool;
  buildFlashcards = buildFlashcardsStable;
  renderFlashcard = renderFlashcardStable;
  nextFlashcard = nextFlashcardStable;
  recordFlashcard = recordFlashcardStable;

  function bootStableFix() {
    ensureCircleTimer();
    updateCircleTimer();

    quickPracticePool = buildPracticePool();
    refillPracticeCycle();
    currentPracticeItem = null;
    nextPracticeItem(false);
    renderPracticeItem();

    buildFlashcardsStable(true);
    bindCaptureEvents();

    const statsEl = document.getElementById("flashcardStats");
    if (statsEl) statsEl.remove();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootStableFix);
  } else {
    bootStableFix();
  }

  window.addEventListener("load", () => {
    setTimeout(bootStableFix, 80);
  });
})();


/* =========================================================
   PRACTICE BUTTONS FIX V23
   - Corregir respuesta queda funcional y no depende de listeners viejos.
   - Ver respuesta modelo funciona como toggle: ver / ocultar.
   - Nueva oración mantiene ciclo mezclado de los 17 tiempos verbales.
   - Este bloque usa captura sobre document para evitar conflictos con
     handlers duplicados de versiones anteriores.
========================================================= */

(function practiceButtonsFixV23() {
  const TOPICS_V23 = [
    "Present Simple",
    "Present Continuous",
    "Past Simple",
    "Past Continuous",
    "Present Perfect",
    "Present Perfect Continuous",
    "Past Perfect",
    "Past Perfect Continuous",
    "Future Simple",
    "Going To",
    "Future Continuous",
    "Future Perfect",
    "Future Perfect Continuous",
    "Zero Conditional",
    "First Conditional",
    "Second Conditional",
    "Third Conditional"
  ];

  const FALLBACK_POOL_V23 = [
    {
      topic: "Present Simple",
      es: "Yo estudio inglés todos los días.",
      answer: "I study English every day.",
      acceptedAnswers: ["I study English every day.", "I practise English every day.", "I practice English every day."],
      keywords: ["study", "english", "every day"]
    },
    {
      topic: "Present Continuous",
      es: "Estoy escribiendo una respuesta ahora.",
      answer: "I am writing an answer now.",
      acceptedAnswers: ["I am writing an answer now.", "I'm writing an answer now.", "I am currently writing an answer."],
      keywords: ["am", "writing", "now"]
    },
    {
      topic: "Past Simple",
      es: "Terminé el informe ayer.",
      answer: "I finished the report yesterday.",
      acceptedAnswers: ["I finished the report yesterday.", "I completed the report yesterday."],
      keywords: ["finished", "report", "yesterday"]
    },
    {
      topic: "Past Continuous",
      es: "Estaba leyendo cuando me llamaste.",
      answer: "I was reading when you called me.",
      acceptedAnswers: ["I was reading when you called me.", "I was studying when you called me."],
      keywords: ["was", "reading", "called"]
    },
    {
      topic: "Present Perfect",
      es: "He terminado el ejercicio.",
      answer: "I have finished the exercise.",
      acceptedAnswers: ["I have finished the exercise.", "I've finished the exercise.", "I have completed the exercise."],
      keywords: ["have", "finished"]
    },
    {
      topic: "Present Perfect Continuous",
      es: "He estado estudiando durante dos horas.",
      answer: "I have been studying for two hours.",
      acceptedAnswers: ["I have been studying for two hours.", "I've been studying for two hours.", "I have been practicing for two hours."],
      keywords: ["have", "been", "studying"]
    },
    {
      topic: "Past Perfect",
      es: "Ya había terminado cuando empezó la clase.",
      answer: "I had already finished when the class started.",
      acceptedAnswers: ["I had already finished when the class started.", "I had already completed it when the class started."],
      keywords: ["had", "finished"]
    },
    {
      topic: "Past Perfect Continuous",
      es: "Había estado practicando durante horas.",
      answer: "I had been practicing for hours.",
      acceptedAnswers: ["I had been practicing for hours.", "I had been studying for hours.", "I had been training for hours."],
      keywords: ["had", "been", "practicing"]
    },
    {
      topic: "Future Simple",
      es: "Te ayudaré después de la clase.",
      answer: "I will help you after class.",
      acceptedAnswers: ["I will help you after class.", "I'll help you after class.", "I will assist you after class."],
      keywords: ["will", "help"]
    },
    {
      topic: "Going To",
      es: "Voy a empezar un curso nuevo.",
      answer: "I am going to start a new course.",
      acceptedAnswers: ["I am going to start a new course.", "I'm going to begin a new course."],
      keywords: ["going", "to", "start"]
    },
    {
      topic: "Future Continuous",
      es: "Estaré trabajando mañana a esta hora.",
      answer: "I will be working at this time tomorrow.",
      acceptedAnswers: ["I will be working at this time tomorrow.", "I'll be working at this time tomorrow."],
      keywords: ["will", "be", "working"]
    },
    {
      topic: "Future Perfect",
      es: "Habré terminado el documento para mañana.",
      answer: "I will have finished the document by tomorrow.",
      acceptedAnswers: ["I will have finished the document by tomorrow.", "I'll have finished the document by tomorrow.", "I will have completed the document by tomorrow."],
      keywords: ["will", "have", "finished"]
    },
    {
      topic: "Future Perfect Continuous",
      es: "Habré estado estudiando durante un año.",
      answer: "I will have been studying for a year.",
      acceptedAnswers: ["I will have been studying for a year.", "I'll have been studying for a year.", "I will have been learning for a year."],
      keywords: ["will", "have", "been", "studying"]
    },
    {
      topic: "Zero Conditional",
      es: "Si calentás agua, hierve.",
      answer: "If you heat water, it boils.",
      acceptedAnswers: ["If you heat water, it boils.", "Water boils if you heat it."],
      keywords: ["if", "heat", "boils"]
    },
    {
      topic: "First Conditional",
      es: "Si llueve mañana, nos quedaremos en casa.",
      answer: "If it rains tomorrow, we will stay at home.",
      acceptedAnswers: ["If it rains tomorrow, we will stay at home.", "If it rains tomorrow, we'll stay home.", "We will stay at home if it rains tomorrow."],
      keywords: ["if", "rains", "will"]
    },
    {
      topic: "Second Conditional",
      es: "Si tuviera más tiempo, viajaría más.",
      answer: "If I had more time, I would travel more.",
      acceptedAnswers: ["If I had more time, I would travel more.", "I would travel more if I had more time."],
      keywords: ["if", "had", "would"]
    },
    {
      topic: "Third Conditional",
      es: "Si hubiera estudiado más, habría aprobado el examen.",
      answer: "If I had studied more, I would have passed the exam.",
      acceptedAnswers: ["If I had studied more, I would have passed the exam.", "If I had prepared more, I would have passed the exam.", "I would have passed the exam if I had studied more."],
      keywords: ["if", "had", "would", "passed"]
    }
  ];

  let cycle = [];
  let currentItem = null;
  let modelVisible = false;

  function getEl(id) {
    return document.getElementById(id);
  }

  function safeNormalize(text = "") {
    if (typeof normalizeText === "function") return normalizeText(text);

    return String(text)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[’']/g, "")
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function safeEscape(text = "") {
    if (typeof escapeHTML === "function") return escapeHTML(text);

    return String(text)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  }

  function shuffle(array) {
    const arr = [...array];

    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
  }

  function getPool() {
    let pool = [];

    try {
      if (Array.isArray(quickPracticePool) && quickPracticePool.length) {
        pool = quickPracticePool;
      } else if (typeof buildQuickPracticePool === "function") {
        pool = buildQuickPracticePool();
        quickPracticePool = pool;
      }
    } catch (error) {
      pool = [];
    }

    const filtered = pool.filter((item) => {
      return item
        && typeof item.topic === "string"
        && TOPICS_V23.includes(item.topic)
        && item.es
        && item.answer;
    });

    return filtered.length ? filtered : FALLBACK_POOL_V23;
  }

  function resetCycle() {
    cycle = shuffle(TOPICS_V23);
  }

  function pickItemByTopic(topic) {
    const pool = getPool();
    const options = pool.filter((item) => item.topic === topic);
    const source = options.length ? options : FALLBACK_POOL_V23.filter((item) => item.topic === topic);

    return source[Math.floor(Math.random() * source.length)] || FALLBACK_POOL_V23[0];
  }

  function setTopic(topic) {
    const topicEl = getEl("quickTopic");
    if (!topicEl) return;

    topicEl.textContent = topic || "Present Simple";
    topicEl.title = topic || "Present Simple";
    topicEl.classList.add("quick-topic-pill");
  }

  function setModelButtonState() {
    const modelBtn = getEl("showQuickAnswerBtn");
    if (!modelBtn) return;

    modelBtn.textContent = modelVisible ? "Ocultar respuesta modelo" : "Ver respuesta modelo";
    modelBtn.classList.toggle("model-visible", modelVisible);
  }

  function clearFeedback() {
    const feedbackEl = getEl("quickFeedback");
    if (feedbackEl) feedbackEl.innerHTML = "";
  }

  function renderCurrentItem() {
    if (!currentItem) nextItem(false);

    const promptEl = getEl("quickPrompt");
    const answerEl = getEl("quickAnswer");

    setTopic(currentItem.topic);

    if (promptEl) promptEl.textContent = currentItem.es;
    if (answerEl) answerEl.value = "";

    modelVisible = false;
    setModelButtonState();
    clearFeedback();
  }

  function nextItem(shouldRender = true) {
    if (!cycle.length) resetCycle();

    const topic = cycle.shift();
    currentItem = pickItemByTopic(topic);

    if (shouldRender) renderCurrentItem();
  }

  function similarity(a, b) {
    const aTokens = safeNormalize(a).split(" ").filter(Boolean);
    const bTokens = safeNormalize(b).split(" ").filter(Boolean);

    if (!aTokens.length || !bTokens.length) return 0;

    const aSet = new Set(aTokens);
    const bSet = new Set(bTokens);
    let common = 0;

    aSet.forEach((token) => {
      if (bSet.has(token)) common += 1;
    });

    return ((common / aSet.size) + (common / bSet.size)) / 2;
  }

  function getAcceptedAnswers(item) {
    return [...new Set([item.answer, ...(Array.isArray(item.acceptedAnswers) ? item.acceptedAnswers : [])])];
  }

  function showModelAnswer() {
    if (!currentItem) nextItem(false);

    const feedbackEl = getEl("quickFeedback");
    if (!feedbackEl || !currentItem) return;

    const accepted = getAcceptedAnswers(currentItem);

    feedbackEl.innerHTML = `
      <strong>Respuesta modelo</strong>
      <p>${safeEscape(currentItem.answer)}</p>
      ${accepted.length > 1 ? `<p><strong>También se aceptan:</strong> ${accepted.slice(1, 4).map(safeEscape).join(" · ")}</p>` : ""}
    `;

    setTopic(currentItem.topic);
  }

  function hideModelAnswer() {
    clearFeedback();
  }

  function toggleModelAnswer() {
    modelVisible = !modelVisible;

    if (modelVisible) {
      showModelAnswer();
    } else {
      hideModelAnswer();
    }

    setModelButtonState();
  }

  function correctAnswer() {
    if (!currentItem) nextItem(false);

    const feedbackEl = getEl("quickFeedback");
    const answerEl = getEl("quickAnswer");

    if (!feedbackEl || !currentItem) return;

    const user = answerEl?.value?.trim() || "";

    modelVisible = false;
    setModelButtonState();

    if (!user) {
      feedbackEl.innerHTML = `
        <strong>Escribí una respuesta primero</strong>
        <p>Completá la traducción en la caja de texto y después tocá nuevamente <strong>Corregir respuesta</strong>.</p>
      `;
      setTopic(currentItem.topic);
      return;
    }

    const accepted = getAcceptedAnswers(currentItem);
    let best = "";
    let bestScore = 0;

    accepted.forEach((option) => {
      const score = similarity(user, option);
      if (score > bestScore) {
        bestScore = score;
        best = option;
      }
    });

    const keywordScore = Array.isArray(currentItem.keywords) && currentItem.keywords.length
      ? currentItem.keywords.filter((keyword) => safeNormalize(user).includes(safeNormalize(keyword))).length / currentItem.keywords.length
      : 0;

    const finalScore = Math.round(Math.max(bestScore, keywordScore) * 100);
    const acceptedAnswer = bestScore >= 0.74 || keywordScore >= 0.75;

    feedbackEl.innerHTML = `
      <strong>${acceptedAnswer ? "Muy bien" : "Ajustá un poco más la traducción"}</strong>
      <p>${acceptedAnswer
        ? `Tu respuesta entra dentro de las variantes válidas. Coincidencia aproximada: ${finalScore}%.`
        : `Coincidencia aproximada: ${finalScore}%. Revisá el tiempo verbal, el auxiliar o la elección del verbo principal.`}
      </p>
      <p><strong>Tiempo verbal:</strong> ${safeEscape(currentItem.topic)}</p>
      <p><strong>Modelo base:</strong> ${safeEscape(currentItem.answer)}</p>
      ${best && safeNormalize(best) !== safeNormalize(currentItem.answer) ? `<p><strong>Variante compatible:</strong> ${safeEscape(best)}</p>` : ""}
    `;

    setTopic(currentItem.topic);

    if (typeof logActivity === "function") {
      logActivity(`Práctica rápida · ${currentItem.topic}`);
    }
  }

  function bindPracticeButtons() {
    const newBtn = getEl("newQuickBtn");
    const checkBtn = getEl("checkQuickBtn");
    const modelBtn = getEl("showQuickAnswerBtn");

    if (checkBtn) checkBtn.textContent = "Corregir respuesta";
    setModelButtonState();

    [newBtn, checkBtn, modelBtn].forEach((button) => {
      if (!button) return;
      button.dataset.practiceV23Bound = "true";
    });
  }

  function handlePracticeClick(event) {
    const newBtn = event.target.closest("#newQuickBtn");
    const checkBtn = event.target.closest("#checkQuickBtn");
    const modelBtn = event.target.closest("#showQuickAnswerBtn");

    if (!newBtn && !checkBtn && !modelBtn) return;

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    if (newBtn) {
      nextItem(true);
      return;
    }

    if (checkBtn) {
      correctAnswer();
      return;
    }

    if (modelBtn) {
      toggleModelAnswer();
    }
  }

  function boot() {
    if (!cycle.length) resetCycle();

    if (!currentItem) {
      nextItem(false);
    }

    renderCurrentItem();
    bindPracticeButtons();
  }

  // Exponer estas funciones para que cualquier handler viejo que las llame use la versión correcta.
  renderQuickPractice = renderCurrentItem;
  nextQuickPractice = nextItem;
  checkQuickPractice = function checkQuickPracticeV23(showAnswer = false) {
    if (showAnswer) toggleModelAnswer();
    else correctAnswer();
  };

  document.addEventListener("click", handlePracticeClick, true);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  window.addEventListener("load", () => {
    setTimeout(boot, 80);
  });
})();


/* =========================================================
   TIMER MINI + SVG SECTOR V25
   Main timer and mini timer share exact progress sector.
   The consumed sector begins at 12 o'clock.
========================================================= */
/* [LIMPIEZA] Timer circular (timerMiniAndSectorV25) eliminado: reemplazado por el flip clock V51. */


/* =========================================================
   THEME BUTTON SHADOW V26
   Fuerza repintado cuando cambia el theme para que sombras y botones
   queden sincronizados con el color activo.
========================================================= */
(function themeButtonShadowV26() {
  function repaintThemeShadows() {
    document.documentElement.classList.add("theme-shadow-repaint");
    window.setTimeout(() => {
      document.documentElement.classList.remove("theme-shadow-repaint");
    }, 60);
  }

  const originalApplyTheme = typeof applyTheme === "function" ? applyTheme : null;

  if (originalApplyTheme && !window.__themeShadowV26Wrapped) {
    window.__themeShadowV26Wrapped = true;

    applyTheme = function applyThemeWithButtonShadowsV26(...args) {
      const result = originalApplyTheme.apply(this, args);
      repaintThemeShadows();
      return result;
    };
  }

  window.addEventListener("load", repaintThemeShadows);
})();

/* COMMON SPOKEN PHRASAL VERBS V27 */
const COMMON_SPOKEN_PHRASALS_V27 = [
  [
    "hang out",
    "pasar el rato, juntarse",
    "We usually hang out after work."
  ],
  [
    "come over",
    "venir a casa de alguien",
    "Do you want to come over tonight?"
  ],
  [
    "go out",
    "salir, ir a divertirse",
    "They went out for dinner."
  ],
  [
    "stay in",
    "quedarse en casa",
    "I’m tired, so I’m staying in tonight."
  ],
  [
    "show up",
    "aparecer, presentarse",
    "He didn’t show up to the meeting."
  ],
  [
    "turn up",
    "aparecer / subir el volumen",
    "She turned up late again."
  ],
  [
    "come back",
    "volver",
    "When did you come back?"
  ],
  [
    "go back",
    "volver",
    "I need to go back home."
  ],
  [
    "get back",
    "volver / recuperar",
    "I’ll get back to you later."
  ],
  [
    "call back",
    "devolver una llamada",
    "Can I call you back in ten minutes?"
  ],
  [
    "text back",
    "responder un mensaje",
    "She never texted me back."
  ],
  [
    "write back",
    "responder por escrito",
    "He wrote back the next day."
  ],
  [
    "get up",
    "levantarse",
    "I get up at seven."
  ],
  [
    "wake up",
    "despertarse",
    "I woke up late today."
  ],
  [
    "lie down",
    "acostarse un rato",
    "I need to lie down for a minute."
  ],
  [
    "sit down",
    "sentarse",
    "Come in and sit down."
  ],
  [
    "stand up",
    "ponerse de pie / defenderse",
    "Everyone stood up when she entered."
  ],
  [
    "calm down",
    "calmarse",
    "Calm down, everything is fine."
  ],
  [
    "cheer up",
    "animarse / animar",
    "Cheer up! It’s not that bad."
  ],
  [
    "open up",
    "abrirse emocionalmente",
    "He finally opened up about his problem."
  ],
  [
    "shut up",
    "callarse",
    "Please shut up for a second."
  ],
  [
    "speak up",
    "hablar más fuerte / decir lo que pensás",
    "Could you speak up?"
  ],
  [
    "bring up",
    "sacar un tema",
    "Don’t bring that up again."
  ],
  [
    "come up",
    "surgir",
    "Something came up at work."
  ],
  [
    "come up with",
    "ocurrírsele una idea",
    "She came up with a great plan."
  ],
  [
    "make up",
    "inventar / reconciliarse",
    "He made up an excuse."
  ],
  [
    "make out",
    "distinguir / besarse",
    "I can’t make out what he’s saying."
  ],
  [
    "figure out",
    "entender, resolver",
    "I finally figured it out."
  ],
  [
    "find out",
    "averiguar",
    "How did you find out?"
  ],
  [
    "look up",
    "buscar información",
    "Look it up online."
  ],
  [
    "look for",
    "buscar",
    "I’m looking for my phone."
  ],
  [
    "look at",
    "mirar",
    "Look at this picture."
  ],
  [
    "look into",
    "investigar",
    "We should look into it."
  ],
  [
    "look over",
    "revisar rápidamente",
    "Can you look over my essay?"
  ],
  [
    "look after",
    "cuidar",
    "She looks after her brother."
  ],
  [
    "look out",
    "tener cuidado",
    "Look out!"
  ],
  [
    "watch out",
    "tener cuidado",
    "Watch out for that car."
  ],
  [
    "check out",
    "mirar / revisar / pagar y salir",
    "Check out this video."
  ],
  [
    "check in",
    "registrarse / avisar que estás bien",
    "We checked in at the hotel."
  ],
  [
    "check on",
    "verificar cómo está alguien",
    "I’ll check on her later."
  ],
  [
    "try on",
    "probarse ropa",
    "Can I try this jacket on?"
  ],
  [
    "try out",
    "probar algo",
    "I want to try out this app."
  ],
  [
    "pick up",
    "recoger / aprender / atender teléfono",
    "Can you pick me up at eight?"
  ],
  [
    "drop off",
    "dejar a alguien o algo",
    "I’ll drop you off at home."
  ],
  [
    "put on",
    "ponerse ropa / poner música",
    "Put on your coat."
  ],
  [
    "take off",
    "quitarse ropa / despegar",
    "Take off your shoes."
  ],
  [
    "throw away",
    "tirar a la basura",
    "Don’t throw that away."
  ],
  [
    "clean up",
    "limpiar, ordenar",
    "Let’s clean up the kitchen."
  ],
  [
    "clear out",
    "vaciar, despejar",
    "We need to clear out the closet."
  ],
  [
    "put away",
    "guardar",
    "Put your phone away."
  ],
  [
    "take out",
    "sacar / invitar a salir",
    "I’ll take out the trash."
  ],
  [
    "bring over",
    "traer a casa de alguien",
    "Bring over some snacks."
  ],
  [
    "bring back",
    "traer de vuelta / recordar",
    "That song brings back memories."
  ],
  [
    "give back",
    "devolver",
    "Give me back my book."
  ],
  [
    "pay back",
    "devolver dinero",
    "I’ll pay you back tomorrow."
  ],
  [
    "get away",
    "escaparse / irse unos días",
    "We got away for the weekend."
  ],
  [
    "get out",
    "salir",
    "Get out of here!"
  ],
  [
    "get in",
    "entrar / llegar",
    "What time did you get in?"
  ],
  [
    "get on",
    "subirse / llevarse",
    "Get on the bus."
  ],
  [
    "get off",
    "bajarse / salir del trabajo",
    "I get off work at six."
  ],
  [
    "get along",
    "llevarse bien",
    "Do you two get along?"
  ],
  [
    "get along with",
    "llevarse bien con alguien",
    "I get along with my boss."
  ],
  [
    "get over",
    "superar",
    "She got over the breakup."
  ],
  [
    "get through",
    "superar / terminar / comunicarse",
    "We got through the exam."
  ],
  [
    "get together",
    "reunirse",
    "Let’s get together soon."
  ],
  [
    "meet up",
    "encontrarse con alguien",
    "Let’s meet up after class."
  ],
  [
    "catch up",
    "ponerse al día",
    "We need to catch up."
  ],
  [
    "catch up with",
    "ponerse al día con alguien",
    "I caught up with an old friend."
  ],
  [
    "keep up",
    "mantener el ritmo",
    "I can’t keep up."
  ],
  [
    "keep up with",
    "seguirle el ritmo a",
    "She keeps up with the news."
  ],
  [
    "keep on",
    "seguir haciendo algo",
    "Keep on trying."
  ],
  [
    "hold on",
    "esperar",
    "Hold on a second."
  ],
  [
    "hang on",
    "esperar",
    "Hang on, I’m coming."
  ],
  [
    "hang up",
    "cortar el teléfono",
    "He hung up on me."
  ],
  [
    "turn on",
    "encender",
    "Turn on the TV."
  ],
  [
    "turn off",
    "apagar",
    "Turn off the lights."
  ],
  [
    "turn down",
    "rechazar / bajar volumen",
    "She turned down the offer."
  ],
  [
    "turn around",
    "darse vuelta / mejorar una situación",
    "The team turned things around."
  ],
  [
    "turn into",
    "convertirse en",
    "The night turned into a disaster."
  ],
  [
    "break up",
    "terminar una relación",
    "They broke up last month."
  ],
  [
    "break down",
    "romperse / ponerse mal",
    "My car broke down."
  ],
  [
    "break in",
    "entrar por la fuerza / ablandar zapatos",
    "Someone broke in last night."
  ],
  [
    "break out",
    "estallar / empezar de golpe",
    "A fight broke out."
  ],
  [
    "run into",
    "encontrarse con alguien / tener problemas",
    "I ran into Mike yesterday."
  ],
  [
    "run out of",
    "quedarse sin",
    "We ran out of coffee."
  ],
  [
    "run away",
    "escaparse",
    "The dog ran away."
  ],
  [
    "run over",
    "atropellar / repasar rápido",
    "Let’s run over the plan."
  ],
  [
    "go on",
    "continuar / pasar",
    "What’s going on?"
  ],
  [
    "go ahead",
    "seguir adelante",
    "Go ahead, ask me."
  ],
  [
    "go through",
    "atravesar / revisar / sufrir",
    "She’s going through a lot."
  ],
  [
    "go over",
    "repasar",
    "Let’s go over the answers."
  ],
  [
    "go with",
    "combinar con / elegir",
    "This shirt goes with those pants."
  ],
  [
    "come on",
    "dale / venir",
    "Come on, hurry up!"
  ],
  [
    "come in",
    "entrar",
    "Come in and close the door."
  ],
  [
    "come out",
    "salir / estrenarse",
    "The movie comes out Friday."
  ],
  [
    "come across",
    "encontrarse con algo por casualidad",
    "I came across an old photo."
  ],
  [
    "come around",
    "pasar a visitar / cambiar de opinión",
    "He’ll come around eventually."
  ],
  [
    "give up",
    "rendirse / dejar",
    "Don’t give up."
  ],
  [
    "give in",
    "ceder",
    "She finally gave in."
  ],
  [
    "give out",
    "repartir / dejar de funcionar",
    "They gave out flyers."
  ],
  [
    "give away",
    "regalar / revelar",
    "Don’t give away the ending."
  ],
  [
    "put off",
    "posponer",
    "We put off the meeting."
  ],
  [
    "put up with",
    "tolerar",
    "I can’t put up with this noise."
  ],
  [
    "put together",
    "armar, preparar",
    "I put together a list."
  ],
  [
    "set up",
    "organizar / instalar",
    "We set up a meeting."
  ],
  [
    "set aside",
    "reservar tiempo/dinero",
    "Set aside time to study."
  ],
  [
    "work out",
    "hacer ejercicio / resolver / salir bien",
    "Everything worked out."
  ],
  [
    "work on",
    "trabajar en mejorar algo",
    "I’m working on my pronunciation."
  ],
  [
    "work with",
    "trabajar con",
    "I work with a great team."
  ],
  [
    "deal with",
    "lidiar con",
    "I have to deal with this problem."
  ],
  [
    "take care of",
    "cuidar / encargarse de",
    "I’ll take care of it."
  ],
  [
    "take over",
    "tomar control",
    "She took over the project."
  ],
  [
    "take back",
    "retirar lo dicho / devolver",
    "I take back what I said."
  ],
  [
    "take after",
    "parecerse a un familiar",
    "She takes after her mom."
  ],
  [
    "carry on",
    "continuar",
    "Carry on with your work."
  ],
  [
    "move on",
    "seguir adelante",
    "It’s time to move on."
  ],
  [
    "end up",
    "terminar resultando",
    "We ended up at Monica’s apartment."
  ],
  [
    "show off",
    "presumir",
    "He’s just showing off."
  ]
];


function applyCommonSpokenPhrasalsV27() {
  if (!Array.isArray(phrasalVerbs)) return;

  phrasalVerbs.splice(0, phrasalVerbs.length, ...COMMON_SPOKEN_PHRASALS_V27);

  if (typeof renderPhrasalTable === "function") renderPhrasalTable();
  if (typeof buildFlashcards === "function") buildFlashcards(true);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", applyCommonSpokenPhrasalsV27);
} else {
  applyCommonSpokenPhrasalsV27();
}

window.addEventListener("load", () => {
  setTimeout(applyCommonSpokenPhrasalsV27, 120);
});


/* =========================================================
   V33 ESTUDIO MENU + FLASHVOICE VARIADO + MINIMAL UI
========================================================= */

(function englishTrainerV33() {
  if (window.__englishTrainerV33Ready) return;
  window.__englishTrainerV33Ready = true;

  const LISTENING_LESSONS_V33 = [{"id": "4-5-1", "level": "4-5", "number": 1, "title": "Campus library orientation · Lesson 1", "type": "Sentence completion", "instruction": "Complete the sentences using no more than two words.", "transcript": "The speaker gives clear basic information about campus library orientation. The main session takes place on Monday at 8:30, and participants should meet at Room 12. Emma Carter explains that the most important point is students, while librarian is usually the detail people forget. The cost or reference given in the notice is £12, and everyone should bring a feedback form. The final recommendation is to review quiet study rooms before leaving, because this helps avoid common mistakes.", "questions": ["The session takes place on <input data-answer='Monday'>.", "Participants should arrive at <input data-answer='8:30'>.", "The meeting point is <input data-answer='Room 12'>.", "The speaker is <input data-answer='Emma Carter'>.", "Everyone should bring a <input data-answer='feedback form'>."]}, {"id": "4-5-2", "level": "4-5", "number": 2, "title": "Museum volunteer briefing · Lesson 2", "type": "Form completion", "instruction": "Complete the form using no more than two words and/or a number.", "transcript": "The speaker gives clear basic information about museum volunteer briefing. The main session takes place on Tuesday at 9:15, and participants should meet at Hall B. Daniel Lewis explains that the most important point is visitors, while cloakroom is usually the detail people forget. The cost or reference given in the notice is £18, and everyone should bring a confirmation email. The final recommendation is to review exhibition rooms before leaving, because this helps avoid common mistakes.", "questions": ["Name: <input data-answer='Daniel Lewis'>.", "Day: <input data-answer='Tuesday'>.", "Time: <input data-answer='9:15'>.", "Location: <input data-answer='Hall B'>.", "Document/item required: <input data-answer='confirmation email'>."]}, {"id": "4-5-3", "level": "4-5", "number": 3, "title": "Urban transport update · Lesson 3", "type": "Table completion", "instruction": "Complete the table using no more than two words and/or a number.", "transcript": "The speaker gives clear basic information about urban transport update. The main session takes place on Wednesday at 10:45, and participants should meet at the main desk. Priya Shah explains that the most important point is commuters, while platform changes is usually the detail people forget. The cost or reference given in the notice is £24, and everyone should bring a student card. The final recommendation is to review ticket machines before leaving, because this helps avoid common mistakes.", "questions": ["Date/day: <input data-answer='Wednesday'>.", "Start time: <input data-answer='10:45'>.", "Meeting place: <input data-answer='the main desk'>.", "Person in charge: <input data-answer='Priya Shah'>.", "Item to bring: <input data-answer='student card'>."]}, {"id": "4-5-4", "level": "4-5", "number": 4, "title": "Community garden project · Lesson 4", "type": "Matching", "instruction": "Complete the sentences using no more than two words.", "transcript": "The speaker gives clear basic information about community garden project. The main session takes place on Thursday at 11:20, and participants should meet at the north entrance. Oliver Grant explains that the most important point is residents, while compost is usually the detail people forget. The cost or reference given in the notice is £35, and everyone should bring a reference number. The final recommendation is to review watering rota before leaving, because this helps avoid common mistakes.", "questionTitle": "Categories: A main session · B meeting point · C speaker · D required item · E cost/reference", "questions": ["Thursday: <input data-answer='A'>.", "the north entrance: <input data-answer='B'>.", "Oliver Grant: <input data-answer='C'>.", "reference number: <input data-answer='D'>.", "£35: <input data-answer='E'>."]}, {"id": "4-5-5", "level": "4-5", "number": 5, "title": "Health clinic appointment · Lesson 5", "type": "Multiple choice", "instruction": "Complete the sentences using no more than two words.", "transcript": "The speaker gives clear basic information about health clinic appointment. The main session takes place on Friday at 2:30, and participants should meet at Studio 3. Nina Brooks explains that the most important point is receptionist, while patient form is usually the detail people forget. The cost or reference given in the notice is £45, and everyone should bring a safety briefing. The final recommendation is to review symptoms before leaving, because this helps avoid common mistakes.", "mcq": [{"q": "When does the main session take place?", "options": ["Sunday", "Friday", "Wednesday"], "answer": 1}, {"q": "Where should participants meet?", "options": ["Studio 3", "the car park", "the cafeteria"], "answer": 0}, {"q": "Who gives the explanation?", "options": ["the receptionist", "a visitor", "Nina Brooks"], "answer": 2}, {"q": "What should people bring?", "options": ["a laptop charger", "safety briefing", "a lunch box"], "answer": 1}, {"q": "What should be reviewed before leaving?", "options": ["symptoms", "the building colour", "the weather"], "answer": 0}]}, {"id": "4-5-6", "level": "4-5", "number": 6, "title": "University accommodation · Lesson 6", "type": "Short answer", "instruction": "Answer the questions using no more than three words and/or a number.", "transcript": "The speaker gives clear basic information about university accommodation. The main session takes place on Saturday at 4:15, and participants should meet at Lab 4. James Miller explains that the most important point is halls, while shared flats is usually the detail people forget. The cost or reference given in the notice is £60, and everyone should bring a online account. The final recommendation is to review host families before leaving, because this helps avoid common mistakes.", "questions": ["What day is the session? <input data-answer='Saturday'>.", "What time does it begin? <input data-answer='4:15'>.", "Where do participants meet? <input data-answer='Lab 4'>.", "Who explains the information? <input data-answer='James Miller'>.", "What item should people bring? <input data-answer='online account'>."]}, {"id": "4-5-7", "level": "4-5", "number": 7, "title": "Environmental science lecture · Lesson 7", "type": "Note completion", "instruction": "Complete the sentences using no more than two words.", "transcript": "The speaker gives clear basic information about environmental science lecture. The main session takes place on Sunday at 6:40, and participants should meet at the visitor centre. Sofia Bennett explains that the most important point is urban trees, while heat islands is usually the detail people forget. The cost or reference given in the notice is £75, and everyone should bring a printed map. The final recommendation is to review pollution before leaving, because this helps avoid common mistakes.", "questions": ["The session takes place on <input data-answer='Sunday'>.", "Participants should arrive at <input data-answer='6:40'>.", "The meeting point is <input data-answer='the visitor centre'>.", "The speaker is <input data-answer='Sofia Bennett'>.", "Everyone should bring a <input data-answer='printed map'>."]}, {"id": "4-5-8", "level": "4-5", "number": 8, "title": "Hotel facilities tour · Lesson 8", "type": "Plan labelling", "instruction": "Label the plan using no more than three words and/or a number.", "transcript": "The speaker gives clear basic information about hotel facilities tour. The main session takes place on Monday at 7:10, and participants should meet at the seminar room. Ahmed Khan explains that the most important point is breakfast room, while gym is usually the detail people forget. The cost or reference given in the notice is £90, and everyone should bring a practice booklet. The final recommendation is to review swimming pool before leaving, because this helps avoid common mistakes.", "questions": ["Entrance area: <input data-answer='the seminar room'>.", "Information desk contact: <input data-answer='Ahmed Khan'>.", "Main time marker: <input data-answer='7:10'>.", "Required item: <input data-answer='practice booklet'>.", "Review point: <input data-answer='swimming pool'>."]}, {"id": "4-5-9", "level": "4-5", "number": 9, "title": "Language exchange meeting · Lesson 9", "type": "Classification", "instruction": "Complete the sentences using no more than two words.", "transcript": "The speaker gives clear basic information about language exchange meeting. The main session takes place on Tuesday at 8:30, and participants should meet at Room 12. Emma Carter explains that the most important point is students, while librarian is usually the detail people forget. The cost or reference given in the notice is £12, and everyone should bring a feedback form. The final recommendation is to review quiet study rooms before leaving, because this helps avoid common mistakes.", "questionTitle": "A main issue · B forgotten detail · C final review · D required item · E cost/reference", "questions": ["students: <input data-answer='A'>.", "librarian: <input data-answer='B'>.", "quiet study rooms: <input data-answer='C'>.", "feedback form: <input data-answer='D'>.", "£12: <input data-answer='E'>."]}, {"id": "4-5-10", "level": "4-5", "number": 10, "title": "Technology repair desk · Lesson 10", "type": "Summary completion", "instruction": "Complete the sentences using no more than two words.", "transcript": "The speaker gives clear basic information about technology repair desk. The main session takes place on Wednesday at 9:15, and participants should meet at Hall B. Daniel Lewis explains that the most important point is visitors, while cloakroom is usually the detail people forget. The cost or reference given in the notice is £18, and everyone should bring a confirmation email. The final recommendation is to review exhibition rooms before leaving, because this helps avoid common mistakes.", "questions": ["The session takes place on <input data-answer='Wednesday'>.", "Participants should arrive at <input data-answer='9:15'>.", "The meeting point is <input data-answer='Hall B'>.", "The speaker is <input data-answer='Daniel Lewis'>.", "Everyone should bring a <input data-answer='confirmation email'>."]}, {"id": "4-5-11", "level": "4-5", "number": 11, "title": "Workplace induction · Lesson 11", "type": "Sentence completion", "instruction": "Complete the sentences using no more than two words.", "transcript": "The speaker gives clear basic information about workplace induction. The main session takes place on Thursday at 10:45, and participants should meet at the main desk. Priya Shah explains that the most important point is commuters, while platform changes is usually the detail people forget. The cost or reference given in the notice is £24, and everyone should bring a student card. The final recommendation is to review ticket machines before leaving, because this helps avoid common mistakes.", "questions": ["The session takes place on <input data-answer='Thursday'>.", "Participants should arrive at <input data-answer='10:45'>.", "The meeting point is <input data-answer='the main desk'>.", "The speaker is <input data-answer='Priya Shah'>.", "Everyone should bring a <input data-answer='student card'>."]}, {"id": "4-5-12", "level": "4-5", "number": 12, "title": "Book club discussion · Lesson 12", "type": "Form completion", "instruction": "Complete the form using no more than two words and/or a number.", "transcript": "The speaker gives clear basic information about book club discussion. The main session takes place on Friday at 11:20, and participants should meet at the north entrance. Oliver Grant explains that the most important point is residents, while compost is usually the detail people forget. The cost or reference given in the notice is £35, and everyone should bring a reference number. The final recommendation is to review watering rota before leaving, because this helps avoid common mistakes.", "questions": ["Name: <input data-answer='Oliver Grant'>.", "Day: <input data-answer='Friday'>.", "Time: <input data-answer='11:20'>.", "Location: <input data-answer='the north entrance'>.", "Document/item required: <input data-answer='reference number'>."]}, {"id": "4-5-13", "level": "4-5", "number": 13, "title": "Airport boarding notice · Lesson 13", "type": "Table completion", "instruction": "Complete the table using no more than two words and/or a number.", "transcript": "The speaker gives clear basic information about airport boarding notice. The main session takes place on Saturday at 2:30, and participants should meet at Studio 3. Nina Brooks explains that the most important point is receptionist, while patient form is usually the detail people forget. The cost or reference given in the notice is £45, and everyone should bring a safety briefing. The final recommendation is to review symptoms before leaving, because this helps avoid common mistakes.", "questions": ["Date/day: <input data-answer='Saturday'>.", "Start time: <input data-answer='2:30'>.", "Meeting place: <input data-answer='Studio 3'>.", "Person in charge: <input data-answer='Nina Brooks'>.", "Item to bring: <input data-answer='safety briefing'>."]}, {"id": "4-5-14", "level": "4-5", "number": 14, "title": "Online course guidance · Lesson 14", "type": "Matching", "instruction": "Complete the sentences using no more than two words.", "transcript": "The speaker gives clear basic information about online course guidance. The main session takes place on Sunday at 4:15, and participants should meet at Lab 4. James Miller explains that the most important point is halls, while shared flats is usually the detail people forget. The cost or reference given in the notice is £60, and everyone should bring a online account. The final recommendation is to review host families before leaving, because this helps avoid common mistakes.", "questionTitle": "Categories: A main session · B meeting point · C speaker · D required item · E cost/reference", "questions": ["Sunday: <input data-answer='A'>.", "Lab 4: <input data-answer='B'>.", "James Miller: <input data-answer='C'>.", "online account: <input data-answer='D'>.", "£60: <input data-answer='E'>."]}, {"id": "4-5-15", "level": "4-5", "number": 15, "title": "Sports centre launch · Lesson 15", "type": "Multiple choice", "instruction": "Complete the sentences using no more than two words.", "transcript": "The speaker gives clear basic information about sports centre launch. The main session takes place on Monday at 6:40, and participants should meet at the visitor centre. Sofia Bennett explains that the most important point is urban trees, while heat islands is usually the detail people forget. The cost or reference given in the notice is £75, and everyone should bring a printed map. The final recommendation is to review pollution before leaving, because this helps avoid common mistakes.", "mcq": [{"q": "When does the main session take place?", "options": ["Wednesday", "Sunday", "Monday"], "answer": 2}, {"q": "Where should participants meet?", "options": ["the visitor centre", "the cafeteria", "the car park"], "answer": 0}, {"q": "Who gives the explanation?", "options": ["a visitor", "the receptionist", "Sofia Bennett"], "answer": 2}, {"q": "What should people bring?", "options": ["a lunch box", "a laptop charger", "printed map"], "answer": 2}, {"q": "What should be reviewed before leaving?", "options": ["the weather", "pollution", "the building colour"], "answer": 1}]}, {"id": "4-5-16", "level": "4-5", "number": 16, "title": "Cinema booking call · Lesson 16", "type": "Short answer", "instruction": "Answer the questions using no more than three words and/or a number.", "transcript": "The speaker gives clear basic information about cinema booking call. The main session takes place on Tuesday at 7:10, and participants should meet at the seminar room. Ahmed Khan explains that the most important point is breakfast room, while gym is usually the detail people forget. The cost or reference given in the notice is £90, and everyone should bring a practice booklet. The final recommendation is to review swimming pool before leaving, because this helps avoid common mistakes.", "questions": ["What day is the session? <input data-answer='Tuesday'>.", "What time does it begin? <input data-answer='7:10'>.", "Where do participants meet? <input data-answer='the seminar room'>.", "Who explains the information? <input data-answer='Ahmed Khan'>.", "What item should people bring? <input data-answer='practice booklet'>."]}, {"id": "4-5-17", "level": "4-5", "number": 17, "title": "Podcast about sleep · Lesson 17", "type": "Note completion", "instruction": "Complete the sentences using no more than two words.", "transcript": "The speaker gives clear basic information about podcast about sleep. The main session takes place on Wednesday at 8:30, and participants should meet at Room 12. Emma Carter explains that the most important point is students, while librarian is usually the detail people forget. The cost or reference given in the notice is £12, and everyone should bring a feedback form. The final recommendation is to review quiet study rooms before leaving, because this helps avoid common mistakes.", "questions": ["The session takes place on <input data-answer='Wednesday'>.", "Participants should arrive at <input data-answer='8:30'>.", "The meeting point is <input data-answer='Room 12'>.", "The speaker is <input data-answer='Emma Carter'>.", "Everyone should bring a <input data-answer='feedback form'>."]}, {"id": "4-5-18", "level": "4-5", "number": 18, "title": "Bike rental office · Lesson 18", "type": "Plan labelling", "instruction": "Label the plan using no more than three words and/or a number.", "transcript": "The speaker gives clear basic information about bike rental office. The main session takes place on Thursday at 9:15, and participants should meet at Hall B. Daniel Lewis explains that the most important point is visitors, while cloakroom is usually the detail people forget. The cost or reference given in the notice is £18, and everyone should bring a confirmation email. The final recommendation is to review exhibition rooms before leaving, because this helps avoid common mistakes.", "questions": ["Entrance area: <input data-answer='Hall B'>.", "Information desk contact: <input data-answer='Daniel Lewis'>.", "Main time marker: <input data-answer='9:15'>.", "Required item: <input data-answer='confirmation email'>.", "Review point: <input data-answer='exhibition rooms'>."]}, {"id": "4-5-19", "level": "4-5", "number": 19, "title": "Art workshop registration · Lesson 19", "type": "Classification", "instruction": "Complete the sentences using no more than two words.", "transcript": "The speaker gives clear basic information about art workshop registration. The main session takes place on Friday at 10:45, and participants should meet at the main desk. Priya Shah explains that the most important point is commuters, while platform changes is usually the detail people forget. The cost or reference given in the notice is £24, and everyone should bring a student card. The final recommendation is to review ticket machines before leaving, because this helps avoid common mistakes.", "questionTitle": "A main issue · B forgotten detail · C final review · D required item · E cost/reference", "questions": ["commuters: <input data-answer='A'>.", "platform changes: <input data-answer='B'>.", "ticket machines: <input data-answer='C'>.", "student card: <input data-answer='D'>.", "£24: <input data-answer='E'>."]}, {"id": "4-5-20", "level": "4-5", "number": 20, "title": "Local radio interview · Lesson 20", "type": "Summary completion", "instruction": "Complete the sentences using no more than two words.", "transcript": "The speaker gives clear basic information about local radio interview. The main session takes place on Saturday at 11:20, and participants should meet at the north entrance. Oliver Grant explains that the most important point is residents, while compost is usually the detail people forget. The cost or reference given in the notice is £35, and everyone should bring a reference number. The final recommendation is to review watering rota before leaving, because this helps avoid common mistakes.", "questions": ["The session takes place on <input data-answer='Saturday'>.", "Participants should arrive at <input data-answer='11:20'>.", "The meeting point is <input data-answer='the north entrance'>.", "The speaker is <input data-answer='Oliver Grant'>.", "Everyone should bring a <input data-answer='reference number'>."]}, {"id": "4-5-21", "level": "4-5", "number": 21, "title": "Research seminar · Lesson 21", "type": "Sentence completion", "instruction": "Complete the sentences using no more than two words.", "transcript": "The speaker gives clear basic information about research seminar. The main session takes place on Sunday at 2:30, and participants should meet at Studio 3. Nina Brooks explains that the most important point is receptionist, while patient form is usually the detail people forget. The cost or reference given in the notice is £45, and everyone should bring a safety briefing. The final recommendation is to review symptoms before leaving, because this helps avoid common mistakes.", "questions": ["The session takes place on <input data-answer='Sunday'>.", "Participants should arrive at <input data-answer='2:30'>.", "The meeting point is <input data-answer='Studio 3'>.", "The speaker is <input data-answer='Nina Brooks'>.", "Everyone should bring a <input data-answer='safety briefing'>."]}, {"id": "4-5-22", "level": "4-5", "number": 22, "title": "History walking tour · Lesson 22", "type": "Form completion", "instruction": "Complete the form using no more than two words and/or a number.", "transcript": "The speaker gives clear basic information about history walking tour. The main session takes place on Monday at 4:15, and participants should meet at Lab 4. James Miller explains that the most important point is halls, while shared flats is usually the detail people forget. The cost or reference given in the notice is £60, and everyone should bring a online account. The final recommendation is to review host families before leaving, because this helps avoid common mistakes.", "questions": ["Name: <input data-answer='James Miller'>.", "Day: <input data-answer='Monday'>.", "Time: <input data-answer='4:15'>.", "Location: <input data-answer='Lab 4'>.", "Document/item required: <input data-answer='online account'>."]}, {"id": "4-5-23", "level": "4-5", "number": 23, "title": "Fitness class information · Lesson 23", "type": "Table completion", "instruction": "Complete the table using no more than two words and/or a number.", "transcript": "The speaker gives clear basic information about fitness class information. The main session takes place on Tuesday at 6:40, and participants should meet at the visitor centre. Sofia Bennett explains that the most important point is urban trees, while heat islands is usually the detail people forget. The cost or reference given in the notice is £75, and everyone should bring a printed map. The final recommendation is to review pollution before leaving, because this helps avoid common mistakes.", "questions": ["Date/day: <input data-answer='Tuesday'>.", "Start time: <input data-answer='6:40'>.", "Meeting place: <input data-answer='the visitor centre'>.", "Person in charge: <input data-answer='Sofia Bennett'>.", "Item to bring: <input data-answer='printed map'>."]}, {"id": "4-5-24", "level": "4-5", "number": 24, "title": "Customer support call · Lesson 24", "type": "Matching", "instruction": "Complete the sentences using no more than two words.", "transcript": "The speaker gives clear basic information about customer support call. The main session takes place on Wednesday at 7:10, and participants should meet at the seminar room. Ahmed Khan explains that the most important point is breakfast room, while gym is usually the detail people forget. The cost or reference given in the notice is £90, and everyone should bring a practice booklet. The final recommendation is to review swimming pool before leaving, because this helps avoid common mistakes.", "questionTitle": "Categories: A main session · B meeting point · C speaker · D required item · E cost/reference", "questions": ["Wednesday: <input data-answer='A'>.", "the seminar room: <input data-answer='B'>.", "Ahmed Khan: <input data-answer='C'>.", "practice booklet: <input data-answer='D'>.", "£90: <input data-answer='E'>."]}, {"id": "4-5-25", "level": "4-5", "number": 25, "title": "Cooking course · Lesson 25", "type": "Multiple choice", "instruction": "Complete the sentences using no more than two words.", "transcript": "The speaker gives clear basic information about cooking course. The main session takes place on Thursday at 8:30, and participants should meet at Room 12. Emma Carter explains that the most important point is students, while librarian is usually the detail people forget. The cost or reference given in the notice is £12, and everyone should bring a feedback form. The final recommendation is to review quiet study rooms before leaving, because this helps avoid common mistakes.", "mcq": [{"q": "When does the main session take place?", "options": ["Sunday", "Wednesday", "Thursday"], "answer": 2}, {"q": "Where should participants meet?", "options": ["Room 12", "the cafeteria", "the car park"], "answer": 0}, {"q": "Who gives the explanation?", "options": ["Emma Carter", "the receptionist", "a visitor"], "answer": 0}, {"q": "What should people bring?", "options": ["a laptop charger", "a lunch box", "feedback form"], "answer": 2}, {"q": "What should be reviewed before leaving?", "options": ["the weather", "quiet study rooms", "the building colour"], "answer": 1}]}, {"id": "4-5-26", "level": "4-5", "number": 26, "title": "Career fair announcement · Lesson 26", "type": "Short answer", "instruction": "Answer the questions using no more than three words and/or a number.", "transcript": "The speaker gives clear basic information about career fair announcement. The main session takes place on Friday at 9:15, and participants should meet at Hall B. Daniel Lewis explains that the most important point is visitors, while cloakroom is usually the detail people forget. The cost or reference given in the notice is £18, and everyone should bring a confirmation email. The final recommendation is to review exhibition rooms before leaving, because this helps avoid common mistakes.", "questions": ["What day is the session? <input data-answer='Friday'>.", "What time does it begin? <input data-answer='9:15'>.", "Where do participants meet? <input data-answer='Hall B'>.", "Who explains the information? <input data-answer='Daniel Lewis'>.", "What item should people bring? <input data-answer='confirmation email'>."]}, {"id": "4-5-27", "level": "4-5", "number": 27, "title": "Housing inspection · Lesson 27", "type": "Note completion", "instruction": "Complete the sentences using no more than two words.", "transcript": "The speaker gives clear basic information about housing inspection. The main session takes place on Saturday at 10:45, and participants should meet at the main desk. Priya Shah explains that the most important point is commuters, while platform changes is usually the detail people forget. The cost or reference given in the notice is £24, and everyone should bring a student card. The final recommendation is to review ticket machines before leaving, because this helps avoid common mistakes.", "questions": ["The session takes place on <input data-answer='Saturday'>.", "Participants should arrive at <input data-answer='10:45'>.", "The meeting point is <input data-answer='the main desk'>.", "The speaker is <input data-answer='Priya Shah'>.", "Everyone should bring a <input data-answer='student card'>."]}, {"id": "4-5-28", "level": "4-5", "number": 28, "title": "Conference schedule · Lesson 28", "type": "Plan labelling", "instruction": "Label the plan using no more than three words and/or a number.", "transcript": "The speaker gives clear basic information about conference schedule. The main session takes place on Sunday at 11:20, and participants should meet at the north entrance. Oliver Grant explains that the most important point is residents, while compost is usually the detail people forget. The cost or reference given in the notice is £35, and everyone should bring a reference number. The final recommendation is to review watering rota before leaving, because this helps avoid common mistakes.", "questions": ["Entrance area: <input data-answer='the north entrance'>.", "Information desk contact: <input data-answer='Oliver Grant'>.", "Main time marker: <input data-answer='11:20'>.", "Required item: <input data-answer='reference number'>.", "Review point: <input data-answer='watering rota'>."]}, {"id": "4-5-29", "level": "4-5", "number": 29, "title": "Travel insurance enquiry · Lesson 29", "type": "Classification", "instruction": "Complete the sentences using no more than two words.", "transcript": "The speaker gives clear basic information about travel insurance enquiry. The main session takes place on Monday at 2:30, and participants should meet at Studio 3. Nina Brooks explains that the most important point is receptionist, while patient form is usually the detail people forget. The cost or reference given in the notice is £45, and everyone should bring a safety briefing. The final recommendation is to review symptoms before leaving, because this helps avoid common mistakes.", "questionTitle": "A main issue · B forgotten detail · C final review · D required item · E cost/reference", "questions": ["receptionist: <input data-answer='A'>.", "patient form: <input data-answer='B'>.", "symptoms: <input data-answer='C'>.", "safety briefing: <input data-answer='D'>.", "£45: <input data-answer='E'>."]}, {"id": "4-5-30", "level": "4-5", "number": 30, "title": "Science exhibition · Lesson 30", "type": "Summary completion", "instruction": "Complete the sentences using no more than two words.", "transcript": "The speaker gives clear basic information about science exhibition. The main session takes place on Tuesday at 4:15, and participants should meet at Lab 4. James Miller explains that the most important point is halls, while shared flats is usually the detail people forget. The cost or reference given in the notice is £60, and everyone should bring a online account. The final recommendation is to review host families before leaving, because this helps avoid common mistakes.", "questions": ["The session takes place on <input data-answer='Tuesday'>.", "Participants should arrive at <input data-answer='4:15'>.", "The meeting point is <input data-answer='Lab 4'>.", "The speaker is <input data-answer='James Miller'>.", "Everyone should bring a <input data-answer='online account'>."]}, {"id": "4-5-31", "level": "4-5", "number": 31, "title": "Bank account application · Lesson 31", "type": "Sentence completion", "instruction": "Complete the sentences using no more than two words.", "transcript": "The speaker gives clear basic information about bank account application. The main session takes place on Wednesday at 6:40, and participants should meet at the visitor centre. Sofia Bennett explains that the most important point is urban trees, while heat islands is usually the detail people forget. The cost or reference given in the notice is £75, and everyone should bring a printed map. The final recommendation is to review pollution before leaving, because this helps avoid common mistakes.", "questions": ["The session takes place on <input data-answer='Wednesday'>.", "Participants should arrive at <input data-answer='6:40'>.", "The meeting point is <input data-answer='the visitor centre'>.", "The speaker is <input data-answer='Sofia Bennett'>.", "Everyone should bring a <input data-answer='printed map'>."]}, {"id": "4-5-32", "level": "4-5", "number": 32, "title": "Restaurant booking · Lesson 32", "type": "Form completion", "instruction": "Complete the form using no more than two words and/or a number.", "transcript": "The speaker gives clear basic information about restaurant booking. The main session takes place on Thursday at 7:10, and participants should meet at the seminar room. Ahmed Khan explains that the most important point is breakfast room, while gym is usually the detail people forget. The cost or reference given in the notice is £90, and everyone should bring a practice booklet. The final recommendation is to review swimming pool before leaving, because this helps avoid common mistakes.", "questions": ["Name: <input data-answer='Ahmed Khan'>.", "Day: <input data-answer='Thursday'>.", "Time: <input data-answer='7:10'>.", "Location: <input data-answer='the seminar room'>.", "Document/item required: <input data-answer='practice booklet'>."]}, {"id": "4-5-33", "level": "4-5", "number": 33, "title": "Recycling centre tour · Lesson 33", "type": "Table completion", "instruction": "Complete the table using no more than two words and/or a number.", "transcript": "The speaker gives clear basic information about recycling centre tour. The main session takes place on Friday at 8:30, and participants should meet at Room 12. Emma Carter explains that the most important point is students, while librarian is usually the detail people forget. The cost or reference given in the notice is £12, and everyone should bring a feedback form. The final recommendation is to review quiet study rooms before leaving, because this helps avoid common mistakes.", "questions": ["Date/day: <input data-answer='Friday'>.", "Start time: <input data-answer='8:30'>.", "Meeting place: <input data-answer='Room 12'>.", "Person in charge: <input data-answer='Emma Carter'>.", "Item to bring: <input data-answer='feedback form'>."]}, {"id": "4-5-34", "level": "4-5", "number": 34, "title": "Theatre visit · Lesson 34", "type": "Matching", "instruction": "Complete the sentences using no more than two words.", "transcript": "The speaker gives clear basic information about theatre visit. The main session takes place on Saturday at 9:15, and participants should meet at Hall B. Daniel Lewis explains that the most important point is visitors, while cloakroom is usually the detail people forget. The cost or reference given in the notice is £18, and everyone should bring a confirmation email. The final recommendation is to review exhibition rooms before leaving, because this helps avoid common mistakes.", "questionTitle": "Categories: A main session · B meeting point · C speaker · D required item · E cost/reference", "questions": ["Saturday: <input data-answer='A'>.", "Hall B: <input data-answer='B'>.", "Daniel Lewis: <input data-answer='C'>.", "confirmation email: <input data-answer='D'>.", "£18: <input data-answer='E'>."]}, {"id": "4-5-35", "level": "4-5", "number": 35, "title": "Photography club · Lesson 35", "type": "Multiple choice", "instruction": "Complete the sentences using no more than two words.", "transcript": "The speaker gives clear basic information about photography club. The main session takes place on Sunday at 10:45, and participants should meet at the main desk. Priya Shah explains that the most important point is commuters, while platform changes is usually the detail people forget. The cost or reference given in the notice is £24, and everyone should bring a student card. The final recommendation is to review ticket machines before leaving, because this helps avoid common mistakes.", "mcq": [{"q": "When does the main session take place?", "options": ["Sunday", "Wednesday", "Sunday"], "answer": 0}, {"q": "Where should participants meet?", "options": ["the main desk", "the cafeteria", "the car park"], "answer": 0}, {"q": "Who gives the explanation?", "options": ["a visitor", "the receptionist", "Priya Shah"], "answer": 2}, {"q": "What should people bring?", "options": ["student card", "a lunch box", "a laptop charger"], "answer": 0}, {"q": "What should be reviewed before leaving?", "options": ["ticket machines", "the building colour", "the weather"], "answer": 0}]}, {"id": "4-5-36", "level": "4-5", "number": 36, "title": "Public lecture on nutrition · Lesson 36", "type": "Short answer", "instruction": "Answer the questions using no more than three words and/or a number.", "transcript": "The speaker gives clear basic information about public lecture on nutrition. The main session takes place on Monday at 11:20, and participants should meet at the north entrance. Oliver Grant explains that the most important point is residents, while compost is usually the detail people forget. The cost or reference given in the notice is £35, and everyone should bring a reference number. The final recommendation is to review watering rota before leaving, because this helps avoid common mistakes.", "questions": ["What day is the session? <input data-answer='Monday'>.", "What time does it begin? <input data-answer='11:20'>.", "Where do participants meet? <input data-answer='the north entrance'>.", "Who explains the information? <input data-answer='Oliver Grant'>.", "What item should people bring? <input data-answer='reference number'>."]}, {"id": "4-5-37", "level": "4-5", "number": 37, "title": "Job training session · Lesson 37", "type": "Note completion", "instruction": "Complete the sentences using no more than two words.", "transcript": "The speaker gives clear basic information about job training session. The main session takes place on Tuesday at 2:30, and participants should meet at Studio 3. Nina Brooks explains that the most important point is receptionist, while patient form is usually the detail people forget. The cost or reference given in the notice is £45, and everyone should bring a safety briefing. The final recommendation is to review symptoms before leaving, because this helps avoid common mistakes.", "questions": ["The session takes place on <input data-answer='Tuesday'>.", "Participants should arrive at <input data-answer='2:30'>.", "The meeting point is <input data-answer='Studio 3'>.", "The speaker is <input data-answer='Nina Brooks'>.", "Everyone should bring a <input data-answer='safety briefing'>."]}, {"id": "4-5-38", "level": "4-5", "number": 38, "title": "Neighbourhood safety meeting · Lesson 38", "type": "Plan labelling", "instruction": "Label the plan using no more than three words and/or a number.", "transcript": "The speaker gives clear basic information about neighbourhood safety meeting. The main session takes place on Wednesday at 4:15, and participants should meet at Lab 4. James Miller explains that the most important point is halls, while shared flats is usually the detail people forget. The cost or reference given in the notice is £60, and everyone should bring a online account. The final recommendation is to review host families before leaving, because this helps avoid common mistakes.", "questions": ["Entrance area: <input data-answer='Lab 4'>.", "Information desk contact: <input data-answer='James Miller'>.", "Main time marker: <input data-answer='4:15'>.", "Required item: <input data-answer='online account'>.", "Review point: <input data-answer='host families'>."]}, {"id": "4-5-39", "level": "4-5", "number": 39, "title": "Music festival planning · Lesson 39", "type": "Classification", "instruction": "Complete the sentences using no more than two words.", "transcript": "The speaker gives clear basic information about music festival planning. The main session takes place on Thursday at 6:40, and participants should meet at the visitor centre. Sofia Bennett explains that the most important point is urban trees, while heat islands is usually the detail people forget. The cost or reference given in the notice is £75, and everyone should bring a printed map. The final recommendation is to review pollution before leaving, because this helps avoid common mistakes.", "questionTitle": "A main issue · B forgotten detail · C final review · D required item · E cost/reference", "questions": ["urban trees: <input data-answer='A'>.", "heat islands: <input data-answer='B'>.", "pollution: <input data-answer='C'>.", "printed map: <input data-answer='D'>.", "£75: <input data-answer='E'>."]}, {"id": "4-5-40", "level": "4-5", "number": 40, "title": "Dentist appointment · Lesson 40", "type": "Summary completion", "instruction": "Complete the sentences using no more than two words.", "transcript": "The speaker gives clear basic information about dentist appointment. The main session takes place on Friday at 7:10, and participants should meet at the seminar room. Ahmed Khan explains that the most important point is breakfast room, while gym is usually the detail people forget. The cost or reference given in the notice is £90, and everyone should bring a practice booklet. The final recommendation is to review swimming pool before leaving, because this helps avoid common mistakes.", "questions": ["The session takes place on <input data-answer='Friday'>.", "Participants should arrive at <input data-answer='7:10'>.", "The meeting point is <input data-answer='the seminar room'>.", "The speaker is <input data-answer='Ahmed Khan'>.", "Everyone should bring a <input data-answer='practice booklet'>."]}, {"id": "4-5-41", "level": "4-5", "number": 41, "title": "Study abroad talk · Lesson 41", "type": "Sentence completion", "instruction": "Complete the sentences using no more than two words.", "transcript": "The speaker gives clear basic information about study abroad talk. The main session takes place on Saturday at 8:30, and participants should meet at Room 12. Emma Carter explains that the most important point is students, while librarian is usually the detail people forget. The cost or reference given in the notice is £12, and everyone should bring a feedback form. The final recommendation is to review quiet study rooms before leaving, because this helps avoid common mistakes.", "questions": ["The session takes place on <input data-answer='Saturday'>.", "Participants should arrive at <input data-answer='8:30'>.", "The meeting point is <input data-answer='Room 12'>.", "The speaker is <input data-answer='Emma Carter'>.", "Everyone should bring a <input data-answer='feedback form'>."]}, {"id": "4-5-42", "level": "4-5", "number": 42, "title": "Weather warning · Lesson 42", "type": "Form completion", "instruction": "Complete the form using no more than two words and/or a number.", "transcript": "The speaker gives clear basic information about weather warning. The main session takes place on Sunday at 9:15, and participants should meet at Hall B. Daniel Lewis explains that the most important point is visitors, while cloakroom is usually the detail people forget. The cost or reference given in the notice is £18, and everyone should bring a confirmation email. The final recommendation is to review exhibition rooms before leaving, because this helps avoid common mistakes.", "questions": ["Name: <input data-answer='Daniel Lewis'>.", "Day: <input data-answer='Sunday'>.", "Time: <input data-answer='9:15'>.", "Location: <input data-answer='Hall B'>.", "Document/item required: <input data-answer='confirmation email'>."]}, {"id": "4-5-43", "level": "4-5", "number": 43, "title": "Business start-up advice · Lesson 43", "type": "Table completion", "instruction": "Complete the table using no more than two words and/or a number.", "transcript": "The speaker gives clear basic information about business start-up advice. The main session takes place on Monday at 10:45, and participants should meet at the main desk. Priya Shah explains that the most important point is commuters, while platform changes is usually the detail people forget. The cost or reference given in the notice is £24, and everyone should bring a student card. The final recommendation is to review ticket machines before leaving, because this helps avoid common mistakes.", "questions": ["Date/day: <input data-answer='Monday'>.", "Start time: <input data-answer='10:45'>.", "Meeting place: <input data-answer='the main desk'>.", "Person in charge: <input data-answer='Priya Shah'>.", "Item to bring: <input data-answer='student card'>."]}, {"id": "4-5-44", "level": "4-5", "number": 44, "title": "University lab safety · Lesson 44", "type": "Matching", "instruction": "Complete the sentences using no more than two words.", "transcript": "The speaker gives clear basic information about university lab safety. The main session takes place on Tuesday at 11:20, and participants should meet at the north entrance. Oliver Grant explains that the most important point is residents, while compost is usually the detail people forget. The cost or reference given in the notice is £35, and everyone should bring a reference number. The final recommendation is to review watering rota before leaving, because this helps avoid common mistakes.", "questionTitle": "Categories: A main session · B meeting point · C speaker · D required item · E cost/reference", "questions": ["Tuesday: <input data-answer='A'>.", "the north entrance: <input data-answer='B'>.", "Oliver Grant: <input data-answer='C'>.", "reference number: <input data-answer='D'>.", "£35: <input data-answer='E'>."]}, {"id": "4-5-45", "level": "4-5", "number": 45, "title": "Apartment viewing · Lesson 45", "type": "Multiple choice", "instruction": "Complete the sentences using no more than two words.", "transcript": "The speaker gives clear basic information about apartment viewing. The main session takes place on Wednesday at 2:30, and participants should meet at Studio 3. Nina Brooks explains that the most important point is receptionist, while patient form is usually the detail people forget. The cost or reference given in the notice is £45, and everyone should bring a safety briefing. The final recommendation is to review symptoms before leaving, because this helps avoid common mistakes.", "mcq": [{"q": "When does the main session take place?", "options": ["Sunday", "Wednesday", "Wednesday"], "answer": 1}, {"q": "Where should participants meet?", "options": ["Studio 3", "the car park", "the cafeteria"], "answer": 0}, {"q": "Who gives the explanation?", "options": ["a visitor", "Nina Brooks", "the receptionist"], "answer": 1}, {"q": "What should people bring?", "options": ["a laptop charger", "a lunch box", "safety briefing"], "answer": 2}, {"q": "What should be reviewed before leaving?", "options": ["the building colour", "symptoms", "the weather"], "answer": 1}]}, {"id": "4-5-46", "level": "4-5", "number": 46, "title": "Charity fundraising · Lesson 46", "type": "Short answer", "instruction": "Answer the questions using no more than three words and/or a number.", "transcript": "The speaker gives clear basic information about charity fundraising. The main session takes place on Thursday at 4:15, and participants should meet at Lab 4. James Miller explains that the most important point is halls, while shared flats is usually the detail people forget. The cost or reference given in the notice is £60, and everyone should bring a online account. The final recommendation is to review host families before leaving, because this helps avoid common mistakes.", "questions": ["What day is the session? <input data-answer='Thursday'>.", "What time does it begin? <input data-answer='4:15'>.", "Where do participants meet? <input data-answer='Lab 4'>.", "Who explains the information? <input data-answer='James Miller'>.", "What item should people bring? <input data-answer='online account'>."]}, {"id": "4-5-47", "level": "4-5", "number": 47, "title": "Dentist hygiene lecture · Lesson 47", "type": "Note completion", "instruction": "Complete the sentences using no more than two words.", "transcript": "The speaker gives clear basic information about dentist hygiene lecture. The main session takes place on Friday at 6:40, and participants should meet at the visitor centre. Sofia Bennett explains that the most important point is urban trees, while heat islands is usually the detail people forget. The cost or reference given in the notice is £75, and everyone should bring a printed map. The final recommendation is to review pollution before leaving, because this helps avoid common mistakes.", "questions": ["The session takes place on <input data-answer='Friday'>.", "Participants should arrive at <input data-answer='6:40'>.", "The meeting point is <input data-answer='the visitor centre'>.", "The speaker is <input data-answer='Sofia Bennett'>.", "Everyone should bring a <input data-answer='printed map'>."]}, {"id": "4-5-48", "level": "4-5", "number": 48, "title": "Farmers market · Lesson 48", "type": "Plan labelling", "instruction": "Label the plan using no more than three words and/or a number.", "transcript": "The speaker gives clear basic information about farmers market. The main session takes place on Saturday at 7:10, and participants should meet at the seminar room. Ahmed Khan explains that the most important point is breakfast room, while gym is usually the detail people forget. The cost or reference given in the notice is £90, and everyone should bring a practice booklet. The final recommendation is to review swimming pool before leaving, because this helps avoid common mistakes.", "questions": ["Entrance area: <input data-answer='the seminar room'>.", "Information desk contact: <input data-answer='Ahmed Khan'>.", "Main time marker: <input data-answer='7:10'>.", "Required item: <input data-answer='practice booklet'>.", "Review point: <input data-answer='swimming pool'>."]}, {"id": "4-5-49", "level": "4-5", "number": 49, "title": "Mobile app tutorial · Lesson 49", "type": "Classification", "instruction": "Complete the sentences using no more than two words.", "transcript": "The speaker gives clear basic information about mobile app tutorial. The main session takes place on Sunday at 8:30, and participants should meet at Room 12. Emma Carter explains that the most important point is students, while librarian is usually the detail people forget. The cost or reference given in the notice is £12, and everyone should bring a feedback form. The final recommendation is to review quiet study rooms before leaving, because this helps avoid common mistakes.", "questionTitle": "A main issue · B forgotten detail · C final review · D required item · E cost/reference", "questions": ["students: <input data-answer='A'>.", "librarian: <input data-answer='B'>.", "quiet study rooms: <input data-answer='C'>.", "feedback form: <input data-answer='D'>.", "£12: <input data-answer='E'>."]}, {"id": "4-5-50", "level": "4-5", "number": 50, "title": "Public park consultation · Lesson 50", "type": "Summary completion", "instruction": "Complete the sentences using no more than two words.", "transcript": "The speaker gives clear basic information about public park consultation. The main session takes place on Monday at 9:15, and participants should meet at Hall B. Daniel Lewis explains that the most important point is visitors, while cloakroom is usually the detail people forget. The cost or reference given in the notice is £18, and everyone should bring a confirmation email. The final recommendation is to review exhibition rooms before leaving, because this helps avoid common mistakes.", "questions": ["The session takes place on <input data-answer='Monday'>.", "Participants should arrive at <input data-answer='9:15'>.", "The meeting point is <input data-answer='Hall B'>.", "The speaker is <input data-answer='Daniel Lewis'>.", "Everyone should bring a <input data-answer='confirmation email'>."]}, {"id": "4-5-51", "level": "4-5", "number": 51, "title": "Wildlife conservation talk · Lesson 51", "type": "Sentence completion", "instruction": "Complete the sentences using no more than two words.", "transcript": "The speaker gives clear basic information about wildlife conservation talk. The main session takes place on Tuesday at 10:45, and participants should meet at the main desk. Priya Shah explains that the most important point is commuters, while platform changes is usually the detail people forget. The cost or reference given in the notice is £24, and everyone should bring a student card. The final recommendation is to review ticket machines before leaving, because this helps avoid common mistakes.", "questions": ["The session takes place on <input data-answer='Tuesday'>.", "Participants should arrive at <input data-answer='10:45'>.", "The meeting point is <input data-answer='the main desk'>.", "The speaker is <input data-answer='Priya Shah'>.", "Everyone should bring a <input data-answer='student card'>."]}, {"id": "4-5-52", "level": "4-5", "number": 52, "title": "Drama class · Lesson 52", "type": "Form completion", "instruction": "Complete the form using no more than two words and/or a number.", "transcript": "The speaker gives clear basic information about drama class. The main session takes place on Wednesday at 11:20, and participants should meet at the north entrance. Oliver Grant explains that the most important point is residents, while compost is usually the detail people forget. The cost or reference given in the notice is £35, and everyone should bring a reference number. The final recommendation is to review watering rota before leaving, because this helps avoid common mistakes.", "questions": ["Name: <input data-answer='Oliver Grant'>.", "Day: <input data-answer='Wednesday'>.", "Time: <input data-answer='11:20'>.", "Location: <input data-answer='the north entrance'>.", "Document/item required: <input data-answer='reference number'>."]}, {"id": "4-5-53", "level": "4-5", "number": 53, "title": "Train station renovation · Lesson 53", "type": "Table completion", "instruction": "Complete the table using no more than two words and/or a number.", "transcript": "The speaker gives clear basic information about train station renovation. The main session takes place on Thursday at 2:30, and participants should meet at Studio 3. Nina Brooks explains that the most important point is receptionist, while patient form is usually the detail people forget. The cost or reference given in the notice is £45, and everyone should bring a safety briefing. The final recommendation is to review symptoms before leaving, because this helps avoid common mistakes.", "questions": ["Date/day: <input data-answer='Thursday'>.", "Start time: <input data-answer='2:30'>.", "Meeting place: <input data-answer='Studio 3'>.", "Person in charge: <input data-answer='Nina Brooks'>.", "Item to bring: <input data-answer='safety briefing'>."]}, {"id": "4-5-54", "level": "4-5", "number": 54, "title": "Small business podcast · Lesson 54", "type": "Matching", "instruction": "Complete the sentences using no more than two words.", "transcript": "The speaker gives clear basic information about small business podcast. The main session takes place on Friday at 4:15, and participants should meet at Lab 4. James Miller explains that the most important point is halls, while shared flats is usually the detail people forget. The cost or reference given in the notice is £60, and everyone should bring a online account. The final recommendation is to review host families before leaving, because this helps avoid common mistakes.", "questionTitle": "Categories: A main session · B meeting point · C speaker · D required item · E cost/reference", "questions": ["Friday: <input data-answer='A'>.", "Lab 4: <input data-answer='B'>.", "James Miller: <input data-answer='C'>.", "online account: <input data-answer='D'>.", "£60: <input data-answer='E'>."]}, {"id": "4-5-55", "level": "4-5", "number": 55, "title": "Emergency first aid course · Lesson 55", "type": "Multiple choice", "instruction": "Complete the sentences using no more than two words.", "transcript": "The speaker gives clear basic information about emergency first aid course. The main session takes place on Saturday at 6:40, and participants should meet at the visitor centre. Sofia Bennett explains that the most important point is urban trees, while heat islands is usually the detail people forget. The cost or reference given in the notice is £75, and everyone should bring a printed map. The final recommendation is to review pollution before leaving, because this helps avoid common mistakes.", "mcq": [{"q": "When does the main session take place?", "options": ["Saturday", "Sunday", "Wednesday"], "answer": 0}, {"q": "Where should participants meet?", "options": ["the car park", "the visitor centre", "the cafeteria"], "answer": 1}, {"q": "Who gives the explanation?", "options": ["a visitor", "the receptionist", "Sofia Bennett"], "answer": 2}, {"q": "What should people bring?", "options": ["printed map", "a laptop charger", "a lunch box"], "answer": 0}, {"q": "What should be reviewed before leaving?", "options": ["the weather", "the building colour", "pollution"], "answer": 2}]}, {"id": "4-5-56", "level": "4-5", "number": 56, "title": "City art gallery · Lesson 56", "type": "Short answer", "instruction": "Answer the questions using no more than three words and/or a number.", "transcript": "The speaker gives clear basic information about city art gallery. The main session takes place on Sunday at 7:10, and participants should meet at the seminar room. Ahmed Khan explains that the most important point is breakfast room, while gym is usually the detail people forget. The cost or reference given in the notice is £90, and everyone should bring a practice booklet. The final recommendation is to review swimming pool before leaving, because this helps avoid common mistakes.", "questions": ["What day is the session? <input data-answer='Sunday'>.", "What time does it begin? <input data-answer='7:10'>.", "Where do participants meet? <input data-answer='the seminar room'>.", "Who explains the information? <input data-answer='Ahmed Khan'>.", "What item should people bring? <input data-answer='practice booklet'>."]}, {"id": "4-5-57", "level": "4-5", "number": 57, "title": "University counselling service · Lesson 57", "type": "Note completion", "instruction": "Complete the sentences using no more than two words.", "transcript": "The speaker gives clear basic information about university counselling service. The main session takes place on Monday at 8:30, and participants should meet at Room 12. Emma Carter explains that the most important point is students, while librarian is usually the detail people forget. The cost or reference given in the notice is £12, and everyone should bring a feedback form. The final recommendation is to review quiet study rooms before leaving, because this helps avoid common mistakes.", "questions": ["The session takes place on <input data-answer='Monday'>.", "Participants should arrive at <input data-answer='8:30'>.", "The meeting point is <input data-answer='Room 12'>.", "The speaker is <input data-answer='Emma Carter'>.", "Everyone should bring a <input data-answer='feedback form'>."]}, {"id": "4-5-58", "level": "4-5", "number": 58, "title": "Cycling safety talk · Lesson 58", "type": "Plan labelling", "instruction": "Label the plan using no more than three words and/or a number.", "transcript": "The speaker gives clear basic information about cycling safety talk. The main session takes place on Tuesday at 9:15, and participants should meet at Hall B. Daniel Lewis explains that the most important point is visitors, while cloakroom is usually the detail people forget. The cost or reference given in the notice is £18, and everyone should bring a confirmation email. The final recommendation is to review exhibition rooms before leaving, because this helps avoid common mistakes.", "questions": ["Entrance area: <input data-answer='Hall B'>.", "Information desk contact: <input data-answer='Daniel Lewis'>.", "Main time marker: <input data-answer='9:15'>.", "Required item: <input data-answer='confirmation email'>.", "Review point: <input data-answer='exhibition rooms'>."]}, {"id": "4-5-59", "level": "4-5", "number": 59, "title": "Local history archive · Lesson 59", "type": "Classification", "instruction": "Complete the sentences using no more than two words.", "transcript": "The speaker gives clear basic information about local history archive. The main session takes place on Wednesday at 10:45, and participants should meet at the main desk. Priya Shah explains that the most important point is commuters, while platform changes is usually the detail people forget. The cost or reference given in the notice is £24, and everyone should bring a student card. The final recommendation is to review ticket machines before leaving, because this helps avoid common mistakes.", "questionTitle": "A main issue · B forgotten detail · C final review · D required item · E cost/reference", "questions": ["commuters: <input data-answer='A'>.", "platform changes: <input data-answer='B'>.", "ticket machines: <input data-answer='C'>.", "student card: <input data-answer='D'>.", "£24: <input data-answer='E'>."]}, {"id": "4-5-60", "level": "4-5", "number": 60, "title": "Cooking competition · Lesson 60", "type": "Summary completion", "instruction": "Complete the sentences using no more than two words.", "transcript": "The speaker gives clear basic information about cooking competition. The main session takes place on Thursday at 11:20, and participants should meet at the north entrance. Oliver Grant explains that the most important point is residents, while compost is usually the detail people forget. The cost or reference given in the notice is £35, and everyone should bring a reference number. The final recommendation is to review watering rota before leaving, because this helps avoid common mistakes.", "questions": ["The session takes place on <input data-answer='Thursday'>.", "Participants should arrive at <input data-answer='11:20'>.", "The meeting point is <input data-answer='the north entrance'>.", "The speaker is <input data-answer='Oliver Grant'>.", "Everyone should bring a <input data-answer='reference number'>."]}, {"id": "4-5-61", "level": "4-5", "number": 61, "title": "Nature reserve visit · Lesson 61", "type": "Sentence completion", "instruction": "Complete the sentences using no more than two words.", "transcript": "The speaker gives clear basic information about nature reserve visit. The main session takes place on Friday at 2:30, and participants should meet at Studio 3. Nina Brooks explains that the most important point is receptionist, while patient form is usually the detail people forget. The cost or reference given in the notice is £45, and everyone should bring a safety briefing. The final recommendation is to review symptoms before leaving, because this helps avoid common mistakes.", "questions": ["The session takes place on <input data-answer='Friday'>.", "Participants should arrive at <input data-answer='2:30'>.", "The meeting point is <input data-answer='Studio 3'>.", "The speaker is <input data-answer='Nina Brooks'>.", "Everyone should bring a <input data-answer='safety briefing'>."]}, {"id": "4-5-62", "level": "4-5", "number": 62, "title": "Podcast production class · Lesson 62", "type": "Form completion", "instruction": "Complete the form using no more than two words and/or a number.", "transcript": "The speaker gives clear basic information about podcast production class. The main session takes place on Saturday at 4:15, and participants should meet at Lab 4. James Miller explains that the most important point is halls, while shared flats is usually the detail people forget. The cost or reference given in the notice is £60, and everyone should bring a online account. The final recommendation is to review host families before leaving, because this helps avoid common mistakes.", "questions": ["Name: <input data-answer='James Miller'>.", "Day: <input data-answer='Saturday'>.", "Time: <input data-answer='4:15'>.", "Location: <input data-answer='Lab 4'>.", "Document/item required: <input data-answer='online account'>."]}, {"id": "4-5-63", "level": "4-5", "number": 63, "title": "Community theatre audition · Lesson 63", "type": "Table completion", "instruction": "Complete the table using no more than two words and/or a number.", "transcript": "The speaker gives clear basic information about community theatre audition. The main session takes place on Sunday at 6:40, and participants should meet at the visitor centre. Sofia Bennett explains that the most important point is urban trees, while heat islands is usually the detail people forget. The cost or reference given in the notice is £75, and everyone should bring a printed map. The final recommendation is to review pollution before leaving, because this helps avoid common mistakes.", "questions": ["Date/day: <input data-answer='Sunday'>.", "Start time: <input data-answer='6:40'>.", "Meeting place: <input data-answer='the visitor centre'>.", "Person in charge: <input data-answer='Sofia Bennett'>.", "Item to bring: <input data-answer='printed map'>."]}, {"id": "4-5-64", "level": "4-5", "number": 64, "title": "Online banking security · Lesson 64", "type": "Matching", "instruction": "Complete the sentences using no more than two words.", "transcript": "The speaker gives clear basic information about online banking security. The main session takes place on Monday at 7:10, and participants should meet at the seminar room. Ahmed Khan explains that the most important point is breakfast room, while gym is usually the detail people forget. The cost or reference given in the notice is £90, and everyone should bring a practice booklet. The final recommendation is to review swimming pool before leaving, because this helps avoid common mistakes.", "questionTitle": "Categories: A main session · B meeting point · C speaker · D required item · E cost/reference", "questions": ["Monday: <input data-answer='A'>.", "the seminar room: <input data-answer='B'>.", "Ahmed Khan: <input data-answer='C'>.", "practice booklet: <input data-answer='D'>.", "£90: <input data-answer='E'>."]}, {"id": "4-5-65", "level": "4-5", "number": 65, "title": "Road safety campaign · Lesson 65", "type": "Multiple choice", "instruction": "Complete the sentences using no more than two words.", "transcript": "The speaker gives clear basic information about road safety campaign. The main session takes place on Tuesday at 8:30, and participants should meet at Room 12. Emma Carter explains that the most important point is students, while librarian is usually the detail people forget. The cost or reference given in the notice is £12, and everyone should bring a feedback form. The final recommendation is to review quiet study rooms before leaving, because this helps avoid common mistakes.", "mcq": [{"q": "When does the main session take place?", "options": ["Tuesday", "Wednesday", "Sunday"], "answer": 0}, {"q": "Where should participants meet?", "options": ["Room 12", "the car park", "the cafeteria"], "answer": 0}, {"q": "Who gives the explanation?", "options": ["Emma Carter", "the receptionist", "a visitor"], "answer": 0}, {"q": "What should people bring?", "options": ["a laptop charger", "a lunch box", "feedback form"], "answer": 2}, {"q": "What should be reviewed before leaving?", "options": ["the building colour", "quiet study rooms", "the weather"], "answer": 1}]}, {"id": "4-5-66", "level": "4-5", "number": 66, "title": "Language school enrolment · Lesson 66", "type": "Short answer", "instruction": "Answer the questions using no more than three words and/or a number.", "transcript": "The speaker gives clear basic information about language school enrolment. The main session takes place on Wednesday at 9:15, and participants should meet at Hall B. Daniel Lewis explains that the most important point is visitors, while cloakroom is usually the detail people forget. The cost or reference given in the notice is £18, and everyone should bring a confirmation email. The final recommendation is to review exhibition rooms before leaving, because this helps avoid common mistakes.", "questions": ["What day is the session? <input data-answer='Wednesday'>.", "What time does it begin? <input data-answer='9:15'>.", "Where do participants meet? <input data-answer='Hall B'>.", "Who explains the information? <input data-answer='Daniel Lewis'>.", "What item should people bring? <input data-answer='confirmation email'>."]}, {"id": "4-5-67", "level": "4-5", "number": 67, "title": "Local swimming pool · Lesson 67", "type": "Note completion", "instruction": "Complete the sentences using no more than two words.", "transcript": "The speaker gives clear basic information about local swimming pool. The main session takes place on Thursday at 10:45, and participants should meet at the main desk. Priya Shah explains that the most important point is commuters, while platform changes is usually the detail people forget. The cost or reference given in the notice is £24, and everyone should bring a student card. The final recommendation is to review ticket machines before leaving, because this helps avoid common mistakes.", "questions": ["The session takes place on <input data-answer='Thursday'>.", "Participants should arrive at <input data-answer='10:45'>.", "The meeting point is <input data-answer='the main desk'>.", "The speaker is <input data-answer='Priya Shah'>.", "Everyone should bring a <input data-answer='student card'>."]}, {"id": "4-5-68", "level": "4-5", "number": 68, "title": "Library research skills · Lesson 68", "type": "Plan labelling", "instruction": "Label the plan using no more than three words and/or a number.", "transcript": "The speaker gives clear basic information about library research skills. The main session takes place on Friday at 11:20, and participants should meet at the north entrance. Oliver Grant explains that the most important point is residents, while compost is usually the detail people forget. The cost or reference given in the notice is £35, and everyone should bring a reference number. The final recommendation is to review watering rota before leaving, because this helps avoid common mistakes.", "questions": ["Entrance area: <input data-answer='the north entrance'>.", "Information desk contact: <input data-answer='Oliver Grant'>.", "Main time marker: <input data-answer='11:20'>.", "Required item: <input data-answer='reference number'>.", "Review point: <input data-answer='watering rota'>."]}, {"id": "4-5-69", "level": "4-5", "number": 69, "title": "Animal shelter volunteering · Lesson 69", "type": "Classification", "instruction": "Complete the sentences using no more than two words.", "transcript": "The speaker gives clear basic information about animal shelter volunteering. The main session takes place on Saturday at 2:30, and participants should meet at Studio 3. Nina Brooks explains that the most important point is receptionist, while patient form is usually the detail people forget. The cost or reference given in the notice is £45, and everyone should bring a safety briefing. The final recommendation is to review symptoms before leaving, because this helps avoid common mistakes.", "questionTitle": "A main issue · B forgotten detail · C final review · D required item · E cost/reference", "questions": ["receptionist: <input data-answer='A'>.", "patient form: <input data-answer='B'>.", "symptoms: <input data-answer='C'>.", "safety briefing: <input data-answer='D'>.", "£45: <input data-answer='E'>."]}, {"id": "4-5-70", "level": "4-5", "number": 70, "title": "City council recycling · Lesson 70", "type": "Summary completion", "instruction": "Complete the sentences using no more than two words.", "transcript": "The speaker gives clear basic information about city council recycling. The main session takes place on Sunday at 4:15, and participants should meet at Lab 4. James Miller explains that the most important point is halls, while shared flats is usually the detail people forget. The cost or reference given in the notice is £60, and everyone should bring a online account. The final recommendation is to review host families before leaving, because this helps avoid common mistakes.", "questions": ["The session takes place on <input data-answer='Sunday'>.", "Participants should arrive at <input data-answer='4:15'>.", "The meeting point is <input data-answer='Lab 4'>.", "The speaker is <input data-answer='James Miller'>.", "Everyone should bring a <input data-answer='online account'>."]}, {"id": "4-5-71", "level": "4-5", "number": 71, "title": "University sports team · Lesson 71", "type": "Sentence completion", "instruction": "Complete the sentences using no more than two words.", "transcript": "The speaker gives clear basic information about university sports team. The main session takes place on Monday at 6:40, and participants should meet at the visitor centre. Sofia Bennett explains that the most important point is urban trees, while heat islands is usually the detail people forget. The cost or reference given in the notice is £75, and everyone should bring a printed map. The final recommendation is to review pollution before leaving, because this helps avoid common mistakes.", "questions": ["The session takes place on <input data-answer='Monday'>.", "Participants should arrive at <input data-answer='6:40'>.", "The meeting point is <input data-answer='the visitor centre'>.", "The speaker is <input data-answer='Sofia Bennett'>.", "Everyone should bring a <input data-answer='printed map'>."]}, {"id": "4-5-72", "level": "4-5", "number": 72, "title": "Art history lecture · Lesson 72", "type": "Form completion", "instruction": "Complete the form using no more than two words and/or a number.", "transcript": "The speaker gives clear basic information about art history lecture. The main session takes place on Tuesday at 7:10, and participants should meet at the seminar room. Ahmed Khan explains that the most important point is breakfast room, while gym is usually the detail people forget. The cost or reference given in the notice is £90, and everyone should bring a practice booklet. The final recommendation is to review swimming pool before leaving, because this helps avoid common mistakes.", "questions": ["Name: <input data-answer='Ahmed Khan'>.", "Day: <input data-answer='Tuesday'>.", "Time: <input data-answer='7:10'>.", "Location: <input data-answer='the seminar room'>.", "Document/item required: <input data-answer='practice booklet'>."]}, {"id": "4-5-73", "level": "4-5", "number": 73, "title": "Medical research study · Lesson 73", "type": "Table completion", "instruction": "Complete the table using no more than two words and/or a number.", "transcript": "The speaker gives clear basic information about medical research study. The main session takes place on Wednesday at 8:30, and participants should meet at Room 12. Emma Carter explains that the most important point is students, while librarian is usually the detail people forget. The cost or reference given in the notice is £12, and everyone should bring a feedback form. The final recommendation is to review quiet study rooms before leaving, because this helps avoid common mistakes.", "questions": ["Date/day: <input data-answer='Wednesday'>.", "Start time: <input data-answer='8:30'>.", "Meeting place: <input data-answer='Room 12'>.", "Person in charge: <input data-answer='Emma Carter'>.", "Item to bring: <input data-answer='feedback form'>."]}, {"id": "4-5-74", "level": "4-5", "number": 74, "title": "Cafe staff training · Lesson 74", "type": "Matching", "instruction": "Complete the sentences using no more than two words.", "transcript": "The speaker gives clear basic information about cafe staff training. The main session takes place on Thursday at 9:15, and participants should meet at Hall B. Daniel Lewis explains that the most important point is visitors, while cloakroom is usually the detail people forget. The cost or reference given in the notice is £18, and everyone should bring a confirmation email. The final recommendation is to review exhibition rooms before leaving, because this helps avoid common mistakes.", "questionTitle": "Categories: A main session · B meeting point · C speaker · D required item · E cost/reference", "questions": ["Thursday: <input data-answer='A'>.", "Hall B: <input data-answer='B'>.", "Daniel Lewis: <input data-answer='C'>.", "confirmation email: <input data-answer='D'>.", "£18: <input data-answer='E'>."]}, {"id": "4-5-75", "level": "4-5", "number": 75, "title": "School open day · Lesson 75", "type": "Multiple choice", "instruction": "Complete the sentences using no more than two words.", "transcript": "The speaker gives clear basic information about school open day. The main session takes place on Friday at 10:45, and participants should meet at the main desk. Priya Shah explains that the most important point is commuters, while platform changes is usually the detail people forget. The cost or reference given in the notice is £24, and everyone should bring a student card. The final recommendation is to review ticket machines before leaving, because this helps avoid common mistakes.", "mcq": [{"q": "When does the main session take place?", "options": ["Friday", "Wednesday", "Sunday"], "answer": 0}, {"q": "Where should participants meet?", "options": ["the cafeteria", "the car park", "the main desk"], "answer": 2}, {"q": "Who gives the explanation?", "options": ["Priya Shah", "the receptionist", "a visitor"], "answer": 0}, {"q": "What should people bring?", "options": ["student card", "a laptop charger", "a lunch box"], "answer": 0}, {"q": "What should be reviewed before leaving?", "options": ["ticket machines", "the building colour", "the weather"], "answer": 0}]}, {"id": "4-5-76", "level": "4-5", "number": 76, "title": "Digital photography lecture · Lesson 76", "type": "Short answer", "instruction": "Answer the questions using no more than three words and/or a number.", "transcript": "The speaker gives clear basic information about digital photography lecture. The main session takes place on Saturday at 11:20, and participants should meet at the north entrance. Oliver Grant explains that the most important point is residents, while compost is usually the detail people forget. The cost or reference given in the notice is £35, and everyone should bring a reference number. The final recommendation is to review watering rota before leaving, because this helps avoid common mistakes.", "questions": ["What day is the session? <input data-answer='Saturday'>.", "What time does it begin? <input data-answer='11:20'>.", "Where do participants meet? <input data-answer='the north entrance'>.", "Who explains the information? <input data-answer='Oliver Grant'>.", "What item should people bring? <input data-answer='reference number'>."]}, {"id": "4-5-77", "level": "4-5", "number": 77, "title": "Local bus complaint · Lesson 77", "type": "Note completion", "instruction": "Complete the sentences using no more than two words.", "transcript": "The speaker gives clear basic information about local bus complaint. The main session takes place on Sunday at 2:30, and participants should meet at Studio 3. Nina Brooks explains that the most important point is receptionist, while patient form is usually the detail people forget. The cost or reference given in the notice is £45, and everyone should bring a safety briefing. The final recommendation is to review symptoms before leaving, because this helps avoid common mistakes.", "questions": ["The session takes place on <input data-answer='Sunday'>.", "Participants should arrive at <input data-answer='2:30'>.", "The meeting point is <input data-answer='Studio 3'>.", "The speaker is <input data-answer='Nina Brooks'>.", "Everyone should bring a <input data-answer='safety briefing'>."]}, {"id": "4-5-78", "level": "4-5", "number": 78, "title": "Work-life balance talk · Lesson 78", "type": "Plan labelling", "instruction": "Label the plan using no more than three words and/or a number.", "transcript": "The speaker gives clear basic information about work-life balance talk. The main session takes place on Monday at 4:15, and participants should meet at Lab 4. James Miller explains that the most important point is halls, while shared flats is usually the detail people forget. The cost or reference given in the notice is £60, and everyone should bring a online account. The final recommendation is to review host families before leaving, because this helps avoid common mistakes.", "questions": ["Entrance area: <input data-answer='Lab 4'>.", "Information desk contact: <input data-answer='James Miller'>.", "Main time marker: <input data-answer='4:15'>.", "Required item: <input data-answer='online account'>.", "Review point: <input data-answer='host families'>."]}, {"id": "4-5-79", "level": "4-5", "number": 79, "title": "Public speaking workshop · Lesson 79", "type": "Classification", "instruction": "Complete the sentences using no more than two words.", "transcript": "The speaker gives clear basic information about public speaking workshop. The main session takes place on Tuesday at 6:40, and participants should meet at the visitor centre. Sofia Bennett explains that the most important point is urban trees, while heat islands is usually the detail people forget. The cost or reference given in the notice is £75, and everyone should bring a printed map. The final recommendation is to review pollution before leaving, because this helps avoid common mistakes.", "questionTitle": "A main issue · B forgotten detail · C final review · D required item · E cost/reference", "questions": ["urban trees: <input data-answer='A'>.", "heat islands: <input data-answer='B'>.", "pollution: <input data-answer='C'>.", "printed map: <input data-answer='D'>.", "£75: <input data-answer='E'>."]}, {"id": "4-5-80", "level": "4-5", "number": 80, "title": "Gardening radio show · Lesson 80", "type": "Summary completion", "instruction": "Complete the sentences using no more than two words.", "transcript": "The speaker gives clear basic information about gardening radio show. The main session takes place on Wednesday at 7:10, and participants should meet at the seminar room. Ahmed Khan explains that the most important point is breakfast room, while gym is usually the detail people forget. The cost or reference given in the notice is £90, and everyone should bring a practice booklet. The final recommendation is to review swimming pool before leaving, because this helps avoid common mistakes.", "questions": ["The session takes place on <input data-answer='Wednesday'>.", "Participants should arrive at <input data-answer='7:10'>.", "The meeting point is <input data-answer='the seminar room'>.", "The speaker is <input data-answer='Ahmed Khan'>.", "Everyone should bring a <input data-answer='practice booklet'>."]}, {"id": "6-1", "level": "6", "number": 1, "title": "Campus library orientation · Lesson 1", "type": "Table completion", "instruction": "Complete the table using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to campus library orientation. The main session takes place on Monday at 8:30, and participants should meet at Room 12. Emma Carter explains that the most important point is students, while librarian is usually the detail people forget. The cost or reference given in the notice is £12, and everyone should bring a feedback form. The final recommendation is to review quiet study rooms before leaving, because this helps avoid common mistakes.", "questions": ["Date/day: <input data-answer='Monday'>.", "Start time: <input data-answer='8:30'>.", "Meeting place: <input data-answer='Room 12'>.", "Person in charge: <input data-answer='Emma Carter'>.", "Item to bring: <input data-answer='feedback form'>."]}, {"id": "6-2", "level": "6", "number": 2, "title": "Museum volunteer briefing · Lesson 2", "type": "Matching", "instruction": "Complete the notes using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to museum volunteer briefing. The main session takes place on Tuesday at 9:15, and participants should meet at Hall B. Daniel Lewis explains that the most important point is visitors, while cloakroom is usually the detail people forget. The cost or reference given in the notice is £18, and everyone should bring a confirmation email. The final recommendation is to review exhibition rooms before leaving, because this helps avoid common mistakes.", "questionTitle": "Categories: A main session · B meeting point · C speaker · D required item · E cost/reference", "questions": ["Tuesday: <input data-answer='A'>.", "Hall B: <input data-answer='B'>.", "Daniel Lewis: <input data-answer='C'>.", "confirmation email: <input data-answer='D'>.", "£18: <input data-answer='E'>."]}, {"id": "6-3", "level": "6", "number": 3, "title": "Urban transport update · Lesson 3", "type": "Multiple choice", "instruction": "Complete the notes using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to urban transport update. The main session takes place on Wednesday at 10:45, and participants should meet at the main desk. Priya Shah explains that the most important point is commuters, while platform changes is usually the detail people forget. The cost or reference given in the notice is £24, and everyone should bring a student card. The final recommendation is to review ticket machines before leaving, because this helps avoid common mistakes.", "mcq": [{"q": "When does the main session take place?", "options": ["Sunday", "Wednesday", "Wednesday"], "answer": 1}, {"q": "Where should participants meet?", "options": ["the cafeteria", "the main desk", "the car park"], "answer": 1}, {"q": "Who gives the explanation?", "options": ["Priya Shah", "a visitor", "the receptionist"], "answer": 0}, {"q": "What should people bring?", "options": ["a lunch box", "a laptop charger", "student card"], "answer": 2}, {"q": "What should be reviewed before leaving?", "options": ["the building colour", "ticket machines", "the weather"], "answer": 1}]}, {"id": "6-4", "level": "6", "number": 4, "title": "Community garden project · Lesson 4", "type": "Short answer", "instruction": "Answer the questions using no more than three words and/or a number.", "transcript": "The speaker explains practical details and compares options related to community garden project. The main session takes place on Thursday at 11:20, and participants should meet at the north entrance. Oliver Grant explains that the most important point is residents, while compost is usually the detail people forget. The cost or reference given in the notice is £35, and everyone should bring a reference number. The final recommendation is to review watering rota before leaving, because this helps avoid common mistakes.", "questions": ["What day is the session? <input data-answer='Thursday'>.", "What time does it begin? <input data-answer='11:20'>.", "Where do participants meet? <input data-answer='the north entrance'>.", "Who explains the information? <input data-answer='Oliver Grant'>.", "What item should people bring? <input data-answer='reference number'>."]}, {"id": "6-5", "level": "6", "number": 5, "title": "Health clinic appointment · Lesson 5", "type": "Note completion", "instruction": "Complete the notes using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to health clinic appointment. The main session takes place on Friday at 2:30, and participants should meet at Studio 3. Nina Brooks explains that the most important point is receptionist, while patient form is usually the detail people forget. The cost or reference given in the notice is £45, and everyone should bring a safety briefing. The final recommendation is to review symptoms before leaving, because this helps avoid common mistakes.", "questions": ["The session takes place on <input data-answer='Friday'>.", "Participants should arrive at <input data-answer='2:30'>.", "The meeting point is <input data-answer='Studio 3'>.", "The speaker is <input data-answer='Nina Brooks'>.", "Everyone should bring a <input data-answer='safety briefing'>."]}, {"id": "6-6", "level": "6", "number": 6, "title": "University accommodation · Lesson 6", "type": "Plan labelling", "instruction": "Label the plan using no more than three words and/or a number.", "transcript": "The speaker explains practical details and compares options related to university accommodation. The main session takes place on Saturday at 4:15, and participants should meet at Lab 4. James Miller explains that the most important point is halls, while shared flats is usually the detail people forget. The cost or reference given in the notice is £60, and everyone should bring a online account. The final recommendation is to review host families before leaving, because this helps avoid common mistakes.", "questions": ["Entrance area: <input data-answer='Lab 4'>.", "Information desk contact: <input data-answer='James Miller'>.", "Main time marker: <input data-answer='4:15'>.", "Required item: <input data-answer='online account'>.", "Review point: <input data-answer='host families'>."]}, {"id": "6-7", "level": "6", "number": 7, "title": "Environmental science lecture · Lesson 7", "type": "Classification", "instruction": "Complete the notes using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to environmental science lecture. The main session takes place on Sunday at 6:40, and participants should meet at the visitor centre. Sofia Bennett explains that the most important point is urban trees, while heat islands is usually the detail people forget. The cost or reference given in the notice is £75, and everyone should bring a printed map. The final recommendation is to review pollution before leaving, because this helps avoid common mistakes.", "questionTitle": "A main issue · B forgotten detail · C final review · D required item · E cost/reference", "questions": ["urban trees: <input data-answer='A'>.", "heat islands: <input data-answer='B'>.", "pollution: <input data-answer='C'>.", "printed map: <input data-answer='D'>.", "£75: <input data-answer='E'>."]}, {"id": "6-8", "level": "6", "number": 8, "title": "Hotel facilities tour · Lesson 8", "type": "Summary completion", "instruction": "Complete the notes using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to hotel facilities tour. The main session takes place on Monday at 7:10, and participants should meet at the seminar room. Ahmed Khan explains that the most important point is breakfast room, while gym is usually the detail people forget. The cost or reference given in the notice is £90, and everyone should bring a practice booklet. The final recommendation is to review swimming pool before leaving, because this helps avoid common mistakes.", "questions": ["The session takes place on <input data-answer='Monday'>.", "Participants should arrive at <input data-answer='7:10'>.", "The meeting point is <input data-answer='the seminar room'>.", "The speaker is <input data-answer='Ahmed Khan'>.", "Everyone should bring a <input data-answer='practice booklet'>."]}, {"id": "6-9", "level": "6", "number": 9, "title": "Language exchange meeting · Lesson 9", "type": "Sentence completion", "instruction": "Complete the notes using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to language exchange meeting. The main session takes place on Tuesday at 8:30, and participants should meet at Room 12. Emma Carter explains that the most important point is students, while librarian is usually the detail people forget. The cost or reference given in the notice is £12, and everyone should bring a feedback form. The final recommendation is to review quiet study rooms before leaving, because this helps avoid common mistakes.", "questions": ["The session takes place on <input data-answer='Tuesday'>.", "Participants should arrive at <input data-answer='8:30'>.", "The meeting point is <input data-answer='Room 12'>.", "The speaker is <input data-answer='Emma Carter'>.", "Everyone should bring a <input data-answer='feedback form'>."]}, {"id": "6-10", "level": "6", "number": 10, "title": "Technology repair desk · Lesson 10", "type": "Form completion", "instruction": "Complete the form using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to technology repair desk. The main session takes place on Wednesday at 9:15, and participants should meet at Hall B. Daniel Lewis explains that the most important point is visitors, while cloakroom is usually the detail people forget. The cost or reference given in the notice is £18, and everyone should bring a confirmation email. The final recommendation is to review exhibition rooms before leaving, because this helps avoid common mistakes.", "questions": ["Name: <input data-answer='Daniel Lewis'>.", "Day: <input data-answer='Wednesday'>.", "Time: <input data-answer='9:15'>.", "Location: <input data-answer='Hall B'>.", "Document/item required: <input data-answer='confirmation email'>."]}, {"id": "6-11", "level": "6", "number": 11, "title": "Workplace induction · Lesson 11", "type": "Table completion", "instruction": "Complete the table using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to workplace induction. The main session takes place on Thursday at 10:45, and participants should meet at the main desk. Priya Shah explains that the most important point is commuters, while platform changes is usually the detail people forget. The cost or reference given in the notice is £24, and everyone should bring a student card. The final recommendation is to review ticket machines before leaving, because this helps avoid common mistakes.", "questions": ["Date/day: <input data-answer='Thursday'>.", "Start time: <input data-answer='10:45'>.", "Meeting place: <input data-answer='the main desk'>.", "Person in charge: <input data-answer='Priya Shah'>.", "Item to bring: <input data-answer='student card'>."]}, {"id": "6-12", "level": "6", "number": 12, "title": "Book club discussion · Lesson 12", "type": "Matching", "instruction": "Complete the notes using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to book club discussion. The main session takes place on Friday at 11:20, and participants should meet at the north entrance. Oliver Grant explains that the most important point is residents, while compost is usually the detail people forget. The cost or reference given in the notice is £35, and everyone should bring a reference number. The final recommendation is to review watering rota before leaving, because this helps avoid common mistakes.", "questionTitle": "Categories: A main session · B meeting point · C speaker · D required item · E cost/reference", "questions": ["Friday: <input data-answer='A'>.", "the north entrance: <input data-answer='B'>.", "Oliver Grant: <input data-answer='C'>.", "reference number: <input data-answer='D'>.", "£35: <input data-answer='E'>."]}, {"id": "6-13", "level": "6", "number": 13, "title": "Airport boarding notice · Lesson 13", "type": "Multiple choice", "instruction": "Complete the notes using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to airport boarding notice. The main session takes place on Saturday at 2:30, and participants should meet at Studio 3. Nina Brooks explains that the most important point is receptionist, while patient form is usually the detail people forget. The cost or reference given in the notice is £45, and everyone should bring a safety briefing. The final recommendation is to review symptoms before leaving, because this helps avoid common mistakes.", "mcq": [{"q": "When does the main session take place?", "options": ["Wednesday", "Saturday", "Sunday"], "answer": 1}, {"q": "Where should participants meet?", "options": ["Studio 3", "the cafeteria", "the car park"], "answer": 0}, {"q": "Who gives the explanation?", "options": ["Nina Brooks", "a visitor", "the receptionist"], "answer": 0}, {"q": "What should people bring?", "options": ["a lunch box", "a laptop charger", "safety briefing"], "answer": 2}, {"q": "What should be reviewed before leaving?", "options": ["the weather", "the building colour", "symptoms"], "answer": 2}]}, {"id": "6-14", "level": "6", "number": 14, "title": "Online course guidance · Lesson 14", "type": "Short answer", "instruction": "Answer the questions using no more than three words and/or a number.", "transcript": "The speaker explains practical details and compares options related to online course guidance. The main session takes place on Sunday at 4:15, and participants should meet at Lab 4. James Miller explains that the most important point is halls, while shared flats is usually the detail people forget. The cost or reference given in the notice is £60, and everyone should bring a online account. The final recommendation is to review host families before leaving, because this helps avoid common mistakes.", "questions": ["What day is the session? <input data-answer='Sunday'>.", "What time does it begin? <input data-answer='4:15'>.", "Where do participants meet? <input data-answer='Lab 4'>.", "Who explains the information? <input data-answer='James Miller'>.", "What item should people bring? <input data-answer='online account'>."]}, {"id": "6-15", "level": "6", "number": 15, "title": "Sports centre launch · Lesson 15", "type": "Note completion", "instruction": "Complete the notes using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to sports centre launch. The main session takes place on Monday at 6:40, and participants should meet at the visitor centre. Sofia Bennett explains that the most important point is urban trees, while heat islands is usually the detail people forget. The cost or reference given in the notice is £75, and everyone should bring a printed map. The final recommendation is to review pollution before leaving, because this helps avoid common mistakes.", "questions": ["The session takes place on <input data-answer='Monday'>.", "Participants should arrive at <input data-answer='6:40'>.", "The meeting point is <input data-answer='the visitor centre'>.", "The speaker is <input data-answer='Sofia Bennett'>.", "Everyone should bring a <input data-answer='printed map'>."]}, {"id": "6-16", "level": "6", "number": 16, "title": "Cinema booking call · Lesson 16", "type": "Plan labelling", "instruction": "Label the plan using no more than three words and/or a number.", "transcript": "The speaker explains practical details and compares options related to cinema booking call. The main session takes place on Tuesday at 7:10, and participants should meet at the seminar room. Ahmed Khan explains that the most important point is breakfast room, while gym is usually the detail people forget. The cost or reference given in the notice is £90, and everyone should bring a practice booklet. The final recommendation is to review swimming pool before leaving, because this helps avoid common mistakes.", "questions": ["Entrance area: <input data-answer='the seminar room'>.", "Information desk contact: <input data-answer='Ahmed Khan'>.", "Main time marker: <input data-answer='7:10'>.", "Required item: <input data-answer='practice booklet'>.", "Review point: <input data-answer='swimming pool'>."]}, {"id": "6-17", "level": "6", "number": 17, "title": "Podcast about sleep · Lesson 17", "type": "Classification", "instruction": "Complete the notes using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to podcast about sleep. The main session takes place on Wednesday at 8:30, and participants should meet at Room 12. Emma Carter explains that the most important point is students, while librarian is usually the detail people forget. The cost or reference given in the notice is £12, and everyone should bring a feedback form. The final recommendation is to review quiet study rooms before leaving, because this helps avoid common mistakes.", "questionTitle": "A main issue · B forgotten detail · C final review · D required item · E cost/reference", "questions": ["students: <input data-answer='A'>.", "librarian: <input data-answer='B'>.", "quiet study rooms: <input data-answer='C'>.", "feedback form: <input data-answer='D'>.", "£12: <input data-answer='E'>."]}, {"id": "6-18", "level": "6", "number": 18, "title": "Bike rental office · Lesson 18", "type": "Summary completion", "instruction": "Complete the notes using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to bike rental office. The main session takes place on Thursday at 9:15, and participants should meet at Hall B. Daniel Lewis explains that the most important point is visitors, while cloakroom is usually the detail people forget. The cost or reference given in the notice is £18, and everyone should bring a confirmation email. The final recommendation is to review exhibition rooms before leaving, because this helps avoid common mistakes.", "questions": ["The session takes place on <input data-answer='Thursday'>.", "Participants should arrive at <input data-answer='9:15'>.", "The meeting point is <input data-answer='Hall B'>.", "The speaker is <input data-answer='Daniel Lewis'>.", "Everyone should bring a <input data-answer='confirmation email'>."]}, {"id": "6-19", "level": "6", "number": 19, "title": "Art workshop registration · Lesson 19", "type": "Sentence completion", "instruction": "Complete the notes using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to art workshop registration. The main session takes place on Friday at 10:45, and participants should meet at the main desk. Priya Shah explains that the most important point is commuters, while platform changes is usually the detail people forget. The cost or reference given in the notice is £24, and everyone should bring a student card. The final recommendation is to review ticket machines before leaving, because this helps avoid common mistakes.", "questions": ["The session takes place on <input data-answer='Friday'>.", "Participants should arrive at <input data-answer='10:45'>.", "The meeting point is <input data-answer='the main desk'>.", "The speaker is <input data-answer='Priya Shah'>.", "Everyone should bring a <input data-answer='student card'>."]}, {"id": "6-20", "level": "6", "number": 20, "title": "Local radio interview · Lesson 20", "type": "Form completion", "instruction": "Complete the form using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to local radio interview. The main session takes place on Saturday at 11:20, and participants should meet at the north entrance. Oliver Grant explains that the most important point is residents, while compost is usually the detail people forget. The cost or reference given in the notice is £35, and everyone should bring a reference number. The final recommendation is to review watering rota before leaving, because this helps avoid common mistakes.", "questions": ["Name: <input data-answer='Oliver Grant'>.", "Day: <input data-answer='Saturday'>.", "Time: <input data-answer='11:20'>.", "Location: <input data-answer='the north entrance'>.", "Document/item required: <input data-answer='reference number'>."]}, {"id": "6-21", "level": "6", "number": 21, "title": "Research seminar · Lesson 21", "type": "Table completion", "instruction": "Complete the table using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to research seminar. The main session takes place on Sunday at 2:30, and participants should meet at Studio 3. Nina Brooks explains that the most important point is receptionist, while patient form is usually the detail people forget. The cost or reference given in the notice is £45, and everyone should bring a safety briefing. The final recommendation is to review symptoms before leaving, because this helps avoid common mistakes.", "questions": ["Date/day: <input data-answer='Sunday'>.", "Start time: <input data-answer='2:30'>.", "Meeting place: <input data-answer='Studio 3'>.", "Person in charge: <input data-answer='Nina Brooks'>.", "Item to bring: <input data-answer='safety briefing'>."]}, {"id": "6-22", "level": "6", "number": 22, "title": "History walking tour · Lesson 22", "type": "Matching", "instruction": "Complete the notes using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to history walking tour. The main session takes place on Monday at 4:15, and participants should meet at Lab 4. James Miller explains that the most important point is halls, while shared flats is usually the detail people forget. The cost or reference given in the notice is £60, and everyone should bring a online account. The final recommendation is to review host families before leaving, because this helps avoid common mistakes.", "questionTitle": "Categories: A main session · B meeting point · C speaker · D required item · E cost/reference", "questions": ["Monday: <input data-answer='A'>.", "Lab 4: <input data-answer='B'>.", "James Miller: <input data-answer='C'>.", "online account: <input data-answer='D'>.", "£60: <input data-answer='E'>."]}, {"id": "6-23", "level": "6", "number": 23, "title": "Fitness class information · Lesson 23", "type": "Multiple choice", "instruction": "Complete the notes using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to fitness class information. The main session takes place on Tuesday at 6:40, and participants should meet at the visitor centre. Sofia Bennett explains that the most important point is urban trees, while heat islands is usually the detail people forget. The cost or reference given in the notice is £75, and everyone should bring a printed map. The final recommendation is to review pollution before leaving, because this helps avoid common mistakes.", "mcq": [{"q": "When does the main session take place?", "options": ["Sunday", "Wednesday", "Tuesday"], "answer": 2}, {"q": "Where should participants meet?", "options": ["the visitor centre", "the cafeteria", "the car park"], "answer": 0}, {"q": "Who gives the explanation?", "options": ["a visitor", "Sofia Bennett", "the receptionist"], "answer": 1}, {"q": "What should people bring?", "options": ["a lunch box", "a laptop charger", "printed map"], "answer": 2}, {"q": "What should be reviewed before leaving?", "options": ["the weather", "the building colour", "pollution"], "answer": 2}]}, {"id": "6-24", "level": "6", "number": 24, "title": "Customer support call · Lesson 24", "type": "Short answer", "instruction": "Answer the questions using no more than three words and/or a number.", "transcript": "The speaker explains practical details and compares options related to customer support call. The main session takes place on Wednesday at 7:10, and participants should meet at the seminar room. Ahmed Khan explains that the most important point is breakfast room, while gym is usually the detail people forget. The cost or reference given in the notice is £90, and everyone should bring a practice booklet. The final recommendation is to review swimming pool before leaving, because this helps avoid common mistakes.", "questions": ["What day is the session? <input data-answer='Wednesday'>.", "What time does it begin? <input data-answer='7:10'>.", "Where do participants meet? <input data-answer='the seminar room'>.", "Who explains the information? <input data-answer='Ahmed Khan'>.", "What item should people bring? <input data-answer='practice booklet'>."]}, {"id": "6-25", "level": "6", "number": 25, "title": "Cooking course · Lesson 25", "type": "Note completion", "instruction": "Complete the notes using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to cooking course. The main session takes place on Thursday at 8:30, and participants should meet at Room 12. Emma Carter explains that the most important point is students, while librarian is usually the detail people forget. The cost or reference given in the notice is £12, and everyone should bring a feedback form. The final recommendation is to review quiet study rooms before leaving, because this helps avoid common mistakes.", "questions": ["The session takes place on <input data-answer='Thursday'>.", "Participants should arrive at <input data-answer='8:30'>.", "The meeting point is <input data-answer='Room 12'>.", "The speaker is <input data-answer='Emma Carter'>.", "Everyone should bring a <input data-answer='feedback form'>."]}, {"id": "6-26", "level": "6", "number": 26, "title": "Career fair announcement · Lesson 26", "type": "Plan labelling", "instruction": "Label the plan using no more than three words and/or a number.", "transcript": "The speaker explains practical details and compares options related to career fair announcement. The main session takes place on Friday at 9:15, and participants should meet at Hall B. Daniel Lewis explains that the most important point is visitors, while cloakroom is usually the detail people forget. The cost or reference given in the notice is £18, and everyone should bring a confirmation email. The final recommendation is to review exhibition rooms before leaving, because this helps avoid common mistakes.", "questions": ["Entrance area: <input data-answer='Hall B'>.", "Information desk contact: <input data-answer='Daniel Lewis'>.", "Main time marker: <input data-answer='9:15'>.", "Required item: <input data-answer='confirmation email'>.", "Review point: <input data-answer='exhibition rooms'>."]}, {"id": "6-27", "level": "6", "number": 27, "title": "Housing inspection · Lesson 27", "type": "Classification", "instruction": "Complete the notes using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to housing inspection. The main session takes place on Saturday at 10:45, and participants should meet at the main desk. Priya Shah explains that the most important point is commuters, while platform changes is usually the detail people forget. The cost or reference given in the notice is £24, and everyone should bring a student card. The final recommendation is to review ticket machines before leaving, because this helps avoid common mistakes.", "questionTitle": "A main issue · B forgotten detail · C final review · D required item · E cost/reference", "questions": ["commuters: <input data-answer='A'>.", "platform changes: <input data-answer='B'>.", "ticket machines: <input data-answer='C'>.", "student card: <input data-answer='D'>.", "£24: <input data-answer='E'>."]}, {"id": "6-28", "level": "6", "number": 28, "title": "Conference schedule · Lesson 28", "type": "Summary completion", "instruction": "Complete the notes using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to conference schedule. The main session takes place on Sunday at 11:20, and participants should meet at the north entrance. Oliver Grant explains that the most important point is residents, while compost is usually the detail people forget. The cost or reference given in the notice is £35, and everyone should bring a reference number. The final recommendation is to review watering rota before leaving, because this helps avoid common mistakes.", "questions": ["The session takes place on <input data-answer='Sunday'>.", "Participants should arrive at <input data-answer='11:20'>.", "The meeting point is <input data-answer='the north entrance'>.", "The speaker is <input data-answer='Oliver Grant'>.", "Everyone should bring a <input data-answer='reference number'>."]}, {"id": "6-29", "level": "6", "number": 29, "title": "Travel insurance enquiry · Lesson 29", "type": "Sentence completion", "instruction": "Complete the notes using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to travel insurance enquiry. The main session takes place on Monday at 2:30, and participants should meet at Studio 3. Nina Brooks explains that the most important point is receptionist, while patient form is usually the detail people forget. The cost or reference given in the notice is £45, and everyone should bring a safety briefing. The final recommendation is to review symptoms before leaving, because this helps avoid common mistakes.", "questions": ["The session takes place on <input data-answer='Monday'>.", "Participants should arrive at <input data-answer='2:30'>.", "The meeting point is <input data-answer='Studio 3'>.", "The speaker is <input data-answer='Nina Brooks'>.", "Everyone should bring a <input data-answer='safety briefing'>."]}, {"id": "6-30", "level": "6", "number": 30, "title": "Science exhibition · Lesson 30", "type": "Form completion", "instruction": "Complete the form using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to science exhibition. The main session takes place on Tuesday at 4:15, and participants should meet at Lab 4. James Miller explains that the most important point is halls, while shared flats is usually the detail people forget. The cost or reference given in the notice is £60, and everyone should bring a online account. The final recommendation is to review host families before leaving, because this helps avoid common mistakes.", "questions": ["Name: <input data-answer='James Miller'>.", "Day: <input data-answer='Tuesday'>.", "Time: <input data-answer='4:15'>.", "Location: <input data-answer='Lab 4'>.", "Document/item required: <input data-answer='online account'>."]}, {"id": "6-31", "level": "6", "number": 31, "title": "Bank account application · Lesson 31", "type": "Table completion", "instruction": "Complete the table using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to bank account application. The main session takes place on Wednesday at 6:40, and participants should meet at the visitor centre. Sofia Bennett explains that the most important point is urban trees, while heat islands is usually the detail people forget. The cost or reference given in the notice is £75, and everyone should bring a printed map. The final recommendation is to review pollution before leaving, because this helps avoid common mistakes.", "questions": ["Date/day: <input data-answer='Wednesday'>.", "Start time: <input data-answer='6:40'>.", "Meeting place: <input data-answer='the visitor centre'>.", "Person in charge: <input data-answer='Sofia Bennett'>.", "Item to bring: <input data-answer='printed map'>."]}, {"id": "6-32", "level": "6", "number": 32, "title": "Restaurant booking · Lesson 32", "type": "Matching", "instruction": "Complete the notes using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to restaurant booking. The main session takes place on Thursday at 7:10, and participants should meet at the seminar room. Ahmed Khan explains that the most important point is breakfast room, while gym is usually the detail people forget. The cost or reference given in the notice is £90, and everyone should bring a practice booklet. The final recommendation is to review swimming pool before leaving, because this helps avoid common mistakes.", "questionTitle": "Categories: A main session · B meeting point · C speaker · D required item · E cost/reference", "questions": ["Thursday: <input data-answer='A'>.", "the seminar room: <input data-answer='B'>.", "Ahmed Khan: <input data-answer='C'>.", "practice booklet: <input data-answer='D'>.", "£90: <input data-answer='E'>."]}, {"id": "6-33", "level": "6", "number": 33, "title": "Recycling centre tour · Lesson 33", "type": "Multiple choice", "instruction": "Complete the notes using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to recycling centre tour. The main session takes place on Friday at 8:30, and participants should meet at Room 12. Emma Carter explains that the most important point is students, while librarian is usually the detail people forget. The cost or reference given in the notice is £12, and everyone should bring a feedback form. The final recommendation is to review quiet study rooms before leaving, because this helps avoid common mistakes.", "mcq": [{"q": "When does the main session take place?", "options": ["Wednesday", "Friday", "Sunday"], "answer": 1}, {"q": "Where should participants meet?", "options": ["the cafeteria", "the car park", "Room 12"], "answer": 2}, {"q": "Who gives the explanation?", "options": ["a visitor", "the receptionist", "Emma Carter"], "answer": 2}, {"q": "What should people bring?", "options": ["a lunch box", "a laptop charger", "feedback form"], "answer": 2}, {"q": "What should be reviewed before leaving?", "options": ["the building colour", "quiet study rooms", "the weather"], "answer": 1}]}, {"id": "6-34", "level": "6", "number": 34, "title": "Theatre visit · Lesson 34", "type": "Short answer", "instruction": "Answer the questions using no more than three words and/or a number.", "transcript": "The speaker explains practical details and compares options related to theatre visit. The main session takes place on Saturday at 9:15, and participants should meet at Hall B. Daniel Lewis explains that the most important point is visitors, while cloakroom is usually the detail people forget. The cost or reference given in the notice is £18, and everyone should bring a confirmation email. The final recommendation is to review exhibition rooms before leaving, because this helps avoid common mistakes.", "questions": ["What day is the session? <input data-answer='Saturday'>.", "What time does it begin? <input data-answer='9:15'>.", "Where do participants meet? <input data-answer='Hall B'>.", "Who explains the information? <input data-answer='Daniel Lewis'>.", "What item should people bring? <input data-answer='confirmation email'>."]}, {"id": "6-35", "level": "6", "number": 35, "title": "Photography club · Lesson 35", "type": "Note completion", "instruction": "Complete the notes using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to photography club. The main session takes place on Sunday at 10:45, and participants should meet at the main desk. Priya Shah explains that the most important point is commuters, while platform changes is usually the detail people forget. The cost or reference given in the notice is £24, and everyone should bring a student card. The final recommendation is to review ticket machines before leaving, because this helps avoid common mistakes.", "questions": ["The session takes place on <input data-answer='Sunday'>.", "Participants should arrive at <input data-answer='10:45'>.", "The meeting point is <input data-answer='the main desk'>.", "The speaker is <input data-answer='Priya Shah'>.", "Everyone should bring a <input data-answer='student card'>."]}, {"id": "6-36", "level": "6", "number": 36, "title": "Public lecture on nutrition · Lesson 36", "type": "Plan labelling", "instruction": "Label the plan using no more than three words and/or a number.", "transcript": "The speaker explains practical details and compares options related to public lecture on nutrition. The main session takes place on Monday at 11:20, and participants should meet at the north entrance. Oliver Grant explains that the most important point is residents, while compost is usually the detail people forget. The cost or reference given in the notice is £35, and everyone should bring a reference number. The final recommendation is to review watering rota before leaving, because this helps avoid common mistakes.", "questions": ["Entrance area: <input data-answer='the north entrance'>.", "Information desk contact: <input data-answer='Oliver Grant'>.", "Main time marker: <input data-answer='11:20'>.", "Required item: <input data-answer='reference number'>.", "Review point: <input data-answer='watering rota'>."]}, {"id": "6-37", "level": "6", "number": 37, "title": "Job training session · Lesson 37", "type": "Classification", "instruction": "Complete the notes using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to job training session. The main session takes place on Tuesday at 2:30, and participants should meet at Studio 3. Nina Brooks explains that the most important point is receptionist, while patient form is usually the detail people forget. The cost or reference given in the notice is £45, and everyone should bring a safety briefing. The final recommendation is to review symptoms before leaving, because this helps avoid common mistakes.", "questionTitle": "A main issue · B forgotten detail · C final review · D required item · E cost/reference", "questions": ["receptionist: <input data-answer='A'>.", "patient form: <input data-answer='B'>.", "symptoms: <input data-answer='C'>.", "safety briefing: <input data-answer='D'>.", "£45: <input data-answer='E'>."]}, {"id": "6-38", "level": "6", "number": 38, "title": "Neighbourhood safety meeting · Lesson 38", "type": "Summary completion", "instruction": "Complete the notes using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to neighbourhood safety meeting. The main session takes place on Wednesday at 4:15, and participants should meet at Lab 4. James Miller explains that the most important point is halls, while shared flats is usually the detail people forget. The cost or reference given in the notice is £60, and everyone should bring a online account. The final recommendation is to review host families before leaving, because this helps avoid common mistakes.", "questions": ["The session takes place on <input data-answer='Wednesday'>.", "Participants should arrive at <input data-answer='4:15'>.", "The meeting point is <input data-answer='Lab 4'>.", "The speaker is <input data-answer='James Miller'>.", "Everyone should bring a <input data-answer='online account'>."]}, {"id": "6-39", "level": "6", "number": 39, "title": "Music festival planning · Lesson 39", "type": "Sentence completion", "instruction": "Complete the notes using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to music festival planning. The main session takes place on Thursday at 6:40, and participants should meet at the visitor centre. Sofia Bennett explains that the most important point is urban trees, while heat islands is usually the detail people forget. The cost or reference given in the notice is £75, and everyone should bring a printed map. The final recommendation is to review pollution before leaving, because this helps avoid common mistakes.", "questions": ["The session takes place on <input data-answer='Thursday'>.", "Participants should arrive at <input data-answer='6:40'>.", "The meeting point is <input data-answer='the visitor centre'>.", "The speaker is <input data-answer='Sofia Bennett'>.", "Everyone should bring a <input data-answer='printed map'>."]}, {"id": "6-40", "level": "6", "number": 40, "title": "Dentist appointment · Lesson 40", "type": "Form completion", "instruction": "Complete the form using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to dentist appointment. The main session takes place on Friday at 7:10, and participants should meet at the seminar room. Ahmed Khan explains that the most important point is breakfast room, while gym is usually the detail people forget. The cost or reference given in the notice is £90, and everyone should bring a practice booklet. The final recommendation is to review swimming pool before leaving, because this helps avoid common mistakes.", "questions": ["Name: <input data-answer='Ahmed Khan'>.", "Day: <input data-answer='Friday'>.", "Time: <input data-answer='7:10'>.", "Location: <input data-answer='the seminar room'>.", "Document/item required: <input data-answer='practice booklet'>."]}, {"id": "6-41", "level": "6", "number": 41, "title": "Study abroad talk · Lesson 41", "type": "Table completion", "instruction": "Complete the table using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to study abroad talk. The main session takes place on Saturday at 8:30, and participants should meet at Room 12. Emma Carter explains that the most important point is students, while librarian is usually the detail people forget. The cost or reference given in the notice is £12, and everyone should bring a feedback form. The final recommendation is to review quiet study rooms before leaving, because this helps avoid common mistakes.", "questions": ["Date/day: <input data-answer='Saturday'>.", "Start time: <input data-answer='8:30'>.", "Meeting place: <input data-answer='Room 12'>.", "Person in charge: <input data-answer='Emma Carter'>.", "Item to bring: <input data-answer='feedback form'>."]}, {"id": "6-42", "level": "6", "number": 42, "title": "Weather warning · Lesson 42", "type": "Matching", "instruction": "Complete the notes using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to weather warning. The main session takes place on Sunday at 9:15, and participants should meet at Hall B. Daniel Lewis explains that the most important point is visitors, while cloakroom is usually the detail people forget. The cost or reference given in the notice is £18, and everyone should bring a confirmation email. The final recommendation is to review exhibition rooms before leaving, because this helps avoid common mistakes.", "questionTitle": "Categories: A main session · B meeting point · C speaker · D required item · E cost/reference", "questions": ["Sunday: <input data-answer='A'>.", "Hall B: <input data-answer='B'>.", "Daniel Lewis: <input data-answer='C'>.", "confirmation email: <input data-answer='D'>.", "£18: <input data-answer='E'>."]}, {"id": "6-43", "level": "6", "number": 43, "title": "Business start-up advice · Lesson 43", "type": "Multiple choice", "instruction": "Complete the notes using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to business start-up advice. The main session takes place on Monday at 10:45, and participants should meet at the main desk. Priya Shah explains that the most important point is commuters, while platform changes is usually the detail people forget. The cost or reference given in the notice is £24, and everyone should bring a student card. The final recommendation is to review ticket machines before leaving, because this helps avoid common mistakes.", "mcq": [{"q": "When does the main session take place?", "options": ["Sunday", "Wednesday", "Monday"], "answer": 2}, {"q": "Where should participants meet?", "options": ["the cafeteria", "the main desk", "the car park"], "answer": 1}, {"q": "Who gives the explanation?", "options": ["the receptionist", "a visitor", "Priya Shah"], "answer": 2}, {"q": "What should people bring?", "options": ["a lunch box", "student card", "a laptop charger"], "answer": 1}, {"q": "What should be reviewed before leaving?", "options": ["the building colour", "the weather", "ticket machines"], "answer": 2}]}, {"id": "6-44", "level": "6", "number": 44, "title": "University lab safety · Lesson 44", "type": "Short answer", "instruction": "Answer the questions using no more than three words and/or a number.", "transcript": "The speaker explains practical details and compares options related to university lab safety. The main session takes place on Tuesday at 11:20, and participants should meet at the north entrance. Oliver Grant explains that the most important point is residents, while compost is usually the detail people forget. The cost or reference given in the notice is £35, and everyone should bring a reference number. The final recommendation is to review watering rota before leaving, because this helps avoid common mistakes.", "questions": ["What day is the session? <input data-answer='Tuesday'>.", "What time does it begin? <input data-answer='11:20'>.", "Where do participants meet? <input data-answer='the north entrance'>.", "Who explains the information? <input data-answer='Oliver Grant'>.", "What item should people bring? <input data-answer='reference number'>."]}, {"id": "6-45", "level": "6", "number": 45, "title": "Apartment viewing · Lesson 45", "type": "Note completion", "instruction": "Complete the notes using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to apartment viewing. The main session takes place on Wednesday at 2:30, and participants should meet at Studio 3. Nina Brooks explains that the most important point is receptionist, while patient form is usually the detail people forget. The cost or reference given in the notice is £45, and everyone should bring a safety briefing. The final recommendation is to review symptoms before leaving, because this helps avoid common mistakes.", "questions": ["The session takes place on <input data-answer='Wednesday'>.", "Participants should arrive at <input data-answer='2:30'>.", "The meeting point is <input data-answer='Studio 3'>.", "The speaker is <input data-answer='Nina Brooks'>.", "Everyone should bring a <input data-answer='safety briefing'>."]}, {"id": "6-46", "level": "6", "number": 46, "title": "Charity fundraising · Lesson 46", "type": "Plan labelling", "instruction": "Label the plan using no more than three words and/or a number.", "transcript": "The speaker explains practical details and compares options related to charity fundraising. The main session takes place on Thursday at 4:15, and participants should meet at Lab 4. James Miller explains that the most important point is halls, while shared flats is usually the detail people forget. The cost or reference given in the notice is £60, and everyone should bring a online account. The final recommendation is to review host families before leaving, because this helps avoid common mistakes.", "questions": ["Entrance area: <input data-answer='Lab 4'>.", "Information desk contact: <input data-answer='James Miller'>.", "Main time marker: <input data-answer='4:15'>.", "Required item: <input data-answer='online account'>.", "Review point: <input data-answer='host families'>."]}, {"id": "6-47", "level": "6", "number": 47, "title": "Dentist hygiene lecture · Lesson 47", "type": "Classification", "instruction": "Complete the notes using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to dentist hygiene lecture. The main session takes place on Friday at 6:40, and participants should meet at the visitor centre. Sofia Bennett explains that the most important point is urban trees, while heat islands is usually the detail people forget. The cost or reference given in the notice is £75, and everyone should bring a printed map. The final recommendation is to review pollution before leaving, because this helps avoid common mistakes.", "questionTitle": "A main issue · B forgotten detail · C final review · D required item · E cost/reference", "questions": ["urban trees: <input data-answer='A'>.", "heat islands: <input data-answer='B'>.", "pollution: <input data-answer='C'>.", "printed map: <input data-answer='D'>.", "£75: <input data-answer='E'>."]}, {"id": "6-48", "level": "6", "number": 48, "title": "Farmers market · Lesson 48", "type": "Summary completion", "instruction": "Complete the notes using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to farmers market. The main session takes place on Saturday at 7:10, and participants should meet at the seminar room. Ahmed Khan explains that the most important point is breakfast room, while gym is usually the detail people forget. The cost or reference given in the notice is £90, and everyone should bring a practice booklet. The final recommendation is to review swimming pool before leaving, because this helps avoid common mistakes.", "questions": ["The session takes place on <input data-answer='Saturday'>.", "Participants should arrive at <input data-answer='7:10'>.", "The meeting point is <input data-answer='the seminar room'>.", "The speaker is <input data-answer='Ahmed Khan'>.", "Everyone should bring a <input data-answer='practice booklet'>."]}, {"id": "6-49", "level": "6", "number": 49, "title": "Mobile app tutorial · Lesson 49", "type": "Sentence completion", "instruction": "Complete the notes using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to mobile app tutorial. The main session takes place on Sunday at 8:30, and participants should meet at Room 12. Emma Carter explains that the most important point is students, while librarian is usually the detail people forget. The cost or reference given in the notice is £12, and everyone should bring a feedback form. The final recommendation is to review quiet study rooms before leaving, because this helps avoid common mistakes.", "questions": ["The session takes place on <input data-answer='Sunday'>.", "Participants should arrive at <input data-answer='8:30'>.", "The meeting point is <input data-answer='Room 12'>.", "The speaker is <input data-answer='Emma Carter'>.", "Everyone should bring a <input data-answer='feedback form'>."]}, {"id": "6-50", "level": "6", "number": 50, "title": "Public park consultation · Lesson 50", "type": "Form completion", "instruction": "Complete the form using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to public park consultation. The main session takes place on Monday at 9:15, and participants should meet at Hall B. Daniel Lewis explains that the most important point is visitors, while cloakroom is usually the detail people forget. The cost or reference given in the notice is £18, and everyone should bring a confirmation email. The final recommendation is to review exhibition rooms before leaving, because this helps avoid common mistakes.", "questions": ["Name: <input data-answer='Daniel Lewis'>.", "Day: <input data-answer='Monday'>.", "Time: <input data-answer='9:15'>.", "Location: <input data-answer='Hall B'>.", "Document/item required: <input data-answer='confirmation email'>."]}, {"id": "6-51", "level": "6", "number": 51, "title": "Wildlife conservation talk · Lesson 51", "type": "Table completion", "instruction": "Complete the table using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to wildlife conservation talk. The main session takes place on Tuesday at 10:45, and participants should meet at the main desk. Priya Shah explains that the most important point is commuters, while platform changes is usually the detail people forget. The cost or reference given in the notice is £24, and everyone should bring a student card. The final recommendation is to review ticket machines before leaving, because this helps avoid common mistakes.", "questions": ["Date/day: <input data-answer='Tuesday'>.", "Start time: <input data-answer='10:45'>.", "Meeting place: <input data-answer='the main desk'>.", "Person in charge: <input data-answer='Priya Shah'>.", "Item to bring: <input data-answer='student card'>."]}, {"id": "6-52", "level": "6", "number": 52, "title": "Drama class · Lesson 52", "type": "Matching", "instruction": "Complete the notes using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to drama class. The main session takes place on Wednesday at 11:20, and participants should meet at the north entrance. Oliver Grant explains that the most important point is residents, while compost is usually the detail people forget. The cost or reference given in the notice is £35, and everyone should bring a reference number. The final recommendation is to review watering rota before leaving, because this helps avoid common mistakes.", "questionTitle": "Categories: A main session · B meeting point · C speaker · D required item · E cost/reference", "questions": ["Wednesday: <input data-answer='A'>.", "the north entrance: <input data-answer='B'>.", "Oliver Grant: <input data-answer='C'>.", "reference number: <input data-answer='D'>.", "£35: <input data-answer='E'>."]}, {"id": "6-53", "level": "6", "number": 53, "title": "Train station renovation · Lesson 53", "type": "Multiple choice", "instruction": "Complete the notes using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to train station renovation. The main session takes place on Thursday at 2:30, and participants should meet at Studio 3. Nina Brooks explains that the most important point is receptionist, while patient form is usually the detail people forget. The cost or reference given in the notice is £45, and everyone should bring a safety briefing. The final recommendation is to review symptoms before leaving, because this helps avoid common mistakes.", "mcq": [{"q": "When does the main session take place?", "options": ["Thursday", "Wednesday", "Sunday"], "answer": 0}, {"q": "Where should participants meet?", "options": ["Studio 3", "the car park", "the cafeteria"], "answer": 0}, {"q": "Who gives the explanation?", "options": ["Nina Brooks", "a visitor", "the receptionist"], "answer": 0}, {"q": "What should people bring?", "options": ["safety briefing", "a laptop charger", "a lunch box"], "answer": 0}, {"q": "What should be reviewed before leaving?", "options": ["the building colour", "symptoms", "the weather"], "answer": 1}]}, {"id": "6-54", "level": "6", "number": 54, "title": "Small business podcast · Lesson 54", "type": "Short answer", "instruction": "Answer the questions using no more than three words and/or a number.", "transcript": "The speaker explains practical details and compares options related to small business podcast. The main session takes place on Friday at 4:15, and participants should meet at Lab 4. James Miller explains that the most important point is halls, while shared flats is usually the detail people forget. The cost or reference given in the notice is £60, and everyone should bring a online account. The final recommendation is to review host families before leaving, because this helps avoid common mistakes.", "questions": ["What day is the session? <input data-answer='Friday'>.", "What time does it begin? <input data-answer='4:15'>.", "Where do participants meet? <input data-answer='Lab 4'>.", "Who explains the information? <input data-answer='James Miller'>.", "What item should people bring? <input data-answer='online account'>."]}, {"id": "6-55", "level": "6", "number": 55, "title": "Emergency first aid course · Lesson 55", "type": "Note completion", "instruction": "Complete the notes using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to emergency first aid course. The main session takes place on Saturday at 6:40, and participants should meet at the visitor centre. Sofia Bennett explains that the most important point is urban trees, while heat islands is usually the detail people forget. The cost or reference given in the notice is £75, and everyone should bring a printed map. The final recommendation is to review pollution before leaving, because this helps avoid common mistakes.", "questions": ["The session takes place on <input data-answer='Saturday'>.", "Participants should arrive at <input data-answer='6:40'>.", "The meeting point is <input data-answer='the visitor centre'>.", "The speaker is <input data-answer='Sofia Bennett'>.", "Everyone should bring a <input data-answer='printed map'>."]}, {"id": "6-56", "level": "6", "number": 56, "title": "City art gallery · Lesson 56", "type": "Plan labelling", "instruction": "Label the plan using no more than three words and/or a number.", "transcript": "The speaker explains practical details and compares options related to city art gallery. The main session takes place on Sunday at 7:10, and participants should meet at the seminar room. Ahmed Khan explains that the most important point is breakfast room, while gym is usually the detail people forget. The cost or reference given in the notice is £90, and everyone should bring a practice booklet. The final recommendation is to review swimming pool before leaving, because this helps avoid common mistakes.", "questions": ["Entrance area: <input data-answer='the seminar room'>.", "Information desk contact: <input data-answer='Ahmed Khan'>.", "Main time marker: <input data-answer='7:10'>.", "Required item: <input data-answer='practice booklet'>.", "Review point: <input data-answer='swimming pool'>."]}, {"id": "6-57", "level": "6", "number": 57, "title": "University counselling service · Lesson 57", "type": "Classification", "instruction": "Complete the notes using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to university counselling service. The main session takes place on Monday at 8:30, and participants should meet at Room 12. Emma Carter explains that the most important point is students, while librarian is usually the detail people forget. The cost or reference given in the notice is £12, and everyone should bring a feedback form. The final recommendation is to review quiet study rooms before leaving, because this helps avoid common mistakes.", "questionTitle": "A main issue · B forgotten detail · C final review · D required item · E cost/reference", "questions": ["students: <input data-answer='A'>.", "librarian: <input data-answer='B'>.", "quiet study rooms: <input data-answer='C'>.", "feedback form: <input data-answer='D'>.", "£12: <input data-answer='E'>."]}, {"id": "6-58", "level": "6", "number": 58, "title": "Cycling safety talk · Lesson 58", "type": "Summary completion", "instruction": "Complete the notes using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to cycling safety talk. The main session takes place on Tuesday at 9:15, and participants should meet at Hall B. Daniel Lewis explains that the most important point is visitors, while cloakroom is usually the detail people forget. The cost or reference given in the notice is £18, and everyone should bring a confirmation email. The final recommendation is to review exhibition rooms before leaving, because this helps avoid common mistakes.", "questions": ["The session takes place on <input data-answer='Tuesday'>.", "Participants should arrive at <input data-answer='9:15'>.", "The meeting point is <input data-answer='Hall B'>.", "The speaker is <input data-answer='Daniel Lewis'>.", "Everyone should bring a <input data-answer='confirmation email'>."]}, {"id": "6-59", "level": "6", "number": 59, "title": "Local history archive · Lesson 59", "type": "Sentence completion", "instruction": "Complete the notes using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to local history archive. The main session takes place on Wednesday at 10:45, and participants should meet at the main desk. Priya Shah explains that the most important point is commuters, while platform changes is usually the detail people forget. The cost or reference given in the notice is £24, and everyone should bring a student card. The final recommendation is to review ticket machines before leaving, because this helps avoid common mistakes.", "questions": ["The session takes place on <input data-answer='Wednesday'>.", "Participants should arrive at <input data-answer='10:45'>.", "The meeting point is <input data-answer='the main desk'>.", "The speaker is <input data-answer='Priya Shah'>.", "Everyone should bring a <input data-answer='student card'>."]}, {"id": "6-60", "level": "6", "number": 60, "title": "Cooking competition · Lesson 60", "type": "Form completion", "instruction": "Complete the form using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to cooking competition. The main session takes place on Thursday at 11:20, and participants should meet at the north entrance. Oliver Grant explains that the most important point is residents, while compost is usually the detail people forget. The cost or reference given in the notice is £35, and everyone should bring a reference number. The final recommendation is to review watering rota before leaving, because this helps avoid common mistakes.", "questions": ["Name: <input data-answer='Oliver Grant'>.", "Day: <input data-answer='Thursday'>.", "Time: <input data-answer='11:20'>.", "Location: <input data-answer='the north entrance'>.", "Document/item required: <input data-answer='reference number'>."]}, {"id": "6-61", "level": "6", "number": 61, "title": "Nature reserve visit · Lesson 61", "type": "Table completion", "instruction": "Complete the table using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to nature reserve visit. The main session takes place on Friday at 2:30, and participants should meet at Studio 3. Nina Brooks explains that the most important point is receptionist, while patient form is usually the detail people forget. The cost or reference given in the notice is £45, and everyone should bring a safety briefing. The final recommendation is to review symptoms before leaving, because this helps avoid common mistakes.", "questions": ["Date/day: <input data-answer='Friday'>.", "Start time: <input data-answer='2:30'>.", "Meeting place: <input data-answer='Studio 3'>.", "Person in charge: <input data-answer='Nina Brooks'>.", "Item to bring: <input data-answer='safety briefing'>."]}, {"id": "6-62", "level": "6", "number": 62, "title": "Podcast production class · Lesson 62", "type": "Matching", "instruction": "Complete the notes using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to podcast production class. The main session takes place on Saturday at 4:15, and participants should meet at Lab 4. James Miller explains that the most important point is halls, while shared flats is usually the detail people forget. The cost or reference given in the notice is £60, and everyone should bring a online account. The final recommendation is to review host families before leaving, because this helps avoid common mistakes.", "questionTitle": "Categories: A main session · B meeting point · C speaker · D required item · E cost/reference", "questions": ["Saturday: <input data-answer='A'>.", "Lab 4: <input data-answer='B'>.", "James Miller: <input data-answer='C'>.", "online account: <input data-answer='D'>.", "£60: <input data-answer='E'>."]}, {"id": "6-63", "level": "6", "number": 63, "title": "Community theatre audition · Lesson 63", "type": "Multiple choice", "instruction": "Complete the notes using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to community theatre audition. The main session takes place on Sunday at 6:40, and participants should meet at the visitor centre. Sofia Bennett explains that the most important point is urban trees, while heat islands is usually the detail people forget. The cost or reference given in the notice is £75, and everyone should bring a printed map. The final recommendation is to review pollution before leaving, because this helps avoid common mistakes.", "mcq": [{"q": "When does the main session take place?", "options": ["Sunday", "Sunday", "Wednesday"], "answer": 0}, {"q": "Where should participants meet?", "options": ["the visitor centre", "the car park", "the cafeteria"], "answer": 0}, {"q": "Who gives the explanation?", "options": ["a visitor", "Sofia Bennett", "the receptionist"], "answer": 1}, {"q": "What should people bring?", "options": ["a lunch box", "a laptop charger", "printed map"], "answer": 2}, {"q": "What should be reviewed before leaving?", "options": ["the weather", "the building colour", "pollution"], "answer": 2}]}, {"id": "6-64", "level": "6", "number": 64, "title": "Online banking security · Lesson 64", "type": "Short answer", "instruction": "Answer the questions using no more than three words and/or a number.", "transcript": "The speaker explains practical details and compares options related to online banking security. The main session takes place on Monday at 7:10, and participants should meet at the seminar room. Ahmed Khan explains that the most important point is breakfast room, while gym is usually the detail people forget. The cost or reference given in the notice is £90, and everyone should bring a practice booklet. The final recommendation is to review swimming pool before leaving, because this helps avoid common mistakes.", "questions": ["What day is the session? <input data-answer='Monday'>.", "What time does it begin? <input data-answer='7:10'>.", "Where do participants meet? <input data-answer='the seminar room'>.", "Who explains the information? <input data-answer='Ahmed Khan'>.", "What item should people bring? <input data-answer='practice booklet'>."]}, {"id": "6-65", "level": "6", "number": 65, "title": "Road safety campaign · Lesson 65", "type": "Note completion", "instruction": "Complete the notes using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to road safety campaign. The main session takes place on Tuesday at 8:30, and participants should meet at Room 12. Emma Carter explains that the most important point is students, while librarian is usually the detail people forget. The cost or reference given in the notice is £12, and everyone should bring a feedback form. The final recommendation is to review quiet study rooms before leaving, because this helps avoid common mistakes.", "questions": ["The session takes place on <input data-answer='Tuesday'>.", "Participants should arrive at <input data-answer='8:30'>.", "The meeting point is <input data-answer='Room 12'>.", "The speaker is <input data-answer='Emma Carter'>.", "Everyone should bring a <input data-answer='feedback form'>."]}, {"id": "6-66", "level": "6", "number": 66, "title": "Language school enrolment · Lesson 66", "type": "Plan labelling", "instruction": "Label the plan using no more than three words and/or a number.", "transcript": "The speaker explains practical details and compares options related to language school enrolment. The main session takes place on Wednesday at 9:15, and participants should meet at Hall B. Daniel Lewis explains that the most important point is visitors, while cloakroom is usually the detail people forget. The cost or reference given in the notice is £18, and everyone should bring a confirmation email. The final recommendation is to review exhibition rooms before leaving, because this helps avoid common mistakes.", "questions": ["Entrance area: <input data-answer='Hall B'>.", "Information desk contact: <input data-answer='Daniel Lewis'>.", "Main time marker: <input data-answer='9:15'>.", "Required item: <input data-answer='confirmation email'>.", "Review point: <input data-answer='exhibition rooms'>."]}, {"id": "6-67", "level": "6", "number": 67, "title": "Local swimming pool · Lesson 67", "type": "Classification", "instruction": "Complete the notes using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to local swimming pool. The main session takes place on Thursday at 10:45, and participants should meet at the main desk. Priya Shah explains that the most important point is commuters, while platform changes is usually the detail people forget. The cost or reference given in the notice is £24, and everyone should bring a student card. The final recommendation is to review ticket machines before leaving, because this helps avoid common mistakes.", "questionTitle": "A main issue · B forgotten detail · C final review · D required item · E cost/reference", "questions": ["commuters: <input data-answer='A'>.", "platform changes: <input data-answer='B'>.", "ticket machines: <input data-answer='C'>.", "student card: <input data-answer='D'>.", "£24: <input data-answer='E'>."]}, {"id": "6-68", "level": "6", "number": 68, "title": "Library research skills · Lesson 68", "type": "Summary completion", "instruction": "Complete the notes using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to library research skills. The main session takes place on Friday at 11:20, and participants should meet at the north entrance. Oliver Grant explains that the most important point is residents, while compost is usually the detail people forget. The cost or reference given in the notice is £35, and everyone should bring a reference number. The final recommendation is to review watering rota before leaving, because this helps avoid common mistakes.", "questions": ["The session takes place on <input data-answer='Friday'>.", "Participants should arrive at <input data-answer='11:20'>.", "The meeting point is <input data-answer='the north entrance'>.", "The speaker is <input data-answer='Oliver Grant'>.", "Everyone should bring a <input data-answer='reference number'>."]}, {"id": "6-69", "level": "6", "number": 69, "title": "Animal shelter volunteering · Lesson 69", "type": "Sentence completion", "instruction": "Complete the notes using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to animal shelter volunteering. The main session takes place on Saturday at 2:30, and participants should meet at Studio 3. Nina Brooks explains that the most important point is receptionist, while patient form is usually the detail people forget. The cost or reference given in the notice is £45, and everyone should bring a safety briefing. The final recommendation is to review symptoms before leaving, because this helps avoid common mistakes.", "questions": ["The session takes place on <input data-answer='Saturday'>.", "Participants should arrive at <input data-answer='2:30'>.", "The meeting point is <input data-answer='Studio 3'>.", "The speaker is <input data-answer='Nina Brooks'>.", "Everyone should bring a <input data-answer='safety briefing'>."]}, {"id": "6-70", "level": "6", "number": 70, "title": "City council recycling · Lesson 70", "type": "Form completion", "instruction": "Complete the form using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to city council recycling. The main session takes place on Sunday at 4:15, and participants should meet at Lab 4. James Miller explains that the most important point is halls, while shared flats is usually the detail people forget. The cost or reference given in the notice is £60, and everyone should bring a online account. The final recommendation is to review host families before leaving, because this helps avoid common mistakes.", "questions": ["Name: <input data-answer='James Miller'>.", "Day: <input data-answer='Sunday'>.", "Time: <input data-answer='4:15'>.", "Location: <input data-answer='Lab 4'>.", "Document/item required: <input data-answer='online account'>."]}, {"id": "6-71", "level": "6", "number": 71, "title": "University sports team · Lesson 71", "type": "Table completion", "instruction": "Complete the table using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to university sports team. The main session takes place on Monday at 6:40, and participants should meet at the visitor centre. Sofia Bennett explains that the most important point is urban trees, while heat islands is usually the detail people forget. The cost or reference given in the notice is £75, and everyone should bring a printed map. The final recommendation is to review pollution before leaving, because this helps avoid common mistakes.", "questions": ["Date/day: <input data-answer='Monday'>.", "Start time: <input data-answer='6:40'>.", "Meeting place: <input data-answer='the visitor centre'>.", "Person in charge: <input data-answer='Sofia Bennett'>.", "Item to bring: <input data-answer='printed map'>."]}, {"id": "6-72", "level": "6", "number": 72, "title": "Art history lecture · Lesson 72", "type": "Matching", "instruction": "Complete the notes using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to art history lecture. The main session takes place on Tuesday at 7:10, and participants should meet at the seminar room. Ahmed Khan explains that the most important point is breakfast room, while gym is usually the detail people forget. The cost or reference given in the notice is £90, and everyone should bring a practice booklet. The final recommendation is to review swimming pool before leaving, because this helps avoid common mistakes.", "questionTitle": "Categories: A main session · B meeting point · C speaker · D required item · E cost/reference", "questions": ["Tuesday: <input data-answer='A'>.", "the seminar room: <input data-answer='B'>.", "Ahmed Khan: <input data-answer='C'>.", "practice booklet: <input data-answer='D'>.", "£90: <input data-answer='E'>."]}, {"id": "6-73", "level": "6", "number": 73, "title": "Medical research study · Lesson 73", "type": "Multiple choice", "instruction": "Complete the notes using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to medical research study. The main session takes place on Wednesday at 8:30, and participants should meet at Room 12. Emma Carter explains that the most important point is students, while librarian is usually the detail people forget. The cost or reference given in the notice is £12, and everyone should bring a feedback form. The final recommendation is to review quiet study rooms before leaving, because this helps avoid common mistakes.", "mcq": [{"q": "When does the main session take place?", "options": ["Sunday", "Wednesday", "Wednesday"], "answer": 1}, {"q": "Where should participants meet?", "options": ["the car park", "Room 12", "the cafeteria"], "answer": 1}, {"q": "Who gives the explanation?", "options": ["the receptionist", "a visitor", "Emma Carter"], "answer": 2}, {"q": "What should people bring?", "options": ["a laptop charger", "feedback form", "a lunch box"], "answer": 1}, {"q": "What should be reviewed before leaving?", "options": ["the building colour", "the weather", "quiet study rooms"], "answer": 2}]}, {"id": "6-74", "level": "6", "number": 74, "title": "Cafe staff training · Lesson 74", "type": "Short answer", "instruction": "Answer the questions using no more than three words and/or a number.", "transcript": "The speaker explains practical details and compares options related to cafe staff training. The main session takes place on Thursday at 9:15, and participants should meet at Hall B. Daniel Lewis explains that the most important point is visitors, while cloakroom is usually the detail people forget. The cost or reference given in the notice is £18, and everyone should bring a confirmation email. The final recommendation is to review exhibition rooms before leaving, because this helps avoid common mistakes.", "questions": ["What day is the session? <input data-answer='Thursday'>.", "What time does it begin? <input data-answer='9:15'>.", "Where do participants meet? <input data-answer='Hall B'>.", "Who explains the information? <input data-answer='Daniel Lewis'>.", "What item should people bring? <input data-answer='confirmation email'>."]}, {"id": "6-75", "level": "6", "number": 75, "title": "School open day · Lesson 75", "type": "Note completion", "instruction": "Complete the notes using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to school open day. The main session takes place on Friday at 10:45, and participants should meet at the main desk. Priya Shah explains that the most important point is commuters, while platform changes is usually the detail people forget. The cost or reference given in the notice is £24, and everyone should bring a student card. The final recommendation is to review ticket machines before leaving, because this helps avoid common mistakes.", "questions": ["The session takes place on <input data-answer='Friday'>.", "Participants should arrive at <input data-answer='10:45'>.", "The meeting point is <input data-answer='the main desk'>.", "The speaker is <input data-answer='Priya Shah'>.", "Everyone should bring a <input data-answer='student card'>."]}, {"id": "6-76", "level": "6", "number": 76, "title": "Digital photography lecture · Lesson 76", "type": "Plan labelling", "instruction": "Label the plan using no more than three words and/or a number.", "transcript": "The speaker explains practical details and compares options related to digital photography lecture. The main session takes place on Saturday at 11:20, and participants should meet at the north entrance. Oliver Grant explains that the most important point is residents, while compost is usually the detail people forget. The cost or reference given in the notice is £35, and everyone should bring a reference number. The final recommendation is to review watering rota before leaving, because this helps avoid common mistakes.", "questions": ["Entrance area: <input data-answer='the north entrance'>.", "Information desk contact: <input data-answer='Oliver Grant'>.", "Main time marker: <input data-answer='11:20'>.", "Required item: <input data-answer='reference number'>.", "Review point: <input data-answer='watering rota'>."]}, {"id": "6-77", "level": "6", "number": 77, "title": "Local bus complaint · Lesson 77", "type": "Classification", "instruction": "Complete the notes using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to local bus complaint. The main session takes place on Sunday at 2:30, and participants should meet at Studio 3. Nina Brooks explains that the most important point is receptionist, while patient form is usually the detail people forget. The cost or reference given in the notice is £45, and everyone should bring a safety briefing. The final recommendation is to review symptoms before leaving, because this helps avoid common mistakes.", "questionTitle": "A main issue · B forgotten detail · C final review · D required item · E cost/reference", "questions": ["receptionist: <input data-answer='A'>.", "patient form: <input data-answer='B'>.", "symptoms: <input data-answer='C'>.", "safety briefing: <input data-answer='D'>.", "£45: <input data-answer='E'>."]}, {"id": "6-78", "level": "6", "number": 78, "title": "Work-life balance talk · Lesson 78", "type": "Summary completion", "instruction": "Complete the notes using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to work-life balance talk. The main session takes place on Monday at 4:15, and participants should meet at Lab 4. James Miller explains that the most important point is halls, while shared flats is usually the detail people forget. The cost or reference given in the notice is £60, and everyone should bring a online account. The final recommendation is to review host families before leaving, because this helps avoid common mistakes.", "questions": ["The session takes place on <input data-answer='Monday'>.", "Participants should arrive at <input data-answer='4:15'>.", "The meeting point is <input data-answer='Lab 4'>.", "The speaker is <input data-answer='James Miller'>.", "Everyone should bring a <input data-answer='online account'>."]}, {"id": "6-79", "level": "6", "number": 79, "title": "Public speaking workshop · Lesson 79", "type": "Sentence completion", "instruction": "Complete the notes using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to public speaking workshop. The main session takes place on Tuesday at 6:40, and participants should meet at the visitor centre. Sofia Bennett explains that the most important point is urban trees, while heat islands is usually the detail people forget. The cost or reference given in the notice is £75, and everyone should bring a printed map. The final recommendation is to review pollution before leaving, because this helps avoid common mistakes.", "questions": ["The session takes place on <input data-answer='Tuesday'>.", "Participants should arrive at <input data-answer='6:40'>.", "The meeting point is <input data-answer='the visitor centre'>.", "The speaker is <input data-answer='Sofia Bennett'>.", "Everyone should bring a <input data-answer='printed map'>."]}, {"id": "6-80", "level": "6", "number": 80, "title": "Gardening radio show · Lesson 80", "type": "Form completion", "instruction": "Complete the form using no more than two words and/or a number.", "transcript": "The speaker explains practical details and compares options related to gardening radio show. The main session takes place on Wednesday at 7:10, and participants should meet at the seminar room. Ahmed Khan explains that the most important point is breakfast room, while gym is usually the detail people forget. The cost or reference given in the notice is £90, and everyone should bring a practice booklet. The final recommendation is to review swimming pool before leaving, because this helps avoid common mistakes.", "questions": ["Name: <input data-answer='Ahmed Khan'>.", "Day: <input data-answer='Wednesday'>.", "Time: <input data-answer='7:10'>.", "Location: <input data-answer='the seminar room'>.", "Document/item required: <input data-answer='practice booklet'>."]}, {"id": "7-1", "level": "7", "number": 1, "title": "Campus library orientation · Lesson 1", "type": "Multiple choice", "instruction": "Complete the task using no more than three words.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning campus library orientation. The main session takes place on Monday at 8:30, and participants should meet at Room 12. Emma Carter explains that the most important point is students, while librarian is usually the detail people forget. The cost or reference given in the notice is £12, and everyone should bring a feedback form. The final recommendation is to review quiet study rooms before leaving, because this helps avoid common mistakes. The speaker also notes that digital loans can affect the result if instructions are not followed carefully.", "mcq": [{"q": "When does the main session take place?", "options": ["Monday", "Wednesday", "Sunday"], "answer": 0}, {"q": "Where should participants meet?", "options": ["the cafeteria", "the car park", "Room 12"], "answer": 2}, {"q": "Who gives the explanation?", "options": ["the receptionist", "a visitor", "Emma Carter"], "answer": 2}, {"q": "What should people bring?", "options": ["a laptop charger", "a lunch box", "feedback form"], "answer": 2}, {"q": "What should be reviewed before leaving?", "options": ["the building colour", "the weather", "quiet study rooms"], "answer": 2}]}, {"id": "7-2", "level": "7", "number": 2, "title": "Museum volunteer briefing · Lesson 2", "type": "Short answer", "instruction": "Answer the questions using no more than three words and/or a number.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning museum volunteer briefing. The main session takes place on Tuesday at 9:15, and participants should meet at Hall B. Daniel Lewis explains that the most important point is visitors, while cloakroom is usually the detail people forget. The cost or reference given in the notice is £18, and everyone should bring a confirmation email. The final recommendation is to review exhibition rooms before leaving, because this helps avoid common mistakes. The speaker also notes that guided tour can affect the result if instructions are not followed carefully.", "questions": ["What day is the session? <input data-answer='Tuesday'>.", "What time does it begin? <input data-answer='9:15'>.", "Where do participants meet? <input data-answer='Hall B'>.", "Who explains the information? <input data-answer='Daniel Lewis'>.", "What item should people bring? <input data-answer='confirmation email'>."]}, {"id": "7-3", "level": "7", "number": 3, "title": "Urban transport update · Lesson 3", "type": "Note completion", "instruction": "Complete the task using no more than three words.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning urban transport update. The main session takes place on Wednesday at 10:45, and participants should meet at the main desk. Priya Shah explains that the most important point is commuters, while platform changes is usually the detail people forget. The cost or reference given in the notice is £24, and everyone should bring a student card. The final recommendation is to review ticket machines before leaving, because this helps avoid common mistakes. The speaker also notes that delays can affect the result if instructions are not followed carefully.", "questions": ["The session takes place on <input data-answer='Wednesday'>.", "Participants should arrive at <input data-answer='10:45'>.", "The meeting point is <input data-answer='the main desk'>.", "The speaker is <input data-answer='Priya Shah'>.", "Everyone should bring a <input data-answer='student card'>."]}, {"id": "7-4", "level": "7", "number": 4, "title": "Community garden project · Lesson 4", "type": "Plan labelling", "instruction": "Label the plan using no more than three words and/or a number.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning community garden project. The main session takes place on Thursday at 11:20, and participants should meet at the north entrance. Oliver Grant explains that the most important point is residents, while compost is usually the detail people forget. The cost or reference given in the notice is £35, and everyone should bring a reference number. The final recommendation is to review watering rota before leaving, because this helps avoid common mistakes. The speaker also notes that workshops can affect the result if instructions are not followed carefully.", "questions": ["Entrance area: <input data-answer='the north entrance'>.", "Information desk contact: <input data-answer='Oliver Grant'>.", "Main time marker: <input data-answer='11:20'>.", "Required item: <input data-answer='reference number'>.", "Review point: <input data-answer='watering rota'>."]}, {"id": "7-5", "level": "7", "number": 5, "title": "Health clinic appointment · Lesson 5", "type": "Classification", "instruction": "Complete the task using no more than three words.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning health clinic appointment. The main session takes place on Friday at 2:30, and participants should meet at Studio 3. Nina Brooks explains that the most important point is receptionist, while patient form is usually the detail people forget. The cost or reference given in the notice is £45, and everyone should bring a safety briefing. The final recommendation is to review symptoms before leaving, because this helps avoid common mistakes. The speaker also notes that appointment time can affect the result if instructions are not followed carefully.", "questionTitle": "A main issue · B forgotten detail · C final review · D required item · E cost/reference", "questions": ["receptionist: <input data-answer='A'>.", "patient form: <input data-answer='B'>.", "symptoms: <input data-answer='C'>.", "safety briefing: <input data-answer='D'>.", "£45: <input data-answer='E'>."]}, {"id": "7-6", "level": "7", "number": 6, "title": "University accommodation · Lesson 6", "type": "Summary completion", "instruction": "Complete the task using no more than three words.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning university accommodation. The main session takes place on Saturday at 4:15, and participants should meet at Lab 4. James Miller explains that the most important point is halls, while shared flats is usually the detail people forget. The cost or reference given in the notice is £60, and everyone should bring a online account. The final recommendation is to review host families before leaving, because this helps avoid common mistakes. The speaker also notes that deposits can affect the result if instructions are not followed carefully.", "questions": ["The session takes place on <input data-answer='Saturday'>.", "Participants should arrive at <input data-answer='4:15'>.", "The meeting point is <input data-answer='Lab 4'>.", "The speaker is <input data-answer='James Miller'>.", "Everyone should bring a <input data-answer='online account'>."]}, {"id": "7-7", "level": "7", "number": 7, "title": "Environmental science lecture · Lesson 7", "type": "Sentence completion", "instruction": "Complete the task using no more than three words.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning environmental science lecture. The main session takes place on Sunday at 6:40, and participants should meet at the visitor centre. Sofia Bennett explains that the most important point is urban trees, while heat islands is usually the detail people forget. The cost or reference given in the notice is £75, and everyone should bring a printed map. The final recommendation is to review pollution before leaving, because this helps avoid common mistakes. The speaker also notes that construction damage can affect the result if instructions are not followed carefully.", "questions": ["The session takes place on <input data-answer='Sunday'>.", "Participants should arrive at <input data-answer='6:40'>.", "The meeting point is <input data-answer='the visitor centre'>.", "The speaker is <input data-answer='Sofia Bennett'>.", "Everyone should bring a <input data-answer='printed map'>."]}, {"id": "7-8", "level": "7", "number": 8, "title": "Hotel facilities tour · Lesson 8", "type": "Form completion", "instruction": "Complete the form using no more than two words and/or a number.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning hotel facilities tour. The main session takes place on Monday at 7:10, and participants should meet at the seminar room. Ahmed Khan explains that the most important point is breakfast room, while gym is usually the detail people forget. The cost or reference given in the notice is £90, and everyone should bring a practice booklet. The final recommendation is to review swimming pool before leaving, because this helps avoid common mistakes. The speaker also notes that laundry can affect the result if instructions are not followed carefully.", "questions": ["Name: <input data-answer='Ahmed Khan'>.", "Day: <input data-answer='Monday'>.", "Time: <input data-answer='7:10'>.", "Location: <input data-answer='the seminar room'>.", "Document/item required: <input data-answer='practice booklet'>."]}, {"id": "7-9", "level": "7", "number": 9, "title": "Language exchange meeting · Lesson 9", "type": "Table completion", "instruction": "Complete the table using no more than two words and/or a number.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning language exchange meeting. The main session takes place on Tuesday at 8:30, and participants should meet at Room 12. Emma Carter explains that the most important point is students, while librarian is usually the detail people forget. The cost or reference given in the notice is £12, and everyone should bring a feedback form. The final recommendation is to review quiet study rooms before leaving, because this helps avoid common mistakes. The speaker also notes that digital loans can affect the result if instructions are not followed carefully.", "questions": ["Date/day: <input data-answer='Tuesday'>.", "Start time: <input data-answer='8:30'>.", "Meeting place: <input data-answer='Room 12'>.", "Person in charge: <input data-answer='Emma Carter'>.", "Item to bring: <input data-answer='feedback form'>."]}, {"id": "7-10", "level": "7", "number": 10, "title": "Technology repair desk · Lesson 10", "type": "Matching", "instruction": "Complete the task using no more than three words.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning technology repair desk. The main session takes place on Wednesday at 9:15, and participants should meet at Hall B. Daniel Lewis explains that the most important point is visitors, while cloakroom is usually the detail people forget. The cost or reference given in the notice is £18, and everyone should bring a confirmation email. The final recommendation is to review exhibition rooms before leaving, because this helps avoid common mistakes. The speaker also notes that guided tour can affect the result if instructions are not followed carefully.", "questionTitle": "Categories: A main session · B meeting point · C speaker · D required item · E cost/reference", "questions": ["Wednesday: <input data-answer='A'>.", "Hall B: <input data-answer='B'>.", "Daniel Lewis: <input data-answer='C'>.", "confirmation email: <input data-answer='D'>.", "£18: <input data-answer='E'>."]}, {"id": "7-11", "level": "7", "number": 11, "title": "Workplace induction · Lesson 11", "type": "Multiple choice", "instruction": "Complete the task using no more than three words.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning workplace induction. The main session takes place on Thursday at 10:45, and participants should meet at the main desk. Priya Shah explains that the most important point is commuters, while platform changes is usually the detail people forget. The cost or reference given in the notice is £24, and everyone should bring a student card. The final recommendation is to review ticket machines before leaving, because this helps avoid common mistakes. The speaker also notes that delays can affect the result if instructions are not followed carefully.", "mcq": [{"q": "When does the main session take place?", "options": ["Wednesday", "Sunday", "Thursday"], "answer": 2}, {"q": "Where should participants meet?", "options": ["the cafeteria", "the main desk", "the car park"], "answer": 1}, {"q": "Who gives the explanation?", "options": ["the receptionist", "a visitor", "Priya Shah"], "answer": 2}, {"q": "What should people bring?", "options": ["student card", "a lunch box", "a laptop charger"], "answer": 0}, {"q": "What should be reviewed before leaving?", "options": ["the weather", "the building colour", "ticket machines"], "answer": 2}]}, {"id": "7-12", "level": "7", "number": 12, "title": "Book club discussion · Lesson 12", "type": "Short answer", "instruction": "Answer the questions using no more than three words and/or a number.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning book club discussion. The main session takes place on Friday at 11:20, and participants should meet at the north entrance. Oliver Grant explains that the most important point is residents, while compost is usually the detail people forget. The cost or reference given in the notice is £35, and everyone should bring a reference number. The final recommendation is to review watering rota before leaving, because this helps avoid common mistakes. The speaker also notes that workshops can affect the result if instructions are not followed carefully.", "questions": ["What day is the session? <input data-answer='Friday'>.", "What time does it begin? <input data-answer='11:20'>.", "Where do participants meet? <input data-answer='the north entrance'>.", "Who explains the information? <input data-answer='Oliver Grant'>.", "What item should people bring? <input data-answer='reference number'>."]}, {"id": "7-13", "level": "7", "number": 13, "title": "Airport boarding notice · Lesson 13", "type": "Note completion", "instruction": "Complete the task using no more than three words.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning airport boarding notice. The main session takes place on Saturday at 2:30, and participants should meet at Studio 3. Nina Brooks explains that the most important point is receptionist, while patient form is usually the detail people forget. The cost or reference given in the notice is £45, and everyone should bring a safety briefing. The final recommendation is to review symptoms before leaving, because this helps avoid common mistakes. The speaker also notes that appointment time can affect the result if instructions are not followed carefully.", "questions": ["The session takes place on <input data-answer='Saturday'>.", "Participants should arrive at <input data-answer='2:30'>.", "The meeting point is <input data-answer='Studio 3'>.", "The speaker is <input data-answer='Nina Brooks'>.", "Everyone should bring a <input data-answer='safety briefing'>."]}, {"id": "7-14", "level": "7", "number": 14, "title": "Online course guidance · Lesson 14", "type": "Plan labelling", "instruction": "Label the plan using no more than three words and/or a number.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning online course guidance. The main session takes place on Sunday at 4:15, and participants should meet at Lab 4. James Miller explains that the most important point is halls, while shared flats is usually the detail people forget. The cost or reference given in the notice is £60, and everyone should bring a online account. The final recommendation is to review host families before leaving, because this helps avoid common mistakes. The speaker also notes that deposits can affect the result if instructions are not followed carefully.", "questions": ["Entrance area: <input data-answer='Lab 4'>.", "Information desk contact: <input data-answer='James Miller'>.", "Main time marker: <input data-answer='4:15'>.", "Required item: <input data-answer='online account'>.", "Review point: <input data-answer='host families'>."]}, {"id": "7-15", "level": "7", "number": 15, "title": "Sports centre launch · Lesson 15", "type": "Classification", "instruction": "Complete the task using no more than three words.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning sports centre launch. The main session takes place on Monday at 6:40, and participants should meet at the visitor centre. Sofia Bennett explains that the most important point is urban trees, while heat islands is usually the detail people forget. The cost or reference given in the notice is £75, and everyone should bring a printed map. The final recommendation is to review pollution before leaving, because this helps avoid common mistakes. The speaker also notes that construction damage can affect the result if instructions are not followed carefully.", "questionTitle": "A main issue · B forgotten detail · C final review · D required item · E cost/reference", "questions": ["urban trees: <input data-answer='A'>.", "heat islands: <input data-answer='B'>.", "pollution: <input data-answer='C'>.", "printed map: <input data-answer='D'>.", "£75: <input data-answer='E'>."]}, {"id": "7-16", "level": "7", "number": 16, "title": "Cinema booking call · Lesson 16", "type": "Summary completion", "instruction": "Complete the task using no more than three words.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning cinema booking call. The main session takes place on Tuesday at 7:10, and participants should meet at the seminar room. Ahmed Khan explains that the most important point is breakfast room, while gym is usually the detail people forget. The cost or reference given in the notice is £90, and everyone should bring a practice booklet. The final recommendation is to review swimming pool before leaving, because this helps avoid common mistakes. The speaker also notes that laundry can affect the result if instructions are not followed carefully.", "questions": ["The session takes place on <input data-answer='Tuesday'>.", "Participants should arrive at <input data-answer='7:10'>.", "The meeting point is <input data-answer='the seminar room'>.", "The speaker is <input data-answer='Ahmed Khan'>.", "Everyone should bring a <input data-answer='practice booklet'>."]}, {"id": "7-17", "level": "7", "number": 17, "title": "Podcast about sleep · Lesson 17", "type": "Sentence completion", "instruction": "Complete the task using no more than three words.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning podcast about sleep. The main session takes place on Wednesday at 8:30, and participants should meet at Room 12. Emma Carter explains that the most important point is students, while librarian is usually the detail people forget. The cost or reference given in the notice is £12, and everyone should bring a feedback form. The final recommendation is to review quiet study rooms before leaving, because this helps avoid common mistakes. The speaker also notes that digital loans can affect the result if instructions are not followed carefully.", "questions": ["The session takes place on <input data-answer='Wednesday'>.", "Participants should arrive at <input data-answer='8:30'>.", "The meeting point is <input data-answer='Room 12'>.", "The speaker is <input data-answer='Emma Carter'>.", "Everyone should bring a <input data-answer='feedback form'>."]}, {"id": "7-18", "level": "7", "number": 18, "title": "Bike rental office · Lesson 18", "type": "Form completion", "instruction": "Complete the form using no more than two words and/or a number.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning bike rental office. The main session takes place on Thursday at 9:15, and participants should meet at Hall B. Daniel Lewis explains that the most important point is visitors, while cloakroom is usually the detail people forget. The cost or reference given in the notice is £18, and everyone should bring a confirmation email. The final recommendation is to review exhibition rooms before leaving, because this helps avoid common mistakes. The speaker also notes that guided tour can affect the result if instructions are not followed carefully.", "questions": ["Name: <input data-answer='Daniel Lewis'>.", "Day: <input data-answer='Thursday'>.", "Time: <input data-answer='9:15'>.", "Location: <input data-answer='Hall B'>.", "Document/item required: <input data-answer='confirmation email'>."]}, {"id": "7-19", "level": "7", "number": 19, "title": "Art workshop registration · Lesson 19", "type": "Table completion", "instruction": "Complete the table using no more than two words and/or a number.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning art workshop registration. The main session takes place on Friday at 10:45, and participants should meet at the main desk. Priya Shah explains that the most important point is commuters, while platform changes is usually the detail people forget. The cost or reference given in the notice is £24, and everyone should bring a student card. The final recommendation is to review ticket machines before leaving, because this helps avoid common mistakes. The speaker also notes that delays can affect the result if instructions are not followed carefully.", "questions": ["Date/day: <input data-answer='Friday'>.", "Start time: <input data-answer='10:45'>.", "Meeting place: <input data-answer='the main desk'>.", "Person in charge: <input data-answer='Priya Shah'>.", "Item to bring: <input data-answer='student card'>."]}, {"id": "7-20", "level": "7", "number": 20, "title": "Local radio interview · Lesson 20", "type": "Matching", "instruction": "Complete the task using no more than three words.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning local radio interview. The main session takes place on Saturday at 11:20, and participants should meet at the north entrance. Oliver Grant explains that the most important point is residents, while compost is usually the detail people forget. The cost or reference given in the notice is £35, and everyone should bring a reference number. The final recommendation is to review watering rota before leaving, because this helps avoid common mistakes. The speaker also notes that workshops can affect the result if instructions are not followed carefully.", "questionTitle": "Categories: A main session · B meeting point · C speaker · D required item · E cost/reference", "questions": ["Saturday: <input data-answer='A'>.", "the north entrance: <input data-answer='B'>.", "Oliver Grant: <input data-answer='C'>.", "reference number: <input data-answer='D'>.", "£35: <input data-answer='E'>."]}, {"id": "7-21", "level": "7", "number": 21, "title": "Research seminar · Lesson 21", "type": "Multiple choice", "instruction": "Complete the task using no more than three words.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning research seminar. The main session takes place on Sunday at 2:30, and participants should meet at Studio 3. Nina Brooks explains that the most important point is receptionist, while patient form is usually the detail people forget. The cost or reference given in the notice is £45, and everyone should bring a safety briefing. The final recommendation is to review symptoms before leaving, because this helps avoid common mistakes. The speaker also notes that appointment time can affect the result if instructions are not followed carefully.", "mcq": [{"q": "When does the main session take place?", "options": ["Sunday", "Wednesday", "Sunday"], "answer": 0}, {"q": "Where should participants meet?", "options": ["Studio 3", "the car park", "the cafeteria"], "answer": 0}, {"q": "Who gives the explanation?", "options": ["a visitor", "Nina Brooks", "the receptionist"], "answer": 1}, {"q": "What should people bring?", "options": ["a laptop charger", "safety briefing", "a lunch box"], "answer": 1}, {"q": "What should be reviewed before leaving?", "options": ["the building colour", "the weather", "symptoms"], "answer": 2}]}, {"id": "7-22", "level": "7", "number": 22, "title": "History walking tour · Lesson 22", "type": "Short answer", "instruction": "Answer the questions using no more than three words and/or a number.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning history walking tour. The main session takes place on Monday at 4:15, and participants should meet at Lab 4. James Miller explains that the most important point is halls, while shared flats is usually the detail people forget. The cost or reference given in the notice is £60, and everyone should bring a online account. The final recommendation is to review host families before leaving, because this helps avoid common mistakes. The speaker also notes that deposits can affect the result if instructions are not followed carefully.", "questions": ["What day is the session? <input data-answer='Monday'>.", "What time does it begin? <input data-answer='4:15'>.", "Where do participants meet? <input data-answer='Lab 4'>.", "Who explains the information? <input data-answer='James Miller'>.", "What item should people bring? <input data-answer='online account'>."]}, {"id": "7-23", "level": "7", "number": 23, "title": "Fitness class information · Lesson 23", "type": "Note completion", "instruction": "Complete the task using no more than three words.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning fitness class information. The main session takes place on Tuesday at 6:40, and participants should meet at the visitor centre. Sofia Bennett explains that the most important point is urban trees, while heat islands is usually the detail people forget. The cost or reference given in the notice is £75, and everyone should bring a printed map. The final recommendation is to review pollution before leaving, because this helps avoid common mistakes. The speaker also notes that construction damage can affect the result if instructions are not followed carefully.", "questions": ["The session takes place on <input data-answer='Tuesday'>.", "Participants should arrive at <input data-answer='6:40'>.", "The meeting point is <input data-answer='the visitor centre'>.", "The speaker is <input data-answer='Sofia Bennett'>.", "Everyone should bring a <input data-answer='printed map'>."]}, {"id": "7-24", "level": "7", "number": 24, "title": "Customer support call · Lesson 24", "type": "Plan labelling", "instruction": "Label the plan using no more than three words and/or a number.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning customer support call. The main session takes place on Wednesday at 7:10, and participants should meet at the seminar room. Ahmed Khan explains that the most important point is breakfast room, while gym is usually the detail people forget. The cost or reference given in the notice is £90, and everyone should bring a practice booklet. The final recommendation is to review swimming pool before leaving, because this helps avoid common mistakes. The speaker also notes that laundry can affect the result if instructions are not followed carefully.", "questions": ["Entrance area: <input data-answer='the seminar room'>.", "Information desk contact: <input data-answer='Ahmed Khan'>.", "Main time marker: <input data-answer='7:10'>.", "Required item: <input data-answer='practice booklet'>.", "Review point: <input data-answer='swimming pool'>."]}, {"id": "7-25", "level": "7", "number": 25, "title": "Cooking course · Lesson 25", "type": "Classification", "instruction": "Complete the task using no more than three words.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning cooking course. The main session takes place on Thursday at 8:30, and participants should meet at Room 12. Emma Carter explains that the most important point is students, while librarian is usually the detail people forget. The cost or reference given in the notice is £12, and everyone should bring a feedback form. The final recommendation is to review quiet study rooms before leaving, because this helps avoid common mistakes. The speaker also notes that digital loans can affect the result if instructions are not followed carefully.", "questionTitle": "A main issue · B forgotten detail · C final review · D required item · E cost/reference", "questions": ["students: <input data-answer='A'>.", "librarian: <input data-answer='B'>.", "quiet study rooms: <input data-answer='C'>.", "feedback form: <input data-answer='D'>.", "£12: <input data-answer='E'>."]}, {"id": "7-26", "level": "7", "number": 26, "title": "Career fair announcement · Lesson 26", "type": "Summary completion", "instruction": "Complete the task using no more than three words.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning career fair announcement. The main session takes place on Friday at 9:15, and participants should meet at Hall B. Daniel Lewis explains that the most important point is visitors, while cloakroom is usually the detail people forget. The cost or reference given in the notice is £18, and everyone should bring a confirmation email. The final recommendation is to review exhibition rooms before leaving, because this helps avoid common mistakes. The speaker also notes that guided tour can affect the result if instructions are not followed carefully.", "questions": ["The session takes place on <input data-answer='Friday'>.", "Participants should arrive at <input data-answer='9:15'>.", "The meeting point is <input data-answer='Hall B'>.", "The speaker is <input data-answer='Daniel Lewis'>.", "Everyone should bring a <input data-answer='confirmation email'>."]}, {"id": "7-27", "level": "7", "number": 27, "title": "Housing inspection · Lesson 27", "type": "Sentence completion", "instruction": "Complete the task using no more than three words.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning housing inspection. The main session takes place on Saturday at 10:45, and participants should meet at the main desk. Priya Shah explains that the most important point is commuters, while platform changes is usually the detail people forget. The cost or reference given in the notice is £24, and everyone should bring a student card. The final recommendation is to review ticket machines before leaving, because this helps avoid common mistakes. The speaker also notes that delays can affect the result if instructions are not followed carefully.", "questions": ["The session takes place on <input data-answer='Saturday'>.", "Participants should arrive at <input data-answer='10:45'>.", "The meeting point is <input data-answer='the main desk'>.", "The speaker is <input data-answer='Priya Shah'>.", "Everyone should bring a <input data-answer='student card'>."]}, {"id": "7-28", "level": "7", "number": 28, "title": "Conference schedule · Lesson 28", "type": "Form completion", "instruction": "Complete the form using no more than two words and/or a number.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning conference schedule. The main session takes place on Sunday at 11:20, and participants should meet at the north entrance. Oliver Grant explains that the most important point is residents, while compost is usually the detail people forget. The cost or reference given in the notice is £35, and everyone should bring a reference number. The final recommendation is to review watering rota before leaving, because this helps avoid common mistakes. The speaker also notes that workshops can affect the result if instructions are not followed carefully.", "questions": ["Name: <input data-answer='Oliver Grant'>.", "Day: <input data-answer='Sunday'>.", "Time: <input data-answer='11:20'>.", "Location: <input data-answer='the north entrance'>.", "Document/item required: <input data-answer='reference number'>."]}, {"id": "7-29", "level": "7", "number": 29, "title": "Travel insurance enquiry · Lesson 29", "type": "Table completion", "instruction": "Complete the table using no more than two words and/or a number.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning travel insurance enquiry. The main session takes place on Monday at 2:30, and participants should meet at Studio 3. Nina Brooks explains that the most important point is receptionist, while patient form is usually the detail people forget. The cost or reference given in the notice is £45, and everyone should bring a safety briefing. The final recommendation is to review symptoms before leaving, because this helps avoid common mistakes. The speaker also notes that appointment time can affect the result if instructions are not followed carefully.", "questions": ["Date/day: <input data-answer='Monday'>.", "Start time: <input data-answer='2:30'>.", "Meeting place: <input data-answer='Studio 3'>.", "Person in charge: <input data-answer='Nina Brooks'>.", "Item to bring: <input data-answer='safety briefing'>."]}, {"id": "7-30", "level": "7", "number": 30, "title": "Science exhibition · Lesson 30", "type": "Matching", "instruction": "Complete the task using no more than three words.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning science exhibition. The main session takes place on Tuesday at 4:15, and participants should meet at Lab 4. James Miller explains that the most important point is halls, while shared flats is usually the detail people forget. The cost or reference given in the notice is £60, and everyone should bring a online account. The final recommendation is to review host families before leaving, because this helps avoid common mistakes. The speaker also notes that deposits can affect the result if instructions are not followed carefully.", "questionTitle": "Categories: A main session · B meeting point · C speaker · D required item · E cost/reference", "questions": ["Tuesday: <input data-answer='A'>.", "Lab 4: <input data-answer='B'>.", "James Miller: <input data-answer='C'>.", "online account: <input data-answer='D'>.", "£60: <input data-answer='E'>."]}, {"id": "7-31", "level": "7", "number": 31, "title": "Bank account application · Lesson 31", "type": "Multiple choice", "instruction": "Complete the task using no more than three words.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning bank account application. The main session takes place on Wednesday at 6:40, and participants should meet at the visitor centre. Sofia Bennett explains that the most important point is urban trees, while heat islands is usually the detail people forget. The cost or reference given in the notice is £75, and everyone should bring a printed map. The final recommendation is to review pollution before leaving, because this helps avoid common mistakes. The speaker also notes that construction damage can affect the result if instructions are not followed carefully.", "mcq": [{"q": "When does the main session take place?", "options": ["Wednesday", "Wednesday", "Sunday"], "answer": 0}, {"q": "Where should participants meet?", "options": ["the cafeteria", "the car park", "the visitor centre"], "answer": 2}, {"q": "Who gives the explanation?", "options": ["a visitor", "Sofia Bennett", "the receptionist"], "answer": 1}, {"q": "What should people bring?", "options": ["printed map", "a lunch box", "a laptop charger"], "answer": 0}, {"q": "What should be reviewed before leaving?", "options": ["the weather", "the building colour", "pollution"], "answer": 2}]}, {"id": "7-32", "level": "7", "number": 32, "title": "Restaurant booking · Lesson 32", "type": "Short answer", "instruction": "Answer the questions using no more than three words and/or a number.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning restaurant booking. The main session takes place on Thursday at 7:10, and participants should meet at the seminar room. Ahmed Khan explains that the most important point is breakfast room, while gym is usually the detail people forget. The cost or reference given in the notice is £90, and everyone should bring a practice booklet. The final recommendation is to review swimming pool before leaving, because this helps avoid common mistakes. The speaker also notes that laundry can affect the result if instructions are not followed carefully.", "questions": ["What day is the session? <input data-answer='Thursday'>.", "What time does it begin? <input data-answer='7:10'>.", "Where do participants meet? <input data-answer='the seminar room'>.", "Who explains the information? <input data-answer='Ahmed Khan'>.", "What item should people bring? <input data-answer='practice booklet'>."]}, {"id": "7-33", "level": "7", "number": 33, "title": "Recycling centre tour · Lesson 33", "type": "Note completion", "instruction": "Complete the task using no more than three words.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning recycling centre tour. The main session takes place on Friday at 8:30, and participants should meet at Room 12. Emma Carter explains that the most important point is students, while librarian is usually the detail people forget. The cost or reference given in the notice is £12, and everyone should bring a feedback form. The final recommendation is to review quiet study rooms before leaving, because this helps avoid common mistakes. The speaker also notes that digital loans can affect the result if instructions are not followed carefully.", "questions": ["The session takes place on <input data-answer='Friday'>.", "Participants should arrive at <input data-answer='8:30'>.", "The meeting point is <input data-answer='Room 12'>.", "The speaker is <input data-answer='Emma Carter'>.", "Everyone should bring a <input data-answer='feedback form'>."]}, {"id": "7-34", "level": "7", "number": 34, "title": "Theatre visit · Lesson 34", "type": "Plan labelling", "instruction": "Label the plan using no more than three words and/or a number.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning theatre visit. The main session takes place on Saturday at 9:15, and participants should meet at Hall B. Daniel Lewis explains that the most important point is visitors, while cloakroom is usually the detail people forget. The cost or reference given in the notice is £18, and everyone should bring a confirmation email. The final recommendation is to review exhibition rooms before leaving, because this helps avoid common mistakes. The speaker also notes that guided tour can affect the result if instructions are not followed carefully.", "questions": ["Entrance area: <input data-answer='Hall B'>.", "Information desk contact: <input data-answer='Daniel Lewis'>.", "Main time marker: <input data-answer='9:15'>.", "Required item: <input data-answer='confirmation email'>.", "Review point: <input data-answer='exhibition rooms'>."]}, {"id": "7-35", "level": "7", "number": 35, "title": "Photography club · Lesson 35", "type": "Classification", "instruction": "Complete the task using no more than three words.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning photography club. The main session takes place on Sunday at 10:45, and participants should meet at the main desk. Priya Shah explains that the most important point is commuters, while platform changes is usually the detail people forget. The cost or reference given in the notice is £24, and everyone should bring a student card. The final recommendation is to review ticket machines before leaving, because this helps avoid common mistakes. The speaker also notes that delays can affect the result if instructions are not followed carefully.", "questionTitle": "A main issue · B forgotten detail · C final review · D required item · E cost/reference", "questions": ["commuters: <input data-answer='A'>.", "platform changes: <input data-answer='B'>.", "ticket machines: <input data-answer='C'>.", "student card: <input data-answer='D'>.", "£24: <input data-answer='E'>."]}, {"id": "7-36", "level": "7", "number": 36, "title": "Public lecture on nutrition · Lesson 36", "type": "Summary completion", "instruction": "Complete the task using no more than three words.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning public lecture on nutrition. The main session takes place on Monday at 11:20, and participants should meet at the north entrance. Oliver Grant explains that the most important point is residents, while compost is usually the detail people forget. The cost or reference given in the notice is £35, and everyone should bring a reference number. The final recommendation is to review watering rota before leaving, because this helps avoid common mistakes. The speaker also notes that workshops can affect the result if instructions are not followed carefully.", "questions": ["The session takes place on <input data-answer='Monday'>.", "Participants should arrive at <input data-answer='11:20'>.", "The meeting point is <input data-answer='the north entrance'>.", "The speaker is <input data-answer='Oliver Grant'>.", "Everyone should bring a <input data-answer='reference number'>."]}, {"id": "7-37", "level": "7", "number": 37, "title": "Job training session · Lesson 37", "type": "Sentence completion", "instruction": "Complete the task using no more than three words.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning job training session. The main session takes place on Tuesday at 2:30, and participants should meet at Studio 3. Nina Brooks explains that the most important point is receptionist, while patient form is usually the detail people forget. The cost or reference given in the notice is £45, and everyone should bring a safety briefing. The final recommendation is to review symptoms before leaving, because this helps avoid common mistakes. The speaker also notes that appointment time can affect the result if instructions are not followed carefully.", "questions": ["The session takes place on <input data-answer='Tuesday'>.", "Participants should arrive at <input data-answer='2:30'>.", "The meeting point is <input data-answer='Studio 3'>.", "The speaker is <input data-answer='Nina Brooks'>.", "Everyone should bring a <input data-answer='safety briefing'>."]}, {"id": "7-38", "level": "7", "number": 38, "title": "Neighbourhood safety meeting · Lesson 38", "type": "Form completion", "instruction": "Complete the form using no more than two words and/or a number.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning neighbourhood safety meeting. The main session takes place on Wednesday at 4:15, and participants should meet at Lab 4. James Miller explains that the most important point is halls, while shared flats is usually the detail people forget. The cost or reference given in the notice is £60, and everyone should bring a online account. The final recommendation is to review host families before leaving, because this helps avoid common mistakes. The speaker also notes that deposits can affect the result if instructions are not followed carefully.", "questions": ["Name: <input data-answer='James Miller'>.", "Day: <input data-answer='Wednesday'>.", "Time: <input data-answer='4:15'>.", "Location: <input data-answer='Lab 4'>.", "Document/item required: <input data-answer='online account'>."]}, {"id": "7-39", "level": "7", "number": 39, "title": "Music festival planning · Lesson 39", "type": "Table completion", "instruction": "Complete the table using no more than two words and/or a number.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning music festival planning. The main session takes place on Thursday at 6:40, and participants should meet at the visitor centre. Sofia Bennett explains that the most important point is urban trees, while heat islands is usually the detail people forget. The cost or reference given in the notice is £75, and everyone should bring a printed map. The final recommendation is to review pollution before leaving, because this helps avoid common mistakes. The speaker also notes that construction damage can affect the result if instructions are not followed carefully.", "questions": ["Date/day: <input data-answer='Thursday'>.", "Start time: <input data-answer='6:40'>.", "Meeting place: <input data-answer='the visitor centre'>.", "Person in charge: <input data-answer='Sofia Bennett'>.", "Item to bring: <input data-answer='printed map'>."]}, {"id": "7-40", "level": "7", "number": 40, "title": "Dentist appointment · Lesson 40", "type": "Matching", "instruction": "Complete the task using no more than three words.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning dentist appointment. The main session takes place on Friday at 7:10, and participants should meet at the seminar room. Ahmed Khan explains that the most important point is breakfast room, while gym is usually the detail people forget. The cost or reference given in the notice is £90, and everyone should bring a practice booklet. The final recommendation is to review swimming pool before leaving, because this helps avoid common mistakes. The speaker also notes that laundry can affect the result if instructions are not followed carefully.", "questionTitle": "Categories: A main session · B meeting point · C speaker · D required item · E cost/reference", "questions": ["Friday: <input data-answer='A'>.", "the seminar room: <input data-answer='B'>.", "Ahmed Khan: <input data-answer='C'>.", "practice booklet: <input data-answer='D'>.", "£90: <input data-answer='E'>."]}, {"id": "7-41", "level": "7", "number": 41, "title": "Study abroad talk · Lesson 41", "type": "Multiple choice", "instruction": "Complete the task using no more than three words.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning study abroad talk. The main session takes place on Saturday at 8:30, and participants should meet at Room 12. Emma Carter explains that the most important point is students, while librarian is usually the detail people forget. The cost or reference given in the notice is £12, and everyone should bring a feedback form. The final recommendation is to review quiet study rooms before leaving, because this helps avoid common mistakes. The speaker also notes that digital loans can affect the result if instructions are not followed carefully.", "mcq": [{"q": "When does the main session take place?", "options": ["Sunday", "Saturday", "Wednesday"], "answer": 1}, {"q": "Where should participants meet?", "options": ["Room 12", "the car park", "the cafeteria"], "answer": 0}, {"q": "Who gives the explanation?", "options": ["a visitor", "Emma Carter", "the receptionist"], "answer": 1}, {"q": "What should people bring?", "options": ["feedback form", "a laptop charger", "a lunch box"], "answer": 0}, {"q": "What should be reviewed before leaving?", "options": ["the building colour", "the weather", "quiet study rooms"], "answer": 2}]}, {"id": "7-42", "level": "7", "number": 42, "title": "Weather warning · Lesson 42", "type": "Short answer", "instruction": "Answer the questions using no more than three words and/or a number.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning weather warning. The main session takes place on Sunday at 9:15, and participants should meet at Hall B. Daniel Lewis explains that the most important point is visitors, while cloakroom is usually the detail people forget. The cost or reference given in the notice is £18, and everyone should bring a confirmation email. The final recommendation is to review exhibition rooms before leaving, because this helps avoid common mistakes. The speaker also notes that guided tour can affect the result if instructions are not followed carefully.", "questions": ["What day is the session? <input data-answer='Sunday'>.", "What time does it begin? <input data-answer='9:15'>.", "Where do participants meet? <input data-answer='Hall B'>.", "Who explains the information? <input data-answer='Daniel Lewis'>.", "What item should people bring? <input data-answer='confirmation email'>."]}, {"id": "7-43", "level": "7", "number": 43, "title": "Business start-up advice · Lesson 43", "type": "Note completion", "instruction": "Complete the task using no more than three words.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning business start-up advice. The main session takes place on Monday at 10:45, and participants should meet at the main desk. Priya Shah explains that the most important point is commuters, while platform changes is usually the detail people forget. The cost or reference given in the notice is £24, and everyone should bring a student card. The final recommendation is to review ticket machines before leaving, because this helps avoid common mistakes. The speaker also notes that delays can affect the result if instructions are not followed carefully.", "questions": ["The session takes place on <input data-answer='Monday'>.", "Participants should arrive at <input data-answer='10:45'>.", "The meeting point is <input data-answer='the main desk'>.", "The speaker is <input data-answer='Priya Shah'>.", "Everyone should bring a <input data-answer='student card'>."]}, {"id": "7-44", "level": "7", "number": 44, "title": "University lab safety · Lesson 44", "type": "Plan labelling", "instruction": "Label the plan using no more than three words and/or a number.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning university lab safety. The main session takes place on Tuesday at 11:20, and participants should meet at the north entrance. Oliver Grant explains that the most important point is residents, while compost is usually the detail people forget. The cost or reference given in the notice is £35, and everyone should bring a reference number. The final recommendation is to review watering rota before leaving, because this helps avoid common mistakes. The speaker also notes that workshops can affect the result if instructions are not followed carefully.", "questions": ["Entrance area: <input data-answer='the north entrance'>.", "Information desk contact: <input data-answer='Oliver Grant'>.", "Main time marker: <input data-answer='11:20'>.", "Required item: <input data-answer='reference number'>.", "Review point: <input data-answer='watering rota'>."]}, {"id": "7-45", "level": "7", "number": 45, "title": "Apartment viewing · Lesson 45", "type": "Classification", "instruction": "Complete the task using no more than three words.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning apartment viewing. The main session takes place on Wednesday at 2:30, and participants should meet at Studio 3. Nina Brooks explains that the most important point is receptionist, while patient form is usually the detail people forget. The cost or reference given in the notice is £45, and everyone should bring a safety briefing. The final recommendation is to review symptoms before leaving, because this helps avoid common mistakes. The speaker also notes that appointment time can affect the result if instructions are not followed carefully.", "questionTitle": "A main issue · B forgotten detail · C final review · D required item · E cost/reference", "questions": ["receptionist: <input data-answer='A'>.", "patient form: <input data-answer='B'>.", "symptoms: <input data-answer='C'>.", "safety briefing: <input data-answer='D'>.", "£45: <input data-answer='E'>."]}, {"id": "7-46", "level": "7", "number": 46, "title": "Charity fundraising · Lesson 46", "type": "Summary completion", "instruction": "Complete the task using no more than three words.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning charity fundraising. The main session takes place on Thursday at 4:15, and participants should meet at Lab 4. James Miller explains that the most important point is halls, while shared flats is usually the detail people forget. The cost or reference given in the notice is £60, and everyone should bring a online account. The final recommendation is to review host families before leaving, because this helps avoid common mistakes. The speaker also notes that deposits can affect the result if instructions are not followed carefully.", "questions": ["The session takes place on <input data-answer='Thursday'>.", "Participants should arrive at <input data-answer='4:15'>.", "The meeting point is <input data-answer='Lab 4'>.", "The speaker is <input data-answer='James Miller'>.", "Everyone should bring a <input data-answer='online account'>."]}, {"id": "7-47", "level": "7", "number": 47, "title": "Dentist hygiene lecture · Lesson 47", "type": "Sentence completion", "instruction": "Complete the task using no more than three words.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning dentist hygiene lecture. The main session takes place on Friday at 6:40, and participants should meet at the visitor centre. Sofia Bennett explains that the most important point is urban trees, while heat islands is usually the detail people forget. The cost or reference given in the notice is £75, and everyone should bring a printed map. The final recommendation is to review pollution before leaving, because this helps avoid common mistakes. The speaker also notes that construction damage can affect the result if instructions are not followed carefully.", "questions": ["The session takes place on <input data-answer='Friday'>.", "Participants should arrive at <input data-answer='6:40'>.", "The meeting point is <input data-answer='the visitor centre'>.", "The speaker is <input data-answer='Sofia Bennett'>.", "Everyone should bring a <input data-answer='printed map'>."]}, {"id": "7-48", "level": "7", "number": 48, "title": "Farmers market · Lesson 48", "type": "Form completion", "instruction": "Complete the form using no more than two words and/or a number.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning farmers market. The main session takes place on Saturday at 7:10, and participants should meet at the seminar room. Ahmed Khan explains that the most important point is breakfast room, while gym is usually the detail people forget. The cost or reference given in the notice is £90, and everyone should bring a practice booklet. The final recommendation is to review swimming pool before leaving, because this helps avoid common mistakes. The speaker also notes that laundry can affect the result if instructions are not followed carefully.", "questions": ["Name: <input data-answer='Ahmed Khan'>.", "Day: <input data-answer='Saturday'>.", "Time: <input data-answer='7:10'>.", "Location: <input data-answer='the seminar room'>.", "Document/item required: <input data-answer='practice booklet'>."]}, {"id": "7-49", "level": "7", "number": 49, "title": "Mobile app tutorial · Lesson 49", "type": "Table completion", "instruction": "Complete the table using no more than two words and/or a number.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning mobile app tutorial. The main session takes place on Sunday at 8:30, and participants should meet at Room 12. Emma Carter explains that the most important point is students, while librarian is usually the detail people forget. The cost or reference given in the notice is £12, and everyone should bring a feedback form. The final recommendation is to review quiet study rooms before leaving, because this helps avoid common mistakes. The speaker also notes that digital loans can affect the result if instructions are not followed carefully.", "questions": ["Date/day: <input data-answer='Sunday'>.", "Start time: <input data-answer='8:30'>.", "Meeting place: <input data-answer='Room 12'>.", "Person in charge: <input data-answer='Emma Carter'>.", "Item to bring: <input data-answer='feedback form'>."]}, {"id": "7-50", "level": "7", "number": 50, "title": "Public park consultation · Lesson 50", "type": "Matching", "instruction": "Complete the task using no more than three words.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning public park consultation. The main session takes place on Monday at 9:15, and participants should meet at Hall B. Daniel Lewis explains that the most important point is visitors, while cloakroom is usually the detail people forget. The cost or reference given in the notice is £18, and everyone should bring a confirmation email. The final recommendation is to review exhibition rooms before leaving, because this helps avoid common mistakes. The speaker also notes that guided tour can affect the result if instructions are not followed carefully.", "questionTitle": "Categories: A main session · B meeting point · C speaker · D required item · E cost/reference", "questions": ["Monday: <input data-answer='A'>.", "Hall B: <input data-answer='B'>.", "Daniel Lewis: <input data-answer='C'>.", "confirmation email: <input data-answer='D'>.", "£18: <input data-answer='E'>."]}, {"id": "7-51", "level": "7", "number": 51, "title": "Wildlife conservation talk · Lesson 51", "type": "Multiple choice", "instruction": "Complete the task using no more than three words.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning wildlife conservation talk. The main session takes place on Tuesday at 10:45, and participants should meet at the main desk. Priya Shah explains that the most important point is commuters, while platform changes is usually the detail people forget. The cost or reference given in the notice is £24, and everyone should bring a student card. The final recommendation is to review ticket machines before leaving, because this helps avoid common mistakes. The speaker also notes that delays can affect the result if instructions are not followed carefully.", "mcq": [{"q": "When does the main session take place?", "options": ["Sunday", "Tuesday", "Wednesday"], "answer": 1}, {"q": "Where should participants meet?", "options": ["the car park", "the main desk", "the cafeteria"], "answer": 1}, {"q": "Who gives the explanation?", "options": ["Priya Shah", "a visitor", "the receptionist"], "answer": 0}, {"q": "What should people bring?", "options": ["a laptop charger", "student card", "a lunch box"], "answer": 1}, {"q": "What should be reviewed before leaving?", "options": ["the building colour", "ticket machines", "the weather"], "answer": 1}]}, {"id": "7-52", "level": "7", "number": 52, "title": "Drama class · Lesson 52", "type": "Short answer", "instruction": "Answer the questions using no more than three words and/or a number.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning drama class. The main session takes place on Wednesday at 11:20, and participants should meet at the north entrance. Oliver Grant explains that the most important point is residents, while compost is usually the detail people forget. The cost or reference given in the notice is £35, and everyone should bring a reference number. The final recommendation is to review watering rota before leaving, because this helps avoid common mistakes. The speaker also notes that workshops can affect the result if instructions are not followed carefully.", "questions": ["What day is the session? <input data-answer='Wednesday'>.", "What time does it begin? <input data-answer='11:20'>.", "Where do participants meet? <input data-answer='the north entrance'>.", "Who explains the information? <input data-answer='Oliver Grant'>.", "What item should people bring? <input data-answer='reference number'>."]}, {"id": "7-53", "level": "7", "number": 53, "title": "Train station renovation · Lesson 53", "type": "Note completion", "instruction": "Complete the task using no more than three words.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning train station renovation. The main session takes place on Thursday at 2:30, and participants should meet at Studio 3. Nina Brooks explains that the most important point is receptionist, while patient form is usually the detail people forget. The cost or reference given in the notice is £45, and everyone should bring a safety briefing. The final recommendation is to review symptoms before leaving, because this helps avoid common mistakes. The speaker also notes that appointment time can affect the result if instructions are not followed carefully.", "questions": ["The session takes place on <input data-answer='Thursday'>.", "Participants should arrive at <input data-answer='2:30'>.", "The meeting point is <input data-answer='Studio 3'>.", "The speaker is <input data-answer='Nina Brooks'>.", "Everyone should bring a <input data-answer='safety briefing'>."]}, {"id": "7-54", "level": "7", "number": 54, "title": "Small business podcast · Lesson 54", "type": "Plan labelling", "instruction": "Label the plan using no more than three words and/or a number.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning small business podcast. The main session takes place on Friday at 4:15, and participants should meet at Lab 4. James Miller explains that the most important point is halls, while shared flats is usually the detail people forget. The cost or reference given in the notice is £60, and everyone should bring a online account. The final recommendation is to review host families before leaving, because this helps avoid common mistakes. The speaker also notes that deposits can affect the result if instructions are not followed carefully.", "questions": ["Entrance area: <input data-answer='Lab 4'>.", "Information desk contact: <input data-answer='James Miller'>.", "Main time marker: <input data-answer='4:15'>.", "Required item: <input data-answer='online account'>.", "Review point: <input data-answer='host families'>."]}, {"id": "7-55", "level": "7", "number": 55, "title": "Emergency first aid course · Lesson 55", "type": "Classification", "instruction": "Complete the task using no more than three words.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning emergency first aid course. The main session takes place on Saturday at 6:40, and participants should meet at the visitor centre. Sofia Bennett explains that the most important point is urban trees, while heat islands is usually the detail people forget. The cost or reference given in the notice is £75, and everyone should bring a printed map. The final recommendation is to review pollution before leaving, because this helps avoid common mistakes. The speaker also notes that construction damage can affect the result if instructions are not followed carefully.", "questionTitle": "A main issue · B forgotten detail · C final review · D required item · E cost/reference", "questions": ["urban trees: <input data-answer='A'>.", "heat islands: <input data-answer='B'>.", "pollution: <input data-answer='C'>.", "printed map: <input data-answer='D'>.", "£75: <input data-answer='E'>."]}, {"id": "7-56", "level": "7", "number": 56, "title": "City art gallery · Lesson 56", "type": "Summary completion", "instruction": "Complete the task using no more than three words.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning city art gallery. The main session takes place on Sunday at 7:10, and participants should meet at the seminar room. Ahmed Khan explains that the most important point is breakfast room, while gym is usually the detail people forget. The cost or reference given in the notice is £90, and everyone should bring a practice booklet. The final recommendation is to review swimming pool before leaving, because this helps avoid common mistakes. The speaker also notes that laundry can affect the result if instructions are not followed carefully.", "questions": ["The session takes place on <input data-answer='Sunday'>.", "Participants should arrive at <input data-answer='7:10'>.", "The meeting point is <input data-answer='the seminar room'>.", "The speaker is <input data-answer='Ahmed Khan'>.", "Everyone should bring a <input data-answer='practice booklet'>."]}, {"id": "7-57", "level": "7", "number": 57, "title": "University counselling service · Lesson 57", "type": "Sentence completion", "instruction": "Complete the task using no more than three words.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning university counselling service. The main session takes place on Monday at 8:30, and participants should meet at Room 12. Emma Carter explains that the most important point is students, while librarian is usually the detail people forget. The cost or reference given in the notice is £12, and everyone should bring a feedback form. The final recommendation is to review quiet study rooms before leaving, because this helps avoid common mistakes. The speaker also notes that digital loans can affect the result if instructions are not followed carefully.", "questions": ["The session takes place on <input data-answer='Monday'>.", "Participants should arrive at <input data-answer='8:30'>.", "The meeting point is <input data-answer='Room 12'>.", "The speaker is <input data-answer='Emma Carter'>.", "Everyone should bring a <input data-answer='feedback form'>."]}, {"id": "7-58", "level": "7", "number": 58, "title": "Cycling safety talk · Lesson 58", "type": "Form completion", "instruction": "Complete the form using no more than two words and/or a number.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning cycling safety talk. The main session takes place on Tuesday at 9:15, and participants should meet at Hall B. Daniel Lewis explains that the most important point is visitors, while cloakroom is usually the detail people forget. The cost or reference given in the notice is £18, and everyone should bring a confirmation email. The final recommendation is to review exhibition rooms before leaving, because this helps avoid common mistakes. The speaker also notes that guided tour can affect the result if instructions are not followed carefully.", "questions": ["Name: <input data-answer='Daniel Lewis'>.", "Day: <input data-answer='Tuesday'>.", "Time: <input data-answer='9:15'>.", "Location: <input data-answer='Hall B'>.", "Document/item required: <input data-answer='confirmation email'>."]}, {"id": "7-59", "level": "7", "number": 59, "title": "Local history archive · Lesson 59", "type": "Table completion", "instruction": "Complete the table using no more than two words and/or a number.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning local history archive. The main session takes place on Wednesday at 10:45, and participants should meet at the main desk. Priya Shah explains that the most important point is commuters, while platform changes is usually the detail people forget. The cost or reference given in the notice is £24, and everyone should bring a student card. The final recommendation is to review ticket machines before leaving, because this helps avoid common mistakes. The speaker also notes that delays can affect the result if instructions are not followed carefully.", "questions": ["Date/day: <input data-answer='Wednesday'>.", "Start time: <input data-answer='10:45'>.", "Meeting place: <input data-answer='the main desk'>.", "Person in charge: <input data-answer='Priya Shah'>.", "Item to bring: <input data-answer='student card'>."]}, {"id": "7-60", "level": "7", "number": 60, "title": "Cooking competition · Lesson 60", "type": "Matching", "instruction": "Complete the task using no more than three words.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning cooking competition. The main session takes place on Thursday at 11:20, and participants should meet at the north entrance. Oliver Grant explains that the most important point is residents, while compost is usually the detail people forget. The cost or reference given in the notice is £35, and everyone should bring a reference number. The final recommendation is to review watering rota before leaving, because this helps avoid common mistakes. The speaker also notes that workshops can affect the result if instructions are not followed carefully.", "questionTitle": "Categories: A main session · B meeting point · C speaker · D required item · E cost/reference", "questions": ["Thursday: <input data-answer='A'>.", "the north entrance: <input data-answer='B'>.", "Oliver Grant: <input data-answer='C'>.", "reference number: <input data-answer='D'>.", "£35: <input data-answer='E'>."]}, {"id": "7-61", "level": "7", "number": 61, "title": "Nature reserve visit · Lesson 61", "type": "Multiple choice", "instruction": "Complete the task using no more than three words.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning nature reserve visit. The main session takes place on Friday at 2:30, and participants should meet at Studio 3. Nina Brooks explains that the most important point is receptionist, while patient form is usually the detail people forget. The cost or reference given in the notice is £45, and everyone should bring a safety briefing. The final recommendation is to review symptoms before leaving, because this helps avoid common mistakes. The speaker also notes that appointment time can affect the result if instructions are not followed carefully.", "mcq": [{"q": "When does the main session take place?", "options": ["Sunday", "Friday", "Wednesday"], "answer": 1}, {"q": "Where should participants meet?", "options": ["the car park", "Studio 3", "the cafeteria"], "answer": 1}, {"q": "Who gives the explanation?", "options": ["a visitor", "Nina Brooks", "the receptionist"], "answer": 1}, {"q": "What should people bring?", "options": ["a lunch box", "safety briefing", "a laptop charger"], "answer": 1}, {"q": "What should be reviewed before leaving?", "options": ["the building colour", "the weather", "symptoms"], "answer": 2}]}, {"id": "7-62", "level": "7", "number": 62, "title": "Podcast production class · Lesson 62", "type": "Short answer", "instruction": "Answer the questions using no more than three words and/or a number.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning podcast production class. The main session takes place on Saturday at 4:15, and participants should meet at Lab 4. James Miller explains that the most important point is halls, while shared flats is usually the detail people forget. The cost or reference given in the notice is £60, and everyone should bring a online account. The final recommendation is to review host families before leaving, because this helps avoid common mistakes. The speaker also notes that deposits can affect the result if instructions are not followed carefully.", "questions": ["What day is the session? <input data-answer='Saturday'>.", "What time does it begin? <input data-answer='4:15'>.", "Where do participants meet? <input data-answer='Lab 4'>.", "Who explains the information? <input data-answer='James Miller'>.", "What item should people bring? <input data-answer='online account'>."]}, {"id": "7-63", "level": "7", "number": 63, "title": "Community theatre audition · Lesson 63", "type": "Note completion", "instruction": "Complete the task using no more than three words.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning community theatre audition. The main session takes place on Sunday at 6:40, and participants should meet at the visitor centre. Sofia Bennett explains that the most important point is urban trees, while heat islands is usually the detail people forget. The cost or reference given in the notice is £75, and everyone should bring a printed map. The final recommendation is to review pollution before leaving, because this helps avoid common mistakes. The speaker also notes that construction damage can affect the result if instructions are not followed carefully.", "questions": ["The session takes place on <input data-answer='Sunday'>.", "Participants should arrive at <input data-answer='6:40'>.", "The meeting point is <input data-answer='the visitor centre'>.", "The speaker is <input data-answer='Sofia Bennett'>.", "Everyone should bring a <input data-answer='printed map'>."]}, {"id": "7-64", "level": "7", "number": 64, "title": "Online banking security · Lesson 64", "type": "Plan labelling", "instruction": "Label the plan using no more than three words and/or a number.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning online banking security. The main session takes place on Monday at 7:10, and participants should meet at the seminar room. Ahmed Khan explains that the most important point is breakfast room, while gym is usually the detail people forget. The cost or reference given in the notice is £90, and everyone should bring a practice booklet. The final recommendation is to review swimming pool before leaving, because this helps avoid common mistakes. The speaker also notes that laundry can affect the result if instructions are not followed carefully.", "questions": ["Entrance area: <input data-answer='the seminar room'>.", "Information desk contact: <input data-answer='Ahmed Khan'>.", "Main time marker: <input data-answer='7:10'>.", "Required item: <input data-answer='practice booklet'>.", "Review point: <input data-answer='swimming pool'>."]}, {"id": "7-65", "level": "7", "number": 65, "title": "Road safety campaign · Lesson 65", "type": "Classification", "instruction": "Complete the task using no more than three words.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning road safety campaign. The main session takes place on Tuesday at 8:30, and participants should meet at Room 12. Emma Carter explains that the most important point is students, while librarian is usually the detail people forget. The cost or reference given in the notice is £12, and everyone should bring a feedback form. The final recommendation is to review quiet study rooms before leaving, because this helps avoid common mistakes. The speaker also notes that digital loans can affect the result if instructions are not followed carefully.", "questionTitle": "A main issue · B forgotten detail · C final review · D required item · E cost/reference", "questions": ["students: <input data-answer='A'>.", "librarian: <input data-answer='B'>.", "quiet study rooms: <input data-answer='C'>.", "feedback form: <input data-answer='D'>.", "£12: <input data-answer='E'>."]}, {"id": "7-66", "level": "7", "number": 66, "title": "Language school enrolment · Lesson 66", "type": "Summary completion", "instruction": "Complete the task using no more than three words.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning language school enrolment. The main session takes place on Wednesday at 9:15, and participants should meet at Hall B. Daniel Lewis explains that the most important point is visitors, while cloakroom is usually the detail people forget. The cost or reference given in the notice is £18, and everyone should bring a confirmation email. The final recommendation is to review exhibition rooms before leaving, because this helps avoid common mistakes. The speaker also notes that guided tour can affect the result if instructions are not followed carefully.", "questions": ["The session takes place on <input data-answer='Wednesday'>.", "Participants should arrive at <input data-answer='9:15'>.", "The meeting point is <input data-answer='Hall B'>.", "The speaker is <input data-answer='Daniel Lewis'>.", "Everyone should bring a <input data-answer='confirmation email'>."]}, {"id": "7-67", "level": "7", "number": 67, "title": "Local swimming pool · Lesson 67", "type": "Sentence completion", "instruction": "Complete the task using no more than three words.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning local swimming pool. The main session takes place on Thursday at 10:45, and participants should meet at the main desk. Priya Shah explains that the most important point is commuters, while platform changes is usually the detail people forget. The cost or reference given in the notice is £24, and everyone should bring a student card. The final recommendation is to review ticket machines before leaving, because this helps avoid common mistakes. The speaker also notes that delays can affect the result if instructions are not followed carefully.", "questions": ["The session takes place on <input data-answer='Thursday'>.", "Participants should arrive at <input data-answer='10:45'>.", "The meeting point is <input data-answer='the main desk'>.", "The speaker is <input data-answer='Priya Shah'>.", "Everyone should bring a <input data-answer='student card'>."]}, {"id": "7-68", "level": "7", "number": 68, "title": "Library research skills · Lesson 68", "type": "Form completion", "instruction": "Complete the form using no more than two words and/or a number.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning library research skills. The main session takes place on Friday at 11:20, and participants should meet at the north entrance. Oliver Grant explains that the most important point is residents, while compost is usually the detail people forget. The cost or reference given in the notice is £35, and everyone should bring a reference number. The final recommendation is to review watering rota before leaving, because this helps avoid common mistakes. The speaker also notes that workshops can affect the result if instructions are not followed carefully.", "questions": ["Name: <input data-answer='Oliver Grant'>.", "Day: <input data-answer='Friday'>.", "Time: <input data-answer='11:20'>.", "Location: <input data-answer='the north entrance'>.", "Document/item required: <input data-answer='reference number'>."]}, {"id": "7-69", "level": "7", "number": 69, "title": "Animal shelter volunteering · Lesson 69", "type": "Table completion", "instruction": "Complete the table using no more than two words and/or a number.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning animal shelter volunteering. The main session takes place on Saturday at 2:30, and participants should meet at Studio 3. Nina Brooks explains that the most important point is receptionist, while patient form is usually the detail people forget. The cost or reference given in the notice is £45, and everyone should bring a safety briefing. The final recommendation is to review symptoms before leaving, because this helps avoid common mistakes. The speaker also notes that appointment time can affect the result if instructions are not followed carefully.", "questions": ["Date/day: <input data-answer='Saturday'>.", "Start time: <input data-answer='2:30'>.", "Meeting place: <input data-answer='Studio 3'>.", "Person in charge: <input data-answer='Nina Brooks'>.", "Item to bring: <input data-answer='safety briefing'>."]}, {"id": "7-70", "level": "7", "number": 70, "title": "City council recycling · Lesson 70", "type": "Matching", "instruction": "Complete the task using no more than three words.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning city council recycling. The main session takes place on Sunday at 4:15, and participants should meet at Lab 4. James Miller explains that the most important point is halls, while shared flats is usually the detail people forget. The cost or reference given in the notice is £60, and everyone should bring a online account. The final recommendation is to review host families before leaving, because this helps avoid common mistakes. The speaker also notes that deposits can affect the result if instructions are not followed carefully.", "questionTitle": "Categories: A main session · B meeting point · C speaker · D required item · E cost/reference", "questions": ["Sunday: <input data-answer='A'>.", "Lab 4: <input data-answer='B'>.", "James Miller: <input data-answer='C'>.", "online account: <input data-answer='D'>.", "£60: <input data-answer='E'>."]}, {"id": "7-71", "level": "7", "number": 71, "title": "University sports team · Lesson 71", "type": "Multiple choice", "instruction": "Complete the task using no more than three words.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning university sports team. The main session takes place on Monday at 6:40, and participants should meet at the visitor centre. Sofia Bennett explains that the most important point is urban trees, while heat islands is usually the detail people forget. The cost or reference given in the notice is £75, and everyone should bring a printed map. The final recommendation is to review pollution before leaving, because this helps avoid common mistakes. The speaker also notes that construction damage can affect the result if instructions are not followed carefully.", "mcq": [{"q": "When does the main session take place?", "options": ["Monday", "Wednesday", "Sunday"], "answer": 0}, {"q": "Where should participants meet?", "options": ["the cafeteria", "the car park", "the visitor centre"], "answer": 2}, {"q": "Who gives the explanation?", "options": ["the receptionist", "Sofia Bennett", "a visitor"], "answer": 1}, {"q": "What should people bring?", "options": ["printed map", "a laptop charger", "a lunch box"], "answer": 0}, {"q": "What should be reviewed before leaving?", "options": ["the building colour", "the weather", "pollution"], "answer": 2}]}, {"id": "7-72", "level": "7", "number": 72, "title": "Art history lecture · Lesson 72", "type": "Short answer", "instruction": "Answer the questions using no more than three words and/or a number.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning art history lecture. The main session takes place on Tuesday at 7:10, and participants should meet at the seminar room. Ahmed Khan explains that the most important point is breakfast room, while gym is usually the detail people forget. The cost or reference given in the notice is £90, and everyone should bring a practice booklet. The final recommendation is to review swimming pool before leaving, because this helps avoid common mistakes. The speaker also notes that laundry can affect the result if instructions are not followed carefully.", "questions": ["What day is the session? <input data-answer='Tuesday'>.", "What time does it begin? <input data-answer='7:10'>.", "Where do participants meet? <input data-answer='the seminar room'>.", "Who explains the information? <input data-answer='Ahmed Khan'>.", "What item should people bring? <input data-answer='practice booklet'>."]}, {"id": "7-73", "level": "7", "number": 73, "title": "Medical research study · Lesson 73", "type": "Note completion", "instruction": "Complete the task using no more than three words.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning medical research study. The main session takes place on Wednesday at 8:30, and participants should meet at Room 12. Emma Carter explains that the most important point is students, while librarian is usually the detail people forget. The cost or reference given in the notice is £12, and everyone should bring a feedback form. The final recommendation is to review quiet study rooms before leaving, because this helps avoid common mistakes. The speaker also notes that digital loans can affect the result if instructions are not followed carefully.", "questions": ["The session takes place on <input data-answer='Wednesday'>.", "Participants should arrive at <input data-answer='8:30'>.", "The meeting point is <input data-answer='Room 12'>.", "The speaker is <input data-answer='Emma Carter'>.", "Everyone should bring a <input data-answer='feedback form'>."]}, {"id": "7-74", "level": "7", "number": 74, "title": "Cafe staff training · Lesson 74", "type": "Plan labelling", "instruction": "Label the plan using no more than three words and/or a number.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning cafe staff training. The main session takes place on Thursday at 9:15, and participants should meet at Hall B. Daniel Lewis explains that the most important point is visitors, while cloakroom is usually the detail people forget. The cost or reference given in the notice is £18, and everyone should bring a confirmation email. The final recommendation is to review exhibition rooms before leaving, because this helps avoid common mistakes. The speaker also notes that guided tour can affect the result if instructions are not followed carefully.", "questions": ["Entrance area: <input data-answer='Hall B'>.", "Information desk contact: <input data-answer='Daniel Lewis'>.", "Main time marker: <input data-answer='9:15'>.", "Required item: <input data-answer='confirmation email'>.", "Review point: <input data-answer='exhibition rooms'>."]}, {"id": "7-75", "level": "7", "number": 75, "title": "School open day · Lesson 75", "type": "Classification", "instruction": "Complete the task using no more than three words.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning school open day. The main session takes place on Friday at 10:45, and participants should meet at the main desk. Priya Shah explains that the most important point is commuters, while platform changes is usually the detail people forget. The cost or reference given in the notice is £24, and everyone should bring a student card. The final recommendation is to review ticket machines before leaving, because this helps avoid common mistakes. The speaker also notes that delays can affect the result if instructions are not followed carefully.", "questionTitle": "A main issue · B forgotten detail · C final review · D required item · E cost/reference", "questions": ["commuters: <input data-answer='A'>.", "platform changes: <input data-answer='B'>.", "ticket machines: <input data-answer='C'>.", "student card: <input data-answer='D'>.", "£24: <input data-answer='E'>."]}, {"id": "7-76", "level": "7", "number": 76, "title": "Digital photography lecture · Lesson 76", "type": "Summary completion", "instruction": "Complete the task using no more than three words.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning digital photography lecture. The main session takes place on Saturday at 11:20, and participants should meet at the north entrance. Oliver Grant explains that the most important point is residents, while compost is usually the detail people forget. The cost or reference given in the notice is £35, and everyone should bring a reference number. The final recommendation is to review watering rota before leaving, because this helps avoid common mistakes. The speaker also notes that workshops can affect the result if instructions are not followed carefully.", "questions": ["The session takes place on <input data-answer='Saturday'>.", "Participants should arrive at <input data-answer='11:20'>.", "The meeting point is <input data-answer='the north entrance'>.", "The speaker is <input data-answer='Oliver Grant'>.", "Everyone should bring a <input data-answer='reference number'>."]}, {"id": "7-77", "level": "7", "number": 77, "title": "Local bus complaint · Lesson 77", "type": "Sentence completion", "instruction": "Complete the task using no more than three words.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning local bus complaint. The main session takes place on Sunday at 2:30, and participants should meet at Studio 3. Nina Brooks explains that the most important point is receptionist, while patient form is usually the detail people forget. The cost or reference given in the notice is £45, and everyone should bring a safety briefing. The final recommendation is to review symptoms before leaving, because this helps avoid common mistakes. The speaker also notes that appointment time can affect the result if instructions are not followed carefully.", "questions": ["The session takes place on <input data-answer='Sunday'>.", "Participants should arrive at <input data-answer='2:30'>.", "The meeting point is <input data-answer='Studio 3'>.", "The speaker is <input data-answer='Nina Brooks'>.", "Everyone should bring a <input data-answer='safety briefing'>."]}, {"id": "7-78", "level": "7", "number": 78, "title": "Work-life balance talk · Lesson 78", "type": "Form completion", "instruction": "Complete the form using no more than two words and/or a number.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning work-life balance talk. The main session takes place on Monday at 4:15, and participants should meet at Lab 4. James Miller explains that the most important point is halls, while shared flats is usually the detail people forget. The cost or reference given in the notice is £60, and everyone should bring a online account. The final recommendation is to review host families before leaving, because this helps avoid common mistakes. The speaker also notes that deposits can affect the result if instructions are not followed carefully.", "questions": ["Name: <input data-answer='James Miller'>.", "Day: <input data-answer='Monday'>.", "Time: <input data-answer='4:15'>.", "Location: <input data-answer='Lab 4'>.", "Document/item required: <input data-answer='online account'>."]}, {"id": "7-79", "level": "7", "number": 79, "title": "Public speaking workshop · Lesson 79", "type": "Table completion", "instruction": "Complete the table using no more than two words and/or a number.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning public speaking workshop. The main session takes place on Tuesday at 6:40, and participants should meet at the visitor centre. Sofia Bennett explains that the most important point is urban trees, while heat islands is usually the detail people forget. The cost or reference given in the notice is £75, and everyone should bring a printed map. The final recommendation is to review pollution before leaving, because this helps avoid common mistakes. The speaker also notes that construction damage can affect the result if instructions are not followed carefully.", "questions": ["Date/day: <input data-answer='Tuesday'>.", "Start time: <input data-answer='6:40'>.", "Meeting place: <input data-answer='the visitor centre'>.", "Person in charge: <input data-answer='Sofia Bennett'>.", "Item to bring: <input data-answer='printed map'>."]}, {"id": "7-80", "level": "7", "number": 80, "title": "Gardening radio show · Lesson 80", "type": "Matching", "instruction": "Complete the task using no more than three words.", "transcript": "The speaker discusses advantages, limitations and recommendations concerning gardening radio show. The main session takes place on Wednesday at 7:10, and participants should meet at the seminar room. Ahmed Khan explains that the most important point is breakfast room, while gym is usually the detail people forget. The cost or reference given in the notice is £90, and everyone should bring a practice booklet. The final recommendation is to review swimming pool before leaving, because this helps avoid common mistakes. The speaker also notes that laundry can affect the result if instructions are not followed carefully.", "questionTitle": "Categories: A main session · B meeting point · C speaker · D required item · E cost/reference", "questions": ["Wednesday: <input data-answer='A'>.", "the seminar room: <input data-answer='B'>.", "Ahmed Khan: <input data-answer='C'>.", "practice booklet: <input data-answer='D'>.", "£90: <input data-answer='E'>."]}, {"id": "8-9-1", "level": "8-9", "number": 1, "title": "Campus library orientation · Lesson 1", "type": "Note completion", "instruction": "Complete the notes using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to campus library orientation. The main session takes place on Monday at 8:30, and participants should meet at Room 12. Emma Carter explains that the most important point is students, while librarian is usually the detail people forget. The cost or reference given in the notice is £12, and everyone should bring a feedback form. The final recommendation is to review quiet study rooms before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that digital loans should be interpreted in context, and that late return policy may influence the final decision.", "questions": ["The session takes place on <input data-answer='Monday'>.", "Participants should arrive at <input data-answer='8:30'>.", "The meeting point is <input data-answer='Room 12'>.", "The speaker is <input data-answer='Emma Carter'>.", "Everyone should bring a <input data-answer='feedback form'>."]}, {"id": "8-9-2", "level": "8-9", "number": 2, "title": "Museum volunteer briefing · Lesson 2", "type": "Plan labelling", "instruction": "Label the plan using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to museum volunteer briefing. The main session takes place on Tuesday at 9:15, and participants should meet at Hall B. Daniel Lewis explains that the most important point is visitors, while cloakroom is usually the detail people forget. The cost or reference given in the notice is £18, and everyone should bring a confirmation email. The final recommendation is to review exhibition rooms before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that guided tour should be interpreted in context, and that safety rules may influence the final decision.", "questions": ["Entrance area: <input data-answer='Hall B'>.", "Information desk contact: <input data-answer='Daniel Lewis'>.", "Main time marker: <input data-answer='9:15'>.", "Required item: <input data-answer='confirmation email'>.", "Review point: <input data-answer='exhibition rooms'>."]}, {"id": "8-9-3", "level": "8-9", "number": 3, "title": "Urban transport update · Lesson 3", "type": "Classification", "instruction": "Complete the notes using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to urban transport update. The main session takes place on Wednesday at 10:45, and participants should meet at the main desk. Priya Shah explains that the most important point is commuters, while platform changes is usually the detail people forget. The cost or reference given in the notice is £24, and everyone should bring a student card. The final recommendation is to review ticket machines before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that delays should be interpreted in context, and that service information may influence the final decision.", "questionTitle": "A main issue · B forgotten detail · C final review · D required item · E cost/reference", "questions": ["commuters: <input data-answer='A'>.", "platform changes: <input data-answer='B'>.", "ticket machines: <input data-answer='C'>.", "student card: <input data-answer='D'>.", "£24: <input data-answer='E'>."]}, {"id": "8-9-4", "level": "8-9", "number": 4, "title": "Community garden project · Lesson 4", "type": "Summary completion", "instruction": "Complete the notes using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to community garden project. The main session takes place on Thursday at 11:20, and participants should meet at the north entrance. Oliver Grant explains that the most important point is residents, while compost is usually the detail people forget. The cost or reference given in the notice is £35, and everyone should bring a reference number. The final recommendation is to review watering rota before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that workshops should be interpreted in context, and that neighbourhood events may influence the final decision.", "questions": ["The session takes place on <input data-answer='Thursday'>.", "Participants should arrive at <input data-answer='11:20'>.", "The meeting point is <input data-answer='the north entrance'>.", "The speaker is <input data-answer='Oliver Grant'>.", "Everyone should bring a <input data-answer='reference number'>."]}, {"id": "8-9-5", "level": "8-9", "number": 5, "title": "Health clinic appointment · Lesson 5", "type": "Sentence completion", "instruction": "Complete the notes using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to health clinic appointment. The main session takes place on Friday at 2:30, and participants should meet at Studio 3. Nina Brooks explains that the most important point is receptionist, while patient form is usually the detail people forget. The cost or reference given in the notice is £45, and everyone should bring a safety briefing. The final recommendation is to review symptoms before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that appointment time should be interpreted in context, and that health card may influence the final decision.", "questions": ["The session takes place on <input data-answer='Friday'>.", "Participants should arrive at <input data-answer='2:30'>.", "The meeting point is <input data-answer='Studio 3'>.", "The speaker is <input data-answer='Nina Brooks'>.", "Everyone should bring a <input data-answer='safety briefing'>."]}, {"id": "8-9-6", "level": "8-9", "number": 6, "title": "University accommodation · Lesson 6", "type": "Form completion", "instruction": "Complete the form using no more than two words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to university accommodation. The main session takes place on Saturday at 4:15, and participants should meet at Lab 4. James Miller explains that the most important point is halls, while shared flats is usually the detail people forget. The cost or reference given in the notice is £60, and everyone should bring a online account. The final recommendation is to review host families before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that deposits should be interpreted in context, and that laundry facilities may influence the final decision.", "questions": ["Name: <input data-answer='James Miller'>.", "Day: <input data-answer='Saturday'>.", "Time: <input data-answer='4:15'>.", "Location: <input data-answer='Lab 4'>.", "Document/item required: <input data-answer='online account'>."]}, {"id": "8-9-7", "level": "8-9", "number": 7, "title": "Environmental science lecture · Lesson 7", "type": "Table completion", "instruction": "Complete the table using no more than two words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to environmental science lecture. The main session takes place on Sunday at 6:40, and participants should meet at the visitor centre. Sofia Bennett explains that the most important point is urban trees, while heat islands is usually the detail people forget. The cost or reference given in the notice is £75, and everyone should bring a printed map. The final recommendation is to review pollution before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that construction damage should be interpreted in context, and that local councils may influence the final decision.", "questions": ["Date/day: <input data-answer='Sunday'>.", "Start time: <input data-answer='6:40'>.", "Meeting place: <input data-answer='the visitor centre'>.", "Person in charge: <input data-answer='Sofia Bennett'>.", "Item to bring: <input data-answer='printed map'>."]}, {"id": "8-9-8", "level": "8-9", "number": 8, "title": "Hotel facilities tour · Lesson 8", "type": "Matching", "instruction": "Complete the notes using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to hotel facilities tour. The main session takes place on Monday at 7:10, and participants should meet at the seminar room. Ahmed Khan explains that the most important point is breakfast room, while gym is usually the detail people forget. The cost or reference given in the notice is £90, and everyone should bring a practice booklet. The final recommendation is to review swimming pool before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that laundry should be interpreted in context, and that reception services may influence the final decision.", "questionTitle": "Categories: A main session · B meeting point · C speaker · D required item · E cost/reference", "questions": ["Monday: <input data-answer='A'>.", "the seminar room: <input data-answer='B'>.", "Ahmed Khan: <input data-answer='C'>.", "practice booklet: <input data-answer='D'>.", "£90: <input data-answer='E'>."]}, {"id": "8-9-9", "level": "8-9", "number": 9, "title": "Language exchange meeting · Lesson 9", "type": "Multiple choice", "instruction": "Complete the notes using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to language exchange meeting. The main session takes place on Tuesday at 8:30, and participants should meet at Room 12. Emma Carter explains that the most important point is students, while librarian is usually the detail people forget. The cost or reference given in the notice is £12, and everyone should bring a feedback form. The final recommendation is to review quiet study rooms before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that digital loans should be interpreted in context, and that late return policy may influence the final decision.", "mcq": [{"q": "When does the main session take place?", "options": ["Tuesday", "Sunday", "Wednesday"], "answer": 0}, {"q": "Where should participants meet?", "options": ["the cafeteria", "the car park", "Room 12"], "answer": 2}, {"q": "Who gives the explanation?", "options": ["a visitor", "the receptionist", "Emma Carter"], "answer": 2}, {"q": "What should people bring?", "options": ["a laptop charger", "a lunch box", "feedback form"], "answer": 2}, {"q": "What should be reviewed before leaving?", "options": ["the building colour", "the weather", "quiet study rooms"], "answer": 2}]}, {"id": "8-9-10", "level": "8-9", "number": 10, "title": "Technology repair desk · Lesson 10", "type": "Short answer", "instruction": "Answer the questions using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to technology repair desk. The main session takes place on Wednesday at 9:15, and participants should meet at Hall B. Daniel Lewis explains that the most important point is visitors, while cloakroom is usually the detail people forget. The cost or reference given in the notice is £18, and everyone should bring a confirmation email. The final recommendation is to review exhibition rooms before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that guided tour should be interpreted in context, and that safety rules may influence the final decision.", "questions": ["What day is the session? <input data-answer='Wednesday'>.", "What time does it begin? <input data-answer='9:15'>.", "Where do participants meet? <input data-answer='Hall B'>.", "Who explains the information? <input data-answer='Daniel Lewis'>.", "What item should people bring? <input data-answer='confirmation email'>."]}, {"id": "8-9-11", "level": "8-9", "number": 11, "title": "Workplace induction · Lesson 11", "type": "Note completion", "instruction": "Complete the notes using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to workplace induction. The main session takes place on Thursday at 10:45, and participants should meet at the main desk. Priya Shah explains that the most important point is commuters, while platform changes is usually the detail people forget. The cost or reference given in the notice is £24, and everyone should bring a student card. The final recommendation is to review ticket machines before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that delays should be interpreted in context, and that service information may influence the final decision.", "questions": ["The session takes place on <input data-answer='Thursday'>.", "Participants should arrive at <input data-answer='10:45'>.", "The meeting point is <input data-answer='the main desk'>.", "The speaker is <input data-answer='Priya Shah'>.", "Everyone should bring a <input data-answer='student card'>."]}, {"id": "8-9-12", "level": "8-9", "number": 12, "title": "Book club discussion · Lesson 12", "type": "Plan labelling", "instruction": "Label the plan using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to book club discussion. The main session takes place on Friday at 11:20, and participants should meet at the north entrance. Oliver Grant explains that the most important point is residents, while compost is usually the detail people forget. The cost or reference given in the notice is £35, and everyone should bring a reference number. The final recommendation is to review watering rota before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that workshops should be interpreted in context, and that neighbourhood events may influence the final decision.", "questions": ["Entrance area: <input data-answer='the north entrance'>.", "Information desk contact: <input data-answer='Oliver Grant'>.", "Main time marker: <input data-answer='11:20'>.", "Required item: <input data-answer='reference number'>.", "Review point: <input data-answer='watering rota'>."]}, {"id": "8-9-13", "level": "8-9", "number": 13, "title": "Airport boarding notice · Lesson 13", "type": "Classification", "instruction": "Complete the notes using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to airport boarding notice. The main session takes place on Saturday at 2:30, and participants should meet at Studio 3. Nina Brooks explains that the most important point is receptionist, while patient form is usually the detail people forget. The cost or reference given in the notice is £45, and everyone should bring a safety briefing. The final recommendation is to review symptoms before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that appointment time should be interpreted in context, and that health card may influence the final decision.", "questionTitle": "A main issue · B forgotten detail · C final review · D required item · E cost/reference", "questions": ["receptionist: <input data-answer='A'>.", "patient form: <input data-answer='B'>.", "symptoms: <input data-answer='C'>.", "safety briefing: <input data-answer='D'>.", "£45: <input data-answer='E'>."]}, {"id": "8-9-14", "level": "8-9", "number": 14, "title": "Online course guidance · Lesson 14", "type": "Summary completion", "instruction": "Complete the notes using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to online course guidance. The main session takes place on Sunday at 4:15, and participants should meet at Lab 4. James Miller explains that the most important point is halls, while shared flats is usually the detail people forget. The cost or reference given in the notice is £60, and everyone should bring a online account. The final recommendation is to review host families before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that deposits should be interpreted in context, and that laundry facilities may influence the final decision.", "questions": ["The session takes place on <input data-answer='Sunday'>.", "Participants should arrive at <input data-answer='4:15'>.", "The meeting point is <input data-answer='Lab 4'>.", "The speaker is <input data-answer='James Miller'>.", "Everyone should bring a <input data-answer='online account'>."]}, {"id": "8-9-15", "level": "8-9", "number": 15, "title": "Sports centre launch · Lesson 15", "type": "Sentence completion", "instruction": "Complete the notes using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to sports centre launch. The main session takes place on Monday at 6:40, and participants should meet at the visitor centre. Sofia Bennett explains that the most important point is urban trees, while heat islands is usually the detail people forget. The cost or reference given in the notice is £75, and everyone should bring a printed map. The final recommendation is to review pollution before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that construction damage should be interpreted in context, and that local councils may influence the final decision.", "questions": ["The session takes place on <input data-answer='Monday'>.", "Participants should arrive at <input data-answer='6:40'>.", "The meeting point is <input data-answer='the visitor centre'>.", "The speaker is <input data-answer='Sofia Bennett'>.", "Everyone should bring a <input data-answer='printed map'>."]}, {"id": "8-9-16", "level": "8-9", "number": 16, "title": "Cinema booking call · Lesson 16", "type": "Form completion", "instruction": "Complete the form using no more than two words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to cinema booking call. The main session takes place on Tuesday at 7:10, and participants should meet at the seminar room. Ahmed Khan explains that the most important point is breakfast room, while gym is usually the detail people forget. The cost or reference given in the notice is £90, and everyone should bring a practice booklet. The final recommendation is to review swimming pool before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that laundry should be interpreted in context, and that reception services may influence the final decision.", "questions": ["Name: <input data-answer='Ahmed Khan'>.", "Day: <input data-answer='Tuesday'>.", "Time: <input data-answer='7:10'>.", "Location: <input data-answer='the seminar room'>.", "Document/item required: <input data-answer='practice booklet'>."]}, {"id": "8-9-17", "level": "8-9", "number": 17, "title": "Podcast about sleep · Lesson 17", "type": "Table completion", "instruction": "Complete the table using no more than two words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to podcast about sleep. The main session takes place on Wednesday at 8:30, and participants should meet at Room 12. Emma Carter explains that the most important point is students, while librarian is usually the detail people forget. The cost or reference given in the notice is £12, and everyone should bring a feedback form. The final recommendation is to review quiet study rooms before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that digital loans should be interpreted in context, and that late return policy may influence the final decision.", "questions": ["Date/day: <input data-answer='Wednesday'>.", "Start time: <input data-answer='8:30'>.", "Meeting place: <input data-answer='Room 12'>.", "Person in charge: <input data-answer='Emma Carter'>.", "Item to bring: <input data-answer='feedback form'>."]}, {"id": "8-9-18", "level": "8-9", "number": 18, "title": "Bike rental office · Lesson 18", "type": "Matching", "instruction": "Complete the notes using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to bike rental office. The main session takes place on Thursday at 9:15, and participants should meet at Hall B. Daniel Lewis explains that the most important point is visitors, while cloakroom is usually the detail people forget. The cost or reference given in the notice is £18, and everyone should bring a confirmation email. The final recommendation is to review exhibition rooms before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that guided tour should be interpreted in context, and that safety rules may influence the final decision.", "questionTitle": "Categories: A main session · B meeting point · C speaker · D required item · E cost/reference", "questions": ["Thursday: <input data-answer='A'>.", "Hall B: <input data-answer='B'>.", "Daniel Lewis: <input data-answer='C'>.", "confirmation email: <input data-answer='D'>.", "£18: <input data-answer='E'>."]}, {"id": "8-9-19", "level": "8-9", "number": 19, "title": "Art workshop registration · Lesson 19", "type": "Multiple choice", "instruction": "Complete the notes using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to art workshop registration. The main session takes place on Friday at 10:45, and participants should meet at the main desk. Priya Shah explains that the most important point is commuters, while platform changes is usually the detail people forget. The cost or reference given in the notice is £24, and everyone should bring a student card. The final recommendation is to review ticket machines before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that delays should be interpreted in context, and that service information may influence the final decision.", "mcq": [{"q": "When does the main session take place?", "options": ["Sunday", "Wednesday", "Friday"], "answer": 2}, {"q": "Where should participants meet?", "options": ["the main desk", "the car park", "the cafeteria"], "answer": 0}, {"q": "Who gives the explanation?", "options": ["Priya Shah", "a visitor", "the receptionist"], "answer": 0}, {"q": "What should people bring?", "options": ["a laptop charger", "a lunch box", "student card"], "answer": 2}, {"q": "What should be reviewed before leaving?", "options": ["ticket machines", "the building colour", "the weather"], "answer": 0}]}, {"id": "8-9-20", "level": "8-9", "number": 20, "title": "Local radio interview · Lesson 20", "type": "Short answer", "instruction": "Answer the questions using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to local radio interview. The main session takes place on Saturday at 11:20, and participants should meet at the north entrance. Oliver Grant explains that the most important point is residents, while compost is usually the detail people forget. The cost or reference given in the notice is £35, and everyone should bring a reference number. The final recommendation is to review watering rota before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that workshops should be interpreted in context, and that neighbourhood events may influence the final decision.", "questions": ["What day is the session? <input data-answer='Saturday'>.", "What time does it begin? <input data-answer='11:20'>.", "Where do participants meet? <input data-answer='the north entrance'>.", "Who explains the information? <input data-answer='Oliver Grant'>.", "What item should people bring? <input data-answer='reference number'>."]}, {"id": "8-9-21", "level": "8-9", "number": 21, "title": "Research seminar · Lesson 21", "type": "Note completion", "instruction": "Complete the notes using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to research seminar. The main session takes place on Sunday at 2:30, and participants should meet at Studio 3. Nina Brooks explains that the most important point is receptionist, while patient form is usually the detail people forget. The cost or reference given in the notice is £45, and everyone should bring a safety briefing. The final recommendation is to review symptoms before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that appointment time should be interpreted in context, and that health card may influence the final decision.", "questions": ["The session takes place on <input data-answer='Sunday'>.", "Participants should arrive at <input data-answer='2:30'>.", "The meeting point is <input data-answer='Studio 3'>.", "The speaker is <input data-answer='Nina Brooks'>.", "Everyone should bring a <input data-answer='safety briefing'>."]}, {"id": "8-9-22", "level": "8-9", "number": 22, "title": "History walking tour · Lesson 22", "type": "Plan labelling", "instruction": "Label the plan using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to history walking tour. The main session takes place on Monday at 4:15, and participants should meet at Lab 4. James Miller explains that the most important point is halls, while shared flats is usually the detail people forget. The cost or reference given in the notice is £60, and everyone should bring a online account. The final recommendation is to review host families before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that deposits should be interpreted in context, and that laundry facilities may influence the final decision.", "questions": ["Entrance area: <input data-answer='Lab 4'>.", "Information desk contact: <input data-answer='James Miller'>.", "Main time marker: <input data-answer='4:15'>.", "Required item: <input data-answer='online account'>.", "Review point: <input data-answer='host families'>."]}, {"id": "8-9-23", "level": "8-9", "number": 23, "title": "Fitness class information · Lesson 23", "type": "Classification", "instruction": "Complete the notes using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to fitness class information. The main session takes place on Tuesday at 6:40, and participants should meet at the visitor centre. Sofia Bennett explains that the most important point is urban trees, while heat islands is usually the detail people forget. The cost or reference given in the notice is £75, and everyone should bring a printed map. The final recommendation is to review pollution before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that construction damage should be interpreted in context, and that local councils may influence the final decision.", "questionTitle": "A main issue · B forgotten detail · C final review · D required item · E cost/reference", "questions": ["urban trees: <input data-answer='A'>.", "heat islands: <input data-answer='B'>.", "pollution: <input data-answer='C'>.", "printed map: <input data-answer='D'>.", "£75: <input data-answer='E'>."]}, {"id": "8-9-24", "level": "8-9", "number": 24, "title": "Customer support call · Lesson 24", "type": "Summary completion", "instruction": "Complete the notes using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to customer support call. The main session takes place on Wednesday at 7:10, and participants should meet at the seminar room. Ahmed Khan explains that the most important point is breakfast room, while gym is usually the detail people forget. The cost or reference given in the notice is £90, and everyone should bring a practice booklet. The final recommendation is to review swimming pool before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that laundry should be interpreted in context, and that reception services may influence the final decision.", "questions": ["The session takes place on <input data-answer='Wednesday'>.", "Participants should arrive at <input data-answer='7:10'>.", "The meeting point is <input data-answer='the seminar room'>.", "The speaker is <input data-answer='Ahmed Khan'>.", "Everyone should bring a <input data-answer='practice booklet'>."]}, {"id": "8-9-25", "level": "8-9", "number": 25, "title": "Cooking course · Lesson 25", "type": "Sentence completion", "instruction": "Complete the notes using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to cooking course. The main session takes place on Thursday at 8:30, and participants should meet at Room 12. Emma Carter explains that the most important point is students, while librarian is usually the detail people forget. The cost or reference given in the notice is £12, and everyone should bring a feedback form. The final recommendation is to review quiet study rooms before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that digital loans should be interpreted in context, and that late return policy may influence the final decision.", "questions": ["The session takes place on <input data-answer='Thursday'>.", "Participants should arrive at <input data-answer='8:30'>.", "The meeting point is <input data-answer='Room 12'>.", "The speaker is <input data-answer='Emma Carter'>.", "Everyone should bring a <input data-answer='feedback form'>."]}, {"id": "8-9-26", "level": "8-9", "number": 26, "title": "Career fair announcement · Lesson 26", "type": "Form completion", "instruction": "Complete the form using no more than two words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to career fair announcement. The main session takes place on Friday at 9:15, and participants should meet at Hall B. Daniel Lewis explains that the most important point is visitors, while cloakroom is usually the detail people forget. The cost or reference given in the notice is £18, and everyone should bring a confirmation email. The final recommendation is to review exhibition rooms before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that guided tour should be interpreted in context, and that safety rules may influence the final decision.", "questions": ["Name: <input data-answer='Daniel Lewis'>.", "Day: <input data-answer='Friday'>.", "Time: <input data-answer='9:15'>.", "Location: <input data-answer='Hall B'>.", "Document/item required: <input data-answer='confirmation email'>."]}, {"id": "8-9-27", "level": "8-9", "number": 27, "title": "Housing inspection · Lesson 27", "type": "Table completion", "instruction": "Complete the table using no more than two words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to housing inspection. The main session takes place on Saturday at 10:45, and participants should meet at the main desk. Priya Shah explains that the most important point is commuters, while platform changes is usually the detail people forget. The cost or reference given in the notice is £24, and everyone should bring a student card. The final recommendation is to review ticket machines before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that delays should be interpreted in context, and that service information may influence the final decision.", "questions": ["Date/day: <input data-answer='Saturday'>.", "Start time: <input data-answer='10:45'>.", "Meeting place: <input data-answer='the main desk'>.", "Person in charge: <input data-answer='Priya Shah'>.", "Item to bring: <input data-answer='student card'>."]}, {"id": "8-9-28", "level": "8-9", "number": 28, "title": "Conference schedule · Lesson 28", "type": "Matching", "instruction": "Complete the notes using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to conference schedule. The main session takes place on Sunday at 11:20, and participants should meet at the north entrance. Oliver Grant explains that the most important point is residents, while compost is usually the detail people forget. The cost or reference given in the notice is £35, and everyone should bring a reference number. The final recommendation is to review watering rota before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that workshops should be interpreted in context, and that neighbourhood events may influence the final decision.", "questionTitle": "Categories: A main session · B meeting point · C speaker · D required item · E cost/reference", "questions": ["Sunday: <input data-answer='A'>.", "the north entrance: <input data-answer='B'>.", "Oliver Grant: <input data-answer='C'>.", "reference number: <input data-answer='D'>.", "£35: <input data-answer='E'>."]}, {"id": "8-9-29", "level": "8-9", "number": 29, "title": "Travel insurance enquiry · Lesson 29", "type": "Multiple choice", "instruction": "Complete the notes using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to travel insurance enquiry. The main session takes place on Monday at 2:30, and participants should meet at Studio 3. Nina Brooks explains that the most important point is receptionist, while patient form is usually the detail people forget. The cost or reference given in the notice is £45, and everyone should bring a safety briefing. The final recommendation is to review symptoms before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that appointment time should be interpreted in context, and that health card may influence the final decision.", "mcq": [{"q": "When does the main session take place?", "options": ["Sunday", "Wednesday", "Monday"], "answer": 2}, {"q": "Where should participants meet?", "options": ["Studio 3", "the cafeteria", "the car park"], "answer": 0}, {"q": "Who gives the explanation?", "options": ["Nina Brooks", "the receptionist", "a visitor"], "answer": 0}, {"q": "What should people bring?", "options": ["safety briefing", "a lunch box", "a laptop charger"], "answer": 0}, {"q": "What should be reviewed before leaving?", "options": ["the weather", "the building colour", "symptoms"], "answer": 2}]}, {"id": "8-9-30", "level": "8-9", "number": 30, "title": "Science exhibition · Lesson 30", "type": "Short answer", "instruction": "Answer the questions using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to science exhibition. The main session takes place on Tuesday at 4:15, and participants should meet at Lab 4. James Miller explains that the most important point is halls, while shared flats is usually the detail people forget. The cost or reference given in the notice is £60, and everyone should bring a online account. The final recommendation is to review host families before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that deposits should be interpreted in context, and that laundry facilities may influence the final decision.", "questions": ["What day is the session? <input data-answer='Tuesday'>.", "What time does it begin? <input data-answer='4:15'>.", "Where do participants meet? <input data-answer='Lab 4'>.", "Who explains the information? <input data-answer='James Miller'>.", "What item should people bring? <input data-answer='online account'>."]}, {"id": "8-9-31", "level": "8-9", "number": 31, "title": "Bank account application · Lesson 31", "type": "Note completion", "instruction": "Complete the notes using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to bank account application. The main session takes place on Wednesday at 6:40, and participants should meet at the visitor centre. Sofia Bennett explains that the most important point is urban trees, while heat islands is usually the detail people forget. The cost or reference given in the notice is £75, and everyone should bring a printed map. The final recommendation is to review pollution before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that construction damage should be interpreted in context, and that local councils may influence the final decision.", "questions": ["The session takes place on <input data-answer='Wednesday'>.", "Participants should arrive at <input data-answer='6:40'>.", "The meeting point is <input data-answer='the visitor centre'>.", "The speaker is <input data-answer='Sofia Bennett'>.", "Everyone should bring a <input data-answer='printed map'>."]}, {"id": "8-9-32", "level": "8-9", "number": 32, "title": "Restaurant booking · Lesson 32", "type": "Plan labelling", "instruction": "Label the plan using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to restaurant booking. The main session takes place on Thursday at 7:10, and participants should meet at the seminar room. Ahmed Khan explains that the most important point is breakfast room, while gym is usually the detail people forget. The cost or reference given in the notice is £90, and everyone should bring a practice booklet. The final recommendation is to review swimming pool before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that laundry should be interpreted in context, and that reception services may influence the final decision.", "questions": ["Entrance area: <input data-answer='the seminar room'>.", "Information desk contact: <input data-answer='Ahmed Khan'>.", "Main time marker: <input data-answer='7:10'>.", "Required item: <input data-answer='practice booklet'>.", "Review point: <input data-answer='swimming pool'>."]}, {"id": "8-9-33", "level": "8-9", "number": 33, "title": "Recycling centre tour · Lesson 33", "type": "Classification", "instruction": "Complete the notes using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to recycling centre tour. The main session takes place on Friday at 8:30, and participants should meet at Room 12. Emma Carter explains that the most important point is students, while librarian is usually the detail people forget. The cost or reference given in the notice is £12, and everyone should bring a feedback form. The final recommendation is to review quiet study rooms before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that digital loans should be interpreted in context, and that late return policy may influence the final decision.", "questionTitle": "A main issue · B forgotten detail · C final review · D required item · E cost/reference", "questions": ["students: <input data-answer='A'>.", "librarian: <input data-answer='B'>.", "quiet study rooms: <input data-answer='C'>.", "feedback form: <input data-answer='D'>.", "£12: <input data-answer='E'>."]}, {"id": "8-9-34", "level": "8-9", "number": 34, "title": "Theatre visit · Lesson 34", "type": "Summary completion", "instruction": "Complete the notes using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to theatre visit. The main session takes place on Saturday at 9:15, and participants should meet at Hall B. Daniel Lewis explains that the most important point is visitors, while cloakroom is usually the detail people forget. The cost or reference given in the notice is £18, and everyone should bring a confirmation email. The final recommendation is to review exhibition rooms before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that guided tour should be interpreted in context, and that safety rules may influence the final decision.", "questions": ["The session takes place on <input data-answer='Saturday'>.", "Participants should arrive at <input data-answer='9:15'>.", "The meeting point is <input data-answer='Hall B'>.", "The speaker is <input data-answer='Daniel Lewis'>.", "Everyone should bring a <input data-answer='confirmation email'>."]}, {"id": "8-9-35", "level": "8-9", "number": 35, "title": "Photography club · Lesson 35", "type": "Sentence completion", "instruction": "Complete the notes using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to photography club. The main session takes place on Sunday at 10:45, and participants should meet at the main desk. Priya Shah explains that the most important point is commuters, while platform changes is usually the detail people forget. The cost or reference given in the notice is £24, and everyone should bring a student card. The final recommendation is to review ticket machines before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that delays should be interpreted in context, and that service information may influence the final decision.", "questions": ["The session takes place on <input data-answer='Sunday'>.", "Participants should arrive at <input data-answer='10:45'>.", "The meeting point is <input data-answer='the main desk'>.", "The speaker is <input data-answer='Priya Shah'>.", "Everyone should bring a <input data-answer='student card'>."]}, {"id": "8-9-36", "level": "8-9", "number": 36, "title": "Public lecture on nutrition · Lesson 36", "type": "Form completion", "instruction": "Complete the form using no more than two words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to public lecture on nutrition. The main session takes place on Monday at 11:20, and participants should meet at the north entrance. Oliver Grant explains that the most important point is residents, while compost is usually the detail people forget. The cost or reference given in the notice is £35, and everyone should bring a reference number. The final recommendation is to review watering rota before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that workshops should be interpreted in context, and that neighbourhood events may influence the final decision.", "questions": ["Name: <input data-answer='Oliver Grant'>.", "Day: <input data-answer='Monday'>.", "Time: <input data-answer='11:20'>.", "Location: <input data-answer='the north entrance'>.", "Document/item required: <input data-answer='reference number'>."]}, {"id": "8-9-37", "level": "8-9", "number": 37, "title": "Job training session · Lesson 37", "type": "Table completion", "instruction": "Complete the table using no more than two words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to job training session. The main session takes place on Tuesday at 2:30, and participants should meet at Studio 3. Nina Brooks explains that the most important point is receptionist, while patient form is usually the detail people forget. The cost or reference given in the notice is £45, and everyone should bring a safety briefing. The final recommendation is to review symptoms before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that appointment time should be interpreted in context, and that health card may influence the final decision.", "questions": ["Date/day: <input data-answer='Tuesday'>.", "Start time: <input data-answer='2:30'>.", "Meeting place: <input data-answer='Studio 3'>.", "Person in charge: <input data-answer='Nina Brooks'>.", "Item to bring: <input data-answer='safety briefing'>."]}, {"id": "8-9-38", "level": "8-9", "number": 38, "title": "Neighbourhood safety meeting · Lesson 38", "type": "Matching", "instruction": "Complete the notes using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to neighbourhood safety meeting. The main session takes place on Wednesday at 4:15, and participants should meet at Lab 4. James Miller explains that the most important point is halls, while shared flats is usually the detail people forget. The cost or reference given in the notice is £60, and everyone should bring a online account. The final recommendation is to review host families before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that deposits should be interpreted in context, and that laundry facilities may influence the final decision.", "questionTitle": "Categories: A main session · B meeting point · C speaker · D required item · E cost/reference", "questions": ["Wednesday: <input data-answer='A'>.", "Lab 4: <input data-answer='B'>.", "James Miller: <input data-answer='C'>.", "online account: <input data-answer='D'>.", "£60: <input data-answer='E'>."]}, {"id": "8-9-39", "level": "8-9", "number": 39, "title": "Music festival planning · Lesson 39", "type": "Multiple choice", "instruction": "Complete the notes using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to music festival planning. The main session takes place on Thursday at 6:40, and participants should meet at the visitor centre. Sofia Bennett explains that the most important point is urban trees, while heat islands is usually the detail people forget. The cost or reference given in the notice is £75, and everyone should bring a printed map. The final recommendation is to review pollution before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that construction damage should be interpreted in context, and that local councils may influence the final decision.", "mcq": [{"q": "When does the main session take place?", "options": ["Sunday", "Thursday", "Wednesday"], "answer": 1}, {"q": "Where should participants meet?", "options": ["the car park", "the cafeteria", "the visitor centre"], "answer": 2}, {"q": "Who gives the explanation?", "options": ["a visitor", "the receptionist", "Sofia Bennett"], "answer": 2}, {"q": "What should people bring?", "options": ["a laptop charger", "printed map", "a lunch box"], "answer": 1}, {"q": "What should be reviewed before leaving?", "options": ["the building colour", "the weather", "pollution"], "answer": 2}]}, {"id": "8-9-40", "level": "8-9", "number": 40, "title": "Dentist appointment · Lesson 40", "type": "Short answer", "instruction": "Answer the questions using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to dentist appointment. The main session takes place on Friday at 7:10, and participants should meet at the seminar room. Ahmed Khan explains that the most important point is breakfast room, while gym is usually the detail people forget. The cost or reference given in the notice is £90, and everyone should bring a practice booklet. The final recommendation is to review swimming pool before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that laundry should be interpreted in context, and that reception services may influence the final decision.", "questions": ["What day is the session? <input data-answer='Friday'>.", "What time does it begin? <input data-answer='7:10'>.", "Where do participants meet? <input data-answer='the seminar room'>.", "Who explains the information? <input data-answer='Ahmed Khan'>.", "What item should people bring? <input data-answer='practice booklet'>."]}, {"id": "8-9-41", "level": "8-9", "number": 41, "title": "Study abroad talk · Lesson 41", "type": "Note completion", "instruction": "Complete the notes using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to study abroad talk. The main session takes place on Saturday at 8:30, and participants should meet at Room 12. Emma Carter explains that the most important point is students, while librarian is usually the detail people forget. The cost or reference given in the notice is £12, and everyone should bring a feedback form. The final recommendation is to review quiet study rooms before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that digital loans should be interpreted in context, and that late return policy may influence the final decision.", "questions": ["The session takes place on <input data-answer='Saturday'>.", "Participants should arrive at <input data-answer='8:30'>.", "The meeting point is <input data-answer='Room 12'>.", "The speaker is <input data-answer='Emma Carter'>.", "Everyone should bring a <input data-answer='feedback form'>."]}, {"id": "8-9-42", "level": "8-9", "number": 42, "title": "Weather warning · Lesson 42", "type": "Plan labelling", "instruction": "Label the plan using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to weather warning. The main session takes place on Sunday at 9:15, and participants should meet at Hall B. Daniel Lewis explains that the most important point is visitors, while cloakroom is usually the detail people forget. The cost or reference given in the notice is £18, and everyone should bring a confirmation email. The final recommendation is to review exhibition rooms before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that guided tour should be interpreted in context, and that safety rules may influence the final decision.", "questions": ["Entrance area: <input data-answer='Hall B'>.", "Information desk contact: <input data-answer='Daniel Lewis'>.", "Main time marker: <input data-answer='9:15'>.", "Required item: <input data-answer='confirmation email'>.", "Review point: <input data-answer='exhibition rooms'>."]}, {"id": "8-9-43", "level": "8-9", "number": 43, "title": "Business start-up advice · Lesson 43", "type": "Classification", "instruction": "Complete the notes using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to business start-up advice. The main session takes place on Monday at 10:45, and participants should meet at the main desk. Priya Shah explains that the most important point is commuters, while platform changes is usually the detail people forget. The cost or reference given in the notice is £24, and everyone should bring a student card. The final recommendation is to review ticket machines before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that delays should be interpreted in context, and that service information may influence the final decision.", "questionTitle": "A main issue · B forgotten detail · C final review · D required item · E cost/reference", "questions": ["commuters: <input data-answer='A'>.", "platform changes: <input data-answer='B'>.", "ticket machines: <input data-answer='C'>.", "student card: <input data-answer='D'>.", "£24: <input data-answer='E'>."]}, {"id": "8-9-44", "level": "8-9", "number": 44, "title": "University lab safety · Lesson 44", "type": "Summary completion", "instruction": "Complete the notes using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to university lab safety. The main session takes place on Tuesday at 11:20, and participants should meet at the north entrance. Oliver Grant explains that the most important point is residents, while compost is usually the detail people forget. The cost or reference given in the notice is £35, and everyone should bring a reference number. The final recommendation is to review watering rota before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that workshops should be interpreted in context, and that neighbourhood events may influence the final decision.", "questions": ["The session takes place on <input data-answer='Tuesday'>.", "Participants should arrive at <input data-answer='11:20'>.", "The meeting point is <input data-answer='the north entrance'>.", "The speaker is <input data-answer='Oliver Grant'>.", "Everyone should bring a <input data-answer='reference number'>."]}, {"id": "8-9-45", "level": "8-9", "number": 45, "title": "Apartment viewing · Lesson 45", "type": "Sentence completion", "instruction": "Complete the notes using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to apartment viewing. The main session takes place on Wednesday at 2:30, and participants should meet at Studio 3. Nina Brooks explains that the most important point is receptionist, while patient form is usually the detail people forget. The cost or reference given in the notice is £45, and everyone should bring a safety briefing. The final recommendation is to review symptoms before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that appointment time should be interpreted in context, and that health card may influence the final decision.", "questions": ["The session takes place on <input data-answer='Wednesday'>.", "Participants should arrive at <input data-answer='2:30'>.", "The meeting point is <input data-answer='Studio 3'>.", "The speaker is <input data-answer='Nina Brooks'>.", "Everyone should bring a <input data-answer='safety briefing'>."]}, {"id": "8-9-46", "level": "8-9", "number": 46, "title": "Charity fundraising · Lesson 46", "type": "Form completion", "instruction": "Complete the form using no more than two words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to charity fundraising. The main session takes place on Thursday at 4:15, and participants should meet at Lab 4. James Miller explains that the most important point is halls, while shared flats is usually the detail people forget. The cost or reference given in the notice is £60, and everyone should bring a online account. The final recommendation is to review host families before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that deposits should be interpreted in context, and that laundry facilities may influence the final decision.", "questions": ["Name: <input data-answer='James Miller'>.", "Day: <input data-answer='Thursday'>.", "Time: <input data-answer='4:15'>.", "Location: <input data-answer='Lab 4'>.", "Document/item required: <input data-answer='online account'>."]}, {"id": "8-9-47", "level": "8-9", "number": 47, "title": "Dentist hygiene lecture · Lesson 47", "type": "Table completion", "instruction": "Complete the table using no more than two words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to dentist hygiene lecture. The main session takes place on Friday at 6:40, and participants should meet at the visitor centre. Sofia Bennett explains that the most important point is urban trees, while heat islands is usually the detail people forget. The cost or reference given in the notice is £75, and everyone should bring a printed map. The final recommendation is to review pollution before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that construction damage should be interpreted in context, and that local councils may influence the final decision.", "questions": ["Date/day: <input data-answer='Friday'>.", "Start time: <input data-answer='6:40'>.", "Meeting place: <input data-answer='the visitor centre'>.", "Person in charge: <input data-answer='Sofia Bennett'>.", "Item to bring: <input data-answer='printed map'>."]}, {"id": "8-9-48", "level": "8-9", "number": 48, "title": "Farmers market · Lesson 48", "type": "Matching", "instruction": "Complete the notes using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to farmers market. The main session takes place on Saturday at 7:10, and participants should meet at the seminar room. Ahmed Khan explains that the most important point is breakfast room, while gym is usually the detail people forget. The cost or reference given in the notice is £90, and everyone should bring a practice booklet. The final recommendation is to review swimming pool before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that laundry should be interpreted in context, and that reception services may influence the final decision.", "questionTitle": "Categories: A main session · B meeting point · C speaker · D required item · E cost/reference", "questions": ["Saturday: <input data-answer='A'>.", "the seminar room: <input data-answer='B'>.", "Ahmed Khan: <input data-answer='C'>.", "practice booklet: <input data-answer='D'>.", "£90: <input data-answer='E'>."]}, {"id": "8-9-49", "level": "8-9", "number": 49, "title": "Mobile app tutorial · Lesson 49", "type": "Multiple choice", "instruction": "Complete the notes using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to mobile app tutorial. The main session takes place on Sunday at 8:30, and participants should meet at Room 12. Emma Carter explains that the most important point is students, while librarian is usually the detail people forget. The cost or reference given in the notice is £12, and everyone should bring a feedback form. The final recommendation is to review quiet study rooms before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that digital loans should be interpreted in context, and that late return policy may influence the final decision.", "mcq": [{"q": "When does the main session take place?", "options": ["Wednesday", "Sunday", "Sunday"], "answer": 1}, {"q": "Where should participants meet?", "options": ["the cafeteria", "the car park", "Room 12"], "answer": 2}, {"q": "Who gives the explanation?", "options": ["a visitor", "the receptionist", "Emma Carter"], "answer": 2}, {"q": "What should people bring?", "options": ["a lunch box", "a laptop charger", "feedback form"], "answer": 2}, {"q": "What should be reviewed before leaving?", "options": ["the building colour", "quiet study rooms", "the weather"], "answer": 1}]}, {"id": "8-9-50", "level": "8-9", "number": 50, "title": "Public park consultation · Lesson 50", "type": "Short answer", "instruction": "Answer the questions using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to public park consultation. The main session takes place on Monday at 9:15, and participants should meet at Hall B. Daniel Lewis explains that the most important point is visitors, while cloakroom is usually the detail people forget. The cost or reference given in the notice is £18, and everyone should bring a confirmation email. The final recommendation is to review exhibition rooms before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that guided tour should be interpreted in context, and that safety rules may influence the final decision.", "questions": ["What day is the session? <input data-answer='Monday'>.", "What time does it begin? <input data-answer='9:15'>.", "Where do participants meet? <input data-answer='Hall B'>.", "Who explains the information? <input data-answer='Daniel Lewis'>.", "What item should people bring? <input data-answer='confirmation email'>."]}, {"id": "8-9-51", "level": "8-9", "number": 51, "title": "Wildlife conservation talk · Lesson 51", "type": "Note completion", "instruction": "Complete the notes using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to wildlife conservation talk. The main session takes place on Tuesday at 10:45, and participants should meet at the main desk. Priya Shah explains that the most important point is commuters, while platform changes is usually the detail people forget. The cost or reference given in the notice is £24, and everyone should bring a student card. The final recommendation is to review ticket machines before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that delays should be interpreted in context, and that service information may influence the final decision.", "questions": ["The session takes place on <input data-answer='Tuesday'>.", "Participants should arrive at <input data-answer='10:45'>.", "The meeting point is <input data-answer='the main desk'>.", "The speaker is <input data-answer='Priya Shah'>.", "Everyone should bring a <input data-answer='student card'>."]}, {"id": "8-9-52", "level": "8-9", "number": 52, "title": "Drama class · Lesson 52", "type": "Plan labelling", "instruction": "Label the plan using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to drama class. The main session takes place on Wednesday at 11:20, and participants should meet at the north entrance. Oliver Grant explains that the most important point is residents, while compost is usually the detail people forget. The cost or reference given in the notice is £35, and everyone should bring a reference number. The final recommendation is to review watering rota before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that workshops should be interpreted in context, and that neighbourhood events may influence the final decision.", "questions": ["Entrance area: <input data-answer='the north entrance'>.", "Information desk contact: <input data-answer='Oliver Grant'>.", "Main time marker: <input data-answer='11:20'>.", "Required item: <input data-answer='reference number'>.", "Review point: <input data-answer='watering rota'>."]}, {"id": "8-9-53", "level": "8-9", "number": 53, "title": "Train station renovation · Lesson 53", "type": "Classification", "instruction": "Complete the notes using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to train station renovation. The main session takes place on Thursday at 2:30, and participants should meet at Studio 3. Nina Brooks explains that the most important point is receptionist, while patient form is usually the detail people forget. The cost or reference given in the notice is £45, and everyone should bring a safety briefing. The final recommendation is to review symptoms before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that appointment time should be interpreted in context, and that health card may influence the final decision.", "questionTitle": "A main issue · B forgotten detail · C final review · D required item · E cost/reference", "questions": ["receptionist: <input data-answer='A'>.", "patient form: <input data-answer='B'>.", "symptoms: <input data-answer='C'>.", "safety briefing: <input data-answer='D'>.", "£45: <input data-answer='E'>."]}, {"id": "8-9-54", "level": "8-9", "number": 54, "title": "Small business podcast · Lesson 54", "type": "Summary completion", "instruction": "Complete the notes using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to small business podcast. The main session takes place on Friday at 4:15, and participants should meet at Lab 4. James Miller explains that the most important point is halls, while shared flats is usually the detail people forget. The cost or reference given in the notice is £60, and everyone should bring a online account. The final recommendation is to review host families before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that deposits should be interpreted in context, and that laundry facilities may influence the final decision.", "questions": ["The session takes place on <input data-answer='Friday'>.", "Participants should arrive at <input data-answer='4:15'>.", "The meeting point is <input data-answer='Lab 4'>.", "The speaker is <input data-answer='James Miller'>.", "Everyone should bring a <input data-answer='online account'>."]}, {"id": "8-9-55", "level": "8-9", "number": 55, "title": "Emergency first aid course · Lesson 55", "type": "Sentence completion", "instruction": "Complete the notes using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to emergency first aid course. The main session takes place on Saturday at 6:40, and participants should meet at the visitor centre. Sofia Bennett explains that the most important point is urban trees, while heat islands is usually the detail people forget. The cost or reference given in the notice is £75, and everyone should bring a printed map. The final recommendation is to review pollution before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that construction damage should be interpreted in context, and that local councils may influence the final decision.", "questions": ["The session takes place on <input data-answer='Saturday'>.", "Participants should arrive at <input data-answer='6:40'>.", "The meeting point is <input data-answer='the visitor centre'>.", "The speaker is <input data-answer='Sofia Bennett'>.", "Everyone should bring a <input data-answer='printed map'>."]}, {"id": "8-9-56", "level": "8-9", "number": 56, "title": "City art gallery · Lesson 56", "type": "Form completion", "instruction": "Complete the form using no more than two words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to city art gallery. The main session takes place on Sunday at 7:10, and participants should meet at the seminar room. Ahmed Khan explains that the most important point is breakfast room, while gym is usually the detail people forget. The cost or reference given in the notice is £90, and everyone should bring a practice booklet. The final recommendation is to review swimming pool before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that laundry should be interpreted in context, and that reception services may influence the final decision.", "questions": ["Name: <input data-answer='Ahmed Khan'>.", "Day: <input data-answer='Sunday'>.", "Time: <input data-answer='7:10'>.", "Location: <input data-answer='the seminar room'>.", "Document/item required: <input data-answer='practice booklet'>."]}, {"id": "8-9-57", "level": "8-9", "number": 57, "title": "University counselling service · Lesson 57", "type": "Table completion", "instruction": "Complete the table using no more than two words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to university counselling service. The main session takes place on Monday at 8:30, and participants should meet at Room 12. Emma Carter explains that the most important point is students, while librarian is usually the detail people forget. The cost or reference given in the notice is £12, and everyone should bring a feedback form. The final recommendation is to review quiet study rooms before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that digital loans should be interpreted in context, and that late return policy may influence the final decision.", "questions": ["Date/day: <input data-answer='Monday'>.", "Start time: <input data-answer='8:30'>.", "Meeting place: <input data-answer='Room 12'>.", "Person in charge: <input data-answer='Emma Carter'>.", "Item to bring: <input data-answer='feedback form'>."]}, {"id": "8-9-58", "level": "8-9", "number": 58, "title": "Cycling safety talk · Lesson 58", "type": "Matching", "instruction": "Complete the notes using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to cycling safety talk. The main session takes place on Tuesday at 9:15, and participants should meet at Hall B. Daniel Lewis explains that the most important point is visitors, while cloakroom is usually the detail people forget. The cost or reference given in the notice is £18, and everyone should bring a confirmation email. The final recommendation is to review exhibition rooms before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that guided tour should be interpreted in context, and that safety rules may influence the final decision.", "questionTitle": "Categories: A main session · B meeting point · C speaker · D required item · E cost/reference", "questions": ["Tuesday: <input data-answer='A'>.", "Hall B: <input data-answer='B'>.", "Daniel Lewis: <input data-answer='C'>.", "confirmation email: <input data-answer='D'>.", "£18: <input data-answer='E'>."]}, {"id": "8-9-59", "level": "8-9", "number": 59, "title": "Local history archive · Lesson 59", "type": "Multiple choice", "instruction": "Complete the notes using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to local history archive. The main session takes place on Wednesday at 10:45, and participants should meet at the main desk. Priya Shah explains that the most important point is commuters, while platform changes is usually the detail people forget. The cost or reference given in the notice is £24, and everyone should bring a student card. The final recommendation is to review ticket machines before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that delays should be interpreted in context, and that service information may influence the final decision.", "mcq": [{"q": "When does the main session take place?", "options": ["Sunday", "Wednesday", "Wednesday"], "answer": 1}, {"q": "Where should participants meet?", "options": ["the main desk", "the car park", "the cafeteria"], "answer": 0}, {"q": "Who gives the explanation?", "options": ["a visitor", "the receptionist", "Priya Shah"], "answer": 2}, {"q": "What should people bring?", "options": ["a laptop charger", "a lunch box", "student card"], "answer": 2}, {"q": "What should be reviewed before leaving?", "options": ["the building colour", "the weather", "ticket machines"], "answer": 2}]}, {"id": "8-9-60", "level": "8-9", "number": 60, "title": "Cooking competition · Lesson 60", "type": "Short answer", "instruction": "Answer the questions using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to cooking competition. The main session takes place on Thursday at 11:20, and participants should meet at the north entrance. Oliver Grant explains that the most important point is residents, while compost is usually the detail people forget. The cost or reference given in the notice is £35, and everyone should bring a reference number. The final recommendation is to review watering rota before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that workshops should be interpreted in context, and that neighbourhood events may influence the final decision.", "questions": ["What day is the session? <input data-answer='Thursday'>.", "What time does it begin? <input data-answer='11:20'>.", "Where do participants meet? <input data-answer='the north entrance'>.", "Who explains the information? <input data-answer='Oliver Grant'>.", "What item should people bring? <input data-answer='reference number'>."]}, {"id": "8-9-61", "level": "8-9", "number": 61, "title": "Nature reserve visit · Lesson 61", "type": "Note completion", "instruction": "Complete the notes using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to nature reserve visit. The main session takes place on Friday at 2:30, and participants should meet at Studio 3. Nina Brooks explains that the most important point is receptionist, while patient form is usually the detail people forget. The cost or reference given in the notice is £45, and everyone should bring a safety briefing. The final recommendation is to review symptoms before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that appointment time should be interpreted in context, and that health card may influence the final decision.", "questions": ["The session takes place on <input data-answer='Friday'>.", "Participants should arrive at <input data-answer='2:30'>.", "The meeting point is <input data-answer='Studio 3'>.", "The speaker is <input data-answer='Nina Brooks'>.", "Everyone should bring a <input data-answer='safety briefing'>."]}, {"id": "8-9-62", "level": "8-9", "number": 62, "title": "Podcast production class · Lesson 62", "type": "Plan labelling", "instruction": "Label the plan using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to podcast production class. The main session takes place on Saturday at 4:15, and participants should meet at Lab 4. James Miller explains that the most important point is halls, while shared flats is usually the detail people forget. The cost or reference given in the notice is £60, and everyone should bring a online account. The final recommendation is to review host families before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that deposits should be interpreted in context, and that laundry facilities may influence the final decision.", "questions": ["Entrance area: <input data-answer='Lab 4'>.", "Information desk contact: <input data-answer='James Miller'>.", "Main time marker: <input data-answer='4:15'>.", "Required item: <input data-answer='online account'>.", "Review point: <input data-answer='host families'>."]}, {"id": "8-9-63", "level": "8-9", "number": 63, "title": "Community theatre audition · Lesson 63", "type": "Classification", "instruction": "Complete the notes using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to community theatre audition. The main session takes place on Sunday at 6:40, and participants should meet at the visitor centre. Sofia Bennett explains that the most important point is urban trees, while heat islands is usually the detail people forget. The cost or reference given in the notice is £75, and everyone should bring a printed map. The final recommendation is to review pollution before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that construction damage should be interpreted in context, and that local councils may influence the final decision.", "questionTitle": "A main issue · B forgotten detail · C final review · D required item · E cost/reference", "questions": ["urban trees: <input data-answer='A'>.", "heat islands: <input data-answer='B'>.", "pollution: <input data-answer='C'>.", "printed map: <input data-answer='D'>.", "£75: <input data-answer='E'>."]}, {"id": "8-9-64", "level": "8-9", "number": 64, "title": "Online banking security · Lesson 64", "type": "Summary completion", "instruction": "Complete the notes using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to online banking security. The main session takes place on Monday at 7:10, and participants should meet at the seminar room. Ahmed Khan explains that the most important point is breakfast room, while gym is usually the detail people forget. The cost or reference given in the notice is £90, and everyone should bring a practice booklet. The final recommendation is to review swimming pool before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that laundry should be interpreted in context, and that reception services may influence the final decision.", "questions": ["The session takes place on <input data-answer='Monday'>.", "Participants should arrive at <input data-answer='7:10'>.", "The meeting point is <input data-answer='the seminar room'>.", "The speaker is <input data-answer='Ahmed Khan'>.", "Everyone should bring a <input data-answer='practice booklet'>."]}, {"id": "8-9-65", "level": "8-9", "number": 65, "title": "Road safety campaign · Lesson 65", "type": "Sentence completion", "instruction": "Complete the notes using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to road safety campaign. The main session takes place on Tuesday at 8:30, and participants should meet at Room 12. Emma Carter explains that the most important point is students, while librarian is usually the detail people forget. The cost or reference given in the notice is £12, and everyone should bring a feedback form. The final recommendation is to review quiet study rooms before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that digital loans should be interpreted in context, and that late return policy may influence the final decision.", "questions": ["The session takes place on <input data-answer='Tuesday'>.", "Participants should arrive at <input data-answer='8:30'>.", "The meeting point is <input data-answer='Room 12'>.", "The speaker is <input data-answer='Emma Carter'>.", "Everyone should bring a <input data-answer='feedback form'>."]}, {"id": "8-9-66", "level": "8-9", "number": 66, "title": "Language school enrolment · Lesson 66", "type": "Form completion", "instruction": "Complete the form using no more than two words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to language school enrolment. The main session takes place on Wednesday at 9:15, and participants should meet at Hall B. Daniel Lewis explains that the most important point is visitors, while cloakroom is usually the detail people forget. The cost or reference given in the notice is £18, and everyone should bring a confirmation email. The final recommendation is to review exhibition rooms before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that guided tour should be interpreted in context, and that safety rules may influence the final decision.", "questions": ["Name: <input data-answer='Daniel Lewis'>.", "Day: <input data-answer='Wednesday'>.", "Time: <input data-answer='9:15'>.", "Location: <input data-answer='Hall B'>.", "Document/item required: <input data-answer='confirmation email'>."]}, {"id": "8-9-67", "level": "8-9", "number": 67, "title": "Local swimming pool · Lesson 67", "type": "Table completion", "instruction": "Complete the table using no more than two words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to local swimming pool. The main session takes place on Thursday at 10:45, and participants should meet at the main desk. Priya Shah explains that the most important point is commuters, while platform changes is usually the detail people forget. The cost or reference given in the notice is £24, and everyone should bring a student card. The final recommendation is to review ticket machines before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that delays should be interpreted in context, and that service information may influence the final decision.", "questions": ["Date/day: <input data-answer='Thursday'>.", "Start time: <input data-answer='10:45'>.", "Meeting place: <input data-answer='the main desk'>.", "Person in charge: <input data-answer='Priya Shah'>.", "Item to bring: <input data-answer='student card'>."]}, {"id": "8-9-68", "level": "8-9", "number": 68, "title": "Library research skills · Lesson 68", "type": "Matching", "instruction": "Complete the notes using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to library research skills. The main session takes place on Friday at 11:20, and participants should meet at the north entrance. Oliver Grant explains that the most important point is residents, while compost is usually the detail people forget. The cost or reference given in the notice is £35, and everyone should bring a reference number. The final recommendation is to review watering rota before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that workshops should be interpreted in context, and that neighbourhood events may influence the final decision.", "questionTitle": "Categories: A main session · B meeting point · C speaker · D required item · E cost/reference", "questions": ["Friday: <input data-answer='A'>.", "the north entrance: <input data-answer='B'>.", "Oliver Grant: <input data-answer='C'>.", "reference number: <input data-answer='D'>.", "£35: <input data-answer='E'>."]}, {"id": "8-9-69", "level": "8-9", "number": 69, "title": "Animal shelter volunteering · Lesson 69", "type": "Multiple choice", "instruction": "Complete the notes using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to animal shelter volunteering. The main session takes place on Saturday at 2:30, and participants should meet at Studio 3. Nina Brooks explains that the most important point is receptionist, while patient form is usually the detail people forget. The cost or reference given in the notice is £45, and everyone should bring a safety briefing. The final recommendation is to review symptoms before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that appointment time should be interpreted in context, and that health card may influence the final decision.", "mcq": [{"q": "When does the main session take place?", "options": ["Sunday", "Saturday", "Wednesday"], "answer": 1}, {"q": "Where should participants meet?", "options": ["the car park", "the cafeteria", "Studio 3"], "answer": 2}, {"q": "Who gives the explanation?", "options": ["the receptionist", "Nina Brooks", "a visitor"], "answer": 1}, {"q": "What should people bring?", "options": ["a lunch box", "a laptop charger", "safety briefing"], "answer": 2}, {"q": "What should be reviewed before leaving?", "options": ["the weather", "symptoms", "the building colour"], "answer": 1}]}, {"id": "8-9-70", "level": "8-9", "number": 70, "title": "City council recycling · Lesson 70", "type": "Short answer", "instruction": "Answer the questions using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to city council recycling. The main session takes place on Sunday at 4:15, and participants should meet at Lab 4. James Miller explains that the most important point is halls, while shared flats is usually the detail people forget. The cost or reference given in the notice is £60, and everyone should bring a online account. The final recommendation is to review host families before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that deposits should be interpreted in context, and that laundry facilities may influence the final decision.", "questions": ["What day is the session? <input data-answer='Sunday'>.", "What time does it begin? <input data-answer='4:15'>.", "Where do participants meet? <input data-answer='Lab 4'>.", "Who explains the information? <input data-answer='James Miller'>.", "What item should people bring? <input data-answer='online account'>."]}, {"id": "8-9-71", "level": "8-9", "number": 71, "title": "University sports team · Lesson 71", "type": "Note completion", "instruction": "Complete the notes using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to university sports team. The main session takes place on Monday at 6:40, and participants should meet at the visitor centre. Sofia Bennett explains that the most important point is urban trees, while heat islands is usually the detail people forget. The cost or reference given in the notice is £75, and everyone should bring a printed map. The final recommendation is to review pollution before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that construction damage should be interpreted in context, and that local councils may influence the final decision.", "questions": ["The session takes place on <input data-answer='Monday'>.", "Participants should arrive at <input data-answer='6:40'>.", "The meeting point is <input data-answer='the visitor centre'>.", "The speaker is <input data-answer='Sofia Bennett'>.", "Everyone should bring a <input data-answer='printed map'>."]}, {"id": "8-9-72", "level": "8-9", "number": 72, "title": "Art history lecture · Lesson 72", "type": "Plan labelling", "instruction": "Label the plan using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to art history lecture. The main session takes place on Tuesday at 7:10, and participants should meet at the seminar room. Ahmed Khan explains that the most important point is breakfast room, while gym is usually the detail people forget. The cost or reference given in the notice is £90, and everyone should bring a practice booklet. The final recommendation is to review swimming pool before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that laundry should be interpreted in context, and that reception services may influence the final decision.", "questions": ["Entrance area: <input data-answer='the seminar room'>.", "Information desk contact: <input data-answer='Ahmed Khan'>.", "Main time marker: <input data-answer='7:10'>.", "Required item: <input data-answer='practice booklet'>.", "Review point: <input data-answer='swimming pool'>."]}, {"id": "8-9-73", "level": "8-9", "number": 73, "title": "Medical research study · Lesson 73", "type": "Classification", "instruction": "Complete the notes using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to medical research study. The main session takes place on Wednesday at 8:30, and participants should meet at Room 12. Emma Carter explains that the most important point is students, while librarian is usually the detail people forget. The cost or reference given in the notice is £12, and everyone should bring a feedback form. The final recommendation is to review quiet study rooms before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that digital loans should be interpreted in context, and that late return policy may influence the final decision.", "questionTitle": "A main issue · B forgotten detail · C final review · D required item · E cost/reference", "questions": ["students: <input data-answer='A'>.", "librarian: <input data-answer='B'>.", "quiet study rooms: <input data-answer='C'>.", "feedback form: <input data-answer='D'>.", "£12: <input data-answer='E'>."]}, {"id": "8-9-74", "level": "8-9", "number": 74, "title": "Cafe staff training · Lesson 74", "type": "Summary completion", "instruction": "Complete the notes using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to cafe staff training. The main session takes place on Thursday at 9:15, and participants should meet at Hall B. Daniel Lewis explains that the most important point is visitors, while cloakroom is usually the detail people forget. The cost or reference given in the notice is £18, and everyone should bring a confirmation email. The final recommendation is to review exhibition rooms before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that guided tour should be interpreted in context, and that safety rules may influence the final decision.", "questions": ["The session takes place on <input data-answer='Thursday'>.", "Participants should arrive at <input data-answer='9:15'>.", "The meeting point is <input data-answer='Hall B'>.", "The speaker is <input data-answer='Daniel Lewis'>.", "Everyone should bring a <input data-answer='confirmation email'>."]}, {"id": "8-9-75", "level": "8-9", "number": 75, "title": "School open day · Lesson 75", "type": "Sentence completion", "instruction": "Complete the notes using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to school open day. The main session takes place on Friday at 10:45, and participants should meet at the main desk. Priya Shah explains that the most important point is commuters, while platform changes is usually the detail people forget. The cost or reference given in the notice is £24, and everyone should bring a student card. The final recommendation is to review ticket machines before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that delays should be interpreted in context, and that service information may influence the final decision.", "questions": ["The session takes place on <input data-answer='Friday'>.", "Participants should arrive at <input data-answer='10:45'>.", "The meeting point is <input data-answer='the main desk'>.", "The speaker is <input data-answer='Priya Shah'>.", "Everyone should bring a <input data-answer='student card'>."]}, {"id": "8-9-76", "level": "8-9", "number": 76, "title": "Digital photography lecture · Lesson 76", "type": "Form completion", "instruction": "Complete the form using no more than two words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to digital photography lecture. The main session takes place on Saturday at 11:20, and participants should meet at the north entrance. Oliver Grant explains that the most important point is residents, while compost is usually the detail people forget. The cost or reference given in the notice is £35, and everyone should bring a reference number. The final recommendation is to review watering rota before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that workshops should be interpreted in context, and that neighbourhood events may influence the final decision.", "questions": ["Name: <input data-answer='Oliver Grant'>.", "Day: <input data-answer='Saturday'>.", "Time: <input data-answer='11:20'>.", "Location: <input data-answer='the north entrance'>.", "Document/item required: <input data-answer='reference number'>."]}, {"id": "8-9-77", "level": "8-9", "number": 77, "title": "Local bus complaint · Lesson 77", "type": "Table completion", "instruction": "Complete the table using no more than two words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to local bus complaint. The main session takes place on Sunday at 2:30, and participants should meet at Studio 3. Nina Brooks explains that the most important point is receptionist, while patient form is usually the detail people forget. The cost or reference given in the notice is £45, and everyone should bring a safety briefing. The final recommendation is to review symptoms before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that appointment time should be interpreted in context, and that health card may influence the final decision.", "questions": ["Date/day: <input data-answer='Sunday'>.", "Start time: <input data-answer='2:30'>.", "Meeting place: <input data-answer='Studio 3'>.", "Person in charge: <input data-answer='Nina Brooks'>.", "Item to bring: <input data-answer='safety briefing'>."]}, {"id": "8-9-78", "level": "8-9", "number": 78, "title": "Work-life balance talk · Lesson 78", "type": "Matching", "instruction": "Complete the notes using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to work-life balance talk. The main session takes place on Monday at 4:15, and participants should meet at Lab 4. James Miller explains that the most important point is halls, while shared flats is usually the detail people forget. The cost or reference given in the notice is £60, and everyone should bring a online account. The final recommendation is to review host families before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that deposits should be interpreted in context, and that laundry facilities may influence the final decision.", "questionTitle": "Categories: A main session · B meeting point · C speaker · D required item · E cost/reference", "questions": ["Monday: <input data-answer='A'>.", "Lab 4: <input data-answer='B'>.", "James Miller: <input data-answer='C'>.", "online account: <input data-answer='D'>.", "£60: <input data-answer='E'>."]}, {"id": "8-9-79", "level": "8-9", "number": 79, "title": "Public speaking workshop · Lesson 79", "type": "Multiple choice", "instruction": "Complete the notes using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to public speaking workshop. The main session takes place on Tuesday at 6:40, and participants should meet at the visitor centre. Sofia Bennett explains that the most important point is urban trees, while heat islands is usually the detail people forget. The cost or reference given in the notice is £75, and everyone should bring a printed map. The final recommendation is to review pollution before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that construction damage should be interpreted in context, and that local councils may influence the final decision.", "mcq": [{"q": "When does the main session take place?", "options": ["Tuesday", "Sunday", "Wednesday"], "answer": 0}, {"q": "Where should participants meet?", "options": ["the car park", "the cafeteria", "the visitor centre"], "answer": 2}, {"q": "Who gives the explanation?", "options": ["Sofia Bennett", "the receptionist", "a visitor"], "answer": 0}, {"q": "What should people bring?", "options": ["a lunch box", "a laptop charger", "printed map"], "answer": 2}, {"q": "What should be reviewed before leaving?", "options": ["pollution", "the weather", "the building colour"], "answer": 0}]}, {"id": "8-9-80", "level": "8-9", "number": 80, "title": "Gardening radio show · Lesson 80", "type": "Short answer", "instruction": "Answer the questions using no more than three words and/or a number.", "transcript": "The speaker evaluates causes, implications and evidence in relation to gardening radio show. The main session takes place on Wednesday at 7:10, and participants should meet at the seminar room. Ahmed Khan explains that the most important point is breakfast room, while gym is usually the detail people forget. The cost or reference given in the notice is £90, and everyone should bring a practice booklet. The final recommendation is to review swimming pool before leaving, because this helps avoid common mistakes. In addition, the speaker stresses that laundry should be interpreted in context, and that reception services may influence the final decision.", "questions": ["What day is the session? <input data-answer='Wednesday'>.", "What time does it begin? <input data-answer='7:10'>.", "Where do participants meet? <input data-answer='the seminar room'>.", "Who explains the information? <input data-answer='Ahmed Khan'>.", "What item should people bring? <input data-answer='practice booklet'>."]}];
  const $ = (id) => document.getElementById(id);

  function escapeSafe(text = "") {
    if (typeof escapeHTML === "function") return escapeHTML(text);
    return String(text).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  }

  function normalizeAnswer(text = "") {
    return String(text)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[’']/g, "")
      .replace(/[^a-z0-9\s:]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function splitTranscript(text) {
    return String(text)
      .replace(/([.?!])\s+/g, "$1|")
      .split("|")
      .map((chunk) => chunk.trim())
      .filter(Boolean);
  }

  function roughPronunciation(text = "") {
    return String(text)
      .toLowerCase()
      .replace(/i'm/g, "aim")
      .replace(/you're/g, "iur")
      .replace(/we're/g, "uir")
      .replace(/they're/g, "deir")
      .replace(/can't/g, "kant")
      .replace(/don't/g, "dont")
      .replace(/won't/g, "wount")
      .replace(/would/g, "wud")
      .replace(/could/g, "kud")
      .replace(/should/g, "shud")
      .replace(/through/g, "zru")
      .replace(/thought/g, "zot")
      .replace(/enough/g, "inaf")
      .replace(/tion/g, "shon")
      .replace(/ing\b/g, "in")
      .replace(/th/g, "d")
      .replace(/oo/g, "u")
      .replace(/ph/g, "f");
  }

  function setupResourceMenu() {
    const menu = $("resourceMenu");
    const toggle = $("resourceMenuToggle");
    const panel = $("resourceMenuPanel");
    if (!menu || !toggle || !panel || toggle.dataset.v33Ready === "true") return;

    toggle.dataset.v33Ready = "true";

    function setOpen(open) {
      menu.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    }

    toggle.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      setOpen(!menu.classList.contains("open"));
    });

    panel.addEventListener("click", (event) => {
      const studyButton = event.target.closest("[data-study-target]");
      if (studyButton) {
        event.preventDefault();
        setOpen(false);
        const target = studyButton.dataset.studyTarget;
        if (typeof openDashboard === "function") openDashboard(target);
        else document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      if (event.target.closest("[data-resource]")) {
        setOpen(false);
      }
    });

    document.addEventListener("click", (event) => {
      if (!menu.contains(event.target)) setOpen(false);
    });
  }

  function setupTimerOutsideClick() {
    if (window.__timerOutsideClickV33) return;
    window.__timerOutsideClickV33 = true;

    document.addEventListener("click", (event) => {
      const panel = $("timerPanel");
      if (!panel || !panel.classList.contains("open")) return;

      const clickedPanel = event.target.closest("#timerPanel");
      const clickedToggle = event.target.closest("#timerToggleBtn");
      const clickedMini = event.target.closest("#miniTimerBubble");

      if (clickedPanel || clickedToggle || clickedMini) return;

      panel.classList.remove("open");
      document.body.classList.remove("timer-panel-open");

      if (typeof updateTimerUI === "function") updateTimerUI();
    });
  }

  function setupStableSessionCounter() {
    if (window.__stableSessionCounterV33) return;
    window.__stableSessionCounterV33 = true;

    const initial =
      Number(localStorage.getItem("englishTrainerCurrentSessionSecondsV33")) ||
      Number(localStorage.getItem("englishTrainerCurrentSessionSecondsV32")) ||
      Number(localStorage.getItem("englishTrainerCurrentSessionSecondsV30")) ||
      0;

    let seconds = initial;
    let lastInteraction = Date.now();
    let lastRenderedText = "";
    const activeWindow = 65000;

    function registerActivity() {
      lastInteraction = Date.now();
    }

    function format(secondsValue) {
      const minutes = Math.floor(secondsValue / 60);
      if (minutes < 60) return `${minutes}m`;
      const hours = Math.floor(minutes / 60);
      const rest = minutes % 60;
      return rest ? `${hours}h ${rest}m` : `${hours}h`;
    }

    function render(force = false) {
      const text = $("currentSessionText");
      const bar = $("currentSessionBar");
      const formatted = format(seconds);

      if (text && (force || formatted !== lastRenderedText)) {
        text.textContent = formatted;
        lastRenderedText = formatted;
      }

      if (bar && (force || seconds % 60 === 0)) {
        bar.style.width = `${Math.min(100, (seconds / 7200) * 100)}%`;
      }
    }

    ["click", "keydown", "pointerdown", "scroll", "input", "change", "touchstart"].forEach((eventName) => {
      window.addEventListener(eventName, registerActivity, { passive: true });
    });

    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) registerActivity();
    });

    window.setInterval(() => {
      if (document.hidden || Date.now() - lastInteraction > activeWindow) return;

      seconds += 1;

      if (seconds % 10 === 0) {
        localStorage.setItem("englishTrainerCurrentSessionSecondsV33", String(seconds));
      }

      render(false);
    }, 1000);

    render(true);
  }

  /* ------------------------------
     Listening engine
  ------------------------------ */
  const listeningState = {
    currentLesson: null,
    voices: [],
    voiceMap: { female: null, male: null },
    isPlaying: false,
    isPaused: false,
    chunks: [],
    currentChunkIndex: 0,
    chunkTimer: null,
    chunkStartedAt: 0,
    chunkEstimatedMs: 0,
    progressBeforeChunk: 0,
    token: 0,
    suppressCancelEvents: false,
    restartDebounce: null
  };

  function listeningLevel() {
    return $("listeningLevel")?.value || "6";
  }

  function listeningLessonsForLevel() {
    return LISTENING_LESSONS_V33.filter((lesson) => lesson.level === listeningLevel());
  }

  function populateListeningLessons() {
    const select = $("listeningLessonSelect");
    if (!select) return;

    const lessons = listeningLessonsForLevel();
    select.innerHTML = lessons.map((lesson) => {
      const title = lesson.title.replace(/ · Lesson \d+$/, "");
      return `<option value="${lesson.id}">Lesson ${lesson.number} · ${escapeSafe(title)}</option>`;
    }).join("");

    if (lessons.length) select.value = lessons[0].id;
  }

  function selectedListeningLesson() {
    const id = $("listeningLessonSelect")?.value;
    return LISTENING_LESSONS_V33.find((lesson) => lesson.id === id)
      || listeningLessonsForLevel()[0]
      || LISTENING_LESSONS_V33[0];
  }

  function getListeningAnswers(lesson) {
    if (!lesson) return [];
    if (lesson.type === "Multiple choice") {
      return (lesson.mcq || []).map((q, index) => `${index + 1}. ${String.fromCharCode(97 + q.answer)}) ${q.options[q.answer]}`);
    }

    return (lesson.questions || []).map((q) => {
      const match = String(q).match(/data-answer=['"]([^'"]+)['"]/);
      return match ? match[1] : "";
    });
  }

  function setListeningStatus(text) {
    if ($("listeningStatus")) $("listeningStatus").textContent = text;
    if ($("listeningMiniStatus")) $("listeningMiniStatus").textContent = text;
  }

  function updateListeningWpmLabel() {
    if ($("wpmValue")) $("wpmValue").textContent = `${$("listeningWpm")?.value || 135} WPM`;
  }

  function updateListeningProgress(value) {
    if ($("listeningProgressBar")) {
      $("listeningProgressBar").style.width = `${Math.max(0, Math.min(100, value))}%`;
    }
  }

  function loadEnglishVoices() {
    if (!("speechSynthesis" in window)) return;

    const all = window.speechSynthesis.getVoices();
    listeningState.voices = all.filter((voice) => /^en/i.test(voice.lang));
    if (!listeningState.voices.length) listeningState.voices = all;

    const femaleRx = /(female|woman|zira|jenny|aria|susan|samantha|victoria|karen|serena|natasha|sonia|libby|elsie|emma|olivia|ava|hazel)/i;
    const maleRx = /(male|man|david|mark|daniel|george|guy|ryan|alex|fred|tom|arthur|brian|james|william|oliver)/i;

    listeningState.voiceMap.female = listeningState.voices.find((voice) => femaleRx.test(voice.name)) || listeningState.voices[0] || null;
    listeningState.voiceMap.male = listeningState.voices.find((voice) => maleRx.test(voice.name) && voice !== listeningState.voiceMap.female)
      || listeningState.voices.find((voice) => voice !== listeningState.voiceMap.female)
      || listeningState.voices[1]
      || listeningState.voices[0]
      || null;
  }

  function selectedListeningVoice() {
    const type = $("voiceSelect")?.value || "female";
    return listeningState.voiceMap[type] || listeningState.voices[0] || null;
  }

  function listeningRate() {
    const wpm = Number($("listeningWpm")?.value || 135);
    return Math.max(0.55, Math.min(1.65, wpm / 135));
  }

  function listeningVolume() {
    return Number($("listeningVolume")?.value || 0.85);
  }

  function estimateListeningChunkMs(text) {
    const wpm = Number($("listeningWpm")?.value || 135);
    const words = String(text).split(/\s+/).filter(Boolean).length;
    return Math.max(1200, (words / Math.max(60, wpm)) * 60000);
  }

  function updateListeningChunkProgress() {
    if (!listeningState.isPlaying || listeningState.isPaused || !listeningState.chunks.length) return;

    const perChunk = 100 / listeningState.chunks.length;
    const elapsed = Date.now() - listeningState.chunkStartedAt;
    const ratio = Math.min(1, elapsed / Math.max(1, listeningState.chunkEstimatedMs));

    updateListeningProgress(listeningState.progressBeforeChunk + ratio * perChunk);
  }

  function updateListeningButtons() {
    const play = $("playListeningBtn");
    const pause = $("pauseListeningBtn");

    if (play) play.textContent = listeningState.isPlaying ? "Reiniciar audio" : "Play";

    if (pause) {
      pause.textContent = listeningState.isPaused ? "Reanudar" : "Pausa";
      pause.disabled = !listeningState.isPlaying;
    }
  }

  function safeCancelListeningSpeech() {
    if (!("speechSynthesis" in window)) return;

    listeningState.suppressCancelEvents = true;
    window.speechSynthesis.cancel();

    window.setTimeout(() => {
      listeningState.suppressCancelEvents = false;
    }, 80);
  }

  function cancelListeningSpeech(resetProgress = true) {
    listeningState.token += 1;
    clearTimeout(listeningState.restartDebounce);
    clearInterval(listeningState.chunkTimer);
    safeCancelListeningSpeech();

    listeningState.isPlaying = false;
    listeningState.isPaused = false;
    listeningState.currentChunkIndex = 0;

    if (resetProgress) updateListeningProgress(0);

    setListeningStatus("Listo para escuchar");
    updateListeningButtons();
  }

  function speakListeningChunk() {
    if (!("speechSynthesis" in window)) {
      alert("Este navegador no soporta síntesis de voz. Probá con Chrome, Edge o Safari.");
      return;
    }

    if (!listeningState.chunks[listeningState.currentChunkIndex]) {
      listeningState.isPlaying = false;
      listeningState.isPaused = false;
      clearInterval(listeningState.chunkTimer);
      updateListeningProgress(100);
      setListeningStatus("Audio finalizado");
      updateListeningButtons();
      return;
    }

    const token = ++listeningState.token;
    const utterance = new SpeechSynthesisUtterance(listeningState.chunks[listeningState.currentChunkIndex]);
    const voice = selectedListeningVoice();

    if (voice) utterance.voice = voice;

    utterance.volume = listeningVolume();
    utterance.rate = listeningRate();
    utterance.pitch = $("voiceSelect")?.value === "male" ? 0.92 : 1.04;

    listeningState.chunkStartedAt = Date.now();
    listeningState.chunkEstimatedMs = estimateListeningChunkMs(listeningState.chunks[listeningState.currentChunkIndex]);
    listeningState.progressBeforeChunk = (listeningState.currentChunkIndex / listeningState.chunks.length) * 100;

    clearInterval(listeningState.chunkTimer);
    listeningState.chunkTimer = setInterval(updateListeningChunkProgress, 180);

    utterance.onend = () => {
      if (token !== listeningState.token || listeningState.suppressCancelEvents || !listeningState.isPlaying || listeningState.isPaused) return;
      listeningState.currentChunkIndex += 1;
      speakListeningChunk();
    };

    utterance.onerror = (event) => {
      if (token !== listeningState.token || listeningState.suppressCancelEvents || event.error === "interrupted" || event.error === "canceled") return;

      clearInterval(listeningState.chunkTimer);
      listeningState.isPlaying = false;
      listeningState.isPaused = false;
      setListeningStatus("No se pudo reproducir el audio");
      updateListeningButtons();
    };

    window.speechSynthesis.speak(utterance);
  }

  function renderListeningLesson() {
    cancelListeningSpeech(false);

    listeningState.currentLesson = selectedListeningLesson();
    const lesson = listeningState.currentLesson;
    if (!lesson) return;

    if ($("listeningType")) $("listeningType").textContent = lesson.type;
    if ($("listeningTitle")) $("listeningTitle").textContent = lesson.title;
    if ($("listeningInstruction")) $("listeningInstruction").textContent = lesson.instruction;
    if ($("listeningTranscript")) $("listeningTranscript").textContent = lesson.transcript;
    if ($("listeningScore")) $("listeningScore").textContent = "";

    const questions = $("listeningQuestions");
    if (questions) {
      questions.innerHTML = "";

      if (lesson.questionTitle) {
        questions.innerHTML += `<div class="listening-question-title">${escapeSafe(lesson.questionTitle)}</div>`;
      }

      if (lesson.type === "Multiple choice") {
        questions.innerHTML += (lesson.mcq || []).map((item, idx) => `
          <article class="listening-question-block">
            <strong>Question ${idx + 1}: ${escapeSafe(item.q)}</strong>
            <div class="listening-mcq-options">
              ${item.options.map((opt, optIdx) => `
                <label>
                  <input type="radio" name="listening-mcq-${idx}" value="${optIdx}">
                  <span>${String.fromCharCode(97 + optIdx)}) ${escapeSafe(opt)}</span>
                </label>
              `).join("")}
            </div>
          </article>
        `).join("");
      } else {
        questions.innerHTML += `
          <ol class="listening-fill-list">
            ${(lesson.questions || []).map((q) => `<li>${q}</li>`).join("")}
          </ol>
        `;
      }
    }

    if ($("listeningAnswers")) {
      $("listeningAnswers").innerHTML = getListeningAnswers(lesson).map((ans) => `<li>${escapeSafe(ans)}</li>`).join("");
    }

    updateListeningProgress(0);
    setListeningStatus("Listo para escuchar");
    updateListeningButtons();
  }

  function checkListeningAnswers() {
    const lesson = listeningState.currentLesson || selectedListeningLesson();
    const score = $("listeningScore");
    if (!lesson || !score) return;

    let total = 0;
    let correct = 0;

    if (lesson.type === "Multiple choice") {
      (lesson.mcq || []).forEach((item, idx) => {
        total += 1;
        const selected = document.querySelector(`input[name="listening-mcq-${idx}"]:checked`);
        const block = document.querySelectorAll(".listening-question-block")[idx];
        const ok = selected && Number(selected.value) === item.answer;

        if (ok) correct += 1;

        block?.classList.toggle("correct", !!ok);
        block?.classList.toggle("incorrect", !ok);
      });
    } else {
      document.querySelectorAll("#listeningQuestions input[data-answer]").forEach((input) => {
        total += 1;
        const ok = normalizeAnswer(input.dataset.answer || "") === normalizeAnswer(input.value || "");

        if (ok) correct += 1;

        input.classList.toggle("correct", ok);
        input.classList.toggle("incorrect", !ok);
      });
    }

    const percent = total ? Math.round((correct / total) * 100) : 0;
    score.textContent = `${correct}/${total} correctas · ${percent}%`;
    $("answersPanel")?.setAttribute("open", "open");

    if (typeof logActivity === "function") logActivity(`Listening · ${percent}%`);
  }

  function clearListeningAnswers() {
    document.querySelectorAll("#listeningQuestions input").forEach((input) => {
      input.checked = false;
      input.value = "";
      input.classList.remove("correct", "incorrect");
    });

    document.querySelectorAll(".listening-question-block").forEach((block) => {
      block.classList.remove("correct", "incorrect");
    });

    if ($("listeningScore")) $("listeningScore").textContent = "";
  }

  function playListening() {
    if (!("speechSynthesis" in window)) {
      alert("Este navegador no soporta síntesis de voz. Probá con Chrome, Edge o Safari.");
      return;
    }

    if (listeningState.isPaused) {
      listeningState.isPaused = false;
      listeningState.isPlaying = true;
      setListeningStatus("Reproduciendo");
      updateListeningButtons();
      speakListeningChunk();
      return;
    }

    safeCancelListeningSpeech();
    clearInterval(listeningState.chunkTimer);

    listeningState.currentLesson = listeningState.currentLesson || selectedListeningLesson();
    listeningState.chunks = splitTranscript(listeningState.currentLesson?.transcript || "");
    listeningState.currentChunkIndex = 0;
    listeningState.isPlaying = true;
    listeningState.isPaused = false;

    updateListeningProgress(0);
    setListeningStatus("Reproduciendo");
    updateListeningButtons();
    speakListeningChunk();
  }

  function pauseListening() {
    if (!listeningState.isPlaying) return;

    if (!listeningState.isPaused) {
      listeningState.token += 1;
      clearTimeout(listeningState.restartDebounce);
      clearInterval(listeningState.chunkTimer);
      safeCancelListeningSpeech();

      listeningState.isPaused = true;
      setListeningStatus("Pausado");
      updateListeningButtons();
      return;
    }

    listeningState.isPaused = false;
    listeningState.isPlaying = true;
    setListeningStatus("Reproduciendo");
    updateListeningButtons();
    speakListeningChunk();
  }

  function scheduleListeningRebuild() {
    updateListeningWpmLabel();

    if (!listeningState.isPlaying || listeningState.isPaused) return;

    clearTimeout(listeningState.restartDebounce);
    listeningState.restartDebounce = window.setTimeout(() => {
      if (!listeningState.isPlaying || listeningState.isPaused) return;

      listeningState.token += 1;
      clearInterval(listeningState.chunkTimer);
      safeCancelListeningSpeech();

      setListeningStatus("Ajustando audio...");

      window.setTimeout(() => {
        if (!listeningState.isPlaying || listeningState.isPaused) return;
        setListeningStatus("Reproduciendo");
        speakListeningChunk();
      }, 120);
    }, 180);
  }

  function nextListening() {
    const select = $("listeningLessonSelect");
    if (!select) return;

    const options = Array.from(select.options);
    if (!options.length) return;

    select.selectedIndex = (select.selectedIndex + 1) % options.length;
    renderListeningLesson();
  }

  function setupListening() {
    if (window.__listeningV33Bound) return;
    window.__listeningV33Bound = true;

    loadEnglishVoices();
    populateListeningLessons();
    renderListeningLesson();
    updateListeningWpmLabel();

    $("listeningLevel")?.addEventListener("change", () => {
      populateListeningLessons();
      renderListeningLesson();
    });

    $("listeningLessonSelect")?.addEventListener("change", renderListeningLesson);
    $("newListeningBtn")?.addEventListener("click", nextListening);
    $("playListeningBtn")?.addEventListener("click", playListening);
    $("pauseListeningBtn")?.addEventListener("click", pauseListening);
    $("checkListeningBtn")?.addEventListener("click", checkListeningAnswers);
    $("clearListeningBtn")?.addEventListener("click", clearListeningAnswers);
    $("listeningWpm")?.addEventListener("input", scheduleListeningRebuild);
    $("listeningVolume")?.addEventListener("input", scheduleListeningRebuild);
    $("voiceSelect")?.addEventListener("change", scheduleListeningRebuild);

    if ("speechSynthesis" in window) {
      window.speechSynthesis.onvoiceschanged = loadEnglishVoices;
    }
  }

  /* ------------------------------
     Flashvoice
  ------------------------------ */
  const flashvoiceState = {
    cards: [],
    index: 0,
    transcriptVisible: false,
    speaking: false,
    paused: false,
    token: 0,
    voices: [],
    voiceMap: { female: null, male: null }
  };

  const flashvoiceFollowUps = [
    "I heard it in a casual conversation yesterday.",
    "It sounded natural in a short message.",
    "A friend used it while explaining a problem.",
    "The phrase appeared in a scene from a sitcom.",
    "It is useful when people speak quickly.",
    "I want to recognize it without translating.",
    "The speaker said it in a calm but clear tone.",
    "It would sound normal in an everyday conversation."
  ];

  const modalDictations = [
    "I should review the transcript before checking my answer. I might notice details that I missed the first time.",
    "You must listen to the whole sentence before writing. You should not guess too early.",
    "She could improve her pronunciation with short daily practice. She should repeat the difficult parts aloud.",
    "They have to finish the task before the lesson ends. They might need a few extra minutes.",
    "I would rather study in short focused sessions. I can remember more when I take breaks.",
    "He may not understand every word at first. He can still understand the general meaning.",
    "We should compare our answer with the transcript. Then we can correct the weak parts.",
    "You don't have to write fast immediately. You should focus on accuracy first.",
    "The candidate might lose points for spelling. She must check names and numbers carefully.",
    "I used to translate every word. Now I try to listen for complete ideas."
  ];

  const mixedDictations = [
    "The meeting was moved to Friday morning. Everyone should check the new schedule before leaving.",
    "I ran out of time during the practice test. Next time, I will answer the easier questions first.",
    "The speaker gave three examples and then repeated the main point. I wrote the final answer in capital letters.",
    "She looked up the word after class. The example helped her understand how to use it naturally.",
    "We went over the answers together. The hardest part was recognizing connected speech.",
    "The lecture started with a simple story. Then the speaker explained the problem in more detail.",
    "I could not make out the last sentence. I played the audio again and checked the transcript.",
    "The tutor pointed out a common mistake. Most students wrote the noun instead of the adjective.",
    "They signed up for a weekend course. The first lesson focused on pronunciation and rhythm.",
    "The announcement was clear but quite fast. I only understood the numbers after the second listen."
  ];

  function sentenceCase(text = "") {
    const clean = String(text).trim();
    return clean ? clean.charAt(0).toUpperCase() + clean.slice(1) : clean;
  }

  function buildFlashvoiceCards() {
    const source = $("flashvoiceSource")?.value || "mixed";
    const cards = [];

    const addMixed = () => {
      mixedDictations.forEach((line, index) => {
        cards.push({
          type: "Everyday English",
          title: `Dictation ${index + 1}`,
          transcript: line,
          hint: "Listening general"
        });
      });
    };

    const addPhrasals = () => {
      if (typeof phrasalVerbs !== "undefined") {
        phrasalVerbs.slice(0, 100).forEach(([front, meaning, example], index) => {
          const intro = example && example.trim()
            ? sentenceCase(example)
            : `I heard someone use "${front}" in a conversation.`;

          const follow = flashvoiceFollowUps[index % flashvoiceFollowUps.length];

          cards.push({
            type: "Phrasal verb",
            title: front,
            transcript: `${intro} ${follow}`,
            hint: meaning || ""
          });
        });
      }
    };

    const addModals = () => {
      modalDictations.forEach((line, index) => {
        cards.push({
          type: "Modal / auxiliar",
          title: `Modal training ${index + 1}`,
          transcript: line,
          hint: "Modales en contexto"
        });
      });

      if (typeof modalVerbs !== "undefined") {
        modalVerbs.slice(0, 50).forEach(([front, meaning], index) => {
          const contexts = [
            `I want to use "${front}" correctly in a real answer. It can make my English sound more precise.`,
            `The expression "${front}" often changes the meaning of the sentence. I need to notice it when people speak.`,
            `When I hear "${front}", I should pay attention to the verb that follows. That helps me understand the speaker.`,
            `The speaker used "${front}" to sound more natural. I wrote the sentence down for later review.`
          ];

          cards.push({
            type: "Modal / expresión",
            title: front,
            transcript: contexts[index % contexts.length],
            hint: meaning || ""
          });
        });
      }
    };

    const addVocab = () => {
      if (typeof vocabulary !== "undefined" && vocabulary.length) {
        vocabulary.forEach((item, index) => {
          const base = item.example && item.example.trim()
            ? item.example.trim()
            : `The word "${item.word}" is useful for IELTS practice.`;

          const followUps = [
            "I want to use it correctly in my next paragraph.",
            "The pronunciation is important because it appears in natural speech.",
            "I wrote one extra example to remember the meaning.",
            "It may appear in listening, reading, or writing practice."
          ];

          cards.push({
            type: item.category || "Vocabulario",
            title: item.word,
            transcript: `${sentenceCase(base)} ${followUps[index % followUps.length]}`,
            hint: item.meaning || ""
          });
        });
      }
    };

    if (source === "phrasals") addPhrasals();
    else if (source === "modals") addModals();
    else if (source === "vocabulario") addVocab();
    else {
      addMixed();
      addPhrasals();
      addModals();
      addVocab();
    }

    if (!cards.length) addMixed();

    // Sin selector de banco: siempre se mezclan todos los tipos y se barajan,
    // así "Siguiente" puede darte un dictation, un phrasal, un modal o vocabulario.
    // shuffleArray devuelve una copia (no muta), por eso se reasigna.
    const mixed = (typeof shuffleArray === "function") ? shuffleArray(cards) : cards;

    flashvoiceState.cards = mixed;
    flashvoiceState.index = Math.floor(Math.random() * mixed.length);
  }

  function currentFlashvoiceCard() {
    if (!flashvoiceState.cards.length) buildFlashvoiceCards();
    return flashvoiceState.cards[flashvoiceState.index % flashvoiceState.cards.length];
  }

  function loadFlashvoiceVoices() {
    if (!("speechSynthesis" in window)) return;

    const all = window.speechSynthesis.getVoices();
    flashvoiceState.voices = all.filter((voice) => /^en/i.test(voice.lang));
    if (!flashvoiceState.voices.length) flashvoiceState.voices = all;

    const femaleRx = /(female|woman|zira|jenny|aria|susan|samantha|victoria|karen|serena|natasha|sonia|libby|elsie|emma|olivia|ava|hazel)/i;
    const maleRx = /(male|man|david|mark|daniel|george|guy|ryan|alex|fred|tom|arthur|brian|james|william|oliver)/i;

    flashvoiceState.voiceMap.female = flashvoiceState.voices.find((voice) => femaleRx.test(voice.name)) || flashvoiceState.voices[0] || null;
    flashvoiceState.voiceMap.male = flashvoiceState.voices.find((voice) => maleRx.test(voice.name) && voice !== flashvoiceState.voiceMap.female)
      || flashvoiceState.voices.find((voice) => voice !== flashvoiceState.voiceMap.female)
      || flashvoiceState.voices[1]
      || flashvoiceState.voices[0]
      || null;
  }

  function selectedFlashvoiceVoice() {
    const type = $("flashvoiceVoice")?.value || "female";
    return flashvoiceState.voiceMap[type] || flashvoiceState.voices[0] || null;
  }

  function flashvoiceRate() {
    const wpm = Number($("flashvoiceWpm")?.value || 130);
    return Math.max(0.55, Math.min(1.6, wpm / 130));
  }

  function flashvoiceVolume() {
    return Number($("flashvoiceVolume")?.value || 0.85);
  }

  function renderFlashvoiceCard() {
    const card = currentFlashvoiceCard();

    if ($("flashvoiceType")) $("flashvoiceType").textContent = card.type;
    if ($("flashvoiceTitle")) $("flashvoiceTitle").textContent = card.title;
    if ($("flashvoiceAnswer")) $("flashvoiceAnswer").value = "";
    if ($("flashvoiceFeedback")) $("flashvoiceFeedback").innerHTML = "";
    if ($("flashvoiceTranscript")) $("flashvoiceTranscript").textContent = card.transcript;
    if ($("flashvoicePhonetic")) $("flashvoicePhonetic").textContent = roughPronunciation(card.transcript);
    if ($("flashvoiceTranscriptBox")) $("flashvoiceTranscriptBox").hidden = true;
    if ($("toggleFlashvoiceTranscriptBtn")) $("toggleFlashvoiceTranscriptBtn").textContent = "Mostrar transcript";

    flashvoiceState.transcriptVisible = false;

    if ($("flashvoiceWpmValue")) {
      $("flashvoiceWpmValue").textContent = `${$("flashvoiceWpm")?.value || 130} WPM`;
    }
  }

  function stopFlashvoiceSpeech() {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();

    flashvoiceState.token += 1;
    flashvoiceState.speaking = false;
    flashvoiceState.paused = false;

    if ($("playFlashvoiceBtn")) $("playFlashvoiceBtn").classList.remove("is-playing");
    
  }

  function speakFlashvoice() {
    const card = currentFlashvoiceCard();
    const token = ++flashvoiceState.token;
    const utterance = new SpeechSynthesisUtterance(card.transcript);
    const voice = selectedFlashvoiceVoice();

    if (voice) utterance.voice = voice;

    utterance.volume = flashvoiceVolume();
    utterance.rate = flashvoiceRate();
    utterance.pitch = $("flashvoiceVoice")?.value === "male" ? 0.92 : 1.04;

    utterance.onend = () => {
      if (token !== flashvoiceState.token) return;
      flashvoiceState.speaking = false;
      flashvoiceState.paused = false;
      if ($("playFlashvoiceBtn")) $("playFlashvoiceBtn").classList.remove("is-playing");
      
    };

    utterance.onerror = () => {
      if (token !== flashvoiceState.token) return;
      flashvoiceState.speaking = false;
      if ($("flashvoiceFeedback")) {
        $("flashvoiceFeedback").innerHTML = "<strong>No se pudo reproducir el audio.</strong><p>Probá nuevamente o cambiá de voz.</p>";
      }
    };

    if ($("playFlashvoiceBtn")) $("playFlashvoiceBtn").classList.add("is-playing");
    window.speechSynthesis.speak(utterance);
  }

  function playFlashvoice() {
    if (!("speechSynthesis" in window)) {
      alert("Este navegador no soporta síntesis de voz. Probá con Chrome, Edge o Safari.");
      return;
    }

    if (flashvoiceState.paused) {
      flashvoiceState.paused = false;
      flashvoiceState.speaking = true;
      speakFlashvoice();
      return;
    }

    stopFlashvoiceSpeech();
    flashvoiceState.speaking = true;
    flashvoiceState.paused = false;
    speakFlashvoice();
  }

  function pauseFlashvoice() {
    if (!flashvoiceState.speaking) return;

    if (!flashvoiceState.paused) {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
      flashvoiceState.token += 1;
      flashvoiceState.paused = true;
      flashvoiceState.speaking = true;
      
      return;
    }

    flashvoiceState.paused = false;
    
    speakFlashvoice();
  }

  function nextFlashvoice() {
    stopFlashvoiceSpeech();
    if (!flashvoiceState.cards.length) buildFlashvoiceCards();

    flashvoiceState.index = (flashvoiceState.index + 1) % flashvoiceState.cards.length;
    renderFlashvoiceCard();
  }

  function toggleFlashvoiceTranscript() {
    const box = $("flashvoiceTranscriptBox");
    if (!box) return;

    flashvoiceState.transcriptVisible = !flashvoiceState.transcriptVisible;
    box.hidden = !flashvoiceState.transcriptVisible;

    if ($("toggleFlashvoiceTranscriptBtn")) {
      $("toggleFlashvoiceTranscriptBtn").textContent = flashvoiceState.transcriptVisible ? "Ocultar transcript" : "Mostrar transcript";
    }
  }

  function checkFlashvoice() {
    const card = currentFlashvoiceCard();
    const answer = $("flashvoiceAnswer")?.value || "";
    const feedback = $("flashvoiceFeedback");
    if (!feedback) return;

    if (!answer.trim()) {
      feedback.innerHTML = "<strong>Escribí tu transcripción primero.</strong><p>Escuchá el audio y escribí exactamente lo que entendiste.</p>";
      return;
    }

    const expectedTokens = normalizeAnswer(card.transcript).split(" ").filter(Boolean);
    const userTokens = normalizeAnswer(answer).split(" ").filter(Boolean);
    const expectedSet = new Set(expectedTokens);
    let common = 0;

    userTokens.forEach((token) => {
      if (expectedSet.has(token)) common += 1;
    });

    const precision = userTokens.length ? common / userTokens.length : 0;
    const recall = expectedTokens.length ? common / expectedTokens.length : 0;
    const score = Math.round(((precision + recall) / 2) * 100);

    feedback.innerHTML = `
      <strong>${score >= 82 ? "Muy buena transcripción" : score >= 60 ? "Vas bien, pero falta precisión" : "Necesita más escucha activa"}</strong>
      <p>Coincidencia aproximada: ${score}%.</p>
      <p><strong>Transcript:</strong> ${escapeSafe(card.transcript)}</p>
      <p><em>${escapeSafe(roughPronunciation(card.transcript))}</em></p>
    `;

    if (typeof logActivity === "function") logActivity(`Flashvoice · ${score}%`);
  }

  function setupFlashvoice() {
    if (window.__flashvoiceV33Bound) return;
    window.__flashvoiceV33Bound = true;

    loadFlashvoiceVoices();
    buildFlashvoiceCards();
    renderFlashvoiceCard();

    if ("speechSynthesis" in window) {
      const previous = window.speechSynthesis.onvoiceschanged;
      window.speechSynthesis.onvoiceschanged = () => {
        if (typeof previous === "function") previous();
        loadEnglishVoices();
        loadFlashvoiceVoices();
      };
    }

    $("flashvoiceSource")?.addEventListener("change", () => {
      stopFlashvoiceSpeech();
      buildFlashvoiceCards();
      renderFlashvoiceCard();
    });

    $("flashvoiceVoice")?.addEventListener("change", () => {
      if (flashvoiceState.speaking && !flashvoiceState.paused) playFlashvoice();
    });

    $("flashvoiceWpm")?.addEventListener("input", () => {
      if ($("flashvoiceWpmValue")) $("flashvoiceWpmValue").textContent = `${$("flashvoiceWpm")?.value || 130} WPM`;
      if (flashvoiceState.speaking && !flashvoiceState.paused) playFlashvoice();
    });

    $("flashvoiceVolume")?.addEventListener("input", () => {
      if (flashvoiceState.speaking && !flashvoiceState.paused) playFlashvoice();
    });

    $("playFlashvoiceBtn")?.addEventListener("click", playFlashvoice);
    $("pauseFlashvoiceBtn")?.addEventListener("click", pauseFlashvoice);
    $("nextFlashvoiceBtn")?.addEventListener("click", nextFlashvoice);
    $("toggleFlashvoiceTranscriptBtn")?.addEventListener("click", toggleFlashvoiceTranscript);
    $("checkFlashvoiceBtn")?.addEventListener("click", checkFlashvoice);
  }

  function bootV33() {
    setupResourceMenu();
    setupTimerOutsideClick();
    setupStableSessionCounter();
    setupListening();
    setupFlashvoice();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootV33);
  } else {
    bootV33();
  }

  window.addEventListener("load", () => {
    window.setTimeout(bootV33, 100);
  });
})();


/* =========================================================
   V34 MISC MENU + CALENDAR + PROFILE + BADGES
========================================================= */

(function englishTrainerV34() {
  if (window.__englishTrainerV34Ready) return;
  window.__englishTrainerV34Ready = true;

  const $ = (id) => document.getElementById(id);
  const STORAGE_EXAMS = "englishTrainerCalendarExamsV34";
  const STORAGE_DAILY = "englishTrainerDailyStudyV34";
  const STORAGE_PROFILE = "englishTrainerProfileV34";
  const STORAGE_SUPPORT = "englishTrainerSupportTicketsV34";

  const state = {
    calendarDate: new Date(),
    selectedDate: toISODate(new Date()),
    lastInteraction: Date.now(),
    dailyTickBuffer: 0
  };

  function readJSON(key, fallback) {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return value ?? fallback;
    } catch {
      return fallback;
    }
  }

  function writeJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function pad(value) {
    return String(value).padStart(2, "0");
  }

  function toISODate(date) {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  }

  function fromISODate(iso) {
    const [year, month, day] = String(iso).split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  function formatHumanDate(iso) {
    const date = fromISODate(iso);
    return date.toLocaleDateString("es-AR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }

  function formatMinutes(seconds) {
    const minutes = Math.floor(Number(seconds || 0) / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const rest = minutes % 60;
    return rest ? `${hours}h ${rest}m` : `${hours}h`;
  }

  function registerCalendarActivity() {
    state.lastInteraction = Date.now();
  }

  function getDailyStudy() {
    return readJSON(STORAGE_DAILY, {});
  }

  function setDailyStudy(value) {
    writeJSON(STORAGE_DAILY, value);
  }

  function getExams() {
    return readJSON(STORAGE_EXAMS, []);
  }

  function setExams(value) {
    writeJSON(STORAGE_EXAMS, value);
  }

  function renderCalendar() {
    const grid = $("calendarGrid");
    const title = $("calendarTitle");
    const subtitle = $("calendarSubtitle");
    if (!grid || !title) return;

    const year = state.calendarDate.getFullYear();
    const month = state.calendarDate.getMonth();
    const first = new Date(year, month, 1);
    const last = new Date(year, month + 1, 0);
    const todayISO = toISODate(new Date());
    const daily = getDailyStudy();
    const exams = getExams();

    const monthLabel = first.toLocaleDateString("es-AR", { month: "long", year: "numeric" });
    title.textContent = monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1);
    if (subtitle) subtitle.textContent = "Click en un día para ver actividad o exámenes";

    const mondayIndex = (first.getDay() + 6) % 7;
    const days = [];

    for (let i = 0; i < mondayIndex; i += 1) days.push(null);
    for (let day = 1; day <= last.getDate(); day += 1) days.push(new Date(year, month, day));

    while (days.length % 7 !== 0) days.push(null);

    grid.innerHTML = days.map((date) => {
      if (!date) return `<button class="calendar-day calendar-empty" type="button" tabindex="-1"></button>`;

      const iso = toISODate(date);
      const studied = Number(daily[iso] || 0);
      const dayExams = exams.filter((exam) => exam.date === iso);
      const isToday = iso === todayISO;
      const isSelected = iso === state.selectedDate;
      const studyLabel = studied > 0 ? `<small>${formatMinutes(studied)}</small>` : "";
      const examDots = dayExams.length ? `<em>${dayExams.length}</em>` : "";

      return `
        <button class="calendar-day ${isToday ? "today" : ""} ${isSelected ? "selected" : ""} ${studied ? "studied" : ""} ${dayExams.length ? "has-exam" : ""}" type="button" data-date="${iso}">
          <strong>${date.getDate()}</strong>
          ${studyLabel}
          ${examDots}
        </button>
      `;
    }).join("");

    const monthPrefix = `${year}-${pad(month + 1)}-`;
    const monthStudy = Object.entries(daily)
      .filter(([date]) => date.startsWith(monthPrefix))
      .reduce((sum, [, seconds]) => sum + Number(seconds || 0), 0);
    const monthExams = exams.filter((exam) => exam.date.startsWith(monthPrefix)).length;

    if ($("calendarMonthStudy")) $("calendarMonthStudy").textContent = formatMinutes(monthStudy);
    if ($("calendarExamCount")) $("calendarExamCount").textContent = String(monthExams);

    renderSelectedDay();
  }

  function renderSelectedDay() {
    const daily = getDailyStudy();
    const exams = getExams().filter((exam) => exam.date === state.selectedDate);
    const title = $("selectedDateTitle");
    const stats = $("selectedDateStats");
    const list = $("selectedDayEvents");

    if (title) title.textContent = formatHumanDate(state.selectedDate);
    if (stats) {
      const studied = Number(daily[state.selectedDate] || 0);
      stats.textContent = studied > 0
        ? `Estudiaste ${formatMinutes(studied)} este día.`
        : "Sin actividad registrada todavía.";
    }

    if (list) {
      if (!exams.length) {
        list.innerHTML = `<p class="empty-events">No hay exámenes programados para este día.</p>`;
      } else {
        list.innerHTML = exams.map((exam) => `
          <article class="exam-event">
            <div><strong>${exam.type}</strong><span>${exam.time || "Sin hora"} · ${exam.note || "Sin nota"}</span></div>
            <button class="ghost-btn delete-exam-btn" type="button" data-exam-id="${exam.id}">Borrar</button>
          </article>
        `).join("");
      }
    }

    if ($("examDateInput")) $("examDateInput").value = state.selectedDate;
  }

  function bindCalendar() {
    if (window.__calendarV34Bound) return;
    window.__calendarV34Bound = true;

    $("calendarPrevBtn")?.addEventListener("click", () => {
      state.calendarDate = new Date(state.calendarDate.getFullYear(), state.calendarDate.getMonth() - 1, 1);
      renderCalendar();
    });

    $("calendarNextBtn")?.addEventListener("click", () => {
      state.calendarDate = new Date(state.calendarDate.getFullYear(), state.calendarDate.getMonth() + 1, 1);
      renderCalendar();
    });

    $("calendarGrid")?.addEventListener("click", (event) => {
      const day = event.target.closest("[data-date]");
      if (!day) return;

      state.selectedDate = day.dataset.date;
      renderCalendar();
    });

    $("selectedDayEvents")?.addEventListener("click", (event) => {
      const deleteBtn = event.target.closest(".delete-exam-btn");
      if (!deleteBtn) return;

      const exams = getExams().filter((exam) => exam.id !== deleteBtn.dataset.examId);
      setExams(exams);
      renderCalendar();
    });

    $("examForm")?.addEventListener("submit", (event) => {
      event.preventDefault();

      const date = $("examDateInput")?.value || state.selectedDate;
      const time = $("examTimeInput")?.value || "";
      const type = $("examTypeInput")?.value || "Examen";
      const note = $("examNoteInput")?.value.trim() || "";

      const exams = getExams();
      exams.push({
        id: `exam-${Date.now()}`,
        date,
        time,
        type,
        note
      });

      setExams(exams);
      state.selectedDate = date;
      state.calendarDate = fromISODate(date);

      if ($("examNoteInput")) $("examNoteInput").value = "";

      renderCalendar();
      if (typeof logActivity === "function") logActivity(`Examen programado: ${type}`);
    });
  }

  function logDailyStudy(secondsToAdd) {
    const today = toISODate(new Date());
    const daily = getDailyStudy();
    daily[today] = Number(daily[today] || 0) + secondsToAdd;
    setDailyStudy(daily);

    if (typeof studySeconds !== "undefined") {
      studySeconds += secondsToAdd;
      localStorage.setItem("englishTrainerStudySeconds", String(studySeconds));
    }

    if (typeof weeklySeconds !== "undefined") {
      weeklySeconds += secondsToAdd;
      localStorage.setItem("englishTrainerWeeklySeconds", String(weeklySeconds));
    }

    if (typeof updateProgress === "function") updateProgress();

    if (document.getElementById("calendario")) renderCalendar();
    renderProfile();
    renderBadges();
  }

  function setupDailyStudyLink() {
    if (window.__dailyStudyLinkV34) return;
    window.__dailyStudyLinkV34 = true;

    ["click", "keydown", "pointerdown", "scroll", "input", "change", "touchstart"].forEach((eventName) => {
      window.addEventListener(eventName, registerCalendarActivity, { passive: true });
    });

    window.setInterval(() => {
      if (document.hidden || Date.now() - state.lastInteraction > 65000) return;

      state.dailyTickBuffer += 1;

      if (state.dailyTickBuffer >= 30) {
        state.dailyTickBuffer = 0;
        logDailyStudy(30);
      }
    }, 1000);
  }

  function setupMiscMenu() {
    if (window.__miscMenuV34Bound) return;
    window.__miscMenuV34Bound = true;

    const menu = $("miscMenu");
    const toggle = $("miscMenuToggle");
    const panel = $("miscMenuPanel");
    if (!menu || !toggle || !panel) return;

    function setOpen(open) {
      menu.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    }

    toggle.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      setOpen(!menu.classList.contains("open"));
    });

    panel.addEventListener("click", (event) => {
      const btn = event.target.closest("[data-misc-target]");
      if (!btn) return;

      event.preventDefault();
      setOpen(false);

      const target = btn.dataset.miscTarget;
      if (typeof openDashboard === "function") openDashboard(target);
      else document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    document.addEventListener("click", (event) => {
      if (!menu.contains(event.target)) setOpen(false);
    });
  }

  function patchDashboardNavigation() {
    if (window.__dashboardPatchV34) return;
    window.__dashboardPatchV34 = true;

    const hiddenOnInicio = new Set(["writing", "listening", "perfil", "logros", "comunidad", "faqs", "privacidad", "suscripciones", "soporte"]);

    window.setDashboardMode = function patchedSetDashboardMode(sectionId = "inicio") {
      const dashboardSections = document.querySelectorAll("#dashboardView main section[id]");

      dashboardSections.forEach((section) => {
        if (sectionId === "inicio") {
          section.classList.toggle("dashboard-section-hidden", hiddenOnInicio.has(section.id));
          return;
        }

        section.classList.toggle("dashboard-section-hidden", section.id !== sectionId);
      });
    };

    window.openDashboard = function patchedOpenDashboard(sectionId = "inicio") {
      const resourcesView = document.getElementById("resourcesView");
      const dashboardView = document.getElementById("dashboardView");

      if (resourcesView) resourcesView.hidden = true;
      if (dashboardView) dashboardView.hidden = false;

      document.querySelectorAll(".resource-nav-btn").forEach((button) => button.classList.remove("active"));

      window.setDashboardMode(sectionId);

      requestAnimationFrame(() => {
        const target = document.getElementById(sectionId === "inicio" ? "inicio" : sectionId);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });

        document.querySelectorAll(".nav-link").forEach((link) => {
          const href = link.getAttribute("href") || "";
          link.classList.toggle("active", href === `#${sectionId}`);
        });
      });
    };
  }

  function getAverageScoreSafe() {
    try {
      return typeof getAverageScore === "function" ? getAverageScore() : 0;
    } catch {
      return 0;
    }
  }

  function getStudyStreakSafe() {
    try {
      return typeof getStudyStreak === "function" ? getStudyStreak() : 0;
    } catch {
      return 0;
    }
  }

  function renderProfile() {
    const profile = readJSON(STORAGE_PROFILE, {});
    const total = typeof studySeconds !== "undefined"
      ? studySeconds
      : Number(localStorage.getItem("englishTrainerStudySeconds") || 0);

    if ($("profileName")) $("profileName").value = profile.name || "";
    if ($("profileTargetBand")) $("profileTargetBand").value = profile.targetBand || "7";
    if ($("profileFocus")) $("profileFocus").value = profile.focus || "Writing";

    if ($("profileGreeting")) {
      $("profileGreeting").textContent = profile.name
        ? `${profile.name}, objetivo Band ${profile.targetBand || "7"}`
        : "Perfil sin configurar";
    }

    if ($("profileSummary")) {
      $("profileSummary").textContent = profile.focus
        ? `Prioridad actual: ${profile.focus}. Usá el calendario para sostener continuidad semanal.`
        : "Completá tus datos para tener una ruta visible.";
    }

    if ($("profileStudyTotal")) $("profileStudyTotal").textContent = formatMinutes(total);
    if ($("profileAverage")) $("profileAverage").textContent = `${getAverageScoreSafe()}%`;
    if ($("profileStreak")) $("profileStreak").textContent = String(getStudyStreakSafe());
  }

  function bindProfile() {
    if (window.__profileV34Bound) return;
    window.__profileV34Bound = true;

    $("profileForm")?.addEventListener("submit", (event) => {
      event.preventDefault();

      const profile = {
        name: $("profileName")?.value.trim() || "",
        targetBand: $("profileTargetBand")?.value || "7",
        focus: $("profileFocus")?.value || "Writing"
      };

      writeJSON(STORAGE_PROFILE, profile);
      renderProfile();

      if (typeof logActivity === "function") logActivity("Perfil actualizado");
    });
  }

  function renderBadges() {
    const daily = getDailyStudy();
    const activeDays = Object.values(daily).filter((seconds) => Number(seconds) > 0).length;
    const total = typeof studySeconds !== "undefined"
      ? studySeconds
      : Number(localStorage.getItem("englishTrainerStudySeconds") || 0);
    const writings = typeof paragraphs !== "undefined" ? paragraphs.length : 0;
    const exams = Number(localStorage.getItem("englishTrainerExamsCompleted") || 0);
    const avg = getAverageScoreSafe();

    const badges = [
      { title: "Primer paso", detail: "Registrar 10 minutos de estudio.", done: total >= 600 },
      { title: "Constancia inicial", detail: "Estudiar en 3 días distintos.", done: activeDays >= 3 },
      { title: "Semana activa", detail: "Estudiar en 5 días distintos.", done: activeDays >= 5 },
      { title: "Writing starter", detail: "Guardar 3 párrafos.", done: writings >= 3 },
      { title: "Mock tester", detail: "Completar 3 exámenes.", done: exams >= 3 },
      { title: "Precisión", detail: "Alcanzar promedio global de 80%.", done: avg >= 80 }
    ];

    const grid = $("badgesGrid");
    if (!grid) return;

    // Icono outline (hereda el color por currentColor). Se "enciende" vía CSS
    // cuando la tarjeta tiene la clase .unlocked. La lógica de `done` no cambia.
    const badgeIcon = `<svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="9" r="5.2"/>
      <path d="M8.6 13.4 7 21l5-2.4L17 21l-1.6-7.6"/>
    </svg>`;

    grid.innerHTML = badges.map((badge) => `
      <article class="badge-card ${badge.done ? "unlocked" : ""}">
        <span class="badge-icon" aria-hidden="true">${badgeIcon}</span>
        <strong>${badge.title}</strong>
        <p>${badge.detail}</p>
        <small>${badge.done ? "Desbloqueado" : "Pendiente"}</small>
      </article>
    `).join("");
  }

  function bindSupport() {
    if (window.__supportV34Bound) return;
    window.__supportV34Bound = true;

    $("supportForm")?.addEventListener("submit", (event) => {
      event.preventDefault();

      const message = $("supportMessage")?.value.trim() || "";
      if (!message) {
        if ($("supportStatus")) $("supportStatus").textContent = "Escribí un detalle antes de guardar.";
        return;
      }

      const tickets = readJSON(STORAGE_SUPPORT, []);
      tickets.push({
        id: `support-${Date.now()}`,
        type: $("supportType")?.value || "Feedback",
        message,
        createdAt: new Date().toISOString()
      });

      writeJSON(STORAGE_SUPPORT, tickets);

      if ($("supportMessage")) $("supportMessage").value = "";
      if ($("supportStatus")) $("supportStatus").textContent = "Feedback guardado localmente.";

      if (typeof logActivity === "function") logActivity("Feedback guardado");
    });
  }

  function bootV34() {
    patchDashboardNavigation();
    setupMiscMenu();
    bindCalendar();
    setupDailyStudyLink();
    renderCalendar();
    bindProfile();
    renderProfile();
    renderBadges();
    bindSupport();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootV34);
  } else {
    bootV34();
  }

  window.addEventListener("load", () => {
    setTimeout(bootV34, 120);
  });
})();


/* =========================================================
   V35 HEATMAP CALENDAR + MENU MUTUAL CLOSE
========================================================= */

(function englishTrainerV35() {
  if (window.__englishTrainerV35Ready) return;
  window.__englishTrainerV35Ready = true;

  const $ = (id) => document.getElementById(id);
  const STORAGE_DAILY = "englishTrainerDailyStudyV34";
  const STORAGE_NOTES = "englishTrainerHeatmapNotesV35";

  // Estructura compatible con el requisito del usuario:
  // window.data_estudio = { "2026-07-01": 15, "2026-07-02": 45, "2026-07-03": 120 }
  // El valor representa minutos. Se fusiona con el registro real de la página.
  window.data_estudio = window.data_estudio || {};

  const heatmapState = {
    date: new Date(),
    selectedDate: toISODate(new Date())
  };

  function pad(value) {
    return String(value).padStart(2, "0");
  }

  function toISODate(date) {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  }

  function fromISODate(iso) {
    const [year, month, day] = String(iso).split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  function readJSON(key, fallback) {
    try {
      const parsed = JSON.parse(localStorage.getItem(key));
      return parsed ?? fallback;
    } catch {
      return fallback;
    }
  }

  function writeJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function getHeatmapNotes() {
    return readJSON(STORAGE_NOTES, {});
  }

  function setHeatmapNotes(notes) {
    writeJSON(STORAGE_NOTES, notes);
  }

  function getStudyDataMinutes() {
    const storedSeconds = readJSON(STORAGE_DAILY, {});
    const merged = { ...(window.data_estudio || {}) };

    Object.entries(storedSeconds).forEach(([date, seconds]) => {
      const minutes = Math.round(Number(seconds || 0) / 60);
      merged[date] = Math.max(Number(merged[date] || 0), minutes);
    });

    return merged;
  }

  function minutesForDate(iso) {
    const data = getStudyDataMinutes();
    return Number(data[iso] || 0);
  }

  function formatMinutes(minutes) {
    const total = Number(minutes || 0);
    if (total < 60) return `${total}m`;
    const hours = Math.floor(total / 60);
    const rest = total % 60;
    return rest ? `${hours}h ${rest}m` : `${hours}h`;
  }

  function heatLevel(minutes) {
    const value = Number(minutes || 0);
    if (value <= 0) return 0;
    if (value <= 30) return 1;
    if (value <= 60) return 2;
    return 3;
  }

  function humanDate(iso) {
    return fromISODate(iso).toLocaleDateString("es-AR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }

  function monthPrefix(date) {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-`;
  }

  function monthTotalMinutes(date) {
    const prefix = monthPrefix(date);
    return Object.entries(getStudyDataMinutes())
      .filter(([iso]) => iso.startsWith(prefix))
      .reduce((sum, [, minutes]) => sum + Number(minutes || 0), 0);
  }

  function dayHasStudy(iso) {
    return minutesForDate(iso) > 0;
  }

  function getCurrentStreak() {
    let streak = 0;
    const cursor = new Date();

    while (true) {
      const iso = toISODate(cursor);
      if (!dayHasStudy(iso)) break;

      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    }

    return streak;
  }

  function getLongestStreak() {
    const studiedDays = Object.entries(getStudyDataMinutes())
      .filter(([, minutes]) => Number(minutes || 0) > 0)
      .map(([iso]) => iso)
      .sort();

    if (!studiedDays.length) return 0;

    let longest = 1;
    let current = 1;

    for (let i = 1; i < studiedDays.length; i += 1) {
      const prev = fromISODate(studiedDays[i - 1]);
      const currentDate = fromISODate(studiedDays[i]);
      const diff = Math.round((currentDate - prev) / 86400000);

      if (diff === 1) current += 1;
      else current = 1;

      longest = Math.max(longest, current);
    }

    return longest;
  }

  function escapeHtml(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function renderHeatmapCalendar() {
    const grid = $("heatmapMonthGrid");
    const title = $("heatmapTitle");
    const subtitle = $("heatmapSubtitle");
    if (!grid || !title) return;

    const year = heatmapState.date.getFullYear();
    const month = heatmapState.date.getMonth();
    const first = new Date(year, month, 1);
    const last = new Date(year, month + 1, 0);
    const todayISO = toISODate(new Date());
    const notes = getHeatmapNotes();

    const label = first.toLocaleDateString("es-AR", { month: "long", year: "numeric" });
    title.textContent = label.charAt(0).toUpperCase() + label.slice(1);
    if (subtitle) subtitle.textContent = "Click en un día para agregar o editar un recordatorio";

    const startOffset = (first.getDay() + 6) % 7;
    const days = [];

    for (let i = 0; i < startOffset; i += 1) days.push(null);
    for (let day = 1; day <= last.getDate(); day += 1) days.push(new Date(year, month, day));
    while (days.length % 7 !== 0) days.push(null);

    grid.innerHTML = days.map((date) => {
      if (!date) return `<button class="heatmap-day heatmap-empty" type="button" tabindex="-1" aria-hidden="true"></button>`;

      const iso = toISODate(date);
      const minutes = minutesForDate(iso);
      const level = heatLevel(minutes);
      const selected = iso === heatmapState.selectedDate;
      const today = iso === todayISO;
      const noteText = (notes[iso] || "").trim();
      const hasNote = Boolean(noteText);
      const safeNote = escapeHtml(noteText);

      return `
        <button class="heatmap-day heat-${level} ${selected ? "selected" : ""} ${today ? "today" : ""} ${hasNote ? "has-note" : ""}" type="button" data-heatmap-date="${iso}" aria-label="${iso}, ${minutes} minutos${hasNote ? ", nota: " + safeNote : ""}"${hasNote ? ` title="${safeNote}"` : ""}>
          <span class="heatmap-day-head">
            <strong>${date.getDate()}</strong>
            <span class="heatmap-day-min">${minutes ? formatMinutes(minutes) : ""}</span>
          </span>
          ${hasNote ? `<span class="heatmap-day-note">${safeNote}</span>` : ""}
        </button>
      `;
    }).join("");

    renderHeatmapSidePanel();
    renderAnnualHeatmap();
  }

  function renderHeatmapSidePanel() {
    const notes = getHeatmapNotes();
    const selectedMinutes = minutesForDate(heatmapState.selectedDate);
    const monthMinutes = monthTotalMinutes(heatmapState.date);
    const currentStreak = getCurrentStreak();
    const longestStreak = getLongestStreak();

    if ($("heatmapMonthTotal")) $("heatmapMonthTotal").textContent = formatMinutes(monthMinutes);
    if ($("heatmapCurrentStreak")) $("heatmapCurrentStreak").textContent = String(currentStreak);
    if ($("heatmapStreakNow")) $("heatmapStreakNow").textContent = `${currentStreak} días`;
    if ($("heatmapLongestStreak")) $("heatmapLongestStreak").textContent = `${longestStreak} días`;
    if ($("heatmapMonthHours")) $("heatmapMonthHours").textContent = formatMinutes(monthMinutes);
    if ($("heatmapSelectedTitle")) $("heatmapSelectedTitle").textContent = humanDate(heatmapState.selectedDate);
    if ($("heatmapSelectedStats")) $("heatmapSelectedStats").textContent = selectedMinutes
      ? `Tiempo registrado: ${formatMinutes(selectedMinutes)}.`
      : "Sin actividad registrada.";
    if ($("heatmapSelectedNote")) $("heatmapSelectedNote").textContent = notes[heatmapState.selectedDate]
      ? `Recordatorio: ${notes[heatmapState.selectedDate]}`
      : "Sin recordatorio.";
  }

  function renderAnnualHeatmap() {
    const container = $("annualHeatmapGrid");
    if (!container) return;

    const year = heatmapState.date.getFullYear();
    const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"];

    container.innerHTML = monthNames.map((monthLabel, monthIndex) => {
      const first = new Date(year, monthIndex, 1);
      const last = new Date(year, monthIndex + 1, 0);
      const startOffset = (first.getDay() + 6) % 7;
      const cells = [];

      for (let i = 0; i < startOffset; i += 1) cells.push(null);
      for (let day = 1; day <= last.getDate(); day += 1) cells.push(new Date(year, monthIndex, day));
      while (cells.length < 42) cells.push(null);

      const miniCells = cells.slice(0, 42).map((date) => {
        if (!date) return `<i class="annual-empty"></i>`;
        const iso = toISODate(date);
        return `<i class="heat-${heatLevel(minutesForDate(iso))}" title="${iso}: ${minutesForDate(iso)} min"></i>`;
      }).join("");

      return `
        <article class="annual-month">
          <strong>${monthLabel}</strong>
          <div>${miniCells}</div>
        </article>
      `;
    }).join("");
  }

  // Edición inline: al tocar un día se abre un textarea DENTRO de la celda.
  // Enter guarda, Escape o click afuera cancela. No hay modal ni bloqueo.
  function openInlineNoteEditor(cell) {
    if (!cell) return;
    const iso = cell.dataset.heatmapDate;
    if (!iso) return;

    // Si ya hay un editor abierto en otra celda, cerralo sin guardar.
    closeInlineNoteEditor();

    heatmapState.selectedDate = iso;
    const notes = getHeatmapNotes();
    const current = notes[iso] || "";

    cell.classList.add("is-editing");
    const editor = document.createElement("textarea");
    editor.className = "heatmap-day-editor";
    editor.value = current;
    editor.setAttribute("rows", "2");
    editor.setAttribute("placeholder", "Nota… (Enter guarda)");
    editor.setAttribute("aria-label", `Nota para ${iso}`);
    cell.appendChild(editor);

    // Evitar que el click dentro del textarea burbujee y reabra el editor.
    editor.addEventListener("click", (e) => e.stopPropagation());

    editor.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        saveInlineNote(iso, editor.value);
      } else if (e.key === "Escape") {
        e.preventDefault();
        closeInlineNoteEditor();
      }
    });

    // Cancelar al perder foco (sin guardar) salvo que ya se haya guardado o cerrado.
    editor.addEventListener("blur", () => {
      if (editor.dataset.saved || closingEditor || !editor.parentNode) return;
      closeInlineNoteEditor();
    });

    setTimeout(() => {
      editor.focus();
      editor.setSelectionRange(editor.value.length, editor.value.length);
    }, 20);

    renderHeatmapSidePanel();
  }

  function saveInlineNote(iso, rawValue) {
    const notes = getHeatmapNotes();
    const value = (rawValue || "").trim();

    if (value) notes[iso] = value;
    else delete notes[iso];

    setHeatmapNotes(notes);

    // Marcar como guardado para que el blur no dispare "cancelar".
    const openEditor = document.querySelector(".heatmap-day-editor");
    if (openEditor) openEditor.dataset.saved = "true";

    closeInlineNoteEditor();
    renderHeatmapCalendar();

    if (typeof logActivity === "function") logActivity("Calendario actualizado");
  }

  let closingEditor = false;
  function closeInlineNoteEditor() {
    if (closingEditor) return;      // evita reentrada desde el propio blur
    closingEditor = true;
    document.querySelectorAll(".heatmap-day.is-editing").forEach((cell) => {
      cell.classList.remove("is-editing");
    });
    document.querySelectorAll(".heatmap-day-editor").forEach((el) => {
      el.onblur = null;             // desactiva el blur antes de quitarlo
      if (el.parentNode) el.parentNode.removeChild(el);
    });
    closingEditor = false;
  }

  function setupHeatmapCalendar() {
    if (window.__heatmapCalendarV35Bound) return;
    window.__heatmapCalendarV35Bound = true;

    $("heatmapPrevBtn")?.addEventListener("click", () => {
      heatmapState.date = new Date(heatmapState.date.getFullYear(), heatmapState.date.getMonth() - 1, 1);
      renderHeatmapCalendar();
    });

    $("heatmapNextBtn")?.addEventListener("click", () => {
      heatmapState.date = new Date(heatmapState.date.getFullYear(), heatmapState.date.getMonth() + 1, 1);
      renderHeatmapCalendar();
    });

    $("heatmapMonthGrid")?.addEventListener("click", (event) => {
      const day = event.target.closest("[data-heatmap-date]");
      if (!day) return;
      // No reabrir si ya se está editando esta misma celda.
      if (day.classList.contains("is-editing")) return;
      openInlineNoteEditor(day);
    });

    // Click fuera de la celda en edición => cancelar.
    document.addEventListener("click", (event) => {
      const editingCell = document.querySelector(".heatmap-day.is-editing");
      if (editingCell && !event.target.closest(".heatmap-day.is-editing")) {
        closeInlineNoteEditor();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeInlineNoteEditor();
    });

    // When other progress code updates localStorage, keep calendar visually synced.
    // Pero NO re-renderizar si el usuario está escribiendo una nota inline.
    window.addEventListener("storage", () => {
      if (document.querySelector(".heatmap-day.is-editing")) return;
      renderHeatmapCalendar();
    });

    setInterval(() => {
      if (document.hidden) return;
      renderHeatmapSidePanel();
    }, 15000);

    renderHeatmapCalendar();
  }

  function setupMenuMutualClose() {
    if (window.__menuMutualCloseV35) return;
    window.__menuMutualCloseV35 = true;

    const studyMenu = $("resourceMenu");
    const miscMenu = $("miscMenu");
    const studyToggle = $("resourceMenuToggle");
    const miscToggle = $("miscMenuToggle");

    studyToggle?.addEventListener("click", () => {
      miscMenu?.classList.remove("open");
      miscToggle?.setAttribute("aria-expanded", "false");
    }, true);

    miscToggle?.addEventListener("click", () => {
      studyMenu?.classList.remove("open");
      studyToggle?.setAttribute("aria-expanded", "false");
    }, true);

    document.addEventListener("click", (event) => {
      const clickedStudy = event.target.closest("#resourceMenu");
      const clickedMisc = event.target.closest("#miscMenu");

      if (!clickedStudy) {
        studyMenu?.classList.remove("open");
        studyToggle?.setAttribute("aria-expanded", "false");
      }

      if (!clickedMisc) {
        miscMenu?.classList.remove("open");
        miscToggle?.setAttribute("aria-expanded", "false");
      }
    }, true);
  }

  function patchCalendarLink() {
    document.querySelectorAll('[href="#calendario"], [data-misc-target="calendario"]').forEach((el) => {
      el.addEventListener("click", () => {
        setTimeout(renderHeatmapCalendar, 120);
      });
    });
  }

  function bootV35() {
    setupMenuMutualClose();
    setupHeatmapCalendar();
    patchCalendarLink();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootV35);
  } else {
    bootV35();
  }

  window.addEventListener("load", () => setTimeout(bootV35, 100));
})();



/* =========================================================
   V44 HERO EN MOUSE TRACKING
   Movimiento magnético sutil para el círculo EN.
========================================================= */

(function heroEnMouseTrackingV44() {
  if (window.__heroEnMouseTrackingV44) return;
  window.__heroEnMouseTrackingV44 = true;

  function initHeroEnMouseTracking() {
    const wrap = document.querySelector(".hero-en-interactive-wrap");
    const circle = document.getElementById("heroEnCircle");
    const zone = document.getElementById("inicio") || document;
    if (!wrap || !circle) return;

    const maxMove = 14;

    // ── Alcance del efecto ──────────────────────────────────────────
    // El imán del EN ahora reacciona desde MUCHO más lejos: se activa
    // dentro de un radio alrededor del centro del círculo, no solo al
    // pasar por encima. Subí/bajá ACTIVATION_RADIUS para cambiar el
    // alcance (en px). CORE_RADIUS es la distancia a la que el efecto
    // llega a su intensidad máxima.
    const ACTIVATION_RADIUS = 520; // "desde lejos": ~medio hero
    const CORE_RADIUS = 150;       // adentro de esto = intensidad plena
    // ────────────────────────────────────────────────────────────────

    let raf = null;
    let pending = null;

    function apply(event) {
      const rect = circle.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const dx = event.clientX - cx;
      const dy = event.clientY - cy;
      const dist = Math.hypot(dx, dy);

      if (dist > ACTIVATION_RADIUS) {
        resetPosition();
        return;
      }

      // 0 (borde del alcance) → 1 (dentro del núcleo). Curva suave.
      let near = (ACTIVATION_RADIUS - dist) / (ACTIVATION_RADIUS - CORE_RADIUS);
      near = Math.max(0, Math.min(1, near));
      const eased = near * near * (3 - 2 * near); // smoothstep

      // Parallax: apunta hacia el mouse aunque esté lejos, escalado por cercanía.
      const dirX = Math.max(-1, Math.min(1, dx / CORE_RADIUS));
      const dirY = Math.max(-1, Math.min(1, dy / CORE_RADIUS));
      const moveX = dirX * maxMove * eased;
      const moveY = dirY * maxMove * eased;

      circle.style.setProperty("--hero-mx", `${moveX.toFixed(2)}px`);
      circle.style.setProperty("--hero-my", `${moveY.toFixed(2)}px`);
      circle.style.setProperty("--hero-rx", `${(-dirY * 6 * eased).toFixed(2)}deg`);
      circle.style.setProperty("--hero-ry", `${(dirX * 6 * eased).toFixed(2)}deg`);
      circle.style.setProperty("--hero-near", eased.toFixed(3));
      circle.classList.add("is-tracking");
      circle.classList.toggle("is-near", eased > 0.02);
    }

    function updatePosition(event) {
      pending = event;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        if (pending) apply(pending);
      });
    }

    function resetPosition() {
      circle.style.setProperty("--hero-mx", "0px");
      circle.style.setProperty("--hero-my", "0px");
      circle.style.setProperty("--hero-rx", "0deg");
      circle.style.setProperty("--hero-ry", "0deg");
      circle.style.setProperty("--hero-near", "0");
      circle.classList.remove("is-tracking");
      circle.classList.remove("is-near");
    }

    // Escuchamos sobre toda la sección de inicio: alcance amplio.
    zone.addEventListener("mousemove", updatePosition, { passive: true });
    zone.addEventListener("mouseleave", resetPosition);
    window.addEventListener("blur", resetPosition);

    // ── Hover sobre EN: salen 1 o 2 palabras en inglés desde el puntero ──
    const WORDS = [
      "English","Fluent","Speak","Listen","Write","Read","Grammar","Vocabulary",
      "Practice","Learn","Confident","Improve","IELTS","Band 7","Master","Words",
      "Sentence","Verb","Tense","Study","Progress","Skill","Native","Clarity"
    ];

    if (!wrap.dataset.enBurstBound) {
      wrap.dataset.enBurstBound = "true";
      wrap.style.position = wrap.style.position || "relative";

      wrap.addEventListener("click", (event) => {
        const rect = wrap.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        spawnWordsAt(wrap, x, y);
      });
    }

    function spawnWordsAt(container, x, y) {
      const count = 1 + Math.floor(Math.random() * 2); // 1 o 2 palabras
      for (let i = 0; i < count; i++) {
        const el = document.createElement("span");
        el.className = "hero-en-word";
        el.textContent = WORDS[Math.floor(Math.random() * WORDS.length)];
        const drift = (Math.random() - 0.5) * 60;   // leve deriva horizontal
        const rise = 30 + Math.random() * 22;       // impulso hacia arriba
        const fall = 190 + Math.random() * 120;     // cae más y más lejos
        const rot = (Math.random() - 0.5) * 30;
        const dur = 1600 + Math.random() * 800;
        el.style.left = `${x + (Math.random() - 0.5) * 16}px`;
        el.style.top = `${y + (Math.random() - 0.5) * 10}px`;
        el.style.fontSize = `${0.8 + Math.random() * 0.5}rem`;
        el.style.setProperty("--drift", `${drift}px`);
        el.style.setProperty("--rise", `${rise}px`);
        el.style.setProperty("--fall", `${fall}px`);
        el.style.setProperty("--rot", `${rot}deg`);
        el.style.animationDuration = `${dur}ms`;
        container.appendChild(el);
        const safeRemove = () => { if (el.parentNode) el.remove(); };
        el.addEventListener("animationend", safeRemove);
        setTimeout(safeRemove, dur + 400);
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHeroEnMouseTracking);
  } else {
    initHeroEnMouseTracking();
  }

  window.addEventListener("load", () => setTimeout(initHeroEnMouseTracking, 80));
})();



/* =========================================================
   V47 HERO COMPACT MONTH STRIP
   Tira horizontal del mes dentro del banner. No mezcla IDs con el calendario tradicional.
========================================================= */

/* [LIMPIEZA] Mini-calendario del hero (heroCompactMonthStripV47) eliminado: su HTML fue removido. */


/* =========================================================
   V51 — FLIP CLOCK TIMER (dos recuadros: minutos | segundos)
   Reemplaza el reloj de agua por un tablero tipo aeropuerto.
   Recuadro izquierdo = minutos, derecho = segundos. Al cambiar
   un número cae una solapa animada.
   Es la ÚLTIMA definición de updateTimerUI y de los constructores
   de markup, así que gana en la cascada. Reutiliza el mismo estado:
   timerSecondsLeft, timerInitialSeconds, timerPaused, timerInterval.
   IDs preservadas: timerDisplay, miniTimerDisplay.
========================================================= */
(function flipClockTimerV51() {
  if (window.__flipClockV51) return;
  window.__flipClockV51 = true;

  function getRoot() {
    return document.getElementById("timerProgressRing") || document.getElementById("timerVisual");
  }

  function isTimerPanelOpen() {
    const panel = document.getElementById("timerPanel");
    return !!panel && panel.classList.contains("open");
  }

  // Estructura de un recuadro flip. `label` va debajo (Minutos / Segundos).
  function flipUnitMarkup(prefix, label) {
    return `
      <div class="flip-unit" data-flip="${prefix}">
        <div class="flip-card">
          <div class="flip-static flip-top"><span>00</span></div>
          <div class="flip-static flip-bottom"><span>00</span></div>
          <div class="flip-leaf flip-leaf-top"><span>00</span></div>
          <div class="flip-leaf flip-leaf-bottom"><span>00</span></div>
        </div>
        <span class="flip-label">${label}</span>
      </div>
    `;
  }

  function flipBoardMarkup() {
    return `
      <div class="flip-board">
        ${flipUnitMarkup("min", "Minutos")}
        <span class="flip-colon" aria-hidden="true">:</span>
        ${flipUnitMarkup("sec", "Segundos")}
      </div>
    `;
  }

  // Panel principal
  function ensureMainMarkup() {
    const root = getRoot();
    if (!root) return;
    root.id = "timerProgressRing";
    root.classList.remove("circle-timer-card", "water-timer-card", "hourglass-timer-card", "digital-timer-card");
    root.classList.add("flip-timer-card");
    root.setAttribute("aria-label", "Tiempo restante del timer");

    if (root.querySelector(".flip-board")) return;

    root.innerHTML = `
      <span id="timerDisplay" class="timer-display" hidden>00:00</span>
      ${flipBoardMarkup()}
    `;
  }

  // Burbuja mini (versión compacta del tablero)
  function ensureMiniMarkup() {
    let mini = document.getElementById("miniTimerBubble");
    const button = document.getElementById("timerToggleBtn");
    if (!mini) {
      if (!button) return;
      mini = document.createElement("div");
      mini.id = "miniTimerBubble";
      mini.setAttribute("aria-hidden", "true");
      button.insertAdjacentElement("beforebegin", mini);
    }
    mini.className = "mini-timer-bubble mini-flip-bubble";
    if (!mini.querySelector(".flip-board")) {
      mini.innerHTML = `
        <div class="mini-flip-orb">${flipBoardMarkup()}</div>
        <span id="miniTimerDisplay" hidden>00:00</span>
      `;
    }
  }

  function isTimerRunning() {
    return typeof timerInterval !== "undefined" && !!timerInterval && !timerPaused;
  }

  // Actualiza un recuadro flip a un nuevo valor de 2 dígitos, animando la solapa.
  function setFlipValue(scope, prefix, value) {
    const unit = scope.querySelector(`.flip-unit[data-flip="${prefix}"]`);
    if (!unit) return;

    const str = String(value).padStart(2, "0");
    const card = unit.querySelector(".flip-card");
    const topStatic = unit.querySelector(".flip-top span");
    const bottomStatic = unit.querySelector(".flip-bottom span");
    const leafTop = unit.querySelector(".flip-leaf-top span");
    const leafBottom = unit.querySelector(".flip-leaf-bottom span");

    const current = card.dataset.value;
    if (current === str) return; // sin cambios, no animar

    const previous = current == null ? str : current;

    // La solapa superior muestra el número saliente; la inferior el entrante.
    if (leafTop) leafTop.textContent = previous;
    if (leafBottom) leafBottom.textContent = str;
    // El fondo superior ya muestra el nuevo; el inferior aún el viejo hasta que cae.
    if (topStatic) topStatic.textContent = str;
    if (bottomStatic) bottomStatic.textContent = previous;

    card.dataset.value = str;

    // Reinicia la animación
    card.classList.remove("is-flipping");
    // reflow para reiniciar la animación CSS
    void card.offsetWidth;
    card.classList.add("is-flipping");

    // Al terminar, fijar el número entrante en ambas mitades.
    window.clearTimeout(card.__flipTimeout);
    card.__flipTimeout = window.setTimeout(() => {
      if (bottomStatic) bottomStatic.textContent = str;
      card.classList.remove("is-flipping");
    }, 480);
  }

  // Setea sin animación (al inicializar o resetear)
  function setFlipInstant(scope, prefix, value) {
    const unit = scope.querySelector(`.flip-unit[data-flip="${prefix}"]`);
    if (!unit) return;
    const str = String(value).padStart(2, "0");
    const card = unit.querySelector(".flip-card");
    card.dataset.value = str;
    // Solo los dígitos dentro del card, NUNCA el .flip-label.
    card.querySelectorAll("span").forEach((s) => { s.textContent = str; });
    card.classList.remove("is-flipping");
  }

  function updateMiniVisibility() {
    const mini = document.getElementById("miniTimerBubble");
    if (!mini) return;
    const shouldShow = !!timerInitialSeconds && !isTimerPanelOpen();
    mini.classList.toggle("visible", shouldShow);
    mini.setAttribute("aria-hidden", shouldShow ? "false" : "true");
    document.body.classList.toggle("timer-panel-open", isTimerPanelOpen());
  }

  let lastMin = null;
  let lastSec = null;

  function updateFlipTimerUI(force) {
    ensureMainMarkup();
    ensureMiniMarkup();

    const remaining = Math.max(Number(timerSecondsLeft) || 0, 0);
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;
    const timeText = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    const display = document.getElementById("timerDisplay");
    const miniDisplay = document.getElementById("miniTimerDisplay");
    if (display) display.textContent = timeText;
    if (miniDisplay) miniDisplay.textContent = timeText;

    const root = getRoot();
    const mini = document.getElementById("miniTimerBubble");

    const changed = force || minutes !== lastMin || seconds !== lastSec;
    if (changed) {
      [root, mini].forEach((scope) => {
        if (!scope) return;
        if (force) {
          setFlipInstant(scope, "min", minutes);
          setFlipInstant(scope, "sec", seconds);
        } else {
          setFlipValue(scope, "min", minutes);
          setFlipValue(scope, "sec", seconds);
        }
      });
      lastMin = minutes;
      lastSec = seconds;
    }

    [root, mini].forEach((el) => {
      if (el) el.classList.toggle("is-running", isTimerRunning());
    });

    updateMiniVisibility();
  }

  // Sobrescribe la función global (gana por ser la última definición).
  updateTimerUI = function () { updateFlipTimerUI(false); };

  function boot() {
    ensureMainMarkup();
    ensureMiniMarkup();
    updateFlipTimerUI(true); // primer render sin animación

    const panel = document.getElementById("timerPanel");
    if (panel && panel.dataset.flipV51 !== "true") {
      panel.dataset.flipV51 = "true";
      new MutationObserver(() => updateFlipTimerUI(false))
        .observe(panel, { attributes: true, attributeFilter: ["class"] });
    }

    ["startTimerBtn", "pauseTimerBtn", "resetTimerBtn", "timerToggleBtn", "customTimerBtn"]
      .forEach((id) => {
        const btn = document.getElementById(id);
        if (btn && btn.dataset.flipV51 !== "true") {
          btn.dataset.flipV51 = "true";
          // reset / setear cambian el total de golpe: render instantáneo.
          const instant = (id === "resetTimerBtn" || id === "customTimerBtn");
          btn.addEventListener("click", () => setTimeout(() => updateFlipTimerUI(instant), 0));
        }
      });
    document.querySelectorAll(".preset-btn").forEach((btn) => {
      if (btn.dataset.flipV51 !== "true") {
        btn.dataset.flipV51 = "true";
        btn.addEventListener("click", () => setTimeout(() => updateFlipTimerUI(true), 0));
      }
    });

    // Refresco de respaldo (por si el intervalo principal del timer no dispara render).
    setInterval(() => updateFlipTimerUI(false), 1000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
  window.addEventListener("load", () => setTimeout(boot, 120));
})();


/* =========================================================
   V52 — IELTS EXPRESS TESTS
   Simulacros rápidos: Listening, Reading, Writing, Speaking
   + modo Full Express (los 4 consecutivos). Motor autónomo.
   Reutiliza helpers globales: logActivity, getWords,
   detectCommonIssues, escapeHTML si existen.
========================================================= */
(function ieltsExpressV52() {
  if (window.__ieltsExpressV52) return;
  window.__ieltsExpressV52 = true;

  const $ = (id) => document.getElementById(id);
  const esc = (s) => (typeof escapeHTML === "function"
    ? escapeHTML(s)
    : String(s == null ? "" : s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"));
  const log = (m) => { if (typeof logActivity === "function") logActivity(m); };
  const words = (t) => (typeof getWords === "function" ? getWords(t) : String(t||"").trim().split(/\s+/).filter(Boolean));

  // ---- Contenido de las pruebas ---------------------------------------
  // ═══════════════════════════════════════════════════════════════════
  // BANCOS DE EXAMEN — múltiples variantes por módulo.
  // Dificultad estilo IELTS real: las preguntas exigen PARAFRASEO,
  // no coincidencia literal de palabras con el texto/audio.
  // ═══════════════════════════════════════════════════════════════════

  const LISTENING_BANK = [
    {
      minutes: 7,
      context: "Anuncio de la biblioteca municipal",
      transcript: `Good morning everyone. Today I want to talk about how our city library is changing. Starting next month, the library will open at eight in the morning instead of nine, and it will stay open until nine at night on weekdays. We are also adding two new study rooms on the second floor, which students can book online for up to three hours. Finally, the annual membership fee will remain free for anyone under eighteen, while adults will pay a small fee of ten dollars per year.`,
      questions: [
        { type: "mc", q: "The library's opening time will be brought forward by how long?", options: ["Half an hour","One hour","Two hours","It will not change"], answer: 1 },
        { type: "mc", q: "On weekdays, the library closes at:", options: ["7 p.m.","8 p.m.","9 p.m.","10 p.m."], answer: 2 },
        { type: "gap", q: "The additional study rooms are located on the ___ floor.", answer: "second", accepts: ["2nd","second"] },
        { type: "mc", q: "Reservations for study rooms must be made:", options: ["By telephone","At the front desk","Through the internet","By written request"], answer: 2 },
        { type: "gap", q: "The maximum booking length is ___ hours.", answer: "three", accepts: ["3","three"] },
        { type: "mc", q: "Who is exempt from paying the membership fee?", options: ["Students only","Anyone under 18","Local residents","Nobody"], answer: 1 },
        { type: "gap", q: "The yearly charge for adult members is ___ dollars.", answer: "ten", accepts: ["10","ten"] },
        { type: "tfng", q: "The library's current opening hour is earlier than the new one.", answer: "false" },
        { type: "tfng", q: "The number of study rooms will increase.", answer: "true" },
        { type: "tfng", q: "The speaker explains why the fee was introduced.", answer: "not given" }
      ]
    },
    {
      minutes: 7,
      context: "Instrucciones de un profesor sobre un proyecto",
      transcript: `Right, listen carefully about your group project. Each team must consist of exactly four students, and you cannot change teams once registered. The written report should be between two and three thousand words, and it must be submitted through the online portal by the fifteenth of March. Please note that late submissions lose five percent per day. You will also give a presentation lasting no more than twelve minutes, followed by questions from the class. The report counts for sixty percent of your final mark, and the presentation for the remaining forty.`,
      questions: [
        { type: "mc", q: "The size of each team is:", options: ["Three students","Four students","Five students","Flexible"], answer: 1 },
        { type: "tfng", q: "Students may move to a different team after registering.", answer: "false" },
        { type: "gap", q: "The report must be submitted by ___ March.", answer: "15", accepts: ["15","15th","fifteenth","the fifteenth"] },
        { type: "mc", q: "What is the penalty for handing the report in late?", options: ["A fixed 5% deduction","5% for every day late","Automatic failure","No penalty"], answer: 1 },
        { type: "gap", q: "Reports must be uploaded via the online ___.", answer: "portal", accepts: ["portal"] },
        { type: "mc", q: "The presentation must not exceed:", options: ["Ten minutes","Twelve minutes","Fifteen minutes","Twenty minutes"], answer: 1 },
        { type: "gap", q: "The written report is worth ___ percent of the final mark.", answer: "60", accepts: ["60","sixty"] },
        { type: "tfng", q: "The presentation carries more weight than the report.", answer: "false" },
        { type: "tfng", q: "Questions follow the presentation.", answer: "true" },
        { type: "tfng", q: "The professor states how many groups there will be.", answer: "not given" }
      ]
    },
    {
      minutes: 7,
      context: "Conversación sobre alquiler de un departamento",
      transcript: `So, the flat is on Bridge Street, just above the bakery. The rent is six hundred and fifty pounds a month, which includes water but not electricity or internet. There's a deposit of one month's rent, refundable when you leave, provided there's no damage. The landlord prefers a minimum stay of twelve months, though he might accept nine. Viewings are possible on Thursdays after five, or any time at the weekend. Oh, and I should mention: pets aren't allowed, but the building does have a shared garden.`,
      questions: [
        { type: "gap", q: "The monthly rent is ___ pounds.", answer: "650", accepts: ["650","six hundred and fifty"] },
        { type: "mc", q: "Which utility is covered by the rent?", options: ["Electricity","Internet","Water","All of them"], answer: 2 },
        { type: "mc", q: "The deposit will be returned as long as:", options: ["The tenant stays a year","The flat is undamaged","Rent is paid on time","The landlord agrees"], answer: 1 },
        { type: "gap", q: "The landlord would ideally like a tenancy of ___ months.", answer: "12", accepts: ["12","twelve"] },
        { type: "tfng", q: "A nine-month contract is completely impossible.", answer: "false" },
        { type: "mc", q: "When can the flat be viewed on a weekday?", options: ["Monday mornings","Thursday evenings","Wednesday afternoons","Any weekday"], answer: 1 },
        { type: "tfng", q: "Tenants may keep a cat in the flat.", answer: "false" },
        { type: "gap", q: "The building includes a shared ___.", answer: "garden", accepts: ["garden"] },
        { type: "tfng", q: "The flat is situated above a shop that sells bread.", answer: "true" },
        { type: "tfng", q: "The current tenant is moving abroad.", answer: "not given" }
      ]
    },
    {
      minutes: 7,
      context: "Charla sobre un programa de reciclaje",
      transcript: `Our new recycling scheme begins on the first of June. Collections will happen every fortnight rather than weekly, so please plan accordingly. Glass, paper and metal go in the blue bin; food waste in the small brown caddy. Plastics are more complicated: only types one and two are accepted, and everything must be rinsed first. If a bin is contaminated with the wrong material, it will be left uncollected and a note attached. Residents who need an additional bin can request one free of charge from the council website.`,
      questions: [
        { type: "mc", q: "How often will waste be collected under the new scheme?", options: ["Weekly","Every two weeks","Monthly","Twice a week"], answer: 1 },
        { type: "gap", q: "Food waste should be placed in the brown ___.", answer: "caddy", accepts: ["caddy"] },
        { type: "mc", q: "Which materials share the same bin?", options: ["Glass, paper and metal","Plastic and glass","Food and paper","Metal and plastic"], answer: 0 },
        { type: "tfng", q: "All types of plastic can be recycled in this scheme.", answer: "false" },
        { type: "gap", q: "Plastic items must be ___ before disposal.", answer: "rinsed", accepts: ["rinsed","washed","cleaned"] },
        { type: "mc", q: "What happens if the wrong item is put in a bin?", options: ["A fine is issued","The bin is not emptied","It is collected anyway","The council calls the resident"], answer: 1 },
        { type: "tfng", q: "Extra bins involve an additional cost.", answer: "false" },
        { type: "gap", q: "Additional bins are requested through the council ___.", answer: "website", accepts: ["website","web site"] },
        { type: "tfng", q: "The scheme starts in the first half of the year.", answer: "true" },
        { type: "tfng", q: "The council will publish recycling statistics each month.", answer: "not given" }
      ]
    }
  ];

  const READING_BANK = [
    {
      minutes: 9,
      title: "The rise of urban vertical farming",
      text: `Vertical farming is the practice of growing crops in stacked layers, often inside controlled indoor environments. Unlike traditional agriculture, it does not depend on soil or seasonal weather, using instead artificial light and nutrient-rich water. Supporters argue that vertical farms can produce food close to cities, cutting the distance that vegetables travel and reducing waste. Critics point out that the electricity required for lighting makes the method expensive and, in some regions, less environmentally friendly than expected. Despite these concerns, the number of commercial vertical farms has grown steadily over the past decade, particularly in countries with limited farmland. Researchers continue to study whether the approach can become both affordable and sustainable at a large scale.`,
      questions: [
        { type: "tfng", q: "Vertical farming eliminates the need for arable land.", answer: "true" },
        { type: "tfng", q: "Seasonal conditions determine when vertical farms can harvest.", answer: "false" },
        { type: "mc", q: "According to supporters, the principal benefit of vertical farming is:", options: ["Higher crop yields","Shorter supply chains","Lower electricity use","Better-tasting produce"], answer: 1 },
        { type: "tfng", q: "The environmental advantage of vertical farming is uniform across all regions.", answer: "false" },
        { type: "mc", q: "The main objection raised by critics concerns:", options: ["Food safety","Water consumption","Energy costs","Consumer demand"], answer: 2 },
        { type: "tfng", q: "Adoption of vertical farming has declined recently.", answer: "false" },
        { type: "tfng", q: "Vertical farms are most common where agricultural land is scarce.", answer: "true" },
        { type: "tfng", q: "The passage identifies which country has the most vertical farms.", answer: "not given" },
        { type: "gap", q: "Instead of soil, vertical farms rely on nutrient-rich ___.", answer: "water", accepts: ["water"] },
        { type: "gap", q: "It remains uncertain whether the method can be both affordable and ___.", answer: "sustainable", accepts: ["sustainable"] }
      ]
    },
    {
      minutes: 9,
      title: "Why bees are disappearing",
      text: `Over the past two decades, beekeepers across Europe and North America have reported unusually high colony losses. The phenomenon, sometimes labelled colony collapse disorder, does not appear to have a single cause. Pesticides known as neonicotinoids impair bees' navigation, making it harder for foragers to return to the hive. At the same time, the parasitic varroa mite weakens individual insects and spreads viruses within colonies. Monoculture farming compounds the problem: vast fields of one crop offer abundant food for a few weeks and almost nothing thereafter. Some researchers now argue that no single factor is decisive, and that colonies fail when several stresses coincide. Restoring hedgerows and wildflower margins has produced encouraging local results, though the effect on national bee populations remains unproven.`,
      questions: [
        { type: "mc", q: "The passage suggests colony collapse disorder is:", options: ["Caused mainly by pesticides","The result of several combined pressures","A recently invented term","Confined to North America"], answer: 1 },
        { type: "tfng", q: "Neonicotinoids affect a bee's ability to find its way home.", answer: "true" },
        { type: "tfng", q: "The varroa mite kills bees instantly on contact.", answer: "false" },
        { type: "mc", q: "The difficulty with monoculture farming is that it provides:", options: ["Poisonous nectar","Food that is plentiful but brief","Too much competition","Insufficient water"], answer: 1 },
        { type: "tfng", q: "Scientists have identified one dominant cause of colony loss.", answer: "false" },
        { type: "tfng", q: "Planting wildflower margins has shown promise on a small scale.", answer: "true" },
        { type: "tfng", q: "The national impact of hedgerow restoration has been confirmed.", answer: "false" },
        { type: "tfng", q: "Beekeepers in Asia report similar losses.", answer: "not given" },
        { type: "gap", q: "The varroa mite transmits ___ inside colonies.", answer: "viruses", accepts: ["viruses","virus"] },
        { type: "gap", q: "Colonies tend to fail when multiple ___ occur together.", answer: "stresses", accepts: ["stresses","stress","pressures"] }
      ]
    },
    {
      minutes: 9,
      title: "The forgotten history of the coffee house",
      text: `When the first coffee houses opened in seventeenth-century London, they were regarded with suspicion. Unlike taverns, they served no alcohol, and their patrons remained sober enough to argue. For the price of a penny, anyone could enter, read the newspapers provided and join the conversation. Contemporary critics complained that apprentices wasted whole afternoons in them; the government, more alarmed, attempted to close them in 1675, fearing they had become nurseries of sedition. The ban collapsed within days. What made these establishments remarkable was not the drink but the levelling of rank: a merchant might debate with a duke. Historians disagree about how far this equality extended in practice, but the coffee house undoubtedly accelerated the circulation of ideas that shaped the following century.`,
      questions: [
        { type: "mc", q: "Early coffee houses differed from taverns chiefly because they:", options: ["Were cheaper to enter","Did not serve alcohol","Excluded the poor","Provided food"], answer: 1 },
        { type: "tfng", q: "Entry to a coffee house was restricted by social class.", answer: "false" },
        { type: "mc", q: "The government's attempt to suppress coffee houses was motivated by fear of:", options: ["Public drunkenness","Political dissent","Financial loss","Disease"], answer: 1 },
        { type: "tfng", q: "The 1675 prohibition remained in force for several years.", answer: "false" },
        { type: "tfng", q: "Critics objected that young workers spent too long in coffee houses.", answer: "true" },
        { type: "mc", q: "The writer regards the coffee house's most significant feature as its:", options: ["Cheap prices","Erosion of social hierarchy","Range of newspapers","Quality of coffee"], answer: 1 },
        { type: "tfng", q: "Historians agree that coffee houses achieved genuine social equality.", answer: "false" },
        { type: "tfng", q: "Coffee houses first appeared in Paris before London.", answer: "not given" },
        { type: "gap", q: "Admission to a coffee house cost one ___.", answer: "penny", accepts: ["penny"] },
        { type: "gap", q: "The government feared coffee houses were breeding grounds of ___.", answer: "sedition", accepts: ["sedition"] }
      ]
    },
    {
      minutes: 9,
      title: "Sleep and the adolescent brain",
      text: `Teenagers are routinely accused of laziness for rising late, yet the evidence suggests biology rather than temperament is responsible. During adolescence, the release of melatonin — the hormone that induces drowsiness — shifts later by roughly two hours. A teenager who feels alert at eleven at night is not being defiant; their internal clock has genuinely moved. School start times, however, have not moved with it. Studies in the United States found that districts delaying the first lesson until half past eight recorded improved attendance and modestly higher grades. Critics of such reforms cite the cost of rescheduling transport and the disruption to after-school activities. What is not in dispute is that chronic sleep restriction during these years is associated with impaired memory consolidation, and that catching up at weekends does not fully reverse the deficit.`,
      questions: [
        { type: "tfng", q: "Late rising among teenagers is primarily a matter of attitude.", answer: "false" },
        { type: "mc", q: "During adolescence, melatonin is released:", options: ["Earlier than in childhood","About two hours later","In smaller quantities","Only at weekends"], answer: 1 },
        { type: "tfng", q: "School timetables have adapted to adolescent sleep patterns.", answer: "false" },
        { type: "mc", q: "Districts that postponed the first lesson observed:", options: ["Dramatically higher grades","Better attendance and slightly better grades","No measurable change","Worse behaviour"], answer: 1 },
        { type: "mc", q: "Opponents of later start times are mainly concerned about:", options: ["Academic standards","Practical and logistical costs","Teacher workload","Student health"], answer: 1 },
        { type: "tfng", q: "There is disagreement over whether sleep loss harms memory.", answer: "false" },
        { type: "tfng", q: "Sleeping longer at weekends completely compensates for lost sleep.", answer: "false" },
        { type: "tfng", q: "The passage recommends a specific bedtime for teenagers.", answer: "not given" },
        { type: "gap", q: "Melatonin is described as the hormone that causes ___.", answer: "drowsiness", accepts: ["drowsiness","sleepiness"] },
        { type: "gap", q: "Long-term lack of sleep damages memory ___.", answer: "consolidation", accepts: ["consolidation"] }
      ]
    }
  ];

  const WRITING_PROMPTS = [
    "Some people believe that studying a language abroad is the best way to learn it. To what extent do you agree or disagree?",
    "Many students now prefer online classes to traditional ones. Discuss the main advantage and the main disadvantage, and give your own opinion.",
    "Technology has changed the way we communicate with friends. Do the advantages outweigh the disadvantages?",
    "In many countries, the gap between the rich and the poor is widening. What problems does this cause, and what measures could reduce it?",
    "Some argue that governments should fund the arts; others say public money is better spent on healthcare and education. Discuss both views and give your opinion.",
    "Working from home has become common. Does this development benefit employees more than employers?",
    "Some people think children should begin formal education as early as possible. Others believe they should not start before the age of seven. Discuss both views.",
    "Air travel should be made more expensive in order to reduce pollution. To what extent do you agree or disagree?",
    "Museums and historical sites are mainly visited by tourists rather than local residents. Why is this the case, and how could it be changed?",
    "Many people believe that social media has damaged the quality of public debate. What is your view?"
  ];

  const SPEAKING_SETS = [
    ["Describe your hometown. What do you like most about it?","Do you prefer studying in the morning or at night? Why?","Talk about a skill you would like to learn in the future and explain why."],
    ["What kind of music do you enjoy, and has your taste changed over time?","Describe a memorable journey you have taken. Where did you go and what made it memorable?","Is it better to work alone or in a team? Explain your view with examples."],
    ["Describe your typical daily routine. Would you change anything about it?","What are the benefits of learning English for you personally?","Talk about a book or film that influenced the way you think."],
    ["Describe a person who has had a strong influence on you. Who are they and why?","Do people in your country spend enough time outdoors? Why or why not?","Some say technology makes us less patient. Do you agree?"],
    ["What is your favourite time of year, and what do you do then?","Describe a place you would like to visit but haven't yet. Explain why.","Should governments invest more in public transport than in roads? Why?"],
    ["Talk about a meal you enjoy cooking or eating. What makes it special?","How has the way people shop changed in your country?","Do you think children today have more or less freedom than in the past?"],
    ["Describe something you own that is important to you. Why does it matter?","Do you prefer living in a city or in the countryside? Explain your reasons.","Is it important for a country to preserve its traditional buildings?"],
    ["Describe a time when you learned something the hard way.","What role does sport play in your life?","Some people believe that failure teaches more than success. Do you agree?"]
  ];

  // ---- Estado del runner ----------------------------------------------
  let state = null; // { module, minutes, secondsLeft, interval, sequence, seqIndex, scores }
  let expressInterval = null; // intervalo único: se limpia siempre, no depende de state

  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  // ---- Timer con barra fina -------------------------------------------
  function startCountdown(minutes) {
    stopCountdown();
    state.secondsLeft = minutes * 60;
    state.totalSeconds = minutes * 60;
    renderTimer();
    expressInterval = setInterval(() => {
      if (!state) { stopCountdown(); return; }
      state.secondsLeft -= 1;
      if (state.secondsLeft <= 0) {
        state.secondsLeft = 0;
        renderTimer();
        stopCountdown();
        // tiempo agotado: autoenviar
        submitCurrent(true);
        return;
      }
      renderTimer();
    }, 1000);
  }
  function stopCountdown() {
    if (expressInterval) { clearInterval(expressInterval); expressInterval = null; }
    if (state && state.interval) { clearInterval(state.interval); state.interval = null; }
  }
  function renderTimer() {
    const m = Math.floor(state.secondsLeft / 60);
    const s = state.secondsLeft % 60;
    const el = $("expressRunnerTimer");
    if (el) el.textContent = `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
    const bar = $("expressProgressBar");
    if (bar && state.totalSeconds) {
      const pct = (1 - state.secondsLeft / state.totalSeconds) * 100;
      bar.style.width = `${Math.min(100, Math.max(0, pct)).toFixed(1)}%`;
      bar.classList.toggle("is-urgent", state.secondsLeft <= 30);
    }
  }

  // ---- Vistas ----------------------------------------------------------
  function showDashboard() {
    stopCountdown();
    $("expressDashboard").hidden = false;
    $("expressRunner").hidden = true;
    $("expressResult").hidden = true;
    state = null;
  }

  function openRunner(tag, title) {
    stopCountdown();
    $("expressDashboard").hidden = true;
    $("expressRunner").hidden = false;
    $("expressResult").hidden = true;
    $("expressRunnerTag").textContent = tag;
    $("expressRunnerTitle").textContent = title;
    $("expressResult").innerHTML = "";
    const submit = $("expressSubmitBtn");
    if (submit) submit.disabled = false;
    // "Nuevo examen" no aplica dentro del Simulacro Express Completo
    const newBtn = $("expressNewTestBtn");
    if (newBtn) newBtn.hidden = !!(state && state.sequence);
    const bar = $("expressProgressBar");
    if (bar) { bar.style.width = "0%"; bar.classList.remove("is-urgent"); }
  }

  // ---- Render de preguntas objetivas (listening / reading) ------------
  function questionMarkup(qs) {
    return qs.map((item, i) => {
      let inner = "";
      if (item.type === "mc") {
        inner = `<div class="express-options">${item.options.map((o, oi) =>
          `<label class="express-opt"><input type="radio" name="eq-${i}" value="${oi}"><span>${esc(o)}</span></label>`).join("")}</div>`;
      } else if (item.type === "tfng") {
        inner = `<div class="express-options express-tfng">${["true","false","not given"].map((o) =>
          `<label class="express-opt"><input type="radio" name="eq-${i}" value="${o}"><span>${o === "not given" ? "Not Given" : o.charAt(0).toUpperCase()+o.slice(1)}</span></label>`).join("")}</div>`;
      } else if (item.type === "gap") {
        inner = `<input type="text" class="express-gap-input" name="eq-${i}" placeholder="Tu respuesta" autocomplete="off">`;
      }
      return `<article class="express-question" data-eq="${i}">
        <h5>${i + 1}. ${esc(item.q)}</h5>
        ${inner}
      </article>`;
    }).join("");
  }

  function gradeObjective(qs) {
    let correct = 0;
    qs.forEach((item, i) => {
      let ok = false;
      if (item.type === "gap") {
        const val = (document.querySelector(`[name="eq-${i}"]`)?.value || "").trim().toLowerCase();
        const accepts = (item.accepts || [item.answer]).map((a) => String(a).toLowerCase());
        ok = accepts.includes(val);
      } else {
        const sel = document.querySelector(`[name="eq-${i}"]:checked`);
        if (sel) ok = String(sel.value) === String(item.answer);
      }
      const node = document.querySelector(`.express-question[data-eq="${i}"]`);
      if (node) { node.classList.remove("correct","incorrect"); node.classList.add(ok ? "correct" : "incorrect"); }
      if (ok) correct += 1;
    });
    return correct;
  }

  // Escala IELTS aproximada por aciertos sobre 10
  function bandFromScore(correct, total) {
    const ratio = correct / total;
    if (ratio >= 0.95) return 9.0;
    if (ratio >= 0.85) return 8.0;
    if (ratio >= 0.75) return 7.5;
    if (ratio >= 0.65) return 7.0;
    if (ratio >= 0.55) return 6.5;
    if (ratio >= 0.45) return 6.0;
    if (ratio >= 0.35) return 5.5;
    if (ratio >= 0.25) return 5.0;
    return 4.5;
  }

  // ---- Módulo LISTENING ------------------------------------------------
  // Mezcla las opciones de una pregunta MC preservando la respuesta correcta.
  function shuffleQuestion(item) {
    if (item.type !== "mc" || !Array.isArray(item.options)) return { ...item };
    const pairs = item.options.map((opt, i) => ({ opt, correct: i === item.answer }));
    for (let i = pairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
    }
    return { ...item, options: pairs.map((p) => p.opt), answer: pairs.findIndex((p) => p.correct) };
  }

  // Prepara un set de preguntas: baraja el orden y las opciones de cada MC,
  // y luego AGRUPA por tipo. Agrupar iguala las alturas de las tarjetas vecinas,
  // lo que elimina los huecos verticales del layout en columnas.
  function prepareQuestions(questions) {
    const list = questions.map(shuffleQuestion);
    // Barajar dentro de cada grupo (el orden entre tipos queda fijo)
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    // Orden por altura de tarjeta: MC (alta) -> TFNG (media) -> gap (baja)
    const rank = { mc: 0, tfng: 1, gap: 2 };
    return list.sort((a, b) => (rank[a.type] ?? 3) - (rank[b.type] ?? 3));
  }

  function startListening() {
    const test = pick(LISTENING_BANK);
    const questions = prepareQuestions(test.questions);
    openRunner("Express Listening", test.context || "Escuchá el audio y respondé");
    const body = $("expressRunnerBody");
    body.innerHTML = `
      <div class="express-audio-card">
        <p class="express-hint">Reproducí el audio (voz del navegador) las veces que necesites y respondé las 10 preguntas.</p>
        <div class="express-audio-controls">
          <button id="expressPlayAudio" class="express-audio-btn" type="button">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg><span>Reproducir</span>
          </button>
          <button id="expressStopAudio" class="express-audio-btn" type="button">
            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2"/></svg><span>Detener</span>
          </button>
        </div>
      </div>
      <div class="express-questions">${questionMarkup(questions)}</div>
    `;
    body.querySelector("#expressPlayAudio")?.addEventListener("click", () => speak(test.transcript));
    body.querySelector("#expressStopAudio")?.addEventListener("click", () => window.speechSynthesis?.cancel());
    state.grader = () => gradeListeningReading(questions, "Listening");
    startCountdown(test.minutes);
  }

  function speak(text) {
    if (!("speechSynthesis" in window)) { alert("Tu navegador no soporta audio por voz."); return; }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US"; u.rate = 0.95;
    window.speechSynthesis.speak(u);
  }

  // ---- Módulo READING --------------------------------------------------
  function startReading() {
    const test = pick(READING_BANK);
    const questions = prepareQuestions(test.questions);
    openRunner("Express Reading", test.title);
    const body = $("expressRunnerBody");
    body.innerHTML = `
      <div class="express-reading-text">
        <h5>${esc(test.title)}</h5>
        <p>${esc(test.text)}</p>
      </div>
      <div class="express-questions">${questionMarkup(questions)}</div>
    `;
    state.grader = () => gradeListeningReading(questions, "Reading");
    startCountdown(test.minutes);
  }

  function gradeListeningReading(qs, label) {
    const correct = gradeObjective(qs);
    const band = bandFromScore(correct, qs.length);
    saveScore(label, band);
    return {
      band,
      html: `<div class="express-band"><strong>Band ${band.toFixed(1)}</strong><span>${label} · ${correct}/${qs.length} correctas</span></div>
        <p class="express-result-note">${band >= 7 ? "Muy buen desempeño. Mantené el ritmo bajo presión de tiempo." : band >= 6 ? "Buen nivel. Repasá las que fallaste para afinar precisión." : "Seguí practicando: enfocá en palabras clave y detalles del texto/audio."}</p>`
    };
  }

  // ---- Módulo WRITING --------------------------------------------------
  function startWriting() {
    openRunner("Express Writing", "Ensayo corto de opinión");
    const prompt = pick(WRITING_PROMPTS);
    const body = $("expressRunnerBody");
    body.innerHTML = `
      <div class="express-writing-prompt">
        <span class="express-hint">Consigna (Task 2 · máx. 150 palabras)</span>
        <p>${esc(prompt)}</p>
      </div>
      <textarea id="expressWritingInput" class="express-writing-input" placeholder="Escribí tu ensayo en inglés..."></textarea>
      <div class="express-wordcount"><span id="expressWordCount">0</span> palabras</div>
    `;
    const ta = body.querySelector("#expressWritingInput");
    ta?.addEventListener("input", () => {
      const c = words(ta.value).length;
      const el = $("expressWordCount");
      if (el) el.textContent = c;
    });
    state.grader = () => gradeWriting(ta?.value || "");
    startCountdown(15);
  }

  function gradeWriting(text) {
    const w = words(text);
    const lower = text.toLowerCase();
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
    const connectors = ["however","therefore","moreover","although","because","while","whereas","in addition","for example","as a result","on the other hand"];
    const found = connectors.filter((c) => lower.includes(c));
    const issues = (typeof detectCommonIssues === "function") ? detectCommonIssues(text) : [];

    let band = 5;
    if (w.length >= 80) band += 0.5;
    if (w.length >= 130) band += 0.5;
    if (sentences.length >= 4) band += 0.5;
    if (found.length >= 2) band += 0.5;
    if (found.length >= 4) band += 0.5;
    if (w.length < 60) band -= 0.75;
    band -= issues.length * 0.25;
    band = Math.max(4, Math.min(8.5, Math.round(band * 2) / 2));

    saveScore("Writing", band);
    const feedback = w.length < 40
      ? "El texto es muy corto para evaluar bien. Apuntá a 120–150 palabras."
      : `Usaste ${found.length} conector(es) y ${sentences.length} oración(es). ${found.length >= 2 ? "Buena cohesión." : "Sumá conectores para mejorar la fluidez."} ${issues.length ? "Revisá: " + issues.slice(0,2).join(" ") : "Sin errores frecuentes graves."}`;

    return {
      band,
      html: `<div class="express-band"><strong>Band ${band.toFixed(1)}</strong><span>Writing · ${w.length} palabras</span></div>
        <p class="express-result-note">${esc(feedback)}</p>`
    };
  }

  // ---- Módulo SPEAKING -------------------------------------------------
  let mediaRecorder = null, recordedChunks = [], recognition = null, recognizedText = "";

  function startSpeaking() {
    openRunner("Express Speaking", "Respondé en voz alta");
    const set = pick(SPEAKING_SETS);
    const body = $("expressRunnerBody");
    body.innerHTML = `
      <div class="express-speaking">
        <p class="express-hint">Grabá tus respuestas a estas 3 preguntas. Hablá con naturalidad, como en la Parte 1 del examen.</p>
        <ol class="express-speaking-list">${set.map((q) => `<li>${esc(q)}</li>`).join("")}</ol>
        <div class="express-speaking-controls">
          <button id="expressRecBtn" class="primary-btn" type="button">● Grabar</button>
          <button id="expressRecStop" class="secondary-btn" type="button" disabled>■ Detener</button>
          <span id="expressRecStatus" class="express-rec-status">Listo para grabar</span>
        </div>
        <audio id="expressPlayback" class="express-playback" controls hidden></audio>
        <div id="expressTranscript" class="express-transcript" hidden></div>
      </div>
    `;
    body.querySelector("#expressRecBtn")?.addEventListener("click", startRecording);
    body.querySelector("#expressRecStop")?.addEventListener("click", stopRecording);
    state.grader = () => gradeSpeaking();
    state.spokenSet = set;
    startCountdown(5);
  }

  // ---- Reconocimiento de voz robusto ----------------------------------
  // Problema del enfoque simple: el motor se detiene solo tras cada silencio
  // y deja de capturar. Acá lo reiniciamos mientras el usuario siga grabando,
  // así se pueden transcribir respuestas largas (150-200+ palabras).
  let recognitionActive = false;   // el usuario sigue grabando
  let finalTranscript = "";        // solo resultados definitivos

  function buildRecognition() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return null;

    const rec = new SR();
    rec.lang = "en-US";
    rec.continuous = true;
    rec.interimResults = true;     // capta más, incluso frases sin terminar
    rec.maxAlternatives = 3;       // el motor elige la mejor de 3 hipótesis

    rec.onresult = (ev) => {
      let interim = "";
      for (let i = ev.resultIndex; i < ev.results.length; i++) {
        const result = ev.results[i];
        // Elegimos la alternativa con mayor confianza disponible
        let best = result[0];
        for (let a = 1; a < result.length; a++) {
          if ((result[a].confidence || 0) > (best.confidence || 0)) best = result[a];
        }
        if (result.isFinal) finalTranscript += best.transcript.trim() + " ";
        else interim += best.transcript;
      }
      recognizedText = (finalTranscript + interim).trim();
      updateTranscriptPreview(recognizedText);
    };

    // Si el motor se corta por silencio, lo reiniciamos mientras se grabe.
    rec.onend = () => {
      if (recognitionActive) {
        try { rec.start(); } catch (e) { /* ya iniciado: ignorar */ }
      }
    };
    rec.onerror = (e) => {
      // "no-speech" y "aborted" son normales; el resto se ignora silenciosamente.
      if (e.error === "not-allowed" || e.error === "service-not-allowed") {
        recognitionActive = false;
      }
    };
    return rec;
  }

  function updateTranscriptPreview(text) {
    const box = $("expressTranscript");
    if (!box) return;
    const count = text ? text.trim().split(/\s+/).filter(Boolean).length : 0;
    if (!text) { box.hidden = true; return; }
    box.hidden = false;
    box.innerHTML = `<span>Transcripción en vivo · ${count} palabras</span><p>${esc(text)}</p>`;
  }

  async function startRecording() {
    recognizedText = "";
    finalTranscript = "";
    const status = $("expressRecStatus");
    try {
      // Pistas de calidad para que la voz se entienda mejor
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          channelCount: 1
        }
      });
      recordedChunks = [];
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = (e) => { if (e.data.size) recordedChunks.push(e.data); };
      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: "audio/webm" });
        const audio = $("expressPlayback");
        if (audio) { audio.src = URL.createObjectURL(blob); audio.hidden = false; }
        stream.getTracks().forEach((t) => t.stop());
      };
      mediaRecorder.start();
      if (status) status.textContent = "Grabando... hablá con naturalidad.";
      $("expressRecBtn").disabled = true;
      $("expressRecStop").disabled = false;

      recognition = buildRecognition();
      if (recognition) {
        recognitionActive = true;
        try { recognition.start(); } catch (e) {}
      } else if (status) {
        status.textContent = "Grabando (tu navegador no transcribe automáticamente).";
      }
    } catch (err) {
      if (status) status.textContent = "No se pudo acceder al micrófono. Podés continuar igual.";
    }
  }

  function stopRecording() {
    recognitionActive = false;    // frena el reinicio automático
    if (mediaRecorder && mediaRecorder.state !== "inactive") mediaRecorder.stop();
    if (recognition) { try { recognition.stop(); } catch (e) {} }
    const status = $("expressRecStatus");
    if (status) status.textContent = "Grabación lista. Ya podés enviar.";
    if ($("expressRecBtn")) $("expressRecBtn").disabled = false;
    if ($("expressRecStop")) $("expressRecStop").disabled = true;

    // La transcripción final ya se fue mostrando en vivo; la consolidamos.
    recognizedText = finalTranscript.trim() || recognizedText.trim();
    updateTranscriptPreview(recognizedText);
  }

  function gradeSpeaking() {
    if (mediaRecorder && mediaRecorder.state === "recording") stopRecording();
    const t = (finalTranscript.trim() || recognizedText || "").trim();
    const w = words(t);
    let band;
    if (w.length === 0) {
      band = 6.0; // sin transcripción disponible: estimación neutra por completar
    } else {
      // Escala pensada para respuestas de las 3 preguntas (objetivo: 150-200 palabras)
      band = 5.0;
      if (w.length >= 50) band += 0.5;
      if (w.length >= 90) band += 0.5;
      if (w.length >= 140) band += 0.5;   // rango objetivo
      if (w.length >= 190) band += 0.5;

      // Variedad léxica (type-token ratio)
      const uniq = new Set(w.map((x) => x.toLowerCase())).size;
      const ttr = uniq / Math.max(1, w.length);
      if (ttr > 0.5) band += 0.5;
      if (ttr > 0.62) band += 0.5;

      // Cohesión: conectores propios de banda alta
      const lower = t.toLowerCase();
      const connectors = ["however","although","because","for example","whereas",
        "in addition","on the other hand","therefore","personally","in my opinion","that said"];
      const used = connectors.filter((c) => lower.includes(c)).length;
      if (used >= 2) band += 0.5;
      if (used >= 4) band += 0.5;

      band = Math.max(4.5, Math.min(8.5, Math.round(band * 2) / 2));
    }
    saveScore("Speaking", band);

    let note;
    if (w.length === 0) {
      note = "No detectamos transcripción automática (tu navegador puede no soportarla). Band orientativa por completar el módulo.";
    } else if (w.length < 90) {
      note = `Detectamos ~${w.length} palabras. Para las 3 preguntas conviene apuntar a 150-200: extendé cada respuesta con un ejemplo o una razón.`;
    } else if (w.length < 140) {
      note = `Detectamos ~${w.length} palabras. Vas bien; llegando a 150-200 mostrás más fluidez sostenida.`;
    } else {
      note = `Detectamos ~${w.length} palabras. ${band >= 7 ? "Buena fluidez, extensión y variedad léxica." : "Buena extensión; sumá conectores y vocabulario más preciso para subir de banda."}`;
    }

    return {
      band,
      html: `<div class="express-band"><strong>Band ${band.toFixed(1)}</strong><span>Speaking · ${w.length} palabras</span></div>
        <p class="express-result-note">${esc(note)}</p>`
    };
  }

  // ---- Envío / resultado ----------------------------------------------
  function submitCurrent(auto) {
    stopCountdown();
    if (!state || !state.grader) return;
    const result = state.grader();

    if (state.sequence) {
      // Modo Full Express: guardar y avanzar
      state.scores.push({ module: state.moduleLabel, band: result.band });
      state.seqIndex += 1;
      if (state.seqIndex < state.sequence.length) {
        runSequenceStep();
      } else {
        finishSequence();
      }
      return;
    }

    // Modo individual: mostrar resultado (sin botón; se cierra con la X del runner)
    const res = $("expressResult");
    res.hidden = false;
    res.innerHTML = result.html;
    $("expressSubmitBtn").disabled = true;
    log(`Express ${state.moduleLabel} · Band ${result.band.toFixed(1)}`);
    persistScore(result.band);
  }

  function persistScore(band) {
    // Integrar con el progreso global (misma escala % que el resto usa)
    try {
      const pct = Math.round((band / 9) * 100);
      const hist = JSON.parse(localStorage.getItem("englishTrainerScoreHistory")) || [];
      hist.push(pct);
      localStorage.setItem("englishTrainerScoreHistory", JSON.stringify(hist));
      const done = Number(localStorage.getItem("englishTrainerExamsCompleted") || 0) + 1;
      localStorage.setItem("englishTrainerExamsCompleted", String(done));
    } catch (e) {}
  }

  const scoreStore = {};
  function saveScore(label, band) { scoreStore[label] = band; }

  // ---- Full Express (secuencia) ---------------------------------------
  function startFullExpress() {
    state = { sequence: ["listening","reading","writing","speaking"], seqIndex: 0, scores: [] };
    runSequenceStep();
  }

  function runSequenceStep() {
    const mod = state.sequence[state.seqIndex];
    const seq = state.sequence, idx = state.seqIndex, scores = state.scores;
    // starters reinician state; preservamos la secuencia
    const starter = { listening: startListening, reading: startReading, writing: startWriting, speaking: startSpeaking }[mod];
    state = { sequence: seq, seqIndex: idx, scores };
    state.moduleLabel = mod.charAt(0).toUpperCase() + mod.slice(1);
    starter();
    // marcar progreso de secuencia
    const pt = $("expressRunnerProgress");
    if (pt) pt.textContent = `Full Express · paso ${idx + 1} de 4 (${state.moduleLabel})`;
  }

  function finishSequence() {
    const scores = state.scores;
    const overall = scores.reduce((a, s) => a + s.band, 0) / scores.length;
    const rounded = Math.round(overall * 2) / 2;
    $("expressResult").hidden = false;
    $("expressResult").innerHTML = `
      <div class="express-band express-band-overall"><strong>Band ${rounded.toFixed(1)}</strong><span>Overall Express</span></div>
      <div class="express-overall-grid">
        ${scores.map((s) => `<div><span>${esc(s.module)}</span><strong>${s.band.toFixed(1)}</strong></div>`).join("")}
      </div>`;
    $("expressSubmitBtn").disabled = true;
    log(`Full Express completado · Band ${rounded.toFixed(1)}`);
    persistScore(rounded);
  }

  // ---- Wiring ----------------------------------------------------------
  function initModuleState(moduleLabel) {
    stopCountdown();
    state = { moduleLabel };
    const pt = $("expressRunnerProgress");
    if (pt) pt.textContent = "";
  }

  function boot() {
    const dash = $("expressDashboard");
    if (!dash || dash.dataset.expressBound === "true") return;
    dash.dataset.expressBound = "true";

    document.querySelectorAll("[data-express-module]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const mod = btn.dataset.expressModule;
        initModuleState(mod.charAt(0).toUpperCase() + mod.slice(1));
        state.moduleKey = mod;   // recordar para "Nuevo examen"
        ({ listening: startListening, reading: startReading, writing: startWriting, speaking: startSpeaking }[mod])();
      });
    });

    // Genera otra variante del módulo actual (nuevo texto/audio/consigna + preguntas barajadas)
    $("expressNewTestBtn")?.addEventListener("click", () => {
      if (!state) return;
      if (state.sequence) return;              // en el Full Express no aplica
      const mod = state.moduleKey;
      if (!mod) return;
      stopCountdown();
      const label = mod.charAt(0).toUpperCase() + mod.slice(1);
      initModuleState(label);
      state.moduleKey = mod;
      ({ listening: startListening, reading: startReading, writing: startWriting, speaking: startSpeaking }[mod])();
    });

    $("expressFullBtn")?.addEventListener("click", startFullExpress);
    // X del runner: única salida hacia el dashboard.
    // Solo pide confirmación si hay un examen en curso (no si ya se envió).
    $("expressCloseBtn")?.addEventListener("click", () => {
      const yaEnviado = $("expressSubmitBtn")?.disabled;
      const enCurso = !!expressInterval && !yaEnviado;
      if (enCurso) {
        const msg = (state && state.sequence)
          ? "¿Salir del Simulacro Express Completo? Se perderá el progreso."
          : "¿Salir del examen? Se perderán tus respuestas.";
        if (!confirm(msg)) return;
      }
      showDashboard();
    });

    $("expressExitBtn")?.addEventListener("click", () => {
      if (state && state.sequence) {
        if (!confirm("¿Salir del Simulacro Express Completo? Se perderá el progreso.")) return;
      }
      showDashboard();
    });
    $("expressSubmitBtn")?.addEventListener("click", () => {
      $("expressSubmitBtn").disabled = false;
      submitCurrent(false);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
  window.addEventListener("load", () => setTimeout(boot, 120));
})();


/* =========================================================
   V64 — RUEDA DE COLOR (reemplaza los swatches predefinidos)
   El usuario elige cualquier color de la rueda. A partir del
   matiz + saturación se genera una paleta de 5 tonos que se
   inyecta como theme "custom" y reutiliza applyTheme() para
   respetar la lógica de intensidad existente.
========================================================= */
(function colorWheelPickerV64() {
  if (window.__colorWheelV64) return;
  window.__colorWheelV64 = true;

  function hslToRgb(h, s, l) {
    s /= 100; l /= 100;
    const k = (n) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return {
      r: Math.round(255 * f(0)),
      g: Math.round(255 * f(8)),
      b: Math.round(255 * f(4))
    };
  }
  function rgbHex({ r, g, b }) {
    return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
  }
  function hslHex(h, s, l) { return rgbHex(hslToRgb(h, s, l)); }

  // Paleta de 5 tonos (oscuro -> claro) a partir de un matiz/saturación.
  // Respeta la saturación real: cerca del centro (sat baja) da grises/neutros.
  function paletteFromHue(h, s) {
    const sat = Math.max(0, Math.min(s, 100));   // sin mínimo forzado
    return [
      hslHex(h, Math.min(sat + 4, 100), 14),
      hslHex(h, sat, 32),
      hslHex(h, sat, 50),
      hslHex(h, Math.max(sat - 8, 0), 68),
      hslHex(h, Math.max(sat - 18, 0), 88)
    ];
  }

  function drawWheel(canvas) {
    const ctx = canvas.getContext("2d");
    const size = canvas.width;
    const cx = size / 2, cy = size / 2, radius = size / 2;
    const img = ctx.createImageData(size, size);
    const data = img.data;

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const dx = x - cx, dy = y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const idx = (y * size + x) * 4;
        if (dist > radius) { data[idx + 3] = 0; continue; }

        let angle = Math.atan2(dy, dx) * 180 / Math.PI;
        if (angle < 0) angle += 360;

        const t = Math.min(dist / radius, 1);   // 0 centro -> 1 borde
        const sat = t * 100;                     // centro neutro (gris) -> borde saturado
        const light = 90 - t * 40;               // centro claro -> borde medio
        const { r, g, b } = hslToRgb(angle, sat, light);

        data[idx] = r; data[idx + 1] = g; data[idx + 2] = b;
        // antialias suave del borde exterior
        data[idx + 3] = dist > radius - 1.5 ? Math.max(0, (radius - dist) / 1.5) * 255 : 255;
      }
    }
    ctx.putImageData(img, 0, 0);

    // Anillo exterior sutil que enmarca la rueda
    ctx.beginPath();
    ctx.arc(cx, cy, radius - 0.5, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  let currentHue = 28, currentSat = 90; // por defecto ~naranja

  function applyFromWheel(h, s, canvas) {
    currentHue = h; currentSat = s;
    // Inyectar paleta custom y aplicar respetando la intensidad actual
    if (typeof themePalettes === "object") {
      themePalettes.custom = paletteFromHue(h, s);
    }
    const intensity = (typeof selectedIntensity === "number") ? selectedIntensity : 2;
    if (typeof applyTheme === "function") applyTheme("custom", intensity);
    localStorage.setItem("englishTrainerWheelHue", String(h));
    localStorage.setItem("englishTrainerWheelSat", String(s));
    positionCursor(canvas, h, s);
  }

  function positionCursor(canvas, h, s) {
    const cursor = document.getElementById("colorWheelCursor");
    if (!cursor || !canvas) return;
    // offset del canvas dentro del wrap (por el padding del marco)
    const offset = canvas.offsetLeft;
    const offsetTop = canvas.offsetTop;
    const radius = canvas.clientWidth / 2;
    const r = (s / 100) * radius;
    const angle = h * Math.PI / 180;
    const x = offset + radius + r * Math.cos(angle);
    const y = offsetTop + radius + r * Math.sin(angle);
    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
    cursor.style.background = hslHex(h, s, 100 - (s / 100) * 50);
  }

  function pickFromEvent(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX ?? (event.touches && event.touches[0].clientX)) - rect.left;
    const y = (event.clientY ?? (event.touches && event.touches[0].clientY)) - rect.top;
    const cx = rect.width / 2, cy = rect.height / 2;
    const dx = x - cx, dy = y - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const radius = rect.width / 2;
    let angle = Math.atan2(dy, dx) * 180 / Math.PI;
    if (angle < 0) angle += 360;

    // Selección libre: el matiz es el ángulo exacto y la saturación la
    // distancia al centro. Sin engancharse a secciones.
    const sat = Math.round(Math.min(dist / radius, 1) * 100);
    applyFromWheel(Math.round(angle), sat, canvas);
  }

  function init() {
    const canvas = document.getElementById("colorWheel");
    if (!canvas || canvas.dataset.wheelReady === "true") return;
    canvas.dataset.wheelReady = "true";

    drawWheel(canvas);

    let dragging = false;
    canvas.addEventListener("pointerdown", (e) => { dragging = true; pickFromEvent(canvas, e); });
    window.addEventListener("pointermove", (e) => { if (dragging) pickFromEvent(canvas, e); });
    window.addEventListener("pointerup", () => { dragging = false; });

    // Restaurar última elección de la rueda (si existe)
    const savedH = Number(localStorage.getItem("englishTrainerWheelHue"));
    const savedS = Number(localStorage.getItem("englishTrainerWheelSat"));
    if (!Number.isNaN(savedH) && localStorage.getItem("englishTrainerWheelHue") !== null) {
      applyFromWheel(savedH, savedS || 90, canvas);
    } else {
      positionCursor(canvas, currentHue, currentSat);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
  window.addEventListener("load", () => setTimeout(init, 150));
})();


/* =========================================================
   V69 — FLASHVOICE: panel de opciones (tuerca) + switch de voz
   Solo UI: reutiliza los inputs existentes (flashvoiceVolume,
   flashvoiceWpm, flashvoiceVoice, flashvoiceSource) sin tocar
   la lógica de reproducción ni de corrección.
========================================================= */
(function flashvoiceSettingsV69() {
  if (window.__flashvoiceSettingsV69) return;
  window.__flashvoiceSettingsV69 = true;

  function init() {
    const toggle = document.getElementById("flashvoiceSettingsToggle");
    const panel = document.getElementById("flashvoiceSettingsPanel");
    const wrap = document.getElementById("flashvoiceSettings");
    if (!toggle || !panel || toggle.dataset.fvBound === "true") return;
    toggle.dataset.fvBound = "true";

    function closePanel() {
      panel.hidden = true;
      wrap.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
    function openPanel() {
      panel.hidden = false;
      wrap.classList.add("open");
      toggle.setAttribute("aria-expanded", "true");
    }

    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      panel.hidden ? openPanel() : closePanel();
    });

    // Cerrar al clickear fuera o con Escape
    document.addEventListener("click", (e) => {
      if (!panel.hidden && !wrap.contains(e.target)) closePanel();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !panel.hidden) closePanel();
    });
    panel.addEventListener("click", (e) => e.stopPropagation());

    // Switch de voz -> escribe en el <select> oculto y dispara 'change'
    // para que la lógica original de flashvoice reaccione igual que antes.
    const select = document.getElementById("flashvoiceVoice");
    panel.querySelectorAll(".fv-voice-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        panel.querySelectorAll(".fv-voice-btn").forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        if (select) {
          select.value = btn.dataset.voice;
          select.dispatchEvent(new Event("change", { bubbles: true }));
        }
      });
    });

    // Relleno visual de los sliders (barra del theme)
    function paintRange(input) {
      if (!input) return;
      const min = Number(input.min || 0);
      const max = Number(input.max || 100);
      const pct = ((Number(input.value) - min) / (max - min)) * 100;
      input.style.setProperty("--fv-pct", `${pct}%`);
    }
    ["flashvoiceVolume", "flashvoiceWpm"].forEach((id) => {
      const input = document.getElementById(id);
      if (!input) return;
      paintRange(input);
      input.addEventListener("input", () => paintRange(input));
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
  window.addEventListener("load", () => setTimeout(init, 150));
})();
