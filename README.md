# this is my fork because i get this troublesome lately

# Netdata unlock more than 5 nodes

Project was created after this rant: https://www.reddit.com/r/selfhosted/comments/1i7msq3/netdata_you_can_now_view_5_nodes_at_a_time_unless/?rdt=37893

Basically, in the endpoint that limit the number of nodes that can be used. It returns all the registered nodes instead of only the ones that you had to choose in the "Review your Space active Nodes".

This allows to choose more than 5 nodes or any node that you want in your dashboard.

# How to run

## Install deno

## What is deno
Deno (/ˈdiːnoʊ/, pronounced dee-no) is an open source JavaScript, TypeScript, and WebAssembly runtime with secure defaults and a great developer experience. It's built on V8, Rust, and Tokio.
### install using cli

> curl -fsSL https://deno.land/install.sh | sh

### install using npm (nodejs & npm must installed first)

> npm install -g deno
## Using the command line

1. Install Deno: https://docs.deno.com/runtime/getting_started/installation/
2. Run: `deno task run`

## Compile the program
1. Install Deno: https://docs.deno.com/runtime/getting_started/installation/
2. Run: `deno task compile`

# Available configuration

You can configure the program with these environment variables:
- PORT: the port to bind to
- HOST: the hostname to bind to
- NETDATA_BASE_URL: the URL to your netdata (eg. http://localhost:19999)

You can also put these into a file `.env` by copying the `.env.example` file.

## Deploy using PM2

> pm2 start
