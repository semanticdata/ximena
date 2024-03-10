const markdownIt = require('markdown-it')
const eleventySass = require('eleventy-sass')
const tailwind = require('tailwindcss')
const postCss = require('postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')

module.exports = function (eleventyConfig) {
    eleventyConfig.setServerPassthroughCopyBehavior('copy')
    eleventyConfig.setQuietMode(true)
    eleventyConfig.addPassthroughCopy({
        './public/': '/',
        // './node_modules/prismjs/themes/prism-okaidia.css':
        // '/css/prism-okaidia.css',
    })
    // Plugins
    eleventyConfig.addPlugin(eleventySass)

    // Watch targets
    eleventyConfig.addWatchTarget('./src/assets/')
    eleventyConfig.addWatchTarget('./src/_layouts/')

    // Layout aliases
    eleventyConfig.addLayoutAlias('home', 'home.njk')
    eleventyConfig.addLayoutAlias('post', 'post.njk')
    eleventyConfig.addLayoutAlias('note', 'note.njk')
    eleventyConfig.addLayoutAlias('tail', 'tail.njk')

    // Copy/pass-through
    eleventyConfig.addPassthroughCopy('src/assets/js/')
    eleventyConfig.addPassthroughCopy('src/assets/css/')

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
        // quotes: '“”‘’',
        // typographer:  false,
    }
    eleventyConfig.setLibrary('md', markdownIt(options))

    const postcssFilter = (cssCode, done) => {
        // Call PostCSS
        postCss([
            tailwind(require('./tailwind.config')),
            autoprefixer(),
            cssnano({ preset: 'default' }),
        ])
            .process(cssCode, {
                // Path to CSS file
                from: './src/assets/css/tailwind.css',
            })
            .then(
                (r) => done(null, r.css),
                (e) => done(e, null),
            )
    }
    eleventyConfig.addNunjucksAsyncFilter('postcss', postcssFilter)

    return {
        templateFormats: ['md', 'njk', 'html', 'liquid'],
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        passthroughFileCopy: true,

        dir: {
            input: 'src',
            output: '_site',
            includes: '_includes',
            layouts: '_layouts',
            data: '_data',
        },
        pathPrefix: '/ximena/',
    }
}
