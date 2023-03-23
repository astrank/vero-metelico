import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'obra',
  title: 'Obra',
  type: 'document',
  initialValue: () => ({
    fecha: new Date().toISOString()
  }),
  fields: [
    defineField({
      name: 'titulo',
      title: 'Titulo',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'titulo',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
      description: 'El slug es un fragmento de texto unico (sin tildes) separado por guiones que va a ser usado en el URL para identificar esta página. "primer-cuento" es el slug de veronicametelico.com/obra/primer-cuento'
    }),
    defineField({
      name: 'categoria',
      title: 'Categoría',
      type: 'reference',
      to: {type: 'categoria'},
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'introduction',
      title: 'Sinopsis',
      type: 'blockContent',
      description: 'Una breve descripción o el primer párrafo de la obra.',
    }),
    defineField({
      name: 'cuerpo',
      title: 'Cuerpo',
      type: 'blockContent',
    }),
    defineField({
      name: 'fecha',
      title: 'Fecha de publicación',
      type: 'datetime',
      hidden: true,
      initialValue: (new Date()).toISOString(),
    }),
  ]
})
