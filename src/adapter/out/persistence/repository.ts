import { ClientSession, Document, Model } from 'mongoose';
import {
  Paginated,
  PaginatedQueryParams,
  RepositoryPort,
} from '@application/port/out/repository.port';
import { MapperPort } from '@application/port/out/mapper.port';
import { Domain } from '@domain/domain';
import { TransactionSessionStorage } from '@adapter/out/persistence/common/transaction/transaction.session.storage';

export abstract class Repository<
  Entity extends Document,
  DomainType extends Domain,
> implements RepositoryPort<DomainType>
{
  protected constructor(
    private readonly model: Model<Entity>,
    private readonly mapper: MapperPort<Entity, DomainType>,
    protected readonly transactionSessionStorage: TransactionSessionStorage,
  ) {}

  protected getSession(): ClientSession {
    return this.transactionSessionStorage.getTransaction();
  }

  async findById(id: any): Promise<DomainType> {
    return this.mapper.toDomain(await this.model.findById(id).exec());
  }

  async findMany(): Promise<DomainType[]> {
    return this.mapper.toDomains(await this.model.find({}).limit(10).exec());
  }

  async findManyPaginated(
    params: PaginatedQueryParams,
  ): Promise<Paginated<DomainType>> {
    const domains = this.mapper.toDomains(
      await this.model.find({}).skip(params.page).limit(params.limit).exec(),
    );

    return new Paginated({
      data: domains,
      count: domains.length,
      limit: params.limit,
      page: params.page,
    });
  }

  async insert(DomainType: DomainType): Promise<void> {
    await this.save(DomainType);
  }

  async delete(DomainType: DomainType): Promise<boolean> {
    const result = await this.model.deleteOne({ _id: DomainType.id });
    return result.deletedCount > 0;
  }

  async save(DomainType: DomainType): Promise<void> {
    const entity = this.mapper.toPersistence(DomainType);
    await entity.save({ session: this.getSession() });
  }
}
