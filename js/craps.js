# /*

CRAPS
Million Dollar Mansion Casino
=============================

*/

const crapsButton =
document.getElementById("craps-btn");

const casinoContent =
document.getElementById("casino-content");

# /*

# STATE

*/

let crapsBet = 0;
let crapsPoint = null;
let crapsPhase = "idle"; // idle | comeout | point

# /*

# ROLL DICE

*/

function rollDie() {

```
return Math.floor(Math.random() * 6) + 1;
```

}

function rollDice() {

```
return rollDie() + rollDie();
```

}

# /*

# UI

*/

function renderCraps() {

```
casinoContent.innerHTML = `

    <h3>Craps</h3>

    <p>Phase: ${crapsPhase}</p>
    <p>Point: ${crapsPoint ?? "-"}</p>
    <p>Current Bet: $${crapsBet}</p>

    <hr>

    <div class="bet-controls">

        <input id="craps-bet-input" placeholder="Bet amount" />

        <button id="place-bet-btn">
            Place Bet
        </button>

    </div>

    <button id="roll-btn">
        🎲 Roll Dice
    </button>

    <div id="craps-result"></div>
`;

document.getElementById("place-bet-btn")
    .onclick = placeBet;

document.getElementById("roll-btn")
    .onclick = playCraps;
```

}

# /*

# PLACE BET

*/

function placeBet() {

```
const input =
    document.getElementById(
        "craps-bet-input"
    );

const amount =
    Number(input.value);

if (
    !amount ||
    amount <= 0
) {

    log("Invalid bet.");
    return;
}

if (
    amount > gameState.money
) {

    log("Not enough money.");
    return;
}

crapsBet = amount;
crapsPhase = "comeout";

log(`Craps bet placed: $${amount}`);

renderCraps();
```

}

# /*

# GAME LOGIC

*/

function playCraps() {

```
if (!crapsBet) {

    log("Place a bet first.");
    return;
}

const result =
    rollDice();

const resultDiv =
    document.getElementById(
        "craps-result"
    );

/*
COME OUT ROLL
*/

if (crapsPhase === "comeout") {

    if (
        result === 7 ||
        result === 11
    ) {

        winCraps(resultDiv, result);
        return;
    }

    if (
        result === 2 ||
        result === 3 ||
        result === 12
    ) {

        loseCraps(resultDiv, result);
        return;
    }

    crapsPoint = result;
    crapsPhase = "point";

    resultDiv.innerHTML = `
        <p>Point is set to ${result}</p>
    `;

    renderCraps();
    return;
}

/*
POINT PHASE
*/

if (crapsPhase === "point") {

    if (result === crapsPoint) {

        winCraps(resultDiv, result);
        return;
    }

    if (result === 7) {

        loseCraps(resultDiv, result);
        return;
    }

    resultDiv.innerHTML = `
        <p>Rolled ${result}. Keep going.</p>
    `;

    return;
}
```

}

# /*

# WIN

*/

function winCraps(resultDiv, roll) {

```
const payout =
    crapsBet * 2;

gameState.money += applyWin(payout);

gameState.stats.wins++;

log(
    `Craps WIN on ${roll}! +$${payout}`
);

resultDiv.innerHTML = `
    <h4>WIN: ${roll}</h4>
    <p>You earned $${payout}</p>
`;

resetCraps();
updateUI();
saveGame?.();
```

}

# /*

# LOSS

*/

function loseCraps(resultDiv, roll) {

```
gameState.money -= crapsBet;

gameState.stats.losses++;

log(
    `Craps LOSS on ${roll} -$${crapsBet}`
);

resultDiv.innerHTML = `
    <h4>LOSS: ${roll}</h4>
    <p>You lost $${crapsBet}</p>
`;

resetCraps();
updateUI();
saveGame?.();
```

}

# /*

# RESET

*/

function resetCraps() {

```
crapsBet = 0;
crapsPoint = null;
crapsPhase = "idle";
```

}

# /*

# HOOK BUTTON

*/

crapsButton.addEventListener(
"click",
renderCraps
);

# /*

# INIT

*/

log("Craps loaded.");
