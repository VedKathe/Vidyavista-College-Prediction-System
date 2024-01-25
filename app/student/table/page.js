import React from "react";

import "./table.module.css";


function page() {
  return (
    <div>
      <div class="container">
        <div class="filters">
          <h2>Filters</h2>

          <label for="collegeName">College Name:</label>
          <input type="text" id="collegeName" />

          <label for="city">City:</label>
          <input type="text" id="city" />

          <label for="state">State:</label>
          <input type="text" id="state" />

          <label for="zipCode">Zip Code:</label>
          <input type="text" id="zipCode" />

          <label for="phoneNumber">Phone Number:</label>
          <input type="text" id="phoneNumber" />

          <label for="percent">Percent:</label>
          <input type="text" id="percent" />

          <label for="department">Department:</label>
          <input type="text" id="department"  />
        </div>
        <div class="table">
          <h2>College Table</h2>

          <table>
            <thead>
              <tr>
                <th>College Name</th>
                <th>City</th>
                <th>State</th>
                <th>Zip Code</th>


                
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default page;
