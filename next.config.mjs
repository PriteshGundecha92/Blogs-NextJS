/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['flowbite.com', 'github.com'],
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "3000",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "blogs-next-js-iota.vercel.app",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
