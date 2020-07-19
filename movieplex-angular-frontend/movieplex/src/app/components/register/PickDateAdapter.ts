
import { NativeDateAdapter, DateAdapter,MAT_DATE_FORMATS } from '@angular/material/core';
import { formatDate } from '@angular/common';  
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
/*import * as moment from "moment";*/
export const PICK_FORMATS = {
    parse: {dateInput: {month: 'short', year: 'numeric', day: 'numeric'}},
    display: {
        dateInput: 'input',
        monthYearLabel: {year: 'numeric', month: 'short'},
        dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
        monthYearA11yLabel: {year: 'numeric', month: 'long'}
    }
};
@Injectable({
    providedIn: 'root'
})
export class PickDateAdapter extends NativeDateAdapter {
     
    format(date: Date, displayFormat: Object): string {
        if (displayFormat === 'input') {
            return formatDate(date,'dd-MM-yyyy',this.locale);;
        } else {
            return date.toDateString();
        }
    }
  }

  export function DateValidator(format = "dd-MM-YYYY"): any {
    return (control: FormControl): { [key: string]: any } => {
     /* const val = moment(control.value, format, true);
  
      if (!val.isValid()) {
        return { invalidDate: true };
      }
      */
      return null;
    };
  }