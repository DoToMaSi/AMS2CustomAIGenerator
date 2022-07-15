import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonicSelectableComponent } from 'ionic-selectable';
import { CAR_CLASSES } from 'src/app/utils/constants/car-classes';
import { COUNTRY_CODES } from 'src/app/utils/constants/country-codes';
import { AiObject } from 'src/app/utils/models/ai-object';
import { DriverProfile } from 'src/app/utils/models/driver-profile';
import { XmlFileService } from 'src/app/utils/services/xml-file.service';
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
  public driverListForm = new FormArray([]);
  public carClass = new FormControl(null, Validators.required);

  public minValue = 0;
  public maxValue = 0;

  constructor(
      private toastUtils: ToastUtils,
      private xmlFileService: XmlFileService
    ) {}

  public ngOnInit(): void {}

  public addDriver(): void {
    const newDriver = new FormGroup({
      liveryName: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      countrySelect: new FormControl('', Validators.required),
      raceSkill: new FormControl(50, [Validators.required, Validators.min(0), Validators.max(100)]),
      qualifyingSkill: new FormControl(50, [Validators.required, Validators.min(0), Validators.max(100)]),
      aggression: new FormControl(50, [Validators.required, Validators.min(0), Validators.max(100)]),
      defending: new FormControl(50, [Validators.required, Validators.min(0), Validators.max(100)]),
      stamina: new FormControl(50, [Validators.required, Validators.min(0), Validators.max(100)]),
      consistency: new FormControl(50, [Validators.required, Validators.min(0), Validators.max(100)]),
      startReactions: new FormControl(50, [Validators.required, Validators.min(0), Validators.max(100)]),
      wetSkill: new FormControl(50, [Validators.required, Validators.min(0), Validators.max(100)]),
      tyreManagement: new FormControl(50, [Validators.required, Validators.min(0), Validators.max(100)]),
      blueFlagConceding: new FormControl(50, [Validators.required, Validators.min(0), Validators.max(100)]),
      weatherTyreChanges: new FormControl(50, [Validators.required, Validators.min(0), Validators.max(100)]),
      avoidanceOfMistakes: new FormControl(50, [Validators.required, Validators.min(0), Validators.max(100)]),
      avoidanceOfForcedMistakes: new FormControl(50, [Validators.required, Validators.min(0), Validators.max(100)]),
    });

    this.driverListForm.push(newDriver);
  }

  public changeCountry(event: {
      component: IonicSelectableComponent,
      value: any
    }, index: number) {
      this.driverListForm.at(index).get('country').setValue(event.value.alphaCode);
    }

  public removeDriver(index: number) {
    this.driverListForm.removeAt(index);
  }

  public async generateDriverList() {
    if (this.carClass.invalid) {
      this.toastUtils.show('Select a Car Class');
      return false;
    }

    if (this.driverListForm.length > 0) {
      for (let index = 0; index < this.driverListForm.controls.length; index++) {
        const driverForm = this.driverListForm.controls[index];
        driverForm.markAllAsTouched();
        if (driverForm.invalid) {
          this.toastUtils.show(`Driver #${index + 1} ${ driverForm.get('name').value } has invalid values.`);
          return false;
        }
      }

      if (this.driverListForm.valid) {
        const drivers = (this.driverListForm.value as DriverProfile[]);

        try {
          const xmlFileStr = await this.xmlFileService.generateAiFile(drivers);
          console.log(xmlFileStr);

          const element = document.createElement('a');
          const blob = new Blob([xmlFileStr], {
            type: 'text/xml'
          });
          var url = URL.createObjectURL(blob);
          element.href = url;
          element.setAttribute('download', `${this.carClass.value.value}.xml`);
          document.body.appendChild(element);
          element.click();
        } catch (error) {
          console.error(error);
          this.toastUtils.error('Something went wrong in the Generation Process');
        }
      }
    } else {
      this.toastUtils.show('Create one driver, at least, to generate an AI file');
    }
  }
}
