import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { ChatMessage } from "../entity/ChatMessage";
import { BaseController } from "./BaseController";

interface Question {
  id: string;
  question: string;
  points: number;
  options: {
    id: string;
    text: string;
    response: string;
    points: number;
  }[];
}

export class ChatMessageController extends BaseController<ChatMessage> {
  constructor() {
    super(AppDataSource.getRepository(ChatMessage));
  }

  async createMessage(req: Request, res: Response): Promise<Response> {
    const { questionId, selectedOptionId, question, answer, points, options } = req.body;

    try {
      const chatMessage = new ChatMessage();
      chatMessage.questionId = questionId;
      chatMessage.selectedOptionId = selectedOptionId;
      chatMessage.question = question;
      chatMessage.answer = answer;
      chatMessage.points = points;
      chatMessage.options = options;

      const savedMessage = await this.repository.save(chatMessage);

      return res.status(201).json({
        message: "Mensagem do chat salva com sucesso",
        chatMessage: savedMessage,
      });
    } catch (error) {
      console.error("Erro ao salvar mensagem do chat:", error);
      return res.status(500).json({ message: "Erro ao salvar mensagem do chat" });
    }
  }

  async getChatHistory(req: Request, res: Response): Promise<Response> {
    try {
      const messages = await this.repository.find({
        order: { createdAt: "DESC" },
      });

      return res.json(messages);
    } catch (error) {
      console.error("Erro ao buscar histórico do chat:", error);
      return res.status(500).json({ message: "Erro ao buscar histórico do chat" });
    }
  }

  async createBulkMessages(req: Request, res: Response): Promise<Response> {
    const { questions } = req.body as { questions: Question[] };

    try {
      const messages = questions.map(question => {
        const chatMessage = new ChatMessage();
        chatMessage.questionId = question.id;
        chatMessage.question = question.question;
        chatMessage.points = question.points;
        chatMessage.options = question.options;
        // Campos que serão preenchidos posteriormente pelo usuário
        chatMessage.selectedOptionId = '';
        chatMessage.answer = '';
        
        return chatMessage;
      });

      const savedMessages = await this.repository.save(messages);

      return res.status(201).json({
        message: "Questões salvas com sucesso",
        questions: savedMessages,
      });
    } catch (error) {
      console.error("Erro ao salvar questões:", error);
      return res.status(500).json({ message: "Erro ao salvar questões" });
    }
  }
} 