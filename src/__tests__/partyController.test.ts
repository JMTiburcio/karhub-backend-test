import { Request } from "express";
import { Beer } from "../models/Beer";
import { handleBeerAndPlaylist } from "../controllers/partyController";
import getToken from "../utils/getToken";
import getPlaylist from "../utils/getPlaylist";

// Mock das dependências externas
jest.mock("../models/Beer");
jest.mock("../utils/getToken");
jest.mock("../utils/getPlaylist");

describe("handleBeerAndPlaylist", () => {
  beforeEach(() => {
    // Limpa os mocks antes de cada teste
    jest.clearAllMocks();
  });

  it("deve retornar primeira cerjeva em caso de empate", async () => {
    const mockedBeers = [
      { beerStyle: "IPA", minTemp: -1, maxTemp: 3 },
      { beerStyle: "Lager", minTemp: -1, maxTemp: 3 },
    ];
    const mockedToken = "mocked-token";
    const mockedPlaylist = {
      name: "Test Playlist",
      tracks: [{ name: "Track 1", artist: "Artist 1", link: "link1" }],
    };
    (Beer.find as jest.Mock).mockImplementation(() => ({
      sort: () => Promise.resolve(mockedBeers),
    }));
    (getToken as jest.Mock).mockResolvedValue(mockedToken);
    (getPlaylist as jest.Mock).mockResolvedValue(mockedPlaylist);

    const req = { body: { temperature: 2 } } as Request;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await handleBeerAndPlaylist(req, res);

    expect(Beer.find).toHaveBeenCalledWith({
      minTemp: { $lte: req.body.temperature },
      maxTemp: { $gte: req.body.temperature },
    });
    expect(getToken).toHaveBeenCalled();
    expect(getPlaylist).toHaveBeenCalledWith(
      mockedToken,
      mockedBeers[0].beerStyle
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      beerStyle: mockedBeers[0].beerStyle,
      playlist: mockedPlaylist,
    });
  });

  it("deve retornar um erro 404 quando não houver cervejas filtradas", async () => {
    (Beer.find as jest.Mock).mockImplementation(() => ({
      sort: () => Promise.resolve([]),
    }));

    const req = { body: { temperature: 10 } } as Request;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await handleBeerAndPlaylist(req, res);

    expect(Beer.find).toHaveBeenCalledWith({
      minTemp: { $lte: req.body.temperature },
      maxTemp: { $gte: req.body.temperature },
    });
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: "Nenhuma cerveja encontrada",
    });
  });

  it("deve retornar um erro 500 quando houver uma falha em getToken", async () => {
    const mockedBeers = [{ beerStyle: "IPA", minTemp: -2, maxTemp: 3 }];
    (Beer.find as jest.Mock).mockImplementation(() => ({
      sort: () => Promise.resolve(mockedBeers),
    }));
    (getToken as jest.Mock).mockRejectedValue(new Error("Token error"));
    // Similarmente, você pode mockar getPlaylist para falhar.

    const req = { body: { temperature: 1 } } as Request;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await handleBeerAndPlaylist(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Erro ao buscar cerveja" });
  });

  it("deve retornar um erro 404 quando não encontrar playlist", async () => {
    const mockedBeers = [{ beerStyle: "IPA", minTemp: -2, maxTemp: 3 }];
    const mockedToken = "mocked-token";

    (Beer.find as jest.Mock).mockImplementation(() => ({
      sort: () => Promise.resolve(mockedBeers),
    }));
    (getToken as jest.Mock).mockResolvedValue(mockedToken);
    (getPlaylist as jest.Mock).mockResolvedValue(null);

    const req = { body: { temperature: 1 } } as Request;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await handleBeerAndPlaylist(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: `Nenhuma playlist encontrada para: ${mockedBeers[0].beerStyle}`,
    });
  });

  it("deve retornar a cerveja mais próxima quando houver múltiplas cervejas", async () => {
    const mockedBeers = [
      { beerStyle: "Longe1", minTemp: -1, maxTemp: 4 },
      { beerStyle: "Próxima", minTemp: -1, maxTemp: 3 },
      { beerStyle: "Longe2", minTemp: -2, maxTemp: 4 },
      { beerStyle: "Longe3", minTemp: 0, maxTemp: 5 },
    ];
    const mockedToken = "mocked-token";
    const mockedPlaylist = {
      name: "Test Playlist",
      tracks: [{ name: "Track 1", artist: "Artist 1", link: "link1" }],
    };
    (Beer.find as jest.Mock).mockImplementation(() => ({
      sort: () => Promise.resolve(mockedBeers),
    }));
    (getToken as jest.Mock).mockResolvedValue(mockedToken);
    (getPlaylist as jest.Mock).mockResolvedValue(mockedPlaylist);

    const req = { body: { temperature: 1 } } as Request;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await handleBeerAndPlaylist(req, res);

    expect(Beer.find).toHaveBeenCalledWith({
      minTemp: { $lte: req.body.temperature },
      maxTemp: { $gte: req.body.temperature },
    });
    expect(getToken).toHaveBeenCalled();
    expect(getPlaylist).toHaveBeenCalledWith(mockedToken, "Próxima");

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      beerStyle: "Próxima",
      playlist: mockedPlaylist,
    });
  });
});
