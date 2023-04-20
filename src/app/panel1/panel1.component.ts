import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-panel1',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './panel1.component.html',
  styleUrls: ['./panel1.component.css']
})
export class Panel1Component implements OnInit {
  selected = '';
  
  constructor() { }

  ngOnInit(): void {
  }

}
