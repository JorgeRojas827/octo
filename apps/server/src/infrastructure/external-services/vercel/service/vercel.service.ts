import {
  createGoogleGenerativeAI,
  GoogleGenerativeAIProvider,
} from '@ai-sdk/google';
import { env } from '@infrastructure/configure/configure-loader';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { generateText } from 'ai';

@Injectable()
export class VercelService {
  private google: GoogleGenerativeAIProvider;
  private model: ReturnType<typeof this.google>;
  private systemPrompt: string;

  constructor(private readonly configService: ConfigService) {
    this.configureVercelAI();
  }

  private configureModel() {
    return this.google(
      this.configService.get<string>(env.externalServices.google.geminiModel),
      {
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_NONE',
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_NONE',
          },
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_NONE',
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_NONE',
          },
        ],
      },
    );
  }

  private configureVercelAI() {
    this.google = createGoogleGenerativeAI({
      apiKey: this.configService.get<string>(
        env.externalServices.google.geminiApiKey,
      ),
    });

    this.systemPrompt = this.configService.get<string>(
      env.externalServices.google.systemPrompt,
    );

    this.model = this.configureModel();
  }

  async generate(input: string) {
    return (
      await generateText({
        model: this.model,
        system: this.systemPrompt,
        messages: [{ role: 'user', content: input }],
      })
    ).text;
  }
}
