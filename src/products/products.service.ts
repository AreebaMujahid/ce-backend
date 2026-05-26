import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './respositories/products.repository';
import { PaginationDto } from 'src/shared/pagination/pagination.input';
import { LookupProductDto } from './dtos/inputs/lookup.input.dto';
@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async getBrands(query: PaginationDto) {
    const page = query.page ?? 1;
    const size = query.size ?? 12;
    const skip = (page - 1) * size;
    const { data, total } = await this.productsRepository.findBrandsWithCount(
      skip,
      size,
    );
    console.log('data is', data);
    const totalPages = Math.ceil(total / size);
    return {
      data: data.map((b) => ({
        brand: b.brand,
        minPrice: b._min.price,
        maxPrice: b._max.price,
      })),

      pagination: {
        total,
        perPage: size,
        currentPage: page,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  }
  async getBrandOptions(brand: string) {
    return this.productsRepository.getBrandOptions(brand);
  }

  async lookupProduct(query: LookupProductDto) {
    return this.productsRepository.lookupProduct(query);
  }
}
