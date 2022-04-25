# Payfabric Implementation
Payfabric is an payment processor API which can be used to make payment. Here are some demo using sandbox api.
To read the doc use the following link --
[Payfabric API documentation](https://github.com/PayFabric/APIs/tree/master/PayLink)
To test the payment you need a demo virtual credit card. If you are using Evo payment gateway for payment you can use the following link -
[EVO Test Case](https://evopayments.co.uk/wp-content/uploads/Test-Cases-EVO.pdf)

1. To create a security token use the file **1_create_security_token.js**
1. The second file **2_perform_transaction.js** file demonstrate how you can make a payment to payfabric server. It goes through two steps, **createTransaction** and **processTransaction**.
1. The third file **3_create_paylink.js** demonstrate how you can generate a paylink so that this link can be used to make payment.