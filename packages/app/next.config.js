const withPlugins = require('next-compose-plugins');
// const withTM = require('next-transpile-modules')(['../common', '@nextjs-fullstack/app']);

// const withSass = require('@zeit/next-sass');
// const path = require('path');

/* Without CSS Modules, with PostCSS */
module.exports = withPlugins(
  [
    // [withSass],
    // [withTM]
  ],
  {
    // useFileSystemPublicRoutes: false,
    sassOptions: {
      // includePaths: [path.join(__dirname, 'styles')],
    },
    webpack(config, options) {
      // config.resolve.alias["@starshopr-hr/common"] = path.join(__dirname, "../../common/src/");
      return config;
    },
  }
);
