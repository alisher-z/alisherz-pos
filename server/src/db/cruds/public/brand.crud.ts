import { iBrand } from "../../../types/types";
import { PublicCRUD } from "./public.crud";

export class BrandCRUD extends PublicCRUD<iBrand> {
    model = 'brand';
}