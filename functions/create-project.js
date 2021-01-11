const query = require("./utils/query");
 

const CREATE_PROJECT = `
  mutation($title: String!, $description: String!, $update: Time, $encryptedRID: String, $statusID: String, $status: String) {
    createProject(data: {title: $title, description: $description, update: $update, encryptedRID: $encryptedRID, statusID: $statusID, status: $status}) {
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
    const { title, description, update, encryptedRID, statusID, status } = JSON.parse(event.body); 
    const { data, errors } = await query(
        CREATE_PROJECT, { title, description, update, encryptedRID, statusID, status });
 
    if (errors) {
        return {
        statusCode: 500,
        body: JSON.stringify(errors)
        };
    }
 
    return {
        statusCode: 200,
        body: JSON.stringify({ project: data.createProject })
    };
};