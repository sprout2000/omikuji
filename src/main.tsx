import ons from 'onsenui';
import ReactDOM from 'react-dom';

import { App } from './components/App';

import 'onsenui/css/onsenui.min.css';
import 'onsenui/css/onsen-css-components.min.css';

if (ons.platform.isIPhoneX()) {
  document.documentElement.setAttribute('onsflag-iphonex-portrait', '');
}

ReactDOM.render(<App />, document.getElementById('root'));
