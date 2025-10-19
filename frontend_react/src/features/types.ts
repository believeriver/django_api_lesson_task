// loginSlice
export interface AuthProps {
  username: string;
  password: string;
}

export interface ProfileProps {
  id: number;
  username: string;
}

//taskSlice
export interface TaskProps {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
}
