import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonicSelectableComponent } from 'ionic-selectable';
import { CAR_CATEGORIES, CAR_CLASSES } from 'src/app/utils/constants/car-classes';
import { COUNTRY_CODES } from 'src/app/utils/constants/country-codes';
import { DRIVER_SKILL_VARS } from 'src/app/utils/constants/driver-skills';
import { AiObject } from 'src/app/utils/models/ai-object';
import { CarCategory, CarClass } from 'src/app/utils/models/cars';
import { DriverProfile } from 'src/app/utils/models/driver-profile';
import { UtilsService } from 'src/app/utils/services/utils.service';
import { XmlFileService } from 'src/app/utils/services/xml-file.service';
import { ToastUtils } from 'src/app/utils/toast';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {

  public carClasses: CarClass[] = [];
  public carCategories: CarCategory[] = CAR_CATEGORIES;
  public countryList = COUNTRY_CODES;
  public driverList: DriverProfile[] = [];
  public driverListForm: FormGroup[] = [];
  public carClass = new FormControl(null, Validators.required);
  public carCategory = new FormControl(null);

  public minValue = 0;
  public maxValue = 0;

  constructor(
      private utilsService: UtilsService,
      private toastUtils: ToastUtils,
      private xmlFileService: XmlFileService
    ) {}

  public ngOnInit(): void {
    this.initCarClassSelect();
  }

  public ngAfterViewInit(): void {
    this.carCategory.valueChanges.subscribe((value: CarCategory | null) => {
      if (value) {
        this.carClasses = [];
        const classesMatch = CAR_CLASSES.filter((carClass) => {
          return carClass.category.includes(value.value);
        });

        if (classesMatch.length > 0) {
          classesMatch.map((carClass) => {
            this.carClasses.push(carClass);
          })
        }
      } else {
        this.initCarClassSelect();
      }
    })
  }

  private initCarClassSelect() {
    this.carClasses = [];
    CAR_CLASSES.map((carClass) => {
      this.carClasses.push(carClass);
    });
  }

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
    this.driverListForm[index].get('country').setValue(event.value.alphaCode);
  }

  public removeDriver(index: number) {
    this.driverListForm.splice(index, 1);
  }

  public generateDriverSkills(skillRange: 'random' | 'beginner' | 'amateur' | 'pro-amateur' | 'professional' | 'superstar' | 'legendary', index: number) {
    let minValue = 0;
    let maxValue = 0;

    switch(skillRange) {
      case 'beginner':
        minValue = 0;
        maxValue = 30;
        break;

      case 'amateur':
        minValue = 30;
        maxValue = 50;
        break;

      case 'pro-amateur':
        minValue = 50;
        maxValue = 70;
        break;

      case 'professional':
        minValue = 70;
        maxValue = 80;
        break;

      case 'superstar':
        minValue = 80;
        maxValue = 90;
        break;

      case 'legendary':
        minValue = 90;
        maxValue = 100;
        break;

      case 'random':
      default:
        minValue = 0;
        maxValue = 100;
        break;
    }

    const driverForm = this.driverListForm[index];

    DRIVER_SKILL_VARS.forEach((skill) => {
      driverForm.get(skill).setValue(this.utilsService.between(minValue, maxValue));
    });
  }

  public async generateDriverList() {
    if (this.carClass.invalid) {
      this.toastUtils.show('Select a Car Class');
      return false;
    }

    if (this.driverListForm.length > 0) {
      this.driverListForm.forEach((driverForm) => {
        driverForm.markAllAsTouched();
      });

      for (let index = 0; index < this.driverListForm.length; index++) {
        const driverForm = this.driverListForm[index];
        if (driverForm.invalid) {
          this.toastUtils.show(`Driver #${index + 1} ${ driverForm.get('name').value } has invalid values.`);
          return false;
        }
      }


      const drivers = (this.driverListForm.map((driverForm) => {
        return driverForm.value;
      }) as DriverProfile[]);

      try {
        const xmlFileStr = await this.xmlFileService.generateAiFile(drivers);
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
    } else {
      this.toastUtils.show('Create one driver, at least, to generate an AI file');
    }
  }
}
