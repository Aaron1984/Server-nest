import { Test, TestingModule } from '@nestjs/testing';
import { EncryptionFacadeService } from './encryption-facade.service';

describe('EncryptionFacadeService', () => {
  let service: EncryptionFacadeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EncryptionFacadeService],
    }).compile();

    service = module.get<EncryptionFacadeService>(EncryptionFacadeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
