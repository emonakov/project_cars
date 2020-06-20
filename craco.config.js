module.exports = {
    devServer: (devServerConfig) => ({
        ...devServerConfig,
        proxy: {
            '/api': {
                target: 'https://auto1-mock-server.herokuapp.com',
                changeOrigin: true,
                secure: true,
            },
        },
    }),
};
