import { TransactionManager } from '@infrastructure/out/persistence/common/transaction/transaction.manager';
import { transactionSessionStorage } from '@infrastructure/out/persistence/common/transaction/transaction.session.storage';

// FIXME: Custom Decorator가 Nest.js의 의존성을 가지고 있는 것은 Clean Architecutre의 의도에 부합하지 않음
export function Transactional() {
  return function (
    target: any,
    propertyName: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      // TODO: transactionManager 인스턴스가 없는 경우 테스트 코드 실행으로 간주함.
      const transactionManager = TransactionManager.getInstance();
      if (!transactionManager) {
        return await originalMethod.apply(this, args);
      }
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
