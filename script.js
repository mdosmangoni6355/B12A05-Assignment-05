// DOM Elements
const heartCountField = document.getElementById("heart-count-field");
const coinCountField = document.getElementById("coin-count");
const copyCountField = document.getElementById("copy-count-text");
const historyContainer = document.getElementById("history-container");
const noHistoryMessage = document.getElementById("no-history-message");
const clearHistoryBtn = document.getElementById("clear-history-btn");
const customModal = document.getElementById("custom-modal");
const modalMessage = document.getElementById("modal-message");
const modalCloseBtn = document.getElementById("modal-close-btn");

let heartCount = 0;
let coinCount = 100;
let copyCount = 0;

// Custom Modal Function
function showMessage(message) {
  modalMessage.innerText = message;
  customModal.style.display = "flex";
}

// Custom Modal Close Function
function closeModal() {
  customModal.style.display = "none";
}

// Updates current heart, coin, and copy counts.
function updateUI() {
  heartCountField.textContent = heartCount;
  coinCountField.textContent = coinCount;
  copyCountField.textContent = copyCount;
}

// Card Button Click Function
function handleButtonClick(event) {
  const target = event.target.closest("button, i"); // Use closest to handle clicks on child elements

  // If a heart button is clicked
  if (target && target.classList.contains("heart-btn")) {
    heartCount++;
    updateUI();
    showMessage("Heart added!");

    // If a copy button is clicked
  } else if (target && target.classList.contains("copy-btn")) {
    const numberToCopy = target.dataset.number;
    if (numberToCopy) {
      // Create a temporary textarea to hold the text to be copied
      const tempTextarea = document.createElement("textarea");
      tempTextarea.value = numberToCopy;
      document.body.appendChild(tempTextarea);
      tempTextarea.select();

      // Copy the text to the clipboard
      document.execCommand("copy");
      document.body.removeChild(tempTextarea);

      copyCount++;
      updateUI();
      showMessage(`'${numberToCopy}' copied to clipboard!`);
    }

    // When call button is clicked
  } else if (target && target.classList.contains("call-btn")) {
    if (coinCount >= 20) {
      coinCount -= 20;
      updateUI();

      const serviceName = target.dataset.serviceName;
      const serviceNumber = target.dataset.serviceNumber;
      const callTime = new Date().toLocaleTimeString();

      // Show a message in the custom modal
      showMessage(`Calling ${serviceName} (${serviceNumber}).`);

      // Create a new history item
      const historyItem = document.createElement("div");
      historyItem.classList.add(
        "bg-gray-100",
        "p-4",
        "rounded-lg",
        "flex",
        "justify-between",
        "items-center",
        "gap-1"
      );

      // Set inner HTML for the history item
      historyItem.innerHTML = `
                        <div>
                            <p>${serviceName}</p>
                            <p class="text-[#5C5C5C]">${serviceNumber}</p>
                        </div>
                        <div>
                            <p>${callTime}</p>
                        </div>
                    `;
      historyContainer.prepend(historyItem);
      updateUI();
    } else {
      showMessage("Insufficient coins to make a call.");
    }
  }
}

// Clear History Function
function clearHistory() {
  historyContainer.innerHTML = "";
  updateUI();
}

// Event Listeners
document.body.addEventListener("click", handleButtonClick);
clearHistoryBtn.addEventListener("click", clearHistory);
modalCloseBtn.addEventListener("click", closeModal);