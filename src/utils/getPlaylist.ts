import axios from "axios";

interface IPlaylist {
  name: string;
  tracks: ITrack[];
}

interface ITrack {
  name: string;
  artist: string;
  link: string;
}

export default async function getPlaylist(
  token: string,
  beerStyle: string
): Promise<IPlaylist> {
  try {
    // Pegar primeira playlist com query beerStyle
    let url = `https://api.spotify.com/v1/search?q=${beerStyle}&type=playlist&limit=1`;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(url, { headers });
    const playlistName: string = response.data.playlists.items[0].name;

    // Buscar tracks da playlist
    url = `${response.data.playlists.items[0].href}?fields=name,tracks.items`;
    const {
      data: { tracks },
    } = await axios.get(url, { headers });

    // Mapear tracks para retornar apenas nome, artista e link

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tracksMapped: ITrack[] = tracks.items.map((item: any) => {
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
