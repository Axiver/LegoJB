# LegoJB

This is code from a discord bot that I made for the Lego's Servers Discord Server. They ran a Jailbreak server for CSGO. I'm releasing this as it is unlikely that they will open up ever again.

The code has been modified from its original form as it contained confidential information. It is obviously spaghetti, and it is riddled with bugs. You may modify this for your own usage.

That being said, I may come back to this project in the future to add customisability or even refactor the code. I will be accepting pull requests to improve on the code.

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development, testing or production purposes. See Installing for notes on how to deploy the project on a live system.

### Prerequisites

You need Nodejs and npm (which comes with nodejs) to use this bot.

[Download Nodejs and npm](https://nodejs.org/en/)

### Installing
#### Node packages

After downloading Nodejs and npm, `cd` into the directory you installed the bot to and run `npm i`. It should automatically install all the needed modules for this bot to work.

#### Setup

#### Manual

You will need to modify certain files for the bot to work (See [Modification of files](#modification-of-files)). Afterwards, run `node legojb.js` and the bot should fire right up.

##### Modification of files

You are required to add a Discord bot token in `./config/token.json`, replacing `<yourtoken>`.
You will also need to change every `plschange` in `./legojb.js` with a fitting variable for the bot to function.

## Contributing

Please read [CONTRIBUTING.md](Contributing.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* **Axiver** - [Axiver](https://github.com/Axiver)

See also the list of [contributors](https://github.com/Axiver/LegoJB/contributors) who participated in this project.

## License

This project is licensed under the GNU GENERAL PUBLIC LICENSE - see the [LICENSE](LICENSE) file for details
