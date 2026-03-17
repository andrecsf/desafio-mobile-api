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
}