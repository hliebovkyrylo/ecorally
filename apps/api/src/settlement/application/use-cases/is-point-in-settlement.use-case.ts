import { SettlementRepository } from 'src/settlement/domain/interfaces/settlement-repository.interface';
import { IsPointInsideSettlement } from '../../domain/interfaces/is-point-in-settlement-use-case.interface';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { OverpassRepository } from '../../../overpass/domain/interfaces/overpass-repository.interface';
import * as turf from '@turf/turf';
import { Feature, FeatureCollection, MultiPolygon, Polygon } from 'geojson';

@Injectable()
export class IsPointInsideSettlementUseCase implements IsPointInsideSettlement {
  constructor(
    @Inject('SETTLEMENT_REPOSITORY') private readonly settlementRepository: SettlementRepository,
    @Inject('OVERPASS_REPOSITORY') private readonly overpassRepository: OverpassRepository,
  ) {}

  async execute(settlementId: string, lon: number, lat: number): Promise<boolean> {
    try {
      const settlement = await this.settlementRepository.getById(settlementId, {
        includeRegion: true,
      });

      if (!settlement) {
        throw new NotFoundException(`Settlement with id ${settlementId} not found.`);
      }

      const settlementGeojson = await this.overpassRepository.fetchSettlementBoundaries(
        settlement,
        settlement.region,
      );

      const point = turf.point([lon, lat]);

      const featureCollection = settlementGeojson as FeatureCollection;
      return turf.booleanPointInPolygon(
        point,
        featureCollection.features[0] as Feature<Polygon | MultiPolygon>,
      );
    } catch (error: unknown) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException(
        `Failed to check point: ${error instanceof Error ? error.message : JSON.stringify(error)}`,
      );
    }
  }
}
