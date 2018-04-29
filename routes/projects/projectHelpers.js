    // Function for setting properties of a Project schema object
    const setProjectObj = (input, project) => {
        project.title = input.title;
        project.categories = input.categories;
        project.description = input.description;
        project.stack = input.stack;
        project.status = input.status;
        project.repoUrl = input.repoUrl;
        project.img = input.img;
        project.users = input.users;
  
        return project;
      }

      
/*
function checkBodyForProperties (body) {

  // remove id and owner - these should be unable to be updated from put
  const {id, title, owner, ...rest } = body;
  
  // spread title and rest of the object into new obeject ready to be saved
  const newObj = {
  	title,
   	...rest
  };
  
  return newObj;
}*/

      module.exports = setProjectObj;