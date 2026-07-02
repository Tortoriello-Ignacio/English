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

setInterval(() => {
  if (!document.hidden) {
    studySeconds += 15;
    weeklySeconds += 15;
    localStorage.setItem("englishTrainerStudySeconds", String(studySeconds));
    localStorage.setItem("englishTrainerWeeklySeconds", String(weeklySeconds));
    updateProgress();
  }
}, 15000);


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

function setTimer(minutes) {
  const mins = Number(minutes);
  if (!mins || mins < 1) {
    alert("Ingresá una cantidad válida de minutos.");
    return;
  }

  clearInterval(timerInterval);
  timerInitialSeconds = mins * 60;
  timerSecondsLeft = timerInitialSeconds;
  timerPaused = false;
  timerInterval = null;

  if (timerProgressRing) timerProgressRing.classList.remove("timer-running", "timer-paused");

  if (pauseTimerBtn) pauseTimerBtn.textContent = "Pausar";
  if (startTimerBtn) {
    startTimerBtn.textContent = "Start";
    startTimerBtn.disabled = false;
  }
  updateTimerUI();
}

function startTimer() {
  if (!timerInitialSeconds || timerInitialSeconds < 1) {
    alert("Primero elegí 5, 10, 15 minutos o seteá una cantidad personalizada.");
    return;
  }
  if (timerInterval) return;

  timerPaused = false;
  if (timerProgressRing) timerProgressRing.classList.add("timer-running");
  if (timerProgressRing) timerProgressRing.classList.remove("timer-paused");
  if (pauseTimerBtn) pauseTimerBtn.textContent = "Pausar";
  if (startTimerBtn) {
    startTimerBtn.textContent = "En curso";
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
        startTimerBtn.textContent = "Start";
        startTimerBtn.disabled = false;
      }
      alert("¡Tiempo cumplido! Excelente sesión de estudio.");
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

if (customTimerBtn) customTimerBtn.addEventListener("click", () => setTimer(customMinutes.value));
if (startTimerBtn) startTimerBtn.addEventListener("click", startTimer);

if (pauseTimerBtn) {
  pauseTimerBtn.addEventListener("click", () => {
    if (!timerInterval) return;
    timerPaused = !timerPaused;
    pauseTimerBtn.textContent = timerPaused ? "Continuar" : "Pausar";
    if (timerProgressRing) timerProgressRing.classList.toggle("timer-paused", timerPaused);
    if (timerProgressRing) timerProgressRing.classList.toggle("timer-running", !timerPaused);
    if (startTimerBtn) startTimerBtn.textContent = timerPaused ? "Pausado" : "En curso";
  });
}

if (resetTimerBtn) {
  resetTimerBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    timerInterval = null;
    timerSecondsLeft = 0;
    timerInitialSeconds = 0;
    timerPaused = false;
    if (timerProgressRing) timerProgressRing.classList.remove("timer-running", "timer-paused");
    if (pauseTimerBtn) pauseTimerBtn.textContent = "Pausar";
    if (startTimerBtn) {
      startTimerBtn.textContent = "Start";
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
  gray: ["#0f0f0f", "#27272a", "#52525b", "#a1a1aa", "#f4f4f5"],
  gold: ["#422006", "#a16207", "#d97706", "#facc15", "#fef3c7"],
  red: ["#450a0a", "#b91c1c", "#ef4444", "#fb7185", "#fee2e2"],
  green: ["#052e16", "#15803d", "#22c55e", "#86efac", "#dcfce7"],
  purple: ["#2e1065", "#6d28d9", "#8b5cf6", "#c084fc", "#f3e8ff"],
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
