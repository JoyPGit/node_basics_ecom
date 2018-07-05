let ecomConfig = {};

ecomConfig.port = 3100;
ecomConfig.allowedCorsOrigin = "*";
ecomConfig.env = "dev";
ecomConfig.db = {
    uri:'mongodb://localhost:27017/ecomDb' //blogAppDb is created by default
}
ecomConfig.apiVersion = '/api/v1';

module.exports = {

    port:ecomConfig.port,
    allowedCorsOrigin:ecomConfig.allowedCorsOrigin,
    environment:ecomConfig.env,
    db:ecomConfig.db,
    apiVersion:ecomConfig.apiVersion

}//end module exports