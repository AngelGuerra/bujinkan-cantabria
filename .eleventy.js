const htmlmin = require("html-minifier");
const Image = require("@11ty/eleventy-img");
const { URL } = require("url");

/**
 * @description Genera una URL absoluta.
 * @param {String} url URL actual.
 * @returns {String}
 */
const getAbsoluteUrl = (url) => {
  const base = process.env.ELEVENTY_PRODUCTION
    ? "https://bujinkancantabria.ninja"
    : "http://localhost:8080";

  try {
    return new URL(url, base).toString();
  } catch (e) {
    console.warn(
      "Trying to convert %o to be an absolute url with base %o and failed, returning: %o (invalid url)",
      url,
      base,
      url
    );

    return url;
  }
};

/**
 * @description Minifies the html to optimize the page size.
 * @param {String} content Content to minify.
 * @param {String} outputPath Content output path.
 * @returns {String}
 */
const minifyHtml = function (content, outputPath) {
  if (
    process.env.ELEVENTY_PRODUCTION &&
    outputPath &&
    outputPath.endsWith(".html")
  ) {
    let minified = htmlmin.minify(content, {
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true,
    });

    return minified;
  }

  return content;
};

/**
 * @description Genera las versiones responsive de una imagen.
 * @see https://github.com/11ty/eleventy-img Documentación.
 * @param {String} src Ruta de la imagen original.
 * @param {String} alt Texto alternativo.
 * @param {String} className Class CSS a aplicar en la imagen generada.
 * @param {String} loading Tipo de carga de la imagen.
 * @param {Number[]} widths Anchos que determinan las imágenes a generar.
 * @param {string} sizes Atributo sizes de la imagen.
 * @param {String} outputDir Directorio de salida (relativo a /assets/img), también determina la ruta de la imagen.
 * @returns {String} HTML que renderiza la imagen.
 */
const responsiveImage = async function (
  src,
  alt,
  className = "",
  loading = "lazy",
  quality = 95,
  widths = [640, 768, 1024, 1280, 1536],
  sizes = "(max-width: 640px) 640px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, (max-width: 1280px) 1280px, 1536px",
  outputDir = ""
) {
  const formats = src.endsWith(".png") ? ["png"] : ["jpeg"];
  formats.unshift("webp");
  formats.unshift("avif");
  formats.unshift("svg");

  /** @var {Object} metadata Imágenes generadas junto con sus datos. */
  const metadata = await Image(src, {
    widths: widths.map((w) => parseInt(w, 10)),
    formats,
    svgShortCircuit: true,
    outputDir: `./_site/assets/img/${outputDir}`,
    urlPath: `/assets/img/${outputDir}`,
    /** @see https://sharp.pixelplumbing.com/api-constructor#parameters */
    // sharpOptions: {},
    /** @see https://sharp.pixelplumbing.com/api-output#webp */
    sharpWebpOptions: {
      quality: quality,
    },
    /** @see https://sharp.pixelplumbing.com/api-output#png */
    // sharpPngOptions: {},
    /** @see https://sharp.pixelplumbing.com/api-output#jpeg*/
    sharpJpegOptions: {
      quality: quality,
    },
    /** @see https://sharp.pixelplumbing.com/api-output#avif */
    sharpAvifOptions: {
      quality: quality,
    },
  });

  return Image.generateHTML(metadata, {
    alt,
    sizes,
    loading,
    decoding: "async",
    class: className,
  });
};

/**
 * @description Genera una imagen para su uso, por ejemplo, en los microdatos.
 * @param {String} src Ruta original de la imagen.
 * @param {Number} quality Calidad de la imagen generada.
 * @param {Number} width Ancho de la imagen generada.
 * @param {String} format Formato de salida de la imagen generada.
 * @returns {String} URL de la imagen.
 */
const assetImageUrl = async (
  src = null,
  quality = 95,
  width = 696,
  format = "webp"
) => {
  if (!src) {
    src = "_assets/img/resources/logo.svg";
  }

  const metadata = await Image(src, {
    widths: [width],
    formats: [format],
    outputDir: `./_site/assets/img/meta`,
    urlPath: `/assets/img/meta`,
    sharpWebpOptions: {
      quality: quality,
    },
  });

  return getAbsoluteUrl(metadata[format][0].url);
};

/**
 * @description Genera una clase aleatoria para el atributo rotate de TailwindCSS
 *   - `-rotate-6`
 *   - `-rotate-3`
 *   - `-rotate-2`
 *   - `-rotate-1`
 *   - `-rotate-0`
 *   - `rotate-0`
 *   - `rotate-1`
 *   - `rotate-2`
 *   - `rotate-3`
 *   - `rotate-6`
 * @returns {String}
 */
const randomRotateClassName = () => {
  /**
   * @description Retorna un número para la clase. TailwindCSS no tiene implementadas las clases `rotate-4` ni
   * `rotate-5`.
   * @returns {Number}
   */
  const getClassNumber = () => {
    const randomNumber = Math.floor(Math.random() * 7);

    return [4, 5].includes(randomNumber) ? getClassNumber() : randomNumber;
  };

  return `${Math.random() < 0.5 ? "" : "-"}rotate-${getClassNumber()}`;
};

module.exports = function (eleventyConfig) {
  //   eleventyConfig.setBrowserSyncConfig({
  //     callbacks: {
  //       ready: function (err, bs) {
  //         bs.addMiddleware("*", (req, res) => {
  //           const content404 = fs.readFileSync("_site/404.html");
  //           res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
  //           res.write(content404);
  //           res.end();
  //         });
  //       },
  //     },
  //   });

  eleventyConfig.addLayoutAlias("default", "layouts/default.html");
  eleventyConfig.setTemplateFormats(["html"]);
  eleventyConfig.addWatchTarget("./_assets/css/tailwind.css");
  eleventyConfig.addPassthroughCopy({
    "_assets/css/": "./assets/css/",
    "_assets/img/static": "./assets/img/",
    "_assets/favicons": "/",
  });

  eleventyConfig.addTransform("htmlmin", minifyHtml);
  eleventyConfig.addShortcode("responsiveImage", responsiveImage);
  eleventyConfig.addShortcode("assetImageUrl", assetImageUrl);
  eleventyConfig.addShortcode("randomRotateClassName", randomRotateClassName);
  eleventyConfig.addFilter("absoluteUrl", getAbsoluteUrl);
};
