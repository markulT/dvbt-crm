/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env:{
    SERVER_URL:'http://localhost:8000',
    MEME_MODE:false,
    STRIPE_PUBLIC_KEY: "pk_test_51L6E7PHPQFJcZwWjgM8ILkVPeIaezesvdOPyQSELLRk55YgwI4i2po0ZxHpXvfpQ8XK3RXENtWcA24VR4yXOkPbE00C8iGmsPd"
  }
}

module.exports = nextConfig
