import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AuthEntity } from '@infrastructure/adapter/out/persistence/auth/schema/auth.schema';
import { Auth } from '@domain/auth/auth';
import { MapperPort } from '@application/port/out/mapper.port';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthMapper implements MapperPort<AuthEntity, Auth> {
  constructor(
    @InjectModel(Auth.name) private readonly model: Model<AuthEntity>,
  ) {}

  public toDomain(authEntity: AuthEntity): Auth {
    if (!authEntity) return null;

    const auth = new Auth(
      authEntity.id,
      authEntity.phoneNumber,
      authEntity.authCode,
      authEntity.createdAt,
      authEntity.verified,
      authEntity.verifiedAt,
    );

    return auth;
  }

  public toDomains(authEntities: AuthEntity[]): Auth[] {
    return authEntities.map((authEntity) => this.toDomain(authEntity));
  }

  public toPersistence(auth: Auth): AuthEntity {
    return new this.model({
      id: auth.id,
      phoneNumber: auth.phoneNumber,
      authCode: auth.authCode,
      createdAt: auth.createdAt,
      verified: auth.verified,
      verifiedAt: auth.verifiedAt,
    });
  }
}
