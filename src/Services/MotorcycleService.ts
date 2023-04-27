import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

class MotorcycleService {
  static motorcycleODM = new MotorcycleODM();

  private createMotorDomain(motocycle: IMotorcycle | null): Motorcycle | null {
    if (motocycle) {
      return new Motorcycle({
        id: motocycle.id,
        model: motocycle.model,
        year: motocycle.year,
        color: motocycle.color,
        status: motocycle.status,
        buyValue: motocycle.buyValue,
        category: motocycle.category,
        engineCapacity: motocycle.engineCapacity,
      }); 
    }
    return null;
  }

  async create(motocycle: IMotorcycle) {
    const newCar = await MotorcycleService.motorcycleODM.create(motocycle);
    return this.createMotorDomain(newCar);
  }

  async findAll() {
    const cars = await MotorcycleService.motorcycleODM.findAll();
    const carsMap = cars.map((e) => this.createMotorDomain(e));
    return carsMap;
  }

  async findById(id: string) {
    const motocycle = await MotorcycleService.motorcycleODM.findById(id);
    if (!motocycle) {
      return null;
    }
    return this.createMotorDomain(motocycle);
  }

  async update(id: string, obj: Partial<IMotorcycle>) {
    const updatedMotor = await MotorcycleService.motorcycleODM.update(id, obj);
    if (!updatedMotor) {
      return null;
    }
    
    return this.createMotorDomain(updatedMotor);
  }

  async delete(id: string) {
    await MotorcycleService.motorcycleODM.delete(id);
  }
}

export default MotorcycleService;