
# Jack Treasure

A mobile capable Open Web Game in the endless running platformer genre.

# Usage

This project builds on volo js.
To get it up and running you need git, node.js, npm (comes bundled with node) and volo installed.

* git clone <github-repo> jacktreasure
* cd jacktreasure
* npm install (gets all node libs)
* volo install (gets all front-end js libs)

You can run a development server with volo:

* volo serve

Build the app, it creates a www-built directory with all js and css concatenated and minified:

* volo build

If you want to manually test this, run the serve command with the base argument:

* volo serve base=www-built

Generate an appcache in the www-built folder:

* volo appcache

Deploy to GitHub:

* volo ghdeploy

