import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

export const AttachUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();

    if (!request.user) {
        throw new Error("User not found in request");
    }

    // L'utilisateur complet est maintenant attaché par le AttachUserGuard
    return request.user;
});