export const pageIncludes = ({ models }) => [
  {
    model: models.PageMeta,
    as: 'meta'
  },
  {
    model: models.PageData,
    as: 'data'
  }
]
