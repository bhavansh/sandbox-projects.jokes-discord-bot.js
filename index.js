require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();
const fetch = require("node-fetch");

const API_1 =
    "https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Dark,Pun,Spooky?blacklistFlags=nsfw,religious,racist,sexist&type=single";

const API_2 =
    "https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Dark,Pun,Spooky?blacklistFlags=nsfw,religious,racist,sexist&type=twopart";

const joke = async (message) => {
    const jokes = await fetch(API_1);
    const json = await jokes.json();
    message.channel.send(json.joke);
};

const jokes = async (message) => {
    const jokes = await fetch(API_2);
    const json = await jokes.json();
    message.channel.send(json.setup);
    message.channel.send(json.delivery);
};

const listCommands = async (message) => {
    commands.forEach((key, val) => {
        message.channel.send("!" + val);
    });
};

const prefix = "!";
let commands = new Map();
commands.set("joke", joke);
commands.set("jokes", jokes);
commands.set("help", listCommands);

client.on("message", (message) => {
    if (message.author.bot) return;

    if (message.content[0] === "!") {
        const command = message.content.split(" ")[0].substr(1);
        if (commands.has(command)) {
            commands.get(command)(message);
        }
    }
});

client.login(process.env.BOT_TOKEN);
