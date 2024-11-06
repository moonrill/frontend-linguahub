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
            protocol: 'http',
            hostname: '172.17.0.134',
            port: '3222',
            pathname: '/images/**/*',
        }, ],
    },
};

module.exports = nextConfig;