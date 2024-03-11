let voices = [];
let voiceSelect = document.querySelector("select");
let speedSlider = document.getElementById("speedSlider");
let pauseSlider = document.getElementById("pauseSlider");
let textArea = document.querySelector("textarea");
let speakButton = document.querySelector("button");

let currentIndex = 0;
let textParts = [];

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    voiceSelect.options.length = 0; // Clear existing options
    voices.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)));
};

voiceSelect.addEventListener("change", () => {
    if (voices.length > 0) {
        speech.voice = voices[voiceSelect.value];
    }
});

speedSlider.addEventListener("input", () => {
    speech.rate = speedSlider.value;
});

pauseSlider.addEventListener("input", () => {
    // Adjust the pause duration here if needed
});

speakButton.addEventListener("click", () => {
    textParts = textArea.value.split(/[\s]+/); // Split text into parts based on whitespace
    currentIndex = 0;
    speakNextPart();
});

function speakNextPart() {
    if (currentIndex < textParts.length) {
        let speech = new SpeechSynthesisUtterance();
        speech.text = textParts[currentIndex];
        if (voices.length > 0) {
            speech.voice = voices[voiceSelect.value];
        }
        speech.rate = speedSlider.value;

        window.speechSynthesis.speak(speech);
        currentIndex++;

        // Set a timeout to start the next part after the current one finishes
        setTimeout(speakNextPart, pauseSlider.value * 1000);
    }
}
