// api/contact.js

export async function handleContact(body) {
    console.log("CHATBOT CONTACT FORM SUBMITTED:", body);
    return { success: true };
}
