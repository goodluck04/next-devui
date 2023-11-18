type RegisterAPIType = {
    name?: string;
    email?: string;
    password?: string;
    password_confirmation?: string;
  };
  
  type AuthValidationType = {
    name?: string;
    email?: string;
    password?: string; 
  };
type AuthErrorType = {
    name?: string;
    email?: string;
    password?: string;
}

type postErrorsType = {
    title?: string,
    description?: string,
    image?: string
}

interface PostType {
    id:number;
    user_id:number;
    title: string;
    description: string;
    image: string;
    created_at: string;
    user: {
        name: string
    }
}

