import { Request, Response } from "express";
import {
  handleGetBeer,
  handleGetAllBeer,
  handleCreateBeer,
  handleUpdateBeer,
  handleDeleteBeer,
} from "../controllers/beerController";
import { Beer } from "../models/Beer";

// Mock das funções de Request e Response
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockRequest = (params: any = {}, body: any = {}): Request =>
  ({
    params,
    body,
  } as Request);

const mockResponse = (): Response =>
  ({
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    sendStatus: jest.fn(),
  } as unknown as Response);

describe("handleGetBeer", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar cerveja quando encontrada", async () => {
    const beerId = "1234567890";
    const mockBeer = {
      _id: beerId,
      beerStyle: "BeerStyle",
    };

    Beer.findById = jest.fn().mockResolvedValue(mockBeer);

    const req = mockRequest({ id: beerId });
    const res = mockResponse();

    await handleGetBeer(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockBeer);
  });

  it("deve retornar 404 quando cerveja não for encontrada", async () => {
    const beerId = "1234567890";

    Beer.findById = jest.fn().mockResolvedValue(null);

    const req = mockRequest({ id: beerId });
    const res = mockResponse();

    await handleGetBeer(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Cerveja não encontrada" });
  });

  it("deve retornar 500 quando houver erro ao filtrar o database", async () => {
    const beerId = "1234567890";

    Beer.findById = jest.fn().mockRejectedValue(new Error("Database error"));

    const req = mockRequest({ id: beerId });
    const res = mockResponse();

    await handleGetBeer(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Erro ao buscar cerveja" });
  });
});

describe("handleGetAllBeer", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar todas as cervejas", async () => {
    const mockBeers = [
      {
        _id: "1",
        beerStyle: "BeerStyle 1",
      },
      {
        _id: "2",
        beerStyle: "BeerStyle 2",
      },
    ];

    Beer.find = jest.fn().mockResolvedValue(mockBeers);

    const req = mockRequest();
    const res = mockResponse();

    await handleGetAllBeer(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockBeers);
  });

  it("deve retornar 500 quando houver erro ao filtrar o database", async () => {
    Beer.find = jest.fn().mockRejectedValue(new Error("Database error"));

    const req = mockRequest();
    const res = mockResponse();

    await handleGetAllBeer(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Erro ao buscar cervejas" });
  });
});

describe("handleCreateBeer", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve criar nova cerveja", async () => {
    const mockBeer = {
      name: "New Beer",
      minTemp: -2,
      maxTemp: 4,
    };

    const saveMock = jest.fn().mockResolvedValue(mockBeer);
    jest.spyOn(Beer.prototype, "save").mockImplementation(saveMock);

    const req = mockRequest(mockBeer);
    const res = mockResponse();

    await handleCreateBeer(req, res);

    expect(saveMock).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it("deve retornar 500 quando houver erro ao criar cerveja no database", async () => {
    const mockBeer = {
      name: "New Beer",
      minTemp: -2,
      maxTemp: 4,
    };

    const saveMock = jest.fn().mockRejectedValue(new Error("Database error"));
    jest.spyOn(Beer.prototype, "save").mockImplementation(saveMock);

    const req = mockRequest(mockBeer);
    const res = mockResponse();

    await handleCreateBeer(req, res);

    expect(saveMock).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Erro ao criar cerveja" });
  });
});

describe("handleUpdateBeer", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve atualizar cerveja quando encontrada", async () => {
    const beerId = "1234567890";
    const mockBeer = {
      _id: beerId,
      name: "Beer Name",
      // Other properties
    };
    const updatedBeer = { ...mockBeer, name: "Updated Beer Name" };

    Beer.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedBeer);

    const req = mockRequest({ id: beerId }, updatedBeer);
    const res = mockResponse();

    await handleUpdateBeer(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updatedBeer);
  });

  it("deve retornar 404 quando não encontrar cerveja", async () => {
    const beerId = "1234567890";

    Beer.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

    const req = mockRequest({ id: beerId });
    const res = mockResponse();

    await handleUpdateBeer(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Cerveja não encontrada" });
  });

  it("deve retornar 500 quando houver erro ao atulizar cerveja no database", async () => {
    const beerId = "1234567890";

    Beer.findByIdAndUpdate = jest
      .fn()
      .mockRejectedValue(new Error("Database error"));

    const req = mockRequest({ id: beerId });
    const res = mockResponse();

    await handleUpdateBeer(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Erro ao atualizar cerveja",
    });
  });
});

describe("handleDeleteBeer", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve deletar cerveja", async () => {
    const beerId = "1234567890";
    const mockBeer = {
      _id: beerId,
      name: "Beer Name",
      // Other properties
    };

    Beer.findByIdAndDelete = jest.fn().mockResolvedValue(mockBeer);

    const req = mockRequest({ id: beerId });
    const res = mockResponse();

    await handleDeleteBeer(req, res);

    expect(res.sendStatus).toHaveBeenCalledWith(204);
  });

  it("deve retornar 404 quando não encontrar cerveja", async () => {
    const beerId = "1234567890";

    Beer.findByIdAndDelete = jest.fn().mockResolvedValue(null);

    const req = mockRequest({ id: beerId });
    const res = mockResponse();

    await handleDeleteBeer(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Cerveja não encontrada" });
  });

  it("deve retornar 500 quando houver erro ao deletar cerveja no database", async () => {
    const beerId = "1234567890";

    Beer.findByIdAndDelete = jest
      .fn()
      .mockRejectedValue(new Error("Database error"));

    const req = mockRequest({ id: beerId });
    const res = mockResponse();

    await handleDeleteBeer(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Erro ao excluir cerveja" });
  });
});
