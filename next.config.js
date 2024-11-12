/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    compiler: {
        // Enables the styled-components SWC transform
        styledComponents: true,
    },
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'vjjvv56d-3222.asse.devtunnels.ms',
            pathname: '/images/**/*',
        }, ],
    },
};

module.exports = nextConfig;