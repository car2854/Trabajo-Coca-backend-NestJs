import { Controller, Get, HttpStatus, Res, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { query, Response, } from 'express';
import { Categorias } from 'src/entities/category.entity';
import { CreateCategoryValidator } from 'src/validators/create-category-validator';
import { UpdateCategoryValidator } from 'src/validators/update-category-validator';
import { CategoryService, } from './category.service';

@Controller('category')
export class CategoryController {

  constructor(
    private categoryService: CategoryService
  ){}

  @Get()
  public async getCategories(@Query() query, @Res() res: Response){
    const categories = await this.categoryService.find(query.text);
    return res.status(HttpStatus.OK).json({
      ok: true,
      categories
    });
  }

  @Get(':id')
  public async getCategorie(@Param() param,@Res() res: Response){
    const category = await this.categoryService.findById(param.id);
    return res.status(HttpStatus.OK).json({
      ok: true,
      category
    });
  }
  
  @Post()
  public async createCategory(@Body() body: CreateCategoryValidator ,@Res() res: Response){
    const newDataCategory = new Categorias();
    newDataCategory.nombre = body.nombre;
    newDataCategory.sabor = body.sabor;
    const category = await this.categoryService.save(newDataCategory);
    return res.status(HttpStatus.OK).json({
      ok: true,
      category
    });
  }

  @Put(':id')
  public async updateCategory(@Body() body: UpdateCategoryValidator, @Param() param, @Res() res: Response){
    const category = await this.categoryService.findById(param.id);
    if (!category){
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        msg: 'No existe esa categoria'
      });
    }
    const newCategory = await this.categoryService.update(param.id, body);
    return res.status(HttpStatus.OK).json({
      ok: true,
      newCategory
    });
  }
  
  @Delete(':id')
  public async deleteCategory(@Param() param,@Res() res: Response){
    const category = await this.categoryService.findById(param.id);
    if (!category){
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        msg: 'No existe esa categoria'
      });
    }
    await this.categoryService.delete(param.id);
    return res.status(HttpStatus.OK).json({
      ok:true,
      category
    });

  }
}
