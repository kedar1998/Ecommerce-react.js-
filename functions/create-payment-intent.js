// domain/ .netlify/functions/create-payment-intent

require('dotenv').config()

const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY)

exports.handler = async function(event,context){
    
    if(event.body){
        const {cart,shipping_fee,total_amount} = JSON.parse(event.body)
        
        const calculateOrderAmount = () =>{
            return shipping_fee + total_amount
        }
    
        try{
            const paymentIntent = await stripe.paymentIntents.create({
                amount: calculateOrderAmount(),
                currency: 'usd',
                description: "ecommerce project",
                shipping: {
                name: "Random singh",
                address: {
                    line1: "510 Townsend St",
                    postal_code: "98140",
                    city: "San Francisco",
                    state: "CA",
                    country: "US",
                    },
                },
            })

            return {
                statusCode: 200,
                body: JSON.stringify({clientSecret: paymentIntent.client_secret})
            }
        }
        catch(err){
            return {
                statusCode: 500,
                body: JSON.stringify({msg: err.message})
              }
        }
    }

    return {
        statusCode: 200,
        body: 'create payment intent'
    }

}