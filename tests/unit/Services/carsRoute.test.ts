import Sinon from 'sinon';
import { Model } from 'mongoose';
import { expect } from 'chai';
import Car from '../../../src/Domains/Car';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';

describe('Testes da rota /cars', function () {
  it('Verifica se um carro é criado com sucesso', async function () {
    // arrange
    const carInput: ICar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };
    const carOutput: Car = new Car(
      { ...carInput, id: '644961799103e783dcfa12be' },
    );
    Sinon.stub(Model, 'create').resolves(carOutput);

    const service = new CarService();
    const result = await service.create(carInput);

    expect(result).to.be.deep.equal(carOutput);
  });

  it('Verifica se a busca por um ID válido ocorre', async function () {
    const carInput: ICar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };
    const carOutput: Car = new Car(
      { ...carInput, id: '644961799103e783dcfa12be' },
    );
    Sinon.stub(Model, 'findById').resolves(carOutput);
    const service = new CarService();
    const result = await service.findById('644961799103e783dcfa12be');
        
    expect(result).to.be.deep.equal(carOutput);
  });

  afterEach(function () {
    Sinon.restore();
  });
});