document.querySelector('.btn').addEventListener('click', () => {
    alert("¡Bienvenido a PYTHONES+!");
});
// --- CHATBOT BÁSICO ---
const messages = document.getElementById("messages");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.innerText = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
}

sendBtn.addEventListener("click", () => {
    const text = input.value.trim();
    if (text === "") return;

    addMessage(text, "user");
    input.value = "";

    botResponse(text);
});

// --- RESPUESTAS AUTOMÁTICAS DEL BOT ---
function botResponse(text) {
    text = text.toLowerCase();

    if (text.includes("hola")) {
        addMessage("¡Hola! ¿En qué puedo ayudarte?", "bot");
    } 
    else if (text.includes("nivel")) {
        addMessage(recomendarNivel(), "bot");
    }
    else if (text.includes("consejo")) {
        addMessage(darConsejo(), "bot");
    }
    else {
        addMessage("No entendí eso 🤖. Puedes pedir: 'nivel' o 'consejo'.", "bot");
    }
}

// --- FUNCIÓN 1: Recomendar nivel ---
function recomendarNivel() {
    const niveles = [
        "Nivel 1 → Fundamentos",
        "Nivel 2 → Lógica",
        "Nivel 3 → Algoritmos",
        "Nivel 4 → Retos reales",
        "Nivel 5 → Proyectos"
    ];

    const random = Math.floor(Math.random() * niveles.length);
    return "Creo que podrías intentar: " + niveles[random];
}

// --- FUNCIÓN 2: Dar un consejo de programación ---
function darConsejo() {
    const consejos = [
        "Divide un problema grande en partes pequeñas.",
        "Lee tus errores: siempre dicen dónde está el problema.",
        "Practica todos los días aunque sea poco.",
        "Antes de programar, piensa la solución.",
        "No temas equivocarte: es parte del aprendizaje."
    ];

    const random = Math.floor(Math.random() * consejos.length);
    return "Consejo: " + consejos[random];
}

// --- EJERCICIOS INTERACTIVOS ---

const exercises = [
    {
        text: "Escribe un código que sume 5 + 3 y muestre la respuesta.",
        solution: "8"
    },
    {
        text: "Crea una variable llamada saludo con el texto 'Hola Mundo'.",
        solution: "Hola Mundo"
    },
    {
        text: "Calcula el área de un cuadrado de lado 4.",
        solution: "16"
    }
];

let currentExercise = 0;

function loadExercise() {
    currentExercise = Math.floor(Math.random() * exercises.length);
    document.getElementById("exerciseText").innerText = exercises[currentExercise].text;
    document.getElementById("output").innerText = "";
}

document.getElementById("runCode").addEventListener("click", () => {
    const code = document.getElementById("codeArea").value;

    try {
        // Ejecutar el código del usuario
        let result = eval(code);

        document.getElementById("output").innerText = "Resultado: " + result;

        // Validación del ejercicio
        if (String(result) === exercises[currentExercise].solution) {
            document.getElementById("output").innerText += "\n✔ ¡Correcto!";
        } else {
            document.getElementById("output").innerText += "\n❌ Incorrecto.";
        }

    } catch (error) {
        document.getElementById("output").innerText = "Error: " + error;
    }
});

document.getElementById("newExercise").addEventListener("click", loadExercise);

// Cargar primer ejercicio al inicio
loadExercise();
// --- QUIZ INTERACTIVO ---

const quizData = [
    {
        question: "¿Qué es un bucle en programación?",
        options: [
            "Una instrucción que se ejecuta solo una vez",
            "Una estructura que repite código mientras se cumpla una condición",
            "Un tipo especial de variable",
            "Un error en el código"
        ],
        correct: 1
    },
    {
        question: "¿Qué palabra clave se usa para definir una función en JavaScript?",
        options: ["method", "func", "function", "def"],
        correct: 2
    },
    {
        question: "¿Qué simboliza '==' en la mayoría de lenguajes?",
        options: [
            "Asignación",
            "Comparación de igualdad",
            "Declaración de variable",
            "Bucle infinito"
        ],
        correct: 1
    },
    {
        question: "¿Cuál de estos es un tipo de dato primitivo?",
        options: ["Array", "Objeto", "String", "Función"],
        correct: 2
    },
    {
        question: "¿Qué estructura se usa para tomar decisiones?",
        options: ["for", "if", "return", "break"],
        correct: 1
    },
    {
        question: "¿Cuál es el operador lógico AND?",
        options: ["&&", "||", "!", "=="],
        correct: 0
    },
    {
        question: "¿Qué es un algoritmo?",
        options: [
            "Un conjunto de pasos ordenados para resolver un problema",
            "Un lenguaje de programación",
            "Un error en tiempo de ejecución",
            "Un archivo del sistema"
        ],
        correct: 0
    },
    {
        question: "¿Qué bucle se ejecuta al menos una vez?",
        options: ["for", "foreach", "while", "do...while"],
        correct: 3
    },
    {
        question: "¿Cuál de estos representa un arreglo?",
        options: ["{}", "[]", "()", "<>"],
        correct: 1
    },
    {
        question: "¿Cuál es la salida de: 10 % 3?",
        options: ["3", "1", "0", "7"],
        correct: 1
    }
];

