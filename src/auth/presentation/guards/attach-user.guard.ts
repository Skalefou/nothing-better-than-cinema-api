import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { AuthService } from "../../application/services/auth.service";
import { Request } from "express";

@Injectable()
export class AttachUserGuard implements CanActivate {
    constructor(private readonly authService: AuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();

        if (!request.user) {
            return false;
        }

        const tokenUser = request.user as { id: string; roles: string[] };
        if (!tokenUser.id) {
            return false;
        }

        try {
            request.user = await this.authService.validateAndAttachUser(tokenUser.id);
            console.log("User attached:", request.user);
            return true;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            return false;
        }
    }
}
