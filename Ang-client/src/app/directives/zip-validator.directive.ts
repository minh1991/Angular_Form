import { Directive } from "@angular/core";
import { NG_VALIDATORS, Validator, AbstractControl } from "@angular/forms";

@Directive({
  selector: "[appZipValidator]",
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ZipValidatorDirective,
      multi: true
    }
  ]
})
export class ZipValidatorDirective {
  constructor() {}
  validate(control: AbstractControl) {
    const elementValue = control.value;
    if (
      elementValue === null ||
      elementValue === undefined ||
      elementValue === ""
    ) {
      return { msg: "trường không được bỏ trống" };
    }

    const reg = new RegExp("(09|01[2|6|8|9])+([0-9]{8})\b");
    if (!reg.test(elementValue)) {
      return { msg: "Không đúng định dạng số ĐT VN" };
    }

    return null;
  }
}
