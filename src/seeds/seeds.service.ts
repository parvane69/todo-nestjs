// import { Injectable } from '@nestjs/common';
// import 'dotenv/config';
// import { DataSource } from 'typeorm';
// import { InjectDataSource } from '@nestjs/typeorm';
// import { User } from '../domain/schemas/users.schema';

// @Injectable()
// export class SeedsService {
//   constructor(@InjectDataSource() private dataSource: DataSource) {}
//   async saveUserTest(): Promise<void> {
//     await this.dataSource
//       .createQueryBuilder()
//       .insert()
//       .into(User)
//       .values([
//         {
//           userName: 'test',
//           password: '123456',
//         },
//       ])
//       .execute();
//   }
// }
