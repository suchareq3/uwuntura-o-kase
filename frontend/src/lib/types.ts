export type Team = { 
  id: string; 
  name: 'mistrzowie' | 'niebiescy' | 'zieloni' | 'zolci'; 
  amount: number; 
  amount_given: number;
  active: boolean;
};
export type Game = {
  id: string;
  round: number;
  status: 'losowanie_kategorii' | 'licytacja' | 'odpowiadanie' | '1v1' | '1v1_odpowiadanie' | 'licytacja_special';
  jackpot: number;
  special_jackpot: number;
  answering_team?: Team;
  current_category?: Category;
  current_question?: Question;
  hint_purchased?: boolean;
  question_deadline?: Date;
  has_vabanqued?: boolean;
  show_question?: boolean;
  show_1v1_categories: boolean;
  "1v1_available_categories"?: Category[];
  "1v1_selected_categories"?: Category[];
};
export type Category = {
  id: string;
  name: string;
};
export type Question = {
  id: string;
  description: string;
  answer: string;
  fake_answers: string; // comma separated string
  category: Category;
  type: 'text' | 'image' | 'audio' | 'video' | 'item';
  link: string;
  used: boolean;
}