import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host:process.env.NEXT_PUBLIC_NODEMAILER_HOST,
  port: Number(process.env.NEXT_PUBLIC_NODEMAILER_PORT),
  secure: true,
  auth: {
    user: process.env.NEXT_PUBLIC_NODEMAILER_USER,
    pass: process.env.NEXT_PUBLIC_NODEMAILER_PASS,
  },
  from: process.env.NEXT_PUBLIC_NODEMAILER_USER,
});

export const sendMail = async (email:string,otp:string) => {
  const mailOptions = {
    from: `${process.env.NEXT_PUBLIC_NODEMAILER_NAME} <${process.env.NEXT_PUBLIC_NODEMAILER_USER}>`,
    to: email,
    subject: "TEMPLEADDRESS EMAIL VERIFICATION",
    html: `<h3>Hello. This email is for your email verification<h3/> <br/><h1>OTP : <strong>${otp}</strong></h1>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);

    if (nodemailer.getTestMessageUrl(info)) {
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } else {
      console.log("Preview URL not available for this transport");
    }

    return { success: true, message: "OTP email sent successfully." };
  } catch (error) {    
    return { success: false, message: "Failed to send OTP email." };
  }
};

