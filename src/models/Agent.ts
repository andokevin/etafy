import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/sequelize';

interface AgentAttributes {
  agentId: number;
  agentWorker?: number;
  agentStatus?: boolean;
}

interface AgentCreationAttributes extends Optional<AgentAttributes, 'agentId'> {}

export class Agent extends Model<AgentAttributes, AgentCreationAttributes> implements AgentAttributes {
  public agentId!: number;
  public agentWorker?: number;
  public agentStatus?: boolean;
}

Agent.init(
  {
    agentId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    agentWorker: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'worker',
        key: 'worker_id',
      },
    },
    agentStatus: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: 'Agent',
    tableName: 'agent',
    timestamps: false,
  }
);
