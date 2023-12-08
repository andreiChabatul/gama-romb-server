import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const UserAgent = createParamDecorator((_: string, ctx: ExecutionContext) => {
    const reguest = ctx.switchToHttp().getRequest();
    return reguest.headers['user-agent'];
}
)   