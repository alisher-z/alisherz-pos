import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { form } from '@angular/forms/signals';
import { PRODUCT_OUTFLOW_ITEM_SCHEMA } from '../../../../../../../schemas/product-outflow-item';
import { REPAIR_OUTFLOW_SERVICE_SCHEMA } from '../../../../../../../schemas/repair-outflow-service';
import { getProductOutflowItemInitData, getProductOutflowItemValues } from '../../../../../../data/product-outflow-item';
import { getRepairOutflowServiceInitData, getRepairOutflowServiceValues } from '../../../../../../data/repair-outflow-service';
import { ProductOutflowItemType } from '../../../../../../types/form/product-outflow-item';
import { RepairOutflowServiceType } from '../../../../../../types/form/repair-outflow-service';
import { LocalFormZ } from "../../../../local-form/local-form";
import { ProductOutflowItemTemplate } from "../../../../product/outflow/items/item/item";
import { RepairOutflowChildrenBridge } from '../extra/children.bridge';
import { RepairOutflowItems } from "../extra/items/items";
import { RepairOutflowServiceTemplate } from "../service/service";

@Component({
  selector: 'repair-outflow-form-input',
  imports: [LocalFormZ, RepairOutflowServiceTemplate, ProductOutflowItemTemplate, FormsModule, RepairOutflowItems],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class RepairOutflowFormInput {
  serviceModel = signal<RepairOutflowServiceType>(getRepairOutflowServiceInitData());
  serviceForm = form(this.serviceModel, REPAIR_OUTFLOW_SERVICE_SCHEMA);

  itemModel = signal<ProductOutflowItemType>(getProductOutflowItemInitData());
  itemForm = form(this.itemModel, PRODUCT_OUTFLOW_ITEM_SCHEMA);

  bridge = inject(RepairOutflowChildrenBridge);

  option = signal<string>('service');

  setOutflowPK = effect(() => {
    const pk = this.bridge.outflowPK();
    this.serviceForm.outflow().value.set(pk);
    this.itemForm.outflow().value.set(pk);
  });

  ngOnInit() {
    if (this.bridge.itemIndex >= 0)
      this.setItem(this.bridge.itemIndex);

    if (this.bridge.serviceIndex >= 0)
      this.setService(this.bridge.serviceIndex);
  }

  ngOnDestroy() {
    this.resetIndeces();
  }

  setItem(index: number) {
    this.option.set('item');
    this.itemForm().value.set(
      this.bridge.itemsClone[index]
    );
  }

  setService(index: number) {
    this.option.set('service');
    this.serviceForm().value.set(
      this.bridge.servicesClone[index]
    );
  }

  submit() {
    const option = this.option();

    if (option === 'service') {
      const values = getRepairOutflowServiceValues(this.serviceForm);
      this.bridge.upsertService(values);
    }

    else {
      const values = getProductOutflowItemValues(this.itemForm);
      this.bridge.upsertItem(values);
    }

    this.reset();
  }

  edit(item: any) {
    if (!item) return;

    if (item.product) {
      this.bridge.itemIndex = item.vindex;
      this.setItem(item.vindex);
    }
    else if (item.service) {
      this.bridge.serviceIndex = item.vindex;
      this.setService(item.vindex);
    }
  }

  reset() {
    this.resetService();
    this.resetItem();
    this.resetIndeces();
  }

  resetService() {
    this.serviceForm().reset(
      getRepairOutflowServiceInitData({
        outflow: this.bridge.outflowPK()
      })
    );
    this.resetIndeces();
  }

  resetItem() {
    this.itemForm().reset(
      getProductOutflowItemInitData({
        outflow: this.bridge.outflowPK()
      })
    );
    this.resetIndeces();
  }

  resetIndeces() {
    this.bridge.itemIndex = -1;
    this.bridge.serviceIndex = -1;
  }
}
