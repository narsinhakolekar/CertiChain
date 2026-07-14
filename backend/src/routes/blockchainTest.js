import express from "express";
import { certificateContract } from "../blockchain/contract.js";

const router = express.Router();


router.get("/test-contract", async (req, res) => {
    try {

        const registry =
            await certificateContract.universityRegistry();

        res.json({
            status: "Connected ✅",
            universityRegistry: registry
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            status: "Failed ❌",
            error: error.message
        });
    }
});


export default router;