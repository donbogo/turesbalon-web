import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product = {};

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.product = JSON.parse(params['producto']);
    });
  }

  ngOnInit() {
  }

}
