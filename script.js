const display = document.getElementById('display');
let currentInput = "";

function updateDisplay() {
    display.value = currentInput || "0";
}

function appendNumber(num) {
    // Impede começar com o ponto "."
    if (currentInput === "" && num === '.') return;

    // Impede múltiplos pontos no mesmo número
    if (num === '.') {
        const lastNumber = currentInput.split(/[\+\-\*\/%]/).pop();
        if (lastNumber.includes('.')) return;
    }
    
    currentInput += num;
    updateDisplay();
}

function appendOperator(op) {
    // REGRA SOLICITADA: No início, apenas o sinal de "-" é permitido
    if (currentInput === "") {
        if (op === '-') {
            currentInput = op;
            updateDisplay();
        }
        // Se for qualquer outro sinal (+, *, /, %, .), a função ignora
        return; 
    }

    // Se já houver conteúdo, tratamos a troca de operadores
    const lastChar = currentInput.slice(-1);
    const operators = ['+', '-', '*', '/', '%'];

    // Se o usuário clicar em um operador logo após o sinal de "-" inicial, 
    // ou após outro operador, ele substitui o anterior
    if (operators.includes(lastChar)) {
        // Impede que o sinal "-" inicial seja substituído por outro operador 
        // para não violar a regra de "apenas o menos pode começar"
        if (currentInput === "-") return; 

        currentInput = currentInput.slice(0, -1) + op;
    } else {
        currentInput += op;
    }
    updateDisplay();
}

function clearAll() {
    currentInput = "";
    updateDisplay();
}

function backspace() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function calculate() {
    try {
        if (!currentInput || currentInput === "-") return;

        let processed = currentInput.replace(/(\d+)%/g, "($1/100)");
        let result = eval(processed);

        currentInput = Number(result.toFixed(8)).toString();
        updateDisplay();
    } catch (e) {
        display.value = "Erro";
        currentInput = "";
    }
}