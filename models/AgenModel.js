import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Level from "./LevelModel.js"; // Import the Level model to establish the relationship

const { DataTypes } = Sequelize;

const Agen = db.define('Agen', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Auto-increment the primary key
    },
    no_lisensi: {
        type: DataTypes.STRING,
        allowNull: false, // License number is required
    },
    nama_agen: {
        type: DataTypes.STRING,
        allowNull: true, // Agent name is optional
    },
    id_agen_level: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Level, // Reference the Level model
            key: 'urutan', // Use the urutan field as the foreign key
        },
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    status_tgl: {
        type: DataTypes.DATE, // Use DATE for date values
        allowNull: true,
    },
    wilayah_kerja: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    freezeTableName: true, // Prevent Sequelize from pluralizing table name
    timestamps: false, // Disable createdAt/updatedAt if not needed
});

// Establish relationship
Level.hasMany(Agen, {
    foreignKey: 'id_agen_level', // Foreign key in the Agen model
    sourceKey: 'urutan', // Referenced key in the Level model
    as: 'agents', // Alias for the relationship
});

Agen.belongsTo(Level, {
    foreignKey: 'id_agen_level', // Foreign key in the Agen model
    targetKey: 'urutan', // Referenced key in the Level model
    as: 'level', // Alias for the relationship
});

export default Agen;

(async () => {
    try {
        await db.sync(); // Ensure the table structure matches the model
        console.log("Agen table synchronized successfully.");
    } catch (error) {
        console.error("Failed to synchronize Agen table:", error);
    }
})();
