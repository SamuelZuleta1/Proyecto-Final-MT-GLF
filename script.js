// ===============================
// CONFIGURACIÓN DE LA MT
// ===============================

// Estados válidos
const startState = "q0";
const acceptState = "q4";
const rejectState = "qx";

// Tabla de transición de la MT: (leer → escribir, mover, siguiente estado)
const transitionFunction = {
    q0: {
        "0": ["0", "R", "q1"],
        "1": ["1", "R", "q1"],
        "2": ["2", "R", "q1"],
        "3": ["3", "R", "q1"],
        "4": ["4", "R", "q1"],
        "5": ["5", "R", "q1"],
        "6": ["6", "R", "q1"],
        "7": ["7", "R", "q1"],
        "8": ["8", "R", "q1"],
        "9": ["9", "R", "q1"],
        "_": ["_", "N", rejectState]
    },
    q1: {
        "0": ["0", "R", "q2"],
        "1": ["1", "R", "q2"],
        "2": ["2", "R", "q2"],
        "3": ["3", "R", "q2"],
        "4": ["4", "R", "q2"],
        "5": ["5", "R", "q2"],
        "6": ["6", "R", "q2"],
        "7": ["7", "R", "q2"],
        "8": ["8", "R", "q2"],
        "9": ["9", "R", "q2"],
        "_": ["_", "N", rejectState]
    },
    q2: {
        "0": ["0", "R", "q3"],
        "1": ["1", "R", "q3"],
        "2": ["2", "R", "q3"],
        "3": ["3", "R", "q3"],
        "4": ["4", "R", "q3"],
        "5": ["5", "R", "q3"],
        "6": ["6", "R", "q3"],
        "7": ["7", "R", "q3"],
        "8": ["8", "R", "q3"],
        "9": ["9", "R", "q3"],
        "_": ["_", "N", rejectState]
    },
    q3: {
        "0": ["0", "R", "q4"],
        "1": ["1", "R", "q4"],
        "2": ["2", "R", "q4"],
        "3": ["3", "R", "q4"],
        "4": ["4", "R", "q4"],
        "5": ["5", "R", "q4"],
        "6": ["6", "R", "q4"],
        "7": ["7", "R", "q4"],
        "8": ["8", "R", "q4"],
        "9": ["9", "R", "q4"],
        "_": ["_", "N", rejectState]
    },
    q4: {
        "_": ["_", "N", acceptState],
        "0": ["0", "N", rejectState],
        "1": ["1", "N", rejectState],
        "2": ["2", "N", rejectState],
        "3": ["3", "N", rejectState],
        "4": ["4", "N", rejectState],
        "5": ["5", "N", rejectState],
        "6": ["6", "N", rejectState],
        "7": ["7", "N", rejectState],
        "8": ["8", "N", rejectState],
        "9": ["9", "N", rejectState]
    }
};

// ===============================
// VARIABLES GLOBALES (Cinta, Cabezal, Estado)
// ===============================

let tape = [];
let head = 0;
let currentState = startState;
let running = false;

// ===============================
// FUNCIONES DE ACTUALIZACIÓN VISUAL
// ===============================

function renderTape() {
    const tapeDiv = document.getElementById("tape");
    const headDiv = document.getElementById("headPosition");

    tapeDiv.innerHTML = "";
    headDiv.innerHTML = "";

    tape.forEach((symbol, i) => {
        const cell = document.createElement("div");
        cell.textContent = symbol;
        tapeDiv.appendChild(cell);

        const headCell = document.createElement("div");
        headCell.textContent = i === head ? "▲" : "";
        headDiv.appendChild(headCell);
    });

    document.getElementById("currentState").textContent = currentState;
}

// ===============================
// PROCESO DE LA MT
// ===============================

function step() {
    if (currentState === acceptState) {
        document.getElementById("result").textContent = "✔ Cadena ACEPTADA";
        return;
    }
    if (currentState === rejectState) {
        document.getElementById("result").textContent = "✘ Cadena RECHAZADA";
        return;
    }

    const symbol = tape[head] || "_";

    const transition = transitionFunction[currentState][symbol];

    if (!transition) {
        currentState = rejectState;
        renderTape();
        return;
    }

    const [write, move, next] = transition;

    // MT nunca cambia lo que lee → write === symbol
    tape[head] = write;

    if (move === "R") head++;
    if (move === "N") head = head;

    currentState = next;

    renderTape();
}

function run() {
    running = true;
    const interval = setInterval(() => {
        if (!running || currentState === acceptState || currentState === rejectState) {
            clearInterval(interval);
        }
        step();
    }, 600);
}

function reset() {
    tape = [];
    head = 0;
    currentState = startState;
    running = false;
    document.getElementById("result").textContent = "—";
    renderTape();
}

// ===============================
// CARGAR CINTA
// ===============================

document.getElementById("loadBtn").onclick = () => {
    const input = document.getElementById("inputString").value.trim();

    tape = input.split("");  // convierte la cadena en arreglo
    head = 0;
    currentState = startState;
    running = false;
    document.getElementById("result").textContent = "—";
    renderTape();
};

document.getElementById("stepBtn").onclick = step;
document.getElementById("runBtn").onclick = run;
document.getElementById("resetBtn").onclick = reset;

// inicializar vacío
renderTape();

