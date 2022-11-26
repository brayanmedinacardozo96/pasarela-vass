const express = require('express');
const cors = require('cors');
const request = require('request');




const app = express();
app.use(cors())

app.listen(3001);

const CLIENT_ID = 'ARl7DuGqSH4zqRF8kzrjBLklO8ktB3b6oEYt0CZrtn6axEFREkIIzVRjICXaZzvPAqK_7-jAG_E2nBpG';
const SECRET = 'EPYjQwLrmxHWlLm0ZuS4Ms-RdNNqm9VPOOQkLxHjxvbwnPu0IE9pmSKxwBH_Z6wc5pz5LbP0AX1BzMj_'
const PAYPAL_API = 'https://api-m.sandbox.paypal.com'


const auth = { user: CLIENT_ID, pass: SECRET }

const createPayment = (req, res) => {

    const body = {
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: "USD",
                value: "300"
            },
            description: "test"
        }],
        application_context: {
            brand_name: "Te Vass.com",
            landing_page: "NO_PREFERENCE",
            user_action: "PAY_NOW",
            return_url: "http://localhost:3001/execute-payment",
            cancel_url: "http://localhost:3004/travel",
        },
    }

    request.post(`${PAYPAL_API}/v2/checkout/orders`, {
        auth,
        body,
        json: true
    }, (err, response) => {
        res.json({ data: response.body.links[1].href })
    }
    )
}

const executePayment = (req, res) => {
    const token = req.query.token;

    request.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {
        auth,
        body: {},
        json: true
    }, (err, response) => {
        res.json({ data: response.body })
    }
    )
}

app.post('/create-payment', createPayment)
app.get('/execute-payment', executePayment)