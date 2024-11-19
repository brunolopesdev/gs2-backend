import { Router } from "express";
import { ChatMessageController } from "./controller/ChatMessageController";

const routes = Router();
const chatMessageController = new ChatMessageController();

routes.post(
  "/chat-messages",
  chatMessageController.createMessage.bind(chatMessageController)
);
routes.get(
  "/chat-messages",
  chatMessageController.getChatHistory.bind(chatMessageController)
);
routes.post(
  "/chat-messages/bulk",
  chatMessageController.createBulkMessages.bind(chatMessageController)
);

export { routes };
