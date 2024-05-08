export interface NutritionistChatService {
  chat(input: string, userId: number): Promise<string>;
}
