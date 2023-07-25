import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
@Injectable()
export class AccessGuard implements CanActivate {
    private route: string
    constructor(route){
        this.route = route
    }
    canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();
        const userRole = req.session.user?.role
        const userAccesses = req.session.user?.accesses
        if(userRole === "ADMIN") return true
        else return userAccesses?.includes(this.route)
    }
}