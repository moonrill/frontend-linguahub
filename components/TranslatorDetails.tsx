const TranslatorDetails = () => {
    return (
      <div className="p-8 space-y-12">
        {/* Personal Information Section */}
        <div className="border p-6 rounded-lg space-y-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Personal Information Left */}
            <div className="flex space-x-6 p-4 rounded-lg">
              <img
                src="/images/4.png"
                alt="imagg"
                width={200}
                height={200}
                className="rounded-lg object-cover object-center"
              />
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Personal Information</h2>
                <div className="flex space-x-2">
                  <h3 className="font-medium">Full Name</h3>
                  <span>:</span>
                  <h3>Kim Da Mi</h3>
                </div>
                <div className="flex space-x-2">
                  <h3 className="font-medium">Email</h3>
                  <span>:</span>
                  <h3>damikim@gmail.com</h3>
                </div>
                <div className="flex space-x-2">
                  <h3 className="font-medium">Gender</h3>
                  <span>:</span>
                  <h3>Female</h3>
                </div>
                <div className="flex space-x-2">
                  <h3 className="font-medium">Date of Birth</h3>
                  <span>:</span>
                  <h3>01 January 1999</h3>
                </div>
                <div className="flex space-x-2">
                  <h3 className="font-medium">Phone</h3>
                  <span>:</span>
                  <h3>+62 123456789</h3>
                </div>
              </div>
            </div>
  
            {/* Address Right */}
            <div className="p-4 space-y-4">
              <h2 className="text-lg font-semibold">Address</h2>
              <div className="flex space-x-2">
                <h3 className="font-medium">Province</h3>
                <span>:</span>
                <h3>DKI Jakarta</h3>
              </div>
              <div className="flex space-x-2">
                <h3 className="font-medium">City</h3>
                <span>:</span>
                <h3>Jakarta Barat</h3>
              </div>
              <div className="flex space-x-2">
                <h3 className="font-medium">District</h3>
                <span>:</span>
                <h3>Palmerah</h3>
              </div>
              <div className="flex space-x-2">
                <h3 className="font-medium">Sub District</h3>
                <span>:</span>
                <h3>Kebon Jeruk</h3>
              </div>
              <div className="flex space-x-2">
                <h3 className="font-medium">Street</h3>
                <span>:</span>
                <h3>Jalan Merdeka No. 45</h3>
              </div>
            </div>
          </div>
        </div>
  
        {/* Professional Information Section */}
        <div className="border p-6 rounded-lg space-y-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Professional Information Left */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Professional Information</h2>
              <div className="flex space-x-2">
                <h3 className="font-medium">Years of Experience</h3>
                <span>:</span>
                <h3>4 Years</h3>
              </div>
              <div className="flex space-x-2 items-center">
                <h3 className="font-medium">Portfolio Link</h3>
                <span>:</span>
                <button className="bg-blue-600 text-white text-sm px-3 py-1 rounded-lg">
                  See Portfolio
                </button>
              </div>
              <div className="flex space-x-2">
                <h3 className="font-medium">Bank</h3>
                <span>:</span>
                <h3>BSI</h3>
              </div>
              <div className="flex space-x-2">
                <h3 className="font-medium">Bank Account Number</h3>
                <span>:</span>
                <h3>72123212348</h3>
              </div>
            </div>
  
            {/* Languages and Specialization Right */}
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold">Languages</h2>
                <div className="flex space-x-2">
                  <img
                    src="/icons/indonesia.png"
                    alt="flagc"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <img
                    src="/icons/indonesia.png"
                    alt="flagc2"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <img
                    src="/icons/indonesia.png"
                    alt="flagc3"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <img
                    src="/icons/indonesia.png"
                    alt="flagc4"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
              </div>
  
              <div>
                <h2 className="text-lg font-semibold">Specialization</h2>
                <div className="flex space-x-2">
                  <button className="rounded-full border border-blue-600 bg-blue-50 text-blue-600 px-3">
                    Finance
                  </button>
                  <button className="rounded-full border border-blue-600 bg-blue-50 text-blue-600 px-3">
                    Medical
                  </button>
                  <button className="rounded-full border border-blue-600 bg-blue-50 text-blue-600 px-3">
                    General
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Documents Section */}
        <div className="mb-8 border p-6 rounded-lg space-y-6 ">
          <h2 className="text-xl font-bold mb-4">Documents</h2>
          <div className="flex space-x-4">
            <div className="border border-blue-500 bg-blue-50 p-4 rounded-lg flex items-center justify-center">
                <div className="flex flex-col">
                <img src="/images/4.png" alt="pdf1" width={100} height={100} className="rounded-lg" />
              <p className="text-blue-500 text-center mt-2">File.pdf</p>
              </div>
            </div>
            <div className="border border-blue-500 bg-blue-50 p-4 rounded-lg flex items-center justify-center">
                <div className="flex flex-col">
                <img src="/images/4.png" alt="pdf1" width={100} height={100} className="rounded-lg" />
              <p className="text-blue-500 text-center mt-2">File.pdf</p>
              </div>
            </div>
          </div>
        </div>
  
        {/* Services Section */}
        <div className="mb-8 border p-6 rounded-lg space-y-6">
          <h2 className="text-xl font-bold">Services</h2>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Source Language</th>
                  <th className="px-6 py-3">Target Language</th>
                  <th className="px-6 py-3">Price Per Hour</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white">
                  <td className="px-6 py-4">Business Meeting</td>
                  <td className="px-6 py-4">China</td>
                  <td className="px-6 py-4">China</td>
                  <td className="px-6 py-4">Rp100.000</td>
                </tr>
                <tr className="odd:bg-white">
                  <td className="px-6 py-4">Business Meeting</td>
                  <td className="px-6 py-4">Germany</td>
                  <td className="px-6 py-4">Germany</td>
                  <td className="px-6 py-4">Rp100.000</td>
                </tr>
                <tr className="odd:bg-white">
                  <td className="px-6 py-4">Business Meeting</td>
                  <td className="px-6 py-4">India</td>
                  <td className="px-6 py-4">India</td>
                  <td className="px-6 py-4">Rp100.000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
  
  export default TranslatorDetails;
  