import { defineField, defineType } from "sanity";

export default defineType({
    name: "featured",
    type: "document",
    title: "Featured Menu",
    fields: [
        defineField({
            name: "name",
            type: "string",
            title: "Featured category name",
            validation: Rule => Rule.required()
        }),
        defineField({
            name: "short_description",
            type: "string",
            title: "Short Description",
            validation: rule => rule.max(200)
        }),
        defineField({
            name: "restaurants",
            type: "array",
            title: "Restaurants",
            of: [{ type: "reference", to: [{ type: "restaurant" }] }]
        })
    ]
})