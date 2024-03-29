import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    @Inject('APP_NAME')
    private readonly app_name: string,
    @Inject('MESSAGE')
    private readonly message: string
  ) {}

  getHello(): string {
    return `Hello World from ${this.app_name}, ${this.message}`;
  }
}
