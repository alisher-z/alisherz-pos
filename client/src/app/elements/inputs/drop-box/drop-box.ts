import { CdkOverlayOrigin } from "@angular/cdk/overlay";
import { NgTemplateOutlet } from "@angular/common";
import { Component, effect } from '@angular/core';
import { Popup } from "../../popup/popup";
import { DropBoxInit } from './drop-box.init';
import { DropBoxService } from './drop-box.service';
import { DropBoxList } from "./list/list";
import { DropBoxSearch } from "./search/search";

@Component({
  selector: 'drop-box',
  templateUrl: './drop-box.html',
  styleUrl: './drop-box.scss',
  imports: [DropBoxSearch, DropBoxList, CdkOverlayOrigin, Popup, NgTemplateOutlet],
  providers: [DropBoxService]
})
export class DropBoxInput extends DropBoxInit {
  blur(item: any) {
    this.left.emit(item);
  }
  onItem = effect(() => this.live.emit(this.service.item()));
}
