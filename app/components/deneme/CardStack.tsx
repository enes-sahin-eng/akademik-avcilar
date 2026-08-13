// %100 Server Component — veriyi tutar, CardStackClient'a prop olarak geçirir
import CardStackClient from './CardStackClient';

interface CardData {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
}

interface CardStackProps {
  cards: CardData[];
}

export default function CardStack({ cards }: CardStackProps) {
  return <CardStackClient cards={cards} />;
}
