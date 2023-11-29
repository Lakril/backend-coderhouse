import fs from 'fs/promises';
import path from 'path';

const filePath = path.join(path.dirname(new URL(import.meta.url).pathname), '../database/products.json');

function generateCode(length) {
    let code = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        const randomChar = characters.charAt(randomIndex);
        code += randomChar;
    }

    return code;
}

async function updateProductPrice(productId) {
    const json = await fs.readFile(filePath, 'utf-8');
    const products = JSON.parse(json);

    const product = products.find((p) => p.id === productId);
    if (!product) {
        throw new Error(`Product with ID ${productId} not found`);
    }

    const newStock = Math.floor(Math.random() * 100) + 1;
    product.stock = newStock;
    const newCode = generateCode(6);
    product.code = newCode;

    await fs.writeFile(filePath, JSON.stringify(products, null, 2));
}

// updateProductPrice(1);

for (let i = 1; i < 21; i++) {
    await updateProductPrice(i);
    //   console.log(str);
}
