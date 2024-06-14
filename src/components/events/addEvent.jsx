import React, { useState } from 'react';
import { db } from "../../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

const AddEvent = () => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [place, setPlace] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const id = title.trim().toLowerCase().replace(/\s+/g, '-');
            const docRef = await addDoc(collection(db, 'events'), {
                id,
                title,
                image,
                description,
                place,
                emails_registered: [],
                createdAt: new Date().toISOString(),
            });

            console.log('Document written with ID: ', docRef.id);
            // Clear the form or show a success message
            setTitle('');
            setImage('');
            setDescription('');
            setPlace('');
            alert("Event created successfully!");
        } catch (err) {
            console.error('Error adding event', err);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <div style={{  marginTop:"-15em", color: '#CFFF04', fontSize: '24px', textAlign: 'center' }}>Are you an Admin? Create Event</div>
            <div style={{ backgroundColor: '#000', padding: '20px', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', maxWidth: '400px', width: '100%' }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ margin: '10px', width: '100%' }}>
                        <label>Title</label>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} required style={{ padding: '5px', borderRadius: '5px', border: '1px solid green', width: '100%', color: 'black' }} />
                    </div>
                    <div style={{ margin: '10px', width: '100%' }}>
                        <label>Image URL</label>
                        <input value={image} onChange={(e) => setImage(e.target.value)} required style={{ padding: '5px', borderRadius: '5px', border: '1px solid green', width: '100%', color: 'black' }} />
                    </div>
                    <div style={{ margin: '10px', width: '100%' }}>
                        <label>Description</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required style={{ padding: '5px', borderRadius: '5px', border: '1px solid green', width: '100%', color: 'black' }}></textarea>
                    </div>
                    <div style={{ margin: '10px', width: '100%' }}>
                        <label>Campus Location</label>
                        <input value={place} onChange={(e) => setPlace(e.target.value)} required style={{ padding: '5px', borderRadius: '5px', border: '1px solid green', width: '100%', color: 'black' }} />
                    </div>

                    <button type="submit" style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: 'yellow', color: 'black', border: 'none', cursor: 'pointer' }}>Create Event</button>
                </form>
            </div>
        </div>
    );
};

export default AddEvent;
