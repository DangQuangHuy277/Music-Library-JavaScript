/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Song', {
      id: {
        primaryKey: true, type: Sequelize.UUID, defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      title: { type: Sequelize.STRING, allowNull: false },
      genre: { type: Sequelize.STRING },
      duration: { type: Sequelize.INTEGER, allowNull: false },
      link: { type: Sequelize.STRING },
      AlbumId: {
        type: Sequelize.UUID,
        references: {
          model: 'Album',
          key: 'id',
        },
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },
  async down(queryInterface/* , Sequelize */) {
    await queryInterface.dropTable('Song');
  },
};
