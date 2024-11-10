import { Repository } from "typeorm";
import { Request, Response } from "express";

export class BaseController<T> {
  protected repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    const items = await this.repository.find();
    return res.json(items);
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    const item = await this.repository.findOne({
      where: {
        [this.repository.metadata.primaryColumns[0].propertyName]: id,
      } as any,
    });
    if (item) {
      return res.json(item);
    }
    return res.status(404).json({ message: "Item not found" });
  }

  async create(req: Request, res: Response): Promise<Response> {
    const item = this.repository.create(req.body);
    const result = await this.repository.save(item);
    return res.status(201).json(result);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    const item = await this.repository.findOne({
      where: {
        [this.repository.metadata.primaryColumns[0].propertyName]: id,
      } as any,
    });
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    this.repository.merge(item, req.body);
    const result = await this.repository.save(item);
    return res.json(result);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    const result = await this.repository.delete(id);
    return res.status(204).json(result);
  }
}
