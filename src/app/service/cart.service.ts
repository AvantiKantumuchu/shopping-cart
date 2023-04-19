import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList: any =[]
  public productList = new BehaviorSubject<any>([]);

  constructor() {}

  getProducts(): Observable<any>{
    return this.productList.asObservable();
  }

  setProduct(product:any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  addToCart(product:any){
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList);
  }

  getTotalPrice() : number {
    let grandTotal= 0;
    this.cartItemList.map((e:any) =>{
      grandTotal+= e.total;
    })
    return grandTotal;
  }

  removeCartItem(product:any){
    this.cartItemList.map((e:any, index:any)=>{
      if(product.id===e.id) {
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);
  }

  removeAllCart(){
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }

}
