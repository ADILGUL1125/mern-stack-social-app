import nodemailer from "nodemailer"

// create  transporter onbject using smtp settong
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",

  port: 587,

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendeamil =async ({to,subject,body})=>{
    const response =await transporter.sendMail({
        from:process.env.SENDER_EMIAL,
        to,
        subject,
        html:body
    })
    return response

}
export default sendeamil