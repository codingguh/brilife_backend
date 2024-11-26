import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Level = db.define('Level', {
    level: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    keterangan: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    urutan: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true, // Make it a primary key for foreign key reference
    },
}, {
    freezeTableName: true,
    timestamps: false,
});


export default Level;

(async () => {
    try {
        await db.sync(); // Ensure the table structure matches the model
        console.log("Database synchronized successfully.");
    } catch (error) {
        console.error("Failed to synchronize database:", error);
    }
})();
