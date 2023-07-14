import { differenceInYears } from "date-fns"

export function calcularIdade(data: string | Date) {
    const idade = differenceInYears(new Date(), new Date(data))
    return idade
}