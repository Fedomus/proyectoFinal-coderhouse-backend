class Producto {
      constructor(data){
            this.id = parseInt(data.id); 
            this.timestamp = data.timestamp; 
            this.nombre = data.nombre; 
            this.descripcion = data.descripcion; 
            this.codigo = data.codigo; 
            this.foto = data.foto; 
            this.precio = data.precio; 
            this.stock = data.stock;
      }
}

const btnCargarProducto = document.querySelector('#cargarProducto');
const btnVerProductos = document.querySelector('#verProductos');
const btnverCarrito = document.querySelector('#verCarrito');

btnCargarProducto.onclick = () => {
      document.querySelector('#app').innerHTML = `
      <form class="form" action="/api/productos" method="post">
                  <h1>Ingresar Producto</h1>
                  <div class="mb-3">
                        <label for="nombre" class="form-label">Nombre</label>
                        <input type="text" class="form-control" id="nombre" name="nombre">
                  </div>
                  <div class="mb-3">
                        <label for="descripcion" class="form-label">Descripcion</label>
                        <textarea class="form-control" id="descripcion" name="descripcion" rows="3"></textarea>
                  </div>
                  <div class="mb-3">
                        <label for="codigo" class="form-label">Codigo</label>
                        <input type="text" class="form-control" id="codigo" name="codigo">
                  </div>
                  <div class="mb-3">
                        <label for="foto" class="form-label">URL Imagen</label>
                        <input type="text" class="form-control" id="foto" name="foto">
                  </div>
                  <div class="mb-3">
                        <label for="precio" class="form-label">Precio</label>
                        <input type="number" class="form-control" id="precio" name="precio">
                  </div>
                  <div class="mb-3">
                        <label for="stock" class="form-label">Stock</label>
                        <input type="number" class="form-control" id="stock" name="stock">
                  </div>
                  <input type="submit" value="Enviar">
            </form>
      `
}

function renderProductos(productos){
      const html = productos.map((elem, index) => {
                  return(`
                  <div class="card">
                        <img src="${elem.foto}" class="card-img-top img-cards">
                        <h5 class="card-text">$${elem.precio}</h5>
                        <span class="card-title">${elem.nombre}</span>
                        <form action="/api/carrito/1/productos" method="post">
                              <button type="submit" name="" value="${elem.id}" class="btn btn-link">Agregar al carrito</button>
                        </form>
                  </div>`)
      })
      document.querySelector('#app').innerHTML = html;
}


btnVerProductos.onclick = async () => { 
      const productos = [];
      await fetch('http://localhost:8080/api/productos')
      .then( response => response.json())
      .then( data => {
            data.productos.map(producto => productos.push(new Producto(producto)));;
      }).catch( mensaje => console.error(mensaje));
      renderProductos(productos)
}


