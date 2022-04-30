
function renderProductos(padre, data) {
      if (data){
            const html = data.map(element => {
            return(`
                  <img src="${element.foto}" class="card-img-top" alt="...">
                  <h5 class="card-text">$${element.precio}</h5>
                  <span class="card-title">${element.nombre}</span>
            
            `)
            }).join(" ");            
            document.getElementById(padre).innerHTML = html;
      } else {
            let html = `<h4>No hay productos</h4>`;
            document.getElementById(padre).innerHTML = html;
      }
}