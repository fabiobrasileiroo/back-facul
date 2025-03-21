import * as readline from 'node:readline';
import { tipoTriangulo } from './vertriangulo.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Digite o lado 1: ', (lado1) => {
  rl.question('Digite o lado 2: ', (lado2) => {
    rl.question('Digite o lado 3: ', (lado3) => {
      lado1 = parseFloat(lado1);
      lado2 = parseFloat(lado2);
      lado3 = parseFloat(lado3);

      
      tipoTriangulo(lado1,lado2,lado3)
      rl.close();
    });
  });
});

export function calculoPerimentro(lado1, lado2, lado3) {
  let perimentro = lado1 + lado2 + lado3
  console.log("perimentro",perimentro)
}