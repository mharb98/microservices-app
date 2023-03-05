import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class OrganizationMiddleware implements NestMiddleware {
  constructor() {}

  async use(req: Request, res: Response, next: NextFunction) {
    next();
    // const organizationId: number = +req.params.organizationId;
    // try {
    //   await this.prisma.organization.findFirstOrThrow({
    //     where: { id: organizationId },
    //   });
    //   next();
    // } catch (error) {
    //   throw new NotFoundException('Organization does not exist');
    // }
  }
}
