let speech = new SpeechSynthesisUtterance();

let voices = [] ;
let voiceSelect = document.querySelector("select");
let speedSlider = document.getElementById("speedSlider");
let pauseSlider = document.getElementById("pauseSlider");


window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];
    voices.forEach((voice,i) => (voiceSelect.options[i] = new Option(voice.name,i)))
};

voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
})

speedSlider.addEventListener("input", () => {
    speech.rate = speedSlider.value;
});

pauseSlider.addEventListener("input", () => {
    speech.pauseAfter = pauseSlider.value;
});

document.querySelector("button").addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
})

