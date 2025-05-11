export interface EMIResult {
  emi: number;
  totalInterest: number;
  totalAmount: number;
  amortizationSchedule: Array<{
    month: number;
    emi: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
}

export const calculateEMI = (
  principal: number,
  interestRate: number,
  tenure: number // in months
): EMIResult => {
  // Convert annual interest rate to monthly
  const monthlyRate = interestRate / 12 / 100;
  
  // Calculate EMI using formula: EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
  const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, tenure) / (Math.pow(1 + monthlyRate, tenure) - 1);
  
  let remainingPrincipal = principal;
  let totalInterest = 0;
  
  const amortizationSchedule = [];
  
  for (let month = 1; month <= tenure; month++) {
    const interest = remainingPrincipal * monthlyRate;
    const principalPaid = emi - interest;
    
    remainingPrincipal -= principalPaid;
    totalInterest += interest;
    
    amortizationSchedule.push({
      month,
      emi,
      principal: principalPaid,
      interest,
      balance: remainingPrincipal
    });
  }
  
  return {
    emi,
    totalInterest,
    totalAmount: principal + totalInterest,
    amortizationSchedule
  };
};