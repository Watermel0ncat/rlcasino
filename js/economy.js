# /*

ECONOMY SYSTEM
Million Dollar Mansion Casino
=============================

*/

let economy = {

```
day: 1,

inflation: 1.0,

volatility: 0.2,

casinoMultiplier: 1.0,

marketState: "Stable",

passiveIncome: 0
```

};

# /*

# MARKET STATES

*/

const marketStates = [

```
{
    name: "Casino Boom",
    inflation: 1.05,
    casinoMultiplier: 1.1,
    volatility: 0.25
},

{
    name: "Stable Market",
    inflation: 1.0,
    casinoMultiplier: 1.0,
    volatility: 0.2
},

{
    name: "Recession",
    inflation: 0.97,
    casinoMultiplier: 0.9,
    volatility: 0.15
},

{
    name: "Luxury Craze",
    inflation: 1.08,
    casinoMultiplier: 1.15,
    volatility: 0.3
},

{
    name: "Market Crash",
    inflation: 0.92,
    casinoMultiplier: 0.75,
    volatility: 0.4
}
```

];

# /*

# ROLL MARKET EVENT

*/

function updateMarket() {

```
const state =
    marketStates[
        Math.floor(
            Math.random() *
            marketStates.length
        )
    ];

economy.marketState =
    state.name;

economy.inflation =
    state.inflation;

economy.casinoMultiplier =
    state.casinoMultiplier;

economy.volatility =
    state.volatility;

log(
    `Market shifted: ${state.name}`
);
```

}

# /*

# APPLY CASINO MULTIPLIER

*/

function applyCasinoMultiplier(amount) {

```
return Math.floor(
    amount *
    economy.casinoMultiplier
);
```

}

# /*

# INFLATION SYSTEM

*/

function applyInflation() {

```
economy.inflation *=
    1 + (Math.random() * 0.01 - 0.005);

economy.inflation =
    Math.max(
        0.8,
        Math.min(
            1.5,
            economy.inflation
        )
    );
```

}

# /*

# SHOP PRICE MODIFIER

*/

function modifyPrice(price) {

```
const volatilityEffect =
    1 +
    (Math.random() *
    economy.volatility -
    economy.volatility / 2);

return Math.floor(
    price *
    economy.inflation *
    volatilityEffect
);
```

}

# /*

# PASSIVE INCOME (LATE GAME HOOK)

*/

function calculatePassiveIncome() {

```
let base = economy.passiveIncome;

return Math.floor(base);
```

}

# /*

# NEXT DAY ECONOMY TICK

*/

function economyTick() {

```
economy.day++;

applyInflation();

if (Math.random() < 0.35) {

    updateMarket();
}

const passive =
    calculatePassiveIncome();

if (passive > 0) {

    gameState.money += passive;

    log(
        `Passive income +$${passive}`
    );
}

updateUI();
```

}

# /*

# HOOK INTO GLOBAL NEXT DAY

*/

const originalNextDay =
window.nextDay;

window.nextDay = function () {

```
if (originalNextDay) {

    originalNextDay();
}

economyTick();

saveGame?.();
```

};

# /*

# CASINO WIN MODIFIER

*/

function applyWin(amount) {

```
return applyCasinoMultiplier(amount);
```

}

# /*

# CASINO LOSS MODIFIER

*/

function applyLoss(amount) {

```
return amount;
```

}

# /*

# INTEGRATION HELPERS

*/

window.economy = economy;
window.modifyPrice = modifyPrice;
window.applyWin = applyWin;
window.applyLoss = applyLoss;
window.updateMarket = updateMarket;

# /*

# BOOT

*/

log("Economy system online.");
