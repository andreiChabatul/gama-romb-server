import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const Cookie = createParamDecorator((key: string, ctx: ExecutionContext) => {
    const reguest = ctx.switchToHttp().getRequest();
    return (key && key in reguest.cookies) ? reguest.cookies[key] : reguest.cookies;
}
)