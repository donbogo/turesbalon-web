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
    let index = items.findIndex(i => i.name === item.name);
    let _item = items[index];
    if (_item) {
      _item.size = _item.size + 1;
    } else {
      item.size = 1;
      items.push(item);
    }
    localStorage.setItem('cart', JSON.stringify(items));
  }

  setItemsCart(item, action) {
    let items = this.getItemsCart();
    let index = items.findIndex(i => i.name === item.name);
    if (items[index]) {
      if (action == 'update') {
        items[index] = item;
      } else if (action == 'delete') {
        items.splice(index, 1);
      }
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }
}
