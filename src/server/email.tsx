"use server";

interface EmailData {
  sender: {
    name: string;
    email: string;
  };
  replyTo: {
    name: string;
    email: string;
  };
  to: {
    name: string;
    email: string;
  }[];
  subject: string;
  htmlContent: string;
}

const API_KEY = process.env.EMAIL_KEY;

export default async function EmailContactForm(
  customerName: string,
  customerMessage: string,
  customerEmail: string,
  customerPhone: string
): Promise<boolean> {
  if (!API_KEY) {
    throw new Error(`No API Key`);
  }

  const confirmationEmailData: EmailData = {
    sender: { name: customerName, email: "noreply@couturer.com" },
    replyTo: { name: customerName, email: customerEmail },
    to: [{ name: "Michael", email: "michael.dozzantoz@gmail.com" }],
    subject: `Doctor Grilo contact form submission by ${customerName}`,
    htmlContent: `<html>
      <head></head>
      <body>
        <p>${customerMessage}</p>
      </body>
    </html>`,
  };

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify(confirmationEmailData),
    });

    if (!response.ok) {
      console.log("Error sending email:", response.statusText);
      throw new Error("Error sending email");
    }

    console.log("Email sent successfully");

    return true;
  } catch (error) {
    throw new Error(`Failed to send email: ${error}`);
  }
}
