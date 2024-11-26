import express from "express";
import { getLevels,
    getLevelById,
    saveLevel,
    updateLevel,
    deleteLevel
 } from "../controllers/LevelControllers.js";
const router = express.Router();

router.get('/levels',getLevels);
router.get('/levels/:id',getLevelById);
router.post('/levels',saveLevel);
router.patch('/levels/:id',updateLevel);
router.delete('/levels/:id',deleteLevel);

export default router;