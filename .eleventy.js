const markdownIt = require("markdown-it")
const prism = require("markdown-it-prism")
const eleventySass = require("eleventy-sass")
const tailwind = require("tailwindcss")
const postCss = require("postcss")
const autoprefixer = require("autoprefixer")
const cssnano = require("cssnano")

// Utilities
const filters = require("./utils/filters.js")
const transforms = require("./utils/transforms.js")
const shortcodes = require("./utils/shortcodes.js")

module.exports = function (eleventyConfig) {
  eleventyConfig.setServerPassthroughCopyBehavior("copy")
  // eleventyConfig.setServerPassthroughCopyBehavior('passthrough')
  eleventyConfig.setQuietMode(true)

  // Plugins
  eleventyConfig.addPlugin(eleventySass)

  // Shortcodes
  eleventyConfig.addShortcode(
    "headers",
    (title, subtitle) =>
      `<h1>${title}</h1>
          <p>${subtitle}</p>`,
  )

  // Watch targets
  eleventyConfig.addWatchTarget("./src/")
  eleventyConfig.addWatchTarget("./utils/")

  // Layout aliases
  eleventyConfig.addLayoutAlias("base", "base.njk")
  eleventyConfig.addLayoutAlias("home", "home.njk")
  eleventyConfig.addLayoutAlias("note", "note.njk")
  eleventyConfig.addLayoutAlias("post", "post.njk")

  // Copy/pass-through
  eleventyConfig.addPassthroughCopy("src/assets")
  eleventyConfig.addPassthroughCopy({public: "/"})
  eleventyConfig.addPassthroughCopy({
    "./node_modules/prismjs/themes/prism-tomorrow.css":
      "/assets/css/prism-prism-tomorrow.css",
  })

  // Markdown-It Options
  let options = {
    html: true,
    breaks: true,
    linkify: true,
    // quotes: '“”‘’',
    // typographer:  false,
  }
  eleventyConfig.setLibrary("md", markdownIt(options))
  const markdownItOptions = {
    html: true,
    linkify: true,
    typographer: true,
  }

  const postcssFilter = (cssCode, done) => {
    // Call PostCSS
    postCss([
      tailwind(require("./tailwind.config")),
      autoprefixer(),
      cssnano({preset: "default"}),
    ])
      .process(cssCode, {
        // Path to CSS file
        from: "./public/assets/css/tailwind.css",
      })
      .then(
        (r) => done(null, r.css),
        (e) => done(e, null),
      )
  }
  eleventyConfig.addNunjucksAsyncFilter("postcss", postcssFilter)

  const md = markdownIt(markdownItOptions).use(function (md) {
    // Recognize Mediawiki links ([[text]])
    md.linkify.add("[[", {
      validate: /^\s?([^\[\]\|\n\r]+)(\|[^\[\]\|\n\r]+)?\s?\]\]/,
      normalize: (match) => {
        const parts = match.raw.slice(2, -2).split("|")
        parts[0] = parts[0].replace(/.(md|markdown)\s?$/i, "")
        match.text = (parts[1] || parts[0]).trim()
        match.url = `/ximena/notes/${parts[0].trim()}/`
      },
    })
  })

  // eleventyConfig.setLibrary('md', markdownLibrary);
  eleventyConfig.setLibrary("md", md)
  md.use(prism, options)

  return {
    // pathPrefix: '/ximena/',
    templateFormats: ["md", "njk"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    passthroughFileCopy: true,

    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data",
    },
  }
}
