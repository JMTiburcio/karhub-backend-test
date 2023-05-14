import { Request } from "express";
import { Beer } from "../models/Beer";
import { handleBeerAndPlaylist } from "../controllers/partyController";
import getToken from "../utils/getToken";
import getPlaylist from "../utils/getPlaylist";

// Mock das dependências externas
jest.mock("../models/Beer");
jest.mock("../utils/getToken");
jest.mock("../utils/getPlaylist");

// Crie um mock manual para o módulo 'partyController'
jest.mock("../controllers/partyController", () => {
  const originalModule = jest.requireActual("../controllers/partyController");

  return {
    ...originalModule,
    getPlaylist: jest.fn(),
  };
});

describe("handleBeerAndPlaylist", () => {
  beforeEach(() => {
    // Limpa os mocks antes de cada teste
    jest.clearAllMocks();
  });

  it("deve retornar uma cerveja e uma playlist quando houver cervejas filtradas", async () => {
    const mockedBeers = [
      { beerStyle: "IPA", minTemp: -2, maxTemp: 3 },
      { beerStyle: "Lager", minTemp: -1, maxTemp: 0 },
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

    const req = { body: { temperature: 10 } } as Request;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    try {
      await handleBeerAndPlaylist(req, res);
      console.log("OK!");
    } catch (error) {
      console.error("Error in handleBeerAndPlaylist:", error);
    }

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
});
