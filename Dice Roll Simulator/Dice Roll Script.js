//#region Dice Types (D4, D6, D8, D10, D12, D20)
class Die
{
    faces;                  // The number of faces on the die.
    color = "#FFFFFF";      // The die's primary color. [Default: White]
    button;

    // Die Constructor
    constructor(faces, color, button)
    {
        this.faces = faces;
        this.color = color;
        this.button = button;
    }
}

const displayMain = document.querySelector(".display");
const dieDisplay = document.querySelector(".die-icon-display");
const faceValue = document.querySelector(".overlay-face-value");

const D4 = new Die(4, "#00aeff", document.querySelector(".d4-die"));      // D4 die.
const D6 = new Die(6, "#00ffb2", document.querySelector(".d6-die"));      // D6 die.
const D8 = new Die(8, "#bfff00", document.querySelector(".d8-die"));      // D8 die.
const D10 = new Die(10, "#ffaa00", document.querySelector(".d10-die"));    // D10 die.
const D12 = new Die(12, "#ff3c00", document.querySelector(".d12-die"));    // D12 die.
const D20 = new Die(20, "#ff0080", document.querySelector(".d20-die"));    // D20 die.

const dottedLine = document.querySelector(".dotted-line");
const rollButton = document.querySelector(".roll-button");
const outline = document.querySelector(".outline");

let dice = [];

let rollValue = 1;
let selectedDie = D6;
let primaryColor = D6.color;
let isRolling = false;

let whiteColor = "white";

function main()
{
    dice.push(D4, D6, D8, D10, D12, D20);
    
    dice.forEach(die =>
    {
        die.button.addEventListener("click", function() { selectDie(die); });
    });

    rollButton.addEventListener("mouseenter", setPrimaryColor);
    rollButton.addEventListener("mouseleave", resetPrimaryColor);
    rollButton.addEventListener("click", rollDie);
    
    resetFaceValue();
}

function selectDie(die)
{
    if (isRolling || selectedDie == die)
        return;

    selectedDie = die;
    primaryColor = selectedDie.color;
    
    displayMain.classList.remove("pulse");
    invoke(function() {displayMain.classList.add("pulse");}, 0.001);

    dieDisplay.src = `./Art/D${die.faces}_Die_Display.svg`;
    resetFaceValue();
    
    dottedLine.style.transition = "0.25s ease-out";
    dottedLine.style.borderColor = primaryColor;
}

function setPrimaryColor()
{
    rollButton.style.transition = "0.25s ease-out";
    rollButton.style.backgroundColor = primaryColor;

    outline.style.transition = "0.25s ease-out";
    outline.style.outlineColor = primaryColor;
}

function resetPrimaryColor()
{
    rollButton.style.backgroundColor = whiteColor;
    outline.style.outlineColor = whiteColor;
}

function rollDie()
{
    if (isRolling)
        return;

    faceValue.innerHTML = "?";
    
    rollButton.style.pointerEvents = "none";
    resetPrimaryColor();

    displayMain.classList.remove("pulse");
    displayMain.classList.add("roll-die");
    
    dice.forEach(die =>
    {
        die.button.classList.add("inactive");
    });

    invoke(stopDie, 1.125);
    invoke(enableRollDie, 1.5);
    isRolling = true;
}
/**
 * Stops rolling the die and displays a random number.
*/
function stopDie()
{
    resetFaceValue();
}

function enableRollDie()
{
    displayMain.classList.remove("roll-die");
    dice.forEach(die =>
    {
        die.button.classList.remove("inactive");
    });
    rollButton.style.pointerEvents = "auto";
    rollButton.addEventListener("mouseover", setPrimaryColor);
    isRolling = false;
}

function invoke(func, seconds)
{
    let invokeMethod = setTimeout(func, seconds * 1000);
}

function invokeRepeating(func, seconds)
{
    let invokeMethod = setInterval(func, seconds * 1000);
}

function resetFaceValue()
{
    faceValue.innerHTML = getRandomFaceValue(selectedDie.faces);
}

function getRandomFaceValue(max)
{
    return Math.floor(Math.random() * max) + 1;
}

function getRandomRange(min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

main();