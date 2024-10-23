const TableBookings = () => {
    return (
      <div className="p-8 space-y-12">
        {/* Personal and Address Information */}
        <div className="border p-6 rounded-lg space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Personal Information */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Personal Information</h2>
            <div className="space-y-2">
              <div className="flex">
                <h3 className="w-36 font-medium">Full Name</h3>
                <span>:</span>
                <h3 className="ml-2">Kim Da Mi</h3>
              </div>
              <div className="flex">
                <h3 className="w-36 font-medium">Email</h3>
                <span>:</span>
                <h3 className="ml-2">damikim@gmail.com</h3>
              </div>
              <div className="flex">
                <h3 className="w-36 font-medium">Gender</h3>
                <span>:</span>
                <h3 className="ml-2">Female</h3>
              </div>
              <div className="flex">
                <h3 className="w-36 font-medium">Date of Birth</h3>
                <span>:</span>
                <h3 className="ml-2">01 January 1990</h3>
              </div>
              <div className="flex">
                <h3 className="w-36 font-medium">Phone</h3>
                <span>:</span>
                <h3 className="ml-2">+62 123456789</h3>
              </div>
            </div>
          </div>
  
          {/* Address Information */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Address</h2>
            <div className="space-y-2">
              <div className="flex">
                <h3 className="w-36 font-medium">Province</h3>
                <span>:</span>
                <h3 className="ml-2">DKI Jakarta</h3>
              </div>
              <div className="flex">
                <h3 className="w-36 font-medium">City</h3>
                <span>:</span>
                <h3 className="ml-2">Jakarta Barat</h3>
              </div>
              <div className="flex">
                <h3 className="w-36 font-medium">District</h3>
                <span>:</span>
                <h3 className="ml-2">Palmerah</h3>
              </div>
              <div className="flex">
                <h3 className="w-36 font-medium">Sub District</h3>
                <span>:</span>
                <h3 className="ml-2">Kebon Jeruk</h3>
              </div>
              <div className="flex">
                <h3 className="w-36 font-medium">Street</h3>
                <span>:</span>
                <h3 className="ml-2">Jalan Merdeka No. 45</h3>
              </div>
            </div>
          </div>
        </div>
        </div>
  
        {/* Professional Information */}
        <div className="border p-6 rounded-lg space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Professional Information Left */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Professional Information</h2>
              <div className="flex space-x-2">
                <h3 className="w-36 font-medium">Years of Experience</h3>
                <span>:</span>
                <h3>4 Years</h3>
              </div>
              <div className="flex space-x-2 items-center">
                <h3 className="w-36 font-medium">Portfolio Link</h3>
                <span>:</span>
                <button className="bg-blue-600 text-white text-sm px-3 py-1 rounded-lg">
                  See Portfolio
                </button>
              </div>
              <div className="flex space-x-2">
                <h3 className="w-36 font-medium">Bank</h3>
                <span>:</span>
                <h3>BSI</h3>
              </div>
              <div className="flex space-x-2">
                <h3 className="w-36 font-medium">Bank Account Number</h3>
                <span>:</span>
                <h3>72123212348</h3>
              </div>
            </div>
  
            {/* Languages and Specialization Right */}
            <div className="space-y-4">
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
  
        {/* Documents Section */}
        <div className="border p-6 rounded-lg space-y-6">
          <h2 className="text-xl font-bold">Documents</h2>
          <div className="flex space-x-4">
            <div className="border border-blue-500 bg-blue-50 p-4 rounded-lg flex items-center justify-center">
              <div className="flex flex-col">
                <img
                  src="/images/4.png"
                  alt="pdf1"
                  width={100}
                  height={100}
                  className="rounded-lg"
                />
                <p className="text-blue-500 text-center mt-2">File.pdf</p>
              </div>
            </div>
            <div className="border border-blue-500 bg-blue-50 p-4 rounded-lg flex items-center justify-center">
              <div className="flex flex-col">
                <img
                  src="/images/4.png"
                  alt="pdf2"
                  width={100}
                  height={100}
                  className="rounded-lg"
                />
                <p className="text-blue-500 text-center mt-2">File.pdf</p>
              </div>
            </div>
          </div>
        </div>
  


                <div className="mt-20"></div>
        {/* Approval Section */}
        <div className="flex space-x-2 justify-end">
          <button className="px-4 py-2 text-red-500 bg-red-50 rounded-lg">Reject Register</button>
          <button className="px-4 py-2 text-white bg-blue-500 rounded-lg">Approve Register</button>
        </div>
      </div>
    );
  };
  
  export default TableBookings;
  