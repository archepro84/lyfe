import { Domain } from '@domain/domain';

export type PaginatedQueryParams = {
  page?: number;
  limit?: number;
};

export class Paginated<T> {
  readonly count: number;
  readonly limit: number;
  readonly page: number;
  readonly data: readonly T[];

  constructor(props: Paginated<T>) {
    this.count = props.count;
    this.limit = props.limit;
    this.page = props.page;
    this.data = props.data;
  }
}

export type OrderBy = {
  field: string | true;
  param: 'asc' | 'desc';
};

export interface RepositoryPort<DomainType extends Domain> {
  findById(id: any): Promise<DomainType>;

  findMany(): Promise<DomainType[]>;

  findManyPaginated(
    params: PaginatedQueryParams,
  ): Promise<Paginated<DomainType>>;

  insert(domain: DomainType): Promise<void>;

  delete(domain: DomainType): Promise<boolean>;

  softDelete(domain: DomainType): Promise<boolean>;

  save(domain: DomainType): Promise<void>;
}
