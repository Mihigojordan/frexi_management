import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { deleteFile } from 'src/common/utils/file-upload.util';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DestinationService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    try {
      return await this.prisma.destination.create({
        data: {
          name: data.name,
          country: data.country,
          city: data.city,
          description: data.description,
          visaRequirements: data.visaRequirements,
          language: data.language,
          currencyUsed: data.currencyUsed,
          areaKm2: Number(data.areaKm2),
          popularSites: data.popularSites,
          highlights: data.highlights,
          estimatedBudget: Number(data.estimatedBudget),
          mainPhotoUrl: data.mainPhotoUrl,
          gallery: data.gallery,
          isActive: data.isActive ?? true,
        },
      });
    } catch (error) {
      throw new BadRequestException(
        `Failed to create destination: ${error.message}`,
      );
    }
  }

  async findAll() {
    try {
      return await this.prisma.destination.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
    } catch (error) {
      throw new BadRequestException(
        `Failed to fetch destinations: ${error.message}`,
      );
    }
  }

  async findActive() {
    try {
      return await this.prisma.destination.findMany({
        where: {
          isActive: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    } catch (error) {
      throw new BadRequestException(
        `Failed to fetch active destinations: ${error.message}`,
      );
    }
  }

  async findOne(id: string) {
    try {
      const destination = await this.prisma.destination.findUnique({
        where: { id },
      });

      if (!destination) {
        throw new NotFoundException(`Destination with ID ${id} not found`);
      }

      return destination;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(
        `Failed to fetch destination: ${error.message}`,
      );
    }
  }

  async findByCountry(country: string) {
    try {
      return await this.prisma.destination.findMany({
        where: {
          country: {
            contains: country,
          },
          isActive: true,
        },
        orderBy: {
          name: 'asc',
        },
      });
    } catch (error) {
      throw new BadRequestException(
        `Failed to fetch destinations by country: ${error.message}`,
      );
    }
  }

  async update(id: string, data: any) {
    try {
      const existingDestination = await this.prisma.destination.findUnique({
        where: { id },
      });

      if (!existingDestination) {
        throw new NotFoundException(`Destination with ID ${id} not found`);
      }

      return await this.prisma.destination.update({
        where: { id },
        data: {
          ...(data.name && { name: data.name }),
          ...(data.country && { country: data.country }),
          ...(data.city !== undefined && { city: data.city }),
          ...(data.description && { description: data.description }),
          ...(data.visaRequirements !== undefined && {
            visaRequirements: data.visaRequirements,
          }),
          ...(data.language !== undefined && { language: data.language }),
          ...(data.currencyUsed !== undefined && {
            currencyUsed: Number(data.currencyUsed) ,
          }),
          ...(data.areaKm2 !== undefined && { areaKm2: Number(data.areaKm2) }),
          ...(data.popularSites !== undefined && {
            popularSites: data.popularSites,
          }),
          ...(data.highlights !== undefined && { highlights: data.highlights }),
          ...(data.estimatedBudget !== undefined && {
            estimatedBudget: Number(data.estimatedBudget),
          }),
          ...(data.imageUrl !== undefined && { imageUrl: data.imageUrl }),
          ...(data.gallery !== undefined && { gallery: data.gallery }),
          ...(data.isActive !== undefined && { isActive: data.isActive }),
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(
        `Failed to update destination: ${error.message}`,
      );
    }
  }

  async remove(id: string) {
    try {
      const existingDestination = await this.prisma.destination.findUnique({
        where: { id },
      });

      if (!existingDestination) {
        throw new NotFoundException(`Destination with ID ${id} not found`);
      }

      // ✅ Delete main image if exists
      if (existingDestination.mainPhotoUrl) {
        deleteFile(existingDestination.mainPhotoUrl);
      }

      // ✅ Delete all gallery images if exists
      if (
        Array.isArray(existingDestination.gallery) &&
        existingDestination.gallery.length > 0
      ) {
        existingDestination.gallery.forEach((imgPath) => deleteFile(String(imgPath)));
      }

      await this.prisma.destination.delete({
        where: { id },
      });

      return { message: 'Destination deleted successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(
        `Failed to delete destination: ${error.message}`,
      );
    }
  }

  async softDelete(id: string) {
    try {
      const existingDestination = await this.prisma.destination.findUnique({
        where: { id },
      });

      if (!existingDestination) {
        throw new NotFoundException(`Destination with ID ${id} not found`);
      }

      return await this.prisma.destination.update({
        where: { id },
        data: {
          isActive: false,
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(
        `Failed to soft delete destination: ${error.message}`,
      );
    }
  }

  async search(query: string) {
    try {
      return await this.prisma.destination.findMany({
        where: {
          OR: [
            {
              name: {
                contains: query,
              },
            },
            {
              country: {
                contains: query,
              },
            },
            {
              city: {
                contains: query,
              },
            },
          ],
          isActive: true,
        },
        orderBy: {
          name: 'asc',
        },
      });
    } catch (error) {
      throw new BadRequestException(
        `Failed to search destinations: ${error.message}`,
      );
    }
  }
}
