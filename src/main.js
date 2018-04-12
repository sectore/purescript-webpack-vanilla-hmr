import App from './App.purs';
import {initialState} from './Counter.purs';
// vanilla hot module reloading
// @see https://webpack.js.org/guides/hot-module-replacement/
if(module.hot) {
	const app = App.main(window.__puxLastState || initialState)();
	// don't lose state while HMR
	app.state.subscribe(function (st) {
		window.__puxLastState = st;
	});
	module.hot.accept();
} else {
	App.main(initialState)();
}
