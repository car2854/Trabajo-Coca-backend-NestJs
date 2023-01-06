import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { Response, NextFunction } from 'express';

import * as jwt from 'jsonwebtoken';

@Injectable()
export class ValidateTokenMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: NextFunction) {
    
    const token = req.header('x-token');

    if (!token){
      return res.status(HttpStatus.UNAUTHORIZED).json({
        msg: 'No hay token en la peticion'
      });
    }

    try {
      
      const tokenData:any = jwt.verify(token, process.env.JWT_SECRET);

      req.uid = tokenData.uid;
      
      next();

    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        msg: 'Token invalido'
      });
    }

  }
}
