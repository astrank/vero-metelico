import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'autores_invitados',
  title: 'Autores Invitados',
  type: 'document',
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre',
      type: 'string',
      validation: Rule => Rule.required().min(2).max(200)
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'string',
      description: 'Link a la página o a una red social del invitado.',
    }),
  ],
})