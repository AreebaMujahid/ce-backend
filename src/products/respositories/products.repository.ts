import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProductsRepository {
  constructor(private prisma: PrismaService) {}

  async findBrandsWithCount(skip: number, take: number) {
    const [data, total] = await Promise.all([
      this.prisma.product.groupBy({
        by: ['brand'],
        _min: {
          price: true,
        },

        _max: {
          price: true,
        },
        skip,
        take,
        orderBy: { brand: 'asc' },
      }),

      this.prisma.product
        .groupBy({
          by: ['brand'],
        })
        .then((res) => res.length),
    ]);

    return { data, total };
  }

  async getBrandOptions(brand: string) {
    console.log('brand is ', brand);
    const products = await this.prisma.product.findMany({
      where: {
        brand,
      },
      select: {
        length: true,
        width: true,
      },
    });
    console.log('products are ', products);

    // unique lengths
    const lengths = [...new Set(products.map((p) => p.length))].sort(
      (a, b) => a - b,
    );

    // group widths by length
    const widthsByLength: Record<number, number[]> = {};

    for (const p of products) {
      if (!widthsByLength[p.length]) {
        widthsByLength[p.length] = [];
      }
      widthsByLength[p.length].push(p.width);
    }

    // remove duplicates
    Object.keys(widthsByLength).forEach((key) => {
      widthsByLength[Number(key)] = [
        ...new Set(widthsByLength[Number(key)]),
      ].sort((a, b) => a - b);
    });

    return {
      lengths,
      widthsByLength,
    };
  }
  async lookupProduct(query: { brand: string; length: number; width: number }) {
    return this.prisma.product.findFirst({
      where: {
        brand: query.brand,
        length: query.length,
        width: query.width,
      },
      select: {
        sku: true,
        price: true,
      },
    });
  }
}
