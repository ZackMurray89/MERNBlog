# Full-Stack MERN Blog Tutorial

This is a tutorial project on how to make a full-stack blog web application using the MERN stack.

Created by:
[React & Next JS Projects w/ Sahand](https://www.youtube.com/@reactproject)

Video URL:
[MERN Full Stack Project: Build a Blog App w/ Dashboard](https://www.youtube.com/watch?v=Kkht2mwSL_I&t=538s)

Source Code:
[GitHub Repo](https://github.com/sahandghavidel/mern-blog)

### Technologies Used

- [VSCode](https:://www.code.visualstudio.com)
-- Code Editor
- [MongoDB](https://www.mongodb.com/)
-- Database
- [ExpressJS](https://expressjs.com/)
-- Back-End Framework
- [ReactJS](https://react.dev/)
-- Front-End Framework
- [NodeJS](https://nodejs.org/en)
-- JavaScript Runtime
- [ViteJS](https://vitejs.dev/)
-- JavaScript Build-Tool
- [NPM-Node Package Manager](https://www.npmjs.com/)
-- Node Package Manager
- [Nodemon](https://nodemon.io/)
-- Monitors changes in files and updates DOM
- [MongooseJS](https://mongoosejs.com/)
-- Object Modeling for MongoDB
- [TailWindCSS](https://tailwindcss.com/)
-- CSS Framework
- [BCryptJS](https://www.npmjs.com/package/bcryptjs)
-- For hashing algorithms
- [DotEnv](https://www.npmjs.com/package/dotenv)
-- Loads enviornment variables
- [JSON Web Tokens](https://jwt.io/)
-- URL-safe means of representing claims to be transferred between two parties
- [Cookie Parser](https://www.npmjs.com/package/cookie-parser)
-- Parses HTTP Cookies

### VSCode Extension

- [ES7+ React/Redux/React-Native Snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)
-- Snippets and shortcuts for ReactJS
- [Multiple Cursor Case Preserve](https://marketplace.visualstudio.com/items?itemName=Cardinal90.multi-cursor-case-preserve)
-- Preserves the case of line changes when using multiple cursors to edit file
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
-- Automatic code formatter
- [TailwindCSS Intellisense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
-- Intellisense for TailwindCSS

## Project Setup

The first bit of the video goes over project setup. Installing React w/ Vite, and all of its' necessary dependencies. I highly suggest going step by step, and pausing the video for each install. Don't forget to switch the language mode inside of your CSS files to TailwindCSS so that you don't have mistake underlines everywhere.

### Hot Reload Issue w/ WSL2

If you're on Windows, and use WSL2 with the Bash/ZSH terminal, I suggest switching to a different terminal to run your dev server. After hours of searching, I've found that the hot reload feature with Vite does not work well with a terminal based in WSL, and you will have to restart your server every time you want to see an update. Personally, I use GitBash when I can't use my ZSH terminal. That way I can still use the same commands. Don't forget to rerun 'npm i' in this new terminal before attempting to start up your dev server with 'npm run dev'.