import { Controller, Post, Res, Body, HttpStatus, Get, Put, Delete, Param, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { Users } from 'src/entities/users.entity';
import { CreateUserValidator } from 'src/validators/create-user-validator';
import { UserService } from './user.service';

import * as bcrypt from 'bcrypt';
import { UpdatePasswordValidator } from 'src/validators/update-password-validator';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService
  ){}

  @Post('admin')
  public async createUser (@Body() body: CreateUserValidator, @Res() res: Response) {
    const users = await this.userService.find();
    if (users.length > 0){
      return res.status(HttpStatus.UNAUTHORIZED).json({
        ok: false,
        msg: 'Ya existen usuarios creados'
      });
    }
    const salt = bcrypt.genSaltSync();
    const newPassword = bcrypt.hashSync(body.password, salt);
    const admin = new Users();
    admin.email = body.email;
    admin.password = newPassword;
    admin.nombre = body.nombre;
    admin.permisos = 'admin';
    const newAdmin = await this.userService.save(admin);
    return res.status(HttpStatus.OK).json({
      ok: true,
      newAdmin
    });
  }

  @Get()
  public async getUsers(@Res() res: Response){
    const users = await this.userService.find();
    return res.status(HttpStatus.OK).json({
      ok: true,
      users
    });
  }

  @Put('updatePasswordUser/:id')
  public async updatePassword(@Param() param, @Body() body: UpdatePasswordValidator, @Req() req, @Res() res: Response){
    if (parseInt(param.id) === req.uid){
      return res.status(HttpStatus.UNAUTHORIZED).json({
        ok: false,
        msg: 'No puede cambiar su propia contraseña'
      });
    }
    const salt = bcrypt.genSaltSync();
    const newPassword = bcrypt.hashSync(body.password, salt);
    await this.userService.update(req.uid, {password: newPassword});
    return res.status(HttpStatus.OK).json({
      ok: true,
      msg: 'Ok'
    });
  }

  @Delete(':id')
  public async delete(@Param() param, @Req() req, @Res() res: Response){
    const user = await this.userService.findById(param.id);
    if (!user){
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        msg: 'No existe ese usuario'
      });
    }
    if (parseInt(param.id) === req.uid){
      return res.status(HttpStatus.UNAUTHORIZED).json({
        ok: false,
        msg: 'No puedes eliminarte a ti mismo'
      });
    }
    await this.userService.delete(param.id);
    return res.status(HttpStatus.OK).json({
      ok: true,
      user
    });
  }
}
