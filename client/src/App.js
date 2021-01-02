/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios"
import './App.css';
import Navbar from './components/Navbar';
import Card from './components/Card';
import { useEffect, useState } from 'react';


function App() {
    const [posts, setPosts] = useState([])
    useEffect(async () => {
        try {
            const postsList = await axios.get("/api/posts")
            setPosts(postsList.data)
        } catch (error) {
            console.error(error);
        }
    }, [])

    return (
        <div className='App'>
            <Navbar />
            <div className='container'>
                {posts.length > 0 ? posts.map((post) => {
                        return <Card post={post} />
                    }) : <h2>No Post Available!!</h2>
                    
                }
            </div>
        </div>
    );
}

export default App;
