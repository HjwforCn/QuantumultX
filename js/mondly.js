var objc = JSON.parse($response.body);

var newObjc = {
    "purchased_products": [
        {
            "is_from_current_platform": true,
            "id": "12month_all_4_trial",
            "role": "12month",
            "is_grace_period": false,
            "is_auto_renewing": false,
            "expiration_date": 1765360066,
            "is_billing_retry_period": false,
            "is_initial_purchase": false,
            "is_in_free_trial_period": true,
            "is_upgraded": false
        },
        {
            "is_from_current_platform": false,
            "id": "categ22",
            "role": "categ22",
            "is_grace_period": false,
            "is_auto_renewing": false,
            "expiration_date": 0,
            "is_billing_retry_period": false,
            "is_initial_purchase": false,
            "is_in_free_trial_period": false,
            "is_upgraded": false
        }
    ]
}

objc.purchased_products = newObjc.purchased_products
$done({ body: JSON.stringify(objc) });