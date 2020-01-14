const checkFile = (url) => {
  return url.indexOf(".css") != -1 || url.indexOf(".svg") != -1 || url.indexOf(".png") != -1 || url.indexOf(".js") != -1 || url.indexOf(".jpg") != -1 || url.indexOf(".gif") != -1 || url.indexOf(".txt") != -1 || url.indexOf(".xml") != -1 || url.indexOf(".ttf") != -1 || url.indexOf(".woff") != -1 || url.indexOf(".woff2") != -1;
};

module.exports = checkFile;