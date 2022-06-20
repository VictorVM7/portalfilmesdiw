// Chave da api do TMDB
const API_KEY = 'api_key=250d01a9ef76763fba514ac9fcf6be88';
const BASE_URL = 'https://api.themoviedb.org/3';
const POPULAR_API = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;

getFilmes(POPULAR_API);

function getFilmes(url) {
    fetch(url).then(res => res.json()).then(data =>{
        
    })
}