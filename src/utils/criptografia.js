import jwt from 'jsonwebtoken';
import process from 'process';

// jwt
export function encryptData(data) {
    return new Promise((resolve, reject) => {
        if (!data) {
            reject(new Error('invalid data for encription'));
        }
        jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '24h' }, (err, encoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(encoded);
            }
        });
    });
}

export function decryptData(token) {
    return new Promise((resolve, reject) => {
        if (!token) {
            reject(new Error('invalid data for decription'));
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
}
