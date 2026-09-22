import crypto from "crypto";

export const generateCode =() => {
    const minString = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let shortCode = "";

    for(let i = 0; i < 6; i++){
        shortCode += minString.charAt(Math.floor(Math.random() * minString.length));
    }

    return shortCode;
    //return crypto.randomBytes(4).toString("base64url").slice(0, 6);
}
// in base64url => 3 bytes → 4 characters