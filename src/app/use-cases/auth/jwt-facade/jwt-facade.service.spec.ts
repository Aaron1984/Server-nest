import { Test, TestingModule } from '@nestjs/testing';
import { JwtFacadeService } from './jwt-facade.service';

describe('JwtFacadeService', () => {
  let service: JwtFacadeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtFacadeService],
    }).compile();

    service = module.get<JwtFacadeService>(JwtFacadeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
