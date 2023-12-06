// Dichiarazioni delle variabili per i timer, stato del gioco, punteggio e tempo rimanente
let gameTimer;
let countdownTimer;
let gameActive = false;
let score = 0;
let timeRemaining = 5;

// Funzione per avviare il gioco
function startGame() {
  // Resetta il gioco a uno stato iniziale
  resetGame();
  // Imposta il gioco come attivo
  gameActive = true;
  // Avvia il timer del gioco, che chiamerà la funzione updateGame ogni secondo
  gameTimer = setInterval(updateGame, 1000);
  // Disabilita il pulsante "Inizia il gioco" durante il gioco
  document.getElementById("start-btn").disabled = true;
}

// Funzione principale chiamata ogni secondo durante il gioco
function updateGame() {
  // Aggiorna il timer generale del gioco
  updateTimer();
  // Aggiorna eventuali conti alla rovescia specifici, se necessario
  updateCountdown();
}

// Funzione per aggiornare il timer generale del gioco
function updateTimer() {
  // Aggiorna il testo dell'elemento con id "timer" visualizzando il tempo rimanente
  document.getElementById("timer").innerText = "Tempo: " + timeRemaining;

  // Controlla se il tempo è scaduto
  if (timeRemaining <= 0) {
    // Chiama la funzione endGame se il tempo è scaduto
    endGame();
  } else {
    // Decrementa il tempo rimanente se il tempo non è scaduto
    timeRemaining--;
  }
}

// Funzione per eventuali conti alla rovescia specifici
function updateCountdown() {
  // Puoi inserire qui il codice per gestire eventuali conti alla rovescia specifici
}

// Funzione chiamata quando il gioco finisce
function endGame() {
  // Interrompe i timer del gioco
  clearInterval(gameTimer);
  clearInterval(countdownTimer);
  // Mostra un avviso con il punteggio finale
  alert("Il tempo è scaduto! Punteggio finale: " + score);
  // Riattiva il pulsante "Inizia il gioco"
  document.getElementById("start-btn").disabled = false;
  // Resetta il gioco a uno stato iniziale
  resetGame();
}

// Funzione per resettare il gioco a uno stato iniziale
function resetGame() {
  // Reimposta il tempo rimanente
  timeRemaining = 5;
  // Aggiorna il timer
  updateTimer();
  // Genera un nuovo colore casuale, se necessario
  generateRandomColor();
}

// Funzione per generare un colore casuale, se necessario
function generateRandomColor() {
  const colors = [
    { name: "Rosso", code: "red" },
    { name: "Giallo", code: "yellow" },
    { name: "Blu", code: "blue" },
    { name: "Verde", code: "green" },
    { name: "Arancione", code: "orange" },
    { name: "Viola", code: "purple" }
  ];

  // Mischia l'array di colori in modo casuale
  colors.sort(() => Math.random() - 0.5);

  const randomColor = colors[0];

  // Imposta il colore di sfondo del contenitore del gioco
  document.getElementById("game-container").style.backgroundColor = randomColor.code;

  // Ottieni tutti i pulsanti
  const buttons = document.getElementsByClassName("button");

  // Mischia i pulsanti in modo casuale
  const shuffledButtons = Array.from(buttons).sort(() => Math.random() - 0.5);

  // Assegna testo e colore a ciascun pulsante
  for (let i = 0; i < shuffledButtons.length; i++) {
    const button = shuffledButtons[i];
    const buttonText = button.getElementsByTagName("span")[0];

    buttonText.textContent = colors[i].name;
    button.style.backgroundColor = colors[i].code;
  }
}

// Funzione chiamata quando viene cliccato un pulsante per controllare la risposta
function checkAnswer(button) {
  // Verifica se il gioco è attivo
  if (!gameActive) {
    return;
  }

  // Ottiene il colore corretto dallo sfondo del contenitore del gioco
  const correctColor = document.getElementById("game-container").style.backgroundColor;
  // Ottiene il colore selezionato dal pulsante cliccato
  const selectedColor = button.style.backgroundColor;

  // Verifica se il colore selezionato corrisponde al colore corretto
  if (selectedColor === correctColor) {
    // Incrementa il punteggio se la risposta è corretta
    score++;
    // Aggiorna il punteggio
    updateScore();
  } else {
    // Chiama la funzione endGame se la risposta è sbagliata
    endGame();
  }

  // Resetta il gioco a uno stato iniziale per la prossima domanda
  resetGame();
}

// Funzione per aggiornare il punteggio visualizzato
function updateScore() {
  // Aggiorna il testo dell'elemento con id "score" visualizzando il punteggio corrente
  document.getElementById("score").innerText = "Punteggio: " + score;
}

// Resetta il gioco a uno stato iniziale all'avvio della pagina
resetGame();
