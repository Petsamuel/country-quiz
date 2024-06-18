import "./App.css";
import "./index.css";
import Layout from "./components/Layout";
import { Suspense } from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home";

function App() {
  return (
    <Suspense>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route  path="/" element={<Home />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
