import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppJapanService {
  constructor(
    @Inject('APP_NAME')
    private readonly app_name: string,
    @Inject('MESSAGE')
    private readonly message: string
  ) {}

  getHello(): string {
    console.log(process.env.DB_HOST);
    return `Hello world in japanese from ${this.app_name}, ${this.message}`;
  }
}
