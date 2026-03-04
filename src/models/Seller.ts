import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/sequelize';

interface SellerAttributes {
  sellerId: number;
  sellerName: string;
  sellerEmail: string;
  sellerPassword: string;
  sellerAddress: string;
  sellerPhone: string;
  sellerOtpReset?: number;
  sellerExpiresOtp?: Date;
  sellerNewPassword?: string;
  sellerCreatedAt: Date;
  sellerDeletedAt?: Date;
  sellerUpdatedAt: Date;
  sellerProfile: string;
}

interface SellerCreationAttributes extends Optional<SellerAttributes, 'sellerId' | 'sellerCreatedAt' | 'sellerUpdatedAt' | 'sellerDeletedAt'> {}

export class Seller extends Model<SellerAttributes, SellerCreationAttributes> implements SellerAttributes {
  public sellerId!: number;
  public sellerName!: string;
  public sellerEmail!: string;
  public sellerPassword!: string;
  public sellerAddress!: string;
  public sellerPhone!: string;
  public sellerOtpReset?: number;
  public sellerExpiresOtp?: Date;
  public sellerNewPassword?: string;
  public sellerCreatedAt!: Date;
  public sellerDeletedAt?: Date;
  public sellerUpdatedAt!: Date;
  public sellerProfile!: string;
}

Seller.init(
  {
    sellerId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sellerName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    sellerEmail: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    sellerPassword: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    sellerAddress: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    sellerPhone: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    sellerOtpReset: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sellerExpiresOtp: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    sellerNewPassword: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    sellerCreatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    sellerDeletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    sellerUpdatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    sellerProfile: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Seller',
    tableName: 'seller',
    timestamps: false,
  }
);
