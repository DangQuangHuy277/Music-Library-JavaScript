module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SongArtist', {
      id: {
        primaryKey: true, type: Sequelize.INTEGER, autoIncrement: true,
      },
      SongId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Song',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      ArtistId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Artist',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },
  async down(queryInterface/* , Sequelize */) {
    await queryInterface.dropTable('SongArtist');
  },
};
