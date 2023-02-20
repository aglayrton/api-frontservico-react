export type Cliente = {
  id?: string;
  nomeCliente: string;
  dataInicio: string;
  dataTermino?: string;
  description: string;
  valorPago: number;
  valorServico: number;
  dataPagamento?: string;
  status?: string;
};
