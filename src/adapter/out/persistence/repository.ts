import { ClientSession, Document, Model } from 'mongoose';
import {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  MAX_LIMIT,
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
    return this.mapper.toDomain(
      await this.model
        .findOne({
          _id: id,
          deletedAt: { $exists: false },
        })
        .session(this.getSession())
        .exec(),
    );
  }

  async findMany(): Promise<DomainType[]> {
    return this.mapper.toDomains(
      await this.model
        .find({ deletedAt: { $exists: false } })
        .limit(10)
        .session(this.getSession())
        .exec(),
    );
  }

  async findManyPaginated(
    params: PaginatedQueryParams,
  ): Promise<Paginated<DomainType>> {
    const page = params.page ?? DEFAULT_PAGE;
    const limit =
      !params.limit || params.limit > MAX_LIMIT ? DEFAULT_LIMIT : params.limit;

    const domains = this.mapper.toDomains(
      await this.model
        .find({ deletedAt: { $exists: false } })
        .skip(page)
        .limit(limit)
        .session(this.getSession())
        .exec(),
    );

    return new Paginated({
      data: domains,
      count: domains.length,
      limit: limit,
      page: page,
    });
  }

  async insert(DomainType: DomainType): Promise<void> {
    await this.save(DomainType);
  }

  async delete(DomainType: DomainType): Promise<boolean> {
    const result = await this.model
      .deleteOne({ _id: DomainType.id })
      .session(this.getSession());
    return result.deletedCount > 0;
  }

  async softDelete(DomainType: DomainType): Promise<boolean> {
    const result = await this.model
      .updateOne({ _id: DomainType.id }, { deletedAt: new Date() })
      .session(this.getSession());

    return result.modifiedCount > 0;
  }

  async save(DomainType: DomainType): Promise<void> {
    const entity = this.mapper.toPersistence(DomainType);
    await entity.save({ session: this.getSession() });
  }
}
