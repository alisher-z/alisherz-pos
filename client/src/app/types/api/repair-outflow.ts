export interface RepairOutflowAPIType {
   pk: string;
   id: string | null;
   date: Date;
   notes: string | null;
   ticket: string;
   customer: string;
   items: RepairOutflowItemAPIType[];
   services: RepairOutflowServiceAPIType[];
}

export interface RepairOutflowItemAPIType {
   pk: string;
   notes: string | null;
   price: string;
   outflow: string;
   product: string;
   quantity: number;
}

export interface RepairOutflowServiceAPIType {
   pk: string;
   notes: string | null;
   price: string;
   outflow: string;
   service: string;
   duration: string;
}