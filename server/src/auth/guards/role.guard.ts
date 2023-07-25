import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
@Injectable()
export class RoleGuard implements CanActivate {
    private forRoles: Role[] | Role
    constructor(role: Role[] | Role){
        this.forRoles = role
    }
    canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();
        const userRole = req.session.user?.role
        if (Array.isArray(this.forRoles)) {
            return this.forRoles.includes(userRole);
        } else return userRole === this.forRoles
    }
}