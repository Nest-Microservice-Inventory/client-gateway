import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { NATS_SERVICE } from 'src/config/services';
import { ClientProxy } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {

  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ){}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.client.send("createProduct", createProductDto)
  }

  @Get()
  findAll() {
    console.log("gateway")
    return this.client.send("findAllProducts", {})
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.client.send("findOneProduct", id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.client.send("updateProduct", { id, updateProductDto })
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.client.send("removeProduct", id)
  }
}
