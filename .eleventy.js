const markdownIt = require('markdown-it')
const eleventySass = require('eleventy-sass')
const tailwind = require('tailwindcss')
const postCss = require('postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const { DateTime } = require('luxon')

module.exports = function (eleventyConfig) {
    eleventyConfig.setServerPassthroughCopyBehavior('copy')
    eleventyConfig.addPassthroughCopy('/public')
    eleventyConfig.setQuietMode(true)

    // Plugins
    eleventyConfig.addPlugin(eleventySass)

    // Watch targets
    eleventyConfig.addWatchTarget('./src/assets/')
    eleventyConfig.addWatchTarget('./src/layouts/')

    // Layout aliases
    eleventyConfig.addLayoutAlias('home', 'home.njk')
    eleventyConfig.addLayoutAlias('post', 'post.njk')
    eleventyConfig.addLayoutAlias('tail', 'tail.njk')

    // Copy/pass-through
    eleventyConfig.addPassthroughCopy('src/assets/')

    // Shortcodes
    eleventyConfig.addShortcode(
        'headers',
        (title, subtitle) =>
            `<h1>${title}</h1>
        <p>${subtitle}</p>`,
    )

    // Markdown-It Options
    let options = {
        html: true,
        breaks: true,
        linkify: true,
        quotes: '“”‘’',
        // typographer:  false,
    }
    eleventyConfig.setLibrary('md', markdownIt(options))

    const postcssFilter = (cssCode, done) => {
        // we call PostCSS here.
        postCss([
            tailwind(require('./tailwind.config')),
            autoprefixer(),
            cssnano({ preset: 'default' }),
        ])
            .process(cssCode, {
                // path to our CSS file
                from: './src/assets/css/tailwind.css',
            })
            .then(
                (r) => done(null, r.css),
                (e) => done(e, null),
            )
    }
    eleventyConfig.addNunjucksAsyncFilter('postcss', postcssFilter)

    return {
        pathPrefix: "/ximena/",
        templateFormats: ['md', 'njk'],
        htmlTemplateEngine: 'njk',
        markdownTemplateEngine: 'njk',
        passthroughFileCopy: true,
        dir: {
            input: 'src',
            output: '_site',
            includes: '_includes',
            layouts: 'layouts',
            data: '_data',
        },
    }
}
