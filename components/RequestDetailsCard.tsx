import React from 'react'

const RequestDetailsCard = () => {
  return (
    
    <div className="p-4">

  {/* Request ID and Status */}
  <div className="bg-gray-100 p-4 rounded">
    <div className="flex justify-between">
      <div className="flex gap-2">
        <h3>Request ID</h3>
        <span>:</span>
        <h3>331c51ea-0e10-49b5-8330-24d581bac493</h3>
      </div>
      <div>
        <button className="rounded-full bg-yellow-200 text-yellow-600 px-4 py-2">Pending</button>
      </div>
    </div>

    <div className="flex gap-2 mt-2">
      <h3>Request at</h3>
      <span>:</span>
      <h3>Saturday, 10 September 2024</h3>
    </div>
  </div>

  {/* Client and Translator Details */}
  <div className="border rounded p-4 mt-4">
    <div className="grid grid-cols-2 gap-4">

      {/* Client Details */}
      <div>
        <h3>Client</h3>
        <div className="flex gap-4">
          <img src="https://plus.unsplash.com/premium_vector-1728648541439-bba57ffcdf69?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="client1" width="125" height="125" />
          <div>
            <h3>Kim Da Mi</h3>
            <h3>damikim@gmail.com</h3>
            <h3>Female</h3>
            <h3>Jalan Sisingamangaraja No. 19C, Semarang, Jawa Tengah</h3>
            <h3>+62 123456789</h3>
          </div>
        </div>
      </div>

      {/* Translator Details */}
      <div>
        <h3>Translator</h3>
        <div className="flex gap-4">
          <img src="https://plus.unsplash.com/premium_vector-1728648541439-bba57ffcdf69?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="client2" width="125" height="125" />
          <div>
            <h3>Kim Da Mi</h3>
            <h3>damikim@gmail.com</h3>
            <h3>Female</h3>
            <h3>Jalan Sisingamangaraja No. 19C, Semarang, Jawa Tengah</h3>
            <h3>+62 123456789</h3>
          </div>
        </div>
      </div>

    </div>
  </div>

  {/* Service Details */}
  <div className="border rounded p-4 mt-4">
    <div>
      <h3>Service</h3>
      <h3 className="font-semibold text-2xl">Business Meeting Translation</h3>
    </div>
    <div className="grid grid-cols-2 gap-2 mt-2">
      <div className="flex gap-2">
        <h3>Indonesia</h3>
        <span>To</span>
        <h3>English</h3>
      </div>
      <div className="flex justify-end">
        <h3 className="text-blue-700">Rp50.000/hr</h3>
      </div>
    </div>
  </div>

  {/* Date, Time, and Location */}
  <div className="border rounded p-4 mt-4">
    <div>
      <h3>Date & Time</h3>
      <h3>Saturday, 11 September 2024</h3>
      <h3>10:00 - 12:00</h3>
    </div>
    <div className="mt-2">
      <h3>Location</h3>
      <h3>Jl. Merdeka Raya No. 45, Kelurahan Cempaka Putih, Kecamatan Menteng, Jakarta Pusat, DKI Jakarta, 10310</h3>
    </div>
  </div>

  {/* Notes */}
  <div className="border rounded p-4 mt-4">
    <div>
      <h3>Notes</h3>
      <h3>Please ensure that the translation meets the specific needs outlined in the request.</h3>
    </div>
  </div>

  {/* Coupon Section */}
  <div className="border rounded p-4 mt-4">
    <div>
      <h3>Coupon</h3>
    </div>
    <div className="flex items-center gap-2">
      <div className="bg-blue-600 p-2 rounded-full">
        ⭐
      </div>
      <div className="flex flex-col w-full">
        <h3>12% Off</h3>
        <div className="flex justify-between mt-2">
          <h3>Exclusive Summer Sale</h3>
          <span className="text-red-300">Valid until 30 Sept 2024</span>
        </div>
      </div>
    </div>
  </div>

  {/* Pricing Section */}
  <div className="border rounded p-4 mt-4">
    <div>
      <h3>Pricing</h3>
    </div>
    <div className="flex justify-between">
      <h3>Service fee</h3>
      <h3>Rp200.000</h3>
    </div>
    <div className="flex justify-between">
      <h3>System fee</h3>
      <h3>Rp50.000</h3>
    </div>
    <div className="flex justify-between">
      <h3>Discount amount</h3>
      <h3>Rp30.000</h3>
    </div>
    <hr className="w-full border mt-2" />
    <div className="flex justify-between mt-2">
      <h3 className="text-xl font-bold">Total</h3>
      <h3 className="text-xl font-bold">Rp220.000</h3>
    </div>
  </div>

</div>

  )
}

export default RequestDetails
