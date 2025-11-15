
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
// Acepta exactamente 4 dígitos según el diagrama de la MT
const delta = {
    q0: { 
        "0": "q1", "1": "q1", "2": "q1", "3": "q1", "4": "q1", 
        "5": "q1", "6": "q1", "7": "q1", "8": "q1", "9": "q1" 
    },
    q1: { 
        "0": "q2", "1": "q2", "2": "q2", "3": "q2", "4": "q2", 
        "5": "q2", "6": "q2", "7": "q2", "8": "q2", "9": "q2" 
    },
    q2: { 
        "0": "q3", "1": "q3", "2": "q3", "3": "q3", "4": "q3", 
        "5": "q3", "6": "q3", "7": "q3", "8": "q3", "9": "q3" 
    },
    q3: { 
        "0": "q4", "1": "q4", "2": "q4", "3": "q4", "4": "q4", 
        "5": "q4", "6": "q4", "7": "q4", "8": "q4", "9": "q4" 
    },
    q4: { 
        // Si lee un dígito después de 4 → va a qx (rechaza)
        "0": "qx", "1": "qx", "2": "qx", "3": "qx", "4": "qx", 
        "5": "qx", "6": "qx", "7": "qx", "8": "qx", "9": "qx",
        // Si lee blanco → bucle en q4 (acepta y para)
        "_": "q4"
    },
    qx: {} // Estado trampa (rechazo y paro)
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
    
    // Actualizar estado con clases dinámicas
    const stateElement = document.getElementById("currentState");
    stateElement.textContent = currentState;
    stateElement.className = "state-info " + currentState;
}

// ---------------------------
// CARGAR LA CINTA
// ---------------------------
function loadTape() {
    const input = document.getElementById("inputString").value;
    
    if (input.length === 0) {
        alert("Por favor ingresa una cadena");
        return;
    }
    
    // Validar que la entrada solo contenga dígitos (0-9)
    // El símbolo _ es exclusivo del espacio en blanco de la cinta
    if (!/^[0-9]+$/.test(input)) {
        alert("Error: La cadena solo puede contener dígitos (0-9). El símbolo '_' es exclusivo del espacio en blanco de la cinta.");
        return;
    }
    
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
    
    // Si llegó a blanco
    if (symbol === "_") {
        // Solo acepta si está en el estado de aceptación q4
        if (currentState === ACCEPT) {
            finished = true;
            updateResult();
        } else {
            // Si llegó al blanco pero no está en q4, rechaza
            currentState = REJECT;
            finished = true;
            updateResult();
        }
        return;
    }
    
    const rules = delta[currentState];
    
    // Si no hay transición definida para este símbolo, rechazar
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
    
    // Verificar si ya terminó (llegó a estado final)
    if (currentState === ACCEPT) {
        // Continuar hasta el blanco para confirmar que no hay más símbolos
        if (tape[head] === "_") {
            finished = true;
            updateResult();
        }
    } else if (currentState === REJECT) {
        finished = true;
        updateResult();
    }
}

// ---------------------------
// ACTUALIZAR RESULTADO
// ---------------------------
function updateResult() {
    const out = document.getElementById("result");
    if (currentState === ACCEPT) {
        out.textContent = "✔ CADENA ACEPTADA";
        out.style.color = "green";
    } else {
        out.textContent = "✘ CADENA RECHAZADA";
        out.style.color = "red";
    }
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
// REINICIAR (vuelve a aplicar proceso sin borrar la cadena)
// ---------------------------
function reiniciar() {
    tape = [];
    head = 0;
    currentState = "q0";
    finished = false;
    
    const input = document.getElementById("inputString").value;
    
    if (input.length === 0) {
        alert("Por favor ingresa una cadena primero");
        return;
    }
    
    tape = input.split("");
    tape.push("_"); // blanco final
    
    document.getElementById("result").textContent = "—";
    document.getElementById("result").style.color = "black";
    renderTape();
}

// ---------------------------
// LIMPIAR (borra todo incluyendo la cadena)
// ---------------------------
function reset() {
    tape = [];
    head = 0;
    currentState = "q0";
    finished = false;
    
    document.getElementById("tape").innerHTML = "";
    document.getElementById("result").textContent = "—";
    document.getElementById("result").style.color = "black";
    const stateElement = document.getElementById("currentState");
    stateElement.textContent = "q0";
    stateElement.className = "state-info q0";
    document.getElementById("inputString").value = "";
}

// ---------------------------
// EVENTOS
// ---------------------------
document.getElementById("loadButton").onclick = loadTape;
document.getElementById("stepButton").onclick = step;
document.getElementById("runButton").onclick = run;
document.getElementById("resetButton").onclick = reiniciar;
document.getElementById("clearButton").onclick = reset;

// ---------------------------
// MENÚ HAMBURGUESA
// ---------------------------
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navLinks.classList.toggle("active");
});

// Cerrar menú al hacer clic en un enlace
navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        navLinks.classList.remove("active");
    });
});

// Cerrar menú al hacer clic fuera de él
document.addEventListener("click", (e) => {
    if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        menuToggle.classList.remove("active");
        navLinks.classList.remove("active");
    }
});
