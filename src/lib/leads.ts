// Lead capture endpoints shared by every form on the site.
export const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxmCKtzq0paW6ovftholsG1MqTpYVngu6JE6n12HWYnysF78xpS/exec";
export const N8N_WEBHOOK_URL = "https://n8n.srv1343937.hstgr.cloud/webhook/website-form-spotmies";

export interface Lead {
    name: string;
    email: string;
    phone: string;
    message: string;
    source: string;
}

// Sends a lead to the Google Sheet and the n8n webhook in parallel.
// Each endpoint failing on its own is logged, not thrown, so one outage doesn't lose the other copy.
export async function submitLead(lead: Lead) {
    const formData = new FormData();
    formData.append("Name", lead.name);
    formData.append("Email", lead.email);
    formData.append("Phone", lead.phone);
    formData.append("Message", lead.message);
    formData.append("Date", new Date().toISOString().substring(0, 10));

    await Promise.all([
        fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            body: formData,
        }).catch(err => console.error("Google Script Error:", err)),

        fetch(N8N_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(lead)
        }).catch(err => console.error("n8n Webhook Error:", err))
    ]);
}
