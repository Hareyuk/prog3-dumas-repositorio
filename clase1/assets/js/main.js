/*Javascript ES6, today is the day....*/

// ECMAScript o ES, es un conjunto de especificaciones que salen año tras año.
// ECMAScript6 o ES2015, fue el conjunto de features más grande hasta el momento.


/*
1) Const y Let (Block Scope)
2) Arrow Functions
3) Modules (Imports and Exports)
4) Template Literals
5) Classes (Constructor, Super, Setters and Getters)
6) Default Parameters
7) The Spread Operator
8) Destructuring
9) Rest Operator
10) map(), filter(), reduce() 
11) Promesas, Async/Await
*/

// 1) Const y Let (Block Scope)

const miArray = [1,2,3];
let segundoArray = miArray;
segundoArray.push(4);

console.log("miArr: ", miArray);
console.log("segArr: ", segundoArray);

//2) Arrow Functions

function suma(x,y)
{
    return x+y;
}

console.log("mi suma: ", suma(2,4));

const sumaArrow = (n1, n2) => { return n1+n2;}

console.log("mi suma Arrow:", sumaArrow(2,5));

const sumaArrow2 = (num1, num2) => num1 + num2;

console.log("mi suma Arrow 2: ", sumaArrow2(2,10));

const escribeMensaje = msg => console.log("mi mensajes : ", msg);

escribeMensaje('NICE, no lleva parentesis');


//3) Modules (Imports and Exports)
import { peliculasCopadas, cantidadPeliculas} from '../js/libreriaAmiga.js';

console.log("Mis pelis: ", peliculasCopadas);
console.log("cantidad de mis peliculas: ",cantidadPeliculas);

//4) Template Literals

var nombre = 'Mike';
var saludo = "Hola";
var msg = 'Buen día';

const funcTexto = () => 'hola';

var mensajeCompleto = nombre + " " + saludo + " " + msg;

console.log(mensajeCompleto);

let nombreTL = 'Mike';
let saludoTL = "Hola";
let msgTL = 'Buen día';

let mensajeCompletoTL = `${saludoTL} es un buen dia para ser ${nombreTL} y mi func texto es: ${funcTexto()}`;
let miParrafo = "<p class='class_parrafo'>Hola, soy el 'el' Lean</p>";
const $content = document.querySelector("#content");
$content.innerHTML = miParrafo;
console.log(mensajeCompletoTL);

// `` -> '' --> ""

//5)Classes (Constructor, Super, Setters and Getters)

class Perro
{
    constructor(colorPelo, nombreDuenio, sexo, raza, tieneCollar)
    {
        this.colorPelo = colorPelo;
        this.nombreDuenio = nombreDuenio;
        this.colorPelo = colorPelo;
        this.sexo = sexo;
        this.raza = raza;
        this.tieneCollar = tieneCollar;
    }

    ladrar()
    {
        return `Mi color de pelo es ${this.colorPelo} y soy de raza ${this.raza} y ${this.tieneCollar ? 'tengo': 'no tengo'} collar`;
    }

}

const perro1 = new Perro('negro', 'Josep', 'M', 'Terrier', false);
console.log(perro1.ladrar());

//6) Default Parameters
const division = (num1 = 0,num2 = 2 ) =>     {
    if(num2 >0)
    {
        return num1/num2;
    }
    else
    {
        return false;
    }
}

console.log("mi resultado es: ", division(20));

//7)The Spread Operator

const numerosNegativos = [-100,-200,-450,-500];
const numerosPositivos = [100,300,500,720];
const numerosReales = [...numerosNegativos, ...numerosPositivos, 1000];

console.log("numeros reales: ", numerosReales);

//8) Destructuring

const clima = {
    unidad: 'Celsius',
    temperatura: 23,
    provincia: 'Buenos Aires',
    pais: 'Argentina'
}

//const temperatura = clima.temperatura;
//const provincia = clima.provincia;

const { unidad, temperatura: temp, provincia, pais} = clima;
console.log("la temp es ", temp);

//9) Rest Operator
const universidad = {
    name: 'Umai',
    website: 'https://umai.com',
    sedes: ['Caballito', 'Centro', 'Palermo'],
    director: "Wolko"
}

const {name, website, ...otrosDatos} = universidad;
console.log("nombre ", name);
console.log("Sitio web: ", website);
console.log("otros: ", otrosDatos);

//10) map(), filter(), reduce() 

const arrNumeros = [1,2,3,4,5,6,7,8,9,10,100,340];
//MAP
const arrNumerosTriplicados = arrNumeros.map( (valor)=> {
    return valor*3;
});

console.log(arrNumerosTriplicados);

//FILTER
const arrNumerosMayoresSeis = arrNumeros.filter((numero)=> {
    return numero > 6;
});
const arrNumerosMayoresASeisYMenoresADiez = arrNumeros.filter((numero)=>{
    return numero > 6 && numero < 10;
});

console.log(arrNumerosMayoresASeisYMenoresADiez);
console.log(arrNumerosMayoresSeis);

//Reduce

const totalGeneral = arrNumeros.reduce( (a, b)=>{
    return a+b;
});
console.log("Suma de todos: ", totalGeneral);


//11) Promesas, Async/Await

fetch('https://jsonplaceholder.typicode.com/users')
.then(responde => responde.json()) //primero
.then(users => { //despues hace esto. El nombre "users" podria ser cualquier otro, no hay nombre especifico. Es el nombre que le asignamos a lista de objetos de JSON.


    //console.log("mis usuarios", users);


    //Haciendo destructuring, template literals
    const nombres = users.map( ({name,email})=> {
        const mensaje = `Nombre: ${name} y su email es ${email}`;
        return mensaje;
    })


    console.log("nombres", nombres);
}).catch((error)=>{
    console.error(error);
});

//Async / Wait

async function getUsers()
{
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();
    return users;
}

const mainLogic = async () => //Se ejecuta de manera asincronica
{
    const users = await getUsers(); //Primero se ejecuta el responde, y el const users espera a que el responde responda, así luego el return espera a que el users termine y con esto se consigue. Entonces, finalmente nuestra const de users aquí espera a que se termine la función getUsers y ya obtiene los datos. ¡Yay!
    console.log("los usuarios: ", users);
}

mainLogic();

const mainLogicIds = async () => {
    try{
        const users = await getUsers();
        const userIds = users.map( ({id})=> id); //Hace return directamente con la propiedad id del user recibido
        console.log("los ids de los usuarios son: ", userIds);
    }
    catch (error)
    {
        console.error(error);
    }
}

mainLogicIds();