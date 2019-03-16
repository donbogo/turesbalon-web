import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from "@angular/router";
import { MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { ProductsService } from '../products.service';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data = [0, 1, 2];
  productsList = <any>[];
  events = [];
  products = [];
  filtro: string = '';
  displayedColumns = ['imagen', 'nombre', 'descripcion', 'ver', 'comprar'];
  productos: Producto[] = [];
  dataSource: MatTableDataSource<Producto>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private snackBar: MatSnackBar, private productService: ProductsService, private cartService: ShoppingCartService) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.productService.getProductsList().subscribe(
      res => {
        this.productsList = res.objetoRespuesta;
        for (let i = 0; i < 12; i++) {
          let _product = this.productsList[i];
          _product.url = `https://picsum.photos/300/300?image=${i * (new Date()).getSeconds()}`;
          this.events.push(_product);
        }
        for (let i = 0; i < this.events.length; i++) {
          if (i % 3 === 0) {
            let list = [this.events[i], this.events[i + 1], this.events[i + 2]]
            this.products.push(list);
          }
        }
      },
      err => { console.error(err) }
    );
  }

  buscar() {
    this.productos = [];
    if (this.filtro) {
      for (let i = 0; i < 20; i++) {
        let _product = this.productsList[i];
        if (_product) {
          _product.url = `https://picsum.photos/300/300?image=${i * (new Date()).getSeconds()}`;
          this.productos.push(_product);
        }
      }
    }
    this.dataSource = new MatTableDataSource(this.productos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  limpiar() {
    this.productos = [];
    this.filtro = '';
    this.dataSource = new MatTableDataSource(this.productos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  verProducto(item) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        'producto': JSON.stringify(item)
      }
    };
    this.router.navigate(['/product-detail'], navigationExtras);
  }

  buy(item) {
    this.cartService.addItemCart(item);
    this.snackBar.open('Se ha agregado el producto al carrito de compras!!!', null, {
      duration: 4000,
    });
  }
}

export interface Producto {
  idProducto: string;
  codigo: string;
  nombre: string;
  descripcion: string;
  idCatalogo: string;
  nombreCatalogo: string;
  idCiudad: string;
  nombreCiudad: string;
  fechaEspectaculo: string;
  fechaLlegada: string;
  fechaSalida: string;
  nroBoletas: string;
  url: string;
}