let currentQuiz = 0;
let answered = false;

function loadQuiz() {
    answered = false;
    document.getElementById("quizResult").innerText = "";
    document.getElementById("nextQuiz").style.display = "none";

    const q = quizData[currentQuiz];
    document.getElementById("quizQuestion").innerText = q.question;

    const optionsDiv = document.getElementById("quizOptions");
    optionsDiv.innerHTML = "";

    q.options.forEach((opt, index) => {
        const div = document.createElement("div");
        div.classList.add("quiz-option");
        div.innerText = opt;
        div.addEventListener("click", () => checkAnswer(index, div));
        optionsDiv.appendChild(div);
    });
}

function checkAnswer(selectedIndex, optionDiv) {
    if (answered) return;
    answered = true;

    const q = quizData[currentQuiz];

    if (selectedIndex === q.correct) {
        optionDiv.classList.add("correct");
        document.getElementById("quizResult").innerText = "✔ ¡Correcto!";
    } else {
        optionDiv.classList.add("incorrect");
        document.getElementById("quizResult").innerText = "❌ Incorrecto";
    }

    document.getElementById("nextQuiz").style.display = "block";
}

document.getElementById("nextQuiz").addEventListener("click", () => {
    currentQuiz++;
    if (currentQuiz >= quizData.length) currentQuiz = 0;
    loadQuiz();
});

// Cargar primer quiz
loadQuiz();
function sendMessage() {
    const input = document.getElementById("userInput");
    const msg = input.value.trim();

    if (msg === "") return;

    addMessage(msg, "user");

    setTimeout(() => {
        const respuesta = botResponder(msg);
        addMessage(respuesta, "bot");
    }, 500);

    input.value = "";
}

function addMessage(text, type) {
    const chat = document.getElementById("chatMessages");
    const div = document.createElement("div");

    div.classList.add("message", type);
    div.textContent = text;

    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

// BOT PRINCIPAL COMBINADO
function botResponder(text) {
    const msg = text.toLowerCase();

    // === SALUDOS ===
    if (msg.includes("hola") || msg.includes("buenas")) {
        return "¡Hola! 😊 ¿En qué puedo ayudarte?";
    }

    // === CURSOS / PRECIOS ===
    if (msg.includes("curso")) {
        return "Ofrecemos cursos desde nivel básico hasta avanzado. ¿Qué tema te interesa?";
    }

    if (msg.includes("precio")) {
        return "El precio depende del curso, pero siempre tenemos promociones activas 😄.";
    }

    // === EXPLICAR TEMAS ===
    if (msg.includes("explica")) {
        const tema = msg.replace("explica", "").trim();
        if (tema.length > 1) {
            return `Aquí tienes una explicación sencilla sobre **${tema}**:\n\n` +
                   "- Es un concepto importante.\n" +
                   "- Se utiliza en muchos proyectos reales.\n" +
                   "- Si quieres una explicación más profunda, solo dímelo 😄.";
        } else {
            return "Claro, ¿qué deseas que te explique?";
        }
    }

    // === ¿QUÉ ES...? ===
    if (msg.includes("que es") || msg.includes("qué es")) {
        const tema = msg.replace("que es", "").replace("qué es", "").trim();
        if (tema.length > 1) {
            return `**${tema}** es un concepto clave. Se usa para resolver problemas en programación y tecnología.\n\n¿Quieres ejemplos?`;
        } else {
            return "¿Qué deseas saber qué es? 😊";
        }
    }

    // === EJEMPLOS ===
    if (msg.includes("ejemplo")) {
        return "Aquí tienes un ejemplo sencillo:\n\n" +
               "```\nprint('Hola mundo')\n```\n" +
               "Si quieres otro ejemplo más avanzado, ¡pídelo!";
    }

    // === PYTHON ===
    if (msg.includes("python")) {
        return "Python es un lenguaje muy usado, fácil de aprender y excelente para principiantes.";
    }

    // === GRACIAS ===
    if (msg.includes("gracias")) {
        return "¡De nada! 😊 Estoy aquí para ayudarte.";
    }

    // === RESPUESTA DEFAULT ===
    return "Interesante 😄. Estoy aprendiendo más cada día. ¿Puedes explicarme un poco más lo que necesitas?";
}

