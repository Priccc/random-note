/**
 * db user store
 */

export interface UserScheme {
  id?: number;
  name: string;
}

export const UserTable = '++id, name';