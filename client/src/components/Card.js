import React from 'react';
import { useState } from "react"
import './card.css';
import axios from 'axios'
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);

function DateFormatter(x) {
    var z = new Date(x);
    const timeAgo = new TimeAgo("en-US");
    return timeAgo.format(z);
}

const Card = (props) => {
    const { title, text, date, _id } = props.post
    const [btnPressed, setBtnPressed] = useState(false)
    const [data, setData] = useState({})

    function updateData(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }


    async function updatePost(e) {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const x = {
                ...data,
                date: Date.now()
            }
            const body = JSON.stringify(x)
            const res = await axios.put(`/api/posts/${_id}`, body, config)
            console.log(res);
        } catch (error) {
            console.error(error);
        }
    }

    async function DeleteFunction() {
        try {
            await axios.delete(`/api/posts/${_id}`)
            window.location.reload()
        } catch (error) {
            console.error(error);
        }
    }

    function EditFunction() {
        setBtnPressed(!btnPressed)
    }

    return (
        <div className="card w-30">
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{text}</p>
                <button className="btn btn-primary" onClick={EditFunction}>{btnPressed ? "Back" : "Edit"}</button>
                {!btnPressed && <button className="btn btn-primary"  onClick={DeleteFunction}>Delete</button>}
                {btnPressed &&  <form>
                    <div class="form-group">
                        <label for="title">Title : </label>
                        <input type="text" class="form-control" name="title" id="title" placeholder="Enter title" value={data.title} onChange={updateData} required/>
                    </div>
                    <div class="form-group">
                        <label for="text">Text : </label>
                        <input type="text" class="form-control" name="text" id="text" placeholder="Enter text" value={data.text} onChange={updateData} required/>
                    </div>
                    <button type="submit" class="btn btn-primary" onClick={updatePost}>Submit</button>
                </form>}
                <p className="card-text">{DateFormatter(date)}</p>
            </div>
        </div>

    );
};

export default Card;
{/* <div className='card'>
            <h1>{title}</h1>
            <p>{text}</p>
            <p>-{DateFormatter(date)}</p>
            <button onClick={EditFunction}>{btnPressed ? "Back" : "Edit"}</button>
            {btnPressed && <form >
                <label for="title">Title :</label><br />
                <input type="text" id="title" name="title" value={data.title} onChange={updateData} required /><br />
                <label for="text">Text :</label><br />
                <input type="text" id="text" name="text" value={data.text} onChange={updateData} required /><br /><br />
                <input type="submit" value="Submit" onClick={updatePost} />
            </form>}
            {!btnPressed && <button onClick={DeleteFunction}>Delete</button>}
        </div> */}

