import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(5000); // Hardcoded port 5000
  console.log(`🚀 Server is running on http://localhost:5000`);
}
bootstrap();
