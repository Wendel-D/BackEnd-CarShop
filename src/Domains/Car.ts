import ICar from '../Interfaces/ICar';
import Vehicle from './Vehicle';

class Car extends Vehicle{
  private doorsQty: number;
  private seatsQty: number;

  constructor(car: ICar) {
   super({...car})
   this.doorsQty = car.doorsQty;
   this.seatsQty = car.seatsQty;
  }

  getDoorsQty() { return this.doorsQty; }
  setDoorsQty(doorsQty: number) { this.doorsQty = doorsQty; }

  getSeatsQty() { return this.seatsQty; }
  setSeatsQty(seatsQty: number) { this.seatsQty = seatsQty; }
}

export default Car;