import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CAR_CLASSES } from 'src/app/utils/constants/car-classes';
import { COUNTRY_CODES } from 'src/app/utils/constants/country-codes';
import { DriverProfile } from 'src/app/utils/models/driver-profile';
import { ToastUtils } from 'src/app/utils/toast';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public carClasses = CAR_CLASSES;
  public countryList = COUNTRY_CODES;
  public driverList: DriverProfile[] = [];
  public driverListForm: FormGroup[] = [];

  public minValue = 0;
  public maxValue = 0;

  constructor(private toastUtils: ToastUtils) {}

  public ngOnInit(): void {}

  public addDriver(): void {
    const newDriver = new FormGroup({
      liveryName: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      raceSkill: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
      qualifyingSkill: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
      aggression: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
      defending: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
      stamina: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
      consistency: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
      startReactions: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
      wetSkill: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
      tyreManagement: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
      blueFlagConceding: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
      weatherTyreChanges: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
      avoidanceOfMistakes: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
      avoidanceOfForcedMistakes: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
    });

    this.driverListForm.push(newDriver);
  }

  public removeDriver(index: number) {
    this.driverListForm.splice(index, 1);
  }

  public generateDriverList() {
    if (this.driverListForm.length > 0) {

    } else {
      this.toastUtils.show('Create one driver, at least, to generate an AI file');
    }
  }
}
