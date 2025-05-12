let money = 120;
let inventory = [];
let hasGas = false;

function updateMoney() {
    document.getElementById("money").textContent = money;
}

function updateInventory() {
    const invList = document.getElementById("inv-list");
    invList.innerHTML = "";
    inventory.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        invList.appendChild(li);
    });
}

function talkToResident() {
    document.getElementById("scene").innerHTML = `
        <p><strong>Проживалец:</strong> Привет, наш детектив! *смеётся*</p>
        <p><strong>Вы:</strong> ...</p>
        <p><strong>Проживалец:</strong> Ладно, ладно, думаешь, справишься с моей работой?</p>
        <button onclick="answerResident(true)">Да, сэр. А пока я пойду — вы мне дали всего 24 часа.</button>
        <button onclick="answerResident(false)">Может, вы мне заплатите аванс?</button>
    `;
}

function answerResident(accepted) {
    if (accepted) {
        document.getElementById("scene").innerHTML = `
            <p><strong>Проживалец:</strong> Ох, конечно, иди!</p>
            <button onclick="returnToMain()">Вернуться</button>
        `;
    } else {
        document.getElementById("scene").innerHTML = `
            <p><strong>Проживалец:</strong> *хмурится* У меня нет лишних денег. Иди и работай!</p>
            <button onclick="returnToMain()">Вернуться</button>
        `;
    }
}

function enterShop() {
    document.getElementById("scene").innerHTML = `
        <p><strong>Продавец:</strong> Привет! Думаю, у меня есть вещи, которые тебе нужны. :)</p>
        <button onclick="buyItem('Бензин', 20)">Купить бензин (20 монет)</button>
        <button onclick="buyItem('Аптечка', 50)">Купить аптечку (50 монет)</button>
        <button onclick="buyItem('Фонарик', 50)">Купить фонарик (50 монет)</button>
        <button onclick="buyItem('Нож', 100)">Купить нож (100 монет)</button>
        <button onclick="exitShop()">Выйти из магазина</button>
    `;
}

function buyItem(item, cost) {
    if (money >= cost) {
        money -= cost;
        inventory.push(item);
        if (item === "Бензин") hasGas = true;
        updateMoney();
        updateInventory();
        alert(`Вы купили ${item}!`);
    } else {
        alert("Недостаточно денег!");
    }
}

function exitShop() {
    document.getElementById("scene").innerHTML = `
        <p><strong>Продавец:</strong> Прощайте!</p>
        <button onclick="returnToMain()">Вернуться</button>
    `;
}

function goToCar() {
    if (hasGas) {
        document.getElementById("scene").innerHTML = `
            <p>Вы заправили машину и готовы отправиться в особняк!</p>
            <button onclick="alert('Акт 2: Особняк (скоро...)')">Ехать в особняк</button>
            <button onclick="returnToMain()">Вернуться</button>
        `;
    } else {
        document.getElementById("scene").innerHTML = `
            <p>Машина пуста. Нужно купить бензин!</p>
            <button onclick="returnToMain()">Вернуться</button>
        `;
    }
}

function returnToMain() {
    document.getElementById("scene").innerHTML = `
        <p>Вы в городе. Что будете делать?</p>
        <button onclick="talkToResident()">Поговорить с проживальцем</button>
        <button onclick="enterShop()">Зайти в магазин</button>
        <button onclick="goToCar()">Подойти к машине</button>
    `;
}

// Инициализация
updateMoney();
updateInventory();
