const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = 0.75 * window.innerHeight;
const particlesArray = [];
let hue = 0;

let selected = {
    firstButtonSelected: false,
    secondButtonSelected: false,
    thirdButtonSelected: false,
    fourthButtonSelected: false,
};

const selectedArray = Object.entries(selected);

const firstButton = document.getElementById('id1');
const secondButton = document.getElementById('id2');
const thirdButton = document.getElementById('id3');
const fourthButton = document.getElementById('id4');
const clearButton = document.getElementById('clear');

const buttons = document.querySelectorAll('#id1, #id2, #id3, #id4');
const buttonsSpread = [...buttons];

buttonsSpread.forEach((button, index) => {
    button.addEventListener('click', function() {
        selectedArray.forEach((item, index2) => {
            if (index2 !== index) {
                item.splice(1, 1, false);
            } else if (index2 === index) {
                item.splice(1, 1, true);
            }
        })
        particlesArray.splice(0, particlesArray.length);
        selected = Object.fromEntries(selectedArray);
        console.log(selected);
    })
});

clearButton.addEventListener('click', function () {
    particlesArray.splice(0, particlesArray.length);
})

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

const mouse = {
    x: undefined,
    y: undefined,
}

function themeProperties(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    if (selected.firstButtonSelected) {
        for (let i = 0; i < 1; i++) {
            particlesArray.push(new Particle());
        }
    }
    if (selected.secondButtonSelected) {
        for (let i = 0; i < 10; i++) {
            particlesArray.push(new Particle());
        }
    }
    if (selected.thirdButtonSelected) {
        for (let i = 0; i < 25; i++) {
            particlesArray.push(new Particle());
        }
    }
    if (selected.fourthButtonSelected) {
        for (let i = 0; i < 50; i++) {
            particlesArray.push(new Particle());
        }
    }
}

canvas.addEventListener('click', themeProperties)
canvas.addEventListener('mousemove', themeProperties)

class Particle {
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        if (selected.secondButtonSelected) {
            this.size = Math.random() * 2 + 1;
        } else if (selected.thirdButtonSelected) {
            this.size = Math.random() * 20 + 1;
        } else {
            this.size = Math.random() * 7 + 1;
        }
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = 'hsl(' + hue + ', 100%, 50%)';
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        // if (selected.secondButtonSelected) {
        //     if (this.size > 2) this.size -= 1;
        // }
        if (this.size > 0.2) this.size -= 0.1;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        // ctx.arc(this.x, this.y, this.size, 5, Math.PI * 2);
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
            if (selected.secondButtonSelected) {
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = particlesArray[i].color;
                    // ctx.lineWidth = particlesArray[i].size/2;
                    ctx.lineWidth = 0.2;
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                    ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                    ctx.stroke();
                    ctx.closePath();
                }
            }

        }
        if (selected.secondButtonSelected) {
            if (particlesArray[i].size <= 0.17) {
                particlesArray.splice(i, 1);
                i--;
            }
        } else {
            if (particlesArray[i].size <= 0.2) {
                particlesArray.splice(i, 1);
                i--;
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    hue++;
    requestAnimationFrame(animate);
}

animate();