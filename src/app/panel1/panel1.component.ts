import { Component, OnInit, ChangeDetectionStrategy,AfterViewInit } from "@angular/core";

import { ProductService } from "../product.service";
import { ProductDataSource } from "./product-datasource";

@Component({
  selector: "app-panel1",
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./panel1.component.html",
  styleUrls: ["./panel1.component.css"],
})
export class Panel1Component implements OnInit,AfterViewInit {

  // these are the options for the select
  optionType : string[] = [];
  optionYear : string[] = [];
  optionColor : string[] = [];
  optionName : string[] = [];

  // these are the selected options
  selectedType : string[] = ["iPhone","Laptop"];
  selectedYear : string[] = ["2015"];
  selectedColor : string[] = [];
  selectedName : string[] = [];

  // table data
  displayedColumns = ['type', 'year', 'color', 'name'];
  productDataSource! : ProductDataSource;

  constructor(private productService:ProductService) {
    
  }

  ngOnInit(): void {
    
    this.productService.getDropdownOptionsType().subscribe((data) => {
      this.optionType = data;
    });

    if (this.selectedType.length > 0) {
      this.productService.getDropdownOptionsYear(this.selectedType).subscribe((data) => {
        this.optionYear = data;
      });
    }

    this.productDataSource = new ProductDataSource(this.productService);
    this.loadTable();

  }

  ngAfterViewInit(): void {
  }

  clearFields(field : string) {
    switch(field) {
      case "type":
        this.selectedYear = [];
        this.selectedColor = [];
        this.selectedName = [];
        break;
      case "year":
        this.selectedColor = [];
        this.selectedName = [];
        break;
      case "color":
        this.selectedName = [];
        break;
    }
    this.loadTable();
  }

  onTypeChange() {
    
    this.productService.getDropdownOptionsYear(this.selectedType).subscribe((data) => {
      this.optionYear = data;
      this.selectedYear = [];
      this.selectedColor = [];
      this.selectedName = [];
      this.loadTable()
    });
  }

  onYearChange() {
    this.productService.getDropdownOptionsColor(this.selectedType, this.selectedYear).subscribe((data) => {
      this.optionColor = data;
      this.selectedColor = [];
      this.selectedName = [];
      this.loadTable()
    });
  }

  onColorChange() {
    this.productService.getDropDownOptionsName(this.selectedType, this.selectedYear, this.selectedColor).subscribe((data) => {
      this.optionName = data;
      this.selectedName = [];
      this.loadTable()
    });
  }

  loadTable() {
    let filter = {
      type: this.selectedType,
      year: this.selectedYear,
      color: this.selectedColor,
      name: this.selectedName
    };

    console.log("loadTable() with ", filter);
    this.productDataSource.loadProducts(filter);  
  }

}
