import Certificate from "../models/Certificate.js";

export async function listCertificates(req, res) {
  try {
    console.log("===== LIST CERTIFICATES =====");

    console.log("Logged User:");
    console.log(req.user);

    const allCertificates = await Certificate.find();

    console.log("Total Certificates:", allCertificates.length);
    console.log(allCertificates);

    const myCertificates = await Certificate.find({
      issuerWallet: req.user.wallet
    });

    console.log("Certificates Found:", myCertificates.length);
    console.log(myCertificates);

    res.json(myCertificates);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message
    });
  }
}