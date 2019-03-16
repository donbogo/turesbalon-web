import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productsListUrl = 'http://akimbo2k.dyndns.org:8080/WebApiB2C/Api/Productos/ListarProductos';

  constructor(private http: HttpClient) { }

  getProductsList() {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<any>(this.productsListUrl, { headers: headers });
  }
}
