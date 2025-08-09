// Indian Income Tax Knowledge Base

export interface TaxSection {
  section: string;
  title: string;
  description: string;
  limit: string;
  applicableRegime: string;
  eligibility: string;
  examples: string[];
}

export interface InvestmentOption {
  name: string;
  category: string;
  description: string;
  taxBenefit: string;
  lockInPeriod: string;
  returns: string;
  riskLevel: string;
  suitableFor: string[];
}

export const taxSections: TaxSection[] = [
  {
    section: "80C",
    title: "Investments and Expenses",
    description: "Deduction for investments in specified financial instruments and expenses like life insurance premiums, EPF, PPF, ELSS, NSC, etc.",
    limit: "Up to ₹1,50,000 per year",
    applicableRegime: "Old Regime Only",
    eligibility: "All individual taxpayers and HUFs",
    examples: [
      "Employee Provident Fund (EPF)",
      "Public Provident Fund (PPF)",
      "Equity Linked Savings Scheme (ELSS)",
      "National Savings Certificate (NSC)",
      "Life Insurance Premium",
      "Principal repayment of home loan",
      "Children's tuition fees",
      "Sukanya Samriddhi Yojana"
    ]
  },
  {
    section: "80D",
    title: "Medical Insurance Premium",
    description: "Deduction for health insurance premiums paid for self, family, and parents. Also covers preventive health check-ups.",
    limit: "₹25,000 for self/family + ₹25,000 for parents (₹50,000 if senior citizen)",
    applicableRegime: "Old Regime Only",
    eligibility: "All individual taxpayers and HUFs",
    examples: [
      "Health insurance premiums",
      "Mediclaim policy premiums",
      "Preventive health check-ups (₹5,000 within overall limit)",
      "Senior citizen health insurance (higher limits)"
    ]
  },
  {
    section: "80E",
    title: "Education Loan Interest",
    description: "Deduction for interest paid on education loans for higher studies of self, spouse, children, or student for whom taxpayer is legal guardian.",
    limit: "No upper limit",
    applicableRegime: "Old Regime Only",
    eligibility: "Individual taxpayers who have taken education loans",
    examples: [
      "Interest on education loan for graduation",
      "Interest on education loan for post-graduation",
      "Interest on education loan for professional courses",
      "Interest on education loan for foreign studies"
    ]
  },
  {
    section: "80G",
    title: "Donations to Charitable Organizations",
    description: "Deduction for donations made to approved charitable organizations, relief funds, and government funds.",
    limit: "10% of adjusted gross total income (some donations have 100% deduction)",
    applicableRegime: "Old Regime Only",
    eligibility: "All taxpayers making eligible donations",
    examples: [
      "Prime Minister's National Relief Fund",
      "Chief Minister's Relief Fund",
      "Donations to approved NGOs",
      "Contributions to government hospitals",
      "Donations to educational institutions"
    ]
  },
  {
    section: "80TTA",
    title: "Interest on Savings Account",
    description: "Deduction for interest earned on savings bank accounts with banks, cooperative societies, and post offices.",
    limit: "Up to ₹10,000 per year",
    applicableRegime: "Old Regime Only",
    eligibility: "Individual taxpayers and HUFs (not applicable to senior citizens)",
    examples: [
      "Interest from savings bank account",
      "Interest from cooperative society deposits",
      "Interest from post office savings account"
    ]
  },
  {
    section: "80TTB",
    title: "Interest Income for Senior Citizens",
    description: "Deduction for interest income from deposits for senior citizens (60 years and above).",
    limit: "Up to ₹50,000 per year",
    applicableRegime: "Old Regime Only",
    eligibility: "Senior citizens (60 years and above)",
    examples: [
      "Interest from fixed deposits",
      "Interest from recurring deposits",
      "Interest from savings accounts",
      "Interest from government securities"
    ]
  },
  {
    section: "24(b)",
    title: "Home Loan Interest",
    description: "Deduction for interest paid on home loans for self-occupied or let-out property.",
    limit: "₹2,00,000 for self-occupied property; No limit for let-out property",
    applicableRegime: "Old Regime Only",
    eligibility: "Property owners with home loans",
    examples: [
      "Interest on home loan for purchase",
      "Interest on home loan for construction",
      "Interest on home loan for renovation",
      "Interest on loan for buying plot + construction"
    ]
  }
];

