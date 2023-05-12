import { Router } from "express";
import { validateBeerData } from "../middleware/validation";

import {
  handleGetBeer,
  handleGetAllBeer,
  handleCreateBeer,
  handleUpdateBeer,
  handleDeleteBeer,
} from "../controllers/beerController";

const router = Router();

router.get("/:id", handleGetBeer);
router.get("/", handleGetAllBeer);
router.post("/", validateBeerData, handleCreateBeer);
router.put("/:id", handleUpdateBeer);
router.delete("/:id", handleDeleteBeer);

export default router;
