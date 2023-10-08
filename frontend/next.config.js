module.exports = {
  images: {
    loader: "custom",
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  env: {
    nextImageExportOptimizer_imageFolderPath: "public",
    nextImageExportOptimizer_exportFolderPath: "out",
    nextImageExportOptimizer_quality: 80,
    nextImageExportOptimizer_generateAndUseBlurImages: false,
    nextImageExportOptimizer_optimizeImagesInDev : true,
    nextImageExportOptimizer_storePicturesInWEBP: false,
  },
};
