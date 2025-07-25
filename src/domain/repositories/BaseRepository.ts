import { BaseEntity } from "@entities/BaseEntity";

export interface BaseRepository<T extends BaseEntity> {

    getAll(filter: any): Promise<T[]>
    getById(id: string): Promise<T | null>
    save(entity: T): Promise<T>
    update(entity: T, id: string): Promise<T>
    delete(id: string): Promise<void>
}