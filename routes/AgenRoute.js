import express from "express";
import { getAgens,
    getAgenById,
    saveAgen,
    updateAgen,
    deleteAgen
 } from "../controllers/AgenControllers.js";
const router = express.Router();

router.get('/agens',getAgens);
router.get('/agens/:id',getAgenById);
router.post('/agens',saveAgen);
router.patch('/agens/:id',updateAgen);
router.delete('/agens/:id',deleteAgen);

export default router;