import { Router } from "express";

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
router.post("/", handleCreateBeer);
router.put("/:id", handleUpdateBeer);
router.delete("/:id", handleDeleteBeer);

export default router;
