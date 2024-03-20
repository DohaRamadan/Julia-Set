let mnVal = -2.5;
let maxVal = 2.5;
let angle = 0; 
let maxIteration = 100;
const colorsRed = []; 
const colorsGreen = []; 
const colorsBlue = []; 
function setup() {
  pixelDensity(1);
  createCanvas(window.innerWidth, window.innerHeight);
  colorMode(HSB, 1);

  for (let n = 0; n < maxIteration; n++) {
    let hu = sqrt(n / maxIteration);
    let col = color(hu, 255, 150);
    colorsRed[n] = red(col);
    colorsGreen[n] = green(col);
    colorsBlue[n] = blue(col);
    
  }
}

function draw() {
  background(255);

  loadPixels();
  let ca = cos(angle * 3.213); 
  let cb = sin(angle); 

  angle += 0.036; 
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let a = map(x, 0, width, mnVal, maxVal);
      let b = map(y, 0, height, mnVal, maxVal);

      let numberOfIterations = 0;
      while (numberOfIterations < maxIteration) {
        let realPart = a * a - b * b;
        let imaginaryPart = 2 * a * b;

        a = realPart + ca;
        b = imaginaryPart + cb;

        if (a * a + b * b > 16) {
          break;
        }
        numberOfIterations++;
      }
      let hue = sqrt(numberOfIterations / maxIteration);
      let col = color(hue, 255, 255);

      let pixelIndex = (y * width + x) * 4;
      if (numberOfIterations === maxIteration) {
        pixels[pixelIndex + 0] = 0;
        pixels[pixelIndex + 1] = 0;
        pixels[pixelIndex + 2] = 0;
      } else {
        pixels[pixelIndex + 0] = colorsRed[numberOfIterations];
        pixels[pixelIndex + 1] = colorsGreen[numberOfIterations];
        pixels[pixelIndex + 2] = colorsBlue[numberOfIterations];
      }
    }
  }
  updatePixels();
}
