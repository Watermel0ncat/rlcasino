# /*

SHOP SYSTEM
Million Dollar Mansion Casino
=============================

*/

const shopItemsContainer =
document.getElementById("shop-items");

const inventoryContainer =
document.getElementById("inventory-list");

const marketStatus =
document.getElementById("market-status");

# /*

# RARITIES

*/

const rarities = {

```
Common: {
    color: "#a0aec0",
    multiplier: 1
},

Uncommon: {
    color: "#3ddc84",
    multiplier: 2
},

Rare: {
    color: "#3b82f6",
    multiplier: 4
},

Epic: {
    color: "#a855f7",
    multiplier: 8
},

Legendary: {
    color: "#f7c948",
    multiplier: 16
}
```

};

# /*

# ITEM DATABASE

*/

const itemPool = [

{
id: "lucky_penny",
name: "Lucky Penny",
rarity: "Common",
basePrice: 100,
description: "+2% winnings"
},

{
id: "card_sleeve",
name: "Card Sleeve",
rarity: "Common",
basePrice: 150,
description: "Better poker draws"
},

{
id: "dice_wax",
name: "Dice Wax",
rarity: "Uncommon",
basePrice: 400,
description: "Better craps odds"
},

{
id: "gold_horseshoe",
name: "Gold Horseshoe",
rarity: "Rare",
basePrice: 1200,
description: "Improved roulette payouts"
},

{
id: "counter_notebook",
name: "Counter Notebook",
rarity: "Epic",
basePrice: 5000,
description: "Better blackjack odds"
},

{
id: "golden_clover",
name: "Golden Clover",
rarity: "Legendary",
basePrice: 25000,
description: "+25% all winnings"
}

];

# /*

# MARKET CONDITIONS

*/

const marketConditions = [

{
name: "Stable Market",
modifier: 1
},

{
name: "Casino Boom",
modifier: 1.25
},

{
name: "Luxury Craze",
modifier: 1.4
},

{
name: "Recession",
modifier: 0.8
},

{
name: "Market Crash",
modifier: 0.6
}

];

let currentMarket =
marketConditions[0];

let currentShop = [];

# /*

# GENERATE SHOP

*/

function generateShop() {

```
currentShop = [];

itemPool.forEach(item => {

    const randomFactor =
        0.8 + Math.random() * 0.5;

    const finalPrice =
        Math.floor(
            item.basePrice *
            randomFactor *
            currentMarket.modifier
        );

    currentShop.push({

        ...item,

        price: finalPrice
    });
});

renderShop();
```

}

# /*

# RENDER SHOP

*/

function renderShop() {

```
shopItemsContainer.innerHTML = "";

marketStatus.innerHTML =
    `<strong>${currentMarket.name}</strong>`;

currentShop.forEach(item => {

    const rarity =
        rarities[item.rarity];

    const div =
        document.createElement("div");

    div.className = "shop-item";

    div.innerHTML = `

        <h3 style="color:${rarity.color}">
            ${item.name}
        </h3>

        <p>${item.description}</p>

        <p>
            Rarity:
            ${item.rarity}
        </p>

        <p>
            Price:
            $${item.price.toLocaleString()}
        </p>

        <button
            class="buy-btn"
            data-id="${item.id}"
        >
            Buy
        </button>

        <button
            class="haggle-btn"
            data-id="${item.id}"
        >
            Haggle
        </button>

    `;

    shopItemsContainer.appendChild(div);
});

attachButtons();
```

}

# /*

# BUTTON EVENTS

*/

function attachButtons() {

```
document
.querySelectorAll(".buy-btn")
.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            buyItem(
                button.dataset.id
            );
        }
    );

});

document
.querySelectorAll(".haggle-btn")
.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            haggleItem(
                button.dataset.id
            );
        }
    );

});
```

}

# /*

# BUY ITEM

*/

function buyItem(id) {

```
const item =
    currentShop.find(
        i => i.id === id
    );

if (!item) return;

if (
    gameState.money <
    item.price
) {

    log(
        `Not enough money for ${item.name}.`
    );

    return;
}

gameState.money -= item.price;

gameState.inventory.push(item);

updateUI();

renderInventory();

log(
    `Purchased ${item.name} for $${item.price}.`
);
```

}

# /*

# HAGGLE

*/

function haggleItem(id) {

```
const item =
    currentShop.find(
        i => i.id === id
    );

if (!item) return;

const offer =
    Number(
        prompt(
            `Current price: $${item.price}\nYour offer?`
        )
    );

if (
    !offer ||
    offer <= 0
) {
    return;
}

const discountPercent =
    (
        (item.price - offer)
        / item.price
    );

let successChance =
    0.7 - discountPercent;

successChance =
    Math.max(
        0.05,
        Math.min(
            0.95,
            successChance
        )
    );

const roll =
    Math.random();

if (roll < successChance) {

    item.price = offer;

    renderShop();

    log(
        `Haggle succeeded. ${item.name} now costs $${offer}.`
    );

} else {

    const increase =
        Math.floor(
            item.price * 0.1
        );

    item.price += increase;

    renderShop();

    log(
        `Shopkeeper annoyed. Price increased by $${increase}.`
    );
}
```

}

# /*

# INVENTORY

*/

function renderInventory() {

```
if (
    gameState.inventory.length === 0
) {

    inventoryContainer.innerHTML =
        "No items yet.";

    return;
}

inventoryContainer.innerHTML = "";

gameState.inventory.forEach(
    item => {

        const div =
            document.createElement(
                "div"
            );

        div.className =
            "inventory-item";

        div.textContent =
            item.name;

        inventoryContainer
            .appendChild(div);
    }
);
```

}

# /*

# NEW MARKET DAY

*/

function updateMarket() {

```
currentMarket =
    marketConditions[
        Math.floor(
            Math.random() *
            marketConditions.length
        )
    ];

generateShop();

log(
    `Market changed to ${currentMarket.name}.`
);
```

}

# /*

# HOOK INTO DAY SYSTEM

*/

const originalNextDay =
window.nextDay;

window.nextDay = function () {

```
gameState.day++;

updateUI();

updateMarket();

log(
    `Day ${gameState.day} started.`
);
```

};

# /*

# BOOT

*/

generateShop();

renderInventory();

log(
"Shop inventory generated."
);

# /*

# EXPORTS

*/

window.generateShop =
generateShop;

window.renderInventory =
renderInventory;

window.updateMarket =
updateMarket;
