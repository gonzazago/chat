import { BaseEntity } from "@entities/BaseEntity";
import { BaseRepository } from "@repositories/BaseRepository";
import { IBaseService } from "./IBaseService";

export function BaseService<T extends BaseEntity>(repository: BaseRepository<T>): IBaseService<T> {

    return {
        getAll: async () => {
            return repository.getAll();
        },
        getById: async (id: string) => {
            return repository.getById(id);
        },
        save:async (entity:T) => {
            return await repository.save(entity);
        },
        update:async (entity:T,id: string) => {
            return await repository.update(entity,id);
        },
        delete:async (id:string) => {
            repository.delete(id)
        }

    }

}

