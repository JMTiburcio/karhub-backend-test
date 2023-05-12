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

  it("should pass validation for valid beer data", () => {
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

  it("should return error for missing key in beer data", () => {
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

  it("should return error for invalid type in beer data", () => {
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

  it("should return error for extra key in beer data", () => {
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

  it("should pass validation for valid party data", () => {
    const req = mockRequest({
      temperature: 25,
    });
    const res = mockResponse();

    validatePartyData(req, res, mockNext);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalled();
  });

  it("should return error for missing temperature in party data", () => {
    const req = mockRequest({});
    const res = mockResponse();

    validatePartyData(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Dados inválidos",
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("should return error for invalid type of temperature in party data", () => {
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
