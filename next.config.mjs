/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:true,
    swcMinify:true,
    images:{
       domains:['firebasestorage.googleapis.com','cdn1.picuki.com','miro.medium.com','encrypted-tbn0.gstatic.com','media.gettyimages.com','images.unsplash.com']
    }
};

export default nextConfig;
