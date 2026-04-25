import { Injectable } from '@angular/core';
import { HttpParty } from '../party.http';

@Injectable({ providedIn: 'root' })
export class HttpCustomer extends HttpParty {
  protected override model: string = 'customer';
}
