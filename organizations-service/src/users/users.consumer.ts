import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConsumerService } from '../brokers/consumer.service';
import { ModeratorsService } from './moderators.service';

@Injectable()
export class ModeratorsConsumer implements OnModuleInit {
  constructor(
    private consumer: ConsumerService,
    private readonly configService: ConfigService,
    private moderatorsService: ModeratorsService,
  ) {}

  async onModuleInit() {
    await this.consumer.consume({
      topics: { topics: ['users'] },
      config: { groupId: 'organizations-service' },
      onMessage: (message) => this.handleMessageConsumption(message),
    });
  }

  private async handleMessageConsumption(message: any): Promise<void> {
    const key = message.key.toString();
    const value = JSON.parse(message.value.toString());

    switch (key) {
      case 'create-moderator':
        this.handleModeratorCreation(value);
        break;
      case 'delete-moderator':
        this.handleModeratorDeletion(value);
        break;
      default:
        return;
    }
  }

  private async handleModeratorCreation(message: any) {
    const internalProfileId: number = message.id;
    const name: string = message.name;
    const email: string = message.email;
    await this.moderatorsService.createModerator({
      internalProfileId,
      name,
      email,
    });
  }

  private async handleModeratorDeletion(message: any) {
    const internalProfileId: number = message.id;

    await this.moderatorsService.deleteModerator(internalProfileId);
  }
}
