function sMars(a,b){
    return a + b;
}

console.log(sMars(2,3));
//[1:] Saludar Oscar

// Parte 1: Ejercicios de JavaScript

// 1. Saludo. Crea saludar(nombre) que devuelva "Hola, Oscar!". Prueba con varios nombres.
        
    function saludar(nombre){
        return `Hola ${nombre}!`;
        
    }

    console.log(saludar("Oscar"));
    console.log(saludar("Eliza"));
    console.log(saludar("Mario"));


// 2. Calculadora básica. Crea cuatro funciones: sumar, restar, multiplicar y dividir. 

    function sumar(a,b){
        return a + b;
    }
    console.log(sumar(8,8));
    
    
    function restar(c,d){
        return c - d;
    } 
    console.log(restar(9,2));
    
// En dividir, si el segundo número es 0, devuelve "No se puede dividir entre 0".
    function dividir(a,b){
        
        if(b === 0){
            return `No se puede dividir entre cero`
        }
        
        return a / b;

    }
    console.log(dividir(4,8));
    console.log(dividir(4,0));
    
    function multiplicar(a,b){
        return a * b;

    }
    console.log(multiplicar(4,9));
    

// 3. ¿Par o impar? Crea esPar(numero) que devuelva true o false. Pista: el operador %.
    function esPar(numero){
        if(numero % 2 === 0){
            return  true  ;            
       
        }else{
            return false ;
          
        }
    }
    console.log(esPar(5));
    console.log(esPar(45));
    

// 4. Conviértela a arrow. Reescribe las funciones de los ejercicios 1 y 3 como arrow functions.
    const Saludar=(nombre)=>{
        return `Hola ${nombre}!`
    }
    console.log(Saludar("OScar Danilo"));

    const esParArrow=(numero)=>{
        if (numero % 2 === 0){
            return   true
        }else{
            return   false
        }       

    }
    console.log(esParArrow(9));
    console.log(esParArrow(10));   
    
    const esParArrowFuncion=(numero)=> numero % 2 === 0 ;

    console.log(esParArrowFuncion(8));
    console.log(esParArrowFuncion(9));
    
    
// 5. Precio con IVA. Crea precioConIva(precio) que devuelva el precio con un 21% añadido. Luego mejórala: precioConIva(precio, iva = 21) con valor por defecto.
    const precioConIva=(precio)=>{
        return precio + (precio * 21/100)
    }
    console.log(precioConIva(100));

    const preConIvAnadido=(precio, iva=21)=>{

        return precio + (precio * iva/100)

    }
    console.log(preConIvAnadido(100,10));
    console.log(preConIvAnadido(100,4));
    
    
    

// 6. Funciones con arrays. Dado const numeros = [1, 2, 3, 4, 5, 6]:
// usa .map() para obtener el doble de cada número,
        const DobleNum=(numeros = [1,2,3,4,5,6])=>{

            return   numeros.map((n)=>n*2)
            
        }
        console.log(DobleNum());
        console.log(DobleNum([10,20]));


        const nuevaLista = [1,2,3,4,5,6,7,8,9]

        const DobleNumeros=()=>{
            return  nuevaLista.map((p)=>p*2)
        }
        console.log(DobleNumeros());
        



// usa .filter() junto con tu función esPar para quedarte solo con los pares.

          const listNumeros = [1,2,3,4,5,6,7,8]
          const pares =  listNumeros.filter(esPar)
          console.log(pares);

          const listaNumPares = listNumeros.filter((n)=> n % 2 === 0)
          console.log(listaNumPares);
          

          

            


// 7. Función que recibe otra función (reto). Crea operar(a, b, operacion) donde operacion es una función. Ejemplo: operar(4, 2, sumar) → 6. Esto es justo lo que harás en React al pasar funciones como props.
     
        const operar=(a,b,operacion)=>{
            return operacion(a,b)

        }
        console.log(operar(4,5,sumar));
        console.log(operar(6,8,multiplicar));
        console.log(operar(6,8,dividir));
        console.log(operar(46,8,restar));

    
        const potencia=(a,b)=>{
            return a**b
        }

        console.log(operar(5,4,potencia));
        

// Parte 2: Ejercicios de React
// Cuando termines los de JS, en tu proyecto de Vite:


// 8. Tu primer componente. Crea Saludo.jsx, una función que devuelva <h1>Hola, mundo</h1>, e úsalo en App.jsx.


            //         import React from 'react'

            // function Saludo({nombre}) {

            //   return (

            //     <>
            //     <div><h1>Hola {nombre}!</h1></div>
            //     </>
            //   )
            // }

            // export default Saludo

// 9. Props. Modifica Saludo para que reciba nombre por props: <Saludo nombre="Oscar" />. [Done <--]


// 10. Evento con función. Crea un botón que, al hacer clic, ejecute una función manejarClick que muestre un alert("¡Clic!").  [Done <--]


// 11. Contador con useState. Un número y dos botones: sumar 1 y restar 1. Extra: que no baje de 0.. [Done <--]

// 12. Función como prop (reto). Crea un componente Boton que reciba texto y alHacerClic por props. Desde App le pasas la función. Es el ejercicio 7, pero en React.. [Done <--]



