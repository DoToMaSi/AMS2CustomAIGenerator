import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-driver-card',
  templateUrl: './driver-card.component.html',
  styleUrls: ['./driver-card.component.scss'],
})
export class DriverCardComponent implements OnInit {

  @Input() public text = '';
  @Input() public open = false;
  @Input() public primaryCard = false;

  constructor() { }

  ngOnInit() {}

}
