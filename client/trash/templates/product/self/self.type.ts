import { apply, FieldTree, hidden, required, schema } from "@angular/forms/signals";
import { maxLength } from "../../../../utils/custome-validations/max.length";
import { formCommonInitialData, iFormCommonType } from "../../common.type";
import { initialData as brandInitialData, schemaz as brandSchema, iBrand } from "../../public/brand/brand.type";
import { iProductType, initialData as productTypeInitialData, schemaz as productTypeSchema } from "../product-type/product-type.type";

export interface iProductSelf extends iFormCommonType {
    barcode: string | null;
    name: string;
    type: string;
    brand: string;
    serial: string | null;
    model: string | null;
    notes: string | null;
}

export interface iProductSelfExt {
    type: iProductType;
    brand: iBrand;
    product: iProductSelf;
}

export const initialData: iProductSelfExt = {
    type: {
        ...productTypeInitialData,
        isNew: false
    },
    brand: {
        ...brandInitialData,
        isNew: false
    },
    product: {
        ...formCommonInitialData(),
        barcode: null,
        name: '',
        type: '',
        brand: '',
        serial: null,
        model: null,
        notes: null
    }
}

export const selfSchema = schema<iProductSelf>(p => {
    required(p.pk);
    maxLength(p.barcode, 100, { message: 'Barcode must not exceed above 100 characters!' });
    required(p.name, { message: 'Product name should have a value!' });
    maxLength(p.name, 255, { message: 'Product name must not exceed above 255 characters!' });
    required(p.type, { message: 'Product type is required!' });
    required(p.brand, { message: 'Brand for product is required!' });
    maxLength(p.serial, 100, { message: 'Serial number must not exceed above 100 characters!' });
    maxLength(p.model, 100, { message: 'Model must not exceed above 100 characters!' });
    maxLength(p.notes, 1000, { message: 'Product notes must not exceed above 1,000 charecters!' });
});

export const scheamz = schema<iProductSelfExt>(p => {
    apply(p.type, productTypeSchema);
    apply(p.brand, brandSchema);
    apply(p.product, selfSchema);
    hidden(p.type, (ctx) => !ctx.valueOf(p.type.isNew));
    hidden(p.brand, (ctx) => !ctx.valueOf(p.brand.isNew));
});

export function getFormValue(form: FieldTree<iProductSelfExt, string | number>) {
    const {
        type: { isNew: typeNew, ...type },
        brand: { isNew: brandNew, ...brand },
        product: { isNew: productNew, ...product }
    } = form().value();

    return {
        type: typeNew ? type : undefined,
        brand: brandNew ? brand : undefined,
        product
    };
}