import { Test, TestingModule } from '@nestjs/testing';
import { SoftwaresResolver } from './softwares.resolver';
import { SoftwaresService } from './softwares.service';

describe('SoftwaresResolver', () => {
  let resolver: SoftwaresResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SoftwaresResolver, SoftwaresService],
    }).compile();

    resolver = module.get<SoftwaresResolver>(SoftwaresResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
