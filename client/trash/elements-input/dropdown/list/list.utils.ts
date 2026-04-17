import { inject, Injectable } from "@angular/core";
import { DropdownInputUtils } from "../dropdown.utils";

@Injectable()
export class DropdownListUtils {
    dropdown = inject(DropdownInputUtils);


}