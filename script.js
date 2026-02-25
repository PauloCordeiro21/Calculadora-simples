const display = document.getElementById('display');
let currentInput = "";

function updateDisplay() {
    display.value = currentInput || "0";
}

function appendNumber(num) {
    // Impede múltiplos pontos no mesmo número
    if (num === '.') {
        const lastNumber = currentInput.split(/[\+\-\*\/%]/).pop();
        if (lastNumber.includes('.')) return;
    }
    currentInput += num;
    updateDisplay();
}

function appendOperator(op) {
    // Permite sinal de + ou - no início do cálculo
    if (currentInput === "") {
        if (op === '+' || op === '-') {
            currentInput = op;
            updateDisplay();
        }
        return;
    }

    const lastChar = currentInput.slice(-1);
    const operators = ['+', '-', '*', '/', '%'];

    // Se o último caractere já for um operador, substitui pelo novo
    if (operators.includes(lastChar)) {
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
        if (!currentInput) return;

        // Converte porcentagem (ex: 50% vira 0.5)
        let processed = currentInput.replace(/(\d+)%/g, "($1/100)");

        // Eval realiza a operação matemática
        let result = eval(processed);

        // Formata o resultado para evitar números gigantes
        currentInput = Number(result.toFixed(8)).toString();
        updateDisplay();
    } catch (e) {
        display.value = "Erro";
        currentInput = "";
    }
}