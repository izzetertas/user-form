/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_BASE_URL: "http://localhost:3001/api/users",
    COUNTRY_API: "https://restcountries.com/v3.1/region/Europe",
  },
};

module.exports = nextConfig;
