//Connecting Sanity backend with the front end.
import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

//Sanity data.
export const client = sanityClient({
    projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
    dataset: 'production',
    apiVersion: '2022-11-07',
    useCdn: true,
    token: process.env.REACT_APP_SANITY_TOKEN,
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source);