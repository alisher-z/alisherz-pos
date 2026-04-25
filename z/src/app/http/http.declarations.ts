import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { APIQuery } from './types';

@Injectable()
export abstract class HttpDeclarations {
  protected abstract namespace: string;
  protected abstract model: string;

  protected readonly url = 'http://localhost:3000';
  protected readonly http = inject(HttpClient);
  protected readonly chunksParams = computed(() => ({
    limit: this.pagination.limit(),
    page: this.pagination.page(),
    pk: this.query.pk(),
    search: this.query.search(),
    reset: this.query.reset(),
  }));

  readonly pagination = {
    limit: signal(750),
    page: signal(0),
  };

  readonly query = {
    pk: signal(''),
    search: signal(''),
    reset: signal(false),
  };

  setQuery({ pk, search, reset }: Partial<APIQuery>) {
    this.query.pk.set(pk ?? '');
    this.query.search.set(search ?? '');
    this.query.reset.set(reset ?? false);
  }

  setPagination({ limit, page }: { limit?: number; page?: number }) {
    this.pagination.limit.set(limit ?? 750);
    this.pagination.page.set(page ?? 0);
  }

  getURI(path: string = '') {
    return `${this.url}/${this.namespace}/${this.model}/${path}`;
  }
}
