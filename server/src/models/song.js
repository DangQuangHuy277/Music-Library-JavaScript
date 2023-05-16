module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    genre: DataTypes.STRING,
    duration: { type: DataTypes.INTEGER, allowNull: false },
    link: { type: DataTypes.STRING(1023) },
  }, {
    freezeTableName: true,
  });
  Song.associate = (models) => {
    Song.belongsTo(models.Album);
    Song.belongsToMany(models.Artist, {
      through: 'SongArtist',
      foreignKey: 'songId',
      otherKey: 'artistId',
    });
  };
  return Song;
};
