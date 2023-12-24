import { UserInfo } from './user-info.interface';

export interface ResultItem {
  id: number;
  score: number;
  creationDateTime: Date;
  user: UserInfo;
}
