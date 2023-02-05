import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const User = createParamDecorator(
    (data: string | undefined, ctx: ExecutionContext) =>{  // you can give unknown type to data.
        const request = ctx.switchToHttp().getRequest();

        // additional you can add to return specific data in the user
        if(data){
            return request.user[data]
        }
        return request.user
    }
)