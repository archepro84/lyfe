import { Domain } from '@domain/domain';

export interface MapperPort<Entity, DomainType extends Domain> {
  toDomain(entity: Entity): DomainType;

  toDomains(entities: Entity[]): DomainType[];

  toPersistence(DomainType: DomainType): Entity;
}
