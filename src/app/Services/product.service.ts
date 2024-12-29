import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _httpClient:HttpClient) { }

  productUrl:string='http://localhost:3000/product';

  //Store product data into json server using HttpClient Module,
  postProductData(productData:object){
    return this._httpClient.post(this.productUrl,productData);
  }
  

  //Get product data using Get() method of httpClient module
  getProduct(){
    return this._httpClient.get(this.productUrl);
  }

  //Delete product using delete() method of httpClient module
  deleteProduct(productId:any){
    return this._httpClient.delete(`${this.productUrl}/${productId}`);
  }

  //Update product using put() method of httpClient module
  updateProduct(productId:any,productData:any){
    return this._httpClient.put(`${this.productUrl}/${productId}`,productData)
  }

  //get single product using get() method of httpClient module and parameterize routing
  getOneProduct(productId:any):Observable<any>{
   return this._httpClient.get(`${this.productUrl}/${productId}`)
  }

}
