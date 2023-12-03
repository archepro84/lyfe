import { AsyncLocalStorage } from 'node:async_hooks';
import { ClientSession } from 'mongoose';

// docs: https://nodejs.org/docs/latest-v18.x/api/async_context.html
export class TransactionSessionStorage {
  private sessionStorage: AsyncLocalStorage<ClientSession>;

  constructor() {
    this.sessionStorage = new AsyncLocalStorage();
  }

  setTransaction(session: ClientSession): void {
    this.sessionStorage.enterWith(session);
  }

  getTransaction(): ClientSession {
    return this.sessionStorage.getStore();
  }
}

export const transactionSessionStorage = new TransactionSessionStorage();
