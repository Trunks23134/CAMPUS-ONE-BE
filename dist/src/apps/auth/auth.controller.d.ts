import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signIn(body: {
        email: string;
        password: string;
    }): Promise<{
        user: import("@supabase/auth-js").User;
        session: import("@supabase/auth-js").Session;
        weakPassword?: import("@supabase/auth-js").WeakPassword;
    } | {
        user: null;
        session: null;
        weakPassword?: null;
    }>;
    signOut(): Promise<{
        success: boolean;
    }>;
}
