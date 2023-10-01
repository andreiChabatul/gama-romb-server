import { gameCell } from "src/types";

export const MAX_INDEX_CELL_BOARD = 38;

export const TAX_10 = 0.1;
export const TAX_5 = 0.05;

// export const defaultBoard: gameCell[] = [
//   {
//     indexCell: 0,
//     gridArea: '1/1/3/3',
//     cellDirections: 'top',
//     players: [],
//     cellSquare: {
//       imageCell: 'start',
//       textCell: 'Sallary 200'
//     },
//   },
//   {
//     indexCell: 1,
//     gridArea: '1/3/3/4',
//     cellDirections: 'top',
//     players: []
//   },
//   {
//     indexCell: 2,
//     gridArea: '1/4/3/5',
//     cellDirections: 'top',
//     players: []
//   },
//   {
//     indexCell: 3,
//     gridArea: '1/5/3/6',
//     cellDirections: 'top',
//     players: []
//   },
//   {
//     indexCell: 4,
//     gridArea: '1/6/3/7',
//     cellDirections: 'top',
//     players: []
//   },
//   {
//     indexCell: 5,
//     gridArea: '1/7/3/8',
//     cellDirections: 'top',
//     players: [],
//     cellSquare: {
//       imageCell: 'profit',
//       textCell: 'Profit'
//     }
//   },
//   {
//     indexCell: 6,
//     gridArea: '1/8/3/9',
//     cellDirections: 'top',
//     players: []
//   },
//   {
//     indexCell: 7,
//     gridArea: '1/9/3/10',
//     cellDirections: 'top',
//     players: [],
//     cellSquare: {
//       imageCell: 'loss',
//       textCell: 'Loss'
//     }
//   },
//   {
//     indexCell: 8,
//     gridArea: '1/10/3/11',
//     cellDirections: 'top',
//     players: []
//   },
//   {
//     indexCell: 9,
//     gridArea: '1/11/3/12',
//     cellDirections: 'top',
//     players: []
//   },
//   {
//     indexCell: 10,
//     gridArea: '1/12/3/13',
//     cellDirections: 'top',
//     players: []
//   },
//   {
//     indexCell: 11,
//     gridArea: '1/13/3/14',
//     cellDirections: 'top',
//     players: []
//   },
//   {
//     indexCell: 12,
//     gridArea: '1/14/3/15',
//     cellDirections: 'top',
//     players: [],
//     cellSquare: {
//       imageCell: 'inJail',
//       textCell: 'In jail'
//     }
//   },
//   {
//     indexCell: 13,
//     gridArea: '3/14/4/15',
//     cellDirections: 'right',
//     players: []
//   },
//   {
//     indexCell: 14,
//     gridArea: '4/14/5/15',
//     cellDirections: 'right',
//     players: []
//   },
//   {
//     indexCell: 15,
//     gridArea: '5/14/6/15',
//     cellDirections: 'right',
//     players: []
//   },
//   {
//     indexCell: 16,
//     gridArea: '6/14/7/15',
//     cellDirections: 'right',
//     players: [],
//     cellSquare: {
//       imageCell: 'tax',
//       textCell: 'Tax 5%'
//     }
//   },
//   {
//     indexCell: 17,
//     gridArea: '7/14/8/15',
//     cellDirections: 'right',
//     players: []
//   },
//   {
//     indexCell: 18,
//     gridArea: '8/14/9/15',
//     cellDirections: 'right',
//     players: []
//   },
//   {
//     indexCell: 19,
//     gridArea: '9/14/11/15',
//     cellDirections: 'bottom',
//     players: [],
//     cellSquare: {
//       imageCell: 'parking',
//       textCell: 'Rest zone'
//     }
//   },
//   {
//     indexCell: 20,
//     gridArea: '9/13/11/14',
//     cellDirections: 'bottom',
//     players: []
//   },
//   {
//     indexCell: 21,
//     gridArea: '9/12/11/13',
//     cellDirections: 'bottom',
//     players: []
//   },
//   {
//     indexCell: 22,
//     gridArea: '9/11/11/12',
//     cellDirections: 'bottom',
//     players: []
//   },
//   {
//     indexCell: 23,
//     gridArea: '9/10/11/11',
//     cellDirections: 'bottom',
//     players: []
//   },
//   {
//     indexCell: 24,
//     gridArea: '9/9/11/10',
//     cellDirections: 'bottom',
//     players: [],
//     cellSquare: {
//       imageCell: 'profit',
//       textCell: 'Profit'
//     }
//   },
//   {
//     indexCell: 25,
//     gridArea: '9/8/11/9',
//     cellDirections: 'bottom',
//     players: []
//   },
//   {
//     indexCell: 26,
//     gridArea: '9/7/11/8',
//     cellDirections: 'bottom',
//     players: [],
//     cellSquare: {
//       imageCell: 'loss',
//       textCell: 'Loss'
//     }
//   },
//   {
//     indexCell: 27,
//     gridArea: '9/6/11/7',
//     cellDirections: 'bottom',
//     players: []
//   },
//   {
//     indexCell: 28,
//     gridArea: '9/5/11/6',
//     cellDirections: 'bottom',
//     players: []
//   },
//   {
//     indexCell: 29,
//     gridArea: '9/4/11/5',
//     cellDirections: 'bottom',
//     players: []
//   },
//   {
//     indexCell: 30,
//     gridArea: '9/3/11/4',
//     cellDirections: 'bottom',
//     players: []
//   },
//   {
//     indexCell: 31,
//     gridArea: '9/3/11/1',
//     cellDirections: 'bottom',
//     players: [],
//     cellSquare: {
//       imageCell: 'security',
//       textCell: 'Go to jail'
//     }
//   },
//   {
//     indexCell: 32,
//     gridArea: '9/1/8/3',
//     cellDirections: 'left',
//     players: []
//   },
//   {
//     indexCell: 33,
//     gridArea: '8/1/7/3',
//     cellDirections: 'left',
//     players: []
//   },
//   {
//     indexCell: 34,
//     gridArea: '7/1/6/3',
//     cellDirections: 'left',
//     players: []
//   },
//   {
//     indexCell: 35,
//     gridArea: '6/1/5/3',
//     cellDirections: 'left',
//     players: [],
//     cellSquare: {
//       imageCell: 'tax',
//       textCell: 'Tax 10%'
//     }
//   },
//   {
//     indexCell: 36,
//     gridArea: '5/1/4/3',
//     cellDirections: 'left',
//     players: []
//   },
//   {
//     indexCell: 37,
//     gridArea: '3/1/3/3',
//     cellDirections: 'left',
//     players: []
//   }

// ]