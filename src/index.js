// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// // reportWebVitals();

import ReactDom from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Home from "./pages/Home";
import GitHubAuthHandler from "./pages/GithubAuth";
import GitHubLoginInitiator from "./pages/Login";
import CompletedTasks from "./pages/CompletedTasks";
import ProjectsPage from "./pages/Projects";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import ProjectDetailsUpdate from "./components/ProjectDetailsUpdate";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="tasks" element={<CompletedTasks />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:projectId" element={<ProjectDetailsPage />} />
          <Route path="projectsUpdate/:projectId" element={<ProjectDetailsUpdate />} />
          <Route path="login" element={<GitHubLoginInitiator />} />
          <Route path="github-auth" element={<GitHubAuthHandler />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

const root= ReactDom.createRoot(document.getElementById('root'));
root.render(<App />)