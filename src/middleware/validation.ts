import { Request, Response, NextFunction } from "express";

// Atualizar esse schema quando alterar o modelo
const IBeerSchema = {
  beerStyle: "string",
  minTemp: "number",
  maxTemp: "number",
};

export function validateBeerData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const beerData = req.body;

  // Verifica se o objeto tem a quantidade de chaves esperadas
  if (Object.keys(beerData).length !== Object.keys(IBeerSchema).length) {
    return res.status(400).json({ error: "Quantidade de chaves inválida" });
  }

  for (const [key, type] of Object.entries(IBeerSchema)) {
    // Verifica se a chave está presente
    if (!beerData[key]) {
      return res.status(400).json({ error: `Chave não encontrada: ${key}` });
    }
    // Verifica se a chave tem o tipo esperado
    if (typeof beerData[key] !== type) {
      return res.status(400).json({ error: `Tipo inválido da chave: ${key}` });
    }
  }

  next();
}
