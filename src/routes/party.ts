import { Router } from "express";

import { validatePartyData } from "../middleware/validation";
import { handleBeerAndPlaylist } from "../controllers/partyController";

const router = Router();

router.post("/", validatePartyData, handleBeerAndPlaylist);

export default router;
