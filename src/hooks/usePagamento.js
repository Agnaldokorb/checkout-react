import { useState } from "react"
import { useNavigate } from "react-router"
import { processarPagamento } from "../utils/pagamento"

export function usePagamento() {
    const [processando, setProcessando] = useState(false)
    const navigate = useNavigate()

    const pagar = async ({ numeroCartao }) => {
        if (processando) return
        setProcessando(true)

        try {
            const resultado = await processarPagamento(numeroCartao)
            navigate(resultado.aprovado ? "/sucesso" : "/falha", { replace: true })
        } finally {
            setProcessando(false)
        }
    }
    return { pagar, processando }
}