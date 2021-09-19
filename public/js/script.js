let API_KEY = 'api_key=b784839cd3bba63f1b0cd722ec0b10e2&language=es';
let BASE_URL = 'https://api.themoviedb.org/3';
let API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'
+API_KEY;


const genres = [
{
  "id": 28,
  "name": "Acción"
},
{
  "id": 12,
  "name": "Aventura"
},
{
  "id": 16,
  "name": "Animación"
},
{
  "id": 35,
  "name": "Comedia"
},
{
  "id": 80,
  "name": "Crimen"
},
{
  "id": 99,
  "name": "Documental"
},
{
  "id": 18,
  "name": "Drama"
},
{
  "id": 10751,
  "name": "Familia"
},
{
  "id": 14,
  "name": "Fantasía"
},
{
  "id": 36,
  "name": "Historia"
},
{
  "id": 27,
  "name": "Terror"
},
{
  "id": 10402,
  "name": "Música"
},
{
  "id": 9648,
  "name": "Misterio"
},
{
  "id": 10749,
  "name": "Romance"
},
{
  "id": 878,
  "name": "Ciencia ficción"
},
{
  "id": 10770,
  "name": "Película de TV"
},
{
  "id": 53,
  "name": "Suspense"
},
{
  "id": 10752,
  "name": "Bélica"
},
{
  "id": 37,
  "name": "Western"
}
]


let IMG_URL = 'https://image.tmdb.org/t/p/w300';
const searchURL = BASE_URL+ '/search/movie?'+API_KEY;
const main =document.getElementById('main');
const form =document.getElementById('form');
const search = document.getElementById('search')
const tagsEl = document.getElementById('tags');
getMovies(API_URL)

var selectGenre = []
setGenre();
function setGenre() {
    tagsEl.innerHTML = ''; 

    genres.forEach(genre => {
        const t = document.createElement ('div');
        t.classList.add ('tag');
        t.id=genre.id;
        t.innerText = genre.name;
        t.addEventListener('click',() => {
            if(selectGenre.length == 0) {
                selectGenre.push(genre.id);
            } else {
                if (selectGenre.includes(genre.id)) {
                    selectGenre.forEach ((id, idx) => {
                        if (id == genre.id) {
                            selectGenre.splice(idx, 1);
                        }
                    })
                } else {
                    selectGenre.push(genre.id);

                }
            
            }
            console.log (selectGenre)
            getMovies(API_URL + '&with_genres='+ encodeURI(selectGenre.join 
            (',')))
            highlightSelection()
        } )
        tagsEl.append(t);

    } 
    )
}

function highlightSelection () {
    const tags = document.querySelectorAll('.tag');
    tags.forEach (tag => {
        tag.classList.remove('highlight')
    })



    clearBtn()
    if (selectedGenre.length !=0) {

        selectedGenre.forEach(id => {
            const highlightedTag = document.getElementById(id)
            highlightedTag.classList.add('highlight')
        })
    }
}


function clearBtn () {
    let clearBtn =document.getElementById('clear');
    if (clearBtn){
        clearBtn.classList.add('highlight')
        
    }else {
        let clear = document.createElement('div');
        clear.classList.add('tag','highlight');
        clear.id = 'clear';
        clear.innerText = 'Limpiar filtro ';
        clear.addEventListener('click', () => {
            selectGenre  = [];
            setGenre ();
            getMovies(API_URL);
        })
        tagsEl.append(clear);

    }
    
}
//Metodo con fetch para recorrer el api
function getMovies(url) {
    fetch (url).then(res  => res.json()).then(data => {
      
        console.log(data.results);
        if(data.results.length !== 0) {
            showMovies(data.results);
        }else {
            main.innerHTML ='<h1 class ="no_resultados">No se han encontrado resultados</h1>'
        }
     
    })
}


function showMovies(data) {
      main.innerHTML = '';

    data.forEach(movie => {
        const {title, poster_path, vote_average,overview} = movie;

     const peliculaEl = document.createElement('div');
     peliculaEl.classList.add('movie');
     peliculaEl.innerHTML = ` 
     <img src="${poster_path? IMG_URL+poster_path:"http://via.placeholder.com/1080x1580"}" alt="${title}">
     <div class="movie-info">
         <h3>${title}</h3>
    
     </div>
     <div class="overview">
      ${overview}
     </div>
     `
      main.appendChild(peliculaEl);  
    })
}


form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm =  search.value;
    selectGenre = [];
  setGenre();

    if(searchTerm) {
        getMovies(searchURL+'&query='+searchTerm)
    } else {
        getMovies(API_URL);
    }

})