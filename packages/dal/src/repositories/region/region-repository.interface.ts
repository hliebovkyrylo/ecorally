import { Region } from './region.entity';
import { Pagination, RegionFilters } from '@ecorally/shared';

export interface IRegionRepository {
  getById(id: string): Promise<Region | null>;

  getAll(
    filters?: RegionFilters,
    pagination?: Pagination,
  ): Promise<{ regions: Region[]; total: number }>;
}
