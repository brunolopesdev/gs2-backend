import { Router } from "express";
import { UsuarioController } from "./controller/UserController";
import { SuporteController } from "./controller/SuporteController";
import { AtividadeESGController } from "./controller/AtividadeESGController";
import { verifyToken } from "./middleware/verifyToken";

const routes = Router();

const usuarioController = new UsuarioController();
const suporteController = new SuporteController();
const atividadeESGController = new AtividadeESGController();

routes.post("/login", usuarioController.login.bind(usuarioController));
routes.get(
  "/verify-token",
  verifyToken,
  usuarioController.verifyToken.bind(usuarioController)
);

routes.get("/usuarios", usuarioController.getAll.bind(usuarioController));
routes.get("/usuarios/:id", usuarioController.getById.bind(usuarioController));
routes.post("/usuarios", usuarioController.create.bind(usuarioController));
routes.put("/usuarios/:id", usuarioController.update.bind(usuarioController));
routes.delete(
  "/usuarios/:id",
  usuarioController.delete.bind(usuarioController)
);
routes.get(
  "/usuarios/atividades/:id",
  usuarioController.getUserWithActivities.bind(usuarioController)
);

routes.get("/suportes", suporteController.getAll.bind(suporteController));
routes.get("/suportes/:id", suporteController.getById.bind(suporteController));
routes.post("/suportes", suporteController.create.bind(suporteController));
routes.put("/suportes/:id", suporteController.update.bind(suporteController));
routes.delete(
  "/suportes/:id",
  suporteController.delete.bind(suporteController)
);

routes.get(
  "/atividades-esg",
  atividadeESGController.getAllAtividades.bind(atividadeESGController)
);
routes.get(
  "/atividades-esg/:id",
  atividadeESGController.getAtividadeById.bind(atividadeESGController)
);
routes.post(
  "/atividades-esg",
  atividadeESGController.createAtividade.bind(atividadeESGController)
);
routes.put(
  "/atividades-esg/:id",
  atividadeESGController.updateAtividade.bind(atividadeESGController)
);
routes.delete(
  "/atividades-esg/:id",
  atividadeESGController.deleteAtividade.bind(atividadeESGController)
);

export { routes };
