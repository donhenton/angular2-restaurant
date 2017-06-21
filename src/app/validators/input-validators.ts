import { FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';

export class InputValidators {
 static cannotBeEmpty(control: FormControl)
    {
        if (!control.value)
        {
            return {isEmpty: true}
        }
        if (control.value && control.value.length == 0 )
        {
            return {isEmpty: true}
        }
        return null; //return null if you are valid

    }
}