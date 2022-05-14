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


fetch('http://localhost:8080/api/productos')
.then( response => response.json())
.then( data => {
      const productos = data.productos.map(producto => {return producto})
      localStorage.setItem('productos', JSON.stringify(productos));
})
.catch((err) => console.log(err))

fetch('http://localhost:8080/api/carrito/1/productos')
.then( response => response.json())
.then( data => {
      const carrito = data.map(producto => {return producto})
      localStorage.setItem('carrito', JSON.stringify(carrito));
})
.catch((err) => console.log(err))


class ProductoModel {

      constructor(){
            const productos = JSON.parse(localStorage.getItem('productos')) || [];
            this.productos = productos.map(producto => new Producto(producto));
            const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
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

      renderProductos(padre, productos){
            console.log(productos);
            const html = productos.map(producto => {
                        return(`<div class="card" id="">
                                    <img src="${producto.foto}" class="card-img-top img-cards">
                                    <div class="card-body">
                                          <h5 class="card-text">$${producto.precio}</h5>
                                          <p class="card-text">${producto.descripcion}</p>
                                          <form action="/api/carrito/1/productos" method="post">
                                                <button id="" type="submit" class="btn agregar" name="id" value="${producto.id}">Agregar</button>
                                          </form>
                                          <form>
                                                <input id="${producto.id}" type="submit" class="btn editar" name="editar" value="editar">
                                          </form>
                                          <fOrm>
                                                <input id="${producto.id}" type="submit" class="btn eliminar" name="eliminar" value="eliminar">
                                          </form>
                                    </div>       
                              </div>`)
            })
            document.querySelector(padre).innerHTML = html;
      }

      // verProducto(padre, producto) {
      //       let listaStock = [];
      //       for (let i = 1; i <= producto.stock; i++){
      //             listaStock.push(i)
      //       }
      //       const html = `
      //                   <h4 id="${producto.id}">${producto.nombre}</h4>
      //                   <h5>$${producto.precio}</h5>
      //                   <span>Descripcion</span>
      //                   <br>
      //                   <p>Cantidad:</p>
      //                   <select id="cantidad" class="form-select form-select-sm" aria-label=".form-select-sm example">
      //                         <option>${listaStock.join("</option><option>")}</option>
      //                   </select>
      //                   <br>
      //                   <button class="btn btn-primary btnComprar">Comprar</button>
      //                    `
      //       document.querySelector(padre).innerHTML = html;
      // }

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
            // const eventoVerProducto = (e) => {
            //       let id = e.target.id;
            //       let seleccion = this.productoModel.buscarProducto(id);
            //       this.productoView.verProducto(padre, seleccion);
            // }
            this.productoView.renderProductos(padre, this.productoModel.productos)
      }
      mostrarCarrito(padre) {
            this.productoView.renderCarrito(padre, this.productoModel.carrito)
      }

}


const app = new ProductoController(new ProductoModel(), new ProductoView());

const routes = [
      { path: 'http://localhost:8080/', action: 'show' },
      { path: 'http://localhost:8080/agregar-producto', action: 'add'},
      { path: 'http://localhost:8080/ver-productos', action: 'show' },
      { path: 'http://localhost:8080/ver-carrito', action: 'chart'}
];
    
const parseLocation = () => location.href;
const findActionByPath = (path, routes) => routes.find(r => r.path == path)

const router = () => {
      const path = parseLocation();
      const { action } = findActionByPath(path, routes) || {};
      switch (action) {
            case 'show':
                  app.mostrarProductos('#app');
                  break;
            case 'add':
                  app.mostrarForm('#app')
                  break
            case 'chart':
                  app.mostrarCarrito('#app')
                  break
      }
}
    
window.onload = () => { router(); }
window.onchange = () => { router(); }