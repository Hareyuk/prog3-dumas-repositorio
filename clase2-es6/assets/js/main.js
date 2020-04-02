const alumnos = [
{ nombre: 'Rodrigo Andrade', edad: 23 },

{ nombre: 'Nayla Arroyo Lizzio', edad: 32 },

{ nombre: 'Marianela De Martino', edad: 20 },

{ nombre: 'Axel Julian Dumas Cutuli', edad: 19 },

{ nombre: 'Martina Franco', edad: 22 },

{ nombre: 'Agustina Garcia Vega', edad: 24 },

{ nombre: 'María Agustina Mattioli Pacheco', edad: 19 },

{ nombre: 'Franco Picco', edad: 33 },

{ nombre: 'Alva Ramírez', edad: 27 },

{ nombre: 'Diego Salischiker', edad: 29 },

];

// 1. Obtener un array de strings con solo nombres de cada alumno usando .map()
const arrStringNombres = alumnos.map( ({nombre})=>{
    return nombre;
});
console.log("1-Lista de nombres de alumnos en array: ", arrStringNombres);

// 2. Obtener un array con aquellos alumnos mayores a 25 años usando .filter()
const arrEdadesMayores25 = alumnos.filter( ({nombre, edad})=>{
    if(edad >25) return nombre;
})
console.log("2-Lista de alumnos con edades mayores a 25 años: ", arrEdadesMayores25);


// 3. Obtener un entero con la edad total de todos los alumnos usando .reduce()
const edadTotal = alumnos.reduce( (a,b)=>{
    return a + b.edad;
},0); //Le di como valor inicial un cero a la variable "a", de lo contrario da NaN
console.log("3-Edad total de los alumnos: " + edadTotal);

// 4. Obtener en una constante la edad de "Franco Picco" usando .find() y destructuring del resultado. Investigar método includes
const {nombre, edad} = alumnos.find((alumno)=> alumno.nombre === "Franco Picco");
console.log("4-Edad de Franco Picco obtenido: ", edad);

// 5. Obtener en una constante primer alumno del array de alumnos usando destructuring y posteriormente en otra constante su nombre también
const {nombre: primerNombre, edad: primerEdad} = alumnos.find((alumno)=> alumno);
console.log("5-El primer alumno encontrado es: ", nombre, " y su edad: ", primerEdad);

// 6. Obtener un array con aquellos alumnos que empiezan con la letra "M", usando .filter()
const arrayNombresM = alumnos.filter((alumno)=>{
    let primeraLetra = alumno.nombre.substring(0,1);
    if(primeraLetra === "M") return alumno;
});
console.log("6-Lista de alumnos que empiezan con \"M\": ",  arrayNombresM);

// 7. Obtener un array agregando una propiedad/key/atributo más a cada elemento usando .map()
const arrayAlumnosPokemon = alumnos.map((alumno)=>{
    let pkmnFav;
    const {edad} = alumno;
    if(edad > 20)
    {
        pkmnFav = "bulbasaur";
    }
    else if(edad > 30)
    {
        pkmnFav = "charmander";
    }
    else
    {
        pkmnFav = "squirtle";
    }
    alumno.pkmnFav = pkmnFav;
    return alumno;
});
console.log("7-El array de alumnos con una que muestra su pokémon favorito: ", arrayAlumnosPokemon);


// 8. Obtener a partir de la constante en 3, el promedio de edad del curso dividiendo la misma por el total de alumnos
const edadPromedio = edadTotal/alumnos.length;
console.log("8-Edad promedio de los alumnos: ", edadPromedio);


//Async/Await
const  obtenerEdadPromedio = async ()=>
{
    const prom = edadTotal/alumnos.length;
    return prom;
}

const mainLogicEdadPromedio = async()=>
{
    let respuesta = await obtenerEdadPromedio();
    console.log("8-Edad promedio de los alumnos obtenidos mediante Async/Wait: ", respuesta);
}
mainLogicEdadPromedio();
// 9. Buscar una API que más te guste en https://github.com/toddmotto/public-apis pero que debajo de la columna Auth especifique "No"
console.log("9-API elegida: PokéAPI, https://pokeapi.co/");


// 10. Implementar una función getDataWithPromises que utilice la API de Promises usando .then() (investigar)
const url = "https://pokeapi.co/api/v2/pokemon/";
//Tomado desde https://stackoverflow.com/questions/51417108/how-can-i-return-the-fetch-api-results-form-a-function
async function getDataWithPromises(url) {
    return fetch(url)  // return this promise
    .then(response => response.json())
    .then(arrPokemonData => (arrPokemonData))
}

getDataWithPromises(url)
.then(arrPokemonData => {
    const {count} = arrPokemonData;
    console.log(`10-Cantidad de pokémon obtenidos por API: ${count}`);
}) 
.catch(error => console.error(`10-Error obtenido: ${error}`));

// 11. Implementar una función getDataWithAsync que utilice async / await junto con la API fetch para buscar los datos de la API elegida
const getDataWithAsync = async (api)=>
{
    const response = await fetch(api);
    const pokemon = await response.json();
    return pokemon;
}

const showPokemon = async (api, num)=>
{
    try{
    const pokemon = await getDataWithAsync(api);
    const firstPokemon = pokemon.results[num];
    const namePokemon = firstPokemon.name;
    console.log("11-Nombre del pokémon elegido de la pokédex: ", namePokemon);
    }
    catch(error){
        console.error("11-Error obtenido: ", error);
    }
}
showPokemon(url, 0);

// 12. Hiciste manejo de errores? En caso que no lo hayas hecho utiliza .catch() en la función getDataWithPromises o try / catch en la función getDataWithAsync
console.log("12- Se ha realizado manejo de errores con .catch() en el 10 y try / catch en el 11");

// 13. Si te animás un poco más mostra los datos que trajiste en el elemento div con id "content". En caso que sea un array podés iterar usando .forEach() o .map(). Para ello debes investigar y usar alguna de las siguientes APIs del DOM: querySelector(), innerHTML, textContent
let div = document.querySelector("#content");
const showNameAndImg = async (api)=>
{
    try{
        div.innerHTML = "<p>13-Lista de los primeros 20 pokémon de la pokédex:</p>"
        const pokemonList = await getDataWithAsync(api);
        const arrPokemon = pokemonList.results;
        arrPokemon.map(async (pokemonObj)=> {
            const namePokemon = pokemonObj.name;
            const dataPokemon = await getDataWithAsync(pokemonObj.url);
            const sprites = dataPokemon.sprites;
            const linkSpriteFront = sprites.front_default;
            div.innerHTML += "<p><img src='"+linkSpriteFront+"'>"+namePokemon+"</p>";
         });
    }
    catch(error){
        console.error("13-Error obtenido: ", error);
    }
}

showNameAndImg(url);
