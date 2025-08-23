import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { ContactMessageService } from './contact-message.service';

@Controller('contact-messages')
export class ContactMessageController {
  constructor(private readonly contactService: ContactMessageService) {}

  @Post()
  async create(
    @Body()
    body: { firstName: string; email: string; message: string },
  ) {
    return this.contactService.create(body);
  }

  @Get()
  async findAll() {
    return this.contactService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.contactService.findOne(Number(id));
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.contactService.remove(Number(id));
  }
}
