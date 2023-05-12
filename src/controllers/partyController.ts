import { Request, Response } from "express";
import axios from "axios";

import { Beer, IBeer } from "../models/Beer";
import { getToken } from "../utils/getToken";

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
    const token = await getToken();
    const playlist = await getPlaylist(token, closestBeer.beerStyle);

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

async function getPlaylist(token: string, beerStyle: string) {
  try {
    // Pegar primeira playlist com query beerStyle
    let url = `https://api.spotify.com/v1/search?q=${beerStyle}&type=playlist&limit=1`;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(url, { headers });
    const playlistName = response.data.playlists.items[0].name;

    // Buscar tracks da playlist
    url = `${response.data.playlists.items[0].href}?fields=name,tracks.items`;
    const {
      data: { tracks },
    } = await axios.get(url, { headers });

    // Mapear tracks para retornar apenas nome, artista e link

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tracksMapped = tracks.items.map((item: any) => {
      const trackName = item.track.name;
      const artistName = item.track.artists[0].name;
      const artistUrl = item.track.artists[0].external_urls.spotify;

      return {
        name: trackName,
        artist: artistName,
        link: artistUrl,
      };
    });

    const playlist = {
      name: playlistName,
      tracks: tracksMapped,
    };

    return playlist;
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao buscar playlist");
  }
}
