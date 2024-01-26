const axios = require('axios');
const AdmZip = require('adm-zip');
const fs = require('fs').promises; // Use fs.promises for async file operations
const Stock = require("../Models/Stock")
var csvtojson = require("csvtojson");

exports.downloadAndStoreData = async () => {
    const baseBSEUrl = 'https://www.bseindia.com/download/BhavCopy/Equity/';
    const extractionPath = 'public/extracted/';
    const zipFileName = 'bhavcopy.zip';
    const daysToFetch = 50;

    try {
        // Generate the URL with the current date
        const currentDate = new Date();
        const datePart = currentDate.toISOString().split('T')[0].replace(/-/g, '');
        const zipUrl = `${baseBSEUrl}EQ${datePart}_CSV.ZIP`;

        // Step 1: Download the zip file
        const response = await axios({
            url: `https://www.bseindia.com/download/BhavCopy/Equity/EQ230124_CSV.ZIP`,
            method: 'GET',
            responseType: 'stream',
        });

        await fs.writeFile(zipFileName, response.data);

        // Step 2: Extract the zip file
        const zip = new AdmZip(zipFileName);
        zip.extractAllTo(extractionPath, true);

        importFile("./public" + "/extracted/EQ230124.CSV")

        console.log('Data stored in MongoDB.');
    } catch (error) {
        console.error('Error:', error.message);
    }
};

const importFile = (filePath) => {
    //  Read Excel File to Json Data
    var arrayToInsert = [];

    csvtojson()
        .fromFile(filePath)
        .then((source) => {
            console.log(source);
            // Fetching the all data from each row
            for (var i = 0; i < source.length; i++) {
                // console.log(source[i]["title"]);

                var singleRow = {
                    code: source[i]["SC_CODE"],
                    name: source[i]["SC_NAME"],
                    open: source[i]["OPEN"],
                    high: source[i]["HIGH"],
                    low: source[i]["LOW"],
                    close: source[i]["CLOSE"],
                };

                arrayToInsert.push(singleRow);
            }

            //inserting into the table student
            Stock
                .insertMany(arrayToInsert)
                .then((result) => {
                    console.log("File Imported Successfully!");

                    fs.unlink(
                        filePath,
                        (err) => {
                            if (err) {
                                console.log("Failed to delete Excel File : " + err);
                            } else {
                                console.log("Successfully deleted Excel File");
                            }
                        }
                    );
                })
                .catch((err) => {
                    console.error(err);
                    // Handle the error appropriately, e.g., send an error response to the user
                });
        });
}
