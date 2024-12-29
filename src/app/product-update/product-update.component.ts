import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProductService } from '../Services/product.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  productForm!: FormGroup;
  total: number = 0;
  constructor(private _activeRoute: ActivatedRoute, private _productService: ProductService, private _router: Router) { this.createForm(); }

  ngOnInit(): void {
    this.getProductData();
  }
  createForm() {
    this.productForm = new FormGroup({
      'productName': new FormControl(),
      'productCategory': new FormControl(),
      'productPrice': new FormControl(),
      'productQuantity': new FormControl(),
      'totalPrice': new FormControl(),
      'productId': new FormControl()
    })
  }
  ngDoCheck() {
    let price = this.productForm.value.productPrice;
    let quantity = this.productForm.value.productQuantity;
    this.total = price * quantity;
  }
  //Get product data using product id 
  getProductData() {
    let productId = this._activeRoute.snapshot.params['id'];
    this._productService.getOneProduct(productId).subscribe((data) => {
      //Bind received product data to the product form using patchValue() method. 
      this.productForm.patchValue({
        'productName': data.productName,
        'productCategory': data.productCategory,
        'productPrice': data.productPrice,
        'productQuantity': data.productQuantity,
        'totalPrice': data.totalPrice,
        'productId': data.id
      })
    })
  }

  updateProduct() {
    const product = {
      productName: this.productForm.value.productName,
      productCategory: this.productForm.value.productCategory,
      productPrice: this.productForm.value.productPrice,
      productQuantity: this.productForm.value.productQuantity,
      totalPrice: this.total,
      productId: this.productForm.value.productId
    }

    this._productService.updateProduct(product.productId, product).subscribe(res => {
      alert(`Product Updated Successfully... \n ${JSON.stringify(res)}`);
    });

    setTimeout(() => { this._router.navigate(['/home']) }, 1000);
  }

}
