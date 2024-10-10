let IS_PROD = true;
const server = IS_PROD ?
    "https://hupdupbackend.onrender.com" :

    "http://localhost:3002"


export default server;