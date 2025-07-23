import { Global, Module } from '@nestjs/common';
import { AuthService } from './services';

@Global()
@Module({
  providers: [AuthService],
  exports: [AuthService],
})
export class SharedModule {}
