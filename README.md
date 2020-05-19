### Build dash-renderer

You'll need to use yarn instead of npm.

A post-install script will patch the dash-renderer, build the renderer and exposes it as a npm package in
the node_modules folder

`yarn install --check-files`

One specific issue is that the dash repo does not match the npm package. The npm package is generated in a subfolder
of the repo, so we need to move some folders around to make things work. 

React, ReactDOM, Proptypes, and dash components should be provided as external dependencies 
( either by a CDN, or by the dash app frontend, or in the public folder)


