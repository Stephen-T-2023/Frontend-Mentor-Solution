import { useState } from "react";

export default function App() {
  // Define state for all the inputs
  const [formData, setFormData] = useState({
    mortgageAmount: "",
    mortgageTerm: "",
    interestRate: "",
    mortgageType: "",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // This will log the form data to the console
    // You can add your calculation logic here
  };

  return (
    <div className="bg-slate-300 w-screen h-screen flex items-center justify-center">
      <div className="bg-slate-100 border-4 border-black w-3/5 h-3/5 flex rounded-3xl">
        {/* Left Side */}
        <div className="w-1/2 h-full flex flex-col p-6 space-y-4">
          {/* Title and Clear All Button */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Mortgage Calculator</h2>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded-md"
              onClick={() => setFormData({ ...formData, mortgageAmount: "", mortgageTerm:"", interestRate:"", mortgageType: "" })}
            >
              Clear All
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4 flex-grow justify-between">
            {/* Mortgage Amount Input */}
            <div className="mb-4 relative">
              <label className="block text-sm font-medium">Mortgage Amount</label>
              <input
                type="number"
                name="mortgageAmount"
                value={formData.mortgageAmount}
                onChange={handleInputChange}
                className="w-full border rounded-md p-4 pl-12 text-lg"
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">£</span> {/* Pound sign */}
            </div>

            {/* Mortgage Term and Interest Rate */}
            <div className="flex space-x-4 mb-4">
              <div className="flex flex-col w-1/2">
                <label className="block text-sm font-medium">Mortgage Term</label>
                <div className="flex items-center border rounded-md p-4">
                  <input
                    type="number"
                    name="mortgageTerm"
                    value={formData.mortgageTerm}
                    onChange={handleInputChange}
                    className="w-full outline-none text-lg"
                  />
                  <span className="ml-2 text-gray-500 text-lg">Years</span> {/* Years label */}
                </div>
              </div>
              <div className="flex flex-col w-1/2">
                <label className="block text-sm font-medium">Interest Rate</label>
                <div className="flex items-center border rounded-md p-4">
                  <input
                    type="number"
                    name="interestRate"
                    value={formData.interestRate}
                    onChange={handleInputChange}
                    className="w-full outline-none text-lg"
                  />
                  <span className="ml-2 text-gray-500 text-lg">%</span> {/* Percentage symbol */}
                </div>
              </div>
            </div>

            {/* Mortgage Type Selection (Full Width & Stacked) */}
            <div className="mb-4">
              <label className="block text-sm font-medium">Mortgage Type</label>
              <div className="flex flex-col space-y-2 mt-2">
                {/* Repayment Option */}
                <label
                  className={`flex items-center space-x-3 p-4 rounded-md cursor-pointer ${
                    formData.mortgageType === "repayment" ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="mortgageType"
                    value="repayment"
                    checked={formData.mortgageType === "repayment"}
                    onChange={handleInputChange}
                    className="hidden"
                  />
                  <div
                    className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                      formData.mortgageType === "repayment" ? "border-white" : "border-gray-500"
                    }`}
                  >
                    {formData.mortgageType === "repayment" && (
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span>Repayment</span>
                </label>

                {/* Interest Only Option */}
                <label
                  className={`flex items-center space-x-3 p-4 rounded-md cursor-pointer ${
                    formData.mortgageType === "interest-only" ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="mortgageType"
                    value="interest-only"
                    checked={formData.mortgageType === "interest-only"}
                    onChange={handleInputChange}
                    className="hidden"
                  />
                  <div
                    className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                      formData.mortgageType === "interest-only" ? "border-white" : "border-gray-500"
                    }`}
                  >
                    {formData.mortgageType === "interest-only" && (
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span>Interest Only</span>
                </label>
              </div>
            </div>

            {/* Calculate Button */}
            <button
              type="submit"
              className="bg-green-500 text-white w-full p-4 rounded-md mt-auto"
            >
              Calculate
            </button>
          </form>
        </div>

        {/* Right Side */}
        <div className="bg-slate-900 w-1/2 h-full flex items-center justify-center rounded-bl-3xl">
          Right Side
        </div>
      </div>
    </div>
  );
}
