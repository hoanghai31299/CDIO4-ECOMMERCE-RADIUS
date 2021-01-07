import React from 'react'
import './Shipping.css'

export default function Shipping() {
    return (
        <div className="return">
            <div className="container">
                <h1>SHIPPING</h1>
                <div>
                    <p>Order Tracking</p>
                    <p>To check the status of your order, please visit [ACCOUNT], sign in to your account and click [ORDERS] tab. Incompleted payments will automatically be canceled after three days.</p>
                </div>
                <div>
                    <p>Shipping Status</p>
                    <p>Once you complete making a payment, waybill number will be informed by email within 24 hours based on business days, then you may begin tracking the day after.</p>
                </div>
                <div>
                    <p>Shipping Country And Duration</p>
                    <ul>
                        <li>Radius provides worldwide shipping.</li>
                        <li>Shipping to Asia: 1~3 business days</li>
                        <li>Shipping to Oceania : 2~4 business days</li>
                        <li>Shipping to Europe : 3~5 business days</li>
                        <li>Shipping to North America : 5~7 business days</li>
                    </ul>
                    <p>* The shipping duration may vary depending on circumstances of carrier and public holidays.</p>
                </div>
                <div>
                    <p>Shipping Fee</p>
                    <p>Free express shipping with a minimum purchase of $190 and above.<br></br>$30 shipping fee for orders under $190.</p>
                </div>
                <div>
                    <p>IMPORT DUTY AND TAX</p>
                    <p>Delivery duties are included in the item price when shipping to Canada, France, Germany, Italy, Japan, Singapore, Taiwan, Thailand, United Arab Emirates, United Kingdom.</p>
                    <p>All import duties are included in your order – the price you see is the price you pay.</p>
                    <p>*For all other countries, we ship based on terms of DAP(Delivered At Place). In which case, customers will be responsible for any duties imposed by local customs.</p>
                    <p>Please be aware that if you refuse to pay the imposed taxes, we reserve the right to charge any additional costs incurred by GENTLEMONSTER.COM back to you. ( Total of USD 30 will be deducted from the original payment amount for return shipping fee. )</p>
                </div>
                <div>
                    <p>Shipping Address Amendments</p>
                    <p>If you would like to amend your shipping address, please contact us immediately by<br></br>
                        email (cs@gentlemonster.com) or phone (+82 1600-2126).<br></br>
                        However, we may not amend once the product has already been shipped.</p>
                </div>
            </div>
        </div>
    )
}