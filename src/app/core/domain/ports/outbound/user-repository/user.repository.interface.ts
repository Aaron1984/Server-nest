export interface IUserRepository<T> {
    save(entity: T, options?: any): Promise<T>;
    find(options?: any): Promise<T[]>;
    findById(id: number): Promise<T | null>;
    remove(entity: T, options?: any): Promise<T>;
  }
