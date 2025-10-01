// Método de Bisección
export function biseccion(f: (x: number) => number, a: number, b: number, tol: number, maxIter: number) {
  let iteraciones = [];
  let fa = f(a);
  let fb = f(b);
  if (fa * fb > 0) throw new Error('f(a) y f(b) deben tener signos opuestos');
  let c = a;
  for (let i = 0; i < maxIter; i++) {
    c = (a + b) / 2;
    let fc = f(c);
    iteraciones.push({ iter: i + 1, a, b, c, fa, fb, fc });
    if (Math.abs(fc) < tol || Math.abs(b - a) < tol) break;
    if (fa * fc < 0) {
      b = c;
      fb = fc;
    } else {
      a = c;
      fa = fc;
    }
  }
  return iteraciones;
}
