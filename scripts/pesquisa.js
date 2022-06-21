// Chave da api do TMDB
const ptBR = '&language=pt-BR';
const API_KEY = 'api_key=250d01a9ef76763fba514ac9fcf6be88';
const BASE_URL = 'https://api.themoviedb.org/3';
const POPULAR_API = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY + ptBR;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY + ptBR;

onload = () => {
    const main = document.getElementById('main');
    const form = document.getElementById('form');
    const search = document.getElementById('search');
}


getFilmes(POPULAR_API);


function getFilmes(url) {
    fetch(url).then(res => res.json()).then(dados =>{
        console.log(dados.results);
        mostrarFilme(dados.results);
    })
}


function mostrarFilme(dados) {
    main.innerHTML = '';

    dados.forEach(filme =>{
        const {title, poster_path, vote_average, overview} = filme;
        const elementoFilme = document.createElement('div');
        elementoFilme.classList.add('movie-card');
        elementoFilme.innerHTML = `
            <img src="${IMG_URL + poster_path}" alt="${title}">

            <div class="informacoes-filme">
                <h3>${title}</h3>
                <span class="grade">${vote_average}</span>
            </div>
            <div class="review-filme">
                ${overview}
                <div class="div-btn-vermais">
                    <button id="btn-vermais" type="button">Ver Mais</button>
                </div> 
            </div>
        `
        main.appendChild(elementoFilme);
    })
}

onload = () => {
    const main = document.getElementById('main');
    const form = document.getElementById('form');
    const search = document.getElementById('search');
    const botao = document.getElementById('botaoProcurar');

    form.addEventListener('submit', (evento) => {
        evento.preventDefault();
        const itemProcurado = search.value;
        const FILME_PROCURADO = SEARCH_URL + '&query=' + itemProcurado;
    
        if(FILME_PROCURADO){
            getFilmes(FILME_PROCURADO);
        } 
        else {
            getFilmes(POPULAR_API);
        }
    })
}