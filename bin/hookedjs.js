#!/usr/bin/env node

console.log("\n\n***********************************************************************\n");
console.log("HookedJS");
const currentdate = new Date();
console.log("Current Time: " + currentdate.getFullYear() + "." + (currentdate.getMonth()+1) + "." + currentdate.getDate() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds());
console.log("\n***********************************************************************\n");

// TODO: Call solidarity and/or verify node version on install

const meow = require('meow');
// const fs = require('fs-extra');
const fs = require('fs');
const path = require('path');
const shell = require('shelljs');

/**
 * CLI Handling
 */

const cli = meow(`
  Usage
    $ hookedjs [options]

  Options
    --rainbow, -r  Include a rainbow
    --init, -i  Copy demo project your current working directory
    --dev, -d  Run project in development mode

  Examples
    $ hookedjs --init
    🌈 unicorns 🌈
    $ hookedjs
    ...

`, {
  flags: {
    init: {
      type: 'boolean',
      alias: 'i'
    },
    dev: {
      type: 'boolean',
      alias: 'd'
    }
  }
});



/**
 * Consume config and output directories
 */

if (cli.flags['init']) {
  console.log("\nCopying demo project here.");
  // fs.copySync(demoConfig, 'config.yml');
  console.log("🌈 Done! 🌈\n")
  return;
}

// TODO: Verify project is sane
// if (fs.existsSync(cli.flags['config']))
//   var configPath = cli.flags['config'];
// else {
//   console.log("\nConfig file not found at:");
//   console.log(" > " + cli.flags['config']);
//   console.log("Using demo config at:");
//   console.log(" > " + demoConfig + "\n");
//   var configPath = demoConfig;
// }

/**
 * Timer
 */
let scriptDuration=0;
setInterval(() => { scriptDuration++; }, 1000);

/**
 * Main
 */

async function end () {
  console.log("\nSTATS\n")
  console.log("Duration: " + scriptDuration + "s");
  console.log("\n🌈 Done! 🌈\n");
  process.exit(); // The timers will keep the process from exiting, so force exit.
};


async function dev () {
  console.log("\nRunning in Dev Mode.");
  shell.exec("yarn dev", {cwd: __dirname});
  end();
}
if (cli.flags['dev']) {
  dev();
}

// setTimeout(() => {
//   console.log("\nTimeout Reached: Exiting\n");
//   process.exit(1);
// }, 80 * 1000);

