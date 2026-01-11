// --- MODE SWITCHING ---
const tabs = document.querySelectorAll('.tab-btn');
const modes = document.querySelectorAll('.mode');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        modes.forEach(m => m.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(tab.dataset.target).classList.add('active');
    });
});

// --- 1. CLOCK LOGIC ---
function updateClock() {
    const now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    document.getElementById("hour").innerText = String(h).padStart(2, '0');
    document.getElementById("minutes").innerText = String(m).padStart(2, '0');
    document.getElementById("seconds").innerText = String(s).padStart(2, '0');
    document.getElementById("ampm").innerText = ampm;
}
setInterval(updateClock, 1000);
updateClock();

// --- 2. TIMER LOGIC (WITH PERSISTENT ALARM) ---
let timerInterval;
let totalSeconds = 0;
const timerDisplay = document.getElementById("timer-time");
const alarmSound = document.getElementById("alarm-sound");
const offBtn = document.getElementById("off-timer");

document.getElementById("start-timer").onclick = () => {
    if (totalSeconds <= 0) {
        const hrs = parseInt(document.getElementById("hr-input").value) || 0;
        const mins = parseInt(document.getElementById("min-input").value) || 0;
        totalSeconds = (hrs * 3600) + (mins * 60);
    }

    if (totalSeconds <= 0) return alert("Please set a time!");

    clearInterval(timerInterval);
    offBtn.style.display = "none";
    alarmSound.pause();

    timerInterval = setInterval(() => {
        totalSeconds--;
        
        let h = Math.floor(totalSeconds / 3600);
        let m = Math.floor((totalSeconds % 3600) / 60);
        let s = totalSeconds % 60;

        timerDisplay.innerText = 
            `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            alarmSound.loop = true; // Make it play until manually stopped
            alarmSound.play();
            offBtn.style.display = "block"; // Show the OFF button
        }
    }, 1000);
};

document.getElementById("stop-timer").onclick = () => clearInterval(timerInterval);

offBtn.onclick = () => {
    alarmSound.pause();
    alarmSound.currentTime = 0;
    alarmSound.loop = false;
    offBtn.style.display = "none";
    totalSeconds = 0;
    timerDisplay.innerText = "00:00:00";
};

// --- 3. COUNTER LOGIC ---
let count = 0;
const countVal = document.getElementById("count-value");
document.getElementById("increment").onclick = () => { count++; countVal.innerText = count; };
document.getElementById("decrement").onclick = () => { count--; countVal.innerText = count; };
document.getElementById("reset-counter").onclick = () => { count = 0; countVal.innerText = count; };