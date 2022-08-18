# Innkeeper:

Discord bot that fetches Magic the Gathering Cards from Scryfall and displays them for users.

# Table of Contents:

Project Intution

Technology Descriptions

Installation & Implementation

# Project Intuition:

This bot was created to serve as a tool for users in a Discord server I created. It enables our community to fetch Magic the Gathering cards with ease and helps facilitate conversations concerning the card game. It uses the Scryfall API to fetch cards. Developing Innkeeper contributed to my learning through allowing me to dive into developing with Discord, Typescript, Axios, Github actions, and finally AWS services.

# Technology Descriptions

Discord JS: Developed using the Discord library to allow the bot to be integrated through Discord.

Typescript: Developed entirely in Typescript to allow for ease of understanding and clarity.

Axios: Get requests for fetching cards.

Github Actions: Github action allows the bot to be automatically deployed to AWS Services for hosting purposes.

AWS Services: AWS Lightsail for 24/7 hosting purposes.

# Installation & Implementation

The following are the steps for getting Innkeeper setup in your development environment:

1. Discord: You will need to have Discord developer portal access and create a bot for your respective server.

2. Env: Follow the .env_example file provided and create a .env file containing your bot's respective discord_token value.

3. NPM: After cloning the repository, run npm i to install the necessary packages.

4. NPM: Npm run build, npm run start, and npm run dev are respective commands for building, starting, and running the bot in dev mode.

5. Github Action: The SSH Deploy Github Action runs the necessary commands for Innkeeper to be deployed and hosted 24/7 via AWS Lightsail services. If you wish to use this action, create an AWS Lightsail instance.

# Future Development

Test Scripts + full Contiuous Integration & Deployment: Innkeeper is currently in the process of obtaining new test cases for ease of access and deployment for new developers. Additionally, Innkeeper's Github Action will turn from SSH Deploy - > Test & SSH Deploy to run these new test cases each time before the bot is sent to Lightsail. This will facilitate a full CI / CD pipeline for Innkeeper and aid in future enhancements of the bot.
