import { gameCell } from "src/types";

export const defaultCell: gameCell[] = [
    {
        type: 'empty',
        nameCell: 'start',
    },
    {
        type: 'company',
        nameCell: 'hsbc',
        company: {
            countryCompany: 'britania',
            priceCompany: 60000,
            rentCompanyInfo: [2000, 4000, 10000, 30000, 90000, 160000, 250000],
            priceStock: 50000,
            collateralCompany: 30000,
            buyBackCompany: 66000
        }
    },
    {
        type: 'company',
        nameCell: 'fujitsu',
        company: {
            countryCompany: 'japan',
            priceCompany: 200000,
            rentCompanyInfo: [50000, 50000, 100000, 200000, 300000],
            collateralCompany: 100000,
            buyBackCompany: 220000,
            priceStock: 0
        }
    },
    {
        type: 'company',
        nameCell: 'rr',
        company: {
            countryCompany: 'britania',
            priceCompany: 60000,
            rentCompanyInfo: [2000, 4000, 10000, 30000, 90000, 160000, 250000],
            priceStock: 50000,
            collateralCompany: 30000,
            buyBackCompany: 66000
        }
    },
    {
        type: 'company',
        nameCell: 'bp',
        company: {
            countryCompany: 'britania',
            priceCompany: 80000,
            rentCompanyInfo: [4000, 8000, 20000, 60000, 180000, 320000, 450000],
            priceStock: 50000,
            collateralCompany: 40000,
            buyBackCompany: 88000
        }
    },
    {
        type: 'profit',
        nameCell: 'profit',
    },
    {
        type: 'company',
        nameCell: 'uia',
        company: {
            countryCompany: 'ukraine',
            priceCompany: 150000,
            rentCompanyInfo: [25000, 25000, 50000],
            collateralCompany: 75000,
            buyBackCompany: 165000,
            priceStock: 0
        }
    },
    {
        type: 'loss',
        nameCell: 'loss',
    },
    {
        type: 'company',
        nameCell: 'ericsson',
        company: {
            countryCompany: 'sweden',
            priceCompany: 100000,
            rentCompanyInfo: [6000, 12000, 30000, 90000, 270000, 400000, 550000],
            priceStock: 50000,
            collateralCompany: 50000,
            buyBackCompany: 110000
        }
    },
    {
        type: 'company',
        nameCell: 'volvo',
        company: {
            countryCompany: 'sweden',
            priceCompany: 100000,
            rentCompanyInfo: [6000, 12000, 30000, 90000, 270000, 400000, 550000],
            priceStock: 50000,
            collateralCompany: 50000,
            buyBackCompany: 110000
        }
    },
    {
        type: 'company',
        nameCell: 'mitsubishi',
        company: {
            countryCompany: 'japan',
            priceCompany: 200000,
            rentCompanyInfo: [50000, 50000, 100000, 200000, 300000],
            collateralCompany: 100000,
            buyBackCompany: 220000,
            priceStock: 0
        }
    },
    {
        type: 'company',
        nameCell: "essity",
        company: {
            countryCompany: 'sweden',
            priceCompany: 120000,
            rentCompanyInfo: [8000, 16000, 40000, 100000, 300000, 450000, 600000],
            priceStock: 50000,
            collateralCompany: 60000,
            buyBackCompany: 132000
        }
    },
    {
        type: 'empty',
        nameCell: 'inJail'
    },
    {
        type: 'company',
        nameCell: 'rbc',
        company: {
            countryCompany: 'canada',
            priceCompany: 140000,
            rentCompanyInfo: [10000, 20000, 50000, 150000, 450000, 625000, 750000],
            priceStock: 100000,
            collateralCompany: 70000,
            buyBackCompany: 154000
        }
    },
    {
        type: 'company',
        nameCell: 'telus',
        company: {
            countryCompany: 'canada',
            priceCompany: 140000,
            rentCompanyInfo: [10000, 20000, 50000, 150000, 450000, 625000, 750000],
            priceStock: 100000,
            collateralCompany: 70000,
            buyBackCompany: 154000
        }
    },
    {
        type: 'company',
        nameCell: 'ttc',
        company: {
            countryCompany: 'kazah',
            priceCompany: 180000,
            rentCompanyInfo: [14000, 28000, 70000, 200000, 550000, 750000, 950000],
            priceStock: 100000,
            collateralCompany: 90000,
            buyBackCompany: 198000
        }
    },
    {
        type: 'tax',
        nameCell: 'tax5'
    },
    {
        type: 'company',
        nameCell: 'kaz',
        company: {
            countryCompany: 'kazah',
            priceCompany: 180000,
            rentCompanyInfo: [14000, 28000, 70000, 200000, 550000, 750000, 950000],
            priceStock: 100000,
            collateralCompany: 90000,
            buyBackCompany: 198000
        }
    },
    {
        type: 'company',
        nameCell: 'kazAzot',
        company: {
            countryCompany: 'kazah',
            priceCompany: 200000,
            rentCompanyInfo: [16000, 32000, 80000, 220000, 600000, 800000, 1000000],
            priceStock: 100000,
            collateralCompany: 100000,
            buyBackCompany: 220000
        }
    },
    {
        type: 'empty',
        nameCell: 'parking'
    },
    {
        type: 'company',
        nameCell: 'ferrari',
        company: {
            countryCompany: 'italia',
            priceCompany: 220000,
            rentCompanyInfo: [18000, 36000, 90000, 250000, 700000, 875000, 1050000],
            priceStock: 150000,
            collateralCompany: 110000,
            buyBackCompany: 242000
        }
    },
    {
        type: 'company',
        nameCell: 'canon',
        company: {
            countryCompany: 'japan',
            priceCompany: 200000,
            rentCompanyInfo: [50000, 50000, 100000, 200000, 300000],
            collateralCompany: 100000,
            buyBackCompany: 220000,
            priceStock: 0
        }
    },
    {
        type: 'company',
        nameCell: 'uniCredit',
        company: {
            countryCompany: 'italia',
            priceCompany: 220000,
            rentCompanyInfo: [18000, 36000, 90000, 250000, 700000, 875000, 1050000],
            priceStock: 150000,
            collateralCompany: 110000,
            buyBackCompany: 242000
        }
    },
    {
        type: 'company',
        nameCell: 'posteItaliane',
        company: {
            countryCompany: 'italia',
            priceCompany: 240000,
            rentCompanyInfo: [20000, 40000, 100000, 300000, 750000, 925000, 1100000],
            priceStock: 150000,
            collateralCompany: 120000,
            buyBackCompany: 264000
        }
    },
    {
        type: 'profit',
        nameCell: 'profit'
    },
    {
        type: 'company',
        nameCell: "ukranafta",
        company: {
            countryCompany: 'ukraine',
            priceCompany: 150000,
            rentCompanyInfo: [25000, 25000, 50000],
            collateralCompany: 75000,
            buyBackCompany: 165000,
            priceStock: 0
        }
    },
    {
        type: 'loss',
        nameCell: 'loss'
    },
    {
        type: 'company',
        nameCell: 'volkswagen',
        company: {
            countryCompany: 'germany',
            priceCompany: 260000,
            rentCompanyInfo: [22000, 44000, 110000, 330000, 800000, 975000, 1150000],
            priceStock: 150000,
            collateralCompany: 130000,
            buyBackCompany: 286000
        }
    },
    {
        type: 'company',
        nameCell: 'allianz',
        company: {
            countryCompany: 'germany',
            priceCompany: 260000,
            rentCompanyInfo: [22000, 44000, 110000, 330000, 800000, 975000, 1150000],
            priceStock: 150000,
            collateralCompany: 130000,
            buyBackCompany: 286000
        }
    },
    {
        type: 'company',
        nameCell: 'honda',
        company: {
            countryCompany: 'japan',
            priceCompany: 200000,
            rentCompanyInfo: [50000, 50000, 100000, 200000, 300000],
            collateralCompany: 100000,
            buyBackCompany: 220000,
            priceStock: 0
        }
    },
    {
        type: 'company',
        nameCell: 'continental',
        company: {
            countryCompany: 'germany',
            priceCompany: 280000,
            rentCompanyInfo: [24000, 48000, 120000, 360000, 850000, 1110000, 1200000],
            priceStock: 150000,
            collateralCompany: 140000,
            buyBackCompany: 308000
        }
    },
    {
        type: 'empty',
        nameCell: 'goJail'
    },
    {
        type: 'company',
        nameCell: 'aliexpress',
        company: {
            countryCompany: 'china',
            priceCompany: 320000,
            rentCompanyInfo: [28000, 56000, 150000, 450000, 1000000, 1200000, 1400000],
            priceStock: 200000,
            collateralCompany: 160000,
            buyBackCompany: 352000
        }
    },
    {
        type: 'company',
        nameCell: 'xiaomi',
        company: {
            countryCompany: 'china',
            priceCompany: 320000,
            rentCompanyInfo: [28000, 56000, 150000, 450000, 1000000, 1200000, 1400000],
            priceStock: 200000,
            collateralCompany: 160000,
            buyBackCompany: 352000
        }
    },
    {
        type: 'company',
        nameCell: 'google',
        company: {
            countryCompany: 'usa',
            priceCompany: 350000,
            rentCompanyInfo: [35000, 70000, 175000, 500000, 1100000, 1300000, 1500000],
            priceStock: 200000,
            collateralCompany: 175000,
            buyBackCompany: 385000
        }
    },
    {
        type: 'tax',
        nameCell: 'tax10'
    },
    {
        type: 'company',
        nameCell: 'WD',
        company: {
            countryCompany: 'usa',
            priceCompany: 350000,
            rentCompanyInfo: [35000, 70000, 175000, 500000, 1100000, 1300000, 1500000],
            priceStock: 200000,
            collateralCompany: 175000,
            buyBackCompany: 385000
        }
    },
    {
        type: 'company',
        nameCell: 'ibm',
        company: {
            countryCompany: 'usa',
            priceCompany: 400000,
            rentCompanyInfo: [50000, 100000, 200000, 600000, 1400000, 1700000, 2000000],
            priceStock: 200000,
            collateralCompany: 200000,
            buyBackCompany: 440000
        }
    },
]
