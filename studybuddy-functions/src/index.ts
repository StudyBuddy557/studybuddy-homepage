import { onDocumentCreated } from "firebase-functions/v2/firestore";
import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";
import axios from "axios";

admin.initializeApp();

// ----------------------------------------------------------------------
// CONFIGURATION (NEW MAILERLITE)
// ----------------------------------------------------------------------
const MAILERLITE_API_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiOGViYzYwZGE4NzRiM2IzODk3NzUwODQzYmYwZDU5NDhjYjliOTYyMzQxZDM4ZjhmOTExYjAxMWE4MzBlOGE3Nzc2YzY3N2VhNGVkMjM5YTYiLCJpYXQiOjE3NjY0NjEyODAuODM1MTk3LCJuYmYiOjE3NjY0NjEyODAuODM1MiwiZXhwIjo0OTIyMTM0ODgwLjgzMTQ1OCwic3ViIjoiMTkzMzMwMSIsInNjb3BlcyI6W119.rvrkWof3RRjwaOn-6Myr9aB3cfCCRI8JnDMv681G_CiUe-WnydyEzK3HI9rUDSLPJDQFcdd4Rxmq1FPZLh_q6eKxGigxPYPEkUrfJdlJCsjFSAqpytB9K5JQppAh3mQFwGHzna_E2ceI0YRCQB6lWKlBpFh7nwxEDo0iUHg-C3lCzJGUp37iw1kAmX87NbeIucGWUkcC4AcvsEv91Bb1Fs_3FbZAYcVMn6Mbn5aZAYKxqcB-eaCojuLgvNatL2fLM-WI1_tbBVgGlEwATgXt6t5gn6BYKWpC1wL_DwVrRTyaSHwEw5p7xMPHz4fMUmUi2039hCV0B6yGbbNmENP7cIfUQeRtC3mA_07Oz-fmjpJ8tN7X5QzrLDU3thJyAa0m4NCQaGPjFPrUWd551GUub8ThaN7PCKjErfBKAeatj1F4K2UN4p-9g92TwdkbtuxI5pD8ttG5ADgFPYWxMcUzOl_cznjed9e9Wl3p4n1g2rWcKVDyQQfhvmtLSQgOEvGbIbhU-6f0P3WueDtZTHKrgd_Sv_yqU-IaLwJVmfG1q0iNKoYEXK_vHDBXxA9yRsNH1aTlVp3HJLyLMYIhQWZPBLSqrc3jePZhOMNph95A0MOZQz77rTrZozDj8HkKfD_YaVM0bTqW69-lcCS6IkN7Fa5u1kraKTisaKyzVAD4pEc"; // From Step 1
const GROUP_ID = "174547409879172560"; // From Step 2

export const sendDiagnosticResults = onDocumentCreated("diagnostics/{docId}", async (event) => {
    const snap = event.data;
    if (!snap) return;

    const data = snap.data();
    const email = data.email;
    const score = data.score;
    const name = data.name || "Student";

    if (!email) {
        logger.info("No email found, skipping.");
        return;
    }

    logger.info(`Processing new lead: ${email} with score ${score}%`);

    try {
        // ✅ NEW MAILERLITE API ENDPOINT
        await axios.post(
            `https://connect.mailerlite.com/api/subscribers`,
            {
                email: email,
                fields: {
                    name: name,
                    teas_score: score // You must create this field in MailerLite first!
                },
                groups: [GROUP_ID] // This adds them to the group
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${MAILERLITE_API_TOKEN}`
                }
            }
        );

        logger.info(`Successfully synced ${email} to MailerLite.`);

        await snap.ref.update({
            emailSent: true,
            processedAt: admin.firestore.FieldValue.serverTimestamp()
        });

    } catch (error: any) {
        // This will show you exactly what MailerLite doesn't like (e.g., "Field not found")
        logger.error("MailerLite Error:", error.response?.data || error.message);
    }
});