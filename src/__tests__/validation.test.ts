import { Request, Response, NextFunction } from "express";
import { validateBeerData, validatePartyData } from "../middleware/validation";

// Mock das funções de Request, Response e NextFunction

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockRequest = (body: any): Request =>
  ({
    body,
  } as Request);

const mockResponse = (): Response =>
  ({
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response);

const mockNext = jest.fn() as NextFunction;

describe("validateBeerData", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve aprovar quando dados forem válidos", () => {
    const req = mockRequest({
      beerStyle: "IPA",
      minTemp: 5,
      maxTemp: 7,
    });
    const res = mockResponse();

    validateBeerData(req, res, mockNext);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalled();
  });

  it("deve retornar erro quando faltar key", () => {
    const req = mockRequest({
      beerStyle: "IPA",
      minTemp: 5,
    });
    const res = mockResponse();

    validateBeerData(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Quantidade de chaves inválida",
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("deve retornar erro quando tipo de dado é inválido", () => {
    const req = mockRequest({
      beerStyle: "IPA",
      minTemp: "5",
      maxTemp: 7,
    });
    const res = mockResponse();

    validateBeerData(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Tipo inválido da chave: minTemp",
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("deve retornar erro quando houver keys extras", () => {
    const req = mockRequest({
      beerStyle: "IPA",
      minTemp: 5,
      maxTemp: 7,
      extraKey: "value",
    });
    const res = mockResponse();

    validateBeerData(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Quantidade de chaves inválida",
    });
    expect(mockNext).not.toHaveBeenCalled();
  });
});

describe("validatePartyData", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve aprovar quando dados forem válidos", () => {
    const req = mockRequest({
      temperature: 25,
    });
    const res = mockResponse();

    validatePartyData(req, res, mockNext);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalled();
  });

  it("deve retornar erro quando faltar temperature nos dados", () => {
    const req = mockRequest({});
    const res = mockResponse();

    validatePartyData(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Dados inválidos",
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("deve retornar erro quando temperature não for número", () => {
    const req = mockRequest({
      temperature: "25",
    });
    const res = mockResponse();

    validatePartyData(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Temperature deve ser um número",
    });
    expect(mockNext).not.toHaveBeenCalled();
  });
});
