const pasto = document.getElementById('pasto');
const context = pasto.getContext('2d');

pasto.width = window.innerWidth;
pasto.height = window.innerHeight;

const img = new Image();
        img.src = './pasto.jpg'; // Imagen de fondo

        // Establecer el tamaño del canvas según el tamaño de la ventana
        function resizeCanvas() {
            pasto.width = window.innerWidth;
            pasto.height = window.innerHeight;
            drawBackground(); 
        }

        // Llamar a la función para ajustar el tamaño del canvas al cargar y redimensionar
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas(); // Ajusta el tamaño al cargar la página

        function drawBackground() {
            const canvasAspect = pasto.width / pasto.height;
            const imgAspect = img.width / img.height;
            let drawWidth, drawHeight;

            // Ajusta la imagen para cubrir el canvas sin distorsionarse
            if (canvasAspect > imgAspect) {
                // Si el canvas es más ancho en relación con la imagen
                drawWidth = pasto.width;
                drawHeight = pasto.width / imgAspect;
            } else {
                // Si el canvas es más alto en relación con la imagen
                drawWidth = pasto.height * imgAspect;
                drawHeight = pasto.height;
            }

            const offsetX = (pasto.width - drawWidth) / 2;
            const offsetY = (pasto.height - drawHeight) / 2;

            // Dibujar la imagen ajustada al tamaño del canvas
            context.clearRect(0, 0, pasto.width, pasto.height); // Limpiar el canvas antes de dibujar
            context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        }

const colors = ['#ffffff', '#f2deda', '#e5e1f5', '#e7e6fa'];

let explosionArray = [];
let circlesArray = [];

function Explosion(x,y) {
    
    this.x = x;
    this.y = y;
    this.radius = 15;
    this.color = colors[Math.round(Math.random() * colors.length)];

    this.speedX = Math.random() * 3 -1.5;
    this.speedY = Math.random() * 3 -1.5;

    this.update = () => {

        if (this.radius >= 10) {
            this.x += this.speedX * 5;
            this.y += this.speedY * 5;
        }

        if (this.radius <= 9) {
            this.x += this.speedX * 2;
            this.y += this.speedY * 2;
        }

        if (this.radius > 4) {
            this.radius -= .7;
        }

        if (this.radius < 4) {
            this.radius -= .2;
        }
    }

    this.draw = () => {

        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.radius,0,Math.PI * 2);
        context.fill();

    }
}

function renderExplosion() {

    for (let i = 0; i < explosionArray.length; i++) {
        explosionArray[i].draw();
        explosionArray[i].update();

        if (explosionArray[i].radius <= .1) {
            explosionArray.splice(i,1);
            i--;
            
        }        
    }
}

function animate() {
    drawBackground();
    renderExplosion();
    requestAnimationFrame(animate)
}

let mouseX = 0;
let mouseY = 0;
let clickCounter = 0;

pasto.addEventListener('click', (e) =>{
    mouseX = e.clientX;
    mouseY = e.clientY;
    clickCounter++;

    for (let i = 0; i < 10; i++) {
        explosionArray.push(new Explosion(mouseX,mouseY))
        console.log(clickCounter)
    }

    if (clickCounter === 20) {
        window.alert("Felicidades, haz tocado el pasto 20 veces!");
    }

    if (clickCounter === 50) {
        window.alert("Felicidades, haz tocado el pasto 50 veces!");
    }

    if (clickCounter === 100) {
        window.alert("Felicidades, haz tocado el pasto 100 veces!");
    }

    if (clickCounter === 500) {
        window.alert("Felicidades, haz tocado el pasto 500 veces!");
    }
})

animate();