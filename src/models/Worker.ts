import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/sequelize';

interface WorkerAttributes {
  workerId: number;
  workerName?: string;
  workerPrename?: string;
  workerPassword?: string;
  workerEmail?: string;
  workerRole?: string;
  workerNumber?: string;
}

interface WorkerCreationAttributes extends Optional<WorkerAttributes, 'workerId'> {}

export class Worker extends Model<WorkerAttributes, WorkerCreationAttributes> implements WorkerAttributes {
  public workerId!: number;
  public workerName?: string;
  public workerPrename?: string;
  public workerPassword?: string;
  public workerEmail?: string;
  public workerRole?: string;
  public workerNumber?: string;
}

Worker.init(
  {
    workerId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    workerName: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    workerPrename: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    workerPassword: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    workerEmail: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    workerRole: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    workerNumber: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Worker',
    tableName: 'worker',
    timestamps: false,
  }
);
