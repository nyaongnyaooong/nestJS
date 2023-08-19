import { JwtModuleOptions } from "@nestjs/jwt";

export const jwtConfig: JwtModuleOptions = {
  secret: 'SECRET',
  signOptions: { 
    expiresIn: '300s' 
  },
}