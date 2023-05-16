module.exports = (sequelize, DataTypes) => {
  const Artist = sequelize.define('Artist', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    gender: { type: DataTypes.STRING, allowNull: false },
    birthdate: { type: DataTypes.DATEONLY, allowNull: false },
    nationality: DataTypes.STRING,
  }, {
    freezeTableName: true,
  });

  Artist.associate = (models) => {
    Artist.belongsToMany(models.Song, {
      through: 'SongArtist',
      foreignKey: 'artistId',
      otherKey: 'songId',
    });
    Artist.hasMany(models.Album);
  };
  return Artist;
};
