import { createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator((_, context) => {
  return context.switchToHttp().getRequest().user;
});
