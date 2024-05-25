/** @type {import('next').NextConfig} */
const nextConfig = {
        output: "export",
        NODE_ENV: "production",
        images: {
                remotePatterns: [
                        {
                                protocol: 'https',
                                hostname: '**',
                                port: '',
                                pathname: '**',
                        },
                ],
        },
};

export default nextConfig;
