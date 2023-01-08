module.exports = (phase, { defaultConfig }) => {
  return {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://192.168.4.71:8090/api/:path*',
        },
      ]
    },
    reactStrictMode: true,
    output: 'standalone',
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ["@svgr/webpack"],
      });

      return config;
    },
  }
}