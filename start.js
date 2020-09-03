const readline = require('readline-promise').default;
const fs = require('fs');
const path = require('path');
const child_process = require('child_process');

const colors = {
	reset: '\x1b[0m',
	Bright: '\x1b[1m',
	Dim: '\x1b[2m',
	Underscore: '\x1b[4m',
	Blink: '\x1b[5m',
	Reverse: '\x1b[7m',
	Hidden: '\x1b[8m',
	FgBlack: '\x1b[30m',
	FgRed: '\x1b[31m',
	FgGreen: '\x1b[32m',
	FgYellow: '\x1b[33m',
	FgBlue: '\x1b[34m',
	FgMagenta: '\x1b[35m',
	FgCyan: '\x1b[36m',
	FgWhite: '\x1b[37m',
	BgBlack: '\x1b[40m',
	BgRed: '\x1b[41m',
	BgGreen: '\x1b[42m',
	BgYellow: '\x1b[43m',
	BgBlue: '\x1b[44m',
	BgMagenta: '\x1b[45m',
	BgCyan: '\x1b[46m',
	BgWhite: '\x1b[47m',
};
colors.sep = colors.Bright + colors.FgCyan;
colors.head = colors.Bright + colors.FgWhite;
colors.good = colors.Bright + colors.FgGreen;
colors.err = colors.Bright + colors.FgRed;

function replaceColor(s) {
	return s.replace(/<(\w+)>/g, (rr, p1) => colors[p1]).replace(/<\/\w+>/g, colors.reset);
}

function log(...args) {
	const replacedArgs = args.map(replaceColor);
	console.log(...replacedArgs);
}

const rl = readline.createInterface({
	terminal: true,
	input: process.stdin,
	output: process.stdout,
});

const envFile = path.join(__dirname, 'packages', 'app', '.env');

function spawnSync(cmd, args) {
	child_process.spawnSync(cmd, args.split(' '), {encoding: 'utf-8', stdio: 'inherit'});
}

const c = a => a;

async function main() {
	log('\n<sep>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>></sep>');
	log('<sep>>></sep> <head>Configuring project</head>\n');

	let firstRun = true;

	if (fs.existsSync(envFile)) {
		log(`  <good>\u2713</good> Found environment file: ${envFile}`);
		firstRun = false;
	} else {
		const clienturl = await rl.questionAsync(replaceColor('<sep>></sep> Enter Postgresql client url (postgres://USER:PASSWORD@localhost:5432/motest):\n '));
		if (!clienturl) return;
		const data = `CLIENTURL=${clienturl}\nDEBUG=motest,motest.*`;
		fs.writeFileSync(envFile, data);
	}

	const envData = fs.readFileSync(envFile, 'utf-8').split('\n');
	const l = envData.findIndex(line => line.includes('CLIENTURL'));
	if (l === -1) {
		log(`  <err>\u274C</err> Postgres client URL not detected in environment file. Please add CLIENTURL to environment file.\n`);
		return;
	}
	const clurl = envData[l].split('=', 2)[1];
	if (!clurl || clurl === '') {
		log(`  <err>\u274C</err> Postgres client URL is empty in environment file. Please add CLIENTURL to environment file.\n`);
		return;
	}

	log('\n<sep>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>></sep>');
	log('<sep>>></sep> <head>Building entities package</head>\n');
	spawnSync('yarn', '-s --cwd packages/entities build');

	log('\n<sep>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>></sep>');
	log('<sep>>></sep> <head>Building entities typescript declarations</head>\n');
	spawnSync('yarn', '-s --cwd packages/entities ts');

	log('\n<sep>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>></sep>');
	log('<sep>>></sep> <head>(Re)Create schema</head>\n');
	const confirmRecreate = await rl.questionAsync(replaceColor(`Do you wish to drop and recreate your database schema?\n  <FgRed>WARNING:</FgRed> Answering Y will drop: ${clurl}\n\n  (Default N): `));
	if (confirmRecreate.toLowerCase() === 'y' || confirmRecreate.toLowerCase() === 'yes') {
		spawnSync('yarn', '-s --cwd packages/app orm:recreate');
	} else {
		log('  <sep>></sep> Leaving database alone');
	}

	log('\n<sep>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>></sep>');
	log('<sep>>></sep> <head>Building app</head>\n');
	spawnSync('yarn', '-s --cwd packages/app build');

	log('\n<sep>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>></sep>');
	log('<sep>>></sep> <head>Running app</head>\n');
	spawnSync('yarn', '-s --cwd packages/app start');

	if (firstRun) {
		log('\n<sep>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>></sep>');
		log('<sep>>></sep> <head>Available commands</head>\n');
		log('In package/entities:');
		log('  * yarn start - Builds and watches both package and declarations (using screen)');
		log('  * yarn build - Builds package');
		log('  * yarn ts    - Builds declarations\n');
		log('In package/app:');
		log('  * yarn start - Run app (must be built first)');
		log('  * yarn build - Builds app');
		log('  * yarn orm:recreate - Drops and creates the DB schema');
		log('\n');
	}
}

main().then(() => {
	process.exit(0);
});
