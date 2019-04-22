module.exports = (DataTypes) => ({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: false,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  signature: DataTypes.STRING,
  created_by: DataTypes.INTEGER,
  updated_by: DataTypes.INTEGER,
  deleted_by: DataTypes.INTEGER,
});
