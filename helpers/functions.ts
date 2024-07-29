
import fetch from "node-fetch";
import { join } from "path";
import dotenv from 'dotenv';
import { readFileSync } from "fs";
import persona from "../api/v1/example/interfaces/persona";

dotenv.config();


export async function asyncForEach(array: any, callback: any) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export async function generateCode(lenght: number) {
  var letters: string =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+';
  var numbers: string = '1234567890';
  var code: string = '';
  //numero random entre 1 y 2
  for (var i = 0; i < lenght; i++) {
    let randomNumber = Math.floor(Math.random() * 2) + 1;
    if (randomNumber == 1) {
      var letter = letters[Math.floor(Math.random() * letters.length)];
      code += letter;
    } else {
      var number = numbers[Math.floor(Math.random() * numbers.length)];
      code += number;
    }
  }
  return code;
}

export async function passwordGenerator(largo: number): Promise<string> {
  const caracteres =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const mayuscula = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const simbolos = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  const numeros = '0123456789';
  const minuscula = 'abcdefghijklmnopqrstuvwxyz';

  let contrasena = '';

  // Agregar un carácter de cada tipo en lugares aleatorios
  contrasena +=
    mayuscula[Math.floor(Math.random() * mayuscula.length)] +
    simbolos[Math.floor(Math.random() * simbolos.length)] +
    numeros[Math.floor(Math.random() * numeros.length)] +
    minuscula[Math.floor(Math.random() * minuscula.length)];

  // Completar la contraseña con caracteres aleatorios
  for (let i = 4; i < largo; i++) {
    contrasena += caracteres[Math.floor(Math.random() * caracteres.length)];
  }

  // Mezclar los caracteres para hacer la contraseña más aleatoria
  contrasena = contrasena
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');

  return contrasena;
}


export async function CotizacionSegurosPlus(edad : number, sumaAsegurada : number, sexo : string) {
  //const filepath = join(__dirname, '../tasas/tasasVidaInsure.json');
  const apiUrl = process.env.API_URL as string;
  const user = process.env.API_USER as string;
  const password = process.env.API_PASSWORD as string;
  let data = {
    edad :edad, 
    sumaAsegurada : sumaAsegurada, 
    sexo : sexo
  }
  let response = await fetch(apiUrl, {
    method : 'POST',
    headers : {
      'Authorization': `Basic ${Buffer.from(`${user}:${password}`).toString('base64')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  

  return response.json();

  
}

export function cotizacionVidainsure(edad : number, sumaAsegurada : number, sexo : string, fumador : boolean){
  const filepath = join(__dirname, '../tasas/tasasVidaInsure.json');
  const personas = loadData(filepath);
  const personaBuscada = personas.find(item => item.Edad = edad);
  let primaAnual : number = 0;
  //console.log(personaBuscada)
  if(typeof personaBuscada !='undefined'){
    if(fumador && sexo == "M")
      primaAnual = (personaBuscada.hombreFumador/1000)*sumaAsegurada;
    else if(!fumador && sexo == "M")
      primaAnual = (personaBuscada.hombreNoFumador/1000)*sumaAsegurada;
    else if(fumador  && sexo == "F")
      primaAnual = (personaBuscada.mujerFumadora/1000)*sumaAsegurada;
    else if(!fumador  && sexo == "F")
      primaAnual = (personaBuscada.mujerNoFumadora/1000)*sumaAsegurada;
    }
  return primaAnual;
}


export function loadData(filepath : string) : persona[]{
  return JSON.parse(readFileSync(filepath, 'utf-8'));
}