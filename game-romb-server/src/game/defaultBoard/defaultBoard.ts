import { gameCell } from "src/types";

export const defaultBoard: gameCell[] = [
    {
      indexCell: 0,
      gridArea: '1/1/3/3',
      cellDirections: 'top',
      players: ['#599012'],
      cellSquare: {
        imageCell: 'start',
        textCell: 'Sallary 200'
      }
    },
    {
      indexCell: 1,
      gridArea: '1/3/3/4',
      cellDirections: 'top',
      isPledge: false,
      players: [],
      cellCompany: {
        countryCompany: 'britania',
        nameCompany: 'hsbc',
        priceCompany: 120
      }
    },
    {
      indexCell: 2,
      gridArea: '1/4/3/5',
      cellDirections: 'top',
      isPledge: true,
      players: ['#1EDBF4'],
      cellCompany: {
        countryCompany: 'japan',
        nameCompany: 'fujitsu',
        priceCompany: 120
      }
    },
    {
      indexCell: 3,
      gridArea: '1/5/3/6',
      cellDirections: 'top',
      isPledge: false,
      players: [],
      cellCompany: {
        countryCompany: 'britania',
        nameCompany: 'rr',
        priceCompany: 120
      }
    },
    {
      indexCell: 4,
      gridArea: '1/6/3/7',
      cellDirections: 'top',
      isPledge: false,
      players: [],
      owned: '#8C1D27',
      cellCompany: {
        countryCompany: 'britania',
        nameCompany: 'bp',
        priceCompany: 120
      }
    },
    {
      indexCell: 5,
      gridArea: '1/7/3/8',
      cellDirections: 'top',
      players: ['#8C1D27'],
      cellSquare: {
        imageCell: 'chance',
        textCell: 'Chance'
      }
    },
    {
      indexCell: 6,
      gridArea: '1/8/3/9',
      cellDirections: 'top',
      isPledge: false,
      players: [],
      cellCompany: {
        countryCompany: 'ukraine',
        nameCompany: 'uia',
        priceCompany: 120,
        shares: ['moneta', 'moneta']
      }
    },
    {
      indexCell: 7,
      gridArea: '1/9/3/10',
      cellDirections: 'top',
      players: [],
      cellSquare: {
        imageCell: 'mysteryBox',
        textCell: 'Mystery'
      }
    },
    {
      indexCell: 8,
      gridArea: '1/10/3/11',
      cellDirections: 'top',
      isPledge: false,
      players: [],
      owned: '#8C1D27',
      cellCompany: {
        countryCompany: 'sweden',
        nameCompany: 'ericsson',
        shares: ['stock'],
        priceCompany: 120
      }
    },
    {
      indexCell: 9,
      gridArea: '1/12/3/13',
      cellDirections: 'top',
      isPledge: false,
      players: [],
      cellCompany: {
        countryCompany: 'japan',
        nameCompany: 'mitsubishi',
        shares: ['stamp'],
        priceCompany: 120
      }
    },
    {
      indexCell: 10,
      gridArea: '1/11/3/12',
      cellDirections: 'top',
      isPledge: false,
      players: [],
      cellCompany: {
        countryCompany: 'sweden',
        nameCompany: 'volvo',
        priceCompany: 120
      }
    },
    {
      indexCell: 11,
      gridArea: '1/13/3/14',
      cellDirections: 'top',
      isPledge: false,
      players: [],
      cellCompany: {
        countryCompany: 'sweden',
        nameCompany: 'essity',
        priceCompany: 120
      }
    },
    {
      indexCell: 12,
      gridArea: '1/14/3/15',
      cellDirections: 'top',
      players: [],
      cellSquare: {
        imageCell: 'security',
        textCell: 'Go to jail'
      }
    },
    {
      indexCell: 13,
      gridArea: '3/14/4/15',
      cellDirections: 'right',
      isPledge: false,
      players: [],
      cellCompany: {
        countryCompany: 'canada',
        nameCompany: 'rbc',
        priceCompany: 120
      }
    },
    {
      indexCell: 14,
      gridArea: '4/14/5/15',
      cellDirections: 'right',
      isPledge: false,
      players: [],
      cellCompany: {
        countryCompany: 'canada',
        nameCompany: 'telus',
        priceCompany: 120
      }
    },
    {
      indexCell: 15,
      gridArea: '5/14/6/15',
      cellDirections: 'right',
      isPledge: false,
      players: [],
      cellCompany: {
        countryCompany: 'kazah',
        nameCompany: 'ttc',
        priceCompany: 120
      }
    },
    {
      indexCell: 16,
      gridArea: '6/14/7/15',
      cellDirections: 'right',
      players: [],
      cellSquare: {
        imageCell: 'tax',
        textCell: 'Tax 5%'
      }

    },
    {
      indexCell: 17,
      gridArea: '7/14/8/15',
      cellDirections: 'right',
      isPledge: false,
      players: [],
      cellCompany: {
        countryCompany: 'kazah',
        nameCompany: 'kaz',
        shares: ['stock', 'stock'],
        priceCompany: 120
      }
    },
    {
      indexCell: 18,
      gridArea: '8/14/9/15',
      cellDirections: 'right',
      isPledge: false,
      players: [],
      cellCompany: {
        countryCompany: 'kazah',
        nameCompany: 'kazAzot',
        priceCompany: 120
      }
    },
    {
      indexCell: 19,
      gridArea: '9/14/11/15',
      cellDirections: 'bottom',
      players: [],
      cellSquare: {
        imageCell: 'parking',
        textCell: 'Rest zone'
      }
    },
    {
      indexCell: 20,
      gridArea: '9/13/11/14',
      cellDirections: 'bottom',
      isPledge: false,
      players: [],
      cellCompany: {
        countryCompany: 'italia',
        nameCompany: 'ferrari',
        priceCompany: 100
      },
    },
    {
      indexCell: 21,
      gridArea: '9/12/11/13',
      cellDirections: 'bottom',
      isPledge: false,
      players: [],
      cellCompany: {
        countryCompany: 'japan',
        nameCompany: 'canon',
        priceCompany: 120
      }
    },
    {
      indexCell: 22,
      gridArea: '9/11/11/12',
      cellDirections: 'bottom',
      isPledge: false,
      players: [],
      cellCompany: {
        countryCompany: 'italia',
        nameCompany: 'uniCredit',
        priceCompany: 120
      },
    },
    {
      indexCell: 23,
      gridArea: '9/10/11/11',
      cellDirections: 'bottom',
      isPledge: false,
      players: [],
      cellCompany: {
        countryCompany: 'italia',
        nameCompany: 'posteItaliane',
        priceCompany: 120
      }
    },
    {
      indexCell: 24,
      gridArea: '9/9/11/10',
      cellDirections: 'bottom',
      players: [],
      cellSquare: {
        imageCell: 'chance',
        textCell: 'Chance'
      }
    },
    {
      indexCell: 25,
      gridArea: '9/8/11/9',
      cellDirections: 'bottom',
      players: [],
      isPledge: false,
      cellCompany: {
        countryCompany: 'ukraine',
        nameCompany: 'ukranafta',
        priceCompany: 120
      }
    },
    {
      indexCell: 26,
      gridArea: '9/7/11/8',
      cellDirections: 'bottom',
      players: [],
      cellSquare: {
        imageCell: 'mysteryBox',
        textCell: 'Mystery'
      }
    },
    {
      indexCell: 27,
      gridArea: '9/6/11/7',
      cellDirections: 'bottom',
      isPledge: false,
      players: [],
      cellCompany: {
        countryCompany: 'germany',
        nameCompany: 'volkswagen',
        priceCompany: 111
      },
    },
    {
      indexCell: 28,
      gridArea: '9/5/11/6',
      cellDirections: 'bottom',
      isPledge: false,
      players: [],
      cellCompany: {
        countryCompany: 'germany',
        nameCompany: 'allianz',
        priceCompany: 111
      },
    },
    {
      indexCell: 29,
      gridArea: '9/4/11/5',
      cellDirections: 'bottom',
      isPledge: false,
      players: [],
      cellCompany: {
        countryCompany: 'japan',
        nameCompany: 'honda',
        priceCompany: 120
      }
    },
    {
      indexCell: 30,
      gridArea: '9/3/11/4',
      cellDirections: 'bottom',
      isPledge: false,
      players: [],
      cellCompany: {
        countryCompany: 'germany',
        nameCompany: 'continental',
        priceCompany: 111
      },
    },
    {
      indexCell: 31,
      gridArea: '9/3/11/1',
      cellDirections: 'bottom',
      players: [],
      cellSquare: {
        imageCell: 'inJail',
        textCell: 'In jail'
      }
    },
    {
      indexCell: 32,
      gridArea: '9/1/8/3',
      cellDirections: 'left',
      isPledge: false,
      players: [],
      cellCompany: {
        countryCompany: 'china',
        nameCompany: 'aliexpress',
        priceCompany: 111
      }
    },
    {
      indexCell: 33,
      gridArea: '8/1/7/3',
      cellDirections: 'left',
      isPledge: true,
      players: [],
      cellCompany: {
        countryCompany: 'china',
        nameCompany: 'xiaomi',
        priceCompany: 111
      }
    },
    {
      indexCell: 34,
      gridArea: '7/1/6/3',
      cellDirections: 'left',
      isPledge: false,
      players: [],
      cellCompany: {
        countryCompany: 'usa',
        nameCompany: 'google',
        priceCompany: 111
      }
    },
    {
      indexCell: 35,
      gridArea: '6/1/5/3',
      cellDirections: 'left',
      players: [],
      cellSquare: {
        imageCell: 'tax',
        textCell: 'Tax 10%'
      }
    },
    {
      indexCell: 36,
      gridArea: '5/1/4/3',
      cellDirections: 'left',
      isPledge: false,
      players: [],
      cellCompany: {
        countryCompany: 'usa',
        nameCompany: 'WD',
        priceCompany: 111
      }
    },
    {
      indexCell: 38,
      gridArea: '3/1/3/3',
      cellDirections: 'left',
      isPledge: true,
      players: [],
      cellCompany: {
        countryCompany: 'usa',
        nameCompany: 'ibm',
        priceCompany: 111
      }
    }

  ]