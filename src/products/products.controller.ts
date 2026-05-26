import { Controller, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Get, Query } from '@nestjs/common';
import { PaginationDto } from 'src/shared/pagination/pagination.input';
import { ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { LookupProductDto } from './dtos/inputs/lookup.input.dto';
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('brands')
  @ApiOperation({
    summary: 'Get paginated grouped brands',
    description: 'Returns unique brands with pagination metadata',
  })
  @ApiResponse({
    status: 200,
    description: 'Brands fetched successfully',
  })
  @Get('brands')
  getBrands(@Query() query: PaginationDto) {
    return this.productsService.getBrands(query);
  }

  //second endpoint
  @Get('brands/options/:brand')
  @ApiOperation({
    summary: 'Get brand options (lengths & widths)',
    description:
      'Returns all available lengths and grouped widths for a specific brand. Used for dependent dropdowns in product UI.',
  })
  @ApiParam({
    name: 'brand',
    type: String,
    example: 'Nike',
    description: 'Brand name (case-sensitive depending on DB)',
  })
  @ApiResponse({
    status: 200,
    description: 'Brand options fetched successfully',
    schema: {
      example: {
        lengths: [25, 26, 27],
        widthsByLength: {
          '25': [6, 7],
          '26': [8, 9],
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'No products found for this brand',
  })
  getBrandOptions(@Param('brand') brand: string) {
    return this.productsService.getBrandOptions(brand);
  }

  //third endpoint
  //on basis of selected length and related width , need to fetch price and product SKU on given length and width
  @Get('lookup')
  @ApiOperation({
    summary: 'Lookup product SKU and price',
    description:
      'Returns exact SKU and price based on selected brand, length, and width.',
  })
  @ApiQuery({
    name: 'brand',
    example: 'Nike',
    required: true,
  })
  @ApiQuery({
    name: 'length',
    example: 25,
    required: true,
  })
  @ApiQuery({
    name: 'width',
    example: 6,
    required: true,
  })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        sku: 'NK-25-6-001',
        price: 99.99,
      },
    },
  })
  lookupProduct(@Query() query: LookupProductDto) {
    return this.productsService.lookupProduct(query);
  }
}
