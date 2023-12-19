import { gameCell } from "src/types";

export const defaultCell: gameCell[] = [
    {
        type: 'empty',
        indexCell: 0,
        nameCell: 'start',
        location: {
            gridArea: '1/1/3/3',
            cellDirections: 'top'
        }
    },
    {
        type: 'company',
        indexCell: 1,
        nameCell: 'hsbc',
        location: {
            gridArea: '1/3/3/4',
            cellDirections: 'top'
        },
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
        indexCell: 2,
        location: {
            gridArea: '1/4/3/5',
            cellDirections: 'top'
        },
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
        indexCell: 3,
        nameCell: 'rr',
        location: {
            gridArea: '1/5/3/6',
            cellDirections: 'top'
        },
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
        indexCell: 4,
        nameCell: 'bp',
        location: {
            gridArea: '1/6/3/7',
            cellDirections: 'top'
        },
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
        indexCell: 5,
        nameCell: 'profit',
        location: {
            gridArea: '1/7/3/8',
            cellDirections: 'top'
        }
    },
    {
        type: 'company',
        indexCell: 6,
        nameCell: 'uia',
        location: {
            gridArea: '1/8/3/9',
            cellDirections: 'top'
        },
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
        indexCell: 7,
        nameCell: 'loss',
        location: {
            gridArea: '1/9/3/10',
            cellDirections: 'top'
        }
    },
    {
        type: 'company',
        indexCell: 8,
        nameCell: 'ericsson',
        location: {
            gridArea: '1/10/3/11',
            cellDirections: 'top'
        },
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
        indexCell: 9,
        nameCell: 'volvo',
        location: {
            gridArea: '1/11/3/12',
            cellDirections: 'top'
        },
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
        indexCell: 10,
        nameCell: 'mitsubishi',
        location: {
            gridArea: '1/12/3/13',
            cellDirections: 'top'
        },
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
        indexCell: 11,
        nameCell: "essity",
        location: {
            gridArea: '1/13/3/14',
            cellDirections: 'top'
        },
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
        indexCell: 12,
        nameCell: 'inJail',
        location: {
            gridArea: '1/14/3/16',
            cellDirections: 'top'
        }
    },
    {
        type: 'company',
        indexCell: 13,
        nameCell: 'rbc',
        location: {
            gridArea: '3/14/4/16',
            cellDirections: 'right'
        },
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
        indexCell: 14,
        nameCell: 'telus',
        location: {
            gridArea: '4/14/5/16',
            cellDirections: 'right'
        },
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
        indexCell: 15,
        nameCell: 'ttc',
        location: {
            gridArea: '5/14/6/16',
            cellDirections: 'right'
        },
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
        indexCell: 16,
        nameCell: 'tax5',
        location: {
            gridArea: '6/14/7/16',
            cellDirections: 'right'
        }
    },
    {
        type: 'company',
        indexCell: 17,
        nameCell: 'kaz',
        location: {
            gridArea: '7/14/8/16',
            cellDirections: 'right'
        },
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
        indexCell: 18,
        nameCell: 'kazAzot',
        location: {
            gridArea: '8/14/9/16',
            cellDirections: 'right'
        },
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
        indexCell: 19,
        nameCell: 'parking',
        location: {
            gridArea: '9/14/11/16',
            cellDirections: 'bottom'
        }
    },
    {
        type: 'company',
        indexCell: 20,
        nameCell: 'ferrari',
        location: {
            gridArea: '9/13/11/14',
            cellDirections: 'bottom'
        },
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
        indexCell: 21,
        nameCell: 'canon',
        location: {
            gridArea: '9/12/11/13',
            cellDirections: 'bottom'
        },
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
        indexCell: 22,
        nameCell: 'uniCredit',
        location: {
            gridArea: '9/11/11/12',
            cellDirections: 'bottom'
        },
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
        indexCell: 23,
        nameCell: 'posteItaliane',
        location: {
            gridArea: '9/10/11/11',
            cellDirections: 'bottom'
        },
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
        indexCell: 24,
        nameCell: 'profit',
        location: {
            gridArea: '9/9/11/10',
            cellDirections: 'bottom'
        }
    },
    {
        type: 'company',
        indexCell: 25,
        nameCell: "ukranafta",
        location: {
            gridArea: '9/8/11/9',
            cellDirections: 'bottom'
        },
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
        indexCell: 26,
        nameCell: 'loss',
        location: {
            gridArea: '9/7/11/8',
            cellDirections: 'bottom'

        }
    },
    {
        type: 'company',
        indexCell: 27,
        nameCell: 'volkswagen',
        location: {
            gridArea: '9/6/11/7',
            cellDirections: 'bottom'
        },
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
        indexCell: 28,
        nameCell: 'allianz',
        location: {
            gridArea: '9/5/11/6',
            cellDirections: 'bottom'
        },
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
        indexCell: 29,
        nameCell: 'honda',
        location: {
            gridArea: '9/4/11/5',
            cellDirections: 'bottom'
        },
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
        indexCell: 30,
        nameCell: 'continental',
        location: {
            gridArea: '9/3/11/4',
            cellDirections: 'bottom'
        },
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
        indexCell: 31,
        nameCell: 'goJail',
        location: {
            gridArea: '9/3/11/1',
            cellDirections: 'bottom'
        }
    },
    {
        type: 'company',
        indexCell: 32,
        nameCell: 'aliexpress',
        location: {
            gridArea: '9/1/8/3',
            cellDirections: 'left'
        },
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
        indexCell: 33,
        nameCell: 'xiaomi',
        location: {
            gridArea: '8/1/7/3',
            cellDirections: 'left'
        },
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
        indexCell: 34,
        nameCell: 'google',
        location: {
            gridArea: '7/1/6/3',
            cellDirections: 'left'
        },
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
        indexCell: 35,
        nameCell: 'tax10',
        location: {
            gridArea: '6/1/5/3',
            cellDirections: 'left'
        }
    },
    {
        type: 'company',
        indexCell: 36,
        nameCell: 'WD',
        location: {
            gridArea: '5/1/4/3',
            cellDirections: 'left'
        },
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
        indexCell: 37,
        nameCell: 'ibm',
        location: {
            gridArea: '3/1/3/3',
            cellDirections: 'left'
        },
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
