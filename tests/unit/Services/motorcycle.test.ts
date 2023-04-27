import sinon from 'sinon';
import { Model } from 'mongoose';
import { expect } from 'chai';
import Motorcycle from '../../../src/Domains/Motorcycle';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

const motorInfo: IMotorcycle = {
  id: '1',
  model: 'uno',
  year: 2001,
  color: 'white',
  status: true,
  buyValue: 20.000,
  category: 'Street',
  engineCapacity: 5,
};

const updatedMotor: IMotorcycle = {
  id: '14',
  model: 'camaro',
  year: 2012,
  color: 'Yellow',
  status: true,
  buyValue: 70.000,
  category: 'Street',
  engineCapacity: 5,
};

const invalidMotor: IMotorcycle = {
  model: 'jeta',
  year: 1986,
  color: 'White',
  status: true,
  buyValue: 100.000,
  category: 'Street',
  engineCapacity: 5,
};

const newMotor: Motorcycle = new Motorcycle(motorInfo);
const service = new MotorcycleService();

describe('Testes da rota /motorcycle', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Verifica se uma moto é criado com sucesso', async function () {
    sinon.stub(Model, 'create').resolves(newMotor);

    const result = await service.create(motorInfo);

    expect(result).to.be.deep.equal(newMotor);
  });

  it('Verifica se a busca na rota /motorcycle retorna todos os carros do banco', async function () {
    sinon.stub(Model, 'find').resolves([newMotor]);

    const result = await service.findAll();

    expect(result).to.be.deep.equal([newMotor]);
  });

  it('Verifica se a busca na rota /motorcycle/:id retorna o carro correto', async function () {
    sinon.stub(Model, 'findOne').resolves(newMotor);

    const result = await service.findById('1');

    expect(result).to.be.deep.equal(newMotor);
  });

  it('Verifica se atualiza na rota /motorcycle/:id retorna o carro correto', async function () {
    sinon.stub(Model, 'findOneAndUpdate').resolves(updatedMotor);

    const result = await service.update('1', motorInfo);

    expect(result).to.be.deep.equal(updatedMotor);
  });

  it('Verifica se retorna Erro quando Id for inválido', async function () {
    sinon.stub(Model, 'findOneAndUpdate').resolves(null);

    const result = await service.update('xoxo', invalidMotor);

    expect(result).to.be.deep.equal(null);
  });
});