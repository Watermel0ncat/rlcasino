# /*

Million Dollar Mansion Casino
Core Game Engine
================

*/

const gameState = {

```
money: 50,

day: 1,

prestige: 0,

inventory: [],

stats: {

    wins: 0,
    losses: 0,
    biggestWin: 0
}
```

};

# /*

# DOM REFERENCES

*/

const moneyElement =
document.getElementById("money");

const dayElement =
document.getElementById("day");

const prestigeElement =
document.getElementById("prestige");

const eventLog =
document.getElementById("event-log");

# /*

# UI UPDATE

*/

function updateUI() {

```
moneyElement.textContent =
    "$" + gameState.money.toLocaleString();

dayElement.textContent =
    gameState.day;

prestigeElement.textContent =
    gameState.prestige;
```

}

# /*

# LOGGING

*/

function log(message) {

```
const timestamp =
    new Date().toLocaleTimeString();

eventLog.innerHTML +=
    `[${timestamp}] ${message}\n`;

eventLog.scrollTop =
    eventLog.scrollHeight;
```

}

# /*

# NAVIGATION

*/

function setupNavigation() {

```
const buttons =
    document.querySelectorAll(".nav-btn");

const panels =
    document.querySelectorAll(".panel");

buttons.forEach(button => {

    button.addEventListener("click", () => {

        buttons.forEach(btn =>
            btn.classList.remove("active")
        );

        panels.forEach(panel =>
            panel.classList.remove("active")
        );

        button.classList.add("active");

        const panelID =
            button.dataset.panel;

        document
            .getElementById(panelID)
            .classList.add("active");
    });
});
```

}

# /*

# SAVE SYSTEM

*/

function saveGame() {

```
localStorage.setItem(
    "mdmc-save",
    JSON.stringify(gameState)
);

log("Game Saved.");
```

}

function loadGame() {

```
const data =
    localStorage.getItem("mdmc-save");

if (!data) {

    log("No save found.");
    return;
}

Object.assign(
    gameState,
    JSON.parse(data)
);

updateUI();

log("Game Loaded.");
```

}

# /*

# EXPORT SAVE

*/

function exportSave() {

```
const saveString =
    JSON.stringify(gameState);

navigator.clipboard.writeText(
    saveString
);

log("Save copied to clipboard.");
```

}

# /*

# NEXT DAY

*/

function nextDay() {

```
gameState.day++;

updateUI();

log(
    `A new day begins. Day ${gameState.day}.`
);
```

}

# /*

# DEVELOPER MONEY TEST

*/

function addMoney(amount) {

```
gameState.money += amount;

updateUI();
```

}

# /*

# BUTTONS

*/

document
.getElementById("save-btn")
.addEventListener("click", saveGame);

document
.getElementById("load-btn")
.addEventListener("click", loadGame);

document
.getElementById("next-day-btn")
.addEventListener("click", nextDay);

document
.getElementById("export-save-btn")
.addEventListener("click", exportSave);

# /*

# PLACEHOLDER GAME BUTTONS

*/

document
.getElementById("blackjack-btn")
.addEventListener("click", () => {

```
log("Blackjack coming soon.");
```

});

document
.getElementById("poker-btn")
.addEventListener("click", () => {

```
log("Poker locked.");
```

});

document
.getElementById("roulette-btn")
.addEventListener("click", () => {

```
log("Roulette locked.");
```

});

document
.getElementById("craps-btn")
.addEventListener("click", () => {

```
log("Craps locked.");
```

});

# /*

# AUTO SAVE

*/

setInterval(() => {

```
saveGame();
```

}, 60000);

# /*

# BOOT

*/

function init() {

```
setupNavigation();

updateUI();

log("Welcome to Million Dollar Mansion Casino.");

log("Your goal is to buy the Mansion.");

log("Starting Cash: $50");
```

}

init();

# /*

# DEBUG ACCESS

*/

window.gameState = gameState;
window.addMoney = addMoney;
window.saveGame = saveGame;
window.loadGame = loadGame;