export const investmentOptions: InvestmentOption[] = [
  {
    name: "Public Provident Fund (PPF)",
    category: "Government Scheme",
    description: "Long-term savings scheme with tax benefits and compound interest. Offers EEE (Exempt-Exempt-Exempt) tax treatment.",
    taxBenefit: "Section 80C deduction up to ₹1.5 lakh, tax-free interest and maturity",
    lockInPeriod: "15 years",
    returns: "7.1% per annum (current rate)",
    riskLevel: "Very Low",
    suitableFor: ["Conservative investors", "Long-term wealth creation", "Retirement planning"]
  },
  {
    name: "Equity Linked Savings Scheme (ELSS)",
    category: "Mutual Fund",
    description: "Equity mutual funds with the shortest lock-in period among tax-saving investments. Potential for higher returns with market risk.",
    taxBenefit: "Section 80C deduction up to ₹1.5 lakh",
    lockInPeriod: "3 years",
    returns: "12-15% per annum (historical average)",
    riskLevel: "High",
    suitableFor: ["Risk-tolerant investors", "Young professionals", "Long-term wealth creation"]
  },
  {
    name: "National Savings Certificate (NSC)",
    category: "Government Scheme",
    description: "Fixed-income investment with guaranteed returns. Interest is compounded annually but paid at maturity.",
    taxBenefit: "Section 80C deduction up to ₹1.5 lakh, accrued interest also qualifies for 80C",
    lockInPeriod: "5 years",
    returns: "6.8% per annum (current rate)",
    riskLevel: "Very Low",
    suitableFor: ["Conservative investors", "Fixed income seekers", "Risk-averse individuals"]
  },
  {
    name: "Employee Provident Fund (EPF)",
    category: "Employer Scheme",
    description: "Mandatory retirement savings for salaried employees. Both employee and employer contribute 12% of basic salary.",
    taxBenefit: "Section 80C deduction, tax-free interest if withdrawal after 5 years",
    lockInPeriod: "Until retirement/58 years",
    returns: "8.15% per annum (current rate)",
    riskLevel: "Very Low",
    suitableFor: ["Salaried employees", "Retirement planning", "Steady income earners"]
  },
  {
    name: "National Pension System (NPS)",
    category: "Pension Scheme",
    description: "Market-linked retirement savings scheme with additional tax benefits. Offers choice between equity and debt allocation.",
    taxBenefit: "Section 80C (₹1.5L) + Section 80CCD(1B) (₹50K) = Total ₹2L deduction",
    lockInPeriod: "Until 60 years",
    returns: "10-12% per annum (equity option, historical)",
    riskLevel: "Medium to High",
    suitableFor: ["Long-term retirement planning", "Additional tax savings", "Flexible investment options"]
  },
  {
    name: "Sukanya Samriddhi Yojana (SSY)",
    category: "Government Scheme",
    description: "Savings scheme for girl child with highest interest rate among government schemes. Only for girls below 10 years.",
    taxBenefit: "Section 80C deduction, tax-free interest and maturity (EEE status)",
    lockInPeriod: "21 years or until marriage after 18 years",
    returns: "8.0% per annum (current rate)",
    riskLevel: "Very Low",
    suitableFor: ["Parents with girl child", "Education and marriage planning", "Conservative investors"]
  },
  {
    name: "Tax Saving Fixed Deposits",
    category: "Bank Product",
    description: "Fixed deposits with 5-year lock-in period offered by banks. Lower returns compared to other tax-saving options.",
    taxBenefit: "Section 80C deduction up to ₹1.5 lakh",
    lockInPeriod: "5 years",
    returns: "5-7% per annum",
    riskLevel: "Very Low",
    suitableFor: ["Conservative investors", "Risk-averse individuals", "Guaranteed returns seekers"]
  },
  {
    name: "Unit Linked Insurance Plans (ULIP)",
    category: "Insurance + Investment",
    description: "Combination of insurance and investment. Higher charges but offers life cover along with investment growth.",
    taxBenefit: "Section 80C deduction, tax-free maturity if premium < 10% of sum assured",
    lockInPeriod: "5 years",
    returns: "8-12% per annum (market-linked)",
    riskLevel: "Medium to High",
    suitableFor: ["Insurance + investment need", "Long-term goals", "Market exposure with insurance"]
  },
  {
    name: "Life Insurance Premium",
    category: "Insurance",
    description: "Premium paid for life insurance policies qualifies for tax deduction. Provides life cover along with tax benefits.",
    taxBenefit: "Section 80C deduction, tax-free maturity (subject to conditions)",
    lockInPeriod: "Policy term (varies)",
    returns: "Varies by policy type",
    riskLevel: "Low to Medium",
    suitableFor: ["Life insurance need", "Family financial security", "Tax planning"]
  }
];

export const regimeComparison = {
  newRegime: {
    name: "New Tax Regime",
    features: [
      "Lower tax rates",
      "Higher standard deduction of ₹50,000",
      "No deductions under sections 80C, 80D, etc.",
      "Default regime for new taxpayers",
      "Simplified tax structure"
    ],
    benefits: [
      "Suitable for those with fewer investments",
      "Lower paperwork and compliance",
      "Beneficial for high earners with minimal investments"
    ],
    drawbacks: [
      "Cannot claim traditional deductions",
      "May result in higher tax for investors",
      "Limited tax planning opportunities"
    ]
  },
  oldRegime: {
    name: "Old Tax Regime",
    features: [
      "Higher tax rates",
      "All traditional deductions available",
      "Sections 80C, 80D, 80E, etc. applicable",
      "HRA, LTA exemptions available",
      "More complex tax structure"
    ],
    benefits: [
      "Higher tax savings through deductions",
      "Suitable for investors and those with dependents",
      "Various exemptions available"
    ],
    drawbacks: [
      "Higher tax rates",
      "More complex compliance",
      "Requires investment planning"
    ]
  }
};