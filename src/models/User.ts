import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/sequelize';

interface UserAttributes {
  userId: number;
  userName: string;
  userPrename: string;
  userEmail: string;
  userPassword: string;
  userAddress: string;
  userPhone: string;
  userOtpReset?: number;
  userExpiresOtp?: Date;
  userNewPassword?: string;
  userCreatedAt: Date;
  userDeletedAt?: Date;
  userUpdatedAt: Date;
  userGenre: string;
  userProvince: number;
  userDistrict: number;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'userId' | 'userCreatedAt' | 'userUpdatedAt' | 'userDeletedAt'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public userId!: number;
  public userName!: string;
  public userPrename!: string;
  public userEmail!: string;
  public userPassword!: string;
  public userAddress!: string;
  public userPhone!: string;
  public userOtpReset?: number;
  public userExpiresOtp?: Date;
  public userNewPassword?: string;
  public userCreatedAt!: Date;
  public userDeletedAt?: Date;
  public userUpdatedAt!: Date;
  public userGenre!: string;
  public userProvince!: number;
  public userDistrict!: number;
}

User.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    userPrename: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    userEmail: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    userPassword: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    userAddress: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    userPhone: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    userOtpReset: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    userExpiresOtp: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    userNewPassword: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    userCreatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    userDeletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    userUpdatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: 'CASCADE',
    },
    userGenre: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    userProvince: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userDistrict: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'user',
    timestamps: false,
  }
);
