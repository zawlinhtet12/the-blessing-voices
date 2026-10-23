import {spawnSync} from 'node:child_process';
import {existsSync,readFileSync,writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const cli=new URL('../node_modules/wrangler/bin/wrangler.js',import.meta.url);
const config='dist/server/wrangler.json';
function run(args){const result=spawnSync(process.execPath,[fileURLToPath(cli),...args],{stdio:'inherit',env:{...process.env,CI:'true'},windowsHide:true});if(result.error)throw result.error;if(result.status!==0)process.exit(result.status||1);}
if(!existsSync(config))throw Error('Build the website with npm run build before deploying.');
const settings=JSON.parse(readFileSync(config,'utf8'));
for(const binding of settings.d1_databases||[])binding.migrations_dir=path.resolve('drizzle');
writeFileSync(config,JSON.stringify(settings,null,2));
// A new account may require one initial upload to provision the declared storage.
// All administration stays disabled until secrets and schema are present.
if(!settings.d1_databases?.every(db=>db.database_id))run(['deploy','--config',config]);
run(['d1','migrations','apply','DB','--remote','--config',config]);
run(['deploy','--config',config]);
