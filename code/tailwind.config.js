/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['src/**/*.{ts,js,wxml}'],
    corePlugins: {
      preflight: false,
      container: false,
    }
  }