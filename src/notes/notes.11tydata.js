// This regex finds all wikilinks in a string
const wikilinkRegExp = /\[\[\s?([^\[\]\|\n\r]+)(\|[^\[\]\|\n\r]+)?\s?\]\]/g

// function caselessCompare(a, b) {
//   return a.normalize().toLowerCase() === b.normalize().toLowerCase()
// }

module.exports = {
  layout: "note",
  tags: "notes",
}
