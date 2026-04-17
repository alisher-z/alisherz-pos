import { required, schema } from "@angular/forms/signals";
import { maxLength } from "../../../../utils/custome-validations/max.length";
import { formCommonInitialData } from "../../common.type";

export interface iBrand {
    pk: string;
    name: string;
    notes: string | null;
    active: boolean;
    isNew: boolean;
}

export const initialData: iBrand = {
    ...formCommonInitialData(),
    name: '',
    notes: null,
    active: true,
}

export const schemaz = schema<iBrand>(p => {
    required(p.pk);


    required(p.name, {
        message: 'Brand name should have a value!'
    });


    maxLength(p.name, 255, {
        message: 'Brand nume must not exceed above 255 characters!'
    });


    maxLength(p.notes, 1000, {
        message:
            'Brand notes must not exceed above 1,000 charecters!'
    });
})