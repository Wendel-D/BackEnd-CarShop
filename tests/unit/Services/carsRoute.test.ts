import sinon from 'sinon';
import { Model } from 'mongoose';
import { expect } from 'chai';
import Car from '../../../src/Domains/Car';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';

const carInfo: ICar = {
  id: '1',
  model: 'uno',
  year: 2001,
  color: 'white',
  status: true,
  buyValue: 20.000,
  doorsQty: 2,
  seatsQty: 5,
};

const updatedCar: ICar = {
  id: '14',
  model: 'camaro',
  year: 2012,
  color: 'Yellow',
  status: true,
  buyValue: 70.000,
  doorsQty: 2,
  seatsQty: 5,
};

const invalidCar = {
  model: 'jeta',
  year: 1986,
  color: 'White',
  status: true,
  buyValue: 100.000,
  doorsQty: 2,
  seatsQty: 5,
};

const newCar: Car = new Car(carInfo);
const service = new CarService();

describe('Testes da rota /cars', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Verifica se um carro é criado com sucesso', async function () {
    sinon.stub(Model, 'create').resolves(newCar);

    const result = await service.create(carInfo);

    expect(result).to.be.deep.equal(newCar);
  });

  it('Verifica se a busca na rota /cars retorna todos os carros do banco', async function () {
    sinon.stub(Model, 'find').resolves([newCar]);

    const result = await service.findAll();

    expect(result).to.be.deep.equal([newCar]);
  });

  it('Verifica se a busca na rota /cars/:id retorna o carro correto', async function () {
    sinon.stub(Model, 'findOne').resolves(newCar);

    const result = await service.findById('1');

    expect(result).to.be.deep.equal(newCar);
  });

  it('Verifica se atualiza na rota /cars/:id retorna o carro correto', async function () {
    sinon.stub(Model, 'findOneAndUpdate').resolves(updatedCar);

    const result = await service.update('1', carInfo);

    expect(result).to.be.deep.equal(updatedCar);
  });

  it('Verifica se retorna Erro quando Id for inválido', async function () {
    sinon.stub(Model, 'findOneAndUpdate').resolves(null);

    const result = await service.update('xoxo', invalidCar);

    expect(result).to.be.deep.equal(null);
  });
});