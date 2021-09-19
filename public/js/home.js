
let seleccionado=document.getElementById("combo");
let seleccionar=seleccionado.value;
console.log(seleccionar);

const main = document.querySelector("#main2");
const FiltroGenero = document.querySelector("#FiltroGenero");
let contenedorgeneros=document.querySelector("#checkgenero");
let contenedorAnios=document.querySelector("#FiltroAnio");
let FiltroAnios=document.querySelector("#checkanio");
let ContenedorClasificacion=document.querySelector("#FiltroClasificacion");
let contenedorEnCines=document.querySelector("#FiltroEnCines")
let ContenedorAdultos=document.querySelector("#FiltroAdultos")
let contenedorSeriesTV=document.querySelector("#FiltroSeries")
function Obtener()
{
  let crearListaGeneros="";
  let crearListaAnios="";
  let SeleccionGenero=document.getElementById("combo").value;
 

  console.log(SeleccionGenero);
//Mostrar Todo
  if(SeleccionGenero==="Todo"){
    contenedorEnCines.innerHTML="";
    ContenedorClasificacion.innerHTML="";
    contenedorgeneros.innerHTML="";
    contenedorAnios.innerHTML="";
    FiltroAnios.innerHTML="";
    contenedorSeriesTV.innerHTML="";
    ContenedorAdultos.innerHTML="";
    main.innerHTML="";
    //obtiene la referencia al contenedor main


/* consigue el listado de generos */
fetch(
  genres_list_http +
    new URLSearchParams({
      api_key: api_key,
      language:"es"
    })
)
  .then((res) => res.json())
  .then((data) => {
    data.genres.forEach((item) => {
      fetchListaPeliculasPorGenero(item.id, item.name);
    });
  });

const fetchListaPeliculasPorGenero = (id, genres) => {
  fetch(
    movie_genres_http +
      new URLSearchParams({
        api_key: api_key,
        with_genres: id,
        language:"es",
        page: Math.floor(Math.random() * 3) + 1, //trae pagina al azar
      })
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      construirElementoCategoria(`Peliculas_de_${genres}`, data.results);
    })
    .catch((err) => console.log(err));
};

/* crea el titulo de categoria */
const construirElementoCategoria = (category, data) => {
  main.innerHTML += `
    <div class="movie-list">
        <button class="pre-btn"> <img src="img/pre.png" alt=""></button>
          
          <h1 class="movie-category">${category.split("_").join(" ")}</h1>

          <div class="movie-container" id="${category}">
          </div>

        <button class="nxt-btn"> <img src="img/nxt.png" alt=""> </button>
    </div>
    `;
  construirTarjetas(category, data);
};

const construirTarjetas = (id, data) => {
  const movieContainer = document.getElementById(id);
  data.forEach((item, i) => {
    if (item.backdrop_path == null) {
      item.backdrop_path = item.poster_path;
      if (item.backdrop_path == null) {
        return;
      }
    }

    movieContainer.innerHTML += `
        <div class="movie" onclick="location.href = '/${item.id}'">
            <img src="${img_url}${item.backdrop_path}" alt="">
            <p class="movie-title">${item.title}</p>
        </div>
        `;

    if (i == data.length - 1) {
      setTimeout(() => {
        setupScrolling();
      }, 100);
    }
  });
};

 
  //Filtrar Por Genero
}else if(SeleccionGenero==="Genero"){
  contenedorEnCines.innerHTML="";
  ContenedorClasificacion.innerHTML="";
  contenedorgeneros.innerHTML="";
  contenedorAnios.innerHTML="";
  FiltroAnios.innerHTML="";
  contenedorSeriesTV.innerHTML="";
  ContenedorAdultos.innerHTML="";
  main.innerHTML="";
FiltroAnios.innerHTML="";
  fetch(
    genres_list_http +
      new URLSearchParams({
        api_key: api_key,
        language:"es-MX"
      })
  )
    .then((res) => res.json())
    .then((data) => {
      data.genres.forEach((item) => {
        checkgener(item.name,item.id);
        IdGeneros.push(item.id);
        console.log(item.name);
      });
    });

    const checkgener=(genero,id)=>{
//Creadndo Lista de Generos
crearListaGeneros+=`<br><input type="checkbox" id=${id} value=${genero}>${genero}</label>`;

contenedorgeneros.innerHTML=crearListaGeneros;
    }
    //Filtrar por año
}else if(SeleccionGenero==="Año"){
  ContenedorClasificacion.innerHTML="";
  main.innerHTML="";
  FiltroGenero.innerHTML="";
  contenedorgeneros.innerHTML="";
for(i=1980;i<=2023;i++){
crearListaAnios+=`<br><input type="checkbox" id=${i} value=${i}>${i}</label>`

}
console.log(crearListaAnios);
FiltroAnios.innerHTML=crearListaAnios;
//Filtrar por Clasificacion R
}else if(SeleccionGenero==="Clasificacion R"){
  contenedorEnCines.innerHTML="";
  ContenedorClasificacion.innerHTML="";
  contenedorgeneros.innerHTML="";
  contenedorAnios.innerHTML="";
  FiltroAnios.innerHTML="";
  contenedorSeriesTV.innerHTML="";
  ContenedorAdultos.innerHTML="";
  main.innerHTML="";
  //obtiene la referencia al contenedor main


/* consigue el listado de generos */


const fetchListaPeliculasPorClasificacion= (id, genres) => {
fetch(
  movies_certification +"&"+
    new URLSearchParams({
      api_key: api_key,
      language:"es-MX",
      page: Math.floor(Math.random() * 3) + 1, //trae pagina al azar
    })
)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    construirElementoCategoria(`Peliculas_de_Clasificacion_R`, data.results);
  })
  .catch((err) => console.log(err));
};
fetchListaPeliculasPorClasificacion();
/* crea el titulo de categoria */
const construirElementoCategoria = (category, data) => {
ContenedorClasificacion.innerHTML += `
  <div class="movie-list">
      <button class="pre-btn"> <img src="img/pre.png" alt=""></button>
        
        <h1 class="movie-category">${category.split("_").join(" ")}</h1>

        <div class="movie-container" id="${category}">
        </div>

      <button class="nxt-btn"> <img src="img/nxt.png" alt=""> </button>
  </div>
  `;
construirTarjetas(category, data);
};

