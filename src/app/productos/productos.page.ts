import { Component, OnInit } from '@angular/core';
import { Producto } from '../interfaces/Producto';
import { ProductoService } from '../servicio/producto/producto.service';
import { ViewWillEnter,ViewDidLeave } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from '../servicio/auth/auth.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements ViewWillEnter,ViewDidLeave {
  public productos: Producto[] = [];
  private subProducto!: Subscription;
  constructor(
    private prdS: ProductoService,
    private authS: AuthService
  ) { }

  public ionViewDidLeave(): void {
    if(this.subProducto){
      this.subProducto.unsubscribe();
    }
  }

  public ionViewWillEnter(): void {
    this.prdS.producto.subscribe(productos =>{
      this.productos = productos;
    });
    this.prdS.listarProductos();
  }
  public siguiente(){
    this.prdS.siguientesProductos();
  }

  public anterior(){
    this.prdS.productosAnterior();
  }

  public salirSesion(){
    this.authS.cerrarSesion();
  }
  
  public cargarSiguientes(event: any) {
    this.prdS.siguientesProductos();
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }
}
