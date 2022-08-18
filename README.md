# Innkeeper:

Discord bot that fetches Magic the Gathering Cards from Scryfall and displays them for users.

# Table of Contents:

Project Intution - https://github.com/jconnors23/Innkeeper/blob/main/README.md#project-intuition

Technology Descriptions - https://github.com/jconnors23/Innkeeper/blob/main/README.md#technology-descriptions

Installation & Implementation - https://github.com/jconnors23/Innkeeper/blob/main/README.md#installation--implementation

Future Deployment - https://github.com/jconnors23/Innkeeper/blob/main/README.md#future-development

# Project Intuition:

This bot serves as a tool for users in a Discord server. It enables our community to fetch Magic the Gathering cards with ease and helps facilitate conversations concerning the game. It uses the Scryfall API to fetch cards. Developing Innkeeper has contributed to my learning through allowing me to develop with Discord JS, Typescript, Axios, Github Actions, and AWS services.

# Technology Descriptions

Discord JS: Developed using the Discord library to allow the bot to be integrated through Discord.

Typescript: Developed entirely in Typescript to allow for ease of understanding and clarity.

Axios: Get requests for fetching cards.

Github Actions: Automated SSH deployment to AWS Services for hosting purposes.

AWS Services: AWS Lightsail for 24/7 hosting.

# Installation & Implementation

The following are the steps for getting Innkeeper setup in your development environment:

1. Discord: You will need to have Discord developer portal access and create a bot for your respective server.

2. Env: Follow the .env_example file provided and create a .env file containing your bot's respective discord_token value.

3. NPM: After cloning the repository, run npm i to install the necessary packages.

4. NPM: Npm run build, npm run start, and npm run dev are respective commands for building, starting, and running the bot in dev mode.

5. Github Action: The SSH Deploy Github Action runs the necessary commands for Innkeeper to be deployed and hosted 24/7 via AWS Lightsail services. If you wish to use this action, create and set up an AWS Lightsail instance for your bot.

# Future Development

Test Scripts + Full Contiuous Integration & Deployment: Innkeeper is currently in the process of obtaining new test cases for ease of access and deployment for new developers. Additionally, Innkeeper's Github Action will soon change from SSH Deploy to Test & SSH Deploy to run these new test cases each time before the bot is sent to Lightsail. This will facilitate a full CI / CD pipeline for Innkeeper and aid in future enhancements of the bot.
