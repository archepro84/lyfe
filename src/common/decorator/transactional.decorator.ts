// TODO: Custom Decorator가 Nest.js의 의존성을 가지고 있는 것은 Clean Architecutre의 의도에 부합하지 않음
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
        return await originalMethod.apply(this, args);
      }

      const session = await connection.startSession();
      transactionSessionStorage.setTransaction(session);

      try {
        session.startTransaction();
        const result = await originalMethod.apply(this, args);
        await session.commitTransaction();
        return result;
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
