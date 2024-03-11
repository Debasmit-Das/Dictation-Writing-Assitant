let voices = [];
let voiceSelect = document.querySelector("select");
let speedSlider = document.getElementById("speedSlider");
let pauseSlider = document.getElementById("pauseSlider");
let textArea = document.querySelector("textarea");
let speakButton = document.querySelector("button");

let currentIndex = 0;
let textParts = [];
let isSpeaking = false;

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
    if (!isSpeaking) {
        textParts = textArea.value.split(/\s+/); // Split text into words
        currentIndex = 0;
        isSpeaking = true;
        speakNextPart();
    }
});

stopButton.addEventListener("click", () => {
    isSpeaking = false;
    window.speechSynthesis.cancel();
});

function speakNextPart() {
    if (currentIndex < textParts.length && isSpeaking) {
        let speech = new SpeechSynthesisUtterance();
        let wordsToSpeak = textParts.slice(currentIndex, currentIndex + parseInt(wordCountSlider.value)).join(" ");
        speech.text = wordsToSpeak;
        if (voices.length > 0) {
            speech.voice = voices[voiceSelect.value];
        }
        speech.rate = speedSlider.value;

        window.speechSynthesis.speak(speech);
        currentIndex += parseInt(wordCountSlider.value);

        // Set a timeout to start the next part after the current one finishes
        setTimeout(speakNextPart, pauseSlider.value * 1000);
    } else {
        isSpeaking = false;
    }
}
