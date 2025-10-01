// Controlador para Secante
import { secante } from '../modelos/secante';
export function ejecutarSecante(
  f: (x: number) => number,
  x0: number,
  x1: number,
  tol: number,
  maxIter: number
) {
  return secante(f, x0, x1, tol, maxIter);
}
