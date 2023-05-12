import { Request, Response } from "express";
import { Beer } from "../models/Beer";

export async function handleGetBeer(req: Request, res: Response) {
  try {
    const beer = await Beer.findById(req.params.id);
    if (!beer) {
      return res.status(404).json({ error: "Cerveja não encontrada" });
    }
    res.status(200).json(beer);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar cerveja" });
  }
}

export async function handleGetAllBeer(req: Request, res: Response) {
  try {
    const beers = await Beer.find();
    res.status(200).json(beers);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar cervejas" });
  }
}

export async function handleCreateBeer(req: Request, res: Response) {
  try {
    const beer = new Beer(req.body);
    await beer.save();
    res.status(201).json(beer);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar cerveja" });
  }
}

export async function handleUpdateBeer(req: Request, res: Response) {
  try {
    const beer = await Beer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!beer) {
      return res.status(404).json({ error: "Cerveja não encontrada" });
    }
    res.status(200).json(beer);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar cerveja" });
  }
}

export async function handleDeleteBeer(req: Request, res: Response) {
  try {
    const beer = await Beer.findByIdAndDelete(req.params.id);
    if (!beer) {
      return res.status(404).json({ error: "Cerveja não encontrada" });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir cerveja" });
  }
}
