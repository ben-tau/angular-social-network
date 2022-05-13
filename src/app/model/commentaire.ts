import { Publication } from './publication';
import { Utilisateur } from './utilisateur';

export class Commentaire {
  id: number | undefined;
  content: string | undefined;
  timestamp: Date | undefined;
  userMadeBy: Utilisateur | undefined;
  post: Publication | undefined;
}
