import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Agen from "./AgenModel.js"; // Import the Level model to establish the relationship

const { DataTypes } = Sequelize;

const AgenStruktur = db.define('AgenStruktur', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Auto-increment primary key
    },
    parent_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // Parent ID is optional for top-level agents
        references: {
            model: 'AgenStruktur', // Self-referencing for hierarchical structure
            key: 'id',
        },
        onDelete: 'CASCADE', // Cascade delete
        onUpdate: 'CASCADE',
    },
    id_agen: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Agen, // Reference the Agen model
            key: 'id',
        },
        onDelete: 'CASCADE', // Cascade delete when related Agen is deleted
        onUpdate: 'CASCADE',
    },
    berlaku_mulai: {
        type: DataTypes.DATE, // Use DATE for valid-from date
        allowNull: true,
    },
    berlaku_akhir: {
        type: DataTypes.DATE, // Use DATE for valid-until date
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    keterangan: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    freezeTableName: true,
    timestamps: false,
});

export default AgenStruktur;

(async () => {
    try {
        await db.sync(); // Ensure the table structure matches the model
        console.log("Agen table synchronized successfully.");
    } catch (error) {
        console.error("Failed to synchronize Agen table:", error);
    }
})();
