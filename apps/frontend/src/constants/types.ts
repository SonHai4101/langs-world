export interface User {
  id: string;
  email: string;
  username: string;
  name: string;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface Word {
  id: string;
  text: string;
  normalized: string;
  language: string;
  meaning: string;
  ipa: string;
  sound: string;
  reading: string;
  frequency: number;
}

export interface Text {
  id: string
  userId: string
  language: string
  content: string
  createdAt: string
}
