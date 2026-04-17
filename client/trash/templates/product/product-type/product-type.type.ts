import { required, schema } from "@angular/forms/signals";
import { maxLength } from "../../../../utils/custome-validations/max.length";
import { formCommonInitialData, iFormCommonType } from "../../common.type";

export interface iProductType extends iFormCommonType {
    name: string;
    active: boolean;
    notes: string | null;
}

export const initialData: iProductType = {
    ...formCommonInitialData(),
    name: '',
    active: true,
    notes: null
}

export const schemaz = schema<iProductType>(p => {
    required(p.pk);


    required(p.name, {
        message: 'Product type name should have a value!'
    });


    maxLength(p.name, 255, {
        message: 'Product type nume must not exceed above 255 characters!'
    });


    maxLength(p.notes, 1000, {
        message: 'Product type notes must not exceed above 1,000 charecters!'
    });
});