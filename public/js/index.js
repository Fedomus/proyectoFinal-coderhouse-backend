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
            const productos = JSON.parse(localStorage.getItem('productos')) || [];
            this.productos = productos.map(producto => {return new Producto(producto)});
            const productosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
            this.productosCarrito = productosCarrito.map(producto => {return new Producto(producto)})
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
                  <input class="btn" type="submit" value="Enviar">
            </form>
      `
      }

      async renderProductos(padre, productos){
            await fetch('templates/cards.hbs')
            .then(resp => resp.text())
            .then(plantilla => {
                  const template = Handlebars.compile(plantilla);
                  const html = template({ productos })
                  document.querySelector(padre).innerHTML = html;   
            })
            eventoBoton();
      }

      async renderCarrito(padre, productosCarrito){
            if (productosCarrito != '') {
                  document.querySelector(padre).innerHTML = `
                  <table class="table">
                        <thead>
                        <tr>
                              <th scope="col"></th>
                              <th scope="col">Producto</th>
                              <th scope="col">Precio</th>
                              <th scope="col">Cantidad</th>
                              <th scope="col">Subtotal</th>
                        </tr>
                        </thead>
                        <tbody id="productosCarrito">

                        </tbody>
                  </table>`

                  await fetch('templates/chart.hbs')
                  .then(resp => resp.text())
                  .then(plantilla => {
                        const template = Handlebars.compile(plantilla);
                        const html = template({ productosCarrito })
                        document.querySelector("#productosCarrito").innerHTML = html
                  })
            } else {
                  document.querySelector(padre).innerHTML = `<p>Aún no hay productos agregados</p>`
            }
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

      async mostrarProductos(padre) {
            await saveLocalStorage('http://localhost:8080/api/productos', 'productos')   
            this.productoView.renderProductos(padre, this.productoModel.productos)
      }

      async mostrarCarrito(padre) {
            await saveLocalStorage('http://localhost:8080/api/carrito/1/productos', 'carrito')
            this.productoView.renderCarrito(padre, this.productoModel.productosCarrito)
      }
}


async function saveLocalStorage(url, nombreLista){
      await fetch(url)
      .then( response => response.json())
      .then( data => {
            const list = data.productos.map(producto => {return producto})
            localStorage.setItem(nombreLista, JSON.stringify(list));
      })
      .catch((err) => console.log(err))
}

function eventoBoton() {
      document.querySelectorAll('.btnAgregar').forEach( b => b.onclick = async (e) => {
            await fetch('http://localhost:8080/api/carrito/1/productos/', {
                  body: {
                        id: parseInt(e.target.id)
                  },
                  method: 'POST', 
            })
            .then( res=> {return res.json()
            })
            .catch(err => console.log(err))
      })
      document.querySelectorAll('.btnEliminar').forEach( b => b.onclick = async (e) => {
            await fetch('http://localhost:8080/api/productos/'+e.target.id, {
                  method: 'DELETE', 
            })
            .then( (resp)=> {return resp.json()
            })
            .catch(err => console.log(err))
            
            await document.getElementById('exampleModal').modal('hide')
      })
}


const app = new ProductoController(new ProductoModel(), new ProductoView());

const routes = [
      { path: 'http://localhost:8080/', action: 'show' },
      { path: 'http://localhost:8080/agregar-producto', action: 'add'},
      { path: 'http://localhost:8080/carrito', action: 'chart'}
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