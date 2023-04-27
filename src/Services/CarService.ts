import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

class CarService {
  static carODM = new CarODM();

  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car({
        "id": car.id,
        "model": car.model,
        "year": car.year,
        "color": car.color,
        "status": car.status,
        "buyValue": car.buyValue,
        "doorsQty": car.doorsQty,
        "seatsQty": car.seatsQty,
      });
    }
    return null;
  }

  async create(car: ICar) {
    const newCar = await CarService.carODM.create(car);
    const retorno = this.createCarDomain(newCar);
    return retorno;
  }
  
  async findAll() {
    const cars = await CarService.carODM.findAll();
    const carsMap = cars.map((e) => this.createCarDomain(e));
    console.log('RETORNOOOOOO',carsMap);
    return carsMap;
  }

  async findById(id: string) {
    const car = await CarService.carODM.findById(id);
    if (!car) {
      return null;
    }
    return this.createCarDomain(car);
  }

  async update(id: string, obj: Partial<ICar>) {
    const updatedCar = await CarService.carODM.update(id, obj);
    if (!updatedCar) {
      return null;
    }

    return this.createCarDomain(updatedCar);
  }
}

export default CarService;