import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-panel2',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './panel2.component.html',
  styleUrls: ['./panel2.component.css']
})
export class Panel2Component implements OnInit {
  selected = '';
  constructor() { }

  ngOnInit(): void {
  }

}
