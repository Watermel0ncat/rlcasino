# /*

SAVE SYSTEM
Million Dollar Mansion Casino
=============================

*/

const SAVE_KEY = "mdmc-save-v1";

# /*

# SAVE GAME

*/

function saveGame() {

```
const saveData = {

    version: 1,

    money: gameState.money,

    day: gameState.day,

    prestige: gameState.prestige,

    inventory: gameState.inventory,

    stats: gameState.stats
};

localStorage.setItem(
    SAVE_KEY,
    JSON.stringify(saveData)
);

log("Game saved.");
```

}

# /*

# LOAD GAME

*/

function loadGame() {

```
const data =
    localStorage.getItem(SAVE_KEY);

if (!data) {

    log("No save found.");
    return;
}

try {

    const save =
        JSON.parse(data);

    gameState.money =
        save.money ?? 50;

    gameState.day =
        save.day ?? 1;

    gameState.prestige =
        save.prestige ?? 0;

    gameState.inventory =
        save.inventory ?? [];

    gameState.stats =
        save.stats ?? {
            wins: 0,
            losses: 0,
            biggestWin: 0
        };

    updateUI();

    if (window.renderInventory) {

        renderInventory();
    }

    log("Game loaded.");

} catch (err) {

    console.error(err);

    log("Save file corrupted.");
}
```

}

# /*

# AUTO SAVE

*/

function autoSave() {

```
saveGame();
```

}

# /*

# EXPORT SAVE

*/

function exportSave() {

```
const saveData = {

    version: 1,

    money: gameState.money,

    day: gameState.day,

    prestige: gameState.prestige,

    inventory: gameState.inventory,

    stats: gameState.stats
};

const encoded =
    btoa(
        JSON.stringify(saveData)
    );

navigator.clipboard.writeText(encoded);

log("Save exported to clipboard.");
```

}

# /*

# IMPORT SAVE

*/

function importSave() {

```
const input =
    prompt("Paste save string:");

if (!input) return;

try {

    const decoded =
        JSON.parse(
            atob(input)
        );

    gameState.money =
        decoded.money ?? 50;

    gameState.day =
        decoded.day ?? 1;

    gameState.prestige =
        decoded.prestige ?? 0;

    gameState.inventory =
        decoded.inventory ?? [];

    gameState.stats =
        decoded.stats ?? gameState.stats;

    updateUI();

    if (window.renderInventory) {

        renderInventory();
    }

    saveGame();

    log("Save imported.");

} catch (err) {

    console.error(err);

    log("Invalid save string.");
}
```

}

# /*

# HOOK BUTTONS

*/

document
.getElementById("save-btn")
.addEventListener("click", saveGame);

document
.getElementById("load-btn")
.addEventListener("click", loadGame);

document
.getElementById("export-save-btn")
.addEventListener("click", exportSave);

# /*

# NEXT DAY HOOK (AUTO SAVE)

*/

const originalNextDay =
window.nextDay;

window.nextDay = function () {

```
if (originalNextDay) {

    originalNextDay();
}

autoSave();
```

};

# /*

# BOOT

*/

log("Save system initialized.");

# /*

# GLOBAL ACCESS (DEBUG)

*/

window.saveGame = saveGame;
window.loadGame = loadGame;
window.exportSave = exportSave;
window.importSave = importSave;
