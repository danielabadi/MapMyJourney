import { Knex } from 'knex';
import { FileSystemConfig } from '../../common/FileSystemConfig';
import { UserId } from '../../users/user-profile/UserId';
import { Marker } from './Marker';
import { MarkerId } from './MarkerId';
import { MarkerPersistence } from './MarkerPersistence';
import { MarkerPhoto } from './MarkerPhoto';
import { MarkerPhotoPersistence } from './MarkerPhotoPersistence';
import { MarkerPosition } from './MarkerPosition';
import { MarkerStatus } from './MarkerStatus';
import { MarkerTitle } from './MarkerTitle';

export interface MarkerRepository {
    insert(marker: Marker): Promise<MarkerId>;
    update(marker: Marker): Promise<MarkerId>;
    getById(markerId: MarkerId): Promise<Marker | null>;
    getByUserId(userId: UserId): Promise<Marker[] | null>;
}

export class SQLMarkerRepository implements MarkerRepository {
    private readonly knex: Knex;
    private readonly fileSystemConfig: FileSystemConfig;
    private readonly markersTableName: string;
    private readonly photosTableName: string;

    public constructor(
        knex: Knex,
        fileSystemConfig: FileSystemConfig,
        markersTableName: string,
        photosTableName: string,
    ) {
        this.knex = knex;
        this.fileSystemConfig = fileSystemConfig;
        this.markersTableName = markersTableName;
        this.photosTableName = photosTableName;
    }

    MarkerPersistence = () => {
        return this.knex<MarkerPersistence>(this.markersTableName);
    };

    MarkerPhotoPersistence = () => {
        return this.knex<MarkerPhotoPersistence>(this.photosTableName);
    };

    public async insert(marker: Marker): Promise<MarkerId> {
        const persistenceModel: MarkerPersistence = this.toMarkerPersistence(marker);

        const createdMarker: any[] = await this.knex.transaction(async (trx) => {
            const createdMarker = await trx<MarkerPersistence>(this.markersTableName).insert(persistenceModel, 'id');

            const persistencePhotos: MarkerPhotoPersistence[] = marker.photos.map((element) =>
                this.toMarkerPhotoPersistence(marker, element),
            );
            if (persistencePhotos.length > 0) {
                await trx<MarkerPhotoPersistence>(this.photosTableName).insert(persistencePhotos);
            }
            return createdMarker;
        });
        const createdMarkerId = createdMarker[0];

        return MarkerId.create(createdMarkerId.id);
    }

    public async update(marker: Marker): Promise<MarkerId> {
        const persistenceModel: MarkerPersistence = this.toMarkerPersistence(marker);

        const updatedMarker: any[] = await this.knex.transaction(async (trx) => {
            const updatedMarker = await trx<MarkerPersistence>(this.markersTableName)
                .where('id', persistenceModel.id)
                .update(persistenceModel, 'id');

            const persistencePhotos: MarkerPhotoPersistence[] = marker.photos.map((element) =>
                this.toMarkerPhotoPersistence(marker, element),
            );
            const currentPersistedPhotos: MarkerPhotoPersistence[] = await trx<MarkerPhotoPersistence>(
                this.photosTableName,
            ).where('marker_id', persistenceModel.id);
            if (currentPersistedPhotos.length > 0) {
                currentPersistedPhotos.forEach((photo) =>
                    this.fileSystemConfig.removeFile(this.fileSystemConfig.getUploadPath() + photo.filename),
                );

                await trx<MarkerPhotoPersistence>(this.photosTableName)
                    .where('marker_id', persistenceModel.id)
                    .delete();
            }
            if (persistencePhotos.length > 0) {
                await trx<MarkerPhotoPersistence>(this.photosTableName).insert(persistencePhotos);
            }

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
        const persistedPhotos: null | MarkerPhotoPersistence[] = await this.MarkerPhotoPersistence().where(
            'marker_id',
            markerId.id,
        );

        const domainModel = this.toDomain(persistedModel, persistedPhotos == null ? [] : persistedPhotos);

        return domainModel;
    }

    public async getByUserId(userId: UserId): Promise<Marker[] | null> {
        const persistedModel = await this.MarkerPersistence().where('user_id', userId.id);

        if (persistedModel === undefined) {
            return null;
        }

        const markerPromises: Promise<Marker>[] = persistedModel.map(async (element) => {
            const persistedPhotos: null | MarkerPhotoPersistence[] = await this.MarkerPhotoPersistence().where(
                'marker_id',
                element.id,
            );
            return this.toDomain(element, persistedPhotos == null ? [] : persistedPhotos);
        });
        const markers: Marker[] = await Promise.all(markerPromises);

        return markers;
    }

    private toDomain(persistedModel: MarkerPersistence, photos: MarkerPhotoPersistence[]): Marker {
        return Marker.create(
            UserId.create(persistedModel.user_id),
            MarkerId.create(persistedModel.id),
            MarkerStatus.create(persistedModel.status),
            MarkerTitle.create(persistedModel.title),
            persistedModel.description,
            new Date(persistedModel.start_date),
            new Date(persistedModel.end_date),
            MarkerPosition.create(persistedModel.lat, persistedModel.lng),
            photos.map((element) => MarkerPhoto.create(element.filename)),
        );
    }

    private toMarkerPersistence(domainModel: Marker): MarkerPersistence {
        return {
            user_id: domainModel.userId.id,
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

    private toMarkerPhotoPersistence(domainModel: Marker, photo: MarkerPhoto): MarkerPhotoPersistence {
        return {
            filename: photo.filename,
            marker_id: domainModel.id.id,
        };
    }
}
