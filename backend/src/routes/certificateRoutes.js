import express from "express";
import { upload } from "../utils/upload.js";
import { authenticate } from "../middleware/authMiddleware.js";
import {
    issueCertificate,
    verifyCertificate
} from "../controllers/certificateController.js";
import { listCertificates } from "../controllers/listCertificatesController.js";

const router = express.Router();

// Issue Certificate
router.post(
    "/issue",
    authenticate,
    upload.single("certificate"),
    issueCertificate
);

// List My Certificates
router.get(
    "/",
    authenticate,
    listCertificates
);

// Verify Certificate
router.get(
    "/verify/:id",
    verifyCertificate
);

export default router;