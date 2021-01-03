import React from 'react'
import "./navbar.css"
import { useState } from "react"
import axios from "axios"

const Navbar = () => {
    const [data, setData] = useState({})

    function updateData(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    async function createPost(e) {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const body = JSON.stringify(data)
            await axios.post('/api/posts', body, config)
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="navbar">
            <h1 className="header-tag">Share Your Thoughts!!!!!</h1>
            <div className="container">
                <form>
                    <h2>Add New Post : </h2>
                    <div class="form-group">
                        <label for="title">Title : </label>
                        <input type="text" class="form-control" name="title" id="title" placeholder="Enter title" value={data.title} onChange={updateData} required />
                    </div>
                    <div class="form-group">
                        <label for="text">Text : </label>
                        <input type="text" class="form-control" name="text" id="text" placeholder="Enter text" value={data.text} onChange={updateData} required />
                    </div>
                    <button type="submit" class="btn btn-primary" onClick={createPost}>Submit</button>
                </form>
            </div>

        </div>
    )
}

export default Navbar
