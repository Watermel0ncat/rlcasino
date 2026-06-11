# /*

BLACKJACK
Million Dollar Mansion Casino
=============================

*/

const blackjackButton =
document.getElementById("blackjack-btn");

const casinoContent =
document.getElementById("casino-content");

let deck = [];

let playerHand = [];
let dealerHand = [];

let currentBet = 0;

let gameActive = false;

# /*

# CARD CREATION

*/

function createDeck() {

```
const suits = [
    "♠",
    "♥",
    "♦",
    "♣"
];

const values = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K"
];

deck = [];

suits.forEach(suit => {

    values.forEach(value => {

        deck.push({
            suit,
            value
        });

    });

});

shuffle(deck);
```

}

# /*

# SHUFFLE

*/

function shuffle(array) {

```
for (
    let i = array.length - 1;
    i > 0;
    i--
) {

    const j =
        Math.floor(
            Math.random() * (i + 1)
        );

    [
        array[i],
        array[j]
    ] = [
        array[j],
        array[i]
    ];
}
```

}

# /*

# DRAW CARD

*/

function drawCard() {

```
return deck.pop();
```

}

# /*

# HAND VALUE

*/

function handValue(hand) {

```
let total = 0;

let aces = 0;

hand.forEach(card => {

    if (
        card.value === "J" ||
        card.value === "Q" ||
        card.value === "K"
    ) {

        total += 10;
    }

    else if (
        card.value === "A"
    ) {

        total += 11;
        aces++;
    }

    else {

        total += Number(card.value);
    }
});

while (
    total > 21 &&
    aces > 0
) {

    total -= 10;
    aces--;
}

return total;
```

}

# /*

# RENDER

*/

function renderBlackjack() {

```
const playerValue =
    handValue(playerHand);

const dealerValue =
    handValue(dealerHand);

casinoContent.innerHTML = `

    <h3>Blackjack</h3>

    <p>
        Current Bet:
        $${currentBet}
    </p>

    <hr>

    <h4>Dealer</h4>

    <div class="card-area">

        ${dealerHand.map(
            card =>
            `
            <div class="playing-card">
                ${card.value}${card.suit}
            </div>
            `
        ).join("")}

    </div>

    <p>
        Value:
        ${dealerValue}
    </p>

    <hr>

    <h4>Player</h4>

    <div class="card-area">

        ${playerHand.map(
            card =>
            `
            <div class="playing-card">
                ${card.value}${card.suit}
            </div>
            `
        ).join("")}

    </div>

    <p>
        Value:
        ${playerValue}
    </p>

    <div class="bet-controls">

        <button id="hit-btn">
            Hit
        </button>

        <button id="stand-btn">
            Stand
        </button>

    </div>

`;

document
.getElementById("hit-btn")
.addEventListener(
    "click",
    hit
);

document
.getElementById("stand-btn")
.addEventListener(
    "click",
    stand
);
```

}

# /*

# START GAME

*/

function startBlackjack() {

```
if (gameActive) {

    return;
}

const bet =
    Number(
        prompt(
            "Enter bet amount"
        )
    );

if (
    isNaN(bet) ||
    bet <= 0
) {

    return;
}

if (
    bet > gameState.money
) {

    log(
        "Not enough cash."
    );

    return;
}

currentBet = bet;

createDeck();

playerHand = [
    drawCard(),
    drawCard()
];

dealerHand = [
    drawCard(),
    drawCard()
];

gameActive = true;

renderBlackjack();
```

}

# /*

# HIT

*/

function hit() {

```
if (!gameActive)
    return;

playerHand.push(
    drawCard()
);

renderBlackjack();

if (
    handValue(
        playerHand
    ) > 21
) {

    loseGame();
}
```

}

# /*

# STAND

*/

function stand() {

```
while (
    handValue(
        dealerHand
    ) < 17
) {

    dealerHand.push(
        drawCard()
    );
}

determineWinner();
```

}

# /*

# UPGRADE BONUS

*/

function payoutMultiplier() {

```
let multiplier = 1;

const inventory =
    gameState.inventory;

if (
    inventory.some(
        i =>
        i.id ===
        "lucky_penny"
    )
) {

    multiplier += 0.02;
}

if (
    inventory.some(
        i =>
        i.id ===
        "golden_clover"
    )
) {

    multiplier += 0.25;
}

return multiplier;
```

}

# /*

# WIN

*/

function winGame() {

```
let winnings =
    Math.floor(
        currentBet *
        payoutMultiplier()
    );

gameState.money += winnings;

gameState.stats.wins++;

gameState.stats.biggestWin =
    Math.max(
        gameState.stats.biggestWin,
        winnings
    );

updateUI();

log(
    `Blackjack win! +$${winnings}`
);

resetGame();
```

}

# /*

# LOSE

*/

function loseGame() {

```
gameState.money -= currentBet;

gameState.stats.losses++;

updateUI();

log(
    `Blackjack loss! -$${currentBet}`
);

resetGame();
```

}

# /*

# PUSH

*/

function pushGame() {

```
log(
    "Push. Nobody wins."
);

resetGame();
```

}

# /*

# RESULTS

*/

function determineWinner() {

```
const player =
    handValue(
        playerHand
    );

const dealer =
    handValue(
        dealerHand
    );

renderBlackjack();

if (
    dealer > 21
) {

    winGame();
    return;
}

if (
    player > dealer
) {

    winGame();
    return;
}

if (
    player < dealer
) {

    loseGame();
    return;
}

pushGame();
```

}

# /*

# RESET

*/

function resetGame() {

```
gameActive = false;

currentBet = 0;
```

}

# /*

# HOOK BUTTON

*/

blackjackButton.addEventListener(
"click",
startBlackjack
);

log(
"Blackjack loaded."
);
