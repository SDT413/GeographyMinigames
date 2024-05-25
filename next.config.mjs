/** @type {import('next').NextConfig} */
const nextConfig = {
        output: "export",
        images: {
                remotePatterns: [
                        {
                                protocol: 'https',
                                hostname: '**',
                                port: '',
                                pathname: '**',
                        },
                ],
                loader: "custom",
                loaderFile: './ImageLoader.ts'
        },
};

export default nextConfig;
