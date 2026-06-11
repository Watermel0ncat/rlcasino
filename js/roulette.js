# /*

ROULETTE
Million Dollar Mansion Casino
=============================

*/

const rouletteButton =
document.getElementById("roulette-btn");

const casinoContent =
document.getElementById("casino-content");

# /*

# STATE

*/

let rouletteBet = 0;
let rouletteChoice = null;
let rouletteActive = false;

# /*

# WHEEL DATA

*/

const rouletteNumbers = Array.from(
{ length: 37 },
(_, i) => i
);

const redNumbers = new Set([
1,3,5,7,9,12,14,16,18,
19,21,23,25,27,30,32,34,36
]);

# /*

# UI

*/

function renderRoulette() {

```
casinoContent.innerHTML = `

    <h3>Roulette</h3>

    <p>Bet Type: ${rouletteChoice ?? "None"}</p>
    <p>Bet Amount: $${rouletteBet}</p>

    <hr>

    <div class="bet-controls">

        <input id="bet-input" placeholder="Bet amount" />

        <button id="bet-red">Red</button>
        <button id="bet-black">Black</button>
        <button id="bet-even">Even</button>
        <button id="bet-odd">Odd</button>
        <button id="bet-number">Number</button>

    </div>

    <button id="spin-btn">
        🎡 Spin Wheel
    </button>

    <div id="roulette-result"></div>
`;

document.getElementById("bet-red")
    .onclick = () => setBet("red");

document.getElementById("bet-black")
    .onclick = () => setBet("black");

document.getElementById("bet-even")
    .onclick = () => setBet("even");

document.getElementById("bet-odd")
    .onclick = () => setBet("odd");

document.getElementById("bet-number")
    .onclick = () => setBet("number");

document.getElementById("spin-btn")
    .onclick = spinRoulette;
```

}

# /*

# SET BET

*/

function setBet(type) {

```
const input =
    document.getElementById("bet-input");

const amount =
    Number(input.value);

if (
    !amount ||
    amount <= 0
) {

    log("Invalid bet amount.");
    return;
}

if (
    amount > gameState.money
) {

    log("Not enough money.");
    return;
}

rouletteBet = amount;
rouletteChoice = type;

renderRoulette();
```

}

# /*

# SPIN

*/

function spinRoulette() {

```
if (!rouletteChoice || !rouletteBet) {

    log("Place a bet first.");
    return;
}

const result =
    Math.floor(
        Math.random() * 37
    );

const isRed =
    redNumbers.has(result);

const isBlack =
    result !== 0 && !isRed;

let win = false;
let payout = 0;

switch (rouletteChoice) {

    case "red":

        win = isRed;
        payout = rouletteBet * 2;
        break;

    case "black":

        win = isBlack;
        payout = rouletteBet * 2;
        break;

    case "even":

        win = result !== 0 && result % 2 === 0;
        payout = rouletteBet * 2;
        break;

    case "odd":

        win = result % 2 === 1;
        payout = rouletteBet * 2;
        break;

    case "number":

        const guessed =
            prompt("Pick a number (0–36)");

        win =
            Number(guessed) === result;

        payout = rouletteBet * 36;
        break;
}

const resultDiv =
    document.getElementById("roulette-result");

resultDiv.innerHTML = `

    <h4>Result: ${result}</h4>

    <p>${win ? "WIN!" : "LOSE"}</p>

`;

if (win) {

    gameState.money += applyWin(payout);

    gameState.stats.wins++;

    log(
        `Roulette WIN +$${payout}`
    );

} else {

    gameState.money -= rouletteBet;

    gameState.stats.losses++;

    log(
        `Roulette loss -$${rouletteBet}`
    );
}

rouletteBet = 0;
rouletteChoice = null;

updateUI();
saveGame?.();

renderRoulette();
```

}

# /*

# HOOK BUTTON

*/

rouletteButton.addEventListener(
"click",
renderRoulette
);

# /*

# INIT

*/

log("Roulette loaded.");
