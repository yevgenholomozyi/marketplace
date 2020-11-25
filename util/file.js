const fs = require('fs');

const deleteFile = (filePath) => {
    fs.unlink(filePath, (err) => {
        if (err) {
            throw (err);
        }
    }) // deletes the name and the file, connected to the DB.
}

exports.deleteFile = deleteFile;