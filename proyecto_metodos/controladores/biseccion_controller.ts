// Controlador para Bisección
import { biseccion } from '../modelos/biseccion';
export function ejecutarBiseccion(
  f: (x: number) => number,
  a: number,
  b: number,
  tol: number,
  maxIter: number
) {
  return biseccion(f, a, b, tol, maxIter);
}
