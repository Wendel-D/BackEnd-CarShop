import { Model, Schema, UpdateQuery, model, models } from 'mongoose';

abstract class AbstractODM<T> {
  protected model: Model<T>;
  private schema: Schema;
  protected modelName: string;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(modelName, this.schema);
  }

  async create(obj: T): Promise<T> {
    return this.model.create({ ...obj });
  }

  async findAll(): Promise<T[]> { return this.model.find(); }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  async update(_id: string, obj: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(
      { _id },
      { ...obj } as UpdateQuery<T>,
      { new: true },
    );
  }

  async delete(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}

export default AbstractODM;