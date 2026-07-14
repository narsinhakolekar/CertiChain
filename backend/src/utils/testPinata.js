import { uploadToIPFS } from "./pinata.js";

const cid = await uploadToIPFS("./test.pdf");

console.log("IPFS CID:", cid);