const cardItem = props => {
    const {image, name, species, origin} = props;
    const {name: planet, url} = origin;
  return `<div class="column is-one-quarter">
        <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img src="${image}" alt="Placeholder image">
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-48x48">
                    <img src="${image}" alt="Placeholder image">
                  </figure>
                </div>
                <div class="media-content">
                  <h2 class="title is-4">${name}</h2>
                  <h3 class="subtitle is-4">${species}</h3>
                  <h4 class="p is-5">${planet}</h4>
                </div>
                <div class="buttons">
                    <button class="button is-primary open_modal">Primary</button>
              </div>
            </div>
          </div>
        </div>
    </div>  
    `;
};

const main = async () => {
    const baseURL = "https://rickandmortyapi.com/api/";
    //Parte 1: Obtener elementos de API y mostrarlos en el DOM
    try
    {
      const characters = await getCharacters(baseURL, 1, 20);
      appendElements(characters, false);
    }
    catch(error)
    {
      console.log("¡Error! ", error);
      $grid.innerHTML = "<p class='error'>Ha ocurrido un error, por favor, intente más tarde.</p>"
    }

    //parte 2: Crear un buscador de personajes
    const $submit = document.querySelector('.handle_search');
    $submit.addEventListener('click', async (event)=>
    {
        try
        {
          event.preventDefault();
          const $input = document.querySelector('.input_search');
          const valor = $input.value;
          const charactersByQuery = await getCharacterByQuery(baseURL, valor);
          console.log(charactersByQuery);
          appendElements(charactersByQuery.results, true);
        }
        catch(error)
        {
          $grid.innerHTML = "<p class='error'>Ha ocurrido un error, por favor, intente más tarde.</p>"
          console.error("¡Error! ", error);
        }
    });

    //MODAL
        const $modalOpenArr = document.querySelectorAll('.open_modal');
        console.log($modalOpenArr);
        const $modal = document.querySelector('.modal');
        const $modalClose = document.querySelector('.modal-close');
        $modalOpenArr.forEach((boton)=>
        {
            boton.addEventListener('click', ()=>
            {
                $modal.classList.add("is-active");
            })
        });

        $modalClose.addEventListener('click', ()=>{
            $modal.classList.remove('is-active');
        });
}

const getCharacterByQuery = async (baseUrl, query) =>
{
    const url = `${baseUrl}/character/?name=${query}`;
    const response = await fetch(url);
    const characters = await response.json();
    return characters;
}

const getCharacters = async (api, from, to)=>
{
    const charactersRange = Array.from({length: to - from + 1}, (_,index)=>index + 1).join(',');
    const url = `${api}character/${charactersRange}`;
    const response = await fetch(url);
    const listCharacters = response.json(); 
    return listCharacters;
}

const appendElements = async(list, emptyGrid)=>
{
    const objHtml = document.querySelector('.grid');
    if(emptyGrid) objHtml.innerHTML = '';
    if(list != undefined) list.forEach( (obj) => objHtml.innerHTML += cardItem(obj));
    else objHtml.innerHTML = "<p class='error'>¡Ha buscado un personaje que no existe en la serie!<p>"
}

const $grid = document.querySelector('.grid');
main();

/*
Ajustar la Card de personaje, mejorando el maquetado y los datos mostrados


Agregar el modal, al hacer click en un botón debe desplegar un modal con los datos del planeta y episodios en los que aparece el personaje. Un workaround posible es agregar un atributo data al botón y capturarlo como parametro para la muestra de los datos restantes


Se deben mejorar los estilos y maquetado de la app en general


Agregar una funcionalidad extra a elección del alumno


Subir a github antes de la fecha de finalización de la tarea.
*/