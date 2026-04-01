let falando = false;

document.addEventListener("DOMContentLoaded", () => {
    const botao = document.getElementById("btn-audio");
    const poesiaEl = document.getElementById("poesia");

    botao.addEventListener("click", () => {
        const texto = poesiaEl.innerText;

        if (!texto.trim()) return;

        if (falando) {
            speechSynthesis.cancel();
            falando = false;
            botao.textContent = "🔊";
            return;
        }

        const fala = new SpeechSynthesisUtterance(texto);

        fala.lang = "en-US";

        const vozes = speechSynthesis.getVoices();
        const vozEN = vozes.find(v => v.lang.includes("en"));

        if (vozEN) {
            fala.voice = vozEN;
        }

        fala.onend = () => {
            falando = false;
            botao.textContent = "🔊";
        };

        speechSynthesis.speak(fala);
        falando = true;
        botao.textContent = "🔇";
    });
});

async function getPoesia() {
    let response = await fetch("https://poetrydb.org/random");
    let data = await response.json();

    let poema = data[0];

    let autorURL = encodeURIComponent(poema.author);

    document.getElementById("poesia").innerHTML = `
        <h2>${poema.title}</h2>

        <h3>${poema.author}</h3>

        <p class="autor">
            <a class="wiki-autor" href="https://en.wikipedia.org/wiki/${autorURL}" target="_blank">
                Conheça mais sobre o autor
            </a>
        </p>

        <p>${poema.lines.join("<br>")}</p>
    `;

    speechSynthesis.cancel();
    falando = false;

    const botao = document.getElementById("btn-audio");
    if (botao) botao.textContent = "🔊";
}
