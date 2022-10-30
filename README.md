# Compiler Scripts

This script package's main purpose is to give the Rust and Go wasm compilation processes
the same results.

I'll add more features if practical, but the web assembly development process has unique
quirks warranting the scripts.

## Upfront warnings

This library is super experimental, and definitely does *not* come with any guarantees.

I recommend reading the code, and determining for yourself if you want to actually make
use of it.

This library is repo is built around the assumption that the host system is running a
unix-style file structure ( Linux / Mac ). Windows requires a rework of the paths.

( No guarantees ) There are protections in the disk interactions designed to prevent 
modding files outside the HOME directory. If you need to override these, remove the
calls to raiseErrorIfPathIsNotInHome() in the relevant helpers.

These protections do not extended to read-only actions.

Example: The repo will most likely block an attempt to write a file copy outside the
HOME directory. The repo won't block reading the original source file for copying.

You won't find this repo on npm. Its not designed to be used like a 'black box.'

## Now onto the package...

### Main features

- Supports compiling the following to wasm...
  - Go
  - Rust
- Provides a consistent file layout across both languages
- Ideally, to do a basic test, you should be able to plug in a path to a project you want
to compile, and it *should* work out of the box

### How to use it...

### Setup 

NOTE: Due to differences between systems, this repo will only give a high
level overview of the support tools needed. If I actually get around to a more
'beginning-to-end' it'll be dockerized.

Your environment needs to support the languages...

#### For mac os

You should install the necessary resources for Node, Go, and Rust.
You should also familiarize yourself with the manual compilation processes.

#### Node ( actual compiler scripts )
https://formulae.brew.sh/formula/node

#### Go
https://formulae.brew.sh/formula/go <br>
https://golangbot.com/webassembly-using-go/

#### Rust
https://rustwasm.github.io/book/game-of-life/hello-world.html <br>
https://formulae.brew.sh/formula/rust <br>
https://formulae.brew.sh/formula/wasm-pack ( for Rust ) <br>
https://formulae.brew.sh/formula/node ( for the Rust web server )

### How to use the package...

To run: `sh run_server.sh`
NOTE: This uses 'zsh' in its current setup. You might need to change this to `!/bin/bash`

This runs `node src/index.js`

index.js makes the actual calls to any defined set up processes.

Set `stringPath<language>` to the project you want to create wasm assets for.

`taskCompile<language>ToWasm()` does the following...
- Calls the compilation process
  - This places the wasm files in `<target project dir>/pkg`
- Calls the server setup process
  - This places the assets into `<target project dir>/www`

For safety reasons all `taskCompile<language>ToWasm()` are commented out within index.js
by default.


### What the process does...

The compilation process compiles the relevant wasm files and stores them in...
`<target proj dir>/pkg`

All compilation processes currently assume the whole project is being compiled into a single
wasm library.

The server setup process creates a server designed to work 'out of the box' for testing in...
`<target proj dir>/www`

The server is solely focused around running the single wasm output.

If this process sounds familiar its because its basically the Rust tutorial:
https://rustwasm.github.io/book/game-of-life/hello-world.html

The Go script specifically emulates the final Rust result, except in Go form.


### How the code is organized...

#### Language specific files...

`helperCompiler<language>.js` makes the call to the shell for compiling.

`helperCopyOnDisk<language>.js` copies assets from `./copy` and places them in their relevant
directories in the target project ( `<target proj dir>pkg` or `<target proj dir>www` ).

`helperPaths<language>.js` handles path definitions.

`helperPrinting<language>.js` this is generally a 'cookie-cutter' implementation for printing
shortcuts for providing consistent behavior.

`helperSetupServer<language>.js` this builds the server to be stored in `<target proj dir>/www`

`helperCompile<language>ToWasm.js` this is a wrapper class that exposes the two public functions 
( compile and setup server ) which are then called in `index.js`.

#### General helpers...

`helpersApp` covers some quality of life functions for the actual compiler app.

`helpersDisk` covers generic disk actions like 'read', 'copy', 'move', etc.

`helpersShell` handles any node calls to the shell.

`helpersStrings` quality of life functions for string manipulation.

### Node's own 'WIP' status

The obvious question: "Why investigate this at all?"

From what I've seen with compiling Python -> Cython -> binary (not wasm), is there 
is generally a performance boost post compilation. Its certainly not comparable to 
traditionally compiled languages, but it does exist none-the-less.

I mainly looked into Javascript compilation as an experimental idea to slightly 
improve language's performance. 

This is low priority and I can't guarantee this will be updated further ( 
more-so than the rest of this repo ).

I played around with Shopify's 'javy' library:
https://github.com/Shopify/javy

If you want to play with this. Follow the compilation process in the repo. Place the 
binary here `src/helpersCompilersWIP/helperJStoWasm/binaryForCompiler/javy`.

For 'staying organized' reasons, the server setup code is left out of this repo.


### Addressing any major questions

#### Why isn't there support for C?

This repo is still highly experimental and geared towards my own research. I would need to 
come across something that C can do, but Rust can't in order to justify adding support for C.


#### Why was the Python repo deprecated in favor of Javascript?

Ideally, its best to keep projects in as few languages as possible. I avoided coding repo
in Rust because it would require significantly more code. I avoided Go because it appears
to have issues calling its own compiler from the shell.

This left two candidates: Python and Javascript. Since Javascript is currently the 'language
of the web' this feels more natural.


#### Why isn't there support for Python ( also Ruby )?

In theory, at some point in the future, wasm might open web development up to any language
that's compile-able. ...we're definitely not there yet.

Right now, the three big languages in the 'wasm adoption' effort appear to be Rust, Go, and 
probably C, from the tutorials I looked at.

I'm tempering my expectations for VM-driven languages which aren't already regularly ran in-
browser.
















































