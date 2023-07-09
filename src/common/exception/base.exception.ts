export class BaseException extends Error {
  constructor(readonly message: string, readonly status: number) {
    super(message);
    this.name = this.constructor.name;
  }
}
