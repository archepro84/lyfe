import { Injectable } from '@nestjs/common';
import { MapperPort } from '@application/port/out/mapper.port';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { VoteEntity } from '@infrastructure/adapter/out/persistence/topic/schema/vote.schema';
import { Vote, VoteFactory } from '@domain/topic/vote/vote';
import { VoteItem } from '@domain/topic/vote/vote-item';

@Injectable()
export class VoteMapper implements MapperPort<VoteEntity, Vote> {
  constructor(
    @InjectModel(Vote.name) private readonly model: Model<VoteEntity>,
  ) {}

  public toDomain(voteEntity: VoteEntity): Vote {
    if (!voteEntity) return null;

    return VoteFactory.newInstance({
      id: voteEntity._id,
      voteType: voteEntity.voteType,
      createdAt: voteEntity.createdAt,
      updatedAt: voteEntity.updatedAt,
      voteItem: voteEntity.voteItem.map(
        (voteItem) =>
          new VoteItem({
            id: voteItem._id,
            title: voteItem.title,
            index: voteItem.index,
          }),
      ),
    });
  }

  public toDomains(voteEntities: VoteEntity[]): Vote[] {
    return voteEntities.map(this.toDomain);
  }

  public toPersistence(vote: Vote): VoteEntity {
    return new this.model(vote);
  }
}
