import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Services/product.service';
import { VariableBinding } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productData!: any;
  constructor(private _productService: ProductService) {this.getAllProducts() }

  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts() {
    this._productService.getProduct().subscribe((data) => {
      this.productData = data;
      console.log('Data',data);
      console.log(this.productData);
    });
  }

  deleteProduct(id:any){
    this._productService.deleteProduct(id).subscribe((res) => {
      alert(`Delete Success... \n ${JSON.stringify(res)}`);
      this.getAllProducts();
    });
  }
}
