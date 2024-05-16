const container = document.querySelector(".container");

// colors
const black = document.querySelector(".black");
const green = document.querySelector(".green");
const skyBlue = document.querySelector(".sky-blue");
const yellow = document.querySelector(".yellow");
const red = document.querySelector(".red");
const random = document.querySelector(".random");

const colors = new Map();
colors.set("black", "#000000");
colors.set("green", "#2e4c46");
colors.set("skyBlue", "#4287f5");
colors.set("yellow", "#fce40d");
colors.set("red", "#fc0000");
const colorsArr = Array.from(colors.values());

// default grid and color
let value = 16;
let color = colors.get("black");

const selectedColor = document.querySelector(".dum");
selectedColor.style.background = color;

function updateSelectedColor() {
  selectedColor.style.background = color;
}

// should be painting?
let mouseHoverPaint = false;

// is random generation color enabled?
let randomColorGeneration = false;

random.addEventListener("click", () => {
  randomColorGeneration = true;
});

black.addEventListener("click", () => {
  randomColorGeneration = false;
  color = colors.get("black");
  updateSelectedColor();
})

green.addEventListener("click", () => {
  randomColorGeneration = false;
  color = colors.get("green");
  updateSelectedColor();
});

skyBlue.addEventListener("click", () => {
  randomColorGeneration = false;
  color = colors.get("skyBlue");
  updateSelectedColor();
});

yellow.addEventListener("click", () => {
  randomColorGeneration = false;
  color = colors.get("yellow");
  updateSelectedColor();
});

red.addEventListener("click", () => {
  randomColorGeneration = false;
  color = colors.get("red");
  updateSelectedColor();
});

// generate random color from availables
function generateRandomColor() {
  const ran =  Math.floor(Math.random() * colors.size);
  color = colorsArr[ran];
}

function generateGrid() {
  // keep my grid always limited by its container
  let squareSide = container.clientWidth / value;
  // grid from values > 100 are not allowed 
  if (value > 100 || value < 1) {
    value = 15;
  }

  for (let i = 0; i < value; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    container.appendChild(row);
    for (let j = 0; j < value; j++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.setAttribute("style", `width: ${squareSide}px; height: ${squareSide}px; border: 0px; padding: 0px; margin: 0px;`);
      square.addEventListener("mouseenter", () => {
        if (randomColorGeneration) {
          generateRandomColor();
          updateSelectedColor();
        }
        if (mouseHoverPaint) {
          square.style.background = color;
        }
      });
      square.addEventListener("mouseleave", () => {
        let opacity = +square.style.opacity;
        if (opacity === 1) {
          return;
        }
        if (mouseHoverPaint) {
          square.style.opacity = opacity + 0.2;
        }
      });
      square.addEventListener("click", () => {
        mouseHoverPaint = !mouseHoverPaint;
        if (!mouseHoverPaint) {
          square.style.opacity = square.style.opacity + 0.2;
        }
      });
      row.appendChild(square);
    }
  }
}

function deleteGrid() {
  const rows = document.querySelectorAll(".row");
  rows.forEach(element => {
    container.removeChild(element);
  });
}

const button = document.querySelector(".generate-grid");

button.addEventListener("click", () => {
  value = parseInt(prompt("Enter the value per row in the new grid (max 100)"));
  deleteGrid();
  generateGrid();
});

generateGrid();
