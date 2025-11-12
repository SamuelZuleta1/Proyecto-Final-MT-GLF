# Construcción de un Simulador de MT en la Web

# Universidad Tecnólogica de Pereira / Falcultad de Ingenierías
# Ingenieria de Sistemas y Computación 
# Gramáticas y Lenguajes Formales

# Integrantes del Grupo:

- Santiago Giraldo Castrillón.
- Nicolas Estiven Valencia Asencio.
- Emilio Muñoz Arenas.
- Samuel Zuleta Castañeda.
- Victor Manuel López Henao.
- Ivanna Ramírez Morales.
- 
# Presentado a:
Felipe Gutierrez Isaza 

# Fecha y lugar 
28/11/2025 
Pereira, Risaralda

# Descripción del lenguaje 

Expresión regular : /d{4}  .Donde \d representa cualquier dígito decimal del conjunto Σ={0,1,2,3,4,5,6,7,8,9}

El lenguaje reconoce un PIN de 4 dígitos (exactamente)

¿Por qué se escogió esta expresión regular? 
Este regex fue elegido porque es fácil de manejar, no tiene un AFD tan extenso y su 4-tupla es simple.

# Construcción del AFD
El autómata finito determinista (AFD) que reconoce el lenguaje \d{4} se compone de la siguiente 4-tupla:

Q = {q₀, q₁, q₂, q₃, q₄, qx}

Σ = {0,1,2,3,4,5,6,7,8,9}

Estado inicial: q₀

Estado de aceptación: {q₄}

Tabla de transiciones
<img width="490" height="285" alt="image" src="https://github.com/user-attachments/assets/351a68c0-9ed0-4a6a-be1a-31df21373a76" />

Diagrama de transiciones
<img width="543" height="390" alt="image" src="https://github.com/user-attachments/assets/ff6dbe73-0d81-4281-95ca-d1f72f5e15f0" />

# Máquina de Turing 
Para emular el comportamiento del AFD anterior, se construye una Máquina de Turing (MT) que cumple las siguientes condiciones:
- No se mueve a la izquierda (sólo derecha o permanecer).
- No sobrescribe símbolos distintos a los leídos (solo reescribe el mismo carácter).
- Utiliza el símbolo blanco _ para marcar el fin de la cadena y determinar si la longitud es correcta.

Definición Formal:
Q={q0​,q1​,q2​,q3​,q4​,qx​}

q_0 = estado inicial

q_1,q_2,q_3,q_4 = conteo de dígitos leídos (q4 = 4 dígitos leídos y estado aceptador de paro)

q_x = estado de rechazo (parada)

Nota: q_4 y q_x son estados de paro (la máquina se detiene cuando entra en ellos por la regla que sigue).

Σ={0,1,2,3,4,5,6,7,8,9}

Γ={0,1,2,3,4,5,6,7,8,9,_}

q0​= estado inicial.

Estado de aceptación:q4

Estado de rechazo: qx​.

Tabla de transiciones 
<img width="781" height="639" alt="image" src="https://github.com/user-attachments/assets/f2c8ef66-6b38-4c93-b35d-02f5103bab33" />

Observaciones:
- En q4 si se encuentra un quinto dígito la MT entra en q_x y para inmediatamente (move = N), porque no queremos consumir más ni mover hacia la derecha antes de declarar el rechazo.
- En q0..q3, encontrar _ indica que la cadena terminó demasiado pronto → transición a q_x y paro.
- Cualquier otro (no dígito) provoca rechazo inmediato (q_x) y paro.

Intuición del comportamiento: 
- La MT recorre la cinta de izquierda a derecha (solo R) mientras cuenta dígitos.
- Si la cinta termina (encuentra _) antes de leer 4 dígitos → entra en q_x (rechazo) y para.
- Si alcanza 4 dígitos y luego encuentra _ → se queda en q_4 y acepta (paro).
- Si tras 4 dígitos aparece un quinto dígito → la MT entra en q_x y rechaza (paro).
- Si aparece cualquier símbolo no dígito (otro carácter) en cualquier estado → la MT entra en q_x y rechaza (paro).

Todas las transiciones que producen aceptación o rechazo hacen move = N (no mover) porque la máquina para inmediatamente.

Diagrama de transición
<img width="570" height="586" alt="image" src="https://github.com/user-attachments/assets/9ff13d82-710a-4857-96ac-c022c39a54d3" />

# URL del proyecto final de la MT:
https://samuelzuleta1.github.io/Proyecto-Final-MT-GLF/
