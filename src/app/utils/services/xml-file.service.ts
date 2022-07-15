import { DriverProfile } from 'src/app/utils/models/driver-profile';
import { Injectable } from "@angular/core";
import { AiObject, VARIABLE_ALIASES } from '../models/ai-object';

@Injectable({
  providedIn: 'root'
})

export class XmlFileService {

  private parser = new DOMParser();
  private varAlias = VARIABLE_ALIASES;

  constructor() {

  }

  public async generateAiFile(drivers: DriverProfile[]) {
    try {
      let xmlString = `<?xml version="1.0" encoding="UTF-8"?>\n`;
      xmlString += `<custom_ai_drivers>\n`
        drivers.forEach((driver, idx) => {
          if (idx > 0) {
            xmlString += `\t\n`;
          }
          xmlString += `\t<driver livery_name="${driver.liveryName}">\n`;
          Object.entries(driver).forEach((objEntry: [string, any]) => {
            const variable = VARIABLE_ALIASES[objEntry[0]];
            if (variable) {
              let entry = objEntry[1];

              if (typeof entry === 'number') {
                entry = (entry / 100);
              }

              xmlString += `\t\t<${variable}>${entry}</${variable}>\n`;
            }
          });
          xmlString += `\t</driver>\n`;
        })
      xmlString += `</custom_ai_drivers>`;
      // const xmlFile = this.parser.parseFromString(xmlString, 'text/xml');
      // return xmlFile;
      return xmlString;
    } catch (error) {
      throw new Error(error);
    }
  }
}
