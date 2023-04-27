import { NextFunction, Request, Response } from 'express';
import CarService from '../Services/CarService';
import ICar from '../Interfaces/ICar';

class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  async create() {
    const car: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };

    try {
      const newCar = await this.service.create(car);
      return this.res.status(201).json(newCar);
    } catch (error) {
      this.next(error);
    }
  }

  async findAll() {
    try {
      const cars = await this.service.findAll();
      return this.res.status(200).json(cars);
    } catch (e) {
      this.next(e);
    }
  }

  async findById() {
    const { id } = this.req.params;
    try {
      const car = await this.service.findById(id);
      if (!car) {
        return this.res.status(404).json({ message: 'Car not found' });
      }
      return this.res.status(200).json(car);
    } catch (error) {
      this.res.status(422).json({ message: 'Invalid mongo id' });
    }
  }

  async update() {
    const { id } = this.req.params;
    const carInfos: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };
    try {
      const car = await this.service.findById(id);
      if (!car) {
        return this.res.status(404).json({ message: 'Car not found' });
      }
      const updateComplete = await this.service.update(id, carInfos);
      return this.res.status(200).json(updateComplete);
    } catch (error) {
      return this.res.status(422).json({ message: 'Invalid mongo id' });
    }
  }

  async delete() {
    const { id } = this.req.params;
    try {
      const car = await this.service.findById(id);
      if (!car) {
        return this.res.status(404).json({ message: 'Car not found' });
      }
      await this.service.delete(id);
      return this.res.status(204).end();
    } catch (error) {
      return this.res.status(422).json({ message: 'Invalid mongo id' });
    }
  }
}

export default CarController;
