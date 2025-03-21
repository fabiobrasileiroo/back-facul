import * as readline from 'node:readline';

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

      if (lado1 === lado2 && lado2 === lado3) {
        console.log('O triângulo é Equilátero.');
      } else if (lado1 === lado2 || lado1 === lado3 || lado2 === lado3) {
        console.log('O triângulo é Isósceles.');
      } else {
        console.log('O triângulo é Escaleno.');
      }

      rl.close();
    });
  });
});

// calculoPerimentro(lado1, lado2,lado3)