import * as jwt from 'jsonwebtoken';

export const generateJwt = (uid) => {
  
  return new Promise((resolve, reject) => {
    const payload = {
      uid
    }
    
    

    jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '128h'
    }, (err, token) => {
      if (err){
        console.log(err);
        reject('No se pudo generar el JWT');
      }else{
        resolve(token);
      }
    });
  });


}