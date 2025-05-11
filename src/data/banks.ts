export interface Bank {
  id: string;
  name: string;
  logo: string;
  loans: {
    personal: LoanProduct;
    home: LoanProduct;
    auto: LoanProduct;
  };
  branches: Branch[];
}

export interface LoanProduct {
  interestType: 'fixed' | 'floating';
  interestRange: {
    min: number;
    max: number;
  };
  principalLimits: {
    min: number;
    max: number;
  };
  tenureRange: {
    min: number;
    max: number;
  };
  processingFee: {
    type: 'percentage' | 'fixed';
    value: number;
  };
  features: string[];
  eligibility: string[];
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  location: {
    lat: number;
    lng: number;
  };
  workingHours: string;
}

export const banks: Bank[] = [
  {
    id: 'sbi',
    name: 'State Bank of India',
    logo: 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=100',
    loans: {
      personal: {
        interestType: 'fixed',
        interestRange: { min: 10.5, max: 12.5 },
        principalLimits: { min: 100000, max: 2000000 },
        tenureRange: { min: 12, max: 72 },
        processingFee: { type: 'percentage', value: 1.5 },
        features: [
          'No collateral required',
          'Quick disbursement',
          'Minimal documentation',
          'No prepayment charges'
        ],
        eligibility: [
          'Age: 21-60 years',
          'Minimum income: ₹25,000 per month',
          'Employment: 2+ years experience',
          'Credit score: 700+'
        ]
      },
      home: {
        interestType: 'floating',
        interestRange: { min: 6.9, max: 7.55 },
        principalLimits: { min: 1000000, max: 50000000 },
        tenureRange: { min: 60, max: 360 },
        processingFee: { type: 'percentage', value: 0.35 },
        features: [
          'Linked to repo rate',
          'Special rates for women borrowers',
          'Balance transfer facility',
          'Part payment facility'
        ],
        eligibility: [
          'Age: 21-70 years',
          'Minimum income: ₹50,000 per month',
          'Employment: 3+ years experience',
          'Credit score: 750+'
        ]
      },
      auto: {
        interestType: 'fixed',
        interestRange: { min: 7.7, max: 8.8 },
        principalLimits: { min: 100000, max: 10000000 },
        tenureRange: { min: 12, max: 84 },
        processingFee: { type: 'percentage', value: 0.5 },
        features: [
          'Up to 90% financing',
          'Quick approval',
          'Flexible tenure options',
          'No hidden charges'
        ],
        eligibility: [
          'Age: 21-65 years',
          'Minimum income: ₹30,000 per month',
          'Employment: 2+ years experience',
          'Credit score: 700+'
        ]
      }
    },
    branches: [
      {
        id: 'sbi-001',
        name: 'SBI Main Branch Mumbai',
        address: '123, Nariman Point',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400021',
        phone: '022-12345678',
        location: { lat: 18.9220, lng: 72.8347 },
        workingHours: '10:00 AM - 4:00 PM'
      },
      {
        id: 'sbi-002',
        name: 'SBI Andheri Branch',
        address: '456, MIDC Andheri East',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400093',
        phone: '022-87654321',
        location: { lat: 19.1136, lng: 72.8697 },
        workingHours: '10:00 AM - 4:00 PM'
      }
    ]
  },
  {
    id: 'hdfc',
    name: 'HDFC Bank',
    logo: 'https://images.pexels.com/photos/4386339/pexels-photo-4386339.jpeg?auto=compress&cs=tinysrgb&w=100',
    loans: {
      personal: {
        interestType: 'fixed',
        interestRange: { min: 10.25, max: 12 },
        principalLimits: { min: 100000, max: 4000000 },
        tenureRange: { min: 12, max: 60 },
        processingFee: { type: 'percentage', value: 1.5 },
        features: [
          'Instant approval',
          'Digital documentation',
          'Flexible repayment options',
          'Top-up facility available'
        ],
        eligibility: [
          'Age: 21-60 years',
          'Minimum income: ₹30,000 per month',
          'Employment: 2+ years experience',
          'Credit score: 750+'
        ]
      },
      home: {
        interestType: 'floating',
        interestRange: { min: 6.95, max: 7.6 },
        principalLimits: { min: 1500000, max: 100000000 },
        tenureRange: { min: 36, max: 360 },
        processingFee: { type: 'percentage', value: 0.5 },
        features: [
          'Repo rate linked',
          'Step-up EMI option',
          'Property search services',
          'Home insurance bundled'
        ],
        eligibility: [
          'Age: 21-70 years',
          'Minimum income: ₹60,000 per month',
          'Employment: 3+ years experience',
          'Credit score: 750+'
        ]
      },
      auto: {
        interestType: 'fixed',
        interestRange: { min: 7.65, max: 8.75 },
        principalLimits: { min: 100000, max: 15000000 },
        tenureRange: { min: 12, max: 84 },
        processingFee: { type: 'percentage', value: 0.5 },
        features: [
          'Up to 100% financing',
          'Digital approval process',
          'Flexible EMI options',
          'Auto insurance bundled'
        ],
        eligibility: [
          'Age: 21-65 years',
          'Minimum income: ₹35,000 per month',
          'Employment: 2+ years experience',
          'Credit score: 700+'
        ]
      }
    },
    branches: [
      {
        id: 'hdfc-001',
        name: 'HDFC Bank Fort Branch',
        address: '789, Fort Area',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        phone: '022-98765432',
        location: { lat: 18.9317, lng: 72.8328 },
        workingHours: '9:30 AM - 4:30 PM'
      },
      {
        id: 'hdfc-002',
        name: 'HDFC Bank Bandra Branch',
        address: '321, Linking Road, Bandra West',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400050',
        phone: '022-23456789',
        location: { lat: 19.0596, lng: 72.8295 },
        workingHours: '9:30 AM - 4:30 PM'
      }
    ]
  }
];