// Método de la Secante
window.secante = function(f, x0, x1, tol, maxIter) {
    let iteraciones = [];
    let prev = x0;
    let curr = x1;
    for (let i = 0; i < maxIter; i++) {
        let fprev = f(prev);
        let fcurr = f(curr);
        if (fcurr - fprev === 0)
            throw new Error('División por cero');
        let next = curr - fcurr * (curr - prev) / (fcurr - fprev);
        iteraciones.push({ iter: i + 1, prev, curr, fprev, fcurr, next });
        if (Math.abs(next - curr) < tol)
            break;
        prev = curr;
        curr = next;
    }
    return iteraciones;
}
