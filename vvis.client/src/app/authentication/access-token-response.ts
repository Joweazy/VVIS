export interface AccessTokenResult {
    access_token: string;
    expires_in: number; // default 3600
    refresh_token: string;      
    scope: string;
    token_type: string;
}