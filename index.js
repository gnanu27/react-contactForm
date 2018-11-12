const express = require('express')
const bodyParser = require('body-parser')
const nodemailer =require('nodemailer')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))

app.post('/api/form', (req,res)=>{
	nodemailer.createTestAccount((err,account) =>{
		const htmlEmail = `
			<h1> Contact Details </h1>

			<ul>

			<li>Name:${req.body.name} </li>

			<li>Email:${req.body.email} </li>

			</ul>

			<h1>Message: </h1>

			<p>${req.body.message} </p>

		`


		let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: 'qqratyxkkjqtxsdr@ethereal.email', // generated ethereal user
            pass: 'nyb4N1uXncUAwEZ84y' // generated ethereal password
        }
    });

		let mailOptions ={
			from: 'test@test.com',
			to:'qqratyxkkjqtxsdr@ethereal.email',
			replyTo:'test@test.com',
			subject:'New message',
			text:req.body.message,
			html:htmlEmail 
		}

		transporter.sendMail(mailOptions, (err,info)=>{
			if(err){
				console.log("error")
			}

			console.log('Message send:%s', info.message)
			console.log('Preview url:%s', nodemailer.getTestMessageUrl(info))
		})

	})
})



const PORT = process.env.PORT || 3001

app.listen(PORT, ()=>{
	console.log(`server listening on port ${PORT}`)
})