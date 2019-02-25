import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  appTitle: string = 'TuresBalon';
  ciudades: Array<Object> = [
    { id: 0, name: "Armenia" },
    { id: 1, name: "Barranquilla" },
    { id: 2, name: "Bogota" },
    { id: 3, name: "Bucaramanga" },
    { id: 4, name: "Cali" },
    { id: 5, name: "Cartagena" },
    { id: 6, name: "Cucuta" },
    { id: 7, name: "Ibague" },
    { id: 8, name: "Manizales" },
    { id: 9, name: "Medellin" },
    { id: 10, name: "Neiva" },
    { id: 11, name: "Pereira" },
    { id: 12, name: "Santa Marta" },
    { id: 13, name: "Tunja" },
    { id: 14, name: "Villavicencio" },
  ];
  selectCiudad = this.ciudades[2];

  constructor(public authService: AuthService, public cartService: ShoppingCartService) { }

  ngOnInit() {
  }

}
