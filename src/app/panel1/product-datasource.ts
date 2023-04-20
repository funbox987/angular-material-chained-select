import {DataSource} from '@angular/cdk/collections';
import {Observable, BehaviorSubject} from 'rxjs';
import {Product, ProductFilter, ProductService} from '../product.service';


export class ProductDataSource extends DataSource<Product> {

    private productSubject = new BehaviorSubject<Product[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    
    public loading$ = this.loadingSubject.asObservable();
    
    constructor(private productService: ProductService) {
        super();
    }
    
    connect(): Observable<Product[]> {
        return this.productSubject.asObservable();
    }
    
    disconnect() {
        this.productSubject.complete();
        this.loadingSubject.complete();
    }
    
    loadProducts(filter: ProductFilter) {
        this.loadingSubject.next(true);
    
        this.productService.getProductsWithFilter(filter).subscribe(
        (products) => {
            this.productSubject.next(products);
            this.loadingSubject.next(false);
        },
        (err) => {
            console.log(err);
            this.loadingSubject.next(false);
        }
        );
    }
}