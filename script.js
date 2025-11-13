// ---------------------------
// DEFINICIÓN DE LA MT
// ---------------------------

let tape = [];
let head = 0;
let currentState = "q0";
let finished = false;

// Estados finales
const ACCEPT = "q4";
const REJECT = "qx";

// Tabla de transición del AFD → MT
const delta = {
    q0: { "0": "q1", "1": "q1", "2": "q1", "3": "q1", "4": "q1", "5": "q1", "6": "q1", "7": "q1", "8": "q1", "8": "q1", "9": "q1" },
    q1: { "0": "q2", "1": "q2", "2": "q2", "3": "q2", "4": "q2", "5": "q2", "6": "q2", "7": "q2", "8": "q2", "9": "q2" },
    q2: { "0": "q3", "1": "q3", "2": "q3", "3": "q3", "4": "q3", "5": "q3", "6": "q3", "7": "q3", "8": "q3", "9": "q3" },
    q3: { "0": ACCEPT, "1": ACCEPT, "2": ACCEPT, "3": ACCEPT, "4": ACCEPT, "5": ACCEPT, "6": ACCEPT, "7": ACCEPT, "8": ACCEPT, "9": ACCEPT },
    q4: {}, // Aceptación
    qx: {} // Rechazo
};

// ---------------------------
// RENDER DE LA CINTA
// ---------------------------
function renderTape() {
    const tapeDiv = document.getElementById("tape");
    tapeDiv.innerHTML = "";

    for (let i = 0; i < tape.length; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.textContent = tape[i];

        if (i === head) cell.classList.add("head");

        tapeDiv.appendChild(cell);
    }

    document.getElementById("currentState").textContent = currentState;
}

// ---------------------------
// CARGAR LA CINTA
// ---------------------------
function loadTape() {
    const input = document.getElementById("inputString").value;

    tape = input.split("");
    tape.push("_"); // blanco final
    head = 0;
    currentState = "q0";
    finished = false;

    document.getElementById("result").textContent = "—";

    renderTape();
}

// ---------------------------
// UN PASO DE EJECUCIÓN
// ---------------------------
function step() {
    if (finished) return;

    const symbol = tape[head];

    // Si llegó a blanco y no está en aceptación → rechazar
    if (symbol === "_") {
        currentState = (currentState === ACCEPT) ? ACCEPT : REJECT;
        finished = true;
        updateResult();
        return;
    }

    const rules = delta[currentState];

    if (!rules || !rules[symbol]) {
        currentState = REJECT;
        finished = true;
        updateResult();
        return;
    }

    // Aplicar transición
    currentState = rules[symbol];

    // Mover cabeza a la derecha
    head++;

    renderTape();

    // Ver si terminó
    if (currentState === ACCEPT || currentState === REJECT) {
        finished = true;
        updateResult();
    }
}

// ---------------------------
// ACTUALIZAR RESULTADO
// ---------------------------
function updateResult() {
    const out = document.getElementById("result");

    if (currentState === ACCEPT) out.textContent = "✔ CADENA ACEPTADA";
    else out.textContent = "✘ CADENA RECHAZADA";
}

// ---------------------------
// EJECUTAR AUTOMÁTICO
// ---------------------------
function run() {
    if (finished) return;

    const interval = setInterval(() => {
        if (finished) {
            clearInterval(interval);
            return;
        }
        step();
    }, 600);
}

// ---------------------------
// REINICIAR
// ---------------------------
function reset() {
    tape = [];
    head = 0;
    currentState = "q0";
    finished = false;
    document.getElementById("tape").innerHTML = "";
    document.getElementById("result").textContent = "—";
    document.getElementById("currentState").textContent = "q0";
}

// ---------------------------
// EVENTOS
// ---------------------------
document.getElementById("loadButton").onclick = loadTape;
document.getElementById("stepButton").onclick = step;
document.getElementById("runButton").onclick = run;
document.getElementById("resetButton").onclick = reset;
