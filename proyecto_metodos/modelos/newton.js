// Método de Newton-Raphson
window.newtonRaphson = function(f, df, x0, tol, maxIter) {
    let iteraciones = [];
    let x = x0;
    for (let i = 0; i < maxIter; i++) {
        let fx = f(x);
        let dfx = df(x);
        if (dfx === 0)
            throw new Error('La derivada es cero');
        let x1 = x - fx / dfx;
        iteraciones.push({ iter: i + 1, x, fx, dfx, x1 });
        if (Math.abs(x1 - x) < tol)
            break;
        x = x1;
    }
    return iteraciones;
}
