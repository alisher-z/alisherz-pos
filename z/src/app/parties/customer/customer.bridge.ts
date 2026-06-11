import { inject, Injectable } from '@angular/core';
import { HttpCustomer } from './customer.http';

@Injectable()
export class CustomerBridge {
  http = inject(HttpCustomer);

  customers = this.http.chunks;
}