const construirTarjetas = (id, data) => {
const movieContainer = document.getElementById(id);
data.forEach((item, i) => {
  if (item.backdrop_path == null) {
    item.backdrop_path = item.poster_path;
    if (item.backdrop_path == null) {
      return;
    }
  }

  movieContainer.innerHTML += `
      <div class="movie" onclick="location.href = '/${item.id}'">
          <img src="${img_url}${item.backdrop_path}" alt="">
          <p class="movie-title">${item.title}</p>
      </div>
      `;

  if (i == data.length - 1) {
    setTimeout(() => {
      setupScrolling();
    }, 100);
  }
});
};
//Mostrando peliculas que se estan presentando en Cines
}else if(SeleccionGenero==="En Cines"){
  contenedorEnCines.innerHTML="";
  ContenedorClasificacion.innerHTML="";
  contenedorgeneros.innerHTML="";
  contenedorAnios.innerHTML="";
  FiltroAnios.innerHTML="";
  contenedorSeriesTV.innerHTML="";
  ContenedorAdultos.innerHTML="";
  main.innerHTML="";
  //obtiene la referencia al contenedor main


/* consigue el listado de generos */


const fetchListaPeliculasPorCine= (id, genres) => {
fetch(
  movies_cines +"&"+
    new URLSearchParams({
      api_key: api_key,
      language:"es-MX",
      page: Math.floor(Math.random() * 3) + 1, //trae pagina al azar
    })
)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    construirElementoCategoria(`Peliculas_Mostrandose_En_Cines`, data.results);
  })
  .catch((err) => console.log(err));
};
fetchListaPeliculasPorCine();
/* crea el titulo de categoria */
const construirElementoCategoria = (category, data) => {
contenedorEnCines.innerHTML += `
  <div class="movie-list">
      <button class="pre-btn"> <img src="img/pre.png" alt=""></button>
        
        <h1 class="movie-category">${category.split("_").join(" ")}</h1>

        <div class="movie-container" id="${category}">
        </div>

      <button class="nxt-btn"> <img src="img/nxt.png" alt=""> </button>
  </div>
  `;
construirTarjetas(category, data);
};

