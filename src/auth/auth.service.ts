import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  private readonly logger = new Logger(AuthService.name);


    constructor(private usersService: UsersService,
      private jwtService: JwtService) {}

    async signIn(email: string, pass: string): Promise<{ access_token: string, expiresIn: string | undefined }> {
        const user = await this.usersService.findUserByEmail(email);

        if(!user){
          throw new NotFoundException(`User is not found.`);

      }

        if (user?.password !== pass) {
          throw new UnauthorizedException();
        }

        const payload = {email: user.email,_id:user._id};
        return {
          access_token: await this.jwtService.signAsync(payload),
          expiresIn:"3600",
        };

        // const { password, ...result } = user;
        // TODO: Generate a JWT and return it here
        // instead of the user object
        // return result;
      }

}
