import { SxProps } from "@mui/material";
import { ImgProps } from "next/dist/shared/lib/get-img-props";

type PokemonImg = {
  url: string | null;
  imgProps?: Partial<ImgProps>;
};

export const PokemonImg = ({ url, imgProps }: PokemonImg) => {
  return <img {...imgProps} src={url ?? ""}></img>;
};
