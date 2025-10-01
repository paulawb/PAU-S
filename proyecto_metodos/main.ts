

declare var ejecutarBiseccion: (f: (x: number) => number, a: number, b: number, tol: number, maxIter: number) => any[];
declare var ejecutarNewton: (f: (x: number) => number, df: (x: number) => number, x0: number, tol: number, maxIter: number) => any[];
declare var ejecutarSecante: (f: (x: number) => number, x0: number, x1: number, tol: number, maxIter: number) => any[];

// ...función crearFuncion ya definida arriba...

document.addEventListener('DOMContentLoaded', () => {
  const metodoSelect = document.getElementById('metodo') as HTMLSelectElement;
  const abrirModalBtn = document.getElementById('abrirModal')!;
  const modal = document.getElementById('modalMetodo')!;
  const cerrarModalBtn = document.getElementById('cerrarModal')!;
  const tituloMetodo = document.getElementById('tituloMetodo')!;
  const inputsModal = document.getElementById('inputsModal')!;
  const formularioModal = document.getElementById('formularioModal')!;
  const errorModal = document.getElementById('errorModal')!;
  const resultadosModal = document.getElementById('resultadosModal')!;
  const graficaModal = document.getElementById('graficaModal')!;

  abrirModalBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
    errorModal.style.display = 'none';
    resultadosModal.innerHTML = '';
    graficaModal.innerHTML = '';
    const metodo = metodoSelect.value;
    tituloMetodo.textContent =
      metodo === 'biseccion' ? 'Método de Bisección' :
      metodo === 'newton' ? 'Método de Newton-Raphson' :
      'Método de la Secante';
    let html = '';
    if (metodo === 'biseccion') {
      html += '<label>f(x):</label><input id="fx" type="text" placeholder="Ej: x*x-2">';
      html += '<label>a:</label><input id="a" type="number">';
      html += '<label>b:</label><input id="b" type="number">';
      html += '<label>Tolerancia:</label><input id="tol" type="number" value="0.0001">';
      html += '<label>Máx. iteraciones:</label><input id="maxIter" type="number" value="50">';
    } else if (metodo === 'newton') {
      html += '<label>f(x):</label><input id="fx" type="text" placeholder="Ej: x*x-2">';
      html += '<label>f\'(x):</label><input id="dfx" type="text" placeholder="Ej: 2*x">';
      html += '<label>x0:</label><input id="x0" type="number">';
      html += '<label>Tolerancia:</label><input id="tol" type="number" value="0.0001">';
      html += '<label>Máx. iteraciones:</label><input id="maxIter" type="number" value="50">';
    } else if (metodo === 'secante') {
      html += '<label>f(x):</label><input id="fx" type="text" placeholder="Ej: x*x-2">';
      html += '<label>x0:</label><input id="x0" type="number">';
      html += '<label>x1:</label><input id="x1" type="number">';
      html += '<label>Tolerancia:</label><input id="tol" type="number" value="0.0001">';
      html += '<label>Máx. iteraciones:</label><input id="maxIter" type="number" value="50">';
    }
    inputsModal.innerHTML = html;
  });

  cerrarModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  formularioModal.addEventListener('submit', e => {
    e.preventDefault();
    errorModal.style.display = 'none';
    resultadosModal.innerHTML = '';
    graficaModal.innerHTML = '';
    const metodo = metodoSelect.value;
    try {
      if (metodo === 'biseccion') {
        const f = crearFuncion((document.getElementById('fx') as HTMLInputElement).value);
        const a = Number((document.getElementById('a') as HTMLInputElement).value);
        const b = Number((document.getElementById('b') as HTMLInputElement).value);
        const tol = Number((document.getElementById('tol') as HTMLInputElement).value);
        const maxIter = Number((document.getElementById('maxIter') as HTMLInputElement).value);
  const res = ejecutarBiseccion(f, a, b, tol, maxIter);
        mostrarTabla(res, ['Iter','a','b','c','f(a)','f(b)','f(c)'], resultadosModal);
  graficarFuncion(f, a, b, res.map((r: any) => r.c));
      } else if (metodo === 'newton') {
        const f = crearFuncion((document.getElementById('fx') as HTMLInputElement).value);
        const df = crearFuncion((document.getElementById('dfx') as HTMLInputElement).value);
        const x0 = Number((document.getElementById('x0') as HTMLInputElement).value);
        const tol = Number((document.getElementById('tol') as HTMLInputElement).value);
        const maxIter = Number((document.getElementById('maxIter') as HTMLInputElement).value);
  const res = ejecutarNewton(f, df, x0, tol, maxIter);
        mostrarTabla(res, ['Iter','x','f(x)','f\'(x)','x1'], resultadosModal);
  graficarFuncion(f, x0-5, x0+5, res.map((r: any) => r.x));
      } else if (metodo === 'secante') {
        const f = crearFuncion((document.getElementById('fx') as HTMLInputElement).value);
        const x0 = Number((document.getElementById('x0') as HTMLInputElement).value);
        const x1 = Number((document.getElementById('x1') as HTMLInputElement).value);
        const tol = Number((document.getElementById('tol') as HTMLInputElement).value);
        const maxIter = Number((document.getElementById('maxIter') as HTMLInputElement).value);
  const res = ejecutarSecante(f, x0, x1, tol, maxIter);
        mostrarTabla(res, ['Iter','prev','curr','f(prev)','f(curr)','next'], resultadosModal);
  graficarFuncion(f, Math.min(x0,x1)-5, Math.max(x0,x1)+5, res.map((r: any) => r.next));
      }
    } catch (err) {
      errorModal.textContent = (err as Error).message;
      errorModal.style.display = 'block';
    }
  });

  function mostrarTabla(datos: any[], columnas: string[], contenedor: HTMLElement) {
    if (!datos.length) return;
    let html = '<table><thead><tr>';
    columnas.forEach(col => html += `<th>${col}</th>`);
    html += '</tr></thead><tbody>';
    datos.forEach(row => {
      html += '<tr>';
      columnas.forEach(col => {
        const key = col.replace(/[^a-zA-Z0-9_]/g, '').toLowerCase();
        html += `<td>${row[key] !== undefined ? row[key] : ''}</td>`;
      });
      html += '</tr>';
    });
    html += '</tbody></table>';
    contenedor.innerHTML = html;
  }

  function graficarFuncion(f: (x: number) => number, xmin: number, xmax: number, puntos: number[]) {
    const x = [];
    const y = [];
    for (let i = xmin; i <= xmax; i += (xmax-xmin)/100) {
      x.push(i);
      y.push(f(i));
    }
    const traceFuncion = { x, y, type: 'scatter', name: 'f(x)', line: {color: '#1976d2'} };
    const tracePuntos = { x: puntos, y: puntos.map(f), type: 'scatter', mode: 'markers', name: 'Iteraciones', marker: {color: '#d32f2f', size: 10} };
    // @ts-ignore
    Plotly.newPlot('graficaModal', [traceFuncion, tracePuntos], {margin:{t:20}, xaxis:{title:'x'}, yaxis:{title:'f(x)'}});
  }
});
