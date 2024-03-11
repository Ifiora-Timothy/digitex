
/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                hostname: 'localhost',
                pathname:"**",
                port:'3000',
                protocol:'http'
            },
            {
                hostname: 'digitex-production.up.railway.app',
                pathname:"**",
                port:'',
                protocol:'https'
            }
        ]
    }
};

export default nextConfig;
