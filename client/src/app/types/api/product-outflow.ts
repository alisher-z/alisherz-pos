export interface ProductOutflowAPIType {
   pk: string;
   id: string;
   date: Date;
   customer: string;
   notes: string | null;
   items: ProductOutflowItemAPIType[]
}

export interface ProductOutflowItemAPIType {
   pk: string;
   outflow: string;
   product: string;
   price: string;
   quantity: number;
   notes: string | null;
}