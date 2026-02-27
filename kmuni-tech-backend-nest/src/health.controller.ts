import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { R2Service } from './storage/r2.service';

@Controller()
export class HealthController {
  constructor(private readonly r2: R2Service) {}

  private deploymentMeta() {
    const commit = (process.env.RENDER_GIT_COMMIT || process.env.GIT_COMMIT || '').trim();
    const serviceId = (process.env.RENDER_SERVICE_ID || '').trim();
    const serviceName = (process.env.RENDER_SERVICE_NAME || '').trim();

    return {
      commit: commit.length ? commit : undefined,
      serviceId: serviceId.length ? serviceId : undefined,
      serviceName: serviceName.length ? serviceName : undefined,
    };
  }

  @Get()
  getRoot() {
    return { status: 'ok', ...this.deploymentMeta() };
  }

  @Get('health')
  getHealth() {
    return { status: 'ok', ...this.deploymentMeta() };
  }

  @Get('health/r2')
  async getR2Health() {
    if (!this.r2.isConfigured()) {
      return { enabled: false };
    }

    try {
      await this.r2.checkConnection();
      return {
        ok: true,
        bucket: this.r2.getBucket(),
        endpoint: this.r2.getEndpoint(),
      };
    } catch (e: any) {
      throw new ServiceUnavailableException(e?.message || 'R2 unavailable');
    }
  }
}
