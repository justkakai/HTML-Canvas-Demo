const button = document.getElementById('clear');

button.addEventListener('click', function() {
    particlesArray.splice(0, particlesArray.length)
})

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight -150;
const particlesArray = [];
let hue = 0;

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // ctx.fillStyle = 'white';
    // ctx.fillRect(10, 20, 150, 50);
})

const mouse = {
    x: undefined,
    y: undefined,
}

function handleEvent(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 1; i++) {
        particlesArray.push(new Particle());
    }
}

canvas.addEventListener('click', handleEvent);
canvas.addEventListener('mousemove', handleEvent);
canvas.addEventListener('touchstart', handleEvent);
canvas.addEventListener('touchmove', handleEvent);

class Particle {
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 8 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = 'hsl(' + hue + ', 100%, 50%)';
    }
    update() {
        this.x += this.speedX/20;
        this.y += this.speedY/20;
        // if (this.size > 0.2) this.size -= 0.1;
        if (this.size > 2) this.size -= 1;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function handleParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        for (let j = i; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = particlesArray[i].color;
                // ctx.lineWidth = particlesArray[i].size/10;
                ctx.lineWidth = 0.2;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
                ctx.closePath();
            }
        }
        if (particlesArray[i].size <= 1) {
            particlesArray.splice(i, 1);
            i--;
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = 'rgba(0,0,0,0.2)';
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    hue++;
    requestAnimationFrame(animate);
}

animate();




