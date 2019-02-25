import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private http: HttpClient) { }

  getItemsCart() {
    let items = JSON.parse(localStorage.getItem('cart'));
    if (!items) {
      items = [];
    }
    return items;
  }

  getItemsSize() {
    let items = this.getItemsCart();
    return items.length;
  }

  addItemCart(item) {
    let items = this.getItemsCart();
    items.push(item);
    localStorage.setItem('cart', JSON.stringify(items));
  }

}
