# /*

POKER (SIMPLIFIED TEXAS HOLD'EM)
Million Dollar Mansion Casino
=============================

*/

const pokerButton =
document.getElementById("poker-btn");

const casinoContent =
document.getElementById("casino-content");

# /*

# STATE

*/

let pokerBet = 0;

let playerHand = [];
let dealerHand = [];
let communityCards = [];

let pokerActive = false;

# /*

# DECK

*/

let deck = [];

function createDeck() {

```
const suits = ["♠", "♥", "♦", "♣"];

const values = [
    "2","3","4","5","6","7","8","9","10",
    "J","Q","K","A"
];

deck = [];

suits.forEach(suit => {

    values.forEach(value => {

        deck.push({ suit, value });

    });

});

shuffle(deck);
```

}

function shuffle(array) {

```
for (let i = array.length - 1; i > 0; i--) {

    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
}
```

}

function draw() {

```
return deck.pop();
```

}

# /*

# START GAME

*/

function startPoker() {

```
if (pokerActive) return;

const bet = Number(prompt("Enter poker bet"));

if (!bet || bet <= 0) return;

if (bet > gameState.money) {

    log("Not enough money.");
    return;
}

pokerBet = bet;

createDeck();

playerHand = [draw(), draw()];
dealerHand = [draw(), draw()];

communityCards = [
    draw(), draw(), draw(),
    draw(), draw()
];

pokerActive = true;

renderPoker();
```

}

# /*

# HAND RANKING (SIMPLIFIED)

*/

function cardValue(v) {

```
if (v === "A") return 14;
if (v === "K") return 13;
if (v === "Q") return 12;
if (v === "J") return 11;

return Number(v);
```

}

function evaluateHand(cards) {

```
const counts = {};
let values = [];

cards.forEach(c => {

    const val = cardValue(c.value);

    values.push(val);

    counts[val] = (counts[val] || 0) + 1;
});

values.sort((a,b) => a-b);

const isPair = Object.values(counts).includes(2);
const isTrips = Object.values(counts).includes(3);
const isQuads = Object.values(counts).includes(4);

const isFlush =
    new Set(cards.map(c => c.suit)).size === 1;

const isStraight =
    values.every(
        (v,i) =>
            i === 0 ||
            v === values[i-1] + 1
    );

if (isQuads) return 7;
if (isStraight && isFlush) return 8;
if (isFlush) return 5;
if (isStraight) return 4;
if (isTrips) return 3;
if (isPair) return 2;

return Math.max(...values) / 100;
```

}

# /*

# RENDER

*/

function renderPoker() {

```
casinoContent.innerHTML = `

    <h3>Poker (vs Dealer)</h3>

    <p>Bet: $${pokerBet}</p>

    <hr>

    <h4>Community Cards</h4>

    <div class="card-area">

        ${communityCards.map(c => `
            <div class="playing-card">
                ${c.value}${c.suit}
            </div>
        `).join("")}

    </div>

    <h4>Your Hand</h4>

    <div class="card-area">

        ${playerHand.map(c => `
            <div class="playing-card">
                ${c.value}${c.suit}
            </div>
        `).join("")}

    </div>

    <h4>Dealer Hand</h4>

    <div class="card-area">

        ${dealerHand.map(c => `
            <div class="playing-card">
                ${c.value}${c.suit}
            </div>
        `).join("")}

    </div>

    <button id="poker-resolve">
        Reveal Winner
    </button>
`;

document.getElementById("poker-resolve")
    .onclick = resolvePoker;
```

}

# /*

# RESOLVE GAME

*/

function resolvePoker() {

```
const playerScore =
    evaluateHand([
        ...playerHand,
        ...communityCards
    ]);

const dealerScore =
    evaluateHand([
        ...dealerHand,
        ...communityCards
    ]);

let result = "";

if (playerScore > dealerScore) {

    const win =
        Math.floor(pokerBet * 2);

    gameState.money += win;

    gameState.stats.wins++;

    log(`Poker WIN +$${win}`);

    result = "YOU WIN";

} else if (playerScore < dealerScore) {

    gameState.money -= pokerBet;

    gameState.stats.losses++;

    log(`Poker LOSS -$${pokerBet}`);

    result = "YOU LOSE";

} else {

    result = "PUSH";
    log("Poker PUSH");
}

pokerActive = false;
pokerBet = 0;

updateUI();
saveGame?.();

casinoContent.innerHTML += `
    <hr>
    <h2>${result}</h2>
    <button id="poker-restart">Play Again</button>
`;

document.getElementById("poker-restart")
    .onclick = startPoker;
```

}

# /*

# HOOK BUTTON

*/

pokerButton.addEventListener(
"click",
startPoker
);

log("Poker loaded.");
