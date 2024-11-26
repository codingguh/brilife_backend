import express from "express";
import { getAgenStrukturs,
    getAgenStrukturById,
    saveAgenStruktur,
    updateAgenStruktur,
    deleteAgenStruktur
 } from "../controllers/AgenStrukturControllers.js";
const router = express.Router();

router.get('/agenStrukturs',getAgenStrukturs);
router.get('/agenStrukturs/:id',getAgenStrukturById);
router.post('/agenStrukturs',saveAgenStruktur);
router.patch('/agenStrukturs/:id',updateAgenStruktur);
router.delete('/agenStrukturs/:id',deleteAgenStruktur);

export default router;