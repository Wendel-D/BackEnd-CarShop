import IVehicle from '../Interfaces/IVehicle';

abstract class Vehicle {
  protected id: string | undefined;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status: boolean;
  protected buyValue: number;

  constructor(vehicle: IVehicle) {
    this.id = vehicle.id;
    this.model = vehicle.model;
    this.year = vehicle.year;
    this.color = vehicle.color;
    this.status = vehicle.status || false;
    this.buyValue = vehicle.buyValue;
  }

  getId() { return this.id; }
  setId(id: string) { this.id = id; }

  getModel() { return this.model; }
  setModel(model: string) { this.model = model; }

  getYear() { return this.year; }
  setYear(year: number) { this.year = year; }

  getColor() { return this.color; }
  setColor(color: string) { this.color = color; }

  getStatus() { return this.status; }
  setStatus(status: boolean) { this.status = status; }

  getBuyValue() { return this.buyValue; }
  setBuyValue(buyValue: number) { this.buyValue = buyValue; }
}

export default Vehicle;