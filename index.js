#!/usr/bin/env node

const {
  spawn
} = require('child_process');

// Allows for caller to pass things like "--all --prod" etc.
// By default it will only run as the equivalent of "--depth=1"
const extraArgs = process.argv.slice(2);
const ls = spawn('npm', ['ls', '--json', ...extraArgs]);

let buffer = '';
let results = [];

ls.stdout.on('data', (data) => buffer += data);

ls.on('close', (code) => {
  const deps = JSON.parse(buffer).dependencies;
  const keys = Object.keys(deps || {});

  const process = (key, tree, parent='') => {
    const current = `${parent}/${key}@${tree.version}`;
    results.push(current);
    const depKeys = Object.keys(tree.dependencies || {});
    for (const depKey of depKeys) process(depKey, tree.dependencies[depKey], current);
  };

  for (const key of keys) process(key, deps[key]);
  results.sort();
  for (const result of results) console.log(result);
});
