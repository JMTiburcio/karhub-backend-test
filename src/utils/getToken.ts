import axios from "axios";

interface IToken {
  data: {
    access_token: string;
    token_type: string;
    expires_in: number;
  };
}

export async function getToken() {
  try {
    const credentials = `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`;
    const encodedCredentials = Buffer.from(credentials).toString("base64");

    const url = "https://accounts.spotify.com/api/token";
    const data = "grant_type=client_credentials";
    const headers = {
      Authorization: `Basic ${encodedCredentials}`,
    };

    const {
      data: { access_token },
    }: IToken = await axios.post(url, data, {
      headers,
    });

    return access_token;
  } catch (error) {
    throw new Error("Erro ao pegar token");
  }
}
