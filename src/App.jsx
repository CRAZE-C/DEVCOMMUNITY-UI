import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./components/Body";
import Login from "./components/Login";
import { Provider } from "react-redux";
import store from "./utils/appStore.js";
import Feed from "./components/Feed.jsx";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path='/login' element={<Login />} />
              <Route path='/feed' element={<Feed />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App
