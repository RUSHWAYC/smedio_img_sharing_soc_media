export const userQuery = (userId) => {
    //Get the document 'user' from ../../../smedio_backend/schemas where user is userId 
    const query = `*[_type == 'user' && _id == '${userId}']`;

    return query
}