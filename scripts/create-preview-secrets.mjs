import fs from 'node:fs';import {randomBytes} from 'node:crypto';
// Test fixtures only. Never used by deployment or committed to the repository.
if(fs.existsSync('.dev.vars'))throw Error('A local variables file already exists; keep it intact.');
fs.writeFileSync('.dev.vars',`ADMIN_EMAIL="preview@example.test"\nADMIN_PASSWORD="${randomBytes(24).toString('hex')}"\nSESSION_SECRET="${randomBytes(32).toString('hex')}"\n`);
console.log('Created ignored local test settings; no credentials were printed.');
