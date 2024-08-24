//Dom
const spinButton = document.querySelector('.randum');
const resetButton = document.querySelector('.reset');
const boxItem = document.querySelectorAll('.box1 .boxItem img');
const boxList2 = document.querySelectorAll('.box2 .boxItem2');
const notification = document.querySelector('.notification');

// biến cược
let bets = { bau: 0, ca: 0, cua: 0, ga: 0, huou: 0, tom: 0 };
let isSpinning = false;

// số lần cược
function updateBetDisplay() {
    boxList2.forEach(item => {
        const imageName = item.querySelector('img').src.split('/').pop().split('.')[0];
        item.querySelector('p.number').textContent = bets[imageName];
    });
}

// khi người chơi nhấn nút quay
spinButton.addEventListener('click', () => {
    if (isSpinning) return;

    const totalBets = Object.values(bets).reduce((a, b) => a + b, 0);
    if (totalBets !== 3) {
        alert('Tổng số điểm cược phải là 3.');
        return;
    }

    isSpinning = true;
    const images = ['./img/bau.png', './img/ca.png', './img/cua.png', './img/ga.png', './img/huou.png', './img/tom.png'];

    let spinsRemaining = 100; 
    const spinInterval = 100; 
    // Lưu trữ kết quả cuối cùng cho mỗi ô
    

    function spinImages() {
        boxItem.forEach(img => {
            img.src = images[Math.floor(Math.random() * images.length)];
        });
        spinsRemaining--;

        if (spinsRemaining <= 0) {
            // Lưu kết quả cuối cùng khi quay xong
            finalResults = Array.from(boxItem).map(img => img.src.split('/').pop().split('.')[0]);
            clearInterval(spinId);
            isSpinning = false;
            compareResults();
        }
    }

    const spinId = setInterval(spinImages, spinInterval);
});

// khi người chơi bấm vào ô đặt lại
resetButton.addEventListener('click', () => {
    if (isSpinning) return;

    bets = { bau: 0, ca: 0, cua: 0, ga: 0, huou: 0, tom: 0 };
    updateBetDisplay();
    document.querySelectorAll('.box2 .boxItem2').forEach(button => {
        button.addEventListener('click', handleBetClick);
    });
});

function handleBetClick(event) {
    if (isSpinning) return;

    const button = event.currentTarget;
    const image = button.querySelector('img').src.split('/').pop().split('.')[0];

    if (Object.values(bets).reduce((a, b) => a + b, 0) < 3) {
        if (bets[image] < 3) {
            bets[image]++;
            updateBetDisplay();

            if (Object.values(bets).reduce((a, b) => a + b, 0) === 3) {
                document.querySelectorAll('.box2 .boxItem2').forEach(btn => {
                    if (btn.querySelector('img').src.split('/').pop().split('.')[0] !== image) {
                        btn.removeEventListener('click', handleBetClick);
                    }
                });
            }
        }
    }
}

//in ra kết quả
let finalResults = []; 

function compareResults() {
    const betResults = Object.entries(bets).filter(([key, value]) => value > 0).map(([key]) => key);
    console.log("Cược:", betResults); 
    console.log("Kết quả:", finalResults); 
    
    const matchedResults = betResults.some(result => finalResults.includes(result));
    const resultText = matchedResults 
        ? `Bạn đã đoán đúng với kết quả: ${finalResults.join(', ')}`
        : `Bạn đã đoán sai với kết quả: ${finalResults.join(', ')}`;
    
    console.log(resultText);
}


