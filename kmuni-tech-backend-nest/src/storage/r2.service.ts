import { Injectable } from '@nestjs/common';
import { GetObjectCommand, HeadBucketCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { createReadStream, promises as fs } from 'node:fs';
import { basename } from 'node:path';

function requiredEnv(name: string): string {
  const value = (process.env[name] || '').trim();
  if (!value) throw new Error(`Missing ${name} env var`);
  return value;
}

function optionalNumberEnv(name: string, fallback: number): number {
  const raw = (process.env[name] || '').trim();
  if (!raw) return fallback;
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

@Injectable()
export class R2Service {
  private client: S3Client | null = null;

  isConfigured(): boolean {
    const required = ['R2_ENDPOINT', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_BUCKET'] as const;
    return required.every((name) => ((process.env[name] || '').trim().length > 0));
  }

  getEndpoint(): string | null {
    const value = (process.env.R2_ENDPOINT || '').trim();
    return value.length ? value : null;
  }

  private getClient(): S3Client {
    if (this.client) return this.client;

    const endpoint = requiredEnv('R2_ENDPOINT');
    const accessKeyId = requiredEnv('R2_ACCESS_KEY_ID');
    const secretAccessKey = requiredEnv('R2_SECRET_ACCESS_KEY');
    const region = (process.env.R2_REGION || 'auto').trim() || 'auto';

    this.client = new S3Client({
      region,
      endpoint,
      credentials: { accessKeyId, secretAccessKey },
      forcePathStyle: true,
    });

    return this.client;
  }

  getBucket(): string {
    return requiredEnv('R2_BUCKET');
  }

  async checkConnection(): Promise<void> {
    const bucket = this.getBucket();
    const client = this.getClient();
    try {
      await client.send(new HeadBucketCommand({ Bucket: bucket }));
    } catch (e: any) {
      throw new Error(`R2 connection failed: ${e?.message || e}`);
    }
  }

  async uploadFromPath(options: {
    key: string;
    filePath: string;
    contentType?: string;
  }): Promise<void> {
    const bucket = this.getBucket();
    const client = this.getClient();

    const body = createReadStream(options.filePath);

    try {
      await client.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: options.key,
          Body: body,
          ContentType: options.contentType || undefined,
        }),
      );
    } catch (e: any) {
      throw new Error(`R2 upload failed (${basename(options.key)}): ${e?.message || e}`);
    }
  }

  async deleteLocalFileQuietly(filePath: string): Promise<void> {
    try {
      await fs.unlink(filePath);
    } catch {
      // ignore
    }
  }

  async getSignedGetUrl(key: string): Promise<string> {
    const bucket = this.getBucket();
    const client = this.getClient();
    const expiresIn = optionalNumberEnv('R2_SIGNED_URL_EXPIRES_SECONDS', 3600);

    const cmd = new GetObjectCommand({ Bucket: bucket, Key: key });
    return getSignedUrl(client, cmd, { expiresIn });
  }
}
