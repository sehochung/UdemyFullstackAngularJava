import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';


import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);

  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  //storage: Storage = sessionStorage;
  storage: Storage = localStorage;





  constructor() {

    let data = JSON.parse(this.storage.getItem('cartItems'));

    if (data != null) {
      this.cartItems = data;

      this.computeCartTotals();
    }
  }

  addToCart(theCartItem: CartItem) {
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if (this.cartItems.length > 0) {

      existingCartItem = this.cartItems.find(temp => temp.id === theCartItem.id);

      alreadyExistsInCart = (existingCartItem != undefined);
    }

    if (alreadyExistsInCart) {
      existingCartItem.quantity++;

    }
    else {
      this.cartItems.push(theCartItem);
    }

    this.computeCartTotals();

  }
  computeCartTotals() {

    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.logCartData(totalPriceValue, totalQuantityValue);
    this.persistCartItems();
  }
  logCartData(totalPriceValue: number, totalQuantityValue: number) {

    console.log('Contents of the cart');

    for (let temp of this.cartItems) {
      const subTotalPrice = temp.quantity * temp.unitPrice;
      console.log(`name: ${temp.name}, quantity=${temp.quantity}, unitPrice=${temp.unitPrice}, subTotalPrice=${subTotalPrice}`);
    }

    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
    console.log('----');
  }

  decrementQuantity(theCartItem: CartItem) {

    theCartItem.quantity--;

    if (theCartItem.quantity === 0) {
      this.remove(theCartItem);
    }
    else {
      this.computeCartTotals();
    }
  }
  remove(theCartItem: CartItem) {
    // get index of item in the carry
    const itemIndex = this.cartItems.findIndex( temp => temp.id === theCartItem.id );
    // if found, remove the item from the array with index
    if ( itemIndex > -1 ) {
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotals();
    }
  }

  persistCartItems() {
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

}
