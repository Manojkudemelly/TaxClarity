// Indian Income Tax Calculation Utilities for FY 2024-25 (AY 2025-26)

export interface SalaryComponents {
  basicSalary: number;
  pfContribution: number;
  houseRentAllowance: number;
  conveyanceAllowance: number;
  leaveTravelAllowance: number;
  foodCardReimbursement: number;
  superannuationFund: number;
  nationalPensionScheme: number;
  carRunningExpenses: number;
  driverSalary: number;
  specialAllowance: number;
  giftCards: number;
  otherIncome: number;
  professionalTax: number;
}

export interface Deductions {
  section80C: number;
  section80D: number;
  section80E: number;
  section80G: number;
  section80TTA: number;
  standardDeduction: number;
}

export interface TaxResult {
  grossSalary: number;
  standardDeduction: number;
  totalDeductions: number;
  taxableIncome: number;
  taxAmount: number;
  cess: number;
  totalTaxLiability: number;
  netSalary: number;
}

// New Tax Regime Slabs for FY 2024-25
export const newRegimeSlabs = [
  { min: 0, max: 300000, rate: 0 },
  { min: 300000, max: 600000, rate: 5 },
  { min: 600000, max: 900000, rate: 10 },
  { min: 900000, max: 1200000, rate: 15 },
  { min: 1200000, max: 1500000, rate: 20 },
  { min: 1500000, max: Infinity, rate: 30 }
];

// Old Tax Regime Slabs for FY 2024-25
export const oldRegimeSlabs = [
  { min: 0, max: 250000, rate: 0 },
  { min: 250000, max: 500000, rate: 5 },
  { min: 500000, max: 1000000, rate: 20 },
  { min: 1000000, max: Infinity, rate: 30 }
];

export const calculateGrossSalary = (components: SalaryComponents): number => {
  return (
    components.basicSalary +
    components.houseRentAllowance +
    components.conveyanceAllowance +
    components.leaveTravelAllowance +
    components.foodCardReimbursement +
    components.carRunningExpenses +
    components.driverSalary +
    components.specialAllowance +
    components.giftCards +
    components.otherIncome
  );
};

export const calculateHRAExemption = (
  basicSalary: number,
  houseRentAllowance: number,
  actualRentPaid: number = 0,
  isMetroCity: boolean = false
): number => {
  if (houseRentAllowance === 0) return 0;
  
  const hraPercentage = isMetroCity ? 0.5 : 0.4;
  const exemptionOptions = [
    houseRentAllowance,
    Math.max(0, actualRentPaid - basicSalary * 0.1),
    basicSalary * hraPercentage
  ];
  
  return Math.min(...exemptionOptions);
};

export const calculateTaxableIncome = (
  components: SalaryComponents,
  deductions: Deductions,
  isNewRegime: boolean = true
): number => {
  const grossSalary = calculateGrossSalary(components);
  
  // Standard deduction is available in both regimes
  const standardDeduction = 50000;
  
  // Employee contributions (not taxable)
  const employeeContributions = components.pfContribution + components.nationalPensionScheme;
  
  // HRA exemption (only in old regime)
  const hraExemption = isNewRegime ? 0 : calculateHRAExemption(components.basicSalary, components.houseRentAllowance);
  
  // LTA exemption (only in old regime)
  const ltaExemption = isNewRegime ? 0 : Math.min(components.leaveTravelAllowance, components.basicSalary * 2);
  
  // Conveyance allowance exemption (only in old regime)
  const conveyanceExemption = isNewRegime ? 0 : Math.min(components.conveyanceAllowance, 19200);
  
  // Food card exemption (only in old regime)
  const foodCardExemption = isNewRegime ? 0 : Math.min(components.foodCardReimbursement, 26400);
  
  let totalDeductions = standardDeduction + employeeContributions + hraExemption + ltaExemption + conveyanceExemption + foodCardExemption;
  
  // Additional deductions (only in old regime)
  if (!isNewRegime) {
    totalDeductions += deductions.section80C + deductions.section80D + deductions.section80E + deductions.section80G + deductions.section80TTA;
  }
  
  // Professional tax is deductible from salary
  totalDeductions += components.professionalTax;
  
  return Math.max(0, grossSalary - totalDeductions);
};

export const calculateTax = (taxableIncome: number, isNewRegime: boolean = true): number => {
  const slabs = isNewRegime ? newRegimeSlabs : oldRegimeSlabs;
  let tax = 0;
  
  for (const slab of slabs) {
    if (taxableIncome > slab.min) {
      const taxableAtThisSlab = Math.min(taxableIncome - slab.min, slab.max - slab.min);
      tax += (taxableAtThisSlab * slab.rate) / 100;
    }
  }
  
  return tax;
};

export const calculateRebate = (taxableIncome: number, tax: number, isNewRegime: boolean = true): number => {
  if (isNewRegime) {
    // Section 87A rebate for new regime: Up to Rs 25,000 if income <= Rs 7,00,000
    if (taxableIncome <= 700000) {
      return Math.min(tax, 25000);
    }
  } else {
    // Section 87A rebate for old regime: Up to Rs 12,500 if income <= Rs 5,00,000
    if (taxableIncome <= 500000) {
      return Math.min(tax, 12500);
    }
  }
  return 0;
};

export const calculateCess = (tax: number): number => {
  // Health and Education Cess at 4%
  return tax * 0.04;
};

export const calculateIncomeTax = (
  components: SalaryComponents,
  deductions: Deductions,
  isNewRegime: boolean = true
): TaxResult => {
  const grossSalary = calculateGrossSalary(components);
  const taxableIncome = calculateTaxableIncome(components, deductions, isNewRegime);
  const taxBeforeRebate = calculateTax(taxableIncome, isNewRegime);
  const rebate = calculateRebate(taxableIncome, taxBeforeRebate, isNewRegime);
  const taxAfterRebate = Math.max(0, taxBeforeRebate - rebate);
  const cess = calculateCess(taxAfterRebate);
  const totalTaxLiability = taxAfterRebate + cess;
  
  const standardDeduction = 50000;
  const totalDeductions = grossSalary - taxableIncome + standardDeduction;
  
  return {
    grossSalary,
    standardDeduction,
    totalDeductions,
    taxableIncome,
    taxAmount: taxAfterRebate,
    cess,
    totalTaxLiability,
    netSalary: grossSalary - totalTaxLiability - components.professionalTax
  };
};

export const getTaxSlabDetails = (taxableIncome: number, isNewRegime: boolean = true) => {
  const slabs = isNewRegime ? newRegimeSlabs : oldRegimeSlabs;
  const breakdown = [];
  let tax = 0;
  
  for (const slab of slabs) {
    if (taxableIncome > slab.min) {
      const taxableAtThisSlab = Math.min(taxableIncome - slab.min, slab.max - slab.min);
      const taxAtThisSlab = (taxableAtThisSlab * slab.rate) / 100;
      tax += taxAtThisSlab;
      
      breakdown.push({
        range: slab.max === Infinity ? `₹${slab.min.toLocaleString('en-IN')}+` : `₹${slab.min.toLocaleString('en-IN')} - ₹${slab.max.toLocaleString('en-IN')}`,
        rate: slab.rate,
        taxableAmount: taxableAtThisSlab,
        tax: taxAtThisSlab
      });
    }
  }
  
  return { breakdown, totalTax: tax };
};