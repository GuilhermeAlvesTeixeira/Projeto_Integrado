const config = {
  plugins: {
    "@tailwindcss/postcss": {
      tailwindConfig: {
        variants: {
          extend: {
            backgroundColor: ['high-contrast'],
            textColor: ['high-contrast'],
            borderColor: ['high-contrast'],
            outline: ['high-contrast']
          }
        }
      }
    }
  }
};

export default config;