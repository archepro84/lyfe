export interface UserActivityUsecase {
  updateLoginTime(userId: string): Promise<void>;
}

export const USER_ACTIVITY_USECASE = Symbol('UserActivityUsecase');
