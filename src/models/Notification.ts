import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/sequelize';

interface NotificationAttributes {
  notificationId: string;
  notificationUser: number;
  notificationMessage: string;
  notificationType: string;
  notificationCreatedAt: Date;
}

interface NotificationCreationAttributes extends Optional<NotificationAttributes, 'notificationId' | 'notificationCreatedAt'> {}

export class Notification extends Model<NotificationAttributes, NotificationCreationAttributes> implements NotificationAttributes {
  public notificationId!: string;
  public notificationUser!: number;
  public notificationMessage!: string;
  public notificationType!: string;
  public notificationCreatedAt!: Date;
}

Notification.init(
  {
    notificationId: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
    },
    notificationUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_id',
      },
    },
    notificationMessage: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    notificationType: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    notificationCreatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Notification',
    tableName: 'notification',
    timestamps: false,
  }
);
