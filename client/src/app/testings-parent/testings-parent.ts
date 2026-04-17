import { Component } from '@angular/core';
import { Testings } from "../testings/testings";

@Component({
  selector: 'app-testings-parent',
  imports: [Testings],
  templateUrl: './testings-parent.html',
  styleUrl: './testings-parent.scss',
})
export class TestingsParent {

}
