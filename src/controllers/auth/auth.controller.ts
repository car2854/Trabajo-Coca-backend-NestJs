import { Controller, Post, Req, Res, HttpStatus, Body, Get } from '@nestjs/common';
import { Response } from 'express';
import { generateJwt } from 'src/helpers/generateJwt';
import { LoginValidator } from 'src/validators/login-validator';
import { AuthService } from './auth.service';

import { sidebar } from '../../helpers/sidebar-dev';

import * as bcrypt from 'bcrypt';
import { LoginUserMobileValidator } from 'src/validators/login-user-mobile-validator';

@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService
  ){}

  @Post('login')
  public async login (@Body() body: LoginValidator, @Res() res: Response){
    const user = await this.authService.findOneByEmail(body.email);
    
    if (!user){
      return res.status(HttpStatus.BAD_REQUEST).json({
        ok: false,
        msg: 'Datos incorrectos'
      });
    }

    const isUser = bcrypt.compareSync(body.password, user.password);

    if (!isUser){
      return res.status(HttpStatus.BAD_REQUEST).json({
        ok: false,
        msg: 'Datos incorrectos'
      })
    }

    const token = await generateJwt(user.id);

    return res.status(HttpStatus.OK).json({
      ok: true,
      userDB: user,
      token
    })
  }

  // /api/auth/loginMobile
  @Post('loginMobile')
  public async loginMobile(@Body() body: LoginUserMobileValidator, @Res() res:Response){

    const user = await this.authService.findOneByEmail(body.email);
    
    if (!user){
      return res.status(HttpStatus.BAD_REQUEST).json({
        ok: false,
        msg: 'Datos incorrectos'
      });
    }

    const isUser = bcrypt.compareSync(body.password, user.password);

    if (!isUser){
      return res.status(HttpStatus.BAD_REQUEST).json({
        ok: false,
        msg: 'Datos incorrectos'
      })
    }

    const token = await generateJwt(user.id);

    return res.status(HttpStatus.OK).json({
      ok: true,
      userDB: user,
      token
    });

  }

  @Get('renew')
  public async renew (@Req() req, @Res() res: Response){

    const uid = req.uid;

    const user = await this.authService.findOneById(uid);

    if (!user){
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        msg: 'No existe ese usuario'
      });
    }

    const permissions = user.permisos.split(',');
    const newSidebar = [];

    sidebar.forEach((dataSidebar) => {
      
      if (permissions.includes(dataSidebar.key) || permissions.includes('admin') || dataSidebar.key=='') newSidebar.push(dataSidebar);

    });

    const token = await generateJwt(uid);

    return res.status(HttpStatus.OK).json({
      ok: true,
      userDB: user,
      token,
      sidebar: newSidebar
    })
  }
}
