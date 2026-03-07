import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

async function bootstrap() {
  // Helpful on platforms like Render where a DB connection hang can prevent port binding.
  console.log('Bootstrapping Nest application...');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  console.log('Nest application created. Configuring middleware...');
  app.setGlobalPrefix('api');

  const isProd = process.env.NODE_ENV === 'production';
  if (isProd) {
    const raw = process.env.FRONTEND_URLS || process.env.FRONTEND_URL || '';
    const allowedOrigins = raw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    // In prod, prefer a strict allow-list when configured.
    // If no env is provided (common misconfig on deploy), fall back to reflecting the request origin
    // so the app still works and doesn't fail with a hard CORS block.
    app.enableCors({
      origin: allowedOrigins.length
        ? (origin, cb) => {
            if (!origin) return cb(null, true);
            return allowedOrigins.includes(origin) ? cb(null, true) : cb(null, false);
          }
        : true,
      credentials: true,
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });
  } else {
    // Dev-friendly: reflect request origin (works for 5173/4173/etc.)
    app.enableCors({
      origin: true,
      credentials: true,
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });
  }

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const uploadsRoot = join(process.cwd(), 'uploads');
  if (!existsSync(uploadsRoot)) {
    mkdirSync(uploadsRoot, { recursive: true });
  }
  app.useStaticAssets(uploadsRoot, { prefix: '/uploads' });

  console.log('Starting HTTP listener...');
  const port = Number(process.env.PORT) || 3000;
  await app.listen(port, '0.0.0.0');
  console.log('Nest app listening on', port);
}
bootstrap();
