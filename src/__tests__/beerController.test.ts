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

  it("should return the beer when found", async () => {
    const beerId = "1234567890";
    const mockBeer = {
      _id: beerId,
      name: "Beer Name",
      // Other properties
    };

    Beer.findById = jest.fn().mockResolvedValue(mockBeer);

    const req = mockRequest({ id: beerId });
    const res = mockResponse();

    await handleGetBeer(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockBeer);
  });

  it("should return 404 error when beer not found", async () => {
    const beerId = "1234567890";

    Beer.findById = jest.fn().mockResolvedValue(null);

    const req = mockRequest({ id: beerId });
    const res = mockResponse();

    await handleGetBeer(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Cerveja não encontrada" });
  });

  it("should return 500 error when there is an error in finding beer", async () => {
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

  it("should return all beers", async () => {
    const mockBeers = [
      {
        _id: "1",
        name: "Beer 1",
        // Other properties
      },
      {
        _id: "2",
        name: "Beer 2",
        // Other properties
      },
    ];

    Beer.find = jest.fn().mockResolvedValue(mockBeers);

    const req = mockRequest();
    const res = mockResponse();

    await handleGetAllBeer(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockBeers);
  });

  it("should return 500 error when there is an error in finding beers", async () => {
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

  it("should create a new beer", async () => {
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

  it("should return 500 error when there is an error in creating beer", async () => {
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

  it("should update the beer when found", async () => {
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

  it("should return 404 error when beer not found", async () => {
    const beerId = "1234567890";

    Beer.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

    const req = mockRequest({ id: beerId });
    const res = mockResponse();

    await handleUpdateBeer(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Cerveja não encontrada" });
  });

  it("should return 500 error when there is an error in updating beer", async () => {
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

  it("should delete the beer when found", async () => {
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

  it("should return 404 error when beer not found", async () => {
    const beerId = "1234567890";

    Beer.findByIdAndDelete = jest.fn().mockResolvedValue(null);

    const req = mockRequest({ id: beerId });
    const res = mockResponse();

    await handleDeleteBeer(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Cerveja não encontrada" });
  });

  it("should return 500 error when there is an error in deleting beer", async () => {
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
