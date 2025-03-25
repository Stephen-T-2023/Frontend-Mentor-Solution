import { useState } from "react";

export default function App() {
  // Define state for all the inputs
  const [formData, setFormData] = useState({
    mortgageAmount: "",
    mortgageTerm: "",
    interestRate: "",
    mortgageType: "",
  });

  const [monthlyPayment, setMonthlyPayment] = useState(null)

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const calculateMortgage = () => {
    const { mortgageAmount, mortgageTerm, interestRate, mortgageType } = formData;

    const P = parseFloat(mortgageAmount); // Loan amount (Principal)
    const n = parseFloat(mortgageTerm) * 12; // Number of monthly payments
    const r = parseFloat(interestRate) / 100 / 12; // Monthly interest rate

    if (!P || !n || isNaN(r) || r < 0) {
      setMonthlyPayment("Invalid input");
      return;
    }

    let payment;
    if (mortgageType === "interest-only") {
      payment = P * r; // Interest-only formula
    } else {
      if (r === 0) {
        // No interest case (pure division)
        payment = P / n;
      } else {
        // Standard mortgage calculation
        payment = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      }
    }

    setMonthlyPayment(payment.toFixed(2)); // Format to 2 decimal places
  };


  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    calculateMortgage();
  };

  return (
    <div className="bg-slate-300 text-slate-900 w-screen h-screen flex items-center justify-center">
      <div className="bg-slate-100 border-4 border-black w-3/5 h-3/5 flex rounded-3xl">
        {/* Left Side */}
        <div className="w-1/2 h-full flex flex-col p-6 space-y-4">
          {/* Title and Clear All Button */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Mortgage Calculator</h2>
            <a
              className="px-3 underline"
              href="/">
              Clear All
            </a>
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
                className="w-full border rounded-md p-4 pl-12 text-lg"/>
              <span className="absolute left-4 top-1/2 transform -translate-y-1/4 text-gray-500 text-3xl ">£</span> {/* Pound sign */}
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
                    className="w-full outline-none text-lg"/>
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
                    className="w-full outline-none text-lg"/>
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
                    formData.mortgageType === "repayment" ? "bg-[color:hsl(61,_70%,_52%)] bg-opacity-80" : "bg-gray-200"}`}>
                  <input
                    type="radio"
                    name="mortgageType"
                    value="repayment"
                    checked={formData.mortgageType === "repayment"}
                    onChange={handleInputChange}
                    className="hidden"/>
                  <div
                    className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                      formData.mortgageType === "repayment" ? "border-white" : "border-gray-500"}`}>
                    {formData.mortgageType === "repayment" && (
                      <div className="w-3 h-3 bg-white rounded-full"></div>)}
                  </div>
                  <span>Repayment</span>
                </label>

                {/* Interest Only Option */}
                <label
                  className={`flex items-center space-x-3 p-4 rounded-md cursor-pointer ${
                    formData.mortgageType === "interest-only" ? "bg-[color:hsl(61,_70%,_52%)] bg-opacity-80" : "bg-gray-200"}`}>
                  <input
                    type="radio"
                    name="mortgageType"
                    value="interest-only"
                    checked={formData.mortgageType === "interest-only"}
                    onChange={handleInputChange}
                    className="hidden"/>
                  <div
                    className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                      formData.mortgageType === "interest-only" ? "border-white" : "border-gray-500"}`}>
                    {formData.mortgageType === "interest-only" && (
                      <div className="w-3 h-3 bg-white rounded-full"></div>)}
                  </div>
                  <span>Interest Only</span>
                </label>
              </div>
            </div>

            {/* Calculate Button */}
            <button
              type="submit"
              className="bg-[color:hsl(61,_70%,_52%)] w-full p-4 rounded-md mt-auto">
              Calculate Repayments
            </button>
          </form>
        </div>

        {/* Right Side */}
        <div className="bg-slate-900 w-1/2 h-full flex flex-col items-center justify-center text-white rounded-bl-3xl p-6">
          <h3 className="text-xl font-bold">Monthly Payment</h3>
          <p className="text-3xl mt-2">
            {monthlyPayment !== null ? `£${monthlyPayment}` : "—"}
          </p>
        </div>
      </div>
    </div>
  );
}