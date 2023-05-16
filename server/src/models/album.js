module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    releaseDate: { type: DataTypes.DATEONLY, allowNull: false },
    link: { type: DataTypes.STRING },
  }, {
    freezeTableName: true,
  });
  Album.associate = (models) => {
    Album.hasMany(models.Song);
    Album.belongsTo(models.Artist);
  };
  return Album;
};
