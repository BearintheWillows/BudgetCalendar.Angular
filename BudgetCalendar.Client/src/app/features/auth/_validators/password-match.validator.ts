import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export default function validatePasswordMatch(): ValidatorFn  {
    return (control: AbstractControl): ValidationErrors | null => {
    
        const password = control.get('password');
        const confirmPassword = control.get('confirmPassword');
        console.log(password?.value, confirmPassword?.value)
        if (password?.value !== '' && confirmPassword?.value !== '') {
            if (password?.value !== confirmPassword?.value) {
                return { misMatch: true };
            }
        }
        return null;
    }

}