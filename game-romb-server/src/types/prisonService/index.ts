export interface PrisonI {
    addPrisoner(idRoom: string, idUser: string): void;
    deletePrisoner(idRoom: string, idUser: string): void;
    turnPrison(idRoom: string, idUser: string): void;
    payDebt(idRoom: string, idUser: string): void;
}