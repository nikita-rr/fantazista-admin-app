import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
@Injectable()
export class UserGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();
        const user = req.session.user
        return !!user
    }
}