import { SavesDeletesType } from "./common";
import { ProductOutflowItemType } from "./product-outflow-item";
import { RepairOutflowServiceType } from "./repair-outflow-service";

export interface RepairOutflowType {
  pk: string;
  id: string | null;
  date: Date;
  ticket: string;
  customer: string;
  notes: string | null;
  item: SavesDeletesType<ProductOutflowItemType>,
  service: SavesDeletesType<RepairOutflowServiceType>
}

// export interface RepairOutflowTypeExt {
//   customer: CustomerType;
//   ticket: TicketTypeExt;
//   outflow: RepairOutflowType;
// }