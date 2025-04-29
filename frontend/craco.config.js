const path = require('path');

module.exports = {
    webpack:{
        alias:{
            '@': path.resolve(__dirname, 'src'),
        },
    },
    devServer: {
        allowedHosts: "all", // Permet d'accepter toutes les origines
    },
};