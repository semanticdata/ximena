module.exports = function (eleventyConfig) {
  eleventyConfig.setServerPassthroughCopyBehavior('copy');
  eleventyConfig.addPassthroughCopy('/public');
  eleventyConfig.setQuietMode(true);

  // Watch targets
  eleventyConfig.addWatchTarget('./src/assets/css/');
  eleventyConfig.addWatchTarget('./src/assets/js/');
  eleventyConfig.addWatchTarget('./src/layouts/');

  eleventyConfig.addLayoutAlias('base', 'base.njk');

  // Copy/pass-through files
  eleventyConfig.addPassthroughCopy('src/assets/css');
  eleventyConfig.addPassthroughCopy('src/assets/js');

  return {
    templateFormats: ['md', 'njk'],
    htmlTemplateEngine: 'njk',
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