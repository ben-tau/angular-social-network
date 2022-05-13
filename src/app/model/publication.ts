import { Utilisateur } from './utilisateur';
import { Commentaire } from './commentaire';
import { PublicationInteraction } from './publication-interaction';
import { Photo } from './photo';

export class Publication {
  id: number | undefined;
  content: string | undefined;
  owner: Utilisateur | undefined;
  timestamp: Date | undefined;
  comments: Array<Comment> = new Array<Comment>();
  interestReactions: Array<PublicationInteraction> =
    new Array<PublicationInteraction>();
  pictures: Array<Photo> = new Array<Photo>();
  newComment: Commentaire | undefined;
}
