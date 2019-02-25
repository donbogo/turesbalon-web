import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data = [0, 1, 2];
  events = [];
  products = [];

  constructor(private cartService: ShoppingCartService) { }

  ngOnInit() {
    for (let i = 0; i < 12; i++) {
      this.events.push({ name: `name ${i}`, description: `description ${i}`, url: `https://picsum.photos/300/300?image=${i * (new Date()).getSeconds()}` });
    }
    for (let i = 0; i < this.events.length; i++) {
      if (i % 3 === 0) {
        let list = [this.events[i], this.events[i + 1], this.events[i + 2]]
        this.products.push(list);
      }
    }
  }

  buy(item) {
    console.log('item', item);
    this.cartService.addItemCart(item);
  }
}
