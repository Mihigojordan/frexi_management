import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { deleteFile } from 'src/common/utils/file-upload.util';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BlogService {
    constructor(private prisma: PrismaService) { }

    async create(data: any) {
        try {
            // Convert description string to JSON format
            const description = data.description;
            const descriptionJson = description
                ? { details: description }
                : { details: '' };

            data.description = descriptionJson;

            return await this.prisma.blog.create({
                data,
                include: {
                    author: {
                        select: {
                            id: true,
                            adminName: true,
                            adminEmail: true
                        }
                    }
                }
            });
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async findAll() {
        try {
            return await this.prisma.blog.findMany({
                include: {
                    author: {
                        select: {
                            id: true,
                            adminName: true,
                            adminEmail: true
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async findOne(id: string) {
        try {
            const blog = await this.prisma.blog.findUnique({
                where: { id },
                include: {
                    author: {
                        select: {
                            id: true,
                            adminName: true,
                            adminEmail: true
                        }
                    }
                }
            });
            if (!blog) throw new NotFoundException('Blog not found');
            return blog;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new BadRequestException(error.message);
        }
    }

    async update(id: string, data: any) {
        try {
            const blog = await this.findOne(id); // ensure exists

            // Convert description string to JSON format
            if (data.description !== undefined) {
                const description = data.description;
                const descriptionJson = description
                    ? { details: description }
                    : { details: '' };

                data.description = descriptionJson;
            }

            // Delete old image if new one is uploaded
            if (data.imageUrl && blog.imageUrl) {
                deleteFile(String(blog.imageUrl));
            }

            return await this.prisma.blog.update({
                where: { id },
                data,
                include: {
                    author: {
                        select: {
                            id: true,
                            adminName: true,
                            adminEmail: true
                        }
                    }
                }
            });
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new BadRequestException(error.message);
        }
    }

    async remove(id: string) {
        try {
            const blog = await this.findOne(id);

            // Delete associated image file
            if (blog.imageUrl) {
                deleteFile(String(blog.imageUrl));
            }

            return await this.prisma.blog.delete({ where: { id } });
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new BadRequestException(error.message);
        }
    }
}