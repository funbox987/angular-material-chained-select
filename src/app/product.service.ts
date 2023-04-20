import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

export interface Product {
  type: string;
  year: number;
  color: string;
  name: string;
  price: number;
  quantity: number;
}

export interface ProductFilter {
  type?: string[];
  year?: string[];
  color?: string[];
  name?: string[];
}

export const product_inventory : Product[] = 
    [
        { type: 'Laptop', year: 2015, color:'silver', name: 'Macbook Air 11', price: 1100, quantity: 10 },
        { type: 'Laptop', year: 2015, color:'silver', name: 'Macbook Air 13', price: 1300, quantity: 100 },
        { type: 'Laptop', year: 2015, color:'silver', name: 'Macbook Pro 11', price: 1100, quantity: 10 },
        { type: 'Laptop', year: 2015, color:'space grey', name: 'Macbook Pro 13', price: 1300, quantity: 100 },
        { type: 'Laptop', year: 2015, color:'space grey', name: 'Macbook Pro 15', price: 1500, quantity: 100 },
        { type: 'Laptop', year: 2015, color:'space grey', name: 'Macbook 12', price: 1200, quantity: 10 },
        { type: 'Laptop', year: 2015, color:'gold', name: 'Macbook 12', price: 1200, quantity: 10 },
        

        { type: 'Desktop', year: 2014, color:'silver', name: 'Mac Pro', price: 1200, quantity: 10 },
        { type: 'Desktop', year: 2014, color:'silver', name: 'iMac 27', price: 1200, quantity: 10 }, 
        { type: 'Desktop', year: 2014, color:'silver', name: 'iMac 21', price: 1200, quantity: 10 },
        { type: 'Desktop', year: 2014, color:'silver', name: 'Mac Mini', price: 1200, quantity: 10 }, 
        
        { type: 'iPhone', year: 2014, color:'gold', name: 'iPhone 7', price: 1200, quantity: 10 },
        { type: 'iPhone', year: 2014, color:'white', name: 'iPhone 6 ', price: 1200, quantity: 10 }, 
        { type: 'iPhone', year: 2015, color:'gold', name: 'iPhone 8', price: 1200, quantity: 10 },
        { type: 'iPhone', year: 2015, color:'white', name: 'iPhone 8', price: 1200, quantity: 10 }, 
    ]

@Injectable({
  providedIn: "root",
})
export class ProductService {
  getProductsWithFilter(filter: ProductFilter): Observable<Product[]> {
    let filteredProducts = product_inventory;

    if (filter.type && filter.type.length > 0) {
      filteredProducts = filteredProducts.filter((p) =>
        filter.type!.includes(p.type)
      );

      console.log("filteredProducts", filteredProducts);

      if (filter.year && filter.year.length > 0) {
        filteredProducts = filteredProducts.filter((p) =>
        {
          return filter.year!.includes(p.year.toString())
        });

        console.log("filteredProducts", filteredProducts);

        if (filter.color && filter.color.length > 0) {
          filteredProducts = filteredProducts.filter((p) =>
            filter.color!.includes(p.color)
          );

          if (filter.name && filter.name.length > 0) {
            filteredProducts = filteredProducts.filter((p) =>
              filter.name!.includes(p.name)
            );
          }
        }
      }
    }

    console.log("final filteredProducts", filteredProducts);

    return of(filteredProducts);
  }

  /**
   * From the product inventory, get the unique types.
   *
   * @returns unique types
   */
  // getDropdownOptionsType(): Observable<string[]> {
  //   return of(product_inventory.map((p) => p.type));
  // }

  getDropdownOptionsType(): Observable<string[]> {
    return of(Array.from(new Set(product_inventory.map((p) => p.type))));
  }

  /**
   * From the product inventory, get the unique types.
   *
   * @returns unique types
   */
  getDropdownOptionsYear(type: string[]): Observable<string[]> {
    // ** This is the filter logic **
    // Get all the years for the selected type.

    let filteredProducts = product_inventory;
    if (type && type.length > 0) {
      filteredProducts = filteredProducts.filter((p) => type.includes(p.type));
    }

    return of(Array.from(new Set(filteredProducts.map((p) => p.year.toString()))));
  }

  getDropdownOptionsColor(
    type: string[],
    year: string[]
  ): Observable<string[]> {
    // ** This is the filter logic **
    // Get all the colors for the selected type and year.

    let filteredProducts = product_inventory;
    if (type) {
      filteredProducts = filteredProducts.filter((p) => type.includes(p.type));
      if (year) {
        filteredProducts = filteredProducts.filter((p) =>
          year.includes(p.year.toString())
        );
      }
    }

    return of(Array.from(new Set(filteredProducts.map((p) => p.color))));
  }

  getDropDownOptionsName(
    type: string[],
    year: string[],
    color: string[]
  ): Observable<string[]> {
    // ** This is the filter logic **
    // Get all the names for the selected type, year and color.

    let filteredProducts = product_inventory;
    if (type) {
      filteredProducts = filteredProducts.filter((p) => type.includes(p.type));

      if (year) {
        filteredProducts = filteredProducts.filter((p) =>
          year.includes(p.year.toString())
        );

        if (color) {
          filteredProducts = filteredProducts.filter((p) =>
            color.includes(p.color)
          );
        }
      }
    }

    return of(Array.from(new Set(filteredProducts.map((p) => p.name))));
  }
}