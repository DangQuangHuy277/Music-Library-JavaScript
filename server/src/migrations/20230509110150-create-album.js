module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Album', {
      id: {
        primaryKey: true, type: Sequelize.UUID, defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      title: { type: Sequelize.STRING, allowNull: false },
      releaseDate: { type: Sequelize.DATEONLY, allowNull: false },
      link: { type: Sequelize.STRING },
      ArtistId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Artist',
          key: 'id',
        },
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },
  async down(queryInterface/* , Sequelize */) {
    await queryInterface.dropTable('Album');
  },
};
