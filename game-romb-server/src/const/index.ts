import { countryCompanyMonopoly, countryCompanyNoMonopoly } from "src/types";

export const AUCTION_STEP = 1.1;
export const MAX_INDEX_CELL_BOARD = 38;
export const DEBT_PRISON = 50000;
export const VALUE_CELL = [25000, 50000, 75000, 100000, 125000, 150000, 175000, 200000, 225000, 250000, 275000, 300000];
export const CIRCLE_REWARD = 200000;
export const INIT_TOTAL = 250000;
export const MONOPOLY_COMPANY: countryCompanyMonopoly[] = ['germany', 'ukraine', 'italia', 'britania', 'sweden', 'canada', 'kazah', 'china', 'usa'];
export const NO_MONOPOY_COMPANY: countryCompanyNoMonopoly = 'japan';
export const TIME_DISCONNECT = 5000;