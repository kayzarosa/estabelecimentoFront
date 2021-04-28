export const maskTelefone = function (telefone: string): string {
  let tel = telefone.replace(/\D/g, "");
  tel = tel.replace(/^(\d)/, "($1")
  tel = tel.replace(/(.{3})(\d)/, "$1) $2")

  switch (tel.length) {
    case 9:
      tel = tel.replace(/(.{1})$/, " - $1");
      break;
    case 10:
      tel = tel.replace(/(.{2})$/, " - $1");
      break;
    case 11:
      tel = tel.replace(/(.{3})$/, " - $1");
      break;
    case 12:
      tel = tel.replace(/(.{4})$/, " - $1");
      break;
    default:
      tel = tel.replace(/(.{4})$/, " - $1");
      break;
  }

  return tel;
};

export const maskCnpj = function (cnpj: string): string {
  let cnpjFormatado = cnpj.replace(/\D/g, "");

  cnpjFormatado = cnpjFormatado.replace(/^(\d{2})(\d)/, "$1.$2")
  cnpjFormatado = cnpjFormatado.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
  cnpjFormatado = cnpjFormatado.replace(/\.(\d{3})(\d)/, ".$1/$2")
  cnpjFormatado = cnpjFormatado.replace(/(\d{4})(\d)/, "$1-$2")

  return cnpjFormatado
}

export const maskCpf = function (cpf: string): string {
  let cpfFormatado = cpf.replace(/\D/g, "");

  cpfFormatado = cpfFormatado.replace(/(\d{3})(\d)/, "$1.$2");
  cpfFormatado = cpfFormatado.replace(/(\d{3})(\d)/, "$1.$2");
  cpfFormatado = cpfFormatado.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

  return cpfFormatado;
}

export const maskCep = function (cep: string): string {
  let cepFormatado = cep.replace(/\D/g, "");
  
  cepFormatado = cepFormatado.replace(/^(\d{2})(\d)/, "$1.$2");
  cepFormatado = cepFormatado.replace(/\.(\d{3})(\d)/, ".$1-$2");

  return cepFormatado;
}
