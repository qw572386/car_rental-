const nodeMailer = require("nodemailer");
const Email = require('../config/index');
module.exports =  (router) => {
  router.post("/order", async(ctx, next) => {
    let transporter = nodeMailer.createTransport({
      host: Email.smtp.host,
      port: 587,
      secure: false,
      auth: {
        user: Email.smtp.user,
        pass: Email.smtp.pass
      }
    });
    let ko = {
      email: ctx.request.body.email,
      cars: ctx.request.body.cars || [],
      total: ctx.request.body.total
    };
    let details = '';
    ko.cars.map(item => {
      details += `
        <div style="margin: 20px 0px;">
          <div>Model: ${item.model}</div>
          <div>mileage: ${item.mileage}</div>
          <div>fuel_type: ${item.fueltype}</div>
          <div>seats: ${item.seats}</div>
          <div>price_per_day: ${item.priceperday}</div>
          <div>ren_days: ${item.rendays}</div>
          <div>description: ${item.description}</div>
        </div>
      `;
    })
    const html = `
      <p>Thanks for renting cars from Hertz-UTS, the total cost is ${ko.total}</p>
      <p>Details are as follows:</p>
      ${details}
    `;
    let mailOptions = {
      from: `${Email.smtp.user}`,
      to: ko.email,
      subject: "renting cars successfully",
      html: html
    };
    await transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return console.log(err);
      } else {
        console.log(`sent: ${info.response}`);
      }
    });
    ctx.body = {
      code: 0,
      message: 'Thanks for renting cars from Hertz-UTS, please check your mail later.'
    };
  });
}
