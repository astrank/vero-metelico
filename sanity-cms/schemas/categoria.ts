import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'categoria',
  title: 'Categorías',
  type: 'document',
  fields: [
    defineField({
      name: 'nombre_singular',
      title: 'Nombre en singular',
      type: 'string',
      validation: Rule => Rule.required().max(200),
    }),
    defineField({
      name: 'nombre_plural',
      title: 'Nombre en plural',
      type: 'string',
      validation: Rule => Rule.required().max(200),
    }),
  ],
})
