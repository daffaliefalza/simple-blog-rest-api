import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostsPage from "./pages/PostsPage";
import PostDetailPage from "./pages/PostDetailPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<PostsPage />} />
            <Route path="/posts/:postId" element={<PostDetailPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