const construirTarjetas = (id, data) => {
const movieContainer = document.getElementById(id);
data.forEach((item, i) => {
  if (item.backdrop_path == null) {
    item.backdrop_path = item.poster_path;
    if (item.backdrop_path == null) {
      return;
    }
  }

  movieContainer.innerHTML += `
      <div class="movie" onclick="location.href = '/${item.id}'">
          <img src="${img_url}${item.backdrop_path}" alt="">
          <p class="movie-title">${item.title}</p>
      </div>
      `;

  if (i == data.length - 1) {
    setTimeout(() => {
      setupScrolling();
    }, 100);
  }
});
};
}else if(SeleccionGenero==="Para Adultos"){
  contenedorEnCines.innerHTML="";
  ContenedorClasificacion.innerHTML="";
  contenedorgeneros.innerHTML="";
  contenedorAnios.innerHTML="";
  FiltroAnios.innerHTML="";
  contenedorSeriesTV.innerHTML="";
  ContenedorAdultos.innerHTML="";
  main.innerHTML="";
  //obtiene la referencia al contenedor main
  const fetchListaPeliculasPorAdulto = () => {
    fetch(
      movies_adultos +
        new URLSearchParams({
          api_key: api_key,
          language:"es-MX",
          adult:true,
          page: Math.floor(Math.random() * 3) + 1, //trae pagina al azar
        })
    )
      .then((res) => res.json())
      .then((data) => {
       
        //console.log(data.results[0].release_date.split("-")[0]+Anio);
       
        construirElementoCategoria(`Peliculas_Para_Adultos`, data.results);
      })
      .catch((err) => console.log(err));
  };
  fetchListaPeliculasPorAdulto();
  /* crea el titulo de categoria */
  const construirElementoCategoria = (category, data) => {
  ContenedorAdultos.innerHTML += `
    <div class="movie-list">
        <button class="pre-btn"> <img src="img/pre.png" alt=""></button>
          
          <h1 class="movie-category">${category.split("_").join(" ")}</h1>
  
          <div class="movie-container" id="${category}">
          </div>
  
        <button class="nxt-btn"> <img src="img/nxt.png" alt=""> </button>
    </div>
    `;
  construirTarjetas(category, data);
  };
  
  const construirTarjetas = (id, data) => {
  const movieContainer = document.getElementById(id);
  data.forEach((item, i) => {
    if (item.backdrop_path == null) {
      item.backdrop_path = item.poster_path;
      if (item.backdrop_path == null) {
        return;
      }
    }
  
    movieContainer.innerHTML += `
        <div class="movie" onclick="location.href = '/${item.id}'">
            <img src="${img_url}${item.backdrop_path}" alt="">
            <p class="movie-title">${item.title}</p>
        </div>
        `;
  
    if (i == data.length - 1) {
      setTimeout(() => {
        setupScrolling();
      }, 100);
    }
  });
  }; 

/* consigue el listado de generos */



}else if(SeleccionGenero==="Series de TV"){
  contenedorEnCines.innerHTML="";
  ContenedorClasificacion.innerHTML="";
  contenedorgeneros.innerHTML="";
  contenedorAnios.innerHTML="";
  FiltroAnios.innerHTML="";
  contenedorSeriesTV.innerHTML="";
  ContenedorAdultos.innerHTML="";
  main.innerHTML="";
  const fetchListaSeries = () => {
    fetch(
      programas_tv +
        new URLSearchParams({
          api_key: api_key,
          language:"es-MX",
          page: Math.floor(Math.random() * 3) + 1, //trae pagina al azar
        })
    )
      .then((res) => res.json())
      .then((data) => {
  
        //console.log(data.results[0].release_date.split("-")[0]+Anio);
        
        construirElementoCategoria(`Series_De_TV`, data.results);
      })
      .catch((err) => console.log(err));
  };
  fetchListaSeries();
  /* crea el titulo de categoria */
  const construirElementoCategoria = (category, data) => {
  contenedorSeriesTV.innerHTML += `
    <div class="movie-list">
        <button class="pre-btn"> <img src="img/pre.png" alt=""></button>
          
          <h1 class="movie-category">${category.split("_").join(" ")}</h1>
  
          <div class="movie-container" id="${category}">
          </div>
  
        <button class="nxt-btn"> <img src="img/nxt.png" alt=""> </button>
    </div>
    `;
  construirTarjetas(category, data);
  };
  
  const construirTarjetas = (id, data) => {
  const movieContainer = document.getElementById(id);
  data.forEach((item, i) => {
    if (item.backdrop_path == null) {
      item.backdrop_path = item.poster_path;
      if (item.backdrop_path == null) {
        return;
      }
    }
  
    movieContainer.innerHTML += `
        <div class="movie" onclick="location.href = '/${item.id}'">
            <img src="${img_url}${item.backdrop_path}" alt="">
            <p class="movie-title">${item.name}</p>
        </div>
        `;
  
    if (i == data.length - 1) {
      setTimeout(() => {
        setupScrolling();
      }, 100);
    }
  });
  }; 
  
}
//Arreglo con IDs


console.log(IdGeneros);


}
let IdGeneros=[];
let IdGenerosClasificados=[];


