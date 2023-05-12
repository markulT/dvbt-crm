/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env:{
    SERVER_URL:'http://localhost:8000',
    MEME_MODE:true
  }
}

module.exports = nextConfig
