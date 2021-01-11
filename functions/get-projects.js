const query = require("./utils/query");
 
const GET_PROJECTS = `
   query {
    allProjects {
       data {
         _id
         title
         description
         update
         encryptedRID
         statusID
         status
     }
   }
 }  
`;
 
exports.handler = async () => {
  const { data, errors } = await query(GET_PROJECTS);
 
  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors)
    };
  }
 
  return {
    statusCode: 200,
    body: JSON.stringify({ projects: data.allProjects.data })
  };
};