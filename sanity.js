import sanityClient from "@sanity/client"
import imageBuilder from "@sanity/image-url"

const client = sanityClient({
    projectId: "7uw4rjq0",
    dataset: "production",
    useCdn: true,
    apiVersion: "2021-10-21",
})

const builder = imageBuilder(client)

export const urlFor = source => builder.image(source)
// sanity cors
// Add cors
export default client