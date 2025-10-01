// main.js: Conexión entre la interfaz HTML y los métodos numéricos
function crearFuncion(expr) {
  return function(x) {
    try {
      return Function('x', 'return ' + expr)(x);
    } catch {
      throw new Error('Expresión inválida');
    }
  };
}

document.addEventListener('DOMContentLoaded', function() {
  var metodoSelect = document.getElementById('metodo');
  var abrirModalBtn = document.getElementById('abrirModal');
  var modal = document.getElementById('modalMetodo');
  var cerrarModalBtn = document.getElementById('cerrarModal');
  var tituloMetodo = document.getElementById('tituloMetodo');
  var inputsModal = document.getElementById('inputsModal');
  var formularioModal = document.getElementById('formularioModal');
  var errorModal = document.getElementById('errorModal');
  var resultadosModal = document.getElementById('resultadosModal');
  var graficaModal = document.getElementById('graficaModal');

  abrirModalBtn.addEventListener('click', function() {
    modal.style.display = 'flex';
    errorModal.style.display = 'none';
    resultadosModal.innerHTML = '';
    graficaModal.innerHTML = '';
    var metodo = metodoSelect.value;
    tituloMetodo.textContent =
      metodo === 'biseccion' ? 'Método de Bisección' :
      metodo === 'newton' ? 'Método de Newton-Raphson' :
      'Método de la Secante';
    var html = '';
    if (metodo === 'biseccion') {
      html += '<label>f(x):</label><input id="fx" type="text" placeholder="Ej: x*x-2">';
  html += '<label>a:</label><input id="a" type="number" step="any">';
  html += '<label>b:</label><input id="b" type="number" step="any">';
  html += '<label>Tolerancia:</label><input id="tol" type="number" step="any" value="0.0001">';
  html += '<label>Máx. iteraciones:</label><input id="maxIter" type="number" step="any" value="50">';
    } else if (metodo === 'newton') {
      html += '<label>f(x):</label><input id="fx" type="text" placeholder="Ej: x*x-2">';
      html += '<label>f\'(x):</label><input id="dfx" type="text" placeholder="Ej: 2*x">';
  html += '<label>x0:</label><input id="x0" type="number" step="any">';
  html += '<label>Tolerancia:</label><input id="tol" type="number" step="any" value="0.0001">';
  html += '<label>Máx. iteraciones:</label><input id="maxIter" type="number" step="any" value="50">';
    } else if (metodo === 'secante') {
      html += '<label>f(x):</label><input id="fx" type="text" placeholder="Ej: x*x-2">';
  html += '<label>x0:</label><input id="x0" type="number" step="any">';
  html += '<label>x1:</label><input id="x1" type="number" step="any">';
  html += '<label>Tolerancia:</label><input id="tol" type="number" step="any" value="0.0001">';
  html += '<label>Máx. iteraciones:</label><input id="maxIter" type="number" step="any" value="50">';
    }
    inputsModal.innerHTML = html;

    formularioModal.onsubmit = function(e) {
      e.preventDefault();
      errorModal.style.display = 'none';
      resultadosModal.innerHTML = '';
      graficaModal.innerHTML = '';
      var metodo = metodoSelect.value;
      // Validación de campos vacíos
      var campos = Array.from(inputsModal.querySelectorAll('input'));
      var vacio = campos.some(function(input){ return input.value === ''; });
      if (vacio) {
        errorModal.textContent = 'Por favor, completa todos los campos.';
        errorModal.style.display = 'block';
        return;
      }
      try {
        if (metodo === 'biseccion') {
          var f = crearFuncion(document.getElementById('fx').value);
          var a = Number(document.getElementById('a').value);
          var b = Number(document.getElementById('b').value);
          var tol = Number(document.getElementById('tol').value);
          var maxIter = Number(document.getElementById('maxIter').value);
          var res = window.ejecutarBiseccion(f, a, b, tol, maxIter);
          mostrarTabla(res, ['Iter','a','b','c','f(a)','f(b)','f(c)'], resultadosModal);
          graficarFuncion(f, a, b, res.map(function(r){return r.c;}));
        } else if (metodo === 'newton') {
          var f = crearFuncion(document.getElementById('fx').value);
          var df = crearFuncion(document.getElementById('dfx').value);
          var x0 = Number(document.getElementById('x0').value);
          var tol = Number(document.getElementById('tol').value);
          var maxIter = Number(document.getElementById('maxIter').value);
          var res = window.ejecutarNewton(f, df, x0, tol, maxIter);
          mostrarTabla(res, ['Iter','x','f(x)','f\'(x)','x1'], resultadosModal);
          graficarFuncion(f, x0-5, x0+5, res.map(function(r){return r.x;}));
        } else if (metodo === 'secante') {
          var f = crearFuncion(document.getElementById('fx').value);
          var x0 = Number(document.getElementById('x0').value);
          var x1 = Number(document.getElementById('x1').value);
          var tol = Number(document.getElementById('tol').value);
          var maxIter = Number(document.getElementById('maxIter').value);
          var res = window.ejecutarSecante(f, x0, x1, tol, maxIter);
          mostrarTabla(res, ['Iter','prev','curr','f(prev)','f(curr)','next'], resultadosModal);
          graficarFuncion(f, Math.min(x0,x1)-5, Math.max(x0,x1)+5, res.map(function(r){return r.next;}));
        }
      } catch (err) {
        errorModal.textContent = err.message;
        errorModal.style.display = 'block';
      }
    };
  });

  cerrarModalBtn.addEventListener('click', function() {
    modal.style.display = 'none';
  });

// Eliminado el manejador duplicado de submit

  function mostrarTabla(datos, columnas, contenedor) {
    if (!datos.length) return;
    var html = '<div class="tabla-scroll"><table><thead><tr>';
    columnas.forEach(function(col){ html += '<th>' + col + '</th>'; });
    html += '</tr></thead><tbody>';
    datos.forEach(function(row){
      html += '<tr>';
      columnas.forEach(function(col){
        var key = col.replace(/[^a-zA-Z0-9_]/g, '').toLowerCase();
        html += '<td>' + (row[key] !== undefined ? row[key] : '') + '</td>';
      });
      html += '</tr>';
    });
    html += '</tbody></table></div>';
    contenedor.innerHTML = html;
  }

  function graficarFuncion(f, xmin, xmax, puntos) {
    var x = [];
    var y = [];
    for (var i = xmin; i <= xmax; i += (xmax-xmin)/100) {
      x.push(i);
      y.push(f(i));
    }
    var traceFuncion = { x: x, y: y, type: 'scatter', name: 'f(x)', line: {color: '#1976d2'} };
    var tracePuntos = { x: puntos, y: puntos.map(f), type: 'scatter', mode: 'markers', name: 'Iteraciones', marker: {color: '#d32f2f', size: 10} };
    Plotly.newPlot('graficaModal', [traceFuncion, tracePuntos], {margin:{t:20}, xaxis:{title:'x'}, yaxis:{title:'f(x)'}});
  }
});
