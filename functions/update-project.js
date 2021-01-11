// update-shopnote.js

const query = require("./utils/query");

const UPDATE_PROJECT = `
    mutation($id: ID!, $title: String!, $description: String!, $update: Time, $encryptedRID: String, $statusID: String, $status: String){
        updateProject(id: $id, data: {title: $title, description: $description, update: $update, encryptedRID: $encryptedRID, statusID: $statusID, status: $status}){
            _id
            title
            description
            update
            encryptedRID
            statusID
            status
        }
    }
`;

exports.handler = async event => {  
    const { id, title, description, update, encryptedRID, statusID, status } = JSON.parse(event.body); 
    const { data, errors } = await query(
        UPDATE_PROJECT, { id, title, description, update, encryptedRID, statusID, status });
 
    if (errors) {
        return {
        statusCode: 500,
        body: JSON.stringify(errors)
        };
    }
 
    return {
        statusCode: 200,
        body: JSON.stringify({ project: data.updateProject })
    };
};