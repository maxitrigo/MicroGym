
export class CreateSuscriptionDto {
    name: string;
    description: string;
    price: number;
    duration: number;
    freePass?: boolean;
    admissions?: number;
    gymId: string
}
