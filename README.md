# npmlist

Small utility to print a CLI parseable dependency graph from npm.

## Installation

```sh
git clone https://github.com/joshes/npmlist.git
cd npmlist 
npm i -g
```

## Usage

Run from within an existing node project you want to inspect.

```sh
# Inspect all production dependencies
npmlist --all --prod
```

By default `npmlist` only runs in the equivalent `npm list` mode as  `npm list --depth=1`.

Any additional arguments passed in are passed to `npm list` as additional arguments.

From ther you can easily pipe the results into other tools for querying (e.g., `grep`)
