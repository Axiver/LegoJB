
// Modules
const Discord = require('discord.js');
const query = require("source-server-query");
var fs = require('fs');
const delay = require('delay');

// Config Files
const config  = require("./config/config.json");
const token   = require("./config/token.json");

//Initialize Discord
const client  = new Discord.Client();

//Declare Variables
var invite = "";
var WebLinks = ["https://", "www.", "http://", ".net", ".com", ".org"];
var rcon = require('simple-rcon');
let msg = [];

var modRconCommands = ["status", "sm_ban", "sm_unban", "sm_mute", "sm_unmute", "sm_gag", "sm_ungag", "sm_kick", "sm_rename", "sm_ctban", "sm_unctban", "sm_changectbantime", "sm_rageban", "sm_freeze", "sm_drug", "sm_slap", "help"];

//Declare Roles
const DevRole = "plschange";
const OwnerRole = "plschange";
const ModRole = "plschange";
const TrialModRole = "plschange";
const AdminRole = "plschange";

//Declare Version
const ver = "1.1.0-JB";

//Functions
function getDate(cb) {
  	let date = new Date();
  	let str = date.toString();
  	str = str.replace(" GMT+0800", " | GMT+0800");
  	str = str.replace(" ", " | ").slice(0, -32);
  	cb(str);
}

//Discord on ready
client.on('ready', () => {
  	client.user.setActivity('Lego JB | /jb help', { type: 'PLAYING' });
  	let guild = client.guilds.find("id", `plschange`);
  	let channel = guild.channels.find("name", "bot-diagnostics");
  	getDate(function(time) {
    	//channel.send (`[INFO ${time}] Success! Bot is online.`);
    	console.log (`[INFO ${time}] Success! Bot is online.`);
  	});
});

//On member join
client.on('guildMemberAdd', member => {
  	fs.readFile("./config/config.json", 'utf8', function(err, data) {
    	let configs = JSON.parse(data);
    	let welcomestatus = configs.welcomestatus;
    	if (welcomestatus == 1) {
      		// Send the message to a designated channel on a server:
      		const channel = member.guild.channels.find('name', 'welcome');
      		// Do nothing if the channel wasn't found on this server
      		if (!channel)
      			return;
      			fs.readFile("./config/config.json", 'utf8', function(err, data) {
        			let configs = JSON.parse(data);
        			let config = configs.welcometext;
        			let message = config.replace("${member}", `<@${member.id}>`);
        			channel.send(message);
        			let role = member.guild.roles.find("name", "Player");
        			member.addRole(role);
      			});
    	} else {
      		return;
    	}
  	});
});

