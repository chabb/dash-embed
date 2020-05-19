#executes from dash_overrides
echo 'Overrides dash renderer'
cp ./Embeddable.react.js ../node_modules/dash-renderer/dash-renderer/src
echo 'Save current location'
pushd .
cd ..
echo "Install dash-renderer dependency"
cd ./node_modules/dash-renderer/dash-renderer
npm i
popd
pwd
# we need to copy the directory, otherwise the build process will fail
# the build process use absolute path, so node_modules will appear in all path
echo "copy package to current directory"
cp -R ../node_modules/dash-renderer/dash-renderer ./
cd dash-renderer
echo "Export AppProvider"
printf '%s\n%s\n' "import './Embeddable.react';" "$(cat ./src/index.js)" >./src/index.js
echo "Build renderer"
./node_modules/webpack/bin/webpack.js --build local --config ./webpack.config.js --verbose
cd ..
echo "extract the real npm package from dash dependency, put it back in node_modules"
rm -r ../node_modules/dash-renderer
cp -R ./dash-renderer ../node_modules/dash-renderer
echo "done"

