import nodemailer from 'nodemailer';
import { db } from "../../src/firebase/firebase";
import { doc, updateDoc, query, where, getDocs, collection } from 'firebase/firestore';

// Function to update Firestore document and send email
async function updateFirestoreAndSendEmail(email, eventID, transporter) {
    try {
        // Query Firestore for the document with matching event ID
        const eventsCollection = collection(db, 'events');
        const eventsQuery = query(eventsCollection, where('id', '==', eventID));
        const eventsSnapshot = await getDocs(eventsQuery);
        
        // Check if document with matching ID exists
        if (eventsSnapshot.empty) {
            throw new Error("Event does not exist");
        }
        
        // Assuming there's only one document with the specified ID
        const eventDoc = eventsSnapshot.docs[0];
        const eventData = eventDoc.data();

        // Check if the email is already registered
        if (eventData.emails_registered.includes(email)) {
            throw new Error("This email has already been registered");
        }

        // Update Firestore document with the new email
        const updatedEmails = [...eventData.emails_registered, email];
        await updateDoc(doc(db, 'events', eventDoc.id), {
            emails_registered: updatedEmails
        });

        // Send email
        const info = await transporter.sendMail({
            from: 'From Gaurav Sain - Event Team NSUT',
            to: email,
            subject: "You have been registered successfully",
            html: `<h2 style='color: blue; background-color: yellow;'>Please come to the fest and show this entry key at the Main Gate: ${Date.now()}</h2> `
        });

        console.log("Email sent:", info);

        return { success: true };
    } catch (error) {
        console.error("Error updating Firestore and sending email:", error);
        return { success: false, error: error.message };
    }
}


export default async function handler(req, res) {
    const { method } = req;

    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        },
    });

    if (method === "POST") {
        const { email, eventID } = req.body;

        if (!email || !email.includes('@')) {
            return res.status(422).json({
                message: "Invalid email error",
                success: false,
            });
        }

        const result = await updateFirestoreAndSendEmail(email, eventID, transporter);

        if (result.success) {
            return res.status(200).json({
                message: `You have registered successfully with email: ${email} for the event ${eventID}`,
                success: true
            });
        } else {
            return res.status(500).json({
                message: "An error occurred while registering. Please try again later.",
                success: false,
                error: result.error
            });
        }
    } else {
        return res.status(405).json({
            message: "Method Not Allowed",
            success: false
        });
    }
}
