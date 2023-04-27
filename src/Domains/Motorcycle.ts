import IMotorcycle from "../Interfaces/IMotorcycle";
import Vehicle from "./Vehicle";

class Motorcycle extends Vehicle {
  private category: string;
  private engineCapacity: number;

  constructor(motorcycle: IMotorcycle) {
    super({ ...motorcycle });
    this.category = motorcycle.category;
    this.engineCapacity = motorcycle.engineCapacity;
  }

  getCategory() { return this.category; }
  setCategory(category: string) { this.category = category; }

  getEngineCapacity() { return this.engineCapacity; }
  setEngineCapacity(engineCapacity: number) { this.engineCapacity = engineCapacity; }
}

export default Motorcycle;