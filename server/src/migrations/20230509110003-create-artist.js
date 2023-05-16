module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Artist', {
      id: {
        primaryKey: true, type: Sequelize.UUID, defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      name: { type: Sequelize.STRING, allowNull: false },
      gender: { type: Sequelize.STRING, allowNull: false },
      birthdate: { type: Sequelize.DATEONLY, allowNull: false },
      nationality: { type: Sequelize.STRING },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },
  async down(queryInterface/* , Sequelize */) {
    await queryInterface.dropTable('Artist');
  },
};
