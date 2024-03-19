var frDiv;

function setup() {
    createCanvas(window.innerWidth - 100, window.innerHeight - 100);
    pixelDensity(1);
  
      minSlider = createSlider(-2.5, 0, -2.5, 0.01);
      maxSlider = createSlider(0, 2.5, 2.5, 0.01);
  
    frDiv = createDiv('');
}

function draw() {
  loadPixels();
  let maxIteration = 100;
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let a = map(x, 0, width, minSlider.value(), maxSlider.value());
      let b = map(y, 0, height, minSlider.value(), maxSlider.value());
    
      let ca = a; 
      let cb = b; 
      let numberOfIterations = 0;
      while (numberOfIterations < maxIteration) {
        let realPart = a * a - b * b;
        let imaginaryPart = 2 * a * b;

        a = realPart + ca;
        b = imaginaryPart + cb;

        if (a*a + b*b > 16) {
          break;
        }
        numberOfIterations++;
      }
      let bright = map(numberOfIterations, 0, maxIteration, 0, 1);
      bright = map(sqrt(bright), 0, 1, 0, 255); 

      if (numberOfIterations === maxIteration) {
        bright = 0;
      }
      let pixelIndex = ((y * width) + x) * 4; 
      pixels[pixelIndex + 0] = bright; 
      pixels[pixelIndex + 1] = bright; 
      pixels[pixelIndex + 2] = bright; 
      pixels[pixelIndex + 3] = 255; 
    }
  }
  updatePixels(); 
  frDiv.html(floor(frameRate()));
}
