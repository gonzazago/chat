import { BaseEntity } from "@entities/BaseEntity";

export interface IBaseService <T extends BaseEntity>{
    getAll(): Promise<T[]>
    getById(id: string): Promise<T | null>
    save(entity: T): Promise<T>
    update(entity: T, id: string): Promise<T>
    delete(id: string): Promise<void>
}