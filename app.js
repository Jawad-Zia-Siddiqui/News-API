var apikey = '452eca8396e4465488073f48e54cd9f9';
const main = document.querySelector("#div");
const selector = document.querySelector('#selector')
const defineDefualt = "IGN"

window.addEventListener('load', async e => {
    updatedNews()
    await upadteSources()
    selector.value = defineDefualt;

    selector.addEventListener('change', e => {
        updatedNews(e.target.value)
    })


    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(() => {
                console.log('service worker')
            })
    }
})

async function upadteSources() {
    const res = await fetch(`https://newsapi.org/v2/top-headlines`);
    const json = await res.json()
    console.log(json)

    selector.innerHTML = json.sources
        .map(src => `<option value="${src.id}">${src.name}</option>`).join('\n')
}

async function updatedNews(source = defineDefualt) {
    const res = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source} &apiKey=${apikey}`);
    const json = await res.json();
    console.log(json)
    main.innerHTML = json.articles.map(createArticles).join('\n')
}

function createArticles(article) {
    return `
        <div class="col-md-8 col-md-offset-2">
            <h2 class='h2'>${article.title}</h2>
            <img class="img-rounded" width='100%' src="${article.urlToImage}"/>
            <p class='h4'>${article.description}</p>
        </div>
    `
}