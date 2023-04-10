import { Knex } from 'knex';
import { MarkerId } from './MarkerId';
import { Marker } from './Marker';
import { MarkerPersistence } from './MarkerPersistence';
import { UserId } from '../../users/user-profile/UserId';
import { MarkerStatus } from './MarkerStatus';
import { MarkerTitle } from './MarkerTitle';
import { MarkerPosition } from './MarkerPosition';

export interface MarkerRepository {
    insert(Marker: Marker): Promise<MarkerId>;
    update(Marker: Marker): Promise<MarkerId>;
    getById(markerId: MarkerId): Promise<Marker | null>;
    getByUserId(userId: UserId): Promise<Marker[] | null>;
}

export class SQLMarkerRepository implements MarkerRepository {
    private readonly knex: Knex;
    private readonly tableName: string;

    public constructor(knex: Knex, tableName: string) {
        this.knex = knex;
        this.tableName = tableName;
    }

    MarkerPersistence = () => {
        return this.knex<MarkerPersistence>(this.tableName);
    };

    public async insert(marker: Marker): Promise<MarkerId> {
        const persistenceModel: MarkerPersistence = this.toPersistence(marker);

        const createdMarker: any[] = await this.knex.transaction(async (trx) => {
            const createdMarker = await trx<MarkerPersistence>(this.tableName).insert(persistenceModel, 'id');
            return createdMarker;
        });
        const createdMarkerId = createdMarker[0];

        return MarkerId.create(createdMarkerId.id);
    }

    public async update(marker: Marker): Promise<MarkerId> {
        const persistenceModel: MarkerPersistence = this.toPersistence(marker);

        const updatedMarker: any[] = await this.knex.transaction(async (trx) => {
            const updatedMarker = await trx<MarkerPersistence>(this.tableName)
                .where('id', persistenceModel.id)
                .update(persistenceModel, 'id');
            return updatedMarker;
        });
        const updatedMarkerId = updatedMarker[0];

        return MarkerId.create(updatedMarkerId.id);
    }

    public async getById(markerId: MarkerId): Promise<Marker | null> {
        const persistedModel = await this.MarkerPersistence().where('id', markerId.id).first();

        if (persistedModel === undefined) {
            return null;
        }
        const domainModel = this.toDomain(persistedModel);

        return domainModel;
    }

    public async getByUserId(userId: UserId): Promise<Marker[] | null> {
        const persistedModel = await this.MarkerPersistence().where('user_id', userId.id);

        if (persistedModel === undefined) {
            return null;
        }

        const markers: Marker[] = persistedModel.map((element) => {
            return this.toDomain(element);
        });

        return markers;
    }

    private toDomain(persistedModel: MarkerPersistence): Marker {
        return Marker.create(
            UserId.create(persistedModel.user_id),
            MarkerId.create(persistedModel.id),
            MarkerStatus.create(persistedModel.status),
            MarkerTitle.create(persistedModel.title),
            persistedModel.description,
            new Date(persistedModel.start_date),
            new Date(persistedModel.end_date),
            MarkerPosition.create(persistedModel.lat, persistedModel.lng),
        );
    }

    private toPersistence(domainModel: Marker): MarkerPersistence {
        return {
            user_id: domainModel.user_id.id,
            id: domainModel.id.id,
            status: domainModel.status.status,
            title: domainModel.title.title,
            description: domainModel.description,
            start_date: domainModel.start_date.toISOString(),
            end_date: domainModel.end_date.toISOString(),
            lat: domainModel.position.lat,
            lng: domainModel.position.lng,
        };
    }
}
