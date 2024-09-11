import { BaseEntity } from "@entities/BaseEntity";
import { BaseRepository } from "@repositories/BaseRepository";
import { IBaseService } from "./IBaseService";

export class BaseService<T extends BaseEntity> implements IBaseService<T> {
    private repository: BaseRepository<T>;

    constructor(repository: BaseRepository<T>) {
        this.repository = repository;
    }

    async getAll(filter: any): Promise<T[]> {
        return this.repository.getAll(filter);
    }

    async getById(id: string): Promise<T | null> {
        return this.repository.getById(id);
    }

    async save(entity: T): Promise<T> {
        return await this.repository.save(entity);
    }

    async update(entity: T, id: string): Promise<T> {
        return await this.repository.update(entity, id);
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}

