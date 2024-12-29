import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../Services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productForm!: FormGroup;
  total:number=0;
  constructor(private _productService:ProductService) { this.createForm(); }

  ngOnInit(): void {
  }
  // here we create reactive form using formGroup
  createForm() {
    this.productForm = new FormGroup({
      'productName': new FormControl(null,Validators.required),
      'productCategory': new FormControl(null,Validators.required),
      'productPrice': new FormControl(null,Validators.required),
      'productQuantity': new FormControl(null,Validators.required),
      'totalPrice': new FormControl(undefined,Validators.required)
    })
  }
  ngDoCheck(){
    let price = this.productForm.value.productPrice;
    let quantity = this.productForm.value.productQuantity;
    this.total = price * quantity;
  }
  addProduct() {
    //console.log('Form =>', this.productForm);
    let price = this.productForm.value.productPrice;
    let quantity = this.productForm.value.productQuantity;
    
    const product = {
      productName: this.productForm.value.productName,
      productCategory: this.productForm.value.productCategory,
      productPrice: this.productForm.value.productPrice,
      productQuantity: this.productForm.value.productQuantity,
      totalPrice : this.total
    }
    
    this._productService.postProductData(product).subscribe(res => {
      alert(`Product Submitted Successfully...\n${JSON.stringify(res)}`);
    });

    setTimeout(()=>{this.productForm.reset()},2000);
  }
}
