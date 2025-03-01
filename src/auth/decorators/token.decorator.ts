import { createParamDecorator, ExecutionContext } from "@nestjs/common";


export const Token = createParamDecorator((_: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if( !request.token ){
        throw new Error("Token not found")
    } 

    return request.token

})
