import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostsPage from "./pages/PostsPage";
import PostDetailPage from "./pages/PostDetailPage";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import PostsPageDup from "./pages/PostsPageDup";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* <Route path="/posts" element={<PostsPage />} /> */}
            <Route path="/posts" element={<PostsPageDup />} />
            <Route path="/posts/:postId" element={<PostDetailPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
