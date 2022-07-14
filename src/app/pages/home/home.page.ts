import { Component, OnInit } from '@angular/core';
import { CAR_CLASSES } from 'src/app/utils/constants/car-classes';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public carClasses = CAR_CLASSES;

  constructor() { }

  ngOnInit() {
  }

}
