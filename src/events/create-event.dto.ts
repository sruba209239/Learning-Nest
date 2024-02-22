import { IsDateString, IsString, Length } from 'class-validator';

export class CreateEventDTO {
  @IsString()
  @Length(5, 255, { message: 'Incorrect length' })
  name: string;

  @Length(5, 255)
  description: string;

  @IsDateString()
  when: string;

  @Length(5, 20, { groups: ['create'] })
  @Length(10, 255, { groups: ['update'] })
  address: string;
}
