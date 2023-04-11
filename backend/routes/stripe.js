const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51Mv33dSFgoKe0L2HwTk27vJEouWyD5NQB4wDujumTAVPpHdHNw2mMZSUWZPwywASTu5be3ZWQeb9a5nIu4Jq2DGI00h69HhWjD');


// create a route to handle the Stripe payment request
router.post('/paymentCheckout', async (req, res) => {
    const { token, product } = req.body;

    const charge = await stripe.charges.create({
        amount: product.price * 100,
        currency: 'lkr',
        source: token.id,
        description: product.description,
    });

    console.log(charge);

    res.json({
        message: 'Payment Successful',
        charge,
    });
});