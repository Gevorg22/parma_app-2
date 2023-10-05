import React from "react";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Header from "./components/Header/Header";
import UserList from "./pages/UserList/UserList";
import UserForm from "./pages/UserForm/UserForm";
import NotFound from "./pages/NotFound/NotFound";
import "./App.scss";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/add" element={<UserForm key="add" />} />
            <Route path="/edit/:id" element={<UserForm key="edit" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Provider>
  );
}

export default App;
