const functions = require('firebase-functions');
const stripe = require("stripe")("sk_test_saST0apLXUFa8UMk2DzxsNUq00vaNgUpiy");
const cors = require('cors')({origin: true});



exports.CheckoutSession = functions.https.onRequest((request, response) => {

    cors(request, response, () => {

        let myProducts = request.query.products;

        const stripeProducts = [];
        console.log(stripeProducts);

        console.log(myProducts);
       myProducts.forEach(item => {
           const itemObj = JSON.parse(item)
            const data= {};
            data.currency='aud';
            data.amount = parseFloat(itemObj.productPrice) * 100;
            data.name = itemObj.productName;
            data.description = "Bestelling cafetaria d'n hook";
           data.quantity = itemObj.productQuantity;

           stripeProducts.push(data);
        })
        console.log(stripeProducts);

        stripe.checkout.sessions.create({
            success_url: "http://localhost:8080/orderStatus",
            cancel_url: "https://example.com/cancel",
            payment_method_types: ["card"],
            line_items: stripeProducts
            // eslint-disable-next-line handle-callback-err
        }, function(err, session) {

            response.send(session);
        });


    });
    })
