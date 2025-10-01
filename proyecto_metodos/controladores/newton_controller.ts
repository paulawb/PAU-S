// Controlador para Newton-Raphson
import { newtonRaphson } from '../modelos/newton';
export function ejecutarNewton(
  f: (x: number) => number,
  df: (x: number) => number,
  x0: number,
  tol: number,
  maxIter: number
) {
  return newtonRaphson(f, df, x0, tol, maxIter);
}
