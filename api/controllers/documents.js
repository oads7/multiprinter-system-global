'use strict';

// Imports
const { StatusResponse, StatusResponseCode } =  require('../Entities/statusResponse');
const dbContext = require('../dbContext');

// Exports
const documentsController = 
{
    get : httpGet,
    post : httpPost,
    delete : httpDelete
};
module.exports = documentsController;

// Declarations and statements
function httpGet(request, response)
// Example route   ?node=MWW03QQMMFAO9NWE
{
    let localID = request.query.node;
    let index = dbContext.index(localID);

    if (index == -1) 
    {
        // Local ID not found
        let error = StatusResponse.error("Local ID not found");
    
        response.setHeader('Content-Type', 'application/json');
        response.status(404).send(JSON.stringify(error));
    }
    else
    {
        let success = StatusResponse.success(dbContext.getDocuments(index));

        response.setHeader('Content-Type', 'application/json');
        response.status(200).send(JSON.stringify(success));
    }
}

function httpPost(request, response)
// Example body   { id: "HKSAFHSDJCXVMXNA", document: 1467324743, pinCode: 5433 }
{
    let target = request.body;
    let index = dbContext.index(target.id);

    if (index == -1) 
    {
        // Local ID not found
        let error = StatusResponse.error("Local ID not found");
    
        response.setHeader('Content-Type', 'application/json');
        response.status(404).send(JSON.stringify(error));
    }
    else
    {
        dbContext.addDocument(index, target.document, target.pinCode)
        let success = StatusResponse.success("Document registered");

        response.setHeader('Content-Type', 'application/json');
        response.status(200).send(JSON.stringify(success));
    }
}

function httpDelete(request, response)
// Example body   { id: "HKSAFHSDJCXVMXNA", document: 1467324743 }
{
    let target = request.body;
    let index = dbContext.index(target.id);

    if (index == -1) 
    {
        // Local ID not found
        let error = StatusResponse.error("Local ID not found");
    
        response.setHeader('Content-Type', 'application/json');
        response.status(404).send(JSON.stringify(error));
    }
    else
    {
        if (dbContext.removeDocument(index, target.document) === true)
        {
            let success = StatusResponse.success("Document removed");

            response.setHeader('Content-Type', 'application/json');
            response.status(200).send(JSON.stringify(success));
        }
    }
}
