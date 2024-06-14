import Image from "next/image";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

const SingleEvent = ({ data }) => {
    const inputEmail = useRef();
    const router = useRouter();
    const [message, setMessage] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        const emailValue = inputEmail.current.value.trim();
        const eventID = router?.query.id;

        const validRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailValue.match(validRegex)) {
            setMessage('Please enter a correct email address');
            return;
        }

        try {
            const response = await fetch('/api/email-registration', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: emailValue, eventID: eventID })
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            setMessage(data.message);
            inputEmail.current.value = '';
        } catch (err) {
            console.log(err);
            setMessage('Error registering email. Please try again later.');
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '20px', margin: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
                <Image src={data.image} width={500} height={300} alt={data.title} />
                <h1 style={{ marginTop: '10px', fontSize: '24px' }}>{data.title}</h1>
                <p style={{ fontSize: '16px' }}>{data.description}</p>
                <form onSubmit={onSubmit} style={{ marginTop: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Get registered for this event</label>
                    <input ref={inputEmail} id="email" placeholder="Please insert your email" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginBottom: '10px' }} />
                    <button type='submit' style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Submit</button>
                </form>
                {message && <p style={{ marginTop: '10px', color: '#007bff', fontWeight: 'bold' }}>{message}</p>}
            </div>
        </div>
    )
}

export default SingleEvent;
