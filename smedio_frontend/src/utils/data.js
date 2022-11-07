export const userQuery = (userId) => {
    //Get the document 'user' from ../../../smedio_backend/schemas where user is userId 
    const query = `*[_type == 'user' && _id == '${userId}']`;

    return query
}


export const searchQuery = (searchTerm) => {
    //In Feed.jsx and Search.jsx load all serch terms and/or categories with all the info that come with it. 
    const query = `*[_type == 'pin' && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
        image {
            asset -> {
                url
            }
        },
        _id,
        destination,
        postedBy -> {
            _id,
            userName,
            image
        },
        save[] {
            _key,
            postedBy -> {
                _id,
                userName,
                image
            },
        },
    }`

    return query;
}

export const feedQuery = `*[_type == 'pin'] | order(_createdAt desc) {
    image {
        asset -> {
            url
        }
    },
    _id,
    destination,
    postedBy -> {
        _id,
        userName,
        image
    },
    save[] {
        _key,
        postedBy -> {
            _id,
            userName,
            image
        },
    },
}`