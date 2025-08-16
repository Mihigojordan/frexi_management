import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { RequestWithUser } from 'src/common/interfaces/user.interface';

@Injectable()
export class UserJwtAuthGuard implements CanActivate {
  constructor(private readonly jwtServices: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const userToken = this.extractTokenFromCookies(request);

    console.log("the user's token represented here is:", userToken);
    if (!userToken) {
      throw new UnauthorizedException('not authenticated');
    }
    try {
      const decodedHost = await this.jwtServices.verifyAsync(userToken, {
        secret: process.env.Jwt_SECRET_KEY  || 'secretkey', // Ensure JWT_SECRET is securely stored
      });

      request.user = decodedHost;

      return true;
    } catch (error) {
      console.log('error on hostguard:', error);
      throw new UnauthorizedException('invalid or expired token');
    }
  }

  private extractTokenFromCookies(req: Request): string | undefined {
    // Extract the token from the cookies
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return req.cookies?.['AccessUserToken'];
  }
}
