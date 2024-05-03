export interface IAuthRepository<T> {
    create(data: T): T;
    save(entity: any, options?: any): Promise<T>;
    findByEmail(email: string): Promise<T | null>;
  }