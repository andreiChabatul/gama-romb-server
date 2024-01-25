export interface PrisonI {
  addPrisoner(idRoom: string, idUser: string): void;
  deletePrisoner(idRoom: string, idUser: string): void;
  turnPrison(idRoom: string, idUser: string): void;
  payDebt(idRoom: string, idUser: string): void;
}

export enum PRISON_STATE {
  GoInPrison = 4,
  GoOutPrison = 0,
}
