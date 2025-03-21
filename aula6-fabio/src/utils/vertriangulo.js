export function tipoTriangulo(lado1, lado2, lado3) {
  if (lado1 === lado2 && lado2 === lado3) {
    console.log('O triângulo é Equilátero.');
  } else if (lado1 === lado2 || lado1 === lado3 || lado2 === lado3) {
    console.log('O triângulo é Isósceles.');
  } else {
    console.log('O triângulo é Escaleno.');
  }
}