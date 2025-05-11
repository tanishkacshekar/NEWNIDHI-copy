import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bank, banks } from '../data/banks';
import { calculateEMI } from '../utils/emiCalculator';
import { IndianRupee, Calculator, Building2, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Link } from 'react-router-dom';

type LoanType = 'personal' | 'home' | 'auto';

const LoanComparison: React.FC = () => {
  const [selectedLoanType, setSelectedLoanType] = useState<LoanType>('personal');
  const [loanAmount, setLoanAmount] = useState<string>('');
  const [tenure, setTenure] = useState<string>('');
  const [showComparison, setShowComparison] = useState(false);

  const handleCompare = () => {
    if (loanAmount && tenure) {
      setShowComparison(true);
    }
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-primary-700 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Compare Loan Offers
            </h1>
            <p className="text-xl text-primary-100 leading-relaxed">
              Find the best loan rates and terms from top Indian banks
            </p>
          </motion.div>
        </div>
      </section>

      {/* Loan Type Selection */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="grid grid-cols-3 gap-4 mb-8">
                {(['personal', 'home', 'auto'] as LoanType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedLoanType(type)}
                    className={`p-4 rounded-lg text-center transition-colors ${
                      selectedLoanType === type
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      {type === 'personal' && <IndianRupee className="w-6 h-6 mb-2" />}
                      {type === 'home' && <Building2 className="w-6 h-6 mb-2" />}
                      {type === 'auto' && <Calculator className="w-6 h-6 mb-2" />}
                      <span className="capitalize">{type} Loan</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Loan Amount (₹)"
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  placeholder="Enter loan amount"
                />
                <Input
                  label="Tenure (months)"
                  type="number"
                  value={tenure}
                  onChange={(e) => setTenure(e.target.value)}
                  placeholder="Enter loan tenure"
                />
              </div>

              <div className="mt-6">
                <Button
                  variant="primary"
                  onClick={handleCompare}
                  disabled={!loanAmount || !tenure}
                  fullWidth
                >
                  Compare Loans
                </Button>
              </div>
            </div>

            {showComparison && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-8 space-y-6"
              >
                {banks.map((bank) => {
                  const loanProduct = bank.loans[selectedLoanType];
                  const emiResult = calculateEMI(
                    Number(loanAmount),
                    loanProduct.interestRange.min,
                    Number(tenure)
                  );

                  return (
                    <Card key={bank.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center">
                            <img
                              src={bank.logo}
                              alt={bank.name}
                              className="w-12 h-12 rounded-full object-cover mr-4"
                            />
                            <div>
                              <h3 className="text-xl font-semibold text-primary-700">
                                {bank.name}
                              </h3>
                              <p className="text-gray-600">
                                Interest Rate: {loanProduct.interestRange.min}% - {loanProduct.interestRange.max}%
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-semibold text-primary-700">
                              ₹{Math.round(emiResult.emi).toLocaleString()}/month
                            </p>
                            <p className="text-sm text-gray-600">Estimated EMI</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                          <div>
                            <p className="text-sm text-gray-500">Processing Fee</p>
                            <p className="font-medium">
                              {loanProduct.processingFee.type === 'percentage'
                                ? `${loanProduct.processingFee.value}%`
                                : `₹${loanProduct.processingFee.value}`}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Total Interest</p>
                            <p className="font-medium">
                              ₹{Math.round(emiResult.totalInterest).toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Total Amount</p>
                            <p className="font-medium">
                              ₹{Math.round(emiResult.totalAmount).toLocaleString()}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <h4 className="font-medium text-gray-700 mb-2">Features</h4>
                            <ul className="space-y-1">
                              {loanProduct.features.map((feature, index) => (
                                <li key={index} className="text-sm text-gray-600 flex items-center">
                                  <span className="text-secondary-500 mr-2">•</span>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-700 mb-2">Eligibility</h4>
                            <ul className="space-y-1">
                              {loanProduct.eligibility.map((criteria, index) => (
                                <li key={index} className="text-sm text-gray-600 flex items-center">
                                  <span className="text-secondary-500 mr-2">•</span>
                                  {criteria}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="flex justify-end space-x-4">
                          <Link to={`/branches?bank=${bank.id}`}>
                            <Button variant="outline">Find Branches</Button>
                          </Link>
                          <Button variant="primary" rightIcon={<ArrowRight size={18} />}>
                            Apply Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoanComparison;