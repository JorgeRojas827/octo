export interface IRepository<T> {
  create(data: Partial<T>): Promise<T>;
  get(): Promise<T[]>;
  getByEntityId(id: string): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<T>;
  upsert(data: T): Promise<T>;
}
