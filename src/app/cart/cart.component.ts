import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  items = [];

  constructor(private cartService: ShoppingCartService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.items = this.cartService.getItemsCart();
  }

  add(item) {
    item.size = item.size + 1;
    this.cartService.setItemsCart(item, 'update');
  }

  subtract(item) {
    if (item.size > 1) {
      item.size = item.size - 1;
      this.cartService.setItemsCart(item, 'update');
    }
  }

  delete(item) {
    let index = this.items.findIndex(i => i.name === item.name);
    this.items.splice(index, 1);
    this.cartService.setItemsCart(item, 'delete');
  }

  checkout() {
    if (this.authService.loggedIn()) {
      this.router.navigate(['/checkout']);
    } else {
      this.router.navigate(['/login-signup']);
    }
  }

}
