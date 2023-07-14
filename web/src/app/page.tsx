'use client'

import { api } from "@/services/api"
import { calcularIdade } from "@/utils/date"
import { format } from "date-fns"
import { useEffect, useState } from "react"

interface PessoaProps {
    id: number
    nome: string
    data_nascimento: string
    idade: number
}

export default function Root() {
    const [listaPessoas, setListaPessoas] = useState<PessoaProps[]>([])
    const [listaPessoasFiltradas, setListaPessoasFiltradas] = useState<PessoaProps[]>([])

    async function loadPessoas() {
        let { data: pessoas } = await api.get<PessoaProps[]>('/pessoas')

        pessoas = pessoas.map(pessoa => {
            return {
                ...pessoa,
                idade: calcularIdade(pessoa.data_nascimento)
            }
        })

        setListaPessoas(pessoas)
        setListaPessoasFiltradas(pessoas)

    }

    useEffect(() => {
        loadPessoas()
    }, [])

    return (
        <>
            <h1>{!listaPessoas ? "Aguarde...." : "Pessoas encontradas"}</h1>
            <input
                onChange={(e) => {
                    if (e.target.value === '') {
                        setListaPessoasFiltradas(listaPessoas)
                    } else {
                        setListaPessoasFiltradas(listaPessoas.filter(p => p.idade >= Number(e.target.value)))
                    }
                }}
            />
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Data nascimento</th>
                        <th>Idade</th>
                    </tr>
                </thead>
                <tbody>
                    {listaPessoasFiltradas.map(pessoa => {
                        return (
                            <tr key={pessoa.id}>
                                <td>{pessoa.nome}</td>
                                <td>{format(new Date(pessoa.data_nascimento), "dd/MM/yyyy")}</td>
                                <td>{`${pessoa.idade} anos`}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}