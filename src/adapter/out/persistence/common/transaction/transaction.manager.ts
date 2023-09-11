import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';

export class TransactionManager {
  private static instance: TransactionManager;

  constructor(@InjectConnection() private readonly connection: Connection) {
    TransactionManager.instance = this;
  }

  static getInstance(): TransactionManager {
    return TransactionManager.instance;
  }

  getConnection(): Connection {
    return this.connection;
  }
}
