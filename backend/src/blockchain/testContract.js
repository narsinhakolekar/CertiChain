import { certificateContract } from "./certificate.js";

const address = await certificateContract.universityRegistry();

console.log("University Registry:", address);