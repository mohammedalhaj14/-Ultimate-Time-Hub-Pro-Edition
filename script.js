// Tab Switching Logic
const tabs = document.querySelectorAll('.tab-btn');
const sections = document.querySelectorAll('.mode-section');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active'));
        
        tab.classList.add('active');
        document.getElementById(tab.dataset.target).classList.add('active');
    });
});

// --- CLOCK LOGIC ---
function updateClock() {
    const now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let ampm = h >= 12 ? "PM" : "AM";

    h = h % 12 || 12; // Convert to 12h format
    
    document.getElementById("hour").innerText = String(h).padStart(2, '0');
    document.getElementById("minutes").innerText = String(m).padStart(2, '0');
    document.getElementById("seconds").innerText = String(s).padStart(2, '0');
    document.getElementById("ampm").innerText = ampm;
}
setInterval(updateClock, 1000);
updateClock();

// --- COUNTER LOGIC ---
let count = 0;
const countVal = document.getElementById("count-value");
document.getElementById("increment").onclick = () => { count++; countVal.innerText = count; };
document.getElementById("decrement").onclick = () => { count--; countVal.innerText = count; };
document.getElementById("reset-counter").onclick = () => { count = 0; countVal.innerText = count; };

// --- TIMER LOGIC ---
let timerInterval;
let timeLeft;

document.getElementById("start-timer").onclick = () => {
    clearInterval(timerInterval);
    const mins = document.getElementById("timer-input").value;
    if (!mins) return alert("Enter minutes!");
    
    timeLeft = mins * 60;
    
    timerInterval = setInterval(() => {
        timeLeft--;
        const m = Math.floor(timeLeft / 60);
        const s = timeLeft % 60;
        document.getElementById("timer-display").innerText = 
            `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Time is up!");
        }
    }, 1000);
};

document.getElementById("reset-timer").onclick = () => {
    clearInterval(timerInterval);
    document.getElementById("timer-display").innerText = "00:00";
    document.getElementById("timer-input").value = "";
};