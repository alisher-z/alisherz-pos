import { Component, inject, input } from '@angular/core';
import { FieldTree } from '@angular/forms/signals';
import { ActivatedRoute, Router, RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { HttpServiceDurationZ } from '../../../../../elements/inputs/duration/duration.http';
import { RepairOutflowType } from '../../../../../types/form/repair-outflow';
import { RepairOutflowChildrenBridge } from './extra/children.bridge';
import { RepairOutflowItems } from "./extra/items/items";
import { RepairOutflowChildrenTransformer } from './extra/transformer';

@Component({
  selector: 'repair-outflow-children-templatez',
  templateUrl: './children.html',
  styleUrl: './children.scss',
  imports: [RouterOutlet, RouterLinkWithHref, RepairOutflowItems],
  providers: [RepairOutflowChildrenBridge, RepairOutflowChildrenTransformer, HttpServiceDurationZ]
})
export class RepairOutFlowChildrenTemplate {
  constructor() {
    this.bridge.tree = this.tree;
  }

  tree = input.required<FieldTree<RepairOutflowType>>();

  router = inject(Router);
  route = inject(ActivatedRoute);
  bridge = inject(RepairOutflowChildrenBridge);
  transformer = inject(RepairOutflowChildrenTransformer);

  edit(item: any) {
    if (!item) return;

    if (item.product)
      this.bridge.itemIndex = item.vindex;
    else if (item.service)
      this.bridge.serviceIndex = item.vindex;

    this.router.navigate(['item'], { relativeTo: this.route });
  }
}
