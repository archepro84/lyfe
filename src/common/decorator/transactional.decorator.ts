import { TransactionManager } from '@adapter/out/persistence/common/transaction/transaction.manager';
import { transactionSessionStorage } from '@adapter/out/persistence/common/transaction/transaction.session.storage';

export function Transactional() {
  return function (
    target: any,
    propertyName: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const transactionManager = TransactionManager.getInstance();
      const connection = transactionManager.getConnection();

      if (transactionSessionStorage.getTransaction()) {
        await originalMethod.apply(this, args);
      }

      const session = await connection.startSession();
      transactionSessionStorage.setTransaction(session);

      try {
        session.startTransaction();
        await originalMethod.apply(this, args);
        await session.commitTransaction();
      } catch (err) {
        await session.abortTransaction();
        throw err;
      } finally {
        await session.endSession();
      }
    };

    return descriptor;
  };
}
