import { ChatPromptTemplate } from '@langchain/core/prompts';
import { DynamicTool } from '@langchain/core/tools';
import { ChatOpenAI } from '@langchain/openai';
import { Injectable } from '@nestjs/common';
import { ConversationRepository } from 'domain/capabilities/conversation-repository';
import { MessageRepository } from 'domain/capabilities/message-repository';
import { NutritionistChatService } from 'domain/capabilities/nutritionist-chat-service';
import { UserRepository } from 'domain/capabilities/user-repository';
import { Conversation } from 'domain/models/conversation';
import { User } from 'domain/models/user';
import { AgentExecutor, createToolCallingAgent } from 'langchain/agents';

import { INITIAL_SURVEY, MEAL_PLAN, NUTRITIONIST } from '../constants/templates.constants';

@Injectable()
export class NutritionistChatServiceImpl implements NutritionistChatService {
  constructor(
    private users: UserRepository,
    private messageRepository: MessageRepository,
    private conversationRepository: ConversationRepository,
  ) {}

  async chat(input: string, userId: number): Promise<string> {
    // Get user that is currently interacting
    const user = await this.users.obtainUserById(userId);
    // Check if initial survey was completed, if not, prompt it
    const surveyCheck = await this.surveyCheck(input, user);
    if (surveyCheck) return surveyCheck;

    // Currently this is done by permitting only single conversation per User, to simplify usage and
    // allow everything to be done from a single endpoint
    const history = await this.buildHistory(user.conversations![0]);
    const chain = await this.loadSingleChain();
    const response = await chain.invoke({
      chat_history: history,
      input: input,
    });

    // Save both sides of the interaction
    await this.messageRepository.createMessage({
      conversation: user.conversations![0],
      text: input,
      sender: true,
    });
    await this.messageRepository.createMessage({
      conversation: user.conversations![0],
      text: response.output,
      sender: false,
    });

    return response.output;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  private loadSingleChain = async () => {
    const prompt = ChatPromptTemplate.fromMessages([
      ['system', NUTRITIONIST],
      ['placeholder', '{agent_scratchpad}'],
    ]);

    const model = new ChatOpenAI({
      temperature: 0.8,
      modelName: 'gpt-4',
    });

    const tools = [
      new DynamicTool({
        name: 'generator',
        description: 'call this to generate a meal plan',
        func: async () => MEAL_PLAN,
      }),
    ];

    const agent = createToolCallingAgent({
      llm: model,
      tools,
      prompt,
    });

    const agentExecutor = new AgentExecutor({
      agent,
      tools,
      verbose: true,
    });
    return agentExecutor;
  };

  private async surveyCheck(input: string, user: User): Promise<any> {
    // Before allowing interaction with LLM, check if User has completed the survey
    if (!user.conversations?.length) {
      // Start new conversation
      const conversation = await this.conversationRepository.createConversation({ user });
      // Save both sides of the interaction
      await this.messageRepository.createMessage({ conversation, text: input, sender: true });
      await this.messageRepository.createMessage({ conversation, text: INITIAL_SURVEY, sender: false });

      // Prompt survey
      return INITIAL_SURVEY;
    }
  }

  private async buildHistory(conversation: Conversation): Promise<any> {
    const history = [];

    for (const message of conversation.messages) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      message.sender
        ? history.push({ role: 'User', message: message.text })
        : history.push({ role: 'AI', message: message.text });
    }

    return JSON.stringify(history);
  }
}