//Funcion para Evaluar los checkbox
function check(){
  let seleccionItems=document.getElementById("combo").value;

  if(seleccionItems==="Genero"){
  FiltroGenero.innerHTML="";
  IdGenerosClasificados=[];
  for(i=0;i<IdGeneros.length;i++){
  var gener=document.getElementById(IdGeneros[i]);
  if (gener.checked){
    IdGenerosClasificados.push(IdGeneros[i]);
    
  }
  }
  console.log(IdGenerosClasificados);
  fetch(
    genres_list_http +
      new URLSearchParams({
        api_key: api_key,
        language:"es-MX"
      })
  )
    .then((res) => res.json())
    .then((data) => {
      data.genres.forEach((item) => {
        for(i=0;i<IdGenerosClasificados.length;i++){
          if(item.id==IdGenerosClasificados[i]){
            fetchListaPeliculasPorGeneroClasificado(item.id, item.name);
          }
        }
        
      });
    });
  
  const fetchListaPeliculasPorGeneroClasificado = (id, genres) => {
    fetch(
      movie_genres_http +
        new URLSearchParams({
          api_key: api_key,
          with_genres: id,
          language:"es-MX",
          page: Math.floor(Math.random() * 3) + 1, //trae pagina al azar
        })
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      
        construirElementoCategoria(`Peliculas_de_${genres}`, data.results);
      })
      .catch((err) => console.log(err));
  };
  /* crea el titulo de categoria */
const construirElementoCategoria = (category, data) => {
  FiltroGenero.innerHTML += `
    <div class="movie-list">
        <button class="pre-btn"> <img src="img/pre.png" alt=""></button>
          
          <h1 class="movie-category">${category.split("_").join(" ")}</h1>

          <div class="movie-container" id="${category}">
          </div>

        <button class="nxt-btn"> <img src="img/nxt.png" alt=""> </button>
    </div>
    `;
  construirTarjetas(category, data);
};

const construirTarjetas = (id, data) => {
  const movieContainer = document.getElementById(id);
  data.forEach((item, i) => {
    if (item.backdrop_path == null) {
      item.backdrop_path = item.poster_path;
      if (item.backdrop_path == null) {
        return;
      }
    }

    movieContainer.innerHTML += `
        <div class="movie" onclick="location.href = '/${item.id}'">
            <img src="${img_url}${item.backdrop_path}" alt="">
            <p class="movie-title">${item.title}</p>
        </div>
        `;

    if (i == data.length - 1) {
      setTimeout(() => {
        setupScrolling();
      }, 100);
    }
  });
};}else if(seleccionItems==="Año"){
  contenedorAnios.innerHTML="";
  
  AniosClasificados=[];
  for(i=1980;i<=2023;i++){
  var Anio=document.getElementById(`${i}`);
  if (Anio.checked){
    AniosClasificados.push(i);
    
  }
  }
  console.log(AniosClasificados);
  
  
  const fetchListaPeliculasPorAnio = (Anio) => {
    fetch(
      movie_genres_http +
        new URLSearchParams({
          api_key: api_key,
          language:"es-MX",
          page: Math.floor(Math.random() * 3) + 1, //trae pagina al azar
        })
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results);
        console.log(data);
        var datosporanio=[]
        //console.log(data.results[0].release_date.split("-")[0]+Anio);
        for(i=0;i<data.results.length;i++){

          if(parseInt(data.results[i].release_date.split("-")[0])===Anio){
            datosporanio.push(data.results[i]);
            console.log(datosporanio);
          }
          console.log(datosporanio);
        }
        console.log(datosporanio);
        construirElementoCategoria(`Peliculas_del_Año_${Anio}`, datosporanio);
      })
      .catch((err) => console.log(err));
  };
  for(i=0;i<AniosClasificados.length;i++){
    fetchListaPeliculasPorAnio(parseInt(AniosClasificados[i]))
  }
  /* crea el titulo de categoria */
const construirElementoCategoria = (category, data) => {
  contenedorAnios.innerHTML += `
    <div class="movie-list">
        <button class="pre-btn"> <img src="img/pre.png" alt=""></button>
          
          <h1 class="movie-category">${category.split("_").join(" ")}</h1>

          <div class="movie-container" id="${category}">
          </div>

        <button class="nxt-btn"> <img src="img/nxt.png" alt=""> </button>
    </div>
    `;
  construirTarjetas(category, data);
};

const construirTarjetas = (id, data) => {
  const movieContainer = document.getElementById(id);
  data.forEach((item, i) => {
    if (item.backdrop_path == null) {
      item.backdrop_path = item.poster_path;
      if (item.backdrop_path == null) {
        return;
      }
    }

    movieContainer.innerHTML += `
        <div class="movie" onclick="location.href = '/${item.id}'">
            <img src="${img_url}${item.backdrop_path}" alt="">
            <p class="movie-title">${item.title}</p>
        </div>
        `;

    if (i == data.length - 1) {
      setTimeout(() => {
        setupScrolling();
      }, 100);
    }
  });
};

}
  }
  
