import { Request, Response } from "express";
import { Beer, IBeer } from "../models/Beer";

export async function handleBeerAndPlaylist(req: Request, res: Response) {
  try {
    const { temperature } = req.body;
    const beers = await filterBeersByTemperature(temperature);

    if (beers.length === 0) {
      res.status(404).json({ error: "Nenhuma cerveja encontrada" });
    }

    if (beers.length === 1) {
      res.status(200).json(beers[0]);
    }

    const closestBeer = findClosestBeer(beers, temperature);
    res.status(200).json(closestBeer);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar cerveja" });
  }
}

async function filterBeersByTemperature(temperature: number): Promise<IBeer[]> {
  try {
    const filteredBeers = await Beer.find({
      minTemp: { $lte: temperature },
      maxTemp: { $gte: temperature },
    }).sort({ beerStyle: 1 });

    return filteredBeers;
  } catch (error) {
    throw new Error("Erro ao filtrar cervejas por temperatura");
  }
}

function findClosestBeer(beers: IBeer[], temperature: number): IBeer {
  const closestBeer = beers.reduce((prev, curr) => {
    const prevAvg = (prev.minTemp + prev.maxTemp) / 2;
    const currAvg = (curr.minTemp + curr.maxTemp) / 2;
    const prevDiff = Math.abs(prevAvg - temperature);
    const currDiff = Math.abs(currAvg - temperature);

    return currDiff < prevDiff ? curr : prev;
  });

  return closestBeer;
}
