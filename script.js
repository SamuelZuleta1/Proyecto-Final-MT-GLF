// Clase para representar la Máquina de Turing
class TuringMachine {
    constructor() {
        this.tape = [];
        this.headPosition = 0;
        this.currentState = 'q0';
        this.haltState = 'qf';
        this.blankSymbol = '_';
        this.transitionTable = {};
        this.isRunning = false;
        this.intervalId = null;
    }

    // Inicializar la cinta con una cadena de entrada
    initializeTape(input) {
        this.tape = input.split('');
        if (this.tape.length === 0) {
            this.tape = [this.blankSymbol];
        }
        this.headPosition = 0;
        this.currentState = 'q0';
        this.renderTape();
        this.updateMachineState();
    }

    // Agregar una regla de transición
    addTransition(currentState, readSymbol, newState, writeSymbol, direction) {
        const key = `${currentState},${readSymbol}`;
        this.transitionTable[key] = {
            newState: newState,
            writeSymbol: writeSymbol,
            direction: direction
        };
    }

    // Ejecutar un paso de la máquina
    step() {
        if (this.currentState === this.haltState) {
            this.stop();
            return false;
        }

        // Extender la cinta si es necesario
        if (this.headPosition < 0) {
            this.tape.unshift(this.blankSymbol);
            this.headPosition = 0;
        }
        if (this.headPosition >= this.tape.length) {
            this.tape.push(this.blankSymbol);
        }

        const currentSymbol = this.tape[this.headPosition];
        const key = `${this.currentState},${currentSymbol}`;
        const transition = this.transitionTable[key];

        if (!transition) {
            console.log('No hay transición definida para:', key);
            this.stop();
            return false;
        }

        // Aplicar la transición
        this.tape[this.headPosition] = transition.writeSymbol;
        this.currentState = transition.newState;

        // Mover el cabezal
        if (transition.direction === 'R') {
            this.headPosition++;
        } else if (transition.direction === 'L') {
            this.headPosition--;
        }

        this.renderTape();
        this.updateMachineState();
        this.highlightCurrentRule(key);

        return true;
    }

    // Renderizar la cinta en el DOM
    renderTape() {
        const tapeElement = document.getElementById('tape');
        tapeElement.innerHTML = '';

        // Asegurar que hay celdas suficientes para mostrar
        const startIndex = Math.max(0, this.headPosition - 5);
        const endIndex = Math.min(this.tape.length, this.headPosition + 6);

        for (let i = startIndex; i < endIndex; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.textContent = this.tape[i] || this.blankSymbol;
            
            if (i === this.headPosition) {
                cell.classList.add('active');
            }
            
            tapeElement.appendChild(cell);
        }
    }

    // Actualizar el estado de la máquina en el DOM
    updateMachineState() {
        document.getElementById('current-state').textContent = this.currentState;
        document.getElementById('head-position').textContent = this.headPosition;
        
        if (this.isRunning) {
            document.getElementById('execution-status').textContent = 'Ejecutando';
        } else if (this.currentState === this.haltState) {
            document.getElementById('execution-status').textContent = 'Finalizada';
        } else {
            document.getElementById('execution-status').textContent = 'Detenida';
        }
    }

    // Resaltar la regla actual en la tabla
    highlightCurrentRule(key) {
        const rows = document.querySelectorAll('#rules-body tr');
        rows.forEach(row => row.classList.remove('active-rule'));
        
        rows.forEach(row => {
            const cells = row.cells;
            const rowKey = `${cells[0].textContent},${cells[1].textContent}`;
            if (rowKey === key) {
                row.classList.add('active-rule');
            }
        });
    }

    // Iniciar ejecución automática
    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.updateMachineState();
        
        this.intervalId = setInterval(() => {
            const continues = this.step();
            if (!continues) {
                this.stop();
            }
        }, 500);
    }

    // Detener ejecución
    stop() {
        this.isRunning = false;
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.updateMachineState();
    }

    // Reiniciar la máquina
    reset() {
        this.stop();
        const input = document.getElementById('tape-input').value || '';
        this.initializeTape(input);
    }
}

// Crear instancia de la máquina
const tm = new TuringMachine();

// Configurar reglas de ejemplo (reconocer palíndromos binarios simples)
function loadExampleRules() {
    // Ejemplo simple: invertir bits (0 -> 1, 1 -> 0)
    tm.addTransition('q0', '0', 'q0', '1', 'R');
    tm.addTransition('q0', '1', 'q0', '0', 'R');
    tm.addTransition('q0', '_', 'qf', '_', 'S');

    // Renderizar la tabla de reglas
    const rulesBody = document.getElementById('rules-body');
    rulesBody.innerHTML = '';

    const rules = [
        ['q0', '0', 'q0', '1', 'R'],
        ['q0', '1', 'q0', '0', 'R'],
        ['q0', '_', 'qf', '_', 'S']
    ];

    rules.forEach(rule => {
        const row = document.createElement('tr');
        rule.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell;
            row.appendChild(td);
        });
        rulesBody.appendChild(row);
    });
}

// Event Listeners
document.getElementById('start-btn').addEventListener('click', () => {
    tm.start();
});

document.getElementById('step-btn').addEventListener('click', () => {
    tm.step();
});

document.getElementById('reset-btn').addEventListener('click', () => {
    tm.reset();
});

document.getElementById('stop-btn').addEventListener('click', () => {
    tm.stop();
});

document.getElementById('tape-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        tm.reset();
    }
});

// Inicializar la máquina al cargar
window.addEventListener('load', () => {
    loadExampleRules();
    tm.initializeTape('0011');
});
