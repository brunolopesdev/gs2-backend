import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { AtividadeESG } from "../entity/Atividade";
import { Usuario } from "../entity/Usuario";
import { BaseController } from "./BaseController";

export class AtividadeESGController extends BaseController<AtividadeESG> {
  constructor() {
    super(AppDataSource.getRepository(AtividadeESG));
  }

  async createAtividade(req: Request, res: Response): Promise<Response> {
    const { usuarioId, ...atividadeData } = req.body;

    try {
      // Buscar o usuário pelo ID
      const usuario = await AppDataSource.getRepository(Usuario).findOne({
        where: { id: usuarioId },
      });

      if (!usuario) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      // Criar a nova atividade
      const atividade = new AtividadeESG();
      atividade.usuario = usuario;
      atividade.data_envio = atividadeData.data_envio || new Date();
      atividade.tipo_atividade = atividadeData.tipo_atividade;
      atividade.descricao = atividadeData.descricao;
      atividade.impacto = atividadeData.impacto;
      atividade.status = atividadeData.status || "pendente";
      atividade.pontuacao = atividadeData.pontuacao || 0;

      const atividadeSalva = await this.repository.save(atividade);

      usuario.pontuacao += atividade.pontuacao;

      await AppDataSource.getRepository(Usuario).save(usuario);

      return res.status(201).json({
        mensagem: "Atividade criada e pontuação atualizada com sucesso!",
        atividade: atividadeSalva,
        usuarioAtualizado: usuario,
      });
    } catch (error) {
      console.error("Erro ao criar atividade ESG:", error);
      return res.status(500).json({ message: "Erro ao criar atividade ESG" });
    }
  }

  async getAllAtividades(req: Request, res: Response): Promise<Response> {
    try {
      const atividades = await this.repository.find({ relations: ["usuario"] });
      return res.json(atividades);
    } catch (error) {
      console.error("Erro ao buscar atividades ESG:", error);
      return res.status(500).json({ message: "Erro ao buscar atividades ESG" });
    }
  }

  async getAtividadeById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const atividade = await this.repository.findOne({
        where: { id: Number(id) },
        relations: ["usuario"],
      });

      if (!atividade) {
        return res
          .status(404)
          .json({ message: "Atividade ESG não encontrada" });
      }

      return res.json(atividade);
    } catch (error) {
      console.error("Erro ao buscar atividade ESG:", error);
      return res.status(500).json({ message: "Erro ao buscar atividade ESG" });
    }
  }

  async updateAtividade(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const atividadeData = req.body;

    try {
      const atividade = await this.repository.findOne({
        where: { id: Number(id) },
      });

      if (!atividade) {
        return res
          .status(404)
          .json({ message: "Atividade ESG não encontrada" });
      }

      Object.assign(atividade, atividadeData);
      const atividadeAtualizada = await this.repository.save(atividade);

      return res.json(atividadeAtualizada);
    } catch (error) {
      console.error("Erro ao atualizar atividade ESG:", error);
      return res
        .status(500)
        .json({ message: "Erro ao atualizar atividade ESG" });
    }
  }

  async deleteAtividade(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const atividade = await this.repository.findOne({
        where: { id: Number(id) },
      });

      if (!atividade) {
        return res
          .status(404)
          .json({ message: "Atividade ESG não encontrada" });
      }

      await this.repository.remove(atividade);
      return res.status(204).send();
    } catch (error) {
      console.error("Erro ao excluir atividade ESG:", error);
      return res.status(500).json({ message: "Erro ao excluir atividade ESG" });
    }
  }
}
