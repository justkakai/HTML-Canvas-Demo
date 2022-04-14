const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = 0.75 * window.innerHeight;
const particlesArray = [];
let hue = 0;

const selectedButtons = {
    firstButtonSelected: false,
    secondButtonSelected: false,
    thirdButtonSelected: false,
    fourthButtonSelected: false,
};

const selectedArray = Object.entries(selectedButtons);

const firstButton = document.getElementById('id1');
const secondButton = document.getElementById('id2');
const thirdButton = document.getElementById('id3');
const fourthButton = document.getElementById('id4');
const clearButton = document.getElementById('clear');

const buttonsArray = [firstButton, secondButton, thirdButton, fourthButton];
/*
buttonsArray.forEach((button, index, array) => {
    button.addEventListener('click', function() {
        selectedArray.forEach((item, index2, array2) => {
            if (index2 === index) {
                array2[index][1] = true;
            } else {
                array2[index][1] = false;
            }
            console.log(item);
        })
    })
});
*/

firstButton.addEventListener('click', function () {
    selectedButtons.firstButtonSelected = true;
    selectedButtons.secondButtonSelected = false;
    selectedButtons.thirdButtonSelected = false;
    selectedButtons.fourthButtonSelected = false;
})

secondButton.addEventListener('click', function () {
    selectedButtons.secondButtonSelected = true;
    selectedButtons.firstButtonSelected = false;
    selectedButtons.thirdButtonSelected = false;
    selectedButtons.fourthButtonSelected = false;
})

thirdButton.addEventListener('click', function () {
    selectedButtons.thirdButtonSelected = true;
    selectedButtons.secondButtonSelected = false;
    selectedButtons.firstButtonSelected = false;
    selectedButtons.fourthButtonSelected = false;
})

fourthButton.addEventListener('click', function () {
    selectedButtons.fourthButtonSelected = true;
    selectedButtons.secondButtonSelected = false;
    selectedButtons.thirdButtonSelected = false;
    selectedButtons.firstButtonSelected = false;
})


clearButton.addEventListener('click', function () {
    particlesArray.splice(0, particlesArray.length)
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
    if (selectedButtons.firstButtonSelected) {
        for (let i = 0; i < 5; i++) {
            particlesArray.push(new Particle());
        }
    }
    if (selectedButtons.secondButtonSelected) {
        for (let i = 0; i < 10; i++) {
            particlesArray.push(new Particle());
        }
    }
    if (selectedButtons.thirdButtonSelected) {
        for (let i = 0; i < 25; i++) {
            particlesArray.push(new Particle());
        }
    }
    if (selectedButtons.fourthButtonSelected) {
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
        if (selectedButtons.secondButtonSelected) {
            this.size = Math.random() * 25 + 1;
        }
        this.size = Math.random() * 7 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = 'hsl(' + hue + ', 100%, 50%)';
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (selectedButtons.secondButtonSelected) {
            if (this.size > 2) this.size -= 1;
        }
        if (this.size > 0.2) this.size -= 0.1;
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
            if (selectedButtons.secondButtonSelected) {
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
        if (selectedButtons.secondButtonSelected) {
            if (particlesArray[i].size <= 0.17) {
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