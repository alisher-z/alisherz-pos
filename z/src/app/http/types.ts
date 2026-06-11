import { WritableSignal } from '@angular/core';

export type APIQuery = {
  pk: string | null;
  search: string;
  reset: boolean;
} & Record<string, any>;

export type APIQuerySignal = {
  pk: WritableSignal<string>;
  search: WritableSignal<string>;
  reset: WritableSignal<boolean>;
} & Record<string, WritableSignal<any>>;

export type SearchFields = {
  field: string;
  label: string;
};
