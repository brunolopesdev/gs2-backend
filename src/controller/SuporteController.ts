import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Suporte } from "../entity/Suporte";
import { Usuario, TipoUsuario } from "../entity/Usuario";
import { BaseController } from "./BaseController";

export class SuporteController extends BaseController<Suporte> {
  constructor() {
    super(AppDataSource.getRepository(Suporte));
  }

  async createSuporte(req: Request, res: Response) {
    console.log("Dados recebidos no body:", req.body);

    const { colaboradorId, ...suporteData } = req.body;
    console.log("colaboradorId recebido:", colaboradorId);
    console.log("Outros dados de suporte:", suporteData);

    try {
      const colaborador = await AppDataSource.getRepository(Usuario).findOne({
        where: { id: colaboradorId, tipo_usuario: TipoUsuario.COLABORADOR },
      });

      if (!colaborador) {
        console.error("Colaborador não encontrado");
        return res.status(404).json({ message: "Colaborador não encontrado" });
      }

      const suporte = new Suporte();
      suporte.tipo_problema = suporteData.tipo_problema;
      suporte.descricao = suporteData.descricao;
      suporte.data_solicitacao = suporteData.data_solicitacao;
      suporte.status = suporteData.status;

      const suporteSalvo = await this.repository.save(suporte);

      return res.status(201).json(suporteSalvo);
    } catch (error) {
      console.error("Erro ao criar suporte:", error);
      return res.status(500).json({ message: "Erro ao criar suporte" });
    }
  }
}
