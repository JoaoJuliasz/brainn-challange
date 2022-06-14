export type Contest = {
    id: string,
    loteria: number,
    numeros: string[],
    data: string
}

export type Lotteries = {
    value: number,
    label: string
}

export type LotteriesContests = {
    loteriaId: number,
    concursoId: string
}[]