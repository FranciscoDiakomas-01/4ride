export default function isValidPhone(numero: string): string | null {
  const apenasNumeros = numero.replace(/[^\d+]/g, "");

  const semPrefixo = apenasNumeros.startsWith("+244")
    ? apenasNumeros.slice(4)
    : apenasNumeros;
  const angolanoValido = /^9\d{8}$/;
  if (angolanoValido.test(semPrefixo)) {
    return semPrefixo;
  }
  return null;
}
