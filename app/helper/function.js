const fs = require('node:fs');
const { existsSync, unlinkSync } = require('node:fs');
global.FileUploadBase64 = async (base64string, destination = '') => {
    try {
        // Remove header
        let base64ImageArr = await base64string.split(';base64,');
        let extension = base64ImageArr[0].split('/')[1];
        base64Image = base64ImageArr.pop();

        fileName = new Date().toISOString().replace(/[-:.]/g, '').slice(0, 15) + "." + extension;
        let filePath = IMAGE_PATH + destination + fileName;

        //Decode the Base64 string into a Buffer
        const fileBuffer = Buffer.from(base64Image, 'base64');

        // Write the image buffer to a file
        fs.writeFile(filePath, fileBuffer, (err) => {
            if (err) {
                console.error('Error while writing the image:', err);
            } else {
                console.log('Image uploaded successfully:', fileName);
            }
        });
        return fileName;
    } catch (error) {
        console.log(error.message);
    }
}

global.deleteFile = (location) => {
    if (existsSync(location)) {
        unlinkSync(location);
    }
    return true;
}

global.getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};