import { createCell } from "src/types";

export const defaultCell: createCell[] = [
    { type: 'empty', empty: 'start' },
    { type: 'company', company: { nameCompany: 'hsbc', countryCompany: 'britania', priceCompany: 60000, rentCompanyInfo: [2000, 4000, 10000, 30000, 90000, 160000, 250000], priceStock: 50000 } },
    { type: 'company', company: { nameCompany: 'fujitsu', countryCompany: 'japan', priceCompany: 200000, rentCompanyInfo: [0, 50000, 100000, 200000, 300000] } },
    { type: 'company', company: { nameCompany: 'rr', countryCompany: 'britania', priceCompany: 60000, rentCompanyInfo: [2000, 4000, 10000, 30000, 90000, 160000, 250000], priceStock: 50000 } },
    { type: 'company', company: { nameCompany: 'bp', countryCompany: 'britania', priceCompany: 80000, rentCompanyInfo: [4000, 8000, 20000, 60000, 180000, 320000, 450000], priceStock: 50000 } },
    { type: 'lossProfit', change: 'profit' },
    { type: 'company', company: { nameCompany: 'uia', countryCompany: 'ukraine', priceCompany: 150000, rentCompanyInfo: [0, 25000, 50000] } },
    { type: 'lossProfit', change: 'loss' },
    { type: 'company', company: { nameCompany: 'ericsson', countryCompany: 'sweden', priceCompany: 100000, rentCompanyInfo: [6000, 12000, 30000, 90000, 270000, 400000, 550000], priceStock: 50000 } },
    { type: 'company', company: { nameCompany: 'volvo', countryCompany: 'sweden', priceCompany: 100000, rentCompanyInfo: [6000, 12000, 30000, 90000, 270000, 400000, 550000], priceStock: 50000 } },
    { type: 'company', company: { nameCompany: 'mitsubishi', countryCompany: 'japan', priceCompany: 200000, rentCompanyInfo: [0, 50000, 100000, 200000, 300000] } },
    { type: 'company', company: { nameCompany: 'essity', countryCompany: 'sweden', priceCompany: 120000, rentCompanyInfo: [8000, 16000, 40000, 100000, 300000, 450000, 600000], priceStock: 50000 } },
    { type: 'empty', empty: 'inJail' },
    { type: 'company', company: { nameCompany: 'rbc', countryCompany: 'canada', priceCompany: 140000, rentCompanyInfo: [10000, 20000, 50000, 150000, 450000, 625000, 750000], priceStock: 100000 } },
    { type: 'company', company: { nameCompany: 'telus', countryCompany: 'canada', priceCompany: 140000, rentCompanyInfo: [10000, 20000, 50000, 150000, 450000, 625000, 750000], priceStock: 100000 } },
    { type: 'company', company: { nameCompany: 'ttc', countryCompany: 'kazah', priceCompany: 180000, rentCompanyInfo: [14000, 28000, 70000, 200000, 550000, 750000, 950000], priceStock: 100000 } },
    { type: 'lossProfit', change: 'tax5' },
    { type: 'company', company: { nameCompany: 'kaz', countryCompany: 'kazah', priceCompany: 180000, rentCompanyInfo: [14000, 28000, 70000, 200000, 550000, 750000, 950000], priceStock: 100000 } },
    { type: 'company', company: { nameCompany: 'kazAzot', countryCompany: 'kazah', priceCompany: 200000, rentCompanyInfo: [16000, 32000, 80000, 220000, 600000, 800000, 1000000], priceStock: 100000 } },
    { type: '' },
    { type: 'company', company: { nameCompany: 'ferrari', countryCompany: 'italia', priceCompany: 220000, rentCompanyInfo: [18000, 36000, 90000, 250000, 700000, 875000, 1050000], priceStock: 150000 } },
    { type: 'company', company: { nameCompany: 'canon', countryCompany: 'japan', priceCompany: 200000, rentCompanyInfo: [0, 50000, 100000, 200000, 300000] } },
    { type: 'company', company: { nameCompany: 'uniCredit', countryCompany: 'italia', priceCompany: 220000, rentCompanyInfo: [18000, 36000, 90000, 250000, 700000, 875000, 1050000], priceStock: 150000 } },
    { type: 'company', company: { nameCompany: 'posteItaliane', countryCompany: 'italia', priceCompany: 240000, rentCompanyInfo: [20000, 40000, 100000, 300000, 750000, 925000, 1100000], priceStock: 150000 } },
    { type: 'lossProfit', change: 'profit' },
    { type: 'company', company: { nameCompany: 'ukranafta', countryCompany: 'ukraine', priceCompany: 150000, rentCompanyInfo: [0, 25000, 50000] } },
    { type: 'lossProfit', change: 'loss' },
    { type: 'company', company: { nameCompany: 'volkswagen', countryCompany: 'germany', priceCompany: 260000, rentCompanyInfo: [22000, 44000, 110000, 330000, 800000, 975000, 1150000], priceStock: 150000 } },
    { type: 'company', company: { nameCompany: 'allianz', countryCompany: 'germany', priceCompany: 260000, rentCompanyInfo: [22000, 44000, 110000, 330000, 800000, 975000, 1150000], priceStock: 150000 } },
    { type: 'company', company: { nameCompany: 'honda', countryCompany: 'japan', priceCompany: 200000, rentCompanyInfo: [0, 50000, 100000, 200000, 300000] } },
    { type: 'company', company: { nameCompany: 'continental', countryCompany: 'germany', priceCompany: 280000, rentCompanyInfo: [24000, 48000, 120000, 360000, 850000, 1110000, 1200000], priceStock: 150000 } },
    { type: 'empty', empty: 'parking' },
    { type: 'company', company: { nameCompany: 'aliexpress', countryCompany: 'china', priceCompany: 320000, rentCompanyInfo: [28000, 56000, 150000, 450000, 1000000, 1200000, 1400000], priceStock: 200000 } },
    { type: 'company', company: { nameCompany: 'xiaomi', countryCompany: 'china', priceCompany: 320000, rentCompanyInfo: [28000, 56000, 150000, 450000, 1000000, 1200000, 1400000], priceStock: 200000 } },
    { type: 'company', company: { nameCompany: 'google', countryCompany: 'usa', priceCompany: 350000, rentCompanyInfo: [35000, 70000, 175000, 500000, 1100000, 1300000, 1500000], priceStock: 200000 } },
    { type: 'lossProfit', change: 'tax10' },
    { type: 'company', company: { nameCompany: 'WD', countryCompany: 'usa', priceCompany: 350000, rentCompanyInfo: [35000, 70000, 175000, 500000, 1100000, 1300000, 1500000], priceStock: 200000 } },
    { type: 'company', company: { nameCompany: 'ibm', countryCompany: 'usa', priceCompany: 400000, rentCompanyInfo: [50000, 100000, 200000, 600000, 1400000, 1700000, 2000000], priceStock: 200000 } },
]























