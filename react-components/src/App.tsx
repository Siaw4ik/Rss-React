import { RouterProvider } from 'react-router-dom';
import { routers } from './router';

import './App.css';
import '../src/css-componenets/header-footer.css';
import '../src/css-componenets/homepage.css';
import '../src/css-componenets/formspage.css';

function App() {
  return <RouterProvider router={routers} />;
}

export default App;
