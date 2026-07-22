// lib/annonces.ts
export type Annonce = {
  id: number;
  title: string;
  desc: string;
  image?: string;
};

export const annonces: Annonce[] = [
  { id: 1, title: "Maison en bord de mer", desc: "4 chambres · 2 salles de bain · Vue mer" },
  { id: 2, title: "Chalet en montagne", desc: "3 chambres · Poêle à bois · Proche randos" },
  { id: 3, title: "Villa avec piscine", desc: "5 chambres · Piscine privée · Jardin" },
];