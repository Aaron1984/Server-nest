import { Test, TestingModule } from '@nestjs/testing';
import { FindUsersController } from './find-users.controller';

describe('FindUsersController', () => {
  let controller: FindUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FindUsersController],
    }).compile();

    controller = module.get<FindUsersController>(FindUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
