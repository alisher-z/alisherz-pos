import { Injectable } from '@angular/core';
import { HttpBase } from '../http/http.base';

@Injectable()
export abstract class HttpParty extends HttpBase {
  protected override namespace: string = 'party';
}
