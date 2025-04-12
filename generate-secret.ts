// Will use Node.JS built in crypto module to generate Next_auth secret
import crypto from "crypto";

const secret = crypto.randomBytes(32).toString("hex");

console.log("Secret Code Via Crypto: ", secret);
