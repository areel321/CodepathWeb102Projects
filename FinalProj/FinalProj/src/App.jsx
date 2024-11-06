// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Update to 'Routes' from 'Switch'
import CreatePost from './components/CreatePost.jsx';
import HomeFeed from './components/HomeFeed.jsx';
import PostPage from './components/PostPage.jsx';


const App = () => {
  // Random user ID for now (this can be dynamic based on user authentication in the future)
  const userId = 'random-user-id';

  return (
    <Router>
      <div className="App">
        <header>
          <h1>Pretty Princess Posts</h1>
          <nav>
            <a href="/">Home</a> | <a href="/create">Create Post</a>
          </nav>
        </header>
        <main>
          <Routes>  {/* Change from <Switch> to <Routes> */}
            <Route path="/" element={<HomeFeed />} />  {/* Use 'element' prop instead of 'component' */}
            <Route path="/create" element={<CreatePost userId={userId} />} />
            <Route path="/post/:postId" element={<PostPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;

