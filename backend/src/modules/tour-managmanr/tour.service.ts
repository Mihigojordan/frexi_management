import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { deleteFile } from 'src/common/utils/file-upload.util';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TourService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    try {
      return await this.prisma.tour.create({
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
        `Failed to create tour: ${error.message}`,
      );
    }
  }

  async findAll() {
    try {
      return await this.prisma.tour.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
    } catch (error) {
      throw new BadRequestException(
        `Failed to fetch tours: ${error.message}`,
      );
    }
  }

  async findActive() {
    try {
      return await this.prisma.tour.findMany({
        where: {
          isActive: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    } catch (error) {
      throw new BadRequestException(
        `Failed to fetch active tours: ${error.message}`,
      );
    }
  }

  async findOne(id: string) {
    try {
      const tour = await this.prisma.tour.findUnique({
        where: { id },
      });

      if (!tour) {
        throw new NotFoundException(`tour with ID ${id} not found`);
      }

      return tour;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(
        `Failed to fetch tour: ${error.message}`,
      );
    }
  }

  async findByCountry(country: string) {
    try {
      return await this.prisma.tour.findMany({
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
        `Failed to fetch tours by country: ${error.message}`,
      );
    }
  }

  async update(
    id: string,
    data: {
      name?: string;
      country?: string;
      city?: string;
      description?: string;
      visaRequirements?: string;
      language?: string;
      currencyUsed?: string;
      areaKm2?: number;
      popularSites?: string;
      highlights?: string[];
      estimatedBudget?: number;
      mainPhotoUrl?: string;
      keepGalleryImages?: string; // JSON string of image URLs to keep
      newGalleryImages?: Express.Multer.File[]; // New uploaded images
      isActive?: boolean;
    },
  ) {
    try {
      const existingtour = await this.prisma.tour.findUnique({
        where: { id },
      });

      if (!existingtour) {
        throw new NotFoundException(`tour with ID ${id} not found`);
      }

      if(data.mainPhotoUrl){
        deleteFile(String(existingtour.mainPhotoUrl))
      }

      // Parse keepGalleryImages safely
      let keepGalleryImages: string[] = [];
      try {
        keepGalleryImages = data?.keepGalleryImages
          ? JSON.parse(data.keepGalleryImages)
          : [];
        if (!Array.isArray(keepGalleryImages)) {
          throw new Error('Not an array');
        }
      } catch (error) {
        throw new BadRequestException(
          'Invalid keepGalleryImages format - must be a valid JSON array',
        );
      }

      // Process new gallery images
      const newGalleryImages =
        data.newGalleryImages?.map(
          (file) => `/uploads/gallery/${file.filename}`,
        ) ?? [];

      console.log('Keeping gallery images:', keepGalleryImages.length);
      console.log('New gallery images:', newGalleryImages.length);

      // Optional: Ensure max gallery images limit (adjust as needed)
      const totalGalleryImages =
        keepGalleryImages.length + newGalleryImages.length;
      const maxGalleryImages = 10; // Adjust this limit as needed
      if (totalGalleryImages > maxGalleryImages) {
        throw new BadRequestException(
          `Maximum ${maxGalleryImages} gallery images allowed (existing + new)`,
        );
      }

      // Delete images not in keepGalleryImages from existing gallery
      const currentGallery = (existingtour.gallery as string[]) || [];
      const removedGalleryImages = currentGallery.filter(
        (url) => !keepGalleryImages.includes(url),
      );

      // Delete removed images from storage
      for (const url of removedGalleryImages) {
        try {
          // Assuming you have a deleteFile function similar to your product service
          deleteFile(String(url));
          console.log(`Deleted gallery image: ${url}`);
        } catch (deleteError) {
          console.error(`Failed to delete gallery image ${url}:`, deleteError);
          // Continue with update even if file deletion fails
        }
      }

      // Combine kept images with new images for final gallery
      const finalGallery = [...keepGalleryImages, ...newGalleryImages];

      return await this.prisma.tour.update({
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
            currencyUsed: data.currencyUsed,
          }),
          ...(data.areaKm2 !== undefined && { areaKm2: Number(data.areaKm2) }),
          ...(data.popularSites !== undefined && {
            popularSites: data.popularSites,
          }),
          ...(data.highlights !== undefined && { highlights: data.highlights }),
          ...(data.estimatedBudget !== undefined && {
            estimatedBudget: Number(data.estimatedBudget),
          }),
          ...(data.mainPhotoUrl !== undefined && { mainPhotoUrl: data.mainPhotoUrl }),
          // Update gallery with managed images
          ...((data.keepGalleryImages !== undefined ||
            data.newGalleryImages !== undefined) && {
            gallery: finalGallery,
          }),
        },
      });
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new BadRequestException(
        `Failed to update tour: ${error.message}`,
      );
    }
  }


  async remove(id: string) {
    try {
      const existingtour = await this.prisma.tour.findUnique({
        where: { id },
      });

      if (!existingtour) {
        throw new NotFoundException(`tour with ID ${id} not found`);
      }

      // ✅ Delete main image if exists
      if (existingtour.mainPhotoUrl) {
        deleteFile(existingtour.mainPhotoUrl);
      }

      // ✅ Delete all gallery images if exists
      if (
        Array.isArray(existingtour.gallery) &&
        existingtour.gallery.length > 0
      ) {
        existingtour.gallery.forEach((imgPath) => deleteFile(String(imgPath)));
      }

      await this.prisma.tour.delete({
        where: { id },
      });

      return { message: 'tour deleted successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(
        `Failed to delete tour: ${error.message}`,
      );
    }
  }

  async softDelete(id: string) {
    try {
      const existingtour = await this.prisma.tour.findUnique({
        where: { id },
      });

      if (!existingtour) {
        throw new NotFoundException(`tour with ID ${id} not found`);
      }

      return await this.prisma.tour.update({
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
        `Failed to soft delete tour: ${error.message}`,
      );
    }
  }

  async search(query: string) {
    try {
      return await this.prisma.tour.findMany({
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
        `Failed to search tours: ${error.message}`,
      );
    }
  }
}
