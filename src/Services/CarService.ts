import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

class CarService {
  static carODM = new CarODM();

  private createCarDomain(car: ICar | null): Car | null {
    if (car) { return new Car(car); }
    return null;
  }

  async create(car: ICar) {
    const newCar = await CarService.carODM.create(car);
    return this.createCarDomain(newCar);
  }

  async findAll() {
    const cars = await CarService.carODM.findAll();
    const carsMap = cars.map((e) => this.createCarDomain(e));
    return carsMap;
  }

  async findById(id: string) {
    const car = await CarService.carODM.findById(id);
    if (!car) {
      return null;
    }
    return this.createCarDomain(car);
  }
}

export default CarService;