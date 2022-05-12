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

class ProductoModel {
      constructor(){
            this.productos = [];
            fetch('http://localhost:8080/api/productos')
            .then( response => response.json())
            .then( data => {
                  data.productos.map(producto => this.productos.push(new Producto(producto)));;
            })
      }
      buscarProducto(id){
            return this.productos.find( producto => producto.id == id);
      }
}

class ProductoView {
      renderForm(padre){
            document.querySelector(padre).innerHTML = `
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

      renderProductos(padre, productos, callback){
            const html = productos.map((elem, index) => {
                  return(`
                  <div class="card" id="${elem.id}">
                        <img src="${elem.foto}" class="card-img-top img-cards">
                        <h5 class="card-text">$${elem.precio}</h5>
                        <span class="card-title">${elem.nombre}</span>
                  </div>`)
            })
            document.querySelector(padre).innerHTML = html;
            document.querySelectorAll(".card").forEach(b => b.onclick = callback);
      }
      verProducto(padre, producto) {
            let listaStock = [];
            for (let i = 1; i <= producto.stock; i++){
                  listaStock.push(i)
            }
            const html = `
                        <h4 id="${producto.id}">${producto.nombre}</h4>
                        <h5>$${producto.precio}</h5>
                        <span>Descripcion</span>
                        <br>
                        <p>Cantidad:</p>
                        <select id="cantidad" class="form-select form-select-sm" aria-label=".form-select-sm example">
                              <option>${listaStock.join("</option><option>")}</option>
                        </select>
                        <br>
                        <button class="btn btn-primary btnComprar">Comprar</button>
                         `
            document.querySelector(padre).innerHTML = html;
      }
}


class ProductoController {
      constructor(productoModel, productoView) {
            this.productoModel = productoModel;
            this.productoView = productoView;
      }
      mostrarForm(padre) {
            this.productoView.renderForm(padre)
      }

      mostrarProductos(padre) {
            const eventoVerProducto = (e) => {
                  let id = e.target.parentNode.id;
                  let seleccion = this.productoModel.buscarProducto(id);
                  this.productoView.verProducto(padre, seleccion);
            }
            this.productoView.renderProductos(padre, this.productoModel.productos, eventoVerProducto)
      }
}

const app = new ProductoController(new ProductoModel(), new ProductoView());

const btnCargarProducto = document.querySelector('#cargarProducto');
const btnVerProductos = document.querySelector('#verProductos');
const btnverCarrito = document.querySelector('#verCarrito');

btnVerProductos.onclick = () => {app.mostrarProductos('#app')}
btnCargarProducto.onclick = () => {app.mostrarForm('#app')}

