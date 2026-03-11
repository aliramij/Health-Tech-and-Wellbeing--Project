// ===== Mobile Menu Toggle =====
function toggleMenu() {
  var nav = document.getElementById("navLinks");
  if (nav) nav.classList.toggle("open");
}

// ===== Wellness Timer =====
var score = 0;
var time = 1500;
var total = 1500;
var timerInterval = null;
var timerRunning = false;

function addScore() {
  score += 10;
  var el = document.getElementById("score");
  if (el) el.innerText = score;
}

function updateTimerDisplay() {
  var m = Math.floor(time / 60);
  var s = time % 60;
  var display = m + ":" + (s < 10 ? "0" : "") + s;
  var el = document.getElementById("time");
  if (el) el.innerText = display;
  var bar = document.getElementById("progress");
  if (bar) bar.style.width = ((total - time) / total) * 100 + "%";
}

function startTimer() {
  if (timerRunning) return;
  timerRunning = true;
  timerInterval = setInterval(function () {
    time--;
    updateTimerDisplay();
    if (time <= 0) {
      clearInterval(timerInterval);
      timerRunning = false;
      alert("Take a wellness break!");
      resetTimer();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
}

function resetTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
  time = total;
  updateTimerDisplay();
}

// ===== Symptom Checker =====
function checkSymptom() {
  var s = document.getElementById("symptom").value.toLowerCase();
  var r = "";
  if (s.includes("fever") || s.includes("cough"))
    r = "You should consult a General Physician.";
  else if (s.includes("skin") || s.includes("rash"))
    r = "You should consult a Dermatologist.";
  else if (s.includes("eye"))
    r = "You should consult an Ophthalmologist.";
  else if (s.includes("headache") || s.includes("head"))
    r = "You should consult a Neurologist.";
  else if (s.includes("stomach") || s.includes("digestion"))
    r = "You should consult a Gastroenterologist.";
  else if (s.trim() === "")
    r = "Please enter your symptoms first.";
  else
    r = "Consult a General Physician for further evaluation.";
  document.getElementById("result").innerText = r;
}

function fillSymptom(text) {
  var input = document.getElementById("symptom");
  if (input) {
    input.value = text;
    checkSymptom();
  }
}

// ===== Hospital Map =====
function showMap() {
  var map = document.getElementById("map");
  if (map) {
    map.style.display = "block";
    var btn = document.getElementById("mapBtn");
    if (btn) btn.style.display = "none";
  }
}

// ===== Chatbot =====
function chat() {
  var inputEl = document.getElementById("userInput");
  var input = inputEl.value.trim();
  if (!input) return;

  var chatbox = document.getElementById("chatbox");
  chatbox.innerHTML +=
    '<div class="chat-message user"><strong>You:</strong> ' + input + "</div>";

  var lower = input.toLowerCase();
  var reply = "";
  if (lower.includes("fever"))
    reply = "You might have a viral infection. Drink fluids and consult a doctor if fever persists.";
  else if (lower.includes("headache"))
    reply = "Try rest and hydration. If severe, consult a neurologist.";
  else if (lower.includes("cough"))
    reply = "It may be a cold or infection. Monitor symptoms and consult a doctor.";
  else if (lower.includes("stomach") || lower.includes("nausea"))
    reply = "It could be a digestive issue. Stay hydrated and avoid spicy food. See a doctor if it continues.";
  else if (lower.includes("skin") || lower.includes("rash"))
    reply = "It could be an allergic reaction or skin condition. A dermatologist can help.";
  else
    reply = "I'm not sure about that. Please describe your symptoms more clearly, or consult a doctor.";

  chatbox.innerHTML +=
    '<div class="chat-message bot"><strong>Doctor AI:</strong> ' + reply + "</div>";
  inputEl.value = "";
  chatbox.scrollTop = chatbox.scrollHeight;
}