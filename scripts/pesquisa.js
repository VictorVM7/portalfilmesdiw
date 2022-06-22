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
    const botao = document.getElementById('botaoProcurar');
    const overlayContent = document.getElementById('overlay-content');

    form.addEventListener('submit', (evento) => {
        evento.preventDefault();

        const itemProcurado = search.value;
        if (itemProcurado == ""){
            getFilmes(POPULAR_API);
        }
        else{
            // JUNTA O ITEM PESQUISADO COM O ITEM PESQUISADO PELO USER
            const FILME_PROCURADO = SEARCH_URL + '&query=' + itemProcurado;
            // PEGA OS DADOS DA URL FILME PROCURADO E TESTA OS VALORES
            fetch(FILME_PROCURADO).then(res => res.json()).then(dados =>{
                if (dados.results.length == []){
                    alert("Não há nenhum filme com esse nome");
                }
                else{
                    getFilmes(FILME_PROCURADO);
                }

            })
        } 
    })

    botao.addEventListener('click', (evento) => {
        evento.preventDefault();

        const itemProcurado = search.value;
        if (itemProcurado == ""){
            getFilmes(POPULAR_API);
        }
        else{
            // JUNTA O ITEM PESQUISADO COM O ITEM PESQUISADO PELO USER
            const FILME_PROCURADO = SEARCH_URL + '&query=' + itemProcurado;

            // PEGA OS DADOS DA URL FILME PROCURADO E TESTA OS VALORES
            fetch(FILME_PROCURADO).then(res => res.json()).then(dados =>{
                if (dados.results.length == []){
                    alert("Não há nenhum filme com esse nome");
                }
                else{
                    getFilmes(FILME_PROCURADO);
                }
            })
        }
        
    })
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
        const {title, poster_path, vote_average, overview, id} = filme;
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
                    <button class="btn-vermais" id="${id}" type="button">Ver Mais</button>
                </div> 
            </div>
        `
        main.appendChild(elementoFilme);
        
        document.getElementById(id).addEventListener('click', () => {
            console.log(id);
            openNav(filme);
        })
    })
}

/* Open when someone clicks on the span element */
function openNav(filme) {
    const overlayContent = document.getElementById('overlay-content');
    let id = filme.id
    fetch(BASE_URL + '/movie/' + id + '?' + API_KEY + ptBR).then(res => res.json()).then(dadosFilme => {
        console.log(dadosFilme);
        if (dadosFilme){
            document.getElementById("myNav").style.width = "100%";
            let results = [];
            results.push(dadosFilme);
            if(results){
                results.forEach(imagem => {
                    const {id, backdrop_path, vote_average, poster_path, title, overview, release_date, status} = imagem;
                    overlayContent.innerHTML = `
                    <div class="div-overlay">
                        <div class="div-imagem">
                            <img src="${IMG_URL + poster_path}" alt="${title}">
                        </div>
                        <div class="conteudo">
                                <h1>${title}</h1>
                                <h4> Data de Lançamento: </h4>${release_date}
                                <h4> Status:</h4>${status}
                                <h4> Nota do filme:</h4>${vote_average}
                            <div class="review-filme">
                                <h4> Resumo:</h4>${overview}
                            </div>
                        </div>
                    </div>
                    `;
                });
            } else {
                overlayContent.innerHTML = `<h1>No Results</h1>`;
            }
            
        }

    });
    
  }
  
  /* Close when someone clicks on the "x" symbol inside the overlay */
  function closeNav() {
    document.getElementById("myNav").style.width = "0%";
  }