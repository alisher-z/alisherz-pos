import { Injectable } from '@angular/core';
import { HttpParty } from '../party.http';

@Injectable({ providedIn: 'root' })
export class HttpCustomer extends HttpParty {
  protected override model: string = 'customer';
  override readonly searchFields = [
    { label: 'Name', field: 'name' },
    { label: 'Phone', field: 'phone' },
    { label: 'Email', field: 'email' },
    { label: 'ID', field: 'id' },
    { label: 'Address', field: 'address' },
    { label: 'Notes', field: 'notes' },
  ];
}
