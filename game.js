// Состояние игры
let money = 120;
let inventory = [];
let hasGas = false;
let isPrinting = false;

// Элементы DOM
const gameText = document.getElementById("game-text");
const actionsDiv = document.getElementById("actions");
const invList = document.getElementById("inv-list");
const moneySpan = document.getElementById("money");

// Печать текста с эффектом набора
function printText(text, callback) {
    if (isPrinting) return;
    isPrinting = true;
    gameText.textContent = "";
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            gameText.textContent += text[i];
            i++;
        } else {
            clearInterval(timer);
            isPrinting = false;
            if (callback) callback();
        }
    }, 20);
}

// Обновление инвентаря
function updateInventory() {
    invList.innerHTML = "";
    inventory.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        invList.appendChild(li);
    });
    moneySpan.textContent = money;
}

// Движение к объекту
function moveTo(target) {
    disableButtons();
    
    switch (target) {
        case "resident":
            printText("Вы подошли к проживальцу...", () => {
                residentDialogue();
                enableButtons();
            });
            break;
            
        case "shop":
            printText("Вы зашли в магазин. Продавец улыбается.", () => {
                openShop();
                enableButtons();
            });
            break;
            
        case "car":
            printText("Вы подошли к своей машине.", () => {
                if (hasGas) {
                    printText("\nБак полон. Можно ехать в особняк!", () => {
                        setTimeout(() => alert("Акт 2: Особняк (скоро...)"), 500);
                    });
                } else {
                    printText("\nНужно купить бензин!", enableButtons);
                }
            });
            break;
    }
}

// Диалог с проживальцем
function residentDialogue() {
    const dialogue = [
        "Проживалец: Привет, наш детектив! *смеётся*",
        "Вы: ...",
        "Проживалец: Ладно, ладно. Думаешь, справишься с работой?",
        "",
        "1. Да, сэр. А пока я пойду — вы дали мне всего 24 часа.",
        "2. Может, заплатите аванс?",
    ];
    
    gameText.innerHTML = dialogue.join("<br>");
    
    actionsDiv.innerHTML = `
        <button onclick="answerResident(1)">Ответить (вариант 1)</button>
        <button onclick="answerResident(2)">Ответить (вариант 2)</button>
        <button onclick="returnToSquare()">Уйти</button>
    `;
}

function answerResident(choice) {
    if (choice === 1) {
        printText("Проживалец: Ох, конечно, иди!", returnToSquare);
    } else {
        printText("Проживалец: *хмурится* У меня нет лишних денег. Работай!", returnToSquare);
    }
}

// Магазин
function openShop() {
    gameText.innerHTML = `
        Продавец: Привет! Что желаешь?
        <br><br>
        1. Бензин — 20 монет<br>
        2. Аптечка — 50 монет<br>
        3. Фонарик — 50 монет<br>
        4. Нож — 100 монет<br>
    `;
    
    actionsDiv.innerHTML = `
        <button onclick="buyItem('Бензин', 20)">Купить бензин</button>
        <button onclick="buyItem('Аптечка', 50)">Купить аптечку</button>
        <button onclick="buyItem('Фонарик', 50)">Купить фонарик</button>
        <button onclick="buyItem('Нож', 100)">Купить нож</button>
        <button onclick="returnToSquare()">Выйти</button>
    `;
}

function buyItem(item, cost) {
    if (money >= cost) {
        money -= cost;
        inventory.push(item);
        if (item === "Бензин") hasGas = true;
        updateInventory();
        printText(`Вы купили ${item}!`, openShop);
    } else {
        printText("Недостаточно денег!", openShop);
    }
}

// Возврат на площадь
function returnToSquare() {
    printText("Вы на центральной площади.", () => {
        actionsDiv.innerHTML = `
            <button onclick="moveTo('resident')">Подойти к проживальцу</button>
            <button onclick="moveTo('shop')">Зайти в магазин</button>
            <button onclick="moveTo('car')">Подойти к машине</button>
        `;
    });
}

// Включение/выключение кнопок
function disableButtons() {
    const buttons = actionsDiv.querySelectorAll("button");
    buttons.forEach(btn => btn.disabled = true);
}

function enableButtons() {
    const buttons = actionsDiv.querySelectorAll("button");
    buttons.forEach(btn => btn.disabled = false);
}

// Запуск игры
printText("Частный детектив. Вам дали 24 часа, чтобы раскрыть исчезновение хозяина особняка. Сначала нужно подготовиться.", () => {
    updateInventory();
});




/* Акт 2: Лес */
#act2-forest {
    margin-top: 20px;
}

#forest-visual {
    font-size: 20px;
    letter-spacing: 5px;
    margin: 10px 0;
}

#forest-events {
    min-height: 100px;
    border: 1px solid #444;
    padding: 10px;
    border-radius: 5px;
    margin: 10px 0;
}
