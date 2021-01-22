import React from "react";
import "./Faq.css";

export default function Faq() {
  return (
    <div className="return">
      <div className="container-faq">
        <h1>REPAIR SERVICE REQUEST</h1>
        <div>
          <p>
            Radius offers worldwide repair services for genuine products through
            our website as well as our flagship stores.
          </p>
          <p>
            1) Store Locations: Repair requests made through any Radius location
            (Flagship stores, mall locations) or at authorized stockists
          </p>
          <ul>
            <li>
              All requests received through Radius locations will be serviced by
              the Repair Department.
            </li>
          </ul>
          <p>2) Online: Repair requests shipped by mail(Request Repair)</p>
          <ul>
            <li>
              Carefully package your product(s) along with any additional
              information and ship it to us.{" "}
            </li>
            <li>
              Send us your product with the carrier of your choice. Radius will
              provide return shipping for all completed repairs.{" "}
            </li>
            <li>
              Products must be shipped only after submitting a request online.
            </li>
          </ul>
        </div>
        <div>
          <p>REPAIR TIMELINE</p>
          <p>
            Repairs are processed in the order they are received, and completion
            times may vary depending on the type and location of repair.
          </p>
          <ul>
            <li>
              - Radius HQ: 10-15 business days from the date it was received
            </li>
            <li>
              - Factory Repair: 20-30 business days from the date it was
              received.
            </li>
            <li>* Dates exclude weekends and holidays</li>
            <li>* You will be notified beforehand if any changes occur</li>
          </ul>
        </div>
        <div>
          <p>REPAIR COST</p>
          <p>
            All repair costs will be calculated by the Repair Department,
            depending on different factors (present condition of product,
            warranty period, product defects – if applicable).
          </p>
          <ul>
            <li>Front: 25% of Retail Price</li>
            <li>Temple(s): 20% of Retail Price (40% for both)</li>
            <li>Lens: $35 for Regular Lens, $45 for Flatba Lens</li>
            <li>Plating : 10$</li>
          </ul>
        </div>
        <div>
          <p>PAYMENT METHODS</p>
          <p>
            Payment methods may vary depending on the choice of delivery method.{" "}
          </p>
          <p>- Paypal</p>
          <p>- Alipay</p>
          <p>
            * Repairs will begin only after the payment has been completed.{" "}
          </p>
          <p>
            Completed repairs will be shipped to the customer within 7-14
            business days
          </p>
        </div>
        <div>
          <p>PRODUCT SERVICE UPDATES</p>
          <p>
            All updates regarding the repair will be notified via email. If you
            would like to receive a phone call, please let us know during the
            initial request.{" "}
          </p>
          <p>
            If an item is not an authentic Radius product, we will have to
            respectfully decline the repair service and the item will be shipped
            back to the customer at the customer’s expense.
          </p>
        </div>
      </div>
    </div>
  );
}
