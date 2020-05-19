import './App.css';
import * as Dash from 'dash-renderer' // side effect
const React = window.React;

const AppProvider = window.AppProvider;


// hooks and config for the dash applications
const hooks = { request_pre: null, request_post: null};
const config = {
  "url_base_pathname": null,
  "requests_pathname_prefix": "/",
  "ui": false,
  "props_check": false,
  "show_undo_redo": false
};

const AppComponent = () => {
  return (<>
    <AppProvider hooks={hooks} dashConfig={config}  /> }
  </>);
};

function App() {
  return (
      <AppComponent/>
  );
}

export default App;
