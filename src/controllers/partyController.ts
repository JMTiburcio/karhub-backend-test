import { Request, Response } from "express";

import { Beer, IBeer } from "../models/Beer";
import getToken from "../utils/getToken";
import getPlaylist from "../utils/getPlaylist";

export async function handleBeerAndPlaylist(req: Request, res: Response) {
  try {
    const { temperature } = req.body;
    const beers = await filterBeersByTemperature(temperature);

    if (beers.length === 0) {
      res.status(404).json({ error: "Nenhuma cerveja encontrada" });
      return;
    }

    const closestBeer =
      beers.length === 1 ? beers[0] : findClosestBeer(beers, temperature);

    const token = await getToken();
    const playlist = await getPlaylist(token, closestBeer.beerStyle);

    if (!playlist) {
      res
        .status(404)
        .json({
          error: `Nenhuma playlist encontrada para: ${closestBeer.beerStyle}`,
        });
      return;
    }

    const result = {
      beerStyle: closestBeer.beerStyle,
      playlist,
    };

    res.status(200).json(result);
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
