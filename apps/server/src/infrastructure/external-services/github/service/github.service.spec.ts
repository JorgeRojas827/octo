import { ConfigService } from '@nestjs/config';
import { TestingModule, Test } from '@nestjs/testing';
import { Octokit } from '@octokit/rest';
import { GithubService } from './github.service';
import { env } from '@infrastructure/configure/configure-loader';

jest.mock('@octokit/rest', () => {
  return {
    Octokit: jest.fn().mockImplementation(() => ({
      rest: {
        repos: {
          listForUser: jest.fn(),
        },
      },
    })),
  };
});

describe('GithubService', () => {
  let service: GithubService;
  let mockOctokit;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GithubService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key) => {
              if (key === env.externalServices.github.clientId)
                return 'testClientId';
              if (key === env.externalServices.github.clientSecret)
                return 'testClientSecret';
            }),
          },
        },
      ],
    }).compile();

    service = module.get<GithubService>(GithubService);
    mockOctokit = module.get(Octokit);
  });

  it('should successfully return user repositories', async () => {
    const mockRepos = [{ id: 1, name: 'test-repo' }];
    mockOctokit.rest.repos.listForUser.mockResolvedValue({ data: mockRepos });

    const repos = await service.getUserRepositories('testuser');
    expect(repos).toEqual(mockRepos);
  });

  it('should throw an error when fetching user repositories fails', async () => {
    mockOctokit.rest.repos.listForUser.mockRejectedValue(
      new Error('API Error'),
    );

    await expect(service.getUserRepositories('testuser')).rejects.toThrow(
      'API Error',
    );
  });
});