//On message received
client.on('message', normalMessage => {

	//Ignore bots
	if (normalMessage.author.bot)
	    return;
	msg.content = normalMessage.content.toLowerCase();

	//Send messages to server via discord
  	if (normalMessage.channel.id == "plschange" || normalMessage.channel.id == "plschange") {
		if (normalMessage.member.roles.find("id", OwnerRole) || normalMessage.member.roles.find("id", DevRole) || normalMessage.member.roles.find("id", ModRole) || normalMessage.member.roles.find("id", AdminRole)) {
			let message = normalMessage.channel.lastMessage;
	      	if (message == "") {
	      		normalMessage.channel.send("Please type a message.");
	            return;
	      	}
	      	message.content = message.content.replace(/[@]/g, "[@]");
	      	let command = `say (Discord Relay) [${message.member.displayName}]: ${message}`;
	      	if (normalMessage.channel.id == "plschange") {
		      	server = "plschange"
		      	port = "plschange";
		    }

		    if (normalMessage.channel.id == "plschange") {
		      	server = "plschange"
		      	port = "plschange";
		    }

	      	//Connect to rcon server
	      	var conn = new rcon({
			  	host: server,
			  	port: port,
			  	password: 'plschange'
			}).exec(command, function(res) {
				normalMessage.delete(message);
			}).on('error', function() {
				normalMessage.author.send("The server is offline");
				normalMessage.delete(message);
			}).connect();
		}
		return;
  	}

	//RCON Commands
  	if (normalMessage.channel.id == "plschange" || normalMessage.channel.id == "plschange") {
  		if (!msg.content.startsWith("/")) {
	    	return;
		}
  		let server = "";
  		let port = "";
  		if (normalMessage.channel.id == "plschange") {
  			server = "plschange";
  			port = "plschange";
  		}
  		if (normalMessage.channel.id == "plschange") {
  			server = "plschange";
  			port = "plschange";
  		}
  		let command = normalMessage.channel.lastMessage;
		command = command.content.slice(1, command.content.length);
		if (normalMessage.member.roles.find("id", OwnerRole) || normalMessage.member.roles.find("id", DevRole) || normalMessage.member.roles.find("id", ModRole) || normalMessage.member.roles.find("id", AdminRole)) {
			if (command.startsWith("say") || command.startsWith("sm_say")) {
				normalMessage.channel.send("Please type in <#plschange> or <#plschange> to talk to the CSGO Server");
				return;
			}
			
      		if (normalMessage.member.roles.find("id", ModRole) || normalMessage.member.roles.find("id", AdminRole)) {
				let split = command.split(" ");
				if (!modRconCommands.includes(split[0])) {
					normalMessage.channel.send("You don't have access to this command!");
					return;
				} else if (split[0] == "help") {
					normalMessage.channel.send("The commands you may access are: `" + modRconCommands.join(", ") + "`");
					return;
				}
			}

			//Connect to rcon server
	  		var conn = new rcon({
		  		host: server,
		  		port: port,
		  		password: 'plschange'
			}).exec(command, function(res) {
				if (res.size > 2000) {
					let secondpart = res.body.slice(1990, res.size);
					let firstpart = res.body.substring(0, 1990);
					normalMessage.channel.send("```"+firstpart+"```");
					normalMessage.channel.send("```"+secondpart+"```");
					return;
				}
		  		normalMessage.channel.send("```"+res.body+"```");
			}).on('error', function() {
				normalMessage.channel.send("The server is offline");
			}).connect();
		} else {
			return;
		}
		return;
  	}

	//Help command
	if (msg.content.startsWith('/jb help')) {
    	let help = msg.content.slice(9, msg.content.length);
	    if (help == "general") {
	      	normalMessage.channel.send({embed: {
	            color: 5592575,
	            author: {
	            	name: normalMessage.author.username,
	            	icon_url: normalMessage.author.avatarURL
	            },
	            title: "Here is a list of commands.",
	            description: "Need some help? Here you go!",
	            fields: [{
	                "name": "/jb help",
	                "value": "Displays help list",
	                "color": "16098851"
	            },
	            {
	                "name": "/jb ip",
	                "value": "Gives the server address."
	            },
	            {
	                "name": "/jb discord",
	                "value": "Creates a shareable Discord server link."
	            },
	            {
	                "name": "/jb rules",
	                "value": "Shows the rules for Lego Jailbreak Discord Server."
	            },
	            {
	                "name": "/jb donate",
	                "value": "Shows you how to donate"
	            },
	            {
	                "name": "/jb info",
	                "value": "Prints information about the bot."
	            },
	            {
	                "name": "/jb members",
	                "value": "Displays the amount of members in the Lego Jailbreak Discord Server."
	            },
	            {
	                "name": "/jb changelog <version>",
	                "value": "Displays the changelog for the latest version of the bot if \`<version>\` is left blank."
	            },
	            {
	                "name": "/jb versions",
	                "value": "Displays all version numbers of the bot, current and prior.",
	            },
	            ],
	            timestamp: new Date(),
	            footer: {
	                icon_url: client.user.avatarURL,
	                text: "I am a bot, this action was performed automatically."
	            }
	        }});
	    } else if (help == "fun") {
	      	normalMessage.channel.send({embed: {
	            color: 6423272,
	            author: {
	              	name: normalMessage.author.username,
	              	icon_url: normalMessage.author.avatarURL
	            },
	            title: "Here is the list of commands",
	            fields: [{
	                name: "/dice <Number>",
	                value: "Lets you roll a random number",
	                color: "6423272"
	              },
	              {
	                name: "/flipcoin",
	                value: "Flips a coin",
	              }]
	        }});
	    } else if (help == "admin") {
	    	if (normalMessage.channel.type == "dm") {
		      	normalMessage.channel.send (`<@${normalMessage.author.id}>, you may only use this command in a Discord Server.`);
		      	return;
		    }
	      	if (normalMessage.member.roles.find("id", OwnerRole) || normalMessage.member.roles.find("id", ModRole) || normalMessage.member.roles.find("id", TrialModRole) || normalMessage.member.roles.find("id", AdminRole) || normalMessage.member.roles.find("id", DevRole)) {
	        	normalMessage.channel.send({embed: {
	              	color: 5592575,
	              	author: {
	                	name: normalMessage.author.username,
	                	icon_url: normalMessage.author.avatarURL
	              	},
	              	title: "Here is the list of admin commands",
	              	fields: [{
	                  	name: "/jb config",
	                  	value: "Displays what you can do with /jb config",
	                  	color: "16098851"
	                },
	                {
	                  	name: "/jb welcome",
	                  	value: "Displays what you can do with /jb welcome <set/enable/disable>"
	                },
	                {
	                  	name: "/say <channel name> <message>",
	                  	value: "The most fun command for admins to date as of 26/12/2018",
	                },
	                {
	                  	name: "/<command>",
	                  	value: "Uses rcon control for the server. Type this command in the server's command channel to select the server",
	                }]
	            }});
	      	}
	    } else {
	      	normalMessage.channel.send({embed: {
	            color: 5592575,
	            author: {
	              	name: normalMessage.author.username,
	              	icon_url: normalMessage.author.avatarURL
	            },
	            title: "Here are some modules",
	            fields: [{
	                name: "/jb help general",
	                value: "Displays a list of general commands",
	                color: "16098851"
	            },
	            {
	                name: "/jb help fun",
	                value: "Displays a list of fun commands."
	            },
	            {
	                name: "/jb help admin",
	                value: "Displays a list of admin commands. (Only usable by users with the \"Staff\" role.)"
	            }]
	        }});
	    }
  	}

  	if (msg.content === '/jb ip') {
	    normalMessage.channel.send({embed: {
	        color: 5592575,
	        author: {
	          	name: normalMessage.author.username,
	          	icon_url: normalMessage.author.avatarURL
	        },
	        title: "Lego's Jailbreak Server IP",
	        description: "Share this with your friends so they can join!",
	        fields: [{
	            name: "Server Address",
	            value: "`plschange`"
	        }],
	        timestamp: new Date(),
	        footer: {
	          	icon_url: client.user.avatarURL,
	          	text: "I am a bot, this action was performed automatically."
	        }
	    }});
    }

	if (msg.content === '/jb discord') {
		normalMessage.channel.send(invite);
	}

	if (msg.content === '/jb rules') {
	    normalMessage.channel.send({embed: {
	        color: 5592575,
	        author: {
	        	name: normalMessage.author.username,
	            icon_url: normalMessage.author.avatarURL
	        },
	        title: "Lego Jailbreak Rules",
	        fields: [{
	            name: "Rules for the Lego Jailbreak Server",
	            value: `<#plschange>`,
	            color: "16098851"
	        }],
	        timestamp: new Date(),
	        footer: {
	            icon_url: client.user.avatarURL,
	            text: "I am a bot, this action was performed automatically."
	        }
	    }});
    }

    if (msg.content === '/jb donate') {
	    normalMessage.channel.send({embed: {
	        color: 5592575,
	        author: {
	          	name: normalMessage.author.username,
	          	icon_url: normalMessage.author.avatarURL
	        },
	        title: "Lego Jailbreak Donation",
	        description: "Want to help us out? Go to our website to donate!",
	        fields: [{
	            name: "Donation link",
	            value: "plschange"
	          }],
	        timestamp: new Date(),
	        footer: {
	          	icon_url: client.user.avatarURL,
	          	text: "I am a bot, this action was performed automatically."
	        }
	    }});
    }

    if (msg.content === '/jb info') {
	    normalMessage.channel.send({embed: {
	        color: 5592575,
	        author: {
	            name: normalMessage.author.username,
	            icon_url: normalMessage.author.avatarURL
	        },
	        title: "LegoJB Bot Info",
	        description: "Got the details here for ya, boss!",
	        fields: [{
	            name: "Developer",
	            value: "plschange"
	        },
	        {
	          	"name": "Version",
	            "value": ver
	        },
	        {
	            "name": "Dev info",
	            "value": "Developed using `discord.js`"
	        }],
	        timestamp: new Date(),
	        footer: {
	        	icon_url: client.user.avatarURL,
	        	text: "I am a bot, this action was performed automatically."
	        }
	    }});
    }

    if (msg.content.startsWith('/dice')) {
	    let number = msg.content.slice(6, msg.content.length)
	    var randomNumberBetween0and1 = Math.floor(Math.random() *number);
	    let dice = randomNumberBetween0and1
	    if (dice >= 0 ) {
	      	normalMessage.channel.send (`<@${normalMessage.author.id}>, you rolled ${dice}!`);
	    } else {
	      	normalMessage.channel.send (`<@${normalMessage.author.id}>, Negative numbers just aren\'t as fun`);
	    }
	}

  	if (msg.content == "/flipcoin") {
	    side = Math.floor((Math.random() * 2) + 1);
	    if (side == 1){
	      	coin = "heads";
	      	normalMessage.channel.send (`<@${normalMessage.author.id}>, you flipped ${coin}.`);
	    } else {
	      	coin = "tails";
	      	normalMessage.channel.send (`<@${normalMessage.author.id}>, you flipped ${coin}.`);
	    }
  	}

  	if (msg.content.startsWith("/jb changelog")) {
	    let verNo = normalMessage.content.slice(14, normalMessage.content.length);
	    if (verNo == "") {
	      	verNo = ver;
	    }
	    fs.readFile(`./changelogs/${verNo}/changelog.json`, 'utf8', function(err, data) {
		    if (err) {
		        normalMessage.channel.send (`<@${normalMessage.author.id}>, version number ${verNo} is invalid. For a list of version numbers, do /jb versions`);
		        return;
		    }
	      	let changelog = JSON.parse(data);
	      	let added = changelog.added;
	      	let tweaked = changelog.tweaked;
	      	let verNoUp = verNo.toUpperCase();
	      	normalMessage.channel.send({embed: {
		        color: 11370241,
		        author: {
		            name: normalMessage.author.username,
		            icon_url: normalMessage.author.avatarURL
		        },
		        title: `Changelog of bot`,
		        fields: [{
		            name: `Version ${verNoUp}`,
		            value: "For a list of all versions of this bot, do /jb versions",
		        },
		        {
		        	name: "Added Features",
		        	value: `${added}`,
		        },
		        {
		            name: "Changed Features",
		            value: `${tweaked}`,
		        }],
		        timestamp: new Date(),
		        footer: {
		        	icon_url: client.user.avatarURL,
		        	text: "I am a bot, this action was performed automatically."
		        }
		    }});
		});
	}

	if (msg.content == "/jb versions") {
	    fs.readFile(`./changelogs/versions.txt`, 'utf8', function(err, versions) {
	      	normalMessage.channel.send({embed: {
	            color: 11370241,
	            author: {
	                name: normalMessage.author.username,
	                icon_url: normalMessage.author.avatarURL
	            },
	            title: `Changelog of bot`,
	            fields: [{
	                name: `Version ${ver}`,
	                value: "To get changelog of a version, do /jb changelog <version>",
	            },
	            {
	                name: "Version numbers",
	                value: `${versions}`,
	            }],
	            timestamp: new Date(),
	            footer: {
	            	icon_url: client.user.avatarURL,
	            	text: "I am a bot, this action was performed automatically."
	          	}
	        }});
	    });
	}

	if (msg.content == "/jb members") {
	    if (normalMessage.channel.type == "dm") {
	      	normalMessage.channel.send (`<@${normalMessage.author.id}>, you may only use this command in a Discord Server.`);
	      	return;
	    }
	    normalMessage.channel.send({embed: {
	        color: 5592575,
	        author: {
	          	name: normalMessage.author.username,
	          	icon_url: normalMessage.author.avatarURL
	        },
	        title: "Lego Jailbreak Discord",
	        fields: [{
	            name: "Members",
	            value: `${normalMessage.guild.memberCount}`,
	          }],
	        timestamp: new Date(),
	        footer: {
	          	icon_url: client.user.avatarURL,
	          	text: "I am a bot, this action was performed automatically."
	        }
	    }});
	}

	//This doesn't work yet
	if (msg.content.startsWith("/mute")) {
	    let id = normalMessage.mentions.members.first()
	    if (!id) {
	      	normalMessage.channel.send (`<@${normalMessage.author.id}>, that member is not in this server.`);
	    } else {
	      	let role = member.guild.roles.find("name", "The Disgraced");
	      	message.guild.members.get(id).addRole(role);
	      	normalMessage.channel.send("Member muted.");
	    }
	}

	if (msg.content.startsWith("/jb config")) {
	    if (normalMessage.channel.type == "dm") {
	      	normalMessage.channel.send ("You can only use \"/jb config\" commands in the Lego Jailbreak Discord Server.");
	      	return;
	    } else if (normalMessage.member.roles.find("id", OwnerRole) || normalMessage.member.roles.find("id", ModRole) || normalMessage.member.roles.find("id", TrialModRole) || normalMessage.member.roles.find("id", AdminRole) || normalMessage.member.roles.find("id", DevRole)) {
	      	let slice = msg.content.slice(11, msg.content.length);
	      	let split = slice.split(" ");
	      	if (split[0] == "set") {
	        	let option = split[1];
	        	fs.readFile("./config/config.json", 'utf8', function(err, data) {
		        	let configs = JSON.parse(data);
		        	let config = configs[option];
		        	if (config == undefined) {
		          		normalMessage.channel.send({embed: {
		          			color: 15860226,
		          			author: {
		            			name: normalMessage.author.username,
		            			icon_url: normalMessage.author.avatarURL
		          			},
		          			title: "Lego Jailbreak Discord",
		          			fields: [{
		             			name: "Configurations",
		              			value: `Please specify a valid config. Do /jb config list to see all options.`,
		            		}],
		          			timestamp: new Date(),
		          			footer: {
		            			icon_url: client.user.avatarURL,
		            			text: "I am a bot, this action was performed automatically."
		              		}
		            	}});
		        		return;
		      		} else if (split[2] == undefined) {
		        		normalMessage.channel.send({embed: {
			          		color: 11370241,
			          		author: {
			            		name: normalMessage.author.username,
			            		icon_url: normalMessage.author.avatarURL
			          		},
			         		title: "Lego Jailbreak Discord",
			          		fields: [{
			              		name: "Configurations",
			              		value: `Please specify what you want to do with the config \"${split[1]}\".`,
			            	}],
			          		timestamp: new Date(),
			          		footer: {
			            		icon_url: client.user.avatarURL,
			            		text: "I am a bot, this action was performed automatically."
			              	}
		            	}});
		        		return;
		      		} else {
		        		if (!((split[2] == 'true') || (split[2] == 'false'))) {
				          	normalMessage.channel.send({embed: {
				          		color: 15860226,
				          		author: {
				           	 		name: normalMessage.author.username,
				            		icon_url: normalMessage.author.avatarURL
				          		},
				          		title: "Lego Jailbreak Discord",
				          		fields: [{
				              		name: "Configurations",
				              		value: `Config "${option}" can only be set as "true" or "false"`,
				            	}],
				          		timestamp: new Date(),
				          		footer: {
				            		icon_url: client.user.avatarURL,
				            		text: "I am a bot, this action was performed automatically."
				              	}
				            }});
				          	return;
		        		} else {
		          			configs[option] = split[2];
		          			fs.writeFile('./config/config.json', JSON.stringify(configs), function (err) {
		            			normalMessage.channel.send({embed: {
		            				color: 237613,
		            				author: {
		              					name: normalMessage.author.username,
		              					icon_url: normalMessage.author.avatarURL
		            				},
		            				title: "Lego Jailbreak Discord",
		            				fields: [{
		                				name: "Configurations",
		                				value: `Config "${option}" set as "${split[2]}"`,
		              				}],
		            				timestamp: new Date(),
		            				footer: {
		              					icon_url: client.user.avatarURL,
		              					text: "I am a bot, this action was performed automatically."
		                			}
		              			}});
		          			});
		        		}
		      		}
				});
		    }
			if (split[0] == "") {
		        normalMessage.channel.send({embed: {
		          	color: 15860226,
		          	author: {
		            	name: normalMessage.author.username,
		            	icon_url: normalMessage.author.avatarURL
		          	},
		          	title: "Lego Jailbreak Discord Configurations",
		          	description: "List of config commands",
		          	fields: [{
		              	name: "/jb config set",
		              	value: `Sets a config.`,
		            },
		            {
		              	name: "/jb config list",
		              	value: `Lists all available configurations and their state.`,
		            }],
		          	timestamp: new Date(),
		          	footer: {
		            	icon_url: client.user.avatarURL,
		            	text: "I am a bot, this action was performed automatically."
		            }
		        }});
	      	}
			if (split[0] == "list" && split[1] == undefined) {
	        	fs.readFile("./config/config.json", 'utf8', function(err, data) {
		        	let configs = JSON.parse(data);
		        	normalMessage.channel.send({embed: {
		          		color: 15860226,
		          		author: {
		            		name: normalMessage.author.username,
		            		icon_url: normalMessage.author.avatarURL
		          		},
		          		title: "Lego Jailbreak Discord Configurations",
		          		description: "All configurations are true by default",
		          		fields: [{
		              		name: `Config "links" [${configs.links}]`,
		              		value: `"false" = No Web links allowed \n"true" = Web links are allowed`,
		            	},
			            /*{
			              name: `Config "links" whitelists (Links)`,
			              value: `\`/jb config add/remove links link <whitelist>\` to modify this`,
			            },
			            {
			              name: `Config "links" whitelists (Users)`,
			              value: `\`/jb config add/remove links user <whitelist>\` to modify this`,
			            },*/
			            {
			              name: `Config "invites" [${configs.invites}]`,
			              value: `"false" = No Discord invites allowed \n"true" = Discord invites are allowed`,
			            },
			            /*{
			              name: `Config "invites" whitelists (Invites)`,
			              value: `\`/jb config add/remove invites invite <whitelist>\` to modify this`,
			            },
			            {
			              name: `Config "invites" whitelists (Users)`,
			              value: `\`/jb config add/remove invites user <whitelist>\` to modify this`,
			            },*/],
		          		timestamp: new Date(),
		          		footer: {
		            		icon_url: client.user.avatarURL,
		            		text: "I am a bot, this action was performed automatically."
		              	}
		            }});
		        });
	      	} /*else if (split[0] == "add" || split[0] == "remove") {
		        if (split[1] == undefined) {
		          	normalMessage.channel.send(`<@${normalMessage.author.id}>, please specify which config's whitelist to edit.`);
		          	return;
		        } else if (split[2] == undefined) {
		          	normalMessage.channel.send (`<@${normalMessage.author.id}>, please specify which subconfig of the config "${split[1]}"'s whitelist you want to edit.`);
		        } else if (split[3] == undefined) {
		         	normalMessage.channel.send (`<@${normalMessage.author.id}>, please specify what you want to "${split[0]}" from "${split[1]}"'s "${split[2]}" subconfig.`)
		        }
		        fs.readFile("./config/config.json", 'utf8', function(err, data) {
		          	let option = split[1];
		          	let selectedSubject = split[2];
		          	let configs = JSON.parse(data);
		          
		        });
	      	}*/
	    } else {
	      	normalMessage.channel.send (`<@${normalMessage.author.id}>, you do not have permission to use that command`);
	    }
  	}

  	if (msg.content.startsWith("/jb welcome")) {
	    if (normalMessage.channel.type == "dm") {
	      	normalMessage.channel.send ("You can only use \"/jb config\" commands in the Lego Jailbreak Discord Server.");
	      	return;
	    } else if (normalMessage.member.roles.find("id", OwnerRole) || normalMessage.member.roles.find("id", ModRole) || normalMessage.member.roles.find("id", TrialModRole) || normalMessage.member.roles.find("id", AdminRole) || normalMessage.member.roles.find("id", DevRole)) {
	      	fs.readFile("./config/config.json", 'utf8', function(err, data) {
		        let configs = JSON.parse(data);
		        let config = configs.welcometext;
		        let welcomestatus = configs.welcomestatus;
		        let output = config.replace("${member}", "@user");
		        msg.content = msg.content.slice(12, msg.content.length);
		        if (msg.content.startsWith("set")) {
		          	let message = msg.content.slice(4, msg.content.length);
		          	let input = message.replace("<user>", "${member}");
		          	configs.welcometext = input;
		          	fs.writeFile('./config/config.json', JSON.stringify(configs), function (err) {
		            	normalMessage.channel.send(`Welcome message has been set to "${message}"`);
		          	});
				} else if (msg.content == "enable" || msg.content == "disable") {
		          	let setting = msg.content;
		          	setting = setting.replace("enable", "1");
		          	setting = setting.replace("disable", "0");
		          	if (welcomestatus == setting) {
		            	normalMessage.channel.send (`Welcome messages are already "${msg.content}d"`);
		            	return;
		          	}
		          	configs.welcomestatus = setting;
		          	fs.writeFile('./config/config.json', JSON.stringify(configs), function (err) {
		            	normalMessage.channel.send (`Welcome messages are now ${msg.content}d`);
		          	});
		        } else {
		          	normalMessage.channel.send({embed: {
		            	color: 15860226,
		            	author: {
		              		name: normalMessage.author.username,
		              		icon_url: normalMessage.author.avatarURL
	            		},
	            		title: "Lego Jailbreak Discord Welcome Messages Command List",
	            		description: "List of commands for Welcome Messages",
	            		fields: [{
	                		name: `/jb welcome enable/disable`,
	                		value: `Enables/Disables welcome messages`,
	              		},
	              		{
	                		name: `/jb welcome set <message>`,
	                		value: `The ability to customise welcome messages. To mention the new user, type <user>\nE.g. \`/jb welcome set Welcome to the server, <user>\``,
	              		},
	              		{
	                		name: `Currently, the welcome message is set to`,
	                		value: `${output}`,
	              		}],
	            		timestamp: new Date(),
	            		footer: {
	              			icon_url: client.user.avatarURL,
	              			text: "I am a bot, this action was performed automatically."
	                	}
	              	}});
		        }
	      	});
	    }
	}

	if (msg.content.startsWith("/say")) {
	  	if (normalMessage.channel.type == "dm") {
		    normalMessage.channel.send (`<@${normalMessage.author.id}>, you may only use this command in a Discord Server.`);
		    return;
		}
	    if (normalMessage.member.roles.find("id", OwnerRole) || normalMessage.member.roles.find("id", ModRole) || normalMessage.member.roles.find("id", TrialModRole) || normalMessage.member.roles.find("id", AdminRole) || normalMessage.member.roles.find("id", DevRole)) {
	      	let command = normalMessage.channel.lastMessage;
	      	let cmd = normalMessage.content.slice(5, normalMessage.content.length);
	      	let split = cmd.split(" ");
	      	let channel = split[0].toLowerCase();
	      	let message = cmd.slice(split[0].length, cmd.length);
	      	try {
	        	normalMessage.guild.channels.find("name", `${channel}`).send(message);
	        	let guild = client.guilds.find("id", `plschange`);
	        	let msgChannel = guild.channels.find("name", "bot-diagnostics");
	        	getDate(function(time) {
	          		msgChannel.send (`[INFO ${time}] \`${normalMessage.author.username}\` has used the bot to say \`${message}\` to the channel \`${channel}\`.`);
	          		normalMessage.delete(`${command}`);
	        	});
	      	} catch (e) {
	        	normalMessage.author.send (`Invalid Channel name given.`);
	        }
	    }
	}

	//Message filters (/jb config)
  	//jb config invites
  	if (msg.content.includes("https://discord.gg/")) {
    	let messageID = normalMessage.channel.lastMessage;
    	fs.readFile("./config/config.json", 'utf8', function(err, data) {
	    	if (err) {
	        	normalMessage.channel.send (`${err}`);
	        	return;
	      	}
	        let configs = JSON.parse(data);
	        let status = configs.invites;
	        if (status == "false") {
	          	normalMessage.delete(messageID);
	          	normalMessage.author.send(`Discord invites are not allowed on the Lego Jailbreak Discord Server.\nIf you think this is an error, please contact any of their staff members.`);
	          	let guild = client.guilds.find("id", `plschange`);
	          	let channel = guild.channels.find("name", "bot-diagnostics");
	          	channel.send (`[INFO] User ${normalMessage.author.tag} has sent an invite link.`);
	          	return;
	        }
	    });
	}

  	//jb config links
  	if (WebLinks.some(word => msg.content.includes(word))) {
    	if (msg.content.includes("discord.gg"))
      		return;
		let messageID = normalMessage.channel.lastMessage;
		fs.readFile("./config/config.json", 'utf8', function(err, data) {
    		let configs = JSON.parse(data);
    		let status = configs.links;
    		if (status == "false") {
      			normalMessage.delete(messageID);
      			normalMessage.author.send(`Links are not allowed on the Lego Jailbreak Discord Server.\nIf you think this is an error, please contact any of their staff members.`);
      			let guild = client.guilds.find("id", `plschange`);
      			let channel = guild.channels.find("name", "bot-diagnostics");
      			channel.send (`[INFO] User ${normalMessage.author.tag} has sent a Web link.`);
      			return;
    		}
		});
  	}

	// Easter eggs
  	if (msg.content.includes("thonk")) {
    	normalMessage.channel.send("**Room shakes**", {
    		file: "./assets/thonking.gif"
    	});
  	}


});


client.on('error', console.error);

client.login(token.token);