import { NextFunction, Request, Response } from 'express';
import MotorcycleService from '../Services/MotorcycleService';
import IMotorcycle from '../Interfaces/IMotorcycle';

const NOT_FOUND = { message: 'Motorcycle not found' };
const INVALID_ID = { message: 'Invalid mongo id' };

class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  async create() {
    const motorcycle: IMotorcycle = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };

    try {
      const newMotor = await this.service.create(motorcycle);
      return this.res.status(201).json(newMotor);
    } catch (error) {
      this.next(error);
    }
  }

  async findAll() {
    try {
      const motors = await this.service.findAll();
      return this.res.status(200).json(motors);
    } catch (e) {
      this.next(e);
    }
  }

  async findById() {
    const { id } = this.req.params;
    try {
      const motorcycle = await this.service.findById(id);
      if (!motorcycle) {
        return this.res.status(404).json(NOT_FOUND);
      }
      return this.res.status(200).json(motorcycle);
    } catch (error) {
      return this.res.status(422).json(INVALID_ID);
    }
  }

  async update() {
    const { id } = this.req.params;
    const motorsInfos: IMotorcycle = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };
    try {
      const motorcycle = await this.service.findById(id);
      if (!motorcycle) {
        return this.res.status(404).json(NOT_FOUND);
      }
      const updateComplete = await this.service.update(id, motorsInfos);
      return this.res.status(200).json(updateComplete);
    } catch (error) {
      return this.res.status(422).json(INVALID_ID);
    }
  }

  async delete() {
    const { id } = this.req.params;
    try {
      const Motorcycle = await this.service.findById(id);
      if (!Motorcycle) {
        return this.res.status(404).json(NOT_FOUND);
      }
      await this.service.delete(id);
      return this.res.status(204).end();
    } catch (error) {
      return this.res.status(422).json(INVALID_ID);
    }
  }
}

export default MotorcycleController;
